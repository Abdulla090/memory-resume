import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { c as createRouter, u as useRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, H as HeadContent, S as Scripts, O as Outlet, L as Link } from "../_libs/tanstack__react-router.mjs";
import { T as Toaster, t as toast } from "../_libs/sonner.mjs";
import { c as create, p as persist, a as createJSONStorage } from "../_libs/zustand.mjs";
import { K as Key, S as Settings } from "../_libs/lucide-react.mjs";
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
const useAppStore = create()(
  persist(
    (set) => ({
      profile: null,
      resumes: [],
      preferences: { defaultTemplate: "minimal" },
      apiKey: "AIzaSyC31fuY4cGzHyTrCaP3yMe9NJoPrqkXXJo",
      setProfile: (profile) => set({ profile }),
      addResume: (resume) => set((s) => ({ resumes: [resume, ...s.resumes] })),
      updateResume: (id, patch) => set((s) => ({
        resumes: s.resumes.map((r) => r.id === id ? { ...r, ...patch } : r)
      })),
      deleteResume: (id) => set((s) => ({ resumes: s.resumes.filter((r) => r.id !== id) })),
      setDefaultTemplate: (t) => set((s) => ({ preferences: { ...s.preferences, defaultTemplate: t } })),
      setApiKey: (key) => set({ apiKey: key }),
      reset: () => set({ profile: null, resumes: [] })
    }),
    {
      name: "memorycv-store",
      storage: createJSONStorage(
        () => typeof window !== "undefined" ? window.localStorage : void 0
      )
    }
  )
);
const appCss = "/assets/styles-CLk1aX_S.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md gradient-bg px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90",
        children: "Go home"
      }
    ) })
  ] }) });
}
const Route$e = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MemoryCV — Your memory. Your career. Infinite resumes." },
      {
        name: "description",
        content: "Paste your AI memory from ChatGPT, Claude, or Gemini. Get tailored resumes for any job in seconds."
      },
      { name: "author", content: "MemoryCV" },
      { property: "og:title", content: "MemoryCV — Infinite resumes from your AI memory" },
      {
        property: "og:description",
        content: "Turn your AI assistant memory into job-winning resumes. Tailored for any role in seconds."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=Nunito:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function ApiKeySettings() {
  const [open, setOpen] = reactExports.useState(false);
  const { apiKey, setApiKey } = useAppStore();
  const [tempKey, setTempKey] = reactExports.useState(apiKey || "");
  reactExports.useEffect(() => {
    setTempKey(apiKey || "");
  }, [apiKey, open]);
  const handleSave = () => {
    setApiKey(tempKey);
    setOpen(false);
    if (tempKey) {
      toast.success("API Key saved");
    } else {
      toast.info("API Key cleared");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setOpen(true),
        className: "fixed bottom-4 left-4 z-50 p-3 bg-white border border-blue-100 rounded-full shadow-lg text-blue-600 hover:bg-blue-50 transition-colors",
        title: "Set Gemini API Key",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "w-5 h-5" })
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-blue-100 shadow-2xl w-full max-w-sm p-6 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setOpen(false),
          className: "absolute top-4 right-4 text-slate-400 hover:text-slate-600",
          "aria-label": "Close",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800", children: "Gemini API Key" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Provide your own key for AI" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-600 mb-4 leading-relaxed", children: "To use the Gemini 3.1 Flash Lite model, enter your Google Gemini API key. This key is stored locally in your browser and is never sent to our servers." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "password",
          placeholder: "AIzaSy...",
          value: tempKey,
          onChange: (e) => setTempKey(e.target.value),
          className: "w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setOpen(false),
            className: "px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleSave,
            className: "px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm shadow-blue-200",
            children: "Save Key"
          }
        )
      ] })
    ] }) })
  ] });
}
function RootComponent() {
  reactExports.useEffect(() => {
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ApiKeySettings, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Toaster,
      {
        theme: "light",
        position: "bottom-right",
        toastOptions: {
          style: {
            background: "oklch(0.985 0.004 95)",
            border: "1px solid oklch(0.89 0.008 95)",
            color: "oklch(0.23 0.02 228)",
            boxShadow: "0 20px 40px -24px rgba(18, 24, 38, 0.18)"
          }
        }
      }
    )
  ] });
}
const $$splitComponentImporter$d = () => import("./templates-hu6SSHWI.mjs");
const Route$d = createFileRoute("/templates")({
  head: () => ({
    meta: [{
      title: "Templates — MemoryCV"
    }, {
      name: "description",
      content: "Preview the resume templates available inside the MemoryCV editor."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./onboarding-CO2kzYXH.mjs");
const Route$c = createFileRoute("/onboarding")({
  head: () => ({
    meta: [{
      title: "MemoryCV — Builder"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./dashboard-CG-8ts_n.mjs");
const Route$b = createFileRoute("/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./index-tom-l8ps.mjs");
const Route$a = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "MemoryCV — Turn memory into a professional resume"
    }, {
      name: "description",
      content: "Import AI memory, extract a structured profile, tailor resumes for specific roles, and export polished documents in minutes."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const LeftCardSVG = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 240 320", className: "w-full h-auto", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "left-header-gradient", x1: "0", y1: "0", x2: "240", y2: "80", gradientUnits: "userSpaceOnUse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { stopColor: "#2563eb" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "1", stopColor: "#3b82f6" })
  ] }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "240", height: "320", rx: "16", fill: "#ffffff" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "0.5", y: "0.5", width: "239", height: "319", rx: "15.5", fill: "none", stroke: "#e2e8f0" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 16C0 7.16344 7.16344 0 16 0H224C232.837 0 240 7.16344 240 16V80H0V16Z", fill: "url(#left-header-gradient)" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "48", cy: "40", r: "24", fill: "white", fillOpacity: "0.2" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "48", cy: "40", r: "20", fill: "white" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M48 34C44.6863 34 42 36.6863 42 40C42 43.3137 44.6863 46 48 46C51.3137 46 54 43.3137 54 40C54 36.6863 51.3137 34 48 34ZM38 40C38 34.4772 42.4772 30 48 30C53.5228 30 58 34.4772 58 40C58 45.5228 53.5228 50 48 50C42.4772 50 38 45.5228 38 40Z", fill: "#2563eb" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "84", y: "36", fill: "white", fontSize: "16", fontWeight: "bold", fontFamily: "system-ui, sans-serif", children: "Sarah Chen" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "84", y: "52", fill: "#bfdbfe", fontSize: "11", fontFamily: "system-ui, sans-serif", children: "Senior UX Designer" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "24", y: "110", fill: "#2563eb", fontSize: "9", fontWeight: "bold", letterSpacing: "1", fontFamily: "system-ui, sans-serif", children: "PROFESSIONAL EXPERIENCE" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "24", y: "124", width: "2", height: "24", fill: "#3b82f6" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "34", y: "132", fill: "#0f172a", fontSize: "12", fontWeight: "bold", fontFamily: "system-ui, sans-serif", children: "Google" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "216", y: "132", fill: "#64748b", fontSize: "9", textAnchor: "end", fontFamily: "system-ui, sans-serif", children: "2021 – Present" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "34", y: "146", fill: "#475569", fontSize: "10", fontFamily: "system-ui, sans-serif", children: "Senior Product Designer" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "24", y: "164", width: "2", height: "24", fill: "#cbd5e1" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "34", y: "172", fill: "#0f172a", fontSize: "12", fontWeight: "bold", fontFamily: "system-ui, sans-serif", children: "Figma" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "216", y: "172", fill: "#64748b", fontSize: "9", textAnchor: "end", fontFamily: "system-ui, sans-serif", children: "2019 – 2021" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "34", y: "186", fill: "#475569", fontSize: "10", fontFamily: "system-ui, sans-serif", children: "UX Lead" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "24", y: "224", fill: "#2563eb", fontSize: "9", fontWeight: "bold", letterSpacing: "1", fontFamily: "system-ui, sans-serif", children: "CORE SKILLS" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "24", y: "234", width: "56", height: "20", rx: "10", fill: "#eff6ff" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "52", y: "247", fill: "#1d4ed8", fontSize: "9", fontWeight: "600", textAnchor: "middle", fontFamily: "system-ui, sans-serif", children: "UI Design" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "84", y: "234", width: "60", height: "20", rx: "10", fill: "#eff6ff" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "114", y: "247", fill: "#1d4ed8", fontSize: "9", fontWeight: "600", textAnchor: "middle", fontFamily: "system-ui, sans-serif", children: "Prototyping" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "148", y: "234", width: "68", height: "20", rx: "10", fill: "#eff6ff" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "182", y: "247", fill: "#1d4ed8", fontSize: "9", fontWeight: "600", textAnchor: "middle", fontFamily: "system-ui, sans-serif", children: "User Testing" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 286 L216 286", stroke: "#f1f5f9", strokeWidth: "6", strokeLinecap: "round" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 286 L170 286", stroke: "#3b82f6", strokeWidth: "6", strokeLinecap: "round" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "24", y: "274", fill: "#64748b", fontSize: "8", fontFamily: "system-ui, sans-serif", children: "Profile Extraction Complete" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "216", y: "274", fill: "#2563eb", fontSize: "9", fontWeight: "bold", textAnchor: "end", fontFamily: "system-ui, sans-serif", children: "100%" })
] });
const CenterCardSVG = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 280 400", className: "w-full h-auto", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "280", height: "400", rx: "8", fill: "#ffffff" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "0.5", y: "0.5", width: "279", height: "399", rx: "7.5", fill: "none", stroke: "#e2e8f0" }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { transform: "translate(190, 10)", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "80", height: "24", rx: "12", fill: "#eff6ff", stroke: "#bfdbfe" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "40", y: "26", fill: "#1d4ed8", fontSize: "9", fontWeight: "bold", textAnchor: "middle", fontFamily: "system-ui, sans-serif", transform: "translate(0, -9)", children: "AI GENERATED" })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "140", y: "56", fill: "#0f172a", fontSize: "18", fontWeight: "bold", textAnchor: "middle", fontFamily: "system-ui, sans-serif", children: "ALEXANDRA SMITH" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "140", y: "68", fill: "#64748b", fontSize: "8", textAnchor: "middle", fontFamily: "system-ui, sans-serif", children: "New York, NY • alexandra@email.com • (555) 123-4567" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20 80 L260 80", stroke: "#f1f5f9", strokeWidth: "1" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "96", fill: "#2563eb", fontSize: "10", fontWeight: "bold", fontFamily: "system-ui, sans-serif", children: "PROFESSIONAL SUMMARY" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "110", fill: "#475569", fontSize: "7", fontFamily: "system-ui, sans-serif", children: "Results-driven Senior Engineer with 8+ years of experience in scalable web" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "120", fill: "#475569", fontSize: "7", fontFamily: "system-ui, sans-serif", children: "architecture and cloud-native applications. Proven track record of leading" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "130", fill: "#475569", fontSize: "7", fontFamily: "system-ui, sans-serif", children: "cross-functional teams to deliver enterprise-grade solutions." }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "156", fill: "#2563eb", fontSize: "10", fontWeight: "bold", fontFamily: "system-ui, sans-serif", children: "EXPERIENCE" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "172", fill: "#0f172a", fontSize: "9", fontWeight: "bold", fontFamily: "system-ui, sans-serif", children: "TechCorp Industries" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "260", y: "172", fill: "#0f172a", fontSize: "8", fontWeight: "bold", textAnchor: "end", fontFamily: "system-ui, sans-serif", children: "2020 - Present" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "182", fill: "#64748b", fontSize: "8", fontStyle: "italic", fontFamily: "system-ui, sans-serif", children: "Senior Software Engineer" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "26", cy: "194", r: "1.5", fill: "#3b82f6" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "32", y: "196", fill: "#475569", fontSize: "7", fontFamily: "system-ui, sans-serif", children: "Architected microservices migrating 2M+ users with 99.99% uptime." }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "26", cy: "206", r: "1.5", fill: "#3b82f6" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "32", y: "208", fill: "#475569", fontSize: "7", fontFamily: "system-ui, sans-serif", children: "Reduced AWS infrastructure costs by 30% through resource optimization." }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "230", fill: "#0f172a", fontSize: "9", fontWeight: "bold", fontFamily: "system-ui, sans-serif", children: "Innovate Software" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "260", y: "230", fill: "#0f172a", fontSize: "8", fontWeight: "bold", textAnchor: "end", fontFamily: "system-ui, sans-serif", children: "2016 - 2020" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "240", fill: "#64748b", fontSize: "8", fontStyle: "italic", fontFamily: "system-ui, sans-serif", children: "Software Engineer" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "26", cy: "252", r: "1.5", fill: "#3b82f6" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "32", y: "254", fill: "#475569", fontSize: "7", fontFamily: "system-ui, sans-serif", children: "Developed RESTful APIs serving 50M+ requests monthly." }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "26", cy: "264", r: "1.5", fill: "#3b82f6" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "32", y: "266", fill: "#475569", fontSize: "7", fontFamily: "system-ui, sans-serif", children: "Mentored 4 junior developers and established CI/CD best practices." }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "296", fill: "#2563eb", fontSize: "10", fontWeight: "bold", fontFamily: "system-ui, sans-serif", children: "EDUCATION" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "312", fill: "#0f172a", fontSize: "9", fontWeight: "bold", fontFamily: "system-ui, sans-serif", children: "University of Technology" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "260", y: "312", fill: "#0f172a", fontSize: "8", fontWeight: "bold", textAnchor: "end", fontFamily: "system-ui, sans-serif", children: "2012 - 2016" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "322", fill: "#64748b", fontSize: "8", fontStyle: "italic", fontFamily: "system-ui, sans-serif", children: "Bachelor of Science in Computer Science" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "352", fill: "#2563eb", fontSize: "10", fontWeight: "bold", fontFamily: "system-ui, sans-serif", children: "TECHNICAL SKILLS" }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("text", { x: "20", y: "368", fill: "#475569", fontSize: "7", fontFamily: "system-ui, sans-serif", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("tspan", { fontWeight: "bold", fill: "#0f172a", children: "Languages:" }),
    " JavaScript, TypeScript, Python, Java, Go"
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("text", { x: "20", y: "380", fill: "#475569", fontSize: "7", fontFamily: "system-ui, sans-serif", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("tspan", { fontWeight: "bold", fill: "#0f172a", children: "Frameworks:" }),
    " React, Node.js, Express, Django, Next.js"
  ] })
] });
const RightCardSVG = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 240 320", className: "w-full h-auto", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "right-header-gradient", x1: "0", y1: "0", x2: "240", y2: "100", gradientUnits: "userSpaceOnUse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { stopColor: "#1e3a8a" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "1", stopColor: "#1e40af" })
  ] }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "240", height: "320", rx: "16", fill: "#ffffff" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "0.5", y: "0.5", width: "239", height: "319", rx: "15.5", fill: "none", stroke: "#e2e8f0" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 16C0 7.16344 7.16344 0 16 0H224C232.837 0 240 7.16344 240 16V100H0V16Z", fill: "url(#right-header-gradient)" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "24", y: "36", fill: "#93c5fd", fontSize: "10", fontWeight: "bold", letterSpacing: "1", fontFamily: "system-ui, sans-serif", children: "TARGET ROLE MATCH" }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("text", { x: "24", y: "76", fill: "white", fontSize: "42", fontWeight: "900", fontFamily: "system-ui, sans-serif", children: [
    "96",
    /* @__PURE__ */ jsxRuntimeExports.jsx("tspan", { fontSize: "24", fill: "#93c5fd", children: "%" })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "24", y: "124", width: "24", height: "24", rx: "6", fill: "#dcfce7" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M30 136L34 140L42 130", stroke: "#16a34a", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "56", y: "136", fill: "#0f172a", fontSize: "12", fontWeight: "bold", fontFamily: "system-ui, sans-serif", children: "Strong Match" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "56", y: "148", fill: "#64748b", fontSize: "9", fontFamily: "system-ui, sans-serif", children: "Ready to apply for Senior Dev" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "24", y: "184", fill: "#2563eb", fontSize: "9", fontWeight: "bold", letterSpacing: "1", fontFamily: "system-ui, sans-serif", children: "MATCH BREAKDOWN" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "24", y: "206", fill: "#334155", fontSize: "10", fontWeight: "600", fontFamily: "system-ui, sans-serif", children: "Required Skills" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "216", y: "206", fill: "#0f172a", fontSize: "10", fontWeight: "bold", textAnchor: "end", fontFamily: "system-ui, sans-serif", children: "100%" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 216 L216 216", stroke: "#f1f5f9", strokeWidth: "6", strokeLinecap: "round" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 216 L216 216", stroke: "#16a34a", strokeWidth: "6", strokeLinecap: "round" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "24", y: "238", fill: "#334155", fontSize: "10", fontWeight: "600", fontFamily: "system-ui, sans-serif", children: "Experience Level" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "216", y: "238", fill: "#0f172a", fontSize: "10", fontWeight: "bold", textAnchor: "end", fontFamily: "system-ui, sans-serif", children: "90%" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 248 L216 248", stroke: "#f1f5f9", strokeWidth: "6", strokeLinecap: "round" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 248 L196 248", stroke: "#2563eb", strokeWidth: "6", strokeLinecap: "round" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "24", y: "270", fill: "#334155", fontSize: "10", fontWeight: "600", fontFamily: "system-ui, sans-serif", children: "Keywords" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "216", y: "270", fill: "#0f172a", fontSize: "10", fontWeight: "bold", textAnchor: "end", fontFamily: "system-ui, sans-serif", children: "85%" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 280 L216 280", stroke: "#f1f5f9", strokeWidth: "6", strokeLinecap: "round" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 280 L180 280", stroke: "#f59e0b", strokeWidth: "6", strokeLinecap: "round" })
] });
const $$splitComponentImporter$9 = () => import("./dashboard.index-DL5IrGql.mjs");
const Route$9 = createFileRoute("/dashboard/")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./resume._id-B4A1FXLr.mjs");
const Route$8 = createFileRoute("/resume/$id")({
  head: () => ({
    meta: [{
      title: "Resume Editor — MemoryCV"
    }, {
      name: "description",
      content: "Edit, tailor, and export a resume generated from your memory profile."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./dashboard.settings-LUFzaFU9.mjs");
const Route$7 = createFileRoute("/dashboard/settings")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./dashboard.my-cvs-Bo6NgQLZ.mjs");
const Route$6 = createFileRoute("/dashboard/my-cvs")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./dashboard.job-tracker-niTm2bok.mjs");
const Route$5 = createFileRoute("/dashboard/job-tracker")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./dashboard.cover-letters-DeKemHWE.mjs");
const Route$4 = createFileRoute("/dashboard/cover-letters")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./dashboard.analytics-D978Sh8C.mjs");
const Route$3 = createFileRoute("/dashboard/analytics")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./dashboard.ai-writer-BWp7g0kP.mjs");
const Route$2 = createFileRoute("/dashboard/ai-writer")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./dashboard.ai-optimize-Dj11SRbb.mjs");
const Route$1 = createFileRoute("/dashboard/ai-optimize")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./resume.-Ca9zpXIc.mjs");
const Route = createFileRoute("/resume/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TemplatesRoute = Route$d.update({
  id: "/templates",
  path: "/templates",
  getParentRoute: () => Route$e
});
const OnboardingRoute = Route$c.update({
  id: "/onboarding",
  path: "/onboarding",
  getParentRoute: () => Route$e
});
const DashboardRoute = Route$b.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$e
});
const IndexRoute = Route$a.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$e
});
const DashboardIndexRoute = Route$9.update({
  id: "/",
  path: "/",
  getParentRoute: () => DashboardRoute
});
const ResumeIdRoute = Route$8.update({
  id: "/resume/$id",
  path: "/resume/$id",
  getParentRoute: () => Route$e
});
const DashboardSettingsRoute = Route$7.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => DashboardRoute
});
const DashboardMyCvsRoute = Route$6.update({
  id: "/my-cvs",
  path: "/my-cvs",
  getParentRoute: () => DashboardRoute
});
const DashboardJobTrackerRoute = Route$5.update({
  id: "/job-tracker",
  path: "/job-tracker",
  getParentRoute: () => DashboardRoute
});
const DashboardCoverLettersRoute = Route$4.update({
  id: "/cover-letters",
  path: "/cover-letters",
  getParentRoute: () => DashboardRoute
});
const DashboardAnalyticsRoute = Route$3.update({
  id: "/analytics",
  path: "/analytics",
  getParentRoute: () => DashboardRoute
});
const DashboardAiWriterRoute = Route$2.update({
  id: "/ai-writer",
  path: "/ai-writer",
  getParentRoute: () => DashboardRoute
});
const DashboardAiOptimizeRoute = Route$1.update({
  id: "/ai-optimize",
  path: "/ai-optimize",
  getParentRoute: () => DashboardRoute
});
const ResumeRoute = Route.update({
  id: "/resume/",
  path: "/resume/",
  getParentRoute: () => Route$e
});
const DashboardRouteChildren = {
  DashboardAiOptimizeRoute,
  DashboardAiWriterRoute,
  DashboardAnalyticsRoute,
  DashboardCoverLettersRoute,
  DashboardJobTrackerRoute,
  DashboardMyCvsRoute,
  DashboardSettingsRoute,
  DashboardIndexRoute
};
const DashboardRouteWithChildren = DashboardRoute._addFileChildren(
  DashboardRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  DashboardRoute: DashboardRouteWithChildren,
  OnboardingRoute,
  TemplatesRoute,
  ResumeRoute,
  ResumeIdRoute
};
const routeTree = Route$e._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  CenterCardSVG as C,
  LeftCardSVG as L,
  RightCardSVG as R,
  Route$8 as a,
  router as r,
  useAppStore as u
};
