import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { loadEnv } from "vite";

export default defineConfig(async ({ command, mode }) => {
  const envDefine: Record<string, string> = {};
  // Load VITE_ prefixed vars for client
  const loadedEnv = loadEnv(mode, process.cwd(), "VITE_");
  for (const [key, value] of Object.entries(loadedEnv)) {
    envDefine[`import.meta.env.${key}`] = JSON.stringify(value);
  }
  // Expose server-side env vars via process.env at build time (fallback for local dev)
  const allEnv = loadEnv(mode, process.cwd(), "");
  // REMOVED: Do not hardcode the GEMINI_API_KEY at build time to prevent accidental client exposure.
  // Instead, rely on Node.js process.env at runtime on the server.
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
      react(),
      tailwindcss(),
      tsconfigPaths({ projects: ["./tsconfig.json"] }),
    ],
    build: {
      sourcemap: false, // ENSURE NO SOURCE MAPS ARE LEAKED IN PRODUCTION
    },
    server: {
      host: "::",
      port: 3000,
    },
  };
});
