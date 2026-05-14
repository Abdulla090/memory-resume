import { use } from "react";
import type { ReactNode } from "react";
import { DesignContext } from "../DesignContext";
import { Editable } from "../Editable";
import { StarRating, BarRating } from "../templates";
import { ContactLines, ExperienceList, PhotoBlock, Section, isRTL, labels, pickLanguages, skillRating, skillLevel, initials } from "../template-helpers";
import { BriefcaseBusiness, Globe, GraduationCap, Mail, MapPin, Phone, UserRound } from "lucide-react";
import type { ResumeData } from "@/lib/types";
import { optimizeResumeForOnePage } from "@/lib/resume-utils";

function SidebarHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="border-b border-white/55 pb-2 text-[28px] font-black leading-none tracking-[0.14em] text-white">{children}</h2>
  );
}

export function RefPalmerstonTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const design = use(DesignContext);
  const showSkillBars = design?.showSkillBars !== false;
  const photoShape = design?.photoShape || "circle";
  const photoBlockShape = photoShape === "square" ? "rounded" : photoShape;
  const referenceItems = c.projects.length > 0
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
  const languageItems = (c.certifications.length > 0 ? c.certifications : c.skills).slice(0, 3);


  return (
    <div dir={rtl ? "rtl" : "ltr"} className="relative overflow-hidden bg-white font-sans text-[#111827]" style={{ height: "1122px", minHeight: "1122px", width: "794px", maxWidth: "100%" }}>
      <header className="absolute left-0 top-0 h-[208px] w-full bg-white">
        <div className="absolute left-0 top-0 h-[205px] w-[285px] rounded-br-[48px] bg-[#303b4e]">
          <div className="absolute left-[59px] top-[34px]">
            <PhotoBlock data={c} shape={photoBlockShape} />
          </div>
        </div>
        <div className="ml-[330px] pt-[64px]">
          <h1 className="max-w-[420px] text-[43px] font-black uppercase leading-[0.98] tracking-[0.02em] text-[#1f3148]">{c.name}</h1>
          <p className="mt-3 text-[16px] font-semibold uppercase tracking-[0.38em] text-[#1f3148]">{c.title}</p>
        </div>
      </header>

      <div className="absolute left-[22px] right-[14px] top-[225px] z-20 flex h-[55px] items-center justify-between gap-5 rounded-full bg-[#303b4e] px-7 text-[11px] font-black text-white">
        {[
          { icon: <Phone size={15} fill="currentColor" strokeWidth={3} />, text: c.phone },
          { icon: <Mail size={15} fill="currentColor" strokeWidth={3} />, text: c.email },
          { icon: <Globe size={15} strokeWidth={3} />, text: c.location ? "www.reallygreatsite.com" : undefined },
          { icon: <MapPin size={15} fill="currentColor" strokeWidth={3} />, text: c.location },
        ].filter((item) => item.text).map((item) => (
          <div key={item.text} className="flex min-w-0 items-center gap-2">
            <span className="grid h-5 w-5 shrink-0 place-items-center text-white">{item.icon}</span>
            <span className="truncate">{item.text}</span>
          </div>
        ))}
      </div>

      <aside className="absolute bottom-0 left-0 top-[296px] w-[286px] bg-[#303b4e] px-[49px] py-[50px] text-white">
        {c.education.length > 0 && (
          <section>
            <SidebarHeading>Education</SidebarHeading>
            <div className="mt-5 space-y-5">
              {c.education.slice(0, 2).map((item, index) => (
                <div key={`${item.institution}-${index}`} className="text-[12px] leading-[1.35]">
                  <div className="font-black">{item.degree}</div>
                  <div className="mt-2 font-semibold">{item.institution}</div>
                  <div className="font-semibold">{item.year}</div>
                  {c.location && <div className="font-semibold">{c.location}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {c.certifications.length > 0 && (
          <section className="mt-9">
            <SidebarHeading>Certifications</SidebarHeading>
            <ul className="mt-5 list-disc space-y-2 pl-4 text-[12px] font-semibold leading-[1.35]">
              {c.certifications.slice(0, 3).map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        )}

        {showSkillBars && <section className="mt-9">
          <SidebarHeading>Skills</SidebarHeading>
          <div className="mt-5 space-y-3 text-[12px] font-semibold leading-[1.25]">
            {c.skills.slice(0, 6).map((skill) => <p key={skill}>{skill}</p>)}
          </div>
        </section>}

        <section className="mt-9">
          <SidebarHeading>Language</SidebarHeading>
          <div className="mt-5 space-y-2 text-[12px] font-semibold">
            {languageItems.map((item) => <p key={item}>{item}</p>)}
          </div>
        </section>
      </aside>

      <main className="absolute bottom-[34px] left-[326px] right-[32px] top-[340px]">
        <section>
          <h2 className="border-b border-[#8b929b] pb-2 text-[23px] font-black tracking-[0.22em] text-[#1f3148]">About me</h2>
          <p className="mt-4 text-[11px] font-medium leading-[1.35] text-black">{c.summary}</p>
        </section>

        <section className="mt-7">
          <h2 className="border-b border-[#8b929b] pb-2 text-[23px] font-black tracking-[0.22em] text-[#1f3148]">Experience</h2>
          <div className="mt-4 space-y-6">
            {c.experience.slice(0, 3).map((item, index) => (
              <article key={`${item.company}-${index}`} className="text-black">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[17px] font-black leading-tight">{item.title}</h3>
                  <span className="shrink-0 text-[11px] font-semibold">{item.duration}</span>
                </div>
                <p className="mt-1 text-[12px] font-semibold">{item.company}</p>
                <p className="mt-3 text-[11px] font-medium leading-[1.35]">{item.description || item.achievements[0]}</p>
                {item.achievements.length > 0 && (
                  <p className="mt-2 text-[11px] font-medium leading-[1.35]">{item.achievements.slice(0, 2).join(" ")}</p>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-7">
          <h2 className="border-b border-[#8b929b] pb-2 text-[23px] font-black tracking-[0.22em] text-[#1f3148]">Reference</h2>
          <div className="mt-4 grid grid-cols-2 gap-10 text-[11px] text-black">
            {referenceItems.map((item, index) => (
              <div key={`${item.name}-${index}`}>
                <p className="font-semibold">{item.name} | {item.role}</p>
                <p className="mt-2 font-medium">{item.meta}</p>
                <p className="mt-2 font-medium">{c.phone || "+123-456-7890"}</p>
              </div>
            ))}
            {referenceItems.length === 1 && (
              <div>
                <p className="font-semibold">{c.name} | {c.title}</p>
                <p className="mt-2 font-medium">{c.email || "hello@reallygreatsite.com"}</p>
                <p className="mt-2 font-medium">{c.phone || "+123-456-7890"}</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

