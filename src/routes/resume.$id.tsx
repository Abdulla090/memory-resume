import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowLeft,
  Download,
  Loader2,
  Plus,
  Sparkles,
  Target,
  Trash2,
  Wand2,
  Send,
  Edit3,
  Bot,
  X,
  ChevronDown,
  FileText,
  FileType,
  Presentation,
  FileCode,
  RotateCcw,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { exportResumePDF } from "@/components/resume/pdf-templates";
import { exportResumeDocx } from "@/components/resume/docx-templates";
import { exportResumeMarkdown, exportResumePptx } from "@/components/resume/export-utils";
import { exportPreviewAsPDF } from "@/lib/pdf-screenshot";
import { ResumePreview } from "@/components/resume/templates";
import { improveBullet, tailorToJob, chatEditResume } from "@/lib/ai.functions";
import { useAppStore } from "@/lib/store";
import type { ExperienceItem, ResumeData, TemplateId } from "@/lib/types";

const rtlTextPattern = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/;

function hasRTLText(data: ResumeData) {
  return rtlTextPattern.test(
    [
      data.name,
      data.title,
      data.location,
      data.summary,
      ...data.skills,
      ...data.certifications,
      ...data.experience.flatMap((item) => [item.title, item.company, item.description, ...item.achievements]),
      ...data.projects.flatMap((item) => [item.name, item.description, item.impact, ...item.tech]),
      ...data.education.flatMap((item) => [item.degree, item.institution]),
    ].filter(Boolean).join(" "),
  );
}

export const Route = createFileRoute("/resume/$id")({
  head: () => ({
    meta: [
      { title: "Resume Editor — MemoryCV" },
      { name: "description", content: "Edit, tailor, and export a resume generated from your memory profile." },
    ],
  }),
  component: ResumeEditor,
});

function ResumeEditor() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const resume = useAppStore((state) => state.resumes.find((item) => item.id === id));
  const updateResume = useAppStore((state) => state.updateResume);
  const apiKey = useAppStore((state) => state.apiKey);
  const language = useAppStore((state) => state.language);
  const isKu = language === "ku";
  
  const improveFn = useServerFn(improveBullet);
  const tailorFn = useServerFn(tailorToJob);
  const chatEditFn = useServerFn(chatEditResume);

  const [tailorOpen, setTailorOpen] = useState(false);
  const [visualEditOpen, setVisualEditOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [tailoring, setTailoring] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);
  const exportDropdownRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (exportDropdownRef.current && !exportDropdownRef.current.contains(e.target as Node)) {
        setExportDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // Chat interface state
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'assistant', content: string, snapshotId?: string}[]>([
    { role: 'assistant', content: isKu ? "سڵاو! دەتوانم یارمەتیت بدەم لە دەستکاریکردنی ئەم سیڤییە. پێم بڵێ دەتەوێت چی بگۆڕیت — یان داوام لێبکە هەر بەشێک سەرلەنوێ بنووسمەوە." : 'Hi! I can help you edit this resume. Tell me what you\'d like to change — or ask me to rewrite any section.' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Version history — every AI edit saves the previous state here
  const [history, setHistory] = useState<{id: string; label: string; timestamp: number; snapshot: ResumeData}[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Scan-reveal animation — plays once on first mount
  const [isRevealing, setIsRevealing] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setIsRevealing(false), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!resume) {
    return (
      <div className="page-shell flex min-h-[100dvh] items-center justify-center bg-background px-4 text-foreground">
        <div className="surface-panel max-w-md rounded-[2rem] p-8 text-center">
          <p className="text-muted-foreground">{isKu ? "ئەم ڕەشنووسی سیڤییە نەدۆزرایەوە." : "This resume draft could not be found."}</p>
          <button onClick={() => navigate({ to: "/onboarding" })} className="primary-button mt-6 px-5 py-3 text-sm font-medium">
            {isKu ? "سەرلەنوێ دەستپێبکەرەوە" : "Start over"}
          </button>
        </div>
      </div>
    );
  }

  const data = resume.data;
  const rtlResume = hasRTLText(data);

  const updateData = (patch: Partial<ResumeData>) =>
    updateResume(id, { data: { ...data, ...patch } });

  const setTemplate = (template: TemplateId) => updateResume(id, { template });

  const updateExperience = (index: number, patch: Partial<ExperienceItem>) => {
    const next = [...data.experience];
    next[index] = { ...next[index], ...patch };
    updateData({ experience: next });
  };

  const updateAchievement = (experienceIndex: number, achievementIndex: number, value: string) => {
    const next = [...data.experience];
    const achievements = [...next[experienceIndex].achievements];
    achievements[achievementIndex] = value;
    next[experienceIndex] = { ...next[experienceIndex], achievements };
    updateData({ experience: next });
  };

  const handleImprove = async (
    experienceIndex: number,
    achievementIndex: number,
    mode: "impact" | "technical" | "quantify" | "concise",
  ) => {
    const original = data.experience[experienceIndex].achievements[achievementIndex];
    toast.loading("Improving bullet", { id: "improve" });

    try {
      const { bullet } = await improveFn({
        data: { apiKey, bullet: original, jobTitle: data.title, mode },
      });
      updateAchievement(experienceIndex, achievementIndex, bullet);
      toast.success(isKu ? "خاڵەکە نوێکرایەوە" : "Bullet updated", { id: "improve" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : (isKu ? "باشترکردنی خاڵەکە سەرکەوتوو نەبوو." : "Failed to improve bullet."), { id: "improve" });
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
        data: { apiKey, resume: data, jobDescription },
      });
      updateData(tailored);
      toast.success(isKu ? "سیڤییەکە گونجێندرا لەگەڵ وەسفی کارەکە" : "Resume tailored to job description");
      setTailorOpen(false);
      setJobDescription("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : (isKu ? "گونجاندنی سیڤییەکە سەرکەوتوو نەبوو." : "Failed to tailor resume."));
    } finally {
      setTailoring(false);
    }
  };

  const getFilename = () => `${data.name.replace(/\s+/g, "_")}_${resume.title.slice(0, 30).replace(/\s+/g, "_")}`;

  const handleExport = async (format: "pdf" | "pdf-standard" | "docx" | "pptx" | "md") => {
    setExporting(true);
    setExportDropdownOpen(false);
    const filename = getFilename();
    try {
      if (rtlResume && format !== "pdf") {
        if (previewRef.current) {
          await exportPreviewAsPDF(previewRef.current, filename);
          toast.success(isKu ? "PDF پاشەکەوت کرا — ڕێک وەک پێشبینینەکە دەردەکەوێت" : "Canvas PDF saved — matches the preview");
        }
        return;
      }
      if (format === "pdf") {
        // Screenshot-based: captures exactly what you see, full resolution
        if (previewRef.current) {
          await exportPreviewAsPDF(previewRef.current, filename);
        } else {
          await exportResumePDF(data, resume.template, filename);
        }
        toast.success(isKu ? "PDF پاشەکەوت کرا — ڕێک وەک پێشبینینەکە دەردەکەوێت" : "PDF saved — looks exactly like the preview");
      } else if (format === "pdf-standard") {
        // Vector-based: smaller file size, crisp at any zoom
        await exportResumePDF(data, resume.template, filename);
        toast.success(isKu ? "PDF پاشەکەوت کرا" : "PDF saved");
      } else if (format === "docx") {
        await exportResumeDocx(data, resume.template, filename);
        toast.success(isKu ? "بەڵگەنامەی Word پاشەکەوت کرا" : "Word document saved");
      } else if (format === "pptx") {
        await exportResumePptx(data, filename);
        toast.success(isKu ? "پێشکەشکردنەکە پاشەکەوت کرا" : "Presentation saved");
      } else if (format === "md") {
        exportResumeMarkdown(data, filename);
        toast.success(isKu ? "Markdown پاشەکەوت کرا" : "Markdown saved");
      }
    } catch (error) {
      toast.error(isKu ? `هەناردەکردن سەرکەوتوو نەبوو: ${error instanceof Error ? error.message : String(error)}` : `Export failed: ${error instanceof Error ? error.message : String(error)}`);
      console.error(error);
    } finally {
      setExporting(false);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMsg = chatInput.trim();
    setChatInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setChatLoading(true);

    // Save snapshot BEFORE the edit so user can revert
    const snapshotId = crypto.randomUUID();
    const snapshot = { ...data, experience: data.experience.map(e => ({ ...e, achievements: [...e.achievements] })) };
    setHistory(prev => [{ id: snapshotId, label: userMsg.slice(0, 60), timestamp: Date.now(), snapshot }, ...prev]);

    try {
      const { resume: updatedResume, reply } = await chatEditFn({
        data: { apiKey, resume: data, userMessage: userMsg }
      });
      updateData(updatedResume);
      setMessages(prev => [...prev, { role: 'assistant', content: reply, snapshotId }]);
      toast.success(isKu ? "سیڤی نوێکرایەوە" : "Resume updated");
    } catch (error) {
      // Remove the snapshot if edit failed
      setHistory(prev => prev.filter(h => h.id !== snapshotId));
      toast.error(error instanceof Error ? error.message : (isKu ? "نوێکردنەوەی سیڤی سەرکەوتوو نەبوو." : "Failed to update resume."));
      setMessages(prev => [...prev, { role: 'assistant', content: isKu ? "کێشەیەکم بۆ دروست بوو. تکایە دووبارە هەوڵ بدەرەوە." : "I ran into an issue. Please try again." }]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleRevert = (snapshotId: string) => {
    const entry = history.find(h => h.id === snapshotId);
    if (!entry) return;
    updateData(entry.snapshot);
    toast.success(isKu ? "گەڕێندرایەوە بۆ وەشانی پێشووتر" : "Reverted to previous version");
  };

  return (
    <div className="page-shell bg-background text-foreground flex flex-col h-[100dvh] overflow-hidden">
      <header className="saas-nav flex-none">
        <div className="px-4 sm:px-6">
          <div className="flex flex-col gap-4 py-3 lg:h-16 lg:flex-row lg:items-center lg:justify-between lg:py-0">
            <div className="flex items-center gap-3">
              <Link to="/onboarding" className="flex items-center justify-center h-8 w-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center shadow-sm">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-bold tracking-tight text-slate-900 truncate max-w-[200px] sm:max-w-[300px]">{resume.title}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button onClick={() => setVisualEditOpen(true)} className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 border border-slate-200">
                <Edit3 className="h-3.5 w-3.5" />
                {isKu ? "دەستکاریکردنی بینراو" : "Visual Edit"}
              </button>
              
              <select
                value={resume.template}
                onChange={(e) => setTemplate(e.target.value as TemplateId)}
                className="rounded-lg border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 outline-none transition-colors hover:bg-slate-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="minimal">Minimal</option>
                <option value="executive">Executive</option>
                <option value="noir">Noir</option>
                <option value="apex">Apex</option>
                <option value="slate">Slate</option>
                <option value="cipher">Cipher</option>
                <option value="monolith">Monolith</option>
                <option value="pinnacle">Pinnacle</option>
                <option value="avant">Avant</option>
                <option value="vanguard">Vanguard</option>
                <option value="nexus">Nexus</option>
                <option value="orbit">Orbit</option>
                <option value="metric">Metric</option>
                <option value="prism">Prism</option>
                <option value="carbon">Carbon</option>
                <option value="atlas">Atlas</option>
                <option value="forge">Forge</option>
                <option value="zenith">Zenith</option>
                <option value="vector">Vector</option>
                <option value="new-sleek">NEW Sleek A4</option>
                <option value="new-professional">NEW Professional A4</option>
                <option value="new-academic">NEW Academic A4</option>
                <option value="ref-torres">NEW Torres Exact</option>
                <option value="ref-silva">NEW Silva Exact</option>
                <option value="ref-schumacher">NEW Schumacher Exact</option>
                <option value="ref-palmerston">NEW Palmerston Exact</option>
                <option value="ref-sanchez">NEW Sanchez Exact</option>
              </select>

              <button onClick={() => setTailorOpen(true)} className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-900 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5" />
                {isKu ? "گونجاندن" : "Tailor"}
              </button>

              {/* Export Dropdown */}
              <div className="relative" ref={exportDropdownRef}>
                <button
                  onClick={() => setExportDropdownOpen((v) => !v)}
                  disabled={exporting}
                  className="primary-button px-4 py-2 text-xs font-medium disabled:opacity-50 flex items-center gap-1.5"
                >
                  {exporting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
                  {isKu ? "هەناردەکردن" : "Export"}
                  <ChevronDown className={`h-3 w-3 transition-transform ${exportDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {exportDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white border-2 border-blue-100 rounded-xl shadow-xl z-50 overflow-hidden">
                    {/* PDF section */}
                    <div className="px-3 pt-2.5 pb-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">PDF</span>
                    </div>
                    <button
                      onClick={() => handleExport("pdf")}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-blue-900 hover:bg-blue-50 transition-colors"
                    >
                      <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                      <div className="text-left">
                        <div className="font-medium leading-tight">{rtlResume ? "Canvas PDF" : "Best Quality"}</div>
                        <div className="text-[10px] text-slate-400 leading-tight">{rtlResume ? "Best for Kurdish RTL" : "Matches preview exactly"}</div>
                      </div>
                    </button>
                    {!rtlResume && (
                      <>
                        <button
                          onClick={() => handleExport("pdf-standard")}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-blue-900 hover:bg-blue-50 transition-colors"
                        >
                          <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                          <div className="text-left">
                            <div className="font-medium leading-tight">Standard</div>
                            <div className="text-[10px] text-slate-400 leading-tight">Smaller file, vector text</div>
                          </div>
                        </button>
                        <div className="border-t border-blue-100 mx-2" />
                        <div className="px-3 pt-2.5 pb-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Other formats</span>
                        </div>
                        <button
                          onClick={() => handleExport("docx")}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-blue-900 hover:bg-blue-50 transition-colors"
                        >
                          <FileType className="w-4 h-4 text-blue-500" />
                          {isKu ? "بەڵگەنامەی Word" : "Word Document"}
                        </button>
                        <button
                          onClick={() => handleExport("pptx")}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-blue-900 hover:bg-blue-50 transition-colors"
                        >
                          <Presentation className="w-4 h-4 text-blue-500" />
                          {isKu ? "پێشکەشکردن" : "Presentation"}
                        </button>
                        <button
                          onClick={() => handleExport("md")}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-blue-900 hover:bg-blue-50 transition-colors"
                        >
                          <FileCode className="w-4 h-4 text-blue-500" />
                          {isKu ? "مارکداون" : "Markdown"}
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 grid lg:grid-cols-[380px_1fr] overflow-hidden">
        {/* Left pane: AI Chat */}
        <aside className="border-r-2 border-blue-200 shadow-md bg-white/50 backdrop-blur-md flex flex-col h-full relative z-10">
          {/* Header with history toggle */}
          <div className="px-4 py-3 border-b border-slate-100 bg-white flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold tracking-tight flex items-center gap-2">
                <Bot className="w-4 h-4 text-blue-600" />
                {isKu ? "یاریدەدەری زیرەکی دەستکرد" : "AI Resume Assistant"}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">{isKu ? "داوابکە هەر شتێک بگۆڕێت، یان وەشانی پێشوو هەڵبژێرە لە خوارەوە." : "Ask to change anything, or pick a past version below."}</p>
            </div>
            {history.length > 0 && (
              <button
                onClick={() => setShowHistory(v => !v)}
                className={`flex items-center gap-1 text-[11px] font-medium px-2.5 py-1.5 rounded-lg transition-colors ${
                  showHistory ? 'bg-blue-100 text-blue-700' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <Clock className="w-3 h-3" />
                {history.length} {isKu ? "وەشان" : `version${history.length !== 1 ? 's' : ''}`}
              </button>
            )}
          </div>

          {/* History panel */}
          {showHistory && history.length > 0 && (
            <div className="border-b border-slate-100 bg-slate-50/80 px-3 py-2 space-y-1 max-h-44 overflow-y-auto">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 px-1">{isKu ? "وەشانە پاشەکەوتکراوەکان" : "Saved versions"}</p>
              {history.map((h) => (
                <div key={h.id} className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 hover:bg-white transition-colors group">
                  <div className="min-w-0">
                    <p className="text-[12px] text-slate-700 truncate font-medium">{h.label}</p>
                    <p className="text-[10px] text-slate-400">{new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <button
                    onClick={() => handleRevert(h.id)}
                    className="shrink-0 flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded-md hover:bg-blue-50"
                  >
                    <RotateCcw className="w-3 h-3" /> {isKu ? "گێڕانەوە" : "Restore"}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ scrollbarWidth: 'thin', scrollbarColor: '#e2e8f0 transparent' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm shadow-blue-200">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                )}
                <div className="flex flex-col gap-1 max-w-[85%]">
                  <div className={`text-sm px-3.5 py-2.5 rounded-2xl leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-sm shadow-sm shadow-blue-200'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm'
                  }`}>
                    {msg.content}
                  </div>
                  {/* Inline revert button on AI messages that caused a change */}
                  {msg.role === 'assistant' && msg.snapshotId && (
                    <button
                      onClick={() => handleRevert(msg.snapshotId!)}
                      className="self-start flex items-center gap-1 text-[10.5px] font-medium text-slate-400 hover:text-blue-600 transition-colors ml-1"
                    >
                      <RotateCcw className="w-3 h-3" /> {isKu ? "گەڕانەوە لەم گۆڕانکارییە" : "Undo this change"}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm shadow-blue-200">
                  <Loader2 className="w-3 h-3 text-white animate-spin" />
                </div>
                <div className="flex gap-1.5 items-center px-4 py-3 rounded-2xl rounded-tl-sm bg-white border border-slate-200 shadow-sm">
                  {[0,1,2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: `${i*0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-100">
            <form onSubmit={handleChatSubmit} className="relative">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={isKu ? "پوختەی کارەکەم با بەهێزتر بێت..." : "Make my summary more executive..."}
                disabled={chatLoading}
                className="w-full bg-slate-50 border border-slate-200 rounded-full pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50 transition-all"
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || chatLoading}
                className="absolute right-1.5 top-1.5 bottom-1.5 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center disabled:bg-slate-200 disabled:text-slate-400 transition-colors"
              >
                <Send className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </form>
          </div>
        </aside>

        {/* Right pane: Full size Resume Preview with scan-reveal animation */}
        <section className="h-full w-full overflow-y-auto bg-slate-50/50 p-4 sm:p-8 flex justify-center items-start @container">
          {/* We ensure the resume is EXACTLY 794px wide, and scale it down if the container is smaller than that.
              This guarantees it looks like a real A4 paper on mobile and exports correctly. */}
          <div className="flex justify-center w-full max-w-[794px]">
            <div 
              ref={previewRef} 
              className="relative w-[794px] min-w-[794px] rounded-xl border-2 border-slate-200 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.25)] bg-white overflow-hidden origin-top"
              style={{ zoom: "min(1, calc(100cqw / 794))" }}
            >
              <ResumePreview data={data} template={resume.template} />
              {/* Scan-line reveal: slides up revealing the resume from top like AI writing it */}
              {isRevealing && (
                <div
                  className="absolute inset-0 pointer-events-none z-20"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 0%, transparent var(--reveal), white var(--reveal), white 100%)',
                    animation: 'resumeReveal 1.6s cubic-bezier(0.22,1,0.36,1) forwards',
                  } as React.CSSProperties}
                />
              )}
              <style>{`
                @keyframes resumeReveal {
                  from { --reveal: 0%; }
                  to   { --reveal: 100%; }
                }
                @property --reveal {
                  syntax: '<percentage>';
                  inherits: false;
                  initial-value: 0%;
                }
              `}</style>
            </div>
          </div>
        </section>
      </main>

      {/* Visual Edit Modal */}
      {visualEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 sm:p-6 backdrop-blur-sm overflow-y-auto">
          <div className="surface-panel w-full max-w-4xl rounded-[2rem] bg-white flex flex-col max-h-full overflow-hidden shadow-2xl">
            <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold tracking-tight">{isKu ? "دەستکاریکردنی بینراو" : "Visual Editor"}</h2>
                <p className="text-xs text-muted-foreground mt-1">{isKu ? "گۆڕانکاری ڕاستەوخۆ بکە لە بوارەکانی سیڤییەکەت." : "Make direct edits to your resume fields."}</p>
              </div>
              <button onClick={() => setVisualEditOpen(false)} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 grid gap-6">
              <Card title={isKu ? "سەرەوەی سیڤی" : "Header"}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label={isKu ? "ناو" : "Name"} value={data.name} onChange={(value) => updateData({ name: value })} />
                  <Input label={isKu ? "ناونیشان/پیشە" : "Title"} value={data.title} onChange={(value) => updateData({ title: value })} />
                  <Input label={isKu ? "ئیمەیڵ" : "Email"} value={data.email ?? ""} onChange={(value) => updateData({ email: value })} />
                  <Input label={isKu ? "تەلەفۆن" : "Phone"} value={data.phone ?? ""} onChange={(value) => updateData({ phone: value })} />
                  <Input label={isKu ? "شوێن" : "Location"} value={data.location ?? ""} onChange={(value) => updateData({ location: value })} />
                  <Input
                    label={isKu ? "لینکی وێنە (ئارەزوومەندانە)" : "Photo URL (optional)"}
                    value={data.photoUrl ?? ""}
                    onChange={(value) => updateData({ photoUrl: value })}
                  />
                </div>
              </Card>

              <Card title={isKu ? "پوختە" : "Summary"}>
                <textarea
                  value={data.summary}
                  onChange={(event) => updateData({ summary: event.target.value })}
                  rows={5}
                  className="field-input resize-y"
                />
              </Card>

              <Card title={isKu ? "لێهاتووییەکان" : "Skills"}>
                <div className="grid gap-3">
                  <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground px-1">
                    <span className="flex-1">{isKu ? "ناوی لێهاتوویی" : "Skill Name"}</span>
                    <span className="w-20 text-center" title="Level used for stars/bars (1-5)">{isKu ? "ئاست (١-٥)" : "Level (1-5)"}</span>
                    <span className="w-8"></span>
                  </div>
                  {data.skills.map((skill, i) => {
                    const item = data.skillItems?.[i] ?? { name: skill, level: (skill.length % 3) + 3 };
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <input
                          value={skill}
                          onChange={(e) => {
                            const newSkills = [...data.skills];
                            newSkills[i] = e.target.value;
                            const newItems = [...(data.skillItems || data.skills.map(s => ({ name: s, level: (s.length % 3) + 3 })))];
                            newItems[i].name = e.target.value;
                            updateData({ skills: newSkills, skillItems: newItems });
                          }}
                          className="field-input flex-1"
                        />
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={item.level}
                          onChange={(e) => {
                            const newItems = [...(data.skillItems || data.skills.map(s => ({ name: s, level: (s.length % 3) + 3 })))];
                            newItems[i].level = Number(e.target.value) || 1;
                            updateData({ skillItems: newItems });
                          }}
                          className="field-input w-20 text-center px-1"
                          title="Skill Level (1-5)"
                        />
                        <button
                          onClick={() => {
                            const newSkills = data.skills.filter((_, idx) => idx !== i);
                            const newItems = (data.skillItems || data.skills.map(s => ({ name: s, level: (s.length % 3) + 3 }))).filter((_, idx) => idx !== i);
                            updateData({ skills: newSkills, skillItems: newItems });
                          }}
                          className="ghost-button p-2 text-foreground hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                  <button
                    onClick={() => {
                      updateData({
                        skills: [...data.skills, "New Skill"],
                        skillItems: [...(data.skillItems || data.skills.map(s => ({ name: s, level: (s.length % 3) + 3 }))), { name: "New Skill", level: 3 }]
                      });
                    }}
                    className="ghost-button mt-2 px-4 py-2 text-sm text-foreground self-start border border-dashed border-slate-300"
                  >
                    <Plus className="h-4 w-4" />
                    {isKu ? "لێهاتوویی زیاد بکە" : "Add Skill"}
                  </button>
                </div>
              </Card>
              
              <Card title={isKu ? "ئەزموون" : "Experience"}>
                <div className="grid gap-6">
                  {data.experience.map((experience, experienceIndex) => (
                    <div key={`${experience.company}-${experienceIndex}`} className="surface-muted rounded-[1.6rem] p-5 border-2 border-blue-200 bg-blue-50/30">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Input
                          label={isKu ? "ڕۆڵ/کار" : "Role"}
                          value={experience.title}
                          onChange={(value) => updateExperience(experienceIndex, { title: value })}
                        />
                        <Input
                          label={isKu ? "کۆمپانیا" : "Company"}
                          value={experience.company}
                          onChange={(value) => updateExperience(experienceIndex, { company: value })}
                        />
                      </div>

                      <div className="mt-4">
                        <Input
                          label={isKu ? "ماوە" : "Duration"}
                          value={experience.duration}
                          onChange={(value) => updateExperience(experienceIndex, { duration: value })}
                        />
                      </div>

                      <div className="mt-5 space-y-3">
                        {experience.achievements.map((achievement, achievementIndex) => (
                          <div key={`${achievementIndex}-${achievement.slice(0, 12)}`} className="rounded-[1.3rem] bg-white p-4 shadow-sm border-2 border-blue-100">
                            <textarea
                              value={achievement}
                              onChange={(event) => updateAchievement(experienceIndex, achievementIndex, event.target.value)}
                              rows={3}
                              className="field-input min-h-[90px] resize-y border-transparent bg-transparent p-0 shadow-none focus:border-transparent focus:shadow-none"
                            />

                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                              <div className="flex flex-wrap gap-2">
                                {(["impact", "quantify", "concise"] as const).map((mode) => (
                                  <button
                                    key={mode}
                                    onClick={() => handleImprove(experienceIndex, achievementIndex, mode)}
                                    className="ghost-button px-3 py-2 text-xs text-foreground bg-slate-50 border border-slate-200"
                                  >
                                    <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                                    {mode}
                                  </button>
                                ))}
                              </div>

                              <button
                                onClick={() => {
                                  const next = [...data.experience];
                                  next[experienceIndex] = {
                                    ...next[experienceIndex],
                                    achievements: next[experienceIndex].achievements.filter((_, index) => index !== achievementIndex),
                                  };
                                  updateData({ experience: next });
                                }}
                                className="ghost-button px-3 py-2 text-xs text-red-500 hover:bg-red-50"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                {isKu ? "سڕینەوە" : "Remove"}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          const next = [...data.experience];
                          next[experienceIndex] = {
                            ...next[experienceIndex],
                            achievements: [...next[experienceIndex].achievements, isKu ? "خاڵێکی نوێی ئەزموون" : "New achievement"],
                          };
                          updateData({ experience: next });
                        }}
                        className="ghost-button mt-4 px-4 py-2 text-sm text-foreground bg-white border border-dashed border-slate-300"
                      >
                        <Plus className="h-4 w-4" />
                        {isKu ? "خاڵ زیاد بکە" : "Add bullet"}
                      </button>
                    </div>
                  ))}
                  
                  <button
                    onClick={() => {
                      updateData({ experience: [...data.experience, { title: "New Role", company: "Company", duration: "Present", achievements: [], description: "" }] });
                    }}
                    className="w-full ghost-button py-4 text-sm text-foreground border-2 border-dashed border-slate-200 hover:border-slate-300 rounded-[1.6rem]"
                  >
                    <Plus className="h-5 w-5 mb-1 mx-auto text-slate-400" />
                    {isKu ? "ئەزموون زیاد بکە" : "Add Experience"}
                  </button>
                </div>
              </Card>
            </div>
            
            <div className="p-4 sm:px-6 py-4 border-t border-slate-100 flex justify-end bg-slate-50">
              <button onClick={() => setVisualEditOpen(false)} className="primary-button px-6 py-2.5 text-sm font-medium">
                {isKu ? "تەواو" : "Done"}
              </button>
            </div>
          </div>
        </div>
      )}

      {tailorOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
          onClick={() => setTailorOpen(false)}
        >
          <div
            className="surface-panel w-full max-w-3xl rounded-[2rem] p-6 sm:p-8 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="eyebrow">{isKu ? "گونجاندنی کار" : "Job tailoring"}</div>
              <button onClick={() => setTailorOpen(false)} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">{isKu ? "وەسفی کارەکە دابنێ و سیڤییەکەت بە پێی ئەوە بگۆڕە." : "Paste the hiring brief and rewrite the draft against it."}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {isKu ? "ئەمە سیڤییەکە نوێ دەکاتەوە، بۆیە کاتێک بەکاری بهێنە کە ڕۆڵەکە ڕوون بێت." : "This operation updates the current resume draft, so use it when the target role is clear enough to justify a rewrite."}
            </p>

            <textarea
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              placeholder={isKu ? "وەسفی کارەکە لێرە دابنێ." : "Paste the full job description here."}
              rows={12}
              className="field-input mt-6 resize-y bg-slate-50 focus:bg-white"
            />

            <div className="mt-6 flex flex-col justify-end gap-3 sm:flex-row">
              <button onClick={() => setTailorOpen(false)} className="ghost-button px-5 py-3 text-sm text-foreground border border-slate-200">
                {isKu ? "پاشگەزبوونەوە" : "Cancel"}
              </button>
              <button onClick={handleTailor} disabled={tailoring} className="primary-button px-6 py-3 text-sm font-medium disabled:opacity-50">
                {tailoring ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                {isKu ? "گونجاندنی سیڤی" : "Tailor resume"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="surface-panel rounded-[1.5rem] p-6">
      <div className="eyebrow">{title}</div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-foreground">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="field-input bg-slate-50 focus:bg-white" />
    </label>
  );
}
