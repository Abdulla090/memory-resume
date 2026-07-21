import { useContext } from "react";
import type { ReactNode } from "react";
import { DesignContext } from "../DesignContext";
import { Editable } from "../Editable";
import { StarRating, BarRating } from "../templates";
import { ContactLines, ExperienceList, PhotoBlock, Section, useLayoutRtl, labels, pickLanguages, skillRating, skillLevel, initials } from "../template-helpers";
import { BriefcaseBusiness, Globe, GraduationCap, Mail, MapPin, Phone, UserRound } from "lucide-react";
import type { ResumeData } from "@/lib/types";
import { optimizeResumeForOnePage } from "@/lib/resume-utils";

export function MercerTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = useLayoutRtl(c);
  const l = labels(c, rtl);
  const design = useContext(DesignContext);
  const showSkillBars = design?.showSkillBars !== false;
  const photoShape = design?.photoShape || "circle";
  const photoBlockShape = photoShape === "square" ? "rounded" : photoShape;

  const SectionHeader = ({ title }: { title: ReactNode }) => (
    <div className="bg-[#305178] text-white px-6 py-2 rounded-full inline-block mb-4 text-lg font-black rtl:font-normal min-w-[200px]">
      {title}
    </div>
  );

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="bg-white font-sans text-[var(--color-heading)]" style={{ minHeight: "1122px", width: "100%", position: "relative", overflow: "hidden" }}>
      <div className="grid grid-cols-[320px_1fr] min-h-[1122px] ">
        {/* Sidebar */}
        <aside className="bg-[#305178] p-10 pt-64 text-white flex flex-col gap-10 relative z-0">
          {/* Education */}
          {c.education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold rtl:font-normal border-b border-white pb-2 mb-6 tracking-wide rtl:tracking-normal">{l.education}</h2>
              <div className="space-y-6">
                {c.education.map((edu, i) => (
                  <div key={i}>
                    <Editable path={`education.${i}.institution`} value={edu.institution} as="div" className="font-bold rtl:font-normal text-[14px] leading-tight" />
                    <Editable path={`education.${i}.year`} value={edu.year} as="div" className="text-[12px] font-bold rtl:font-normal mt-1" />
                    <Editable path={`education.${i}.degree`} value={edu.degree} as="div" className="text-[12px] mt-1 leading-relaxed opacity-90" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {showSkillBars && (c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
            <section>
              <h2 className="text-xl font-bold rtl:font-normal border-b border-white pb-2 mb-6 tracking-wide rtl:tracking-normal">{l.skills}</h2>
              <div className="space-y-4">
                {c.skillItems && c.skillItems.length > 0 ? (
                  c.skillItems.slice(0, 8).map((s, index) => (
                    <div key={s.name} className="flex justify-between items-center gap-3">
                      <Editable path={`skillItems.${index}.name`} value={s.name} as="div" className="text-[11px] font-bold rtl:font-normal uppercase truncate" />
                      <div className="flex shrink-0 gap-1.5 rtl:flex-row-reverse">
                        {Array.from({ length: 5 }).map((_, dot) => (
                          <span key={dot} className={`h-2 w-2 rounded-full bg-slate-200 ${dot < s.level ? "" : "opacity-30"}`} />
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  c.skills.slice(0, 8).map((skill, index) => {
                    const rating = skillRating(c, skill, index);
                    return (
                      <div key={skill} className="flex justify-between items-center gap-3">
                        <Editable path={`skills.${index}`} value={skill} as="div" className="text-[11px] font-bold rtl:font-normal uppercase truncate" />
                        <div className="flex shrink-0 gap-1.5 rtl:flex-row-reverse">
                          {Array.from({ length: 5 }).map((_, dot) => (
                            <span key={dot} className={`h-2 w-2 rounded-full bg-slate-200 ${dot < rating ? "" : "opacity-30"}`} />
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>
          )}

          {/* Contact */}
          <section>
            <h2 className="text-xl font-bold rtl:font-normal border-b border-white pb-2 mb-6 tracking-wide rtl:tracking-normal">{l.contact}</h2>
            <div className="space-y-4 text-[12px] font-bold rtl:font-normal">
              {c.phone && (
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full bg-white text-[#305178] flex items-center justify-center shrink-0">
                    <Phone size={10} fill="currentColor" />
                  </div>
                  <Editable path="phone" value={c.phone} as="span" />
                </div>
              )}
              {c.email && (
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full bg-white text-[#305178] flex items-center justify-center shrink-0">
                    <Mail size={10} fill="currentColor" />
                  </div>
                  <Editable path="email" value={c.email} as="span" className="truncate" />
                </div>
              )}
              {c.location && (
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full bg-white text-[#305178] flex items-center justify-center shrink-0">
                    <MapPin size={10} fill="currentColor" />
                  </div>
                  <Editable path="location" value={c.location} as="span" />
                </div>
              )}
            </div>
          </section>
        </aside>

        {/* Main Content */}
        <main className="p-10 pt-16 flex flex-col gap-10 relative z-10">
           {/* Profile Photo */}
            <div className="absolute -left-[180px] top-10 rtl:left-auto rtl:-right-[180px]">
              <PhotoBlock data={c} shape={photoBlockShape} />
            </div>

           {/* Header Area */}
           <div className="ml-20 pt-4 rtl:ml-0 rtl:mr-20">
              <Editable path="name" value={c.name} as="h1" className="text-6xl font-black rtl:font-normal text-[#305178] leading-[0.85] tracking-tighter rtl:tracking-normal uppercase w-fit" />
              <Editable path="title" value={c.title} as="p" className="text-[20px] font-black rtl:font-normal text-[var(--color-heading)] mt-4 tracking-widest rtl:tracking-normal uppercase" />
           </div>

           <div className="mt-4">
             {/* About Me */}
             <section className="mb-10">
                <SectionHeader title={l.profile} />
                <Editable path="summary" value={c.summary} as="p" className="text-[13px] leading-relaxed text-[var(--color-heading)] font-medium px-1" />
             </section>

             {/* Experience */}
             {c.experience.length > 0 && (
               <section className="mb-10">
                  <SectionHeader title={l.experience} />
                  <div className="space-y-6 px-1">
                    {c.experience.map((exp, i) => (
                      <div key={i} className="relative">
                         <div className="flex items-center gap-3 mb-1">
                            <div className="w-4 h-4 rounded-full bg-[#305178]" />
                            <Editable path={`experience.${i}.title`} value={exp.title} as="h3" className="font-light tracking-wide uppercase text-[16px] text-slate-700" />
                         </div>
                         <div className="font-black rtl:font-normal text-[13px] text-[var(--color-heading)] ml-7 rtl:ml-0 rtl:mr-7 uppercase tracking-wider rtl:tracking-normal mb-2 flex gap-1">
                           <Editable path={`experience.${i}.duration`} value={exp.duration} as="span" />
                           <span>-</span>
                           <Editable path={`experience.${i}.company`} value={exp.company} as="span" />
                         </div>
                         {exp.description && (
                           <Editable
                             path={`experience.${i}.description`}
                             value={exp.description}
                             as="p"
                             className="text-[12px] text-slate-700 ml-7 rtl:ml-0 rtl:mr-7 leading-relaxed font-medium"
                           />
                         )}
                         {exp.achievements.length > 0 && (
                           <ul className="ml-7 rtl:ml-0 rtl:mr-7 mt-1 list-disc list-inside space-y-1">
                             {exp.achievements.map((ach, aIdx) => (
                               <Editable
                                 key={aIdx}
                                 path={`experience.${i}.achievements.${aIdx}`}
                                 value={ach}
                                 as="li"
                                 className="text-[12px] text-slate-700 leading-relaxed font-medium"
                               />
                             ))}
                           </ul>
                         )}
                      </div>
                    ))}
                  </div>
               </section>
             )}
           </div>
        </main>
      </div>
    </div>
  );
}

