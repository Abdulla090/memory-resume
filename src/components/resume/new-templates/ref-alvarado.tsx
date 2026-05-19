import { useContext } from "react";
import type { ReactNode } from "react";
import { DesignContext } from "../DesignContext";
import { Editable } from "../Editable";
import { ContactLines, ExperienceList, PhotoBlock, Section, useLayoutRtl, labels, pickLanguages, initials } from "../template-helpers";
import { BriefcaseBusiness, Globe, GraduationCap, Mail, MapPin, Phone, UserRound } from "lucide-react";
import type { ResumeData } from "@/lib/types";
import { optimizeResumeForOnePage } from "@/lib/resume-utils";

export function RefAlvaradoTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = useLayoutRtl(c);
  const design = useContext(DesignContext);
  const colLayout = design?.columnLayout || "sidebar-left";
  const showSkillBars = design?.showSkillBars !== false;
  const photoShape = design?.photoShape || "circle";
  const photoBlockShape = photoShape === "square" ? "rounded" : photoShape;
  const references = c.projects.length > 0
    ? c.projects.slice(0, 2).map((project) => ({
        name: project.name,
        role: project.tech[0] || c.title,
        meta: project.impact || project.description,
      }))
    : c.education.slice(0, 2).map((item) => ({
        name: item.institution,
        role: item.degree,
        meta: item.year,
      }));
  const languages = pickLanguages(c);

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="relative overflow-hidden bg-[#f1f1ef] font-sans text-[#222222]" style={{ height: "1122px", minHeight: "1122px", width: "794px", maxWidth: "100%" }}>
      <div className="absolute left-[145px] top-0 h-full w-px bg-[#c8c8c4]" />
      <div className="absolute left-[144px] top-0 h-[82px] w-[152px] bg-[#f4f4f1]" />

      <header className="absolute left-0 top-0 h-[162px] w-full bg-white">
        <div className="absolute left-[26px] top-[28px]">
          <PhotoBlock data={c} shape={photoBlockShape} />
        </div>

        <div className="absolute left-[186px] top-[28px] h-[102px] rounded-none bg-[#27272e] px-[34px] pt-[23px] text-white" style={{ width: "566px" }}>
          <h1 className="text-[31px] font-black leading-none tracking-[0.04em] uppercase rtl:tracking-normal">{c.name}</h1>
          <p className="mt-2 text-[13px] font-semibold tracking-[0.35em] uppercase text-white/85 rtl:tracking-normal">{c.title}</p>
        </div>
      </header>

      <main className="absolute left-0 top-[160px] h-[962px] w-full">
        <aside className={`absolute top-0 h-full w-[145px] px-0 pb-[18px] pt-[44px] text-[#262626] ${colLayout === "sidebar-right" ? "right-[16px] left-auto" : "left-[16px]"}`}>
          <section>
            <h2 className="mb-4 text-[12px] font-black uppercase tracking-[0.34em] text-[#262626]">About me</h2>
            <Editable path="summary" value={c.summary} as="p" className="text-[8.6px] leading-[1.62] text-[#4d4d4d]" />
          </section>

          {c.education.length > 0 && (
            <section className="mt-[36px]">
              <h2 className="mb-4 text-[12px] font-black uppercase tracking-[0.34em] text-[#262626]">Education</h2>
              <div className="space-y-4 text-[8.4px] leading-[1.45] text-[#4d4d4d]">
                {c.education.slice(0, 2).map((item, index) => (
                  <div key={`${item.institution}-${index}`}>
                    <Editable path={`education.${index}.degree`} value={item.degree} as="div" className="font-semibold text-[#222222]" />
                    <Editable path={`education.${index}.institution`} value={item.institution} as="div" />
                    <Editable path={`education.${index}.year`} value={item.year} as="div" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {showSkillBars && (c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
            <section className="mt-[34px]">
              <h2 className="mb-4 text-[12px] font-black uppercase tracking-[0.34em] text-[#262626]">Skills</h2>
              <div className="space-y-2.5">
                {c.skillItems && c.skillItems.length > 0 ? (
                  c.skillItems.slice(0, 6).map((skill, index) => (
                    <div key={skill.name}>
                      <Editable path={`skillItems.${index}.name`} value={skill.name} as="div" className="text-[8.4px] font-semibold text-[#4d4d4d]" />
                      <div className="mt-1 h-[2px] w-[100px] bg-[#d7d7d2]"><div className="h-full bg-[#27272e]" style={{ width: `${skill.level * 20}%` }} /></div>
                    </div>
                  ))
                ) : (
                  <div className="space-y-2 text-[8.4px] font-medium leading-[1.35] text-[#4d4d4d]">
                    {c.skills.slice(0, 6).map((skill, skillIndex) => <Editable key={skill} path={`skills.${skillIndex}`} value={skill} as="p" className="m-0" />)}
                  </div>
                )}
              </div>
            </section>
          )}

          <section className="mt-[34px]">
            <h2 className="mb-4 text-[12px] font-black uppercase tracking-[0.34em] text-[#262626]">Language</h2>
            <div className="space-y-2 text-[8.4px] font-medium leading-[1.35] text-[#4d4d4d]">
              {languages.map((item, index) => <Editable key={item} path={`languages.${index}`} value={item} as="p" className="m-0" />)}
            </div>
          </section>
        </aside>

        <section className={`absolute top-0 w-[586px] px-[16px] pt-[30px] ${colLayout === "sidebar-right" ? "left-[16px]" : "left-[176px]"}`}>
          <section>
            <h2 className="border-b border-[#9da09d] pb-2 text-[17px] font-black uppercase tracking-[0.28em] text-[#27272e]">Experience</h2>
            <div className="mt-4 space-y-[18px]">
              {c.experience.slice(0, 4).map((item, index) => (
                <article key={`${item.company}-${index}`} className="text-[#222222]">
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <Editable path={`experience.${index}.title`} value={item.title} as="h3" className="text-[13px] font-black leading-tight" />
                      <Editable path={`experience.${index}.company`} value={item.company} as="p" className="text-[8.9px] font-semibold uppercase tracking-[0.14em] text-[#4d4d4d]" />
                    </div>
                    <Editable path={`experience.${index}.duration`} value={item.duration} as="p" className="shrink-0 text-[8.4px] font-semibold italic text-[#666666]" />
                  </div>
                  <Editable path={`experience.${index}.description`} value={item.description || item.achievements[0] || ""} as="p" className="mt-2 text-[8.6px] leading-[1.45] text-[#4d4d4d]" />
                  {item.achievements.length > 0 && (
                    <p className="mt-2 text-[8.5px] leading-[1.45] text-[#4d4d4d]">{item.achievements.slice(0, 2).join(" ")}</p>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section className="mt-[24px]">
            <h2 className="border-b border-[#9da09d] pb-2 text-[17px] font-black uppercase tracking-[0.28em] text-[#27272e]">References</h2>
            <div className="mt-4 grid grid-cols-2 gap-x-10 gap-y-6 text-[#222222]">
              {references.map((item, index) => (
                <div key={`${item.name}-${index}`}>
                  <Editable path={`education.${index}.institution`} value={item.name} as="p" className="text-[10px] font-semibold" />
                  <Editable path={`education.${index}.degree`} value={item.role} as="p" className="mt-2 text-[8.4px] font-medium text-[#4d4d4d]" />
                  <p className="mt-2 text-[8.4px] font-medium text-[#4d4d4d]">{c.phone || "+123-456-7890"}</p>
                </div>
              ))}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
