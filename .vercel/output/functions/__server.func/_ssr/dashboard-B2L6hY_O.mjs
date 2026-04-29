import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useLocation, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { u as useAppStore } from "./router-Be2FOauz.mjs";
import "../_libs/sonner.mjs";
import { X, M as Menu, H as House, e as Files, L as LayoutTemplate, f as PenTool, W as WandSparkles, g as ChartNoAxesColumn, F as FileText, B as Briefcase, S as Settings, h as BrainCircuit, i as ChevronRight } from "../_libs/lucide-react.mjs";
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
function DashboardLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = reactExports.useState(false);
  const language = useAppStore((state) => state.language);
  const isKu = language === "ku";
  const navItems = [{
    name: isKu ? "سەرەتا" : "Home",
    icon: House,
    path: "/dashboard"
  }, {
    name: isKu ? "سیڤییەکانم" : "My CVs",
    icon: Files,
    path: "/dashboard/my-cvs"
  }, {
    name: isKu ? "تیمپڵەیتەکان" : "Templates",
    icon: LayoutTemplate,
    path: "/templates"
  }, {
    name: isKu ? "نووسەری AI" : "AI Writer",
    icon: PenTool,
    path: "/dashboard/ai-writer"
  }, {
    name: isKu ? "باشترکردنی AI" : "AI Optimize",
    icon: WandSparkles,
    path: "/dashboard/ai-optimize"
  }, {
    name: isKu ? "شیکاری" : "Analytics",
    icon: ChartNoAxesColumn,
    path: "/dashboard/analytics"
  }, {
    name: isKu ? "نامەی ڕووپۆش" : "Cover Letters",
    icon: FileText,
    path: "/dashboard/cover-letters"
  }, {
    name: isKu ? "چاودێری کار" : "Job Tracker",
    icon: Briefcase,
    path: "/dashboard/job-tracker"
  }, {
    name: isKu ? "ڕێکخستنەکان" : "Settings",
    icon: Settings,
    path: "/dashboard/settings"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-screen bg-[#f0f7ff] font-sans text-slate-800 overflow-hidden", children: [
    isSidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden", onClick: () => setIsSidebarOpen(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: `
        fixed md:relative z-50 md:z-auto
        bg-white border-x border-slate-100 flex flex-col justify-between py-6 shrink-0 h-full overflow-y-auto
        transition-all duration-300 ease-in-out
        ${isSidebarOpen ? "w-[280px] translate-x-0" : `${isKu ? "translate-x-full md:translate-x-0" : "-translate-x-full md:translate-x-0"} md:w-[80px] w-[280px]`}
      `, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center px-4 mb-10 ${isSidebarOpen ? "gap-3" : "md:justify-center"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsSidebarOpen(!isSidebarOpen), className: "w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30 text-white shrink-0 cursor-pointer hover:bg-blue-600 transition-colors", title: isKu ? "پیشاندانی لیستی لاتەنیشت" : "Toggle Sidebar", children: isSidebarOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" }) }),
          isSidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-slate-900 tracking-tight leading-tight", children: isKu ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "دروستکەری",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "سیڤی AI"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "AI CV",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Builder"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "space-y-1 px-3", children: navItems.map((item) => {
          const isActive = location.pathname === item.path || item.path !== "/dashboard" && location.pathname.startsWith(item.path);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: item.path, title: item.name, onClick: () => setIsSidebarOpen(false), className: `flex items-center gap-3 py-3.5 rounded-2xl font-bold transition-all
                    ${isSidebarOpen ? "px-4" : "md:justify-center md:px-0 px-4"}
                    ${isActive ? "bg-[#f4f9ff] text-blue-600" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-5 h-5 shrink-0" }),
            isSidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: item.name }),
            !isSidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate md:hidden", children: item.name })
          ] }, item.name);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `px-4 mt-10 transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 hidden"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-b from-white to-[#f8fbff] border border-blue-100 p-5 rounded-3xl shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-start mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrainCircuit, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-blue-600", children: isKu ? "یادگەی AI" : "AI Memory" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-[10px] font-bold text-emerald-500 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500" }),
              " ",
              isKu ? "کراوەتەوە" : "On"
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] font-bold text-slate-500 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isKu ? "بەکارهێنانی یادگە" : "Memory Usage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-900", children: "68%" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full bg-blue-100 rounded-full overflow-hidden mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full bg-blue-500 rounded-full w-[68%] ${isKu ? "ml-auto" : ""}` }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "text-[10px] font-bold text-blue-600 flex items-center gap-1 hover:underline cursor-pointer", children: [
          isKu ? "زیاتر بزانە" : "Learn more",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: `w-3 h-3 ${isKu ? "rotate-180" : ""}` })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 h-full overflow-y-auto p-4 sm:p-6 lg:p-10 relative min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "md:hidden mb-4 w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30 text-white cursor-pointer hover:bg-blue-600 transition-colors", onClick: () => setIsSidebarOpen(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
    ] })
  ] });
}
export {
  DashboardLayout as component
};
