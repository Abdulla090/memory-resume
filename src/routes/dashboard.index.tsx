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

  const handleDirectContinue = (val: string) => {
    const trimmed = val.trim();
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

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => handleDirectContinue("CV")}
                className="group rounded-[1.4rem] border border-neutral-200 bg-white p-5 text-left transition-all hover:border-blue-500 hover:bg-blue-50/50 hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BriefcaseIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="font-bold text-black text-lg">{isKu ? "سیڤی" : "CV"}</div>
                <div className="text-sm text-neutral-500 mt-1">
                  {isKu ? "بۆ کار و ئەدیتەر" : "For jobs and editor flow"}
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleDirectContinue("Thank-you card")}
                className="group rounded-[1.4rem] border border-neutral-200 bg-white p-5 text-left transition-all hover:border-emerald-500 hover:bg-emerald-50/50 hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="font-bold text-black text-lg">
                  {isKu ? "کارتی سوپاس" : "Thank-you card"}
                </div>
                <div className="text-sm text-neutral-500 mt-1">
                  {isKu ? "بۆ سوپاس و بانگەشت" : "For gratitude and invites"}
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleDirectContinue("Cover letter")}
                className="group rounded-[1.4rem] border border-neutral-200 bg-white p-5 text-left transition-all hover:border-purple-500 hover:bg-purple-50/50 hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <div className="font-bold text-black text-lg">
                  {isKu ? "نامەی ڕووپۆش" : "Cover letter"}
                </div>
                <div className="text-sm text-neutral-500 mt-1">
                  {isKu ? "بۆ پێشکەشکردن لەگەڵ سیڤی" : "For job applications"}
                </div>
              </button>
            </div>


          </div>
        </section>
      ) : (
        <div className="w-full h-full flex flex-col">
          <ChatOnboarding embedded initialPrompt={seedPrompt} initialTarget={seedTarget} />
        </div>
      )}
    </div>
  );
}
