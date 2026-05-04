import { useContext } from "react";
import type { ReactNode } from "react";
import { DesignContext } from "../DesignContext";
import { Editable } from "../Editable";
import { StarRating, BarRating } from "../templates";
import { ContactLines, ExperienceList, PhotoBlock, Section, isRTL, labels, pickLanguages, skillRating, skillLevel, initials } from "../template-helpers";
import { BriefcaseBusiness, Globe, GraduationCap, Mail, MapPin, Phone, UserRound } from "lucide-react";
import type { ResumeData } from "@/lib/types";
import { optimizeResumeForOnePage } from "@/lib/resume-utils";

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
                    }`}>ΓÇó {skill}</div>
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

