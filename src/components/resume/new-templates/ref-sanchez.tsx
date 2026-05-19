import { useContext } from "react";
import type { ReactNode } from "react";
import { DesignContext } from "../DesignContext";
import { Editable } from "../Editable";
import { StarRating, BarRating } from "../templates";
import { ContactLines, ExperienceList, PhotoBlock, Section, useLayoutRtl, labels, pickLanguages, skillRating, skillLevel, initials } from "../template-helpers";
import { BriefcaseBusiness, Globe, GraduationCap, Mail, MapPin, Phone, UserRound } from "lucide-react";
import type { ResumeData } from "@/lib/types";
import { optimizeResumeForOnePage } from "@/lib/resume-utils";

export function RefSanchezTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = useLayoutRtl(c);
  const l = labels(c, rtl);
  const design = useContext(DesignContext);
  const showSkillBars = design?.showSkillBars !== false;
  const photoShape = design?.photoShape || "circle";
  const photoBlockShape = photoShape === "square" ? "rounded" : photoShape;

  const TimelineSection = ({
    title,
    icon,
    children,
  }: {
    title: ReactNode;
    icon: ReactNode;
    children: ReactNode;
  }) => (
    <section className="relative pl-16 rtl:pl-0 rtl:pr-16">
      <span className="absolute left-[17px] top-0 grid h-[140px] w-[1px] bg-[#99a1ab] rtl:left-auto rtl:right-[17px]" />
      <span className="absolute left-0 top-0 grid h-9 w-9 place-items-center rounded-full bg-[#303b4e] text-white rtl:left-auto rtl:right-0">
        {icon}
      </span>
      <h2 className="mb-3 border-b border-[#7d8792] pb-2 text-[19px] font-black uppercase tracking-[0.17em] rtl:tracking-normal text-[#303b4e]">{title}</h2>
      {children}
    </section>
  );

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="bg-white font-sans text-[#263241]" style={{ minHeight: "1122px", width: "100%" }}>
      <header className="relative h-[185px] bg-[#303b4e] text-white">
        <div className="absolute left-[28px] top-[78px] z-10 rtl:left-auto rtl:right-[28px]">
          <PhotoBlock data={c} shape={photoBlockShape} />
        </div>
        <div className="pl-[315px] pt-[62px] rtl:pl-0 rtl:pr-[315px]">
          <h1 className="text-[38px] font-black uppercase leading-none text-white">{c.name}</h1>
          <p className="mt-4 text-[18px] font-bold uppercase text-white">{c.title}</p>
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
          {showSkillBars && (c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
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
          <TimelineSection title={l.profile} icon={<UserRound size={16} strokeWidth={2.5} aria-hidden />}>
            <p className="text-[12px] leading-5">{c.summary}</p>
          </TimelineSection>
          {c.experience.length > 0 && (
            <TimelineSection title={l.experience} icon={<BriefcaseBusiness size={16} strokeWidth={2.5} aria-hidden />}>
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
            <TimelineSection title={l.education} icon={<GraduationCap size={16} strokeWidth={2.5} aria-hidden />}>
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

