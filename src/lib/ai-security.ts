/**
 * Server-side AI security: API key resolution, rate limits, request guards.
 */

const AI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";

const DEFAULT_MODEL = "gemini-2.5-flash";
const DEFAULT_RATE_LIMIT = 40;
const DEFAULT_RATE_WINDOW_MS = 60 * 60 * 1000;

type RateBucket = { count: number; resetAt: number };

const rateBuckets = new Map<string, RateBucket>();

function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

function allowClientApiKey(): boolean {
  if (!isProduction()) return true;
  return process.env.ALLOW_CLIENT_API_KEY === "true";
}

/** Resolve Gemini key: production uses server key only unless explicitly allowed. */
export function resolveGeminiApiKey(clientKey?: string): string {
  const serverKey = process.env.GEMINI_API_KEY?.trim();
  if (isProduction() && serverKey) {
    return serverKey;
  }
  if (allowClientApiKey() && clientKey?.trim()) {
    return clientKey.trim();
  }
  if (serverKey) {
    return serverKey;
  }
  if (clientKey?.trim()) {
    return clientKey.trim();
  }
  throw new Error("MISSING_API_KEY");
}

export async function getRateLimitClientId(): Promise<string> {
  try {
    const { getRequest } = await import("@tanstack/react-start/server");
    const req = getRequest();
    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded) {
      return forwarded.split(",")[0]?.trim() || "unknown";
    }
    const realIp = req.headers.get("x-real-ip");
    if (realIp) return realIp.trim();
  } catch {
    // No request context (e.g. unit tests)
  }
  return "anonymous";
}

export async function assertAiRateLimit(
  operation: string,
  overrides?: { max?: number; windowMs?: number },
): Promise<void> {
  const max = overrides?.max ?? Number(process.env.AI_RATE_LIMIT_MAX ?? DEFAULT_RATE_LIMIT);
  const windowMs =
    overrides?.windowMs ?? Number(process.env.AI_RATE_LIMIT_WINDOW_MS ?? DEFAULT_RATE_WINDOW_MS);
  const clientId = await getRateLimitClientId();
  const key = `${clientId}:${operation}`;
  const now = Date.now();
  let bucket = rateBuckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    bucket = { count: 0, resetAt: now + windowMs };
    rateBuckets.set(key, bucket);
  }

  if (bucket.count >= max) {
    throw new Error("AI_RATE_LIMIT");
  }

  bucket.count += 1;
}

/** Call before every AI server handler. */
export async function guardAiRequest(
  operation: string,
  clientApiKey?: string,
  overrides?: { max?: number; windowMs?: number },
): Promise<string> {
  await assertAiRateLimit(operation, overrides);
  return resolveGeminiApiKey(clientApiKey);
}

export interface GatewayMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ToolDef {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters: Record<string, unknown>;
  };
}

export async function callGateway(opts: {
  messages: GatewayMessage[];
  tools?: ToolDef[];
  toolChoice?: { type: "function"; function: { name: string } };
  model?: string;
  apiKey: string;
}): Promise<unknown> {
  const modelName = opts.model ?? DEFAULT_MODEL;
  const body: Record<string, unknown> = { model: modelName, messages: opts.messages };
  if (opts.tools) body.tools = opts.tools;
  if (opts.toolChoice) body.tool_choice = opts.toolChoice;

  const doFetch = async () => {
    const res = await fetch(AI_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${opts.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      if (res.status === 429) throw new Error("AI_RATE_LIMIT");
      if (res.status === 401 || res.status === 403) throw new Error("INVALID_API_KEY");
      if (res.status >= 500) throw new Error("AI_SERVICE_UNAVAILABLE");
      throw new Error("AI_REQUEST_FAILED");
    }

    return res.json();
  };

  try {
    return await doFetch();
  } catch (e) {
    if (e instanceof Error && e.message === "AI_RATE_LIMIT") {
      await new Promise((r) => setTimeout(r, 1500));
      return doFetch();
    }
    throw e;
  }
}

export function extractToolArgs<T>(json: unknown): T {
  const call = (
    json as {
      choices?: Array<{ message?: { tool_calls?: Array<{ function?: { arguments?: string } }> } }>;
    }
  )?.choices?.[0]?.message?.tool_calls?.[0];
  if (!call?.function?.arguments) {
    throw new Error("AI did not return structured output");
  }
  return JSON.parse(call.function.arguments) as T;
}

export function extractText(json: unknown): string {
  return (
    (json as { choices?: Array<{ message?: { content?: string } }> })?.choices?.[0]?.message
      ?.content ?? ""
  );
}

// ────────────────── Managed Agents (Gemini Interactions API) ──────────────────

/** Default managed agent. Antigravity is the general-purpose agent with web,
 * code execution, and file management inside a remote Linux sandbox. */
export const DEFAULT_MANAGED_AGENT = "antigravity-preview-05-2026";

export type ManagedAgentStatus =
  | "in_progress"
  | "requires_action"
  | "completed"
  | "failed"
  | "cancelled"
  | "incomplete";

export interface ManagedAgentResult {
  /** Full text output from the final model step (empty until completed). */
  outputText: string;
  /** Sandbox environment id, usable to resume in a follow-up call. */
  environmentId?: string;
  /** Interaction id, usable as `previous_interaction_id` to continue the conversation. */
  interactionId: string;
  /** Current interaction status. */
  status: ManagedAgentStatus;
}

function normaliseAgentError(e: unknown): Error {
  const msg = e instanceof Error ? e.message : String(e);
  const lower = msg.toLowerCase();
  if (lower.includes("401") || lower.includes("403") || lower.includes("unauthor")) {
    return new Error("INVALID_API_KEY");
  }
  if (lower.includes("429") || lower.includes("rate limit")) {
    return new Error("AI_RATE_LIMIT");
  }
  if (
    lower.includes("timeout") ||
    lower.includes("aborted") ||
    lower.includes("etimedout") ||
    lower.includes("network")
  ) {
    return new Error("AI_SERVICE_UNAVAILABLE");
  }
  if (msg === "AI_REQUEST_FAILED" || msg === "AI_RATE_LIMIT" || msg === "INVALID_API_KEY") {
    return e instanceof Error ? e : new Error(msg);
  }
  return new Error("AI_REQUEST_FAILED");
}

/**
 * Invoke a Gemini managed agent (Antigravity by default) via the Interactions API.
 * The agent runs in a remote Linux sandbox; it can reason, browse the web, run
 * code, and manage files.
 *
 * Pass `background: true` to return immediately with `status: "in_progress"`.
 * The agent then continues running on Google's infra; poll with
 * `getManagedAgentInteraction(apiKey, interactionId)` until status is
 * `"completed"` or a terminal failure. This is the recommended pattern for any
 * host with a short request timeout (Vercel free, Cloudflare, Netlify, etc.).
 *
 * Beta API — schema may change. Errors are normalised to the same codes as
 * `callGateway` so the existing `getAiErrorMessage` helper works.
 */
export async function callManagedAgent(opts: {
  apiKey: string;
  agent?: string;
  /** Optional system instruction (passed alongside the user input). */
  systemInstruction?: string;
  /** Main user-facing prompt / task. */
  input: string;
  /** "remote" provisions a fresh sandbox. Pass an env id to resume an existing one. */
  environment?: string;
  /** Continue a previous interaction (carries chat + reasoning context). */
  previousInteractionId?: string;
  /** When true, returns immediately after the agent task is queued. */
  background?: boolean;
  /** Per-call request timeout (ms). Defaults: 30s in background mode, 4min otherwise. */
  timeoutMs?: number;
}): Promise<ManagedAgentResult> {
  const { GoogleGenAI } = await import("@google/genai");
  const client = new GoogleGenAI({ apiKey: opts.apiKey });

  try {
    const interaction = await client.interactions.create(
      {
        agent: opts.agent ?? DEFAULT_MANAGED_AGENT,
        input: opts.input,
        environment: opts.environment ?? "remote",
        ...(opts.systemInstruction ? { system_instruction: opts.systemInstruction } : {}),
        ...(opts.previousInteractionId
          ? { previous_interaction_id: opts.previousInteractionId }
          : {}),
        ...(opts.background ? { background: true } : {}),
      },
      { timeout: opts.timeoutMs ?? (opts.background ? 30_000 : 240_000) },
    );

    if (
      !opts.background &&
      (interaction.status === "failed" || interaction.status === "incomplete")
    ) {
      throw new Error("AI_REQUEST_FAILED");
    }

    return {
      outputText: interaction.output_text ?? "",
      environmentId: interaction.environment_id,
      interactionId: interaction.id,
      status: interaction.status as ManagedAgentStatus,
    };
  } catch (e: unknown) {
    throw normaliseAgentError(e);
  }
}

/**
 * Retrieve an existing managed-agent interaction by id. Use this to poll
 * background interactions until they reach a terminal state.
 */
export async function getManagedAgentInteraction(opts: {
  apiKey: string;
  interactionId: string;
  timeoutMs?: number;
}): Promise<ManagedAgentResult> {
  const { GoogleGenAI } = await import("@google/genai");
  const client = new GoogleGenAI({ apiKey: opts.apiKey });
  try {
    const interaction = await client.interactions.get(
      opts.interactionId,
      {},
      { timeout: opts.timeoutMs ?? 20_000 },
    );
    return {
      outputText: interaction.output_text ?? "",
      environmentId: interaction.environment_id,
      interactionId: interaction.id,
      status: interaction.status as ManagedAgentStatus,
    };
  } catch (e: unknown) {
    throw normaliseAgentError(e);
  }
}

/** Cancel an in-flight background interaction. Safe to call on any status. */
export async function cancelManagedAgentInteraction(opts: {
  apiKey: string;
  interactionId: string;
}): Promise<void> {
  try {
    const { GoogleGenAI } = await import("@google/genai");
    const client = new GoogleGenAI({ apiKey: opts.apiKey });
    await client.interactions.cancel(opts.interactionId, {}, { timeout: 15_000 });
  } catch {
    // Best-effort cancel; ignore errors.
  }
}

/**
 * Extract a JSON object from text emitted by a managed agent.
 * Looks for content between the configured markers first; falls back to the
 * first balanced JSON object found in the text. Returns null if nothing parses.
 */
export function extractJsonFromAgentText<T = unknown>(
  text: string,
  markerStart = "<<<JSON_START>>>",
  markerEnd = "<<<JSON_END>>>",
): T | null {
  if (!text) return null;
  const startIdx = text.indexOf(markerStart);
  const endIdx = text.indexOf(markerEnd);
  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    const slice = text.slice(startIdx + markerStart.length, endIdx).trim();
    try {
      return JSON.parse(slice) as T;
    } catch {
      // fall through to brace-scan
    }
  }

  // Fallback: try to find a balanced top-level JSON object.
  const firstBrace = text.indexOf("{");
  if (firstBrace === -1) return null;
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = firstBrace; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }
    if (ch === '"') {
      inString = true;
    } else if (ch === "{") {
      depth += 1;
    } else if (ch === "}") {
      depth -= 1;
      if (depth === 0) {
        const candidate = text.slice(firstBrace, i + 1);
        try {
          return JSON.parse(candidate) as T;
        } catch {
          return null;
        }
      }
    }
  }
  return null;
}
