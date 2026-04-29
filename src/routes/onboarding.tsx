import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { parseMemory, generateResume, getFollowUpQuestions, patchProfileWithAnswers } from "@/lib/ai.functions";
import { useAppStore } from "@/lib/store";
import type { SavedResume, FollowUpQuestion, FollowUpAnswer } from "@/lib/types";
import {
  FileText, Loader2, ArrowUp, SkipForward, Paperclip, Sparkles, CheckCircle2, ImagePlus
} from "lucide-react";
import { toast } from "sonner";
import { SAMPLE_MEMORIES } from "@/lib/sample-memories";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "MemoryCV — Builder" }] }),
  component: ChatOnboarding,
});

type Stage = "intake" | "parsing" | "questions" | "patching" | "builder" | "generating";

interface ChatMessage {
  id: string;
  from: "ai" | "user";
  content: string;
  question?: FollowUpQuestion;
}

function ChatOnboarding() {
  const navigate = useNavigate();
  const setProfile = useAppStore((s) => s.setProfile);
  const profile = useAppStore((s) => s.profile);
  const apiKey = useAppStore((s) => s.apiKey);
  const addResume = useAppStore((s) => s.addResume);

  const parseMemoryFn   = useServerFn(parseMemory);
  const generateFn      = useServerFn(generateResume);
  const getQuestionsFn  = useServerFn(getFollowUpQuestions);
  const patchProfileFn  = useServerFn(patchProfileWithAnswers);

  const [stage, setStage]               = useState<Stage>("intake");
  const [inputText, setInputText]       = useState("");
  const [jobTarget, setJobTarget]       = useState("");
  const [rawMemory, setRawMemory]       = useState("");
  const [messages, setMessages]         = useState<ChatMessage[]>([]);
  const [pendingQs, setPendingQs]       = useState<FollowUpQuestion[]>([]);
  const [qIdx, setQIdx]                 = useState(0);
  const [answers, setAnswers]           = useState<FollowUpAnswer[]>([]);
  const [customInput, setCustomInput]   = useState("");
  const [selectedOpts, setSelectedOpts] = useState<string[]>([]);
  const [isThinking, setIsThinking]     = useState(false);
  const [showLoader, setShowLoader]     = useState(false);
  const [loaderResumeId, setLoaderResumeId] = useState<string | null>(null);

  const fileInputRef   = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLTextAreaElement>(null);
  const chatInputRef   = useRef<HTMLInputElement>(null);
  const chatPhotoInputRef = useRef<HTMLInputElement>(null);

  const handleChatPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file || !profile) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setProfile({ ...profile, photoUrl: ev.target?.result as string });
      toast.success(`Photo attached!`);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const inChat   = stage !== "intake";
  const inQA     = stage === "questions";
  const inBuild  = stage === "builder";
  const curQ     = pendingQs[qIdx];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  useEffect(() => {
    if (inQA && chatInputRef.current) chatInputRef.current.focus();
  }, [inQA, qIdx]);

  const addMsg = (msg: Omit<ChatMessage, "id">) =>
    setMessages((p) => [...p, { id: crypto.randomUUID(), ...msg }]);

  // ── Step 1: extract ──────────────────────────────────────────────────────
  const handleExtract = async () => {
    if (inputText.trim().length < 20) {
      toast.error("Add a bit more detail about yourself.");
      return;
    }
    const memory = inputText.trim();
    setRawMemory(memory);
    setInputText("");
    setIsThinking(true);
    setStage("parsing");
    addMsg({ from: "user", content: memory.slice(0, 240) + (memory.length > 240 ? "…" : "") });

    try {
      const { profile: parsed } = await parseMemoryFn({ data: { apiKey, memory } });
      setProfile(parsed);

      const { isComplete, questions } = await getQuestionsFn({
        data: { apiKey, profile: parsed, rawMemory: memory },
      });
      setIsThinking(false);

      if (isComplete || questions.length === 0) {
        addMsg({ from: "ai", content: `Profile captured, ${parsed.name || "there"}! What role are you targeting for this resume?` });
        setStage("builder");
      } else {
        addMsg({ from: "ai", content: `Got your profile, ${parsed.name || "there"}! Just a few quick questions to make your resume even stronger.` });
        setPendingQs(questions);
        setQIdx(0);
        setStage("questions");
        setTimeout(() => addMsg({ from: "ai", content: questions[0].question, question: questions[0] }), 350);
      }
    } catch (err) {
      setIsThinking(false);
      toast.error(err instanceof Error ? err.message : "Failed to analyze. Try again.");
      setStage("intake");
    }
  };

  // ── Step 2: answer question ──────────────────────────────────────────────
  const handleAnswer = (answer: string, idx: number) => {
    const q = pendingQs[idx];
    if (!q || !answer.trim()) return;
    const newAns: FollowUpAnswer = { questionId: q.id, field: q.field, answer };
    const all = [...answers, newAns];
    setAnswers(all);
    addMsg({ from: "user", content: answer });
    setSelectedOpts([]);
    setCustomInput("");

    const next = idx + 1;
    if (next < pendingQs.length) {
      setQIdx(next);
      setTimeout(() => addMsg({ from: "ai", content: pendingQs[next].question, question: pendingQs[next] }), 380);
    } else {
      finishQA(all);
    }
  };

  const handleSkip = () => {
    addMsg({ from: "user", content: "Skip" });
    setSelectedOpts([]);
    setCustomInput("");
    const next = qIdx + 1;
    if (next < pendingQs.length) {
      setQIdx(next);
      setTimeout(() => addMsg({ from: "ai", content: pendingQs[next].question, question: pendingQs[next] }), 380);
    } else {
      finishQA(answers);
    }
  };

  const finishQA = async (all: FollowUpAnswer[]) => {
    setIsThinking(true);
    setStage("patching");
    try {
      const { profile: patched } = await patchProfileFn({ data: { apiKey, profile, answers: all } });
      setProfile(patched);
      setIsThinking(false);
      addMsg({ from: "ai", content: `All done! Your profile is ready, ${patched.name || "there"}. What role are you targeting?` });
      setStage("builder");
    } catch {
      setIsThinking(false);
      addMsg({ from: "ai", content: "Profile updated! What role are you targeting?" });
      setStage("builder");
    }
  };

  // ── Step 3: generate ─────────────────────────────────────────────────────
  const handleBuild = async () => {
    if (jobTarget.trim().length < 2) { toast.error("Enter a role or job title."); return; }
    if (!profile) return;
    addMsg({ from: "user", content: jobTarget });
    setIsThinking(true);
    setStage("generating");
    try {
      const { resume } = await generateFn({ data: { apiKey, profile, jobTarget: jobTarget.trim() } });
      const saved: SavedResume = {
        id: crypto.randomUUID(),
        title: resume.title || jobTarget.slice(0, 60),
        jobTarget,
        template: "executive",
        data: resume,
        createdAt: Date.now(),
      };
      addResume(saved);
      // Show sleek loader for 2.2s then navigate so user sees the transition
      setIsThinking(false);
      setShowLoader(true);
      setLoaderResumeId(saved.id);
    } catch (e) {
      setIsThinking(false);
      toast.error(e instanceof Error ? e.message : "Generation failed.");
      setStage("builder");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setInputText((p) => p + (p ? "\n\n" : "") + `[${file.name}]\n` + (ev.target?.result as string));
      toast.success(`Loaded ${file.name}`);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-dvh flex flex-col relative overflow-hidden bg-sky-100">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(180deg, #93c5fd 0%, #e0f2fe 50%, #fef3c7 100%)" }} />

      {/* Warm Sun Glow */}
      <div className="absolute top-10 right-32 w-[500px] h-[500px] bg-amber-300/40 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Giant Fluffy Cloud (Top Left) */}
      <div className="absolute top-[-80px] left-[-50px] w-[600px] h-[300px] pointer-events-none z-0 opacity-95">
        <div className="absolute top-16 left-10 w-48 h-48 bg-white rounded-full blur-[4px] drop-shadow-sm" />
        <div className="absolute top-[-20px] left-32 w-64 h-64 bg-white rounded-full blur-[4px] drop-shadow-sm" />
        <div className="absolute top-20 left-72 w-48 h-48 bg-white rounded-full blur-[4px] drop-shadow-sm" />
        <div className="absolute top-32 left-0 w-[500px] h-40 bg-white rounded-full blur-[4px]" />
      </div>

      {/* Giant Fluffy Cloud (Top Right) */}
      <div className="absolute top-[-100px] right-[-100px] w-[700px] h-[350px] pointer-events-none z-0 opacity-90">
        <div className="absolute top-20 right-10 w-56 h-56 bg-white rounded-full blur-[4px] drop-shadow-sm" />
        <div className="absolute top-[-40px] right-40 w-80 h-80 bg-white rounded-full blur-[4px] drop-shadow-sm" />
        <div className="absolute top-16 right-96 w-64 h-64 bg-white rounded-full blur-[4px] drop-shadow-sm" />
        <div className="absolute top-40 right-0 w-[700px] h-48 bg-white rounded-full blur-[4px]" />
      </div>

      {/* Small Floating Cloud (Mid Left) */}
      <div className="absolute top-[25%] left-[5%] w-[250px] h-[100px] pointer-events-none z-0 opacity-70">
        <div className="absolute top-0 left-10 w-24 h-24 bg-white rounded-full blur-[3px]" />
        <div className="absolute top-[-10px] left-24 w-28 h-28 bg-white rounded-full blur-[3px]" />
        <div className="absolute top-8 left-0 w-[200px] h-16 bg-white rounded-full blur-[3px]" />
      </div>

      {/* Small Floating Cloud (Right side below header) */}
      <div className="absolute top-[30%] right-[10%] w-[300px] h-[120px] pointer-events-none z-0 opacity-60">
        <div className="absolute top-0 right-16 w-24 h-24 bg-white rounded-full blur-[4px]" />
        <div className="absolute top-[-20px] right-32 w-32 h-32 bg-white rounded-full blur-[4px]" />
        <div className="absolute top-10 right-0 w-[250px] h-20 bg-white rounded-full blur-[4px]" />
      </div>

      {/* ── Full-screen generating loader ── */}
      {showLoader && loaderResumeId && (
        <GeneratingLoader onDone={() => navigate({ to: "/resume/$id", params: { id: loaderResumeId } })} />
      )}

      {/* ── Header ── */}
      <header className="relative z-10 px-6 py-4 flex items-center gap-2 shrink-0">
        <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-[1.05rem] font-semibold text-slate-800 tracking-tight">MemoryCV</span>
      </header>


      {/* ── INTAKE — centered big textarea ── */}
      {!inChat && (
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pb-8">
          <motion.h1
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-semibold text-slate-900 tracking-tight mb-2 text-center drop-shadow-sm"
          >
            Tell me about yourself.
          </motion.h1>
          <p className="text-slate-600 font-medium text-sm mb-8 text-center max-w-sm drop-shadow-sm">
            Paste your resume, LinkedIn bio, career history — or just write freely.
          </p>

          {/* Big intake card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full max-w-[44rem] rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(2,132,199,0.35)] border-2 border-white"
            style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(24px)" }}
          >
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your resume, LinkedIn summary, career history, or just write about yourself..."
              className="w-full bg-transparent resize-none outline-none text-slate-900 text-[15.5px] font-medium leading-relaxed placeholder:text-slate-400 px-6 pt-6 pb-3"
              style={{ minHeight: "200px" }}
              onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleExtract(); }}
            />

            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-blue-50">
              <div className="flex items-center gap-2">
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".txt,.md,.pdf,.docx,.doc,.rtf" />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12.5px] font-medium text-slate-600 hover:bg-blue-50 transition-colors border border-slate-200 bg-white/70"
                >
                  <Paperclip className="w-3.5 h-3.5" /> Upload
                </button>
                {SAMPLE_MEMORIES[0] && (
                  <button
                    onClick={() => { setInputText(SAMPLE_MEMORIES[0].text); toast.success("Sample loaded"); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12.5px] font-medium text-slate-600 hover:bg-blue-50 transition-colors border border-slate-200 bg-white/70"
                  >
                    <FileText className="w-3.5 h-3.5" /> Try Sample
                  </button>
                )}
              </div>
              <button
                onClick={handleExtract}
                disabled={inputText.trim().length < 20}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-full text-[14px] font-semibold shadow-md shadow-blue-200 transition-all active:scale-95"
              >
                Analyze Me
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          <p className="text-center text-[11.5px] text-slate-400 mt-4">⌘ + Enter to submit</p>
        </div>
      )}

      {/* ── CHAT VIEW ── */}
      {inChat && (
        <div className="relative z-10 flex-1 flex flex-col min-h-0">
          {/* Messages — takes all remaining space, scrolls naturally */}
          <div className="flex-1 overflow-y-auto px-4 pt-2 pb-4" style={{ scrollbarWidth: "none" }}>
            <div className="max-w-[42rem] mx-auto flex flex-col gap-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className={`flex gap-3 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.from === "ai" && (
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-blue-200">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 text-[14.5px] leading-relaxed shadow-sm ${
                      msg.from === "user"
                        ? "bg-blue-600 text-white rounded-br-md shadow-blue-200"
                        : "bg-white text-slate-800 rounded-bl-md border border-blue-100"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Thinking indicator */}
              <AnimatePresence>
                {isThinking && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-md shadow-blue-200">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-white border border-blue-100 rounded-2xl rounded-bl-md px-5 py-3.5 flex gap-1.5 items-center shadow-sm">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-blue-400"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                          transition={{ repeat: Infinity, duration: 1.1, delay: i * 0.18 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* ── Sticky bottom input ── */}
          <div
            className="shrink-0 border-t border-blue-100/60 px-4 pt-3 pb-safe-4"
            style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(24px)", paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
          >
            <div className="max-w-[42rem] mx-auto">
              {/* Q&A chips — shown above input */}
              <AnimatePresence mode="wait">
                {inQA && curQ && (
                  <motion.div
                    key={curQ.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mb-3"
                  >
                    {/* Helper */}
                    <p className="text-[11.5px] text-slate-400 mb-2 ml-1">{curQ.helperText}</p>
                    {/* Chips */}
                    {curQ.options.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {curQ.options.map((opt) => {
                          const sel = selectedOpts.includes(opt);
                          return (
                            <motion.button
                              key={opt}
                              whileTap={{ scale: 0.94 }}
                              onClick={() => {
                                if (curQ.inputType === "multiselect") {
                                  setSelectedOpts((p) => p.includes(opt) ? p.filter((o) => o !== opt) : [...p, opt]);
                                } else {
                                  handleAnswer(opt, qIdx);
                                }
                              }}
                              className={`px-3.5 py-2 rounded-full text-[13px] font-medium border transition-all ${
                                sel
                                  ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-200"
                                  : "bg-white/90 text-slate-700 border-slate-200 hover:border-blue-400 hover:bg-blue-50"
                              }`}
                            >
                              {sel && <CheckCircle2 className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />}
                              {opt}
                            </motion.button>
                          );
                        })}
                      </div>
                    )}
                    {/* Confirm multiselect */}
                    {curQ.inputType === "multiselect" && selectedOpts.length > 0 && (
                      <button
                        onClick={() => handleAnswer(selectedOpts.join(", "), qIdx)}
                        className="mb-2 text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        Confirm <ArrowUp className="w-3.5 h-3.5 rotate-90" />
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input row */}
              <div
                className="flex items-center gap-3 rounded-2xl px-4 py-3 border-2 border-white shadow-[0_20px_40px_-10px_rgba(2,132,199,0.3)]"
                style={{ background: "rgba(255,255,255,0.98)" }}
              >
                {/* Q&A text input */}
                {inQA && curQ && (
                  <input
                    ref={chatInputRef}
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder={curQ.placeholder || "Type your answer or pick above..."}
                    className="flex-1 bg-transparent outline-none text-slate-800 text-[15px] placeholder:text-slate-400"
                    onKeyDown={(e) => { if (e.key === "Enter" && customInput.trim()) handleAnswer(customInput.trim(), qIdx); }}
                  />
                )}

                {/* Builder target */}
                {inBuild && (
                  <input
                    value={jobTarget}
                    onChange={(e) => setJobTarget(e.target.value)}
                    placeholder="What role are you targeting? e.g. Senior PM at a startup..."
                    className="flex-1 bg-transparent outline-none text-slate-800 text-[15px] placeholder:text-slate-400"
                    onKeyDown={(e) => { if (e.key === "Enter") handleBuild(); }}
                    autoFocus
                  />
                )}

                {/* Placeholder while AI is thinking */}
                {!inQA && !inBuild && (
                  <span className="flex-1 text-slate-400 text-[15px] select-none">
                    {stage === "generating" ? "Generating your resume..." : "Hang on a second..."}
                  </span>
                )}

                {/* Right actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <input type="file" ref={chatPhotoInputRef} onChange={handleChatPhotoUpload} className="hidden" accept="image/*" />
                  {(inQA || inBuild) && (
                    <button
                      onClick={() => chatPhotoInputRef.current?.click()}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${profile?.photoUrl ? 'border border-green-200' : 'bg-slate-100 hover:bg-blue-50 text-slate-500 hover:text-blue-600'}`}
                      title={profile?.photoUrl ? "Photo attached! Click to change." : "Attach a photo (optional)"}
                    >
                      {profile?.photoUrl ? <img src={profile.photoUrl} className="w-8 h-8 rounded-full object-cover" alt="Profile" /> : <ImagePlus className="w-4 h-4" />}
                    </button>
                  )}
                  {inQA && (
                    <>
                      {/* Progress dots */}
                      <div className="flex gap-1 mr-1">
                        {pendingQs.map((_, i) => (
                          <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              i < qIdx ? "bg-blue-500 w-1.5" : i === qIdx ? "bg-blue-600 w-4" : "bg-slate-200 w-1.5"
                            }`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={handleSkip}
                        className="flex items-center gap-1 text-[12px] font-medium text-slate-400 hover:text-slate-700 transition-colors px-2 py-1 rounded-lg hover:bg-slate-100"
                      >
                        <SkipForward className="w-3.5 h-3.5" /> Skip
                      </button>
                      {customInput.trim() && (
                        <button
                          onClick={() => handleAnswer(customInput.trim(), qIdx)}
                          className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center shadow-md shadow-blue-200 transition-all active:scale-95"
                        >
                          <ArrowUp className="w-4 h-4 text-white" />
                        </button>
                      )}
                    </>
                  )}
                  {inBuild && jobTarget.trim().length >= 2 && (
                    <button
                      onClick={handleBuild}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-[13px] font-semibold shadow-md shadow-blue-200 transition-all active:scale-95"
                    >
                      Generate <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Sleek generating loader ──────────────────────────────────────────────────
const STEPS = [
  "Reading your career story...",
  "Identifying key strengths...",
  "Crafting your headline...",
  "Writing experience bullets...",
  "Polishing your summary...",
  "Finalizing your resume...",
];

function GeneratingLoader({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Advance progress bar smoothly over 2.4s
    const total = 2400;
    const interval = 30;
    let elapsed = 0;
    const timer = setInterval(() => {
      elapsed += interval;
      setProgress(Math.min((elapsed / total) * 100, 100));
      // Step through messages
      const stepIdx = Math.floor((elapsed / total) * STEPS.length);
      setStep(Math.min(stepIdx, STEPS.length - 1));
      if (elapsed >= total) {
        clearInterval(timer);
        onDone();
      }
    }, interval);
    return () => clearInterval(timer);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)" }}
    >
      {/* Animated logo */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center shadow-2xl shadow-blue-500/40 mb-8"
      >
        <Sparkles className="w-8 h-8 text-white" />
      </motion.div>

      {/* Headline */}
      <h2 className="text-2xl font-semibold text-white mb-2 tracking-tight">
        Writing your resume
      </h2>

      {/* Animated step text */}
      <motion.p
        key={step}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.3 }}
        className="text-blue-300 text-sm mb-10"
      >
        {STEPS[step]}
      </motion.p>

      {/* Progress bar */}
      <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-400 rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.03 }}
        />
      </div>

      {/* Subtle pulsing dots */}
      <div className="flex gap-2 mt-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-blue-400/60"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
