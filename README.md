# MemoryCV

AI-powered resume builder from your memory export. TanStack Start + React 19, bilingual (EN/KU), vector PDF export.

## Setup

```powershell
npm install
cp .env.example .env.local
# Set GEMINI_API_KEY in .env.local
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run typecheck` | TypeScript |
| `npm run test` | Vitest unit tests |
| `npm run lint` | ESLint |
| `npm run build` | Production build |
| `npm run check` | typecheck + test + build |

## Deploy (Vercel)

1. Connect repo to Vercel
2. Set `GEMINI_API_KEY` in project environment variables
3. **Auth & cloud:** `VITE_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` — see [docs/SUPABASE_CLERK_SETUP.md](docs/SUPABASE_CLERK_SETUP.md)
4. **Email (optional):** `RESEND_API_KEY`, `RESEND_FROM_EMAIL` for welcome emails
5. Do **not** set `ALLOW_CLIENT_API_KEY` in production

See [docs/SECURITY.md](docs/SECURITY.md), [CONTRIBUTING.md](CONTRIBUTING.md), and [SMOKE_CHECKS.md](SMOKE_CHECKS.md).

Deploy target: **Vercel** (Nitro preset). Cloudflare `wrangler.jsonc` is archived under `docs/archive/`.

## Architecture

- **Client state:** Zustand + localStorage (`memorycv-store`; API keys are not persisted)
- **AI:** Server functions in `src/lib/ai.functions.ts` → Gemini API
- **Export:** Vector PDF via dom-to-svg + svg2pdf; raster PDF via html-to-image
- **Optional cloud:** Supabase auth + `user_data` table
