import { createFileRoute } from "@tanstack/react-router";

const HEARTBEAT_TABLES = ["profiles", "resumes", "user_data"] as const;

export const Route = createFileRoute("/api/heartbeat")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const cronSecret = process.env.CRON_SECRET;
        if (!cronSecret || request.headers.get("authorization") !== `Bearer ${cronSecret}`) {
          return Response.json({ ok: false }, { status: 401 });
        }

        const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
        const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_ANON_KEY;
        if (!supabaseUrl || !supabaseAnonKey) {
          return Response.json({ ok: false, error: "Supabase is not configured" }, { status: 503 });
        }

        const baseUrl = supabaseUrl.replace(/\/$/, "");
        const results = await Promise.all(
          HEARTBEAT_TABLES.map(async (table) => {
            const response = await fetch(`${baseUrl}/rest/v1/${table}?select=id&limit=1`, {
              headers: {
                apikey: supabaseAnonKey,
                Authorization: `Bearer ${supabaseAnonKey}`,
              },
            });
            return response.ok;
          }),
        );

        if (results.some((ok) => !ok)) {
          return Response.json({ ok: false, error: "Supabase heartbeat failed" }, { status: 502 });
        }

        return Response.json({ ok: true });
      },
    },
  },
});
