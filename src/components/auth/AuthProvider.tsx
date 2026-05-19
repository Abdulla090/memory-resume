import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useAuth as useClerkAuth, useSession, useUser } from "@clerk/tanstack-react-start";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { sendWelcomeEmail } from "@/lib/email.functions";
import { useAppStore } from "@/lib/store";
import { createClerkSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/clerk-client";
import { pullCloudData, pushCloudData } from "@/lib/supabase/sync";

export type AuthUser = {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  username: string | null;
  displayName: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  isSignedIn: boolean;
  signOut: () => Promise<void>;
  syncToCloud: () => Promise<void>;
  importFromCloud: () => Promise<void>;
  migrateLocalToCloud: () => Promise<void>;
  cloudEnabled: boolean;
  clerkEnabled: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const LOCAL_IMPORT_KEY = "memorycv-cloud-imported";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isLoaded: clerkLoaded, isSignedIn, userId, signOut: clerkSignOut } = useClerkAuth();
  const { user: clerkUser } = useUser();
  const { session } = useSession();
  const [supabaseReady, setSupabaseReady] = useState(false);

  const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined;
  const clerkEnabled = Boolean(clerkKey);
  const cloudEnabled = clerkEnabled && isSupabaseConfigured;

  const user: AuthUser | null = useMemo(() => {
    if (!isSignedIn || !userId || !clerkUser) return null;
    const email =
      clerkUser.primaryEmailAddress?.emailAddress ??
      clerkUser.emailAddresses[0]?.emailAddress ??
      null;
    const displayName =
      clerkUser.fullName?.trim() ||
      [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ").trim() ||
      clerkUser.username ||
      email ||
      "User";
    return {
      id: userId,
      email,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      fullName: clerkUser.fullName,
      username: clerkUser.username,
      displayName,
    };
  }, [isSignedIn, userId, clerkUser]);

  const getSupabase = useCallback(async () => {
    if (!session || !isSupabaseConfigured) return null;
    return createClerkSupabaseClient(() => session.getToken());
  }, [session]);

  useEffect(() => {
    if (clerkLoaded && isSignedIn && session) {
      void getSupabase().then(() => setSupabaseReady(true));
    } else {
      setSupabaseReady(false);
    }
  }, [clerkLoaded, isSignedIn, session, getSupabase]);

  const signOut = useCallback(async () => {
    await clerkSignOut();
  }, [clerkSignOut]);

  const syncToCloud = useCallback(async () => {
    if (!user) return;
    const client = await getSupabase();
    if (!client) {
      toast.error("Cloud database is not configured");
      return;
    }
    const { profile, resumes } = useAppStore.getState();
    const ok = await pushCloudData(client, user.id, user.email, { profile, resumes }, user.displayName);
    if (ok) toast.success("Synced to cloud");
    else toast.error("Cloud sync failed — check Supabase RLS and Clerk integration");
  }, [user, getSupabase]);

  const importFromCloud = useCallback(async () => {
    if (!user) return;
    const client = await getSupabase();
    if (!client) return;
    const data = await pullCloudData(client, user.id);
    if (!data) {
      toast.message("No cloud data yet");
      return;
    }
    const store = useAppStore.getState();
    if (data.profile) store.setProfile(data.profile);
    for (const r of data.resumes) {
      if (!store.resumes.some((x) => x.id === r.id)) store.addResume(r);
    }
    toast.success("Imported from cloud");
  }, [user, getSupabase]);

  const migrateLocalToCloud = useCallback(async () => {
    if (!user) return;
    if (typeof window !== "undefined" && localStorage.getItem(LOCAL_IMPORT_KEY)) {
      await importFromCloud();
      return;
    }
    const client = await getSupabase();
    if (!client) return;
    const existing = await pullCloudData(client, user.id);
    const store = useAppStore.getState();
    if (!existing && (store.profile || store.resumes.length > 0)) {
      const ok = await pushCloudData(
        client,
        user.id,
        user.email,
        { profile: store.profile, resumes: store.resumes },
        user.displayName,
      );
      if (ok && typeof window !== "undefined") {
        localStorage.setItem(LOCAL_IMPORT_KEY, "1");
        toast.success("Local data backed up to cloud");
      }
    } else {
      await importFromCloud();
    }
    if (typeof window !== "undefined") localStorage.setItem(LOCAL_IMPORT_KEY, "1");
  }, [user, getSupabase, importFromCloud]);

  const sendWelcome = useServerFn(sendWelcomeEmail);
  const welcomedRef = useRef(false);
  const migratedRef = useRef(false);

  useEffect(() => {
    if (!isSignedIn || !user?.email || welcomedRef.current) return;
    welcomedRef.current = true;
    void sendWelcome({ data: { to: user.email, name: user.firstName ?? undefined } }).catch(
      () => undefined,
    );
  }, [isSignedIn, user, sendWelcome]);
  useEffect(() => {
    if (cloudEnabled && isSignedIn && user && supabaseReady && !migratedRef.current) {
      migratedRef.current = true;
      void migrateLocalToCloud();
    }
  }, [cloudEnabled, isSignedIn, user, supabaseReady, migrateLocalToCloud]);

  const loading = !clerkLoaded || (isSignedIn && cloudEnabled && !supabaseReady);

  const value = useMemo(
    () => ({
      user,
      loading,
      isSignedIn: Boolean(isSignedIn),
      signOut,
      syncToCloud,
      importFromCloud,
      migrateLocalToCloud,
      cloudEnabled,
      clerkEnabled,
    }),
    [
      user,
      loading,
      isSignedIn,
      signOut,
      syncToCloud,
      importFromCloud,
      migrateLocalToCloud,
      cloudEnabled,
      clerkEnabled,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
