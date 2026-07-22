import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { lazy, Suspense, useState, useRef, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { AnimatePresence } from "framer-motion";
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
  Moon,
  Sun,
  Undo2,
  Redo2,
} from "lucide-react";


import {
  improveBullet,
  tailorToJob,
  chatEditResume,
  fixResumeErrors,
  generateCoverLetter,
} from "@/lib/ai.functions";
import { useAppStore, selectCanUndo, selectCanRedo } from "@/lib/store";
import { getAiErrorMessage } from "@/lib/ai-errors";
import { useMobileOptimized } from "@/lib/performance";
import type { ExperienceItem, ResumeData, TemplateId, DesignSettings, FieldStyleOverride } from "@/lib/types";
import { DesignContext } from "@/components/resume/DesignContext";
import { DEFAULT_DESIGN, getTemplateDefaults, DesignPanel } from "@/components/DesignPanel";
import type { SectionId } from "@/components/DesignPanel";
import { getValueAtPath } from "@/components/resume/editor-helpers";
import { useDarkMode } from "@/hooks/use-dark-mode";


// Sub-components
import { EditorChatPane } from "@/components/editor/EditorChatPane";
import {
  TailorModal,
  CoverLetterModal,
  TemplateModal,
  ATSModal,
  InlineEditModal,
} from "@/components/editor/EditorModals";
import { TextToolbar } from "@/components/editor/TextToolbar";

// Constants
import {
  DEV_SAMPLE_ID,
  DEV_RESUME,
  TEMPLATES,
  type Category,
} from "@/components/editor/editor.constants";

const EditorPreviewPanel = lazy(() =>
  import("@/components/editor/EditorPreviewPanel").then((module) => ({
    default: module.EditorPreviewPanel,
  })),
);

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
  // updateResume kept out — all writes go through history-aware editResume
  const editResume = useAppStore((s) => s.editResume);
  const undoResume = useAppStore((s) => s.undoResume);
  const redoResume = useAppStore((s) => s.redoResume);
  const canUndo = useAppStore(selectCanUndo(id));
  const canRedo = useAppStore(selectCanRedo(id));
  const apiKey = useAppStore((s) => s.apiKey);
  const isKu = useAppStore((s) => s.language) === "ku";
  const mobileOptimized = useMobileOptimized();
  const { isDark, toggle: toggleDark } = useDarkMode();



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
  const [previewLayoutRtl, setPreviewLayoutRtl] = useState(() => useAppStore.getState().language === "ku");
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
  const [textToolbar, setTextToolbar] = useState<{
    path: string;
    value: string;
    section: string;
    position: { x: number; y: number };
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

  // ── Undo / Redo keyboard shortcuts ───────────────────────────────────────────
  useEffect(() => {
    const isEditableTarget = (el: EventTarget | null) => {
      const node = el as HTMLElement | null;
      if (!node) return false;
      const tag = node.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        node.isContentEditable === true
      );
    };
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;
      const key = e.key.toLowerCase();
      // Let native undo win inside inputs/contentEditable so keystroke-level
      // undo still works while typing; our history takes over between fields.
      if (key === "z" && !e.shiftKey) {
        if (isEditableTarget(e.target)) return;
        e.preventDefault();
        if (undoResume(id)) toast.message(isKu ? "گەڕایەوە" : "Undone");
      } else if ((key === "z" && e.shiftKey) || key === "y") {
        if (isEditableTarget(e.target)) return;
        e.preventDefault();
        if (redoResume(id)) toast.message(isKu ? "دووبارە کرا" : "Redone");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [id, isKu, redoResume, undoResume]);


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

  // Preview reads live store data — design changes (skill levels, nudges, colors)
  // must reflect instantly. Editable is uncontrolled so re-renders don't disrupt typing.

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
      // Inline typing: coalesce consecutive keystrokes into one history entry.
      editResume(id, { data: newData }, { coalesce: true });
    } else {
      // Bulk data swap (AI tailor, chat edit, revert): each is its own step.
      editResume(id, { data: { ...data, ...patchOrPath } }, { coalesce: false });
    }
  };

  const setTemplate = (t: TemplateId) =>
    editResume(id, { template: t, design: getTemplateDefaults(t) }, { coalesce: false });

  const updateDesign = (patch: Partial<DesignSettings>) =>
    editResume(id, { design: { ...design, ...patch } }, { coalesce: true });


  const updateFieldOverride = (fieldPath: string, fieldOverride: FieldStyleOverride) => {
    const existingOverrides = design.fieldOverrides ?? {};
    // Remove override if it's empty
    const clean = Object.fromEntries(
      Object.entries(fieldOverride).filter(([, v]) => v !== undefined),
    );
    const newOverrides = { ...existingOverrides };
    if (Object.keys(clean).length === 0) {
      delete newOverrides[fieldPath];
    } else {
      newOverrides[fieldPath] = clean;
    }
    updateDesign({ fieldOverrides: newOverrides });
  };

  // Alt+drag nudge from the preview surface — patch only nudge fields, keep other overrides.
  useEffect(() => {
    const handler = (ev: Event) => {
      const detail = (ev as CustomEvent<{ path: string; nudgeX: number; nudgeY: number }>).detail;
      if (!detail?.path) return;
      const existing = design.fieldOverrides?.[detail.path] ?? {};
      updateFieldOverride(detail.path, { ...existing, nudgeX: detail.nudgeX, nudgeY: detail.nudgeY });
    };
    window.addEventListener("ds-nudge", handler);
    return () => window.removeEventListener("ds-nudge", handler);
  }, [design.fieldOverrides]);

  const previewData = data;
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
      toast.error(getAiErrorMessage(e, isKu, isKu ? "گونجاندنی سیڤییەکە سەرکەوتوو نەبوو." : "Failed to tailor resume."));
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
      toast.error(getAiErrorMessage(e, isKu, isKu ? "نوێکردنەوەی سیڤی سەرکەوتوو نەبوو." : "Failed to update resume."));
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
      toast.error(getAiErrorMessage(e, isKu, isKu ? "چاککردنی سیڤی سەرکەوتوو نەبوو." : "Failed to fix resume."));
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
      toast.error(getAiErrorMessage(e, isKu, isKu ? "دروستکردنی نامەی داواکاری سەرکەوتوو نەبوو." : "Failed to generate cover letter."));
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
      <div className="app-shell h-[100dvh] w-full bg-[#fafafa] text-slate-900 font-sans selection:bg-slate-900 selection:text-white relative overflow-hidden flex flex-col">
        {/* ── Top Bar — flat editorial ── */}
        <header className="relative z-50 shrink-0 flex items-center justify-between h-12 px-3 sm:px-4 border-b border-slate-200 bg-white">
          {/* Left cluster */}
          <div className="flex items-center gap-2 min-w-0">
            <Link to="/" className="flex items-center justify-center size-7 rounded-md hover:bg-slate-100 transition-colors shrink-0" aria-label="Home">
              <img src="/logo/MemoryCV Logo Icon Only.png" alt="MemoryCV" className="size-4 object-contain" />
            </Link>
            <div className="h-4 w-px bg-slate-200 shrink-0" />
            <div className="relative min-w-0" ref={resumeMenuRef}>
              <button
                type="button"
                onClick={() => setShowResumeMenu((v) => !v)}
                className="flex items-center gap-1.5 h-7 px-2 rounded-md hover:bg-slate-100 transition-colors max-w-full"
              >
                <FileUser className="size-3.5 text-slate-500 shrink-0" />
                <span className="text-[13px] font-medium text-slate-800 max-w-[140px] sm:max-w-[220px] truncate">
                  {data.name || (isKu ? "سیڤی من" : "My Resume")}
                </span>
                <ChevronDown
                  className={`size-3 text-slate-400 transition-transform shrink-0 ${showResumeMenu ? "rotate-180" : ""}`}
                />
              </button>
              {showResumeMenu && recentResumes.length > 0 && (
                <div className="absolute left-0 top-full z-50 mt-1.5 w-[min(92vw,20rem)] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
                  <div className="px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 border-b border-slate-100">
                    {isKu ? "سیڤییە تازەکان" : "Recent"}
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
                        className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-slate-50 transition-colors"
                      >
                        <FileText className="size-3.5 text-slate-400 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[13px] font-medium text-slate-800">
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

          {/* Right cluster */}
          <div className="flex items-center gap-1">
            <div className="hidden sm:flex items-center h-7 rounded-md border border-slate-200 bg-slate-50 p-0.5">
              <button
                type="button"
                onClick={() => { if (undoResume(id)) toast.message(isKu ? "گەڕایەوە" : "Undone"); }}
                disabled={!canUndo}
                aria-label={isKu ? "پاشگەز" : "Undo"}
                title={`${isKu ? "پاشگەز" : "Undo"} (⌘Z)`}
                className="flex items-center justify-center size-6 rounded-[5px] text-slate-600 hover:text-slate-900 hover:bg-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                <Undo2 className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => { if (redoResume(id)) toast.message(isKu ? "دووبارە" : "Redone"); }}
                disabled={!canRedo}
                aria-label={isKu ? "دووبارە" : "Redo"}
                title={`${isKu ? "دووبارە" : "Redo"} (⌘⇧Z)`}
                className="flex items-center justify-center size-6 rounded-[5px] text-slate-600 hover:text-slate-900 hover:bg-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                <Redo2 className="size-3.5" />
              </button>
            </div>

            <button
              onClick={toggleDark}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? (isKu ? "دۆخی ڕووناک" : "Light") : (isKu ? "دۆخی تاریک" : "Dark")}
              className="flex items-center justify-center size-7 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              {isDark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
            </button>

            <div className="w-px h-5 bg-slate-200 mx-0.5" />

            <button
              onClick={() => setShowResume((v) => !v)}
              className={`flex items-center gap-1.5 h-7 px-3 rounded-md text-[12px] font-medium transition-colors ${
                showResume
                  ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              {showResume ? <EyeOff className="size-3.5" /> : <Play className="size-3.5" />}
              <span className="hidden sm:inline">{showResume ? (isKu ? "شاردنەوە" : "Hide") : (isKu ? "پێشبینین" : "Preview")}</span>
            </button>
          </div>
        </header>

        {/* ── Editor workspace ── */}
        <main className="relative z-10 flex-1 min-h-0 overflow-hidden">
          <div className="flex h-full min-h-0 flex-col gap-3 p-3 lg:grid lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-3">
            <aside className="relative flex min-h-0 flex-1 flex-col lg:max-w-none max-lg:min-h-0 max-lg:overflow-hidden">
              <div className="shrink-0 flex items-center h-9 rounded-lg border border-slate-200 bg-slate-50 p-0.5 mb-2">
                <button
                  onClick={() => setSidebarTab("chat")}
                  className={`flex-1 flex items-center justify-center gap-1.5 h-8 rounded-[7px] text-[12.5px] font-medium transition-colors ${
                    sidebarTab === "chat"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Bot className="size-3.5" />
                  {isKu ? "ژیریی دەستکرد" : "Chat"}
                </button>
                <button
                  onClick={() => setSidebarTab("design")}
                  className={`flex-1 flex items-center justify-center gap-1.5 h-8 rounded-[7px] text-[12.5px] font-medium transition-colors ${
                    sidebarTab === "design"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Sliders className="size-3.5" />
                  {isKu ? "دیزاین" : "Design"}
                </button>
              </div>

              <div className="relative flex min-h-0 flex-1 flex-col max-lg:min-h-0 max-lg:overflow-hidden overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
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

            {!mobileOptimized && (
              <section className="hidden min-h-0 lg:flex lg:min-w-0">
                <Suspense
                  fallback={
                    <div className="flex h-full w-full items-center justify-center rounded-xl bg-white ring-1 ring-slate-200 text-sm text-slate-500">
                      {isKu ? "پێشبینین ئامادە دەکرێت..." : "Loading preview..."}
                    </div>
                  }
                >
                  <EditorPreviewPanel
                    show
                    mode="inline"
                    onClose={() => setShowResume(false)}
                    isKu={isKu}
                    previewLayoutRtl={previewLayoutRtl}
                    setPreviewLayoutRtl={setPreviewLayoutRtl}
                    zoom={zoom}
                    setZoom={setZoom}
                    previewData={previewData}
                    template={resume.template}
                    design={design}
                    updateData={updateData}
                    onSectionClick={(s, path, e) => {
                      setSelectedSection(s as SectionId);
                      if (!path) return;
                      if (sidebarTab === "design" && e) {
                        setTextToolbar({
                          section: s,
                          path,
                          value: String(getValueAtPath(data, path) || ""),
                          position: { x: e.clientX, y: e.clientY },
                        });
                      }
                    }}
                    previewRef={previewRef}
                    isDesignMode={sidebarTab === "design"}
                  />
                </Suspense>
              </section>
            )}
          </div>
        </main>


        {/* ── Preview overlay ── */}
        {showResume && mobileOptimized && (
          <div className="lg:hidden">
            <Suspense
              fallback={
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-50 text-sm font-semibold text-slate-500">
                  {isKu ? "پێشبینین ئامادە دەکرێت..." : "Loading preview..."}
                </div>
              }
            >
              <EditorPreviewPanel
                show={showResume}
                onClose={() => setShowResume(false)}
                isKu={isKu}
                previewLayoutRtl={previewLayoutRtl}
                setPreviewLayoutRtl={setPreviewLayoutRtl}
                zoom={zoom}
                setZoom={setZoom}
                previewData={previewData}
                template={resume.template}
                design={design}
                updateData={updateData}
                onSectionClick={(s, path, e) => {
                  setSelectedSection(s as SectionId);
                  if (!path) return;
                  if (sidebarTab === "design" && e) {
                    setTextToolbar({
                      section: s,
                      path,
                      value: String(getValueAtPath(data, path) || ""),
                      position: { x: e.clientX, y: e.clientY },
                    });
                  }
                }}
                previewRef={previewRef}
                isDesignMode={sidebarTab === "design"}
              />
            </Suspense>
          </div>
        )}

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

        {/* ── Text Toolbar (contextual popover on Design tab) ── */}
        <AnimatePresence>
          {textToolbar && (
            <TextToolbar
              path={textToolbar.path}
              value={textToolbar.value}
              override={design.fieldOverrides?.[textToolbar.path] ?? {}}
              position={textToolbar.position}
              onUpdateOverride={updateFieldOverride}
              onEdit={() => {
                setInlineEdit({
                  section: textToolbar.section,
                  path: textToolbar.path,
                  value: textToolbar.value,
                });
                setTextToolbar(null);
              }}
              onClose={() => setTextToolbar(null)}
              defaults={{
                fontSize: design.baseFontSize,
                fontFamily: design.fontFamily,
                color: design.textColor,
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </DesignContext.Provider>
  );
}
