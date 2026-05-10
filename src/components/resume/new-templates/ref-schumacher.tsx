import { useContext } from "react";
import type { ReactNode } from "react";
import { DesignContext } from "../DesignContext";
import { Editable } from "../Editable";
import { StarRating, BarRating } from "../templates";
import { ContactLines, ExperienceList, PhotoBlock, Section, isRTL, labels, pickLanguages, skillRating, skillLevel, initials } from "../template-helpers";
import { BriefcaseBusiness, Globe, GraduationCap, Mail, MapPin, Phone, UserRound } from "lucide-react";
import type { ResumeData } from "@/lib/types";
import { optimizeResumeForOnePage } from "@/lib/resume-utils";

export function RefSchumacherTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const l = labels(c, rtl);
  const contact = [c.location, c.email, c.phone].filter(Boolean);
  const design = useContext(DesignContext);
  const showSkillBars = design?.showSkillBars !== false;

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
          {showSkillBars && (c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
            <section>
              <h2 className="mb-5 text-[22px] font-black leading-none">{rtl ? "┘ä█Ä┘ç╪º╪¬┘ê┘ê█î█î█ò ╪│█ò╪▒█ò┌⌐█î█î█ò┌⌐╪º┘å" : "Core Skills"}</h2>
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

