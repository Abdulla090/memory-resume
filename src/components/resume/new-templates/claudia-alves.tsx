import { Home, Mail, Phone } from "lucide-react";
import { type ReactNode, useContext } from "react";
import { DesignContext } from "../DesignContext";
import { Editable } from "../Editable";
import { useLayoutRtl, labels, skillRating } from "../template-helpers";
import type { ResumeData } from "@/lib/types";
import { optimizeResumeForOnePage } from "@/lib/resume-utils";

const BAR = "#686361";

function SectionBar({ title, className = "" }: { title: ReactNode; className?: string }) {
  return (
    <div className={`flex h-[30px] items-center px-[16px] ${className}`} style={{ backgroundColor: BAR }}>
      <h2 className="text-[15px] font-black rtl:font-normal uppercase leading-none tracking-[0.26em] text-white rtl:tracking-normal">
        {title}
      </h2>
    </div>
  );
}

function ContactRow({
  icon,
  path,
  value,
}: {
  icon: ReactNode;
  path?: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-[13px]">
      <div className="grid h-[14px] w-[14px] shrink-0 place-items-center rounded-full text-white" style={{ backgroundColor: BAR }}>
        {icon}
      </div>
      {path ? (
        <Editable path={path} value={value} as="span" className="text-[14px] font-normal leading-[1.1] text-[#6a6664]" />
      ) : (
        <span className="text-[14px] font-normal leading-[1.1] text-[#6a6664]">{value}</span>
      )}
    </div>
  );
}

function EducationBlock({ data, index }: { data: ResumeData; index: number }) {
  const item = data.education[index];
  if (!item) return null;

  return (
    <article className="min-w-0">
      <div className="grid grid-cols-[1fr_92px] items-start gap-4">
        <Editable
          path={`education.${index}.institution`}
          value={item.institution}
          as="h3"
          className="text-[14px] font-black rtl:font-normal uppercase leading-[1.15] text-[#666260]"
        />
        <Editable path={`education.${index}.year`} value={item.year} as="span" className="text-right text-[13px] leading-[1.2] text-[#6a6664]" />
      </div>
      <Editable
        path={`education.${index}.degree`}
        value={item.degree}
        as="p"
        className="mt-[10px] text-[13px] font-normal uppercase leading-[1.15] tracking-[0.13em] text-[#6a6664] rtl:tracking-normal"
      />
      <p className="mt-[24px] text-[12px] font-normal leading-[1.42] text-[#6a6664]">
        <Editable
          path={`education.${index}.degree`}
          value={item.degree}
          as="span"
        />{" "}
        at{" "}
        <Editable path={`education.${index}.institution`} value={item.institution} as="span" />.
      </p>
    </article>
  );
}

function ExperienceBlock({ data, index }: { data: ResumeData; index: number }) {
  const item = data.experience[index];
  if (!item) return null;

  return (
    <article className="min-w-0">
      <div className="grid grid-cols-[1fr_105px] items-start gap-4">
        <Editable
          path={`experience.${index}.title`}
          value={item.title}
          as="h3"
          className="text-[13px] font-black rtl:font-normal uppercase leading-[1.15] text-[#666260]"
        />
        <Editable path={`experience.${index}.duration`} value={item.duration} as="span" className="text-right text-[12px] leading-[1.2] text-[#6a6664]" />
      </div>
      <Editable
        path={`experience.${index}.company`}
        value={item.company}
        as="p"
        className="mt-[12px] text-[13px] font-normal uppercase leading-[1.15] tracking-[0.08em] text-[#6a6664] rtl:tracking-normal"
      />
      <p className="mt-[24px] text-[12px] font-normal leading-[1.42] text-[#6a6664]">
        {[item.description, ...item.achievements.slice(0, 2)].filter(Boolean).map((value, itemIndex) => (
          <Editable
            key={itemIndex}
            path={itemIndex === 0 && item.description ? `experience.${index}.description` : `experience.${index}.achievements.${item.description ? itemIndex - 1 : itemIndex}`}
            value={value}
            as="span"
          />
        )).reduce<React.ReactNode[]>((parts, node, partIndex) => (partIndex === 0 ? [node] : [...parts, " ", node]), [])}
      </p>
    </article>
  );
}

export function ClaudiaAlvesTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = useLayoutRtl(c);
  const l = labels(c, rtl);
  const design = useContext(DesignContext);
  const showSkillBars = design?.showSkillBars !== false;
  const skills = c.skills.slice(0, 5);
  const references = c.projects.length > 0
    ? c.projects.slice(0, 1).map((project) => ({
        name: project.name,
        role: project.tech[0] || c.title,
        company: project.impact || project.description,
      }))
    : c.experience.slice(0, 1).map((item) => ({
        name: item.company,
        role: item.title,
        company: item.description || c.email || "",
      }));

  return (
    <div
      dir={rtl ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[#f7f7f6] font-sans text-[#6a6664]"
      style={{ height: "1122px", minHeight: "1122px", width: "794px", maxWidth: "100%" }}
    >
      <div className="absolute left-[80px] right-[80px] top-[80px]">
        <header className="grid grid-cols-[196px_1fr] gap-[49px]">
          <div className="h-[190px] w-[196px] overflow-hidden bg-[#d8d8d6]">
            {c.photoUrl ? (
              <img src={c.photoUrl} alt={c.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#d8d8d6] text-[54px] font-black rtl:font-normal text-[#77716f]">
                {c.name.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>

          <div className="pt-[3px]">
            <Editable
              path="name"
              value={c.name}
              as="h1"
              className="max-w-[390px] text-[42px] font-black rtl:font-normal uppercase leading-[0.96] tracking-[0.08em] text-[#666260] rtl:tracking-normal"
            />
            <Editable
              path="title"
              value={c.title}
              as="p"
              className="mt-[21px] text-[20px] font-normal uppercase leading-none tracking-[0.32em] text-[#666260] rtl:tracking-normal"
            />
            <div className="mt-[32px] space-y-[10px]">
              {c.phone && <ContactRow icon={<Phone className="h-[8px] w-[8px]" strokeWidth={3} />} path="phone" value={c.phone} />}
              {c.email && <ContactRow icon={<Mail className="h-[8px] w-[8px]" strokeWidth={3} />} path="email" value={c.email} />}
              {c.location && <ContactRow icon={<Home className="h-[8px] w-[8px] fill-white" strokeWidth={3} />} path="location" value={c.location} />}
            </div>
          </div>
        </header>

        <section className="mt-[30px]">
          <SectionBar title={l.profile} />
          <Editable
            path="summary"
            value={c.summary}
            as="p"
            className="mt-[26px] text-[14px] italic leading-[1.55] text-[#6a6664]"
          />
        </section>

        {c.education.length > 0 && (
          <section className="mt-[39px]">
            <SectionBar title={l.education} />
            <div className="mt-[26px] grid grid-cols-2 gap-[60px]">
              <EducationBlock data={c} index={0} />
              <EducationBlock data={c} index={1} />
            </div>
          </section>
        )}

        {c.experience.length > 0 && (
          <section className="mt-[38px]">
            <SectionBar title={l.experience} />
            <div className="mt-[25px] grid grid-cols-2 gap-[60px]">
              <ExperienceBlock data={c} index={0} />
              <ExperienceBlock data={c} index={1} />
            </div>
          </section>
        )}

        <div className="mt-[41px] grid grid-cols-2 gap-[60px]">
          {showSkillBars && (c.skillItems?.length ? c.skillItems.length > 0 : skills.length > 0) && (
            <section>
              <SectionBar title={l.skills} />
              <div className="mt-[25px] space-y-[6px]">
                {c.skillItems && c.skillItems.length > 0 ? (
                  c.skillItems.slice(0, 5).map((s, index) => (
                    <div key={s.name} className="flex justify-between items-center gap-2">
                      <Editable path={`skillItems.${index}.name`} value={s.name} as="span" className="text-[13px] font-semibold rtl:font-normal" />
                      <div className="flex shrink-0 gap-1.5 rtl:flex-row-reverse">
                        {Array.from({ length: 5 }).map((_, dot) => (
                          <span key={dot} className={`h-2 w-2 rounded-full ${dot < s.level ? "bg-[#686361]" : "bg-[#686361] opacity-30"}`} />
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  skills.map((skill, index) => {
                    const rating = skillRating(c, skill, index);
                    return (
                      <div key={`${skill}-${index}`} className="flex justify-between items-center gap-2">
                        <Editable path={`skills.${index}`} value={skill} as="span" className="text-[13px] font-semibold rtl:font-normal" />
                        <div className="flex shrink-0 gap-1.5 rtl:flex-row-reverse">
                          {Array.from({ length: 5 }).map((_, dot) => (
                            <span key={dot} className={`h-2 w-2 rounded-full ${dot < rating ? "bg-[#686361]" : "bg-[#686361] opacity-30"}`} />
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>
          )}

          <section>
            <SectionBar title={<Editable path="sectionTitles.references" value={c.sectionTitles?.references || "Work References"} as="span" />} />
            <div className="mt-[26px]">
              {references.length > 0 ? references.map((reference, index) => {
                const isProject = c.projects.length > 0 && index < c.projects.length;
                const namePath = isProject ? `projects.${index}.name` : `experience.${index}.company`;
                const rolePath = isProject ? `projects.${index}.tech.0` : `experience.${index}.title`;
                const companyPath = isProject
                  ? c.projects[index]?.impact
                    ? `projects.${index}.impact`
                    : `projects.${index}.description`
                  : `experience.${index}.description`;
                return (
                  <div key={`${reference.name}-${index}`}>
                    <Editable path={namePath} value={reference.name} as="h3" className="text-[13px] font-black rtl:font-normal uppercase leading-[1.2]" />
                    <Editable path={rolePath} value={reference.role} as="p" className="mt-[21px] text-[12px] leading-[1.45]" />
                    <Editable path={companyPath} value={reference.company} as="p" className="text-[12px] leading-[1.45]" />
                  </div>
                );
              }) : (
                <div>
                  <Editable path="name" value={c.name} as="h3" className="text-[13px] font-black rtl:font-normal uppercase leading-[1.2] text-[#666260]" />
                  <Editable path="title" value={c.title} as="p" className="mt-[21px] text-[12px] leading-[1.45] text-[#6a6664]" />
                  {c.email && <Editable path="email" value={c.email} as="p" className="text-[12px] leading-[1.45] text-[#6a6664]" />}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
