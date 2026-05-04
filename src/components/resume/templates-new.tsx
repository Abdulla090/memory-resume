import { ReactNode, useContext } from "react";
import { DesignContext } from "./DesignContext";
import { Editable } from "./Editable";
import { StarRating, BarRating } from "./templates";
import { BriefcaseBusiness, Globe, GraduationCap, Mail, MapPin, Phone, UserRound } from "lucide-react";
import type { ResumeData } from "@/lib/types";
import { optimizeResumeForOnePage } from "@/lib/resume-utils";

const rtlPattern = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/;

function isRTL(data: ResumeData) {
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

function labels(rtl: boolean) {
  return rtl
    ? {
        profile: "پوختە",
        experience: "ئەزموون",
        projects: "پرۆژەکان",
        skills: "لێهاتووییەکان",
        education: "خوێندن",
        certifications: "بڕوانامەکان",
        contact: "پەیوەندی",
        selected: "دیاریکراو",
      }
    : {
        profile: "Profile",
        experience: "Experience",
        projects: "Selected Projects",
        skills: "Skills",
        education: "Education",
        certifications: "Certifications",
        contact: "Contact",
        selected: "Selected",
      };
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function PhotoBlock({ data, shape = "rounded" }: { data: ResumeData; shape?: "rounded" | "circle" | "arch" | "none" }) {
  if (shape === "none") return null;
  const radius = shape === "circle" ? "rounded-full" : shape === "arch" ? "rounded-t-full rounded-b-2xl" : "rounded-[1.4rem]";

  return (
    <div 
      className={`shrink-0 overflow-hidden border border-slate-200 bg-slate-100 ${radius}`}
      style={{ 
        width: "var(--ds-photo-size, 112px)", 
        height: "var(--ds-photo-size, 112px)", 
        borderRadius: "var(--ds-photo-radius)",
        display: "var(--ds-photo-size)" === "0px" ? "none" : "block"
      }}
    >
      {data.photoUrl ? (
        <img src={data.photoUrl} alt={data.name} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-2xl font-black tracking-tight rtl:tracking-normal text-[var(--color-text)] opacity-80">
          {initials(data.name)}
        </div>
      )}
    </div>
  );
}

function Section({
  title,
  children,
  accent = "border-slate-900 text-[var(--color-heading)]",
}: {
  title: string;
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

function ContactLines({ data }: { data: ResumeData }) {
  return (
    <div className="space-y-1 text-[11px] font-semibold leading-5 text-[var(--color-text)] opacity-80">
      {data.location && <Editable path="location" value={data.location} as="div" />}
      {data.email && <Editable path="email" value={data.email} as="div" />}
      {data.phone && <Editable path="phone" value={data.phone} as="div" />}
    </div>
  );
}

function ExperienceList({ data, marker = "dot" }: { data: ResumeData; marker?: "dot" | "rule" | "index" }) {
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

export function NewSleekTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const l = labels(rtl);
  const design = useContext(DesignContext);

  const colLayout = design?.columnLayout || "sidebar-right";
  const layoutClass = 
    colLayout === "single" ? "grid-cols-1" :
    colLayout === "two-col" ? "grid-cols-2" :
    colLayout === "sidebar-left" ? "grid-cols-[260px_1fr]" : "grid-cols-[1fr_260px]";

  const isLeftSidebar = colLayout === "sidebar-left";
  
  const skillBar = design?.skillBarStyle || "filled";
  const photoShape = design?.photoShape || "circle";

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="bg-white p-10 font-sans text-[var(--color-heading)]" style={{ minHeight: "1122px", width: "100%" }}>
      <header className="grid grid-cols-[1fr_auto] items-start gap-8 border-b border-slate-200 pb-8 ">
        <div>
          <div className="mb-5 h-1.5 w-24 rounded-full bg-[var(--color-sidebar)]" />
          <Editable path="name" value={c.name} as="h1" className="max-w-[12ch] text-5xl font-black leading-[0.94] tracking-tight rtl:tracking-normal text-[var(--color-heading)]" />
          <Editable path="title" value={c.title} as="p" className="mt-4 text-sm font-black uppercase tracking-[0.28em] rtl:tracking-normal text-[var(--color-text)] opacity-80" />
        </div>
        <div className="flex flex-col items-end gap-5 rtl:items-start">
          <PhotoBlock data={c} shape={photoShape === "square" ? "rounded" : photoShape as any} />
          <ContactLines data={c} />
        </div>
      </header>

      <div className={`grid ${layoutClass} gap-10 pt-8`}>
        <main className={`space-y-7 ${isLeftSidebar ? 'order-last' : ''}`}>
          <Section title={l.profile}>
            <Editable path="summary" value={c.summary} as="p" className="text-[13px] leading-7 text-slate-700" />
          </Section>
          {c.experience.length > 0 && (
            <Section title={l.experience}>
              <ExperienceList data={c} marker="index" />
            </Section>
          )}
          {c.projects.length > 0 && (
            <Section title={l.projects}>
              <div className="space-y-4">
                {c.projects.map((project, index) => (
                  <article key={`${project.name}-${index}`}>
                    <Editable path={`projects.${index}.name`} value={project.name} as="h3" className="text-[13px] font-extrabold text-[var(--color-heading)]" />
                    <Editable path={`projects.${index}.description`} value={project.description} as="p" className="mt-1 text-[11px] leading-5 text-[var(--color-text)]" />
                    {project.tech.length > 0 && <Editable path={`projects.${index}.tech`} value={project.tech.join(" / ")} as="p" className="mt-1 text-[10px] font-black uppercase tracking-[0.16em] rtl:tracking-normal text-[var(--color-text)] opacity-60" />}
                  </article>
                ))}
              </div>
            </Section>
          )}
        </main>

        <aside className={`space-y-7 ${
          colLayout === "single" ? "" : 
          isLeftSidebar 
            ? "border-r border-slate-200 pr-7 rtl:border-r-0 rtl:border-l rtl:pr-0 rtl:pl-7" 
            : "border-l border-slate-200 pl-7 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-7"
        }`}>
          {design?.showSkillBars !== false && (c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
            <Section title={l.skills}>
              {c.skillItems && c.skillItems.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {c.skillItems.map((s, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-[0.1em] rtl:tracking-normal text-slate-700">{s.name}</span>
                      {skillBar === "lines" && <BarRating level={s.level} />}
                      {skillBar === "dots" && (
                        <div className="flex gap-1 mt-1 rtl:flex-row-reverse">
                          {Array.from({ length: 5 }).map((_, dot) => (
                            <span key={dot} className={`h-1.5 w-1.5 rounded-full ${dot < s.level ? "bg-slate-800" : "bg-slate-200"}`} />
                          ))}
                        </div>
                      )}
                      {skillBar === "circles" && (
                        <div className="flex gap-1 mt-1 rtl:flex-row-reverse">
                          {Array.from({ length: 5 }).map((_, dot) => (
                            <span key={dot} className={`h-2 w-2 rounded-full border border-slate-400 ${dot < s.level ? "bg-slate-600" : "bg-transparent"}`} />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {c.skills.map((skill) => (
                    <span key={skill} className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] rtl:tracking-normal ${
                      skillBar === "filled" ? "bg-slate-100 text-[var(--color-heading)] rounded-lg" :
                      "border border-slate-200 text-slate-700 rounded-full"
                    }`}>
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </Section>
          )}
          {c.education.length > 0 && (
            <Section title={l.education}>
              <div className="space-y-4">
                {c.education.map((item, index) => (
                  <div key={`${item.institution}-${index}`}>
                    <div className="text-[12px] font-extrabold leading-5 text-[var(--color-heading)]">{item.degree}</div>
                    <div className="mt-1 text-[11px] font-semibold text-[var(--color-text)] opacity-80">{item.institution}</div>
                    <div className="mt-1 text-[10px] font-black text-[var(--color-text)] opacity-60">{item.year}</div>
                  </div>
                ))}
              </div>
            </Section>
          )}
          {c.certifications.length > 0 && (
            <Section title={l.certifications}>
              <div className="space-y-2 text-[11px] font-semibold leading-5 text-[var(--color-text)]">
                {c.certifications.map((item) => <div key={item}>{item}</div>)}
              </div>
            </Section>
          )}
        </aside>
      </div>
    </div>
  );
}

export function NewProfessionalTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const l = labels(rtl);
  const design = useContext(DesignContext);

  const colLayout = design?.columnLayout || "sidebar-left";
  const isLeftSidebar = colLayout !== "sidebar-right";
  const layoutClass = colLayout === "single" ? "grid-cols-1" :
    colLayout === "two-col" ? "grid-cols-2" :
    isLeftSidebar ? "grid-cols-[230px_1fr]" : "grid-cols-[1fr_230px]";
    
  const skillBar = design?.skillBarStyle || "dots";
  const photoShape = design?.photoShape || "circle";

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="bg-[#fbfcfd] p-8 font-sans text-[var(--color-heading)]" style={{ minHeight: "1122px", width: "100%" }}>
      <div className={`grid min-h-[1058px] ${layoutClass} overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_70px_-45px_rgba(15,23,42,0.55)]`}>
        <aside className={`bg-[var(--color-sidebar)] p-7 text-white ${!isLeftSidebar ? "order-last" : ""}`}>
          <PhotoBlock data={c} shape={photoShape === "square" ? "rounded" : photoShape as any} />
          <Editable path="name" value={c.name} as="h1" className="mt-7 text-[1.8em] font-black leading-[1] tracking-tight rtl:tracking-normal" />
          <Editable path="title" value={c.title} as="p" className="mt-3 text-[11px] font-black uppercase leading-5 tracking-[0.2em] rtl:tracking-normal text-[var(--color-accent)]" />
          <div className="mt-8">
            <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] rtl:tracking-normal text-[var(--color-text)] opacity-60">{l.contact}</h2>
            <div className="space-y-2 text-[11px] font-semibold leading-5 text-[var(--color-text)] opacity-50">
              {c.location && <Editable path="location" value={c.location} as="div" />}
              {c.email && <Editable path="email" value={c.email} as="div" />}
              {c.phone && <Editable path="phone" value={c.phone} as="div" />}
            </div>
          </div>
          {design?.showSkillBars !== false && (c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
            <div className="mt-8">
              <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] rtl:tracking-normal text-[var(--color-text)] opacity-60">{l.skills}</h2>
              {c.skillItems && c.skillItems.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {c.skillItems.map((s, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[11px] font-bold text-slate-100 mb-1">{s.name}</span>
                      {skillBar === "lines" && (
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                           <div className="h-full bg-white" style={{ width: `${s.level * 20}%` }} />
                        </div>
                      )}
                      {skillBar === "dots" && (
                        <div className="flex gap-1 rtl:flex-row-reverse">
                          {Array.from({ length: 5 }).map((_, dot) => (
                            <span key={dot} className={`h-2 w-2 rounded-full ${dot < s.level ? "bg-white" : "bg-white/20"}`} />
                          ))}
                        </div>
                      )}
                      {skillBar === "circles" && (
                        <div className="flex gap-1 rtl:flex-row-reverse">
                          {Array.from({ length: 5 }).map((_, dot) => (
                            <span key={dot} className={`h-2 w-2 rounded-full border border-white/50 ${dot < s.level ? "bg-white" : "bg-transparent"}`} />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {c.skills.map((skill) => (
                    <div key={skill} className={`px-3 py-2 text-[11px] font-bold text-slate-100 ${
                      skillBar === "filled" ? "bg-white text-[var(--color-heading)] rounded-lg" :
                      "rounded-xl border border-white/10 bg-white/[0.04]"
                    }`}>{skill}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </aside>

        <main className="space-y-7 p-9">
          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] rtl:tracking-normal text-[var(--color-accent)]">{l.profile}</h2>
            <Editable path="summary" value={c.summary} as="p" className="text-[1em] leading-7 text-[var(--color-text)]" />
          </section>
          {c.experience.length > 0 && (
            <Section title={l.experience} accent="border-cyan-700 text-cyan-800">
              <ExperienceList data={c} marker="rule" />
            </Section>
          )}
          <div className="grid grid-cols-2 gap-7">
            {c.projects.length > 0 && (
              <Section title={l.projects} accent="border-cyan-700 text-cyan-800">
                <div className="space-y-4">
                  {c.projects.map((project, index) => (
                    <article key={`${project.name}-${index}`}>
                      <Editable path={`projects.${index}.name`} value={project.name} as="h3" className="text-[0.9em] font-extrabold text-[var(--color-heading)]" />
                      <Editable path={`projects.${index}.description`} value={project.description} as="p" className="mt-1 text-[0.85em] leading-5 text-[var(--color-text)]" />
                    </article>
                  ))}
                </div>
              </Section>
            )}
            {c.education.length > 0 && (
              <Section title={l.education} accent="border-cyan-700 text-cyan-800">
                <div className="space-y-4">
                  {c.education.map((item, index) => (
                    <div key={`${item.institution}-${index}`}>
                      <Editable path={`education.${index}.degree`} value={item.degree} as="div" className="text-[0.9em] font-extrabold text-[var(--color-heading)]" />
                      <div className="mt-1 text-[0.85em] text-[var(--color-text)] flex gap-1">
                        <Editable path={`education.${index}.institution`} value={item.institution} as="span" />
                        <span>·</span>
                        <Editable path={`education.${index}.year`} value={item.year} as="span" />
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export function NewAcademicTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const l = labels(rtl);
  const design = useContext(DesignContext);

  const colLayout = design?.columnLayout || "sidebar-right";
  const isLeftSidebar = colLayout === "sidebar-left";
  const layoutClass = colLayout === "single" ? "grid-cols-1" :
    colLayout === "two-col" ? "grid-cols-2" :
    isLeftSidebar ? "grid-cols-[235px_1fr]" : "grid-cols-[1fr_235px]";

  const skillBar = design?.skillBarStyle || "lines";
  const photoShape = design?.photoShape || "arch";

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="bg-white p-11 font-serif text-[var(--color-heading)]" style={{ minHeight: "1122px", width: "100%" }}>
      <header className={`grid ${colLayout === "single" ? "grid-cols-[120px_1fr]" : "grid-cols-[120px_1fr]"} gap-8 border-b-2 border-slate-950 pb-7`}>
        <PhotoBlock data={c} shape={photoShape as any} />
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] rtl:tracking-normal text-[var(--color-text)] opacity-80">{l.selected} Curriculum Vitae</p>
          <Editable path="name" value={c.name} as="h1" className="mt-4 text-[2.2em] font-bold leading-tight tracking-tight rtl:tracking-normal" />
          <Editable path="title" value={c.title} as="p" className="mt-2 text-[15px] font-semibold text-slate-700" />
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[11px] font-semibold text-[var(--color-text)] opacity-80">
            <ContactLines data={c} />
          </div>
        </div>
      </header>

      <div className={`grid ${layoutClass} gap-10 pt-7`}>
        <main className={`space-y-7 ${isLeftSidebar ? 'order-last' : ''}`}>
          <Section title={l.profile} accent="border-slate-950 text-[var(--color-heading)]">
            <Editable path="summary" value={c.summary} as="p" className="text-[13px] leading-7 text-slate-700" />
          </Section>
          {c.experience.length > 0 && (
            <Section title={l.experience} accent="border-slate-950 text-[var(--color-heading)]">
              <ExperienceList data={c} marker="dot" />
            </Section>
          )}
          {c.projects.length > 0 && (
            <Section title={l.projects} accent="border-slate-950 text-[var(--color-heading)]">
              <div className="space-y-4">
                {c.projects.map((project, index) => (
                  <article key={`${project.name}-${index}`}>
                    <Editable path={`projects.${index}.name`} value={project.name} as="h3" className="text-[13px] font-bold text-[var(--color-heading)]" />
                    <Editable path={`projects.${index}.description`} value={project.description} as="p" className="mt-1 text-[11px] leading-5 text-slate-700" />
                    {project.impact && <Editable path={`projects.${index}.impact`} value={project.impact} as="p" className="mt-1 text-[11px] italic text-[var(--color-text)] opacity-80" />}
                  </article>
                ))}
              </div>
            </Section>
          )}
        </main>

        <aside className="space-y-7">
          {c.education.length > 0 && (
            <Section title={l.education} accent="border-slate-950 text-[var(--color-heading)]">
              <div className="space-y-4">
                {c.education.map((item, index) => (
                  <div key={`${item.institution}-${index}`}>
                    <Editable path={`education.${index}.degree`} value={item.degree} as="div" className="text-[12px] font-bold leading-5" />
                    <Editable path={`education.${index}.institution`} value={item.institution} as="div" className="mt-1 text-[11px] text-[var(--color-text)]" />
                    <Editable path={`education.${index}.year`} value={item.year} as="div" className="mt-1 text-[10px] font-bold text-[var(--color-text)] opacity-60" />
                  </div>
                ))}
              </div>
            </Section>
          )}
          {design?.showSkillBars !== false && (c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
            <Section title={l.skills} accent="border-slate-950 text-[var(--color-heading)]">
              {c.skillItems && c.skillItems.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {c.skillItems.map((s, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[11px] font-semibold text-slate-700">{s.name}</span>
                      {skillBar === "lines" && <BarRating level={s.level} />}
                      {skillBar === "dots" && (
                        <div className="flex gap-1 mt-1 rtl:flex-row-reverse">
                          {Array.from({ length: 5 }).map((_, dot) => (
                            <span key={dot} className={`h-1.5 w-1.5 rounded-full ${dot < s.level ? "bg-slate-800" : "bg-slate-200"}`} />
                          ))}
                        </div>
                      )}
                      {skillBar === "circles" && (
                        <div className="flex gap-1 mt-1 rtl:flex-row-reverse">
                          {Array.from({ length: 5 }).map((_, dot) => (
                            <span key={dot} className={`h-2 w-2 rounded-full border border-slate-400 ${dot < s.level ? "bg-slate-600" : "bg-transparent"}`} />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1">
                  {c.skills.map((skill) => (
                    <div key={skill} className={`text-[11px] font-semibold text-slate-700 ${
                      skillBar === "filled" ? "px-2 py-1 bg-slate-100 rounded" : ""
                    }`}>• {skill}</div>
                  ))}
                </div>
              )}
            </Section>
          )}
          {c.certifications.length > 0 && (
            <Section title={l.certifications} accent="border-slate-950 text-[var(--color-heading)]">
              <div className="space-y-2 text-[11px] leading-5 text-slate-700">
                {c.certifications.map((item) => <div key={item}>{item}</div>)}
              </div>
            </Section>
          )}
        </aside>
      </div>
    </div>
  );
}

function skillLevel(data: ResumeData, skill: string, index: number) {
  return `${Math.max(28, Math.min(100, (skillRating(data, skill, index) / 5) * 100))}%`;
}

function skillRating(data: ResumeData, skill: string, index: number) {
  const explicit = data.skillItems?.find((item) => item.name === skill)?.level;
  return Math.max(1, Math.min(5, explicit ?? ((index % 4) + 2)));
}

export function RefTorresTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const l = labels(rtl);
  const sideItems = [c.location, c.email, c.phone].filter(Boolean);

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="relative overflow-hidden bg-white font-sans text-[#1d3f59]" style={{ minHeight: "1122px", width: "100%" }}>
      <div className="h-[168px] bg-[#315b74]">
        <div className="h-full w-full opacity-20" style={{ backgroundImage: "linear-gradient(135deg, transparent 0 46%, rgba(255,255,255,.35) 46% 47%, transparent 47% 100%)", backgroundSize: "28px 28px" }} />
      </div>
      <div className="grid grid-cols-[308px_1fr] ">
        <aside className="relative min-h-[954px] bg-[#f3f3f3] px-12 pb-10 pt-32 ">
          <div className="absolute -top-[105px] left-1/2 h-[220px] w-[220px] -translate-x-1/2 overflow-hidden rounded-full border-[5px] border-[#d8e2e9] bg-slate-200">
            {c.photoUrl ? <img src={c.photoUrl} alt={c.name} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-5xl font-black text-[var(--color-text)] opacity-80">{initials(c.name)}</div>}
          </div>
          <Editable path="name" value={c.name} as="h1" className="mt-3 text-[42px] font-light uppercase leading-[1.02] tracking-[0.08em] rtl:tracking-normal text-[#1e405a]" />
          <Editable path="title" value={c.title} as="p" className="mt-3 border-b border-[#b8c5ce] pb-4 text-[15px] font-semibold uppercase tracking-[0.09em] rtl:tracking-normal text-neutral-800" />

          <section className="mt-9">
            <h2 className="mb-5 text-[18px] font-black uppercase tracking-[0.2em] rtl:tracking-normal text-[#1d3f59]">{l.contact}</h2>
            <div className="space-y-3 text-[12px] font-semibold leading-5 text-neutral-700">
              {c.location && <Editable path="location" value={c.location} as="div" />}
              {c.email && <Editable path="email" value={c.email} as="div" />}
              {c.phone && <Editable path="phone" value={c.phone} as="div" />}
            </div>
          </section>

          {(c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
            <section className="mt-10">
              <h2 className="mb-5 text-[18px] font-black uppercase tracking-[0.2em] rtl:tracking-normal text-[#1d3f59]">{l.skills}</h2>
              {c.skillItems && c.skillItems.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {c.skillItems.map((s, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[13px] font-medium text-neutral-800">{s.name}</span>
                      <BarRating level={s.level} />
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="list-disc space-y-3 pl-5 text-[13px] font-medium text-neutral-800 rtl:pl-0 rtl:pr-5">
                  {c.skills.slice(0, 7).map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              )}
            </section>
          )}

          {c.certifications.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-5 text-[18px] font-black uppercase tracking-[0.2em] rtl:tracking-normal text-[#1d3f59]">{l.certifications}</h2>
              <ul className="list-disc space-y-3 pl-5 text-[13px] font-medium text-neutral-800 rtl:pl-0 rtl:pr-5">
                {c.certifications.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          )}
        </aside>

        <main className="px-11 pb-10 pt-7 text-neutral-800 ">
          <Section title={l.profile} accent="border-[#b8c5ce] text-[#1d3f59]">
            <Editable path="summary" value={c.summary} as="p" className="text-[12px] leading-5" />
          </Section>
          {c.experience.length > 0 && (
            <section className="mt-7">
              <h2 className="mb-4 border-b border-[#b8c5ce] pb-2 text-[18px] font-black uppercase tracking-[0.18em] rtl:tracking-normal text-[#1d3f59]">{l.experience}</h2>
              <div className="space-y-5">
                {c.experience.slice(0, 4).map((item, index) => (
                  <article key={`${item.company}-${index}`}>
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <Editable path={`experience.${index}.title`} value={item.title} as="h3" className="text-[14px] font-black leading-tight" />
                        <Editable path={`experience.${index}.company`} value={item.company} as="p" className="text-[12px] font-bold text-neutral-600" />
                      </div>
                      <Editable path={`experience.${index}.duration`} value={item.duration} as="p" className="shrink-0 text-[12px] text-neutral-600" />
                    </div>
                    <Editable path={`experience.${index}.description`} value={item.description || item.achievements[0] || ""} as="p" className="mt-1 text-[11px] leading-5 text-neutral-700" />
                  </article>
                ))}
              </div>
            </section>
          )}
          {c.education.length > 0 && (
            <section className="mt-7">
              <h2 className="mb-4 border-b border-[#b8c5ce] pb-2 text-[18px] font-black uppercase tracking-[0.18em] rtl:tracking-normal text-[#1d3f59]">{l.education}</h2>
              <div className="space-y-3">
                {c.education.map((item, index) => (
                  <div key={`${item.institution}-${index}`} className="flex justify-between gap-5 text-[12px]">
                    <div><Editable path={`education.${index}.institution`} value={item.institution} as="div" className="font-black" /><Editable path={`education.${index}.degree`} value={item.degree} as="div" /></div>
                    <Editable path={`education.${index}.year`} value={item.year} as="div" className="text-neutral-600" />
                  </div>
                ))}
              </div>
            </section>
          )}
          {c.projects.length > 0 && (
            <section className="mt-7">
              <h2 className="mb-4 border-b border-[#b8c5ce] pb-2 text-[18px] font-black uppercase tracking-[0.18em] rtl:tracking-normal text-[#1d3f59]">{l.projects}</h2>
              <div className="grid grid-cols-2 gap-6">
                {c.projects.map((project) => (
                  <div key={project.name}>
                    <h3 className="text-[13px] font-black">{project.name}</h3>
                    <p className="mt-1 text-[11px] leading-5">{project.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export function RefSilvaTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const l = labels(rtl);

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="bg-white font-sans text-[#1f1b18]" style={{ minHeight: "1122px", width: "100%" }}>
      <header className="flex h-[190px] items-center gap-11 bg-[#342820] px-12 text-white rtl:flex-row-reverse">
        <div className="h-[135px] w-[135px] overflow-hidden rounded-full bg-stone-200">
          {c.photoUrl ? <img src={c.photoUrl} alt={c.name} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-[2.2em] font-black text-stone-500">{initials(c.name)}</div>}
        </div>
        <div className="border-l-[7px] border-white pl-8 rtl:border-l-0 rtl:border-r-[7px] rtl:pl-0 rtl:pr-8">
          <h1 className="text-[45px] font-black leading-none tracking-tight rtl:tracking-normal">{c.name}</h1>
          <p className="mt-2 text-[23px] font-bold">{c.title}</p>
        </div>
      </header>

      <div className="grid grid-cols-[230px_1fr] ">
        <aside className="min-h-[932px] bg-[#fff0e3] px-8 py-9 ">
          <Section title={l.contact} accent="border-transparent text-[#1f1b18]">
            <div className="space-y-4 text-[12px] leading-5">
              {[c.phone, c.email, c.location].filter(Boolean).map((item) => <p key={item}>{item}</p>)}
            </div>
          </Section>
          {c.education.length > 0 && (
            <section className="mt-9">
              <h2 className="mb-5 text-[22px] font-normal">{l.education}</h2>
              <div className="space-y-7">
                {c.education.map((item, index) => (
                  <div key={`${item.institution}-${index}`} className="text-[13px] leading-5">
                    <div className="font-medium uppercase">{item.degree}</div>
                    <div className="italic">{item.institution}</div>
                    <div>{item.year}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
          {(c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
            <section className="mt-10">
              <h2 className="mb-5 text-[22px] font-normal">{l.skills}</h2>
              {c.skillItems && c.skillItems.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {c.skillItems.map((s, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[13px] font-medium">{s.name}</span>
                      <BarRating level={s.level} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-5 text-[13px]">
                  {c.skills.slice(0, 8).map((skill) => <p key={skill}>{skill}</p>)}
                </div>
              )}
            </section>
          )}
        </aside>

        <main className="px-8 py-9 ">
          <section>
            <h2 className="mb-5 text-[23px] font-normal">{rtl ? "پوختە" : "Summary"}</h2>
            <ul className="list-disc space-y-1.5 pl-5 text-[12px] leading-5 rtl:pl-0 rtl:pr-5">
              {(c.summary.match(/[^.!?]+[.!?]*/g) ?? [c.summary]).slice(0, 4).map((line, index) => <li key={index}>{line.trim()}</li>)}
            </ul>
          </section>
          {c.experience.length > 0 && (
            <section className="mt-9">
              <h2 className="mb-5 text-[23px] font-normal">{rtl ? "ئەزموونەکان" : "Experiences"}</h2>
              <div className="space-y-8">
                {c.experience.slice(0, 3).map((item, index) => (
                  <article key={`${item.company}-${index}`}>
                    <h3 className="text-[14px] font-medium uppercase">{item.title}</h3>
                    <p className="text-[12px]">{item.company} / {item.duration}</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-[12px] leading-5 rtl:pl-0 rtl:pr-5">
                      {(item.achievements.length ? item.achievements : [item.description]).slice(0, 3).map((achievement, achievementIndex) => <li key={achievementIndex}>{achievement}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          )}
          {c.projects.length > 0 && (
            <section className="mt-9">
              <h2 className="mb-5 text-[23px] font-normal">{rtl ? "خەڵات و پرۆژەکان" : "Awards"}</h2>
              <div className="space-y-5 text-[13px]">
                {c.projects.map((project) => (
                  <div key={project.name}>
                    <h3 className="font-medium uppercase">{project.name}</h3>
                    <p className="mt-1">{project.impact || project.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export function RefSchumacherTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const l = labels(rtl);
  const contact = [c.location, c.email, c.phone].filter(Boolean);

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="border-[4px] border-[#7c3cff] bg-white px-[80px] py-[84px] font-sans text-[#161616]" style={{ minHeight: "1122px", width: "100%" }}>
      <header className="grid grid-cols-[230px_1fr_1fr] gap-14 ">
        <h1 className="text-[42px] font-black leading-[0.86] tracking-tight rtl:tracking-normal">{c.name.split(/\s+/).slice(0, 1).join(" ")}<br />{c.name.split(/\s+/).slice(1).join(" ") || c.name}</h1>
        {contact.slice(0, 2).map((item) => (
          <div key={item} className="pt-7 text-[13px] font-bold leading-4">
            <div className="mb-3 h-[2px] w-8 bg-neutral-400" />
            {item}
          </div>
        ))}
      </header>

      <div className="mt-12 grid grid-cols-[230px_1fr] gap-14 ">
        <aside className="space-y-9 ">
          <section>
            <h2 className="mb-4 text-[22px] font-black leading-none">{l.profile}</h2>
            <p className="text-[12px] font-semibold leading-[1.15]">{c.summary}</p>
          </section>
          {c.education.length > 0 && (
            <section>
              <h2 className="mb-5 text-[22px] font-black leading-none">{l.education}</h2>
              <div className="space-y-4">
                {c.education.map((item, index) => (
                  <div key={`${item.institution}-${index}`} className="text-[12px] font-semibold leading-[1.15]">
                    <div>{item.degree}</div>
                    <div>{item.institution}</div>
                    <div>{item.year}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
          {c.certifications.length > 0 && (
            <section>
              <h2 className="mb-5 text-[22px] font-black leading-none">{l.certifications}</h2>
              <div className="space-y-4 text-[12px] font-semibold leading-[1.15]">
                {c.certifications.map((item) => <p key={item}>{item}</p>)}
              </div>
            </section>
          )}
        </aside>

        <main className="">
          {(c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
            <section>
              <h2 className="mb-5 text-[22px] font-black leading-none">{rtl ? "لێهاتووییە سەرەکییەکان" : "Core Skills"}</h2>
              <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                {c.skillItems && c.skillItems.length > 0 ? (
                  c.skillItems.slice(0, 8).map((s, index) => (
                    <div key={s.name}>
                      <p className="mb-1 text-[13px] font-semibold leading-4">{s.name}</p>
                      <div className="h-[18px] bg-neutral-300">
                        <div className="h-full bg-[#ff8a22] rtl:mr-auto" style={{ width: `${s.level * 20}%` }} />
                      </div>
                    </div>
                  ))
                ) : (
                  c.skills.slice(0, 8).map((skill, index) => (
                    <div key={skill}>
                      <p className="mb-1 text-[13px] font-semibold leading-4">{skill}</p>
                      <div className="h-[18px] bg-neutral-300">
                        <div className="h-full bg-[#ff8a22] rtl:mr-auto" style={{ width: skillLevel(c, skill, index) }} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          )}
          {c.experience.length > 0 && (
            <section className="mt-9">
              <h2 className="mb-5 text-[22px] font-black leading-none">{l.experience}</h2>
              <div className="space-y-6">
                {c.experience.slice(0, 3).map((item, index) => (
                  <article key={`${item.company}-${index}`} className="relative pl-6 rtl:pl-0 rtl:pr-6">
                    <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full bg-[#f58213] rtl:left-auto rtl:right-0" />
                    <h3 className="text-[13px] font-black leading-4">{item.title}</h3>
                    <p className="text-[12px] font-black leading-4">{item.company}</p>
                    <p className="text-[12px] font-black leading-4">{item.duration}</p>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-[11px] font-semibold leading-[1.15] rtl:pl-0 rtl:pr-5">
                      {(item.achievements.length ? item.achievements : [item.description]).slice(0, 4).map((achievement, achievementIndex) => <li key={achievementIndex}>{achievement}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export function RefPalmerstonTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const referenceItems = c.projects.length > 0
    ? c.projects.slice(0, 2).map((project) => ({
        name: project.name,
        role: project.tech[0] || c.title,
        meta: project.impact || project.description,
      }))
    : c.education.slice(0, 2).map((item) => ({
        name: item.institution,
        role: item.degree,
        meta: item.year,
      }));
  const languageItems = (c.certifications.length > 0 ? c.certifications : c.skills).slice(0, 3);

  const SidebarHeading = ({ children }: { children: ReactNode }) => (
    <h2 className="border-b border-white/55 pb-2 text-[28px] font-black leading-none tracking-[0.14em] text-white">{children}</h2>
  );

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="relative overflow-hidden bg-white font-sans text-[#111827]" style={{ height: "1122px", minHeight: "1122px", width: "794px", maxWidth: "100%" }}>
      <header className="absolute left-0 top-0 h-[208px] w-full bg-white">
        <div className="absolute left-0 top-0 h-[205px] w-[285px] rounded-br-[48px] bg-[#303b4e]">
          <div className="absolute left-[59px] top-[34px] h-[151px] w-[151px] overflow-hidden rounded-full border-[5px] border-[#b9b4ad] bg-slate-200">
            {c.photoUrl ? <img src={c.photoUrl} alt={c.name} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-[2.2em] font-black text-[var(--color-text)] opacity-80">{initials(c.name)}</div>}
          </div>
        </div>
        <div className="ml-[330px] pt-[64px]">
          <h1 className="max-w-[420px] text-[43px] font-black uppercase leading-[0.98] tracking-[0.02em] text-[#1f3148]">{c.name}</h1>
          <p className="mt-3 text-[16px] font-semibold uppercase tracking-[0.38em] text-[#1f3148]">{c.title}</p>
        </div>
      </header>

      <div className="absolute left-[22px] right-[14px] top-[225px] z-20 flex h-[55px] items-center justify-between gap-5 rounded-full bg-[#303b4e] px-7 text-[11px] font-black text-white">
        {[
          { icon: <Phone size={15} fill="currentColor" strokeWidth={3} />, text: c.phone },
          { icon: <Mail size={15} fill="currentColor" strokeWidth={3} />, text: c.email },
          { icon: <Globe size={15} strokeWidth={3} />, text: c.location ? "www.reallygreatsite.com" : undefined },
          { icon: <MapPin size={15} fill="currentColor" strokeWidth={3} />, text: c.location },
        ].filter((item) => item.text).map((item, index) => (
          <div key={index} className="flex min-w-0 items-center gap-2">
            <span className="grid h-5 w-5 shrink-0 place-items-center text-white">{item.icon}</span>
            <span className="truncate">{item.text}</span>
          </div>
        ))}
      </div>

      <aside className="absolute bottom-0 left-0 top-[296px] w-[286px] bg-[#303b4e] px-[49px] py-[50px] text-white">
        {c.education.length > 0 && (
          <section>
            <SidebarHeading>Education</SidebarHeading>
            <div className="mt-5 space-y-5">
              {c.education.slice(0, 2).map((item, index) => (
                <div key={`${item.institution}-${index}`} className="text-[12px] leading-[1.35]">
                  <div className="font-black">{item.degree}</div>
                  <div className="mt-2 font-semibold">{item.institution}</div>
                  <div className="font-semibold">{item.year}</div>
                  {c.location && <div className="font-semibold">{c.location}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {c.certifications.length > 0 && (
          <section className="mt-9">
            <SidebarHeading>Certifications</SidebarHeading>
            <ul className="mt-5 list-disc space-y-2 pl-4 text-[12px] font-semibold leading-[1.35]">
              {c.certifications.slice(0, 3).map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        )}

        <section className="mt-9">
          <SidebarHeading>Skills</SidebarHeading>
          <div className="mt-5 space-y-3 text-[12px] font-semibold leading-[1.25]">
            {c.skills.slice(0, 6).map((skill) => <p key={skill}>{skill}</p>)}
          </div>
        </section>

        <section className="mt-9">
          <SidebarHeading>Language</SidebarHeading>
          <div className="mt-5 space-y-2 text-[12px] font-semibold">
            {languageItems.map((item) => <p key={item}>{item}</p>)}
          </div>
        </section>
      </aside>

      <main className="absolute bottom-[34px] left-[326px] right-[32px] top-[340px]">
        <section>
          <h2 className="border-b border-[#8b929b] pb-2 text-[23px] font-black tracking-[0.22em] text-[#1f3148]">About me</h2>
          <p className="mt-4 text-[11px] font-medium leading-[1.35] text-black">{c.summary}</p>
        </section>

        <section className="mt-7">
          <h2 className="border-b border-[#8b929b] pb-2 text-[23px] font-black tracking-[0.22em] text-[#1f3148]">Experience</h2>
          <div className="mt-4 space-y-6">
            {c.experience.slice(0, 3).map((item, index) => (
              <article key={`${item.company}-${index}`} className="text-black">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[17px] font-black leading-tight">{item.title}</h3>
                  <span className="shrink-0 text-[11px] font-semibold">{item.duration}</span>
                </div>
                <p className="mt-1 text-[12px] font-semibold">{item.company}</p>
                <p className="mt-3 text-[11px] font-medium leading-[1.35]">{item.description || item.achievements[0]}</p>
                {item.achievements.length > 0 && (
                  <p className="mt-2 text-[11px] font-medium leading-[1.35]">{item.achievements.slice(0, 2).join(" ")}</p>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-7">
          <h2 className="border-b border-[#8b929b] pb-2 text-[23px] font-black tracking-[0.22em] text-[#1f3148]">Reference</h2>
          <div className="mt-4 grid grid-cols-2 gap-10 text-[11px] text-black">
            {referenceItems.map((item, index) => (
              <div key={`${item.name}-${index}`}>
                <p className="font-semibold">{item.name} | {item.role}</p>
                <p className="mt-2 font-medium">{item.meta}</p>
                <p className="mt-2 font-medium">{c.phone || "+123-456-7890"}</p>
              </div>
            ))}
            {referenceItems.length === 1 && (
              <div>
                <p className="font-semibold">{c.name} | {c.title}</p>
                <p className="mt-2 font-medium">{c.email || "hello@reallygreatsite.com"}</p>
                <p className="mt-2 font-medium">{c.phone || "+123-456-7890"}</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export function RefSanchezTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const l = labels(rtl);

  const TimelineSection = ({ title, icon, children }: { title: string; icon: string; children: ReactNode }) => (
    <section className="relative pl-16 rtl:pl-0 rtl:pr-16">
      <span className="absolute left-[17px] top-0 grid h-[140px] w-[1px] bg-[#99a1ab] rtl:left-auto rtl:right-[17px]" />
      <span className="absolute left-0 top-0 grid h-9 w-9 place-items-center rounded-full bg-[#303b4e] text-[12px] font-black text-white rtl:left-auto rtl:right-0">{icon}</span>
      <h2 className="mb-3 border-b border-[#7d8792] pb-2 text-[19px] font-black uppercase tracking-[0.17em] rtl:tracking-normal text-[#303b4e]">{title}</h2>
      {children}
    </section>
  );

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="bg-white font-sans text-[#263241]" style={{ minHeight: "1122px", width: "100%" }}>
      <header className="relative h-[185px] bg-[#303b4e] text-white">
        <div className="absolute left-[28px] top-[78px] z-10 h-[170px] w-[170px] overflow-hidden rounded-full border-[7px] border-white bg-slate-200 rtl:left-auto rtl:right-[28px]">
          {c.photoUrl ? <img src={c.photoUrl} alt={c.name} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-[2.2em] font-black text-[var(--color-text)] opacity-80">{initials(c.name)}</div>}
        </div>
        <div className="pl-[315px] pt-[62px] rtl:pl-0 rtl:pr-[315px]">
          <h1 className="text-[38px] font-black uppercase leading-none">{c.name}</h1>
          <p className="mt-4 text-[18px] font-bold uppercase">{c.title}</p>
        </div>
      </header>

      <div className="grid grid-cols-[245px_1fr] ">
        <aside className="min-h-[937px] bg-[#e6e6e6] px-6 pb-9 pt-[120px] ">
          <section>
            <h2 className="mb-4 border-b-2 border-[#8c939a] pb-2 text-[18px] font-black uppercase tracking-[0.15em] rtl:tracking-normal">{l.contact}</h2>
            <div className="space-y-3 text-[12px] leading-5">
              {[c.phone, c.email, c.location].filter(Boolean).map((item) => <p key={item}>{item}</p>)}
            </div>
          </section>
          {(c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
            <section className="mt-9">
              <h2 className="mb-4 border-b-2 border-[#8c939a] pb-2 text-[18px] font-black uppercase tracking-[0.15em] rtl:tracking-normal">{l.skills}</h2>
              <div className="space-y-3">
                {c.skillItems && c.skillItems.length > 0 ? (
                  c.skillItems.slice(0, 7).map((s, index) => {
                    return (
                      <div key={s.name}>
                        <p className="text-[12px] font-semibold">{s.name}</p>
                        <div className="mt-1 flex gap-1.5 rtl:flex-row-reverse">
                          {Array.from({ length: 5 }).map((_, dot) => (
                            <span key={dot} className={`h-2 w-2 rounded-full ${dot < s.level ? "bg-[#303b4e]" : "bg-[#b8bdc3]"}`} />
                          ))}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  c.skills.slice(0, 7).map((skill, index) => {
                    const rating = skillRating(c, skill, index);
                    return (
                      <div key={skill}>
                        <p className="text-[12px] font-semibold">{skill}</p>
                        <div className="mt-1 flex gap-1.5 rtl:flex-row-reverse">
                          {Array.from({ length: 5 }).map((_, dot) => (
                            <span key={dot} className={`h-2 w-2 rounded-full ${dot < rating ? "bg-[#303b4e]" : "bg-[#b8bdc3]"}`} />
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>
          )}
          <section className="mt-9">
            <h2 className="mb-4 border-b-2 border-[#8c939a] pb-2 text-[18px] font-black uppercase tracking-[0.15em] rtl:tracking-normal">{rtl ? "زمانەکان" : "Languages"}</h2>
            <ul className="list-disc space-y-1 pl-4 text-[12px] rtl:pl-0 rtl:pr-4">
              {(rtl ? ["کوردی", "ئینگلیزی"] : ["English", "Kurdish"]).map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
          {c.projects.length > 0 && (
            <section className="mt-9">
              <h2 className="mb-4 border-b-2 border-[#8c939a] pb-2 text-[18px] font-black uppercase tracking-[0.15em] rtl:tracking-normal">{rtl ? "سەرچاوە" : "Reference"}</h2>
              <p className="text-[12px] font-bold">{c.projects[0].name}</p>
              <p className="mt-2 text-[11px] leading-5">{c.projects[0].description}</p>
            </section>
          )}
        </aside>

        <main className="space-y-9 px-11 py-12 ">
          <TimelineSection title={l.profile} icon="i">
            <p className="text-[12px] leading-5">{c.summary}</p>
          </TimelineSection>
          {c.experience.length > 0 && (
            <TimelineSection title={l.experience} icon="W">
              <div className="space-y-5">
                {c.experience.slice(0, 3).map((item, index) => (
                  <article key={`${item.company}-${index}`}>
                    <div className="flex justify-between gap-4">
                      <div>
                        <h3 className="text-[13px] font-black uppercase">{item.company}</h3>
                        <p className="text-[12px] font-semibold">{item.title}</p>
                      </div>
                      <span className="shrink-0 text-[11px] font-bold uppercase">{item.duration}</span>
                    </div>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-[11px] leading-5 rtl:pl-0 rtl:pr-5">
                      {(item.achievements.length ? item.achievements : [item.description]).slice(0, 3).map((achievement, achievementIndex) => <li key={achievementIndex}>{achievement}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
            </TimelineSection>
          )}
          {c.education.length > 0 && (
            <TimelineSection title={l.education} icon="E">
              <div className="space-y-4">
                {c.education.slice(0, 2).map((item, index) => (
                  <div key={`${item.institution}-${index}`} className="text-[12px] leading-5">
                    <div className="flex justify-between gap-4">
                      <p className="font-black">{item.degree}</p>
                      <p className="shrink-0 font-semibold">{item.year}</p>
                    </div>
                    <p>{item.institution}</p>
                  </div>
                ))}
              </div>
            </TimelineSection>
          )}
        </main>
      </div>
    </div>
  );
}

export function LeroyTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const competenceItems = c.skills.slice(0, 6);
  const languageItems = (c.certifications.length > 0 ? c.certifications : c.skills).slice(0, 3);
  const leisureText = c.projects.length > 0
    ? c.projects.slice(0, 3).map((project) => project.name).join(" - ")
    : c.skills.slice(0, 3).join(" - ");
  const nameParts = c.name.split(/\s+/).filter(Boolean);
  const firstLine = nameParts.slice(0, Math.ceil(nameParts.length / 2)).join(" ") || c.name;
  const secondLine = nameParts.slice(Math.ceil(nameParts.length / 2)).join(" ");

  const CreamPanel = ({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) => (
    <section className={`bg-[#f8f7f4] px-[38px] py-[28px] text-[#050b14] ${className}`}>
      <h2 className="mb-3 font-serif text-[34px] font-bold uppercase leading-none tracking-[0.02em] text-[#142033] rtl:tracking-normal">{title}</h2>
      {children}
    </section>
  );

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="relative overflow-hidden bg-white font-sans text-[#050b14]" style={{ height: "1122px", minHeight: "1122px", width: "794px", maxWidth: "100%" }}>
      <div className="absolute left-0 top-[76px] h-[112px] w-full bg-[#6f7e84]" />

      <div className="absolute left-[46px] top-0 z-20 h-[609px] w-[292px] bg-[#202a3a]" style={{ clipPath: "polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%)" }}>
        <div className="pt-[86px] text-center font-serif text-[34px] font-bold uppercase leading-[0.98] tracking-[0.02em] text-white rtl:tracking-normal">
          <div>{firstLine}</div>
          {secondLine && <div>{secondLine}</div>}
        </div>

        <div className="mx-auto mt-[28px] h-[202px] w-[202px] overflow-hidden rounded-full bg-slate-200">
          {c.photoUrl ? (
            <img src={c.photoUrl} alt={c.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-200 text-5xl font-black text-[#202a3a]">{initials(c.name)}</div>
          )}
        </div>

        <div className="mt-[38px] px-[43px] text-[14px] font-black leading-[1.2] text-white">
          <p className="text-center">30 ans - permis B</p>
          <div className="mt-3 space-y-3">
            {c.phone && (
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-5 w-5 place-items-center rounded-full border-2 border-white text-[10px]">P</span>
                <span className="truncate">{c.phone}</span>
              </div>
            )}
            {c.email && (
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-5 w-5 place-items-center rounded-full border-2 border-white text-[12px]">@</span>
                <span className="truncate">{c.email}</span>
              </div>
            )}
            {c.location && (
              <div className="flex min-w-0 items-center gap-3">
                <MapPin size={20} fill="currentColor" strokeWidth={3} className="shrink-0" />
                <span className="truncate">{c.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <header className="absolute left-[338px] right-0 top-[76px] z-10 flex h-[112px] items-center px-[76px] font-serif text-[38px] font-bold uppercase leading-[1.02] tracking-[0.03em] text-white rtl:tracking-normal">
        <div className="max-w-[440px]">{c.title}</div>
      </header>

      <div className="absolute left-[46px] top-[628px] z-10 w-[292px]">
        <CreamPanel title="Formation" className="min-h-[355px] px-[34px] py-[26px]">
          <ul className="list-disc space-y-[22px] pl-5 text-[15px] font-semibold leading-[1.16] rtl:pl-0 rtl:pr-5">
            {c.education.slice(0, 3).map((item, index) => (
              <li key={`${item.institution}-${index}`}>{item.year}: {item.degree} - {item.institution}</li>
            ))}
          </ul>
        </CreamPanel>
      </div>

      <main className="absolute left-[378px] right-[42px] top-[228px] z-10 space-y-[18px]">
        <CreamPanel title="Competences" className="min-h-[280px]">
          <ul className="list-disc space-y-[3px] pl-5 text-[15px] font-semibold leading-[1.05] rtl:pl-0 rtl:pr-5">
            {competenceItems.map((skill) => <li key={skill}>{skill}</li>)}
          </ul>
        </CreamPanel>

        <CreamPanel title="Experience" className="min-h-[276px]">
          <ul className="list-disc space-y-[22px] pl-5 text-[15px] font-semibold leading-[1.14] rtl:pl-0 rtl:pr-5">
            {c.experience.slice(0, 3).map((item, index) => (
              <li key={`${item.company}-${index}`}>{item.duration}: {item.title} - {item.company}</li>
            ))}
          </ul>
        </CreamPanel>

        <CreamPanel title="Langues" className="min-h-[166px] py-[25px]">
          <ul className="list-disc space-y-[3px] pl-5 text-[15px] font-semibold leading-[1.05] rtl:pl-0 rtl:pr-5">
            {languageItems.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </CreamPanel>
      </main>

      <footer className="absolute bottom-0 left-0 right-0 flex h-[65px] items-center bg-[#6f7e84] px-[88px] text-white">
        <div className="font-serif text-[31px] font-bold uppercase leading-none">Loisirs</div>
        <div className="ml-[58px] min-w-0 truncate text-[15px] font-black">{leisureText}</div>
      </footer>
    </div>
  );
}

export function DuboisTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const blue = "#153f68";
  const skills = c.skills.slice(0, 6);
  const languages = (c.certifications.length > 0 ? c.certifications : c.skills).slice(0, 2);
  const interests = c.projects.length > 0 ? c.projects.slice(0, 4).map((p) => p.name) : c.skills.slice(0, 4);

  const SidebarTitle = ({ children }: { children: ReactNode }) => (
    <h2 className="mb-5 text-[17px] font-black leading-none text-[#153f68]">{children}</h2>
  );

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="relative overflow-hidden bg-white font-sans text-[#153f68]" style={{ height: "1122px", minHeight: "1122px", width: "794px", maxWidth: "100%" }}>
      <aside className="absolute left-0 top-0 h-full w-[260px] bg-[#dcdfe5] px-[41px] pt-[26px]">
        <div className="h-[244px] w-[172px] overflow-hidden border-[4px] border-white bg-slate-200">
          {c.photoUrl ? <img src={c.photoUrl} alt={c.name} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-[2.2em] font-black">{initials(c.name)}</div>}
        </div>

        <section className="mt-[45px]">
          <SidebarTitle>Coordonnees</SidebarTitle>
          <div className="space-y-[22px] text-[12px] font-bold">
            {c.phone && <div className="flex items-center gap-4"><Phone size={24} fill="currentColor" strokeWidth={3} /><span>{c.phone}</span></div>}
            {c.email && <div className="flex items-center gap-4"><Mail size={24} fill="currentColor" strokeWidth={3} /><span className="truncate">{c.email}</span></div>}
            {c.location && <div className="flex items-center gap-4"><MapPin size={24} fill="currentColor" strokeWidth={3} /><span className="truncate">{c.location}</span></div>}
          </div>
        </section>

        <section className="mt-[48px]">
          <SidebarTitle>Langues</SidebarTitle>
          <div className="space-y-3 text-[13px] font-bold">
            {languages.map((item, index) => (
              <div key={item} className="grid grid-cols-[76px_1fr] items-center">
                <span>{item}</span>
                <span className="h-[6px] rounded-full bg-white"><span className="block h-full rounded-full bg-[#245b90]" style={{ width: index === 0 ? "86%" : "68%" }} /></span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-[54px]">
          <SidebarTitle>Competences</SidebarTitle>
          <div className="space-y-2 text-[13px] font-bold leading-[1.35]">
            {skills.map((skill) => <p key={skill}>{skill}</p>)}
          </div>
        </section>

        <section className="mt-[58px]">
          <SidebarTitle>Centres d'interet</SidebarTitle>
          <div className="space-y-2 text-[13px] font-bold leading-[1.35]">
            {interests.map((item) => <p key={item}>{item}</p>)}
          </div>
        </section>
      </aside>

      <header className="absolute left-[210px] right-[11px] top-[52px] h-[145px] bg-[#153f68] px-[65px] py-[38px] text-white">
        <h1 className="text-[39px] font-black leading-none tracking-tight">{c.name}</h1>
        <p className="mt-4 text-[25px] font-semibold italic leading-none">{c.title}</p>
      </header>

      <main className="absolute left-[306px] right-[39px] top-[255px]">
        <section>
          <h2 className="mb-6 text-[21px] font-black leading-none">Formation</h2>
          <div className="space-y-6">
            {c.education.slice(0, 2).map((item, index) => (
              <div key={`${item.institution}-${index}`} className="grid grid-cols-[1fr_92px] gap-6">
                <div>
                  <h3 className="text-[16px] font-black leading-tight">{item.degree}</h3>
                  <p className="text-[16px] font-semibold italic leading-tight text-[#2b6398]">{item.institution}</p>
                </div>
                <p className="pt-1 text-right text-[11px] font-semibold italic text-[#2b6398]">{item.year}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-[64px]">
          <h2 className="mb-7 text-[23px] font-black leading-none">Experience Professionnelle</h2>
          <div className="relative border-l-[3px] border-[#245b90] pl-[22px]">
            {c.experience.slice(0, 3).map((item, index) => (
              <article key={`${item.company}-${index}`} className="relative mb-[36px]">
                <span className="absolute -left-[29px] top-1.5 h-[10px] w-[10px] rounded-full bg-[#153f68]" />
                <div className="grid grid-cols-[1fr_98px] gap-5">
                  <div>
                    <h3 className="text-[17px] font-black leading-tight">{item.title}</h3>
                    <p className="text-[16px] font-semibold italic leading-tight text-[#2b6398]">{item.company}</p>
                  </div>
                  <p className="pt-1 text-right text-[11px] font-semibold italic leading-tight text-[#2b6398]">{item.duration}</p>
                </div>
                <ul className="mt-5 list-disc space-y-1 pl-6 text-[14px] font-semibold leading-[1.2]">
                  {(item.achievements.length ? item.achievements : [item.description]).slice(0, 3).map((achievement, achievementIndex) => <li key={achievementIndex}>{achievement}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export function GallegoTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const contact = [c.phone, c.email, c.location].filter(Boolean);
  const referenceItems = c.projects.length > 0
    ? c.projects.slice(0, 2).map((project) => ({
        name: project.name,
        meta: project.impact || project.description,
      }))
    : c.education.slice(0, 2).map((item) => ({
        name: item.degree,
        meta: item.institution,
      }));
  const languageItems = (c.certifications.length > 0 ? c.certifications : c.skills).slice(0, 4);

  const SectionRibbon = ({
    title,
    icon,
    className = "",
  }: {
    title: string;
    icon: ReactNode;
    className?: string;
  }) => (
    <div className={`relative -ml-6 h-[48px] w-[392px] bg-[#075a7c] text-white shadow-[0_4px_0_rgba(0,0,0,0.16)] rtl:-ml-0 rtl:-mr-6 ${className}`}>
      <div className="flex h-full items-center gap-3 px-8 text-[22px] font-black leading-none tracking-tight rtl:flex-row-reverse rtl:tracking-normal">
        <span className="grid h-7 w-7 place-items-center text-white">{icon}</span>
        <span>{title}</span>
      </div>
    </div>
  );

  const SidebarTitle = ({ children }: { children: ReactNode }) => (
    <div className="mb-4 h-[43px] rounded-full border-[3px] border-white/55 text-center text-[21px] font-black leading-[38px] tracking-tight text-white">
      {children}
    </div>
  );

  return (
    <div
      dir={rtl ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[#f7f7f7] font-sans text-[#1e4a5f]"
      style={{ height: "1122px", minHeight: "1122px", width: "794px", maxWidth: "100%" }}
    >
      <div className="absolute inset-0 bg-white" />
      <div className="absolute right-0 top-0 h-full w-[420px] bg-[linear-gradient(135deg,transparent_0_70%,#ececec_70%_100%)] rtl:left-0 rtl:right-auto" />
      <div className="absolute right-[18px] top-[12px] flex gap-4 rtl:left-[18px] rtl:right-auto">
        {Array.from({ length: 4 }).map((_, index) => (
          <span key={index} className="h-[14px] w-[14px] rounded-full border-[4px] border-[#073f57] bg-white" />
        ))}
      </div>

      <aside className="absolute left-0 top-0 z-10 h-full w-[325px] bg-[#073f57] px-[30px] pt-[66px] text-white rtl:left-auto rtl:right-0">
        <div className="mx-auto h-[210px] w-[210px] overflow-hidden rounded-full border-[7px] border-white/75 bg-slate-200">
          {c.photoUrl ? (
            <img src={c.photoUrl} alt={c.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-200 text-5xl font-black text-[#073f57]">
              {initials(c.name)}
            </div>
          )}
        </div>

        <section className="mt-[44px]">
          <SidebarTitle>{rtl ? "پەیوەندی" : "Contact"}</SidebarTitle>
          <div className="space-y-[13px] text-[13px] font-bold leading-none text-white">
            {contact.map((item, index) => {
              const icons = [
                <Phone key="phone" size={18} fill="currentColor" strokeWidth={3} />,
                <Mail key="mail" size={18} fill="currentColor" strokeWidth={3} />,
                <MapPin key="pin" size={18} fill="currentColor" strokeWidth={3} />,
              ];
              return (
                <div key={item} className="flex min-w-0 items-center gap-3 rtl:flex-row-reverse">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white text-[#073f57]">{icons[index] ?? icons[0]}</span>
                  <span className="truncate">{item}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-[52px]">
          <SidebarTitle>{rtl ? "سەرچاوەکان" : "References"}</SidebarTitle>
          <div className="space-y-3">
            {referenceItems.slice(0, 2).map((item, index) => (
              <div key={`${item.name}-${index}`} className="text-[13px] leading-[1.18]">
                <div className="font-black text-white">{item.name}</div>
                <div className="font-semibold text-white/85">{item.meta}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-[52px]">
          <SidebarTitle>{rtl ? "زمانەکان" : "Languages"}</SidebarTitle>
          <ul className="list-disc space-y-1 pl-5 text-[13px] font-bold leading-[1.2] rtl:pl-0 rtl:pr-5">
            {languageItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </aside>

      <main className="relative z-20 ml-[325px] min-h-[1122px] pb-10 pl-0 pr-[30px] pt-[64px] rtl:ml-0 rtl:mr-[325px] rtl:pl-[30px] rtl:pr-0">
        <header className="ml-[-28px] h-[204px] bg-[#075a7c] px-[42px] pt-[38px] text-white shadow-[0_8px_0_rgba(0,0,0,0.14)] rtl:ml-0 rtl:mr-[-28px]">
          <h1 className="max-w-[430px] text-[37px] font-black leading-[1.03] tracking-tight rtl:tracking-normal">{c.name}</h1>
          <p className="mt-4 max-w-[360px] text-[18px] font-bold leading-[1.18] text-white/90">{c.title}</p>
        </header>

        <div className="space-y-[28px] pt-[28px]">
          <section>
            <SectionRibbon title={rtl ? "پڕۆفایل" : "Profile"} icon={<UserRound size={24} fill="currentColor" strokeWidth={3} />} />
            <div className="px-[36px] pt-[22px]">
              <p className="max-w-[300px] text-[14px] font-bold leading-[1.35] text-[#4d6b77]">{c.summary}</p>
            </div>
          </section>

          {c.education.length > 0 && (
            <section>
              <SectionRibbon title={rtl ? "خوێندن" : "Education"} icon={<GraduationCap size={27} fill="currentColor" strokeWidth={3} />} />
              <div className="space-y-3 px-[36px] pt-[22px]">
                {c.education.slice(0, 2).map((item, index) => (
                  <div key={`${item.institution}-${index}`} className="text-[13px] leading-[1.13]">
                    <div className="font-black text-[#15495f]">{item.degree}</div>
                    <div className="font-semibold text-[#4f6c78]">{item.institution}</div>
                    <div className="font-bold text-[#15495f]">• {item.year}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {c.experience.length > 0 && (
            <section>
              <SectionRibbon title={rtl ? "ئەزموون" : "Experience"} icon={<BriefcaseBusiness size={25} fill="currentColor" strokeWidth={3} />} />
              <div className="space-y-4 px-[36px] pt-[22px]">
                {c.experience.slice(0, 2).map((item, index) => (
                  <article key={`${item.company}-${index}`} className="max-w-[320px] text-[13px] leading-[1.22]">
                    <h3 className="font-black text-[#15495f]">{item.company}</h3>
                    <p className="font-semibold text-[#4f6c78]">{item.title}</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-[12px] font-semibold leading-[1.25] text-[#4f6c78] rtl:pl-0 rtl:pr-5">
                      {(item.achievements.length ? item.achievements : [item.description]).slice(0, 3).map((achievement, achievementIndex) => (
                        <li key={achievementIndex}>{achievement}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export function MercerTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const l = labels(rtl);

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="bg-[#305178] text-white px-6 py-2 rounded-full inline-block mb-4 text-lg font-black min-w-[200px]">
      {title}
    </div>
  );

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="bg-white font-sans text-[var(--color-heading)]" style={{ minHeight: "1122px", width: "100%", position: "relative", overflow: "hidden" }}>
      <div className="grid grid-cols-[320px_1fr] min-h-[1122px] ">
        {/* Sidebar */}
        <aside className="bg-[#305178] p-10 pt-64 text-white flex flex-col gap-10 relative z-0">
          {/* Education */}
          {c.education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold border-b border-white pb-2 mb-6 tracking-wide">{l.education}</h2>
              <div className="space-y-6">
                {c.education.map((edu, i) => (
                  <div key={i}>
                    <div className="font-bold text-[14px] leading-tight">{edu.institution}</div>
                    <div className="text-[12px] font-bold mt-1">{edu.year}</div>
                    <div className="text-[12px] mt-1 leading-relaxed opacity-90">{edu.degree}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {(c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
            <section>
              <h2 className="text-xl font-bold border-b border-white pb-2 mb-6 tracking-wide">{l.skills}</h2>
              <div className="space-y-4">
                {c.skillItems && c.skillItems.length > 0 ? (
                  c.skillItems.slice(0, 8).map((s, i) => (
                    <div key={i} className="flex justify-between items-center gap-4">
                      <div className="text-[10px] font-black uppercase w-24 truncate">
                        {s.name}
                      </div>
                      <div className="flex-1 h-3 bg-white/20">
                        <div 
                          className="h-full bg-slate-200" 
                          style={{ width: `${s.level * 20}%` }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  c.skills.slice(0, 8).map((skill, i) => (
                    <div key={i} className="flex justify-between items-center gap-4">
                      <div className="text-[10px] font-black uppercase w-24 truncate">
                        {skill}
                      </div>
                      <div className="flex-1 h-3 bg-white/20">
                        <div 
                          className="h-full bg-slate-200" 
                          style={{ width: skillLevel(c, skill, i) }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          )}

          {/* Contact */}
          <section>
            <h2 className="text-xl font-bold border-b border-white pb-2 mb-6 tracking-wide">{l.contact}</h2>
            <div className="space-y-4 text-[12px] font-bold">
              {c.phone && (
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full bg-white text-[#305178] flex items-center justify-center shrink-0">
                    <Phone size={10} fill="currentColor" />
                  </div>
                  <span>{c.phone}</span>
                </div>
              )}
              {c.email && (
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full bg-white text-[#305178] flex items-center justify-center shrink-0">
                    <Mail size={10} fill="currentColor" />
                  </div>
                  <span className="truncate">{c.email}</span>
                </div>
              )}
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 rounded-full bg-white text-[#305178] flex items-center justify-center shrink-0">
                  <Globe size={10} />
                </div>
                <span>www.reallygreatsite.com</span>
              </div>
              {c.location && (
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full bg-white text-[#305178] flex items-center justify-center shrink-0">
                    <MapPin size={10} fill="currentColor" />
                  </div>
                  <span>{c.location}</span>
                </div>
              )}
            </div>
          </section>
        </aside>

        {/* Main Content */}
        <main className="p-10 pt-16 flex flex-col gap-10 relative z-10">
           {/* Profile Photo */}
           <div 
            className="absolute -left-[180px] top-10 w-64 h-64 rounded-full border-[12px] border-white overflow-hidden bg-slate-200 shadow-lg rtl:left-auto rtl:-right-[180px]"
           >
              {c.photoUrl ? (
                <img src={c.photoUrl} alt={c.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-6xl font-black text-[var(--color-text)] opacity-60">
                  {initials(c.name)}
                </div>
              )}
           </div>

           {/* Header Area */}
           <div className="ml-20 pt-4 rtl:ml-0 rtl:mr-20">
              <h1 className="text-6xl font-black text-[#305178] leading-[0.85] tracking-tighter rtl:tracking-normal uppercase w-fit">
                {c.name.split(/\s+/).map((word, idx) => (
                  <div key={idx}>{word}</div>
                ))}
              </h1>
              <p className="text-[20px] font-black text-[var(--color-heading)] mt-4 tracking-widest uppercase">{c.title}</p>
           </div>

           <div className="mt-4">
             {/* About Me */}
             <section className="mb-10">
                <SectionHeader title={rtl ? "دەربارەی من" : "About Me"} />
                <p className="text-[13px] leading-relaxed text-[var(--color-heading)] font-medium px-1">{c.summary}</p>
             </section>

             {/* Experience */}
             {c.experience.length > 0 && (
               <section className="mb-10">
                  <SectionHeader title={rtl ? "ئەزموونی کار" : "Experience Work"} />
                  <div className="space-y-6 px-1">
                    {c.experience.map((exp, i) => (
                      <div key={i} className="relative">
                         <div className="flex items-center gap-3 mb-1">
                            <div className="w-4 h-4 rounded-full bg-[#305178]" />
                            <h3 className="font-light tracking-wide uppercase text-[16px] text-slate-700">{exp.title}</h3>
                         </div>
                         <div className="font-black text-[13px] text-[var(--color-heading)] ml-7 uppercase tracking-wider mb-2">
                           {exp.duration} - {exp.company}
                         </div>
                         <p className="text-[12px] text-slate-700 ml-7 leading-relaxed font-medium">
                           {exp.description}
                           {exp.achievements.length > 0 && " " + exp.achievements.join(". ")}
                         </p>
                      </div>
                    ))}
                  </div>
               </section>
             )}

             {/* Reference */}
             <section>
                <SectionHeader title={rtl ? "سەرچاوە" : "Reference"} />
                <div className="grid grid-cols-2 gap-10 px-1 mt-2">
                   <div>
                      <div className="font-bold text-[13px] text-[var(--color-heading)]">Juliana Silva</div>
                      <div className="text-[12px] text-[var(--color-heading)] font-bold mt-0.5">Rimberio / CTO</div>
                      <div className="text-[12px] text-[var(--color-text)] mt-0.5 font-bold">+123-456-7890</div>
                   </div>
                   <div>
                      <div className="font-bold text-[13px] text-[var(--color-heading)]">Donna Stroupe</div>
                      <div className="text-[12px] text-[var(--color-heading)] font-bold mt-0.5">Borcelle / CEO</div>
                      <div className="text-[12px] text-[var(--color-text)] mt-0.5 font-bold">+123-456-7890</div>
                   </div>
                </div>
             </section>
           </div>
        </main>
      </div>
    </div>
  );
}

