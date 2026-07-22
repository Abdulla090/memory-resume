import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Languages, Minus, Plus } from "lucide-react";
import { type RefObject, useEffect, useState } from "react";
import type { ResumeData, TemplateId, DesignSettings } from "@/lib/types";
import { ExportButtons, ClientPDFPreview } from "@/components/resume/editor-helpers";
import type { UpdateDataFn } from "@/components/resume/DesignContext";
import { useMobileOptimized } from "@/lib/performance";

interface EditorPreviewPanelProps {
  show: boolean;
  mode?: "overlay" | "inline";
  onClose: () => void;
  isKu: boolean;
  previewLayoutRtl: boolean;
  setPreviewLayoutRtl: (fn: (v: boolean) => boolean) => void;
  zoom: number;
  setZoom: (fn: (z: number) => number) => void;
  previewData: ResumeData;
  template: TemplateId;
  design: DesignSettings;
  updateData: UpdateDataFn;
  onSectionClick: (s: string, path?: string, e?: React.MouseEvent) => void;
  previewRef: RefObject<HTMLDivElement | null>;
  isDesignMode?: boolean;
}

export function EditorPreviewPanel({
  show,
  mode = "overlay",
  onClose,
  isKu,
  previewLayoutRtl,
  setPreviewLayoutRtl,
  zoom,
  setZoom,
  previewData,
  template,
  design,
  updateData,
  onSectionClick,
  previewRef,
  isDesignMode,
}: EditorPreviewPanelProps) {
  const [isReady] = useState(true);
  const mobileOptimized = useMobileOptimized();

  useEffect(() => {
    if (show && mode === "overlay" && mobileOptimized && zoom > 1) {
      setZoom(() => 1);
    }
  }, [mobileOptimized, mode, setZoom, show, zoom]);

  // ── Flat editorial toolbar ─────────────────────────────────────────────────
  const toolbar = (
    <div className="shrink-0 flex items-center gap-2 px-4 h-11 border-b border-slate-200 bg-white">
      {mode === "overlay" && (
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 h-7 px-2.5 rounded-md text-[12px] font-medium text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <MessageSquare className="size-3.5" />
          <span>{isKu ? "چات" : "Chat"}</span>
        </button>
      )}

      <div className="flex items-center gap-1.5">
        <div className="size-1.5 rounded-full bg-emerald-500" />
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
          {isKu ? "زیندوو" : "Live"}
        </span>
      </div>

      <div className="flex-1" />

      {/* RTL / LTR toggle — segmented */}
      <div className="hidden sm:flex items-center h-7 rounded-md border border-slate-200 bg-slate-50 p-0.5 text-[11px] font-medium">
        <button
          onClick={() => previewLayoutRtl && setPreviewLayoutRtl(() => false)}
          className={`h-6 px-2 rounded-[5px] transition-colors ${
            !previewLayoutRtl ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          LTR
        </button>
        <button
          onClick={() => !previewLayoutRtl && setPreviewLayoutRtl(() => true)}
          className={`h-6 px-2 rounded-[5px] transition-colors ${
            previewLayoutRtl ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          RTL
        </button>
      </div>
      <button
        onClick={() => setPreviewLayoutRtl((v) => !v)}
        className="sm:hidden flex items-center justify-center size-7 rounded-md hover:bg-slate-100 text-slate-600"
        title={previewLayoutRtl ? "LTR" : "RTL"}
      >
        <Languages className="size-3.5" />
      </button>

      {/* Zoom */}
      <div className="flex items-center h-7 rounded-md border border-slate-200 bg-slate-50">
        <button
          onClick={() => setZoom((z) => Math.max(0.4, z - 0.1))}
          className="size-7 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-l-md transition-colors"
          title="Zoom out"
        >
          <Minus className="size-3" />
        </button>
        <span className="px-1.5 text-[11px] font-medium text-slate-700 tabular-nums min-w-[38px] text-center">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => setZoom((z) => Math.min(2, z + 0.1))}
          className="size-7 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-r-md transition-colors"
          title="Zoom in"
        >
          <Plus className="size-3" />
        </button>
      </div>

      <div className="w-px h-5 bg-slate-200" />

      <div className="shrink-0">
        <ExportButtons
          data={previewData}
          template={template}
          name={previewData.name}
          previewRef={previewRef}
          design={design}
        />
      </div>
    </div>
  );

  const canvas = (
    <div className="flex-1 min-h-0 overflow-hidden p-3 sm:p-6 bg-[#f6f7f9]">
      <div
        data-cv-canvas
        className="cv-canvas relative h-full w-full rounded-lg overflow-hidden bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_28px_-12px_rgba(15,23,42,0.18)] ring-1 ring-slate-200/70"
      >
        {isReady ? (
          <ClientPDFPreview
            data={previewData}
            template={template}
            previewRef={previewRef}
            zoom={zoom}
            design={design}
            updateData={updateData}
            layoutRtl={previewLayoutRtl}
            onSectionClick={(s, path, e) => onSectionClick(s, path, e)}
            isDesignMode={isDesignMode}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50/50">
            <div className="size-8 rounded-full border-2 border-slate-300 border-t-blue-600 animate-spin" />
          </div>
        )}
      </div>
    </div>
  );

  if (mode === "inline") {
    return (
      <div className="relative flex h-full min-h-0 w-full flex-col rounded-xl bg-white ring-1 ring-slate-200 overflow-hidden">
        {toolbar}
        {canvas}
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
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-slate-900/40 z-[60]"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-x-0 bottom-0 top-[4vh] z-[70] flex flex-col bg-white rounded-t-2xl overflow-hidden md:top-0 md:right-0 md:left-auto md:w-full md:max-w-2xl md:rounded-none md:rounded-l-2xl"
          >
            {/* Mobile grab handle */}
            <div className="md:hidden flex justify-center pt-2 pb-1">
              <div className="h-1 w-10 rounded-full bg-slate-300" />
            </div>
            {toolbar}
            {canvas}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
