import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { loadEnv } from "vite";
import { nitro } from "nitro/vite";

export default defineConfig(async ({ command, mode }) => {
  const envDefine: Record<string, string> = {};
  // Load VITE_ prefixed vars for client
  const loadedEnv = loadEnv(mode, process.cwd(), "VITE_");
  for (const [key, value] of Object.entries(loadedEnv)) {
    envDefine[`import.meta.env.${key}`] = JSON.stringify(value);
  }
  // Expose server-side env vars via process.env at build time (fallback for local dev)
  const allEnv = loadEnv(mode, process.cwd(), "");
  if (allEnv.GEMINI_API_KEY) {
    envDefine["process.env.GEMINI_API_KEY"] = JSON.stringify(allEnv.GEMINI_API_KEY);
  }

  return {
    define: envDefine,
    resolve: {
      alias: {
        "@": `${process.cwd()}/src`,
      },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    plugins: [
      tanstackStart(),
      nitro({
        preset: "vercel",
      }),
      react(),
      tailwindcss(),
      tsconfigPaths({ projects: ["./tsconfig.json"] }),
    ],
    server: {
      host: "::",
      port: 3000,
    },
  };
});
