import { Link, useLocation } from "@tanstack/react-router";
import { Briefcase, FilePlus2, User as UserIcon, Moon, Sun } from "lucide-react";
import type { ReactNode } from "react";
import { useAppStore } from "@/lib/store";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { MobileTabBar } from "./MobileTabBar";

type Tab = {
  to: string;
  label: string;
  labelKu: string;
  labelAr: string;
  icon: typeof Briefcase;
  match: (path: string) => boolean;
};

const TABS: Tab[] = [
  {
    to: "/jobs",
    label: "Jobs",
    labelKu: "کارەکان",
    labelAr: "الوظائف",
    icon: Briefcase,
    match: (p) => p.startsWith("/jobs"),
  },
  {
    to: "/dashboard",
    label: "Create",
    labelKu: "دروستکردن",
    labelAr: "إنشاء",
    icon: FilePlus2,
    match: (p) =>
      p.startsWith("/dashboard") ||
      p.startsWith("/editor") ||
      p.startsWith("/onboarding") ||
      p.startsWith("/templates"),
  },
  {
    to: "/profile",
    label: "Profile",
    labelKu: "پرۆفایل",
    labelAr: "الملف",
    icon: UserIcon,
    match: (p) => p.startsWith("/profile") || p.startsWith("/dashboard/settings"),
  },
];

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const language = useAppStore((s) => s.language);
  const { isDark, toggle } = useDarkMode();
  const isKu = language === "ku";
  const isAr = language === "ar";
  const dir = isKu || isAr ? "rtl" : "ltr";

  const tabLabel = (t: Tab) => (isKu ? t.labelKu : isAr ? t.labelAr : t.label);
  const activeTab = TABS.find((t) => t.match(location.pathname));

  return (
    <div
      className="app-shell min-h-screen bg-neutral-50 text-neutral-900 dark:bg-black dark:text-neutral-100"
      dir={dir}
    >
      {/* Top bar — native app feel */}
      <header
        className="sticky top-0 z-40 border-b border-neutral-200/70 bg-neutral-50/85 backdrop-blur-xl dark:border-neutral-900 dark:bg-black/80"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto flex h-12 max-w-7xl items-center px-4 sm:h-14 sm:px-6">
          {/* Mobile: page title (native look) */}
          <div className="flex min-w-0 flex-1 items-center md:hidden">
            <h1 className="truncate text-[17px] font-semibold tracking-tight">
              {activeTab ? tabLabel(activeTab) : "MemoryCV"}
            </h1>
          </div>

          {/* Desktop: wordmark + nav */}
          <Link
            to="/jobs"
            className="hidden shrink-0 text-[15px] font-semibold tracking-tight md:block"
          >
            MemoryCV
          </Link>
          <nav className="ms-6 hidden items-center gap-1 md:flex">
            {TABS.map((tab) => {
              const active = tab.match(location.pathname);
              return (
                <Link
                  key={tab.to}
                  to={tab.to}
                  className={`rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors ${
                    active
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                      : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  }`}
                >
                  {tabLabel(tab)}
                </Link>
              );
            })}
          </nav>

          <div className="ms-auto flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              aria-label="Toggle theme"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition active:scale-95 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            >
              {isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
            </button>
            <Link
              to="/profile"
              aria-label="Profile"
              className="grid h-8 w-8 place-items-center rounded-full bg-neutral-200 text-[12px] font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
            >
              U
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto w-full max-w-7xl px-4 py-5 pb-28 sm:px-6 md:pb-10">
        {children}
      </main>

      <MobileTabBar />
    </div>
  );
}
