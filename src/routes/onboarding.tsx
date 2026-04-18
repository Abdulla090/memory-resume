import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, ArrowRight, Sparkles, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { parseMemory } from "@/lib/ai.functions";
import { useAppStore } from "@/lib/store";
import { SAMPLE_MEMORIES } from "@/lib/sample-memories";
import type { Profile } from "@/lib/types";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Import your memory — MemoryCV" },
      {
        name: "description",
        content: "Paste your AI memory from ChatGPT, Claude, or Gemini to build your profile.",
      },
    ],
  }),
  component: Onboarding,
});

const SOURCES = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    where: "Settings → Personalization → Memory → Manage memory. Copy all entries.",
  },
  {
    id: "claude",
    name: "Claude",
    where: "Settings → Profile / Personal preferences. Copy what Claude remembers about you.",
  },
  {
    id: "gemini",
    name: "Gemini",
    where: "Activity → Saved info. Copy your saved profile facts.",
  },
  {
    id: "manual",
    name: "Manual",
    where: "Write a free-form summary of yourself — career, skills, projects, goals.",
  },
];

const LOADING_PHRASES = [
  "Reading your story…",
  "Mapping your skills…",
  "Connecting the dots…",
  "Finding your strengths…",
  "Building your identity…",
];

function Onboarding() {
  const navigate = useNavigate();
  const setProfile = useAppStore((s) => s.setProfile);
  const parseMemoryFn = useServerFn(parseMemory);

  const [step, setStep] = useState(0);
  const [source, setSource] = useState<string | null>(null);
  const [memory, setMemory] = useState("");
  const [loading, setLoading] = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [profile, setLocalProfile] = useState<Profile | null>(null);

  const loadSample = (id: string) => {
    const s = SAMPLE_MEMORIES.find((m) => m.id === id);
    if (s) {
      setMemory(s.text);
      toast.success(`Loaded ${s.persona} sample`);
    }
  };

  const handleExtract = async () => {
    if (memory.trim().length < 20) {
      toast.error("Add a bit more detail to extract from.");
      return;
    }
    setLoading(true);
    setStep(2);
    const interval = setInterval(
      () => setPhraseIdx((i) => (i + 1) % LOADING_PHRASES.length),
      1800,
    );
    try {
      const { profile } = await parseMemoryFn({ data: { memory } });
      setLocalProfile(profile);
      setStep(3);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to extract");
      setStep(1);
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (!profile) return;
    setProfile(profile);
    toast.success("Profile saved");
    navigate({ to: "/dashboard" });
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ background: "var(--gradient-radial), var(--background)" }}
    >
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-bg">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-semibold">MemoryCV</span>
        </Link>
        <Stepper step={step} />
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <Step key="0" title="Where's your memory from?" subtitle="Pick your AI source.">
              <div className="grid gap-3 sm:grid-cols-2">
                {SOURCES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSource(s.id);
                      setStep(1);
                    }}
                    className={`group rounded-2xl border p-5 text-left transition-all hover:scale-[1.02] ${
                      source === s.id
                        ? "border-primary bg-surface"
                        : "border-border bg-surface/40 hover:border-primary/40"
                    }`}
                  >
                    <div className="font-display text-lg font-semibold">{s.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{s.where}</div>
                  </button>
                ))}
              </div>
            </Step>
          )}

          {step === 1 && (
            <Step
              key="1"
              title="Paste your memory"
              subtitle="Drop the raw text. We'll extract everything that matters."
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground">Try a sample:</span>
                {SAMPLE_MEMORIES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => loadSample(s.id)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs hover:border-primary/40 hover:bg-surface"
                  >
                    <span>{s.emoji}</span> {s.persona}
                  </button>
                ))}
              </div>
              <textarea
                value={memory}
                onChange={(e) => setMemory(e.target.value)}
                placeholder="Paste your AI memory here… (or click a sample above)"
                className="min-h-[320px] w-full resize-y rounded-2xl border border-border bg-surface/60 p-5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>{memory.length.toLocaleString()} characters</span>
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setStep(0)}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm hover:bg-surface"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button
                  onClick={handleExtract}
                  disabled={memory.trim().length < 20}
                  className="inline-flex items-center gap-2 rounded-full gradient-bg px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
                >
                  Extract profile <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </Step>
          )}

          {step === 2 && (
            <motion.div
              key="2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-[400px] flex-col items-center justify-center text-center"
            >
              <div className="relative mb-8">
                <div
                  className="h-24 w-24 rounded-full"
                  style={{
                    background: "var(--gradient-primary)",
                    boxShadow: "var(--shadow-glow)",
                  }}
                />
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2 border-primary"
                />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={phraseIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="font-display text-2xl font-medium"
                >
                  {LOADING_PHRASES[phraseIdx]}
                </motion.div>
              </AnimatePresence>
              <div className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Extracting your professional identity
              </div>
            </motion.div>
          )}

          {step === 3 && profile && (
            <Step
              key="3"
              title={`Welcome, ${profile.name.split(" ")[0]}.`}
              subtitle="Here's the identity we extracted. Edit anything that needs fixing."
            >
              <ProfileEditor profile={profile} setProfile={setLocalProfile} />
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm hover:bg-surface"
                >
                  <ArrowLeft className="h-4 w-4" /> Re-paste
                </button>
                <button
                  onClick={handleConfirm}
                  className="inline-flex items-center gap-2 rounded-full gradient-bg px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Check className="h-4 w-4" /> Looks good — continue
                </button>
              </div>
            </Step>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <div className="hidden items-center gap-2 sm:flex">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={`h-1.5 w-8 rounded-full transition-colors ${
            i <= step ? "bg-primary" : "bg-border"
          }`}
        />
      ))}
    </div>
  );
}

function Step({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
    >
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">{title}</h1>
      <p className="mt-2 text-muted-foreground">{subtitle}</p>
      <div className="mt-8">{children}</div>
    </motion.div>
  );
}

function ProfileEditor({
  profile,
  setProfile,
}: {
  profile: Profile;
  setProfile: (p: Profile) => void;
}) {
  const update = <K extends keyof Profile>(k: K, v: Profile[K]) =>
    setProfile({ ...profile, [k]: v });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name">
          <input
            value={profile.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </Field>
        <Field label="Location">
          <input
            value={profile.location}
            onChange={(e) => update("location", e.target.value)}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </Field>
      </div>
      <Field label="Summary">
        <textarea
          value={profile.summary}
          onChange={(e) => update("summary", e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
        />
      </Field>
      <Field label="Career goals">
        <textarea
          value={profile.careerGoals}
          onChange={(e) => update("careerGoals", e.target.value)}
          rows={2}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Pills
          label="Technical skills"
          values={profile.skills.technical}
          onChange={(v) => update("skills", { ...profile.skills, technical: v })}
        />
        <Pills
          label="Tools"
          values={profile.skills.tools}
          onChange={(v) => update("skills", { ...profile.skills, tools: v })}
        />
        <Pills
          label="Soft skills"
          values={profile.skills.soft}
          onChange={(v) => update("skills", { ...profile.skills, soft: v })}
        />
        <Pills
          label="Languages"
          values={profile.skills.languages_spoken}
          onChange={(v) =>
            update("skills", { ...profile.skills, languages_spoken: v })
          }
        />
      </div>

      <div>
        <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Experience ({profile.experience.length})
        </div>
        <div className="space-y-2">
          {profile.experience.slice(0, 4).map((e, i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-surface/60 p-3 text-sm"
            >
              <div className="font-semibold">
                {e.title} · {e.company}
              </div>
              <div className="text-xs text-muted-foreground">{e.duration}</div>
            </div>
          ))}
          {profile.experience.length > 4 && (
            <div className="text-xs text-muted-foreground">
              + {profile.experience.length - 4} more
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      {children}
    </div>
  );
}

function Pills({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const [input, setInput] = useState("");
  return (
    <div>
      <div className="mb-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {values.map((v, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1 text-xs"
          >
            {v}
            <button
              onClick={() => onChange(values.filter((_, j) => j !== i))}
              className="text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input.trim()) {
              e.preventDefault();
              onChange([...values, input.trim()]);
              setInput("");
            }
          }}
          placeholder="Add…"
          className="min-w-[80px] flex-1 rounded-full border border-dashed border-border bg-transparent px-2.5 py-1 text-xs outline-none focus:border-primary"
        />
      </div>
    </div>
  );
}
