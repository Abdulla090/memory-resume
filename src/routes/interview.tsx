import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Mic, Type, ArrowUp, ArrowLeft, Briefcase, Settings2, Sparkles } from "lucide-react";
import { memo, useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { generateInterviewQuestion, scoreInterview } from "@/lib/ai.functions";
import { getAiErrorMessage } from "@/lib/ai-errors";

export const Route = createFileRoute("/interview")({
  component: InterviewPage,
});

const ParticleOrb = ({ isSpeaking }: { isSpeaking: boolean }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 36 }).map((_, i) => {
      const angle = (i / 36) * Math.PI * 2;
      const radius = 60 + Math.random() * 30;
      return {
        id: i,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        size: Math.random() * 3 + 1.5,
        delay: Math.random() * 2,
      };
    });
  }, []);

  return (
    <div className="relative flex items-center justify-center w-56 h-56 sm:w-72 sm:h-72 mx-auto scale-75 sm:scale-100 origin-center">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-400 shadow-[0_0_12px_3px_rgba(96,165,250,0.9)]"
          style={{ width: p.size, height: p.size }}
          initial={{ opacity: 0, x: p.x * 0.2, y: p.y * 0.2, scale: 0 }}
          animate={{
            opacity: isSpeaking ? [0.2, 0.8, 0.2] : 0.45,
            x: p.x,
            y: p.y,
            scale: isSpeaking ? [1, 1.25, 1] : 1,
          }}
          transition={{
            opacity: { duration: 1.8 + Math.random(), repeat: Infinity, delay: p.delay },
            scale: { duration: 1.2 + Math.random() * 0.4, repeat: Infinity, repeatType: "mirror" },
            default: { ease: "easeInOut" },
          }}
        />
      ))}

      <motion.div
        className="absolute z-10 w-28 h-28 bg-gradient-to-br from-blue-500 to-cyan-300 rounded-full blur-[3px] mix-blend-screen"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isSpeaking ? [1, 1.1, 1] : 1,
          opacity: isSpeaking ? 1 : 0.72,
        }}
        transition={{
          scale: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 2, ease: "easeOut" },
        }}
      />

      <motion.div
        className="absolute inset-0 rounded-full border border-sky-400/40 opacity-60"
        style={{ borderStyle: "dashed", borderWidth: "2px" }}
        animate={{ rotate: 360, scale: isSpeaking ? 1.04 : 1 }}
        transition={{
          rotate: { duration: 40, repeat: Infinity, ease: "linear" },
          scale: { duration: 1.6, repeat: Infinity, repeatType: "mirror" },
        }}
      />
      <motion.div
        className="absolute inset-6 rounded-full border border-blue-500/50"
        style={{ borderStyle: "dotted", borderWidth: "4px" }}
        animate={{ rotate: -360, scale: isSpeaking ? 0.96 : 1 }}
        transition={{
          rotate: { duration: 26, repeat: Infinity, ease: "linear" },
          scale: { duration: 1.6, repeat: Infinity, repeatType: "mirror" },
        }}
      />
    </div>
  );
};

const MessageBubble = memo(function MessageBubble({
  role,
  content,
}: {
  role: "ai" | "user";
  content: string;
}) {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-3xl px-6 py-4 text-[15px] leading-relaxed shadow-lg md:backdrop-blur-md ${
          role === "user"
            ? "bg-primary/90 text-white rounded-tr-sm"
            : "bg-white/5 border border-white/10 text-white rounded-tl-sm"
        }`}
      >
        {content}
      </div>
    </div>
  );
});

function InterviewPage() {
  const navigate = useNavigate();
  const language = useAppStore((state) => state.language);
  const apiKey = useAppStore((state) => state.apiKey) || "";
  const isKu = language === "ku";

  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => document.documentElement.classList.remove("dark");
  }, []);

  const [setupState, setSetupState] = useState<"setup" | "interview">("setup");
  const [targetRole, setTargetRole] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(8);
  const [isGenerating, setIsGenerating] = useState(false);

  const [interviewMode, setInterviewMode] = useState<"text" | "voice">("text");
  const [interviewInput, setInterviewInput] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [interviewStage, setInterviewStage] = useState<"intro" | "active">("intro");
  const [showInterviewContent, setShowInterviewContent] = useState(false);
  const [interviewMessages, setInterviewMessages] = useState<
    { role: "ai" | "user"; content: string }[]
  >([]);
  const [interviewScore, setInterviewScore] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const introTimerRef = useRef<number | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [interviewMessages, isAiSpeaking]);

  useEffect(() => {
    if (interviewStage !== "active") {
      setShowInterviewContent(false);
      return;
    }

    const timer = window.setTimeout(() => setShowInterviewContent(true), 260);
    return () => window.clearTimeout(timer);
  }, [interviewStage]);

  useEffect(() => {
    return () => {
      if (introTimerRef.current !== null) {
        window.clearTimeout(introTimerRef.current);
      }
    };
  }, []);

  const handleStartInterview = async () => {
    if (!targetRole.trim()) return;
    setSetupState("interview");
    setInterviewStage("intro");
    setShowInterviewContent(false);
    setIsGenerating(true);
    setIsAiSpeaking(true);

    try {
      const res = await generateInterviewQuestion({
        data: {
          apiKey,
          history: [],
          targetRole,
          language: isKu ? "ku" : "en",
          questionIndex: 0,
          totalQuestions,
        },
      });
      setInterviewMessages([{ role: "ai", content: res.nextQuestion }]);
      if (introTimerRef.current !== null) {
        window.clearTimeout(introTimerRef.current);
      }
      introTimerRef.current = window.setTimeout(() => {
        setInterviewStage("active");
      }, 780);
    } catch (e) {
      setInterviewMessages([
        {
          role: "ai",
          content: getAiErrorMessage(e, isKu),
        },
      ]);
      if (introTimerRef.current !== null) {
        window.clearTimeout(introTimerRef.current);
      }
      introTimerRef.current = window.setTimeout(() => {
        setInterviewStage("active");
      }, 360);
    } finally {
      setIsGenerating(false);
      setIsAiSpeaking(false);
    }
  };

  const handleInterviewSubmit = async () => {
    if (!interviewInput.trim() || isGenerating) return;
    const val = interviewInput;
    const newHistory = [...interviewMessages, { role: "user" as const, content: val }];
    setInterviewMessages(newHistory);
    setInterviewInput("");
    setIsAiSpeaking(true);
    setIsGenerating(true);

    try {
      const nextIndex = questionIndex + 1;
      if (nextIndex < totalQuestions) {
        const res = await generateInterviewQuestion({
          data: {
            apiKey,
            history: newHistory,
            targetRole,
            language: isKu ? "ku" : "en",
            questionIndex: nextIndex,
            totalQuestions,
          },
        });
        setInterviewMessages((prev) => [...prev, { role: "ai", content: res.nextQuestion }]);
        setQuestionIndex(nextIndex);
      } else {
        setInterviewMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: isKu
              ? "سوپاس بۆ کاتەکەت! خەریکی هەژمارکردنی ئەنجامەکانم..."
              : "Thank you for your time! Calculating your final score...",
          },
        ]);
        setQuestionIndex(nextIndex);

        // Real rubric-based scoring — replaces the previous Math.random score.
        try {
          const result = await scoreInterview({
            data: {
              apiKey,
              history: newHistory,
              targetRole,
              language: isKu ? "ku" : "en",
            },
          });
          setInterviewScore(result.score);
          const verdictLabelEn: Record<typeof result.verdict, string> = {
            strong_hire: "Strong Hire",
            hire: "Hire",
            lean_hire: "Lean Hire",
            no_hire: "No Hire",
            strong_no_hire: "Strong No Hire",
          };
          const verdictLabelKu: Record<typeof result.verdict, string> = {
            strong_hire: "دەستنیشانکردنی بەهێز",
            hire: "دەستنیشانکردن",
            lean_hire: "لایەنگری دەستنیشانکردن",
            no_hire: "دەستنیشان ناکرێت",
            strong_no_hire: "بە توندی دەستنیشان ناکرێت",
          };
          const label = (isKu ? verdictLabelKu : verdictLabelEn)[result.verdict];
          const strengths = result.strengths.length
            ? (isKu ? "\n\nخاڵە بەهێزەکان:\n• " : "\n\nStrengths:\n• ") + result.strengths.join("\n• ")
            : "";
          const gaps = result.gaps.length
            ? (isKu ? "\n\nخاڵە لاوازەکان:\n• " : "\n\nGaps:\n• ") + result.gaps.join("\n• ")
            : "";
          const steps = result.nextSteps.length
            ? (isKu ? "\n\nهەنگاوی داهاتوو:\n• " : "\n\nNext steps:\n• ") + result.nextSteps.join("\n• ")
            : "";
          setInterviewMessages((prev) => [
            ...prev,
            {
              role: "ai",
              content: isKu
                ? `چاوپێکەوتنەکە کۆتایی هات. ئەنجامی کۆتایی: ${result.score}/100 — ${label}.\n\n${result.summary}${strengths}${gaps}${steps}`
                : `Interview complete. Final score: ${result.score}/100 — ${label}.\n\n${result.summary}${strengths}${gaps}${steps}`,
            },
          ]);
        } catch (err) {
          setInterviewMessages((prev) => [
            ...prev,
            { role: "ai", content: getAiErrorMessage(err, isKu) },
          ]);
        }
      }
    } catch (err) {
      setInterviewMessages((prev) => [
        ...prev,
        { role: "ai", content: getAiErrorMessage(err, isKu) },
      ]);
    } finally {
      setIsGenerating(false);
      setIsAiSpeaking(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex min-h-[100dvh] w-screen flex-col items-center justify-center overflow-hidden bg-black text-foreground"
      dir={isKu ? "rtl" : "ltr"}
    >
      {/* Background Ambient Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none -z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 2 }}
          className="absolute top-[10%] left-1/2 hidden w-[800px] h-[800px] -translate-x-1/2 rounded-full bg-primary/30 blur-[180px] md:block"
        />
      </div>

      {/* Header / Back */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => navigate({ to: "/dashboard" })}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white/70 hover:text-white font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          {isKu ? "گەڕانەوە بۆ داشبۆرد" : "Back to Dashboard"}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {setupState === "setup" ? (
          <motion.div
            key="setup"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col w-full max-w-xl mx-auto px-6 relative z-10"
          >
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 text-primary mb-6 shadow-[0_0_40px_rgba(37,99,235,0.3)]">
                <Sparkles className="w-10 h-10" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-widest uppercase text-white mb-3 drop-shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                {isKu ? "ڕێکخستنی چاوپێکەوتن" : "Interview Setup"}
              </h1>
              <p className="text-white/50 font-medium">
                {isKu
                  ? "ڕۆڵەکەت دیاری بکە بۆ دەستپێکردنی چاوپێکەوتن لەگەڵ زیرەکی دەستکردی پێشکەوتوو (Gemini 3.1 Flash)"
                  : "Configure your interview session powered by advanced AI (Gemini 3.1 Flash)"}
              </p>
            </div>

            <div className="space-y-8 rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl md:backdrop-blur-3xl">
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-bold text-white/80 uppercase tracking-wider">
                  <Briefcase className="w-4 h-4 text-primary" />
                  {isKu ? "ڕۆڵی مەبەست" : "Target Role"}
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder={
                    isKu
                      ? "بۆ نموونە: ئەندازیاری سۆفتوێر، بەڕێوەبەری پرۆژە..."
                      : "e.g. Senior Software Engineer, Product Manager..."
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm font-bold text-white/80 uppercase tracking-wider">
                    <Settings2 className="w-4 h-4 text-primary" />
                    {isKu ? "ژمارەی پرسیارەکان" : "Number of Questions"}
                  </label>
                  <span className="text-primary font-black text-xl">{totalQuestions}</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="15"
                  value={totalQuestions}
                  onChange={(e) => setTotalQuestions(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-white/40 font-bold">
                  <span>8 {isKu ? "کەمترین" : "Min"}</span>
                  <span>15 {isKu ? "زۆرترین" : "Max"}</span>
                </div>
              </div>

              <button
                onClick={handleStartInterview}
                disabled={!targetRole.trim() || isGenerating}
                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary text-white font-bold py-4 rounded-2xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] disabled:shadow-none hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest"
              >
                {isGenerating
                  ? isKu
                    ? "خەریکی ئامادەکردن..."
                    : "Preparing..."
                  : isKu
                    ? "دەستپێکردنی چاوپێکەوتن"
                    : "Start Interview"}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="interview"
            initial={{ opacity: 0, filter: "blur(30px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col w-full h-full relative z-10"
          >
            {/* Ambient Background for Intro */}
            <AnimatePresence>
              {interviewStage === "intro" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.16 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.4 }}
                  className="absolute top-[14%] left-1/2 hidden w-[760px] h-[760px] -translate-x-1/2 rounded-full bg-primary/25 blur-[180px] pointer-events-none -z-10 md:block"
                />
              )}
            </AnimatePresence>

            {/* Top Section / Particle AI Orb */}
            <motion.div
              className="flex flex-col items-center justify-center w-full shrink-0 overflow-visible"
              animate={{
                height: interviewStage === "intro" ? "100vh" : (interviewMessages.length > 1 ? "130px" : "44vh"),
                marginTop: interviewStage === "intro" ? "0px" : (interviewMessages.length > 1 ? "0.75rem" : "0"),
                paddingTop: interviewStage === "intro" ? "0px" : "3rem",
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="flex items-center justify-center w-56 h-56 sm:w-72 sm:h-72"
                animate={{
                  scale: interviewStage === "intro" ? 1.5 : (interviewMessages.length > 1 ? 0.88 : 1),
                  y: interviewStage === "intro" ? 0 : (interviewMessages.length > 1 ? -2 : 0),
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <ParticleOrb isSpeaking={isAiSpeaking} />
              </motion.div>

              <AnimatePresence>
                {showInterviewContent && interviewMessages.length <= 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
                    className="relative z-10 flex flex-col items-center w-full mt-4"
                  >
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-widest uppercase text-center text-primary/80 mb-2 drop-shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                      {isKu ? "یاریدەدەری زیرەکی دەستکرد" : "A.I. INTERVIEWER"}
                    </h1>
                    <p className="text-sm sm:text-base text-white/50 text-center max-w-lg font-medium">
                      {isKu
                        ? "من لێرەم بۆ ئەوەی ڕاهێنانت پێ بکەم لەسەر چاوپێکەوتنەکانت بە شێوەیەکی پرۆفیشناڵ."
                        : "I will conduct a hyper-realistic, dynamic interview. Please state your target role."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Chat Messages Section */}
            <AnimatePresence>
              {showInterviewContent && (
                <motion.div
                  key="messages"
                  className="perf-scroll flex-1 w-full max-w-4xl mx-auto overflow-y-auto px-4 pb-56 sm:pb-48 pt-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.12 }}
                >
                  <div className="space-y-6 flex flex-col justify-end min-h-full">
                    {interviewMessages.map((msg, i) => (
                      <MessageBubble key={i} role={msg.role} content={msg.content} />
                    ))}
                    {isAiSpeaking && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="max-w-[85%] rounded-3xl bg-white/5 border border-white/10 px-6 py-4 rounded-tl-sm">
                          <div className="flex gap-1.5 items-center h-6">
                            <motion.span
                              animate={{ y: [0, -5, 0] }}
                              transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                              className="w-2 h-2 rounded-full bg-primary/60"
                            />
                            <motion.span
                              animate={{ y: [0, -5, 0] }}
                              transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                              className="w-2 h-2 rounded-full bg-primary/60"
                            />
                            <motion.span
                              animate={{ y: [0, -5, 0] }}
                              transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                              className="w-2 h-2 rounded-full bg-primary/60"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {showInterviewContent && (
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/90 to-transparent pt-10 pb-6 px-4 z-20 pointer-events-none">
                <div className="max-w-4xl mx-auto w-full pointer-events-auto">
                  <AnimatePresence mode="wait">
                    {interviewScore !== null ? (
                      <motion.div
                        key="score-card"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="w-full rounded-[2.5rem] border border-sky-500/30 bg-sky-500/10 shadow-[0_0_80px_rgba(14,165,233,0.3)] p-6 sm:p-8 flex items-center justify-between md:backdrop-blur-3xl"
                      >
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 drop-shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                            {isKu ? "ئەنجامی چاوپێکەوتن" : "Final Score"}
                          </h3>
                          <p className="text-sky-200/80 font-medium">
                            {isKu
                              ? "پێداچوونەوە بە وەڵامەکانتدا کرا بە سەرکەوتوویی."
                              : "Your responses have been successfully analyzed."}
                          </p>
                          <button
                            onClick={() => navigate({ to: "/dashboard" })}
                            className="mt-6 px-6 py-2.5 rounded-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 transition-colors font-medium text-sm"
                          >
                            {isKu ? "گەڕانەوە بۆ داشبۆرد" : "Return to Dashboard"}
                          </button>
                        </div>
                        <div className="relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-black/40 border-4 border-sky-500/30 shadow-[inset_0_0_20px_rgba(14,165,233,0.2)]">
                          <motion.svg
                            className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-[0_0_10px_rgba(14,165,233,0.8)]"
                            viewBox="0 0 100 100"
                          >
                            <motion.circle
                              cx="50"
                              cy="50"
                              r="46"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="8"
                              className="text-sky-400"
                              strokeDasharray="289.02"
                              initial={{ strokeDashoffset: 289.02 }}
                              animate={{
                                strokeDashoffset: 289.02 - (289.02 * interviewScore) / 100,
                              }}
                              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                              strokeLinecap="round"
                            />
                          </motion.svg>
                          <div className="absolute inset-0 flex items-center justify-center text-4xl sm:text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                            <motion.span
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1, type: "spring" }}
                            >
                              {interviewScore}
                            </motion.span>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="input-box"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="w-full rounded-[2.5rem] border border-white/10 bg-white/[0.03] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)] p-3 sm:p-4 text-left will-change-transform md:backdrop-blur-3xl"
                      >
                        {interviewMode === "text" ? (
                          <div className="relative flex items-center gap-3">
                            <input
                              type="text"
                              value={interviewInput}
                              onChange={(e) => setInterviewInput(e.target.value)}
                              placeholder={
                                isKu ? "وەڵامەکەت لێرە بنووسە..." : "Message AI Interviewer..."
                              }
                              className="flex-1 rounded-[2rem] border border-white/5 bg-black/40 px-6 py-4 text-[15px] text-white outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-white/30 shadow-inner"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleInterviewSubmit();
                              }}
                            />
                            <button
                              onClick={handleInterviewSubmit}
                              disabled={isAiSpeaking || !interviewInput.trim()}
                              className="rounded-full bg-primary p-4 text-white hover:scale-105 transition-transform shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:hover:scale-100 shrink-0"
                            >
                              <ArrowUp className="w-5 h-5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-4">
                            <button className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-all group shadow-[0_0_50px_rgba(37,99,235,0.2)]">
                              <div
                                className="absolute inset-0 rounded-full bg-primary/30 animate-ping"
                                style={{ animationDuration: "2s" }}
                              />
                              <Mic className="h-6 w-6 relative z-10 group-hover:scale-110 transition-transform" />
                            </button>
                            <p className="mt-4 text-xs font-bold text-white/60 animate-pulse tracking-widest uppercase">
                              {isKu ? "لە گوێگرتندایە..." : "Listening..."}
                            </p>
                          </div>
                        )}

                        {/* Toggle Input Mode */}
                        <div className="flex justify-center mt-3">
                          <button
                            onClick={() =>
                              setInterviewMode((prev) => (prev === "text" ? "voice" : "text"))
                            }
                            className="text-[10px] font-bold uppercase tracking-wider text-white/40 hover:text-primary transition-colors flex items-center gap-1.5"
                          >
                            {interviewMode === "text" ? (
                              <>
                                <Mic className="w-3 h-3" />{" "}
                                {isKu ? "گۆڕین بۆ دەنگ" : "Switch to Voice"}
                              </>
                            ) : (
                              <>
                                <Type className="w-3 h-3" />{" "}
                                {isKu ? "گۆڕین بۆ دەق" : "Switch to Text"}
                              </>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
