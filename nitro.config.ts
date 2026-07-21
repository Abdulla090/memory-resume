import { defineConfig } from "nitro/config";

export default defineConfig({
  preset: "vercel",
  rollupConfig: {
    // `pptxgenjs` installs an npm package named `https`, which can shadow
    // Node's built-in module while Nitro bundles the Gemini websocket client.
    external: ["https"],
    output: {
      inlineDynamicImports: true,
    },
  },
  routeRules: {
    "/**": {
      headers: {
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
      },
    },
  },
});
