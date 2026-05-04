import type { RefObject } from "react";
import type { DesignSettings, ResumeData, TemplateId } from "@/lib/types";
import type { SectionId } from "@/components/DesignPanel";
import { exportPreviewAsPDF } from "@/lib/pdf-screenshot";
import { exportResumeDocx } from "@/components/resume/docx-templates";
import { ResumePreview } from "@/components/resume/templates";
import { UpdateDataContext, type UpdateDataFn } from "@/components/resume/DesignContext";
import { Download, FileText } from "lucide-react";
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
      ...data.experience.flatMap((item) => [item.title, item.company, item.description, ...item.achievements]),
      ...data.projects.flatMap((item) => [item.name, item.description, item.impact, ...item.tech]),
      ...data.education.flatMap((item) => [item.degree, item.institution]),
    ].filter(Boolean).join(" "),
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
  if (path.startsWith("photoUrl") || path.startsWith("name") || path.startsWith("title") || path.startsWith("email") || path.startsWith("phone") || path.startsWith("location")) return "header";
  return "summary";
}

export function isMultilinePath(path: string) {
  return /summary|description|achievements|impact/i.test(path);
}

export function getValueAtPath(data: ResumeData, path: string) {
  const parts = path.split(".");
  let current: any = data;
  for (const part of parts) {
    if (current == null) return "";
    current = current[Number.isFinite(Number(part)) ? Number(part) : part];
  }
  return typeof current === "string" ? current : current == null ? "" : String(current);
}

export function findFieldMatch(data: ResumeData, text: string): { path: string; value: string } | null {
  const target = normalizeText(text);
  if (!target) return null;

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
    ...data.experience.flatMap((item, index) => ([
      { path: `experience.${index}.title`, value: item.title },
      { path: `experience.${index}.company`, value: item.company },
      { path: `experience.${index}.duration`, value: item.duration },
      { path: `experience.${index}.description`, value: item.description },
      ...item.achievements.map((value, aIdx) => ({ path: `experience.${index}.achievements.${aIdx}`, value })),
    ])),
    ...data.projects.flatMap((item, index) => ([
      { path: `projects.${index}.name`, value: item.name },
      { path: `projects.${index}.description`, value: item.description },
      { path: `projects.${index}.impact`, value: item.impact },
      ...item.tech.map((value, tIdx) => ({ path: `projects.${index}.tech.${tIdx}`, value })),
    ])),
    ...data.education.flatMap((item, index) => ([
      { path: `education.${index}.degree`, value: item.degree },
      { path: `education.${index}.institution`, value: item.institution },
      { path: `education.${index}.year`, value: item.year },
    ])),
    ...(data.skillItems || []).map((item, index) => ({ path: `skillItems.${index}.name`, value: item.name })),
  ];

  const exact = candidates.find((candidate) => normalizeText(candidate.value) === target);
  if (exact) return exact;

  const includes = candidates.find((candidate) => {
    const value = normalizeText(candidate.value);
    return value.length >= 4 && (value.includes(target) || target.includes(value));
  });
  return includes ?? null;
}

export function ExportButtons({ data, template, name, previewRef }: { data: ResumeData; template: TemplateId; name: string; previewRef: RefObject<HTMLDivElement | null> }) {
  const [pdfLoading, setPdfLoading] = useState(false);
  const [docxLoading, setDocxLoading] = useState(false);
  const filename = name.replace(/\s+/g, "_") || "resume";

  const handlePDF = async () => {
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

  const handleDocx = async () => {
    setDocxLoading(true);
    try {
      await exportResumeDocx(data, template, filename);
    } finally {
      setDocxLoading(false);
    }
  };

  return (
    <>
      <button onClick={handleDocx} disabled={docxLoading} className="flex items-center gap-1.5 px-3 py-2.5 sm:py-1.5 rounded-xl sm:rounded-full bg-white/80 backdrop-blur-md border border-white text-xs font-bold tracking-wide text-slate-700 shadow-sm hover:bg-white hover:shadow-md transition-all disabled:opacity-50">
        <FileText className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
        <span className="hidden sm:inline">{docxLoading ? "..." : "DOCX"}</span>
      </button>
      <button onClick={handlePDF} disabled={pdfLoading} className="flex items-center gap-1.5 px-4 py-2.5 sm:py-1.5 rounded-xl sm:rounded-full bg-blue-600 backdrop-blur-md border border-blue-500 text-xs font-bold tracking-wide text-white shadow-sm hover:bg-blue-700 hover:shadow-md transition-all disabled:opacity-50">
        <Download className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
        <span className="hidden sm:inline">{pdfLoading ? "..." : "PDF"}</span>
        <span className="sm:hidden font-bold">{pdfLoading ? "..." : "PDF"}</span>
      </button>
    </>
  );
}

export function ClientPDFPreview({ data, template, previewRef, zoom = 1, design, updateData, onSectionClick }: {
  data: ResumeData; template: TemplateId;
  previewRef: RefObject<HTMLDivElement | null>;
  zoom?: number;
  design?: DesignSettings;
  updateData?: UpdateDataFn;
  onSectionClick?: (s: SectionId, path?: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [baseScale, setBaseScale] = useState(0.5);
  const [contentHeight, setContentHeight] = useState(1122);

  useEffect(() => {
    if (!design) return;
    [design.fontFamily, design.headingFontFamily].filter(Boolean).forEach((font) => {
      const id = `gf-${font.replace(/\s+/g, "-")}`;
      if (document.getElementById(id)) return;
      const link = document.createElement("link");
      link.id = id; link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@400;500;600;700;800&display=swap`;
      document.head.appendChild(link);
    });
  }, [design?.fontFamily, design?.headingFontFamily]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const preview = previewRef.current;
    if (!container || !preview) return;
    const update = () => {
      const parent = container.parentElement;
      if (!parent) return;
      const w = parent.clientWidth - 32;
      const h = parent.clientHeight - 32;
      const actualH = Math.max(preview.scrollHeight, 1122);
      setContentHeight(actualH);
      setBaseScale(Math.min(w / 794, h / actualH));
    };
    const ro = new ResizeObserver(update);
    if (container.parentElement) ro.observe(container.parentElement);
    ro.observe(preview);
    update();
    return () => ro.disconnect();
  }, [data, template, previewRef]);

  const d = design;
  const bullet = !d ? '' :
    d.bulletStyle === 'dot' ? '"\\2022 "' :
    d.bulletStyle === 'dash' ? '"\\2013 "' :
    d.bulletStyle === 'square' ? '"\\25AA "' :
    d.bulletStyle === 'arrow' ? '"\\203A "' :
    d.bulletStyle === 'star' ? '"\\2605 "' : '""';

  const css = d ? `
.ds-live {
  --color-text: ${d.textColor};
  --color-heading: ${d.headingColor};
  --color-accent: ${d.accentColor};
  --color-bg: ${d.backgroundColor};
  --color-sidebar: ${d.sidebarColor};
  --font-base: '${d.fontFamily}', system-ui, sans-serif;
  --font-heading: '${d.headingFontFamily}', system-ui, sans-serif;
  --ds-photo-radius: ${d.photoShape === 'circle' ? '50%' : d.photoShape === 'rounded' ? '12px' : '0px'};
  --ds-photo-size: ${d.photoShape === 'none' ? '0px' : (d.photoSize || 80) + 'px'};

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
  border-bottom-style: ${d.showDividers ? d.dividerStyle : 'none'} !important;
  border-bottom-color: ${d.accentColor}55 !important;
}
.ds-live [class*="border-t"] {
  border-top-style: ${d.showDividers ? d.dividerStyle : 'none'} !important;
  border-top-color: ${d.accentColor}55 !important;
}
.ds-live ul li::marker { content: ${bullet}; color: ${d.accentColor} !important; }
.ds-live aside,
.ds-live [class*="bg-neutral-900"],
.ds-live [class*="bg-slate-900"],
.ds-live [class*="bg-gray-900"],
.ds-live [class*="bg-neutral-800"] { background-color: ${d.sidebarColor} !important; }
` : '';

  const handlePreviewClick = (e: React.MouseEvent) => {
    if (!onSectionClick) return;
    const target = (e.target as HTMLElement).closest('[data-editable="true"]') as HTMLElement | null;
    const path = target?.dataset.path;
    if (path) {
      onSectionClick(inferSectionFromPath(path) as SectionId, path);
      return;
    }
    const textNode = (e.target as HTMLElement).closest('h1,h2,h3,h4,h5,h6,p,span,li,div') as HTMLElement | null;
    const matched = textNode ? findFieldMatch(data, textNode.textContent || '') : null;
    if (matched) {
      onSectionClick(inferSectionFromPath(matched.path), matched.path);
      return;
    }
    const sectionHost = (e.target as HTMLElement).closest('section, aside, header, main') as HTMLElement | null;
    const sectionText = sectionHost?.textContent?.toLowerCase() || '';
    const guessed = sectionText.includes('experience') || sectionText.includes('ئەزموون') ? 'experience'
      : sectionText.includes('education') || sectionText.includes('خوێندن') ? 'education'
      : sectionText.includes('skills') || sectionText.includes('expertise') || sectionText.includes('لێهاتووییەکان') ? 'skills'
      : sectionText.includes('project') || sectionText.includes('پرۆژەکان') ? 'projects'
      : sectionText.includes('certification') || sectionText.includes('بڕوانامەکان') ? 'certifications'
      : sectionText.includes('language') ? 'languages'
      : sectionText.includes('summary') || sectionText.includes('profile') || sectionText.includes('پوختە') || sectionText.includes('پڕۆفایل') ? 'summary'
      : sectionText.includes('name') || sectionText.includes('title') || sectionText.includes('phone') || sectionText.includes('email') || sectionText.includes('location') ? 'header'
      : 'global';
    onSectionClick(guessed as SectionId);
  };

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-auto bg-slate-100/50 p-2 sm:p-4">
      <div className="flex min-h-full min-w-full w-fit">
        <div className="m-auto transition-all duration-300 ease-out shrink-0 flex justify-center" style={{ zoom: baseScale * zoom }}>
          <div className="w-[794px] origin-top transition-all duration-300 ease-out overflow-hidden rounded-sm shadow-[0_20px_50px_-24px_rgba(15,23,42,0.45)] shrink-0" style={{ minHeight: `${contentHeight}px` }}>
            <div ref={previewRef} onClick={handlePreviewClick} className="ds-live w-full min-h-full overflow-hidden hover:ring-2 hover:ring-blue-400/50 transition-shadow" style={d ? { backgroundColor: d.backgroundColor, height: `${Math.max(contentHeight, 1122)}px` } : { backgroundColor: '#ffffff', height: `${Math.max(contentHeight, 1122)}px` }}>
              {d && <style dangerouslySetInnerHTML={{ __html: css }} />}
              <UpdateDataContext.Provider value={updateData}>
                <ResumePreview data={data} template={template} design={design} onFieldFocus={(path) => {
                  const section = path.startsWith("experience") ? "experience"
                    : path.startsWith("education") ? "education"
                    : path.startsWith("projects") ? "projects"
                    : path.startsWith("certifications") ? "certifications"
                    : path.startsWith("skills") ? "skills"
                    : path.startsWith("photoUrl") || path.startsWith("name") || path.startsWith("title") || path.startsWith("email") || path.startsWith("phone") || path.startsWith("location") ? "header"
                    : "summary";
                  onSectionClick?.(section as SectionId, path);
                }} />
              </UpdateDataContext.Provider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
