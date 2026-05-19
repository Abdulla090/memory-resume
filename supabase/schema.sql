-- MemoryCV — Supabase schema (Clerk third-party auth, no Supabase Auth)
-- 1. Clerk Dashboard → activate Supabase integration
-- 2. Supabase Dashboard → Authentication → Third-party → add Clerk domain
-- 3. Run this file in Supabase SQL editor

-- ─── Helpers ───────────────────────────────────────────────────────────────

create or replace function public.clerk_user_id()
returns text
language sql
stable
set search_path = public
as $$
  select coalesce(auth.jwt() ->> 'sub', '');
$$;

-- ─── Profiles ──────────────────────────────────────────────────────────────

create table if not exists public.profiles (
  clerk_user_id text primary key,
  email text,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select to authenticated
  using (clerk_user_id = public.clerk_user_id());

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert to authenticated
  with check (clerk_user_id = public.clerk_user_id());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update to authenticated
  using (clerk_user_id = public.clerk_user_id())
  with check (clerk_user_id = public.clerk_user_id());

-- ─── Cloud snapshot (profile + resumes JSON) ───────────────────────────────

create table if not exists public.user_data (
  clerk_user_id text primary key,
  email text,
  profile jsonb,
  resumes jsonb not null default '[]'::jsonb,
  job_applications jsonb not null default '[]'::jsonb,
  cover_letters jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_data enable row level security;

drop policy if exists "user_data_select_own" on public.user_data;
create policy "user_data_select_own"
  on public.user_data for select to authenticated
  using (clerk_user_id = public.clerk_user_id());

drop policy if exists "user_data_insert_own" on public.user_data;
create policy "user_data_insert_own"
  on public.user_data for insert to authenticated
  with check (clerk_user_id = public.clerk_user_id());

drop policy if exists "user_data_update_own" on public.user_data;
create policy "user_data_update_own"
  on public.user_data for update to authenticated
  using (clerk_user_id = public.clerk_user_id())
  with check (clerk_user_id = public.clerk_user_id());

drop policy if exists "user_data_delete_own" on public.user_data;
create policy "user_data_delete_own"
  on public.user_data for delete to authenticated
  using (clerk_user_id = public.clerk_user_id());

-- ─── Normalized resumes (optional granular sync) ───────────────────────────

create table if not exists public.resumes (
  id text not null,
  clerk_user_id text not null default (auth.jwt() ->> 'sub'),
  title text not null default '',
  job_target text not null default '',
  template text not null default 'ref-sanchez',
  data jsonb not null default '{}'::jsonb,
  design jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (id, clerk_user_id)
);

alter table public.resumes enable row level security;

drop policy if exists "resumes_select_own" on public.resumes;
create policy "resumes_select_own"
  on public.resumes for select to authenticated
  using (clerk_user_id = public.clerk_user_id());

drop policy if exists "resumes_insert_own" on public.resumes;
create policy "resumes_insert_own"
  on public.resumes for insert to authenticated
  with check (clerk_user_id = public.clerk_user_id());

drop policy if exists "resumes_update_own" on public.resumes;
create policy "resumes_update_own"
  on public.resumes for update to authenticated
  using (clerk_user_id = public.clerk_user_id())
  with check (clerk_user_id = public.clerk_user_id());

drop policy if exists "resumes_delete_own" on public.resumes;
create policy "resumes_delete_own"
  on public.resumes for delete to authenticated
  using (clerk_user_id = public.clerk_user_id());

-- ─── Job applications ──────────────────────────────────────────────────────

create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null default (auth.jwt() ->> 'sub'),
  role text not null,
  company text not null default '',
  status text not null default 'saved',
  source text not null default '',
  resume_id text,
  updated_at timestamptz not null default now()
);

alter table public.job_applications enable row level security;

drop policy if exists "jobs_select_own" on public.job_applications;
create policy "jobs_select_own"
  on public.job_applications for select to authenticated
  using (clerk_user_id = public.clerk_user_id());

drop policy if exists "jobs_insert_own" on public.job_applications;
create policy "jobs_insert_own"
  on public.job_applications for insert to authenticated
  with check (clerk_user_id = public.clerk_user_id());

drop policy if exists "jobs_update_own" on public.job_applications;
create policy "jobs_update_own"
  on public.job_applications for update to authenticated
  using (clerk_user_id = public.clerk_user_id())
  with check (clerk_user_id = public.clerk_user_id());

drop policy if exists "jobs_delete_own" on public.job_applications;
create policy "jobs_delete_own"
  on public.job_applications for delete to authenticated
  using (clerk_user_id = public.clerk_user_id());

-- ─── Cover letters ───────────────────────────────────────────────────────────

create table if not exists public.cover_letters (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null default (auth.jwt() ->> 'sub'),
  resume_id text,
  title text not null default '',
  body text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.cover_letters enable row level security;

drop policy if exists "cover_select_own" on public.cover_letters;
create policy "cover_select_own"
  on public.cover_letters for select to authenticated
  using (clerk_user_id = public.clerk_user_id());

drop policy if exists "cover_insert_own" on public.cover_letters;
create policy "cover_insert_own"
  on public.cover_letters for insert to authenticated
  with check (clerk_user_id = public.clerk_user_id());

drop policy if exists "cover_update_own" on public.cover_letters;
create policy "cover_update_own"
  on public.cover_letters for update to authenticated
  using (clerk_user_id = public.clerk_user_id())
  with check (clerk_user_id = public.clerk_user_id());

drop policy if exists "cover_delete_own" on public.cover_letters;
create policy "cover_delete_own"
  on public.cover_letters for delete to authenticated
  using (clerk_user_id = public.clerk_user_id());

-- ─── Migrate legacy user_data (uuid → clerk) ─────────────────────────────────
-- If you had the old schema with user_id uuid, run manually:
-- alter table public.user_data rename column user_id to clerk_user_id;
-- alter table public.user_data alter column clerk_user_id type text using clerk_user_id::text;
