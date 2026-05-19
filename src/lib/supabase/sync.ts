import type { Profile, SavedResume } from "@/lib/types";
import type { SupabaseClient } from "@supabase/supabase-js";

export type CloudSnapshot = {
  profile: Profile | null;
  resumes: SavedResume[];
  jobApplications: unknown[];
  coverLetters: unknown[];
  updatedAt: string;
};

export async function pullCloudData(
  client: SupabaseClient,
  clerkUserId: string,
): Promise<CloudSnapshot | null> {
  const { data, error } = await client
    .from("user_data")
    .select("profile, resumes, job_applications, cover_letters, updated_at")
    .eq("clerk_user_id", clerkUserId)
    .maybeSingle();

  if (error || !data) return null;
  return {
    profile: data.profile as Profile | null,
    resumes: (data.resumes as SavedResume[]) ?? [],
    jobApplications: (data.job_applications as unknown[]) ?? [],
    coverLetters: (data.cover_letters as unknown[]) ?? [],
    updatedAt: data.updated_at as string,
  };
}

export async function pushCloudData(
  client: SupabaseClient,
  clerkUserId: string,
  email: string | null,
  snapshot: {
    profile: Profile | null;
    resumes: SavedResume[];
    jobApplications?: unknown[];
    coverLetters?: unknown[];
  },
  displayName?: string | null,
): Promise<boolean> {
  const { error } = await client.from("user_data").upsert({
    clerk_user_id: clerkUserId,
    email,
    profile: snapshot.profile,
    resumes: snapshot.resumes,
    job_applications: snapshot.jobApplications ?? [],
    cover_letters: snapshot.coverLetters ?? [],
    updated_at: new Date().toISOString(),
  });

  if (!error) {
    await client.from("profiles").upsert({
      clerk_user_id: clerkUserId,
      email,
      display_name: displayName ?? snapshot.profile?.name ?? null,
      updated_at: new Date().toISOString(),
    });
  }

  return !error;
}

export async function deleteCloudData(
  client: SupabaseClient,
  clerkUserId: string,
): Promise<boolean> {
  const { error } = await client.from("user_data").delete().eq("clerk_user_id", clerkUserId);
  return !error;
}
