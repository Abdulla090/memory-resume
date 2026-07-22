import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Bookmark, Plus } from "lucide-react";
import { AppShell } from "@/components/app-shell/AppShell";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/jobs")({
  head: () => ({
    meta: [
      { title: "Jobs — MemoryCV" },
      {
        name: "description",
        content:
          "Live job opportunities matched to your MemoryCV profile — apply with a tailored resume in one click.",
      },
      { property: "og:title", content: "Jobs — MemoryCV" },
      {
        property: "og:description",
        content:
          "Live job opportunities matched to your MemoryCV profile.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: JobsPage,
});

type Job = {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: "Full-time" | "Contract" | "Part-time" | "Remote";
  salary: string;
  posted: string;
  match: number;
  tags: string[];
  featured?: boolean;
};

const JOBS: Job[] = [
  {
    id: "1",
    title: "Senior Product Designer",
    company: "Linear",
    logo: "L",
    location: "Remote · Europe",
    type: "Full-time",
    salary: "$140k – $180k",
    posted: "2h ago",
    match: 96,
    tags: ["Figma", "Design Systems", "SaaS"],
    featured: true,
  },
  {
    id: "2",
    title: "Frontend Engineer, Growth",
    company: "Stripe",
    logo: "S",
    location: "Dublin · Hybrid",
    type: "Full-time",
    salary: "$120k – $160k",
    posted: "5h ago",
    match: 92,
    tags: ["React", "TypeScript", "Next.js"],
  },
  {
    id: "3",
    title: "Staff Software Engineer",
    company: "Vercel",
    logo: "V",
    location: "Remote · Global",
    type: "Full-time",
    salary: "$180k – $230k",
    posted: "1d ago",
    match: 88,
    tags: ["Edge", "Node.js", "Infra"],
  },
  {
    id: "4",
    title: "Product Manager, AI",
    company: "Anthropic",
    logo: "A",
    location: "San Francisco",
    type: "Full-time",
    salary: "$200k – $260k",
    posted: "1d ago",
    match: 84,
    tags: ["AI", "PM", "Research"],
  },
  {
    id: "5",
    title: "UX Researcher (Contract)",
    company: "Figma",
    logo: "F",
    location: "Remote · US",
    type: "Contract",
    salary: "$90 – $130 / hr",
    posted: "2d ago",
    match: 79,
    tags: ["Research", "Usability"],
  },
  {
    id: "6",
    title: "Backend Engineer, Payments",
    company: "Notion",
    logo: "N",
    location: "New York · Hybrid",
    type: "Full-time",
    salary: "$150k – $200k",
    posted: "3d ago",
    match: 76,
    tags: ["Go", "Postgres", "APIs"],
  },
];

const FILTERS = ["All", "Remote", "Full-time", "Contract", "Featured"] as const;

function JobsPage() {
  const language = useAppStore((s) => s.language);
  const isKu = language === "ku";
  const isAr = language === "ar";
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    return JOBS.filter((j) => {
      if (filter === "Remote" && !j.location.toLowerCase().includes("remote")) return false;
      if (filter === "Full-time" && j.type !== "Full-time") return false;
      if (filter === "Contract" && j.type !== "Contract") return false;
      if (filter === "Featured" && !j.featured) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        return (
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [query, filter]);

  const toggleSaved = (id: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const t = {
    heading: isKu
      ? "دەرفەتی کار بۆ تۆ"
      : isAr
        ? "فرص العمل المناسبة لك"
        : "Opportunities for you",
    sub: isKu
      ? "کاری تازە هەموو ڕۆژێک، پێکەوە گونجاوی سیڤیەکەت."
      : isAr
        ? "وظائف جديدة يوميًا، مطابقة لسيرتك الذاتية."
        : "Fresh roles daily, matched to your MemoryCV profile.",
    search: isKu
      ? "گەڕان بەدوای کار، کۆمپانیا یان کارامەیی"
      : isAr
        ? "ابحث عن وظيفة أو شركة أو مهارة"
        : "Search title, company or skill",
    apply: isKu ? "پێشکەشی بکە" : isAr ? "قدّم الآن" : "Apply",
    tailor: isKu ? "سیڤی نوێ بۆم دروست بکە" : isAr ? "أنشئ سيرة مخصصة" : "Tailor CV",
    match: isKu ? "گونجانی" : isAr ? "المطابقة" : "Match",
    empty: isKu
      ? "هیچ کارێک نەدۆزراوە. فلتەرەکان بگۆڕە."
      : isAr
        ? "لا توجد نتائج. جرّب فلترًا آخر."
        : "No jobs match. Try a different filter.",
    stats: [
      { label: isKu ? "دەرفەتی چالاک" : isAr ? "فرص نشطة" : "Active roles", value: "1,284" },
      { label: isKu ? "کۆمپانیاکان" : isAr ? "شركات" : "Companies", value: "312" },
      { label: isKu ? "نوێی ئەمڕۆ" : isAr ? "جديد اليوم" : "New today", value: "47" },
    ],
  };

  return (
    <AppShell>
      {/* Header row */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end sm:gap-4">
          <div className="min-w-0">
            <h1 className="text-xl font-black tracking-tight sm:text-3xl md:text-4xl">
              {t.heading}
            </h1>
            <p className="mt-1 hidden text-sm text-neutral-500 sm:block dark:text-neutral-400">
              {t.sub}
            </p>
          </div>

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-3.5 py-2 text-[12px] font-semibold text-white transition active:scale-[0.98] hover:bg-neutral-800 sm:text-[13px] dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.4} />
            {isKu ? "سیڤی نوێ" : isAr ? "سيرة جديدة" : "New CV"}
          </Link>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {t.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-neutral-200 bg-white p-3 sm:p-4 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="text-lg font-black tracking-tight sm:text-2xl md:text-3xl">{s.value}</div>
              <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-500 sm:text-[11px] dark:text-neutral-400">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Search + filters */}
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search}
              className="h-10 w-full rounded-2xl border border-neutral-200 bg-white ps-10 pe-4 text-[13px] outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 sm:h-11 sm:text-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-white dark:focus:ring-white/10"
            />
          </div>
          <div className="flex items-center gap-1 overflow-x-auto rounded-2xl border border-neutral-200 bg-white p-1 dark:border-neutral-800 dark:bg-neutral-900">
            {FILTERS.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`shrink-0 rounded-xl px-2.5 py-1.5 text-[11px] font-semibold transition-colors sm:px-3 sm:text-[12px] ${
                    active
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                      : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>


        {/* Jobs list */}
        <div className="grid gap-3">
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-10 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900">
              {t.empty}
            </div>
          )}

          {filtered.map((job) => {
            const isSaved = saved.has(job.id);
            return (
              <article
                key={job.id}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-4 transition-colors sm:p-5 dark:border-neutral-900 dark:bg-neutral-950"
              >
                {job.featured && (
                  <span className="absolute end-4 top-4 text-[9px] font-semibold uppercase tracking-[0.14em] text-neutral-400 sm:text-[10px] dark:text-neutral-500">
                    Featured
                  </span>
                )}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                  <div className="flex items-start gap-3 sm:contents">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-neutral-200 bg-white text-[15px] font-semibold text-neutral-900 sm:h-11 sm:w-11 sm:text-base dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100">
                      {job.logo}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-semibold text-neutral-500 sm:text-[13px] dark:text-neutral-400">
                        {job.company} · {job.location}
                      </div>
                      <h3 className="mt-0.5 truncate text-[15px] font-bold tracking-tight text-neutral-900 sm:text-lg dark:text-neutral-50">
                        {job.title}
                      </h3>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-neutral-500 sm:text-[12px] dark:text-neutral-400">
                        <span>{job.type}</span>
                        <span className="text-neutral-300 dark:text-neutral-700">·</span>
                        <span>{job.salary}</span>
                        <span className="text-neutral-300 dark:text-neutral-700">·</span>
                        <span>{job.posted}</span>
                      </div>
                      <div className="mt-2 hidden flex-wrap gap-1.5 sm:flex">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10.5px] font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center justify-between gap-2 sm:flex-col sm:items-end">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10.5px] font-semibold text-neutral-700 sm:text-[11px] dark:bg-neutral-800 dark:text-neutral-300">
                        {job.match}% {t.match}
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleSaved(job.id)}
                        aria-label="Save job"
                        className={`grid h-8 w-8 place-items-center rounded-full transition active:scale-95 ${
                          isSaved
                            ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                            : "text-neutral-400 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-white"
                        }`}
                      >
                        <Bookmark className={`h-[15px] w-[15px] ${isSaved ? "fill-current" : ""}`} />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="rounded-full bg-neutral-900 px-4 py-1.5 text-[12px] font-semibold text-white transition active:scale-[0.98] hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                    >
                      {t.apply}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}

        </div>
      </div>
    </AppShell>
  );
}
