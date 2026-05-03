import { defineConfig } from "nitro/config";

export default defineConfig({
  preset: "vercel",
  rollupConfig: {
    output: {
      inlineDynamicImports: true,
    },
  },
});
