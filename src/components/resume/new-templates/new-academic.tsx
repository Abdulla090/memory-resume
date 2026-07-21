import { useContext } from "react";
import type { ReactNode } from "react";
import { DesignContext } from "../DesignContext";
import { Editable } from "../Editable";
import {
  ContactLines,
  ExperienceList,
  PhotoBlock,
  Section,
  useLayoutRtl,
  labels,
  skillRating,
  initials,
} from "../template-helpers";
import {
  BriefcaseBusiness,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
import type { ResumeData } from "@/lib/types";
import { optimizeResumeForOnePage } from "@/lib/resume-utils";

export function NewAcademicTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = useLayoutRtl(c);
  const l = labels(c, rtl);
  const design = useContext(DesignContext);

  const showSkillBars = design?.showSkillBars !== false;
  const colLayout = design?.columnLayout || "sidebar-right";
  const isLeftSidebar = colLayout === "sidebar-left";
  const layoutClass =
    colLayout === "single"
      ? "grid-cols-1"
      : colLayout === "two-col"
        ? "grid-cols-2"
        : isLeftSidebar
          ? "grid-cols-[235px_1fr]"
          : "grid-cols-[1fr_235px]";

  const photoShape = design?.photoShape || "arch";
  const photoBlockShape = photoShape === "square" ? "rounded" : photoShape;

  const skillsLocation = design?.skillsLocation || "sidebar";

  const renderSkills = showSkillBars &&
    (c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
      <Section title={l.skills} accent="border-slate-950 text-[var(--color-heading)]">
        <div className="space-y-3">
          {c.skillItems && c.skillItems.length > 0 ? (
            c.skillItems.slice(0, 7).map((s, index) => (
              <div key={s.name} className="flex justify-between items-center gap-2">
                <Editable path={`skillItems.${index}.name`} value={s.name} as="span" className="text-[12px] font-semibold rtl:font-normal text-slate-700" />
                <div className="flex shrink-0 gap-1.5 rtl:flex-row-reverse">
                  {Array.from({ length: 5 }).map((_, dot) => (
                    <span key={dot} className={`h-2 w-2 rounded-full bg-slate-800 ${dot < s.level ? "" : "opacity-30"}`} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            c.skills.slice(0, 7).map((skill, index) => {
              const rating = skillRating(c, skill, index);
              return (
                <div key={skill} className="flex justify-between items-center gap-2">
                  <Editable path={`skills.${index}`} value={skill} as="span" className="text-[12px] font-semibold rtl:font-normal text-slate-700" />
                  <div className="flex shrink-0 gap-1.5 rtl:flex-row-reverse">
                    {Array.from({ length: 5 }).map((_, dot) => (
                      <span key={dot} className={`h-2 w-2 rounded-full bg-slate-800 ${dot < rating ? "" : "opacity-30"}`} />
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Section>
    );

  return (
    <div
      dir={rtl ? "rtl" : "ltr"}
      className="bg-white p-11 font-serif text-[var(--color-heading)]"
      style={{ minHeight: "1122px", width: "100%" }}
    >
      <header
        className={`grid ${colLayout === "single" ? "grid-cols-[120px_1fr]" : "grid-cols-[120px_1fr]"} gap-8 border-b-2 border-slate-950 pb-7`}
      >
        <PhotoBlock data={c} shape={photoBlockShape} />
        <div>
          <p className="text-[11px] font-bold rtl:font-normal uppercase tracking-[0.3em] rtl:tracking-normal text-[var(--color-text)] opacity-80">
            {l.selected} Curriculum Vitae
          </p>
          <Editable
            path="name"
            value={c.name}
            as="h1"
            className="mt-4 text-[2.2em] font-bold rtl:font-normal leading-tight tracking-tight rtl:tracking-normal"
          />
          <Editable
            path="title"
            value={c.title}
            as="p"
            className="mt-2 text-[15px] font-semibold rtl:font-normal text-slate-700"
          />
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[11px] font-semibold rtl:font-normal text-[var(--color-text)] opacity-80">
            <ContactLines data={c} />
          </div>
        </div>
      </header>

      <div className={`grid ${layoutClass} gap-10 pt-7`}>
        <main className={`space-y-7 ${isLeftSidebar ? "order-last" : ""}`}>
          <Section title={l.profile} accent="border-slate-950 text-[var(--color-heading)]">
            <Editable
              path="summary"
              value={c.summary}
              as="p"
              className="text-[13px] leading-7 text-slate-700"
            />
          </Section>
          {skillsLocation === "main" && renderSkills}
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
                    <Editable
                      path={`projects.${index}.name`}
                      value={project.name}
                      as="h3"
                      className="text-[13px] font-bold rtl:font-normal text-[var(--color-heading)]"
                    />
                    <Editable
                      path={`projects.${index}.description`}
                      value={project.description}
                      as="p"
                      className="mt-1 text-[11px] leading-5 text-slate-700"
                    />
                    {project.impact && (
                      <Editable
                        path={`projects.${index}.impact`}
                        value={project.impact}
                        as="p"
                        className="mt-1 text-[11px] italic text-[var(--color-text)] opacity-80"
                      />
                    )}
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
                    <Editable
                      path={`education.${index}.degree`}
                      value={item.degree}
                      as="div"
                      className="text-[12px] font-bold rtl:font-normal leading-5"
                    />
                    <Editable
                      path={`education.${index}.institution`}
                      value={item.institution}
                      as="div"
                      className="mt-1 text-[11px] text-[var(--color-text)]"
                    />
                    <Editable
                      path={`education.${index}.year`}
                      value={item.year}
                      as="div"
                      className="mt-1 text-[10px] font-bold rtl:font-normal text-[var(--color-text)] opacity-60"
                    />
                  </div>
                ))}
              </div>
            </Section>
          )}
          {skillsLocation !== "main" && renderSkills}
          {c.certifications.length > 0 && (
            <Section title={l.certifications} accent="border-slate-950 text-[var(--color-heading)]">
              <div className="space-y-2 text-[11px] leading-5 text-slate-700">
                {c.certifications.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            </Section>
          )}
        </aside>
      </div>
    </div>
  );
}

