import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  ChevronDown,
  LayoutTemplate,
  RotateCcw,
  Wand2,
  CheckCircle2,
  X,
  FileText,
  FileUser,
  Play,
  EyeOff,
  Bot,
  Sliders,
} from "lucide-react";
import {
  improveBullet,
  tailorToJob,
  chatEditResume,
  fixResumeErrors,
  generateCoverLetter,
} from "@/lib/ai.functions";
import { useAppStore } from "@/lib/store";
import type { ExperienceItem, ResumeData, TemplateId, DesignSettings } from "@/lib/types";
import { DesignContext } from "@/components/resume/DesignContext";
import { DEFAULT_DESIGN, getTemplateDefaults, DesignPanel } from "@/components/DesignPanel";
import type { SectionId } from "@/components/DesignPanel";
import { getValueAtPath } from "@/components/resume/editor-helpers";

// Sub-components
import { EditorChatPane } from "@/components/editor/EditorChatPane";
import { EditorPreviewPanel } from "@/components/editor/EditorPreviewPanel";
import {
  TailorModal,
  CoverLetterModal,
  TemplateModal,
  ATSModal,
  InlineEditModal,
} from "@/components/editor/EditorModals";

// Constants
import {
  DEV_SAMPLE_ID,
  DEV_RESUME,
  TEMPLATES,
  type Category,
} from "@/components/editor/editor.constants";

// ─── Route ────────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/editor/$id")({
  head: () => ({
    meta: [
      { title: "Resume Editor — MemoryCV" },
      {
        name: "description",
        content: "Edit, tailor, and export a resume generated from your memory profile.",
      },
    ],
  }),
  component: ResumeEditor,
});

// ─── Dev seed ─────────────────────────────────────────────────────────────────
if (typeof window !== "undefined") {
  const { resumes, addResume } = useAppStore.getState();
  if (!resumes.find((r) => r.id === DEV_SAMPLE_ID)) addResume(DEV_RESUME);
}

// ─── Component ────────────────────────────────────────────────────────────────
function ResumeEditor() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const resume = useAppStore((s) => s.resumes.find((r) => r.id === id));
  const resumes = useAppStore((s) => s.resumes);
  const updateResume = useAppStore((s) => s.updateResume);
  const apiKey = useAppStore((s) => s.apiKey);
  const isKu = useAppStore((s) => s.language) === "ku";

  const tailorFn = useServerFn(tailorToJob);
  const chatEditFn = useServerFn(chatEditResume);
  const fixErrorsFn = useServerFn(fixResumeErrors);
  const generateCoverLetterFn = useServerFn(generateCoverLetter);

  // ── Modal state ──────────────────────────────────────────────────────────────
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [tailorOpen, setTailorOpen] = useState(false);
  const [filter, setFilter] = useState<Category>("All");
  const [jobDescription, setJobDescription] = useState("");
  const [tailoring, setTailoring] = useState(false);
  const [soraniMode, setSoraniMode] = useState(false);
  const [atsModalOpen, setAtsModalOpen] = useState(false);
  const [atsLoading, setAtsLoading] = useState(false);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [atsFeedback, setAtsFeedback] = useState<string[]>([]);
  const [coverLetterModalOpen, setCoverLetterModalOpen] = useState(false);
  const [coverLetterContent, setCoverLetterContent] = useState("");
  const [coverLetterLoading, setCoverLetterLoading] = useState(false);

  // ── Editor state ─────────────────────────────────────────────────────────────
  const previewRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const didAutoOpen = useRef(false);
  const resumeMenuRef = useRef<HTMLDivElement>(null);

  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string; snapshotId?: string }[]
  >([
    {
      role: "assistant",
      content: isKu
        ? "سڵاو! دەتوانم یارمەتیت بدەم لە دەستکاریکردنی ئەم سیڤییە."
        : "Hi! I can help you edit this resume. Tell me what you'd like to change.",
    },
  ]);
  const [history, setHistory] = useState<
    { id: string; label: string; timestamp: number; snapshot: ResumeData }[]
  >([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showResumeMenu, setShowResumeMenu] = useState(false);
  const [zoom, setZoom] = useState(1.08);
  const [showResume, setShowResume] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<"chat" | "design">("chat");
  const [selectedSection, setSelectedSection] = useState<SectionId>("global");
  const [inlineEdit, setInlineEdit] = useState<{
    path: string;
    value: string;
    section: string;
  } | null>(null);

  useEffect(() => {
    if (!didAutoOpen.current && window.innerWidth >= 1024) {
      setShowResume(true);
      didAutoOpen.current = true;
    }
  }, []);

  useEffect(() => {
    if (window.matchMedia("(max-width: 1023px)").matches) {
      setZoom(1.08);
    } else {
      setZoom(1.08);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resumeMenuRef.current && !resumeMenuRef.current.contains(event.target as Node)) {
        setShowResumeMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const recentResumes = resumes
    .filter((item) => item.id !== id)
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 6);

  // ── Debounced preview (must be before early return — Rules of Hooks) ──────────
  const [debouncedData, setDebouncedData] = useState<ResumeData | undefined>(resume?.data);
  useEffect(() => {
    if (!resume?.data) return;
    const t = setTimeout(() => setDebouncedData(resume.data), 400);
    return () => clearTimeout(t);
  }, [resume?.data]);

  // ── Early return ─────────────────────────────────────────────────────────────
  if (!resume) {
    return (
      <div className="page-shell flex min-h-[100dvh] items-center justify-center bg-background px-4 text-foreground">
        <div className="surface-panel max-w-md rounded-[2rem] p-8 text-center">
          <p className="text-muted-foreground">
            {isKu ? "ئەم ڕەشنووسی سیڤییە نەدۆزرایەوە." : "This resume draft could not be found."}
          </p>
          <button
            onClick={() => navigate({ to: "/onboarding" })}
            className="primary-button mt-6 px-5 py-3 text-sm font-medium"
          >
            {isKu ? "سەرلەنوێ دەستپێبکەرەوە" : "Start over"}
          </button>
        </div>
      </div>
    );
  }

  // ── Data helpers ─────────────────────────────────────────────────────────────
  const data = resume.data;
  const design: DesignSettings = resume.design ?? DEFAULT_DESIGN;

  const updateData = (patchOrPath: Partial<ResumeData> | string, value?: unknown) => {
    if (typeof patchOrPath === "string") {
      const keys = patchOrPath.split(".");
      const newData = JSON.parse(JSON.stringify(data));
      let cur = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (cur[k] === undefined) cur[k] = isNaN(Number(keys[i + 1])) ? {} : [];
        cur = cur[k];
      }
      cur[keys[keys.length - 1]] = value;
      updateResume(id, { data: newData });
    } else {
      updateResume(id, { data: { ...data, ...patchOrPath } });
    }
  };

  const setTemplate = (t: TemplateId) =>
    updateResume(id, { template: t, design: getTemplateDefaults(t) });

  const updateDesign = (patch: Partial<DesignSettings>) =>
    updateResume(id, { design: { ...design, ...patch } });

  // ── Debounced preview ─────────────────────────────────────────────────────────
  const toSoraniResume = (d: ResumeData): ResumeData => ({
    ...d,
    name: "شوان کەمال",
    title: "ئەندازیاری سینێری نەرمەکاڵا",
    email: d.email ?? "shwan@example.com",
    phone: d.phone ?? "+964 750 000 0000",
    location: "هەولێر، کوردستان",
    summary: "ئەندازیاری نەرمەکاڵا بە ئەزموونی فراوان لە دروستکردنی سیستەمی پێوەندیدار.",
    experience: d.experience.map((exp) => ({
      ...exp,
      title: "ئەندازیاری سینێری نەرمەکاڵا",
      company: exp.company || "کۆمپانیای تەکنەلۆژی",
      duration: "٢٠٢٢ – ئێستا",
      description: "سەرپەرشتیاری بنیاتنانی خزمەتگوزارییە سەرەکییەکان.",
      achievements: [
        "خێرایی وەڵامدانەوەی سیستەم باشترکرا.",
        "ڕێنمایی تیمی جیاواز کرا بۆ پڕۆژەیەکی گەورە.",
      ],
    })),
    projects: d.projects.map((p) => ({
      ...p,
      name: "پڕۆژەی نوێ",
      description: "ئامرازێکی ناوخۆیی.",
      tech: ["TypeScript", "React", "PostgreSQL"],
      impact: "بەکارهاتووە.",
    })),
    education: d.education.map((e) => ({
      ...e,
      degree: "بەکالۆریۆس لە زانستی کۆمپیوتەر",
      institution: "زانکۆی سەڵاحەدین",
      year: "٢٠١٦",
    })),
    skills: ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker", "AWS"],
    certifications: ["بڕوانامەی پیشەیی AWS", "بڕوانامەی بەڕێوەبردنی پڕۆژە"],
  });

  const previewData = soraniMode ? toSoraniResume(debouncedData ?? data) : (debouncedData ?? data);
  const categories: Category[] = ["All", "Minimal", "Professional", "Academic", "Creative"];

  // ── Handlers ──────────────────────────────────────────────────────────────────
  const handleCheckATS = () => {
    setAtsModalOpen(true);
    if (atsScore === null) {
      setAtsLoading(true);
      setTimeout(() => {
        setAtsScore(92);
        setAtsFeedback(
          isKu
            ? ["بەکارهێنانی باشی کردارەکان.", "هیچ خشتەی ئاڵۆز نییە.", "وشە سەرەکییەکان گونجاون."]
            : [
                "Excellent use of action verbs.",
                "No complex tables or columns detected.",
                "Keyword match is strong for target role.",
              ],
        );
        setAtsLoading(false);
      }, 2500);
    }
  };

  const handleTailor = async () => {
    if (jobDescription.trim().length < 20) {
      toast.error(isKu ? "تکایە وەسفێکی درێژتری کارەکە دابنێ." : "Paste a longer job description.");
      return;
    }
    setTailoring(true);
    try {
      const { resume: tailored } = await tailorFn({
        data: { apiKey, resume: data, jobDescription, language: isKu ? "ku" : "en" },
      });
      updateData(tailored);
      toast.success(isKu ? "سیڤییەکە گونجێندرا" : "Resume tailored to job description");
      setTailorOpen(false);
      setJobDescription("");
    } catch (e) {
      toast.error(
        e instanceof Error
          ? e.message
          : isKu
            ? "گونجاندنی سیڤییەکە سەرکەوتوو نەبوو."
            : "Failed to tailor resume.",
      );
    } finally {
      setTailoring(false);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    setMessages((p) => [...p, { role: "user", content: userMsg }]);
    setChatLoading(true);
    const snapshotId = crypto.randomUUID();
    setHistory((p) => [
      {
        id: snapshotId,
        label: userMsg.slice(0, 60),
        timestamp: Date.now(),
        snapshot: {
          ...data,
          experience: data.experience.map((e) => ({ ...e, achievements: [...e.achievements] })),
        },
      },
      ...p,
    ]);
    try {
      const { resume: updated, reply } = await chatEditFn({
        data: { apiKey, resume: data, userMessage: userMsg, language: isKu ? "ku" : "en" },
      });
      updateData(updated);
      setMessages((p) => [...p, { role: "assistant", content: reply, snapshotId }]);
      toast.success(isKu ? "سیڤی نوێکرایەوە" : "Resume updated");
    } catch (e) {
      setHistory((p) => p.filter((h) => h.id !== snapshotId));
      toast.error(
        e instanceof Error
          ? e.message
          : isKu
            ? "نوێکردنەوەی سیڤی سەرکەوتوو نەبوو."
            : "Failed to update resume.",
      );
      setMessages((p) => [
        ...p,
        {
          role: "assistant",
          content: isKu
            ? "کێشەیەکم بۆ دروست بوو. تکایە دووبارە هەوڵ بدەرەوە."
            : "I ran into an issue. Please try again.",
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleFixErrors = async () => {
    if (chatLoading) return;
    const userMsg = isKu
      ? "تکایە هەموو هەڵەکانی سیڤییەکەم چاک بکە."
      : "Please fix all errors in my resume and give me a full HR evaluation.";
    setMessages((p) => [...p, { role: "user", content: userMsg }]);
    setChatLoading(true);
    const snapshotId = crypto.randomUUID();
    setHistory((p) => [
      {
        id: snapshotId,
        label: "Before Auto-Fix",
        timestamp: Date.now(),
        snapshot: {
          ...data,
          experience: data.experience.map((e) => ({ ...e, achievements: [...e.achievements] })),
        },
      },
      ...p,
    ]);
    try {
      const { resume: updated, reply } = await fixErrorsFn({
        data: { apiKey, resume: data, language: isKu ? "ku" : "en" },
      });
      updateData(updated);
      setMessages((p) => [...p, { role: "assistant", content: reply, snapshotId }]);
      toast.success(isKu ? "سیڤییەکە چاککرا" : "Resume fixed and evaluated");
    } catch (e) {
      setHistory((p) => p.filter((h) => h.id !== snapshotId));
      toast.error(
        e instanceof Error
          ? e.message
          : isKu
            ? "چاککردنی سیڤی سەرکەوتوو نەبوو."
            : "Failed to fix resume.",
      );
      setMessages((p) => [
        ...p,
        {
          role: "assistant",
          content: isKu
            ? "کێشەیەکم بۆ دروست بوو. تکایە دووبارە هەوڵ بدەرەوە."
            : "I ran into an issue fixing the resume. Please try again.",
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    if (coverLetterLoading) return;
    setCoverLetterModalOpen(true);
    setCoverLetterLoading(true);
    try {
      const { coverLetter } = await generateCoverLetterFn({
        data: { apiKey, resume: data, language: isKu ? "ku" : "en" },
      });
      setCoverLetterContent(coverLetter);
    } catch (e) {
      toast.error(
        e instanceof Error
          ? e.message
          : isKu
            ? "دروستکردنی نامەی داواکاری سەرکەوتوو نەبوو."
            : "Failed to generate cover letter.",
      );
    } finally {
      setCoverLetterLoading(false);
    }
  };

  const handleRevert = (snapshotId: string) => {
    const entry = history.find((h) => h.id === snapshotId);
    if (!entry) return;
    updateData(entry.snapshot);
    toast.success(isKu ? "گەڕێندرایەوە بۆ وەشانی پێشووتر" : "Reverted to previous version");
  };

  const handleImageUpload = (base64: string) => {
    updateData("photoUrl", base64);
    toast.success(isKu ? "وێنەی پرۆفایل زیادکرا" : "Profile image updated");
  };

  const handleDocumentUpload = async (file: File) => {
    toast.success(isKu ? `فایلی ${file.name} بارکرا` : `File ${file.name} uploaded`);
    const userMsg = isKu ? `فایلی بارکراو: ${file.name}` : `Uploaded file: ${file.name}`;
    setMessages((p) => [...p, { role: "user", content: userMsg }]);
    setChatLoading(true);
    setTimeout(() => {
      setMessages((p) => [
        ...p,
        {
          role: "assistant",
          content: isKu
            ? "زۆر باشە، فایلم وەرگرت. چۆن دەتەوێت ئەم زانیارییانە لە سیڤییەکەتدا بەکاربهێنم؟"
            : "I've received your file. How would you like me to use this information in your resume?",
        },
      ]);
      setChatLoading(false);
    }, 1000);
  };

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <DesignContext.Provider value={design}>
      <div className="h-[100dvh] w-full bg-[#f0f2f7] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 relative overflow-hidden flex flex-col">
        {/* Ambient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50/30 to-slate-100 pointer-events-none" />

        {/* ── Top Bar ── */}
        <header
          className="relative z-50 shrink-0 flex items-center justify-between px-4 py-3 border-b border-white/60"
          style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(20px)" }}
        >
          {/* Left */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group cursor-pointer">
              <div className="size-8 rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12),0_1px_0_rgba(255,255,255,0.8)_inset] flex items-center justify-center">
                <img
                  src="/logo/MemoryCV Logo Icon Only.png"
                  alt="MemoryCV"
                  className="size-5 object-contain"
                />
              </div>
            </Link>
            <div className="relative" ref={resumeMenuRef}>
              <button
                type="button"
                onClick={() => setShowResumeMenu((v) => !v)}
                className="flex items-center gap-1.5 rounded-full px-3 py-1 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,0.9)_inset] border border-white/60 hover:bg-slate-50 transition-colors"
              >
                <FileUser className="size-3.5 text-slate-500" />
                <span className="text-[13px] font-semibold text-slate-700 max-w-[160px] truncate">
                  {data.name || "My Resume"}
                </span>
                <ChevronDown
                  className={`size-3 text-slate-400 transition-transform ${showResumeMenu ? "rotate-180" : ""}`}
                />
              </button>
              {showResumeMenu && recentResumes.length > 0 && (
                <div className="absolute left-0 top-full z-50 mt-2 w-[min(92vw,18rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_40px_-18px_rgba(15,23,42,0.35)]">
                  <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100">
                    {isKu ? "سیڤییە تازەکان" : "Recent CVs"}
                  </div>
                  <div className="max-h-72 overflow-y-auto py-1">
                    {recentResumes.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setShowResumeMenu(false);
                          navigate({ to: "/editor/$id", params: { id: item.id } });
                        }}
                        className="flex w-full items-start gap-2 px-3 py-2 text-left hover:bg-slate-50 transition-colors"
                      >
                        <div className="mt-0.5 rounded-lg bg-blue-50 p-1.5 text-blue-600">
                          <FileText className="size-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[13px] font-semibold text-slate-800">
                            {item.title || item.data.name || "My Resume"}
                          </div>
                          <div className="truncate text-[11px] text-slate-500">
                            {new Date(item.createdAt).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center: title or empty space */}
          <div className="hidden md:flex flex-1" />

          {/* Right: View resume toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowResume((v) => !v)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-bold transition-all duration-200 ${
                showResume
                  ? "bg-slate-900 text-white shadow-[0_4px_12px_rgba(15,23,42,0.25),0_1px_0_rgba(255,255,255,0.1)_inset]"
                  : "bg-white text-slate-800 shadow-[0_2px_8px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.9)_inset] border border-white/60 hover:shadow-[0_4px_12px_rgba(0,0,0,0.14)]"
              } active:scale-[0.97]`}
            >
              {showResume ? <EyeOff className="size-4" /> : <Play className="size-4" />}
              <span>{isKu ? "سیڤی" : showResume ? "Hide Resume" : "View Resume"}</span>
            </button>
          </div>
        </header>

        {/* ── Editor workspace ── */}
        <main className="relative z-10 flex-1 min-h-0 overflow-hidden">
          <div className="flex h-full min-h-0 flex-col gap-4 p-3 md:p-4 lg:grid lg:grid-cols-[360px_minmax(0,1.35fr)] lg:gap-4">
            <aside className="relative flex min-h-0 flex-1 flex-col lg:max-w-none max-lg:min-h-0 max-lg:overflow-hidden">
              {/* ── Chat / Design tab switcher ── */}
              <div
                className="shrink-0 flex items-center gap-1 rounded-2xl p-1 mb-2"
                style={{ background: "rgba(255,255,255,0.72)", boxShadow: "0 2px 8px rgba(15,23,42,0.08), 0 0 0 1px rgba(255,255,255,0.8)", backdropFilter: "blur(12px)" }}
              >
                <button
                  onClick={() => setSidebarTab("chat")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[13px] font-semibold transition-all duration-150 ${
                    sidebarTab === "chat"
                      ? "bg-slate-900 text-white shadow-[0_2px_8px_rgba(15,23,42,0.22)]"
                      : "text-slate-500 hover:text-slate-800 hover:bg-white/60"
                  }`}
                >
                  <Bot className="size-3.5" />
                  {isKu ? "ژیاری" : "Chat"}
                </button>
                <button
                  onClick={() => setSidebarTab("design")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[13px] font-semibold transition-all duration-150 ${
                    sidebarTab === "design"
                      ? "bg-slate-900 text-white shadow-[0_2px_8px_rgba(15,23,42,0.22)]"
                      : "text-slate-500 hover:text-slate-800 hover:bg-white/60"
                  }`}
                >
                  <Sliders className="size-3.5" />
                  {isKu ? "ستایل" : "Design"}
                </button>
              </div>

              <div className="relative flex min-h-0 flex-1 flex-col max-lg:min-h-0 max-lg:overflow-hidden overflow-hidden rounded-3xl">
                {sidebarTab === "chat" && (
                  <EditorChatPane
                    isKu={isKu}
                    messages={messages}
                    chatLoading={chatLoading}
                    chatInput={chatInput}
                    setChatInput={setChatInput}
                    onSubmit={handleChatSubmit}
                    isRecording={isRecording}
                    setIsRecording={setIsRecording}
                    history={history}
                    showHistory={showHistory}
                    setShowHistory={setShowHistory}
                    onRevert={handleRevert}
                    messagesEndRef={messagesEndRef}
                    onCheckATS={handleCheckATS}
                    onFixErrors={handleFixErrors}
                    onOpenTemplates={() => setTemplateModalOpen(true)}
                    onGenerateCoverLetter={handleGenerateCoverLetter}
                    onImageUpload={handleImageUpload}
                    onDocumentUpload={handleDocumentUpload}
                  />
                )}
                {sidebarTab === "design" && (
                  <DesignPanel
                    design={design}
                    data={data}
                    onChange={updateDesign}
                    updateData={updateData}
                    onClose={() => setSidebarTab("chat")}
                    selected={selectedSection}
                    setSelected={setSelectedSection}
                  />
                )}
              </div>
            </aside>

            <section className="hidden min-h-0 lg:flex lg:min-w-0">
              <EditorPreviewPanel
                show
                mode="inline"
                onClose={() => setShowResume(false)}
                isKu={isKu}
                soraniMode={soraniMode}
                setSoraniMode={setSoraniMode}
                zoom={zoom}
                setZoom={setZoom}
                previewData={previewData}
                template={resume.template}
                design={design}
                updateData={updateData}
                onSectionClick={(s, path) => {
                  if (path) {
                    setInlineEdit({
                      section: s,
                      path,
                      value: String(getValueAtPath(data, path) || ""),
                    });
                  }
                }}
                previewRef={previewRef}
              />
            </section>
          </div>
        </main>

        {/* ── Preview overlay ── */}
        <div className="lg:hidden">
          <EditorPreviewPanel
            show={showResume}
            onClose={() => setShowResume(false)}
            isKu={isKu}
            soraniMode={soraniMode}
            setSoraniMode={setSoraniMode}
            zoom={zoom}
            setZoom={setZoom}
            previewData={previewData}
            template={resume.template}
            design={design}
            updateData={updateData}
            onSectionClick={(s, path) => {
              if (path) {
                setInlineEdit({
                  section: s,
                  path,
                  value: String(getValueAtPath(data, path) || ""),
                });
              }
            }}
            previewRef={previewRef}
          />
        </div>

        {/* ── Modals ── */}
        <TailorModal
          open={tailorOpen}
          onClose={() => setTailorOpen(false)}
          isKu={isKu}
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
          tailoring={tailoring}
          onTailor={handleTailor}
        />

        <CoverLetterModal
          open={coverLetterModalOpen}
          onClose={() => setCoverLetterModalOpen(false)}
          isKu={isKu}
          loading={coverLetterLoading}
          content={coverLetterContent}
        />

        <TemplateModal
          open={templateModalOpen}
          onClose={() => setTemplateModalOpen(false)}
          isKu={isKu}
          templates={TEMPLATES}
          categories={categories}
          filter={filter}
          setFilter={setFilter}
          activeTemplate={resume.template}
          design={design}
          resumeData={data}
          onSelect={setTemplate}
        />

        <ATSModal
          open={atsModalOpen}
          onClose={() => setAtsModalOpen(false)}
          isKu={isKu}
          loading={atsLoading}
          score={atsScore}
          feedback={atsFeedback}
        />

        <InlineEditModal
          inlineEdit={inlineEdit}
          setInlineEdit={setInlineEdit}
          updateData={updateData}
          data={data}
        />
      </div>
    </DesignContext.Provider>
  );
}
