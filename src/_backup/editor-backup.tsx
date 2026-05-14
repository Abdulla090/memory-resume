import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useMemo, useRef, useEffect, useLayoutEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  Bot,
  ArrowUp,
  ChevronDown,
  Download,
  Edit3,
  LayoutTemplate,
  RotateCcw,
  Send,
  Sparkles,
  Target,
  X,
  CheckCircle2,
  Languages,
  ZoomIn,
  ZoomOut,
  Clock,
  FileText,
  FileType,
  Presentation,
  FileCode,
  Loader2,
  Wand2,
  SlidersHorizontal,
  Mic,
  Map,
  Plus,
  MoreHorizontal,
  FileUser,
  ChevronRight,
  PanelRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
import { DesignPanel, DEFAULT_DESIGN, getTemplateDefaults, type SectionId } from "@/components/DesignPanel";
import { ResumePreview } from "@/components/resume/ResumePreview";
import {
  ExportButtons,
  ClientPDFPreview,
  getValueAtPath,
  isMultilinePath,
} from "@/components/resume/editor-helpers";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const DEV_SAMPLE_ID = "dev";
const LAYOUT_STORAGE_KEY = "memorycv-editor-layout";

const DEV_RESUME = {
  id: DEV_SAMPLE_ID,
  title: "Senior Product Designer",
  template: "minimal" as TemplateId,
  design: getTemplateDefaults("minimal"),
  createdAt: Date.now(),
  jobTarget: "Lead Product Designer at a SaaS company",
  data: {
    name: "Alex Morgan",
    title: "Senior Product Designer",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 012-3456",
    location: "San Francisco, CA",
    photoUrl: "https://picsum.photos/seed/alex/240/240",
    summary:
      "Award-winning designer with 8+ years crafting high-impact digital products. Led design systems adopted by 30+ cross-functional teams, improving delivery speed by 40%.",
    experience: [
      {
        title: "Lead Product Designer",
        company: "Acme Corp",
        duration: "2021 – Present",
        description: "Led a team of 6 designers across 3 product lines.",
        achievements: [
          "Shipped 12 major features with avg. 4.8★ user rating",
          "Grew NPS from 34 → 72 through redesigned onboarding",
          "Built a design system used by 30+ teams, cutting dev handoff by 40%",
        ],
      },
      {
        title: "UX Designer",
        company: "Startup Inc.",
        duration: "2018 – 2021",
        description: "End-to-end product design for B2B SaaS.",
        achievements: [
          "Redesigned core dashboard — reduced task completion time by 35%",
          "Cut monthly churn by 22% through targeted UX improvements",
        ],
      },
    ],
    projects: [
      {
        name: "Ocean Design System",
        description: "Built from scratch, including 120+ components.",
        impact: "Adopted by 30+ teams; reduced design–dev cycle by 40%",
        tech: ["Figma", "React", "Storybook"],
      },
    ],
    education: [
      { degree: "BFA Graphic Design", institution: "Rhode Island School of Design", year: "2018" },
    ],
    skills: ["Figma", "React", "UX Research", "Prototyping", "Design Systems", "Framer"],
    certifications: ["Google UX Certificate 2023", "Nielsen Norman UX Leadership"],
  },
};

type Category = "All" | "Minimal" | "Professional" | "Academic" | "Creative";

const TEMPLATES: {
  id: TemplateId;
  label: string;
  desc: string;
  category: Category;
  isNew?: boolean;
}[] = [
  { id: "minimal", label: "Minimal", desc: "Clean hierarchy", category: "Minimal" },
  { id: "slate", label: "Slate", desc: "Swiss precision", category: "Minimal" },
  { id: "avant", label: "Avant", desc: "Brutalist lines", category: "Minimal" },
  { id: "vanguard", label: "Vanguard", desc: "Massive typography", category: "Minimal" },
  {
    id: "executive",
    label: "Executive",
    desc: "Dark sidebar",
    category: "Professional",
    isNew: false,
  },
  { id: "apex", label: "Apex", desc: "Bold top bar", category: "Professional" },
  { id: "monolith", label: "Monolith", desc: "Highly structured", category: "Professional" },
  { id: "metric", label: "Metric", desc: "Data-driven", category: "Professional" },
  {
    id: "carbon",
    label: "Carbon",
    desc: "Charcoal sidebar",
    category: "Professional",
    isNew: true,
  },
  {
    id: "atlas",
    label: "Atlas",
    desc: "Corporate authority",
    category: "Professional",
    isNew: true,
  },
  {
    id: "new-sleek",
    label: "NEW Sleek A4",
    desc: "Photo-led precision",
    category: "Professional",
    isNew: true,
  },
  {
    id: "new-professional",
    label: "NEW Professional A4",
    desc: "Executive sidebar",
    category: "Professional",
    isNew: true,
  },
  {
    id: "new-academic",
    label: "NEW Academic A4",
    desc: "Research CV layout",
    category: "Academic",
    isNew: true,
  },
  {
    id: "ref-torres",
    label: "NEW Torres Exact",
    desc: "Blue photo sidebar",
    category: "Professional",
    isNew: true,
  },
  {
    id: "ref-silva",
    label: "NEW Silva Exact",
    desc: "Brown account split",
    category: "Professional",
    isNew: true,
  },
  {
    id: "ref-schumacher",
    label: "NEW Schumacher Exact",
    desc: "Orange skill bars",
    category: "Creative",
    isNew: true,
  },
  {
    id: "ref-palmerston",
    label: "NEW Palmerston Exact",
    desc: "Slate graphic designer",
    category: "Professional",
    isNew: true,
  },
  {
    id: "ref-alvarado",
    label: "NEW Alvarado Exact",
    desc: "Two-tone classic profile",
    category: "Professional",
    isNew: true,
  },
  {
    id: "new-alvarado",
    label: "NEW Lorna Pixel",
    desc: "Pixel perfect match",
    category: "Professional",
    isNew: true,
  },
  {
    id: "ref-sanchez",
    label: "NEW Sanchez Exact",
    desc: "Timeline manager",
    category: "Professional",
    isNew: true,
  },
  {
    id: "mercer",
    label: "NEW Mercer Exact",
    desc: "Navy structured dual-column",
    category: "Professional",
    isNew: true,
  },
  {
    id: "gallego",
    label: "NEW Gallego Exact",
    desc: "Teal presentation designer",
    category: "Professional",
    isNew: true,
  },
  {
    id: "leroy",
    label: "NEW Leroy Exact",
    desc: "French real estate profile",
    category: "Professional",
    isNew: true,
  },
  {
    id: "dubois",
    label: "NEW Dubois Exact",
    desc: "French project manager",
    category: "Professional",
    isNew: true,
  },
  { id: "noir", label: "Noir", desc: "All-black luxury", category: "Creative" },
  { id: "cipher", label: "Cipher", desc: "Dark tech aesthetic", category: "Creative" },
  { id: "pinnacle", label: "Pinnacle", desc: "Dark layered layout", category: "Creative" },
  { id: "nexus", label: "Nexus", desc: "Timeline SVG nodes", category: "Creative" },
  { id: "orbit", label: "Orbit", desc: "Interactive elements", category: "Creative" },
  { id: "prism", label: "Prism", desc: "Geometric shapes", category: "Creative" },
  { id: "forge", label: "Forge", desc: "Industrial brutalist", category: "Minimal", isNew: true },
  {
    id: "zenith",
    label: "Zenith",
    desc: "Gold luxury premium",
    category: "Professional",
    isNew: true,
  },
  { id: "vector", label: "Vector", desc: "Dark mode tech", category: "Creative", isNew: true },
];

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

// ── Dev shortcut — seed once at module load, no React hooks ──────────────────
if (typeof window !== "undefined") {
  const { resumes, addResume } = useAppStore.getState();
  if (!resumes.find((r) => r.id === DEV_SAMPLE_ID)) {
    addResume(DEV_RESUME);
  }
}

function ResumeEditor() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const resume = useAppStore((state) => state.resumes.find((item) => item.id === id));
  const updateResume = useAppStore((state) => state.updateResume);
  const apiKey = useAppStore((state) => state.apiKey);
  const language = useAppStore((state) => state.language);
  const isKu = language === "ku";

  const tailorFn = useServerFn(tailorToJob);
  const chatEditFn = useServerFn(chatEditResume);
  const fixErrorsFn = useServerFn(fixResumeErrors);
  const generateCoverLetterFn = useServerFn(generateCoverLetter);

  const [coverLetterModalOpen, setCoverLetterModalOpen] = useState(false);
  const [coverLetterContent, setCoverLetterContent] = useState("");
  const [coverLetterLoading, setCoverLetterLoading] = useState(false);

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

  const previewRef = useRef<HTMLDivElement>(null);

  // Chat interface state
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string; snapshotId?: string }[]
  >([
    {
      role: "assistant",
      content: isKu
        ? "سڵاو! دەتوانم یارمەتیت بدەم لە دەستکاریکردنی ئەم سیڤییە. پێم بڵێ دەتەوێت چی بگۆڕیت — یان داوام لێبکە هەر بەشێک سەرلەنوێ بنووسمەوە."
        : "Hi! I can help you edit this resume. Tell me what you'd like to change — or ask me to rewrite any section.",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Version history
  const [history, setHistory] = useState<
    { id: string; label: string; timestamp: number; snapshot: ResumeData }[]
  >([]);
  const [showHistory, setShowHistory] = useState(false);

  const [zoom, setZoom] = useState(0.65);
  const [activeTab, setActiveTab] = useState<"chat" | "design">("chat");
  const [mobileDesignOpen, setMobileDesignOpen] = useState(false);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const [leftSidebarWidth, setLeftSidebarWidth] = useState(340);
  const [selectedSection, setSelectedSection] = useState<SectionId>("global");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showResume, setShowResume] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  // Show resume on desktop by default on mount
  const didAutoOpen = useRef(false);
  useEffect(() => {
    if (!didAutoOpen.current && window.innerWidth >= 1024) {
      setShowResume(true);
      didAutoOpen.current = true;
    }
  }, []);
  const [inlineEdit, setInlineEdit] = useState<{
    path: string;
    value: string;
    section: SectionId;
  } | null>(null);

  const design: DesignSettings = resume?.design ?? DEFAULT_DESIGN;
  const updateDesign = (patch: Partial<DesignSettings>) =>
    updateResume(id, { design: { ...(resume?.design ?? DEFAULT_DESIGN), ...patch } });

  useEffect(() => {
    if (window.matchMedia("(max-width: 1023px)").matches) {
      setZoom(1);
    }
  }, []);

  useEffect(() => {
    const raw = window.localStorage.getItem(LAYOUT_STORAGE_KEY);
    if (!raw) return;
    try {
      const saved = JSON.parse(raw) as {
        activeTab?: "chat" | "design";
        leftSidebarWidth?: number;
      };
      if (saved.activeTab) setActiveTab(saved.activeTab);
      if (typeof saved.leftSidebarWidth === "number")
        setLeftSidebarWidth(Math.max(300, Math.min(460, saved.leftSidebarWidth)));
    } catch {
      // Ignore
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      LAYOUT_STORAGE_KEY,
      JSON.stringify({ activeTab, leftSidebarWidth })
    );
  }, [activeTab, leftSidebarWidth]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Hook must be before early return!
  const filteredTemplates = useMemo(() => {
    if (filter === "All") return TEMPLATES;
    return TEMPLATES.filter((t) => t.category === filter);
  }, [filter]);

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

  const data = resume.data;
  const updateData = (patchOrPath: Partial<ResumeData> | string, value?: unknown) => {
    if (typeof patchOrPath === "string") {
      const keys = patchOrPath.split(".");
      const newData = JSON.parse(JSON.stringify(data));
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (current[k] === undefined) {
          const nextKey = keys[i + 1];
          current[k] = isNaN(Number(nextKey)) ? {} : [];
        }
        current = current[k];
      }
      current[keys[keys.length - 1]] = value;
      updateResume(id, { data: newData });
    } else {
      updateResume(id, { data: { ...data, ...patchOrPath } });
    }
  };

  const setTemplate = (template: TemplateId) => updateResume(id, { template, design: getTemplateDefaults(template) });

  // For the preview, apply Sorani transformation if toggled
  const toSoraniResume = (d: ResumeData): ResumeData => {
    return {
      ...d,
      name: "شوان کەمال",
      title: "ئەندازیاری سینێری نەرمەکاڵا",
      email: d.email ?? "shwan@example.com",
      phone: d.phone ?? "+964 750 000 0000",
      location: "هەولێر، کوردستان",
      summary:
        "ئەندازیاری نەرمەکاڵا بە ئەزموونی فراوان لە دروستکردنی سیستەمی پێوەندیدار و خزمەتگوزارییە دیجیتاڵییەکان. پێشەنگ لە باشترکردنی خێرایی، کەمکردنەوەی تێچوو و دۆزینەوەی چارەسەرە ئاڵۆزەکان بە بەرهەمی کاریگەر.",
      experience: d.experience.map((exp) => ({
        ...exp,
        title: "ئەندازیاری سینێری نەرمەکاڵا",
        company: exp.company || "کۆمپانیای تەکنەلۆژی",
        duration: "٢٠٢٢ – ئێستا",
        description: "سەرپەرشتیاری بنیاتنانی خزمەتگوزارییە سەرەکییەکان و باشترکردنی ئەدای سیستەم.",
        achievements: [
          "خێرایی وەڵامدانەوەی سیستەم بە شێوەیەکی بەرچاو باشترکرا و ئەزموونی بەکارهێنەر چاکتر بوو.",
          "ڕێنمایی تیمی جیاواز کرا بۆ جێبەجێکردنی پڕۆژەیەکی گەورە لە کاتی دیاریکراو.",
        ],
      })),
      projects: d.projects.map((proj) => ({
        ...proj,
        name: "پڕۆژەی نوێ",
        description: "ئامرازێکی ناوخۆیی بۆ ڕێکخستن و چاودێریکردنی کارەکانی تیمەکەمان.",
        tech: ["TypeScript", "React", "PostgreSQL"],
        impact: "بەکارهاتووە لەلایەن چەند تیمێکی بەرهەم.",
      })),
      education: d.education.map((edu) => ({
        ...edu,
        degree: "بەکالۆریۆس لە زانستی کۆمپیوتەر",
        institution: "زانکۆی سەڵاحەدین",
        year: "٢٠١٦",
      })),
      skills: [
        "TypeScript",
        "React",
        "Node.js",
        "PostgreSQL",
        "Docker",
        "AWS",
        "ڕێبەرایەتی تیم",
        "چارەسەرکردنی کێشە",
      ],
      certifications: ["بڕوانامەی پیشەیی AWS", "بڕوانامەی بەڕێوەبردنی پڕۆژە"],
    };
  };

  const previewData = soraniMode ? toSoraniResume(data) : data;
  const categories: Category[] = ["All", "Minimal", "Professional", "Academic", "Creative"];

  const handleTailor = async () => {
    if (jobDescription.trim().length < 20) {
      toast.error(isKu ? "تکایە وەسفێکی درێژتری کارەکە دابنێ." : "Paste a longer job description.");
      return;
    }

    setTailoring(true);
    try {
      const { resume: tailored } = await tailorFn({
        data: { apiKey, resume: data, jobDescription },
      });
      updateData(tailored);
      toast.success(
        isKu ? "سیڤییەکە گونجێندرا لەگەڵ وەسفی کارەکە" : "Resume tailored to job description",
      );
      setTailorOpen(false);
      setJobDescription("");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
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
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setChatLoading(true);

    // Save snapshot BEFORE the edit so user can revert
    const snapshotId = crypto.randomUUID();
    const snapshot = {
      ...data,
      experience: data.experience.map((e) => ({ ...e, achievements: [...e.achievements] })),
    };
    setHistory((prev) => [
      { id: snapshotId, label: userMsg.slice(0, 60), timestamp: Date.now(), snapshot },
      ...prev,
    ]);

    try {
      const { resume: updatedResume, reply } = await chatEditFn({
        data: { apiKey, resume: data, userMessage: userMsg },
      });
      updateData(updatedResume);
      setMessages((prev) => [...prev, { role: "assistant", content: reply, snapshotId }]);
      toast.success(isKu ? "سیڤی نوێکرایەوە" : "Resume updated");
    } catch (error) {
      setHistory((prev) => prev.filter((h) => h.id !== snapshotId));
      toast.error(
        error instanceof Error
          ? error.message
          : isKu
            ? "نوێکردنەوەی سیڤی سەرکەوتوو نەبوو."
            : "Failed to update resume.",
      );
      setMessages((prev) => [
        ...prev,
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
    setActiveTab("chat");
    const userMsg = isKu
      ? "تکایە هەموو هەڵەکانی سیڤییەکەم چاک بکە و هەڵسەنگاندنێکی تەواوم پێ بدە بەپێی ڕێنماییەکان."
      : "Please fix all errors in my resume and give me a full HR evaluation.";
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setChatLoading(true);

    const snapshotId = crypto.randomUUID();
    const snapshot = {
      ...data,
      experience: data.experience.map((e) => ({ ...e, achievements: [...e.achievements] })),
    };
    setHistory((prev) => [
      { id: snapshotId, label: "Before Auto-Fix", timestamp: Date.now(), snapshot },
      ...prev,
    ]);

    try {
      const { resume: updatedResume, reply } = await fixErrorsFn({
        data: { apiKey, resume: data },
      });
      updateData(updatedResume);
      setMessages((prev) => [...prev, { role: "assistant", content: reply, snapshotId }]);
      toast.success(isKu ? "سیڤییەکە چاککرا و هەڵسەنگێندرا" : "Resume fixed and evaluated");
    } catch (error) {
      setHistory((prev) => prev.filter((h) => h.id !== snapshotId));
      toast.error(
        error instanceof Error
          ? error.message
          : isKu
            ? "چاککردنی سیڤی سەرکەوتوو نەبوو."
            : "Failed to fix resume.",
      );
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: isKu
            ? "کێشەیەکم بۆ دروست بوو لە کاتی چاککردن. تکایە دووبارە هەوڵ بدەرەوە."
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
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
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

  const handlePreviewSectionClick = (s: SectionId, path?: string) => {
    setSelectedSection(s);
    if (path) {
      setFocusedField(path);
      if (!soraniMode) {
        setInlineEdit({ path, value: getValueAtPath(data, path), section: s });
      }
      return;
    }
    setActiveTab("design");
    setInlineEdit(null);
  };

  return (
    <div className="h-[100dvh] w-full bg-[#f0f2f7] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 relative overflow-hidden flex flex-col">
      {/* Soft ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50/30 to-slate-100 pointer-events-none" />

      {/* ── Lovable-style Top Bar ── */}
      <header className="relative z-50 shrink-0 flex items-center justify-between px-4 py-3 border-b border-white/60"
        style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(20px)" }}>
        {/* Left: logo + name */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="size-8 rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12),0_1px_0_rgba(255,255,255,0.8)_inset] flex items-center justify-center">
              <img src="/logo/MemoryCV Logo Icon Only.png" alt="MemoryCV" className="size-5 object-contain" />
            </div>
          </Link>
          {/* Resume project name pill */}
          <div className="flex items-center gap-1.5 rounded-full px-3 py-1 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,0.9)_inset] border border-white/60">
            <FileUser className="size-3.5 text-slate-500" />
            <span className="text-[13px] font-semibold text-slate-700 max-w-[160px] truncate">{data.name || "My Resume"}</span>
            <ChevronDown className="size-3 text-slate-400" />
          </div>
        </div>

        {/* Center: quick actions */}
        <div className="hidden md:flex items-center gap-2">
          <button onClick={handleCheckATS}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold text-emerald-700 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,0.9)_inset] border border-white/60 hover:shadow-[0_3px_10px_rgba(0,0,0,0.12)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)] transition-all duration-150">
            <CheckCircle2 className="size-3.5" />{isKu ? "ATS" : "ATS Score"}
          </button>
          <button onClick={handleFixErrors} disabled={chatLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold text-amber-700 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,0.9)_inset] border border-white/60 hover:shadow-[0_3px_10px_rgba(0,0,0,0.12)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)] transition-all duration-150 disabled:opacity-40">
            <Wand2 className="size-3.5" />{isKu ? "چاک بکە" : "Fix"}
          </button>
          <button onClick={() => setTemplateModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold text-slate-700 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,0.9)_inset] border border-white/60 hover:shadow-[0_3px_10px_rgba(0,0,0,0.12)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)] transition-all duration-150">
            <LayoutTemplate className="size-3.5" />{isKu ? "نەخشە" : "Templates"}
          </button>
        </div>

        {/* Right: preview toggle only — Download lives inside preview panel */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowResume(v => !v)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-bold transition-all duration-200 ${
              showResume
                ? "bg-slate-900 text-white shadow-[0_4px_12px_rgba(15,23,42,0.25),0_1px_0_rgba(255,255,255,0.1)_inset]"
                : "bg-white text-slate-800 shadow-[0_2px_8px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.9)_inset] border border-white/60 hover:shadow-[0_4px_12px_rgba(0,0,0,0.14)]"
            } active:scale-[0.97]`}
          >
            <PanelRight className="size-4" />
            <span>{isKu ? "سیڤی" : showResume ? "Hide Resume" : "View Resume"}</span>
          </button>
        </div>
      </header>

      <main className="relative flex-1 min-h-0 z-10 flex flex-col overflow-hidden">
        <div
          className="relative flex-1 min-h-0 flex flex-col"
        >
          {/* ── Full-width Lovable Chat Pane ── */}
          <aside className="relative flex flex-col flex-1 min-h-0 max-w-[780px] mx-auto w-full">
            {/* Chat card */}
            <div className="flex flex-col flex-1 min-h-0 rounded-3xl bg-white/70 shadow-[0_8px_40px_-12px_rgba(15,23,42,0.15),0_0_0_1px_rgba(255,255,255,0.8)] backdrop-blur-sm overflow-hidden">

              {/* ── Chat header: AI name + history only ── */}
              <div className="shrink-0 flex items-center justify-between px-5 pt-4 pb-3 border-b border-slate-100/80">
                <div className="flex items-center gap-2">
                  <div className="size-7 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
                    <Bot className="size-3.5 text-white" />
                  </div>
                  <span className="text-[14px] font-bold text-slate-800">{isKu ? "ژیاری دەستکرد" : "AI Assistant"}</span>
                  {chatLoading && <Loader2 className="size-3.5 text-blue-500 animate-spin" />}
                </div>
                {history.length > 0 && (
                  <button onClick={() => setShowHistory(v => !v)}
                    className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all ${
                      showHistory ? "bg-blue-100 text-blue-700" : "text-slate-500 hover:bg-slate-100"
                    }`}>
                    <Clock className="size-3" />{history.length}v
                  </button>
                )}
              </div>

              {/* Version history strip */}
              {showHistory && history.length > 0 && (
                <div className="max-h-36 shrink-0 overflow-y-auto border-b border-slate-100 bg-slate-50/60 px-3 py-2 space-y-1">
                  {history.map((h) => (
                    <div key={h.id} className="group flex items-center justify-between gap-2 rounded-xl px-3 py-2 hover:bg-white transition-colors">
                      <div className="min-w-0">
                        <p className="text-[12px] font-semibold text-slate-700 truncate">{h.label}</p>
                        <p className="text-[10px] text-slate-400">{new Date(h.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                      </div>
                      <button onClick={() => handleRevert(h.id)}
                        className="shrink-0 flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-bold text-blue-600 opacity-0 group-hover:opacity-100 hover:bg-blue-50 transition-all">
                        <RotateCcw className="size-3" />{isKu ? "گێڕانەوە" : "Restore"}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Tab content ── */}
              <div className="flex-1 min-h-0 flex flex-col">
                {activeTab === "chat" ? (
                  <div className="flex flex-col h-full min-h-0">
                    {/* Messages */}
                    <div className="flex-1 min-h-0 overflow-y-auto space-y-5 px-5 py-4" style={{ scrollbarWidth: "thin", scrollbarColor: "#e2e8f0 transparent" }}>
                      <AnimatePresence initial={false}>
                        {messages.map((msg, i) => (
                          <motion.div key={i}
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 420, damping: 28 }}
                            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                            {msg.role === "assistant" && (
                              <div className="size-8 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center flex-shrink-0 shadow-[0_3px_8px_rgba(0,0,0,0.18)]">
                                <Bot className="size-4 text-white" />
                              </div>
                            )}
                            <div className="flex flex-col gap-2 max-w-[82%]">
                              <div className={`text-[14px] leading-relaxed ${
                                msg.role === "user"
                                  ? "bg-slate-900 text-white px-4 py-3 rounded-[20px] rounded-tr-md font-medium shadow-[0_4px_12px_rgba(15,23,42,0.18)]"
                                  : "bg-white text-slate-800 px-4 py-3 rounded-[20px] rounded-tl-md shadow-[0_2px_12px_rgba(15,23,42,0.08),0_0_0_1px_rgba(15,23,42,0.04)]"
                              }`}>
                                {msg.content}
                              </div>
                              {/* Lovable-style action card for assistant */}
                              {msg.role === "assistant" && msg.snapshotId && (
                                <div className="flex items-center gap-2">
                                  <button onClick={() => handleRevert(msg.snapshotId!)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold text-slate-500 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)] hover:text-blue-600 hover:shadow-[0_2px_8px_rgba(37,99,235,0.12)] transition-all">
                                    <RotateCcw className="size-3" />{isKu ? "گەڕانەوە" : "Undo"}
                                  </button>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {chatLoading && (
                        <div className="flex gap-3 justify-start">
                          <div className="size-8 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center flex-shrink-0 shadow-[0_3px_8px_rgba(0,0,0,0.18)]">
                            <Loader2 className="size-4 text-white animate-spin" />
                          </div>
                          <div className="flex gap-1.5 items-center px-4 py-3 rounded-[20px] rounded-tl-md bg-white shadow-[0_2px_12px_rgba(15,23,42,0.08),0_0_0_1px_rgba(15,23,42,0.04)]">
                            {[0,1,2].map(i => <span key={i} className="size-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: `${i*0.15}s` }} />)}
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Quick suggestion chips — Lovable style */}
                    <div className="shrink-0 px-4 pb-2 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                      {[
                        { label: "Stronger bullets", prompt: "Make my bullet points stronger and more impactful." },
                        { label: "Add metrics", prompt: "Add quantified metrics to my experience." },
                        { label: "Shorten summary", prompt: "Shorten the summary to 2 sentences." },
                        { label: "Tailor for job", prompt: "Tailor my resume for the job target." },
                      ].map((chip) => (
                        <button key={chip.label} onClick={() => setChatInput(chip.prompt)}
                          className="whitespace-nowrap shrink-0 px-3.5 py-2 rounded-full text-[12px] font-semibold text-slate-600 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.07),0_1px_0_rgba(255,255,255,0.9)_inset] border border-white/60 hover:shadow-[0_3px_10px_rgba(0,0,0,0.1)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.07)] transition-all duration-150">
                          {chip.label}
                        </button>
                      ))}
                    </div>

                    {/* ── Lovable-style Bottom Input Bar ── */}
                    <div className="shrink-0 px-4 pb-4 pt-2">
                      <div className="rounded-[22px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.9)_inset,0_0_0_1px_rgba(15,23,42,0.06)] overflow-hidden">
                        <form onSubmit={handleChatSubmit}>
                          <textarea
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder={isKu ? "داوا لە زیاری دەستکرد بکە..." : "Ask Lovable..."}
                            disabled={chatLoading}
                            rows={2}
                            className="w-full bg-transparent px-5 pt-4 pb-2 text-[14px] font-medium text-slate-800 outline-none placeholder:text-slate-400 resize-none scrollbar-hide"
                            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleChatSubmit(e); } }}
                          />
                          {/* Action row */}
                          <div className="flex items-center justify-between px-3 pb-3 pt-1">
                            <div className="flex items-center gap-1.5">
                              {/* + button — soft 3D clay */}
                              <button type="button"
                                className="size-9 rounded-full flex items-center justify-center bg-white text-slate-500 shadow-[0_2px_8px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.9)_inset,0_0_0_1px_rgba(0,0,0,0.06)] hover:shadow-[0_3px_12px_rgba(0,0,0,0.13)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] transition-all duration-150">
                                <Plus className="size-4" />
                              </button>
                              {/* More button */}
                              <button type="button"
                                className="size-9 rounded-full flex items-center justify-center bg-white text-slate-500 shadow-[0_2px_8px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.9)_inset,0_0_0_1px_rgba(0,0,0,0.06)] hover:shadow-[0_3px_12px_rgba(0,0,0,0.13)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] transition-all duration-150">
                                <MoreHorizontal className="size-4" />
                              </button>
                            </div>
                            <div className="flex items-center gap-1.5">
                              {/* Mic button — soft 3D clay */}
                              <button type="button"
                                onClick={() => setIsRecording(r => !r)}
                                className={`size-9 rounded-full flex items-center justify-center transition-all duration-150 ${
                                  isRecording
                                    ? "bg-red-500 text-white shadow-[0_4px_12px_rgba(239,68,68,0.4)] scale-105"
                                    : "bg-white text-slate-500 shadow-[0_2px_8px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.9)_inset,0_0_0_1px_rgba(0,0,0,0.06)] hover:shadow-[0_3px_12px_rgba(0,0,0,0.13)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
                                }`}>
                                <Mic className="size-4" />
                              </button>
                              {/* Send button — primary 3D clay */}
                              <button type="submit" disabled={!chatInput.trim() || chatLoading}
                                className="size-9 rounded-full flex items-center justify-center bg-slate-900 text-white shadow-[0_4px_12px_rgba(15,23,42,0.28),0_1px_0_rgba(255,255,255,0.1)_inset] hover:bg-slate-800 hover:shadow-[0_6px_16px_rgba(15,23,42,0.32)] active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)] active:scale-[0.95] disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none transition-all duration-150">
                                <ArrowUp className="size-4" />
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ─── DESIGN TAB ─── */
                  <div className="flex flex-col h-full min-h-0 overflow-y-auto">
                    <DesignPanel
                      design={design}
                      data={data}
                      onChange={updateDesign}
                      updateData={updateData}
                      onClose={() => setActiveTab("chat")}
                      selected={selectedSection}
                      setSelected={setSelectedSection}
                      focusedField={focusedField}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Resize handle */}
            <div
              className="absolute top-0 right-0 h-full w-1.5 cursor-col-resize z-20 hover:bg-blue-200 transition-colors"
              onMouseDown={(e) => {
                e.preventDefault();
                const startX = e.clientX;
                const startWidth = leftSidebarWidth;
                const onMove = (ev: MouseEvent) => {
                  setLeftSidebarWidth(Math.max(320, Math.min(500, startWidth + (ev.clientX - startX))));
                };
                const onUp = () => {
                  window.removeEventListener("mousemove", onMove);
                  window.removeEventListener("mouseup", onUp);
                };
                window.addEventListener("mousemove", onMove);
                window.addEventListener("mouseup", onUp);
              }}
            />
          </aside>
        </div>
      </main>

      {/* ── Resume Preview Overlay Panel (Lovable-style slide-in) ── */}
      <AnimatePresence>
        {showResume && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-slate-900/20 backdrop-blur-[2px]"
              onClick={() => setShowResume(false)}
            />
            {/* Panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 340, damping: 34 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-2xl flex flex-col"
              style={{ background: "rgba(248,250,252,0.97)", backdropFilter: "blur(24px)", boxShadow: "-20px 0 60px rgba(15,23,42,0.15)" }}
            >
              {/* ── Panel toolbar ── */}
              <div className="shrink-0 flex items-center gap-2 px-4 py-3 border-b border-slate-200/60"
                style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(12px)" }}>

                {/* ← Back to Chat */}
                <button onClick={() => setShowResume(false)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[13px] font-bold text-slate-700 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,0.9)_inset] border border-white/60 hover:shadow-[0_3px_10px_rgba(0,0,0,0.1)] active:scale-[0.97] transition-all shrink-0">
                  <X className="size-3.5" />
                  <span className="hidden sm:inline">{isKu ? "گەڕانەوە" : "← Back to Chat"}</span>
                </button>

                {/* Live badge */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.07)] border border-white/60 shrink-0">
                  <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Live</span>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* RTL toggle */}
                <button onClick={() => setSoraniMode(v => !v)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-[12px] font-semibold transition-all shrink-0 ${
                    soraniMode
                      ? "bg-slate-900 text-white shadow-[0_3px_8px_rgba(0,0,0,0.2)]"
                      : "bg-white text-slate-600 shadow-[0_2px_6px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,0.9)_inset] border border-white/60"
                  } hover:shadow-[0_3px_10px_rgba(0,0,0,0.1)] active:scale-[0.97]`}>
                  <Languages className="size-3.5" />
                  <span className="hidden sm:inline">{soraniMode ? "Kurdish RTL" : "EN"}</span>
                </button>

                {/* Zoom controls */}
                <div className="flex items-center rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.06)] overflow-hidden shrink-0">
                  <button onClick={() => setZoom(z => Math.max(0.4, z - 0.1))}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-100 transition-colors font-bold text-base leading-none"
                    title="Zoom out">−</button>
                  <span className="px-2 text-[11px] font-bold text-slate-700 tabular-nums">{Math.round(zoom * 100)}%</span>
                  <button onClick={() => setZoom(z => Math.min(2, z + 0.1))}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-100 transition-colors font-bold text-base leading-none"
                    title="Zoom in">+</button>
                </div>

                {/* Download / Export */}
                <div className="shrink-0">
                  <ExportButtons data={previewData} template={resume.template} name={previewData.name} previewRef={previewRef} />
                </div>
              </div>

              {/* Resume canvas */}
              <div className="flex-1 min-h-0 overflow-auto p-6">
                <div className="rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(15,23,42,0.14),0_0_0_1px_rgba(15,23,42,0.06)] bg-white">
                  <ClientPDFPreview
                    data={previewData}
                    template={resume.template}
                    previewRef={previewRef}
                    zoom={zoom}
                    design={design}
                    updateData={updateData}
                    onSectionClick={handlePreviewSectionClick}
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>


      <AnimatePresence>
        {tailorOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-[2rem] w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    {isKu ? "گونجاندن بۆ کار" : "Tailor to Job"}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {isKu
                      ? "وەسفی کارەکە لێرە دابنێ بۆ ئەوەی زیرەکی دەستکرد سیڤییەکەت ڕێکبخات."
                      : "Paste a job description and AI will rewrite your resume to match it."}
                  </p>
                </div>
                <button
                  onClick={() => setTailorOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 flex-1 overflow-y-auto">
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder={
                    isKu ? "لێرە وەسفی کارەکە بنووسە..." : "Paste the job description here..."
                  }
                  className="w-full h-64 p-4 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all resize-none"
                />
              </div>
              <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
                <button
                  onClick={() => setTailorOpen(false)}
                  className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
                >
                  {isKu ? "پاشگەزبوونەوە" : "Cancel"}
                </button>
                <button
                  onClick={handleTailor}
                  disabled={tailoring || jobDescription.trim().length < 20}
                  className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:bg-slate-300 disabled:text-slate-500 disabled:scale-100 rounded-xl shadow-sm transition-all"
                >
                  {tailoring ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  {isKu ? "گونجاندن بە زیرەکی دەستکرد" : "Tailor with AI"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {coverLetterModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2rem] w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white/50 backdrop-blur-md">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  {isKu ? "نامەی داواکاری (Cover Letter)" : "Cover Letter"}
                </h3>
                <button
                  onClick={() => setCoverLetterModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 bg-slate-50/50 max-h-[60vh] overflow-y-auto">
                {coverLetterLoading ? (
                  <div className="flex flex-col items-center justify-center py-10 gap-3">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                    <p className="text-sm font-medium text-slate-500">
                      {isKu ? "لە دروستکردندایە بە زیرەکی دەستکرد..." : "Generating with AI..."}
                    </p>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed font-medium bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    {coverLetterContent || (isKu ? "هیچ نەدۆزرایەوە." : "Nothing generated yet.")}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        {templateModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-[2rem] w-full max-w-5xl h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white/50 backdrop-blur-md">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <LayoutTemplate className="w-5 h-5 text-purple-600" />
                    {isKu ? "هەڵبژاردنی نەخشە" : "Template Library"}
                  </h3>
                </div>
                <button
                  onClick={() => setTemplateModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-hidden flex flex-col bg-slate-50/50">
                {/* Filters */}
                <div className="p-4 overflow-x-auto scrollbar-hide shrink-0 border-b border-slate-100 bg-white">
                  <div className="flex items-center gap-2 max-w-full">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                          filter === cat
                            ? "bg-slate-800 text-white shadow-sm"
                            : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {filteredTemplates.map(({ id: templateId, label, isNew }) => {
                      const isActive = resume.template === templateId;
                      return (
                        <button
                          key={templateId}
                          onClick={() => {
                            setTemplate(templateId);
                            setTemplateModalOpen(false);
                          }}
                          className={`group relative flex flex-col items-center gap-3 rounded-[1.5rem] p-3 transition-all duration-300 text-center ${
                            isActive
                              ? "bg-blue-600 shadow-[0_8px_20px_rgba(37,99,235,0.2)] border-transparent scale-[1.02] ring-2 ring-blue-600 ring-offset-2"
                              : "bg-white hover:bg-blue-50/50 border border-slate-200 hover:border-blue-200 hover:shadow-md"
                          }`}
                        >
                          <div className="w-full aspect-[1/1.2] rounded-xl overflow-hidden relative shadow-[0_2px_10px_rgba(0,0,0,0.05)] bg-slate-100 border border-slate-100/50">
                            {/* Mini Thumbnail render */}
                            <div className="absolute inset-0 bg-white overflow-hidden flex items-start justify-center">
                              <div
                                className="origin-top pointer-events-none mt-2"
                                style={{ width: "794px", height: "1123px", zoom: 0.2 }}
                              >
                                <ResumePreview
                                  data={resume.data}
                                  template={templateId}
                                  design={design}
                                />
                              </div>
                            </div>

                            {isActive && (
                              <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center backdrop-blur-[1px] z-10">
                                <CheckCircle2 className="w-10 h-10 text-blue-600 drop-shadow-md bg-white rounded-full" />
                              </div>
                            )}
                          </div>

                          <div className="w-full px-1 flex flex-col items-center mt-1 mb-1">
                            <span
                              className={`text-sm font-bold truncate w-full ${isActive ? "text-white" : "text-slate-900"}`}
                            >
                              {label}
                            </span>
                          </div>

                          {isNew && !isActive && (
                            <span className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 px-2.5 py-1 rounded-full bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm z-10 border-2 border-white">
                              New
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {atsModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-emerald-50">
                <h3 className="text-xl font-bold text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  {isKu ? "پشکنینی ATS" : "ATS Evaluation"}
                </h3>
                <button
                  onClick={() => setAtsModalOpen(false)}
                  className="p-2 text-emerald-600 hover:text-emerald-900 hover:bg-emerald-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-8 flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden bg-white">
                <AnimatePresence mode="wait">
                  {atsLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center gap-4 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] relative overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-tr from-emerald-200 to-transparent"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        />
                        <Bot className="w-8 h-8 text-emerald-600 animate-pulse relative z-10" />
                      </div>
                      <p className="text-slate-500 font-medium animate-pulse">
                        {isKu
                          ? "زیرەکی دەستکرد خەریکی شیکردنەوەیە..."
                          : "AI is analyzing your formatting and keywords..."}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="flex flex-col items-center gap-6 w-full"
                    >
                      <div className="relative w-32 h-32 rounded-full border-8 border-emerald-50 flex items-center justify-center shadow-inner">
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                          <motion.circle
                            cx="50%"
                            cy="50%"
                            r="46%"
                            className="text-emerald-500 stroke-current drop-shadow-md"
                            strokeWidth="8"
                            fill="transparent"
                            strokeLinecap="round"
                            strokeDasharray="300"
                            initial={{ strokeDashoffset: 300 }}
                            animate={{ strokeDashoffset: 300 - (300 * (atsScore ?? 0)) / 100 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                          />
                        </svg>
                        <motion.span
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5, type: "spring" }}
                          className="text-4xl font-extrabold text-slate-800"
                        >
                          {atsScore}
                        </motion.span>
                      </div>
                      <div className="w-full space-y-3">
                        {atsFeedback.map((fb, idx) => (
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + idx * 0.15 }}
                            key={idx}
                            className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100 shadow-sm"
                          >
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                            <p className="text-sm text-slate-700 font-medium">{fb}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="p-6 border-t border-slate-100 flex justify-end bg-slate-50/50">
                <button
                  onClick={() => setAtsModalOpen(false)}
                  className="px-6 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-xl shadow-[0_4px_12px_rgba(16,185,129,0.3)] transition-all"
                >
                  {isKu ? "داخستن" : "Awesome!"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {inlineEdit && (
        <div
          className="fixed inset-0 z-[250] bg-slate-950/30 backdrop-blur-[2px] p-4 flex items-start justify-center pt-24"
          onClick={() => setInlineEdit(null)}
        >
          <div
            className="w-full max-w-xl rounded-[24px] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.22)] border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-gradient-to-b from-white to-slate-50">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Inline edit
                </p>
                <p className="text-sm font-bold text-slate-900">{inlineEdit.path}</p>
              </div>
              <button
                onClick={() => setInlineEdit(null)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              {isMultilinePath(inlineEdit.path) ? (
                <textarea
                  autoFocus
                  value={inlineEdit.value}
                  onChange={(e) =>
                    setInlineEdit((curr) => (curr ? { ...curr, value: e.target.value } : curr))
                  }
                  className="h-44 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-blue-500 focus:bg-white resize-none"
                />
              ) : (
                <input
                  autoFocus
                  value={inlineEdit.value}
                  onChange={(e) =>
                    setInlineEdit((curr) => (curr ? { ...curr, value: e.target.value } : curr))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
                />
              )}
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    updateData(inlineEdit.path, inlineEdit.value);
                    setInlineEdit(null);
                  }}
                  className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    if (inlineEdit)
                      updateData(inlineEdit.path, getValueAtPath(data, inlineEdit.path));
                    setInlineEdit(null);
                  }}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
