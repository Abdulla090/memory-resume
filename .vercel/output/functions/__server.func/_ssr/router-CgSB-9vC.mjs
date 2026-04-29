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
const appCss = "/assets/styles-4YulfP3c.css";
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
const Route$5 = createRootRoute({
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
const $$splitComponentImporter$4 = () => import("./templates-CwWCz1qE.mjs");
const Route$4 = createFileRoute("/templates")({
  head: () => ({
    meta: [{
      title: "Templates — MemoryCV"
    }, {
      name: "description",
      content: "Preview the resume templates available inside the MemoryCV editor."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./onboarding-X-Vcee9b.mjs");
const Route$3 = createFileRoute("/onboarding")({
  head: () => ({
    meta: [{
      title: "MemoryCV — Builder"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./index-CD8nJwHP.mjs");
const Route$2 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "MemoryCV — Turn memory into a professional resume"
    }, {
      name: "description",
      content: "Import AI memory, extract a structured profile, tailor resumes for specific roles, and export polished documents in minutes."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./resume._id-_Uep13Eu.mjs");
const Route$1 = createFileRoute("/resume/$id")({
  head: () => ({
    meta: [{
      title: "Resume Editor — MemoryCV"
    }, {
      name: "description",
      content: "Edit, tailor, and export a resume generated from your memory profile."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./resume.-Ca9zpXIc.mjs");
const Route = createFileRoute("/resume/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TemplatesRoute = Route$4.update({
  id: "/templates",
  path: "/templates",
  getParentRoute: () => Route$5
});
const OnboardingRoute = Route$3.update({
  id: "/onboarding",
  path: "/onboarding",
  getParentRoute: () => Route$5
});
const IndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$5
});
const ResumeIdRoute = Route$1.update({
  id: "/resume/$id",
  path: "/resume/$id",
  getParentRoute: () => Route$5
});
const ResumeRoute = Route.update({
  id: "/resume/",
  path: "/resume/",
  getParentRoute: () => Route$5
});
const rootRouteChildren = {
  IndexRoute,
  OnboardingRoute,
  TemplatesRoute,
  ResumeRoute,
  ResumeIdRoute
};
const routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
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
  Route$1 as R,
  router as r,
  useAppStore as u
};
