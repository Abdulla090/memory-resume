import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/dashboard/analytics")({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const language = useAppStore((s) => s.language);
  const resumes = useAppStore((s) => s.resumes);
  const isKu = language === "ku";

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <header>
        <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <BarChart3 className="size-6" aria-hidden />
        </div>
        <h1 className="text-2xl font-semibold">{isKu ? "ئامار" : "Analytics"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {isKu ? "کورتەی کارەکەت لەم وێبگەڕەدا." : "A quick snapshot of your activity in this browser."}
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard label={isKu ? "سیڤییەکان" : "Resumes"} value={String(resumes.length)} />
        <StatCard
          label={isKu ? "دوایین نوێکردنەوە" : "Last updated"}
          value={
            resumes[0]?.createdAt
              ? new Date(resumes[0].createdAt).toLocaleDateString()
              : "—"
          }
        />
      </div>
      <Link to="/dashboard/my-cvs" className="text-sm text-primary underline">
        {isKu ? "بەڕێوەبردنی سیڤییەکان" : "Manage resumes"}
      </Link>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-foreground">{value}</p>
    </div>
  );
}
