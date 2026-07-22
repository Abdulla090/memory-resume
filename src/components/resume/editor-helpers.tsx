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
import { buildFieldOverrideCss, sanitizeResumeText } from "@/lib/sanitize";

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
  if (path.startsWith("sectionTitles")) return "global";
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

/** Human-readable label derived from a data path. Powers the floating chip on
 *  the design-mode selection overlay. */
export function labelForPath(path: string): string {
  const parts = path.split(".");
  const head = parts[0];
  const idxOf = (n: number) => Number(parts[n]) + 1;
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  switch (head) {
    case "name": return "Full name";
    case "title": return "Job title";
    case "summary": return "Summary";
    case "email": return "Email";
    case "phone": return "Phone";
    case "location": return "Location";
    case "photoUrl": return "Photo";
    case "sectionTitles": return `Section: ${cap(parts[1] || "")}`;
    case "skills": return `Skill ${idxOf(1)}`;
    case "skillItems": return `Skill ${idxOf(1)} · ${cap(parts[2] || "name")}`;
    case "certifications": return `Certification ${idxOf(1)}`;
    case "languages": return `Language ${idxOf(1)}`;
    case "experience": {
      const field = parts[2];
      if (field === "achievements") return `Experience ${idxOf(1)} · Achievement ${idxOf(3)}`;
      return `Experience ${idxOf(1)} · ${cap(field || "")}`;
    }
    case "projects": {
      const field = parts[2];
      if (field === "tech") return `Project ${idxOf(1)} · Tech ${idxOf(3)}`;
      return `Project ${idxOf(1)} · ${cap(field || "")}`;
    }
    case "education": return `Education ${idxOf(1)} · ${cap(parts[2] || "")}`;
    default: return cap(head);
  }
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
 * Build the full list of known {path, value} pairs from the resume data.
 * Used by both the runtime annotator (to tag DOM elements) and the click
 * handler (to resolve clicked text to a data path).
 */
function buildAllFieldPaths(data: ResumeData): Array<{ path: string; value: string }> {
  const out: Array<{ path: string; value: string }> = [
    { path: "name", value: data.name },
    { path: "title", value: data.title },
    { path: "summary", value: data.summary },
    ...(data.location ? [{ path: "location", value: data.location }] : []),
    ...(data.email ? [{ path: "email", value: data.email }] : []),
    ...(data.phone ? [{ path: "phone", value: data.phone }] : []),
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
    ...Object.entries(data.sectionTitles || {}).map(([key, value]) => ({
      path: `sectionTitles.${key}`,
      value,
    })),
  ];
  return out.filter((entry) => typeof entry.value === "string" && entry.value.trim().length > 0);
}

/**
 * FieldPathAnnotator — Zero-render component that tags preview DOM elements
 * with `data-field-path` attributes so field-override CSS can target them and
 * clicks in design mode can resolve text to a stable path. Tags ALL data
 * fields (not only ones with existing overrides) so old templates that don't
 * use `<Editable>` still support color / size changes uniformly.
 */
function FieldPathAnnotator({
  previewRef,
  data,
  updateData,
  template,
}: {
  previewRef: RefObject<HTMLDivElement | null>;
  data: ResumeData;
  updateData?: UpdateDataFn;
  template: TemplateId;
}) {
  const updateDataRef = useRef(updateData);

  useEffect(() => {
    updateDataRef.current = updateData;
  }, [updateData]);

  useEffect(() => {
    const root = previewRef.current;
    if (!root) return;

    const doc = root.ownerDocument;
    const listeners: Array<() => void> = [];
    let timeoutId = 0;

    const annotate = () => {

    // Remove wrappers created by the previous run before rebuilding from React's text.
    root.querySelectorAll("[data-auto-field='true']").forEach((el) => {
      el.replaceWith(doc.createTextNode(el.textContent || ""));
    });
    root.normalize();

    // Clear old passive annotations, but never touch explicit <Editable data-path> nodes.
    root.querySelectorAll("[data-field-path]").forEach((el) => {
      if (!el.hasAttribute("data-path")) {
        el.removeAttribute("data-field-path");
        el.removeAttribute("contenteditable");
        el.removeAttribute("spellcheck");
      }
    });

      const entries = buildAllFieldPaths(data);
      if (entries.length === 0) return;

    // Sort by value length descending so longer/more-specific strings tag first
    // (prevents short prefixes from claiming the same element as longer text).
    entries.sort((a, b) => b.value.length - a.value.length);

    const shouldSkipParent = (parent: HTMLElement | null) => {
      if (!parent) return true;
      if (parent.closest("[data-editable='true'],[data-auto-field='true'],svg,style,script,textarea,input,button")) {
        return true;
      }
      return false;
    };

    const findRanges = (text: string) => {
      const ranges: Array<{ start: number; end: number; path: string; value: string }> = [];
      for (const entry of entries) {
        const value = entry.value.trim();
        if (value.length < 2) continue;
        let fromIndex = 0;
        while (fromIndex < text.length) {
          const start = text.indexOf(value, fromIndex);
          if (start === -1) break;
          const end = start + value.length;
          const overlaps = ranges.some((range) => start < range.end && end > range.start);
          if (!overlaps) ranges.push({ start, end, path: entry.path, value });
          fromIndex = end;
        }
      }
      return ranges.sort((a, b) => a.start - b.start || b.end - a.end);
    };

    const textWalker = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        const parent = node.parentElement;
        if (shouldSkipParent(parent)) return NodeFilter.FILTER_REJECT;
        const text = node.textContent || "";
        return text.trim().length >= 2 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });

    const textNodes: Text[] = [];
    let textNode = textWalker.nextNode();
    while (textNode) {
      textNodes.push(textNode as Text);
      textNode = textWalker.nextNode();
    }

      textNodes.forEach((node) => {
      const text = node.textContent || "";
      const ranges = findRanges(text);
      if (ranges.length === 0) return;

      const fragment = doc.createDocumentFragment();
      let cursor = 0;
      ranges.forEach((range) => {
        if (range.start > cursor) {
          fragment.appendChild(doc.createTextNode(text.slice(cursor, range.start)));
        }
        const span = doc.createElement("span");
        span.textContent = text.slice(range.start, range.end);
        span.setAttribute("data-auto-field", "true");
        span.setAttribute("data-field-path", range.path);
        span.setAttribute("data-field-label", labelForPath(range.path));
        span.setAttribute("contenteditable", updateDataRef.current ? "true" : "false");
        span.setAttribute("spellcheck", "true");

        fragment.appendChild(span);
        cursor = range.end;
      });
      if (cursor < text.length) {
        fragment.appendChild(doc.createTextNode(text.slice(cursor)));
      }
      node.replaceWith(fragment);
    });

      root.querySelectorAll<HTMLElement>("[data-auto-field='true']").forEach((el) => {
      if (el.getAttribute("data-editable") === "true") return;
      const path = el.dataset.fieldPath;
      if (!path) return;
      el.setAttribute("contenteditable", updateDataRef.current ? "true" : "false");
      el.setAttribute("spellcheck", "true");
      el.setAttribute("tabindex", "0");

      const handleFocus = () => {
        el.dataset.originalValue = el.innerText;
      };
      const handleBlur = () => {
        const next = sanitizeResumeText(el.innerText.trim());
        const previous = sanitizeResumeText(el.dataset.originalValue || "").trim();
        if (next && next !== previous) {
          updateDataRef.current?.(path, next);
        } else if (!next && previous) {
          el.innerText = previous;
        }
        delete el.dataset.originalValue;
      };
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Enter" && !isMultilinePath(path)) {
          event.preventDefault();
          el.blur();
        }
        if (event.key === "Escape") {
          event.preventDefault();
          if (el.dataset.originalValue !== undefined) el.innerText = el.dataset.originalValue;
          el.blur();
        }
      };

      el.addEventListener("focus", handleFocus);
      el.addEventListener("blur", handleBlur);
      el.addEventListener("keydown", handleKeyDown);
      listeners.push(() => {
        el.removeEventListener("focus", handleFocus);
        el.removeEventListener("blur", handleBlur);
        el.removeEventListener("keydown", handleKeyDown);
      });
      });
    };

    timeoutId = window.setTimeout(annotate, 120);

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      listeners.forEach((cleanup) => cleanup());
    };
    }, [previewRef, data, template]);

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
    ...buildAllFieldPaths(data),
    ...(data.photoUrl ? [{ path: "photoUrl", value: data.photoUrl }] : []),
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
  design,
}: {
  data: ResumeData;
  template: TemplateId;
  name: string;
  previewRef: RefObject<HTMLDivElement | null>;
  design?: DesignSettings;
}) {
  const [vectorLoading, setVectorLoading] = useState(false);
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

  const handleVectorPDF = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(false);
    setVectorLoading(true);
    try {
      if (!previewRef.current) return;
      const { exportPreviewAsVectorPDF } = await import("@/lib/pdf-vector-preview");
      await exportPreviewAsVectorPDF(previewRef.current, filename);
      toast.success("Vector PDF downloaded");
    } catch (err) {
      console.error("Vector preview export failed:", err);
      try {
        const { exportResumePDF } = await import("@/components/resume/pdf-templates");
        await exportResumePDF(data, template, filename, design);
        toast.message("Downloaded template PDF (preview vector export failed for this layout)");
      } catch {
        toast.error("Failed to generate vector PDF");
      }
    } finally {
      setVectorLoading(false);
    }
  };

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

  const anyLoading = vectorLoading || pdfLoading || printLoading || docxLoading;

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
            <p className="text-[10px] text-slate-400 font-medium">
              Vector PDF matches your live preview (all templates)
            </p>
          </div>
          <div className="h-px bg-slate-100 mx-2 mb-1" />
          <button
            onClick={handleVectorPDF}
            className="flex items-center justify-between px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors text-left group"
          >
            <span>PDF (Vector)</span>
            <span className="text-[10px] text-blue-500 font-normal group-hover:text-blue-600">
              Sharp · selectable
            </span>
          </button>
          <button
            onClick={handlePDF}
            className="flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors text-left group"
          >
            <span>PDF (Raster)</span>
            <span className="text-[10px] text-slate-400 font-normal group-hover:text-blue-400">Fast · 2×</span>
          </button>
          <button
            onClick={handlePrintPDF}
            className="flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors text-left group"
          >
            <span>PDF (Raster Print)</span>
            <span className="text-[10px] text-slate-400 font-normal group-hover:text-blue-400">Backup · 3×</span>
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
  layoutRtl = null,
}: {
  data: ResumeData;
  template: TemplateId;
  previewRef: RefObject<HTMLDivElement | null>;
  zoom?: number;
  design?: DesignSettings;
  updateData?: UpdateDataFn;
  onSectionClick?: (s: SectionId, path?: string, e?: React.MouseEvent) => void;
  isDesignMode?: boolean;
  layoutRtl?: boolean | null;
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
      link.crossOrigin = "anonymous";
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
.ds-live [class*="bg-[#2"],
.ds-live [class*="bg-[#3"],
.ds-live [class*="bg-[#4"],
.ds-live [class*="bg-[#5"],
.ds-live [class*="bg-[#6"],
.ds-live [class*="bg-[#7"],
.ds-live [class*="bg-[#8"],
.ds-live [class*="bg-[#9"] { color: #f8fafc !important; }
.ds-live [class*="bg-[#2"] *,
.ds-live [class*="bg-[#3"] *,
.ds-live [class*="bg-[#4"] *,
.ds-live [class*="bg-[#5"] *,
.ds-live [class*="bg-[#6"] *,
.ds-live [class*="bg-[#7"] *,
.ds-live [class*="bg-[#8"] *,
.ds-live [class*="bg-[#9"] * { color: #f8fafc !important; }

.ds-live .text-white,
.ds-live .text-white h1,
.ds-live .text-white h2,
.ds-live .text-white h3,
.ds-live .text-white p,
.ds-live .text-white span,
.ds-live .text-white li,
.ds-live header.text-white h1,
.ds-live header.text-white h2,
.ds-live header.text-white h3,
.ds-live header.text-white p,
.ds-live header.text-white span { color: #ffffff !important; }

.ds-live aside.text-white h1,
.ds-live aside.text-white h2,
.ds-live aside.text-white h3,
.ds-live aside[class*="text-white"] h1,
.ds-live aside[class*="text-white"] h2,
.ds-live aside[class*="text-white"] h3 { color: #ffffff !important; }
`;

  const handlePreviewClick = (e: React.MouseEvent) => {
    if (!onSectionClick) return;
    let node = e.target as HTMLElement | null;
    while (node && node !== e.currentTarget) {
      const directPath = node.dataset.path || node.dataset.fieldPath;
      if (directPath) {
        onSectionClick(
          inferSectionFromPath(directPath) as SectionId,
          directPath,
          e,
        );
        return;
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
              .ds-live.design-mode [data-editable='true'],
              .ds-live.design-mode [data-field-path] {
                cursor: text;
                position: relative;
                transition: outline 120ms ease, box-shadow 120ms ease, background-color 120ms ease;
              }
              /* Hover: subtle, non-shifting dashed ring so text stays put. */
              .ds-live.design-mode [data-editable='true']:hover,
              .ds-live.design-mode [data-field-path]:hover {
                outline: 1px dashed rgba(37,99,235,0.55);
                outline-offset: 2px;
                background-color: rgba(37,99,235,0.045);
                border-radius: 3px;
              }
              /* Focus: solid ring + soft halo — the "selected" state. */
              .ds-live.design-mode [data-editable='true']:focus,
              .ds-live.design-mode [data-editable='true']:focus-within,
              .ds-live.design-mode [data-field-path]:focus,
              .ds-live.design-mode [data-field-path]:focus-within {
                outline: 1.5px solid #2563eb !important;
                outline-offset: 2px;
                background-color: rgba(37,99,235,0.08);
                box-shadow: 0 0 0 4px rgba(37,99,235,0.14);
                border-radius: 3px;
                z-index: 2;
              }
              /* Floating field-label chip: shows the selected field's name. */
              .ds-live.design-mode [data-field-label]:focus::after,
              .ds-live.design-mode [data-field-label]:focus-within::after {
                content: attr(data-field-label);
                position: absolute;
                top: -22px;
                left: -2px;
                z-index: 60;
                pointer-events: none;
                background: #2563eb;
                color: #ffffff;
                font: 600 10px/1 ui-sans-serif, system-ui, -apple-system, sans-serif;
                letter-spacing: 0.02em;
                padding: 4px 8px;
                border-radius: 999px;
                box-shadow: 0 4px 12px -4px rgba(37,99,235,0.55), 0 0 0 1px rgba(255,255,255,0.9);
                white-space: nowrap;
                transform: translateY(0);
                animation: dsFieldChipIn 140ms cubic-bezier(.2,.9,.3,1.2) both;
              }
              @keyframes dsFieldChipIn {
                from { opacity: 0; transform: translateY(2px) scale(0.92); }
                to   { opacity: 1; transform: translateY(0) scale(1); }
              }
              /* Empty field placeholder in design mode. */
              .ds-live.design-mode [data-field-path]:empty::before {
                content: attr(data-field-label);
                color: rgba(15,23,42,0.35);
                font-style: italic;
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
            <style
              dangerouslySetInnerHTML={{
                __html: buildFieldOverrideCss(d.fieldOverrides),
              }}
            />
          )}
          <FieldPathAnnotator previewRef={previewRef} data={data} updateData={updateData} template={template} />
          <DesignModeContext.Provider value={!!isDesignMode}>
          <UpdateDataContext.Provider value={updateData}>
            <ResumePreview
              data={data}
              template={template}
              design={design}
              layoutRtl={layoutRtl}
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
