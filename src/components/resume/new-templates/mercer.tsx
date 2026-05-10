import { useContext } from "react";
import type { ReactNode } from "react";
import { DesignContext } from "../DesignContext";
import { Editable } from "../Editable";
import { StarRating, BarRating } from "../templates";
import { ContactLines, ExperienceList, PhotoBlock, Section, isRTL, labels, pickLanguages, skillRating, skillLevel, initials } from "../template-helpers";
import { BriefcaseBusiness, Globe, GraduationCap, Mail, MapPin, Phone, UserRound } from "lucide-react";
import type { ResumeData } from "@/lib/types";
import { optimizeResumeForOnePage } from "@/lib/resume-utils";

export function MercerTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const l = labels(c, rtl);
  const design = useContext(DesignContext);
  const showSkillBars = design?.showSkillBars !== false;
  const photoShape = design?.photoShape || "circle";
  const photoBlockShape = photoShape === "square" ? "rounded" : photoShape;

  const SectionHeader = ({ title }: { title: ReactNode }) => (
    <div className="bg-[#305178] text-white px-6 py-2 rounded-full inline-block mb-4 text-lg font-black min-w-[200px]">
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
              <h2 className="text-xl font-bold border-b border-white pb-2 mb-6 tracking-wide">{l.education}</h2>
              <div className="space-y-6">
                {c.education.map((edu, i) => (
                  <div key={i}>
                    <div className="font-bold text-[14px] leading-tight">{edu.institution}</div>
                    <div className="text-[12px] font-bold mt-1">{edu.year}</div>
                    <div className="text-[12px] mt-1 leading-relaxed opacity-90">{edu.degree}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {showSkillBars && (c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
            <section>
              <h2 className="text-xl font-bold border-b border-white pb-2 mb-6 tracking-wide">{l.skills}</h2>
              <div className="space-y-4">
                {c.skillItems && c.skillItems.length > 0 ? (
                  c.skillItems.slice(0, 8).map((s, i) => (
                    <div key={i} className="flex justify-between items-center gap-4">
                      <div className="text-[10px] font-black uppercase w-24 truncate">
                        {s.name}
                      </div>
                      <div className="flex-1 h-3 bg-white/20">
                        <div 
                          className="h-full bg-slate-200" 
                          style={{ width: `${s.level * 20}%` }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  c.skills.slice(0, 8).map((skill, i) => (
                    <div key={i} className="flex justify-between items-center gap-4">
                      <div className="text-[10px] font-black uppercase w-24 truncate">
                        {skill}
                      </div>
                      <div className="flex-1 h-3 bg-white/20">
                        <div 
                          className="h-full bg-slate-200" 
                          style={{ width: skillLevel(c, skill, i) }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          )}

          {/* Contact */}
          <section>
            <h2 className="text-xl font-bold border-b border-white pb-2 mb-6 tracking-wide">{l.contact}</h2>
            <div className="space-y-4 text-[12px] font-bold">
              {c.phone && (
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full bg-white text-[#305178] flex items-center justify-center shrink-0">
                    <Phone size={10} fill="currentColor" />
                  </div>
                  <span>{c.phone}</span>
                </div>
              )}
              {c.email && (
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full bg-white text-[#305178] flex items-center justify-center shrink-0">
                    <Mail size={10} fill="currentColor" />
                  </div>
                  <span className="truncate">{c.email}</span>
                </div>
              )}
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 rounded-full bg-white text-[#305178] flex items-center justify-center shrink-0">
                  <Globe size={10} />
                </div>
                <span>www.reallygreatsite.com</span>
              </div>
              {c.location && (
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full bg-white text-[#305178] flex items-center justify-center shrink-0">
                    <MapPin size={10} fill="currentColor" />
                  </div>
                  <span>{c.location}</span>
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
              <h1 className="text-6xl font-black text-[#305178] leading-[0.85] tracking-tighter rtl:tracking-normal uppercase w-fit">
                {c.name.split(/\s+/).map((word, idx) => (
                  <div key={idx}>{word}</div>
                ))}
              </h1>
              <p className="text-[20px] font-black text-[var(--color-heading)] mt-4 tracking-widest uppercase">{c.title}</p>
           </div>

           <div className="mt-4">
             {/* About Me */}
             <section className="mb-10">
                <SectionHeader title={rtl ? "╪»█ò╪▒╪¿╪º╪▒█ò█î ┘à┘å" : "About Me"} />
                <p className="text-[13px] leading-relaxed text-[var(--color-heading)] font-medium px-1">{c.summary}</p>
             </section>

             {/* Experience */}
             {c.experience.length > 0 && (
               <section className="mb-10">
                  <SectionHeader title={rtl ? "╪ª█ò╪▓┘à┘ê┘ê┘å█î ┌⌐╪º╪▒" : "Experience Work"} />
                  <div className="space-y-6 px-1">
                    {c.experience.map((exp, i) => (
                      <div key={i} className="relative">
                         <div className="flex items-center gap-3 mb-1">
                            <div className="w-4 h-4 rounded-full bg-[#305178]" />
                            <h3 className="font-light tracking-wide uppercase text-[16px] text-slate-700">{exp.title}</h3>
                         </div>
                         <div className="font-black text-[13px] text-[var(--color-heading)] ml-7 uppercase tracking-wider mb-2">
                           {exp.duration} - {exp.company}
                         </div>
                         <p className="text-[12px] text-slate-700 ml-7 leading-relaxed font-medium">
                           {exp.description}
                           {exp.achievements.length > 0 && " " + exp.achievements.join(". ")}
                         </p>
                      </div>
                    ))}
                  </div>
               </section>
             )}

             {/* Reference */}
             <section>
                <SectionHeader title={rtl ? "╪│█ò╪▒┌å╪º┘ê█ò" : "Reference"} />
                <div className="grid grid-cols-2 gap-10 px-1 mt-2">
                   <div>
                      <div className="font-bold text-[13px] text-[var(--color-heading)]">Juliana Silva</div>
                      <div className="text-[12px] text-[var(--color-heading)] font-bold mt-0.5">Rimberio / CTO</div>
                      <div className="text-[12px] text-[var(--color-text)] mt-0.5 font-bold">+123-456-7890</div>
                   </div>
                   <div>
                      <div className="font-bold text-[13px] text-[var(--color-heading)]">Donna Stroupe</div>
                      <div className="text-[12px] text-[var(--color-heading)] font-bold mt-0.5">Borcelle / CEO</div>
                      <div className="text-[12px] text-[var(--color-text)] mt-0.5 font-bold">+123-456-7890</div>
                   </div>
                </div>
             </section>
           </div>
        </main>
      </div>
    </div>
  );
}

