import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowUp,
  Briefcase as BriefcaseIcon,
  FileText,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { ChatOnboarding } from "@/routes/onboarding";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
});

// ── Templates (mirrors /templates route) ────────────────────────────────
function DashboardIndex() {
  const navigate = useNavigate();
  const language = useAppStore((state) => state.language);
  const isKu = language === "ku";
  const [mode, setMode] = useState<"choose" | "chat">("choose");
  const [request, setRequest] = useState("");
  const [seedPrompt, setSeedPrompt] = useState<string | undefined>();
  const [seedTarget, setSeedTarget] = useState<string | undefined>();

  const inferTarget = (text: string) => {
    const value = text.trim();
    const patterns = [
      /\bfor\s+(?:a\s+|an\s+|the\s+)?(.+)$/i,
      /\bas\s+(?:a\s+|an\s+|the\s+)?(.+)$/i,
      /\btargeting\s+(?:a\s+|an\s+|the\s+)?(.+)$/i,
      /\b(.+?)\s+(?:resume|cv|cover letter)$/i,
    ];
    for (const pattern of patterns) {
      const match = value.match(pattern);
      if (match?.[1]) {
        return match[1].replace(/[.,;:!?]+$/g, "").trim();
      }
    }
    return undefined;
  };

  const handleContinue = () => {
    const trimmed = request.trim();
    const value = trimmed.toLowerCase();
    if (!trimmed) return;
    if (
      value.includes("thank") ||
      value.includes("سوپاس") ||
      value.includes("invite") ||
      value.includes("card")
    ) {
      navigate({ to: "/dashboard/thanks" });
      return;
    }
    if (
      value.includes("cover") ||
      value.includes("letter") ||
      value.includes("cover letter") ||
      value.includes("نامە")
    ) {
      navigate({ to: "/dashboard/cover-letters" });
      return;
    }
    setSeedPrompt(trimmed);
    setSeedTarget(inferTarget(trimmed) ?? (trimmed.length < 40 ? trimmed : undefined));
    setMode("chat");
  };

  return (
    <div className="relative mx-auto w-full max-w-7xl space-y-8 sm:space-y-10 pb-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center w-full pt-4 relative z-20"
      >
        <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white p-1.5 shadow-sm">
          <button className="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-200 bg-black text-white shadow-sm scale-105">
            <BriefcaseIcon className="h-4 w-4" />
            {isKu ? "دروستکەری سیڤی" : "CV Builder"}
          </button>
          <button
            onClick={() => navigate({ to: "/interview" })}
            className="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-200 text-neutral-500 hover:text-black"
          >
            <MessageSquare className="h-4 w-4" />
            {isKu ? "چاوپێکەوتن" : "Interview Mode"}
          </button>
        </div>
      </motion.div>

      {mode === "choose" ? (
        <section className="rounded-[2rem] border border-neutral-200 bg-white p-5 sm:p-8 shadow-sm">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-neutral-500" />
              {isKu ? "باشە، دەست پێ بکەین" : "Let’s build something"}
            </div>

            <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black leading-[1.1]">
              {isKu ? "چی دەتەوێت دروست بکەیت؟" : "What do you want to create?"}
            </h1>
            <p className="mt-3 text-sm sm:text-base font-medium text-neutral-600">
              {isKu
                ? "سیڤی، کارتی سوپاس، یان نامەی ڕووپۆش. یەکێک هەڵبژێرە و من دەست پێ دەکەم."
                : "Choose a CV, thank-you card, or cover letter. I’ll guide you from there."}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => setRequest(isKu ? "سیڤی" : "CV")}
                className={`rounded-[1.4rem] border p-4 text-left transition-all ${request === (isKu ? "سیڤی" : "CV") ? "border-blue-500 bg-blue-50/40 shadow-sm" : "border-neutral-200 bg-white hover:border-neutral-300"}`}
              >
                <BriefcaseIcon className="h-5 w-5 text-blue-600" />
                <div className="mt-3 font-bold text-black">{isKu ? "سیڤی" : "CV"}</div>
                <div className="text-xs text-neutral-500 mt-1">
                  {isKu ? "بۆ کار و ئەدیتەر" : "For jobs and editor flow"}
                </div>
              </button>
              <button
                type="button"
                onClick={() => setRequest(isKu ? "کارتی سوپاس" : "Thank-you card")}
                className={`rounded-[1.4rem] border p-4 text-left transition-all ${request === (isKu ? "کارتی سوپاس" : "Thank-you card") ? "border-blue-500 bg-blue-50/40 shadow-sm" : "border-neutral-200 bg-white hover:border-neutral-300"}`}
              >
                <FileText className="h-5 w-5 text-blue-600" />
                <div className="mt-3 font-bold text-black">
                  {isKu ? "کارتی سوپاس" : "Thank-you card"}
                </div>
                <div className="text-xs text-neutral-500 mt-1">
                  {isKu ? "بۆ سوپاس و بانگەشت" : "For gratitude and invites"}
                </div>
              </button>
              <button
                type="button"
                onClick={() => setRequest(isKu ? "نامەی ڕووپۆش" : "Cover letter")}
                className={`rounded-[1.4rem] border p-4 text-left transition-all ${request === (isKu ? "نامەی ڕووپۆش" : "Cover letter") ? "border-blue-500 bg-blue-50/40 shadow-sm" : "border-neutral-200 bg-white hover:border-neutral-300"}`}
              >
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <div className="mt-3 font-bold text-black">
                  {isKu ? "نامەی ڕووپۆش" : "Cover letter"}
                </div>
                <div className="text-xs text-neutral-500 mt-1">
                  {isKu ? "بۆ پێشکەشکردن لەگەڵ سیڤی" : "For job applications"}
                </div>
              </button>
            </div>

            <div className="mt-6 rounded-[1.6rem] border border-neutral-200 bg-neutral-50 p-3 sm:p-4 text-left shadow-sm">
              <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-neutral-400 mb-2">
                {isKu ? "بۆ نموونە" : "Describe it"}
              </div>
              <textarea
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                placeholder={
                  isKu
                    ? "مثال: سیڤی بۆ ئەندازیاری سۆفتوێر، یان کارتی سوپاس بۆ زۆرجار"
                    : "Example: a CV for a software engineer, or a thank-you card for graduation"
                }
                className="w-full resize-none bg-transparent text-[15px] text-black outline-none placeholder:text-neutral-400"
                style={{ minHeight: "96px" }}
              />
              <div className="mt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleContinue}
                  className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  {isKu ? "دەستپێبکە" : "Continue"}
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="rounded-[2rem] border border-neutral-200 bg-white p-4 sm:p-6 lg:p-8 shadow-sm">
          <ChatOnboarding embedded initialPrompt={seedPrompt} initialTarget={seedTarget} />
        </section>
      )}
    </div>
  );
}
