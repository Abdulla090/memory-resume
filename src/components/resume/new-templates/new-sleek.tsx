import { useContext } from "react";
import type { ReactNode } from "react";
import { DesignContext } from "../DesignContext";
import { Editable } from "../Editable";
import { InteractiveSkills } from "../InteractiveSkills";
import { StarRating, BarRating } from "../templates";
import {
  ContactLines,
  ExperienceList,
  PhotoBlock,
  Section,
  useLayoutRtl,
  labels,
  pickLanguages,
  skillRating,
  skillLevel,
  initials,
  getContrastTheme,
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

export function NewSleekTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = useLayoutRtl(c);
  const l = labels(c, rtl);
  const design = useContext(DesignContext);

  const colLayout = design?.columnLayout || "sidebar-right";
  const layoutClass =
    colLayout === "single"
      ? "grid-cols-1"
      : colLayout === "two-col"
        ? "grid-cols-2"
        : colLayout === "sidebar-left"
          ? "grid-cols-[260px_1fr]"
          : "grid-cols-[1fr_260px]";

  const isLeftSidebar = colLayout === "sidebar-left";

  const skillBar = design?.skillBarStyle || "filled";
  const photoShape = design?.photoShape || "circle";
  const photoBlockShape = photoShape === "square" ? "rounded" : photoShape;

  const skillsColumns = design?.skillsColumns || 1;
  const skillsLocation = design?.skillsLocation || "sidebar";

  const renderSkills = design?.showSkillBars !== false &&
    (c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
      <Section title={l.skills}>
        <InteractiveSkills
          data={c}
          skillBar={skillBar}
          columns={skillsColumns}
          isSidebar={skillsLocation === "sidebar"}
          textColor={getContrastTheme(design?.backgroundColor || "#ffffff") === "dark" ? "text-slate-100" : "text-slate-700"}
          barBgClass={getContrastTheme(design?.backgroundColor || "#ffffff") === "dark" ? "bg-white/20" : "bg-slate-200"}
          barFillClass={getContrastTheme(design?.backgroundColor || "#ffffff") === "dark" ? "bg-white" : "bg-slate-800"}
          circleBorderClass={getContrastTheme(design?.backgroundColor || "#ffffff") === "dark" ? "border-white/50" : "border-slate-400"}
          circleFillClass={getContrastTheme(design?.backgroundColor || "#ffffff") === "dark" ? "bg-white" : "bg-slate-600"}
          starFillClass={getContrastTheme(design?.backgroundColor || "#ffffff") === "dark" ? "text-white" : "text-slate-800"}
          starEmptyClass={getContrastTheme(design?.backgroundColor || "#ffffff") === "dark" ? "text-white/20" : "text-slate-200"}
          textDescClass={getContrastTheme(design?.backgroundColor || "#ffffff") === "dark" ? "text-white/60" : "text-slate-500"}
          tagFilledClass={getContrastTheme(design?.backgroundColor || "#ffffff") === "dark" ? "bg-slate-800 text-white rounded-lg" : "bg-slate-100 text-[var(--color-heading)] rounded-lg"}
          tagBorderClass={getContrastTheme(design?.backgroundColor || "#ffffff") === "dark" ? "border border-white/20 text-slate-200 rounded-full" : "border border-slate-200 text-slate-700 rounded-full"}
        />
      </Section>
    );

  return (
    <div
      dir={rtl ? "rtl" : "ltr"}
      className="bg-white p-10 font-sans text-[var(--color-heading)]"
      style={{ minHeight: "1122px", width: "100%" }}
    >
      <header className="grid grid-cols-[1fr_auto] items-start gap-8 border-b border-slate-200 pb-8 ">
        <div>
          <div className="mb-5 h-1.5 w-24 rounded-full bg-[var(--color-sidebar)]" />
          <Editable
            path="name"
            value={c.name}
            as="h1"
            className="max-w-[12ch] text-5xl font-black leading-[0.94] tracking-tight rtl:tracking-normal text-[var(--color-heading)]"
          />
          <Editable
            path="title"
            value={c.title}
            as="p"
            className="mt-4 text-sm font-black uppercase tracking-[0.28em] rtl:tracking-normal text-[var(--color-text)] opacity-80"
          />
        </div>
        <div className="flex flex-col items-end gap-5 rtl:items-start">
          <PhotoBlock data={c} shape={photoBlockShape} />
          <ContactLines data={c} />
        </div>
      </header>

      <div className={`grid ${layoutClass} gap-10 pt-8`}>
        <main className={`space-y-7 ${isLeftSidebar ? "order-last" : ""}`}>
          <Section title={l.profile}>
            <Editable
              path="summary"
              value={c.summary}
              as="p"
              className="text-[13px] leading-7 text-slate-700"
            />
          </Section>
          {skillsLocation === "main" && renderSkills}
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
                    <Editable
                      path={`projects.${index}.name`}
                      value={project.name}
                      as="h3"
                      className="text-[13px] font-extrabold text-[var(--color-heading)]"
                    />
                    <Editable
                      path={`projects.${index}.description`}
                      value={project.description}
                      as="p"
                      className="mt-1 text-[11px] leading-5 text-[var(--color-text)]"
                    />
                    {project.tech.length > 0 && (
                      <Editable
                        path={`projects.${index}.tech`}
                        value={project.tech.join(" / ")}
                        as="p"
                        className="mt-1 text-[10px] font-black uppercase tracking-[0.16em] rtl:tracking-normal text-[var(--color-text)] opacity-60"
                      />
                    )}
                  </article>
                ))}
              </div>
            </Section>
          )}
        </main>

        <aside
          className={`space-y-7 ${
            colLayout === "single"
              ? ""
              : isLeftSidebar
                ? "border-r border-slate-200 pr-7 rtl:border-r-0 rtl:border-l rtl:pr-0 rtl:pl-7"
                : "border-l border-slate-200 pl-7 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-7"
          }`}
        >
          {skillsLocation !== "main" && renderSkills}
          {c.education.length > 0 && (
            <Section title={l.education}>
              <div className="space-y-4">
                {c.education.map((item, index) => (
                  <div key={`${item.institution}-${index}`}>
                    <Editable
                      path={`education.${index}.degree`}
                      value={item.degree}
                      as="div"
                      className="text-[12px] font-extrabold leading-5 text-[var(--color-heading)]"
                    />
                    <Editable
                      path={`education.${index}.institution`}
                      value={item.institution}
                      as="div"
                      className="mt-1 text-[11px] font-semibold text-[var(--color-text)] opacity-80"
                    />
                    <Editable
                      path={`education.${index}.year`}
                      value={item.year}
                      as="div"
                      className="mt-1 text-[10px] font-black text-[var(--color-text)] opacity-60"
                    />
                  </div>
                ))}
              </div>
            </Section>
          )}
          {c.certifications.length > 0 && (
            <Section title={l.certifications}>
              <div className="space-y-2 text-[11px] font-semibold leading-5 text-[var(--color-text)]">
                {c.certifications.map((item, index) => (
                  <Editable key={item} path={`certifications.${index}`} value={item} as="div" />
                ))}
              </div>
            </Section>
          )}
        </aside>
      </div>
    </div>
  );
}
