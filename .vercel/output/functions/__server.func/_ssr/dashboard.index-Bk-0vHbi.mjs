import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAppStore, L as LeftCardSVG, C as CenterCardSVG } from "./router-C7Ivgt10.mjs";
import "../_libs/sonner.mjs";
import { q as Plus, r as Upload, j as BrainCircuit, F as FileText, h as PenTool, C as CircleCheck, S as Settings, o as ArrowRight, E as EllipsisVertical, W as WandSparkles, L as LayoutTemplate, B as Briefcase, i as ChartNoAxesColumn, s as Sun } from "../_libs/lucide-react.mjs";
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
function DashboardIndex() {
  const language = useAppStore((state) => state.language);
  const isKu = language === "ku";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto space-y-4 sm:space-y-6 pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 rounded-[2rem] bg-gradient-to-br from-[#e6f2ff] to-[#f0f7ff] p-6 sm:p-10 relative overflow-hidden border border-white shadow-sm flex flex-col justify-center min-h-[280px] sm:min-h-[300px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-10 top-10 w-40 h-20 bg-white/40 blur-2xl rounded-full pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-[15%] bottom-[-30%] w-[300px] h-[200px] bg-blue-200/20 blur-3xl rounded-full pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 w-[220px] sm:w-[280px] h-[260px] sm:h-[320px] pointer-events-none select-none hidden sm:block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-[180px] origin-center shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-2xl", style: {
            transform: "rotate(8deg) translateX(10px) translateY(-10px)"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LeftCardSVG, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-[190px] origin-center z-10 shadow-[0_25px_35px_rgba(37,99,235,0.15)] rounded-lg", style: {
            transform: "rotate(-6deg) translateX(-10px) translateY(5px)"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CenterCardSVG, {}) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-[400px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block text-sm font-bold text-slate-600 mb-4 bg-white/60 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm", children: isKu ? "سڵاو! 👋" : "Hello! 👋" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-3 sm:mb-4", children: isKu ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "با زیرەکی دەستکرد",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "سیڤییەکی نایابت بۆ دروست بکات"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Let AI build your",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "perfect CV"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 font-medium mb-8 text-sm md:text-base max-w-[280px]", children: isKu ? "زیرەک. تایبەت. پشت بەستوو بە یادگە. دروستکراوە بۆ دەرفەتی داهاتووت." : "Smart. Personalized. Memory-based. Built for your next opportunity." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 sm:gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/onboarding", className: "flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-5 h-5" }),
              " ",
              isKu ? "دروستکردنی سیڤیی نوێ" : "Create New CV"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-2xl font-bold shadow-sm border border-blue-100 hover:shadow-md transition-all", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5" }),
              " ",
              isKu ? "بارکردنی سیڤیی هەبوو" : "Upload Existing"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm flex flex-col justify-between min-h-[300px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrainCircuit, { className: "w-6 h-6" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-extrabold text-slate-900", children: isKu ? "یادگەی زیرەکی دەستکرد" : "AI Memory" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-sm font-medium mb-6 leading-relaxed", children: isKu ? "ئەزموون، شارەزایی و ئارەزووەکانت لە یاد دەهێڵمەوە بۆ ئەوەی هەر سیڤییەک باشتر بکەم." : "I remember your experience, skills, and preferences to make every CV better." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [{
            label: isKu ? "ئەزموونەکان" : "Experiences",
            count: 24,
            icon: FileText
          }, {
            label: isKu ? "شارەزاییەکان" : "Skills",
            count: 18,
            icon: PenTool
          }, {
            label: isKu ? "دەستکەوتەکان" : "Achievements",
            count: 15,
            icon: CircleCheck
          }, {
            label: isKu ? "ئارەزووەکان" : "Preferences",
            count: 12,
            icon: Settings
          }].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 p-3 rounded-2xl flex gap-3 items-center border border-slate-100/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-500 shadow-sm shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold text-slate-900 leading-none", children: item.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-medium text-slate-500 mt-1", children: [
                item.count,
                " ",
                isKu ? "پاشەکەوتکراوە" : "saved"
              ] })
            ] })
          ] }, item.label)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-between items-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-slate-400 font-semibold leading-tight", children: [
            isKu ? "دوایین نوێکردنەوەی یادگە" : "Memory last updated",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-600", children: isKu ? "ئەمڕۆ، ١٠:٣٠ بەیانی" : "Today, 10:30 AM" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline", children: [
            isKu ? "بەڕێوەبردنی یادگە" : "Manage Memory",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: `w-3 h-3 ${isKu ? "rotate-180" : ""}` })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-900", children: isKu ? "سیڤییەکانم" : "My CVs" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard/my-cvs", className: "text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline", children: [
            isKu ? "هەمووی ببینە" : "View all",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: `w-3 h-3 ${isKu ? "rotate-180" : ""}` })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [{
          title: "Senior Product Designer",
          date: "Updated 2h ago",
          score: 92
        }, {
          title: "Full Stack Developer",
          date: "Updated 1d ago",
          score: 81
        }, {
          title: "UX Designer",
          date: "Updated 3d ago",
          score: 85
        }].map((cv, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 -mx-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group border border-transparent hover:border-slate-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:shadow-sm group-hover:text-blue-500 transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-slate-900", children: cv.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-slate-500 font-medium mt-0.5", children: cv.date })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md", children: [
              cv.score,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-slate-300 hover:text-slate-900 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "w-4 h-4" }) })
          ] })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm relative overflow-hidden flex flex-col items-center justify-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-blue-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-slate-900 flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "w-5 h-5 text-blue-500" }),
          " ",
          isKu ? "باشترکردنی زیرەکی دەستکرد" : "AI Optimize"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-slate-500 mb-6", children: isKu ? "سیڤییەکەت بە پێشنیاری زیرەکی دەستکرد باشتر بکە." : "Improve your CV with AI suggestions." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-8 w-full mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-24 h-24 flex items-center justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-full h-full transform -rotate-90", viewBox: "0 0 100 100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "50", r: "40", stroke: "#f1f5f9", strokeWidth: "8", fill: "none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "50", r: "40", stroke: "#3b82f6", strokeWidth: "8", fill: "none", strokeDasharray: "251.2", strokeDashoffset: "20.096", strokeLinecap: "round" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-black text-slate-900 leading-none", children: "92" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-slate-500 mt-1", children: "Score" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 text-left", children: isKu ? ["ناوەڕۆک", "پێکهاتە", "وشە سەرەکییەکان", "کاریگەری"].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[11px] font-bold text-slate-600", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-500" }),
            " ",
            item
          ] }, item)) : ["Content", "Structure", "Keywords", "Impact"].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[11px] font-bold text-slate-600", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-500" }),
            " ",
            item
          ] }, item)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all text-sm flex justify-center items-center gap-2 hover:-translate-y-0.5", children: [
          isKu ? "ئێستا باشتر بکە" : "Optimize Now",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: `w-4 h-4 ${isKu ? "rotate-180" : ""}` })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutTemplate, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-900", children: isKu ? "تیمپڵەیتەکان" : "Templates" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/templates", className: "text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline", children: [
            isKu ? "هەمووی ببینە" : "View all",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: `w-3 h-3 ${isKu ? "rotate-180" : ""}` })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4", children: ["Modern", "Professional", "Creative"].map((name) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full aspect-[1/1.414] bg-slate-100 rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full bg-white p-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1/3 h-1.5 bg-slate-300 rounded mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1/4 h-1 bg-slate-200 rounded mb-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1 bg-slate-100 rounded mb-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5/6 h-1 bg-slate-100 rounded mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1/3 h-10 bg-slate-50 rounded" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2/3 h-10 bg-slate-50 rounded" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-slate-600", children: name })
        ] }, name)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PenTool, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-900", children: isKu ? "نووسەری زیرەکی دەستکرد" : "AI Writer" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-slate-500 mb-6 pl-10", children: isKu ? "ناوەڕۆکی تایبەت بۆ سیڤییەکەت دروست بکە" : "Generate tailored content for your CV" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 mb-6", children: isKu ? ["پوختەی پیشەیی", "ئەزموونی کار", "دەستکەوتە سەرەکییەکان", "بەشی شارەزایی"].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "px-3 py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 text-[10px] font-bold rounded-xl transition-colors border border-blue-100/50 text-center", children: item }, item)) : ["Professional Summary", "Work Experience", "Key Achievements", "Skills Section"].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "px-3 py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 text-[10px] font-bold rounded-xl transition-colors border border-blue-100/50 text-center", children: item }, item)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all text-sm flex justify-center items-center gap-2 hover:-translate-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "w-4 h-4" }),
          " ",
          isKu ? "دروستکردن بە زیرەکی دەستکرد" : "Generate with AI"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-900", children: isKu ? "چاودێری کار" : "Job Tracker" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard/job-tracker", className: "text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline", children: [
            isKu ? "هەمووی ببینە" : "View all",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: `w-3 h-3 ${isKu ? "rotate-180" : ""}` })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: isKu ? [{
          role: "دیزاینەری بەرهەم",
          company: "Google",
          status: "چاوپێکەوتن",
          date: "٢٢ ئایار",
          color: "text-blue-600 bg-blue-50 border-blue-200"
        }, {
          role: "دیزاینەری UI/UX",
          company: "Microsoft",
          status: "پێشکەشکراوە",
          date: "١٨ ئایار",
          color: "text-emerald-600 bg-emerald-50 border-emerald-200"
        }, {
          role: "پێشەنگی دیزاین",
          company: "Netflix",
          status: "پاڵێوراو",
          date: "١٥ ئایار",
          color: "text-amber-600 bg-amber-50 border-amber-200"
        }].map((job, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-slate-50 pb-4 last:border-0 last:pb-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-slate-900", children: job.role }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-medium text-slate-500 mt-0.5", children: job.company })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-[10px] font-bold px-2.5 py-1 rounded-full border ${job.color}`, children: job.status }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-[10px] font-bold text-slate-400 w-10 ${isKu ? "text-left" : "text-right"}`, children: job.date })
          ] })
        ] }, i)) : [{
          role: "Product Designer",
          company: "Google",
          status: "Interview",
          date: "May 22",
          color: "text-blue-600 bg-blue-50 border-blue-200"
        }, {
          role: "UI/UX Designer",
          company: "Microsoft",
          status: "Applied",
          date: "May 18",
          color: "text-emerald-600 bg-emerald-50 border-emerald-200"
        }, {
          role: "Design Lead",
          company: "Netflix",
          status: "Shortlisted",
          date: "May 15",
          color: "text-amber-600 bg-amber-50 border-amber-200"
        }].map((job, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-slate-50 pb-4 last:border-0 last:pb-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-slate-900", children: job.role }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-medium text-slate-500 mt-0.5", children: job.company })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-[10px] font-bold px-2.5 py-1 rounded-full border ${job.color}`, children: job.status }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-[10px] font-bold text-slate-400 w-10 ${isKu ? "text-left" : "text-right"}`, children: job.date })
          ] })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-900", children: isKu ? "شیکاری" : "Analytics" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard/analytics", className: "text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline", children: [
            isKu ? "هەمووی ببینە" : "View all",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: `w-3 h-3 ${isKu ? "rotate-180" : ""}` })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 h-[140px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 border border-slate-100 rounded-2xl p-4 flex flex-col justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold text-slate-500", children: isKu ? "بینینی پرۆفایل" : "Profile Views" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-black text-slate-900 leading-none", children: "247" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold text-emerald-500 mb-1", children: "↑ 18%" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-full h-10 mt-auto", viewBox: "0 0 100 30", preserveAspectRatio: "none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 25 L20 20 L40 28 L60 15 L80 18 L100 5", fill: "none", stroke: "#3b82f6", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 25 L20 20 L40 28 L60 15 L80 18 L100 5 V30 H0 Z", fill: "url(#sparkGrad)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "sparkGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#3b82f6", stopOpacity: "0.2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#3b82f6", stopOpacity: "0" })
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-2/5 border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold text-slate-500 mb-3", children: isKu ? "ڕێژەی گونجان" : "Match Score" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-16 h-16 flex items-center justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-full h-full transform -rotate-90", viewBox: "0 0 100 100", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "50", r: "40", stroke: "#f1f5f9", strokeWidth: "10", fill: "none" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "50", r: "40", stroke: "#3b82f6", strokeWidth: "10", fill: "none", strokeDasharray: "251.2", strokeDashoffset: "32.656", strokeLinecap: "round" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-black text-slate-900 leading-none", children: "87%" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-emerald-500 mt-2", children: isKu ? "نایاب" : "Excellent" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2rem] bg-gradient-to-r from-blue-50 to-[#e0f2fe] border border-blue-100 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "w-6 h-6 text-amber-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold text-slate-900", children: isKu ? "ئامۆژگاری ئەمڕۆ" : "Tip of the day" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-slate-600 mt-1", children: isKu ? "دەستکەوتە ژمارەییەکان زیاد بکە بۆ ئەزموونەکەت بۆ ئەوەی سەرنجی دامەزرێنەران ڕابکێشیت." : "Add quantified achievements to your experience to stand out to recruiters." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "bg-white text-blue-600 text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm hover:shadow border border-blue-100 transition-all flex items-center gap-1 shrink-0", children: [
        isKu ? "نموونە ببینە" : "See Example",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: `w-3 h-3 ${isKu ? "rotate-180" : ""}` })
      ] })
    ] })
  ] });
}
export {
  DashboardIndex as component
};
