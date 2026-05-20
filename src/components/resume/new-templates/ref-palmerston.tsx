import { use } from "react";
import type { ReactNode } from "react";
import { DesignContext } from "../DesignContext";
import { Editable } from "../Editable";
import { StarRating, BarRating } from "../templates";
import { ContactLines, ExperienceList, PhotoBlock, Section, useLayoutRtl, labels, pickLanguages, skillRating, skillLevel, initials } from "../template-helpers";
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
  const rtl = useLayoutRtl(c);
  const l = labels(c, rtl);
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
          <Editable path="name" value={c.name} as="h1" className="max-w-[420px] text-[43px] font-black uppercase leading-[0.98] tracking-[0.02em] text-[#1f3148]" />
          <Editable path="title" value={c.title} as="p" className="mt-3 text-[16px] font-semibold uppercase tracking-[0.38em] text-[#1f3148]" />
        </div>
      </header>

      <div className="absolute left-[22px] right-[14px] top-[225px] z-20 flex h-[55px] items-center justify-between gap-5 rounded-full bg-[#303b4e] px-7 text-[11px] font-black text-white">
        {([
          { icon: <Phone size={15} fill="currentColor" strokeWidth={3} />, text: c.phone, path: "phone" as const },
          { icon: <Mail size={15} fill="currentColor" strokeWidth={3} />, text: c.email, path: "email" as const },
          { icon: <MapPin size={15} fill="currentColor" strokeWidth={3} />, text: c.location, path: "location" as const },
        ]).filter((item) => item.text).map((item) => (
          <div key={item.path} className="flex min-w-0 items-center gap-2">
            <span className="grid h-5 w-5 shrink-0 place-items-center text-white">{item.icon}</span>
            <Editable path={item.path} value={item.text as string} as="span" className="truncate" />
          </div>
        ))}
      </div>

      <aside className="absolute bottom-0 left-0 top-[296px] w-[286px] bg-[#303b4e] px-[49px] py-[50px] text-white">
        {c.education.length > 0 && (
          <section>
            <SidebarHeading>{l.education}</SidebarHeading>
            <div className="mt-5 space-y-5">
              {c.education.slice(0, 2).map((item, index) => (
                <div key={`${item.institution}-${index}`} className="text-[12px] leading-[1.35]">
                  <Editable path={`education.${index}.degree`} value={item.degree} as="div" className="font-black" />
                  <Editable path={`education.${index}.institution`} value={item.institution} as="div" className="mt-2 font-semibold" />
                  <Editable path={`education.${index}.year`} value={item.year} as="div" className="font-semibold" />
                </div>
              ))}
            </div>
          </section>
        )}

        {c.certifications.length > 0 && (
          <section className="mt-9">
            <SidebarHeading>{l.certifications}</SidebarHeading>
            <ul className="mt-5 list-disc space-y-2 pl-4 text-[12px] font-semibold leading-[1.35]">
              {c.certifications.slice(0, 3).map((item, idx) => (
                <Editable key={item} path={`certifications.${idx}`} value={item} as="li" />
              ))}
            </ul>
          </section>
        )}

        {showSkillBars && (
          <section className="mt-9">
            <SidebarHeading>{l.skills}</SidebarHeading>
            <div className="mt-5 space-y-3 text-[12px] font-semibold leading-[1.25]">
              {c.skills.slice(0, 6).map((skill, idx) => (
                <Editable key={skill} path={`skills.${idx}`} value={skill} as="p" />
              ))}
            </div>
          </section>
        )}

        <section className="mt-9">
          <SidebarHeading>{rtl ? "زمانەکان" : "Language"}</SidebarHeading>
          <div className="mt-5 space-y-2 text-[12px] font-semibold">
            {languageItems.map((item) => {
              const certIdx = c.certifications.indexOf(item);
              const path = certIdx >= 0 ? `certifications.${certIdx}` : `skills.${c.skills.indexOf(item)}`;
              return <Editable key={item} path={path} value={item} as="p" />;
            })}
          </div>
        </section>
      </aside>

      <main className="absolute bottom-[34px] left-[326px] right-[32px] top-[340px]">
        <section>
          <h2 className="border-b border-[#8b929b] pb-2 text-[23px] font-black tracking-[0.22em] text-[#1f3148]">{l.profile}</h2>
          <Editable path="summary" value={c.summary} as="p" className="mt-4 text-[11px] font-medium leading-[1.35] text-black" />
        </section>

        <section className="mt-7">
          <h2 className="border-b border-[#8b929b] pb-2 text-[23px] font-black tracking-[0.22em] text-[#1f3148]">{l.experience}</h2>
          <div className="mt-4 space-y-6">
            {c.experience.slice(0, 3).map((item, index) => (
              <article key={`${item.company}-${index}`} className="text-black">
                <div className="flex items-baseline justify-between gap-4">
                  <Editable path={`experience.${index}.title`} value={item.title} as="h3" className="text-[17px] font-black leading-tight" />
                  <Editable path={`experience.${index}.duration`} value={item.duration} as="span" className="shrink-0 text-[11px] font-semibold" />
                </div>
                <Editable path={`experience.${index}.company`} value={item.company} as="p" className="mt-1 text-[12px] font-semibold" />
                {item.description && (
                  <Editable path={`experience.${index}.description`} value={item.description} as="p" className="mt-3 text-[11px] font-medium leading-[1.35]" />
                )}
                {item.achievements.length > 0 && (
                  <ul className="mt-2 list-disc list-inside space-y-1 text-[11px] font-medium leading-[1.35]">
                    {item.achievements.slice(0, 2).map((ach, achIdx) => (
                      <Editable key={achIdx} path={`experience.${index}.achievements.${achIdx}`} value={ach} as="li" />
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>

        {referenceItems.length > 0 && (
          <section className="mt-7">
            <h2 className="border-b border-[#8b929b] pb-2 text-[23px] font-black tracking-[0.22em] text-[#1f3148]">{rtl ? "ڕاوێژکارەکان" : "References"}</h2>
            <div className="mt-4 grid grid-cols-2 gap-10 text-[11px] text-black">
              {referenceItems.map((item, index) => {
                const isProject = c.projects.length > 0 && index < c.projects.length;
                const namePath = isProject ? `projects.${index}.name` : `education.${index}.institution`;
                const rolePath = isProject ? `projects.${index}.tech.0` : `education.${index}.degree`;
                const metaPath = isProject ? `projects.${index}.impact` : `education.${index}.year`;
                return (
                  <div key={`${item.name}-${index}`}>
                    <p className="font-semibold flex gap-1">
                      <Editable path={namePath} value={item.name} as="span" />
                      <span>|</span>
                      <Editable path={rolePath} value={item.role} as="span" />
                    </p>
                    <Editable path={metaPath} value={item.meta} as="p" className="mt-2 font-medium" />
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

