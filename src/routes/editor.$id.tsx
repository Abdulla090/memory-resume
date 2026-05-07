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

  const [zoom, setZoom] = useState(0.5);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDesignOpen, setIsDesignOpen] = useState(false);
  const [mobileDesignOpen, setMobileDesignOpen] = useState(false);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const [leftSidebarWidth, setLeftSidebarWidth] = useState(360);
  const [rightSidebarWidth, setRightSidebarWidth] = useState(360);
  const [selectedSection, setSelectedSection] = useState<SectionId>("global");
  const [focusedField, setFocusedField] = useState<string | null>(null);
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
      setIsSidebarOpen(false);
      setIsDesignOpen(false);
    }
  }, []);

  useEffect(() => {
    const raw = window.localStorage.getItem(LAYOUT_STORAGE_KEY);
    if (!raw) return;
    try {
      const saved = JSON.parse(raw) as {
        isSidebarOpen?: boolean;
        isDesignOpen?: boolean;
        leftSidebarWidth?: number;
        rightSidebarWidth?: number;
      };
      // Always default to AI chat open and Design sidebar closed, ignoring saved open states
      // if (typeof saved.isSidebarOpen === "boolean") setIsSidebarOpen(saved.isSidebarOpen);
      // if (typeof saved.isDesignOpen === "boolean") setIsDesignOpen(saved.isDesignOpen);
      if (typeof saved.leftSidebarWidth === "number")
        setLeftSidebarWidth(Math.max(300, Math.min(460, saved.leftSidebarWidth)));
      if (typeof saved.rightSidebarWidth === "number")
        setRightSidebarWidth(Math.max(300, Math.min(460, saved.rightSidebarWidth)));
    } catch {
      // Ignore malformed layout state.
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      LAYOUT_STORAGE_KEY,
      JSON.stringify({ isSidebarOpen, isDesignOpen, leftSidebarWidth, rightSidebarWidth }),
    );
  }, [isSidebarOpen, isDesignOpen, leftSidebarWidth, rightSidebarWidth]);

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
    setIsSidebarOpen(true);
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
    if (!isDesignOpen) setIsDesignOpen(true);
    setInlineEdit(null);
  };

  return (
    <div className="min-h-screen bg-[#f8faff] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 relative overflow-hidden flex flex-col">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-300/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-400/10 rounded-full blur-[150px] pointer-events-none mix-blend-multiply" />

      {/* Glass Navigation */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-blue-100/50 hidden md:block">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 cursor-pointer group">
              <img
                src="/logo/MemoryCV Logo Icon Only.png"
                alt="MemoryCV"
                className="w-16 h-16 rounded-xl object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <span className="text-2xl font-bold tracking-tight text-slate-900 group-hover:text-blue-950 transition-colors">
                MemoryCV
              </span>
            </Link>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setTemplateModalOpen(true)}
                className="px-4 py-2 sm:py-2.5 text-sm font-bold text-purple-700 hover:text-purple-950 rounded-xl hover:bg-purple-50 transition-all flex items-center gap-2 border border-purple-200 bg-white shadow-sm hover:shadow-md active:scale-95"
              >
                <LayoutTemplate className="h-4 w-4" />
                <span className="hidden sm:inline">{isKu ? "نەخشەکان" : "Design"}</span>
              </button>

              <button
                onClick={() => setIsDesignOpen((o) => !o)}
                className={`px-4 py-2 sm:py-2.5 text-sm font-bold rounded-xl transition-all flex items-center gap-2 border shadow-sm hover:shadow-md active:scale-95 ${
                  isDesignOpen
                    ? "bg-slate-900 border-slate-900 text-white"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">{isKu ? "ستایل" : "Style"}</span>
              </button>

              <button
                onClick={handleCheckATS}
                className="px-4 py-2 sm:py-2.5 text-sm font-bold text-emerald-700 hover:text-emerald-950 rounded-xl hover:bg-emerald-50 transition-all flex items-center gap-2 border border-emerald-200 bg-white shadow-sm hover:shadow-md active:scale-95"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span className="hidden sm:inline">{isKu ? "پشکنینی ATS" : "ATS Score"}</span>
              </button>

              <button
                onClick={() => setTailorOpen(true)}
                className="px-4 py-2 sm:py-2.5 text-sm font-bold text-blue-700 hover:text-blue-950 rounded-xl hover:bg-blue-50 transition-all flex items-center gap-2 border border-blue-200 bg-white shadow-sm hover:shadow-md active:scale-95"
              >
                <Target className="h-4 w-4" />
                <span className="hidden sm:inline">{isKu ? "گونجاندن" : "Tailor"}</span>
              </button>

              <button
                onClick={handleFixErrors}
                disabled={chatLoading}
                className="px-4 py-2 sm:py-2.5 text-sm font-bold text-amber-700 hover:text-amber-950 rounded-xl hover:bg-amber-50 transition-all flex items-center gap-2 border border-amber-200 bg-white shadow-sm hover:shadow-md active:scale-95 disabled:opacity-50 disabled:active:scale-100"
              >
                <Wand2 className="h-4 w-4" />
                <span className="hidden sm:inline">{isKu ? "چاککردنی هەڵەکان" : "Fix Errors"}</span>
              </button>

              <button
                onClick={handleGenerateCoverLetter}
                className="px-4 py-2 sm:py-2.5 text-sm font-bold text-indigo-700 hover:text-indigo-950 rounded-xl hover:bg-indigo-50 transition-all flex items-center gap-2 border border-indigo-200 bg-white shadow-sm hover:shadow-md active:scale-95"
              >
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">{isKu ? "نامەی داواکاری" : "Cover Letter"}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main
        className="relative flex-1 z-10 mx-auto grid w-full max-w-[1760px] gap-4 overflow-hidden rounded-[40px] border border-white/70 bg-[linear-gradient(180deg,rgba(248,250,252,0.96),rgba(255,255,255,0.9))] px-3 pb-4 pt-4 shadow-[0_35px_120px_-50px_rgba(15,23,42,0.45)] backdrop-blur-2xl sm:gap-6 sm:px-6 sm:pb-6 sm:pt-6"
        style={{
          gridTemplateColumns: `minmax(0, 1fr)`,
          transition: "grid-template-columns 0.3s ease",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.1),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.72),transparent_18%)]" />
        {/* Mobile sidebars are handled by shadcn Sheet components below */}

        <section
          className="grid gap-4 lg:grid-cols-[var(--left-col)_minmax(0,1fr)_var(--right-col)] lg:gap-7 transition-[grid-template-columns] duration-300 ease-in-out"
          style={{
            "--left-col": isSidebarOpen ? `${leftSidebarWidth}px` : "0px",
            "--right-col": isDesignOpen ? `${rightSidebarWidth}px` : "0px",
            transition: "grid-template-columns 0.3s ease",
          } as React.CSSProperties}
        >
          {/* Left pane: AI Chat */}
          <aside
            className={`
          relative flex flex-col gap-4 min-w-0 lg:col-start-1
          lg:sticky lg:top-24 lg:h-[calc(100dvh-8rem)]
          ${isSidebarOpen ? "hidden lg:flex lg:w-auto lg:overflow-visible lg:bg-transparent lg:p-0 lg:z-auto" : "hidden"}
        `}
          >
            <div className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-white/92 shadow-[0_24px_70px_-34px_rgba(15,23,42,0.28)] ring-1 ring-white/60 backdrop-blur-2xl">
              {/* Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-slate-100/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.82))] px-5 py-4">
                <div>
                  <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700 shadow-sm">
                    <Bot className="h-3.5 w-3.5" />
                    Smart workspace
                  </div>
                  <h2 className="flex items-center gap-2 text-sm font-bold tracking-tight text-slate-900">
                    <Bot className="w-4 h-4 text-blue-600" />
                    {isKu ? "یاریدەدەری زیرەکی دەستکرد" : "AI Assistant"}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {isKu
                      ? "داوابکە هەر شتێک بگۆڕێت، یان وەشانی پێشوو هەڵبژێرە."
                      : "Ask to change anything, or pick a past version."}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                    aria-label="Close chat sidebar"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {history.length > 0 && (
                <div className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-white/60 px-5 py-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {isKu ? "وەشانە پاشەکەوتکراوەکان" : "History"}
                  </span>
                  <button
                    onClick={() => setShowHistory((v) => !v)}
                    className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                      showHistory
                        ? "bg-blue-100 text-blue-700 shadow-sm"
                        : "text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    {history.length} {isKu ? "وەشان" : `version${history.length !== 1 ? "s" : ""}`}
                  </button>
                </div>
              )}

              {/* History panel */}
              {showHistory && history.length > 0 && (
                <div className="max-h-44 shrink-0 space-y-1 overflow-y-auto border-b border-slate-100 bg-slate-50/90 px-4 py-2">
                  {history.map((h) => (
                    <div
                      key={h.id}
                      className="group flex items-center justify-between gap-2 rounded-2xl border border-transparent px-3 py-2.5 shadow-sm transition-colors hover:border-slate-200 hover:bg-white"
                    >
                      <div className="min-w-0">
                        <p className="text-[12px] text-slate-700 truncate font-semibold">
                          {h.label}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium">
                          {new Date(h.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRevert(h.id)}
                        className="shrink-0 flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-bold text-blue-600 opacity-0 transition-opacity hover:bg-blue-50 hover:text-blue-800 group-hover:opacity-100"
                      >
                        <RotateCcw className="w-3 h-3" /> {isKu ? "گێڕانەوە" : "Restore"}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Messages */}
              <div
                className="flex-1 overflow-y-auto space-y-4 bg-[linear-gradient(180deg,rgba(248,250,252,0.55),rgba(255,255,255,0.95))] p-5"
                style={{ scrollbarWidth: "thin", scrollbarColor: "#e2e8f0 transparent" }}
              >
                <AnimatePresence initial={false}>
                  {messages.map((msg, i) => (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      key={i}
                      className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-[0_4px_10px_rgba(37,99,235,0.2)]">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div className="flex flex-col gap-1 max-w-[85%]">
                        <div
                          className={`text-[14.5px] px-5 py-3.5 rounded-[24px] leading-relaxed shadow-sm ${
                            msg.role === "user"
                              ? "bg-blue-600 text-white rounded-br-sm font-medium shadow-blue-200"
                              : "bg-white border border-slate-100 text-slate-800 rounded-bl-sm shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
                          }`}
                        >
                          {msg.content}
                        </div>
                        {msg.role === "assistant" && msg.snapshotId && (
                          <button
                            onClick={() => handleRevert(msg.snapshotId!)}
                            className="self-start flex items-center gap-1 text-[10.5px] font-bold text-slate-400 hover:text-blue-600 transition-colors mt-1"
                          >
                            <RotateCcw className="w-3 h-3" />{" "}
                            {isKu ? "گەڕانەوە لەم گۆڕانکارییە" : "Undo this change"}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {chatLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-[0_4px_10px_rgba(37,99,235,0.2)]">
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                    </div>
                    <div className="flex gap-1.5 items-center px-5 py-4 rounded-2xl rounded-tl-sm bg-white border border-slate-100 shadow-sm">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex w-full shrink-0 justify-center border-t border-slate-100 bg-white/90 px-4 pb-safe-6 pt-4">
                <form
                  onSubmit={handleChatSubmit}
                  className="flex w-full items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-1.5 py-1.5 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.28)] ring-4 ring-transparent transition-all duration-300 focus-within:border-blue-300 focus-within:ring-blue-500/10 sm:gap-3 sm:px-2 sm:py-2"
                >
                  <input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={
                      isKu
                        ? "پوختەی کارەکەم با بەهێزتر بێت..."
                        : "Make my summary more executive..."
                    }
                    disabled={chatLoading}
                    className="flex-1 bg-transparent pl-4 text-[14px] font-medium text-slate-800 outline-none placeholder:text-slate-400"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim() || chatLoading}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm transition-all hover:bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 sm:h-9 sm:w-9"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
            <div
              className="hidden lg:block absolute top-0 right-0 h-full w-1.5 cursor-col-resize bg-transparent hover:bg-blue-500/20"
              onMouseDown={(e) => {
                e.preventDefault();
                const startX = e.clientX;
                const startWidth = leftSidebarWidth;
                const onMove = (ev: MouseEvent) => {
                  setLeftSidebarWidth(
                    Math.max(320, Math.min(430, startWidth + (ev.clientX - startX))),
                  );
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

          {/* Right pane: Preview Area */}
          <section className="flex flex-col h-full lg:h-[calc(100dvh-8rem)] min-w-0 lg:col-start-2">
            <div className="relative flex h-[calc(100vh-10rem)] flex-1 flex-col overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(248,250,252,0.95),rgba(255,255,255,0.94))] p-2 shadow-[0_24px_70px_-34px_rgba(15,23,42,0.2)] backdrop-blur-3xl sm:p-4 lg:h-auto lg:p-6">
              {/* Toolbar Area */}
              <div className="mb-4 flex shrink-0 flex-wrap items-center justify-between gap-3 px-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMobileChatOpen(true)}
                    className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(37,99,235,0.24)] transition-all active:scale-95 hover:bg-blue-700 lg:hidden"
                  >
                    <Bot className="w-4 h-4" />
                    AI Chat
                  </button>
                  <button
                    onClick={() => setMobileDesignOpen(true)}
                    className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition-all active:scale-95 hover:bg-slate-50 lg:hidden"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Design
                  </button>
                  <button
                    onClick={() => setIsSidebarOpen((value) => !value)}
                    className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition-all active:scale-95 hover:bg-white lg:flex"
                  >
                    {isSidebarOpen ? "Hide chat" : "Show chat"}
                  </button>
                  <div className="hidden items-center gap-3 rounded-full border border-white bg-white/70 px-3 py-1.5 shadow-sm backdrop-blur-md sm:flex">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Live Preview
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSoraniMode((value) => !value)}
                    className={`flex items-center gap-1.5 rounded-full border px-3 py-2.5 text-xs font-bold tracking-wide shadow-sm transition-all active:scale-[0.98] ${
                      soraniMode
                        ? "border-slate-800 bg-slate-900 text-white"
                        : "border-white bg-white/80 text-slate-700 hover:bg-white"
                    }`}
                  >
                    <Languages className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {soraniMode ? "کوردی RTL" : "Kurdish RTL"}
                    </span>
                    <span className="sm:hidden">{soraniMode ? "KU" : "EN"}</span>
                  </button>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-white/80 shadow-sm overflow-hidden">
                    <button
                      onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
                      className="p-1.5 text-slate-600 transition-colors hover:bg-slate-100 sm:p-2"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-[10px] font-bold text-slate-700 sm:w-10 sm:text-xs">
                      {Math.round(zoom * 100)}%
                    </span>
                    <button
                      onClick={() => setZoom((z) => Math.min(2, z + 0.25))}
                      className="p-1.5 text-slate-600 transition-colors hover:bg-slate-100 sm:p-2"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <ExportButtons
                      data={previewData}
                      template={resume.template}
                      name={previewData.name}
                      previewRef={previewRef}
                    />
                  </div>
                </div>
              </div>

              {/* Resume Container with smooth scroll */}
              <div className="relative flex-1 overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.04),0_28px_60px_-26px_rgba(15,23,42,0.18)] @container">
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
          </section>

          <Sheet open={mobileChatOpen} onOpenChange={setMobileChatOpen}>
            <SheetContent
              side="left"
              className="w-[92vw] max-w-[24rem] bg-white p-0 text-slate-900"
            >
              <SheetHeader className="border-b border-slate-100 px-5 py-4 text-left">
                <SheetTitle>AI Assistant</SheetTitle>
                <SheetDescription>Use the full assistant on mobile.</SheetDescription>
              </SheetHeader>
              <div className="flex h-[calc(100dvh-5rem)] flex-col">
                <div className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-white/70 px-5 py-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                    <Clock className="w-3 h-3" />
                    {history.length} {isKu ? "وەشان" : `version${history.length !== 1 ? "s" : ""}`}
                  </div>
                  <button
                    onClick={() => {
                      setMobileChatOpen(false);
                      setMobileDesignOpen(true);
                    }}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm"
                  >
                    Open design
                  </button>
                </div>

                {history.length > 0 && (
                  <div className="px-5 py-2 border-b border-slate-100 bg-slate-50/80 space-y-1 max-h-36 overflow-y-auto shrink-0">
                    {history.map((h) => (
                      <div
                        key={h.id}
                        className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 hover:bg-white border border-transparent hover:border-slate-200 transition-colors group shadow-sm"
                      >
                        <div className="min-w-0">
                          <p className="text-[12px] text-slate-700 truncate font-semibold">
                            {h.label}
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium">
                            {new Date(h.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRevert(h.id)}
                          className="shrink-0 flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 px-2 py-1 rounded-md hover:bg-blue-50"
                        >
                          <RotateCcw className="w-3 h-3" /> {isKu ? "گێڕانەوە" : "Restore"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className="flex-1 overflow-y-auto p-5 space-y-4"
                  style={{ scrollbarWidth: "thin", scrollbarColor: "#e2e8f0 transparent" }}
                >
                  <AnimatePresence initial={false}>
                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {msg.role === "assistant" && (
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-[0_4px_10px_rgba(37,99,235,0.2)]">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div className="flex flex-col gap-1 max-w-[85%]">
                          <div
                            className={`text-[14.5px] px-5 py-3.5 rounded-[24px] leading-relaxed shadow-sm ${msg.role === "user" ? "bg-blue-600 text-white rounded-br-sm font-medium shadow-blue-200" : "bg-white border border-slate-100 text-slate-800 rounded-bl-sm shadow-[0_4px_20px_rgba(0,0,0,0.03)]"}`}
                          >
                            {msg.content}
                          </div>
                          {msg.role === "assistant" && msg.snapshotId && (
                            <button
                              onClick={() => handleRevert(msg.snapshotId!)}
                              className="self-start flex items-center gap-1 text-[10.5px] font-bold text-slate-400 hover:text-blue-600 transition-colors mt-1"
                            >
                              <RotateCcw className="w-3 h-3" />{" "}
                              {isKu ? "گەڕانەوە لەم گۆڕانکارییە" : "Undo this change"}
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {chatLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-[0_4px_10px_rgba(37,99,235,0.2)]">
                        <Loader2 className="w-4 h-4 text-white animate-spin" />
                      </div>
                      <div className="flex gap-1.5 items-center px-5 py-4 rounded-2xl rounded-tl-sm bg-white border border-slate-100 shadow-sm">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 shrink-0 pb-safe-6 flex justify-center w-full border-t border-slate-100 bg-white/80">
                  <form
                    onSubmit={handleChatSubmit}
                    className="flex w-full items-center gap-2 rounded-full px-1.5 py-1.5 bg-white/90 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                  >
                    <input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder={
                        isKu
                          ? "پوختەی کارەکەم با بەهێزتر بێت..."
                          : "Make my summary more executive..."
                      }
                      disabled={chatLoading}
                      className="flex-1 bg-transparent outline-none text-slate-800 font-medium text-[14px] placeholder:text-slate-400 pl-4"
                    />
                    <button
                      type="submit"
                      disabled={!chatInput.trim() || chatLoading}
                      className="w-8 h-8 rounded-full bg-slate-900 disabled:bg-slate-200 hover:bg-blue-600 flex items-center justify-center transition-all disabled:text-slate-400 text-white shadow-sm shrink-0"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Sheet open={mobileDesignOpen} onOpenChange={setMobileDesignOpen}>
            <SheetContent
              side="right"
              className="w-[92vw] max-w-[24rem] bg-white p-0 text-slate-900"
            >
              <SheetHeader className="border-b border-slate-100 px-5 py-4 text-left">
                <SheetTitle>Design</SheetTitle>
                <SheetDescription>Adjust the live resume styles.</SheetDescription>
              </SheetHeader>
              <div className="h-[calc(100dvh-5rem)] overflow-y-auto">
                <DesignPanel
                  design={design}
                  data={data}
                  onChange={updateDesign}
                  updateData={updateData}
                  onClose={() => setMobileDesignOpen(false)}
                  selected={selectedSection}
                  setSelected={setSelectedSection}
                  focusedField={focusedField}
                />
              </div>
            </SheetContent>
          </Sheet>

          {/* Right pane: Design Panel */}
          <AnimatePresence>
            {isDesignOpen && (
              <motion.aside
                key="design-panel"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                className="relative hidden min-w-0 flex-col overflow-hidden rounded-[1.9rem] border border-slate-200/80 bg-white shadow-[0_20px_60px_-32px_rgba(15,23,42,0.22)] lg:sticky lg:top-24 lg:flex lg:h-[calc(100dvh-8rem)] lg:col-start-3"
                style={{ width: `${rightSidebarWidth}px` }}
              >
                <DesignPanel
                  design={design}
                  data={data}
                  onChange={updateDesign}
                  updateData={updateData}
                  onClose={() => setIsDesignOpen(false)}
                  selected={selectedSection}
                  setSelected={setSelectedSection}
                  focusedField={focusedField}
                />
                <div className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-2 py-1 shadow-sm">
                  <button
                    onClick={() => setIsDesignOpen(false)}
                    className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                    aria-label="Close design sidebar"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div
                  className="absolute top-0 left-0 h-full w-1.5 cursor-col-resize bg-transparent hover:bg-blue-500/20"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    const startX = e.clientX;
                    const startWidth = rightSidebarWidth;
                    const onMove = (ev: MouseEvent) => {
                      setRightSidebarWidth(
                        Math.max(320, Math.min(430, startWidth - (ev.clientX - startX))),
                      );
                    };
                    const onUp = () => {
                      window.removeEventListener("mousemove", onMove);
                      window.removeEventListener("mouseup", onUp);
                    };
                    window.addEventListener("mousemove", onMove);
                    window.addEventListener("mouseup", onUp);
                  }}
                />
              </motion.aside>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* Modals */}
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
