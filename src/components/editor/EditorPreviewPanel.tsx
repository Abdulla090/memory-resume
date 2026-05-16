import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Languages } from "lucide-react";
import { type RefObject, useEffect, useState } from "react";
import type { ResumeData, TemplateId, DesignSettings } from "@/lib/types";
import { ExportButtons, ClientPDFPreview } from "@/components/resume/editor-helpers";
import type { UpdateDataFn } from "@/components/resume/DesignContext";

interface EditorPreviewPanelProps {
  show: boolean;
  mode?: "overlay" | "inline";
  onClose: () => void;
  isKu: boolean;
  soraniMode: boolean;
  setSoraniMode: (fn: (v: boolean) => boolean) => void;
  zoom: number;
  setZoom: (fn: (z: number) => number) => void;
  previewData: ResumeData;
  template: TemplateId;
  design: DesignSettings;
  updateData: UpdateDataFn;
  onSectionClick: (s: string, path?: string) => void;
  previewRef: RefObject<HTMLDivElement | null>;
}

export function EditorPreviewPanel({
  show,
  mode = "overlay",
  onClose,
  isKu,
  soraniMode,
  setSoraniMode,
  zoom,
  setZoom,
  previewData,
  template,
  design,
  updateData,
  onSectionClick,
  previewRef,
}: EditorPreviewPanelProps) {
  const [isReady, setIsReady] = useState(mode === "inline");

  useEffect(() => {
    if (mode === "inline") setIsReady(true);
  }, [mode]);

  const chrome = (
    <>
      <div className="shrink-0 flex items-center gap-1.5 px-3 py-2.5 border-b border-slate-200/60 bg-white/90 flex-wrap">
        {mode === "overlay" && (
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[12px] font-bold text-slate-700 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,0.9)_inset] border border-white/60 hover:shadow-[0_3px_10px_rgba(0,0,0,0.1)] active:scale-[0.97] transition-all"
          >
            <MessageSquare className="size-3.5" />
            <span>{isKu ? "چات" : "Chat"}</span>
          </button>
        )}

        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 border border-emerald-100">
          <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
            Live
          </span>
        </div>

        <div className="flex-1" />

        <button
          onClick={() => setSoraniMode((v) => !v)}
          title={soraniMode ? "Switch to English" : "Kurdish RTL"}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
            soraniMode
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-600 shadow-[0_2px_6px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,0.9)_inset] border border-white/60"
          } active:scale-[0.97]`}
        >
          <Languages className="size-3.5" />
          <span className="hidden sm:inline text-[11px]">{soraniMode ? "RTL" : "EN"}</span>
        </button>

        <div className="flex items-center rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.06)] overflow-hidden">
          <button
            onClick={() => setZoom((z) => Math.max(0.4, z - 0.1))}
            className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors font-bold text-base"
            title="Zoom out"
          >
            −
          </button>
          <span className="px-1.5 text-[11px] font-bold text-slate-700 tabular-nums min-w-[36px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.min(2, z + 0.1))}
            className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors font-bold text-base"
            title="Zoom in"
          >
            +
          </button>
        </div>

        <div className="shrink-0">
          <ExportButtons
            data={previewData}
            template={template}
            name={previewData.name}
            previewRef={previewRef}
          />
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden p-2 sm:p-6 relative">
        <div className="relative h-full w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(15,23,42,0.14),0_0_0_1px_rgba(15,23,42,0.06)] bg-white">
          {isReady ? (
            <ClientPDFPreview
              data={previewData}
              template={template}
              previewRef={previewRef}
              zoom={zoom}
              design={design}
              updateData={updateData}
              onSectionClick={onSectionClick}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-50/50">
              <div className="size-8 rounded-full border-2 border-slate-300 border-t-blue-600 animate-spin" />
            </div>
          )}
        </div>
      </div>
    </>
  );

  if (mode === "inline") {
    return (
      <div className="relative flex h-full min-h-0 w-full flex-col rounded-3xl bg-white/70 shadow-[0_8px_40px_-12px_rgba(15,23,42,0.15),0_0_0_1px_rgba(255,255,255,0.8)] backdrop-blur-sm">
        {chrome}
      </div>
    );
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-[2px] z-[60]"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onAnimationComplete={() => setIsReady(true)}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-2xl flex flex-col"
            style={{
              background: "rgba(248,250,252,0.97)",
              backdropFilter: "blur(24px)",
              boxShadow: "-20px 0 60px rgba(15,23,42,0.15)",
            }}
          >
            {chrome}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
