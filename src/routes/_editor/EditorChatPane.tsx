import { AnimatePresence, motion } from "framer-motion";
import { Bot, Loader2, RotateCcw, Plus, MoreHorizontal, Mic, ArrowUp, Clock, CheckCircle2, Wand2, LayoutTemplate, FileText } from "lucide-react";
import { type RefObject, useState, useRef, useEffect } from "react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  snapshotId?: string;
}

interface HistoryItem {
  id: string;
  label: string;
  timestamp: number;
}

interface EditorChatPaneProps {
  isKu: boolean;
  messages: ChatMessage[];
  chatLoading: boolean;
  chatInput: string;
  setChatInput: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isRecording: boolean;
  setIsRecording: (fn: (r: boolean) => boolean) => void;
  history: HistoryItem[];
  showHistory: boolean;
  setShowHistory: (fn: (v: boolean) => boolean) => void;
  onRevert: (id: string) => void;
  messagesEndRef: RefObject<HTMLDivElement | null>;
  onCheckATS: () => void;
  onFixErrors: () => void;
  onOpenTemplates: () => void;
  onGenerateCoverLetter: () => void;
}

export function EditorChatPane({
  isKu, messages, chatLoading, chatInput, setChatInput, onSubmit,
  isRecording, setIsRecording, history, showHistory, setShowHistory,
  onRevert, messagesEndRef, onCheckATS, onFixErrors, onOpenTemplates, onGenerateCoverLetter
}: EditorChatPaneProps) {
  const chips = [
    { label: "Stronger bullets", prompt: "Make my bullet points stronger and more impactful." },
    { label: "Add metrics", prompt: "Add quantified metrics to my experience." },
    { label: "Shorten summary", prompt: "Shorten the summary to 2 sentences." },
    { label: "Tailor for job", prompt: "Tailor my resume for the job target." },
  ];

  const [showTools, setShowTools] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setShowTools(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative flex flex-col flex-1 min-h-0 rounded-3xl bg-white/70 shadow-[0_8px_40px_-12px_rgba(15,23,42,0.15),0_0_0_1px_rgba(255,255,255,0.8)] backdrop-blur-sm">

      {/* Header */}
      <div className="shrink-0 flex items-center justify-between px-5 pt-4 pb-3 border-b border-slate-100/80">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
            <Bot className="size-3.5 text-white" />
          </div>
          <span className="text-[14px] font-bold text-slate-800">{isKu ? "ژیاری دەستکرد" : "AI Assistant"}</span>
          {chatLoading && <Loader2 className="size-3.5 text-blue-500 animate-spin" />}
        </div>
        {history.length > 0 && (
          <button onClick={() => setShowHistory((v) => !v)}
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
              <button onClick={() => onRevert(h.id)}
                className="shrink-0 flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-bold text-blue-600 opacity-0 group-hover:opacity-100 hover:bg-blue-50 transition-all">
                <RotateCcw className="size-3" />{isKu ? "گێڕانەوە" : "Restore"}
              </button>
            </div>
          ))}
        </div>
      )}

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
                {msg.role === "assistant" && msg.snapshotId && (
                  <div className="flex items-center gap-2">
                    <button onClick={() => onRevert(msg.snapshotId!)}
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
              {[0, 1, 2].map((i) => <span key={i} className="size-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion chips */}
      <div className="shrink-0 px-4 pb-2 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {chips.map((chip) => (
          <button key={chip.label} onClick={() => setChatInput(chip.prompt)}
            className="whitespace-nowrap shrink-0 px-3.5 py-2 rounded-full text-[12px] font-semibold text-slate-600 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.07),0_1px_0_rgba(255,255,255,0.9)_inset] border border-white/60 hover:shadow-[0_3px_10px_rgba(0,0,0,0.1)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.07)] transition-all duration-150">
            {chip.label}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <div className="shrink-0 px-4 pb-4 pt-2">
        <div className="relative rounded-[22px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.9)_inset,0_0_0_1px_rgba(15,23,42,0.06)]">
          <form onSubmit={onSubmit}>
            <textarea
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={isKu ? "داوا لە زیاری دەستکرد بکە..." : "Ask AI..."}
              disabled={chatLoading}
              rows={2}
              className="w-full bg-transparent px-5 pt-4 pb-2 text-[14px] font-medium text-slate-800 outline-none placeholder:text-slate-400 resize-none scrollbar-hide"
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSubmit(e as unknown as React.FormEvent); } }}
            />
            <div className="flex items-center justify-between px-3 pb-3 pt-1">
              <div className="flex items-center gap-1.5">
                <button type="button" className="size-9 rounded-full flex items-center justify-center bg-white text-slate-500 shadow-[0_2px_8px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.9)_inset,0_0_0_1px_rgba(0,0,0,0.06)] hover:shadow-[0_3px_12px_rgba(0,0,0,0.13)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] transition-all duration-150">
                  <Plus className="size-4" />
                </button>
                <div className="relative" ref={toolsRef}>
                  <button type="button" onClick={() => setShowTools(!showTools)} className={`size-9 rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.9)_inset,0_0_0_1px_rgba(0,0,0,0.06)] hover:shadow-[0_3px_12px_rgba(0,0,0,0.13)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] transition-all duration-150 ${showTools ? "bg-slate-100 text-blue-600" : "bg-white text-slate-500"}`}>
                    <MoreHorizontal className="size-4" />
                  </button>
                  <AnimatePresence>
                    {showTools && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="absolute bottom-full mb-3 left-0 bg-white/90 backdrop-blur-xl border border-white shadow-[0_8px_32px_rgba(15,23,42,0.16)] rounded-[24px] p-2 flex flex-col gap-1 w-52 z-[100] origin-bottom-left"
                      >
                        <button type="button" onClick={() => { onCheckATS(); setShowTools(false); }} className="flex items-center gap-3 px-3 py-2.5 rounded-[16px] hover:bg-slate-100/80 transition-colors text-left group">
                          <div className="size-8 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors text-emerald-600"><CheckCircle2 className="size-4" /></div>
                          <span className="text-[13px] font-semibold text-slate-700">{isKu ? "پشکنینی ATS" : "ATS Score"}</span>
                        </button>
                        <button type="button" onClick={() => { onFixErrors(); setShowTools(false); }} className="flex items-center gap-3 px-3 py-2.5 rounded-[16px] hover:bg-slate-100/80 transition-colors text-left group">
                          <div className="size-8 rounded-full bg-amber-100 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors text-amber-600"><Wand2 className="size-4" /></div>
                          <span className="text-[13px] font-semibold text-slate-700">{isKu ? "چاک بکە" : "Auto-Fix"}</span>
                        </button>
                        <button type="button" onClick={() => { onOpenTemplates(); setShowTools(false); }} className="flex items-center gap-3 px-3 py-2.5 rounded-[16px] hover:bg-slate-100/80 transition-colors text-left group">
                          <div className="size-8 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors text-purple-600"><LayoutTemplate className="size-4" /></div>
                          <span className="text-[13px] font-semibold text-slate-700">{isKu ? "نەخشە" : "Templates"}</span>
                        </button>
                        <button type="button" onClick={() => { onGenerateCoverLetter(); setShowTools(false); }} className="flex items-center gap-3 px-3 py-2.5 rounded-[16px] hover:bg-slate-100/80 transition-colors text-left group">
                          <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors text-blue-600"><FileText className="size-4" /></div>
                          <span className="text-[13px] font-semibold text-slate-700">{isKu ? "کەڤەر لێتەر" : "Cover Letter"}</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button type="button"
                  onClick={() => setIsRecording((r) => !r)}
                  className={`size-9 rounded-full flex items-center justify-center transition-all duration-150 ${
                    isRecording
                      ? "bg-red-500 text-white shadow-[0_4px_12px_rgba(239,68,68,0.4)] scale-105"
                      : "bg-white text-slate-500 shadow-[0_2px_8px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.9)_inset,0_0_0_1px_rgba(0,0,0,0.06)] hover:shadow-[0_3px_12px_rgba(0,0,0,0.13)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
                  }`}>
                  <Mic className="size-4" />
                </button>
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
  );
}
