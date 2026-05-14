/* eslint-disable react-refresh/only-export-components */
import type { RefObject } from "react";
import type { DesignSettings, ResumeData, TemplateId } from "@/lib/types";
import type { SectionId } from "@/components/DesignPanel";
import { exportPreviewAsPDF } from "@/lib/pdf-screenshot";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { UpdateDataContext, type UpdateDataFn } from "@/components/resume/DesignContext";
import { Download, FileText, ChevronDown } from "lucide-react";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { toast } from "sonner";

const rtlTextPattern = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/;

export function hasRTLText(data: ResumeData) {
  return rtlTextPattern.test(
    [
      data.name,
      data.title,
      data.location,
      data.summary,
      ...data.skills,
      ...data.certifications,
      ...data.experience.flatMap((item) => [
        item.title,
        item.company,
        item.description,
        ...item.achievements,
      ]),
      ...data.projects.flatMap((item) => [item.name, item.description, item.impact, ...item.tech]),
      ...data.education.flatMap((item) => [item.degree, item.institution]),
    ]
      .filter(Boolean)
      .join(" "),
  );
}

export function normalizeText(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

export function inferSectionFromPath(path: string): SectionId {
  if (path.startsWith("experience")) return "experience";
  if (path.startsWith("education")) return "education";
  if (path.startsWith("projects")) return "projects";
  if (path.startsWith("certifications")) return "certifications";
  if (path.startsWith("skills") || path.startsWith("skillItems")) return "skills";
  if (path.startsWith("languages")) return "languages";
  if (
    path.startsWith("photoUrl") ||
    path.startsWith("name") ||
    path.startsWith("title") ||
    path.startsWith("email") ||
    path.startsWith("phone") ||
    path.startsWith("location")
  )
    return "header";
  return "summary";
}

export function isMultilinePath(path: string) {
  return /summary|description|achievements|impact/i.test(path);
}

export function getValueAtPath(data: ResumeData, path: string) {
  const parts = path.split(".");
  let current: unknown = data;
  for (const part of parts) {
    if (current == null) return "";
    if (typeof current !== "object") return "";
    current = (current as Record<string, unknown>)[
      Number.isFinite(Number(part)) ? Number(part) : part
    ];
  }
  return typeof current === "string" ? current : current == null ? "" : String(current);
}

export function findFieldMatch(
  data: ResumeData,
  text: string,
): { path: string; value: string } | null {
  const target = normalizeText(text);
  if (!target) return null;

  const segments = target.split(/\s+/).filter((segment) => segment.length >= 3);

  const candidates: Array<{ path: string; value: string }> = [
    { path: "name", value: data.name },
    { path: "title", value: data.title },
    { path: "summary", value: data.summary },
    ...(data.location ? [{ path: "location", value: data.location }] : []),
    ...(data.email ? [{ path: "email", value: data.email }] : []),
    ...(data.phone ? [{ path: "phone", value: data.phone }] : []),
    ...(data.photoUrl ? [{ path: "photoUrl", value: data.photoUrl }] : []),
    ...data.skills.map((value, index) => ({ path: `skills.${index}`, value })),
    ...data.certifications.map((value, index) => ({ path: `certifications.${index}`, value })),
    ...(data.languages || []).map((value, index) => ({ path: `languages.${index}`, value })),
    ...data.experience.flatMap((item, index) => [
      { path: `experience.${index}.title`, value: item.title },
      { path: `experience.${index}.company`, value: item.company },
      { path: `experience.${index}.duration`, value: item.duration },
      { path: `experience.${index}.description`, value: item.description },
      ...item.achievements.map((value, aIdx) => ({
        path: `experience.${index}.achievements.${aIdx}`,
        value,
      })),
    ]),
    ...data.projects.flatMap((item, index) => [
      { path: `projects.${index}.name`, value: item.name },
      { path: `projects.${index}.description`, value: item.description },
      { path: `projects.${index}.impact`, value: item.impact },
      ...item.tech.map((value, tIdx) => ({ path: `projects.${index}.tech.${tIdx}`, value })),
    ]),
    ...data.education.flatMap((item, index) => [
      { path: `education.${index}.degree`, value: item.degree },
      { path: `education.${index}.institution`, value: item.institution },
      { path: `education.${index}.year`, value: item.year },
    ]),
    ...(data.skillItems || []).map((item, index) => ({
      path: `skillItems.${index}.name`,
      value: item.name,
    })),
  ];

  const exact = candidates.find((candidate) => normalizeText(candidate.value) === target);
  if (exact) return exact;

  const scored = candidates
    .map((candidate) => {
      const value = normalizeText(candidate.value);
      if (value.length < 3) return null;
      let score = 0;
      if (value.includes(target) || target.includes(value)) score += 10;
      for (const segment of segments) {
        if (value.includes(segment)) score += Math.min(3, segment.length);
      }
      if (candidate.path === "name" || candidate.path === "title" || candidate.path === "summary") {
        score += 1;
      }
      return score > 0 ? { ...candidate, score } : null;
    })
    .filter(Boolean)
    .sort((a, b) => b!.score - a!.score || a!.path.length - b!.path.length) as Array<{
    path: string;
    value: string;
    score: number;
  }>;

  return scored[0] ? { path: scored[0].path, value: scored[0].value } : null;
}

export function ExportButtons({
  data,
  template,
  name,
  previewRef,
}: {
  data: ResumeData;
  template: TemplateId;
  name: string;
  previewRef: RefObject<HTMLDivElement | null>;
}) {
  const [pdfLoading, setPdfLoading] = useState(false);
  const [vectorLoading, setVectorLoading] = useState(false);
  const [docxLoading, setDocxLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const filename = name.replace(/\s+/g, "_") || "resume";

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  const handlePDF = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(false);
    setPdfLoading(true);
    try {
      if (previewRef.current) {
        await exportPreviewAsPDF(previewRef.current, filename);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate PDF");
    } finally {
      setPdfLoading(false);
    }
  };

  const handleVectorPDF = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(false);
    setVectorLoading(true);
    try {
      const { exportResumePDF } = await import("@/components/resume/pdf-templates");
      await exportResumePDF(data, template, filename);
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate Vector PDF");
    } finally {
      setVectorLoading(false);
    }
  };

  const handleDocx = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(false);
    setDocxLoading(true);
    try {
      const { exportResumeDocx } = await import("@/components/resume/docx-templates");
      await exportResumeDocx(data, template, filename);
    } finally {
      setDocxLoading(false);
    }
  };

  const anyLoading = pdfLoading || vectorLoading || docxLoading;

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        disabled={anyLoading}
        className="flex items-center gap-1.5 px-4 py-2.5 sm:py-1.5 rounded-xl sm:rounded-full bg-blue-600 backdrop-blur-md border border-blue-500 text-xs font-bold tracking-wide text-white shadow-sm hover:bg-blue-700 hover:shadow-md transition-all disabled:opacity-50"
      >
        <Download className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
        <span className="hidden sm:inline">{anyLoading ? "Exporting..." : "Download"}</span>
        <span className="sm:hidden font-bold">{anyLoading ? "..." : "Save"}</span>
        <ChevronDown className={`w-4 h-4 sm:w-3 sm:h-3 ml-0.5 opacity-80 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[220px] bg-white border border-slate-200 rounded-xl shadow-[0_8px_40px_rgba(15,23,42,0.14)] overflow-hidden z-[100] flex flex-col p-1.5 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
          <button
            onClick={handlePDF}
            className="flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors text-left group"
          >
            <span>PDF (Canvas)</span>
            <span className="text-[10px] text-slate-400 font-normal group-hover:text-blue-400">All Langs</span>
          </button>
          <button
            onClick={handleVectorPDF}
            className="flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors text-left group"
          >
            <span>PDF (Vector)</span>
            <span className="text-[10px] text-slate-400 font-normal group-hover:text-blue-400">EN Only</span>
          </button>
          <div className="h-px bg-slate-100 my-1 mx-2" />
          <button
            onClick={handleDocx}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors text-left group"
          >
            <FileText className="w-4 h-4 opacity-70 group-hover:opacity-100" />
            <span>Word (DOCX)</span>
          </button>
        </div>
      )}
    </div>
  );
}

export function ClientPDFPreview({
  data,
  template,
  previewRef,
  zoom = 1,
  design,
  updateData,
  onSectionClick,
}: {
  data: ResumeData;
  template: TemplateId;
  previewRef: RefObject<HTMLDivElement | null>;
  zoom?: number;
  design?: DesignSettings;
  updateData?: UpdateDataFn;
  onSectionClick?: (s: SectionId, path?: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(1122);
  const [fitScale, setFitScale] = useState(1);

  useEffect(() => {
    if (!design) return;
    [design.fontFamily, design.headingFontFamily].filter(Boolean).forEach((font) => {
      const id = `gf-${font.replace(/\s+/g, "-")}`;
      if (document.getElementById(id)) return;
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@400;500;600;700;800&display=swap`;
      document.head.appendChild(link);
    });
  }, [design]);

  useLayoutEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    const update = () => {
      const actualH = Math.max(preview.scrollHeight, 1122);
      setContentHeight(actualH);
    };
    const ro = new ResizeObserver(update);
    ro.observe(preview);
    update();
    return () => ro.disconnect();
  }, [data, design, template, previewRef]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateFitScale = () => {
      const availableWidth = Math.max(320, container.clientWidth - 32);
      setFitScale(Math.min(1, availableWidth / 794));
    };

    updateFitScale();
    const ro = new ResizeObserver(updateFitScale);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  const d = design;
  const scale = fitScale * zoom;
  const bullet = !d
    ? ""
    : d.bulletStyle === "dot"
      ? '"\\2022 "'
      : d.bulletStyle === "dash"
        ? '"\\2013 "'
        : d.bulletStyle === "square"
          ? '"\\25AA "'
          : d.bulletStyle === "arrow"
            ? '"\\203A "'
            : d.bulletStyle === "star"
              ? '"\\2605 "'
              : '""';

  const css = d
    ? `
.ds-live {
  --color-text: ${d.textColor};
  --color-heading: ${d.headingColor};
  --color-accent: ${d.accentColor};
  --color-bg: ${d.backgroundColor};
  --color-sidebar: ${d.sidebarColor};
  --font-base: '${d.fontFamily}', system-ui, sans-serif;
  --font-heading: '${d.headingFontFamily}', system-ui, sans-serif;
  --ds-photo-radius: ${d.photoShape === "circle" ? "50%" : d.photoShape === "rounded" ? "12px" : "0px"};
  --ds-photo-size: ${d.photoShape === "none" ? "0px" : (d.photoSize || 80) + "px"};

  font-family: var(--font-base) !important;
  font-size: ${d.baseFontSize}px !important;
  line-height: ${d.lineHeight} !important;
  letter-spacing: ${d.letterSpacing}em !important;
  color: var(--color-text) !important;
  background-color: var(--color-bg) !important;
}
.ds-live > div:first-of-type,
.ds-live > .bg-white,
.ds-live [style*="minHeight"] {
  padding: ${d.pagePaddingY}px ${d.pagePaddingX}px !important;
}
.ds-live h1 {
  font-family: '${d.headingFontFamily}', system-ui, sans-serif !important;
  font-size: ${(d.baseFontSize * d.headingScale * 1.6).toFixed(1)}px !important;
  color: ${d.headingColor} !important;
}
.ds-live h2 {
  font-family: '${d.headingFontFamily}', system-ui, sans-serif !important;
  font-size: ${(d.baseFontSize * d.headingScale).toFixed(1)}px !important;
  color: ${d.headingColor} !important;
}
.ds-live h3 {
  font-family: '${d.headingFontFamily}', system-ui, sans-serif !important;
  font-size: ${(d.baseFontSize * d.headingScale * 0.85).toFixed(1)}px !important;
  color: ${d.headingColor} !important;
}
.ds-live section { margin-top: ${d.sectionGap}px !important; }
.ds-live [class*="space-y"] > * + * { margin-top: ${d.itemGap}px !important; }
.ds-live [class*="border-b"] {
  border-bottom-style: ${d.showDividers ? d.dividerStyle : "none"} !important;
  border-bottom-color: ${d.accentColor}55 !important;
}
.ds-live [class*="border-t"] {
  border-top-style: ${d.showDividers ? d.dividerStyle : "none"} !important;
  border-top-color: ${d.accentColor}55 !important;
}
.ds-live ul li::marker { content: ${bullet}; color: ${d.accentColor} !important; }
.ds-live aside,
.ds-live [class*="bg-neutral-900"],
.ds-live [class*="bg-slate-900"],
.ds-live [class*="bg-gray-900"],
.ds-live [class*="bg-neutral-800"] { background-color: ${d.sidebarColor} !important; }

.ds-live .canvas-decoration {
  position: absolute;
  pointer-events: none;
  z-index: 0;
}
.ds-live .canvas-decoration.blob-a {
  top: 24px;
  right: 24px;
  width: 160px;
  height: 160px;
  border-radius: 9999px;
  background: radial-gradient(circle at 30% 30%, ${d.accentColor}22, transparent 70%);
}
.ds-live .canvas-decoration.blob-b {
  left: 0;
  bottom: 0;
  width: 220px;
  height: 220px;
  border-radius: 9999px;
  background: radial-gradient(circle at 40% 40%, ${d.headingColor}10, transparent 72%);
}
.ds-live .canvas-decoration.grid {
  inset: 0;
  opacity: 0.16;
  background-image: linear-gradient(to right, ${d.accentColor}18 1px, transparent 1px), linear-gradient(to bottom, ${d.accentColor}18 1px, transparent 1px);
  background-size: 32px 32px;
}
.ds-live .canvas-decoration.corner {
  width: 80px;
  height: 80px;
  border: 2px solid ${d.accentColor}66;
}
.ds-live .canvas-decoration.corner.tl { top: 16px; left: 16px; border-right: 0; border-bottom: 0; }
.ds-live .canvas-decoration.corner.tr { top: 16px; right: 16px; border-left: 0; border-bottom: 0; }
.ds-live .canvas-decoration.corner.bl { bottom: 16px; left: 16px; border-right: 0; border-top: 0; }
.ds-live .canvas-decoration.corner.br { bottom: 16px; right: 16px; border-left: 0; border-top: 0; }
`
    : "";

  const handlePreviewClick = (e: React.MouseEvent) => {
    if (!onSectionClick) return;
    const selectors =
      "[data-editable='true'],h1,h2,h3,h4,h5,h6,p,span,li,div,small,strong,em,a,button,time,label";
    let node = e.target as HTMLElement | null;
    while (node && node !== e.currentTarget) {
      const editable = node.closest("[data-editable='true']") as HTMLElement | null;
      if (editable?.dataset.path) {
        onSectionClick(
          inferSectionFromPath(editable.dataset.path) as SectionId,
          editable.dataset.path,
        );
        return;
      }
      if (node.matches(selectors)) {
        const matched = findFieldMatch(data, node.textContent || "");
        if (matched) {
          onSectionClick(inferSectionFromPath(matched.path), matched.path);
          return;
        }
      }
      node = node.parentElement;
    }
    const sectionHost = (e.target as HTMLElement).closest(
      "section, aside, header, main",
    ) as HTMLElement | null;
    const sectionText = sectionHost?.textContent?.toLowerCase() || "";
    const guessed =
      sectionText.includes("experience") || sectionText.includes("ئەزموون")
        ? "experience"
        : sectionText.includes("education") || sectionText.includes("خوێندن")
          ? "education"
          : sectionText.includes("skills") ||
              sectionText.includes("expertise") ||
              sectionText.includes("لێهاتووییەکان")
            ? "skills"
            : sectionText.includes("project") || sectionText.includes("پرۆژەکان")
              ? "projects"
              : sectionText.includes("certification") || sectionText.includes("بڕوانامەکان")
                ? "certifications"
                : sectionText.includes("language")
                  ? "languages"
                  : sectionText.includes("summary") ||
                      sectionText.includes("profile") ||
                      sectionText.includes("پوختە") ||
                      sectionText.includes("پڕۆفایل")
                    ? "summary"
                    : sectionText.includes("name") ||
                        sectionText.includes("title") ||
                        sectionText.includes("phone") ||
                        sectionText.includes("email") ||
                        sectionText.includes("location")
                      ? "header"
                      : "global";
    onSectionClick(guessed as SectionId);
  };

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-auto bg-slate-100/50">
      <div className="flex min-h-full min-w-max items-start justify-center p-2 sm:p-4">
        <div className="relative shrink-0 transition-all duration-300 ease-in-out" style={{ width: `${794 * scale}px`, height: `${contentHeight * scale}px` }}>
          <div
            ref={previewRef}
            onClick={handlePreviewClick}
            className="ds-live absolute left-0 top-0 z-10 overflow-hidden rounded-[28px] border border-slate-200/70 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.45)] transition-all duration-300 ease-in-out hover:ring-2 hover:ring-blue-400/50"
            style={{
              width: "794px",
              height: `${contentHeight}px`,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              backgroundColor: d?.backgroundColor ?? "#ffffff",
            }}
          >
          {d?.showCanvasDecorations && d.canvasDecorationStyle !== "none" && (
            <>
              {d.canvasDecorationStyle === "blobs" && <div className="canvas-decoration blob-a" />}
              {d.canvasDecorationStyle === "blobs" && <div className="canvas-decoration blob-b" />}
              {d.canvasDecorationStyle === "grid" && <div className="canvas-decoration grid" />}
              {d.canvasDecorationStyle === "corners" && (
                <>
                  <div className="canvas-decoration corner tl" />
                  <div className="canvas-decoration corner tr" />
                  <div className="canvas-decoration corner bl" />
                  <div className="canvas-decoration corner br" />
                </>
              )}
            </>
          )}
          {d && <style dangerouslySetInnerHTML={{ __html: css }} />}
          <UpdateDataContext.Provider value={updateData}>
            <ResumePreview
              data={data}
              template={template}
              design={design}
              onFieldFocus={(path) => {
                const section = path.startsWith("experience")
                  ? "experience"
                  : path.startsWith("education")
                    ? "education"
                    : path.startsWith("projects")
                      ? "projects"
                      : path.startsWith("certifications")
                        ? "certifications"
                        : path.startsWith("skills")
                          ? "skills"
                          : path.startsWith("photoUrl") ||
                              path.startsWith("name") ||
                              path.startsWith("title") ||
                              path.startsWith("email") ||
                              path.startsWith("phone") ||
                              path.startsWith("location")
                            ? "header"
                            : "summary";
                onSectionClick?.(section as SectionId, path);
              }}
            />
          </UpdateDataContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
}
