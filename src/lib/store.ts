import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Profile, SavedResume, TemplateId } from "./types";

interface AppState {
  profile: Profile | null;
  resumes: SavedResume[];
  preferences: { defaultTemplate: TemplateId };
  language: "en" | "ku";
  apiKey?: string;
  /** True once the user has completed the onboarding flow at least once */
  onboardingDone: boolean;
  setProfile: (profile: Profile | null) => void;
  addResume: (resume: SavedResume) => void;
  updateResume: (id: string, patch: Partial<SavedResume>) => void;
  deleteResume: (id: string) => void;
  setDefaultTemplate: (t: TemplateId) => void;
  setLanguage: (lang: "en" | "ku") => void;
  setApiKey: (key: string) => void;
  setOnboardingDone: () => void;
  reset: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      profile: null,
      resumes: [],
      preferences: { defaultTemplate: "new-professional" },
      language: "en",
      apiKey: undefined,
      onboardingDone: false,
      setProfile: (profile) => set({ profile }),
      addResume: (resume) => set((s) => ({ resumes: [resume, ...s.resumes] })),
      updateResume: (id, patch) =>
        set((s) => ({
          resumes: s.resumes.map((r) => (r.id === id ? { ...r, ...patch } : r)),
        })),
      deleteResume: (id) =>
        set((s) => ({ resumes: s.resumes.filter((r) => r.id !== id) })),
      setDefaultTemplate: (t) =>
        set((s) => ({ preferences: { ...s.preferences, defaultTemplate: t } })),
      setLanguage: (lang) => set({ language: lang }),
      setApiKey: (key) => set({ apiKey: key }),
      setOnboardingDone: () => set({ onboardingDone: true }),
      reset: () => set({ profile: null, resumes: [] }),
    }),
    {
      name: "memorycv-store",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? window.localStorage : (undefined as never),
      ),
      partialize: (state) => ({
        profile: state.profile,
        resumes: state.resumes,
        preferences: state.preferences,
        language: state.language,
        onboardingDone: state.onboardingDone,
      }),
    },
  ),
);
