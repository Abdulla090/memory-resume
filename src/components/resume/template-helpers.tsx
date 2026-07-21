import { useContext, type ReactNode } from "react";
import { Editable } from "./Editable";
import { ResumeLayoutContext } from "./DesignContext";
import type { ResumeData } from "@/lib/types";

const rtlPattern = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/;

export function getContrastTheme(hexColor?: string): "light" | "dark" {
  if (!hexColor) return "light";
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "light" : "dark";
}

export function detectRtlFromContent(data: ResumeData): boolean {
  return rtlPattern.test(
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

/** Editor layout toggle or auto-detect from resume script. */
export function useLayoutRtl(data: ResumeData): boolean {
  const forced = useContext(ResumeLayoutContext);
  if (forced !== null) return forced;
  return detectRtlFromContent(data);
}

export function labels(data: ResumeData, rtl: boolean) {
  const get = (key: string, defRTL: string, defLTR: string) => {
    const defaultVal = rtl ? defRTL : defLTR;
    const value = data.sectionTitles?.[key] || defaultVal;
    return <Editable path={`sectionTitles.${key}`} value={value} as="span" />;
  };

  return {
    profile: get("profile", "پوختە", "Profile"),
    experience: get("experience", "ئەزموون", "Experience"),
    projects: get("projects", "پرۆژەکان", "Selected Projects"),
    skills: get("skills", "لێهاتووییەکان", "Skills"),
    education: get("education", "خوێندن", "Education"),
    certifications: get("certifications", "بڕوانامەکان", "Certifications"),
    contact: get("contact", "پەیوەندی", "Contact"),
    selected: get("selected", "دیاریکراو", "Selected"),
  };
}

export function label(
  data: ResumeData,
  key: "profile" | "executiveProfile" | "summary" | "experience" | "professionalExperience" | "projects" | "skills" | "keySkills" | "expertise" | "metrics" | "education" | "certifications" | "terminalExperience" | "terminalSkills" | "terminalEducation",
  rtl: boolean,
) {
  const mapRtl: Record<string, string> = {
    profile: "پڕۆفایل",
    executiveProfile: "پڕۆفایلی پیشەیی",
    summary: "پوختە",
    experience: "ئەزموون",
    professionalExperience: "ئەزموونی پیشەیی",
    projects: "پرۆژەکان",
    skills: "لێهاتووییەکان",
    keySkills: "لێهاتووییە سەرەکییەکان",
    expertise: "پسپۆڕی",
    metrics: "پێوەرەکان",
    education: "خوێندن",
    certifications: "بڕوانامەکان",
    terminalExperience: "~/ئەزموون $",
    terminalSkills: "~/لێهاتوویی $",
    terminalEducation: "~/خوێندن $",
  };
  const mapLtr: Record<string, string> = {
    profile: "Profile",
    executiveProfile: "Executive Profile",
    summary: "Executive Summary",
    experience: "Experience",
    professionalExperience: "Professional Experience",
    projects: "Projects",
    skills: "Skills",
    keySkills: "Key Skills",
    expertise: "Expertise",
    metrics: "Metrics",
    education: "Education",
    certifications: "Certifications",
    terminalExperience: "~/experience $",
    terminalSkills: "~/skills $",
    terminalEducation: "~/education $",
  };
  
  const defaultVal = rtl ? mapRtl[key] : mapLtr[key];
  const value = data.sectionTitles?.[key] || defaultVal;
  return <Editable path={`sectionTitles.${key}`} value={value} as="span" />;
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function pickLanguages(data: ResumeData) {
  return (data.languages?.length ? data.languages : data.certifications.length > 0 ? data.certifications : data.skills).slice(0, 3);
}

export function PhotoBlock({ data, shape = "rounded" }: { data: ResumeData; shape?: "rounded" | "circle" | "arch" | "none" }) {
  if (shape === "none") return null;
  const radius = shape === "circle" ? "rounded-full" : shape === "arch" ? "rounded-t-full rounded-b-2xl" : "rounded-[1.4rem]";

  return (
    <div
      className={`shrink-0 overflow-hidden border border-slate-200 bg-slate-100 ${radius}`}
      style={{
        width: "var(--ds-photo-size, 112px)",
        height: "var(--ds-photo-size, 112px)",
        borderRadius: "var(--ds-photo-radius)",
      }}
    >
      {data.photoUrl || data.name.includes("مەنسور") ? (
        <img src={data.photoUrl || "/my driend image/photo_2026-06-06_14-36-45.jpg"} alt={data.name} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-2xl font-black tracking-tight rtl:tracking-normal text-[var(--color-text)] opacity-80">
          {initials(data.name)}
        </div>
      )}
    </div>
  );
}

export function Section({
  title,
  children,
  accent = "border-slate-900 text-[var(--color-heading)]",
}: {
  title: ReactNode;
  children: ReactNode;
  accent?: string;
}) {
  return (
    <section className="break-inside-avoid">
      <h2 className={`mb-3 border-b pb-2 text-[10px] font-black uppercase tracking-[0.22em] rtl:tracking-normal ${accent}`}>
        {title}
      </h2>
      {children}
    </section>
  );
}

export function ContactLines({ data }: { data: ResumeData }) {
  return (
    <div className="space-y-1 text-[11px] font-semibold leading-5 text-[var(--color-text)] opacity-80">
      {data.location && <Editable path="location" value={data.location} as="div" />}
      {data.email && <Editable path="email" value={data.email} as="div" />}
      {data.phone && <Editable path="phone" value={data.phone} as="div" />}
    </div>
  );
}

export function ExperienceList({ data, marker = "dot" }: { data: ResumeData; marker?: "dot" | "rule" | "index" }) {
  return (
    <div className="space-y-5">
      {data.experience.map((item, index) => (
        <article key={`${item.company}-${index}`} className={marker === "rule" ? "border-l-2 border-slate-200 pl-4 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4" : ""}>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <Editable path={`experience.${index}.title`} value={item.title} as="h3" className="text-[1.1em] font-extrabold leading-tight text-[var(--color-heading)]" />
              <Editable path={`experience.${index}.company`} value={item.company} as="p" className="mt-1 text-[0.9em] font-bold text-[var(--color-text)]" />
            </div>
            <Editable path={`experience.${index}.duration`} value={item.duration} as="div" className="shrink-0 text-[0.75em] font-black uppercase tracking-[0.12em] rtl:tracking-normal text-[var(--color-text)] opacity-60" />
          </div>
          {item.description && <Editable path={`experience.${index}.description`} value={item.description} as="p" className="mt-2 text-[0.85em] leading-5 text-[var(--color-text)]" />}
          <ul className="mt-2 space-y-1.5">
            {item.achievements.map((achievement, achievementIndex) => (
              <li key={achievementIndex} className="grid grid-cols-[14px_1fr] gap-2 text-[11px] leading-5 text-slate-700 ">
                {marker === "index" ? (
                  <span className="text-[9px] font-black text-[var(--color-text)] opacity-60">{String(achievementIndex + 1).padStart(2, "0")}</span>
                ) : (
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[var(--color-sidebar)]" />
                )}
                <Editable path={`experience.${index}.achievements.${achievementIndex}`} value={achievement} as="span" />
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function skillRating(data: ResumeData, skill: string, index: number) {
  const explicit = data.skillItems?.find((item) => item.name === skill)?.level;
  return Math.max(1, Math.min(5, explicit ?? ((index % 4) + 2)));
}

export function skillLevel(data: ResumeData, skill: string, index: number) {
  return `${Math.max(28, Math.min(100, (skillRating(data, skill, index) / 5) * 100))}%`;
}
