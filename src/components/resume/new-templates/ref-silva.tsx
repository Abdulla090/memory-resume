import { use } from "react";
import type { ReactNode } from "react";
import { DesignContext } from "../DesignContext";
import { Editable } from "../Editable";
import { StarRating, BarRating } from "../templates";
import { ContactLines, ExperienceList, PhotoBlock, Section, useLayoutRtl, labels, pickLanguages, skillRating, skillLevel, initials } from "../template-helpers";
import { BriefcaseBusiness, Globe, GraduationCap, Mail, MapPin, Phone, UserRound } from "lucide-react";
import type { ResumeData } from "@/lib/types";
import { optimizeResumeForOnePage } from "@/lib/resume-utils";

export function RefSilvaTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = useLayoutRtl(c);
  const l = labels(c, rtl);
  const design = use(DesignContext);
  const showSkillBars = design?.showSkillBars !== false;
  const photoShape = design?.photoShape || "circle";
  const photoBlockShape = photoShape === "square" ? "rounded" : photoShape;

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="bg-white font-sans text-[#1f1b18]" style={{ minHeight: "1122px", width: "100%" }}>
      <header className="flex h-[190px] items-center gap-11 bg-[#342820] px-12 text-white rtl:flex-row-reverse">
        <PhotoBlock data={c} shape={photoBlockShape} />
        <div className="border-l-[7px] border-white pl-8 rtl:border-l-0 rtl:border-r-[7px] rtl:pl-0 rtl:pr-8">
          <Editable path="name" value={c.name} as="h1" className="text-[45px] font-black leading-none tracking-tight rtl:tracking-normal text-white" />
          <Editable path="title" value={c.title} as="p" className="mt-2 text-[23px] font-bold" />
        </div>
      </header>

      <div className="grid grid-cols-[230px_1fr] ">
        <aside className="min-h-[932px] bg-[#fff0e3] px-8 py-9 ">
          <Section title={l.contact} accent="border-transparent text-[#1f1b18]">
            <div className="space-y-4 text-[12px] leading-5">
              {c.phone && <Editable path="phone" value={c.phone} as="p" />}
              {c.email && <Editable path="email" value={c.email} as="p" />}
              {c.location && <Editable path="location" value={c.location} as="p" />}
            </div>
          </Section>
          {c.education.length > 0 && (
            <section className="mt-9">
              <h2 className="mb-5 text-[22px] font-normal">{l.education}</h2>
              <div className="space-y-7">
                {c.education.map((item, index) => (
                  <div key={`${item.institution}-${index}`} className="text-[13px] leading-5">
                    <Editable path={`education.${index}.degree`} value={item.degree} as="div" className="font-medium uppercase" />
                    <Editable path={`education.${index}.institution`} value={item.institution} as="div" className="italic" />
                    <Editable path={`education.${index}.year`} value={item.year} as="div" />
                  </div>
                ))}
              </div>
            </section>
          )}
          {showSkillBars && (c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
            <section className="mt-10">
              <h2 className="mb-5 text-[22px] font-normal">{l.skills}</h2>
              {c.skillItems && c.skillItems.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {c.skillItems.map((s, idx) => (
                    <div key={s.name} className="flex flex-col">
                      <Editable path={`skillItems.${idx}.name`} value={s.name} as="span" className="text-[13px] font-medium" />
                      <BarRating level={s.level} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-5 text-[13px]">
                  {c.skills.slice(0, 8).map((skill, idx) => (
                    <Editable key={skill} path={`skills.${idx}`} value={skill} as="p" />
                  ))}
                </div>
              )}
            </section>
          )}
        </aside>

        <main className="px-8 py-9 ">
          <section>
            <h2 className="mb-5 text-[23px] font-normal">{l.profile}</h2>
            <Editable
              path="summary"
              value={c.summary}
              as="p"
              className="text-[12px] leading-5"
            />
          </section>
          {c.experience.length > 0 && (
            <section className="mt-9">
              <h2 className="mb-5 text-[23px] font-normal">{l.experience}</h2>
              <div className="space-y-8">
                {c.experience.slice(0, 3).map((item, index) => (
                  <article key={`${item.company}-${index}`}>
                    <Editable path={`experience.${index}.title`} value={item.title} as="h3" className="text-[14px] font-medium uppercase" />
                    <p className="text-[12px] flex gap-1">
                      <Editable path={`experience.${index}.company`} value={item.company} as="span" />
                      <span>/</span>
                      <Editable path={`experience.${index}.duration`} value={item.duration} as="span" />
                    </p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-[12px] leading-5 rtl:pl-0 rtl:pr-5">
                      {(item.achievements.length ? item.achievements : [item.description]).slice(0, 3).map((achievement, achievementIndex) => {
                        const path = item.achievements.length
                          ? `experience.${index}.achievements.${achievementIndex}`
                          : `experience.${index}.description`;
                        return <Editable key={`ach-${index}-${achievementIndex}`} path={path} value={achievement} as="li" />;
                      })}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          )}
          {c.projects.length > 0 && (
            <section className="mt-9">
              <h2 className="mb-5 text-[23px] font-normal">{l.projects}</h2>
              <div className="space-y-5 text-[13px]">
                {c.projects.map((project, idx) => (
                  <div key={project.name}>
                    <Editable path={`projects.${idx}.name`} value={project.name} as="h3" className="font-medium uppercase" />
                    {(project.impact || project.description) && (
                      <Editable
                        path={project.impact ? `projects.${idx}.impact` : `projects.${idx}.description`}
                        value={project.impact || project.description}
                        as="p"
                        className="mt-1"
                      />
                    )}
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
