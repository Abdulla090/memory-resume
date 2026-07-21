import { useContext } from "react";
import type { ReactNode } from "react";
import { DesignContext } from "../DesignContext";
import { Editable } from "../Editable";
import { StarRating, BarRating } from "../templates";
import { ContactLines, ExperienceList, PhotoBlock, Section, useLayoutRtl, labels, pickLanguages, skillRating, skillLevel, initials } from "../template-helpers";
import { BriefcaseBusiness, Globe, GraduationCap, Mail, MapPin, Phone, UserRound } from "lucide-react";
import type { ResumeData } from "@/lib/types";
import { optimizeResumeForOnePage } from "@/lib/resume-utils";

export function RefSchumacherTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = useLayoutRtl(c);
  const l = labels(c, rtl);
  const contact = [c.location, c.email, c.phone].filter(Boolean);
  const design = useContext(DesignContext);
  const showSkillBars = design?.showSkillBars !== false;

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="border-[4px] border-[#7c3cff] bg-white px-[80px] py-[84px] font-sans text-[#161616]" style={{ minHeight: "1122px", width: "100%" }}>
      <header className="grid grid-cols-[230px_1fr_1fr] gap-14 ">
        <Editable path="name" value={c.name} as="h1" className="text-[42px] font-black rtl:font-normal leading-[0.86] tracking-tight rtl:tracking-normal" />
        {contact.slice(0, 2).map((item) => {
          const path =
            item === c.location ? "location" : item === c.email ? "email" : "phone";
          return (
            <div key={path} className="pt-7 text-[13px] font-bold rtl:font-normal leading-4">
              <div className="mb-3 h-[2px] w-8 bg-neutral-400" />
              <Editable path={path} value={item as string} as="span" />
            </div>
          );
        })}
      </header>

      <div className="mt-12 grid grid-cols-[230px_1fr] gap-14 ">
        <aside className="space-y-9 ">
          <section>
            <h2 className="mb-4 text-[22px] font-black rtl:font-normal leading-none">{l.profile}</h2>
            <Editable path="summary" value={c.summary} as="p" className="text-[12px] font-semibold rtl:font-normal leading-[1.15]" />
          </section>
          {c.education.length > 0 && (
            <section>
              <h2 className="mb-5 text-[22px] font-black rtl:font-normal leading-none">{l.education}</h2>
              <div className="space-y-4">
                {c.education.map((item, index) => (
                  <div key={`${item.institution}-${index}`} className="text-[12px] font-semibold rtl:font-normal leading-[1.15]">
                    <Editable path={`education.${index}.degree`} value={item.degree} as="div" />
                    <Editable path={`education.${index}.institution`} value={item.institution} as="div" />
                    <Editable path={`education.${index}.year`} value={item.year} as="div" />
                  </div>
                ))}
              </div>
            </section>
          )}
          {c.certifications.length > 0 && (
            <section>
              <h2 className="mb-5 text-[22px] font-black rtl:font-normal leading-none">{l.certifications}</h2>
              <div className="space-y-4 text-[12px] font-semibold rtl:font-normal leading-[1.15]">
                {c.certifications.map((item, idx) => (
                  <Editable key={item} path={`certifications.${idx}`} value={item} as="p" />
                ))}
              </div>
            </section>
          )}
        </aside>

        <main className="">
          {showSkillBars && (c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
            <section>
              <h2 className="mb-5 text-[22px] font-black rtl:font-normal leading-none">{l.skills}</h2>
              <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                {c.skillItems && c.skillItems.length > 0 ? (
                  c.skillItems.slice(0, 8).map((s, index) => (
                    <div key={s.name}>
                      <Editable path={`skillItems.${index}.name`} value={s.name} as="p" className="mb-1 text-[13px] font-semibold rtl:font-normal leading-4" />
                      <div className="h-[18px] bg-neutral-300">
                        <div className="h-full bg-[#ff8a22] rtl:mr-auto" style={{ width: `${s.level * 20}%` }} />
                      </div>
                    </div>
                  ))
                ) : (
                  c.skills.slice(0, 8).map((skill, index) => (
                    <div key={skill}>
                      <Editable path={`skills.${index}`} value={skill} as="p" className="mb-1 text-[13px] font-semibold leading-4" />
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
              <h2 className="mb-5 text-[22px] font-black rtl:font-normal leading-none">{l.experience}</h2>
              <div className="space-y-6">
                {c.experience.slice(0, 3).map((item, index) => (
                  <article key={`${item.company}-${index}`} className="relative pl-6 rtl:pl-0 rtl:pr-6">
                    <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full bg-[#f58213] rtl:left-auto rtl:right-0" />
                    <Editable path={`experience.${index}.title`} value={item.title} as="h3" className="text-[13px] font-black rtl:font-normal leading-4" />
                    <Editable path={`experience.${index}.company`} value={item.company} as="p" className="text-[12px] font-black rtl:font-normal leading-4" />
                    <Editable path={`experience.${index}.duration`} value={item.duration} as="p" className="text-[12px] font-black rtl:font-normal leading-4" />
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-[11px] font-semibold rtl:font-normal leading-[1.15] rtl:pl-0 rtl:pr-5">
                      {(item.achievements.length ? item.achievements : [item.description]).slice(0, 4).map((achievement, achievementIndex) => {
                        const path = item.achievements.length
                          ? `experience.${index}.achievements.${achievementIndex}`
                          : `experience.${index}.description`;
                        return <Editable key={achievementIndex} path={path} value={achievement} as="li" />;
                      })}
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

