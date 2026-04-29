import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { L as LeftCardSVG, R as RightCardSVG, C as CenterCardSVG } from "./router-BXFogTK1.mjs";
import "../_libs/sonner.mjs";
import { U as Users, T as TrendingUp, j as Star, a as Sparkles, G as Globe, M as Menu, F as FileText, k as CircleCheckBig, A as ArrowLeft, l as ArrowRight, m as LockKeyhole, D as Download } from "../_libs/lucide-react.mjs";
import { m as motion, u as useScroll, a as useTransform, b as animate } from "../_libs/framer-motion.mjs";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "saas-nav", dir: "ltr", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-frame px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-16 items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 cursor-pointer", id: "nav-logo", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[1rem] font-bold tracking-tight text-slate-900", children: "MemoryCV" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center gap-1 md:flex", children: t.nav.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: item.to, className: "rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900", dir: t.dir, children: item.label }, item.label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onToggleLanguage, className: "hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 md:flex", "aria-label": "Change language", dir: t.dir, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4" }),
          t.toggle
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/onboarding", id: "nav-free-trial", className: "primary-button px-4 py-2.5 text-sm sm:px-5", dir: t.dir, children: t.navCta }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 md:hidden", onClick: () => setMobileOpen((open) => !open), "aria-label": t.menu, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) })
      ] })
    ] }),
    mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 border-t border-slate-100 pb-4 md:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onToggleLanguage, className: "flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600", dir: t.dir, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4" }),
        t.toggle
      ] }),
      t.nav.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: item.to, onClick: () => setMobileOpen(false), className: "block rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600", dir: t.dir, children: item.label }, item.label))
    ] })
  ] }) });
}
function HeroCards() {
  const ref = reactExports.useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start 85%", "center center"]
  });
  const leftX = useTransform(scrollYProgress, [0, 1], ["0%", "-108%"]);
  const leftY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const leftRotate = useTransform(scrollYProgress, [0, 1], [0, -12]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["0%", "108%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const rightRotate = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const centerY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref, className: "relative flex w-full origin-top items-center justify-center", style: {
    height: "clamp(340px,46vw,430px)"
  }, dir: "ltr", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "absolute rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)]", style: {
      width: "clamp(108px,17vw,190px)",
      zIndex: 10,
      x: leftX,
      y: leftY,
      rotate: leftRotate
    }, initial: {
      opacity: 0,
      scale: 0.9
    }, animate: {
      opacity: 1,
      scale: 1
    }, transition: {
      delay: 0.4,
      type: "spring",
      stiffness: 70
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LeftCardSVG, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "absolute rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)]", style: {
      width: "clamp(108px,17vw,190px)",
      zIndex: 10,
      x: rightX,
      y: rightY,
      rotate: rightRotate
    }, initial: {
      opacity: 0,
      scale: 0.9
    }, animate: {
      opacity: 1,
      scale: 1
    }, transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 70
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RightCardSVG, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "absolute rounded-lg shadow-[0_25px_50px_rgba(37,99,235,0.25)]", style: {
      width: "clamp(145px,23vw,245px)",
      zIndex: 20,
      y: centerY
    }, initial: {
      opacity: 0,
      scale: 0.9
    }, animate: {
      opacity: 1,
      scale: 1
    }, transition: {
      delay: 0.3,
      type: "spring",
      stiffness: 70
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CenterCardSVG, {}) })
  ] });
}
function DirectionArrow({
  language,
  className
}) {
  return language === "ku" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className });
}
function Hero({
  language
}) {
  const t = copy[language];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "app-frame px-3 pb-0 pt-4 sm:px-6 sm:pt-6", dir: "ltr", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-gradient relative pb-16 sm:pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative px-4 pb-4 pt-8 text-center sm:px-6 sm:pt-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
        opacity: 0,
        y: 28
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.6
      }, className: "mx-auto max-w-[760px] text-3xl font-bold leading-[1.18] tracking-tight text-white sm:text-5xl md:text-6xl", dir: t.dir, children: [
        t.heroTitle,
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mx-2 mt-2 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/20 px-3 py-1 align-middle shadow-[0_0_15px_rgba(59,130,246,0.25)] backdrop-blur-sm sm:mt-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-blue-200 sm:h-7 sm:w-7" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl text-[#bfdbfe] sm:text-4xl md:text-5xl", children: "MemoryCV" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
        opacity: 0,
        y: 16
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.14,
        duration: 0.5
      }, className: "mx-auto mt-5 max-w-[560px] text-sm leading-8 text-blue-100/90 sm:text-base", dir: t.dir, children: t.heroBody }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: 12
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.26,
        duration: 0.5
      }, className: "mt-7", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/onboarding", id: "hero-cta", className: "inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-blue-700 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl sm:px-8 sm:py-3.5", children: [
        t.heroCta,
        /* @__PURE__ */ jsxRuntimeExports.jsx(DirectionArrow, { language, className: "h-4 w-4" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto", style: {
      maxWidth: "min(760px,100%)",
      height: "clamp(340px,46vw,430px)",
      marginTop: "clamp(16px,4vw,48px)"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeroCards, {}) })
  ] }) });
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
    boxShadow: "0 20px 40px -10px rgba(37,99,235,0.1)"
  }, className: `group relative flex min-h-[380px] w-full flex-col justify-between overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-8 ${textAlign} shadow-xl sm:p-10`, dir: "ltr", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute left-0 top-0 z-0 h-full w-1/2 bg-gradient-to-r from-[#f0f7ff] to-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-[230px]", dir: t.dir, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mb-2 text-3xl font-extrabold leading-[1.18] tracking-tight text-slate-900", children: [
        t.standTitleA,
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500", children: t.standTitleB })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm font-medium leading-7 text-slate-500", children: t.standBody })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 mt-auto max-w-[160px] pt-8 text-xs font-semibold leading-6 text-slate-400", dir: t.dir, children: t.standNote }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute bottom-0 left-[-10px] z-10 flex h-[285px] w-[235px] items-end justify-center sm:left-[-20px] sm:w-[250px]", dir: "ltr", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.img, { src: "/images/bento/3d guy transparent.png", alt: t.characterAlt, className: "h-full w-full select-none object-contain object-bottom drop-shadow-2xl", draggable: false }) })
  ] });
};
const BentoSecurityCard = ({
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
    delay: 0.1
  }, whileHover: {
    y: -5,
    boxShadow: "0 20px 40px -10px rgba(37,99,235,0.1)"
  }, className: `group relative flex min-h-[380px] w-full flex-col justify-between overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-8 ${textAlign} shadow-xl sm:p-10`, dir: "ltr", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute left-0 top-0 z-0 h-full w-2/3 bg-gradient-to-r from-[#f0f7ff] to-transparent" }),
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute bottom-[16px] left-[-8px] z-10 flex h-[220px] w-[220px] items-center justify-center", dir: "ltr", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.img, { src: "/images/bento/sheild transparent.png", alt: t.shieldAlt, className: "h-full w-full select-none object-contain drop-shadow-2xl", draggable: false, animate: {
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
function Landing() {
  const [language, setLanguage] = reactExports.useState("en");
  const t = copy[language];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-shell bg-background text-foreground", dir: "ltr", lang: t.lang, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { language, onToggleLanguage: () => setLanguage((current) => current === "en" ? "ku" : "en") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, { language }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatsSection, { language }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BentoGridSection, { language })
    ] })
  ] });
}
export {
  Landing as component
};
