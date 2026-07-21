import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { PenTool } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { improveBullet } from "@/lib/ai.functions";
import { getAiErrorMessage } from "@/lib/ai-errors";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/dashboard/ai-writer")({
  head: () => ({
    meta: [
      { title: "AI Writer — MemoryCV" },
      { name: "description", content: "Draft bullets, summaries and section content with the MemoryCV AI writer." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AiWriterPage,
});

function AiWriterPage() {
  const language = useAppStore((s) => s.language);
  const apiKey = useAppStore((s) => s.apiKey);
  const isKu = language === "ku";
  const improveBulletFn = useServerFn(improveBullet);
  const [bullet, setBullet] = useState("");
  const [result, setResult] = useState("");
  const [busy, setBusy] = useState(false);

  const run = async () => {
    if (bullet.trim().length < 2) return;
    setBusy(true);
    try {
      const { bullet: improved } = await improveBulletFn({
        data: { apiKey, bullet, mode: "impact" },
      });
      setResult(improved);
    } catch (e) {
      toast.error(getAiErrorMessage(e, isKu, isKu ? "شکستی هەوڵدان" : "Failed to improve bullet"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <header>
        <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <PenTool className="size-6" aria-hidden />
        </div>
        <h1 className="text-2xl font-semibold">{isKu ? "نووسەری AI" : "AI Writer"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {isKu
            ? "خاڵی ئەزموون بەهێزتر بکە، پاشان لە دەستکاریکەری سیڤی بەکاریبهێنە."
            : "Strengthen a resume bullet, then paste it into your resume in the editor."}
        </p>
      </header>
      <textarea
        value={bullet}
        onChange={(e) => setBullet(e.target.value)}
        rows={4}
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm"
        placeholder={isKu ? "خاڵی ئەزموون بنووسە..." : "Paste a resume bullet..."}
      />
      <button
        type="button"
        onClick={run}
        disabled={busy}
        className="rounded-xl gradient-bg px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
      >
        {busy ? "…" : isKu ? "باشترکردن" : "Improve bullet"}
      </button>
      {result && (
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-sm whitespace-pre-wrap">{result}</p>
          <Link to="/dashboard/my-cvs" className="mt-3 inline-block text-sm text-primary underline">
            {isKu ? "بڕۆ بۆ سیڤییەکان" : "Open my CVs"}
          </Link>
        </div>
      )}
    </div>
  );
}
