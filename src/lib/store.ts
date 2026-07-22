import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Profile, SavedResume, TemplateId } from "./types";

/** In-memory undo/redo stack per resume id. Snapshots the resume record so
 *  changes to `data`, `design`, `template`, and `title` all round-trip. */
export interface ResumeHistory {
  past: SavedResume[];
  future: SavedResume[];
}

const HISTORY_LIMIT = 60;
/** Coalesce edits fired within this window into a single history entry. */
const COALESCE_MS = 450;

interface AppState {
  profile: Profile | null;
  resumes: SavedResume[];
  preferences: { defaultTemplate: TemplateId };
  language: "en" | "ku" | "ar";
  apiKey?: string;
  /** True once the user has completed the onboarding flow at least once */
  onboardingDone: boolean;
  /** Per-resume undo/redo stacks (not persisted). */
  _history: Record<string, ResumeHistory>;
  _lastEditAt: Record<string, number>;
  setProfile: (profile: Profile | null) => void;
  addResume: (resume: SavedResume) => void;
  /** Update without touching history — use for AI/system writes only. */
  updateResume: (id: string, patch: Partial<SavedResume>) => void;
  /** History-aware edit for user-driven changes (chat, inline text, design). */
  editResume: (
    id: string,
    patch: Partial<SavedResume>,
    opts?: { coalesce?: boolean; label?: string },
  ) => void;
  undoResume: (id: string) => boolean;
  redoResume: (id: string) => boolean;
  clearResumeHistory: (id: string) => void;
  deleteResume: (id: string) => void;
  setDefaultTemplate: (t: TemplateId) => void;
  setLanguage: (lang: "en" | "ku" | "ar") => void;
  setApiKey: (key: string) => void;
  setOnboardingDone: () => void;
  reset: () => void;
}

function pushHistory(
  history: ResumeHistory | undefined,
  snapshot: SavedResume,
): ResumeHistory {
  const past = history?.past ?? [];
  const next = [...past, snapshot];
  if (next.length > HISTORY_LIMIT) next.shift();
  return { past: next, future: [] };
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      profile: null,
      resumes: [],
      preferences: { defaultTemplate: "new-professional" },
      language: "en",
      apiKey: undefined,
      onboardingDone: false,
      _history: {},
      _lastEditAt: {},
      setProfile: (profile) => set({ profile }),
      addResume: (resume) => set((s) => ({ resumes: [resume, ...s.resumes] })),
      updateResume: (id, patch) =>
        set((s) => ({
          resumes: s.resumes.map((r) => (r.id === id ? { ...r, ...patch } : r)),
        })),
      editResume: (id, patch, opts) =>
        set((s) => {
          const current = s.resumes.find((r) => r.id === id);
          if (!current) return {};
          const now = Date.now();
          const last = s._lastEditAt[id] ?? 0;
          const coalesce = opts?.coalesce !== false && now - last < COALESCE_MS;
          const history = coalesce
            ? s._history[id] ?? { past: [], future: [] }
            : pushHistory(s._history[id], current);
          return {
            resumes: s.resumes.map((r) => (r.id === id ? { ...r, ...patch } : r)),
            _history: { ...s._history, [id]: history },
            _lastEditAt: { ...s._lastEditAt, [id]: now },
          };
        }),
      undoResume: (id) => {
        const state = get();
        const hist = state._history[id];
        const current = state.resumes.find((r) => r.id === id);
        if (!hist || hist.past.length === 0 || !current) return false;
        const previous = hist.past[hist.past.length - 1];
        set({
          resumes: state.resumes.map((r) => (r.id === id ? previous : r)),
          _history: {
            ...state._history,
            [id]: {
              past: hist.past.slice(0, -1),
              future: [current, ...hist.future],
            },
          },
          _lastEditAt: { ...state._lastEditAt, [id]: 0 },
        });
        return true;
      },
      redoResume: (id) => {
        const state = get();
        const hist = state._history[id];
        const current = state.resumes.find((r) => r.id === id);
        if (!hist || hist.future.length === 0 || !current) return false;
        const next = hist.future[0];
        set({
          resumes: state.resumes.map((r) => (r.id === id ? next : r)),
          _history: {
            ...state._history,
            [id]: {
              past: [...hist.past, current],
              future: hist.future.slice(1),
            },
          },
          _lastEditAt: { ...state._lastEditAt, [id]: 0 },
        });
        return true;
      },
      clearResumeHistory: (id) =>
        set((s) => {
          const nextHist = { ...s._history };
          delete nextHist[id];
          const nextLast = { ...s._lastEditAt };
          delete nextLast[id];
          return { _history: nextHist, _lastEditAt: nextLast };
        }),
      deleteResume: (id) =>
        set((s) => {
          const nextHist = { ...s._history };
          delete nextHist[id];
          return {
            resumes: s.resumes.filter((r) => r.id !== id),
            _history: nextHist,
          };
        }),
      setDefaultTemplate: (t) =>
        set((s) => ({ preferences: { ...s.preferences, defaultTemplate: t } })),
      setLanguage: (lang) => set({ language: lang }),
      setApiKey: (key) => set({ apiKey: key }),
      setOnboardingDone: () => set({ onboardingDone: true }),
      reset: () => set({ profile: null, resumes: [], _history: {}, _lastEditAt: {} }),
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

/** Selector helper: is undo available for this resume? */
export const selectCanUndo = (id: string) => (s: AppState) =>
  (s._history[id]?.past.length ?? 0) > 0;
/** Selector helper: is redo available for this resume? */
export const selectCanRedo = (id: string) => (s: AppState) =>
  (s._history[id]?.future.length ?? 0) > 0;
