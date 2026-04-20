import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn, g as generateResume, b as suggestCareerPaths } from "./ai.functions-D2jzvC1D.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useAppStore } from "./router-CGNha9sQ.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import { a as Sparkles, W as WandSparkles, c as Compass, F as Files, L as LoaderCircle, R as RefreshCw, B as Briefcase, d as ExternalLink, T as Trash2, e as Target } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/zod.mjs";
import "../_libs/zustand.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function Dashboard() {
  const navigate = useNavigate();
  const profile = useAppStore((state) => state.profile);
  const resumes = useAppStore((state) => state.resumes);
  const [tab, setTab] = reactExports.useState("generate");
  reactExports.useEffect(() => {
    if (!profile) navigate({
      to: "/onboarding"
    });
  }, [navigate, profile]);
  if (!profile) return null;
  const firstName = profile.name.split(" ")[0];
  const activeSummary = tab === "generate" ? "Generate a role-specific resume from the profile you just built." : tab === "explore" ? "Review adjacent paths and turn any of them into a tailored resume." : "Open, revisit, or delete locally saved resume drafts.";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-shell bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "saas-nav", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "app-frame px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-16 items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 cursor-pointer", id: "nav-logo", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[1rem] font-bold tracking-tight text-slate-900", children: "MemoryCV" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden items-center gap-2 md:flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/templates", className: "px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors", children: "Templates" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/onboarding", className: "px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors", children: "Re-import" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "app-frame grid gap-6 px-4 pb-16 pt-3 sm:px-6 lg:grid-cols-[320px_1fr] lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "grid gap-6 lg:sticky lg:top-6 lg:h-fit", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileRail, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabRail, { activeTab: tab, onTab: setTab })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "surface-panel rounded-[2.25rem] p-6 sm:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[0.95fr_1.05fr]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow", children: "Workspace overview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 text-4xl font-semibold tracking-tight sm:text-5xl", children: [
              firstName,
              ", keep the resume work sharp and controlled."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-[56ch] text-base leading-7 text-muted-foreground", children: activeSummary })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Profile skills", value: profile.skills.technical.length + profile.skills.tools.length, note: "structured inputs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Experience items", value: profile.experience.length, note: "used for resume generation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Saved resumes", value: resumes.length, note: "stored locally" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
          tab === "generate" && /* @__PURE__ */ jsxRuntimeExports.jsx(QuickGenerate, {}, "generate"),
          tab === "explore" && /* @__PURE__ */ jsxRuntimeExports.jsx(CareerExplorer, {}, "explore"),
          tab === "resumes" && /* @__PURE__ */ jsxRuntimeExports.jsx(MyResumes, {}, "resumes")
        ] })
      ] })
    ] })
  ] });
}
function ProfileRail() {
  const profile = useAppStore((state) => state.profile);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-panel rounded-[2.25rem] p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-[1.3rem] bg-foreground text-base font-semibold text-background", children: profile.name.split(" ").map((part) => part[0]).join("").slice(0, 2) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-semibold tracking-tight", children: profile.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: profile.location })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground", children: "profile" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-sm leading-6 text-muted-foreground", children: profile.summary }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hairline-top mt-6 pt-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow", children: "Primary skills" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: profile.skills.technical.slice(0, 7).map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-secondary px-3 py-1.5 text-xs text-foreground", children: skill }, skill)) })
    ] })
  ] });
}
function TabRail({
  activeTab,
  onTab
}) {
  const items = [{
    id: "generate",
    label: "Quick generate",
    body: "Paste a job brief and build a role-specific draft.",
    icon: WandSparkles
  }, {
    id: "explore",
    label: "Career explorer",
    body: "Review role adjacency and signal fit before generating.",
    icon: Compass
  }, {
    id: "resumes",
    label: "Saved resumes",
    body: "Open previous versions and keep the library tight.",
    icon: Files
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-panel rounded-[2rem] p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow px-2 pb-3", children: "Workspace modes" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2", children: items.map((item) => {
      const active = item.id === activeTab;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onTab(item.id), className: `rounded-[1.4rem] px-4 py-4 text-left transition-colors ${active ? "bg-foreground text-background" : "surface-muted"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-0.5 flex h-9 w-9 items-center justify-center rounded-full ${active ? "bg-background/10 text-background" : "bg-background text-foreground"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: item.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-1 text-xs leading-5 ${active ? "text-background/70" : "text-muted-foreground"}`, children: item.body })
        ] })
      ] }) }, item.id);
    }) })
  ] });
}
function QuickGenerate() {
  const profile = useAppStore((state) => state.profile);
  const addResume = useAppStore((state) => state.addResume);
  const apiKey = useAppStore((state) => state.apiKey);
  const navigate = useNavigate();
  const generateFn = useServerFn(generateResume);
  const [jobTarget, setJobTarget] = reactExports.useState("");
  const [template, setTemplate] = reactExports.useState("minimal");
  const [loading, setLoading] = reactExports.useState(false);
  const handleGenerate = async () => {
    if (jobTarget.trim().length < 2) {
      toast.error("Add a job title or a full job description.");
      return;
    }
    setLoading(true);
    try {
      const {
        resume
      } = await generateFn({
        data: {
          apiKey,
          profile,
          jobTarget: jobTarget.trim()
        }
      });
      const saved = {
        id: crypto.randomUUID(),
        title: resume.title || jobTarget.slice(0, 60),
        jobTarget,
        template,
        data: resume,
        createdAt: Date.now()
      };
      addResume(saved);
      toast.success("Resume generated");
      navigate({
        to: "/resume/$id",
        params: {
          id: saved.id
        }
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to generate resume.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.section, { initial: {
    opacity: 0,
    y: 10
  }, animate: {
    opacity: 1,
    y: 0
  }, exit: {
    opacity: 0
  }, className: "surface-panel rounded-[2.25rem] p-6 sm:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-[0.78fr_1.22fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow", children: "Generation brief" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-3xl font-semibold tracking-tight", children: "Build from a role target, not from a blank page." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base leading-7 text-muted-foreground", children: "Provide a job title, a hiring brief, or the full job description. The system will rewrite the profile into a more relevant resume draft." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-3", children: ["Keeps the source profile intact", "Switches template at generation time", "Opens directly into the editor after creation"].map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-secondary font-mono text-xs text-muted-foreground", children: [
          "0",
          index + 1
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: item })
      ] }, item)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-medium text-foreground", children: "Role target" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: jobTarget, onChange: (event) => setJobTarget(event.target.value), placeholder: "Senior product manager, AI platform. Paste the brief or the full job description.", className: "field-input min-h-[220px] resize-y" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ["minimal", "executive"].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTemplate(item), className: `rounded-full px-4 py-2 text-sm capitalize transition-colors ${template === item ? "bg-foreground text-background" : "surface-muted"}`, children: item }, item)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleGenerate, disabled: loading, className: "primary-button px-6 py-3 text-sm font-medium disabled:opacity-50", children: [
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "h-4 w-4" }),
          loading ? "Generating draft" : "Generate resume"
        ] })
      ] }),
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: [94, 100, 82].map((width, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "surface-muted rounded-[1.2rem] p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-3 rounded-full bg-foreground/8", style: {
        width: `${width}%`,
        animationDelay: `${index * 120}ms`
      } }) }, width)) })
    ] })
  ] }) });
}
function CareerExplorer() {
  const profile = useAppStore((state) => state.profile);
  const apiKey = useAppStore((state) => state.apiKey);
  const suggestFn = useServerFn(suggestCareerPaths);
  const [paths, setPaths] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const load = async () => {
    setLoading(true);
    try {
      const {
        paths: paths2
      } = await suggestFn({
        data: {
          apiKey,
          profile
        }
      });
      setPaths(paths2);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load career paths.");
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    if (!paths && !loading) {
      void load();
    }
  }, [loading, paths]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.section, { initial: {
    opacity: 0,
    y: 10
  }, animate: {
    opacity: 1,
    y: 0
  }, exit: {
    opacity: 0
  }, className: "grid gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "surface-panel rounded-[2.25rem] p-6 sm:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow", children: "Role adjacency" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-3xl font-semibold tracking-tight", children: "Explore where this profile can credibly move next." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-base leading-7 text-muted-foreground", children: "These paths are generated from the stored profile and can be turned into resume drafts immediately." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: load, disabled: loading, className: "ghost-button px-5 py-3 text-sm text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `h-4 w-4 ${loading ? "animate-spin" : ""}` }),
        "Refresh paths"
      ] })
    ] }) }),
    loading && !paths ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3", children: Array.from({
      length: 6
    }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "surface-panel h-[240px] rounded-[2rem] p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer mt-14 h-4 w-2/3 rounded-full bg-foreground/8" }) }, index)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3", children: paths?.map((path, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(CareerPathCard, { path, index }, `${path.title}-${index}`)) })
  ] });
}
function CareerPathCard({
  path,
  index
}) {
  const profile = useAppStore((state) => state.profile);
  const addResume = useAppStore((state) => state.addResume);
  const apiKey = useAppStore((state) => state.apiKey);
  const navigate = useNavigate();
  const generateFn = useServerFn(generateResume);
  const [loading, setLoading] = reactExports.useState(false);
  const handleClick = async () => {
    setLoading(true);
    try {
      const {
        resume
      } = await generateFn({
        data: {
          apiKey,
          profile,
          jobTarget: path.title
        }
      });
      const saved = {
        id: crypto.randomUUID(),
        title: path.title,
        jobTarget: path.title,
        template: "minimal",
        data: resume,
        createdAt: Date.now()
      };
      addResume(saved);
      toast.success(`Resume for ${path.title} ready`);
      navigate({
        to: "/resume/$id",
        params: {
          id: saved.id
        }
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to build resume.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.button, { initial: {
    opacity: 0,
    y: 12
  }, animate: {
    opacity: 1,
    y: 0
  }, transition: {
    delay: index * 0.05,
    type: "spring",
    stiffness: 100,
    damping: 20
  }, onClick: handleClick, disabled: loading, className: "surface-panel rounded-[2rem] p-5 text-left transition-transform hover:-translate-y-[1px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow", children: "Potential path" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-xl font-semibold tracking-tight", children: path.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-muted-foreground", children: path.salaryRange })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-[1.2rem] bg-secondary px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-lg text-foreground", children: [
        path.matchScore,
        "%"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm leading-6 text-muted-foreground", children: path.whyFit }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex flex-wrap gap-2", children: path.skillGaps.slice(0, 3).map((gap) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-background px-3 py-1.5 text-xs text-muted-foreground", children: [
      "gap: ",
      gap
    ] }, gap)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 inline-flex items-center gap-2 text-sm text-foreground", children: [
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-4 w-4" }),
      loading ? "Generating draft" : "Generate resume for this path"
    ] })
  ] });
}
function MyResumes() {
  const resumes = useAppStore((state) => state.resumes);
  const deleteResume = useAppStore((state) => state.deleteResume);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.section, { initial: {
    opacity: 0,
    y: 10
  }, animate: {
    opacity: 1,
    y: 0
  }, exit: {
    opacity: 0
  }, className: "grid gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-panel rounded-[2.25rem] p-6 sm:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow", children: "Saved drafts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-3xl font-semibold tracking-tight", children: "Keep the best versions. Remove the rest." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-base leading-7 text-muted-foreground", children: [
        resumes.length,
        " resume",
        resumes.length === 1 ? "" : "s",
        " stored locally in this workspace."
      ] })
    ] }),
    resumes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-panel rounded-[2.25rem] p-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "mx-auto h-10 w-10 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "No resumes saved yet. Generate one from the quick-create workspace first." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3", children: resumes.map((resume) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-panel rounded-[2rem] p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow", children: resume.template }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xl font-semibold tracking-tight", children: resume.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs text-muted-foreground", children: new Date(resume.createdAt).toLocaleDateString() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground", children: resume.jobTarget }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/resume/$id", params: {
          id: resume.id
        }, className: "primary-button flex-1 px-4 py-3 text-sm font-medium", children: [
          "Open editor",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          deleteResume(resume.id);
          toast.success("Deleted");
        }, className: "ghost-button h-11 w-11 text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
      ] })
    ] }, resume.id)) })
  ] });
}
function StatCard({
  label,
  value,
  note
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-muted rounded-[1.6rem] p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-3xl font-semibold tracking-tight", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xs text-muted-foreground", children: note })
  ] });
}
export {
  Dashboard as component
};
