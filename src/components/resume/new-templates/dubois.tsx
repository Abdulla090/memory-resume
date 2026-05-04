import { useContext } from "react";
import type { ReactNode } from "react";
import { DesignContext } from "../DesignContext";
import { Editable } from "../Editable";
import { StarRating, BarRating } from "../templates";
import { ContactLines, ExperienceList, PhotoBlock, Section, isRTL, labels, pickLanguages, skillRating, skillLevel, initials } from "../template-helpers";
import { BriefcaseBusiness, Globe, GraduationCap, Mail, MapPin, Phone, UserRound } from "lucide-react";
import type { ResumeData } from "@/lib/types";
import { optimizeResumeForOnePage } from "@/lib/resume-utils";

export function DuboisTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const blue = "#153f68";
  const skills = c.skills.slice(0, 6);
  const languages = (c.certifications.length > 0 ? c.certifications : c.skills).slice(0, 2);
  const interests = c.projects.length > 0 ? c.projects.slice(0, 4).map((p) => p.name) : c.skills.slice(0, 4);

  const SidebarTitle = ({ children }: { children: ReactNode }) => (
    <h2 className="mb-5 text-[17px] font-black leading-none text-[#153f68]">{children}</h2>
  );

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="relative overflow-hidden bg-white font-sans text-[#153f68]" style={{ height: "1122px", minHeight: "1122px", width: "794px", maxWidth: "100%" }}>
      <aside className="absolute left-0 top-0 h-full w-[260px] bg-[#dcdfe5] px-[41px] pt-[26px]">
        <div className="h-[244px] w-[172px] overflow-hidden border-[4px] border-white bg-slate-200">
          {c.photoUrl ? <img src={c.photoUrl} alt={c.name} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-[2.2em] font-black">{initials(c.name)}</div>}
        </div>

        <section className="mt-[45px]">
          <SidebarTitle>Coordonnees</SidebarTitle>
          <div className="space-y-[22px] text-[12px] font-bold">
            {c.phone && <div className="flex items-center gap-4"><Phone size={24} fill="currentColor" strokeWidth={3} /><span>{c.phone}</span></div>}
            {c.email && <div className="flex items-center gap-4"><Mail size={24} fill="currentColor" strokeWidth={3} /><span className="truncate">{c.email}</span></div>}
            {c.location && <div className="flex items-center gap-4"><MapPin size={24} fill="currentColor" strokeWidth={3} /><span className="truncate">{c.location}</span></div>}
          </div>
        </section>

        <section className="mt-[48px]">
          <SidebarTitle>Langues</SidebarTitle>
          <div className="space-y-3 text-[13px] font-bold">
            {languages.map((item, index) => (
              <div key={item} className="grid grid-cols-[76px_1fr] items-center">
                <span>{item}</span>
                <span className="h-[6px] rounded-full bg-white"><span className="block h-full rounded-full bg-[#245b90]" style={{ width: index === 0 ? "86%" : "68%" }} /></span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-[54px]">
          <SidebarTitle>Competences</SidebarTitle>
          <div className="space-y-2 text-[13px] font-bold leading-[1.35]">
            {skills.map((skill) => <p key={skill}>{skill}</p>)}
          </div>
        </section>

        <section className="mt-[58px]">
          <SidebarTitle>Centres d'interet</SidebarTitle>
          <div className="space-y-2 text-[13px] font-bold leading-[1.35]">
            {interests.map((item) => <p key={item}>{item}</p>)}
          </div>
        </section>
      </aside>

      <header className="absolute left-[210px] right-[11px] top-[52px] h-[145px] bg-[#153f68] px-[65px] py-[38px] text-white">
        <h1 className="text-[39px] font-black leading-none tracking-tight">{c.name}</h1>
        <p className="mt-4 text-[25px] font-semibold italic leading-none">{c.title}</p>
      </header>

      <main className="absolute left-[306px] right-[39px] top-[255px]">
        <section>
          <h2 className="mb-6 text-[21px] font-black leading-none">Formation</h2>
          <div className="space-y-6">
            {c.education.slice(0, 2).map((item, index) => (
              <div key={`${item.institution}-${index}`} className="grid grid-cols-[1fr_92px] gap-6">
                <div>
                  <h3 className="text-[16px] font-black leading-tight">{item.degree}</h3>
                  <p className="text-[16px] font-semibold italic leading-tight text-[#2b6398]">{item.institution}</p>
                </div>
                <p className="pt-1 text-right text-[11px] font-semibold italic text-[#2b6398]">{item.year}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-[64px]">
          <h2 className="mb-7 text-[23px] font-black leading-none">Experience Professionnelle</h2>
          <div className="relative border-l-[3px] border-[#245b90] pl-[22px]">
            {c.experience.slice(0, 3).map((item, index) => (
              <article key={`${item.company}-${index}`} className="relative mb-[36px]">
                <span className="absolute -left-[29px] top-1.5 h-[10px] w-[10px] rounded-full bg-[#153f68]" />
                <div className="grid grid-cols-[1fr_98px] gap-5">
                  <div>
                    <h3 className="text-[17px] font-black leading-tight">{item.title}</h3>
                    <p className="text-[16px] font-semibold italic leading-tight text-[#2b6398]">{item.company}</p>
                  </div>
                  <p className="pt-1 text-right text-[11px] font-semibold italic leading-tight text-[#2b6398]">{item.duration}</p>
                </div>
                <ul className="mt-5 list-disc space-y-1 pl-6 text-[14px] font-semibold leading-[1.2]">
                  {(item.achievements.length ? item.achievements : [item.description]).slice(0, 3).map((achievement, achievementIndex) => <li key={achievementIndex}>{achievement}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

