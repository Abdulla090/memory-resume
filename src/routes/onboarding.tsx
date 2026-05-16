import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import {
  parseMemory,
  generateResume,
  getFollowUpQuestions,
  patchProfileWithAnswers,
  generateFieldContent,
} from "@/lib/ai.functions";
import { useAppStore } from "@/lib/store";
import type {
  SavedResume,
  FollowUpQuestion,
  FollowUpAnswer,
  ResumeData,
  TemplateId,
} from "@/lib/types";
import { getTemplateDefaults } from "@/components/DesignPanel";
import { TEMPLATES } from "@/components/editor/editor.constants";
import { ResumePreview } from "@/components/resume/templates";
import {
  FileText,
  Loader2,
  ArrowUp,
  SkipForward,
  Paperclip,
  Sparkles,
  CheckCircle2,
  ImagePlus,
  Star,
  Bot,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import { SAMPLE_MEMORIES } from "@/lib/sample-memories";

const TEMPLATE_SAMPLE: ResumeData = {
  name: "Jane Doe",
  title: "Product Designer",
  email: "jane@example.com",
  phone: "+1 234 567 890",
  location: "New York, NY",
  summary: "Creative designer focusing on UI/UX and visual storytelling.",
  experience: [],
  projects: [],
  education: [],
  skills: [],
  certifications: [],
};

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "MemoryCV — Builder" }] }),
  validateSearch: (search: Record<string, unknown>): { prompt?: string } => {
    const raw = search.prompt;
    if (typeof raw === "string" && raw.trim().length > 0) {
      return { prompt: raw };
    }
    return {};
  },
  component: OnboardingRouteShell,
});

function OnboardingRouteShell() {
  const router = useRouter();
  const prompt = (router.state.location.search as { prompt?: string }).prompt;
  return <ChatOnboarding initialPrompt={prompt} />;
}

type Stage =
  | "intake"
  | "parsing"
  | "questions"
  | "patching"
  | "builder"
  | "templates"
  | "generating";

interface ChatMessage {
  id: string;
  from: "ai" | "user";
  content: string;
  question?: FollowUpQuestion;
}

export function ChatOnboarding({
  embedded = false,
  initialPrompt,
  initialTarget,
}: { embedded?: boolean; initialPrompt?: string; initialTarget?: string } = {}) {
  const navigate = useNavigate();
  const setProfile = useAppStore((s) => s.setProfile);
  const profile = useAppStore((s) => s.profile);
  const apiKey = useAppStore((s) => s.apiKey);
  const addResume = useAppStore((s) => s.addResume);
  const setOnboardingDone = useAppStore((s) => s.setOnboardingDone);
  const language = useAppStore((s) => s.language);
  const isKu = language === "ku";
  const incomingPrompt = initialPrompt;
  const incomingTarget = initialTarget;

  const parseMemoryFn = useServerFn(parseMemory);
  const generateFn = useServerFn(generateResume);
  const getQuestionsFn = useServerFn(getFollowUpQuestions);
  const patchProfileFn = useServerFn(patchProfileWithAnswers);

  const [stage, setStage] = useState<Stage>("intake");
  const [inputText, setInputText] = useState("");
  const [jobTarget, setJobTarget] = useState("");
  const [rawMemory, setRawMemory] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pendingQs, setPendingQs] = useState<FollowUpQuestion[]>([]);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<FollowUpAnswer[]>([]);
  const [customInput, setCustomInput] = useState("");
  const [selectedOpts, setSelectedOpts] = useState<string[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [loaderResumeId, setLoaderResumeId] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("minimal");
  const [intakeMethod, setIntakeMethod] = useState<"choose" | "form" | "raw">("choose");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatPhotoInputRef = useRef<HTMLInputElement>(null);

  const handleChatPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setProfile({ ...profile, photoUrl: ev.target?.result as string });
      toast.success(isKu ? "وێنەکە هاوپێچ کرا!" : `Photo attached!`);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const inChat = stage !== "intake";
  const inQA = stage === "questions";
  const inBuild = stage === "builder";
  const curQ = pendingQs[qIdx];

  useEffect(() => {
    if (!incomingTarget || stage !== "templates" || jobTarget.trim()) return;
    setJobTarget(incomingTarget);
  }, [incomingTarget, stage, jobTarget]);

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
      toast.error(
        isKu
          ? "تکایە کەمێک وردەکاری زیاتر دەربارەی خۆت بنووسە."
          : "Add a bit more detail about yourself.",
      );
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

      const { state, message, questions } = await getQuestionsFn({
        data: { apiKey, profile: parsed, rawMemory: memory },
      });
      setIsThinking(false);

      if (state === "READY_TO_TEMPLATE" || questions.length === 0) {
        addMsg({
          from: "ai",
          content:
            message ||
            (isKu
              ? `پرۆفایلەکە وەرگیرا، ${parsed.name || "بەڕێز"}!`
              : `Profile captured, ${parsed.name || "there"}!`),
        });
        setStage("templates");
      } else {
        addMsg({
          from: "ai",
          content:
            message ||
            (isKu
              ? `پرۆفایلەکەتم دەستکەوت، ${parsed.name || "بەڕێز"}! تەنها چەند پرسیارێکی خێرا بۆ ئەوەی سیڤییەکەت بەهێزتر بێت.`
              : `Got your profile, ${parsed.name || "there"}! Just a few quick questions to make your resume even stronger.`),
        });
        setPendingQs(questions);
        setQIdx(0);
        setStage("questions");
        setTimeout(
          () => addMsg({ from: "ai", content: questions[0].question, question: questions[0] }),
          350,
        );
      }
    } catch (err) {
      setIsThinking(false);
      const errorMsg = err instanceof Error ? err.message : String(err);
      if (
        errorMsg.includes("500") ||
        errorMsg.includes("HTTPError") ||
        errorMsg.includes("MISSING_API_KEY")
      ) {
        toast.error(
          isKu
            ? "تکایە کلیلی API لە Vercel دابنێ"
            : "Please configure your GEMINI_API_KEY in Vercel settings.",
        );
      } else {
        toast.error(
          errorMsg ||
            (isKu
              ? "شیکردنەوەکە سەرکەوتوو نەبوو. دووبارە هەوڵ بدەرەوە."
              : "Failed to analyze. Try again."),
        );
      }
      setStage("intake");
    }
  };

  // Auto-run intake when arriving from the dashboard with a seeded prompt
  const autoRanRef = useRef(false);
  useEffect(() => {
    if (autoRanRef.current) return;
    if (!incomingPrompt || stage !== "intake") return;
    autoRanRef.current = true;
    setInputText(incomingPrompt);
    // Defer so state flushes before the handler reads it
    const t = setTimeout(() => {
      // We pass the memory directly via the input state, then kick off the extract.
      // handleExtract reads from `inputText`, so we wrap the call after state update.
      void (async () => {
        // Re-read the latest value by using the memory directly
        const memory = incomingPrompt.trim();
        if (memory.length < 20) return;
        setRawMemory(memory);
        setInputText("");
        setIsThinking(true);
        setStage("parsing");
        addMsg({ from: "user", content: memory.slice(0, 240) + (memory.length > 240 ? "…" : "") });
        try {
          const { profile: parsed } = await parseMemoryFn({ data: { apiKey, memory } });
          setProfile(parsed);
          const { state, message, questions } = await getQuestionsFn({
            data: { apiKey, profile: parsed, rawMemory: memory },
          });
          setIsThinking(false);
          if (state === "READY_TO_TEMPLATE" || questions.length === 0) {
            addMsg({
              from: "ai",
              content:
                message ||
                (isKu
                  ? `پرۆفایلەکە وەرگیرا، ${parsed.name || "بەڕێز"}!`
                  : `Profile captured, ${parsed.name || "there"}!`),
            });
            setStage("templates");
          } else {
            addMsg({
              from: "ai",
              content:
                message ||
                (isKu
                  ? `پرۆفایلەکەتم دەستکەوت، ${parsed.name || "بەڕێز"}! تەنها چەند پرسیارێکی خێرا بۆ ئەوەی سیڤییەکەت بەهێزتر بێت.`
                  : `Got your profile, ${parsed.name || "there"}! Just a few quick questions to make your resume even stronger.`),
            });
            setPendingQs(questions);
            setQIdx(0);
            setStage("questions");
            setTimeout(
              () => addMsg({ from: "ai", content: questions[0].question, question: questions[0] }),
              350,
            );
          }
        } catch (err) {
          setIsThinking(false);
          const errorMsg = err instanceof Error ? err.message : String(err);
          if (
            errorMsg.includes("500") ||
            errorMsg.includes("HTTPError") ||
            errorMsg.includes("MISSING_API_KEY")
          ) {
            toast.error(
              isKu
                ? "تکایە کلیلی API لە Vercel دابنێ"
                : "Please configure your GEMINI_API_KEY in Vercel settings.",
            );
          } else {
            toast.error(
              errorMsg ||
                (isKu
                  ? "شیکردنەوەکە سەرکەوتوو نەبوو. دووبارە هەوڵ بدەرەوە."
                  : "Failed to analyze. Try again."),
            );
          }
          setStage("intake");
          setInputText(incomingPrompt);
        }
      })();
    }, 50);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomingPrompt]);

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
      setTimeout(
        () => addMsg({ from: "ai", content: pendingQs[next].question, question: pendingQs[next] }),
        380,
      );
    } else {
      finishQA(all);
    }
  };

  const handleSkip = () => {
    addMsg({ from: "user", content: isKu ? "بازدان" : "Skip" });
    setSelectedOpts([]);
    setCustomInput("");
    const next = qIdx + 1;
    if (next < pendingQs.length) {
      setQIdx(next);
      setTimeout(
        () => addMsg({ from: "ai", content: pendingQs[next].question, question: pendingQs[next] }),
        380,
      );
    } else {
      finishQA(answers);
    }
  };

  const finishQA = async (all: FollowUpAnswer[]) => {
    setIsThinking(true);
    setStage("patching");
    try {
      const { profile: patched } = await patchProfileFn({
        data: { apiKey, profile, answers: all },
      });
      setProfile(patched);
      setIsThinking(false);
      addMsg({
        from: "ai",
        content: isKu
          ? `هەمووی تەواو بوو! پرۆفایلەکەت ئامادەیە، ${patched.name || "بەڕێز"}.`
          : `All done! Your profile is ready, ${patched.name || "there"}.`,
      });
      setStage("templates");
    } catch (err) {
      setIsThinking(false);
      const errorMsg = err instanceof Error ? err.message : String(err);
      if (
        errorMsg.includes("500") ||
        errorMsg.includes("HTTPError") ||
        errorMsg.includes("MISSING_API_KEY")
      ) {
        toast.error(
          isKu
            ? "تکایە کلیلی API لە Vercel دابنێ"
            : "Please configure your GEMINI_API_KEY in Vercel settings.",
        );
        setStage("questions");
      } else {
        addMsg({
          from: "ai",
          content: isKu ? "پرۆفایلەکە نوێکرایەوە!" : "Profile updated!",
        });
        setStage("templates");
      }
    }
  };

  // ── Step 3: generate ─────────────────────────────────────────────────────
  const handleBuild = async () => {
    if (jobTarget.trim().length < 2) {
      toast.error(isKu ? "ناوی ڕۆڵەکە یان کارەکە بنووسە." : "Enter a role or job title.");
      return;
    }
    if (!profile) return;
    addMsg({ from: "user", content: jobTarget });
    setIsThinking(true);
    setStage("generating");
    try {
      const { resume } = await generateFn({
        data: { apiKey, profile, jobTarget: jobTarget.trim() },
      });
      const saved: SavedResume = {
        id: crypto.randomUUID(),
        title: resume.title || jobTarget.slice(0, 60),
        jobTarget,
        template: selectedTemplate,
        design: getTemplateDefaults(selectedTemplate),
        data: resume,
        createdAt: Date.now(),
      };
      addResume(saved);
      setOnboardingDone(); // mark so future CTAs skip this page
      // Show sleek loader for 2.2s then navigate so user sees the transition
      setIsThinking(false);
      setShowLoader(true);
      setLoaderResumeId(saved.id);
    } catch (e) {
      setIsThinking(false);
      const errorMsg = e instanceof Error ? e.message : String(e);
      if (
        errorMsg.includes("500") ||
        errorMsg.includes("HTTPError") ||
        errorMsg.includes("MISSING_API_KEY")
      ) {
        toast.error(
          isKu
            ? "تکایە کلیلی API لە Vercel دابنێ"
            : "Please configure your GEMINI_API_KEY in Vercel settings.",
        );
      } else {
        toast.error(errorMsg || (isKu ? "دروستکردنەکە سەرکەوتوو نەبوو." : "Generation failed."));
      }
      setStage("templates");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setInputText(
        (p) => p + (p ? "\n\n" : "") + `[${file.name}]\n` + (ev.target?.result as string),
      );
      toast.success(isKu ? `بارکرا ${file.name}` : `Loaded ${file.name}`);
      setIntakeMethod("raw");
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div
      className={
        embedded
          ? "min-h-0 flex flex-col relative overflow-hidden bg-transparent"
          : "min-h-dvh flex flex-col relative overflow-hidden"
      }
      style={embedded ? undefined : { background: "#bae6fd" }}
    >
      {!embedded && (
        <>
          {/* Background Gradient — pure sky blue, no yellow */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                "linear-gradient(160deg, #38bdf8 0%, #7dd3fc 25%, #bae6fd 55%, #e0f2fe 100%)",
            }}
          />

          {/* Cool Blue Glow — replaces amber */}
          <div className="absolute top-10 right-32 w-[500px] h-[500px] bg-blue-400/25 rounded-full blur-[110px] pointer-events-none z-0" />
          {/* Deep accent glow bottom-left */}
          <div className="absolute bottom-[-100px] left-[-60px] w-[400px] h-[400px] bg-sky-300/30 rounded-full blur-[90px] pointer-events-none z-0" />

          {/* Giant Fluffy Cloud (Top Left) */}
          <motion.div
            animate={{ x: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
            className="absolute top-[-80px] left-[-50px] w-[600px] h-[300px] pointer-events-none z-0 opacity-95"
          >
            <div className="absolute top-16 left-10 w-48 h-48 bg-white rounded-full blur-[4px] drop-shadow-sm" />
            <div className="absolute top-[-20px] left-32 w-64 h-64 bg-white rounded-full blur-[4px] drop-shadow-sm" />
            <div className="absolute top-20 left-72 w-48 h-48 bg-white rounded-full blur-[4px] drop-shadow-sm" />
            <div className="absolute top-32 left-0 w-[500px] h-40 bg-white rounded-full blur-[4px]" />
          </motion.div>

          {/* Giant Fluffy Cloud (Top Right) */}
          <motion.div
            animate={{ x: [0, -25, 0] }}
            transition={{ repeat: Infinity, duration: 30, ease: "easeInOut", delay: 2 }}
            className="absolute top-[-100px] right-[-100px] w-[700px] h-[350px] pointer-events-none z-0 opacity-90"
          >
            <div className="absolute top-20 right-10 w-56 h-56 bg-white rounded-full blur-[4px] drop-shadow-sm" />
            <div className="absolute top-[-40px] right-40 w-80 h-80 bg-white rounded-full blur-[4px] drop-shadow-sm" />
            <div className="absolute top-16 right-96 w-64 h-64 bg-white rounded-full blur-[4px] drop-shadow-sm" />
            <div className="absolute top-40 right-0 w-[700px] h-48 bg-white rounded-full blur-[4px]" />
          </motion.div>

          {/* Small Floating Cloud (Mid Left) */}
          <motion.div
            animate={{ x: [0, 30, 0] }}
            transition={{ repeat: Infinity, duration: 22, ease: "easeInOut", delay: 1 }}
            className="absolute top-[25%] left-[5%] w-[250px] h-[100px] pointer-events-none z-0 opacity-70"
          >
            <div className="absolute top-0 left-10 w-24 h-24 bg-white rounded-full blur-[3px]" />
            <div className="absolute top-[-10px] left-24 w-28 h-28 bg-white rounded-full blur-[3px]" />
            <div className="absolute top-8 left-0 w-[200px] h-16 bg-white rounded-full blur-[3px]" />
          </motion.div>

          {/* Small Floating Cloud (Right side below header) */}
          <motion.div
            animate={{ x: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 18, ease: "easeInOut", delay: 3 }}
            className="absolute top-[30%] right-[10%] w-[300px] h-[120px] pointer-events-none z-0 opacity-60"
          >
            <div className="absolute top-0 right-16 w-24 h-24 bg-white rounded-full blur-[4px]" />
            <div className="absolute top-[-20px] right-32 w-32 h-32 bg-white rounded-full blur-[4px]" />
            <div className="absolute top-10 right-0 w-[250px] h-20 bg-white rounded-full blur-[4px]" />
          </motion.div>
        </>
      )}

      {/* ── Full-screen generating loader ── */}
      <AnimatePresence>
        {showLoader && loaderResumeId && (
          <GeneratingLoader
            onDone={() => navigate({ to: "/editor/$id", params: { id: loaderResumeId } })}
          />
        )}
      </AnimatePresence>

      {!embedded && (
        <header className="relative z-10 px-6 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img
              src="/logo/MemoryCV Logo Icon Only.png"
              alt="MemoryCV"
              className="h-16 w-16 rounded-xl object-contain"
            />
            <span className="text-2xl font-bold text-slate-900 tracking-tight">MemoryCV</span>
          </div>
          <button
            onClick={() => {
              setOnboardingDone();
              navigate({ to: "/dashboard" });
            }}
            className="text-[14px] font-semibold text-slate-500 hover:text-slate-900 bg-white/50 hover:bg-white/80 px-4 py-2 rounded-full backdrop-blur-sm transition-colors border border-white"
          >
            {isKu ? "بازدان" : "Skip"}
          </button>
        </header>
      )}

      {/* ── INTAKE ── */}
      <AnimatePresence>
        {!inChat && intakeMethod === "choose" && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative z-10 bg-white rounded-[2rem] p-6 sm:p-10 max-w-3xl w-full shadow-2xl border border-slate-200"
            >
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
                {isKu ? "زانیارییەکانت پێویستە" : "We need your information"}
              </h2>
              <p className="text-slate-500 font-medium mb-3 text-sm sm:text-base">
                {isKu
                  ? "بۆ دروستکردنی باشترین سیڤی، پێویستمان بە زانیارییەکانتە. چۆن دەتەوێت زانیارییەکانت بنووسیت؟"
                  : "To create your CV and add all the necessary information, how would you like to provide your details?"}
              </p>

              <div className="flex items-center gap-2 bg-blue-50/80 text-blue-700 p-3 sm:px-4 rounded-xl mb-8 border border-blue-100/50">
                <Sparkles className="w-5 h-5 shrink-0" />
                <p className="text-xs sm:text-sm font-medium">
                  {isKu 
                    ? "نیگەران مەبە لە هەڵەی ڕێنووس یان ڕێکخستن. زیرەکی دەستکرد هەموو شتێک ڕێکدەخات و هەڵەکان چاک دەکاتەوە!" 
                    : "Don't worry about being messy or typos. We use AI to organize everything and fix any mistakes!"}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <button
                  onClick={() => setIntakeMethod("form")}
                  className="flex flex-col items-center text-center p-6 rounded-[1.5rem] border border-slate-200 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md transition-all group"
                >
                  <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FileText className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-1">{isKu ? "پڕکردنەوەی فۆڕم" : "Fill a Form"}</h3>
                  <p className="text-xs text-slate-500">{isKu ? "فۆڕمێکی سادە پڕ بکەرەوە" : "Fill out a structured form"}</p>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center text-center p-6 rounded-[1.5rem] border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-md transition-all group"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Paperclip className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-1">{isKu ? "بارکردنی سیڤی" : "Upload CV"}</h3>
                  <p className="text-xs text-slate-500">{isKu ? "سیڤییە کۆنەکەت یان فایلێک بار بکە" : "Upload your previous CV"}</p>
                </button>

                <button
                  onClick={() => setIntakeMethod("raw")}
                  className="flex flex-col items-center text-center p-6 rounded-[1.5rem] border border-slate-200 hover:border-purple-500 hover:bg-purple-50 hover:shadow-md transition-all group"
                >
                  <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-1">{isKu ? "نووسینی ئازاد" : "Raw Text"}</h3>
                  <p className="text-xs text-slate-500">{isKu ? "زانیارییەکانت کۆپی بکە یان بنووسە" : "Paste or write your info freely"}</p>
                </button>
              </div>

              {/* Hidden file input for the Upload option */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept=".txt,.md,.pdf,.docx,.doc,.rtf"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!inChat && intakeMethod === "form" && (
        <div className="relative z-10 flex-1 flex flex-col items-center justify-start px-4 pb-12 pt-10 overflow-y-auto">
          <IntakeForm
            isKu={isKu}
            onSubmit={(formDataStr) => {
              setInputText(formDataStr);
              setIntakeMethod("raw");
            }}
            onBack={() => setIntakeMethod("choose")}
          />
        </div>
      )}

      {!inChat && intakeMethod === "raw" && (
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pb-12">
          <motion.h1
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 text-center"
          >
            {isKu ? "دەربارەی خۆتم پێ بڵێ." : "Tell me about yourself."}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 font-medium text-base sm:text-lg mb-4 text-center max-w-md"
          >
            {isKu
              ? "سیڤییەکەت، بایۆی لینکدین، مێژووی کارکردنت دابنێ - یان تەنها بە ئازادی بنووسە."
              : "Paste your resume, LinkedIn bio, career history — or just write freely."}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2.5 rounded-2xl mb-10 border border-blue-100/50 shadow-sm max-w-md w-full justify-center"
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span className="text-[13px] font-medium text-center">
              {isKu 
                ? "کێشە نییە ئەگەر زانیارییەکانت ڕێکنەخراو بن، زیرەکی دەستکرد هەمووی ڕێکدەخاتەوە." 
                : "It's ok to be messy! Our AI will organize everything and fix typos."}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 20 }}
            className="w-full max-w-2xl bg-white/70 backdrop-blur-xl rounded-[28px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 ring-4 ring-transparent focus-within:ring-blue-500/10 focus-within:bg-white transition-all duration-300 overflow-hidden"
          >
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                isKu
                  ? "سیڤییەکەت، پوختەی لینکدین، مێژووی کارکردن دابنێ، یان تەنها دەربارەی خۆت بنووسە..."
                  : "Paste your resume, LinkedIn summary, career history, or just write about yourself..."
              }
              className="w-full bg-transparent resize-none outline-none text-slate-800 text-[16px] leading-relaxed placeholder:text-slate-400 px-6 pt-6 pb-4"
              style={{ minHeight: "220px" }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleExtract();
              }}
            />

            <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-slate-50/50 border-t border-slate-100 gap-3 sm:gap-0">
              <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".txt,.md,.pdf,.docx,.doc,.rtf"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-[13px] font-semibold text-slate-600 hover:bg-white hover:text-blue-600 hover:shadow-sm transition-all border border-transparent hover:border-slate-200"
                >
                  <Paperclip className="w-4 h-4" /> {isKu ? "بارکردن" : "Upload"}
                </button>
                {SAMPLE_MEMORIES[0] && (
                  <button
                    onClick={() => {
                      setInputText(SAMPLE_MEMORIES[0].text);
                      toast.success(isKu ? "نموونە بارکرا" : "Sample loaded");
                    }}
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-[13px] font-semibold text-slate-600 hover:bg-white hover:text-blue-600 hover:shadow-sm transition-all border border-transparent hover:border-slate-200"
                  >
                    <FileText className="w-4 h-4" />{" "}
                    <span className="hidden sm:inline">
                      {isKu ? "نموونە تاقی بکەرەوە" : "Try Sample"}
                    </span>
                    <span className="sm:hidden">{isKu ? "نموونە" : "Sample"}</span>
                  </button>
                )}
                <button
                  onClick={() => setIntakeMethod("choose")}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-[13px] font-semibold text-slate-600 hover:bg-white hover:text-blue-600 hover:shadow-sm transition-all border border-transparent hover:border-slate-200"
                >
                  {isKu ? "گۆڕین" : "Change"}
                </button>
              </div>
              <button
                onClick={handleExtract}
                disabled={inputText.trim().length < 20}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl text-[14px] font-semibold transition-all active:scale-95 shadow-sm"
              >
                {isKu ? "شیکارم بکە" : "Analyze"}
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          <p className="text-center text-[13px] font-medium text-slate-400 mt-6 tracking-wide">
            {isKu ? "بۆ ناردن ⌘ + Enter" : "Press ⌘ + Enter to submit"}
          </p>
        </div>
      )}

      {/* ── CHAT VIEW ── */}
      {inChat && (
        <div className="relative z-10 flex-1 flex flex-col min-h-0">
          <div className="flex-1 flex flex-col items-center justify-center px-4 pb-32">
            <AnimatePresence mode="wait">
              {isThinking ? (
                <motion.div
                  key="thinking"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center gap-6"
                >
                  <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center shadow-xl shadow-blue-500/5 border border-blue-100/50 relative">
                    <div className="absolute inset-0 bg-blue-400/20 rounded-[2rem] animate-ping" style={{ animationDuration: '2s' }} />
                    <Sparkles className="w-10 h-10 text-blue-500 relative z-10 animate-pulse" />
                  </div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest animate-pulse">
                    {isKu ? "بیردەکاتەوە..." : "Thinking..."}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={messages.filter(m => m.from === "ai").pop()?.id || "empty"}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center max-w-3xl text-center"
                >
                  <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mb-8 shadow-2xl shadow-blue-500/30">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-800 leading-relaxed tracking-tight">
                    {messages.filter(m => m.from === "ai").pop()?.content || ""}
                  </h2>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Sticky Bottom Input ── */}
          <div className="fixed bottom-0 left-0 right-0 px-4 pt-2 pb-6 sm:pb-12 flex justify-center z-40 pointer-events-none">
            <div className="max-w-3xl w-full pointer-events-auto">
              {/* Q&A Choices */}
              <AnimatePresence mode="wait">
                {inQA && curQ && (
                  <motion.div
                    key={curQ.id}
                    layout="position"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 ml-2"
                  >
                    <p className="text-[12px] font-semibold text-slate-400 mb-2.5 uppercase tracking-wider">
                      {curQ.helperText}
                    </p>

                    {curQ.inputType === "rating" && (
                      <div className="flex gap-2 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.button
                            key={star}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleAnswer(star.toString(), qIdx)}
                            className="p-1 rounded-full text-slate-200 hover:text-amber-400 transition-colors drop-shadow-sm"
                          >
                            <Star className="w-9 h-9 fill-current" />
                          </motion.button>
                        ))}
                      </div>
                    )}

                    {curQ.inputType !== "rating" && curQ.options.length > 0 && (
                      <div className="flex flex-wrap gap-2.5 mb-3">
                        {curQ.options.map((opt) => {
                          const sel = selectedOpts.includes(opt);
                          return (
                            <motion.button
                              key={opt}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                if (curQ.inputType === "multiselect") {
                                  setSelectedOpts((p) =>
                                    p.includes(opt) ? p.filter((o) => o !== opt) : [...p, opt],
                                  );
                                } else {
                                  handleAnswer(opt, qIdx);
                                }
                              }}
                              className={`px-4 py-2.5 rounded-full text-[14px] font-medium transition-all duration-200 border ${
                                sel
                                  ? "bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/20"
                                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:shadow-sm"
                              }`}
                            >
                              {sel && (
                                <CheckCircle2 className="w-4 h-4 inline mr-1.5 -mt-0.5 text-blue-400" />
                              )}
                              {opt}
                            </motion.button>
                          );
                        })}
                      </div>
                    )}
                    {curQ.inputType === "multiselect" && selectedOpts.length > 0 && (
                      <button
                        onClick={() => handleAnswer(selectedOpts.join(", "), qIdx)}
                        className="mt-1 text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                      >
                        {isKu ? "پشتڕاستکردنەوە" : "Confirm"}{" "}
                        <ArrowUp className={`w-4 h-4 ${isKu ? "-rotate-90" : "rotate-90"}`} />
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input Bar */}
              <motion.div
                layout="position"
                className="flex items-center gap-2 sm:gap-3 rounded-full px-1.5 sm:px-2 py-1.5 sm:py-2 bg-white/80 backdrop-blur-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-4 ring-transparent focus-within:ring-blue-500/10 focus-within:bg-white focus-within:border-blue-300 transition-all duration-300"
              >
                {inQA && curQ && (
                  <input
                    ref={chatInputRef}
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder={
                      curQ.placeholder || (isKu ? "وەڵامەکەت بنووسە..." : "Type your answer...")
                    }
                    className="flex-1 bg-transparent outline-none text-slate-800 font-medium text-[15px] placeholder:text-slate-400 pl-4"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && customInput.trim())
                        handleAnswer(customInput.trim(), qIdx);
                    }}
                  />
                )}

                {(inBuild || stage === "templates") && (
                  <input
                    value={jobTarget}
                    onChange={(e) => setJobTarget(e.target.value)}
                    placeholder={
                      isKu
                        ? "چ ڕۆڵێک دەکەیتە ئامانج؟"
                        : "What role are you targeting? e.g. Senior PM..."
                    }
                    className="flex-1 bg-transparent outline-none text-slate-800 font-medium text-[15px] placeholder:text-slate-400 pl-4"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleBuild();
                    }}
                    autoFocus={inBuild}
                  />
                )}

                {!inQA && !(inBuild || stage === "templates") && (
                  <span className="flex-1 text-slate-400 font-medium text-[14px] select-none pl-4">
                    {stage === "generating"
                      ? isKu
                        ? "خەریکی دروستکردنی سیڤییەکەت..."
                        : "Generating your resume..."
                      : isKu
                        ? "کەمێک چاوەڕێ بکە..."
                        : "Hang on a second..."}
                  </span>
                )}

                <div className="flex items-center gap-1.5 pr-1 shrink-0">
                  <input
                    type="file"
                    ref={chatPhotoInputRef}
                    onChange={handleChatPhotoUpload}
                    className="hidden"
                    accept="image/*"
                  />
                  {(inQA || inBuild) && (
                    <button
                      onClick={() => chatPhotoInputRef.current?.click()}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${profile?.photoUrl ? "ring-2 ring-blue-500 ring-offset-1 p-0.5" : "bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700"}`}
                      title={profile?.photoUrl ? "Change photo" : "Attach a photo"}
                    >
                      {profile?.photoUrl ? (
                        <img
                          src={profile.photoUrl}
                          className="w-full h-full rounded-full object-cover"
                          alt="Profile"
                        />
                      ) : (
                        <ImagePlus className="w-4 h-4" />
                      )}
                    </button>
                  )}
                  {inQA && (
                    <>
                      <button
                        onClick={handleSkip}
                        className="flex items-center gap-1 text-[13px] font-semibold text-slate-400 hover:text-slate-600 transition-colors px-2 sm:px-3 h-8 sm:h-9 rounded-full hover:bg-slate-100"
                      >
                        {isKu ? "بازدان" : "Skip"}
                      </button>
                      <button
                        onClick={() => {
                          if (customInput.trim()) handleAnswer(customInput.trim(), qIdx);
                        }}
                        disabled={!customInput.trim()}
                        className="w-9 h-9 rounded-full bg-slate-900 disabled:bg-slate-200 hover:bg-blue-600 flex items-center justify-center transition-all disabled:text-slate-400 text-white shadow-sm"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  {(inBuild || stage === "templates") && (
                    <button
                      onClick={handleBuild}
                      disabled={jobTarget.trim().length < 2}
                      className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white px-5 h-9 rounded-full text-[13.5px] font-bold transition-all active:scale-95 shadow-sm"
                    >
                      {isKu ? "دروستکردن" : "Generate"} <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {stage === "templates" && (
            <div className="relative z-10 px-4 pb-44 pt-4">
              <div className="max-w-5xl mx-auto">
                <div className="mb-5 text-center">
                  <div className="text-xs font-bold uppercase tracking-[0.28em] text-slate-400">
                    Templates
                  </div>
                  <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {isKu ? "نەخشەی سیڤی هەڵبژێرە" : "Choose a template"}
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    {isKu
                      ? "یەکەم: نەخشە هەڵبژێرە. پاشان ناوی ڕۆڵەکە بنووسە و سیڤییەکەت دروست بکە."
                      : "First pick a template, then enter the target role and generate the resume."}
                  </p>
                </div>
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 h-[60vh] overflow-y-auto p-2" style={{ scrollbarWidth: 'thin' }}>
                  {[...TEMPLATES].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)).map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTemplate(t.id)}
                      className={`group rounded-2xl border p-3 text-left transition-all ${selectedTemplate === t.id ? "border-blue-500 bg-white shadow-[0_18px_45px_-24px_rgba(37,99,235,0.45)] ring-2 ring-blue-200" : "border-slate-200 bg-white/80 hover:border-slate-300 hover:shadow-sm"}`}
                    >
                      <div className="w-full aspect-[1/1.4] rounded-xl overflow-hidden relative shadow-[0_2px_10px_rgba(0,0,0,0.06)] bg-slate-100 border border-slate-100 mb-3">
                        <div className="absolute inset-0 bg-slate-100 overflow-hidden pointer-events-none flex items-center justify-center">
                          <svg viewBox="0 0 794 1123" className="w-full h-full">
                            <foreignObject width="794" height="1123">
                              <div className="w-[794px] h-[1123px] bg-white text-left">
                                <ResumePreview data={TEMPLATE_SAMPLE} template={t.id} />
                              </div>
                            </foreignObject>
                          </svg>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 text-xs sm:text-sm truncate flex items-center gap-1">
                            {t.label}
                            {t.isNew && (
                              <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 text-[9px] font-bold uppercase tracking-wider shrink-0">
                                New
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] sm:text-xs text-slate-500 truncate">{t.desc}</div>
                        </div>
                        {selectedTemplate === t.id && (
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-5 flex justify-center">
                  <button
                    type="button"
                    onClick={handleBuild}
                    disabled={jobTarget.trim().length < 2}
                    className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 disabled:pointer-events-none disabled:bg-neutral-200 disabled:text-neutral-500"
                  >
                    {isKu ? "دروستکردن و ناردن بۆ ئەدیتەر" : "Generate and open editor"}
                    <Sparkles className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
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

const STEPS_KU = [
  "خوێندنەوەی چیرۆکی پیشەییت...",
  "دیاریکردنی خاڵە بەهێزەکان...",
  "دروستکردنی سەردێڕەکەت...",
  "نووسینی خاڵەکانی ئەزموون...",
  "ڕێکخستنی پوختەکەت...",
  "کۆتاییهێنان بە سیڤییەکەت...",
];

function GeneratingLoader({ onDone }: { onDone: () => void }) {
  const language = useAppStore((s) => s.language);
  const isKu = language === "ku";
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
        {isKu ? "سیڤییەکەت دەنووسرێت" : "Writing your resume"}
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
        {isKu ? STEPS_KU[step] : STEPS[step]}
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

// ── INTAKE FORM ──────────────────────────────────────────────────────────────
function IntakeForm({
  isKu,
  onSubmit,
  onBack,
}: {
  isKu: boolean;
  onSubmit: (data: string) => void;
  onBack: () => void;
}) {
  const apiKey = useAppStore((s) => s.apiKey);
  const generateFieldFn = useServerFn(generateFieldContent);
  const [loadingFields, setLoadingFields] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    jobTitle: "",
    website: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
    certifications: "",
    languages: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const str = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Location: ${formData.location}
Website: ${formData.website}
Target Job Title: ${formData.jobTitle}

Summary:
${formData.summary}

Experience:
${formData.experience}

Education:
${formData.education}

Skills:
${formData.skills}

Certifications:
${formData.certifications}

Languages:
${formData.languages}
    `.trim();
    onSubmit(str);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateAI = async (field: keyof typeof formData) => {
    if (loadingFields[field]) return;
    setLoadingFields((prev) => ({ ...prev, [field]: true }));
    try {
      const res = await generateFieldFn({
        data: {
          apiKey,
          field,
          formData,
          language: isKu ? "ku" : "en",
        }
      });
      if (res && res.content) {
        setFormData((prev) => ({
          ...prev,
          [field]: prev[field] ? prev[field] + "\n\n" + res.content : res.content,
        }));
      }
    } catch (e) {
      toast.error(isKu ? "هەڵەیەک ڕوویدا لە دروستکردندا" : "Failed to generate content");
    } finally {
      setLoadingFields((prev) => ({ ...prev, [field]: false }));
    }
  };

  const aiButton = (field: keyof typeof formData) => (
    <button
      type="button"
      onClick={() => handleGenerateAI(field)}
      disabled={loadingFields[field]}
      className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-md transition-colors disabled:opacity-50"
    >
      {loadingFields[field] ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : (
        <Sparkles className="w-3 h-3" />
      )}
      {isKu ? "بە AI دروستی بکە" : "Generate with AI"}
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      className="w-full max-w-2xl bg-white rounded-[28px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto"
      style={{ scrollbarWidth: "none" }}
    >
      <button
        type="button"
        onClick={onBack}
        className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      
      <h2 className="text-2xl font-bold text-slate-900 mb-2">
        {isKu ? "فۆڕمی زانیارییەکان" : "Information Form"}
      </h2>
      
      <div className="flex items-start sm:items-center gap-2 bg-blue-50/80 text-blue-700 p-3 rounded-xl mb-6 border border-blue-100/50">
        <Sparkles className="w-5 h-5 shrink-0 mt-0.5 sm:mt-0" />
        <p className="text-xs sm:text-sm font-medium">
          {isKu 
            ? "پێویست ناکات بە تەواوی ڕێکیبخەیت، کێشە نییە ئەگەر هەڵەی ڕێنووسیشت هەبێت. زیرەکی دەستکردەکەمان هەمووی ڕێکدەخاتەوە." 
            : "No need to be perfect! It's completely ok to be messy or have typos. Our AI will organize everything beautifully."}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5 text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {isKu ? "ناوی تەواو" : "Full Name"}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800"
              placeholder={isKu ? "ناوی تەواوت" : "e.g. John Doe"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {isKu ? "پۆستی مەبەست" : "Target Job Title"}
            </label>
            <input
              type="text"
              name="jobTitle"
              list="job-titles"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800"
              placeholder={isKu ? "بۆ نموونە: ئەندازیاری نەرمەکاڵا" : "e.g. Software Engineer"}
            />
            <datalist id="job-titles">
              <option value="Software Engineer" />
              <option value="Frontend Developer" />
              <option value="Backend Developer" />
              <option value="Product Manager" />
              <option value="Data Scientist" />
              <option value="UI/UX Designer" />
              <option value="Marketing Manager" />
              <option value="Sales Representative" />
              <option value="Project Manager" />
              <option value="Graphic Designer" />
              <option value="Accountant" />
              <option value="Teacher" />
              <option value="Doctor" />
              <option value="Nurse" />
              <option value="Civil Engineer" />
            </datalist>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {isKu ? "ئیمەیڵ" : "Email"}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {isKu ? "ژمارەی مۆبایل" : "Phone"}
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800"
              placeholder="+1 234 567 890"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {isKu ? "ناونیشان" : "Location"}
            </label>
            <input
              type="text"
              name="location"
              list="locations"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800"
              placeholder={isKu ? "شار، وڵات" : "City, Country"}
            />
            <datalist id="locations">
              <option value="Erbil, Iraq" />
              <option value="Sulaymaniyah, Iraq" />
              <option value="Duhok, Iraq" />
              <option value="Baghdad, Iraq" />
              <option value="London, UK" />
              <option value="New York, USA" />
              <option value="San Francisco, USA" />
              <option value="Berlin, Germany" />
              <option value="Dubai, UAE" />
              <option value="Remote" />
            </datalist>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {isKu ? "وێبسایت / پۆرتفۆلیۆ" : "Website / Portfolio"}
            </label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800"
              placeholder="github.com/johndoe"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-slate-700">
              {isKu ? "پوختە" : "Summary"}
            </label>
            {aiButton("summary")}
          </div>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 resize-y"
            placeholder={isKu ? "کورتەیەک دەربارەی خۆت بنووسە..." : "Write a brief summary about yourself..."}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-slate-700">
              {isKu ? "ئەزموونی کارکردن" : "Experience"}
            </label>
            {aiButton("experience")}
          </div>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 resize-y"
            placeholder={isKu ? "ناوی کۆمپانیا، ڕۆڵەکەت، و کاتەکان..." : "Company names, roles, and dates..."}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-slate-700">
              {isKu ? "خوێندن" : "Education"}
            </label>
            {aiButton("education")}
          </div>
          <textarea
            name="education"
            value={formData.education}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 resize-y"
            placeholder={isKu ? "بڕوانامە و زانکۆ..." : "Degrees and universities..."}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-slate-700">
                {isKu ? "کارامەییەکان" : "Skills"}
              </label>
              {aiButton("skills")}
            </div>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 resize-y"
              placeholder={isKu ? "جیابکەرەوە بە فاریزە" : "Comma separated..."}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-slate-700">
                {isKu ? "بڕوانامەکان" : "Certifications"}
              </label>
              {aiButton("certifications")}
            </div>
            <textarea
              name="certifications"
              value={formData.certifications}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 resize-y"
              placeholder={isKu ? "بڕوانامە پیشەییەکان..." : "Professional certs..."}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-slate-700">
                {isKu ? "زمانەکان" : "Languages"}
              </label>
              {aiButton("languages")}
            </div>
            <textarea
              name="languages"
              value={formData.languages}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 resize-y"
              placeholder={isKu ? "ئینگلیزی، کوردی..." : "English, Kurdish..."}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 sticky bottom-0 bg-white py-2">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2.5 rounded-xl font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            {isKu ? "پاشگەزبوونەوە" : "Cancel"}
          </button>
          <button
            type="submit"
            disabled={!formData.name && !formData.jobTitle && !formData.experience && !formData.education}
            className="px-6 py-2.5 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isKu ? "پەسەندکردن" : "Submit"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
