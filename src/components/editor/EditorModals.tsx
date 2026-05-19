import { AnimatePresence, motion } from "framer-motion";
import { X, Target, Sparkles, Loader2, FileText, LayoutTemplate, CheckCircle2, Bot } from "lucide-react";
import type { ResumeData, TemplateId, DesignSettings } from "@/lib/types";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { isMultilinePath, getValueAtPath } from "@/components/resume/editor-helpers";
import type { Category } from "./editor.constants";

interface BaseModalProps {
  isKu: boolean;
}

interface TailorModalProps extends BaseModalProps {
  open: boolean;
  onClose: () => void;
  jobDescription: string;
  setJobDescription: (v: string) => void;
  tailoring: boolean;
  onTailor: () => void;
}

export function TailorModal({
  open,
  onClose,
  jobDescription,
  setJobDescription,
  tailoring,
  onTailor,
  isKu,
}: TailorModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/70 md:bg-slate-900/60 md:backdrop-blur-sm z-[200] flex items-center justify-center p-4"
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
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="perf-scroll p-6 flex-1 overflow-y-auto">
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
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
              >
                {isKu ? "پاشگەزبوونەوە" : "Cancel"}
              </button>
              <button
                onClick={onTailor}
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
    </AnimatePresence>
  );
}

interface CoverLetterModalProps extends BaseModalProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  content: string;
}

export function CoverLetterModal({ open, onClose, loading, content, isKu }: CoverLetterModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/70 md:bg-slate-900/60 md:backdrop-blur-sm z-[200] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-[2rem] w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white/95 md:bg-white/50 md:backdrop-blur-md">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                {isKu ? "نامەی داواکاری (Cover Letter)" : "Cover Letter"}
              </h3>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="perf-scroll p-6 bg-slate-50/50 max-h-[60vh] overflow-y-auto">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                  <p className="text-sm font-medium text-slate-500">
                    {isKu ? "لە دروستکردندایە بە زیرەکی دەستکرد..." : "Generating with AI..."}
                  </p>
                </div>
              ) : (
                <div className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed font-medium bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  {content || (isKu ? "هیچ نەدۆزرایەوە." : "Nothing generated yet.")}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface TemplateModalProps extends BaseModalProps {
  open: boolean;
  onClose: () => void;
  templates: { id: TemplateId; label: string; desc: string; category: Category; isNew?: boolean }[];
  categories: Category[];
  filter: Category;
  setFilter: (c: Category) => void;
  activeTemplate: TemplateId;
  design: DesignSettings;
  resumeData: ResumeData;
  onSelect: (id: TemplateId) => void;
}

export function TemplateModal({
  open,
  onClose,
  templates,
  categories,
  filter,
  setFilter,
  activeTemplate,
  design,
  resumeData,
  onSelect,
  isKu,
}: TemplateModalProps) {
  const filtered = filter === "All" ? templates : templates.filter((t) => t.category === filter);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/70 md:bg-slate-900/60 md:backdrop-blur-sm z-[200] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-[2rem] w-full max-w-5xl h-[90vh] overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white/95 md:bg-white/50 md:backdrop-blur-md">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <LayoutTemplate className="w-5 h-5 text-purple-600" />
                {isKu ? "هەڵبژاردنی نەخشە" : "Template Library"}
              </h3>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden flex flex-col bg-slate-50/50">
              <div className="p-4 overflow-x-auto scrollbar-hide shrink-0 border-b border-slate-100 bg-white">
                <div className="flex items-center gap-2 max-w-full">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${filter === cat ? "bg-slate-800 text-white shadow-sm" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="perf-scroll flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {filtered.map(({ id: templateId, label, isNew }) => {
                    const isActive = activeTemplate === templateId;
                    return (
                      <button
                        key={templateId}
                        onClick={() => {
                          onSelect(templateId);
                          onClose();
                        }}
                        className={`group relative flex flex-col items-center gap-3 rounded-[1.5rem] p-3 transition-all duration-300 text-center ${isActive ? "bg-blue-600 shadow-[0_8px_20px_rgba(37,99,235,0.2)] border-transparent scale-[1.02] ring-2 ring-blue-600 ring-offset-2" : "bg-white hover:bg-blue-50/50 border border-slate-200 hover:border-blue-200 hover:shadow-md"}`}
                      >
                        <div className="w-full aspect-[1/1.2] rounded-xl overflow-hidden relative shadow-[0_2px_10px_rgba(0,0,0,0.05)] bg-slate-100 border border-slate-100/50">
                          <div className="absolute inset-0 bg-white overflow-hidden flex items-start justify-center">
                            <div
                              className="origin-top pointer-events-none mt-2"
                              style={{ width: "794px", height: "1123px", zoom: 0.2 }}
                            >
                              <ResumePreview
                                data={resumeData}
                                template={templateId}
                                design={design}
                              />
                            </div>
                          </div>
                          {isActive && (
                            <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center md:backdrop-blur-[1px] z-10">
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
    </AnimatePresence>
  );
}

interface ATSModalProps extends BaseModalProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  score: number | null;
  feedback: string[];
}

export function ATSModal({ open, onClose, loading, score, feedback, isKu }: ATSModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/70 md:bg-slate-900/60 md:backdrop-blur-sm z-[200] flex items-center justify-center p-4"
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
                onClick={onClose}
                className="p-2 text-emerald-600 hover:text-emerald-900 hover:bg-emerald-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden bg-white">
              <AnimatePresence mode="wait">
                {loading ? (
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
                          animate={{ strokeDashoffset: 300 - (300 * (score ?? 0)) / 100 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                      </svg>
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="text-4xl font-extrabold text-slate-800"
                      >
                        {score}
                      </motion.span>
                    </div>
                    <div className="w-full space-y-3">
                      {feedback.map((fb, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + idx * 0.15 }}
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
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-xl shadow-[0_4px_12px_rgba(16,185,129,0.3)] transition-all"
              >
                {isKu ? "داخستن" : "Awesome!"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface InlineEditModalProps {
  inlineEdit: { path: string; value: string; section: string } | null;
  setInlineEdit: (v: { path: string; value: string; section: string } | null) => void;
  updateData: (path: string, value: unknown) => void;
  data: ResumeData;
}

export function InlineEditModal({
  inlineEdit,
  setInlineEdit,
  updateData,
  data,
}: InlineEditModalProps) {
  if (!inlineEdit) return null;
  return (
    <div
      className="fixed inset-0 z-[250] bg-slate-950/40 md:bg-slate-950/30 md:backdrop-blur-[2px] p-4 flex items-start justify-center pt-24"
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
              onChange={(e) => setInlineEdit({ ...inlineEdit, value: e.target.value })}
              className="h-44 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-blue-500 focus:bg-white resize-none"
            />
          ) : (
            <input
              autoFocus
              value={inlineEdit.value}
              onChange={(e) => setInlineEdit({ ...inlineEdit, value: e.target.value })}
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
  );
}
