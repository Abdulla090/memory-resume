import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { c as createRouter, u as useRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, H as HeadContent, S as Scripts, O as Outlet, L as Link } from "../_libs/tanstack__react-router.mjs";
import { T as Toaster, t as toast } from "../_libs/sonner.mjs";
import { c as create, p as persist, a as createJSONStorage } from "../_libs/zustand.mjs";
import { K as Key, S as Settings, U as Users, T as TrendingUp, a as Star, b as Sparkles, G as Globe, M as Menu, C as CircleCheckBig, L as LockKeyhole, D as Download, c as ChevronDown, A as ArrowLeft, d as ArrowRight } from "../_libs/lucide-react.mjs";
import { u as useMotionValue, a as useSpring, b as useTransform, m as motion, c as animate, A as AnimatePresence } from "../_libs/framer-motion.mjs";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const useAppStore = create()(
  persist(
    (set) => ({
      profile: null,
      resumes: [],
      preferences: { defaultTemplate: "minimal" },
      language: "en",
      apiKey: "AIzaSyC31fuY4cGzHyTrCaP3yMe9NJoPrqkXXJo",
      setProfile: (profile) => set({ profile }),
      addResume: (resume) => set((s) => ({ resumes: [resume, ...s.resumes] })),
      updateResume: (id, patch) => set((s) => ({
        resumes: s.resumes.map((r) => r.id === id ? { ...r, ...patch } : r)
      })),
      deleteResume: (id) => set((s) => ({ resumes: s.resumes.filter((r) => r.id !== id) })),
      setDefaultTemplate: (t) => set((s) => ({ preferences: { ...s.preferences, defaultTemplate: t } })),
      setLanguage: (lang) => set({ language: lang }),
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
const appCss = "/assets/styles-DOp3vtkj.css";
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
const Route$f = createRootRoute({
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
  const language = useAppStore((state) => state.language);
  const dir = language === "ku" ? "rtl" : "ltr";
  reactExports.useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ApiKeySettings, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Toaster,
      {
        theme: "light",
        position: "bottom-right",
        dir,
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
const $$splitComponentImporter$e = () => import("./v2-BOheksiY.mjs");
const Route$e = createFileRoute("/v2")({
  head: () => ({
    meta: [{
      title: "MemoryCV V2 - Turn memory into a professional resume"
    }, {
      name: "description",
      content: "Turn your professional memory into a clear, polished, role-ready resume."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./templates-Df7s9ATW.mjs");
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
const $$splitComponentImporter$c = () => import("./onboarding-B90nGW2_.mjs");
const Route$c = createFileRoute("/onboarding")({
  head: () => ({
    meta: [{
      title: "MemoryCV — Builder"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./dashboard-DyoHy3a8.mjs");
const Route$b = createFileRoute("/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./index-CeEJsxVG.mjs");
const Route$a = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "MemoryCV - Turn memory into a professional resume"
    }, {
      name: "description",
      content: "Turn your professional memory into a clear, polished, role-ready resume."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const copy = {
  en: {
    dir: "ltr",
    lang: "en",
    toggle: "کوردی",
    menu: "Open menu",
    nav: [{
      label: "Home",
      to: "/"
    }, {
      label: "Templates",
      to: "/templates"
    }, {
      label: "Build Resume",
      to: "/onboarding"
    }, {
      label: "Start",
      to: "/onboarding"
    }],
    navCta: "Start now",
    heroTitle: "Turn your professional memory into a resume ready for work",
    heroBody: "MemoryCV gathers your experience, skills, and achievements, extracts a clean profile, tailors your resume for each role, and lets you download a polished document.",
    heroCta: "Build my resume now",
    statsTitleA: "Build a resume that",
    statsTitleB: "actually works",
    statsCta: "Start for free",
    stats: [{
      icon: Users,
      value: 150,
      suffix: "K+",
      label: "resumes generated",
      id: "stat-resumes"
    }, {
      icon: TrendingUp,
      value: 85,
      suffix: "%",
      label: "higher interview rate",
      id: "stat-interviews"
    }, {
      icon: Star,
      value: 49,
      suffix: "/5.0",
      label: "average user rating",
      id: "stat-rating"
    }],
    bentoBadge: "AI-powered guidance",
    bentoTitleA: "A resume that moves your name",
    bentoTitleB: "to the top of the shortlist.",
    bentoBody: "In minutes, MemoryCV organizes your information, surfaces your strongest proof, and adapts the wording to the role you want.",
    bentoCta: "Start building",
    standTitleA: "Stand out",
    standTitleB: "inside busy applicant lists.",
    standBody: "Clean structure, stronger outcomes, and focused wording help recruiters understand your value faster.",
    standNote: "Trusted by 100K+ job seekers preparing stronger applications.",
    securityTitleA: "Your data stays protected",
    securityTitleB: "at every step.",
    securityBody: "Your private career information is used only to build your resume, and you can edit it whenever you need.",
    securityBadge: "Privacy comes first",
    downloadTitle: "Create, review, download.",
    downloadBody: "After your profile is organized, you can preview a clean resume layout that is ready to send.",
    downloadAlt: "Resume download preview",
    ctaTitle: "Send your resume with a clear, confident signal.",
    ctaBody: "Import memory, confirm your profile, generate for a target role, and refine the details that matter most.",
    ctaPrimary: "Open the workflow",
    ctaSecondary: "View templates",
    trust: ["No credit card required", "Free start", "Edit anytime"],
    faqTitle: "Frequently Asked Questions",
    faqItems: [{
      q: "How does the AI resume builder work?",
      a: "MemoryCV asks you targeted questions about your career, then uses advanced AI to instantly organize and write a clean, professional resume tailored to your target role."
    }, {
      q: "Will my resume be ATS-friendly?",
      a: "Yes. All our templates are designed to be easily read by Applicant Tracking Systems (ATS), ensuring your resume passes automated screenings."
    }, {
      q: "Can I export my resume to PDF?",
      a: "Absolutely. Once you are happy with your resume, you can download it as a high-quality PDF ready to be attached to your job applications."
    }, {
      q: "Do you offer cover letter generation?",
      a: "Currently, our primary focus is generating world-class resumes. However, cover letter generation based on your resume profile is a planned feature!"
    }],
    characterAlt: "Career character illustration",
    shieldAlt: "Data protection shield"
  },
  ku: {
    dir: "rtl",
    lang: "ckb",
    toggle: "English",
    menu: "کردنەوەی مێنیو",
    nav: [{
      label: "سەرەکی",
      to: "/"
    }, {
      label: "قاڵبەکان",
      to: "/templates"
    }, {
      label: "دروستکردنی سیڤی",
      to: "/onboarding"
    }, {
      label: "دەستپێکردن",
      to: "/onboarding"
    }],
    navCta: "دەست پێبکە",
    heroTitle: "بیرەوەرییە پیشەییەکانت بگۆڕە بۆ سیڤییەکی ئامادەی کار",
    heroBody: "زانیاری، ئەزموون و تواناکانت کۆدەکاتەوە، پڕۆفایلێکی ڕێک دەردەهێنێت، سیڤییەکەت بۆ هەر کارێک دەگونجێنێت و بە شێوەیەکی پاک دەتوانیت دایبگریت.",
    heroCta: "ئێستا سیڤییەکەم دروست بکە",
    statsTitleA: "سیڤییەک دروست بکە کە",
    statsTitleB: "بە ڕاستی کار دەکات",
    statsCta: "بەخۆڕایی دەست پێبکە",
    stats: [{
      icon: Users,
      value: 150,
      suffix: "K+",
      label: "سیڤیی دروستکراو",
      id: "stat-resumes"
    }, {
      icon: TrendingUp,
      value: 85,
      suffix: "%",
      label: "زیاتر بانگهێشتی چاوپێکەوتن",
      id: "stat-interviews"
    }, {
      icon: Star,
      value: 49,
      suffix: "/5.0",
      label: "هەڵسەنگاندنی بەکارهێنەران",
      id: "stat-rating"
    }],
    bentoBadge: "پشتگیریی زیرەکی دەستکرد",
    bentoTitleA: "سیڤییەک کە ناوی تۆ",
    bentoTitleB: "لە لیستی کاندیدەکاندا دەباتە پێشەوە.",
    bentoBody: "لە چەند خولەکدا زانیارییەکانت ڕێک دەخرێن، خاڵە بەهێزەکانت دەردەخرێن و دەقەکە بۆ ڕۆڵی مەبەستت دەگونجێندرێت.",
    bentoCta: "دروستکردن دەست پێبکە",
    standTitleA: "لە نێو داواکارییەکاندا",
    standTitleB: "جیاواز دەربکەوە.",
    standBody: "ڕێکخستنی دەق، پێشخستنی ئەنجامەکان و دیزاینی پاک یارمەتیت دەدات بە خێراتر تێبینی بکرێیت.",
    standNote: "زیاتر لە 100K بەکارهێنەر بۆ داواکاری کار بەکاریان هێناوە.",
    securityTitleA: "داتاکەت پارێزراوە",
    securityTitleB: "لە هەر هەنگاوێکدا.",
    securityBody: "زانیارییە تایبەتییەکانت تەنها بۆ دروستکردنی سیڤی بەکاردێن و دەتوانیت هەمیشە دەستیان بگۆڕیت.",
    securityBadge: "تایبەتمەندی لە پێشەوەیە",
    downloadTitle: "دروست بکە، وردبینی بکە، دایبگرە.",
    downloadBody: "دوای ڕێکخستنی پڕۆفایل، سیڤییەکەت بە قاڵبی پاک و ئامادەی ناردن دەبینیت.",
    downloadAlt: "پێشبینی دابەزاندنی سیڤی",
    ctaTitle: "سیڤییەکەت بە دەنگێکی ڕوون و پڕ مانا بنێرە.",
    ctaBody: "بیرەوەرییەکانت هاوردە بکە، پڕۆفایلەکەت پشتڕاست بکەوە، بۆ ڕۆڵی مەبەستت بیگونجێنە و ئەو شوێنانە باشتر بکە کە گرنگن.",
    ctaPrimary: "کردنەوەی پرۆسە",
    ctaSecondary: "بینینی قاڵبەکان",
    trust: ["پێویست بە کارتی بانکی ناکات", "دەستپێکردنی خۆڕایی", "هەر کات دەتوانیت بگۆڕیت"],
    faqTitle: "پرسیارە باوەکان",
    faqItems: [{
      q: "دروستکەری سیڤی بە زیرەکی دەستکرد چۆن کار دەکات؟",
      a: "مێمۆری سیڤی پرسیاری ورد لەسەر ئەزموونەکانت دەکات، پاشان زیرەکی دەستکرد بەکاردێنێت بۆ نووسین و ڕێکخستنی سیڤییەکی پیشەیی کە بۆ ڕۆڵی مەبەستت گونجاو بێت."
    }, {
      q: "ئایا سیڤییەکەم بۆ سیستەمی ATS گونجاوە؟",
      a: "بەڵێ. سەرجەم قاڵبەکانمان بە شێوەیەکە کە بە ئاسانی لەلایەن سیستەمەکانی بەدواداچوونی داواکاران (ATS) دەخوێندرێنەوە، کە دڵنیایی دەدات لە دەرچوونی سیڤییەکەت لە پشکنینە ئۆتۆماتیکییەکان."
    }, {
      q: "دەتوانم سیڤییەکەم بە فۆرماتی PDF دابگرم؟",
      a: "بێگومان. کاتێک لە سیڤییەکەت ڕازی بوویت، دەتوانیت بە کوالێتی بەرز وەکو PDF دایبگریت و ئامادەیە بۆ ناردن لەگەڵ داواکارییەکانت."
    }, {
      q: "ئایا خزمەتگوزاری نووسینی نامەی پێشەکی (Cover Letter)تان هەیە؟",
      a: "لە ئێستادا تەرکیزمان لەسەر دروستکردنی سیڤییەکی پێشکەوتووە، بەڵام خزمەتگوزاری دروستکردنی نامەی پێشەکی لەسەر بنەمای سیڤییەکەت یەکێکە لەو تایبەتمەندییانەی کە لە پلاندایە."
    }],
    characterAlt: "وێنەی کەسایەتی بۆ کار",
    shieldAlt: "نیشانی پاراستنی داتا"
  }
};
function Counter({
  to,
  suffix = ""
}) {
  const [val, setVal] = reactExports.useState(0);
  const ref = reactExports.useRef(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.span, { onViewportEnter: () => {
    if (ref.current) return;
    ref.current = true;
    animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v))
    });
  }, children: [
    val.toLocaleString("en-US"),
    suffix
  ] });
}
function Header({
  language,
  onToggleLanguage
}) {
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const t = copy[language];
  const rawScroll = useMotionValue(0);
  reactExports.useEffect(() => {
    const onScroll = () => rawScroll.set(Math.min(window.scrollY / 120, 1));
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [rawScroll]);
  const progress = useSpring(rawScroll, {
    stiffness: 160,
    damping: 28,
    mass: 0.6
  });
  const maxW = useTransform(progress, [0, 1], ["1280px", "780px"]);
  const marginTop = useTransform(progress, [0, 1], ["0px", "12px"]);
  const paddingX = useTransform(progress, [0, 1], ["24px", "20px"]);
  const height = useTransform(progress, [0, 1], ["64px", "52px"]);
  const borderRadius = useTransform(progress, [0, 1], ["0px", "999px"]);
  const bgOpacity = useTransform(progress, [0, 1], [0, 0.85]);
  const shadowOpacity = useTransform(progress, [0, 1], [0, 1]);
  const borderOpacity = useTransform(progress, [0, 1], [0, 1]);
  const gap = useTransform(progress, [0, 1], ["0px", "8px"]);
  const navPx = useTransform(progress, [0, 1], ["16px", "12px"]);
  const navPy = useTransform(progress, [0, 1], ["8px", "6px"]);
  const navFontSize = useTransform(progress, [0, 1], ["14px", "13px"]);
  const ctaPx = useTransform(progress, [0, 1], ["20px", "14px"]);
  const ctaPy = useTransform(progress, [0, 1], ["10px", "7px"]);
  const ctaFontSize = useTransform(progress, [0, 1], ["14px", "12px"]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "fixed left-0 right-0 top-0 z-50 pointer-events-none", dir: "ltr", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { className: "relative mx-auto pointer-events-auto flex items-center justify-between", style: {
        maxWidth: maxW,
        marginTop,
        paddingLeft: paddingX,
        paddingRight: paddingX,
        height,
        borderRadius,
        gap,
        // layered background & border
        backgroundColor: useTransform(bgOpacity, (v) => `rgba(255,255,255,${v})`),
        boxShadow: useTransform(shadowOpacity, (v) => `0 8px 32px rgba(0,0,0,${v * 0.09}), 0 1px 3px rgba(0,0,0,${v * 0.05})`),
        border: useTransform(borderOpacity, (v) => `1px solid rgba(203,213,225,${v * 0.6})`),
        backdropFilter: useTransform(bgOpacity, (v) => `blur(${v * 16}px)`),
        WebkitBackdropFilter: useTransform(bgOpacity, (v) => `blur(${v * 16}px)`)
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex shrink-0 items-center gap-2 cursor-pointer", id: "nav-logo", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold tracking-tight text-slate-900 hidden sm:block", children: "MemoryCV" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center md:flex", style: {
          gap: "2px"
        }, children: t.nav.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { style: {
          paddingLeft: navPx,
          paddingRight: navPx,
          paddingTop: navPy,
          paddingBottom: navPy
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: item.to, className: "rounded-lg font-semibold text-slate-600 transition-colors hover:text-slate-900", style: {
          fontSize: navFontSize
        }, dir: t.dir, children: item.label }) }, item.label)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onToggleLanguage, className: "hidden items-center gap-1.5 rounded-lg font-semibold text-slate-600 transition-colors hover:text-slate-900 md:flex", style: {
            fontSize: navFontSize
          }, "aria-label": "Change language", dir: t.dir, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4 shrink-0" }),
            t.toggle
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { style: {
            paddingLeft: ctaPx,
            paddingRight: ctaPx,
            paddingTop: ctaPy,
            paddingBottom: ctaPy
          }, className: "rounded-full bg-blue-600 shadow-sm transition-shadow hover:bg-blue-700 hover:shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/onboarding", id: "nav-free-trial", className: "block whitespace-nowrap font-bold text-white", style: {
            fontSize: ctaFontSize
          }, dir: t.dir, children: t.navCta }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 md:hidden", onClick: () => setMobileOpen((o) => !o), "aria-label": t.menu, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) })
        ] })
      ] }),
      mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-auto mx-4 mt-2 rounded-2xl bg-white p-4 shadow-xl border border-slate-100 md:hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onToggleLanguage, className: "flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600", dir: t.dir, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4" }),
          t.toggle
        ] }),
        t.nav.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: item.to, onClick: () => setMobileOpen(false), className: "block rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600", dir: t.dir, children: item.label }, item.label))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-full flex-none" })
  ] });
}
const LeftCardSVG = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 240 320", className: "h-auto w-full", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "left-header-gradient", x1: "0", y1: "0", x2: "240", y2: "80", gradientUnits: "userSpaceOnUse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { stopColor: "#2563eb" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "1", stopColor: "#3b82f6" })
  ] }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "240", height: "320", rx: "16", fill: "#ffffff" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "0.5", y: "0.5", width: "239", height: "319", rx: "15.5", fill: "none", stroke: "#e2e8f0" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 16C0 7.16 7.16 0 16 0H224C232.84 0 240 7.16 240 16V80H0V16Z", fill: "url(#left-header-gradient)" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "48", cy: "40", r: "24", fill: "white", fillOpacity: "0.2" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "48", cy: "40", r: "20", fill: "white" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M48 34C44.69 34 42 36.69 42 40C42 43.31 44.69 46 48 46C51.31 46 54 43.31 54 40C54 36.69 51.31 34 48 34ZM38 40C38 34.48 42.48 30 48 30C53.52 30 58 34.48 58 40C58 45.52 53.52 50 48 50C42.48 50 38 45.52 38 40Z", fill: "#2563eb" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "84", y: "36", fill: "white", fontSize: "16", fontWeight: "bold", fontFamily: "system-ui, sans-serif", children: "Sarah Chen" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "84", y: "52", fill: "#bfdbfe", fontSize: "11", fontFamily: "system-ui, sans-serif", children: "Senior UX Designer" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "24", y: "110", fill: "#2563eb", fontSize: "9", fontWeight: "bold", letterSpacing: "1", fontFamily: "system-ui, sans-serif", children: "PROFESSIONAL EXPERIENCE" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "24", y: "124", width: "2", height: "24", fill: "#3b82f6" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "34", y: "132", fill: "#0f172a", fontSize: "12", fontWeight: "bold", fontFamily: "system-ui, sans-serif", children: "Google" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "216", y: "132", fill: "#64748b", fontSize: "9", textAnchor: "end", fontFamily: "system-ui, sans-serif", children: "2021 - Present" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "34", y: "146", fill: "#475569", fontSize: "10", fontFamily: "system-ui, sans-serif", children: "Senior Product Designer" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "24", y: "164", width: "2", height: "24", fill: "#cbd5e1" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "34", y: "172", fill: "#0f172a", fontSize: "12", fontWeight: "bold", fontFamily: "system-ui, sans-serif", children: "Figma" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "216", y: "172", fill: "#64748b", fontSize: "9", textAnchor: "end", fontFamily: "system-ui, sans-serif", children: "2019 - 2021" }),
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
const CenterCardSVG = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 280 400", className: "h-auto w-full", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "280", height: "400", rx: "8", fill: "#ffffff" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "0.5", y: "0.5", width: "279", height: "399", rx: "7.5", fill: "none", stroke: "#e2e8f0" }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { transform: "translate(190, 10)", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "80", height: "24", rx: "12", fill: "#eff6ff", stroke: "#bfdbfe" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "40", y: "16", fill: "#1d4ed8", fontSize: "9", fontWeight: "bold", textAnchor: "middle", fontFamily: "system-ui, sans-serif", children: "AI GENERATED" })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "140", y: "56", fill: "#0f172a", fontSize: "18", fontWeight: "bold", textAnchor: "middle", fontFamily: "system-ui, sans-serif", children: "ALEXANDRA SMITH" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "140", y: "68", fill: "#64748b", fontSize: "8", textAnchor: "middle", fontFamily: "system-ui, sans-serif", children: "New York, NY - alexandra@email.com - (555) 123-4567" }),
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
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "368", fill: "#475569", fontSize: "7", fontFamily: "system-ui, sans-serif", children: "Languages: JavaScript, TypeScript, Python, Java, Go" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "380", fill: "#475569", fontSize: "7", fontFamily: "system-ui, sans-serif", children: "Frameworks: React, Node.js, Express, Django, Next.js" })
] });
const RightCardSVG = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 240 320", className: "h-auto w-full", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "right-header-gradient", x1: "0", y1: "0", x2: "240", y2: "100", gradientUnits: "userSpaceOnUse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { stopColor: "#1e3a8a" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "1", stopColor: "#1e40af" })
  ] }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "240", height: "320", rx: "16", fill: "#ffffff" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "0.5", y: "0.5", width: "239", height: "319", rx: "15.5", fill: "none", stroke: "#e2e8f0" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 16C0 7.16 7.16 0 16 0H224C232.84 0 240 7.16 240 16V100H0V16Z", fill: "url(#right-header-gradient)" }),
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
function DirectionArrow({
  language,
  className
}) {
  return language === "ku" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className });
}
function StatsSection({
  language
}) {
  const t = copy[language];
  const textAlign = language === "ku" ? "text-right" : "text-left";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "app-frame relative px-4 pb-16 sm:px-6 sm:pb-24", style: {
    paddingTop: "clamp(80px,14vw,140px)"
  }, dir: "ltr", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-10 top-20 -z-10 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-10 left-10 -z-10 h-80 w-80 rounded-full bg-sky-100/40 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex flex-col items-start justify-between gap-6 sm:mb-16 md:flex-row md:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h2, { initial: {
        opacity: 0,
        x: 20
      }, whileInView: {
        opacity: 1,
        x: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.55
      }, className: "text-3xl font-extrabold leading-[1.18] tracking-tight text-slate-900 sm:text-5xl md:text-6xl", dir: t.dir, children: [
        t.statsTitleA,
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-600", children: t.statsTitleB })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        x: -20
      }, whileInView: {
        opacity: 1,
        x: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.55
      }, className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/onboarding", id: "stats-free-trial", className: "inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-[0_15px_30px_rgba(37,99,235,0.3)]", dir: t.dir, children: t.statsCta }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-3", children: t.stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { id: s.id, initial: {
      opacity: 0,
      y: 30
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut"
    }, whileHover: {
      y: -6,
      boxShadow: "0 25px 50px -12px rgba(37,99,235,0.15)"
    }, className: `group relative flex cursor-pointer flex-col items-start overflow-hidden rounded-[2rem] border border-slate-100 bg-white/80 p-8 ${textAlign} shadow-lg backdrop-blur-xl sm:p-10`, dir: t.dir, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-bl from-blue-50/0 to-blue-50/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-blue-500 shadow-lg shadow-blue-500/30 transition-transform duration-300 group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-6 w-6 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-baseline text-4xl font-black tracking-tight text-slate-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, { to: s.value, suffix: s.suffix }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm font-semibold text-slate-500", children: s.label })
      ] })
    ] }, s.id)) })
  ] });
}
const BentoHeroCard = ({
  language
}) => {
  const t = copy[language];
  const textAlign = language === "ku" ? "text-right" : "text-left";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 20
  }, whileInView: {
    opacity: 1,
    y: 0
  }, viewport: {
    once: true
  }, whileHover: {
    y: -5,
    boxShadow: "0 20px 40px -10px rgba(37,99,235,0.15)"
  }, className: "group relative w-full overflow-hidden rounded-[2rem] border border-white/50 bg-gradient-to-br from-[#e8f3ff] to-[#cce4ff] shadow-xl", dir: "ltr", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[-10%] right-[10%] h-[200px] w-[400px] rounded-full bg-white/60 blur-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[-20%] left-[-10%] h-[300px] w-[600px] rounded-full bg-white/80 blur-3xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 grid gap-8 p-6 sm:p-10 md:grid-cols-[0.95fr_1.05fr] md:p-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative z-20 flex flex-col items-start ${textAlign} md:items-start`, dir: t.dir, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-center gap-2 rounded-full border border-white bg-white/90 px-4 py-1.5 shadow-sm backdrop-blur-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-blue-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-blue-700", children: t.bentoBadge })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-6 text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl md:text-5xl", children: [
          t.bentoTitleA,
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-600", children: t.bentoTitleB })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-10 max-w-[32ch] text-base font-medium leading-8 text-slate-600 md:text-lg", children: t.bentoBody }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/onboarding", className: "flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-[0_8px_20px_-6px_rgba(37,99,235,0.5)] transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-[0_12px_25px_-6px_rgba(37,99,235,0.6)]", children: [
          t.bentoCta,
          /* @__PURE__ */ jsxRuntimeExports.jsx(DirectionArrow, { language, className: "h-5 w-5" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none relative flex h-[330px] items-center justify-center sm:h-[420px] md:h-[460px]", dir: "ltr", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-blue-300/30 via-white/50 to-blue-200/30 blur-3xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-[320px] w-[280px] select-none items-center justify-center sm:h-[400px] sm:w-[360px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-[7%] top-[6%] w-[145px] origin-center rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] sm:w-[190px]", style: {
            transform: "rotate(-8deg)"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LeftCardSVG, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[4%] left-[8%] z-10 w-[170px] origin-center rounded-lg shadow-[0_25px_35px_rgba(37,99,235,0.15)] sm:w-[225px]", style: {
            transform: "rotate(6deg)"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CenterCardSVG, {}) })
        ] })
      ] })
    ] })
  ] });
};
const BentoStandOutCard = ({
  language
}) => {
  const t = copy[language];
  const isRtl = language === "ku";
  const textAlign = isRtl ? "text-right" : "text-left";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 20
  }, whileInView: {
    opacity: 1,
    y: 0
  }, viewport: {
    once: true
  }, whileHover: {
    y: -5,
    boxShadow: "0 20px 40px -10px rgba(37,99,235,0.1)"
  }, className: `group relative flex min-h-[380px] w-full flex-col justify-between overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-8 ${textAlign} shadow-xl sm:p-10`, dir: "ltr", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `pointer-events-none absolute top-0 z-0 h-full w-1/2 ${isRtl ? "right-0 bg-gradient-to-l" : "left-0 bg-gradient-to-r"} from-[#f0f7ff] to-transparent` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-[230px]", dir: t.dir, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mb-2 text-3xl font-extrabold leading-[1.18] tracking-tight text-slate-900", children: [
        t.standTitleA,
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500", children: t.standTitleB })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm font-medium leading-7 text-slate-500", children: t.standBody })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 mt-auto max-w-[160px] pt-8 text-xs font-semibold leading-6 text-slate-400", dir: t.dir, children: t.standNote }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute bottom-0 z-10 flex h-[285px] w-[235px] items-end justify-center sm:w-[250px]", style: {
      [isRtl ? "left" : "right"]: "-10px"
    }, dir: "ltr", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.img, { src: "/images/bento/3d guy transparent.png", alt: t.characterAlt, className: "h-full w-full select-none object-contain object-bottom drop-shadow-2xl", draggable: false, style: {
      transform: isRtl ? "scaleX(-1)" : "none"
    } }) })
  ] });
};
const BentoSecurityCard = ({
  language
}) => {
  const t = copy[language];
  const isRtl = language === "ku";
  const textAlign = isRtl ? "text-right" : "text-left";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 20
  }, whileInView: {
    opacity: 1,
    y: 0
  }, viewport: {
    once: true
  }, transition: {
    delay: 0.1
  }, whileHover: {
    y: -5,
    boxShadow: "0 20px 40px -10px rgba(37,99,235,0.1)"
  }, className: `group relative flex min-h-[380px] w-full flex-col justify-between overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-8 ${textAlign} shadow-xl sm:p-10`, dir: "ltr", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `pointer-events-none absolute top-0 z-0 h-full w-2/3 ${isRtl ? "right-0 bg-gradient-to-l" : "left-0 bg-gradient-to-r"} from-[#f0f7ff] to-transparent` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-[240px]", dir: t.dir, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mb-2 text-3xl font-extrabold leading-[1.18] tracking-tight text-slate-900", children: [
        t.securityTitleA,
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500", children: t.securityTitleB })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm font-medium leading-7 text-slate-500", children: t.securityBody })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 mt-auto pt-8", dir: t.dir, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-2 text-xs font-bold text-blue-600 shadow-sm transition-shadow group-hover:shadow-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LockKeyhole, { className: "h-4 w-4 text-blue-500" }),
      t.securityBadge
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute bottom-[16px] z-10 flex h-[220px] w-[220px] items-center justify-center", style: {
      [isRtl ? "left" : "right"]: "-8px"
    }, dir: "ltr", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.img, { src: "/images/bento/sheild transparent.png", alt: t.shieldAlt, className: "h-full w-full select-none object-contain drop-shadow-2xl", draggable: false, animate: {
      y: [0, -8, 0]
    }, transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    } }) })
  ] });
};
const BentoCreateWinCard = ({
  language
}) => {
  const t = copy[language];
  const textAlign = language === "ku" ? "text-right" : "text-left";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 20
  }, whileInView: {
    opacity: 1,
    y: 0
  }, viewport: {
    once: true
  }, transition: {
    delay: 0.2
  }, className: "relative grid min-h-[300px] overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-xl md:grid-cols-[0.8fr_1.2fr]", dir: "ltr", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative z-10 flex flex-col justify-center p-8 ${textAlign} sm:p-10`, dir: t.dir, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl font-extrabold leading-[1.18] tracking-tight text-slate-900", children: t.downloadTitle }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-[34ch] text-sm font-medium leading-7 text-slate-500", children: t.downloadBody })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex min-h-[260px] items-center justify-center overflow-hidden bg-[#eef6ff] px-4", dir: "ltr", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/bento/download cv bento.webp", alt: t.downloadAlt, className: "h-full max-h-[360px] w-full select-none object-contain", draggable: false }) })
  ] });
};
function FAQSection({
  language
}) {
  const t = copy[language];
  const [openIndex, setOpenIndex] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-20 mb-12 w-full max-w-4xl mx-auto", dir: t.dir, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-10 text-3xl font-extrabold tracking-tight text-slate-900 text-center sm:text-4xl", children: t.faqTitle }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: t.faqItems.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-slate-200/60 bg-white/60 backdrop-blur-sm shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-blue-200/50 hover:bg-white/90", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpenIndex(openIndex === i ? null : i), className: "flex w-full items-center justify-between px-6 py-5 text-left font-bold text-slate-800 focus:outline-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: item.q }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${openIndex === i ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-400"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `h-5 w-5 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}` }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: openIndex === i && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        height: 0,
        opacity: 0
      }, animate: {
        height: "auto",
        opacity: 1
      }, exit: {
        height: 0,
        opacity: 0
      }, transition: {
        duration: 0.3,
        ease: "easeInOut"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-6 text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-4", children: item.a }) }) })
    ] }, i)) })
  ] });
}
function BentoGridSection({
  language
}) {
  const t = copy[language];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden bg-[#f4f9ff] px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-28 md:pt-40", dir: "ltr", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute right-1/4 top-0 h-[600px] w-[800px] -translate-y-1/2 rounded-full bg-blue-100/40 opacity-70 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute left-0 top-1/4 h-[500px] w-[600px] rounded-full bg-sky-100/40 opacity-60 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BentoHeroCard, { language }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BentoStandOutCard, { language }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BentoSecurityCard, { language })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BentoCreateWinCard, { language }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FAQSection, { language }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 24
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.6
      }, className: "relative mt-12 overflow-hidden rounded-[2rem] px-6 py-10 text-center shadow-2xl sm:mt-20 sm:px-8 sm:py-16", style: {
        background: "linear-gradient(145deg,#1e40af 0%,#2563eb 55%,#3b82f6 100%)"
      }, id: "closing-cta", dir: "ltr", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute right-10 top-4 h-14 w-20 rotate-6 rounded-xl border border-white/20 bg-white/10 opacity-15" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute bottom-4 left-10 h-10 w-16 -rotate-3 rounded-xl border border-white/15 bg-white/10 opacity-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-2xl font-extrabold tracking-tight text-white sm:text-4xl", dir: t.dir, children: t.ctaTitle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mb-10 max-w-[54ch] text-base font-medium leading-8 text-blue-100/90 md:text-lg", dir: t.dir, children: t.ctaBody }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/onboarding", id: "closing-cta-btn", className: "inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-blue-700 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl", children: [
            t.ctaPrimary,
            /* @__PURE__ */ jsxRuntimeExports.jsx(DirectionArrow, { language, className: "h-5 w-5" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/templates", id: "closing-templates-btn", className: "hero-outline-button rounded-2xl border-2 border-blue-300 px-8 py-4 text-lg font-bold text-white transition-all hover:border-blue-200 hover:bg-blue-600", children: t.ctaSecondary })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 flex flex-wrap items-center justify-center gap-8 text-sm font-semibold text-slate-500", children: t.trust.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-5 w-5 text-blue-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
      ] }, item)) })
    ] })
  ] });
}
const $$splitComponentImporter$9 = () => import("./dashboard.index-1Lw17l6R.mjs");
const Route$9 = createFileRoute("/dashboard/")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./resume._id-BarOZb2D.mjs");
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
const V2Route = Route$e.update({
  id: "/v2",
  path: "/v2",
  getParentRoute: () => Route$f
});
const TemplatesRoute = Route$d.update({
  id: "/templates",
  path: "/templates",
  getParentRoute: () => Route$f
});
const OnboardingRoute = Route$c.update({
  id: "/onboarding",
  path: "/onboarding",
  getParentRoute: () => Route$f
});
const DashboardRoute = Route$b.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$f
});
const IndexRoute = Route$a.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$f
});
const DashboardIndexRoute = Route$9.update({
  id: "/",
  path: "/",
  getParentRoute: () => DashboardRoute
});
const ResumeIdRoute = Route$8.update({
  id: "/resume/$id",
  path: "/resume/$id",
  getParentRoute: () => Route$f
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
  getParentRoute: () => Route$f
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
  V2Route,
  ResumeRoute,
  ResumeIdRoute
};
const routeTree = Route$f._addFileChildren(rootRouteChildren)._addFileTypes();
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
  BentoGridSection as B,
  CenterCardSVG as C,
  Header as H,
  LeftCardSVG as L,
  RightCardSVG as R,
  StatsSection as S,
  Route$8 as a,
  copy as c,
  router as r,
  useAppStore as u
};
