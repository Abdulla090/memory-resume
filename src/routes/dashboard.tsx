import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import {
  Sparkles,
  Briefcase,
  Compass,
  Files,
  Wand2,
  TrendingUp,
  Trash2,
  ExternalLink,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { useAppStore } from "@/lib/store";
import { generateResume, suggestCareerPaths } from "@/lib/ai.functions";
import type { CareerPath, SavedResume, TemplateId } from "@/lib/types";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — MemoryCV" },
      { name: "description", content: "Generate, explore, and manage your AI-tailored resumes." },
    ],
  }),
  component: Dashboard,
});

type Tab = "generate" | "explore" | "resumes";

function Dashboard() {
  const navigate = useNavigate();
  const profile = useAppStore((s) => s.profile);
  const [tab, setTab] = useState<Tab>("generate");

  useEffect(() => {
    if (!profile) navigate({ to: "/onboarding" });
  }, [profile, navigate]);

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-bg">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-semibold">MemoryCV</span>
          </Link>
          <Link to="/templates" className="text-sm text-muted-foreground hover:text-foreground">
            Templates
          </Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-4">
          <ProfileCard />
          <NavTabs tab={tab} onTab={setTab} />
        </aside>

        <main>
          <AnimatePresence mode="wait">
            {tab === "generate" && <QuickGenerate key="g" />}
            {tab === "explore" && <CareerExplorer key="c" />}
            {tab === "resumes" && <MyResumes key="r" />}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function ProfileCard() {
  const profile = useAppStore((s) => s.profile)!;
  return (
    <div className="rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur">
      <div className="flex items-center gap-3">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold text-primary-foreground"
          style={{ background: "var(--gradient-primary)" }}
        >
          {profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
        </div>
        <div>
          <div className="font-semibold">{profile.name}</div>
          <div className="text-xs text-muted-foreground">{profile.location}</div>
        </div>
      </div>
      <p className="mt-4 line-clamp-3 text-xs text-muted-foreground">{profile.summary}</p>
      <div className="mt-4 flex flex-wrap gap-1">
        {profile.skills.technical.slice(0, 6).map((s) => (
          <span
            key={s}
            className="rounded-full border border-border bg-surface px-2 py-0.5 text-[10px]"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function NavTabs({ tab, onTab }: { tab: Tab; onTab: (t: Tab) => void }) {
  const items: { id: Tab; label: string; icon: typeof Briefcase }[] = [
    { id: "generate", label: "Quick Generate", icon: Wand2 },
    { id: "explore", label: "Career Explorer", icon: Compass },
    { id: "resumes", label: "My Resumes", icon: Files },
  ];
  return (
    <nav className="rounded-2xl border border-border bg-surface/60 p-2 backdrop-blur">
      {items.map((it) => (
        <button
          key={it.id}
          onClick={() => onTab(it.id)}
          className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
            tab === it.id
              ? "bg-surface-elevated text-foreground"
              : "text-muted-foreground hover:bg-surface hover:text-foreground"
          }`}
        >
          <it.icon className="h-4 w-4" />
          {it.label}
        </button>
      ))}
    </nav>
  );
}

function QuickGenerate() {
  const profile = useAppStore((s) => s.profile)!;
  const addResume = useAppStore((s) => s.addResume);
  const navigate = useNavigate();
  const generateFn = useServerFn(generateResume);
  const [jobTarget, setJobTarget] = useState("");
  const [template, setTemplate] = useState<TemplateId>("minimal");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (jobTarget.trim().length < 2) {
      toast.error("Add a job title or description.");
      return;
    }
    setLoading(true);
    try {
      const { resume } = await generateFn({
        data: { profile, jobTarget: jobTarget.trim() },
      });
      const saved: SavedResume = {
        id: crypto.randomUUID(),
        title: resume.title || jobTarget.slice(0, 60),
        jobTarget,
        template,
        data: resume,
        createdAt: Date.now(),
      };
      addResume(saved);
      toast.success("Resume generated");
      navigate({ to: "/resume/$id", params: { id: saved.id } });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to generate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="rounded-2xl border border-border bg-surface/40 p-8"
    >
      <h2 className="font-display text-2xl font-semibold">Quick Generate</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Drop a job title or paste a job description. We'll tailor a resume around it.
      </p>

      <textarea
        value={jobTarget}
        onChange={(e) => setJobTarget(e.target.value)}
        placeholder="e.g. Senior Product Manager at Stripe — or paste the full JD"
        className="mt-6 min-h-[140px] w-full resize-y rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-primary"
      />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Template:</span>
          {(["minimal", "executive"] as TemplateId[]).map((t) => (
            <button
              key={t}
              onClick={() => setTemplate(t)}
              className={`rounded-full border px-3 py-1 text-xs capitalize transition-colors ${
                template === t
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full gradient-bg px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
          {loading ? "Generating…" : "Generate resume"}
        </button>
      </div>

      {loading && (
        <div className="mt-6 space-y-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-3 rounded-full bg-surface shimmer"
              style={{ width: `${85 - i * 12}%` }}
            />
          ))}
        </div>
      )}
    </motion.section>
  );
}

function CareerExplorer() {
  const profile = useAppStore((s) => s.profile)!;
  const suggestFn = useServerFn(suggestCareerPaths);
  const [paths, setPaths] = useState<CareerPath[] | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { paths } = await suggestFn({ data: { profile } });
      setPaths(paths);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!paths && !loading) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold">Career Explorer</h2>
          <p className="text-sm text-muted-foreground">
            Six paths the AI thinks fit you best — click any to generate a resume.
          </p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs hover:bg-surface"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      {loading && !paths && (
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-44 rounded-2xl border border-border bg-surface shimmer" />
          ))}
        </div>
      )}

      {paths && (
        <div className="grid gap-4 sm:grid-cols-2">
          {paths.map((p, i) => (
            <CareerPathCard key={i} path={p} index={i} />
          ))}
        </div>
      )}
    </motion.section>
  );
}

function CareerPathCard({ path, index }: { path: CareerPath; index: number }) {
  const profile = useAppStore((s) => s.profile)!;
  const addResume = useAppStore((s) => s.addResume);
  const navigate = useNavigate();
  const generateFn = useServerFn(generateResume);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const { resume } = await generateFn({
        data: { profile, jobTarget: path.title },
      });
      const saved: SavedResume = {
        id: crypto.randomUUID(),
        title: path.title,
        jobTarget: path.title,
        template: "minimal",
        data: resume,
        createdAt: Date.now(),
      };
      addResume(saved);
      toast.success(`Resume for ${path.title} ready`);
      navigate({ to: "/resume/$id", params: { id: saved.id } });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -3 }}
      onClick={handleClick}
      disabled={loading}
      className="group relative overflow-hidden rounded-2xl border border-border bg-surface/60 p-5 text-left backdrop-blur transition-all hover:border-primary/40"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="font-display text-lg font-semibold">{path.title}</div>
          <div className="mt-0.5 text-xs text-muted-foreground">{path.salaryRange}</div>
        </div>
        <div className="flex flex-col items-end">
          <div className="font-display text-2xl font-semibold gradient-text">
            {path.matchScore}%
          </div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            match
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{path.whyFit}</p>
      <div className="mt-3 flex flex-wrap gap-1">
        {path.skillGaps.slice(0, 3).map((g) => (
          <span
            key={g}
            className="rounded-full bg-warning/15 px-2 py-0.5 text-[10px] text-warning"
          >
            gap: {g}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
        {loading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <TrendingUp className="h-3.5 w-3.5" />
        )}
        {loading ? "Building resume…" : "Generate resume"}
      </div>
    </motion.button>
  );
}

function MyResumes() {
  const resumes = useAppStore((s) => s.resumes);
  const deleteResume = useAppStore((s) => s.deleteResume);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="font-display text-2xl font-semibold">My Resumes</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {resumes.length} saved · all stored locally on your device
      </p>

      {resumes.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-surface/40 p-12 text-center">
          <Briefcase className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            No resumes yet. Head to Quick Generate to create your first.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {resumes.map((r) => (
            <div
              key={r.id}
              className="group relative rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur transition-all hover:border-primary/40"
            >
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                {r.template}
              </div>
              <div className="mt-1 line-clamp-2 font-display text-base font-semibold">
                {r.title}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {new Date(r.createdAt).toLocaleDateString()}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Link
                  to="/resume/$id"
                  params={{ id: r.id }}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full gradient-bg px-3 py-1.5 text-xs font-medium text-primary-foreground"
                >
                  Open <ExternalLink className="h-3 w-3" />
                </Link>
                <button
                  onClick={() => {
                    deleteResume(r.id);
                    toast.success("Deleted");
                  }}
                  className="rounded-full border border-border p-1.5 text-muted-foreground hover:border-destructive hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.section>
  );
}
