import { Link, useLocation } from "@tanstack/react-router";
import { Briefcase, FilePlus2, User as UserIcon } from "lucide-react";
import { useAppStore } from "@/lib/store";

const TABS = [
  {
    to: "/jobs",
    label: "Jobs",
    labelKu: "کارەکان",
    labelAr: "الوظائف",
    icon: Briefcase,
    match: (p: string) => p.startsWith("/jobs"),
  },
  {
    to: "/dashboard",
    label: "Create",
    labelKu: "دروستکردن",
    labelAr: "إنشاء",
    icon: FilePlus2,
    match: (p: string) =>
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
    match: (p: string) => p.startsWith("/profile"),
  },
];

export function MobileTabBar() {
  const location = useLocation();
  const language = useAppStore((s) => s.language);
  const isKu = language === "ku";
  const isAr = language === "ar";

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200/80 bg-neutral-50/90 backdrop-blur-xl md:hidden dark:border-neutral-900 dark:bg-black/85"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Primary"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-3">
        {TABS.map((tab) => {
          const active = tab.match(location.pathname);
          const Icon = tab.icon;
          const label = isKu ? tab.labelKu : isAr ? tab.labelAr : tab.label;
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium transition-colors ${
                active
                  ? "text-neutral-900 dark:text-white"
                  : "text-neutral-400 dark:text-neutral-500"
              }`}
            >
              <Icon
                className="h-[22px] w-[22px]"
                strokeWidth={active ? 2.2 : 1.7}
              />
              <span className="tracking-tight">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
