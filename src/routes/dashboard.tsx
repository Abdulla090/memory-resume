import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import {
  Briefcase,
  Compass,
  ExternalLink,
  Files,
  Loader2,
  RefreshCw,
  Sparkles,
  Target,
  Trash2,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";
import { generateResume, suggestCareerPaths } from "@/lib/ai.functions";
import { useAppStore } from "@/lib/store";
import type { CareerPath, SavedResume, TemplateId } from "@/lib/types";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — MemoryCV" },
      { name: "description", content: "Generate resumes, explore adjacent roles, and manage saved outputs." },
    ],
  }),
  component: Dashboard,
});

type Tab = "generate" | "explore" | "resumes";

function Dashboard() {
  const navigate = useNavigate();
  const profile = useAppStore((state) => state.profile);
  const resumes = useAppStore((state) => state.resumes);
  const [tab, setTab] = useState<Tab>("generate");

  useEffect(() => {
    if (!profile) navigate({ to: "/onboarding" });
  }, [navigate, profile]);

  if (!profile) return null;

  const firstName = profile.name.split(" ")[0];
  const activeSummary =
    tab === "generate"
      ? "Generate a role-specific resume from the profile you just built."
      : tab === "explore"
        ? "Review adjacent paths and turn any of them into a tailored resume."
        : "Open, revisit, or delete locally saved resume drafts.";

  return (
    <div className="page-shell bg-background text-foreground">
      <header className="saas-nav">
        <div className="app-frame px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2 cursor-pointer" id="nav-logo">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-[1rem] font-bold tracking-tight text-slate-900">MemoryCV</span>
            </Link>

            <div className="hidden items-center gap-2 md:flex">
              <Link to="/templates" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors">
                Templates
              </Link>
              <Link to="/onboarding" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors">
                Re-import
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="app-frame grid gap-6 px-4 pb-16 pt-3 sm:px-6 lg:grid-cols-[320px_1fr] lg:px-8">
        <aside className="grid gap-6 lg:sticky lg:top-6 lg:h-fit">
          <ProfileRail />
          <TabRail activeTab={tab} onTab={setTab} />
        </aside>

        <section className="grid gap-6">
          <div className="surface-panel rounded-[2.25rem] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <div className="eyebrow">Workspace overview</div>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                  {firstName}, keep the resume work sharp and controlled.
                </h1>
                <p className="mt-4 max-w-[56ch] text-base leading-7 text-muted-foreground">
                  {activeSummary}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <StatCard label="Profile skills" value={profile.skills.technical.length + profile.skills.tools.length} note="structured inputs" />
                <StatCard label="Experience items" value={profile.experience.length} note="used for resume generation" />
                <StatCard label="Saved resumes" value={resumes.length} note="stored locally" />
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {tab === "generate" && <QuickGenerate key="generate" />}
            {tab === "explore" && <CareerExplorer key="explore" />}
            {tab === "resumes" && <MyResumes key="resumes" />}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}

function ProfileRail() {
  const profile = useAppStore((state) => state.profile)!;

  return (
    <div className="surface-panel rounded-[2.25rem] p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-[1.3rem] bg-foreground text-base font-semibold text-background">
            {profile.name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <div className="text-xl font-semibold tracking-tight">{profile.name}</div>
            <div className="text-sm text-muted-foreground">{profile.location}</div>
          </div>
        </div>
        <div className="rounded-full bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground">
          profile
        </div>
      </div>

      <p className="mt-5 text-sm leading-6 text-muted-foreground">{profile.summary}</p>

      <div className="hairline-top mt-6 pt-5">
        <div className="eyebrow">Primary skills</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {profile.skills.technical.slice(0, 7).map((skill) => (
            <span key={skill} className="rounded-full bg-secondary px-3 py-1.5 text-xs text-foreground">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabRail({ activeTab, onTab }: { activeTab: Tab; onTab: (tab: Tab) => void }) {
  const items: { id: Tab; label: string; body: string; icon: typeof Wand2 }[] = [
    {
      id: "generate",
      label: "Quick generate",
      body: "Paste a job brief and build a role-specific draft.",
      icon: Wand2,
    },
    {
      id: "explore",
      label: "Career explorer",
      body: "Review role adjacency and signal fit before generating.",
      icon: Compass,
    },
    {
      id: "resumes",
      label: "Saved resumes",
      body: "Open previous versions and keep the library tight.",
      icon: Files,
    },
  ];

  return (
    <div className="surface-panel rounded-[2rem] p-4">
      <div className="eyebrow px-2 pb-3">Workspace modes</div>
      <div className="grid gap-2">
        {items.map((item) => {
          const active = item.id === activeTab;
          return (
            <button
              key={item.id}
              onClick={() => onTab(item.id)}
              className={`rounded-[1.4rem] px-4 py-4 text-left transition-colors ${
                active ? "bg-foreground text-background" : "surface-muted"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 flex h-9 w-9 items-center justify-center rounded-full ${
                    active ? "bg-background/10 text-background" : "bg-background text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{item.label}</div>
                  <p className={`mt-1 text-xs leading-5 ${active ? "text-background/70" : "text-muted-foreground"}`}>
                    {item.body}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function QuickGenerate() {
  const profile = useAppStore((state) => state.profile)!;
  const addResume = useAppStore((state) => state.addResume);
  const apiKey = useAppStore((state) => state.apiKey);
  const navigate = useNavigate();
  const generateFn = useServerFn(generateResume);

  const [jobTarget, setJobTarget] = useState("");
  const [template, setTemplate] = useState<TemplateId>("minimal");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (jobTarget.trim().length < 2) {
      toast.error("Add a job title or a full job description.");
      return;
    }

    setLoading(true);

    try {
      const { resume } = await generateFn({
        data: { apiKey, profile, jobTarget: jobTarget.trim() },
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
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to generate resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="surface-panel rounded-[2.25rem] p-6 sm:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <div className="eyebrow">Generation brief</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Build from a role target, not from a blank page.</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Provide a job title, a hiring brief, or the full job description. The system will
            rewrite the profile into a more relevant resume draft.
          </p>

          <div className="mt-8 grid gap-3">
            {[
              "Keeps the source profile intact",
              "Switches template at generation time",
              "Opens directly into the editor after creation",
            ].map((item, index) => (
              <div key={item} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary font-mono text-xs text-muted-foreground">
                  0{index + 1}
                </div>
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Role target</label>
            <textarea
              value={jobTarget}
              onChange={(event) => setJobTarget(event.target.value)}
              placeholder="Senior product manager, AI platform. Paste the brief or the full job description."
              className="field-input min-h-[220px] resize-y"
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {(["minimal", "executive"] as TemplateId[]).map((item) => (
                <button
                  key={item}
                  onClick={() => setTemplate(item)}
                  className={`rounded-full px-4 py-2 text-sm capitalize transition-colors ${
                    template === item ? "bg-foreground text-background" : "surface-muted"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="primary-button px-6 py-3 text-sm font-medium disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
              {loading ? "Generating draft" : "Generate resume"}
            </button>
          </div>

          {loading && (
            <div className="grid gap-3">
              {[94, 100, 82].map((width, index) => (
                <div key={width} className="surface-muted rounded-[1.2rem] p-4">
                  <div className="shimmer h-3 rounded-full bg-foreground/8" style={{ width: `${width}%`, animationDelay: `${index * 120}ms` }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}

function CareerExplorer() {
  const profile = useAppStore((state) => state.profile)!;
  const apiKey = useAppStore((state) => state.apiKey);
  const suggestFn = useServerFn(suggestCareerPaths);
  const [paths, setPaths] = useState<CareerPath[] | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { paths } = await suggestFn({ data: { apiKey, profile } });
      setPaths(paths);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load career paths.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!paths && !loading) {
      void load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, paths]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="grid gap-5"
    >
      <div className="surface-panel rounded-[2.25rem] p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="eyebrow">Role adjacency</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Explore where this profile can credibly move next.</h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              These paths are generated from the stored profile and can be turned into resume drafts immediately.
            </p>
          </div>

          <button onClick={load} disabled={loading} className="ghost-button px-5 py-3 text-sm text-foreground">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh paths
          </button>
        </div>
      </div>

      {loading && !paths ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="surface-panel h-[240px] rounded-[2rem] p-5">
              <div className="shimmer mt-14 h-4 w-2/3 rounded-full bg-foreground/8" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {paths?.map((path, index) => <CareerPathCard key={`${path.title}-${index}`} path={path} index={index} />)}
        </div>
      )}
    </motion.section>
  );
}

function CareerPathCard({ path, index }: { path: CareerPath; index: number }) {
  const profile = useAppStore((state) => state.profile)!;
  const addResume = useAppStore((state) => state.addResume);
  const apiKey = useAppStore((state) => state.apiKey);
  const navigate = useNavigate();
  const generateFn = useServerFn(generateResume);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const { resume } = await generateFn({
        data: { apiKey, profile, jobTarget: path.title },
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
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to build resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 100, damping: 20 }}
      onClick={handleClick}
      disabled={loading}
      className="surface-panel rounded-[2rem] p-5 text-left transition-transform hover:-translate-y-[1px]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="eyebrow">Potential path</div>
          <div className="mt-3 text-xl font-semibold tracking-tight">{path.title}</div>
          <div className="mt-1 text-sm text-muted-foreground">{path.salaryRange}</div>
        </div>

        <div className="rounded-[1.2rem] bg-secondary px-3 py-2">
          <div className="font-mono text-lg text-foreground">{path.matchScore}%</div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-muted-foreground">{path.whyFit}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {path.skillGaps.slice(0, 3).map((gap) => (
          <span key={gap} className="rounded-full bg-background px-3 py-1.5 text-xs text-muted-foreground">
            gap: {gap}
          </span>
        ))}
      </div>

      <div className="mt-6 inline-flex items-center gap-2 text-sm text-foreground">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Target className="h-4 w-4" />}
        {loading ? "Generating draft" : "Generate resume for this path"}
      </div>
    </motion.button>
  );
}

function MyResumes() {
  const resumes = useAppStore((state) => state.resumes);
  const deleteResume = useAppStore((state) => state.deleteResume);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="grid gap-5"
    >
      <div className="surface-panel rounded-[2.25rem] p-6 sm:p-8">
        <div className="eyebrow">Saved drafts</div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Keep the best versions. Remove the rest.</h2>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          {resumes.length} resume{resumes.length === 1 ? "" : "s"} stored locally in this workspace.
        </p>
      </div>

      {resumes.length === 0 ? (
        <div className="surface-panel rounded-[2.25rem] p-10 text-center">
          <Briefcase className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-4 text-sm text-muted-foreground">
            No resumes saved yet. Generate one from the quick-create workspace first.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {resumes.map((resume) => (
            <div key={resume.id} className="surface-panel rounded-[2rem] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="eyebrow">{resume.template}</div>
                  <div className="mt-2 text-xl font-semibold tracking-tight">{resume.title}</div>
                </div>
                <div className="font-mono text-xs text-muted-foreground">
                  {new Date(resume.createdAt).toLocaleDateString()}
                </div>
              </div>

              <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
                {resume.jobTarget}
              </p>

              <div className="mt-6 flex items-center gap-2">
                <Link
                  to="/resume/$id"
                  params={{ id: resume.id }}
                  className="primary-button flex-1 px-4 py-3 text-sm font-medium"
                >
                  Open editor
                  <ExternalLink className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => {
                    deleteResume(resume.id);
                    toast.success("Deleted");
                  }}
                  className="ghost-button h-11 w-11 text-foreground"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.section>
  );
}

function StatCard({ label, value, note }: { label: string; value: number; note: string }) {
  return (
    <div className="surface-muted rounded-[1.6rem] p-4">
      <div className="eyebrow">{label}</div>
      <div className="mt-4 text-3xl font-semibold tracking-tight">{value}</div>
      <div className="mt-2 text-xs text-muted-foreground">{note}</div>
    </div>
  );
}
