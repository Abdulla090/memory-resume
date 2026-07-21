import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/dashboard/cover-letters")({
  head: () => ({
    meta: [
      { title: "Cover Letters — MemoryCV" },
      { name: "description", content: "Generate role-specific cover letters from your MemoryCV profile in seconds." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CoverLettersPage,
});

function CoverLettersPage() {
  const language = useAppStore((s) => s.language);
  const resumes = useAppStore((s) => s.resumes);
  const isKu = language === "ku";

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <header>
        <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Mail className="size-6" aria-hidden />
        </div>
        <h1 className="text-2xl font-semibold">{isKu ? "نامەکانی داواکاری" : "Cover letters"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {isKu
            ? "نامەی داواکاری لە دەستکاریکەری هەر سیڤییەکەوە دروست بکە."
            : "Generate a cover letter from any resume in the editor."}
        </p>
      </header>
      <ul className="space-y-3">
        {resumes.length === 0 && (
          <li className="text-sm text-muted-foreground">
            {isKu ? "هیچ سیڤییەک نییە." : "No resumes yet."}
          </li>
        )}
        {resumes.map((r) => (
          <li key={r.id} className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
            <span className="font-medium text-sm">{r.title}</span>
            <Link
              to="/editor/$id"
              params={{ id: r.id }}
              className="text-sm text-primary underline"
            >
              {isKu ? "دەستکاریکەر" : "Editor"}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
