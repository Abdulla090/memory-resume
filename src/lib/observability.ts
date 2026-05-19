/** Optional Sentry bootstrap — set VITE_SENTRY_DSN and install @sentry/react to enable. */
export async function initObservability(): Promise<void> {
  const dsn = import.meta.env.VITE_SENTRY_DSN as string | undefined;
  if (!dsn || typeof window === "undefined") return;

  if (import.meta.env.DEV) {
    console.info("[observability] VITE_SENTRY_DSN is set; install @sentry/react to enable Sentry.");
  }
}
