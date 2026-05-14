/**
 * DesignPanel — Figma-like selection-based design sidebar.
 * Click any section in the preview → highlights it → shows its controls here.
 * Tabs: Content · Style · Layout
 */
/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, createContext, useContext } from "react";
import type { ReactNode, FC } from "react";
import type { DesignSettings, ResumeData } from "@/lib/types";
import { ArrowRight, Award, BarChart3, Briefcase, Circle, FolderOpen, Globe, GripVertical, GraduationCap, Minus, RotateCcw, Sliders, Square, Star, User, X, AlignLeft, LayoutGrid, Type, AlignCenter, AlignRight, FileText } from "lucide-react";
// HeroUI 3.x - no broken imports needed for these atoms
import { Button } from "@/components/ui/button";

// ─── Default design ──────────────────────────────────────────────────────────
export const DEFAULT_DESIGN: DesignSettings = {
  fontFamily: "DM Sans",
  headingFontFamily: "Space Grotesk",
  baseFontSize: 11,
  headingScale: 1.5,
  lineHeight: 1.55,
  letterSpacing: 0,
  accentColor: "#2563eb",
  textColor: "#1e293b",
  headingColor: "#0f172a",
  backgroundColor: "#ffffff",
  sidebarColor: "#1e3a5f",
  pagePaddingX: 40,
  pagePaddingY: 40,
  sectionGap: 20,
  itemGap: 10,
  showDividers: true,
  dividerStyle: "solid",
  showSectionIcons: false,
  headerShape: "none",
  bulletStyle: "dot",
  showCanvasDecorations: true,
  canvasDecorationStyle: "blobs",
  showSkillBars: false,
  skillBarStyle: "filled",
  photoShape: "circle",
  photoSize: 80,
  columnLayout: "single",
  contentOrder: [
    "summary",
    "experience",
    "education",
    "skills",
    "projects",
    "certifications",
    "languages",
  ],
};

export const TEMPLATE_DEFAULTS: Record<string, Partial<DesignSettings>> = {
  "new-professional": {
    accentColor: "#334155",
    backgroundColor: "#ffffff",
    sidebarColor: "#1e293b",
    columnLayout: "sidebar-left",
    skillBarStyle: "dots",
    showSkillBars: true,
  },
  "new-sleek": {
    accentColor: "#0f172a",
    backgroundColor: "#ffffff",
    sidebarColor: "#2dd4bf",
    columnLayout: "sidebar-right",
    skillBarStyle: "lines",
    showSkillBars: true,
  },
  "new-academic": {
    accentColor: "#881337",
    backgroundColor: "#fafafa",
    sidebarColor: "#111827",
    columnLayout: "single",
    skillBarStyle: "stars",
    showSkillBars: true,
  },
  "ref-torres": {
    accentColor: "#2563eb",
    backgroundColor: "#ffffff",
    sidebarColor: "#1e3a8a",
    columnLayout: "sidebar-left",
  },
  "ref-silva": {
    accentColor: "#b45309",
    backgroundColor: "#fffbeb",
    sidebarColor: "#78350f",
    columnLayout: "sidebar-right",
  },
  "ref-schumacher": {
    accentColor: "#ea580c",
    backgroundColor: "#ffffff",
    sidebarColor: "#ea580c",
  },
  "ref-palmerston": {
    accentColor: "#475569",
    backgroundColor: "#f8fafc",
    sidebarColor: "#334155",
  },
};

export function getTemplateDefaults(templateId: string): DesignSettings {
  return { ...DEFAULT_DESIGN, ...(TEMPLATE_DEFAULTS[templateId] || {}) };
}

// ─── Section registry ─────────────────────────────────────────────────────────
export type SectionId =
  | "header"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "languages"
  | "global";

export const SECTION_META: Record<SectionId, { label: string; icon: FC<{ className?: string }> }> =
  {
    global: { label: "Global Style", icon: Sliders },
    header: { label: "Header", icon: User },
    summary: { label: "Summary", icon: AlignLeft },
    experience: { label: "Experience", icon: Briefcase },
    education: { label: "Education", icon: GraduationCap },
    skills: { label: "Skills", icon: BarChart3 },
    projects: { label: "Projects", icon: FolderOpen },
    certifications: { label: "Certifications", icon: Award },
    languages: { label: "Languages", icon: Globe },
  };

// ─── Selection context (shared with preview via prop-drilling or context) ──────
interface SelectionCtx {
  selected: SectionId;
  setSelected: (s: SectionId) => void;
}
export const SelectionContext = createContext<SelectionCtx>({
  selected: "global",
  setSelected: () => {},
});
export const useSelection = () => useContext(SelectionContext);

// ─── Color presets ────────────────────────────────────────────────────────────
const PALETTES = [
  {
    name: "Ocean",
    accent: "#2563eb",
    heading: "#0f172a",
    text: "#1e293b",
    sidebar: "#1e3a5f",
    bg: "#ffffff",
  },
  {
    name: "Forest",
    accent: "#16a34a",
    heading: "#14532d",
    text: "#1a3526",
    sidebar: "#14532d",
    bg: "#f0fdf4",
  },
  {
    name: "Ruby",
    accent: "#e11d48",
    heading: "#4c0519",
    text: "#1e0a10",
    sidebar: "#9f1239",
    bg: "#fff1f2",
  },
  {
    name: "Slate",
    accent: "#475569",
    heading: "#0f172a",
    text: "#1e293b",
    sidebar: "#0f172a",
    bg: "#f8fafc",
  },
  {
    name: "Teal",
    accent: "#0d9488",
    heading: "#042f2e",
    text: "#1a3130",
    sidebar: "#134e4a",
    bg: "#f0fdfa",
  },
  {
    name: "Amber",
    accent: "#d97706",
    heading: "#451a03",
    text: "#1c0d00",
    sidebar: "#78350f",
    bg: "#fffbeb",
  },
  {
    name: "Violet",
    accent: "#7c3aed",
    heading: "#2e1065",
    text: "#1e1030",
    sidebar: "#2e1065",
    bg: "#faf5ff",
  },
  {
    name: "Noir",
    accent: "#a1a1aa",
    heading: "#ffffff",
    text: "#d4d4d8",
    sidebar: "#09090b",
    bg: "#18181b",
  },
];

const FONTS = [
  "DM Sans",
  "Space Grotesk",
  "Outfit",
  "Manrope",
  "Plus Jakarta Sans",
  "Nunito",
  "Raleway",
  "Montserrat",
  "Lato",
  "Roboto",
  "Open Sans",
  "Source Sans Pro",
  "Playfair Display",
  "Merriweather",
  "EB Garamond",
  "Crimson Text",
  "Libre Baskerville",
  "PT Serif",
];

// ─── Atom: label ─────────────────────────────────────────────────────────────
function Label({ children }: { children: ReactNode }) {
  return (
    <p className="mb-1.5 select-none text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500">
      {children}
    </p>
  );
}

// ─── Atom: slider ────────────────────────────────────────────────────────────
function Slider({
  label,
  value,
  min,
  max,
  step,
  unit = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span className="text-[10px] font-bold tabular-nums text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
          {typeof value === "number" && !Number.isInteger(value) ? value.toFixed(2) : value}{unit}
        </span>
      </div>
      <div className="relative h-5 flex items-center group">
        <div className="absolute inset-x-0 h-[4px] rounded-full bg-slate-200" />
        <div
          className="absolute h-[4px] rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-5"
        />
        <div
          className="absolute w-4 h-4 rounded-full bg-white shadow-md border-2 border-blue-500 pointer-events-none transition-all group-hover:scale-110"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
    </div>
  );
}

// ─── Atom: select ────────────────────────────────────────────────────────────
function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full cursor-pointer appearance-none rounded-xl px-3 py-2 text-[12px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 border border-slate-200 text-slate-800 shadow-sm transition-all hover:bg-slate-100"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

// ─── Atom: color swatch ───────────────────────────────────────────────────────
function ColorSwatch({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2.5 py-1.5">
      <label className="relative cursor-pointer shrink-0">
        <span
          className="block h-6 w-6 rounded-md transition-transform hover:scale-105"
          style={{
            background: value,
            boxShadow: "0 0 0 1px rgba(15,23,42,0.1), 0 1px 3px rgba(15,23,42,0.08)",
          }}
        />
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
        />
      </label>
      <span className="flex-1 text-[11px] font-medium text-slate-700">{label}</span>
      <span className="font-mono text-[9px] text-slate-500">{value.toUpperCase()}</span>
    </div>
  );
}

// ─── Atom: toggle ─────────────────────────────────────────────────────────────
function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-[11px] font-medium text-slate-700">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        aria-label={label}
        className={`relative h-[22px] w-10 shrink-0 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
          checked ? "bg-emerald-500 shadow-emerald-200 shadow-md" : "bg-slate-200"
        }`}
      >
        <span
          className="absolute top-[3px] h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-300"
          style={{ left: checked ? "calc(100% - 19px)" : "3px" }}
        />
      </button>
    </div>
  );
}

// ─── Atom: icon row ───────────────────────────────────────────────────────────
function IconRow<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; icon: ReactNode; tip: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        {options.map((o) => (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            title={o.tip}
            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${
              value === o.value
                ? "bg-white shadow-md text-blue-600 scale-105"
                : "text-slate-400 hover:text-slate-700 hover:bg-white/60"
            }`}
          >
            {o.icon}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── CONTENT TAB ─────────────────────────────────────────────────────────────
function ContentTab({
  selected,
  design,
  data,
  onChange,
  updateData,
  focusedField,
}: {
  selected: SectionId;
  design: DesignSettings;
  data: ResumeData;
  onChange: (p: Partial<DesignSettings>) => void;
  updateData: (patchOrPath: Partial<ResumeData> | string, val?: unknown) => void;
  focusedField?: string | null;
}) {
  useEffect(() => {
    if (!focusedField) return;
    const escaped = globalThis.CSS?.escape
      ? globalThis.CSS.escape(focusedField)
      : focusedField.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    const el = document.querySelector(`[data-panel-field="${escaped}"]`) as HTMLElement | null;
    if (!el) return;
    el.focus({ preventScroll: true });
    el.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [focusedField, selected]);

  const field = (path: string) => ({ "data-panel-field": path });

  // Show section-level visibility toggles
  const sections: SectionId[] = [
    "summary",
    "experience",
    "education",
    "skills",
    "projects",
    "certifications",
    "languages",
  ];

  if (selected === "header") {
    return (
      <div className="space-y-4">
        <Label>Personal Details</Label>
        <div className="space-y-3">
          <div>
            <p className="text-[9px] mb-1" style={{ color: "#6e6e73" }}>
              Full Name
            </p>
            <input
              {...field("name")}
              type="text"
              className="w-full text-[11px] p-2 rounded-lg border border-slate-200 outline-none focus:border-blue-500 transition-colors"
              value={data.name || ""}
              onChange={(e) => updateData("name", e.target.value)}
            />
          </div>
          <div>
            <p className="text-[9px] mb-1" style={{ color: "#6e6e73" }}>
              Professional Title
            </p>
            <input
              {...field("title")}
              type="text"
              className="w-full text-[11px] p-2 rounded-lg border border-slate-200 outline-none focus:border-blue-500 transition-colors"
              value={data.title || ""}
              onChange={(e) => updateData("title", e.target.value)}
            />
          </div>
          <div>
            <p className="text-[9px] mb-1" style={{ color: "#6e6e73" }}>
              Email
            </p>
            <input
              {...field("email")}
              type="email"
              className="w-full text-[11px] p-2 rounded-lg border border-slate-200 outline-none focus:border-blue-500 transition-colors"
              value={data.email || ""}
              onChange={(e) => updateData("email", e.target.value)}
            />
          </div>
          <div>
            <p className="text-[9px] mb-1" style={{ color: "#6e6e73" }}>
              Phone
            </p>
            <input
              {...field("phone")}
              type="tel"
              className="w-full text-[11px] p-2 rounded-lg border border-slate-200 outline-none focus:border-blue-500 transition-colors"
              value={data.phone || ""}
              onChange={(e) => updateData("phone", e.target.value)}
            />
          </div>
          <div>
            <p className="text-[9px] mb-1" style={{ color: "#6e6e73" }}>
              Location
            </p>
            <input
              {...field("location")}
              type="text"
              className="w-full text-[11px] p-2 rounded-lg border border-slate-200 outline-none focus:border-blue-500 transition-colors"
              value={data.location || ""}
              onChange={(e) => updateData("location", e.target.value)}
            />
          </div>
          <div>
            <p className="text-[9px] mb-1" style={{ color: "#6e6e73" }}>
              Photo URL
            </p>
            <input
              {...field("photoUrl")}
              type="url"
              className="w-full text-[11px] p-2 rounded-lg border border-slate-200 outline-none focus:border-blue-500 transition-colors"
              value={data.photoUrl || ""}
              onChange={(e) => updateData("photoUrl", e.target.value)}
              placeholder="https://..."
            />
            <div className="mt-2 flex items-center gap-2">
              <label className="inline-flex cursor-pointer items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-semibold text-slate-700 hover:bg-slate-50">
                Upload photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => updateData("photoUrl", String(reader.result || ""));
                    reader.readAsDataURL(file);
                  }}
                />
              </label>
              {data.photoUrl && (
                <button
                  type="button"
                  onClick={() => updateData("photoUrl", "")}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selected === "summary") {
    return (
      <div className="space-y-4">
        <Label>Professional Summary</Label>
        <div>
          <textarea
            {...field("summary")}
            className="w-full text-[11px] p-2 rounded-lg border border-slate-200 outline-none focus:border-blue-500 transition-colors h-40 resize-none"
            value={data.summary || ""}
            onChange={(e) => updateData("summary", e.target.value)}
            placeholder="A brief summary of your professional background..."
          />
        </div>
      </div>
    );
  }

  if (selected === "experience") {
    return (
      <div className="space-y-4">
        <Label>Experience</Label>
        <div className="space-y-3">
          {data.experience.map((exp, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-white border border-[#e5e5ea] rounded-2xl space-y-2.5 relative group shadow-sm transition-shadow hover:shadow-md"
            >
              <button
                onClick={() =>
                  updateData(
                    "experience",
                    data.experience.filter((_, i) => i !== idx),
                  )
                }
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <input
                  {...field(`experience.${idx}.title`)}
                  type="text"
                  className="w-full text-[12px] p-2 rounded-xl border border-[#e5e5ea] outline-none focus:border-[#0071e3] transition-colors bg-[#f5f5f7] focus:bg-white"
                  value={exp.title || ""}
                  onChange={(e) => updateData(`experience.${idx}.title`, e.target.value)}
                  placeholder="Job Title"
                />
                <input
                  {...field(`experience.${idx}.company`)}
                  type="text"
                  className="w-full text-[12px] p-2 rounded-xl border border-[#e5e5ea] outline-none focus:border-[#0071e3] transition-colors bg-[#f5f5f7] focus:bg-white"
                  value={exp.company || ""}
                  onChange={(e) => updateData(`experience.${idx}.company`, e.target.value)}
                  placeholder="Company"
                />
              </div>
              <input
                {...field(`experience.${idx}.duration`)}
                type="text"
                className="w-full text-[12px] p-2 rounded-xl border border-[#e5e5ea] outline-none focus:border-[#0071e3] transition-colors bg-[#f5f5f7] focus:bg-white"
                value={exp.duration || ""}
                onChange={(e) => updateData(`experience.${idx}.duration`, e.target.value)}
                placeholder="Duration"
              />
              <textarea
                {...field(`experience.${idx}.description`)}
                className="w-full text-[12px] p-2 rounded-xl border border-[#e5e5ea] outline-none focus:border-[#0071e3] transition-colors bg-[#f5f5f7] focus:bg-white h-16 resize-none"
                value={exp.description || ""}
                onChange={(e) => updateData(`experience.${idx}.description`, e.target.value)}
                placeholder="Description"
              />

              <div className="space-y-1.5 pt-1 border-t border-[#f2f2f7]">
                <p className="text-[10px] font-semibold text-[#8e8e93]">Achievements</p>
                {exp.achievements.map((ach, aIdx) => (
                  <div key={aIdx} className="flex gap-1.5 relative group/ach">
                    <input
                      {...field(`experience.${idx}.achievements.${aIdx}`)}
                      type="text"
                      className="flex-1 text-[11px] p-1.5 rounded-lg border border-[#e5e5ea] outline-none focus:border-[#0071e3] bg-[#f5f5f7] focus:bg-white"
                      value={ach || ""}
                      onChange={(e) =>
                        updateData(`experience.${idx}.achievements.${aIdx}`, e.target.value)
                      }
                    />
                    <button
                      onClick={() =>
                        updateData(
                          `experience.${idx}.achievements`,
                          exp.achievements.filter((_, i) => i !== aIdx),
                        )
                      }
                      className="w-6 h-6 rounded-md text-red-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center shrink-0"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    updateData(`experience.${idx}.achievements`, [...exp.achievements, ""])
                  }
                  className="text-[10px] font-medium text-[#0071e3] hover:underline"
                >
                  + Add Achievement
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() =>
            updateData("experience", [
              ...data.experience,
              { title: "", company: "", duration: "", description: "", achievements: [] },
            ])
          }
          className="w-full py-2.5 rounded-xl border border-dashed border-[#c7c7cc] text-[#0071e3] text-[12px] font-semibold hover:bg-[#e8f0fe] hover:border-[#0071e3] transition-all"
        >
          + Add Experience
        </button>
      </div>
    );
  }

  if (selected === "education") {
    return (
      <div className="space-y-4">
        <Label>Education</Label>
        <div className="space-y-3">
          {data.education.map((edu, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-white border border-[#e5e5ea] rounded-2xl space-y-2.5 relative group shadow-sm transition-shadow hover:shadow-md"
            >
              <button
                onClick={() =>
                  updateData(
                    "education",
                    data.education.filter((_, i) => i !== idx),
                  )
                }
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>

              <input
                {...field(`education.${idx}.degree`)}
                type="text"
                className="w-full text-[12px] p-2 rounded-xl border border-[#e5e5ea] outline-none focus:border-[#0071e3] transition-colors bg-[#f5f5f7] focus:bg-white"
                value={edu.degree || ""}
                onChange={(e) => updateData(`education.${idx}.degree`, e.target.value)}
                placeholder="Degree"
              />
              <input
                {...field(`education.${idx}.institution`)}
                type="text"
                className="w-full text-[12px] p-2 rounded-xl border border-[#e5e5ea] outline-none focus:border-[#0071e3] transition-colors bg-[#f5f5f7] focus:bg-white"
                value={edu.institution || ""}
                onChange={(e) => updateData(`education.${idx}.institution`, e.target.value)}
                placeholder="Institution"
              />
              <input
                {...field(`education.${idx}.year`)}
                type="text"
                className="w-full text-[12px] p-2 rounded-xl border border-[#e5e5ea] outline-none focus:border-[#0071e3] transition-colors bg-[#f5f5f7] focus:bg-white"
                value={edu.year || ""}
                onChange={(e) => updateData(`education.${idx}.year`, e.target.value)}
                placeholder="Year"
              />
            </div>
          ))}
        </div>
        <button
          onClick={() =>
            updateData("education", [...data.education, { degree: "", institution: "", year: "" }])
          }
          className="w-full py-2.5 rounded-xl border border-dashed border-[#c7c7cc] text-[#0071e3] text-[12px] font-semibold hover:bg-[#e8f0fe] hover:border-[#0071e3] transition-all"
        >
          + Add Education
        </button>
      </div>
    );
  }

  if (selected === "projects") {
    return (
      <div className="space-y-4">
        <Label>Projects</Label>
        <div className="space-y-3">
          {data.projects.map((proj, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-white border border-[#e5e5ea] rounded-2xl space-y-2.5 relative group shadow-sm transition-shadow hover:shadow-md"
            >
              <button
                onClick={() =>
                  updateData(
                    "projects",
                    data.projects.filter((_, i) => i !== idx),
                  )
                }
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>

              <input
                {...field(`projects.${idx}.name`)}
                type="text"
                className="w-full text-[12px] p-2 rounded-xl border border-[#e5e5ea] outline-none focus:border-[#0071e3] transition-colors bg-[#f5f5f7] focus:bg-white"
                value={proj.name || ""}
                onChange={(e) => updateData(`projects.${idx}.name`, e.target.value)}
                placeholder="Project Name"
              />
              <textarea
                {...field(`projects.${idx}.description`)}
                className="w-full text-[12px] p-2 rounded-xl border border-[#e5e5ea] outline-none focus:border-[#0071e3] transition-colors bg-[#f5f5f7] focus:bg-white h-16 resize-none"
                value={proj.description || ""}
                onChange={(e) => updateData(`projects.${idx}.description`, e.target.value)}
                placeholder="Description"
              />
              <input
                {...field(`projects.${idx}.impact`)}
                type="text"
                className="w-full text-[12px] p-2 rounded-xl border border-[#e5e5ea] outline-none focus:border-[#0071e3] transition-colors bg-[#f5f5f7] focus:bg-white"
                value={proj.impact || ""}
                onChange={(e) => updateData(`projects.${idx}.impact`, e.target.value)}
                placeholder="Impact / Result"
              />
              <input
                {...field(`projects.${idx}.tech`)}
                type="text"
                className="w-full text-[12px] p-2 rounded-xl border border-[#e5e5ea] outline-none focus:border-[#0071e3] transition-colors bg-[#f5f5f7] focus:bg-white"
                value={proj.tech?.join(", ") || ""}
                onChange={(e) =>
                  updateData(
                    `projects.${idx}.tech`,
                    e.target.value.split(",").map((s) => s.trim()),
                  )
                }
                placeholder="Tech Stack (comma separated)"
              />
            </div>
          ))}
        </div>
        <button
          onClick={() =>
            updateData("projects", [...data.projects, { name: "", description: "", tech: [] }])
          }
          className="w-full py-2.5 rounded-xl border border-dashed border-[#c7c7cc] text-[#0071e3] text-[12px] font-semibold hover:bg-[#e8f0fe] hover:border-[#0071e3] transition-all"
        >
          + Add Project
        </button>
      </div>
    );
  }

  if (selected === "skills") {
    const items = data.skillItems && data.skillItems.length > 0
      ? data.skillItems
      : data.skills.map((s) => ({ name: s, level: 4 }));

    return (
      <div className="space-y-4">
        <Label>Skills</Label>
        <div className="space-y-3">
          {items.map((skill, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-white border border-[#e5e5ea] rounded-2xl space-y-2.5 relative group shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button
                  disabled={idx === 0}
                  onClick={() => {
                    const newItems = [...items];
                    [newItems[idx - 1], newItems[idx]] = [newItems[idx], newItems[idx - 1]];
                    updateData({ skillItems: newItems, skills: newItems.map((item) => item.name) });
                  }}
                  className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 disabled:opacity-30"
                >
                  <span className="text-[10px]">▲</span>
                </button>
                <button
                  disabled={idx === items.length - 1}
                  onClick={() => {
                    const newItems = [...items];
                    [newItems[idx + 1], newItems[idx]] = [newItems[idx], newItems[idx + 1]];
                    updateData({ skillItems: newItems, skills: newItems.map((item) => item.name) });
                  }}
                  className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 disabled:opacity-30"
                >
                  <span className="text-[10px]">▼</span>
                </button>
                <button
                  onClick={() => {
                    const newItems = items.filter((_, i) => i !== idx);
                    updateData({ skillItems: newItems, skills: newItems.map((item) => item.name) });
                  }}
                  className="w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-2">
                <input
                  {...field(`skillItems.${idx}.name`)}
                  type="text"
                  className="w-full text-[12px] p-2 rounded-xl border border-[#e5e5ea] outline-none focus:border-[#0071e3] transition-colors bg-[#f5f5f7] focus:bg-white pr-24"
                  value={skill.name || ""}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[idx] = { ...newItems[idx], name: e.target.value };
                    updateData({ skillItems: newItems, skills: newItems.map((item) => item.name) });
                  }}
                  placeholder="Skill name (e.g. React, UX Design)"
                />
                
                <div className="pt-1 border-t border-[#f2f2f7] space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold text-[#8e8e93]">Proficiency Level</p>
                    <span className="text-[10px] font-bold text-[#0071e3]">{skill.level || 1}/5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    className="w-full h-1.5 bg-[#e5e5ea] rounded-full appearance-none cursor-pointer accent-[#0071e3]"
                    value={skill.level || 1}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[idx] = { ...newItems[idx], level: parseInt(e.target.value, 10) };
                      updateData({ skillItems: newItems, skills: newItems.map((item) => item.name) });
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            const newItems = [...items, { name: "", level: 3 }];
            updateData({ skillItems: newItems, skills: newItems.map((item) => item.name) });
          }}
          className="w-full py-2.5 rounded-xl border border-dashed border-[#c7c7cc] text-[#0071e3] text-[12px] font-semibold hover:bg-[#e8f0fe] hover:border-[#0071e3] transition-all"
        >
          + Add Skill
        </button>
      </div>
    );
  }

  if (selected === "certifications") {
    return (
      <div className="space-y-4">
        <Label>Certifications</Label>
        <div className="p-3.5 bg-white border border-[#e5e5ea] rounded-2xl shadow-sm">
          <textarea
            {...field("certifications")}
            className="w-full text-[12px] p-2 rounded-xl border border-[#e5e5ea] outline-none focus:border-[#0071e3] transition-colors bg-[#f5f5f7] focus:bg-white h-24 resize-none"
            value={data.certifications.join("\n")}
            onChange={(e) => updateData("certifications", e.target.value.split("\n"))}
            placeholder="AWS Certified...&#10;Google Cloud..."
          />
          <p className="text-[10px] text-[#8e8e93] mt-1.5 font-medium">
            One certification per line
          </p>
        </div>
      </div>
    );
  }

  if (selected === "languages") {
    return (
      <div className="space-y-4">
        <Label>Languages</Label>
        <div className="p-3.5 bg-white border border-[#e5e5ea] rounded-2xl shadow-sm">
          <textarea
            {...field("languages")}
            className="w-full text-[12px] p-2 rounded-xl border border-[#e5e5ea] outline-none focus:border-[#0071e3] transition-colors bg-[#f5f5f7] focus:bg-white h-24 resize-none"
            value={(data.languages || []).join("\n")}
            onChange={(e) =>
              updateData(
                "languages",
                e.target.value
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean),
              )
            }
            placeholder="English\nSpanish\nArabic"
          />
          <p className="text-[10px] text-[#8e8e93] mt-1.5 font-medium">One language per line</p>
        </div>
      </div>
    );
  }

  if (selected !== "global" && selected !== "header" && selected !== "summary") {
    const section = selected as Exclude<SectionId, "global" | "header" | "summary">;
    return (
      <div className="space-y-4">
        <Label>{SECTION_META[section].label} Items</Label>
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center">
          <p className="text-[11px] text-slate-500">
            Edit {selected} directly on the resume canvas by clicking the text!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Section order drag list */}
      <div>
        <Label>Section Order</Label>
        <div className="space-y-1">
          {design.contentOrder.map((sec, idx) => (
            <div
              key={sec}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5"
            >
              <GripVertical className="w-3 h-3 shrink-0 text-slate-400" />
              <span className="flex-1 text-[11px] font-medium capitalize text-slate-700">
                {sec}
              </span>
              <div className="flex gap-0.5">
                <button
                  disabled={idx === 0}
                  onClick={() => {
                    const o = [...design.contentOrder];
                    [o[idx - 1], o[idx]] = [o[idx], o[idx - 1]];
                    onChange({ contentOrder: o });
                  }}
                  className="flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-black text-slate-500 transition-colors hover:bg-white hover:text-slate-800 disabled:opacity-20"
                >
                  ▲
                </button>
                <button
                  disabled={idx === design.contentOrder.length - 1}
                  onClick={() => {
                    const o = [...design.contentOrder];
                    [o[idx + 1], o[idx]] = [o[idx], o[idx + 1]];
                    onChange({ contentOrder: o });
                  }}
                  className="flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-black text-slate-500 transition-colors hover:bg-white hover:text-slate-800 disabled:opacity-20"
                >
                  ▼
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Photo settings */}
      <div>
        <Label>Profile Photo</Label>
        <Select
          value={design.photoShape}
          onChange={(v) => onChange({ photoShape: v as DesignSettings["photoShape"] })}
          options={[
            { value: "circle", label: "Circle" },
            { value: "rounded", label: "Rounded Square" },
            { value: "square", label: "Square" },
            { value: "none", label: "Hide Photo" },
          ]}
        />
        {design.photoShape !== "none" && (
          <div className="mt-2">
            <Slider
              label="Photo Size"
              value={design.photoSize}
              min={50}
              max={140}
              step={4}
              unit="px"
              onChange={(v) => onChange({ photoSize: v })}
            />
          </div>
        )}
      </div>

      {/* Skill bars */}
      <div className="space-y-2">
        <Toggle
          label="Show Skill Bars"
          checked={design.showSkillBars}
          onChange={(v) => onChange({ showSkillBars: v })}
        />
        {design.showSkillBars && (
          <div className="space-y-3 mt-2">
            <div>
              <Label>Skill Bar Style</Label>
              <Select
                value={design.skillBarStyle}
                onChange={(v) => onChange({ skillBarStyle: v as DesignSettings["skillBarStyle"] })}
                options={[
                  { value: "filled", label: "Filled Bar" },
                  { value: "dots", label: "Dots" },
                  { value: "circles", label: "Circles" },
                  { value: "lines", label: "Lines" },
                  { value: "stars", label: "Stars" },
                  { value: "text", label: "Text Level" },
                ]}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Placement</Label>
                <Select
                  value={design.skillsLocation || "sidebar"}
                  onChange={(v) => onChange({ skillsLocation: v as "sidebar" | "main" })}
                  options={[
                    { value: "sidebar", label: "Sidebar" },
                    { value: "main", label: "Main Area" },
                  ]}
                />
              </div>
              <div>
                <Label>Columns</Label>
                <Select
                  value={String(design.skillsColumns || 1)}
                  onChange={(v) => onChange({ skillsColumns: parseInt(v) as 1 | 2 })}
                  options={[
                    { value: "1", label: "1 Column" },
                    { value: "2", label: "2 Columns" },
                  ]}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── STYLE TAB ────────────────────────────────────────────────────────────────
function StyleTab({
  design,
  onChange,
}: {
  design: DesignSettings;
  onChange: (p: Partial<DesignSettings>) => void;
}) {
  return (
    <div className="space-y-5">
      {/* Quick Palettes */}
      <div>
        <Label>Quick Palettes</Label>
        <div className="flex flex-wrap gap-2">
          {PALETTES.map((p) => (
            <button
              key={p.name}
              title={p.name}
              onClick={() =>
                onChange({
                  accentColor: p.accent,
                  headingColor: p.heading,
                  textColor: p.text,
                  sidebarColor: p.sidebar,
                  backgroundColor: p.bg,
                })
              }
              className="group flex flex-col items-center gap-1.5 transition-transform hover:-translate-y-0.5"
            >
              <div
                className="flex h-6 w-10 overflow-hidden rounded-lg border border-slate-200 transition-all group-hover:ring-2 group-hover:ring-blue-400/40"
                style={{ boxShadow: "0 1px 3px rgba(15,23,42,0.08)" }}
              >
                <span className="w-1/2 h-full" style={{ background: p.accent }} />
                <span className="w-1/2 h-full" style={{ background: p.sidebar }} />
              </div>
              <span className="text-[8px] font-medium text-slate-500">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div className="space-y-3">
        <Label>Typography</Label>
        <div>
          <p className="text-[9px] mb-1" style={{ color: "#6e6e73" }}>
            Body Font
          </p>
          <Select
            value={design.fontFamily}
            onChange={(v) => onChange({ fontFamily: v })}
            options={FONTS.map((f) => ({ value: f, label: f }))}
          />
        </div>
        <div>
          <p className="text-[9px] mb-1" style={{ color: "#6e6e73" }}>
            Heading Font
          </p>
          <Select
            value={design.headingFontFamily}
            onChange={(v) => onChange({ headingFontFamily: v })}
            options={FONTS.map((f) => ({ value: f, label: f }))}
          />
        </div>
        <Slider
          label="Base Font Size"
          value={design.baseFontSize}
          min={9}
          max={14}
          step={0.5}
          unit="px"
          onChange={(v) => onChange({ baseFontSize: v })}
        />
        <Slider
          label="Heading Scale"
          value={design.headingScale}
          min={1}
          max={2.5}
          step={0.05}
          onChange={(v) => onChange({ headingScale: v })}
        />
        <Slider
          label="Line Height"
          value={design.lineHeight}
          min={1.1}
          max={2.2}
          step={0.05}
          onChange={(v) => onChange({ lineHeight: v })}
        />
        <Slider
          label="Letter Spacing"
          value={design.letterSpacing}
          min={-0.05}
          max={0.2}
          step={0.01}
          unit="em"
          onChange={(v) => onChange({ letterSpacing: v })}
        />
      </div>

      {/* Colors */}
      <div className="space-y-1">
        <Label>Colors</Label>
        <ColorSwatch
          label="Accent"
          value={design.accentColor}
          onChange={(v) => onChange({ accentColor: v })}
        />
        <ColorSwatch
          label="Headings"
          value={design.headingColor}
          onChange={(v) => onChange({ headingColor: v })}
        />
        <ColorSwatch
          label="Body Text"
          value={design.textColor}
          onChange={(v) => onChange({ textColor: v })}
        />
        <ColorSwatch
          label="Background"
          value={design.backgroundColor}
          onChange={(v) => onChange({ backgroundColor: v })}
        />
        <ColorSwatch
          label="Sidebar / Header"
          value={design.sidebarColor}
          onChange={(v) => onChange({ sidebarColor: v })}
        />
      </div>

      {/* Decorations */}
      <div className="space-y-3">
        <Label>Decorations</Label>
        <Toggle
          label="Section Dividers"
          checked={design.showDividers}
          onChange={(v) => onChange({ showDividers: v })}
        />
        {design.showDividers && (
          <IconRow
            label="Divider Style"
            value={design.dividerStyle}
            onChange={(v) => onChange({ dividerStyle: v })}
            options={[
              { value: "solid", icon: <Minus className="w-3 h-3" />, tip: "Solid" },
              {
                value: "dashed",
                icon: <span className="text-[10px] font-black">╌</span>,
                tip: "Dashed",
              },
              {
                value: "dotted",
                icon: <span className="text-[10px] font-black">···</span>,
                tip: "Dotted",
              },
              { value: "none", icon: <X className="w-3 h-3" />, tip: "None" },
            ]}
          />
        )}
        <IconRow
          label="Header Shape"
          value={design.headerShape}
          onChange={(v) => onChange({ headerShape: v })}
          options={[
            { value: "none", icon: <X className="w-3 h-3" />, tip: "None" },
            { value: "bar", icon: <Minus className="w-3 h-3" />, tip: "Bar" },
            { value: "wave", icon: <span className="text-[11px] font-black">∿</span>, tip: "Wave" },
            {
              value: "diagonal",
              icon: <span className="text-[11px] font-black">◺</span>,
              tip: "Diagonal",
            },
            { value: "arch", icon: <span className="text-[11px] font-black">⌢</span>, tip: "Arch" },
          ]}
        />
        <IconRow
          label="Bullet Style"
          value={design.bulletStyle}
          onChange={(v) => onChange({ bulletStyle: v })}
          options={[
            { value: "dot", icon: <Circle className="w-2 h-2 fill-current" />, tip: "Dot" },
            { value: "dash", icon: <Minus className="w-3 h-3" />, tip: "Dash" },
            {
              value: "square",
              icon: <Square className="w-2.5 h-2.5 fill-current" />,
              tip: "Square",
            },
            { value: "arrow", icon: <ArrowRight className="w-3 h-3" />, tip: "Arrow" },
            { value: "star", icon: <Star className="w-2.5 h-2.5 fill-current" />, tip: "Star" },
            { value: "none", icon: <X className="w-3 h-3" />, tip: "None" },
          ]}
        />
        <Toggle
          label="Section Icons"
          checked={design.showSectionIcons}
          onChange={(v) => onChange({ showSectionIcons: v })}
        />
      </div>
    </div>
  );
}

// ─── LAYOUT TAB ───────────────────────────────────────────────────────────────
function LayoutTab({
  design,
  onChange,
}: {
  design: DesignSettings;
  onChange: (p: Partial<DesignSettings>) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <Label>Column Layout</Label>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              { value: "single", label: "Single Column" },
              { value: "two-col", label: "Two Columns" },
              { value: "sidebar-left", label: "Sidebar Left" },
              { value: "sidebar-right", label: "Sidebar Right" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ columnLayout: opt.value })}
              className="rounded-2xl px-2.5 py-3 text-[10px] font-semibold transition-all"
              style={{
                background: design.columnLayout === opt.value ? "#eff6ff" : "#f8fafc",
                border: `1px solid ${design.columnLayout === opt.value ? "#2563eb" : "#cbd5e1"}`,
                color: design.columnLayout === opt.value ? "#2563eb" : "#334155",
                boxShadow:
                  design.columnLayout === opt.value ? "0 1px 4px rgba(37,99,235,0.16)" : "none",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label>Photo & Skills</Label>
        <div className="mb-3 grid grid-cols-2 gap-2">
          {(
            [
              { value: "circle", label: "Circle" },
              { value: "rounded", label: "Rounded" },
              { value: "square", label: "Square" },
              { value: "none", label: "Hidden" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ photoShape: opt.value })}
              className="rounded-2xl px-2 py-2 text-[10px] font-semibold transition-all"
              style={{
                background: design.photoShape === opt.value ? "#eff6ff" : "#f8fafc",
                border: `1px solid ${design.photoShape === opt.value ? "#2563eb" : "#cbd5e1"}`,
                color: design.photoShape === opt.value ? "#2563eb" : "#334155",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <Slider
          label="Photo Size"
          value={design.photoSize || 80}
          min={40}
          max={160}
          step={4}
          unit="px"
          onChange={(v) => onChange({ photoSize: v })}
        />

        <Label>Skill Bar Style</Label>
        <div className="mb-2 grid grid-cols-3 gap-2">
          {(
            [
              { value: "filled", label: "Filled Bar" },
              { value: "lines", label: "Lines" },
              { value: "dots", label: "Dots" },
              { value: "circles", label: "Circles" },
              { value: "stars", label: "Stars" },
              { value: "text", label: "Text Level" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ skillBarStyle: opt.value, showSkillBars: true })}
              className="rounded-2xl px-2 py-2 text-[10px] font-semibold transition-all"
              style={{
                background:
                  design.skillBarStyle === opt.value && design.showSkillBars
                    ? "#eff6ff"
                    : "#f8fafc",
                border: `1px solid ${design.skillBarStyle === opt.value && design.showSkillBars ? "#2563eb" : "#cbd5e1"}`,
                color:
                  design.skillBarStyle === opt.value && design.showSkillBars
                    ? "#2563eb"
                    : "#334155",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
        
        <div className="mb-4 grid grid-cols-2 gap-2">
          <div>
            <Label>Skills Placement</Label>
            <div className="grid grid-cols-2 gap-1 mt-1">
              <button
                onClick={() => onChange({ skillsLocation: "sidebar" })}
                className="rounded-xl px-2 py-1.5 text-[10px] font-semibold transition-all"
                style={{
                  background: (!design.skillsLocation || design.skillsLocation === "sidebar") ? "#eff6ff" : "#f8fafc",
                  border: `1px solid ${(!design.skillsLocation || design.skillsLocation === "sidebar") ? "#2563eb" : "#cbd5e1"}`,
                  color: (!design.skillsLocation || design.skillsLocation === "sidebar") ? "#2563eb" : "#334155",
                }}
              >
                Sidebar
              </button>
              <button
                onClick={() => onChange({ skillsLocation: "main" })}
                className="rounded-xl px-2 py-1.5 text-[10px] font-semibold transition-all"
                style={{
                  background: design.skillsLocation === "main" ? "#eff6ff" : "#f8fafc",
                  border: `1px solid ${design.skillsLocation === "main" ? "#2563eb" : "#cbd5e1"}`,
                  color: design.skillsLocation === "main" ? "#2563eb" : "#334155",
                }}
              >
                Main Area
              </button>
            </div>
          </div>
          <div>
            <Label>Skills Columns</Label>
            <div className="grid grid-cols-2 gap-1 mt-1">
              <button
                onClick={() => onChange({ skillsColumns: 1 })}
                className="rounded-xl px-2 py-1.5 text-[10px] font-semibold transition-all"
                style={{
                  background: (!design.skillsColumns || design.skillsColumns === 1) ? "#eff6ff" : "#f8fafc",
                  border: `1px solid ${(!design.skillsColumns || design.skillsColumns === 1) ? "#2563eb" : "#cbd5e1"}`,
                  color: (!design.skillsColumns || design.skillsColumns === 1) ? "#2563eb" : "#334155",
                }}
              >
                1 Column
              </button>
              <button
                onClick={() => onChange({ skillsColumns: 2 })}
                className="rounded-xl px-2 py-1.5 text-[10px] font-semibold transition-all"
                style={{
                  background: design.skillsColumns === 2 ? "#eff6ff" : "#f8fafc",
                  border: `1px solid ${design.skillsColumns === 2 ? "#2563eb" : "#cbd5e1"}`,
                  color: design.skillsColumns === 2 ? "#2563eb" : "#334155",
                }}
              >
                2 Columns
              </button>
            </div>
          </div>
        </div>
        <Toggle
          label="Show Skill Bars"
          checked={design.showSkillBars}
          onChange={(v) => onChange({ showSkillBars: v })}
        />
      </div>

      <div className="space-y-3">
        <Label>Canvas Decorations</Label>
        <Toggle
          label="Show Decorations"
          checked={design.showCanvasDecorations}
          onChange={(v) => onChange({ showCanvasDecorations: v })}
        />
        {design.showCanvasDecorations && (
          <IconRow
            label="Decoration Style"
            value={design.canvasDecorationStyle}
            onChange={(v) => onChange({ canvasDecorationStyle: v })}
            options={[
              {
                value: "blobs",
                icon: <span className="text-[11px] font-black">◔</span>,
                tip: "Blobs",
              },
              {
                value: "grid",
                icon: <span className="text-[11px] font-black">#</span>,
                tip: "Grid",
              },
              {
                value: "corners",
                icon: <span className="text-[11px] font-black">⌟</span>,
                tip: "Corners",
              },
              { value: "none", icon: <X className="w-3 h-3" />, tip: "None" },
            ]}
          />
        )}
      </div>

      <div className="space-y-3">
        <Label>Page Spacing</Label>
        <Slider
          label="Padding X"
          value={design.pagePaddingX}
          min={12}
          max={80}
          step={2}
          unit="px"
          onChange={(v) => onChange({ pagePaddingX: v })}
        />
        <Slider
          label="Padding Y"
          value={design.pagePaddingY}
          min={12}
          max={80}
          step={2}
          unit="px"
          onChange={(v) => onChange({ pagePaddingY: v })}
        />
        <Slider
          label="Section Gap"
          value={design.sectionGap}
          min={4}
          max={60}
          step={2}
          unit="px"
          onChange={(v) => onChange({ sectionGap: v })}
        />
        <Slider
          label="Item Gap"
          value={design.itemGap}
          min={2}
          max={32}
          step={1}
          unit="px"
          onChange={(v) => onChange({ itemGap: v })}
        />
      </div>
    </div>
  );
}

// ─── Section nav pill ─────────────────────────────────────────────────────────
function SectionPill({
  id,
  selected,
  onClick,
}: {
  id: SectionId;
  selected: boolean;
  onClick: () => void;
}) {
  const { icon: Icon, label } = SECTION_META[id];
  return (
    <button
      onClick={onClick}
      className="flex w-full flex-col items-center gap-1 rounded-xl px-1 py-2 transition-all"
      style={{
        background: selected ? "#eff6ff" : "transparent",
        border: `1px solid ${selected ? "#2563eb" : "transparent"}`,
        color: selected ? "#2563eb" : "#64748b",
      }}
    >
      <Icon className="w-3.5 h-3.5" />
      <span className="text-[8px] font-semibold text-center leading-tight">{label}</span>
    </button>
  );
}

// ─── Tab button ───────────────────────────────────────────────────────────────
type Tab = "content" | "style" | "layout";
function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="flex-1 rounded-lg py-1.5 text-[9px] font-semibold uppercase tracking-widest transition-all"
      style={{
        background: active ? "#ffffff" : "transparent",
        color: active ? "#1d1d1f" : "#64748b",
        border: active ? "1px solid #cbd5e1" : "1px solid transparent",
        boxShadow: active ? "0 1px 3px rgba(15,23,42,0.08)" : "none",
      }}
    >
      {children}
    </button>
  );
}

const ALL_SECTIONS: SectionId[] = [
  "global",
  "header",
  "summary",
  "experience",
  "education",
  "skills",
  "projects",
  "certifications",
  "languages",
];

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export function DesignPanel({
  design,
  data,
  onChange,
  updateData,
  onClose,
  selected,
  setSelected,
  focusedField,
}: {
  design: DesignSettings;
  data: ResumeData;
  onChange: (patch: Partial<DesignSettings>) => void;
  updateData: (patchOrPath: Partial<ResumeData> | string, val?: unknown) => void;
  onClose: () => void;
  selected: SectionId;
  setSelected: (s: SectionId) => void;
  focusedField?: string | null;
}) {
  const [tab, setTab] = useState<Tab>(selected === "global" ? "style" : "content");

  useEffect(() => {
    setTab(selected === "global" ? "style" : "content");
  }, [selected]);

  useEffect(() => {
    if (focusedField) setTab("content");
  }, [focusedField]);

  return (
    <SelectionContext.Provider value={{ selected, setSelected }}>
      <div className="flex h-full w-full flex-col select-none bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.92))] text-[#1d1d1f]">
        {/* Header */}
        <div
          className="flex shrink-0 items-center justify-between border-b border-slate-200/70 px-5 py-4"
          style={{
            background: "linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.92))",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
              <Sliders className="w-4 h-4" style={{ color: "#0071e3" }} />
            </div>
            <div>
              <p className="text-[13px] font-semibold tracking-tight text-slate-900">Design</p>
              <p className="text-[9px] leading-none text-slate-500">Figma-style editor</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-end rounded-2xl border border-slate-200 bg-slate-50 px-3 py-1.5 sm:flex flex-col mr-1.5">
              <span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Editing
              </span>
              <span className="max-w-[140px] truncate text-[11px] font-semibold text-slate-900">
                {focusedField
                  ? focusedField.split(".").slice(-1)[0] || SECTION_META[selected].label
                  : SECTION_META[selected].label}
              </span>
            </div>
            <button
              onClick={() => onChange({ ...DEFAULT_DESIGN })}
              title="Reset"
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex shrink-0 items-center gap-1 border-b border-slate-200 bg-slate-50/80 px-2 py-2">
          <TabBtn active={tab === "content"} onClick={() => setTab("content")}>
            Content
          </TabBtn>
          <TabBtn active={tab === "style"} onClick={() => setTab("style")}>
            Style
          </TabBtn>
          <TabBtn active={tab === "layout"} onClick={() => setTab("layout")}>
            Layout
          </TabBtn>
        </div>

        {/* Body: section nav + controls */}
        <div className="flex flex-1 overflow-hidden">
          {/* Section nav */}
          <nav className="flex w-[76px] shrink-0 flex-col gap-1 overflow-y-auto border-r border-slate-200 bg-slate-50 p-1.5">
            {ALL_SECTIONS.map((id) => (
              <SectionPill
                key={id}
                id={id}
                selected={selected === id}
                onClick={() => setSelected(id)}
              />
            ))}
          </nav>

          {/* Controls */}
          <div
            className="flex-1 overflow-y-auto p-4"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#e5e5ea transparent" }}
          >
            {/* Section banner */}
            <div className="mb-4 flex items-center gap-2 border-b border-slate-200 pb-3">
              {(() => {
                const Icon = SECTION_META[selected].icon;
                return (
                  <>
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-50">
                      <span style={{ color: "#3b82f6" }}>
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-700">
                      {SECTION_META[selected].label}
                    </span>
                  </>
                );
              })()}
            </div>

            {tab === "content" && (
              <ContentTab
                selected={selected}
                design={design}
                data={data}
                onChange={onChange}
                updateData={updateData}
              />
            )}
            {tab === "style" && <StyleTab design={design} onChange={onChange} />}
            {tab === "layout" && <LayoutTab design={design} onChange={onChange} />}
          </div>
        </div>

        {/* Footer live indicator */}
        <div className="flex shrink-0 items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-2">
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-[9px] font-semibold text-emerald-700">LIVE PREVIEW</span>
          </div>
          <span className="text-[9px] font-medium text-slate-500">
            {SECTION_META[selected].label}
          </span>
        </div>
      </div>
    </SelectionContext.Provider>
  );
}

// ─── CSS variable bridge ──────────────────────────────────────────────────────
export function designToCSSVars(d: DesignSettings): React.CSSProperties {
  const bullet =
    d.bulletStyle === "dot"
      ? "•"
      : d.bulletStyle === "dash"
        ? "–"
        : d.bulletStyle === "square"
          ? "▪"
          : d.bulletStyle === "arrow"
            ? "›"
            : d.bulletStyle === "star"
              ? "★"
              : "";

  return {
    "--ds-font": d.fontFamily,
    "--ds-font-heading": d.headingFontFamily,
    "--ds-font-size": `${d.baseFontSize}px`,
    "--ds-heading-scale": String(d.headingScale),
    "--ds-line-height": String(d.lineHeight),
    "--ds-letter-spacing": `${d.letterSpacing}em`,
    "--ds-accent": d.accentColor,
    "--ds-text": d.textColor,
    "--ds-heading": d.headingColor,
    "--ds-bg": d.backgroundColor,
    "--ds-sidebar": d.sidebarColor,
    "--ds-pad-x": `${d.pagePaddingX}px`,
    "--ds-pad-y": `${d.pagePaddingY}px`,
    "--ds-section-gap": `${d.sectionGap}px`,
    "--ds-item-gap": `${d.itemGap}px`,
    "--ds-divider": d.showDividers ? d.dividerStyle : "none",
    "--ds-bullet": `"${bullet}"`,
    "--ds-photo-radius":
      d.photoShape === "circle" ? "50%" : d.photoShape === "rounded" ? "12px" : "0px",
    "--ds-photo-size": d.photoShape === "none" ? "0px" : `${d.photoSize}px`,
  } as React.CSSProperties;
}
