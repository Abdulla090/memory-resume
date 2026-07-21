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
  Plus,
  Trash2,
  X,
  Briefcase,
  GraduationCap,
  FolderKanban,
  Award,
  Languages as LanguagesIcon,
  Heart,
  Wrench,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { SAMPLE_MEMORIES } from "@/lib/sample-memories";
import { getAiErrorMessage } from "@/lib/ai-errors";

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

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";

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
  const [pendingPhoto, setPendingPhoto] = useState<string | null>(null);

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
      if (pendingPhoto) parsed.photoUrl = pendingPhoto;
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
      toast.error(getAiErrorMessage(err, isKu, isKu ? "شیکردنەوەکە سەرکەوتوو نەبوو." : "Failed to analyze."));
      setStage("intake");
    }
  };

  const handleAiStart = async () => {
    const memory = isKu 
      ? "دەمەوێت سیڤییەک دروست بکەم. تکایە ٥ بۆ ١٠ پرسیارم لێ بکە بۆ دروستکردنی پرۆفایلەکەم."
      : "I want to create a CV. Please ask me 5 to 10 questions step by step to build my profile.";
    setRawMemory(memory);
    setIsThinking(true);
    setStage("parsing");
    
    try {
      const { profile: parsed } = await parseMemoryFn({ data: { apiKey, memory } });
      setProfile(parsed);
      const { state, message, questions } = await getQuestionsFn({
        data: { apiKey, profile: parsed, rawMemory: memory },
      });
      setIsThinking(false);
      
      addMsg({
        from: "ai",
        content: message || (isKu ? "با دەست پێبکەین! چەند پرسیارێکت لێ دەکەم بۆ کۆکردنەوەی زانیارییەکانت." : "Let's get started! I'll ask you a few questions to gather your info.")
      });
      
      if (questions.length > 0) {
        setPendingQs(questions);
        setQIdx(0);
        setStage("questions");
        setTimeout(() => addMsg({ from: "ai", content: questions[0].question, question: questions[0] }), 350);
      } else {
        setStage("templates");
      }
    } catch (err) {
      setIsThinking(false);
      toast.error(getAiErrorMessage(err, isKu, isKu ? "دەستپێکردنی AI سەرکەوتوو نەبوو." : "Failed to start AI."));
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
        if (memory.length < 20) {
          void handleAiStart();
          return;
        }
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
          toast.error(getAiErrorMessage(err, isKu, isKu ? "شیکردنەوەکە سەرکەوتوو نەبوو." : "Failed to analyze."));
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
    if (!profile) {
      toast.error(isKu ? "پرۆفایل نییە" : "Profile is missing");
      return;
    }
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
      toast.error(getAiErrorMessage(err, isKu, isKu ? "نوێکردنەوەی پرۆفایل سەرکەوتوو نەبوو." : "Failed to update profile."));
      setStage("questions");
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
      toast.error(getAiErrorMessage(e, isKu, isKu ? "دروستکردنەکە سەرکەوتوو نەبوو." : "Generation failed."));
      setStage("templates");
    }
  };

  // ── Auto-build from structured form: try AI, fall back to raw form data ─────
  const handleAutoBuild = async (memory: string, fallback: ResumeData) => {
    setRawMemory(memory);
    setInputText("");
    const target = (fallback.title || "").trim();
    setJobTarget(target);
    setStage("generating");
    setIsThinking(true);

    const saveAndGo = (data: ResumeData) => {
      const saved: SavedResume = {
        id: crypto.randomUUID(),
        title: data.title || target || (isKu ? "سیڤی" : "Resume"),
        jobTarget: target,
        template: selectedTemplate,
        design: getTemplateDefaults(selectedTemplate),
        data,
        createdAt: Date.now(),
      };
      addResume(saved);
      setOnboardingDone();
      setIsThinking(false);
      setShowLoader(true);
      setLoaderResumeId(saved.id);
    };

    try {
      const { profile: parsed } = await parseMemoryFn({ data: { apiKey, memory } });
      if (pendingPhoto) parsed.photoUrl = pendingPhoto;
      setProfile(parsed);
      const { resume } = await generateFn({
        data: {
          apiKey,
          profile: parsed,
          jobTarget: target || parsed.careerGoals || (parsed.experience[0]?.title ?? "Professional"),
        },
      });
      saveAndGo(resume);
    } catch {
      // AI missing / failed → build directly from the form data the user provided
      toast.message(
        isKu ? "سیڤییەکەت بەبێ AI دروستکرا." : "Generated without AI.",
        {
          description: isKu
            ? "کلیلی AI بەردەست نەبوو — زانیارییەکانت وەک خۆیان بەکارهێنراون."
            : "AI unavailable — used your info as entered. You can polish it in the editor.",
        },
      );
      saveAndGo(fallback);
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
      dir={isKu ? "rtl" : "ltr"}
      lang={isKu ? "ckb" : "en"}
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
                  onClick={handleAiStart}
                  className="flex flex-col items-center text-center p-6 rounded-[1.5rem] border border-slate-200 hover:border-purple-500 hover:bg-purple-50 hover:shadow-md transition-all group"
                >
                  <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Bot className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-1">{isKu ? "نووسین بە زیرەکی دەستکرد" : "Write with AI"}</h3>
                  <p className="text-xs text-slate-500">{isKu ? "با زیرەکی دەستکرد پرسیارت لێ بکات" : "Let the AI agent ask you questions"}</p>
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
        <div className="perf-scroll relative z-10 flex-1 flex flex-col items-center justify-start px-4 pb-12 pt-10 overflow-y-auto">
          <IntakeForm
            isKu={isKu}
            initialPhoto={pendingPhoto}
            onPhotoChange={setPendingPhoto}
            onSubmit={(formDataStr, fallback) => {
              void handleAutoBuild(formDataStr, fallback);
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

      {/* ── PLAN MODE WIZARD ── */}
      {inChat && (
        <div className="relative z-10 flex-1 flex flex-col min-h-0 bg-transparent items-center justify-center p-4">
          <AnimatePresence mode="wait">
            {isThinking ? (
              <motion.div
                key="thinking"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-2xl bg-white border border-slate-200 shadow-2xl shadow-blue-500/10 rounded-[2rem] p-12 flex flex-col items-center justify-center gap-6"
              >
                <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center shadow-xl shadow-blue-500/5 border border-blue-100/50 relative">
                  <div className="absolute inset-0 bg-blue-400/20 rounded-[2rem] animate-ping" style={{ animationDuration: '2s' }} />
                  <Sparkles className="w-10 h-10 text-blue-500 relative z-10 animate-pulse" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {isKu ? "بیردەکاتەوە..." : "Thinking..."}
                  </h3>
                  <p className="text-sm font-medium text-slate-500">
                    {isKu ? "پڕۆفایلەکەت شیدەکاتەوە و پرسیارەکان ئامادە دەکات" : "Analyzing your profile and preparing questions"}
                  </p>
                </div>
              </motion.div>
            ) : inQA && curQ ? (
              <motion.div
                key={curQ.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-2xl bg-white border border-slate-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[1.5rem] overflow-hidden flex flex-col"
              >
                {/* Header */}
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-bold text-slate-800">
                      {isKu ? "یاریدەدەری زیرەکی دەستکرد" : "AI Assistant"}
                    </span>
                  </div>
                  <span className="bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-widest">
                    {qIdx + 1} / {pendingQs.length}
                  </span>
                </div>

                {/* Question */}
                <div className="p-6 pb-4">
                  <h2 className="text-[1.35rem] font-bold text-slate-900 leading-snug mb-1">
                    {curQ.question}
                  </h2>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    {curQ.helperText || (curQ.inputType === "multiselect" ? (isKu ? "چەند وەڵامێک هەڵبژێرە" : "Select multiple answers") : (isKu ? "یەکێک هەڵبژێرە یان خۆت بنووسە" : "Select an option or write your own"))}
                  </p>
                </div>

                {/* Options List */}
                <div className="px-6 pb-6 flex flex-col gap-2.5">
                  {curQ.inputType === "rating" && (
                    <div className="flex gap-3 justify-center py-4 bg-slate-50 rounded-2xl border border-slate-100">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleAnswer(star.toString(), qIdx)}
                          className="p-2 rounded-full text-slate-300 hover:text-amber-400 transition-colors drop-shadow-sm"
                        >
                          <Star className="w-10 h-10 fill-current" />
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {curQ.inputType !== "rating" && curQ.options.length > 0 && curQ.options.map((opt) => {
                    const sel = selectedOpts.includes(opt);
                    return (
                      <button
                        key={opt}
                        onClick={() => {
                          if (curQ.inputType === "multiselect") {
                            setSelectedOpts((p) =>
                              p.includes(opt) ? p.filter((o) => o !== opt) : [...p, opt]
                            );
                          } else {
                            handleAnswer(opt, qIdx);
                          }
                        }}
                        className={`flex items-start gap-4 w-full text-left p-4 rounded-xl border transition-all duration-200 group ${
                          sel
                            ? "bg-blue-50/50 border-blue-500 shadow-sm ring-1 ring-blue-500/20"
                            : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div className={`mt-0.5 shrink-0 w-5 h-5 rounded-[0.4rem] border flex items-center justify-center transition-colors ${
                          sel ? "bg-blue-600 border-blue-600" : "bg-white border-slate-300 group-hover:border-slate-400"
                        }`}>
                          {sel && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <span className={`text-[15px] font-medium leading-snug ${sel ? "text-slate-900" : "text-slate-700"}`}>
                          {opt}
                        </span>
                      </button>
                    );
                  })}

                  {/* Write your own... */}
                  {curQ.inputType !== "rating" && (
                    <div className="relative mt-1">
                      <input
                        ref={chatInputRef}
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        onKeyDown={(e) => {
                           if (e.key === "Enter" && customInput.trim()) {
                             handleAnswer(customInput.trim(), qIdx);
                           }
                        }}
                        placeholder={curQ.placeholder || (isKu ? "وەڵامەکەت بنووسە..." : "Write your own...")}
                        className="w-full bg-white border border-slate-200 rounded-xl p-4 pl-12 text-[15px] text-slate-800 font-medium placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                      />
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center bg-slate-50">
                         {/* empty radio circle */}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="p-4 px-6 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => finishQA(answers)}
                      className="px-4 py-2 text-[14px] font-bold text-slate-500 hover:text-slate-800 transition-colors rounded-lg hover:bg-slate-200"
                    >
                      {isKu ? "کۆتایی پێ بهێنە" : "Skip all"}
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSkip}
                      className="px-4 py-2 text-[14px] font-bold text-slate-500 hover:text-slate-800 transition-colors rounded-lg hover:bg-slate-200"
                    >
                      {isKu ? "بازدان" : "Skip"}
                    </button>
                    <button
                      onClick={() => {
                        if (curQ.inputType === "multiselect" && selectedOpts.length > 0) {
                          handleAnswer(selectedOpts.join(", "), qIdx);
                        } else if (customInput.trim()) {
                          handleAnswer(customInput.trim(), qIdx);
                        } else {
                          handleSkip();
                        }
                      }}
                      className="px-6 py-2 rounded-xl bg-blue-600 text-white text-[14px] font-bold hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
                    >
                      {isKu ? "دواتر" : "Next"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Sticky Bottom Input for templates/builder stage ONLY */}
          <AnimatePresence>
            {(!inQA && !isThinking && (inBuild || stage === "templates" || stage === "generating")) && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-0 left-0 right-0 px-4 pt-2 pb-6 sm:pb-12 flex justify-center z-40 pointer-events-none"
              >
                <div className="max-w-3xl w-full pointer-events-auto">
                  <div className="flex items-center gap-2 sm:gap-3 rounded-[2rem] px-2 py-2 bg-white/90 backdrop-blur-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-4 ring-transparent focus-within:ring-blue-500/10 focus-within:bg-white focus-within:border-blue-300 transition-all duration-300">
                    
                    {stage === "generating" ? (
                      <span className="flex-1 text-slate-400 font-medium text-[15px] select-none pl-4 flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                        {isKu ? "خەریکی دروستکردنی سیڤییەکەت..." : "Generating your resume..."}
                      </span>
                    ) : (
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
                    
                    <div className="flex items-center gap-1.5 pr-1 shrink-0">
                      <input
                        type="file"
                        ref={chatPhotoInputRef}
                        onChange={handleChatPhotoUpload}
                        className="hidden"
                        accept="image/*"
                      />
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
                      
                      {stage !== "generating" && (
                        <button
                          onClick={handleBuild}
                          disabled={jobTarget.trim().length < 2}
                          className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white px-5 h-9 rounded-full text-[13.5px] font-bold transition-all active:scale-95 shadow-sm"
                        >
                          {isKu ? "دروستکردن" : "Generate"} <Sparkles className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
  initialPhoto,
  onPhotoChange,
}: {
  isKu: boolean;
  onSubmit: (data: string, fallback: ResumeData) => void;
  onBack: () => void;
  initialPhoto?: string | null;
  onPhotoChange?: (photo: string | null) => void;
}) {
  const apiKey = useAppStore((s) => s.apiKey);
  const generateFieldFn = useServerFn(generateFieldContent);
  const [loadingFields, setLoadingFields] = useState<Record<string, boolean>>({});
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<string | null>(initialPhoto ?? null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    jobTitle: "",
    website: "",
    linkedin: "",
    summary: "",
    experience: "",
    projects: "",
    education: "",
    skills: "",
    certifications: "",
    languages: "",
    interests: "",
  });

  // ---- Structured state (source of truth for career/edu/skills sections) ----
  type ExpItem = { id: string; company: string; role: string; start: string; end: string; present: boolean; achievements: string };
  type ProjItem = { id: string; name: string; role: string; tech: string[]; description: string };
  type EduItem = { id: string; degree: string; field: string; institution: string; start: string; end: string; present: boolean; grade: string };
  type CertItem = { id: string; name: string; issuer: string; year: string };
  type LangItem = { id: string; language: string; level: string };

  const uid = () => Math.random().toString(36).slice(2, 9);
  const [expList, setExpList] = useState<ExpItem[]>([]);
  const [projList, setProjList] = useState<ProjItem[]>([]);
  const [eduList, setEduList] = useState<EduItem[]>([]);
  const [certList, setCertList] = useState<CertItem[]>([]);
  const [langList, setLangList] = useState<LangItem[]>([]);
  const [skillChips, setSkillChips] = useState<string[]>([]);
  const [interestChips, setInterestChips] = useState<string[]>([]);

  // Serialize structured state back into formData strings for the AI parser downstream.
  useEffect(() => {
    const serialized = expList
      .filter((e) => e.company || e.role || e.achievements)
      .map((e) => {
        const period = `${e.start || "?"} – ${e.present ? (isKu ? "ئێستا" : "Present") : (e.end || "?")}`;
        const header = `${e.role || ""}${e.role && e.company ? " @ " : ""}${e.company || ""} (${period})`;
        return e.achievements ? `${header}\n${e.achievements}` : header;
      })
      .join("\n\n");
    setFormData((prev) => (prev.experience === serialized ? prev : { ...prev, experience: serialized }));
  }, [expList, isKu]);

  useEffect(() => {
    const serialized = projList
      .filter((p) => p.name || p.description)
      .map((p) => {
        const head = `${p.name || ""}${p.role ? ` — ${p.role}` : ""}`;
        const tech = p.tech.length ? `\nTech: ${p.tech.join(", ")}` : "";
        const desc = p.description ? `\n${p.description}` : "";
        return `${head}${tech}${desc}`;
      })
      .join("\n\n");
    setFormData((prev) => (prev.projects === serialized ? prev : { ...prev, projects: serialized }));
  }, [projList]);

  useEffect(() => {
    const serialized = eduList
      .filter((e) => e.institution || e.degree || e.field)
      .map((e) => {
        const period = `${e.start || "?"}–${e.present ? (isKu ? "ئێستا" : "Present") : (e.end || "?")}`;
        const grade = e.grade ? ` — ${e.grade}` : "";
        return `${e.degree || ""}${e.field ? ` in ${e.field}` : ""}, ${e.institution || ""} (${period})${grade}`.trim();
      })
      .join("\n");
    setFormData((prev) => (prev.education === serialized ? prev : { ...prev, education: serialized }));
  }, [eduList, isKu]);

  useEffect(() => {
    const serialized = certList
      .filter((c) => c.name)
      .map((c) => `${c.name}${c.issuer ? ` — ${c.issuer}` : ""}${c.year ? ` (${c.year})` : ""}`)
      .join("\n");
    setFormData((prev) => (prev.certifications === serialized ? prev : { ...prev, certifications: serialized }));
  }, [certList]);

  useEffect(() => {
    const serialized = langList
      .filter((l) => l.language)
      .map((l) => `${l.language}${l.level ? ` — ${l.level}` : ""}`)
      .join("\n");
    setFormData((prev) => (prev.languages === serialized ? prev : { ...prev, languages: serialized }));
  }, [langList]);

  useEffect(() => {
    const serialized = skillChips.join(", ");
    setFormData((prev) => (prev.skills === serialized ? prev : { ...prev, skills: serialized }));
  }, [skillChips]);

  useEffect(() => {
    const serialized = interestChips.join(", ");
    setFormData((prev) => (prev.interests === serialized ? prev : { ...prev, interests: serialized }));
  }, [interestChips]);



  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error(isKu ? "تکایە وێنەیەک هەڵبژێرە." : "Please select an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setPhoto(url);
      onPhotoChange?.(url);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const str = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Location: ${formData.location}
Website: ${formData.website}
LinkedIn: ${formData.linkedin}
Target Job Title: ${formData.jobTitle}

Summary:
${formData.summary}

Experience:
${formData.experience}

Projects:
${formData.projects}

Education:
${formData.education}

Skills:
${formData.skills}

Certifications:
${formData.certifications}

Languages:
${formData.languages}

Interests:
${formData.interests}
    `.trim();

    // Build a ResumeData fallback directly from the structured inputs so we
    // can still generate a CV when the AI key is missing or the AI errors out.
    const dashSep = " – ";
    const presentLabel = isKu ? "ئێستا" : "Present";
    const fallback: ResumeData = {
      name: formData.name || (isKu ? "ناوی تۆ" : "Your Name"),
      title: formData.jobTitle || (isKu ? "پیشەگەر" : "Professional"),
      email: formData.email || undefined,
      phone: formData.phone || undefined,
      photoUrl: photo || undefined,
      location: formData.location || undefined,
      languages: langList.map((l) => l.language.trim()).filter(Boolean),
      summary: formData.summary || "",
      experience: expList
        .filter((e) => e.company || e.role || e.achievements)
        .map((e) => ({
          title: e.role || "",
          company: e.company || "",
          duration: `${e.start || ""}${dashSep}${e.present ? presentLabel : e.end || ""}`.trim(),
          description: "",
          achievements: (e.achievements || "")
            .split(/\r?\n|•|·|- /)
            .map((a) => a.trim())
            .filter(Boolean),
        })),
      projects: projList
        .filter((p) => p.name || p.description)
        .map((p) => ({
          name: p.name || "",
          description: p.description || "",
          tech: p.tech,
          impact: "",
        })),
      education: eduList
        .filter((e) => e.institution || e.degree || e.field)
        .map((e) => ({
          degree: `${e.degree || ""}${e.field ? ` in ${e.field}` : ""}`.trim(),
          institution: e.institution || "",
          year: `${e.start || ""}${dashSep}${e.present ? presentLabel : e.end || ""}`.trim(),
        })),
      skills: skillChips.length
        ? skillChips
        : formData.skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
      certifications: certList
        .filter((c) => c.name)
        .map(
          (c) =>
            `${c.name}${c.issuer ? ` — ${c.issuer}` : ""}${c.year ? ` (${c.year})` : ""}`,
        ),
    };

    onSubmit(str, fallback);
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
      toast.error(getAiErrorMessage(e, isKu, isKu ? "هەڵەیەک ڕوویدا لە دروستکردندا" : "Failed to generate content"));
    } finally {
      setLoadingFields((prev) => ({ ...prev, [field]: false }));
    }
  };

  const aiButton = (field: keyof typeof formData) => (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      onClick={() => handleGenerateAI(field)}
      disabled={loadingFields[field]}
      className="h-7 px-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 gap-1"
    >
      {loadingFields[field] ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : (
        <Sparkles className="w-3 h-3" />
      )}
      {isKu ? "بە AI دروستی بکە" : "Generate with AI"}
    </Button>
  );

  const dir = isKu ? "rtl" : "ltr";
  const inputCls = "rounded-xl bg-slate-50 border-slate-200 focus-visible:bg-white h-11";
  const textareaCls = "rounded-xl bg-slate-50 border-slate-200 focus-visible:bg-white";

  const steps = [
    { id: "personal", label: isKu ? "زانیارییە کەسییەکان" : "Personal" },
    { id: "summary", label: isKu ? "پوختە" : "Summary" },
    { id: "career", label: isKu ? "ئەزموون و پڕۆژە" : "Career" },
    { id: "education", label: isKu ? "خوێندن" : "Education" },
    { id: "extras", label: isKu ? "کارامەیی و زیاتر" : "Skills & More" },
  ] as const;

  const [step, setStep] = useState(0);
  const total = steps.length;
  const isLast = step === total - 1;
  const canSubmit =
    !!formData.name || !!formData.jobTitle || !!formData.experience || !!formData.education;

  const goNext = () => {
    if (isLast) return;
    setStep((s) => Math.min(total - 1, s + 1));
  };
  const goPrev = () => {
    if (step === 0) {
      onBack();
      return;
    }
    setStep((s) => Math.max(0, s - 1));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLast) {
      goNext();
      return;
    }
    handleSubmit(e);
  };

  const CloseIcon = isKu ? ArrowRight : ArrowLeft;
  const PrevIcon = isKu ? ArrowRight : ArrowLeft;
  const NextIcon = isKu ? ArrowLeft : ArrowRight;

  return (
    <motion.div
      dir={dir}
      lang={isKu ? "ckb" : "en"}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      className="w-full max-w-2xl bg-white rounded-[28px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto"
      style={{ scrollbarWidth: "none", textAlign: isKu ? "right" : "left" }}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onBack}
        className={`absolute top-4 ${isKu ? "left-4" : "right-4"} rounded-full text-slate-500`}
      >
        <CloseIcon className="w-5 h-5" />
      </Button>

      <div className="mb-2 flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-slate-500">
        <span>{String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        <span className="text-slate-300">•</span>
        <span className="text-slate-700">{steps[step].label}</span>
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-3">
        {isKu ? "فۆڕمی زانیارییەکان" : "Information Form"}
      </h2>

      {/* Progress bar (shadcn) */}
      <div className="mb-3">
        <Progress value={((step + 1) / total) * 100} className="h-1.5" />
      </div>
      <div className="flex items-center gap-1.5 mb-5">
        {steps.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setStep(i)}
            className={`h-1 flex-1 rounded-full transition-all ${
              i <= step ? "bg-blue-600" : "bg-slate-200 hover:bg-slate-300"
            }`}
            title={s.label}
          />
        ))}
      </div>

      <div className="flex items-start sm:items-center gap-2 bg-blue-50/80 text-blue-700 p-3 rounded-xl mb-6 border border-blue-100/50">
        <Sparkles className="w-5 h-5 shrink-0 mt-0.5 sm:mt-0" />
        <p className="text-xs sm:text-sm font-medium">
          {isKu
            ? "پێویست ناکات بە تەواوی ڕێکیبخەیت، کێشە نییە ئەگەر هەڵەی ڕێنووسیشت هەبێت. زیرەکی دەستکردەکەمان هەمووی ڕێکدەخاتەوە."
            : "No need to be perfect! It's completely ok to be messy or have typos. Our AI will organize everything beautifully."}
        </p>
      </div>

      <form onSubmit={onFormSubmit} className="space-y-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={steps[step].id}
            initial={{ opacity: 0, x: isKu ? -24 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isKu ? 24 : -24 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="space-y-5"
          >
            {step === 0 && (
              <>
                {/* Photo upload */}
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 bg-slate-50/60">
                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    className={`shrink-0 w-16 h-16 rounded-full flex items-center justify-center overflow-hidden transition-all ${photo ? "ring-2 ring-blue-500 ring-offset-2" : "bg-white border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/40"}`}
                    title={isKu ? "وێنە بارکە" : "Upload photo"}
                  >
                    {photo ? (
                      <img src={photo} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <ImagePlus className="w-6 h-6 text-slate-400" />
                    )}
                  </button>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">
                      {isKu ? "وێنەی پرۆفایل (بەڵێن نییە)" : "Profile photo (optional)"}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isKu ? "PNG یان JPG. لە هەندێک قاڵبدا پیشان دەدرێت." : "PNG or JPG. Shown on templates that support photos."}
                    </p>
                  </div>
                  {photo && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => { setPhoto(null); onPhotoChange?.(null); }}
                      className="text-xs text-slate-500 hover:text-red-600"
                    >
                      {isKu ? "لابردن" : "Remove"}
                    </Button>
                  )}
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">{isKu ? "ناوی تەواو" : "Full Name"}</Label>
                    <Input id="name" dir={dir} type="text" name="name" value={formData.name} onChange={handleChange} className={inputCls} placeholder={isKu ? "ناوی تەواوت" : "e.g. John Doe"} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="jobTitle">{isKu ? "پۆستی مەبەست" : "Target Job Title"}</Label>
                    <Input id="jobTitle" dir={dir} type="text" name="jobTitle" list="job-titles" value={formData.jobTitle} onChange={handleChange} className={inputCls} placeholder={isKu ? "بۆ نموونە: ئەندازیاری نەرمەکاڵا" : "e.g. Software Engineer"} />
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
                  <div className="space-y-1.5">
                    <Label htmlFor="email">{isKu ? "ئیمەیڵ" : "Email"}</Label>
                    <Input id="email" dir="ltr" type="email" name="email" value={formData.email} onChange={handleChange} className={inputCls} placeholder="email@example.com" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">{isKu ? "ژمارەی مۆبایل" : "Phone"}</Label>
                    <Input id="phone" dir="ltr" type="text" name="phone" value={formData.phone} onChange={handleChange} className={inputCls} placeholder="+1 234 567 890" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="location">{isKu ? "ناونیشان" : "Location"}</Label>
                    <Input id="location" dir={dir} type="text" name="location" list="locations" value={formData.location} onChange={handleChange} className={inputCls} placeholder={isKu ? "شار، وڵات" : "City, Country"} />
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
                  <div className="space-y-1.5">
                    <Label htmlFor="website">{isKu ? "وێبسایت / پۆرتفۆلیۆ" : "Website / Portfolio"}</Label>
                    <Input id="website" dir="ltr" type="text" name="website" value={formData.website} onChange={handleChange} className={inputCls} placeholder="github.com/johndoe" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="linkedin">{isKu ? "لینکدین" : "LinkedIn"}</Label>
                  <Input id="linkedin" dir="ltr" type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} className={inputCls} placeholder="linkedin.com/in/johndoe" />
                </div>
              </>
            )}

            {step === 1 && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="summary">{isKu ? "پوختە" : "Summary"}</Label>
                  {aiButton("summary")}
                </div>
                <Textarea id="summary" dir={dir} name="summary" value={formData.summary} onChange={handleChange} rows={8} className={textareaCls} placeholder={isKu ? "کورتەیەک دەربارەی خۆت بنووسە..." : "Write a brief summary about yourself..."} />
                <p className="text-xs text-slate-500 mt-1">
                  {isKu ? "٢-٤ ڕستە دەربارەی ئەزموون و ئامانجەکانت." : "2–4 sentences about your experience and goals."}
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                {/* Experience repeater */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-slate-500" />
                      <Label className="text-sm font-semibold text-slate-800">
                        {isKu ? "ئەزموونی کارکردن" : "Work Experience"}
                      </Label>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setExpList((l) => [...l, { id: uid(), company: "", role: "", start: "", end: "", present: false, achievements: "" }])}
                      className="rounded-lg gap-1 h-8 text-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {isKu ? "زیادکردن" : "Add"}
                    </Button>
                  </div>
                  {expList.length === 0 ? (
                    <button
                      type="button"
                      onClick={() => setExpList([{ id: uid(), company: "", role: "", start: "", end: "", present: false, achievements: "" }])}
                      className="w-full py-6 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-sm text-slate-500 hover:text-blue-600 transition-all"
                    >
                      + {isKu ? "یەکەم ئەزموونی کار زیاد بکە" : "Add your first work experience"}
                    </button>
                  ) : (
                    <div className="space-y-3">
                      {expList.map((item, idx) => (
                        <RepeaterCard key={item.id} index={idx + 1} onRemove={() => setExpList((l) => l.filter((x) => x.id !== item.id))} isKu={isKu}>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <Label className="text-xs text-slate-600">{isKu ? "ڕۆڵ / پۆست" : "Role / Title"}</Label>
                              <Input dir={dir} value={item.role} onChange={(e) => setExpList((l) => l.map((x) => x.id === item.id ? { ...x, role: e.target.value } : x))} className={inputCls} placeholder={isKu ? "بۆ نموونە: ئەندازیاری نەرمەکاڵا" : "e.g. Software Engineer"} />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs text-slate-600">{isKu ? "کۆمپانیا" : "Company"}</Label>
                              <Input dir={dir} value={item.company} onChange={(e) => setExpList((l) => l.map((x) => x.id === item.id ? { ...x, company: e.target.value } : x))} className={inputCls} placeholder={isKu ? "ناوی کۆمپانیا" : "Company name"} />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 items-end">
                            <div className="space-y-1">
                              <Label className="text-xs text-slate-600">{isKu ? "لە" : "Start"}</Label>
                              <MonthYearSelect value={item.start} onChange={(v) => setExpList((l) => l.map((x) => x.id === item.id ? { ...x, start: v } : x))} isKu={isKu} />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs text-slate-600">{isKu ? "بۆ" : "End"}</Label>
                              <MonthYearSelect value={item.end} onChange={(v) => setExpList((l) => l.map((x) => x.id === item.id ? { ...x, end: v } : x))} disabled={item.present} isKu={isKu} />
                            </div>
                            <label className="col-span-2 sm:col-span-2 flex items-center gap-2 h-9 text-sm text-slate-700 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={item.present}
                                onChange={(e) => setExpList((l) => l.map((x) => x.id === item.id ? { ...x, present: e.target.checked, end: e.target.checked ? "" : x.end } : x))}
                                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                              />
                              {isKu ? "ئێستا لێرەم کار دەکەم" : "I currently work here"}
                            </label>
                          </div>
                          <div className="space-y-1 mt-3">
                            <Label className="text-xs text-slate-600">{isKu ? "دەسکەوت و ئەرکەکان" : "Key achievements"}</Label>
                            <Textarea dir={dir} value={item.achievements} onChange={(e) => setExpList((l) => l.map((x) => x.id === item.id ? { ...x, achievements: e.target.value } : x))} rows={3} className={textareaCls} placeholder={isKu ? "• کاریگەرییەکەت لەسەر تیم و نەرمەکاڵا..." : "• Increased conversion by 32%\n• Led a team of 5 engineers"} />
                          </div>
                        </RepeaterCard>
                      ))}
                    </div>
                  )}
                </div>

                {/* Projects repeater */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <FolderKanban className="w-4 h-4 text-slate-500" />
                      <Label className="text-sm font-semibold text-slate-800">
                        {isKu ? "پڕۆژەکان" : "Projects"}
                      </Label>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setProjList((l) => [...l, { id: uid(), name: "", role: "", tech: [], description: "" }])}
                      className="rounded-lg gap-1 h-8 text-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {isKu ? "زیادکردن" : "Add"}
                    </Button>
                  </div>
                  {projList.length === 0 ? (
                    <button
                      type="button"
                      onClick={() => setProjList([{ id: uid(), name: "", role: "", tech: [], description: "" }])}
                      className="w-full py-5 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-sm text-slate-500 hover:text-blue-600 transition-all"
                    >
                      + {isKu ? "پڕۆژەیەک زیاد بکە (بەڵێن نییە)" : "Add a project (optional)"}
                    </button>
                  ) : (
                    <div className="space-y-3">
                      {projList.map((item, idx) => (
                        <RepeaterCard key={item.id} index={idx + 1} onRemove={() => setProjList((l) => l.filter((x) => x.id !== item.id))} isKu={isKu}>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <Label className="text-xs text-slate-600">{isKu ? "ناوی پڕۆژە" : "Project name"}</Label>
                              <Input dir={dir} value={item.name} onChange={(e) => setProjList((l) => l.map((x) => x.id === item.id ? { ...x, name: e.target.value } : x))} className={inputCls} placeholder={isKu ? "ناوی پڕۆژە" : "e.g. Portfolio Website"} />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs text-slate-600">{isKu ? "ڕۆڵی تۆ" : "Your role"}</Label>
                              <Input dir={dir} value={item.role} onChange={(e) => setProjList((l) => l.map((x) => x.id === item.id ? { ...x, role: e.target.value } : x))} className={inputCls} placeholder={isKu ? "بۆ نموونە: پێشکەوتووی سەرەکی" : "e.g. Lead Developer"} />
                            </div>
                          </div>
                          <div className="space-y-1 mt-3">
                            <Label className="text-xs text-slate-600">{isKu ? "تەکنەلۆژیا" : "Tech stack"}</Label>
                            <ChipInput
                              chips={item.tech}
                              onChange={(next) => setProjList((l) => l.map((x) => x.id === item.id ? { ...x, tech: next } : x))}
                              placeholder={isKu ? "React, Node، ..." : "React, Node.js, ..."}
                              suggestions={["React","Next.js","TypeScript","Node.js","Python","Tailwind","Figma","PostgreSQL"]}
                            />
                          </div>
                          <div className="space-y-1 mt-3">
                            <Label className="text-xs text-slate-600">{isKu ? "کورتەیەک" : "Description"}</Label>
                            <Textarea dir={dir} value={item.description} onChange={(e) => setProjList((l) => l.map((x) => x.id === item.id ? { ...x, description: e.target.value } : x))} rows={2} className={textareaCls} placeholder={isKu ? "ئامانج و ئەنجام" : "Goal, impact, outcome"} />
                          </div>
                        </RepeaterCard>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-slate-500" />
                    <Label className="text-sm font-semibold text-slate-800">
                      {isKu ? "خوێندن" : "Education"}
                    </Label>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setEduList((l) => [...l, { id: uid(), degree: "", field: "", institution: "", start: "", end: "", present: false, grade: "" }])}
                    className="rounded-lg gap-1 h-8 text-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    {isKu ? "زیادکردن" : "Add"}
                  </Button>
                </div>
                {eduList.length === 0 ? (
                  <button
                    type="button"
                    onClick={() => setEduList([{ id: uid(), degree: "", field: "", institution: "", start: "", end: "", present: false, grade: "" }])}
                    className="w-full py-6 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-sm text-slate-500 hover:text-blue-600 transition-all"
                  >
                    + {isKu ? "خوێندنێک زیاد بکە" : "Add an education entry"}
                  </button>
                ) : (
                  <div className="space-y-3">
                    {eduList.map((item, idx) => (
                      <RepeaterCard key={item.id} index={idx + 1} onRemove={() => setEduList((l) => l.filter((x) => x.id !== item.id))} isKu={isKu}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs text-slate-600">{isKu ? "بڕوانامە" : "Degree"}</Label>
                            <Select value={item.degree} onValueChange={(v) => setEduList((l) => l.map((x) => x.id === item.id ? { ...x, degree: v } : x))}>
                              <SelectTrigger className="rounded-xl bg-slate-50 border-slate-200 h-11">
                                <SelectValue placeholder={isKu ? "هەڵبژێرە" : "Select..."} />
                              </SelectTrigger>
                              <SelectContent>
                                {["High School","Diploma","Bachelor","Master","PhD","Other"].map((d) => (
                                  <SelectItem key={d} value={d}>{d}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-slate-600">{isKu ? "بواری خوێندن" : "Field of study"}</Label>
                            <Input dir={dir} value={item.field} onChange={(e) => setEduList((l) => l.map((x) => x.id === item.id ? { ...x, field: e.target.value } : x))} className={inputCls} placeholder={isKu ? "بۆ نموونە: زانستی کۆمپیوتەر" : "e.g. Computer Science"} />
                          </div>
                        </div>
                        <div className="space-y-1 mt-3">
                          <Label className="text-xs text-slate-600">{isKu ? "زانکۆ / پەیمانگا" : "Institution"}</Label>
                          <Input dir={dir} value={item.institution} onChange={(e) => setEduList((l) => l.map((x) => x.id === item.id ? { ...x, institution: e.target.value } : x))} className={inputCls} placeholder={isKu ? "ناوی زانکۆ" : "University / School"} />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 items-end">
                          <div className="space-y-1">
                            <Label className="text-xs text-slate-600">{isKu ? "لە" : "Start"}</Label>
                            <YearSelect value={item.start} onChange={(v) => setEduList((l) => l.map((x) => x.id === item.id ? { ...x, start: v } : x))} isKu={isKu} />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-slate-600">{isKu ? "بۆ" : "End"}</Label>
                            <YearSelect value={item.end} onChange={(v) => setEduList((l) => l.map((x) => x.id === item.id ? { ...x, end: v } : x))} disabled={item.present} isKu={isKu} />
                          </div>
                          <label className="col-span-2 sm:col-span-2 flex items-center gap-2 h-9 text-sm text-slate-700 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={item.present}
                              onChange={(e) => setEduList((l) => l.map((x) => x.id === item.id ? { ...x, present: e.target.checked, end: e.target.checked ? "" : x.end } : x))}
                              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            {isKu ? "ئێستا لێرەم دەخوێنم" : "Currently studying"}
                          </label>
                        </div>
                        <div className="space-y-1 mt-3">
                          <Label className="text-xs text-slate-600">{isKu ? "نمرە / GPA (بەڵێن نییە)" : "Grade / GPA (optional)"}</Label>
                          <Input dir={dir} value={item.grade} onChange={(e) => setEduList((l) => l.map((x) => x.id === item.id ? { ...x, grade: e.target.value } : x))} className={inputCls} placeholder="3.8 / 4.0" />
                        </div>
                      </RepeaterCard>
                    ))}
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                {/* Skills chips */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="w-4 h-4 text-slate-500" />
                    <Label className="text-sm font-semibold text-slate-800">
                      {isKu ? "کارامەییەکان" : "Skills"}
                    </Label>
                  </div>
                  <ChipInput
                    chips={skillChips}
                    onChange={setSkillChips}
                    placeholder={isKu ? "کارامەیی بنووسە و Enter بکە" : "Type a skill and press Enter"}
                    dir={dir}
                    suggestions={["JavaScript","TypeScript","React","Node.js","Python","SQL","AWS","Docker","Figma","Excel","Communication","Leadership","Project Management","Teamwork","Problem Solving"]}
                    suggestionsLabel={isKu ? "پێشنیارەکان" : "Suggestions"}
                  />
                </div>

                {/* Languages repeater */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <LanguagesIcon className="w-4 h-4 text-slate-500" />
                      <Label className="text-sm font-semibold text-slate-800">
                        {isKu ? "زمانەکان" : "Languages"}
                      </Label>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setLangList((l) => [...l, { id: uid(), language: "", level: "" }])}
                      className="rounded-lg gap-1 h-8 text-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {isKu ? "زیادکردن" : "Add"}
                    </Button>
                  </div>
                  {langList.length === 0 ? (
                    <button
                      type="button"
                      onClick={() => setLangList([{ id: uid(), language: "", level: "" }])}
                      className="w-full py-5 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-sm text-slate-500 hover:text-blue-600 transition-all"
                    >
                      + {isKu ? "زمانێک زیاد بکە" : "Add a language"}
                    </button>
                  ) : (
                    <div className="space-y-2">
                      {langList.map((item) => (
                        <div key={item.id} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                          <Select value={item.language} onValueChange={(v) => setLangList((l) => l.map((x) => x.id === item.id ? { ...x, language: v } : x))}>
                            <SelectTrigger className="rounded-xl bg-slate-50 border-slate-200 h-11">
                              <SelectValue placeholder={isKu ? "زمان" : "Language"} />
                            </SelectTrigger>
                            <SelectContent>
                              {["English","Kurdish","Arabic","Turkish","Persian","French","German","Spanish","Italian","Chinese","Other"].map((lang) => (
                                <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Select value={item.level} onValueChange={(v) => setLangList((l) => l.map((x) => x.id === item.id ? { ...x, level: v } : x))}>
                            <SelectTrigger className="rounded-xl bg-slate-50 border-slate-200 h-11">
                              <SelectValue placeholder={isKu ? "ئاست" : "Level"} />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                { v: "Native", ku: "زمانی دایک" },
                                { v: "Fluent", ku: "زۆر باش" },
                                { v: "Professional", ku: "پیشەیی" },
                                { v: "Intermediate", ku: "مامناوەند" },
                                { v: "Basic", ku: "سەرەتایی" },
                              ].map((lvl) => (
                                <SelectItem key={lvl.v} value={lvl.v}>{isKu ? lvl.ku : lvl.v}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => setLangList((l) => l.filter((x) => x.id !== item.id))}
                            className="h-11 w-11 text-slate-400 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Certifications repeater */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-slate-500" />
                      <Label className="text-sm font-semibold text-slate-800">
                        {isKu ? "بڕوانامەکان" : "Certifications"}
                      </Label>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setCertList((l) => [...l, { id: uid(), name: "", issuer: "", year: "" }])}
                      className="rounded-lg gap-1 h-8 text-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {isKu ? "زیادکردن" : "Add"}
                    </Button>
                  </div>
                  {certList.length === 0 ? (
                    <button
                      type="button"
                      onClick={() => setCertList([{ id: uid(), name: "", issuer: "", year: "" }])}
                      className="w-full py-5 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-sm text-slate-500 hover:text-blue-600 transition-all"
                    >
                      + {isKu ? "بڕوانامەیەک زیاد بکە (بەڵێن نییە)" : "Add a certification (optional)"}
                    </button>
                  ) : (
                    <div className="space-y-2">
                      {certList.map((item) => (
                        <div key={item.id} className="grid grid-cols-1 sm:grid-cols-[2fr_2fr_1fr_auto] gap-2 items-center">
                          <Input dir={dir} value={item.name} onChange={(e) => setCertList((l) => l.map((x) => x.id === item.id ? { ...x, name: e.target.value } : x))} className={inputCls} placeholder={isKu ? "ناوی بڕوانامە" : "Name"} />
                          <Input dir={dir} value={item.issuer} onChange={(e) => setCertList((l) => l.map((x) => x.id === item.id ? { ...x, issuer: e.target.value } : x))} className={inputCls} placeholder={isKu ? "دەرکەر" : "Issuer"} />
                          <Input dir="ltr" value={item.year} onChange={(e) => setCertList((l) => l.map((x) => x.id === item.id ? { ...x, year: e.target.value } : x))} className={inputCls} placeholder="Year" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => setCertList((l) => l.filter((x) => x.id !== item.id))}
                            className="h-11 w-11 text-slate-400 hover:text-red-600 justify-self-end"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Interests chips */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-slate-500" />
                    <Label className="text-sm font-semibold text-slate-800">
                      {isKu ? "بایەخەکان" : "Interests"}
                    </Label>
                  </div>
                  <ChipInput
                    chips={interestChips}
                    onChange={setInterestChips}
                    placeholder={isKu ? "بایەخێک بنووسە و Enter بکە" : "Type an interest and press Enter"}
                    dir={dir}
                    suggestions={["Chess","Open-source","Reading","Football","Photography","Volunteering","Mentoring","Traveling","Music","Gaming","Fitness","Cooking"]}
                    suggestionsLabel={isKu ? "پێشنیارەکان" : "Suggestions"}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="pt-4 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 sticky bottom-0 bg-white py-2">
          <Button
            type="button"
            variant="outline"
            onClick={goPrev}
            className="rounded-xl gap-2 w-full sm:w-auto justify-center"
          >
            <PrevIcon className="w-4 h-4 shrink-0" />
            <span className="truncate">
              {step === 0
                ? isKu ? "پاشگەزبوونەوە" : "Cancel"
                : isKu ? "پێشوو" : "Back"}
            </span>
          </Button>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {!isLast && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => { setStep(total - 1); }}
                className="text-sm text-slate-500 hover:text-slate-700 flex-1 sm:flex-none"
              >
                <span className="truncate">{isKu ? "بازدان" : "Skip to end"}</span>
              </Button>
            )}
            {isLast ? (
              <Button
                type="submit"
                disabled={!canSubmit}
                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex-1 sm:flex-none justify-center"
              >
                {isKu ? "پەسەندکردن" : "Submit"}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={goNext}
                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white gap-2 flex-1 sm:flex-none justify-center"
              >
                <span className="truncate">{isKu ? "دواتر" : "Next"}</span>
                <NextIcon className="w-4 h-4 shrink-0" />
              </Button>
            )}
          </div>
        </div>
      </form>
    </motion.div>
  );
}

// ============================================================================
// Helper components for the structured intake form
// ============================================================================

function RepeaterCard({
  index,
  onRemove,
  isKu,
  children,
}: {
  index: number;
  onRemove: () => void;
  isKu: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 group hover:border-slate-300 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-mono text-slate-400 tracking-widest">
          #{String(index).padStart(2, "0")}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="h-7 text-xs text-slate-400 hover:text-red-600 gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          {isKu ? "لابردن" : "Remove"}
        </Button>
      </div>
      {children}
    </div>
  );
}

function ChipInput({
  chips,
  onChange,
  placeholder,
  suggestions = [],
  suggestionsLabel,
  dir = "ltr",
}: {
  chips: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
  suggestionsLabel?: string;
  dir?: "ltr" | "rtl";
}) {
  const [value, setValue] = useState("");
  const commit = (raw: string) => {
    const parts = raw
      .split(/[,\n]/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (!parts.length) return;
    const next = [...chips];
    for (const p of parts) {
      if (!next.some((c) => c.toLowerCase() === p.toLowerCase())) next.push(p);
    }
    onChange(next);
    setValue("");
  };
  const remove = (chip: string) => onChange(chips.filter((c) => c !== chip));
  const available = suggestions.filter(
    (s) => !chips.some((c) => c.toLowerCase() === s.toLowerCase())
  );
  return (
    <div className="space-y-2">
      <div className="min-h-[44px] rounded-xl bg-slate-50 border border-slate-200 focus-within:bg-white focus-within:border-slate-300 px-2 py-1.5 flex flex-wrap items-center gap-1.5">
        {chips.map((chip) => (
          <span
            key={chip}
            className="inline-flex items-center gap-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 text-xs font-medium"
          >
            {chip}
            <button
              type="button"
              onClick={() => remove(chip)}
              className="text-blue-500 hover:text-blue-800"
              aria-label="Remove"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          dir={dir}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              commit(value);
            } else if (e.key === "Backspace" && !value && chips.length) {
              onChange(chips.slice(0, -1));
            }
          }}
          onBlur={() => value && commit(value)}
          placeholder={chips.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[140px] bg-transparent outline-none text-sm py-1 px-1"
        />
      </div>
      {available.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {suggestionsLabel && (
            <span className="text-[11px] text-slate-400 mr-1">{suggestionsLabel}:</span>
          )}
          {available.slice(0, 12).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => commit(s)}
              className="rounded-full bg-white border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 px-2.5 py-1 text-xs transition-colors"
            >
              + {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function YearSelect({
  value,
  onChange,
  disabled,
  isKu,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  isKu: boolean;
}) {
  const now = new Date().getFullYear();
  const years = Array.from({ length: 45 }, (_, i) => String(now - i));
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="rounded-xl bg-slate-50 border-slate-200 h-9">
        <SelectValue placeholder={isKu ? "ساڵ" : "Year"} />
      </SelectTrigger>
      <SelectContent>
        {years.map((y) => (
          <SelectItem key={y} value={y}>{y}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function MonthYearSelect({
  value,
  onChange,
  disabled,
  isKu,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  isKu: boolean;
}) {
  const months = [
    { v: "Jan", ku: "کانوونی دووەم" },
    { v: "Feb", ku: "شوبات" },
    { v: "Mar", ku: "ئازار" },
    { v: "Apr", ku: "نیسان" },
    { v: "May", ku: "ئایار" },
    { v: "Jun", ku: "حوزەیران" },
    { v: "Jul", ku: "تەمووز" },
    { v: "Aug", ku: "ئاب" },
    { v: "Sep", ku: "ئەیلوول" },
    { v: "Oct", ku: "تشرینی یەکەم" },
    { v: "Nov", ku: "تشرینی دووەم" },
    { v: "Dec", ku: "کانوونی یەکەم" },
  ];
  const now = new Date().getFullYear();
  const years = Array.from({ length: 45 }, (_, i) => String(now - i));
  const [m = "", y = ""] = value ? value.split(" ") : ["", ""];
  const setPart = (nextM: string, nextY: string) => {
    if (!nextM && !nextY) onChange("");
    else onChange(`${nextM}${nextM && nextY ? " " : ""}${nextY}`.trim());
  };
  return (
    <div className="grid grid-cols-2 gap-1.5">
      <Select value={m} onValueChange={(v) => setPart(v, y)} disabled={disabled}>
        <SelectTrigger className="rounded-xl bg-slate-50 border-slate-200 h-9 text-xs">
          <SelectValue placeholder={isKu ? "مانگ" : "Mon"} />
        </SelectTrigger>
        <SelectContent>
          {months.map((mo) => (
            <SelectItem key={mo.v} value={mo.v}>{isKu ? mo.ku : mo.v}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={y} onValueChange={(v) => setPart(m, v)} disabled={disabled}>
        <SelectTrigger className="rounded-xl bg-slate-50 border-slate-200 h-9 text-xs">
          <SelectValue placeholder={isKu ? "ساڵ" : "Year"} />
        </SelectTrigger>
        <SelectContent>
          {years.map((yy) => (
            <SelectItem key={yy} value={yy}>{yy}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

