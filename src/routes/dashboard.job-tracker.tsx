import { createFileRoute } from "@tanstack/react-router";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { Briefcase, Building2, CalendarClock, CircleCheck, Plus, Trash2 } from "lucide-react";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/dashboard/job-tracker")({
  head: () => ({
    meta: [
      { title: "Job Tracker — MemoryCV" },
      { name: "description", content: "Track every application, stage and follow-up across your job search." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: JobTrackerPage,
});

type JobStatus = "saved" | "applied" | "interview" | "offer" | "rejected";

type JobApplication = {
  id: string;
  role: string;
  company: string;
  status: JobStatus;
  source: string;
  resumeId?: string;
  updatedAt: number;
};

const STORAGE_KEY = "memorycv-job-tracker";

const statusMeta: Record<JobStatus, { label: string; labelKu: string; className: string }> = {
  saved: {
    label: "Saved",
    labelKu: "پاشەکەوتکراو",
    className: "bg-slate-50 text-slate-700 border-slate-200",
  },
  applied: {
    label: "Applied",
    labelKu: "نێردراو",
    className: "bg-blue-50 text-blue-700 border-blue-100",
  },
  interview: {
    label: "Interview",
    labelKu: "چاوپێکەوتن",
    className: "bg-amber-50 text-amber-700 border-amber-100",
  },
  offer: {
    label: "Offer",
    labelKu: "ئۆفەر",
    className: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  rejected: {
    label: "Closed",
    labelKu: "داخراو",
    className: "bg-rose-50 text-rose-700 border-rose-100",
  },
};

function JobTrackerPage() {
  const language = useAppStore((state) => state.language);
  const resumes = useAppStore((state) => state.resumes);
  const isKu = language === "ku";
  const [items, setItems] = useState<JobApplication[]>([]);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [source, setSource] = useState("");
  const [resumeId, setResumeId] = useState(resumes[0]?.id ?? "");

  useEffect(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as JobApplication[];
      setItems(Array.isArray(parsed) ? parsed : []);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const stats = useMemo(
    () => ({
      total: items.length,
      active: items.filter((item) => !["offer", "rejected"].includes(item.status)).length,
      interviews: items.filter((item) => item.status === "interview").length,
    }),
    [items],
  );

  const addApplication = (event: FormEvent) => {
    event.preventDefault();
    const nextRole = role.trim();
    const nextCompany = company.trim();
    if (!nextRole || !nextCompany) return;
    setItems((prev) => [
      {
        id: crypto.randomUUID(),
        role: nextRole,
        company: nextCompany,
        status: "saved",
        source: source.trim(),
        resumeId: resumeId || undefined,
        updatedAt: Date.now(),
      },
      ...prev,
    ]);
    setRole("");
    setCompany("");
    setSource("");
  };

  const updateStatus = (id: string, status: JobStatus) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status, updatedAt: Date.now() } : item)),
    );
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6" dir={isKu ? "rtl" : "ltr"}>
      <header className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_-36px_rgba(15,23,42,0.35)] sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <Briefcase className="size-6" aria-hidden />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              {isKu ? "چاودێری کار" : "Job Tracker"}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              {isKu
                ? "داواکارییەکانت، قۆناغەکان، و ئەو سیڤییەی بۆ هەر کارێک بەکارهاتووە لە یەک شوێن بهێڵەوە."
                : "Track applications, stages, and the resume used for each opportunity in one calm workspace."}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center sm:min-w-[360px]">
            {[
              { label: isKu ? "هەموو" : "Total", value: stats.total },
              { label: isKu ? "چالاک" : "Active", value: stats.active },
              { label: isKu ? "چاوپێکەوتن" : "Interviews", value: stats.interviews },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="font-mono text-xl font-bold text-slate-950">{stat.value}</div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="grid gap-5 lg:grid-cols-[360px_1fr]">
        <form onSubmit={addApplication} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-950">
            <Plus className="size-4 text-blue-700" aria-hidden />
            {isKu ? "داواکاری نوێ" : "Add application"}
          </h2>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="text-xs font-semibold text-slate-600">{isKu ? "ڕۆڵ" : "Role"}</span>
              <input
                value={role}
                onChange={(event) => setRole(event.target.value)}
                placeholder={isKu ? "ئەندازیاری نەرمەکاڵا" : "Product Designer"}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-colors focus:border-blue-400 focus:bg-white"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-slate-600">{isKu ? "کۆمپانیا" : "Company"}</span>
              <input
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                placeholder={isKu ? "ناوی کۆمپانیا" : "Company name"}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-colors focus:border-blue-400 focus:bg-white"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-slate-600">{isKu ? "سەرچاوە" : "Source"}</span>
              <input
                value={source}
                onChange={(event) => setSource(event.target.value)}
                placeholder={isKu ? "LinkedIn، سایتی کۆمپانیا..." : "LinkedIn, company site..."}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-colors focus:border-blue-400 focus:bg-white"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-slate-600">{isKu ? "سیڤی" : "Resume"}</span>
              <select
                value={resumeId}
                onChange={(event) => setResumeId(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-colors focus:border-blue-400 focus:bg-white"
              >
                <option value="">{isKu ? "هیچ" : "No resume linked"}</option>
                {resumes.map((resume) => (
                  <option key={resume.id} value={resume.id}>
                    {resume.title || resume.jobTarget}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="flex min-h-11 w-full items-center justify-center rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white transition-colors active:scale-[0.99] disabled:opacity-50"
              disabled={!role.trim() || !company.trim()}
            >
              {isKu ? "زیادکردن" : "Add to tracker"}
            </button>
          </div>
        </form>

        <div className="rounded-[24px] border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          {items.length === 0 ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
              <CircleCheck className="size-9 text-blue-700" aria-hidden />
              <h2 className="mt-4 text-base font-semibold text-slate-950">
                {isKu ? "هێشتا داواکاری نییە" : "No applications yet"}
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">
                {isKu
                  ? "یەکەم کارەکەت زیاد بکە و قۆناغەکەی بە سادەیی بگۆڕە."
                  : "Add your first role, then move it through saved, applied, interview, and offer stages."}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {items.map((item) => {
                const linkedResume = resumes.find((resume) => resume.id === item.resumeId);
                const meta = statusMeta[item.status];
                return (
                  <article key={item.id} className="grid gap-4 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="truncate text-base font-semibold text-slate-950">{item.role}</h2>
                        <span className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${meta.className}`}>
                          {isKu ? meta.labelKu : meta.label}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <Building2 className="size-3.5" aria-hidden />
                          {item.company}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <CalendarClock className="size-3.5" aria-hidden />
                          {new Date(item.updatedAt).toLocaleDateString()}
                        </span>
                        {item.source && <span>{item.source}</span>}
                        {linkedResume && <span>{isKu ? "سیڤی:" : "Resume:"} {linkedResume.title}</span>}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                      <select
                        value={item.status}
                        onChange={(event) => updateStatus(item.id, event.target.value as JobStatus)}
                        className="min-h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-700 outline-none focus:border-blue-400"
                      >
                        {(Object.keys(statusMeta) as JobStatus[]).map((status) => (
                          <option key={status} value={status}>
                            {isKu ? statusMeta[status].labelKu : statusMeta[status].label}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => setItems((prev) => prev.filter((entry) => entry.id !== item.id))}
                        className="flex min-h-10 items-center justify-center rounded-xl border border-slate-200 px-3 text-slate-500 transition-colors hover:bg-rose-50 hover:text-rose-700"
                        aria-label={isKu ? "سڕینەوە" : "Delete application"}
                      >
                        <Trash2 className="size-4" aria-hidden />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
