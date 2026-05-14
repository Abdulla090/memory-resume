import { use } from "react";
import type { ReactNode } from "react";
import { DesignContext } from "../DesignContext";
import { Editable } from "../Editable";
import { isRTL, labels, pickLanguages, skillRating } from "../template-helpers";
import type { ResumeData } from "@/lib/types";
import { optimizeResumeForOnePage } from "@/lib/resume-utils";
import { Phone, Mail, MapPin, Globe } from "lucide-react";

function SectionTitle({ title, className = "" }: { title: ReactNode; className?: string }) {
  return (
    <div className={`mb-4 flex items-center gap-4 ${className}`}>
      <h2 className="shrink-0 text-[14px] font-black uppercase tracking-[0.2em] rtl:tracking-normal text-[#2b2b2f]">
        {title}
      </h2>
      <div className="h-[1px] w-full bg-[#2b2b2f] opacity-30" />
    </div>
  );
}

export function NewAlvaradoTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const l = labels(c, rtl);
  const design = use(DesignContext);
  const showSkillBars = design?.showSkillBars !== false;
  
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
    <div dir={rtl ? "rtl" : "ltr"} className="relative overflow-hidden bg-white font-sans text-[#2b2b2f]" style={{ height: "1122px", minHeight: "1122px", width: "794px", maxWidth: "100%" }}>
      
      {/* Header Area */}
      <header className="relative flex h-[190px] w-full">
        {/* Top Left Gray Box */}
        <div className="h-full w-[280px] bg-[#e3e3e3]" />
        
        {/* Top Right Dark Box */}
        <div className="mt-[60px] h-[100px] flex-1 bg-[#2b2b2f] pl-[40px] pt-[20px] rtl:pl-0 rtl:pr-[40px] text-white flex flex-col justify-center">
          <Editable path="name" value={c.name} as="h1" className="text-[32px] font-black uppercase tracking-[0.1em] rtl:tracking-normal" />
          <Editable path="title" value={c.title} as="p" className="mt-1 text-[16px] font-bold tracking-[0.15em] uppercase text-white/90 rtl:tracking-normal" />
        </div>
        
        {/* Photo Overlay */}
        <div className="absolute left-[40px] top-[30px] rtl:left-auto rtl:right-[40px] rounded-full border-[8px] border-white bg-white shadow-sm overflow-hidden" style={{ width: "160px", height: "160px" }}>
          {c.photoUrl ? (
            <img src={c.photoUrl} alt={c.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#e3e3e3] text-4xl font-black text-[#2b2b2f]">
              {c.name.charAt(0)}
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex h-[932px] w-full">
        {/* Left Sidebar */}
        <aside className="h-full w-[280px] bg-[#e3e3e3] px-[30px] pt-[40px]">
          <section>
            <SectionTitle title={l.profile} />
            <Editable path="summary" value={c.summary} as="p" className="text-[10.5px] leading-[1.6] font-medium text-[#4a4a4e] text-justify" />
          </section>

          {c.education.length > 0 && (
            <section className="mt-[30px]">
              <SectionTitle title={l.education} />
              <div className="space-y-4 text-[10.5px] leading-[1.4] text-[#4a4a4e]">
                {c.education.slice(0, 2).map((item, index) => (
                  <div key={`${item.institution}-${index}`}>
                    <Editable path={`education.${index}.degree`} value={item.degree} as="div" className="font-bold text-[#2b2b2f]" />
                    <Editable path={`education.${index}.institution`} value={item.institution} as="div" className="mt-0.5" />
                    <Editable path={`education.${index}.year`} value={item.year} as="div" className="mt-0.5" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {showSkillBars && (c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
            <section className="mt-[30px]">
              <SectionTitle title={l.skills} />
              <div className="space-y-3">
                {c.skillItems && c.skillItems.length > 0 ? (
                  c.skillItems.slice(0, 6).map((skill, index) => (
                    <div key={skill.name} className="flex items-center justify-between gap-3">
                      <Editable path={`skillItems.${index}.name`} value={skill.name} as="div" className="text-[10.5px] font-medium text-[#4a4a4e] w-[100px] truncate" />
                      <div className="h-[4px] flex-1 bg-[#cfcfcf]">
                        <div className="h-full bg-[#2b2b2f]" style={{ width: `${(skill.level / 5) * 100}%` }} />
                      </div>
                    </div>
                  ))
                ) : (
                  c.skills.slice(0, 6).map((skill, index) => {
                    const rating = skillRating(c, skill, index);
                    return (
                      <div key={skill} className="flex items-center justify-between gap-3">
                        <Editable path={`skills.${index}`} value={skill} as="p" className="text-[10.5px] font-medium text-[#4a4a4e] w-[100px] truncate" />
                        <div className="h-[4px] flex-1 bg-[#cfcfcf]">
                          <div className="h-full bg-[#2b2b2f]" style={{ width: `${(rating / 5) * 100}%` }} />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>
          )}

          <section className="mt-[30px]">
            <SectionTitle title={rtl ? "زمانەکان" : "Language"} />
            <ul className="list-disc pl-4 rtl:pl-0 rtl:pr-4 space-y-2 text-[10.5px] font-medium text-[#4a4a4e] marker:text-[#2b2b2f]">
              {languages.map((item, index) => (
                <li key={item}>
                  <Editable path={`languages.${index}`} value={item} as="span" />
                </li>
              ))}
            </ul>
          </section>
        </aside>

        {/* Right Main Content */}
        <main className="flex-1 px-[30px] pt-[25px]">
          {/* Contact Details */}
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 pb-[25px]">
            {c.phone && (
              <div className="flex items-center gap-2">
                <div className="grid h-6 w-6 shrink-0 place-items-center bg-[#2b2b2f] text-white">
                  <Phone className="h-3.5 w-3.5" strokeWidth={2.5} />
                </div>
                <Editable path="phone" value={c.phone} as="span" className="text-[9.5px] font-semibold text-[#4a4a4e]" />
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="grid h-6 w-6 shrink-0 place-items-center bg-[#2b2b2f] text-white">
                <Globe className="h-3.5 w-3.5" strokeWidth={2.5} />
              </div>
              <span className="text-[9.5px] font-semibold text-[#4a4a4e]">www.reallygreatsite.com</span>
            </div>
            {c.email && (
              <div className="flex items-center gap-2">
                <div className="grid h-6 w-6 shrink-0 place-items-center bg-[#2b2b2f] text-white">
                  <Mail className="h-3.5 w-3.5" strokeWidth={2.5} />
                </div>
                <Editable path="email" value={c.email} as="span" className="text-[9.5px] font-semibold text-[#4a4a4e]" />
              </div>
            )}
            {c.location && (
              <div className="flex items-start gap-2">
                <div className="grid h-6 w-6 shrink-0 place-items-center bg-[#2b2b2f] text-white">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={2.5} />
                </div>
                <Editable path="location" value={c.location} as="span" className="text-[9.5px] font-semibold leading-tight text-[#4a4a4e] mt-1" />
              </div>
            )}
          </div>

          {/* Experience */}
          <section className="mt-[15px]">
            <SectionTitle title={l.experience} className="mb-6" />
            <div className="relative border-l border-[#2b2b2f] pl-[25px] rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-[25px] ml-[5px] rtl:ml-0 rtl:mr-[5px] space-y-[22px]">
              {c.experience.slice(0, 4).map((item, index) => (
                <article key={`${item.company}-${index}`} className="relative">
                  {/* Timeline Node */}
                  <div className="absolute left-[-29px] top-[3px] h-[9px] w-[9px] rounded-full border-[2px] border-[#2b2b2f] bg-white rtl:left-auto rtl:right-[-29px]" />
                  
                  <div className="flex items-baseline justify-between gap-4">
                    <Editable path={`experience.${index}.title`} value={item.title} as="h3" className="text-[12.5px] font-bold leading-tight text-[#2b2b2f]" />
                    <Editable path={`experience.${index}.duration`} value={item.duration} as="span" className="shrink-0 text-[9px] font-bold italic text-[#4a4a4e]" />
                  </div>
                  <Editable path={`experience.${index}.company`} value={item.company} as="p" className="mt-1 text-[10px] font-medium text-[#4a4a4e]" />
                  <div className="mt-2 text-[10px] leading-[1.5] text-[#4a4a4e]">
                    <ul className="list-disc pl-3 rtl:pl-0 rtl:pr-3 marker:text-[#888]">
                      {item.description && (
                        <li><Editable path={`experience.${index}.description`} value={item.description} as="span" /></li>
                      )}
                      {item.achievements.slice(0, 2).map((ach, i) => (
                        <li key={`ach-${index}-${i}`}><Editable path={`experience.${index}.achievements.${i}`} value={ach} as="span" /></li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* References */}
          <section className="mt-[35px]">
            <SectionTitle title={rtl ? "سەرچاوەکان" : "References"} className="mb-5" />
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {references.map((item, index) => (
                <div key={`${item.name}-${index}`}>
                  <h3 className="text-[12px] font-bold text-[#2b2b2f]">{item.name}</h3>
                  <p className="mt-0.5 text-[10px] font-medium text-[#4a4a4e]">{item.role}</p>
                  <p className="mt-2 text-[8.5px] font-bold text-[#2b2b2f]">Phone: <span className="font-medium text-[#4a4a4e]">+123-456-7890</span></p>
                  <p className="mt-0.5 text-[8.5px] font-bold text-[#2b2b2f]">Email: <span className="font-medium text-[#4a4a4e]">hello@reallygreatsite.com</span></p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
