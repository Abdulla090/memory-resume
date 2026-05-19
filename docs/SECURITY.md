# Security

## API keys

- **Production:** Set `GEMINI_API_KEY` on the server (Vercel environment variables). Client-supplied keys are ignored when `NODE_ENV=production` and a server key exists.
- **Development:** Optional `ALLOW_CLIENT_API_KEY=true` to test with a browser-stored key. Never enable in production.

## Rate limiting

In-memory per-IP limits apply to each AI operation (`AI_RATE_LIMIT_MAX` per `AI_RATE_LIMIT_WINDOW_MS`). For multi-instance deployments, add edge rate limiting (e.g. Vercel Firewall, Upstash Redis).

## Data storage

Resume and profile data are stored in the browser (`localStorage`) unless Supabase sync is configured. Treat shared devices as untrusted.

## Reporting issues

Do not open public issues with exploit details. Contact the maintainers privately.
