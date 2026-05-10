import { useContext } from "react";
import type { ReactNode } from "react";
import { DesignContext } from "../DesignContext";
import { Editable } from "../Editable";
import { StarRating, BarRating } from "../templates";
import { ContactLines, ExperienceList, PhotoBlock, Section, isRTL, labels, pickLanguages, skillRating, skillLevel, initials } from "../template-helpers";
import { BriefcaseBusiness, Globe, GraduationCap, Mail, MapPin, Phone, UserRound } from "lucide-react";
import type { ResumeData } from "@/lib/types";
import { optimizeResumeForOnePage } from "@/lib/resume-utils";

export function RefTorresTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const l = labels(c, rtl);
  const design = useContext(DesignContext);
  const colLayout = design?.columnLayout || "sidebar-right";
  const isLeftSidebar = colLayout === "sidebar-left";
  const photoShape = design?.photoShape || "circle";
  const photoBlockShape = photoShape === "square" ? "rounded" : photoShape;
  const sideItems = [c.location, c.email, c.phone].filter(Boolean);

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="relative overflow-hidden bg-white font-sans text-[#1d3f59]" style={{ minHeight: "1122px", width: "100%" }}>
      <div className="h-[168px] bg-[#315b74]">
        <div className="h-full w-full opacity-20" style={{ backgroundImage: "linear-gradient(135deg, transparent 0 46%, rgba(255,255,255,.35) 46% 47%, transparent 47% 100%)", backgroundSize: "28px 28px" }} />
      </div>
      <div className={`grid ${colLayout === "single" ? "grid-cols-1" : colLayout === "two-col" ? "grid-cols-2" : isLeftSidebar ? "grid-cols-[308px_1fr]" : "grid-cols-[1fr_308px]"}`}>
        <aside className={`relative min-h-[954px] bg-[#f3f3f3] px-12 pb-10 pt-32 ${!isLeftSidebar && colLayout !== "single" ? "order-last" : ""}`}>
          <div className="absolute -top-[105px] left-1/2 h-[220px] w-[220px] -translate-x-1/2 overflow-hidden rounded-full border-[5px] border-[#d8e2e9] bg-slate-200">
            <PhotoBlock data={c} shape={photoBlockShape} />
          </div>
          <Editable path="name" value={c.name} as="h1" className="mt-3 text-[42px] font-light uppercase leading-[1.02] tracking-[0.08em] rtl:tracking-normal text-[#1e405a]" />
          <Editable path="title" value={c.title} as="p" className="mt-3 border-b border-[#b8c5ce] pb-4 text-[15px] font-semibold uppercase tracking-[0.09em] rtl:tracking-normal text-neutral-800" />

          <section className="mt-9">
            <h2 className="mb-5 text-[18px] font-black uppercase tracking-[0.2em] rtl:tracking-normal text-[#1d3f59]">{l.contact}</h2>
            <div className="space-y-3 text-[12px] font-semibold leading-5 text-neutral-700">
              {c.location && <Editable path="location" value={c.location} as="div" />}
              {c.email && <Editable path="email" value={c.email} as="div" />}
              {c.phone && <Editable path="phone" value={c.phone} as="div" />}
            </div>
          </section>

          {(design?.showSkillBars !== false && (c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0)) && (
            <section className="mt-10">
              <h2 className="mb-5 text-[18px] font-black uppercase tracking-[0.2em] rtl:tracking-normal text-[#1d3f59]">{l.skills}</h2>
              {c.skillItems && c.skillItems.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {c.skillItems.map((s, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[13px] font-medium text-neutral-800">{s.name}</span>
                      <BarRating level={s.level} />
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="list-disc space-y-3 pl-5 text-[13px] font-medium text-neutral-800 rtl:pl-0 rtl:pr-5">
                  {c.skills.slice(0, 7).map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              )}
            </section>
          )}

          {c.certifications.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-5 text-[18px] font-black uppercase tracking-[0.2em] rtl:tracking-normal text-[#1d3f59]">{l.certifications}</h2>
              <ul className="list-disc space-y-3 pl-5 text-[13px] font-medium text-neutral-800 rtl:pl-0 rtl:pr-5">
                {c.certifications.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          )}
        </aside>

        <main className="px-11 pb-10 pt-7 text-neutral-800 ">
          <Section title={l.profile} accent="border-[#b8c5ce] text-[#1d3f59]">
            <Editable path="summary" value={c.summary} as="p" className="text-[12px] leading-5" />
          </Section>
          {c.experience.length > 0 && (
            <section className="mt-7">
              <h2 className="mb-4 border-b border-[#b8c5ce] pb-2 text-[18px] font-black uppercase tracking-[0.18em] rtl:tracking-normal text-[#1d3f59]">{l.experience}</h2>
              <div className="space-y-5">
                {c.experience.slice(0, 4).map((item, index) => (
                  <article key={`${item.company}-${index}`}>
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <Editable path={`experience.${index}.title`} value={item.title} as="h3" className="text-[14px] font-black leading-tight" />
                        <Editable path={`experience.${index}.company`} value={item.company} as="p" className="text-[12px] font-bold text-neutral-600" />
                      </div>
                      <Editable path={`experience.${index}.duration`} value={item.duration} as="p" className="shrink-0 text-[12px] text-neutral-600" />
                    </div>
                    <Editable path={`experience.${index}.description`} value={item.description || item.achievements[0] || ""} as="p" className="mt-1 text-[11px] leading-5 text-neutral-700" />
                  </article>
                ))}
              </div>
            </section>
          )}
          {c.education.length > 0 && (
            <section className="mt-7">
              <h2 className="mb-4 border-b border-[#b8c5ce] pb-2 text-[18px] font-black uppercase tracking-[0.18em] rtl:tracking-normal text-[#1d3f59]">{l.education}</h2>
              <div className="space-y-3">
                {c.education.map((item, index) => (
                  <div key={`${item.institution}-${index}`} className="flex justify-between gap-5 text-[12px]">
                    <div><Editable path={`education.${index}.institution`} value={item.institution} as="div" className="font-black" /><Editable path={`education.${index}.degree`} value={item.degree} as="div" /></div>
                    <Editable path={`education.${index}.year`} value={item.year} as="div" className="text-neutral-600" />
                  </div>
                ))}
              </div>
            </section>
          )}
          {c.projects.length > 0 && (
            <section className="mt-7">
              <h2 className="mb-4 border-b border-[#b8c5ce] pb-2 text-[18px] font-black uppercase tracking-[0.18em] rtl:tracking-normal text-[#1d3f59]">{l.projects}</h2>
              <div className="grid grid-cols-2 gap-6">
                {c.projects.map((project) => (
                  <div key={project.name}>
                    <h3 className="text-[13px] font-black">{project.name}</h3>
                    <p className="mt-1 text-[11px] leading-5">{project.description}</p>
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

