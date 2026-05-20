import { useContext } from "react";
import type { ReactNode } from "react";
import { DesignContext } from "../DesignContext";
import { Editable } from "../Editable";
import { StarRating, BarRating } from "../templates";
import { ContactLines, ExperienceList, PhotoBlock, Section, useLayoutRtl, labels, pickLanguages, skillRating, skillLevel, initials } from "../template-helpers";
import { BriefcaseBusiness, Globe, GraduationCap, Mail, MapPin, Phone, UserRound } from "lucide-react";
import type { ResumeData } from "@/lib/types";
import { optimizeResumeForOnePage } from "@/lib/resume-utils";

export function DuboisTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = useLayoutRtl(c);
  const design = useContext(DesignContext);
  const showSkillBars = design?.showSkillBars !== false;
  const photoShape = design?.photoShape || "square";
  const photoBlockShape = photoShape === "circle" ? "circle" : photoShape === "none" ? "none" : "rounded";
  const skills = c.skills.slice(0, 6);
  const languages = (c.certifications.length > 0 ? c.certifications : c.skills).slice(0, 2);
  const interests = c.projects.length > 0 ? c.projects.slice(0, 4).map((p) => p.name) : c.skills.slice(0, 4);

  const l = labels(c, rtl);
  const SidebarTitle = ({ children }: { children: ReactNode }) => (
    <h2 className="mb-5 text-[17px] font-black leading-none text-[#153f68]">{children}</h2>
  );

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="relative overflow-hidden bg-white font-sans text-[#153f68]" style={{ minHeight: "1122px", width: "100%", maxWidth: "100%" }}>
      <aside className="absolute left-0 top-0 h-full w-[260px] bg-[#dcdfe5] px-[41px] pt-[26px]">
        <PhotoBlock data={c} shape={photoBlockShape} />

        <section className="mt-[45px]">
          <SidebarTitle>{l.contact}</SidebarTitle>
          <div className="space-y-[22px] text-[12px] font-bold">
            {c.phone && (
              <div className="flex items-center gap-4">
                <Phone size={24} fill="currentColor" strokeWidth={3} />
                <Editable path="phone" value={c.phone} as="span" />
              </div>
            )}
            {c.email && (
              <div className="flex items-center gap-4">
                <Mail size={24} fill="currentColor" strokeWidth={3} />
                <Editable path="email" value={c.email} as="span" className="truncate" />
              </div>
            )}
            {c.location && (
              <div className="flex items-center gap-4">
                <MapPin size={24} fill="currentColor" strokeWidth={3} />
                <Editable path="location" value={c.location} as="span" className="truncate" />
              </div>
            )}
          </div>
        </section>

        <section className="mt-[48px]">
          <SidebarTitle>{rtl ? "زمانەکان" : "Languages"}</SidebarTitle>
          <div className="space-y-3 text-[13px] font-bold">
            {languages.map((item, index) => {
              const isCert = c.certifications.includes(item);
              const path = isCert
                ? `certifications.${c.certifications.indexOf(item)}`
                : `skills.${c.skills.indexOf(item)}`;
              return (
                <div key={item} className="grid grid-cols-[76px_1fr] items-center">
                  <Editable path={path} value={item} as="span" />
                  <span className="h-[6px] rounded-full bg-white">
                    <span
                      className="block h-full rounded-full bg-[#245b90]"
                      style={{ width: index === 0 ? "86%" : "68%" }}
                    />
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {showSkillBars && (
          <section className="mt-[54px]">
            <SidebarTitle>{l.skills}</SidebarTitle>
            <div className="space-y-2 text-[13px] font-bold leading-[1.35]">
              {skills.map((skill) => (
                <Editable
                  key={skill}
                  path={`skills.${c.skills.indexOf(skill)}`}
                  value={skill}
                  as="p"
                />
              ))}
            </div>
          </section>
        )}

        <section className="mt-[58px]">
          <SidebarTitle>{rtl ? "بەرژەوەندییەکان" : "Interests"}</SidebarTitle>
          <div className="space-y-2 text-[13px] font-bold leading-[1.35]">
            {interests.map((item, idx) => {
              const projectIdx = c.projects.findIndex((p) => p.name === item);
              const skillIdx = c.skills.indexOf(item);
              const path =
                projectIdx >= 0
                  ? `projects.${projectIdx}.name`
                  : skillIdx >= 0
                    ? `skills.${skillIdx}`
                    : `interests.${idx}`;
              return <Editable key={item} path={path} value={item} as="p" />;
            })}
          </div>
        </section>
      </aside>

      <header className="absolute left-[210px] right-[11px] top-[52px] h-[145px] bg-[#153f68] px-[65px] py-[38px] text-white">
        <Editable path="name" value={c.name} as="h1" className="text-[39px] font-black leading-none tracking-tight text-white" />
        <Editable path="title" value={c.title} as="p" className="mt-4 text-[25px] font-semibold italic leading-none text-white" />
      </header>

      <main className="absolute left-[306px] right-[39px] top-[255px]">
        <section>
          <h2 className="mb-6 text-[21px] font-black leading-none">{l.education}</h2>
          <div className="space-y-6">
            {c.education.slice(0, 2).map((item, index) => (
              <div key={`${item.institution}-${index}`} className="grid grid-cols-[1fr_92px] gap-6">
                <div>
                  <Editable path={`education.${index}.degree`} value={item.degree} as="h3" className="text-[16px] font-black leading-tight" />
                  <Editable path={`education.${index}.institution`} value={item.institution} as="p" className="text-[16px] font-semibold italic leading-tight text-[#2b6398]" />
                </div>
                <Editable path={`education.${index}.year`} value={item.year} as="p" className="pt-1 text-right text-[11px] font-semibold italic text-[#2b6398]" />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-[64px]">
          <h2 className="mb-7 text-[23px] font-black leading-none">{l.experience}</h2>
          <div className="relative border-l-[3px] border-[#245b90] pl-[22px]">
            {c.experience.slice(0, 3).map((item, index) => (
              <article key={`${item.company}-${index}`} className="relative mb-[36px]">
                <span className="absolute -left-[29px] top-1.5 h-[10px] w-[10px] rounded-full bg-[#153f68]" />
                <div className="grid grid-cols-[1fr_98px] gap-5">
                  <div>
                    <Editable path={`experience.${index}.title`} value={item.title} as="h3" className="text-[17px] font-black leading-tight" />
                    <Editable path={`experience.${index}.company`} value={item.company} as="p" className="text-[16px] font-semibold italic leading-tight text-[#2b6398]" />
                  </div>
                  <Editable path={`experience.${index}.duration`} value={item.duration} as="p" className="pt-1 text-right text-[11px] font-semibold italic leading-tight text-[#2b6398]" />
                </div>
                <ul className="mt-5 list-disc space-y-1 pl-6 text-[14px] font-semibold leading-[1.2]">
                  {(item.achievements.length ? item.achievements : [item.description]).slice(0, 3).map((achievement, achievementIndex) => {
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
      </main>
    </div>
  );
}

