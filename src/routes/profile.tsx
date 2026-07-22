import { createFileRoute, Link } from "@tanstack/react-router";
import { User as UserIcon, Settings, FileText, LogOut, Sparkles, Briefcase, Bell, Globe } from "lucide-react";
import { AppShell } from "@/components/app-shell/AppShell";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — MemoryCV" },
      { name: "description", content: "Your MemoryCV account, resumes and preferences." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const language = useAppStore((s) => s.language);
  const profile = useAppStore((s) => s.profile);
  const resumes = useAppStore((s) => s.resumes);
  const reset = useAppStore((s) => s.reset);
  const isKu = language === "ku";
  const isAr = language === "ar";

  const name = profile?.name ?? (isKu ? "بەکارهێنەری میمۆری" : isAr ? "مستخدم" : "Your account");
  const email = profile?.email ?? "guest@memorycv.app";

  const t = {
    title: isKu ? "پرۆفایل" : isAr ? "الملف الشخصي" : "Profile",
    sub: isKu ? "بەڕێوەبردنی هەژمار و ڕێکخستنەکان" : isAr ? "إدارة حسابك وإعداداتك" : "Manage your account and preferences",
    resumes: isKu ? "سیڤییەکانم" : isAr ? "سيرتي الذاتية" : "My resumes",
    settings: isKu ? "ڕێکخستن" : isAr ? "الإعدادات" : "Settings",
    jobs: isKu ? "کاری پاشەکەوتکراو" : isAr ? "الوظائف المحفوظة" : "Saved jobs",
    logout: isKu ? "چوونەدەرەوە" : isAr ? "تسجيل الخروج" : "Sign out and reset",
    lang: isKu ? "زمان" : isAr ? "اللغة" : "Language",
    notif: isKu ? "ئاگاداری" : isAr ? "الإشعارات" : "Notifications",
  };

  const items = [
    { icon: FileText, label: t.resumes, value: `${resumes.length}`, to: "/dashboard/my-cvs" as const },
    { icon: Briefcase, label: t.jobs, value: "0", to: "/jobs" as const },
    { icon: Settings, label: t.settings, value: "", to: "/dashboard/settings" as const },
  ];

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Identity card */}
        <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
          <div className="h-24 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600" />
          <div className="-mt-10 px-6 pb-6">
            <div className="flex items-end gap-4">
              <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl border-4 border-white bg-neutral-900 text-2xl font-black text-white dark:border-neutral-900 dark:bg-white dark:text-neutral-900">
                {name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 pb-1">
                <h1 className="truncate text-xl font-black tracking-tight sm:text-2xl">{name}</h1>
                <p className="truncate text-sm text-neutral-500 dark:text-neutral-400">{email}</p>
              </div>
            </div>
            <p className="mt-3 text-[13px] text-neutral-500 dark:text-neutral-400">{t.sub}</p>
          </div>
        </section>

        {/* Quick tiles */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {items.map(({ icon: Icon, label, value, to }) => (
            <Link
              key={label}
              to={to}
              className="group rounded-2xl border border-neutral-200 bg-white p-4 transition-all hover:border-neutral-900 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-white"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
                  <Icon className="h-4 w-4" />
                </span>
                {value && (
                  <span className="text-lg font-black tracking-tight">{value}</span>
                )}
              </div>
              <div className="mt-3 text-[13px] font-semibold text-neutral-700 dark:text-neutral-200">
                {label}
              </div>
            </Link>
          ))}
        </section>

        {/* Preferences */}
        <section className="rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
          <PrefRow icon={Globe} label={t.lang} value={language.toUpperCase()} />
          <PrefRow icon={Bell} label={t.notif} value={isKu ? "چالاک" : isAr ? "مفعّل" : "On"} />
          <PrefRow icon={Sparkles} label="AI assistant" value="Gemini 2.5" last />
        </section>

        {/* Sign out */}
        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined" && window.confirm(isKu ? "دڵنیای؟" : isAr ? "متأكد؟" : "Reset your local session?")) {
              reset();
              window.location.href = "/";
            }
          }}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:border-red-500 hover:text-red-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-red-500 dark:hover:text-red-400"
        >
          <LogOut className="h-4 w-4" /> {t.logout}
        </button>
      </div>
    </AppShell>
  );
}

function PrefRow({
  icon: Icon,
  label,
  value,
  last,
}: {
  icon: typeof UserIcon;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3.5 ${
        last ? "" : "border-b border-neutral-100 dark:border-neutral-800"
      }`}
    >
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
        <Icon className="h-4 w-4" />
      </span>
      <span className="flex-1 text-[13px] font-semibold text-neutral-700 dark:text-neutral-200">
        {label}
      </span>
      <span className="text-[12px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        {value}
      </span>
    </div>
  );
}
