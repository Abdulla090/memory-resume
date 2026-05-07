import { useContext } from "react";
import type { ReactNode } from "react";
import { DesignContext } from "../DesignContext";
import { Editable } from "../Editable";
import { StarRating, BarRating } from "../templates";
import { ContactLines, ExperienceList, PhotoBlock, Section, isRTL, labels, pickLanguages, skillRating, skillLevel, initials } from "../template-helpers";
import { BriefcaseBusiness, Globe, GraduationCap, Mail, MapPin, Phone, UserRound } from "lucide-react";
import type { ResumeData } from "@/lib/types";
import { optimizeResumeForOnePage } from "@/lib/resume-utils";

export function LeroyTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const design = useContext(DesignContext);
  const showSkillBars = design?.showSkillBars !== false;
  const photoShape = design?.photoShape || "circle";
  const photoBlockShape = photoShape === "square" ? "rounded" : photoShape;
  const competenceItems = c.skills.slice(0, 6);
  const languageItems = (c.certifications.length > 0 ? c.certifications : c.skills).slice(0, 3);
  const leisureText = c.projects.length > 0
    ? c.projects.slice(0, 3).map((project) => project.name).join(" - ")
    : c.skills.slice(0, 3).join(" - ");
  const nameParts = c.name.split(/\s+/).filter(Boolean);
  const firstLine = nameParts.slice(0, Math.ceil(nameParts.length / 2)).join(" ") || c.name;
  const secondLine = nameParts.slice(Math.ceil(nameParts.length / 2)).join(" ");

  const CreamPanel = ({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) => (
    <section className={`bg-[#f8f7f4] px-[38px] py-[28px] text-[#050b14] ${className}`}>
      <h2 className="mb-3 font-serif text-[34px] font-bold uppercase leading-none tracking-[0.02em] text-[#142033] rtl:tracking-normal">{title}</h2>
      {children}
    </section>
  );

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="relative overflow-hidden bg-white font-sans text-[#050b14]" style={{ height: "1122px", minHeight: "1122px", width: "794px", maxWidth: "100%" }}>
      <div className="absolute left-0 top-[76px] h-[112px] w-full bg-[#6f7e84]" />

      <div className="absolute left-[46px] top-0 z-20 h-[609px] w-[292px] bg-[#202a3a]" style={{ clipPath: "polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%)" }}>
        <div className="pt-[86px] text-center font-serif text-[34px] font-bold uppercase leading-[0.98] tracking-[0.02em] text-white rtl:tracking-normal">
          <div>{firstLine}</div>
          {secondLine && <div>{secondLine}</div>}
        </div>

        <div className="mx-auto mt-[28px]">
          <PhotoBlock data={c} shape={photoBlockShape} />
        </div>

        <div className="mt-[38px] px-[43px] text-[14px] font-black leading-[1.2] text-white">
          <p className="text-center">30 ans - permis B</p>
          <div className="mt-3 space-y-3">
            {c.phone && (
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-5 w-5 place-items-center rounded-full border-2 border-white text-[10px]">P</span>
                <span className="truncate">{c.phone}</span>
              </div>
            )}
            {c.email && (
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-5 w-5 place-items-center rounded-full border-2 border-white text-[12px]">@</span>
                <span className="truncate">{c.email}</span>
              </div>
            )}
            {c.location && (
              <div className="flex min-w-0 items-center gap-3">
                <MapPin size={20} fill="currentColor" strokeWidth={3} className="shrink-0" />
                <span className="truncate">{c.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <header className="absolute left-[338px] right-0 top-[76px] z-10 flex h-[112px] items-center px-[76px] font-serif text-[38px] font-bold uppercase leading-[1.02] tracking-[0.03em] text-white rtl:tracking-normal">
        <div className="max-w-[440px]">{c.title}</div>
      </header>

      <div className="absolute left-[46px] top-[628px] z-10 w-[292px]">
        <CreamPanel title="Formation" className="min-h-[355px] px-[34px] py-[26px]">
          <ul className="list-disc space-y-[22px] pl-5 text-[15px] font-semibold leading-[1.16] rtl:pl-0 rtl:pr-5">
            {c.education.slice(0, 3).map((item, index) => (
              <li key={`${item.institution}-${index}`}>{item.year}: {item.degree} - {item.institution}</li>
            ))}
          </ul>
        </CreamPanel>
      </div>

      <main className="absolute left-[378px] right-[42px] top-[228px] z-10 space-y-[18px]">
        {showSkillBars && <CreamPanel title="Competences" className="min-h-[280px]">
          <ul className="list-disc space-y-[3px] pl-5 text-[15px] font-semibold leading-[1.05] rtl:pl-0 rtl:pr-5">
            {competenceItems.map((skill) => <li key={skill}>{skill}</li>)}
          </ul>
        </CreamPanel>}

        <CreamPanel title="Experience" className="min-h-[276px]">
          <ul className="list-disc space-y-[22px] pl-5 text-[15px] font-semibold leading-[1.14] rtl:pl-0 rtl:pr-5">
            {c.experience.slice(0, 3).map((item, index) => (
              <li key={`${item.company}-${index}`}>{item.duration}: {item.title} - {item.company}</li>
            ))}
          </ul>
        </CreamPanel>

        <CreamPanel title="Langues" className="min-h-[166px] py-[25px]">
          <ul className="list-disc space-y-[3px] pl-5 text-[15px] font-semibold leading-[1.05] rtl:pl-0 rtl:pr-5">
            {languageItems.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </CreamPanel>
      </main>

      <footer className="absolute bottom-0 left-0 right-0 flex h-[65px] items-center bg-[#6f7e84] px-[88px] text-white">
        <div className="font-serif text-[31px] font-bold uppercase leading-none">Loisirs</div>
        <div className="ml-[58px] min-w-0 truncate text-[15px] font-black">{leisureText}</div>
      </footer>
    </div>
  );
}

