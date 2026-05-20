# Supabase + Clerk + Resend setup

MemoryCV uses **Clerk** for sign-in/sign-up (custom UI), **Supabase** for Postgres + RLS, and **Resend** for welcome/transactional email.

## Already done (Supabase MCP)

For project **memorycv** (`nrlznfnmbeijkoubezvr`):

- Tables: `profiles`, `user_data`, `resumes`, `job_applications`, `cover_letters`
- RLS enabled on all tables (security advisors: clean)
- `.env.local` has `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

You only need to paste **Clerk API keys** into `.env.local` (see below).

## 1. Clerk

1. Create an application at [clerk.com](https://clerk.com).
2. Copy **Publishable key** → `VITE_CLERK_PUBLISHABLE_KEY` and **Secret key** → `CLERK_SECRET_KEY`.
3. Enable **Email** sign-in and email verification in Clerk → User & authentication.
4. **Google sign-in:** Clerk Dashboard → **User & authentication → Social connections** → enable **Google** → turn on **Enable for sign-up and sign-in**. Without this, the “Continue with Google” button will not appear on `/signup` or `/login`.
5. Optional: require **First / last name** in Clerk if you want them on the sign-up form.

## 2. Supabase + Clerk integration

1. In Clerk: [Supabase integration](https://dashboard.clerk.com/setup/supabase) → **Activate** and copy your Clerk domain.
2. In Supabase: **Authentication → Sign In / Providers → Clerk** → domain **without** `https://`:
   - `caring-moth-82.clerk.accounts.dev` (your MemoryCV instance)
3. ~~Run SQL~~ — already applied via MCP migration `memorycv_clerk_rls_schema`.
4. ~~Set Supabase env vars~~ — already in `.env.local`.

RLS uses `auth.jwt() ->> 'sub'` as the Clerk user id on every row.

## 3. Resend

1. Create an API key at [resend.com](https://resend.com).
2. Verify your sending domain.
3. Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL` in Vercel / `.env.local`.
4. For **Clerk auth emails** (verification, password reset): Clerk Dashboard → **Email** → **Custom SMTP** → use Resend SMTP credentials.

Welcome emails after verification are sent via `sendWelcomeEmail` when Resend is configured.

## 4. Local dev

```powershell
cp .env.example .env.local
# Fill Clerk, Supabase, Resend keys
npm run dev
```

Routes: `/login`, `/signup`, `/verify-email`, `/forgot-password`.

## 5. Deploy (Vercel)

Add all env vars from `.env.example`. Do not expose `CLERK_SECRET_KEY` or `RESEND_API_KEY` to the client.

## Note on Firestore

This project uses **Supabase Postgres**, not Firebase Firestore. All cloud data lives in Supabase tables with RLS.
