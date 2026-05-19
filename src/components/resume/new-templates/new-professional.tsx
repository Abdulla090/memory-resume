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

export function NewProfessionalTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = useLayoutRtl(c);
  const l = labels(c, rtl);
  const design = useContext(DesignContext);

  const colLayout = design?.columnLayout || "sidebar-left";
  const isLeftSidebar = colLayout !== "sidebar-right";
  const layoutClass =
    colLayout === "single"
      ? "grid-cols-1"
      : colLayout === "two-col"
        ? "grid-cols-2"
        : isLeftSidebar
          ? "grid-cols-[230px_1fr]"
          : "grid-cols-[1fr_230px]";

  const skillBar = design?.skillBarStyle || "dots";
  const photoShape = design?.photoShape || "circle";
  const photoBlockShape = photoShape === "square" ? "rounded" : photoShape;

  const skillsColumns = design?.skillsColumns || 1;
  const skillsLocation = design?.skillsLocation || "sidebar";

  const renderSkillContent = (isSidebar: boolean) => {
    const sidebarContrast = getContrastTheme(design?.sidebarColor || "#1e293b");
    const isSidebarDark = sidebarContrast === "dark";
    
    // Default main column contrast (typically light)
    const mainContrast = getContrastTheme(design?.backgroundColor || "#ffffff");
    const isMainDark = mainContrast === "dark";

    const textColor = isSidebar 
      ? (isSidebarDark ? "text-slate-100" : "text-slate-700") 
      : (isMainDark ? "text-slate-100" : "text-slate-700");
      
    const barBgClass = isSidebar 
      ? (isSidebarDark ? "bg-white/20" : "bg-black/10") 
      : (isMainDark ? "bg-white/20" : "bg-slate-200");
      
    const barFillClass = isSidebar 
      ? (isSidebarDark ? "bg-white" : "bg-slate-800") 
      : (isMainDark ? "bg-white" : "bg-slate-800");
      
    const circleBorderClass = isSidebar 
      ? (isSidebarDark ? "border-white/50" : "border-slate-400") 
      : (isMainDark ? "border-white/50" : "border-slate-400");
      
    const circleFillClass = isSidebar 
      ? (isSidebarDark ? "bg-white" : "bg-slate-600") 
      : (isMainDark ? "bg-white" : "bg-slate-600");
      
    const starFillClass = isSidebar 
      ? (isSidebarDark ? "text-white" : "text-slate-800") 
      : (isMainDark ? "text-white" : "text-slate-800");
      
    const starEmptyClass = isSidebar 
      ? (isSidebarDark ? "text-white/20" : "text-black/10") 
      : (isMainDark ? "text-white/20" : "text-slate-200");
      
    const textDescClass = isSidebar 
      ? (isSidebarDark ? "text-white/60" : "text-slate-500") 
      : (isMainDark ? "text-white/60" : "text-slate-500");
      
    const tagFilledClass = isSidebar 
      ? (isSidebarDark ? "bg-white text-[var(--color-heading)]" : "bg-slate-800 text-white") 
      : (isMainDark ? "bg-white text-[var(--color-heading)]" : "bg-slate-100 text-[var(--color-heading)]");
      
    const tagBorderClass = isSidebar 
      ? (isSidebarDark ? "border-white/10 bg-white/[0.04]" : "border-black/10 bg-black/[0.04]") 
      : (isMainDark ? "border-white/10 bg-white/[0.04]" : "border border-slate-200 bg-white");

    return (
      <InteractiveSkills
        data={c}
        skillBar={skillBar}
        columns={skillsColumns}
        isSidebar={isSidebar}
        textColor={textColor}
        barBgClass={barBgClass}
        barFillClass={barFillClass}
        circleBorderClass={circleBorderClass}
        circleFillClass={circleFillClass}
        starFillClass={starFillClass}
        starEmptyClass={starEmptyClass}
        textDescClass={textDescClass}
        tagFilledClass={tagFilledClass}
        tagBorderClass={tagBorderClass}
      />
    );
  };

  return (
    <div
      dir={rtl ? "rtl" : "ltr"}
      className="bg-[#fbfcfd] p-8 font-sans text-[var(--color-heading)]"
      style={{ minHeight: "1122px", width: "100%" }}
    >
      <div
        className={`grid min-h-[1058px] ${layoutClass} overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_70px_-45px_rgba(15,23,42,0.55)]`}
      >
        <aside
          className={`bg-[var(--color-sidebar)] p-7 ${
            getContrastTheme(design?.sidebarColor || "#1e293b") === "dark" ? "text-white" : "text-slate-900"
          } ${!isLeftSidebar ? "order-last" : ""}`}
        >
          <PhotoBlock data={c} shape={photoBlockShape} />
          <Editable
            path="name"
            value={c.name}
            as="h1"
            className="mt-7 text-[1.8em] font-black leading-[1] tracking-tight rtl:tracking-normal"
          />
          <Editable
            path="title"
            value={c.title}
            as="p"
            className="mt-3 text-[11px] font-black uppercase leading-5 tracking-[0.2em] rtl:tracking-normal opacity-80"
          />
          <div className="mt-8">
            <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] rtl:tracking-normal opacity-60">
              {l.contact}
            </h2>
            <div className="space-y-2 text-[11px] font-semibold leading-5 opacity-70">
              {c.location && <Editable path="location" value={c.location} as="div" />}
              {c.email && <Editable path="email" value={c.email} as="div" />}
              {c.phone && <Editable path="phone" value={c.phone} as="div" />}
            </div>
          </div>
          {skillsLocation !== "main" && design?.showSkillBars !== false &&
            (c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
              <div className="mt-8">
                <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] rtl:tracking-normal opacity-60">
                  {l.skills}
                </h2>
                {renderSkillContent(true)}
              </div>
            )}
        </aside>

        <main className="space-y-7 p-9">
          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] rtl:tracking-normal text-[var(--color-accent)]">
              {l.profile}
            </h2>
            <Editable
              path="summary"
              value={c.summary}
              as="p"
              className="text-[1em] leading-7 text-[var(--color-text)]"
            />
          </section>
          {skillsLocation === "main" && design?.showSkillBars !== false &&
            (c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
              <Section title={l.skills} accent="border-cyan-700 text-cyan-800">
                {renderSkillContent(false)}
              </Section>
            )}
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
                      <Editable
                        path={`projects.${index}.name`}
                        value={project.name}
                        as="h3"
                        className="text-[0.9em] font-extrabold text-[var(--color-heading)]"
                      />
                      <Editable
                        path={`projects.${index}.description`}
                        value={project.description}
                        as="p"
                        className="mt-1 text-[0.85em] leading-5 text-[var(--color-text)]"
                      />
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
                      <Editable
                        path={`education.${index}.degree`}
                        value={item.degree}
                        as="div"
                        className="text-[0.9em] font-extrabold text-[var(--color-heading)]"
                      />
                      <div className="mt-1 text-[0.85em] text-[var(--color-text)] flex gap-1">
                        <Editable
                          path={`education.${index}.institution`}
                          value={item.institution}
                          as="span"
                        />
                        <span>┬╖</span>
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
