import { use } from "react";
import type { ReactNode } from "react";
import { DesignContext } from "../DesignContext";
import { Editable } from "../Editable";
import { StarRating, BarRating } from "../templates";
import { ContactLines, ExperienceList, PhotoBlock, Section, useLayoutRtl, labels, pickLanguages, skillRating, skillLevel, initials } from "../template-helpers";
import { BriefcaseBusiness, Globe, GraduationCap, Mail, MapPin, Phone, UserRound } from "lucide-react";
import type { ResumeData } from "@/lib/types";
import { optimizeResumeForOnePage } from "@/lib/resume-utils";

function SectionRibbon({ title, icon, className = "" }: { title: ReactNode; icon: ReactNode; className?: string }) {
  return (
    <div className={`relative -ml-6 h-[48px] w-[392px] bg-[#075a7c] text-white shadow-[0_4px_0_rgba(0,0,0,0.16)] rtl:-ml-0 rtl:-mr-6 ${className}`}>
      <div className="flex h-full items-center gap-3 px-8 text-[22px] font-black leading-none tracking-tight rtl:flex-row-reverse rtl:tracking-normal">
        <span className="grid h-7 w-7 place-items-center text-white">{icon}</span>
        <span>{title}</span>
      </div>
    </div>
  );
}

function SidebarTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 h-[43px] rounded-full border-[3px] border-white/55 text-center text-[21px] font-black leading-[38px] tracking-tight text-white">
      {children}
    </div>
  );
}

export function GallegoTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = useLayoutRtl(c);
  const design = use(DesignContext);
  const showSkillBars = design?.showSkillBars !== false;
  const photoShape = design?.photoShape || "circle";
  const photoBlockShape = photoShape === "square" ? "rounded" : photoShape;
  const contact = [c.phone, c.email, c.location].filter(Boolean);
  const referenceItems = c.projects.length > 0
    ? c.projects.slice(0, 2).map((project) => ({
        name: project.name,
        meta: project.impact || project.description,
      }))
    : c.education.slice(0, 2).map((item) => ({
        name: item.degree,
        meta: item.institution,
      }));
  const languageItems = (c.certifications.length > 0 ? c.certifications : c.skills).slice(0, 4);


  return (
    <div
      dir={rtl ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[#f7f7f7] font-sans text-[#1e4a5f]"
      style={{ height: "1122px", minHeight: "1122px", width: "794px", maxWidth: "100%" }}
    >
      <div className="absolute inset-0 bg-white" />
      <div className="absolute right-0 top-0 h-full w-[420px] bg-[linear-gradient(135deg,transparent_0_70%,#ececec_70%_100%)] rtl:left-0 rtl:right-auto" />
      <div className="absolute right-[18px] top-[12px] flex gap-4 rtl:left-[18px] rtl:right-auto">
        {Array.from({ length: 4 }).map((_, index) => (
          <span key={index} className="h-[14px] w-[14px] rounded-full border-[4px] border-[#073f57] bg-white" />
        ))}
      </div>

      <aside className="absolute left-0 top-0 z-10 h-full w-[325px] bg-[#073f57] px-[30px] pt-[66px] text-white rtl:left-auto rtl:right-0">
        <div className="mx-auto">
          <PhotoBlock data={c} shape={photoBlockShape} />
        </div>

        <section className="mt-[44px]">
          <SidebarTitle>{rtl ? "┘╛█ò█î┘ê█ò┘å╪»█î" : "Contact"}</SidebarTitle>
          <div className="space-y-[13px] text-[13px] font-bold leading-none text-white">
            {contact.map((item, index) => {
              const icons = [
                <Phone key="phone" size={18} fill="currentColor" strokeWidth={3} />,
                <Mail key="mail" size={18} fill="currentColor" strokeWidth={3} />,
                <MapPin key="pin" size={18} fill="currentColor" strokeWidth={3} />,
              ];
              return (
                <div key={item} className="flex min-w-0 items-center gap-3 rtl:flex-row-reverse">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white text-[#073f57]">{icons[index] ?? icons[0]}</span>
                  <span className="truncate">{item}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-[52px]">
          <SidebarTitle>{rtl ? "╪│█ò╪▒┌å╪º┘ê█ò┌⌐╪º┘å" : "References"}</SidebarTitle>
          <div className="space-y-3">
            {referenceItems.slice(0, 2).map((item, index) => (
              <div key={`${item.name}-${index}`} className="text-[13px] leading-[1.18]">
                <div className="font-black text-white">{item.name}</div>
                <div className="font-semibold text-white/85">{item.meta}</div>
              </div>
            ))}
          </div>
        </section>

        {showSkillBars && <section className="mt-[52px]">
          <SidebarTitle>{rtl ? "╪▓┘à╪º┘å█ò┌⌐╪º┘å" : "Languages"}</SidebarTitle>
          <ul className="list-disc space-y-1 pl-5 text-[13px] font-bold leading-[1.2] rtl:pl-0 rtl:pr-5">
            {languageItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>}
      </aside>

      <main className="relative z-20 ml-[325px] min-h-[1122px] pb-10 pl-0 pr-[30px] pt-[64px] rtl:ml-0 rtl:mr-[325px] rtl:pl-[30px] rtl:pr-0">
        <header className="ml-[-28px] h-[204px] bg-[#075a7c] px-[42px] pt-[38px] text-white shadow-[0_8px_0_rgba(0,0,0,0.14)] rtl:ml-0 rtl:mr-[-28px]">
          <h1 className="max-w-[430px] text-[37px] font-black leading-[1.03] tracking-tight rtl:tracking-normal text-white">{c.name}</h1>
          <p className="mt-4 max-w-[360px] text-[18px] font-bold leading-[1.18] text-white/90">{c.title}</p>
        </header>

        <div className="space-y-[28px] pt-[28px]">
          <section>
            <SectionRibbon title={rtl ? "┘╛┌ò█å┘ü╪º█î┘ä" : "Profile"} icon={<UserRound size={24} fill="currentColor" strokeWidth={3} />} />
            <div className="px-[36px] pt-[22px]">
              <p className="max-w-[300px] text-[14px] font-bold leading-[1.35] text-[#4d6b77]">{c.summary}</p>
            </div>
          </section>

          {c.education.length > 0 && (
            <section>
              <SectionRibbon title={rtl ? "╪«┘ê█Ä┘å╪»┘å" : "Education"} icon={<GraduationCap size={27} fill="currentColor" strokeWidth={3} />} />
              <div className="space-y-3 px-[36px] pt-[22px]">
                {c.education.slice(0, 2).map((item, index) => (
                  <div key={`${item.institution}-${index}`} className="text-[13px] leading-[1.13]">
                    <div className="font-black text-[#15495f]">{item.degree}</div>
                    <div className="font-semibold text-[#4f6c78]">{item.institution}</div>
                    <div className="font-bold text-[#15495f]">ΓÇó {item.year}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {c.experience.length > 0 && (
            <section>
              <SectionRibbon title={rtl ? "╪ª█ò╪▓┘à┘ê┘ê┘å" : "Experience"} icon={<BriefcaseBusiness size={25} fill="currentColor" strokeWidth={3} />} />
              <div className="space-y-4 px-[36px] pt-[22px]">
                {c.experience.slice(0, 2).map((item, index) => (
                  <article key={`${item.company}-${index}`} className="max-w-[320px] text-[13px] leading-[1.22]">
                    <h3 className="font-black text-[#15495f]">{item.company}</h3>
                    <p className="font-semibold text-[#4f6c78]">{item.title}</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-[12px] font-semibold leading-[1.25] text-[#4f6c78] rtl:pl-0 rtl:pr-5">
                      {(item.achievements.length ? item.achievements : [item.description]).slice(0, 3).map((achievement, achievementIndex) => (
                        <li key={`ach-${index}-${achievementIndex}`}>{achievement}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

