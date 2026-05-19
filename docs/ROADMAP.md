# MemoryCV — improvement roadmap

Last updated: May 2026. Cloud sync (Clerk + Supabase) is working; auth and landing CTAs are in place.

## Done recently

- Clerk sign-in / sign-up / verify / forgot-password
- Custom signup with first name, last name, optional username
- Supabase RLS + profiles, resumes, job data tables
- Cloud pull/push on login; local → cloud migration
- Resend welcome email (server function)
- Landing: **Get started** → `/signup` when Clerk is on; **Sign in** → `/login`
- CI: typecheck, unit tests, build

## Next (recommended order)

### 1. Production deploy

- [ ] Deploy to Vercel; set env: `VITE_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `RESEND_API_KEY`
- [ ] Clerk: add production domain; Supabase third-party auth domain must match
- [ ] Rotate any keys that were pasted in chat

### 2. Clerk dashboard (one-time)

- [ ] **User & Authentication** → enable **Username** if you want the optional username field on signup
- [ ] **Email, Phone, Username** → require first/last name if you want them mandatory everywhere
- [ ] Social providers (Google/GitHub) if desired

### 3. Product — dashboard & data

- [ ] Sync **job applications** and **cover letters** to Supabase (schema exists; wire `sync.ts` + store)
- [ ] Settings page: show signed-in name, email, “Sync now”, sign out
- [ ] Protect `/dashboard` routes when Clerk is enabled and user is signed out
- [ ] Onboarding: prompt sign-up after first local resume (optional funnel)

### 4. AI & job finding

- [ ] Harden AI routes with existing `ai-security` + Zod on all inputs
- [ ] Job-finding UI per `JOB finding/SKILL.md` + registry skill
- [ ] Rate limits / usage caps per user in Supabase or edge function

### 5. Quality & ops

- [ ] Playwright smoke: landing → signup → dashboard
- [ ] Sentry (or similar) for client + server errors
- [ ] Dependabot / npm audit in CI
- [ ] Backup/export: download all user data (GDPR-friendly)

### 6. Polish

- [ ] Kurdish copy pass on auth pages
- [ ] Password strength hint on signup
- [ ] Avatar from Clerk in header when signed in
- [ ] Email templates (Resend) for password reset branding

## Quick wins (< 1 day each)

| Item | Why |
|------|-----|
| Route guard on `/dashboard` | Stops anonymous access when auth is required |
| Settings account block | Users see name + sync status |
| Job tracker cloud sync | Same account on phone + desktop |
| Vercel preview env | Test PRs with real Clerk test instance |

## Not in scope (unless you ask)

- Payments / subscriptions
- Multi-tenant teams
- Native mobile apps

---

Questions or priority changes? Pick a section above and we can implement it next.
