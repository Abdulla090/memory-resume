import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { L as LeftCardSVG, R as RightCardSVG, C as CenterCardSVG } from "./router-CQ_kdRwk.mjs";
import "../_libs/sonner.mjs";
import { a as Sparkles, M as Menu, F as FileText, U as Users, T as TrendingUp, i as Star, j as ArrowRight, k as CircleCheckBig } from "../_libs/lucide-react.mjs";
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
    val.toLocaleString(),
    suffix
  ] });
}
function Header() {
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "saas-nav", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-frame px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-16 items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 cursor-pointer", id: "nav-logo", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[1rem] font-bold tracking-tight text-slate-900", children: "MemoryCV" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex items-center gap-1", children: [["Home", "/"], ["Features", "/templates"], ["Build Resume", "/onboarding"], ["Contact", "/"]].map(([label, path]) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: path, className: "px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer", id: `nav-${label.toLowerCase()}`, children: label }, label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/onboarding", id: "nav-free-trial", className: "primary-button px-4 sm:px-5 py-2.5 text-sm cursor-pointer", children: "Free Trial" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "md:hidden w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors", onClick: () => setMobileOpen(!mobileOpen), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" }) })
      ] })
    ] }),
    mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden pb-4 border-t border-slate-100 mt-1", children: [["Home", "/"], ["Features", "/templates"], ["Build Resume", "/onboarding"], ["Contact", "/"]].map(([label, path]) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: path, onClick: () => setMobileOpen(false), className: "block px-4 py-3 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors", children: label }, label)) })
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
  const leftX = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const leftY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const leftRotate = useTransform(scrollYProgress, [0, 1], [0, -12]);
  const rightX = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const rightY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const rightRotate = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const centerY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref, className: "relative w-full flex items-center justify-center origin-top", style: {
    height: "clamp(240px,50vw,400px)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "absolute", style: {
      width: "clamp(120px,20vw,220px)",
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
    }, id: "hero-card-profile", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LeftCardSVG, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "absolute", style: {
      width: "clamp(120px,20vw,220px)",
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
    }, id: "hero-card-match", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RightCardSVG, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "absolute", style: {
      width: "clamp(150px,26vw,280px)",
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
    }, id: "hero-card-resume", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CenterCardSVG, {}) })
  ] });
}
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "app-frame px-3 sm:px-6 pt-4 sm:pt-6 pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-gradient relative overflow-hidden pb-16 sm:pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative text-center pt-8 sm:pt-16 pb-4 px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
        opacity: 0,
        y: 28
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.6
      }, className: "font-bold text-white leading-[1.12] tracking-tight mx-auto text-3xl sm:text-5xl md:text-6xl", style: {
        maxWidth: 660
      }, children: [
        "Elevate Your Career",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden sm:block" }),
        "Management with",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center align-middle mx-1 px-2 sm:px-3 py-1 bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)] mt-1 sm:mt-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 sm:w-7 sm:h-7 mr-1 sm:mr-2 text-blue-200" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#bfdbfe] text-2xl sm:text-4xl md:text-5xl", children: "MemoryCV" })
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
      }, className: "mt-4 mx-auto leading-relaxed text-sm sm:text-base", style: {
        color: "rgba(219,234,254,0.9)",
        maxWidth: 480
      }, children: "Streamline your job search with our intuitive AI platform. Designed for professionals, our solutions simplify complex processes." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: 12
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.26,
        duration: 0.5
      }, className: "mt-6 sm:mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/onboarding", id: "hero-cta", className: "inline-flex items-center gap-2 rounded-full bg-white font-semibold text-sm px-6 sm:px-8 py-3 sm:py-3.5 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer", style: {
        color: "#1d4ed8"
      }, children: "Start now — It's Free" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto", style: {
      maxWidth: "min(720px,100%)",
      height: "clamp(180px,42vw,260px)",
      marginTop: "clamp(40px,8vw,80px)"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeroCards, {}) })
  ] }) });
}
const stats = [{
  icon: Users,
  value: 150,
  suffix: "K+",
  label: "Resumes Generated",
  id: "stat-partners"
}, {
  icon: TrendingUp,
  value: 85,
  suffix: "%",
  label: "Higher Interview Rate",
  id: "stat-invest"
}, {
  icon: Star,
  value: 49,
  suffix: "/5.0",
  label: "Average User Rating",
  id: "stat-rating"
}];
function StatsSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "app-frame px-4 sm:px-6 pb-16 sm:pb-24 relative", style: {
    paddingTop: "clamp(80px,14vw,140px)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-20 left-10 w-96 h-96 bg-blue-100/40 blur-[80px] rounded-full pointer-events-none -z-10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-10 right-10 w-80 h-80 bg-sky-100/40 blur-[70px] rounded-full pointer-events-none -z-10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 sm:mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h2, { initial: {
        opacity: 0,
        x: -20
      }, whileInView: {
        opacity: 1,
        x: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.55
      }, className: "text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight", children: [
        "Unlock the Power of Your",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Professional ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500", children: "Career" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        x: 20
      }, whileInView: {
        opacity: 1,
        x: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.55
      }, className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/onboarding", id: "stats-free-trial", className: "inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-[0_10px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.3)] transition-all duration-300 transform hover:-translate-y-1 whitespace-nowrap", children: "Build Your CV Free" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6", children: stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { id: s.id, initial: {
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
      boxShadow: "0 25px 50px -12px rgba(37,99,235,0.15)",
      transition: {
        duration: 0.3
      }
    }, className: "relative bg-white/80 backdrop-blur-xl border border-slate-100 p-8 sm:p-10 rounded-[2rem] shadow-lg flex flex-col items-start overflow-hidden group cursor-pointer", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6 relative z-10 transform group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "w-6 h-6 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-black text-slate-900 tracking-tight flex items-baseline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, { to: s.value, suffix: s.suffix }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-slate-500 mt-2 uppercase tracking-wider", children: s.label })
      ] })
    ] }, s.id)) })
  ] });
}
const BentoHeroCard = () => {
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
  }, className: "w-full rounded-[2rem] overflow-hidden relative group bg-gradient-to-br from-[#e8f3ff] to-[#cce4ff] border border-white/50 shadow-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0 pointer-events-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[-10%] left-[10%] w-[400px] h-[200px] bg-white/60 blur-3xl rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[-20%] right-[-10%] w-[600px] h-[300px] bg-white/80 blur-[80px] rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "absolute top-[20%] left-[45%] w-[150px] h-[150px] overflow-visible", fill: "none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0,150 Q50,100 150,0", stroke: "white", strokeWidth: "2", strokeDasharray: "6 6", className: "opacity-60 group-hover:opacity-100 transition-opacity duration-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M150,0 L130,5 L140,25 Z", fill: "white", className: "group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 p-6 sm:p-10 md:p-14 flex flex-col md:flex-row h-full items-center gap-8 md:gap-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full md:w-1/2 flex flex-col items-start text-left relative z-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 flex items-center gap-2 mb-8 shadow-sm border border-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-blue-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-blue-700", children: "AI-Powered" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-4 sm:mb-6 tracking-tight", children: [
          "Build a CV that",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-600", children: "gets you hired." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 text-lg md:text-xl font-medium mb-10 max-w-[28ch] leading-relaxed", children: "Create a professional CV in minutes with the power of AI." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/onboarding", className: "bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-8 py-4 font-bold text-lg flex items-center gap-2 shadow-[0_8px_20px_-6px_rgba(37,99,235,0.5)] hover:shadow-[0_12px_25px_-6px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all duration-300", children: [
          "Build My CV ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex -space-x-3", children: [
            [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full border-2 border-[#e8f3ff] bg-slate-200 overflow-hidden shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `https://i.pravatar.cc/100?img=${i + 10}`, alt: "user", className: "w-full h-full object-cover" }) }, i)),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full border-2 border-[#e8f3ff] bg-white flex items-center justify-center shadow-sm text-blue-600 font-bold text-lg", children: "+" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-slate-600", children: "Loved by 100K+ job seekers" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full md:w-1/2 relative h-[300px] sm:h-[380px] md:h-[450px] flex justify-center items-center pointer-events-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-blue-300/30 via-white/50 to-blue-200/30 blur-[60px] rounded-full pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[10%] right-[5%] w-[200px] h-[150px] bg-white/70 blur-[40px] rounded-full pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[5%] left-[5%] w-[250px] h-[180px] bg-[#e0f2fe]/60 blur-[50px] rounded-full pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-[260px] sm:w-[320px] md:w-[340px] h-[320px] sm:h-[380px] md:h-[400px] pointer-events-none select-none flex items-center justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[2%] right-[2%] w-[160px] sm:w-[200px] md:w-[220px] origin-center drop-shadow-2xl transition-transform duration-700 hover:scale-105", style: {
            transform: "rotate(10deg) translateX(15px) translateY(-15px)"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LeftCardSVG, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[2%] left-[2%] w-[180px] sm:w-[220px] md:w-[250px] origin-center z-10 drop-shadow-[0_25px_35px_rgba(37,99,235,0.15)] transition-transform duration-700 hover:scale-105", style: {
            transform: "rotate(-8deg) translateX(-15px) translateY(10px)"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CenterCardSVG, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-10 -left-10 w-[200px] h-[150px] bg-white/30 blur-[30px] rounded-full z-20 pointer-events-none" })
        ] })
      ] })
    ] })
  ] });
};
const BentoStandOutCard = () => {
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
  }, className: "w-full rounded-[2rem] bg-white border border-slate-100 shadow-xl overflow-hidden relative group p-10 flex flex-col justify-between min-h-[360px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#f0f7ff] to-transparent pointer-events-none z-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-[-10%] bottom-[-10%] w-[300px] h-[300px] bg-[#e0f2fe]/50 blur-3xl rounded-full pointer-events-none z-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full max-w-[200px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-3xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-2", children: [
        "Stand out.",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500", children: "Get noticed." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-sm font-medium mt-4 leading-relaxed", children: "A great CV opens doors to greater opportunities." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col gap-1 mt-auto pt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex -space-x-2", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `https://i.pravatar.cc/100?img=${i + 20}`, alt: "user", className: "w-full h-full object-cover" }) }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400 font-semibold max-w-[120px] mt-2 leading-snug", children: "Join 100K+ successful professionals" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-[-20px] bottom-0 w-[240px] h-[280px] pointer-events-none z-10 flex items-end justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.img, { src: "/images/bento/3d guy transparent.png", alt: "3D Character", className: "w-full h-full object-contain object-bottom drop-shadow-2xl transition-transform duration-500 pointer-events-none select-none", draggable: false, onContextMenu: (e) => e.preventDefault() }) })
  ] });
};
const BentoSecurityCard = () => {
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
  }, className: "w-full rounded-[2rem] bg-white border border-slate-100 shadow-xl overflow-hidden relative group p-10 flex flex-col justify-between min-h-[360px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0 w-2/3 h-full bg-gradient-to-l from-[#f0f7ff] to-transparent pointer-events-none z-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full max-w-[220px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-3xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-2", children: [
        "Your data is",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500", children: "100% secure." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-sm font-medium mt-4 leading-relaxed", children: "We use enterprise-grade security to protect your information." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 mt-auto pt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:shadow-md transition-shadow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-blue-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "14", height: "16", viewBox: "0 0 14 16", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7 0C4.79 0 3 1.79 3 4V5H2C0.9 5 0 5.9 0 7V14C0 15.1 0.9 16 2 16H12C13.1 16 14 15.1 14 14V7C14 5.9 13.1 5 12 5H11V4C11 1.79 9.21 0 7 0ZM7 2C8.1 2 9 2.9 9 4V5H5V4C5 2.9 5.9 2 7 2ZM2 7H12V14H2V7ZM7 9C6.45 9 6 9.45 6 10C6 10.38 6.22 10.7 6.53 10.88L5.94 12.63C5.83 12.96 6.07 13.29 6.42 13.29H7.58C7.93 13.29 8.17 12.96 8.06 12.63L7.47 10.88C7.78 10.7 8 10.38 8 10C8 9.45 7.55 9 7 9Z" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-blue-600", children: "Privacy First. Always." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-[-10px] bottom-[20px] w-[220px] h-[220px] pointer-events-none z-10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.img, { src: "/images/bento/sheild transparent.png", alt: "Security Shield", className: "w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 pointer-events-none select-none", draggable: false, onContextMenu: (e) => e.preventDefault(), animate: {
      y: [0, -8, 0]
    }, transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    } }) })
  ] });
};
const BentoCreateWinCard = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
    opacity: 0,
    y: 20
  }, whileInView: {
    opacity: 1,
    y: 0
  }, viewport: {
    once: true
  }, transition: {
    delay: 0.2
  }, className: "w-full relative min-h-[300px] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/bento/download cv bento.webp", alt: "Create and Download CV", className: "w-full h-auto object-contain pointer-events-none select-none", draggable: false, onContextMenu: (e) => e.preventDefault() }) });
};
function BentoGridSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-4 sm:px-6 pt-16 sm:pt-28 md:pt-40 pb-16 sm:pb-24 bg-[#f4f9ff] relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/4 w-[800px] h-[600px] bg-blue-100/40 rounded-full blur-[100px] opacity-70 pointer-events-none -translate-y-1/2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 right-0 w-[600px] h-[500px] bg-sky-100/40 rounded-full blur-[100px] opacity-60 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BentoHeroCard, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BentoStandOutCard, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BentoSecurityCard, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BentoCreateWinCard, {}),
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
      }, className: "mt-12 sm:mt-20 rounded-[2rem] px-6 sm:px-8 py-10 sm:py-16 text-center relative overflow-hidden shadow-2xl", style: {
        background: "linear-gradient(145deg,#1e40af 0%,#2563eb 55%,#3b82f6 100%)"
      }, id: "closing-cta", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-10 w-20 h-14 rounded-xl opacity-15 border border-white/20 bg-white/10 rotate-6 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 left-10 w-16 h-10 rounded-xl opacity-10 border border-white/15 bg-white/8 -rotate-3 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight", children: "Build resumes with stronger signal and less waste." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-100/90 text-base md:text-lg mb-10 max-w-[50ch] mx-auto font-medium", children: "Import memory, confirm your profile, generate for a role, and refine where it matters." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/onboarding", id: "closing-cta-btn", className: "inline-flex items-center gap-2 rounded-2xl bg-white text-blue-700 font-bold text-lg px-8 py-4 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer", children: [
            "Open the workflow ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/templates", id: "closing-templates-btn", className: "hero-outline-button px-8 py-4 rounded-2xl font-bold text-lg border-2 border-blue-300 text-white hover:bg-blue-600 hover:border-blue-200 transition-all", children: "View Templates" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 flex flex-wrap items-center justify-center gap-10 text-sm font-semibold text-slate-500", children: ["No credit card required", "Free 14-day trial", "Cancel anytime"].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-blue-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
      ] }, item)) })
    ] })
  ] });
}
function Landing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-shell bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatsSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BentoGridSection, {})
    ] })
  ] });
}
export {
  Landing as component
};
