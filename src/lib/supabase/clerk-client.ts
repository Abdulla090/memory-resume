import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const publishableKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && publishableKey);

/** Supabase client that sends the Clerk session token (enable Clerk ↔ Supabase integration). */
export function createClerkSupabaseClient(
  getToken: () => Promise<string | null>,
): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  return createClient(url!, publishableKey!, {
    accessToken: async () => (await getToken()) ?? null,
  });
}
