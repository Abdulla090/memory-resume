import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { loadEnv } from "vite";
import { nitro } from "nitro/vite";

export default defineConfig(async ({ mode }) => {
  const envDefine: Record<string, string> = {};
  const loadedEnv = loadEnv(mode, process.cwd(), "VITE_");
  for (const [key, value] of Object.entries(loadedEnv)) {
    envDefine[`import.meta.env.${key}`] = JSON.stringify(value);
  }
  const clerkPub =
    loadedEnv.VITE_CLERK_PUBLISHABLE_KEY ??
    process.env.VITE_CLERK_PUBLISHABLE_KEY ??
    process.env.CLERK_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (clerkPub) {
    envDefine["import.meta.env.VITE_CLERK_PUBLISHABLE_KEY"] = JSON.stringify(clerkPub);
  }

  return {
    define: envDefine,
    resolve: {
      alias: {
        "@": `${process.cwd()}/src`,
      },
    },
    plugins: [
      tanstackStart(),
      nitro(),
      react(),
      tailwindcss(),
      tsconfigPaths({ projects: ["./tsconfig.json"] }),
    ],
    build: {
      sourcemap: process.env.SOURCEMAP === "true" || mode === "development",
    },
    server: {
      host: "::",
      port: 3000,
    },
  };
});
