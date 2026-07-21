import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/dashboard/ai-optimize")({
  head: () => ({
    meta: [
      { title: "AI Optimize — MemoryCV" },
      { name: "description", content: "Tailor your resume to a specific job description with AI-powered rewrites." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AiOptimizePage,
});

function AiOptimizePage() {
  const language = useAppStore((s) => s.language);
  const resumes = useAppStore((s) => s.resumes);
  const isKu = language === "ku";
  const latest = resumes[0];

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <header>
        <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Sparkles className="size-6" aria-hidden />
        </div>
        <h1 className="text-2xl font-semibold">{isKu ? "باشترکردنی AI" : "AI Optimize"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {isKu
            ? "چاککردنی ATS و هەڵەکان لە دەستکاریکەری سیڤی دەکرێت."
            : "Run ATS fixes and error checks from the resume editor."}
        </p>
      </header>
      {latest ? (
        <Link
          to="/editor/$id"
          params={{ id: latest.id }}
          className="inline-flex rounded-xl gradient-bg px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          {isKu ? `کردنەوەی ${latest.title}` : `Open ${latest.title}`}
        </Link>
      ) : (
        <p className="text-sm text-muted-foreground">
          {isKu ? "هیچ سیڤییەک نییە." : "No resumes yet."}{" "}
          <Link to="/onboarding" className="text-primary underline">
            {isKu ? "دروستکردن" : "Create one"}
          </Link>
        </p>
      )}
    </div>
  );
}
