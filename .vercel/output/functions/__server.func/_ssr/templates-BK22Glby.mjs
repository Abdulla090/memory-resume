import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAppStore } from "./router-BTQpAUON.mjs";
import { u as usePDF } from "../_libs/react-pdf__renderer.mjs";
import { e as exportResumeDocx, a as exportResumePDF, G as GetPDFDocument } from "./docx-templates-C26E7ATU.mjs";
import "../_libs/sonner.mjs";
import "../_libs/docx.mjs";
import "../_libs/file-saver.mjs";
import { a as Sparkles, A as ArrowLeft, L as LayoutTemplate, C as CircleCheck, F as FileText, D as Download } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/zustand.mjs";
import "../_libs/react-pdf__font.mjs";
import "../_libs/is-url.mjs";
import "../_libs/fontkit.mjs";
import "../_libs/restructure.mjs";
import "fs";
import "../_libs/swc__helpers.mjs";
import "../_libs/fast-deep-equal.mjs";
import "../_libs/unicode-properties.mjs";
import "../_libs/base64-js.mjs";
import "../_libs/unicode-trie.mjs";
import "../_libs/tiny-inflate.mjs";
import "../_libs/dfa.mjs";
import "../_libs/clone.mjs";
import "../_libs/brotli.mjs";
import "tslib";
import "../_libs/react-pdf__pdfkit.mjs";
import "zlib";
import "../_libs/js-md5.mjs";
import "buffer";
import "../_libs/noble__ciphers.mjs";
import "events";
import "../_libs/linebreak.mjs";
import "../_libs/jay-peg.mjs";
import "../_libs/png-js.mjs";
import "../_libs/react-pdf__render.mjs";
import "../_libs/react-pdf__primitives.mjs";
import "../_libs/react-pdf__fns.mjs";
import "../_libs/abs-svg-path.mjs";
import "../_libs/parse-svg-path.mjs";
import "../_libs/normalize-svg-path.mjs";
import "../_libs/svg-arc-to-cubic-bezier.mjs";
import "../_libs/color-string.mjs";
import "../_libs/color-name.mjs";
import "../_libs/react-pdf__layout.mjs";
import "../_libs/react-pdf__stylesheet.mjs";
import "../_libs/media-engine.mjs";
import "../_libs/hsl-to-hex.mjs";
import "../_libs/hsl-to-rgb-for-reals.mjs";
import "../_libs/postcss-value-parser.mjs";
import "../_libs/react-pdf__textkit.mjs";
import "../_libs/bidi-js.mjs";
import "../_libs/hyphen.mjs";
import "../_libs/yoga-layout.mjs";
import "../_libs/emoji-regex-xs.mjs";
import "../_libs/react-pdf__image.mjs";
import "url";
import "path";
import "../_libs/react-pdf__svg.mjs";
import "../_libs/react-pdf__reconciler.mjs";
import "../_libs/scheduler.mjs";
import "../_libs/object-assign.mjs";
import "./resume-utils-BBQwWAqL.mjs";
const SAMPLE = {
  name: "Maya Okafor",
  title: "Staff Software Engineer",
  email: "maya@example.com",
  phone: "+49 30 1234 5678",
  photoUrl: "https://picsum.photos/seed/maya-okafor-headshot/240/240",
  location: "Berlin, Germany",
  summary: "Staff engineer with 8 years scaling distributed payment systems. Brought a ledger platform to 12M tx/day and cut risk-scoring p99 from 480ms to 65ms. Mentor, speaker, and maintainer.",
  experience: [{
    title: "Staff Software Engineer",
    company: "Klarna",
    duration: "2022 — Present",
    description: "Owns the BNPL risk-scoring service across EU markets.",
    achievements: ["Rewrote risk-scoring hot path in Go, cutting p99 latency from 480ms to 65ms.", "Led architecture review across 4 squads, unblocking a major product launch.", "Founded an internal Rust guild with 30+ active contributors."]
  }, {
    title: "Senior Engineer",
    company: "N26",
    duration: "2019 — 2022",
    description: "Migrated payment ledger from monolith to event-sourced microservices.",
    achievements: ["Architected and shipped an event-sourced ledger handling 12M transactions a day.", "Reduced settlement reconciliation errors by 94% during the first quarter after launch."]
  }],
  projects: [{
    name: "pgPool-rs",
    description: "Open-source Postgres connection pooler written in Rust.",
    tech: ["Rust", "Postgres", "Tokio"],
    impact: "Used by multiple startup engineering teams."
  }],
  education: [{
    degree: "BSc Computer Science",
    institution: "TU Munich",
    year: "2016"
  }],
  skills: ["TypeScript", "Go", "Rust", "Python", "PostgreSQL", "Kafka", "Kubernetes", "AWS"],
  certifications: ["AWS Solutions Architect Professional"]
};
const TEMPLATES = [{
  id: "minimal",
  label: "Minimal",
  desc: "Clean hierarchy",
  category: "Minimal"
}, {
  id: "slate",
  label: "Slate",
  desc: "Swiss precision",
  category: "Minimal"
}, {
  id: "avant",
  label: "Avant",
  desc: "Brutalist lines",
  category: "Minimal"
}, {
  id: "vanguard",
  label: "Vanguard",
  desc: "Massive typography",
  category: "Minimal"
}, {
  id: "executive",
  label: "Executive",
  desc: "Dark sidebar",
  category: "Professional",
  isNew: false
}, {
  id: "apex",
  label: "Apex",
  desc: "Bold top bar",
  category: "Professional"
}, {
  id: "monolith",
  label: "Monolith",
  desc: "Highly structured",
  category: "Professional"
}, {
  id: "metric",
  label: "Metric",
  desc: "Data-driven",
  category: "Professional"
}, {
  id: "carbon",
  label: "Carbon",
  desc: "Charcoal sidebar",
  category: "Professional",
  isNew: true
}, {
  id: "atlas",
  label: "Atlas",
  desc: "Corporate authority",
  category: "Professional",
  isNew: true
}, {
  id: "noir",
  label: "Noir",
  desc: "All-black luxury",
  category: "Creative"
}, {
  id: "cipher",
  label: "Cipher",
  desc: "Dark tech aesthetic",
  category: "Creative"
}, {
  id: "pinnacle",
  label: "Pinnacle",
  desc: "Dark layered layout",
  category: "Creative"
}, {
  id: "nexus",
  label: "Nexus",
  desc: "Timeline SVG nodes",
  category: "Creative"
}, {
  id: "orbit",
  label: "Orbit",
  desc: "Interactive elements",
  category: "Creative"
}, {
  id: "prism",
  label: "Prism",
  desc: "Geometric shapes",
  category: "Creative"
}, {
  id: "forge",
  label: "Forge",
  desc: "Industrial brutalist",
  category: "Minimal",
  isNew: true
}, {
  id: "zenith",
  label: "Zenith",
  desc: "Gold luxury premium",
  category: "Professional",
  isNew: true
}, {
  id: "vector",
  label: "Vector",
  desc: "Dark mode tech",
  category: "Creative",
  isNew: true
}];
function Thumbnail({
  id
}) {
  switch (id) {
    case "executive":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full bg-white rounded-md flex overflow-hidden border border-slate-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-1/3 h-full bg-slate-800 p-1 flex flex-col gap-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1 bg-slate-600 rounded-sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2/3 h-0.5 bg-slate-700 rounded-sm" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-2/3 h-full p-1.5 flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1 bg-slate-200 rounded-sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1 bg-slate-200 rounded-sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3/4 h-1 bg-slate-200 rounded-sm" })
        ] })
      ] });
    case "noir":
    case "cipher":
    case "pinnacle":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full bg-slate-900 rounded-md p-1.5 flex flex-col gap-1 border border-slate-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1/2 h-1.5 bg-slate-500 rounded-sm mx-auto mb-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1 bg-slate-700 rounded-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1 bg-slate-700 rounded-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4/5 h-1 bg-slate-700 rounded-sm" })
      ] });
    case "apex":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full bg-white rounded-md flex flex-col overflow-hidden border border-slate-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-4 bg-slate-800 p-1 flex flex-col justify-center items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1/2 h-1 bg-slate-500 rounded-sm" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-1 flex flex-col gap-1 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1 bg-slate-200 rounded-sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3/4 h-1 bg-slate-200 rounded-sm" })
        ] })
      ] });
    case "nexus":
    case "orbit":
    case "prism":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full bg-slate-50 rounded-md p-1.5 flex flex-col gap-1 border border-slate-200 relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1 right-1 w-3 h-3 rounded-full border border-blue-400 opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1/2 h-1.5 bg-blue-500 rounded-sm mb-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1 bg-slate-200 rounded-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4/5 h-1 bg-slate-200 rounded-sm" })
      ] });
    case "carbon":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full bg-white rounded-md flex overflow-hidden border border-slate-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-full bg-slate-900" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-1/3 h-full bg-slate-100 p-1 flex flex-col gap-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-sm bg-slate-300 mb-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-0.5 bg-slate-400 rounded-sm" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 h-full p-1 flex flex-col gap-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-0.5 bg-slate-200 rounded-sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-0.5 bg-slate-200 rounded-sm" })
        ] })
      ] });
    case "atlas":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full bg-white rounded-md flex flex-col overflow-hidden border border-slate-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-5 bg-slate-900 p-1 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-sm bg-slate-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1/2 h-1 bg-slate-600 rounded-sm" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 p-1 gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-0.5 bg-slate-200 rounded-sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-0.5 bg-slate-200 rounded-sm" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-1/3 flex flex-col gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-0.5 bg-slate-300 rounded-sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-0.5 bg-slate-300 rounded-sm" })
          ] })
        ] })
      ] });
    case "forge":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full bg-white rounded-md p-1.5 flex flex-col gap-1 border border-slate-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full border-b-2 border-slate-900 pb-1 mb-0.5 flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1/3 h-1.5 bg-slate-900 rounded-sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1/4 h-1 bg-slate-400 rounded-sm" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-0.5 h-6 bg-slate-900 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-0.5 bg-slate-200 rounded-sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3/4 h-0.5 bg-slate-200 rounded-sm" })
          ] })
        ] })
      ] });
    case "zenith":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full bg-white rounded-md p-1 flex flex-col items-center gap-1 border border-slate-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 rounded-full bg-slate-200 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1/2 h-1 bg-slate-900 rounded-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1/3 h-0.5 bg-yellow-600 rounded-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-0.5 bg-slate-100 rounded-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-0.5 bg-slate-100 rounded-sm" })
      ] });
    case "vector":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full bg-slate-950 rounded-md flex flex-col overflow-hidden border border-slate-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-slate-900 p-1 border-b border-slate-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1/2 h-1 bg-blue-400 rounded-sm" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 p-1 gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-0.5 bg-slate-700 rounded-sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3/4 h-0.5 bg-slate-700 rounded-sm" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-1/3 flex flex-col gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-0.5 bg-blue-900 rounded-sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-0.5 bg-blue-900 rounded-sm" })
          ] })
        ] })
      ] });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full bg-white rounded-md p-1.5 flex flex-col gap-1 border border-slate-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1/2 h-1.5 bg-slate-300 rounded-sm mb-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1 bg-slate-100 rounded-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1 bg-slate-100 rounded-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3/4 h-1 bg-slate-100 rounded-sm" })
      ] });
  }
}
function TemplatesPage() {
  const profile = useAppStore((state) => state.profile);
  const resumes = useAppStore((state) => state.resumes);
  const data = resumes[0]?.data ?? buildFromProfile(profile) ?? SAMPLE;
  const [active, setActive] = reactExports.useState("minimal");
  const [filter, setFilter] = reactExports.useState("All");
  const filteredTemplates = reactExports.useMemo(() => {
    if (filter === "All") return TEMPLATES;
    return TEMPLATES.filter((t) => t.category === filter);
  }, [filter]);
  const categories = ["All", "Minimal", "Professional", "Creative"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#f8faff] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 relative overflow-hidden flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-300/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-400/10 rounded-full blur-[150px] pointer-events-none mix-blend-multiply" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-blue-100/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1600px] mx-auto px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-16 items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5 cursor-pointer group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-[0_4px_12px_rgba(37,99,235,0.3)] group-hover:shadow-[0_4px_16px_rgba(37,99,235,0.4)] transition-all duration-300 group-hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[1.05rem] font-bold tracking-tight text-slate-900 group-hover:text-blue-950 transition-colors", children: "MemoryCV" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/onboarding", className: "px-4 py-2 text-sm font-medium text-blue-900/70 hover:text-blue-700 bg-white/50 hover:bg-blue-50 border border-transparent hover:border-blue-100 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        "Back"
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 max-w-[1600px] w-full mx-auto grid gap-6 px-4 pb-24 pt-6 sm:px-6 lg:grid-cols-[400px_1fr] xl:grid-cols-[440px_1fr] relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "flex flex-col gap-5 lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/80 backdrop-blur-md rounded-[1.5rem] p-6 border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-wide uppercase mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutTemplate, { className: "w-3.5 h-3.5" }),
            "Template Library"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-extrabold tracking-tight text-slate-900 leading-tight", children: [
            "Curated ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400", children: "Aesthetics" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-slate-600", children: "Select a template to instantly reformat your content." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/60 backdrop-blur-md rounded-[1.5rem] p-4 border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col flex-1 min-h-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 mb-4 pb-1 overflow-x-auto scrollbar-hide shrink-0", children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFilter(cat), className: `px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${filter === cat ? "bg-slate-800 text-white shadow-sm" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"}`, children: cat }, cat)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 overflow-y-auto pr-1 pb-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent", children: filteredTemplates.map(({
            id,
            label,
            isNew
          }) => {
            const isActive = active === id;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActive(id), className: `group relative flex flex-col items-center gap-2 rounded-[1rem] p-2 transition-all duration-300 text-center ${isActive ? "bg-blue-600 shadow-[0_8px_20px_rgba(37,99,235,0.2)] border-transparent scale-[1.02]" : "bg-white hover:bg-blue-50/50 border border-slate-200 hover:border-blue-200 hover:shadow-sm"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full aspect-[1/1.2] rounded-lg overflow-hidden relative shadow-[0_2px_10px_rgba(0,0,0,0.05)] bg-slate-100", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Thumbnail, { id }),
                isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-blue-600/10 flex items-center justify-center backdrop-blur-[1px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-blue-600 drop-shadow-md bg-white rounded-full" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full px-1 flex flex-col items-center mt-1 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm font-bold truncate w-full ${isActive ? "text-white" : "text-slate-900"}`, children: label }) }),
              isNew && !isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 px-2 py-0.5 rounded-full bg-blue-500 text-white text-[9px] font-bold uppercase tracking-wider shadow-sm z-10 border border-white", children: "New" })
            ] }, id);
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "flex flex-col h-full min-h-[800px] lg:h-[calc(100vh-8rem)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 bg-slate-200/50 backdrop-blur-3xl rounded-[2rem] p-4 sm:p-6 border border-slate-300/60 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)] relative flex flex-col overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4 px-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-wider text-slate-700", children: "Live Preview" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExportButtons, { data, template: active, name: data.name }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden rounded-[1rem] shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_30px_60px_-20px_rgba(0,0,0,0.15)] bg-white relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClientPDFPreview, { data, template: active }) })
      ] }) })
    ] })
  ] });
}
function ExportButtons({
  data,
  template,
  name
}) {
  const [pdfLoading, setPdfLoading] = reactExports.useState(false);
  const [docxLoading, setDocxLoading] = reactExports.useState(false);
  const filename = name.replace(/\s+/g, "_") || "resume";
  const handlePDF = async () => {
    setPdfLoading(true);
    try {
      await exportResumePDF(data, template, filename);
    } finally {
      setPdfLoading(false);
    }
  };
  const handleDocx = async () => {
    setDocxLoading(true);
    try {
      await exportResumeDocx(data, template, filename);
    } finally {
      setDocxLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleDocx, disabled: docxLoading, className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white text-xs font-bold tracking-wide text-slate-700 shadow-sm hover:bg-white hover:shadow-md transition-all disabled:opacity-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5" }),
      docxLoading ? "..." : "DOCX"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handlePDF, disabled: pdfLoading, className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 backdrop-blur-md border border-blue-500 text-xs font-bold tracking-wide text-white shadow-sm hover:bg-blue-700 hover:shadow-md transition-all disabled:opacity-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
      pdfLoading ? "..." : "PDF"
    ] })
  ] });
}
function ClientPDFPreview({
  data,
  template
}) {
  const [mounted, setMounted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Loading preview engine..." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PDFLivePreview, { data, template });
}
function PDFLivePreview({
  data,
  template
}) {
  const [instance, updateInstance] = usePDF();
  reactExports.useEffect(() => {
    updateInstance(/* @__PURE__ */ jsxRuntimeExports.jsx(GetPDFDocument, { data, template }));
  }, [data, template, updateInstance]);
  if (instance.loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Rendering vector preview..." })
    ] });
  }
  if (instance.error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 text-red-500 flex h-full items-center justify-center text-center font-medium", children: [
      "Error rendering PDF: ",
      String(instance.error)
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { src: `${instance.url}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`, className: "w-full h-full border-0 bg-white", title: "Resume PDF Preview" });
}
function buildFromProfile(profile) {
  if (!profile) return null;
  return {
    name: profile.name,
    title: profile.experience[0]?.title ?? "Professional",
    email: profile.email,
    phone: profile.phone,
    photoUrl: profile.photoUrl,
    location: profile.location,
    summary: profile.summary,
    experience: profile.experience,
    projects: profile.projects,
    education: profile.education,
    skills: [...profile.skills.technical, ...profile.skills.tools].slice(0, 14),
    certifications: profile.certifications
  };
}
export {
  TemplatesPage as component
};
