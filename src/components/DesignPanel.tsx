/**
 * DesignPanel — Figma-like selection-based design sidebar.
 * Click any section in the preview → highlights it → shows its controls here.
 * Tabs: Content · Style · Layout
 */
import { useState, createContext, useContext } from "react";
import type { ReactNode, FC } from "react";
import type { DesignSettings, ResumeData } from "@/lib/types";
import {
  X, RotateCcw, Sliders,
  Minus, Circle, Square, ArrowRight, Star,
  GripVertical,
  Briefcase, GraduationCap, Award, FolderOpen,
  BarChart3, AlignLeft, User,
} from "lucide-react";

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
  showSkillBars: false,
  skillBarStyle: "filled",
  photoShape: "circle",
  photoSize: 80,
  columnLayout: "single",
  contentOrder: ["summary", "experience", "education", "skills", "projects", "certifications"],
};

// ─── Section registry ─────────────────────────────────────────────────────────
export type SectionId =
  | "header" | "summary" | "experience" | "education"
  | "skills" | "projects" | "certifications" | "global";

export const SECTION_META: Record<SectionId, { label: string; icon: FC<{ className?: string }> }> = {
  global:       { label: "Global Style",    icon: Sliders },
  header:       { label: "Header",          icon: User },
  summary:      { label: "Summary",         icon: AlignLeft },
  experience:   { label: "Experience",      icon: Briefcase },
  education:    { label: "Education",       icon: GraduationCap },
  skills:       { label: "Skills",          icon: BarChart3 },
  projects:     { label: "Projects",        icon: FolderOpen },
  certifications:{ label: "Certifications", icon: Award },
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
  { name: "Ocean",   accent: "#2563eb", heading: "#0f172a", text: "#1e293b", sidebar: "#1e3a5f", bg: "#ffffff" },
  { name: "Forest",  accent: "#16a34a", heading: "#14532d", text: "#1a3526", sidebar: "#14532d", bg: "#f0fdf4" },
  { name: "Ruby",    accent: "#e11d48", heading: "#4c0519", text: "#1e0a10", sidebar: "#9f1239", bg: "#fff1f2" },
  { name: "Slate",   accent: "#475569", heading: "#0f172a", text: "#1e293b", sidebar: "#0f172a", bg: "#f8fafc" },
  { name: "Teal",    accent: "#0d9488", heading: "#042f2e", text: "#1a3130", sidebar: "#134e4a", bg: "#f0fdfa" },
  { name: "Amber",   accent: "#d97706", heading: "#451a03", text: "#1c0d00", sidebar: "#78350f", bg: "#fffbeb" },
  { name: "Violet",  accent: "#7c3aed", heading: "#2e1065", text: "#1e1030", sidebar: "#2e1065", bg: "#faf5ff" },
  { name: "Noir",    accent: "#a1a1aa", heading: "#ffffff", text: "#d4d4d8", sidebar: "#09090b", bg: "#18181b" },
];

const FONTS = [
  "DM Sans", "Space Grotesk", "Outfit", "Manrope", "Plus Jakarta Sans",
  "Nunito", "Raleway", "Montserrat", "Lato", "Roboto", "Open Sans",
  "Source Sans Pro", "Playfair Display", "Merriweather", "EB Garamond",
  "Crimson Text", "Libre Baskerville", "PT Serif",
];

// ─── Atom: label ─────────────────────────────────────────────────────────────
function Label({ children }: { children: ReactNode }) {
  return (
    <p className="text-[9px] font-semibold uppercase tracking-[0.1em] mb-1.5 select-none" style={{ color: "#6e6e73" }}>
      {children}
    </p>
  );
}

// ─── Atom: slider ────────────────────────────────────────────────────────────
function Slider({
  label, value, min, max, step, unit = "", onChange,
}: {
  label: string; value: number; min: number; max: number; step: number;
  unit?: string; onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span className="text-[10px] font-semibold tabular-nums" style={{ color: "#0071e3" }}>
          {typeof value === "number" && !Number.isInteger(value) ? value.toFixed(2) : value}{unit}
        </span>
      </div>
      <div className="relative h-4 flex items-center">
        <div className="absolute inset-x-0 h-[3px] rounded-full" style={{ background: "#e5e5ea" }} />
        <div className="absolute h-[3px] rounded-full" style={{ width: `${pct}%`, background: "#0071e3" }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-4"
        />
        <div
          className="absolute w-3.5 h-3.5 rounded-full shadow pointer-events-none"
          style={{ left: `calc(${pct}% - 7px)`, background: "#ffffff", border: "2px solid #0071e3", boxShadow: "0 1px 4px rgba(0,113,227,0.3)" }}
        />
      </div>
    </div>
  );
}

// ─── Atom: select ────────────────────────────────────────────────────────────
function Select({
  value, onChange, options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl px-3 py-2 text-[11px] font-medium cursor-pointer appearance-none focus:outline-none"
      style={{
        background: "#f5f5f7",
        border: "1px solid #d1d1d6",
        color: "#1d1d1f",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

// ─── Atom: color swatch ───────────────────────────────────────────────────────
function ColorSwatch({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2.5 py-1.5">
      <label className="relative cursor-pointer shrink-0">
        <span
          className="block w-6 h-6 rounded-md hover:scale-105 transition-transform"
          style={{ background: value, boxShadow: "0 0 0 1px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)" }}
        />
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
      </label>
      <span className="flex-1 text-[11px] font-medium" style={{ color: "#3a3a3c" }}>{label}</span>
      <span className="text-[9px] font-mono" style={{ color: "#8e8e93" }}>{value.toUpperCase()}</span>
    </div>
  );
}

// ─── Atom: toggle ─────────────────────────────────────────────────────────────
function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-[11px] font-medium" style={{ color: "#3a3a3c" }}>{label}</span>
      <button
        onClick={() => onChange(!checked)}
        aria-label={label}
        className="relative w-9 h-5 rounded-full transition-all duration-200 shrink-0"
        style={{ background: checked ? "#34c759" : "#e5e5ea" }}
      >
        <span
          className="absolute top-[2px] h-[16px] w-[16px] rounded-full bg-white shadow-sm transition-all duration-200"
          style={{ left: checked ? "calc(100% - 18px)" : "2px", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }}
        />
      </button>
    </div>
  );
}

// ─── Atom: icon row ───────────────────────────────────────────────────────────
function IconRow<T extends string>({
  label, value, options, onChange,
}: {
  label: string;
  value: T;
  options: { value: T; icon: ReactNode; tip: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o.value} onClick={() => onChange(o.value)} title={o.tip}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
            style={{
              background: value === o.value ? "#0071e3" : "#f5f5f7",
              border: `1px solid ${value === o.value ? "#0071e3" : "#d1d1d6"}`,
              color: value === o.value ? "#fff" : "#3a3a3c",
              boxShadow: value === o.value ? "0 1px 4px rgba(0,113,227,0.25)" : "none",
            }}
          >
            {o.icon}
          </button>
        ))}
      </div>
    </div>
  );
}


// ─── CONTENT TAB ─────────────────────────────────────────────────────────────
function ContentTab({ selected, design, data, onChange, updateData }: {
  selected: SectionId;
  design: DesignSettings;
  data: ResumeData;
  onChange: (p: Partial<DesignSettings>) => void;
  updateData: (path: string, val: any) => void;
}) {
  // Show section-level visibility toggles
  const sections: SectionId[] = ["summary", "experience", "education", "skills", "projects", "certifications"];

  if (selected === "header") {
    return (
      <div className="space-y-4">
        <Label>Personal Details</Label>
        <div className="space-y-3">
          <div>
            <p className="text-[9px] mb-1" style={{ color: "#6e6e73" }}>Full Name</p>
            <input type="text" className="w-full text-[11px] p-2 rounded-lg border border-slate-200 outline-none focus:border-blue-500 transition-colors" value={data.name || ""} onChange={(e) => updateData("name", e.target.value)} />
          </div>
          <div>
            <p className="text-[9px] mb-1" style={{ color: "#6e6e73" }}>Professional Title</p>
            <input type="text" className="w-full text-[11px] p-2 rounded-lg border border-slate-200 outline-none focus:border-blue-500 transition-colors" value={data.title || ""} onChange={(e) => updateData("title", e.target.value)} />
          </div>
          <div>
            <p className="text-[9px] mb-1" style={{ color: "#6e6e73" }}>Email</p>
            <input type="email" className="w-full text-[11px] p-2 rounded-lg border border-slate-200 outline-none focus:border-blue-500 transition-colors" value={data.email || ""} onChange={(e) => updateData("email", e.target.value)} />
          </div>
          <div>
            <p className="text-[9px] mb-1" style={{ color: "#6e6e73" }}>Phone</p>
            <input type="tel" className="w-full text-[11px] p-2 rounded-lg border border-slate-200 outline-none focus:border-blue-500 transition-colors" value={data.phone || ""} onChange={(e) => updateData("phone", e.target.value)} />
          </div>
          <div>
            <p className="text-[9px] mb-1" style={{ color: "#6e6e73" }}>Location</p>
            <input type="text" className="w-full text-[11px] p-2 rounded-lg border border-slate-200 outline-none focus:border-blue-500 transition-colors" value={data.location || ""} onChange={(e) => updateData("location", e.target.value)} />
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
          <textarea className="w-full text-[11px] p-2 rounded-lg border border-slate-200 outline-none focus:border-blue-500 transition-colors h-40 resize-none" value={data.summary || ""} onChange={(e) => updateData("summary", e.target.value)} placeholder="A brief summary of your professional background..." />
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
            <div key={idx} className="p-3.5 bg-white border border-[#e5e5ea] rounded-2xl space-y-2.5 relative group shadow-sm transition-shadow hover:shadow-md">
              <button 
                onClick={() => updateData("experience", data.experience.filter((_, i) => i !== idx))}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
              
              <div className="grid grid-cols-2 gap-2">
                <input type="text" className="w-full text-[12px] p-2 rounded-xl border border-[#e5e5ea] outline-none focus:border-[#0071e3] transition-colors bg-[#f5f5f7] focus:bg-white" value={exp.title || ""} onChange={(e) => updateData(`experience.${idx}.title`, e.target.value)} placeholder="Job Title" />
                <input type="text" className="w-full text-[12px] p-2 rounded-xl border border-[#e5e5ea] outline-none focus:border-[#0071e3] transition-colors bg-[#f5f5f7] focus:bg-white" value={exp.company || ""} onChange={(e) => updateData(`experience.${idx}.company`, e.target.value)} placeholder="Company" />
              </div>
              <input type="text" className="w-full text-[12px] p-2 rounded-xl border border-[#e5e5ea] outline-none focus:border-[#0071e3] transition-colors bg-[#f5f5f7] focus:bg-white" value={exp.duration || ""} onChange={(e) => updateData(`experience.${idx}.duration`, e.target.value)} placeholder="Duration" />
              <textarea className="w-full text-[12px] p-2 rounded-xl border border-[#e5e5ea] outline-none focus:border-[#0071e3] transition-colors bg-[#f5f5f7] focus:bg-white h-16 resize-none" value={exp.description || ""} onChange={(e) => updateData(`experience.${idx}.description`, e.target.value)} placeholder="Description" />
              
              <div className="space-y-1.5 pt-1 border-t border-[#f2f2f7]">
                <p className="text-[10px] font-semibold text-[#8e8e93]">Achievements</p>
                {exp.achievements.map((ach, aIdx) => (
                  <div key={aIdx} className="flex gap-1.5 relative group/ach">
                    <input type="text" className="flex-1 text-[11px] p-1.5 rounded-lg border border-[#e5e5ea] outline-none focus:border-[#0071e3] bg-[#f5f5f7] focus:bg-white" value={ach || ""} onChange={(e) => updateData(`experience.${idx}.achievements.${aIdx}`, e.target.value)} />
                    <button 
                      onClick={() => updateData(`experience.${idx}.achievements`, exp.achievements.filter((_, i) => i !== aIdx))}
                      className="w-6 h-6 rounded-md text-red-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center shrink-0"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => updateData(`experience.${idx}.achievements`, [...exp.achievements, ""])}
                  className="text-[10px] font-medium text-[#0071e3] hover:underline"
                >
                  + Add Achievement
                </button>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={() => updateData("experience", [...data.experience, { title: "", company: "", duration: "", description: "", achievements: [] }])}
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
            <div key={idx} className="p-3.5 bg-white border border-[#e5e5ea] rounded-2xl space-y-2.5 relative group shadow-sm transition-shadow hover:shadow-md">
              <button 
                onClick={() => updateData("education", data.education.filter((_, i) => i !== idx))}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
              
              <input type="text" className="w-full text-[12px] p-2 rounded-xl border border-[#e5e5ea] outline-none focus:border-[#0071e3] transition-colors bg-[#f5f5f7] focus:bg-white" value={edu.degree || ""} onChange={(e) => updateData(`education.${idx}.degree`, e.target.value)} placeholder="Degree" />
              <input type="text" className="w-full text-[12px] p-2 rounded-xl border border-[#e5e5ea] outline-none focus:border-[#0071e3] transition-colors bg-[#f5f5f7] focus:bg-white" value={edu.institution || ""} onChange={(e) => updateData(`education.${idx}.institution`, e.target.value)} placeholder="Institution" />
              <input type="text" className="w-full text-[12px] p-2 rounded-xl border border-[#e5e5ea] outline-none focus:border-[#0071e3] transition-colors bg-[#f5f5f7] focus:bg-white" value={edu.year || ""} onChange={(e) => updateData(`education.${idx}.year`, e.target.value)} placeholder="Year" />
            </div>
          ))}
        </div>
        <button 
          onClick={() => updateData("education", [...data.education, { degree: "", institution: "", year: "" }])}
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
            <div key={idx} className="p-3.5 bg-white border border-[#e5e5ea] rounded-2xl space-y-2.5 relative group shadow-sm transition-shadow hover:shadow-md">
              <button 
                onClick={() => updateData("projects", data.projects.filter((_, i) => i !== idx))}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
              
              <input type="text" className="w-full text-[12px] p-2 rounded-xl border border-[#e5e5ea] outline-none focus:border-[#0071e3] transition-colors bg-[#f5f5f7] focus:bg-white" value={proj.name || ""} onChange={(e) => updateData(`projects.${idx}.name`, e.target.value)} placeholder="Project Name" />
              <textarea className="w-full text-[12px] p-2 rounded-xl border border-[#e5e5ea] outline-none focus:border-[#0071e3] transition-colors bg-[#f5f5f7] focus:bg-white h-16 resize-none" value={proj.description || ""} onChange={(e) => updateData(`projects.${idx}.description`, e.target.value)} placeholder="Description" />
              <input type="text" className="w-full text-[12px] p-2 rounded-xl border border-[#e5e5ea] outline-none focus:border-[#0071e3] transition-colors bg-[#f5f5f7] focus:bg-white" value={proj.tech?.join(", ") || ""} onChange={(e) => updateData(`projects.${idx}.tech`, e.target.value.split(",").map(s => s.trim()))} placeholder="Tech Stack (comma separated)" />
            </div>
          ))}
        </div>
        <button 
          onClick={() => updateData("projects", [...data.projects, { name: "", description: "", tech: [] }])}
          className="w-full py-2.5 rounded-xl border border-dashed border-[#c7c7cc] text-[#0071e3] text-[12px] font-semibold hover:bg-[#e8f0fe] hover:border-[#0071e3] transition-all"
        >
          + Add Project
        </button>
      </div>
    );
  }

  if (selected === "skills") {
    return (
      <div className="space-y-4">
        <Label>Skills</Label>
        <div className="p-3.5 bg-white border border-[#e5e5ea] rounded-2xl shadow-sm">
          <textarea 
            className="w-full text-[12px] p-2 rounded-xl border border-[#e5e5ea] outline-none focus:border-[#0071e3] transition-colors bg-[#f5f5f7] focus:bg-white h-24 resize-none" 
            value={data.skills.join(", ")} 
            onChange={(e) => updateData("skills", e.target.value.split(",").map(s => s.trim()))} 
            placeholder="React, TypeScript, Node.js..." 
          />
          <p className="text-[10px] text-[#8e8e93] mt-1.5 font-medium">Comma separated list</p>
        </div>
      </div>
    );
  }

  if (selected === "certifications") {
    return (
      <div className="space-y-4">
        <Label>Certifications</Label>
        <div className="p-3.5 bg-white border border-[#e5e5ea] rounded-2xl shadow-sm">
          <textarea 
            className="w-full text-[12px] p-2 rounded-xl border border-[#e5e5ea] outline-none focus:border-[#0071e3] transition-colors bg-[#f5f5f7] focus:bg-white h-24 resize-none" 
            value={data.certifications.join("\n")} 
            onChange={(e) => updateData("certifications", e.target.value.split("\n"))} 
            placeholder="AWS Certified...&#10;Google Cloud..." 
          />
          <p className="text-[10px] text-[#8e8e93] mt-1.5 font-medium">One certification per line</p>
        </div>
      </div>
    );
  }

  if (selected !== "global" && selected !== "header" && selected !== "summary") {
    return (
      <div className="space-y-4">
        <Label>{SECTION_META[selected].label} Items</Label>
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center">
          <p className="text-[11px] text-slate-500">Edit {selected} directly on the resume canvas by clicking the text!</p>
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
              className="flex items-center gap-2 rounded-xl px-3 py-2"
              style={{ background: "#f5f5f7", border: "1px solid #e5e5ea" }}
            >
              <GripVertical className="w-3 h-3 shrink-0" style={{ color: "#c7c7cc" }} />
              <span className="flex-1 text-[11px] font-medium capitalize" style={{ color: "#3a3a3c" }}>{sec}</span>
              <div className="flex gap-0.5">
                <button
                  disabled={idx === 0}
                  onClick={() => {
                    const o = [...design.contentOrder];
                    [o[idx - 1], o[idx]] = [o[idx], o[idx - 1]];
                    onChange({ contentOrder: o });
                  }}
                  className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-black disabled:opacity-20 hover:bg-black/5 transition-colors"
                  style={{ color: "#6e6e73" }}
                >▲</button>
                <button
                  disabled={idx === design.contentOrder.length - 1}
                  onClick={() => {
                    const o = [...design.contentOrder];
                    [o[idx + 1], o[idx]] = [o[idx], o[idx + 1]];
                    onChange({ contentOrder: o });
                  }}
                  className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-black disabled:opacity-20 hover:bg-black/5 transition-colors"
                  style={{ color: "#6e6e73" }}
                >▼</button>
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
            { value: "circle",  label: "Circle" },
            { value: "rounded", label: "Rounded Square" },
            { value: "square",  label: "Square" },
            { value: "none",    label: "Hide Photo" },
          ]}
        />
        {design.photoShape !== "none" && (
          <div className="mt-2">
            <Slider label="Photo Size" value={design.photoSize} min={50} max={140} step={4} unit="px" onChange={(v) => onChange({ photoSize: v })} />
          </div>
        )}
      </div>

      {/* Skill bars */}
      <div className="space-y-2">
        <Toggle label="Show Skill Bars" checked={design.showSkillBars} onChange={(v) => onChange({ showSkillBars: v })} />
        {design.showSkillBars && (
          <Select
            value={design.skillBarStyle}
            onChange={(v) => onChange({ skillBarStyle: v as DesignSettings["skillBarStyle"] })}
            options={[
              { value: "filled",  label: "Filled Bar" },
              { value: "dots",    label: "Dots" },
              { value: "circles", label: "Circles" },
              { value: "lines",   label: "Lines" },
            ]}
          />
        )}
      </div>
    </div>
  );
}

// ─── STYLE TAB ────────────────────────────────────────────────────────────────
function StyleTab({ design, onChange }: {
  design: DesignSettings;
  onChange: (p: Partial<DesignSettings>) => void;
}) {
  return (
    <div className="space-y-5">
      {/* Quick Palettes */}
      <div>
        <Label>Quick Palettes</Label>
        <div className="flex flex-wrap gap-1.5">
          {PALETTES.map((p) => (
            <button
              key={p.name}
              title={p.name}
              onClick={() => onChange({
                accentColor: p.accent, headingColor: p.heading,
                textColor: p.text, sidebarColor: p.sidebar, backgroundColor: p.bg,
              })}
              className="group flex flex-col items-center gap-1"
            >
              <div className="w-10 h-6 rounded-md overflow-hidden flex hover:ring-2 hover:ring-blue-400 transition-all" style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.08)" }}>
                <span className="w-1/2 h-full" style={{ background: p.accent }} />
                <span className="w-1/2 h-full" style={{ background: p.sidebar }} />
              </div>
              <span className="text-[8px] font-medium" style={{ color: "#6e6e73" }}>{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div className="space-y-3">
        <Label>Typography</Label>
        <div>
          <p className="text-[9px] mb-1" style={{ color: "#6e6e73" }}>Body Font</p>
          <Select value={design.fontFamily} onChange={(v) => onChange({ fontFamily: v })} options={FONTS.map((f) => ({ value: f, label: f }))} />
        </div>
        <div>
          <p className="text-[9px] mb-1" style={{ color: "#6e6e73" }}>Heading Font</p>
          <Select value={design.headingFontFamily} onChange={(v) => onChange({ headingFontFamily: v })} options={FONTS.map((f) => ({ value: f, label: f }))} />
        </div>
        <Slider label="Base Font Size" value={design.baseFontSize} min={9} max={14} step={0.5} unit="px" onChange={(v) => onChange({ baseFontSize: v })} />
        <Slider label="Heading Scale" value={design.headingScale} min={1} max={2.5} step={0.05} onChange={(v) => onChange({ headingScale: v })} />
        <Slider label="Line Height" value={design.lineHeight} min={1.1} max={2.2} step={0.05} onChange={(v) => onChange({ lineHeight: v })} />
        <Slider label="Letter Spacing" value={design.letterSpacing} min={-0.05} max={0.2} step={0.01} unit="em" onChange={(v) => onChange({ letterSpacing: v })} />
      </div>

      {/* Colors */}
      <div className="space-y-1">
        <Label>Colors</Label>
        <ColorSwatch label="Accent"           value={design.accentColor}     onChange={(v) => onChange({ accentColor: v })} />
        <ColorSwatch label="Headings"         value={design.headingColor}    onChange={(v) => onChange({ headingColor: v })} />
        <ColorSwatch label="Body Text"        value={design.textColor}       onChange={(v) => onChange({ textColor: v })} />
        <ColorSwatch label="Background"       value={design.backgroundColor} onChange={(v) => onChange({ backgroundColor: v })} />
        <ColorSwatch label="Sidebar / Header" value={design.sidebarColor}    onChange={(v) => onChange({ sidebarColor: v })} />
      </div>

      {/* Decorations */}
      <div className="space-y-3">
        <Label>Decorations</Label>
        <Toggle label="Section Dividers" checked={design.showDividers} onChange={(v) => onChange({ showDividers: v })} />
        {design.showDividers && (
          <IconRow
            label="Divider Style" value={design.dividerStyle}
            onChange={(v) => onChange({ dividerStyle: v })}
            options={[
              { value: "solid",  icon: <Minus className="w-3 h-3" />,                         tip: "Solid" },
              { value: "dashed", icon: <span className="text-[10px] font-black">╌</span>,     tip: "Dashed" },
              { value: "dotted", icon: <span className="text-[10px] font-black">···</span>,   tip: "Dotted" },
              { value: "none",   icon: <X className="w-3 h-3" />,                             tip: "None" },
            ]}
          />
        )}
        <IconRow
          label="Header Shape" value={design.headerShape}
          onChange={(v) => onChange({ headerShape: v })}
          options={[
            { value: "none",     icon: <X className="w-3 h-3" />,                           tip: "None" },
            { value: "bar",      icon: <Minus className="w-3 h-3" />,                        tip: "Bar" },
            { value: "wave",     icon: <span className="text-[11px] font-black">∿</span>,   tip: "Wave" },
            { value: "diagonal", icon: <span className="text-[11px] font-black">◺</span>,   tip: "Diagonal" },
            { value: "arch",     icon: <span className="text-[11px] font-black">⌢</span>,   tip: "Arch" },
          ]}
        />
        <IconRow
          label="Bullet Style" value={design.bulletStyle}
          onChange={(v) => onChange({ bulletStyle: v })}
          options={[
            { value: "dot",    icon: <Circle className="w-2 h-2 fill-current" />,     tip: "Dot" },
            { value: "dash",   icon: <Minus className="w-3 h-3" />,                   tip: "Dash" },
            { value: "square", icon: <Square className="w-2.5 h-2.5 fill-current" />, tip: "Square" },
            { value: "arrow",  icon: <ArrowRight className="w-3 h-3" />,              tip: "Arrow" },
            { value: "star",   icon: <Star className="w-2.5 h-2.5 fill-current" />,   tip: "Star" },
            { value: "none",   icon: <X className="w-3 h-3" />,                       tip: "None" },
          ]}
        />
        <Toggle label="Section Icons" checked={design.showSectionIcons} onChange={(v) => onChange({ showSectionIcons: v })} />
      </div>
    </div>
  );
}

// ─── LAYOUT TAB ───────────────────────────────────────────────────────────────
function LayoutTab({ design, onChange }: {
  design: DesignSettings;
  onChange: (p: Partial<DesignSettings>) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <Label>Column Layout</Label>
        <div className="grid grid-cols-2 gap-1.5">
          {([
            { value: "single",        label: "Single Column"  },
            { value: "two-col",       label: "Two Columns"    },
            { value: "sidebar-left",  label: "Sidebar Left"   },
            { value: "sidebar-right", label: "Sidebar Right"  },
          ] as const).map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ columnLayout: opt.value })}
              className="py-3 px-2 rounded-xl text-[10px] font-semibold transition-all"
              style={{
                background: design.columnLayout === opt.value ? "#e8f0fe" : "#f5f5f7",
                border: `1px solid ${design.columnLayout === opt.value ? "#0071e3" : "#d1d1d6"}`,
                color: design.columnLayout === opt.value ? "#0071e3" : "#3a3a3c",
                boxShadow: design.columnLayout === opt.value ? "0 1px 4px rgba(0,113,227,0.15)" : "none",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label>Photo & Skills</Label>
        <div className="grid grid-cols-2 gap-1.5 mb-3">
          {([
            { value: "circle",  label: "Circle"  },
            { value: "rounded", label: "Rounded" },
            { value: "square",  label: "Square"  },
            { value: "none",    label: "Hidden"  },
          ] as const).map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ photoShape: opt.value })}
              className="py-2 px-2 rounded-xl text-[10px] font-semibold transition-all"
              style={{
                background: design.photoShape === opt.value ? "#e8f0fe" : "#f5f5f7",
                border: `1px solid ${design.photoShape === opt.value ? "#0071e3" : "#d1d1d6"}`,
                color: design.photoShape === opt.value ? "#0071e3" : "#3a3a3c",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <Slider label="Photo Size" value={design.photoSize || 80} min={40} max={160} step={4} unit="px" onChange={(v) => onChange({ photoSize: v })} />
        
        <Label>Skill Bar Style</Label>
        <div className="grid grid-cols-2 gap-1.5 mb-2">
          {([
            { value: "filled",  label: "Filled Bar" },
            { value: "lines",   label: "Lines" },
            { value: "dots",    label: "Dots" },
            { value: "circles", label: "Circles" },
          ] as const).map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ skillBarStyle: opt.value, showSkillBars: true })}
              className="py-2 px-2 rounded-xl text-[10px] font-semibold transition-all"
              style={{
                background: design.skillBarStyle === opt.value && design.showSkillBars ? "#e8f0fe" : "#f5f5f7",
                border: `1px solid ${design.skillBarStyle === opt.value && design.showSkillBars ? "#0071e3" : "#d1d1d6"}`,
                color: design.skillBarStyle === opt.value && design.showSkillBars ? "#0071e3" : "#3a3a3c",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <Toggle label="Show Skill Bars" checked={design.showSkillBars} onChange={(v) => onChange({ showSkillBars: v })} />
      </div>

      <div className="space-y-3">
        <Label>Page Spacing</Label>
        <Slider label="Padding X"   value={design.pagePaddingX} min={12} max={80} step={2}  unit="px" onChange={(v) => onChange({ pagePaddingX: v })} />
        <Slider label="Padding Y"   value={design.pagePaddingY} min={12} max={80} step={2}  unit="px" onChange={(v) => onChange({ pagePaddingY: v })} />
        <Slider label="Section Gap" value={design.sectionGap}   min={4}  max={60} step={2}  unit="px" onChange={(v) => onChange({ sectionGap: v })} />
        <Slider label="Item Gap"    value={design.itemGap}      min={2}  max={32} step={1}  unit="px" onChange={(v) => onChange({ itemGap: v })} />
      </div>
    </div>
  );
}

// ─── Section nav pill ─────────────────────────────────────────────────────────
function SectionPill({ id, selected, onClick }: { id: SectionId; selected: boolean; onClick: () => void }) {
  const { icon: Icon, label } = SECTION_META[id];
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 w-full px-1 py-2 rounded-xl transition-all"
      style={{
        background: selected ? "#e8f0fe" : "transparent",
        border: `1px solid ${selected ? "#0071e3" : "transparent"}`,
        color: selected ? "#0071e3" : "#8e8e93",
      }}
    >
      <Icon className="w-3.5 h-3.5" />
      <span className="text-[8px] font-semibold text-center leading-tight">{label}</span>
    </button>
  );
}

// ─── Tab button ───────────────────────────────────────────────────────────────
type Tab = "content" | "style" | "layout";
function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 py-1.5 text-[9px] font-semibold uppercase tracking-widest rounded-lg transition-all"
      style={{
        background: active ? "#ffffff" : "transparent",
        color:      active ? "#1d1d1f" : "#8e8e93",
        border:     active ? "1px solid #d1d1d6" : "1px solid transparent",
        boxShadow:  active ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
      }}
    >
      {children}
    </button>
  );
}

const ALL_SECTIONS: SectionId[] = [
  "global", "header", "summary", "experience", "education", "skills", "projects", "certifications",
];

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export function DesignPanel({
  design, data, onChange, updateData, onClose,
  selected, setSelected,
}: {
  design: DesignSettings;
  data: ResumeData;
  onChange: (patch: Partial<DesignSettings>) => void;
  updateData: (path: string, val: any) => void;
  onClose: () => void;
  selected: SectionId;
  setSelected: (s: SectionId) => void;
}) {
  const [tab, setTab] = useState<Tab>("style");

  return (
    <SelectionContext.Provider value={{ selected, setSelected }}>
      <div className="flex h-full w-full flex-col select-none" style={{ background: "#ffffff", color: "#1d1d1f" }}>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 shrink-0" style={{ borderBottom: "1px solid #f2f2f7" }}>
          <div className="flex items-center gap-2.5">
            <div className="flex w-7 h-7 items-center justify-center rounded-xl" style={{ background: "#f5f5f7", border: "1px solid #e5e5ea" }}>
              <Sliders className="w-3.5 h-3.5" style={{ color: "#0071e3" }} />
            </div>
            <div>
              <p className="text-[13px] font-semibold" style={{ color: "#1d1d1f" }}>Design</p>
              <p className="text-[9px] leading-none" style={{ color: "#8e8e93" }}>Figma-style editor</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => onChange({ ...DEFAULT_DESIGN })} title="Reset" className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-black/5" style={{ color: "#8e8e93" }}>
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-red-50" style={{ color: "#8e8e93" }}>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-1 px-2 py-2 shrink-0" style={{ background: "#f5f5f7", borderBottom: "1px solid #e5e5ea" }}>
          <TabBtn active={tab === "content"} onClick={() => setTab("content")}>Content</TabBtn>
          <TabBtn active={tab === "style"}   onClick={() => setTab("style")}>Style</TabBtn>
          <TabBtn active={tab === "layout"}  onClick={() => setTab("layout")}>Layout</TabBtn>
        </div>

        {/* Body: section nav + controls */}
        <div className="flex flex-1 overflow-hidden">
          {/* Section nav */}
          <nav className="w-[72px] shrink-0 flex flex-col gap-0.5 p-1.5 overflow-y-auto" style={{ borderRight: "1px solid #f2f2f7", background: "#fafafa" }}>
            {ALL_SECTIONS.map((id) => (
              <SectionPill key={id} id={id} selected={selected === id} onClick={() => setSelected(id)} />
            ))}
          </nav>

          {/* Controls */}
          <div className="flex-1 overflow-y-auto p-4" style={{ scrollbarWidth: "thin", scrollbarColor: "#e5e5ea transparent" }}>
            {/* Section banner */}
            <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: "1px solid #f2f2f7" }}>
              {(() => {
                const Icon = SECTION_META[selected].icon;
                return (
                  <>
                    <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "#f0f4ff" }}>
                      <span style={{ color: "#3b82f6" }}><Icon className="w-3.5 h-3.5" /></span>
                    </div>
                    <span className="text-[11px] font-semibold" style={{ color: "#3a3a3c" }}>{SECTION_META[selected].label}</span>
                  </>
                );
              })()}
            </div>

            {tab === "content" && <ContentTab selected={selected} design={design} data={data} onChange={onChange} updateData={updateData} />}
            {tab === "style"   && <StyleTab design={design} onChange={onChange} />}
            {tab === "layout"  && <LayoutTab design={design} onChange={onChange} />}
          </div>
        </div>

        {/* Footer live indicator */}
        <div className="flex items-center justify-between px-4 py-2 shrink-0" style={{ borderTop: "1px solid #f2f2f7", background: "#fafafa" }}>
          <div className="flex items-center gap-1.5 rounded-full px-2.5 py-1" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} />
            <span className="text-[9px] font-semibold" style={{ color: "#16a34a" }}>LIVE PREVIEW</span>
          </div>
          <span className="text-[9px] font-medium" style={{ color: "#8e8e93" }}>{SECTION_META[selected].label}</span>
        </div>
      </div>
    </SelectionContext.Provider>
  );
}

// ─── CSS variable bridge ──────────────────────────────────────────────────────
export function designToCSSVars(d: DesignSettings): React.CSSProperties {
  const bullet =
    d.bulletStyle === "dot"    ? "•" :
    d.bulletStyle === "dash"   ? "–" :
    d.bulletStyle === "square" ? "▪" :
    d.bulletStyle === "arrow"  ? "›" :
    d.bulletStyle === "star"   ? "★" : "";

  return {
    "--ds-font":           d.fontFamily,
    "--ds-font-heading":   d.headingFontFamily,
    "--ds-font-size":      `${d.baseFontSize}px`,
    "--ds-heading-scale":  String(d.headingScale),
    "--ds-line-height":    String(d.lineHeight),
    "--ds-letter-spacing": `${d.letterSpacing}em`,
    "--ds-accent":         d.accentColor,
    "--ds-text":           d.textColor,
    "--ds-heading":        d.headingColor,
    "--ds-bg":             d.backgroundColor,
    "--ds-sidebar":        d.sidebarColor,
    "--ds-pad-x":          `${d.pagePaddingX}px`,
    "--ds-pad-y":          `${d.pagePaddingY}px`,
    "--ds-section-gap":    `${d.sectionGap}px`,
    "--ds-item-gap":       `${d.itemGap}px`,
    "--ds-divider":        d.showDividers ? d.dividerStyle : "none",
    "--ds-bullet":         `"${bullet}"`,
    "--ds-photo-radius":   d.photoShape === "circle" ? "50%" : d.photoShape === "rounded" ? "12px" : "0px",
    "--ds-photo-size":     d.photoShape === "none" ? "0px" : `${d.photoSize}px`,
  } as React.CSSProperties;
}
