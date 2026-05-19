import { defineConfig } from "nitro/config";

export default defineConfig({
  preset: "vercel",
  rollupConfig: {
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
