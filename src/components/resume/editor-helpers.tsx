/* eslint-disable react-refresh/only-export-components */
import type { RefObject } from "react";
import type { DesignSettings, ResumeData, TemplateId } from "@/lib/types";
import type { SectionId } from "@/components/DesignPanel";
import { exportPreviewAsPDF } from "@/lib/pdf-screenshot";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { UpdateDataContext, type UpdateDataFn, DesignModeContext } from "@/components/resume/DesignContext";
import { Download, FileText, ChevronDown } from "lucide-react";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { toast } from "sonner";

/** Returns a high-contrast text color (white or near-black) for the given hex background. */
function contrastTextFor(hex: string, darkText = "#1a1a1a", lightText = "#ffffff"): string {
  const h = hex.replace("#", "");
  if (h.length < 6) return darkText;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? darkText : lightText;
}


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

/**
 * FieldPathAnnotator — Zero-render component that tags preview DOM elements
 * with `data-field-path` attributes so field-override CSS can target them.
 * Runs after every render where fieldOverrides change.
 */
function FieldPathAnnotator({
  previewRef,
  data,
  fieldOverrides,
}: {
  previewRef: RefObject<HTMLDivElement | null>;
  data: ResumeData;
  fieldOverrides?: Record<string, unknown>;
}) {
  useEffect(() => {
    const root = previewRef.current;
    if (!root || !fieldOverrides) return;

    const paths = Object.keys(fieldOverrides);
    if (paths.length === 0) return;

    // Clear old annotations
    root.querySelectorAll("[data-field-path]").forEach((el) => {
      el.removeAttribute("data-field-path");
    });

    // Build lookup: value → path
    const valueToPaths: Map<string, string> = new Map();
    for (const path of paths) {
      const val = getValueAtPath(data, path);
      if (typeof val === "string" && val.trim().length > 0) {
        valueToPaths.set(val.trim(), path);
      }
    }

    if (valueToPaths.size === 0) return;

    // Walk all leaf text-carrying elements
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (node) => {
        const el = node as HTMLElement;
        // Skip style, script, and already-tagged elements
        if (["STYLE", "SCRIPT", "SVG"].includes(el.tagName)) return NodeFilter.FILTER_REJECT;
        // Only consider elements that directly contain text children
        const hasTextChild = Array.from(el.childNodes).some(
          (n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim(),
        );
        return hasTextChild ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      },
    });

    const tagged = new Set<string>();
    let current = walker.nextNode();
    while (current) {
      const el = current as HTMLElement;
      const text = el.textContent?.trim() || "";
      if (text.length > 0) {
        // Try exact match first
        for (const [val, path] of valueToPaths) {
          if (!tagged.has(path) && (text === val || text.includes(val) || val.includes(text))) {
            // Only tag the most specific (innermost) element
            const existingTagged = el.querySelector(`[data-field-path="${path}"]`);
            if (!existingTagged) {
              el.setAttribute("data-field-path", path);
              tagged.add(path);
            }
            break;
          }
        }
      }
      current = walker.nextNode();
    }
  }, [previewRef, data, fieldOverrides]);

  return null; // Zero-render component
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
  const [printLoading, setPrintLoading] = useState(false);
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
        await exportPreviewAsPDF(previewRef.current, filename, 2);
      }
    } catch {
      toast.error("Failed to generate PDF");
    } finally {
      setPdfLoading(false);
    }
  };

  /** Print quality — 3× resolution, pixel-perfect match to live preview */
  const handlePrintPDF = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(false);
    setPrintLoading(true);
    try {
      if (previewRef.current) {
        await exportPreviewAsPDF(previewRef.current, `${filename}_print`, 3);
      }
    } catch {
      toast.error("Failed to generate PDF");
    } finally {
      setPrintLoading(false);
    }
  };

  const handleDocx = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(false);
    setDocxLoading(true);
    try {
      const { exportResumeDocx } = await import("@/components/resume/docx-templates");
      await exportResumeDocx(data, template, filename);
    } catch {
      toast.error("Failed to generate DOCX");
    } finally {
      setDocxLoading(false);
    }
  };

  const anyLoading = pdfLoading || printLoading || docxLoading;

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        disabled={anyLoading}
        className="flex items-center gap-1.5 px-4 py-2.5 sm:py-1.5 rounded-xl sm:rounded-full bg-blue-600 border border-blue-500 text-xs font-bold tracking-wide text-white shadow-sm hover:bg-blue-700 hover:shadow-md transition-all disabled:opacity-50"
      >
        <Download className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
        <span className="hidden sm:inline">{anyLoading ? "Exporting..." : "Download"}</span>
        <span className="sm:hidden font-bold">{anyLoading ? "..." : "Save"}</span>
        <ChevronDown className={`w-4 h-4 sm:w-3 sm:h-3 ml-0.5 opacity-80 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[236px] bg-white border border-slate-200 rounded-xl shadow-[0_8px_40px_rgba(15,23,42,0.14)] overflow-hidden z-[100] flex flex-col p-1.5 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
          <div className="px-3 pt-2 pb-1">
            <p className="text-[10px] text-slate-400 font-medium">Both PDFs match your live preview exactly</p>
          </div>
          <div className="h-px bg-slate-100 mx-2 mb-1" />
          <button
            onClick={handlePDF}
            className="flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors text-left group"
          >
            <span>PDF (Standard)</span>
            <span className="text-[10px] text-slate-400 font-normal group-hover:text-blue-400">Fast · 2×</span>
          </button>
          <button
            onClick={handlePrintPDF}
            className="flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors text-left group"
          >
            <span>PDF (Print Quality)</span>
            <span className="text-[10px] text-slate-400 font-normal group-hover:text-blue-400">Sharp · 3×</span>
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
  isDesignMode,
}: {
  data: ResumeData;
  template: TemplateId;
  previewRef: RefObject<HTMLDivElement | null>;
  zoom?: number;
  design?: DesignSettings;
  updateData?: UpdateDataFn;
  onSectionClick?: (s: SectionId, path?: string, e?: React.MouseEvent) => void;
  isDesignMode?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(1122);
  const [fitScale, setFitScale] = useState(1);
  // Store last mousedown position so onFieldFocus (from Editable) can use it
  const lastMouseDown = useRef<{ clientX: number; clientY: number }>({ clientX: 0, clientY: 0 });

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

/* ── Sidebar / dark-panel contrast fix ────────────────────────────────── */
.ds-live aside,
.ds-live [class*="bg-neutral-900"],
.ds-live [class*="bg-slate-900"],
.ds-live [class*="bg-gray-900"],
.ds-live [class*="bg-neutral-800"],
.ds-live [class*="bg-\\[#0"],
.ds-live [class*="bg-\\[#1"],
.ds-live [class*="bg-\\[#2"],
.ds-live [class*="col-span-1"] > div:first-child:not([class*="p-0"]) {
  background-color: ${d.sidebarColor} !important;
}

/* Force all text inside sidebar containers to be readable */
.ds-live aside *,
.ds-live [class*="bg-neutral-900"] *,
.ds-live [class*="bg-slate-900"] *,
.ds-live [class*="bg-gray-900"] *,
.ds-live [class*="bg-neutral-800"] * {
  color: ${contrastTextFor(d.sidebarColor)} !important;
}
.ds-live aside h1,
.ds-live aside h2,
.ds-live aside h3,
.ds-live [class*="bg-neutral-900"] h1,
.ds-live [class*="bg-neutral-900"] h2,
.ds-live [class*="bg-neutral-900"] h3,
.ds-live [class*="bg-slate-900"] h1,
.ds-live [class*="bg-slate-900"] h2,
.ds-live [class*="bg-slate-900"] h3 {
  color: ${contrastTextFor(d.sidebarColor, "#1a1a1a", "#ffffff")} !important;
}

/* ── Main body background contrast fix ─────────────────────────────────── */
/* Covers templates where the whole background is dark (Noir, Prism, etc.) */
.ds-live > div[style],
.ds-live > div > div[style] {
  color: ${contrastTextFor(d.backgroundColor, d.textColor, "#e5e7eb")} !important;
}
/* Specifically re-apply heading colors for main body — but not inside sidebars */
.ds-live main *:not(aside):not(aside *),
.ds-live [class*="col-span-2"] *,
.ds-live [class*="col-span-7"] *,
.ds-live [class*="col-span-8"] *,
.ds-live [class*="col-span-9"] * {
  color: ${contrastTextFor(d.backgroundColor, d.textColor, "#e5e7eb")} !important;
}
.ds-live main h1, .ds-live main h2, .ds-live main h3,
.ds-live [class*="col-span-2"] h1, .ds-live [class*="col-span-2"] h2, .ds-live [class*="col-span-2"] h3,
.ds-live [class*="col-span-7"] h1, .ds-live [class*="col-span-7"] h2, .ds-live [class*="col-span-7"] h3,
.ds-live [class*="col-span-8"] h1, .ds-live [class*="col-span-8"] h2, .ds-live [class*="col-span-8"] h3 {
  color: ${contrastTextFor(d.backgroundColor, d.headingColor, "#ffffff")} !important;
}

/* ── Full-dark-bg templates (e.g. Noir, Prism, Cipher) ─────────────────── */
/* When the main background is dark, force global text to light */
${(() => {
  const mainBgDark = (()=>{ const h=d.backgroundColor.replace("#",""); const r=parseInt(h.slice(0,2),16); const g=parseInt(h.slice(2,4),16); const b=parseInt(h.slice(4,6),16); return (r*299+g*587+b*114)/1000 < 128; })();
  if (!mainBgDark) return "";
  return `.ds-live, .ds-live p, .ds-live span, .ds-live div, .ds-live li { color: ${contrastTextFor(d.backgroundColor, d.textColor, "#d1d5db")} !important; }
.ds-live h1, .ds-live h2, .ds-live h3 { color: ${contrastTextFor(d.backgroundColor, d.headingColor, "#ffffff")} !important; }`;
})()}

/* ── Headers with hardcoded dark backgrounds ──────────────────────────── */
.ds-live header[class*="bg-slate-900"],
.ds-live header[class*="bg-neutral-900"],
.ds-live header[class*="bg-gray-900"],
.ds-live [class*="bg-\\[#0a0a"],
.ds-live [class*="bg-\\[#12"] {
  background-color: ${d.sidebarColor} !important;
}
.ds-live header[class*="bg-slate-900"] *,
.ds-live header[class*="bg-neutral-900"] *,
.ds-live header[class*="bg-gray-900"] * {
  color: ${contrastTextFor(d.sidebarColor)} !important;
}

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

  // ── Always-on contrast baseline (no design system required) ─────────────
  // Guarantees white text on every dark-background element in all templates.
  const baseCss = `
.ds-live [class*="bg-neutral-900"],
.ds-live [class*="bg-neutral-800"],
.ds-live [class*="bg-slate-900"],
.ds-live [class*="bg-slate-800"],
.ds-live [class*="bg-gray-900"],
.ds-live [class*="bg-gray-800"],
.ds-live [class*="bg-zinc-900"],
.ds-live [class*="bg-zinc-800"],
.ds-live [class*="bg-indigo-950"],
.ds-live [class*="bg-indigo-900"],
.ds-live [class*="bg-blue-950"],
.ds-live [class*="bg-blue-900"],
.ds-live aside[class*="bg-"],
.ds-live header[class*="bg-slate"],
.ds-live header[class*="bg-neutral"],
.ds-live header[class*="bg-gray"],
.ds-live header[class*="bg-indigo"],
.ds-live header[class*="bg-zinc"] { color: #ffffff !important; }

.ds-live [class*="bg-neutral-900"] *,
.ds-live [class*="bg-neutral-800"] *,
.ds-live [class*="bg-slate-900"] *,
.ds-live [class*="bg-slate-800"] *,
.ds-live [class*="bg-gray-900"] *,
.ds-live [class*="bg-gray-800"] *,
.ds-live [class*="bg-zinc-900"] *,
.ds-live [class*="bg-zinc-800"] *,
.ds-live [class*="bg-indigo-950"] *,
.ds-live [class*="bg-indigo-900"] *,
.ds-live [class*="bg-blue-950"] *,
.ds-live [class*="bg-blue-900"] *,
.ds-live aside[class*="bg-"] *,
.ds-live header[class*="bg-slate"] *,
.ds-live header[class*="bg-neutral"] *,
.ds-live header[class*="bg-gray"] *,
.ds-live header[class*="bg-indigo"] *,
.ds-live header[class*="bg-zinc"] * { color: #ffffff !important; }

.ds-live [class*="bg-[#0"] { color: #e5e7eb !important; }
.ds-live [class*="bg-[#0"] * { color: #e5e7eb !important; }
.ds-live [class*="bg-[#1"] { color: #e5e7eb !important; }
.ds-live [class*="bg-[#1"] * { color: #e5e7eb !important; }
`;

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
          e,
        );
        return;
      }
      if (node.matches(selectors)) {
        const matched = findFieldMatch(data, node.textContent || "");
        if (matched) {
          node.setAttribute("data-field-path", matched.path);
          onSectionClick(inferSectionFromPath(matched.path), matched.path, e);
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
    <div ref={containerRef} className="perf-scroll absolute inset-0 overflow-auto bg-slate-100/50">
      <div className="flex min-h-full min-w-max items-start justify-center p-2 sm:p-4">
        <div className="relative shrink-0 transition-transform duration-200 ease-out" style={{ width: `${794 * scale}px`, height: `${contentHeight * scale}px` }}>
          <div
            ref={previewRef}
            onClick={handlePreviewClick}
            onMouseDown={(e) => { lastMouseDown.current = { clientX: e.clientX, clientY: e.clientY }; }}
            className={`ds-live perf-contain absolute left-0 top-0 z-10 overflow-hidden rounded-[28px] border border-slate-200/70 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.45)] transition-shadow duration-200 ease-out hover:ring-2 hover:ring-blue-400/50 ${isDesignMode ? "design-mode" : ""}`}
            style={{
              width: "794px",
              height: `${contentHeight}px`,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              backgroundColor: d?.backgroundColor ?? "#ffffff",
            }}
          >
          {isDesignMode && (
            <style dangerouslySetInnerHTML={{ __html: `
              .ds-live.design-mode [data-field-path]:hover,
              .ds-live.design-mode [data-path]:hover {
                outline: 2px dashed #3b82f6 !important;
                outline-offset: 4px !important;
                cursor: pointer !important;
                background-color: rgba(59, 130, 246, 0.1) !important;
                border-radius: 4px !important;
                transition: all 0.2s ease-in-out;
              }
            `}} />
          )}
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
          <style dangerouslySetInnerHTML={{ __html: baseCss }} />
          {d?.fieldOverrides && Object.keys(d.fieldOverrides).length > 0 && (
            <style dangerouslySetInnerHTML={{ __html: Object.entries(d.fieldOverrides).map(([path, ov]) => {
              const rules: string[] = [];
              if (ov.fontSize) rules.push(`font-size: ${ov.fontSize}px !important`);
              if (ov.fontWeight) rules.push(`font-weight: ${ov.fontWeight} !important`);
              if (ov.color) rules.push(`color: ${ov.color} !important`);
              if (ov.fontFamily) rules.push(`font-family: '${ov.fontFamily}', sans-serif !important`);
              if (ov.letterSpacing !== undefined) rules.push(`letter-spacing: ${ov.letterSpacing}em !important`);
              if (ov.textTransform && ov.textTransform !== "none") rules.push(`text-transform: ${ov.textTransform} !important`);
              if (rules.length === 0) return "";
              // Target both Editable elements (data-path) and annotated DOM elements (data-field-path)
              return [
                `.ds-live [data-path="${path}"] { ${rules.join("; ")}; }`,
                `.ds-live [data-field-path="${path}"] { ${rules.join("; ")}; }`,
              ].join("\n");
            }).filter(Boolean).join("\n") }} />
          )}
          <FieldPathAnnotator previewRef={previewRef} data={data} fieldOverrides={d?.fieldOverrides} />
          <DesignModeContext.Provider value={!!isDesignMode}>
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
                // Create a synthetic event-like object with stored mouse coordinates
                const syntheticEvent = {
                  clientX: lastMouseDown.current.clientX,
                  clientY: lastMouseDown.current.clientY,
                } as unknown as React.MouseEvent;
                onSectionClick?.(section as SectionId, path, syntheticEvent);
              }}
            />
          </UpdateDataContext.Provider>
          </DesignModeContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
}
