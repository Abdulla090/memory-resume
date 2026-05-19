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

export async function assertAiRateLimit(operation: string): Promise<void> {
  const max = Number(process.env.AI_RATE_LIMIT_MAX ?? DEFAULT_RATE_LIMIT);
  const windowMs = Number(process.env.AI_RATE_LIMIT_WINDOW_MS ?? DEFAULT_RATE_WINDOW_MS);
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
export async function guardAiRequest(operation: string, clientApiKey?: string): Promise<string> {
  await assertAiRateLimit(operation);
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
