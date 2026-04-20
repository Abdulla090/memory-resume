import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { R as ResumePreview } from "./templates-QywX3pCW.mjs";
import { u as useAppStore } from "./router-CGNha9sQ.mjs";
import "../_libs/sonner.mjs";
import { a as Sparkles, A as ArrowLeft, E as Eye } from "../_libs/lucide-react.mjs";
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
function TemplatesPage() {
  const profile = useAppStore((state) => state.profile);
  const resumes = useAppStore((state) => state.resumes);
  const data = resumes[0]?.data ?? buildFromProfile(profile) ?? SAMPLE;
  const [active, setActive] = reactExports.useState("minimal");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-shell bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "saas-nav", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "app-frame px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-16 items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 cursor-pointer", id: "nav-logo", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[1rem] font-bold tracking-tight text-slate-900", children: "MemoryCV" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        "Back to dashboard"
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "app-frame grid gap-6 px-4 pb-16 pt-3 sm:px-6 lg:grid-cols-[320px_1fr] lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "grid gap-6 lg:sticky lg:top-6 lg:h-fit", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-panel rounded-[2.25rem] p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow", children: "Template system" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-4xl font-semibold tracking-tight", children: "Preview the output language before generating." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm leading-6 text-muted-foreground", children: "These previews use either your current profile or a fallback sample so you can inspect layout density, hierarchy, and overall document tone before editing." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-panel rounded-[2rem] p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow px-2 pb-3", children: "Available templates" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2", children: [{
            id: "minimal",
            label: "Minimal",
            desc: "Clean hierarchy, tight editorial rhythm."
          }, {
            id: "executive",
            label: "Executive",
            desc: "Dark sidebar, serif authority, leadership framing."
          }, {
            id: "noir",
            label: "Noir",
            desc: "All-black luxury. Maximum signal, zero noise."
          }, {
            id: "apex",
            label: "Apex",
            desc: "Bold top bar, dual-column, high-impact density."
          }, {
            id: "slate",
            label: "Slate",
            desc: "Swiss precision. Cold, systematic, unforgettable."
          }, {
            id: "cipher",
            label: "Cipher",
            desc: "Dark tech aesthetic with cyan accent. Built for engineers."
          }, {
            id: "monolith",
            label: "Monolith",
            desc: "Monumental structure, highly structured blocks."
          }, {
            id: "pinnacle",
            label: "Pinnacle",
            desc: "Peak performance, dark layered layout."
          }, {
            id: "avant",
            label: "Avant",
            desc: "Avant-garde spacing, brutalist lines."
          }, {
            id: "vanguard",
            label: "Vanguard",
            desc: "Leading edge minimalism, massive typography."
          }, {
            id: "nexus",
            label: "Nexus",
            desc: "Modern timeline, elegant SVG node connections."
          }, {
            id: "orbit",
            label: "Orbit",
            desc: "Sleek radar, circular icons, interactive SVG stars."
          }, {
            id: "metric",
            label: "Metric",
            desc: "Data-driven executive, strictly analytical charts."
          }, {
            id: "prism",
            label: "Prism",
            desc: "Minimalist geometric shapes and sharp accents."
          }].map(({
            id,
            label,
            desc
          }) => {
            const isActive = active === id;
            return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActive(id), className: `rounded-[1.4rem] px-4 py-4 text-left transition-colors ${isActive ? "bg-foreground text-background" : "surface-muted"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-1 text-xs ${isActive ? "text-background/70" : "text-muted-foreground"}`, children: desc })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4 shrink-0" })
            ] }) }, id);
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "surface-panel rounded-[2.25rem] p-4 sm:p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "surface-muted rounded-[1.6rem] p-4 sm:p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-[1rem] shadow-[0_24px_60px_-24px_rgba(15,23,42,0.2)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResumePreview, { data, template: active }) }) }) })
    ] })
  ] });
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
