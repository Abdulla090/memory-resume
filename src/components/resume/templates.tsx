import React from 'react';
import type { ResumeData, TemplateId, DesignSettings } from "@/lib/types";
import { DesignContext, FieldFocusContext } from "./DesignContext";
import { useLayoutRtl } from "./template-helpers";
import { ResumeLayoutContext } from "./DesignContext";
import { Editable } from "./Editable";

function labels(data: ResumeData, rtl: boolean) {
  const fallback = rtl
    ? {
        summary: "پوختە",
        profile: "پڕۆفایل",
        experience: "ئەزموون",
        projects: "پرۆژەکان",
        selectedProjects: "پرۆژە دیاریکراوەکان",
        skills: "لێهاتووییەکان",
        expertise: "پسپۆڕی",
        education: "خوێندن",
        certifications: "بڕوانامەکان",
        impact: "کاریگەری",
      }
    : {
        summary: "Summary",
        profile: "Profile",
        experience: "Experience",
        projects: "Projects",
        selectedProjects: "Selected Projects",
        skills: "Skills",
        expertise: "Expertise",
        education: "Education",
        certifications: "Certifications",
        impact: "Impact",
      };
  const get = (key: keyof typeof fallback) => (
    <Editable
      path={`sectionTitles.${key}`}
      value={data.sectionTitles?.[key] || fallback[key]}
      as="span"
    />
  );
  return {
    summary: get("summary"),
    profile: get("profile"),
    experience: get("experience"),
    projects: get("projects"),
    selectedProjects: get("selectedProjects"),
    skills: get("skills"),
    expertise: get("expertise"),
    education: get("education"),
    certifications: get("certifications"),
    impact: get("impact"),
  };
}

export function StarRating({ level, max = 5 }: { level: number, max?: number }) {
  return (
    <div className="flex gap-0.5 mt-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} className={`w-3 h-3 ${i < level ? "text-blue-500 fill-current" : "text-neutral-200 fill-current"}`} viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export function BarRating({ level, max = 5 }: { level: number, max?: number }) {
  const percentage = (level / max) * 100;
  return (
    <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden mt-1">
      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${percentage}%` }} />
    </div>
  )
}

export function MinimalTemplate({ data }: { data: ResumeData }) {
  const rtl = useLayoutRtl(data);
  const l = labels(data, rtl);
  return (
    <div dir={rtl ? "rtl" : "ltr"} className="bg-white p-12 text-[#111] font-sans" style={{ minHeight: "1122px", width: "100%" }}>
      <header className="border-b border-neutral-300 pb-4">
        <Editable path="name" value={data.name} as="h1" className="text-3xl font-semibold tracking-tight rtl:tracking-normal" />
        <Editable path="title" value={data.title} as="p" className="mt-1 text-base text-neutral-700" />
        <p className="mt-2 text-xs text-neutral-500">
          {data.location && <Editable path="location" value={data.location} as="span" />}
          {data.location && (data.email || data.phone) && " · "}
          {data.email && <Editable path="email" value={data.email} as="span" />}
          {data.email && data.phone && " · "}
          {data.phone && <Editable path="phone" value={data.phone} as="span" />}
        </p>
      </header>

      <Section title={l.summary}>
        <Editable path="summary" value={data.summary} as="p" className="text-sm leading-relaxed" />
      </Section>

      {data.experience.length > 0 && (
        <Section title={l.experience}>
          <div className="space-y-4">
            {data.experience.map((e, i) => (
              <div key={i}>
                <div className="flex items-baseline justify-between">
                  <div className="font-semibold">
                    <Editable path={`experience.${i}.title`} value={e.title} as="span" /> · <Editable path={`experience.${i}.company`} value={e.company} as="span" className="font-normal" />
                  </div>
                  <Editable path={`experience.${i}.duration`} value={e.duration} as="div" className="text-xs text-neutral-500" />
                </div>
                {e.description && (
                  <Editable path={`experience.${i}.description`} value={e.description} as="p" className="mt-1 text-sm text-neutral-700" />
                )}
                <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm rtl:pl-0 rtl:pr-5">
                  {e.achievements.map((a, j) => (
                    <li key={j}><Editable path={`experience.${i}.achievements.${j}`} value={a} as="span" /></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      {data.projects.length > 0 && (
        <Section title={l.projects}>
          <div className="space-y-3">
            {data.projects.map((p, i) => (
              <div key={i}>
                <Editable path={`projects.${i}.name`} value={p.name} as="div" className="font-semibold" />
                <Editable path={`projects.${i}.description`} value={p.description} as="p" className="text-sm text-neutral-700" />
                {p.tech.length > 0 && (
                  <p className="mt-0.5 text-xs text-neutral-500">
                    {p.tech.map((tech, techIndex) => (
                      <React.Fragment key={`${tech}-${techIndex}`}>
                        {techIndex > 0 && " · "}
                        <Editable path={`projects.${i}.tech.${techIndex}`} value={tech} as="span" />
                      </React.Fragment>
                    ))}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {(data.skillItems?.length ? data.skillItems.length > 0 : data.skills.length > 0) && (
        <Section title={l.skills}>
          {data.skillItems && data.skillItems.length > 0 ? (
            <div className="grid grid-cols-2 gap-y-3 gap-x-8">
              {data.skillItems.map((s, i) => (
                <div key={i} className="flex flex-col">
                  <Editable path={`skillItems.${i}.name`} value={s.name} as="span" className="text-sm font-medium text-neutral-800" />
                  <StarRating level={s.level} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm">
              {data.skills.map((skill, skillIndex) => (
                <React.Fragment key={`${skill}-${skillIndex}`}>
                  {skillIndex > 0 && " · "}
                  <Editable path={`skills.${skillIndex}`} value={skill} as="span" />
                </React.Fragment>
              ))}
            </p>
          )}
        </Section>
      )}

      {data.education.length > 0 && (
        <Section title={l.education}>
          <div className="space-y-1.5">
            {data.education.map((e, i) => (
              <div key={i} className="flex items-baseline justify-between text-sm">
                <span>
                  <Editable path={`education.${i}.degree`} value={e.degree} as="span" className="font-semibold" /> · <Editable path={`education.${i}.institution`} value={e.institution} as="span" />
                </span>
                <Editable path={`education.${i}.year`} value={e.year} as="span" className="text-xs text-neutral-500" />
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] rtl:tracking-normal text-neutral-500">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function ExecutiveTemplate({ data }: { data: ResumeData }) {
  const rtl = useLayoutRtl(data);
  const l = labels(data, rtl);
  return (
    <div
      dir={rtl ? "rtl" : "ltr"}
      className="bg-white text-[#111]"
      style={{ minHeight: "1122px", fontFamily: "Georgia, serif", display: "flex", flexDirection: "column", width: "100%" }}
    >
      <div className="grid grid-cols-3 rtl:[direction:rtl]" style={{ flex: 1, minHeight: "1122px" }}>
        <aside className="col-span-1 bg-neutral-900 p-8 text-neutral-100">
          <div>
            <Editable path="name" value={data.name} as="h1" className="text-2xl font-bold leading-tight" />
            <Editable path="title" value={data.title} as="p" className="mt-1 text-sm italic text-neutral-300" />
            <div className="mt-6 space-y-1 text-xs text-neutral-300">
              {data.location && <Editable path="location" value={data.location} as="div" />}
              {data.email && <Editable path="email" value={data.email} as="div" />}
              {data.phone && <Editable path="phone" value={data.phone} as="div" />}
            </div>
          </div>

          {(data.skillItems?.length ? data.skillItems.length > 0 : data.skills.length > 0) && (
            <div className="mt-8">
              <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] rtl:tracking-normal text-neutral-400">
                {l.expertise}
              </h3>
              {data.skillItems && data.skillItems.length > 0 ? (
                <div className="space-y-4">
                  {data.skillItems.map((s, i) => (
                    <div key={i} className="flex flex-col">
                      <Editable path={`skillItems.${i}.name`} value={s.name} as="span" className="text-sm font-medium" />
                      <BarRating level={s.level} />
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-1 text-sm">
                  {data.skills.map((s, i) => (
                    <li key={i}><Editable path={`skills.${i}`} value={s} as="span" /></li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {data.education.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] rtl:tracking-normal text-neutral-400">
                {l.education}
              </h3>
              {data.education.map((e, i) => (
                <div key={i} className="mb-2 text-xs">
                  <Editable path={`education.${i}.degree`} value={e.degree} as="div" className="font-semibold" />
                  <div className="text-neutral-400"><Editable path={`education.${i}.institution`} value={e.institution} as="span" />, <Editable path={`education.${i}.year`} value={e.year} as="span" /></div>
                </div>
              ))}
            </div>
          )}

          {data.certifications.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] rtl:tracking-normal text-neutral-400">
                {l.certifications}
              </h3>
              <ul className="space-y-1 text-xs">
                {data.certifications.map((c, i) => (
                  <li key={i}><Editable path={`certifications.${i}`} value={c} as="span" /></li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        <main className="col-span-2 p-10">
          <section>
            <h2 className="mb-2 border-b border-neutral-300 pb-1 text-xs font-bold uppercase tracking-[0.2em] rtl:tracking-normal text-neutral-700">
              {l.profile}
            </h2>
            <Editable path="summary" value={data.summary} as="p" className="text-sm leading-relaxed" />
          </section>

          {data.experience.length > 0 && (
            <section className="mt-6">
              <h2 className="mb-3 border-b border-neutral-300 pb-1 text-xs font-bold uppercase tracking-[0.2em] rtl:tracking-normal text-neutral-700">
                {l.experience}
              </h2>
              <div className="space-y-4">
                {data.experience.map((e, i) => (
                  <div key={i}>
                    <Editable path={`experience.${i}.title`} value={e.title} as="div" className="text-base font-bold" />
                    <div className="text-sm italic text-neutral-600">
                      <Editable path={`experience.${i}.company`} value={e.company} as="span" /> · <Editable path={`experience.${i}.duration`} value={e.duration} as="span" />
                    </div>
                    {e.description && (
                      <Editable path={`experience.${i}.description`} value={e.description} as="p" className="mt-1 text-sm text-neutral-800" />
                    )}
                    <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm rtl:pl-0 rtl:pr-5">
                      {e.achievements.map((a, j) => (
                        <li key={j}><Editable path={`experience.${i}.achievements.${j}`} value={a} as="span" /></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.projects.length > 0 && (
            <section className="mt-6">
              <h2 className="mb-3 border-b border-neutral-300 pb-1 text-xs font-bold uppercase tracking-[0.2em] rtl:tracking-normal text-neutral-700">
                {l.selectedProjects}
              </h2>
              <div className="space-y-2.5">
                {data.projects.map((p, i) => (
                  <div key={i}>
                    <Editable path={`projects.${i}.name`} value={p.name} as="div" className="font-bold" />
                    <Editable path={`projects.${i}.description`} value={p.description} as="p" className="text-sm" />
                    {p.impact && (
                      <p className="text-xs italic text-neutral-600">{l.impact}: <Editable path={`projects.${i}.impact`} value={p.impact} as="span" /></p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

import { 
  NoirTemplate, 
  ApexTemplate, 
  NexusTemplate, 
  OrbitTemplate, 
  MetricTemplate, 
  PrismTemplate, 
  SlateTemplate, 
  AvantTemplate, 
  VanguardTemplate, 
  MonolithTemplate, 
  CipherTemplate, 
  PinnacleTemplate 
} from "./templates-extra";
import {
  NewAcademicTemplate,
  NewProfessionalTemplate,
  NewSleekTemplate,
  RefPalmerstonTemplate,
  RefAlvaradoTemplate,
  NewAlvaradoTemplate,
  RefSanchezTemplate,
  RefSchumacherTemplate,
  RefSilvaTemplate,
  RefTorresTemplate,
  MercerTemplate,
  GallegoTemplate,
  LeroyTemplate,
  DuboisTemplate,
  ClaudiaAlvesTemplate,
} from "./templates-new";

export function ResumePreview({
  data,
  template,
  design,
  onFieldFocus,
  layoutRtl = null,
}: {
  data: ResumeData;
  template: TemplateId;
  design?: DesignSettings;
  onFieldFocus?: (path: string) => void;
  /** Force LTR/RTL layout; null = auto from content script */
  layoutRtl?: boolean | null;
}) {
  return (
    <ResumeLayoutContext.Provider value={layoutRtl}>
      <ResumePreviewBody
        data={data}
        template={template}
        design={design}
        onFieldFocus={onFieldFocus}
      />
    </ResumeLayoutContext.Provider>
  );
}

function ResumePreviewBody({
  data,
  template,
  design,
  onFieldFocus,
}: {
  data: ResumeData;
  template: TemplateId;
  design?: DesignSettings;
  onFieldFocus?: (path: string) => void;
}) {
  const rtl = useLayoutRtl(data);
  let preview: React.ReactNode;
  switch (template) {
    case "executive": preview = <ExecutiveTemplate data={data} />; break;
    case "noir": preview = <NoirTemplate data={data} />; break;
    case "apex": preview = <ApexTemplate data={data} />; break;
    case "nexus": preview = <NexusTemplate data={data} />; break;
    case "orbit": preview = <OrbitTemplate data={data} />; break;
    case "metric": preview = <MetricTemplate data={data} />; break;
    case "prism": preview = <PrismTemplate data={data} />; break;
    case "slate": preview = <SlateTemplate data={data} />; break;
    case "avant": preview = <AvantTemplate data={data} />; break;
    case "vanguard": preview = <VanguardTemplate data={data} />; break;
    case "monolith": preview = <MonolithTemplate data={data} />; break;
    case "cipher": preview = <CipherTemplate data={data} />; break;
    case "pinnacle": preview = <PinnacleTemplate data={data} />; break;
    case "new-sleek": preview = <NewSleekTemplate data={data} />; break;
    case "new-professional": preview = <NewProfessionalTemplate data={data} />; break;
    case "new-academic": preview = <NewAcademicTemplate data={data} />; break;
    case "ref-torres": preview = <RefTorresTemplate data={data} />; break;
    case "ref-silva": preview = <RefSilvaTemplate data={data} />; break;
    case "ref-schumacher": preview = <RefSchumacherTemplate data={data} />; break;
    case "ref-palmerston": preview = <RefPalmerstonTemplate data={data} />; break;
    case "ref-alvarado": preview = <RefAlvaradoTemplate data={data} />; break;
    case "new-alvarado": preview = <NewAlvaradoTemplate data={data} />; break;
    case "ref-sanchez": preview = <RefSanchezTemplate data={data} />; break;
    case "mercer": preview = <MercerTemplate data={data} />; break;
    case "gallego": preview = <GallegoTemplate data={data} />; break;
    case "leroy": preview = <LeroyTemplate data={data} />; break;
    case "dubois": preview = <DuboisTemplate data={data} />; break;
    case "claudia-alves": preview = <ClaudiaAlvesTemplate data={data} />; break;
    case "carbon": preview = <RefSanchezTemplate data={data} />; break;
    case "atlas": preview = <RefTorresTemplate data={data} />; break;
    case "forge": preview = <RefSchumacherTemplate data={data} />; break;
    case "zenith": preview = <MercerTemplate data={data} />; break;
    case "vector": preview = <CipherTemplate data={data} />; break;
    case "minimal":
    default: preview = <MinimalTemplate data={data} />;
  }

  return (
    <DesignContext.Provider value={design}>
      <div dir={rtl ? "rtl" : "ltr"} className="resume-rtl-scope h-full w-full [unicode-bidi:plaintext]">
        {onFieldFocus ? <FieldFocusContext.Provider value={onFieldFocus}>{preview}</FieldFocusContext.Provider> : preview}
      </div>
    </DesignContext.Provider>
  );
}
