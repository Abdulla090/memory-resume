import { useContext } from "react";
import type { ReactNode } from "react";
import { DesignContext } from "../DesignContext";
import { Editable } from "../Editable";
import { StarRating, BarRating } from "../templates";
import { ContactLines, ExperienceList, PhotoBlock, Section, isRTL, labels, pickLanguages, skillRating, skillLevel, initials } from "../template-helpers";
import { BriefcaseBusiness, Globe, GraduationCap, Mail, MapPin, Phone, UserRound } from "lucide-react";
import type { ResumeData } from "@/lib/types";
import { optimizeResumeForOnePage } from "@/lib/resume-utils";

export function RefSilvaTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const l = labels(c, rtl);
  const design = useContext(DesignContext);
  const showSkillBars = design?.showSkillBars !== false;
  const photoShape = design?.photoShape || "circle";
  const photoBlockShape = photoShape === "square" ? "rounded" : photoShape;

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="bg-white font-sans text-[#1f1b18]" style={{ minHeight: "1122px", width: "100%" }}>
      <header className="flex h-[190px] items-center gap-11 bg-[#342820] px-12 text-white rtl:flex-row-reverse">
        <PhotoBlock data={c} shape={photoBlockShape} />
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
          {showSkillBars && (c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
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
            <h2 className="mb-5 text-[23px] font-normal">{rtl ? "┘╛┘ê╪«╪¬█ò" : "Summary"}</h2>
            <ul className="list-disc space-y-1.5 pl-5 text-[12px] leading-5 rtl:pl-0 rtl:pr-5">
              {(c.summary.match(/[^.!?]+[.!?]*/g) ?? [c.summary]).slice(0, 4).map((line, index) => <li key={index}>{line.trim()}</li>)}
            </ul>
          </section>
          {c.experience.length > 0 && (
            <section className="mt-9">
              <h2 className="mb-5 text-[23px] font-normal">{rtl ? "╪ª█ò╪▓┘à┘ê┘ê┘å█ò┌⌐╪º┘å" : "Experiences"}</h2>
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
              <h2 className="mb-5 text-[23px] font-normal">{rtl ? "╪«█ò┌╡╪º╪¬ ┘ê ┘╛╪▒█å┌ÿ█ò┌⌐╪º┘å" : "Awards"}</h2>
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

