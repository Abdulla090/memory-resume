import { createFileRoute, Outlet, Link, useLocation } from "@tanstack/react-router";
import {
  Home,
  Files,
  LayoutTemplate,
  PenTool,
  Wand2,
  BarChart2,
  FileText,
  Briefcase,
  Settings,
  BrainCircuit,
  ChevronRight,
  Menu,
  X,
  Heart,
  Sparkles,
  Bot,
  Moon,
  Sun,
} from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { useDarkMode } from "@/hooks/use-dark-mode";


export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

type NavItem = {
  name: string;
  icon: typeof Home;
  path: string;
  group: "create" | "ai" | "track" | "account";
};

function DashboardLayout() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const language = useAppStore((state) => state.language);
  const isKu = language === "ku";
  const { isDark, toggle: toggleDark } = useDarkMode();


  const navItems: NavItem[] = [
    { name: isKu ? "سەرەتا" : "Home", icon: Home, path: "/dashboard", group: "create" },
    { name: isKu ? "سیڤییەکانم" : "My CVs", icon: Files, path: "/dashboard/my-cvs", group: "create" },
    { name: isKu ? "قاڵبەکان" : "Templates", icon: LayoutTemplate, path: "/templates", group: "create" },
    { name: isKu ? "نووسەری AI" : "AI Writer", icon: PenTool, path: "/dashboard/ai-writer", group: "ai" },
    { name: isKu ? "باشترکردنی AI" : "AI Optimize", icon: Wand2, path: "/dashboard/ai-optimize", group: "ai" },
    { name: isKu ? "ئاژانسی کار" : "Job Agent", icon: Bot, path: "/dashboard/job-agent", group: "ai" },
    { name: isKu ? "شیکاری" : "Analytics", icon: BarChart2, path: "/dashboard/analytics", group: "track" },
    { name: isKu ? "نامەی ڕووپۆش" : "Cover Letters", icon: FileText, path: "/dashboard/cover-letters", group: "create" },
    { name: isKu ? "کارتی سوپاس" : "Thank-you cards", icon: Heart, path: "/dashboard/thanks", group: "create" },
    { name: isKu ? "چاودێری کار" : "Job Tracker", icon: Briefcase, path: "/dashboard/job-tracker", group: "track" },
    { name: isKu ? "ڕێکخستن" : "Settings", icon: Settings, path: "/dashboard/settings", group: "account" },
  ];

  const groupLabels: Record<NavItem["group"], string> = isKu
    ? { create: "دروستکردن", ai: "زیرەکی دەستکرد", track: "بەدواداچوون", account: "هەژمار" }
    : { create: "Create", ai: "AI tools", track: "Track", account: "Account" };

  const groupedNav = (["create", "ai", "track", "account"] as const).map((group) => ({
    group,
    items: navItems.filter((item) => item.group === group),
  }));

  return (
    <div
      className="app-shell flex h-screen overflow-hidden font-sans bg-slate-50/60"
      dir={isKu ? "rtl" : "ltr"}
    >

      {/* Mobile dim overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm lg:hidden transition-opacity duration-200 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative z-50 lg:z-auto inset-y-0
          ${isKu ? "right-0 lg:border-l" : "left-0 lg:border-r"}
          flex flex-col h-full overflow-hidden shrink-0
          border-slate-200/80 bg-white
          transition-[width,transform] duration-300 ease-out
          ${isOpen
            ? "w-[268px] shadow-[12px_0_40px_-20px_rgba(15,23,42,0.18)]"
            : `${isKu ? "translate-x-full lg:translate-x-0" : "-translate-x-full lg:translate-x-0"} lg:w-[76px] w-[268px]`
          }
        `}
      >
        {/* Logo / toggle row */}
        <div className={`flex items-center px-4 pt-5 pb-4 ${isOpen ? "gap-3" : "lg:justify-center"}`}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            title={isKu ? "گۆڕینی لیست" : "Toggle sidebar"}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-[0_8px_20px_-8px_rgba(37,99,235,0.6)] transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            {isOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              isOpen ? "max-w-[160px] opacity-100" : "max-w-0 opacity-0"
            }`}
            style={{ whiteSpace: "nowrap" }}
          >
            <Link
              to="/"
              className="flex items-center gap-1.5 text-[15px] font-extrabold tracking-tight leading-tight text-slate-900 hover:text-blue-600 transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-blue-500" />
              {isKu ? "میمۆری سیڤی" : "MemoryCV"}
            </Link>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2.5 pb-4 [scrollbar-width:thin]">
          {groupedNav.map(({ group, items }) => (
            <div key={group} className="mb-3 last:mb-0">
              <div
                className={`px-3 pt-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 transition-opacity duration-200 ${
                  isOpen ? "opacity-100" : "opacity-0 lg:hidden"
                }`}
              >
                {groupLabels[group]}
              </div>

              <div className="space-y-0.5">
                {items.map((item) => {
                  const isActive =
                    location.pathname === item.path ||
                    (item.path !== "/dashboard" && location.pathname.startsWith(item.path));

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      title={item.name}
                      onClick={() => setIsOpen(false)}
                      className={`
                        group relative flex items-center gap-3 rounded-xl py-2.5 font-medium
                        transition-all duration-150
                        ${isOpen ? "px-3" : "lg:justify-center lg:px-0 px-3"}
                        ${isActive
                          ? "bg-blue-50 text-blue-700 shadow-[inset_0_0_0_1px_rgba(37,99,235,0.18)]"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        }
                      `}
                    >
                      {/* Active accent bar (LTR/RTL aware) */}
                      {isActive && (
                        <span
                          className={`absolute top-1.5 bottom-1.5 w-[3px] rounded-full bg-blue-600 ${
                            isKu ? "right-0" : "left-0"
                          }`}
                          style={{ boxShadow: "0 0 8px rgba(37,99,235,0.5)" }}
                        />
                      )}

                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-150 ${
                          isActive
                            ? "bg-blue-600 text-white shadow-[0_6px_16px_-8px_rgba(37,99,235,0.6)]"
                            : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700"
                        }`}
                      >
                        <item.icon className="h-[16px] w-[16px]" />
                      </span>

                      <span
                        className={`truncate whitespace-nowrap text-[13.5px] transition-all duration-200 overflow-hidden ${
                          isOpen ? "max-w-[160px] opacity-100" : "max-w-0 opacity-0"
                        }`}
                      >
                        {item.name}
                      </span>

                      {isActive && isOpen && (
                        <ChevronRight
                          className={`ms-auto h-3.5 w-3.5 shrink-0 text-blue-500 ${
                            isKu ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* AI Memory card */}
        <div
          className="px-3 pb-4"
          style={{
            transition: "opacity 200ms ease, visibility 200ms ease, max-height 200ms ease",
            opacity: isOpen ? 1 : 0,
            visibility: isOpen ? "visible" : "hidden",
            maxHeight: isOpen ? "200px" : "0",
          }}
        >
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 shadow-[0_8px_24px_-16px_rgba(37,99,235,0.35)]">
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-[0_8px_20px_-8px_rgba(37,99,235,0.7)]">
                <BrainCircuit className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[12.5px] font-bold leading-tight text-slate-900">
                  {isKu ? "یادگەی AI" : "AI memory"}
                </div>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                    style={{ boxShadow: "0 0 6px rgba(16,185,129,0.7)" }}
                  />
                  <span className="text-[10px] font-semibold text-emerald-600">
                    {isKu ? "چالاکە" : "Active"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-1.5 flex justify-between text-[10px] font-semibold text-slate-500">
              <span>{isKu ? "بەکارهێنان" : "Usage"}</span>
              <span className="text-slate-700">68%</span>
            </div>
            <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200/70">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500"
                style={{
                  width: "68%",
                  boxShadow: "0 0 8px rgba(37,99,235,0.4)",
                  marginLeft: isKu ? "auto" : undefined,
                }}
              />
            </div>

            <Link
              to="/dashboard/settings"
              className="inline-flex items-center gap-1 text-[10.5px] font-bold text-blue-700 transition-colors hover:text-blue-800"
            >
              {isKu ? "زیاتر بزانە" : "Learn more"}
              <ChevronRight className={`h-3 w-3 ${isKu ? "rotate-180" : ""}`} />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="perf-scroll relative min-w-0 flex-1 h-full overflow-y-auto bg-background p-4 text-foreground sm:p-6 lg:p-10">
        {/* Top bar: mobile hamburger + dark toggle */}
        <div className="mb-6 flex items-center justify-between">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-muted lg:hidden"
            onClick={() => setIsOpen(true)}
            aria-label={isKu ? "کردنەوەی لیست" : "Open menu"}
          >
            <Menu className="h-5 w-5" />
          </button>
          <button
            onClick={toggleDark}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? (isKu ? "دۆخی ڕووناک" : "Light mode") : (isKu ? "دۆخی تاریک" : "Dark mode")}
            className="ms-auto flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900"
          >
            {isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          </button>
        </div>
        <Outlet />
      </main>

    </div>
  );
}
