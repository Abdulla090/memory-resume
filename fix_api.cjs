const fs = require("fs");
let content = fs.readFileSync("src/lib/ai.functions.ts", "utf8");

content = content.replace(
  /async function callGateway\(opts: \{[\s\S]*?\}\) \{/,
  `async function callGateway(opts: {
  messages: GatewayMessage[];
  tools?: ToolDef[];
  toolChoice?: { type: "function"; function: { name: string } };
  model?: string;
  apiKey?: string;
}) {`
);

content = content.replace(
  /  const apiKey = process\.env\.LOVABLE_API_KEY;\r?\n  if \(!apiKey\) throw new Error\("LOVABLE_API_KEY is not configured"\);\r?\n\r?\n  const body: Record<string, unknown> = \{\r?\n    model: opts\.model \?\? DEFAULT_MODEL,\r?\n    messages: opts\.messages,\r?\n  \};/,
  `  let endpoint = GATEWAY_URL;
  let authKey = process.env.LOVABLE_API_KEY;
  let modelName = opts.model ?? DEFAULT_MODEL;

  if (opts.apiKey) {
    endpoint = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
    authKey = opts.apiKey;
    modelName = "gemini-3.1-flash-lite-preview"; // Use user model
  }

  if (!authKey) throw new Error("API Key is not configured");

  const body: Record<string, unknown> = {
    model: modelName,
    messages: opts.messages,
  };`
);

content = content.replace(/fetch\(GATEWAY_URL/g, "fetch(endpoint");
content = content.replace(/Authorization: \`Bearer \$\{apiKey\}\`/g, "Authorization: `Bearer ${authKey}`");

// Also add apiKey to all z.object() schemas that are inputValidators
content = content.replace(/z\.object\(\{/g, "z.object({ apiKey: z.string().optional(), ");
content = content.replace(/callGateway\(\{/g, "callGateway({ apiKey: data.apiKey, ");

fs.writeFileSync("src/lib/ai.functions.ts", content);
