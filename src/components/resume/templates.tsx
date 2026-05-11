import React from 'react';
import type { ResumeData, TemplateId, DesignSettings } from "@/lib/types";
import { DesignContext, FieldFocusContext } from "./DesignContext";
import { isRTL } from "./template-helpers";

function labels(rtl: boolean) {
  return rtl
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
  const rtl = isRTL(data);
  const l = labels(rtl);
  return (
    <div dir={rtl ? "rtl" : "ltr"} className="bg-white p-12 text-[#111] font-sans" style={{ minHeight: "1122px", width: "100%" }}>
      <header className="border-b border-neutral-300 pb-4">
        <h1 className="text-3xl font-semibold tracking-tight rtl:tracking-normal">{data.name}</h1>
        <p className="mt-1 text-base text-neutral-700">{data.title}</p>
        <p className="mt-2 text-xs text-neutral-500">
          {[data.location, data.email, data.phone].filter(Boolean).join(" · ")}
        </p>
      </header>

      <Section title={l.summary}>
        <p className="text-sm leading-relaxed">{data.summary}</p>
      </Section>

      {data.experience.length > 0 && (
        <Section title={l.experience}>
          <div className="space-y-4">
            {data.experience.map((e, i) => (
              <div key={i}>
                <div className="flex items-baseline justify-between">
                  <div className="font-semibold">
                    {e.title} · <span className="font-normal">{e.company}</span>
                  </div>
                  <div className="text-xs text-neutral-500">{e.duration}</div>
                </div>
                {e.description && (
                  <p className="mt-1 text-sm text-neutral-700">{e.description}</p>
                )}
                <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm rtl:pl-0 rtl:pr-5">
                  {e.achievements.map((a, j) => (
                    <li key={j}>{a}</li>
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
                <div className="font-semibold">{p.name}</div>
                <p className="text-sm text-neutral-700">{p.description}</p>
                {p.tech.length > 0 && (
                  <p className="mt-0.5 text-xs text-neutral-500">{p.tech.join(" · ")}</p>
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
                  <span className="text-sm font-medium text-neutral-800">{s.name}</span>
                  <StarRating level={s.level} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm">{data.skills.join(" · ")}</p>
          )}
        </Section>
      )}

      {data.education.length > 0 && (
        <Section title={l.education}>
          <div className="space-y-1.5">
            {data.education.map((e, i) => (
              <div key={i} className="flex items-baseline justify-between text-sm">
                <span>
                  <span className="font-semibold">{e.degree}</span> · {e.institution}
                </span>
                <span className="text-xs text-neutral-500">{e.year}</span>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
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
  const rtl = isRTL(data);
  const l = labels(rtl);
  return (
    <div
      dir={rtl ? "rtl" : "ltr"}
      className="bg-white text-[#111]"
      style={{ minHeight: "1122px", fontFamily: "Georgia, serif", display: "flex", flexDirection: "column", width: "100%" }}
    >
      <div className="grid grid-cols-3 rtl:[direction:rtl]" style={{ flex: 1, minHeight: "1122px" }}>
        <aside className="col-span-1 bg-neutral-900 p-8 text-neutral-100">
          <div>
            <h1 className="text-2xl font-bold leading-tight">{data.name}</h1>
            <p className="mt-1 text-sm italic text-neutral-300">{data.title}</p>
            <div className="mt-6 space-y-1 text-xs text-neutral-300">
              {data.location && <div>{data.location}</div>}
              {data.email && <div>{data.email}</div>}
              {data.phone && <div>{data.phone}</div>}
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
                      <span className="text-sm font-medium">{s.name}</span>
                      <BarRating level={s.level} />
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-1 text-sm">
                  {data.skills.map((s, i) => (
                    <li key={i}>{s}</li>
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
                  <div className="font-semibold">{e.degree}</div>
                  <div className="text-neutral-400">{e.institution}, {e.year}</div>
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
                  <li key={i}>{c}</li>
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
            <p className="text-sm leading-relaxed">{data.summary}</p>
          </section>

          {data.experience.length > 0 && (
            <section className="mt-6">
              <h2 className="mb-3 border-b border-neutral-300 pb-1 text-xs font-bold uppercase tracking-[0.2em] rtl:tracking-normal text-neutral-700">
                {l.experience}
              </h2>
              <div className="space-y-4">
                {data.experience.map((e, i) => (
                  <div key={i}>
                    <div className="text-base font-bold">{e.title}</div>
                    <div className="text-sm italic text-neutral-600">
                      {e.company} · {e.duration}
                    </div>
                    {e.description && (
                      <p className="mt-1 text-sm text-neutral-800">{e.description}</p>
                    )}
                    <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm rtl:pl-0 rtl:pr-5">
                      {e.achievements.map((a, j) => (
                        <li key={j}>{a}</li>
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
                    <div className="font-bold">{p.name}</div>
                    <p className="text-sm">{p.description}</p>
                    {p.impact && (
                      <p className="text-xs italic text-neutral-600">{l.impact}: {p.impact}</p>
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
}: {
  data: ResumeData;
  template: TemplateId;
  design?: DesignSettings;
  onFieldFocus?: (path: string) => void;
}) {
  const rtl = isRTL(data);
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
