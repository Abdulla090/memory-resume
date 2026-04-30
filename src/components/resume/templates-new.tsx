import type { ReactNode } from "react";
import { StarRating, BarRating } from "./templates";
import { Phone, Mail, Globe, MapPin } from "lucide-react";
import type { ResumeData } from "@/lib/types";
import { optimizeResumeForOnePage } from "@/lib/resume-utils";

const rtlPattern = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/;

function isRTL(data: ResumeData) {
  return rtlPattern.test(
    [
      data.name,
      data.title,
      data.location,
      data.summary,
      ...data.skills,
      ...data.certifications,
      ...data.experience.flatMap((item) => [item.title, item.company, item.description, ...item.achievements]),
      ...data.projects.flatMap((item) => [item.name, item.description, item.impact, ...item.tech]),
      ...data.education.flatMap((item) => [item.degree, item.institution]),
    ].filter(Boolean).join(" "),
  );
}

function labels(rtl: boolean) {
  return rtl
    ? {
        profile: "پوختە",
        experience: "ئەزموون",
        projects: "پرۆژەکان",
        skills: "لێهاتووییەکان",
        education: "خوێندن",
        certifications: "بڕوانامەکان",
        contact: "پەیوەندی",
        selected: "دیاریکراو",
      }
    : {
        profile: "Profile",
        experience: "Experience",
        projects: "Selected Projects",
        skills: "Skills",
        education: "Education",
        certifications: "Certifications",
        contact: "Contact",
        selected: "Selected",
      };
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function PhotoBlock({ data, shape = "rounded" }: { data: ResumeData; shape?: "rounded" | "circle" | "arch" }) {
  const radius = shape === "circle" ? "rounded-full" : shape === "arch" ? "rounded-t-full rounded-b-2xl" : "rounded-[1.4rem]";

  return (
    <div className={`h-28 w-28 shrink-0 overflow-hidden border border-slate-200 bg-slate-100 ${radius}`}>
      {data.photoUrl ? (
        <img src={data.photoUrl} alt={data.name} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-2xl font-black tracking-tight rtl:tracking-normal text-slate-500">
          {initials(data.name)}
        </div>
      )}
    </div>
  );
}

function Section({
  title,
  children,
  accent = "border-slate-900 text-slate-950",
}: {
  title: string;
  children: ReactNode;
  accent?: string;
}) {
  return (
    <section className="break-inside-avoid">
      <h2 className={`mb-3 border-b pb-2 text-[10px] font-black uppercase tracking-[0.22em] rtl:tracking-normal ${accent}`}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function ContactLines({ data }: { data: ResumeData }) {
  return (
    <div className="space-y-1 text-[11px] font-semibold leading-5 text-slate-500">
      {[data.location, data.email, data.phone].filter(Boolean).map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
}

function ExperienceList({ data, marker = "dot" }: { data: ResumeData; marker?: "dot" | "rule" | "index" }) {
  return (
    <div className="space-y-5">
      {data.experience.map((item, index) => (
        <article key={`${item.company}-${index}`} className={marker === "rule" ? "border-l-2 border-slate-200 pl-4 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4" : ""}>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-[14px] font-extrabold leading-tight text-slate-950">{item.title}</h3>
              <p className="mt-1 text-[12px] font-bold text-slate-600">{item.company}</p>
            </div>
            <div className="shrink-0 text-[10px] font-black uppercase tracking-[0.12em] rtl:tracking-normal text-slate-400">{item.duration}</div>
          </div>
          {item.description && <p className="mt-2 text-[11px] leading-5 text-slate-600">{item.description}</p>}
          <ul className="mt-2 space-y-1.5">
            {item.achievements.map((achievement, achievementIndex) => (
              <li key={achievementIndex} className="grid grid-cols-[14px_1fr] gap-2 text-[11px] leading-5 text-slate-700 ">
                {marker === "index" ? (
                  <span className="text-[9px] font-black text-slate-400">{String(achievementIndex + 1).padStart(2, "0")}</span>
                ) : (
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-slate-950" />
                )}
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function NewSleekTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const l = labels(rtl);

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="bg-white p-10 font-sans text-slate-950" style={{ minHeight: "1122px", width: "100%" }}>
      <header className="grid grid-cols-[1fr_auto] items-start gap-8 border-b border-slate-200 pb-8 ">
        <div>
          <div className="mb-5 h-1.5 w-24 rounded-full bg-slate-950" />
          <h1 className="max-w-[12ch] text-5xl font-black leading-[0.94] tracking-tight rtl:tracking-normal text-slate-950">{c.name}</h1>
          <p className="mt-4 text-sm font-black uppercase tracking-[0.28em] rtl:tracking-normal text-slate-500">{c.title}</p>
        </div>
        <div className="flex flex-col items-end gap-5 rtl:items-start">
          <PhotoBlock data={c} />
          <ContactLines data={c} />
        </div>
      </header>

      <div className="grid grid-cols-[1fr_260px] gap-10 pt-8 ">
        <main className="space-y-7">
          <Section title={l.profile}>
            <p className="text-[13px] leading-7 text-slate-700">{c.summary}</p>
          </Section>
          {c.experience.length > 0 && (
            <Section title={l.experience}>
              <ExperienceList data={c} marker="index" />
            </Section>
          )}
          {c.projects.length > 0 && (
            <Section title={l.projects}>
              <div className="space-y-4">
                {c.projects.map((project, index) => (
                  <article key={`${project.name}-${index}`}>
                    <h3 className="text-[13px] font-extrabold text-slate-950">{project.name}</h3>
                    <p className="mt-1 text-[11px] leading-5 text-slate-600">{project.description}</p>
                    {project.tech.length > 0 && <p className="mt-1 text-[10px] font-black uppercase tracking-[0.16em] rtl:tracking-normal text-slate-400">{project.tech.join(" / ")}</p>}
                  </article>
                ))}
              </div>
            </Section>
          )}
        </main>

        <aside className="space-y-7 border-l border-slate-200 pl-7 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-7">
          {(c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
            <Section title={l.skills}>
              {c.skillItems && c.skillItems.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {c.skillItems.map((s, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-[0.1em] rtl:tracking-normal text-slate-700">{s.name}</span>
                      <BarRating level={s.level} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {c.skills.map((skill) => (
                    <span key={skill} className="rounded-full border border-slate-200 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] rtl:tracking-normal text-slate-700">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </Section>
          )}
          {c.education.length > 0 && (
            <Section title={l.education}>
              <div className="space-y-4">
                {c.education.map((item, index) => (
                  <div key={`${item.institution}-${index}`}>
                    <div className="text-[12px] font-extrabold leading-5 text-slate-950">{item.degree}</div>
                    <div className="mt-1 text-[11px] font-semibold text-slate-500">{item.institution}</div>
                    <div className="mt-1 text-[10px] font-black text-slate-400">{item.year}</div>
                  </div>
                ))}
              </div>
            </Section>
          )}
          {c.certifications.length > 0 && (
            <Section title={l.certifications}>
              <div className="space-y-2 text-[11px] font-semibold leading-5 text-slate-600">
                {c.certifications.map((item) => <div key={item}>{item}</div>)}
              </div>
            </Section>
          )}
        </aside>
      </div>
    </div>
  );
}

export function NewProfessionalTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const l = labels(rtl);

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="bg-[#fbfcfd] p-8 font-sans text-slate-950" style={{ minHeight: "1122px", width: "100%" }}>
      <div className="grid min-h-[1058px] grid-cols-[230px_1fr] overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_70px_-45px_rgba(15,23,42,0.55)] ">
        <aside className="bg-slate-950 p-7 text-white ">
          <PhotoBlock data={c} shape="circle" />
          <h1 className="mt-7 text-3xl font-black leading-[1] tracking-tight rtl:tracking-normal">{c.name}</h1>
          <p className="mt-3 text-[11px] font-black uppercase leading-5 tracking-[0.2em] rtl:tracking-normal text-cyan-200">{c.title}</p>
          <div className="mt-8">
            <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] rtl:tracking-normal text-slate-400">{l.contact}</h2>
            <div className="space-y-2 text-[11px] font-semibold leading-5 text-slate-300">
              {[c.location, c.email, c.phone].filter(Boolean).map((item) => <div key={item}>{item}</div>)}
            </div>
          </div>
          {(c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
            <div className="mt-8">
              <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] rtl:tracking-normal text-slate-400">{l.skills}</h2>
              {c.skillItems && c.skillItems.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {c.skillItems.map((s, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[11px] font-bold text-slate-100 mb-1">{s.name}</span>
                      <div className="flex gap-1 rtl:flex-row-reverse">
                        {Array.from({ length: 5 }).map((_, dot) => (
                          <span key={dot} className={`h-2 w-2 rounded-full ${dot < s.level ? "bg-white" : "bg-white/20"}`} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {c.skills.map((skill) => (
                    <div key={skill} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-bold text-slate-100">{skill}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </aside>

        <main className="space-y-7 p-9 ">
          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] rtl:tracking-normal text-cyan-700">{l.profile}</h2>
            <p className="text-[13px] leading-7 text-slate-700">{c.summary}</p>
          </section>
          {c.experience.length > 0 && (
            <Section title={l.experience} accent="border-cyan-700 text-cyan-800">
              <ExperienceList data={c} marker="rule" />
            </Section>
          )}
          <div className="grid grid-cols-2 gap-7">
            {c.projects.length > 0 && (
              <Section title={l.projects} accent="border-cyan-700 text-cyan-800">
                <div className="space-y-4">
                  {c.projects.map((project, index) => (
                    <article key={`${project.name}-${index}`}>
                      <h3 className="text-[12px] font-extrabold text-slate-950">{project.name}</h3>
                      <p className="mt-1 text-[11px] leading-5 text-slate-600">{project.description}</p>
                    </article>
                  ))}
                </div>
              </Section>
            )}
            {c.education.length > 0 && (
              <Section title={l.education} accent="border-cyan-700 text-cyan-800">
                <div className="space-y-4">
                  {c.education.map((item, index) => (
                    <div key={`${item.institution}-${index}`}>
                      <div className="text-[12px] font-extrabold text-slate-950">{item.degree}</div>
                      <div className="mt-1 text-[11px] text-slate-600">{item.institution} · {item.year}</div>
                    </div>
                  ))}
                </div>
              </Section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export function NewAcademicTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const l = labels(rtl);

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="bg-white p-11 font-serif text-slate-950" style={{ minHeight: "1122px", width: "100%" }}>
      <header className="grid grid-cols-[120px_1fr] gap-8 border-b-2 border-slate-950 pb-7 ">
        <PhotoBlock data={c} shape="arch" />
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] rtl:tracking-normal text-slate-500">{l.selected} Curriculum Vitae</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight rtl:tracking-normal">{c.name}</h1>
          <p className="mt-2 text-[15px] font-semibold text-slate-700">{c.title}</p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[11px] font-semibold text-slate-500">
            {[c.location, c.email, c.phone].filter(Boolean).map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-[1fr_235px] gap-10 pt-7 ">
        <main className="space-y-7">
          <Section title={l.profile} accent="border-slate-950 text-slate-950">
            <p className="text-[13px] leading-7 text-slate-700">{c.summary}</p>
          </Section>
          {c.experience.length > 0 && (
            <Section title={l.experience} accent="border-slate-950 text-slate-950">
              <ExperienceList data={c} marker="dot" />
            </Section>
          )}
          {c.projects.length > 0 && (
            <Section title={l.projects} accent="border-slate-950 text-slate-950">
              <div className="space-y-4">
                {c.projects.map((project, index) => (
                  <article key={`${project.name}-${index}`}>
                    <h3 className="text-[13px] font-bold text-slate-950">{project.name}</h3>
                    <p className="mt-1 text-[11px] leading-5 text-slate-700">{project.description}</p>
                    {project.impact && <p className="mt-1 text-[11px] italic text-slate-500">{project.impact}</p>}
                  </article>
                ))}
              </div>
            </Section>
          )}
        </main>

        <aside className="space-y-7">
          {c.education.length > 0 && (
            <Section title={l.education} accent="border-slate-950 text-slate-950">
              <div className="space-y-4">
                {c.education.map((item, index) => (
                  <div key={`${item.institution}-${index}`}>
                    <div className="text-[12px] font-bold leading-5">{item.degree}</div>
                    <div className="mt-1 text-[11px] text-slate-600">{item.institution}</div>
                    <div className="mt-1 text-[10px] font-bold text-slate-400">{item.year}</div>
                  </div>
                ))}
              </div>
            </Section>
          )}
          {(c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
            <Section title={l.skills} accent="border-slate-950 text-slate-950">
              {c.skillItems && c.skillItems.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {c.skillItems.map((s, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[11px] font-semibold text-slate-700">{s.name}</span>
                      <BarRating level={s.level} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] font-semibold leading-6 text-slate-700">{c.skills.join(" · ")}</p>
              )}
            </Section>
          )}
          {c.certifications.length > 0 && (
            <Section title={l.certifications} accent="border-slate-950 text-slate-950">
              <div className="space-y-2 text-[11px] leading-5 text-slate-700">
                {c.certifications.map((item) => <div key={item}>{item}</div>)}
              </div>
            </Section>
          )}
        </aside>
      </div>
    </div>
  );
}

function skillLevel(data: ResumeData, skill: string, index: number) {
  return `${Math.max(28, Math.min(100, (skillRating(data, skill, index) / 5) * 100))}%`;
}

function skillRating(data: ResumeData, skill: string, index: number) {
  const explicit = data.skillItems?.find((item) => item.name === skill)?.level;
  return Math.max(1, Math.min(5, explicit ?? ((index % 4) + 2)));
}

export function RefTorresTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const l = labels(rtl);
  const sideItems = [c.location, c.email, c.phone].filter(Boolean);

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="relative overflow-hidden bg-white font-sans text-[#1d3f59]" style={{ minHeight: "1122px", width: "100%" }}>
      <div className="h-[168px] bg-[#315b74]">
        <div className="h-full w-full opacity-20" style={{ backgroundImage: "linear-gradient(135deg, transparent 0 46%, rgba(255,255,255,.35) 46% 47%, transparent 47% 100%)", backgroundSize: "28px 28px" }} />
      </div>
      <div className="grid grid-cols-[308px_1fr] ">
        <aside className="relative min-h-[954px] bg-[#f3f3f3] px-12 pb-10 pt-32 ">
          <div className="absolute -top-[105px] left-1/2 h-[220px] w-[220px] -translate-x-1/2 overflow-hidden rounded-full border-[5px] border-[#d8e2e9] bg-slate-200">
            {c.photoUrl ? <img src={c.photoUrl} alt={c.name} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-5xl font-black text-slate-500">{initials(c.name)}</div>}
          </div>
          <h1 className="mt-3 text-[42px] font-light uppercase leading-[1.02] tracking-[0.08em] rtl:tracking-normal text-[#1e405a]">
            {c.name.split(/\s+/).slice(0, 1).join(" ")}<br />
            <span className="font-black">{c.name.split(/\s+/).slice(1).join(" ") || c.name}</span>
          </h1>
          <p className="mt-3 border-b border-[#b8c5ce] pb-4 text-[15px] font-semibold uppercase tracking-[0.09em] rtl:tracking-normal text-neutral-800">{c.title}</p>

          <section className="mt-9">
            <h2 className="mb-5 text-[18px] font-black uppercase tracking-[0.2em] rtl:tracking-normal text-[#1d3f59]">{l.contact}</h2>
            <div className="space-y-3 text-[12px] font-semibold leading-5 text-neutral-700">
              {sideItems.map((item) => <div key={item}>{item}</div>)}
            </div>
          </section>

          {(c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
            <section className="mt-10">
              <h2 className="mb-5 text-[18px] font-black uppercase tracking-[0.2em] rtl:tracking-normal text-[#1d3f59]">{l.skills}</h2>
              {c.skillItems && c.skillItems.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {c.skillItems.map((s, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[13px] font-medium text-neutral-800">{s.name}</span>
                      <BarRating level={s.level} />
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="list-disc space-y-3 pl-5 text-[13px] font-medium text-neutral-800 rtl:pl-0 rtl:pr-5">
                  {c.skills.slice(0, 7).map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              )}
            </section>
          )}

          {c.certifications.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-5 text-[18px] font-black uppercase tracking-[0.2em] rtl:tracking-normal text-[#1d3f59]">{l.certifications}</h2>
              <ul className="list-disc space-y-3 pl-5 text-[13px] font-medium text-neutral-800 rtl:pl-0 rtl:pr-5">
                {c.certifications.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          )}
        </aside>

        <main className="px-11 pb-10 pt-7 text-neutral-800 ">
          <Section title={l.profile} accent="border-[#b8c5ce] text-[#1d3f59]">
            <p className="text-[12px] leading-5">{c.summary}</p>
          </Section>
          {c.experience.length > 0 && (
            <section className="mt-7">
              <h2 className="mb-4 border-b border-[#b8c5ce] pb-2 text-[18px] font-black uppercase tracking-[0.18em] rtl:tracking-normal text-[#1d3f59]">{l.experience}</h2>
              <div className="space-y-5">
                {c.experience.slice(0, 4).map((item, index) => (
                  <article key={`${item.company}-${index}`}>
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <h3 className="text-[14px] font-black leading-tight">{item.title}</h3>
                        <p className="text-[12px] font-bold text-neutral-600">{item.company}</p>
                      </div>
                      <p className="shrink-0 text-[12px] text-neutral-600">{item.duration}</p>
                    </div>
                    <p className="mt-1 text-[11px] leading-5 text-neutral-700">{item.description || item.achievements[0]}</p>
                  </article>
                ))}
              </div>
            </section>
          )}
          {c.education.length > 0 && (
            <section className="mt-7">
              <h2 className="mb-4 border-b border-[#b8c5ce] pb-2 text-[18px] font-black uppercase tracking-[0.18em] rtl:tracking-normal text-[#1d3f59]">{l.education}</h2>
              <div className="space-y-3">
                {c.education.map((item, index) => (
                  <div key={`${item.institution}-${index}`} className="flex justify-between gap-5 text-[12px]">
                    <div><div className="font-black">{item.institution}</div><div>{item.degree}</div></div>
                    <div className="text-neutral-600">{item.year}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
          {c.projects.length > 0 && (
            <section className="mt-7">
              <h2 className="mb-4 border-b border-[#b8c5ce] pb-2 text-[18px] font-black uppercase tracking-[0.18em] rtl:tracking-normal text-[#1d3f59]">{l.projects}</h2>
              <div className="grid grid-cols-2 gap-6">
                {c.projects.map((project) => (
                  <div key={project.name}>
                    <h3 className="text-[13px] font-black">{project.name}</h3>
                    <p className="mt-1 text-[11px] leading-5">{project.description}</p>
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

export function RefSilvaTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const l = labels(rtl);

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="bg-white font-sans text-[#1f1b18]" style={{ minHeight: "1122px", width: "100%" }}>
      <header className="flex h-[190px] items-center gap-11 bg-[#342820] px-12 text-white rtl:flex-row-reverse">
        <div className="h-[135px] w-[135px] overflow-hidden rounded-full bg-stone-200">
          {c.photoUrl ? <img src={c.photoUrl} alt={c.name} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-4xl font-black text-stone-500">{initials(c.name)}</div>}
        </div>
        <div className="border-l-[7px] border-white pl-8 rtl:border-l-0 rtl:border-r-[7px] rtl:pl-0 rtl:pr-8">
          <h1 className="text-[45px] font-black leading-none tracking-tight rtl:tracking-normal">{c.name}</h1>
          <p className="mt-2 text-[23px] font-bold">{c.title}</p>
        </div>
      </header>

      <div className="grid grid-cols-[230px_1fr] ">
        <aside className="min-h-[932px] bg-[#fff0e3] px-8 py-9 ">
          <Section title={l.contact} accent="border-transparent text-[#1f1b18]">
            <div className="space-y-4 text-[12px] leading-5">
              {[c.phone, c.email, c.location].filter(Boolean).map((item) => <p key={item}>{item}</p>)}
            </div>
          </Section>
          {c.education.length > 0 && (
            <section className="mt-9">
              <h2 className="mb-5 text-[22px] font-normal">{l.education}</h2>
              <div className="space-y-7">
                {c.education.map((item, index) => (
                  <div key={`${item.institution}-${index}`} className="text-[13px] leading-5">
                    <div className="font-medium uppercase">{item.degree}</div>
                    <div className="italic">{item.institution}</div>
                    <div>{item.year}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
          {(c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
            <section className="mt-10">
              <h2 className="mb-5 text-[22px] font-normal">{l.skills}</h2>
              {c.skillItems && c.skillItems.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {c.skillItems.map((s, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[13px] font-medium">{s.name}</span>
                      <BarRating level={s.level} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-5 text-[13px]">
                  {c.skills.slice(0, 8).map((skill) => <p key={skill}>{skill}</p>)}
                </div>
              )}
            </section>
          )}
        </aside>

        <main className="px-8 py-9 ">
          <section>
            <h2 className="mb-5 text-[23px] font-normal">{rtl ? "پوختە" : "Summary"}</h2>
            <ul className="list-disc space-y-1.5 pl-5 text-[12px] leading-5 rtl:pl-0 rtl:pr-5">
              {(c.summary.match(/[^.!?]+[.!?]*/g) ?? [c.summary]).slice(0, 4).map((line, index) => <li key={index}>{line.trim()}</li>)}
            </ul>
          </section>
          {c.experience.length > 0 && (
            <section className="mt-9">
              <h2 className="mb-5 text-[23px] font-normal">{rtl ? "ئەزموونەکان" : "Experiences"}</h2>
              <div className="space-y-8">
                {c.experience.slice(0, 3).map((item, index) => (
                  <article key={`${item.company}-${index}`}>
                    <h3 className="text-[14px] font-medium uppercase">{item.title}</h3>
                    <p className="text-[12px]">{item.company} / {item.duration}</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-[12px] leading-5 rtl:pl-0 rtl:pr-5">
                      {(item.achievements.length ? item.achievements : [item.description]).slice(0, 3).map((achievement, achievementIndex) => <li key={achievementIndex}>{achievement}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          )}
          {c.projects.length > 0 && (
            <section className="mt-9">
              <h2 className="mb-5 text-[23px] font-normal">{rtl ? "خەڵات و پرۆژەکان" : "Awards"}</h2>
              <div className="space-y-5 text-[13px]">
                {c.projects.map((project) => (
                  <div key={project.name}>
                    <h3 className="font-medium uppercase">{project.name}</h3>
                    <p className="mt-1">{project.impact || project.description}</p>
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

export function RefSchumacherTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const l = labels(rtl);
  const contact = [c.location, c.email, c.phone].filter(Boolean);

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="border-[4px] border-[#7c3cff] bg-white px-[80px] py-[84px] font-sans text-[#161616]" style={{ minHeight: "1122px", width: "100%" }}>
      <header className="grid grid-cols-[230px_1fr_1fr] gap-14 ">
        <h1 className="text-[42px] font-black leading-[0.86] tracking-tight rtl:tracking-normal">{c.name.split(/\s+/).slice(0, 1).join(" ")}<br />{c.name.split(/\s+/).slice(1).join(" ") || c.name}</h1>
        {contact.slice(0, 2).map((item) => (
          <div key={item} className="pt-7 text-[13px] font-bold leading-4">
            <div className="mb-3 h-[2px] w-8 bg-neutral-400" />
            {item}
          </div>
        ))}
      </header>

      <div className="mt-12 grid grid-cols-[230px_1fr] gap-14 ">
        <aside className="space-y-9 ">
          <section>
            <h2 className="mb-4 text-[22px] font-black leading-none">{l.profile}</h2>
            <p className="text-[12px] font-semibold leading-[1.15]">{c.summary}</p>
          </section>
          {c.education.length > 0 && (
            <section>
              <h2 className="mb-5 text-[22px] font-black leading-none">{l.education}</h2>
              <div className="space-y-4">
                {c.education.map((item, index) => (
                  <div key={`${item.institution}-${index}`} className="text-[12px] font-semibold leading-[1.15]">
                    <div>{item.degree}</div>
                    <div>{item.institution}</div>
                    <div>{item.year}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
          {c.certifications.length > 0 && (
            <section>
              <h2 className="mb-5 text-[22px] font-black leading-none">{l.certifications}</h2>
              <div className="space-y-4 text-[12px] font-semibold leading-[1.15]">
                {c.certifications.map((item) => <p key={item}>{item}</p>)}
              </div>
            </section>
          )}
        </aside>

        <main className="">
          {(c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
            <section>
              <h2 className="mb-5 text-[22px] font-black leading-none">{rtl ? "لێهاتووییە سەرەکییەکان" : "Core Skills"}</h2>
              <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                {c.skillItems && c.skillItems.length > 0 ? (
                  c.skillItems.slice(0, 8).map((s, index) => (
                    <div key={s.name}>
                      <p className="mb-1 text-[13px] font-semibold leading-4">{s.name}</p>
                      <div className="h-[18px] bg-neutral-300">
                        <div className="h-full bg-[#ff8a22] rtl:mr-auto" style={{ width: `${s.level * 20}%` }} />
                      </div>
                    </div>
                  ))
                ) : (
                  c.skills.slice(0, 8).map((skill, index) => (
                    <div key={skill}>
                      <p className="mb-1 text-[13px] font-semibold leading-4">{skill}</p>
                      <div className="h-[18px] bg-neutral-300">
                        <div className="h-full bg-[#ff8a22] rtl:mr-auto" style={{ width: skillLevel(c, skill, index) }} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          )}
          {c.experience.length > 0 && (
            <section className="mt-9">
              <h2 className="mb-5 text-[22px] font-black leading-none">{l.experience}</h2>
              <div className="space-y-6">
                {c.experience.slice(0, 3).map((item, index) => (
                  <article key={`${item.company}-${index}`} className="relative pl-6 rtl:pl-0 rtl:pr-6">
                    <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full bg-[#f58213] rtl:left-auto rtl:right-0" />
                    <h3 className="text-[13px] font-black leading-4">{item.title}</h3>
                    <p className="text-[12px] font-black leading-4">{item.company}</p>
                    <p className="text-[12px] font-black leading-4">{item.duration}</p>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-[11px] font-semibold leading-[1.15] rtl:pl-0 rtl:pr-5">
                      {(item.achievements.length ? item.achievements : [item.description]).slice(0, 4).map((achievement, achievementIndex) => <li key={achievementIndex}>{achievement}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export function RefPalmerstonTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const l = labels(rtl);
  const contacts = [c.phone, c.email, c.location].filter(Boolean);

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="bg-white font-sans text-[#121923]" style={{ minHeight: "1122px", width: "100%" }}>
      <header className="relative h-[326px] bg-white">
        <div className="absolute left-0 top-0 h-[230px] w-[280px] rounded-br-[52px] bg-[#303b4e] rtl:left-auto rtl:right-0 rtl:rounded-bl-[52px] rtl:rounded-br-none">
          <div className="absolute left-[58px] top-[30px] h-[138px] w-[138px] overflow-hidden rounded-full border-[6px] border-[#b7b2ad] bg-slate-200 rtl:left-auto rtl:right-[58px]">
            {c.photoUrl ? <img src={c.photoUrl} alt={c.name} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-4xl font-black text-slate-500">{initials(c.name)}</div>}
          </div>
        </div>
        <div className="ml-[325px] pt-[66px] rtl:ml-0 rtl:mr-[325px]">
          <h1 className="max-w-[420px] text-[43px] font-black uppercase leading-[1.03] tracking-[0.02em] rtl:tracking-normal text-[#223a59]">{c.name}</h1>
          <p className="mt-3 text-[17px] uppercase tracking-[0.22em] rtl:tracking-normal text-[#223a59]">{c.title}</p>
        </div>
        <div className="absolute bottom-[22px] left-[22px] right-[16px] flex h-[55px] items-center justify-around gap-4 rounded-full bg-[#303b4e] px-7 text-[11px] font-bold text-white">
          {contacts.slice(0, 4).map((item, index) => (
            <div key={item} className="flex min-w-0 items-center gap-2">
              <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-white/15 text-[9px]">{["P", "M", "L", "W"][index]}</span>
              <span className="truncate">{item}</span>
            </div>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-[285px_1fr] ">
        <aside className="min-h-[796px] bg-[#303b4e] px-12 py-12 text-white ">
          {c.education.length > 0 && (
            <section>
              <h2 className="mb-4 border-b border-white/50 pb-2 text-[22px] font-black tracking-[0.12em] rtl:tracking-normal">{l.education}</h2>
              <div className="space-y-4">
                {c.education.slice(0, 3).map((item, index) => (
                  <div key={`${item.institution}-${index}`} className="text-[12px] leading-5">
                    <div className="font-black">{item.degree}</div>
                    <div className="font-semibold">{item.institution}</div>
                    <div>{item.year}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
          {c.certifications.length > 0 && (
            <section className="mt-8">
              <h2 className="mb-4 border-b border-white/50 pb-2 text-[22px] font-black tracking-[0.12em] rtl:tracking-normal">{l.certifications}</h2>
              <ul className="list-disc space-y-2 pl-4 text-[12px] font-semibold leading-5 rtl:pl-0 rtl:pr-4">
                {c.certifications.slice(0, 3).map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          )}
          {(c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
            <section className="mt-8">
              <h2 className="mb-4 border-b border-white/50 pb-2 text-[22px] font-black tracking-[0.12em] rtl:tracking-normal">{l.skills}</h2>
              <div className="space-y-3">
                {c.skillItems && c.skillItems.length > 0 ? (
                  c.skillItems.slice(0, 7).map((s, index) => (
                    <div key={s.name}>
                      <div className="text-[12px] font-bold">{s.name}</div>
                      <div className="mt-1 h-[5px] bg-white/25">
                        <div className="h-full bg-white rtl:mr-auto" style={{ width: `${s.level * 20}%` }} />
                      </div>
                    </div>
                  ))
                ) : (
                  c.skills.slice(0, 7).map((skill, index) => (
                    <div key={skill}>
                      <div className="text-[12px] font-bold">{skill}</div>
                      <div className="mt-1 h-[5px] bg-white/25">
                        <div className="h-full bg-white rtl:mr-auto" style={{ width: skillLevel(c, skill, index) }} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          )}
          <section className="mt-8">
            <h2 className="mb-4 border-b border-white/50 pb-2 text-[22px] font-black tracking-[0.12em] rtl:tracking-normal">{rtl ? "زمان" : "Language"}</h2>
            <div className="space-y-2 text-[12px] font-semibold">
              {(rtl ? ["کوردی", "ئینگلیزی"] : ["English", "Kurdish"]).map((item) => <p key={item}>{item}</p>)}
            </div>
          </section>
        </aside>

        <main className="px-10 py-12 ">
          <Section title={rtl ? "دەربارەی من" : "About me"} accent="border-[#9aa3ad] text-[#1f3148]">
            <p className="text-[12px] leading-5">{c.summary}</p>
          </Section>
          {c.experience.length > 0 && (
            <section className="mt-7">
              <h2 className="mb-4 border-b border-[#9aa3ad] pb-2 text-[20px] font-black tracking-[0.18em] rtl:tracking-normal text-[#1f3148]">{l.experience}</h2>
              <div className="space-y-5">
                {c.experience.slice(0, 3).map((item, index) => (
                  <article key={`${item.company}-${index}`}>
                    <div className="flex justify-between gap-5">
                      <h3 className="text-[14px] font-black">{item.title}</h3>
                      <span className="shrink-0 text-[11px] font-semibold">{item.duration}</span>
                    </div>
                    <p className="text-[12px] font-bold">{item.company}</p>
                    <p className="mt-2 text-[11px] leading-5 text-neutral-700">{item.description || item.achievements[0]}</p>
                  </article>
                ))}
              </div>
            </section>
          )}
          {c.projects.length > 0 && (
            <section className="mt-7">
              <h2 className="mb-4 border-b border-[#9aa3ad] pb-2 text-[20px] font-black tracking-[0.18em] rtl:tracking-normal text-[#1f3148]">{rtl ? "سەرچاوە" : "Reference"}</h2>
              <div className="grid grid-cols-2 gap-8 text-[12px]">
                {c.projects.slice(0, 2).map((project) => (
                  <div key={project.name}>
                    <p className="font-bold">{project.name}</p>
                    <p className="mt-1 leading-5">{project.description}</p>
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

export function RefSanchezTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const l = labels(rtl);

  const TimelineSection = ({ title, icon, children }: { title: string; icon: string; children: ReactNode }) => (
    <section className="relative pl-16 rtl:pl-0 rtl:pr-16">
      <span className="absolute left-[17px] top-0 grid h-[140px] w-[1px] bg-[#99a1ab] rtl:left-auto rtl:right-[17px]" />
      <span className="absolute left-0 top-0 grid h-9 w-9 place-items-center rounded-full bg-[#303b4e] text-[12px] font-black text-white rtl:left-auto rtl:right-0">{icon}</span>
      <h2 className="mb-3 border-b border-[#7d8792] pb-2 text-[19px] font-black uppercase tracking-[0.17em] rtl:tracking-normal text-[#303b4e]">{title}</h2>
      {children}
    </section>
  );

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="bg-white font-sans text-[#263241]" style={{ minHeight: "1122px", width: "100%" }}>
      <header className="relative h-[185px] bg-[#303b4e] text-white">
        <div className="absolute left-[28px] top-[78px] z-10 h-[170px] w-[170px] overflow-hidden rounded-full border-[7px] border-white bg-slate-200 rtl:left-auto rtl:right-[28px]">
          {c.photoUrl ? <img src={c.photoUrl} alt={c.name} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-4xl font-black text-slate-500">{initials(c.name)}</div>}
        </div>
        <div className="pl-[315px] pt-[62px] rtl:pl-0 rtl:pr-[315px]">
          <h1 className="text-[38px] font-black uppercase leading-none">{c.name}</h1>
          <p className="mt-4 text-[18px] font-bold uppercase">{c.title}</p>
        </div>
      </header>

      <div className="grid grid-cols-[245px_1fr] ">
        <aside className="min-h-[937px] bg-[#e6e6e6] px-6 pb-9 pt-[120px] ">
          <section>
            <h2 className="mb-4 border-b-2 border-[#8c939a] pb-2 text-[18px] font-black uppercase tracking-[0.15em] rtl:tracking-normal">{l.contact}</h2>
            <div className="space-y-3 text-[12px] leading-5">
              {[c.phone, c.email, c.location].filter(Boolean).map((item) => <p key={item}>{item}</p>)}
            </div>
          </section>
          {(c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
            <section className="mt-9">
              <h2 className="mb-4 border-b-2 border-[#8c939a] pb-2 text-[18px] font-black uppercase tracking-[0.15em] rtl:tracking-normal">{l.skills}</h2>
              <div className="space-y-3">
                {c.skillItems && c.skillItems.length > 0 ? (
                  c.skillItems.slice(0, 7).map((s, index) => {
                    return (
                      <div key={s.name}>
                        <p className="text-[12px] font-semibold">{s.name}</p>
                        <div className="mt-1 flex gap-1.5 rtl:flex-row-reverse">
                          {Array.from({ length: 5 }).map((_, dot) => (
                            <span key={dot} className={`h-2 w-2 rounded-full ${dot < s.level ? "bg-[#303b4e]" : "bg-[#b8bdc3]"}`} />
                          ))}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  c.skills.slice(0, 7).map((skill, index) => {
                    const rating = skillRating(c, skill, index);
                    return (
                      <div key={skill}>
                        <p className="text-[12px] font-semibold">{skill}</p>
                        <div className="mt-1 flex gap-1.5 rtl:flex-row-reverse">
                          {Array.from({ length: 5 }).map((_, dot) => (
                            <span key={dot} className={`h-2 w-2 rounded-full ${dot < rating ? "bg-[#303b4e]" : "bg-[#b8bdc3]"}`} />
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>
          )}
          <section className="mt-9">
            <h2 className="mb-4 border-b-2 border-[#8c939a] pb-2 text-[18px] font-black uppercase tracking-[0.15em] rtl:tracking-normal">{rtl ? "زمانەکان" : "Languages"}</h2>
            <ul className="list-disc space-y-1 pl-4 text-[12px] rtl:pl-0 rtl:pr-4">
              {(rtl ? ["کوردی", "ئینگلیزی"] : ["English", "Kurdish"]).map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
          {c.projects.length > 0 && (
            <section className="mt-9">
              <h2 className="mb-4 border-b-2 border-[#8c939a] pb-2 text-[18px] font-black uppercase tracking-[0.15em] rtl:tracking-normal">{rtl ? "سەرچاوە" : "Reference"}</h2>
              <p className="text-[12px] font-bold">{c.projects[0].name}</p>
              <p className="mt-2 text-[11px] leading-5">{c.projects[0].description}</p>
            </section>
          )}
        </aside>

        <main className="space-y-9 px-11 py-12 ">
          <TimelineSection title={l.profile} icon="i">
            <p className="text-[12px] leading-5">{c.summary}</p>
          </TimelineSection>
          {c.experience.length > 0 && (
            <TimelineSection title={l.experience} icon="W">
              <div className="space-y-5">
                {c.experience.slice(0, 3).map((item, index) => (
                  <article key={`${item.company}-${index}`}>
                    <div className="flex justify-between gap-4">
                      <div>
                        <h3 className="text-[13px] font-black uppercase">{item.company}</h3>
                        <p className="text-[12px] font-semibold">{item.title}</p>
                      </div>
                      <span className="shrink-0 text-[11px] font-bold uppercase">{item.duration}</span>
                    </div>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-[11px] leading-5 rtl:pl-0 rtl:pr-5">
                      {(item.achievements.length ? item.achievements : [item.description]).slice(0, 3).map((achievement, achievementIndex) => <li key={achievementIndex}>{achievement}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
            </TimelineSection>
          )}
          {c.education.length > 0 && (
            <TimelineSection title={l.education} icon="E">
              <div className="space-y-4">
                {c.education.slice(0, 2).map((item, index) => (
                  <div key={`${item.institution}-${index}`} className="text-[12px] leading-5">
                    <div className="flex justify-between gap-4">
                      <p className="font-black">{item.degree}</p>
                      <p className="shrink-0 font-semibold">{item.year}</p>
                    </div>
                    <p>{item.institution}</p>
                  </div>
                ))}
              </div>
            </TimelineSection>
          )}
        </main>
      </div>
    </div>
  );
}

export function MercerTemplate({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL(c);
  const l = labels(rtl);

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="bg-[#305178] text-white px-6 py-2 rounded-full inline-block mb-4 text-lg font-black min-w-[200px]">
      {title}
    </div>
  );

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="bg-white font-sans text-slate-900" style={{ minHeight: "1122px", width: "100%", position: "relative", overflow: "hidden" }}>
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
          {(c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && (
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
           <div 
            className="absolute -left-[180px] top-10 w-64 h-64 rounded-full border-[12px] border-white overflow-hidden bg-slate-200 shadow-lg rtl:left-auto rtl:-right-[180px]"
           >
              {c.photoUrl ? (
                <img src={c.photoUrl} alt={c.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-6xl font-black text-slate-400">
                  {initials(c.name)}
                </div>
              )}
           </div>

           {/* Header Area */}
           <div className="ml-20 pt-4 rtl:ml-0 rtl:mr-20">
              <h1 className="text-6xl font-black text-[#305178] leading-[0.85] tracking-tighter rtl:tracking-normal uppercase w-fit">
                {c.name.split(/\s+/).map((word, idx) => (
                  <div key={idx}>{word}</div>
                ))}
              </h1>
              <p className="text-[20px] font-black text-slate-950 mt-4 tracking-widest uppercase">{c.title}</p>
           </div>

           <div className="mt-4">
             {/* About Me */}
             <section className="mb-10">
                <SectionHeader title={rtl ? "دەربارەی من" : "About Me"} />
                <p className="text-[13px] leading-relaxed text-slate-800 font-medium px-1">{c.summary}</p>
             </section>

             {/* Experience */}
             {c.experience.length > 0 && (
               <section className="mb-10">
                  <SectionHeader title={rtl ? "ئەزموونی کار" : "Experience Work"} />
                  <div className="space-y-6 px-1">
                    {c.experience.map((exp, i) => (
                      <div key={i} className="relative">
                         <div className="flex items-center gap-3 mb-1">
                            <div className="w-4 h-4 rounded-full bg-[#305178]" />
                            <h3 className="font-light tracking-wide uppercase text-[16px] text-slate-700">{exp.title}</h3>
                         </div>
                         <div className="font-black text-[13px] text-slate-900 ml-7 uppercase tracking-wider mb-2">
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
                <SectionHeader title={rtl ? "سەرچاوە" : "Reference"} />
                <div className="grid grid-cols-2 gap-10 px-1 mt-2">
                   <div>
                      <div className="font-bold text-[13px] text-slate-900">Juliana Silva</div>
                      <div className="text-[12px] text-slate-800 font-bold mt-0.5">Rimberio / CTO</div>
                      <div className="text-[12px] text-slate-600 mt-0.5 font-bold">+123-456-7890</div>
                   </div>
                   <div>
                      <div className="font-bold text-[13px] text-slate-900">Donna Stroupe</div>
                      <div className="text-[12px] text-slate-800 font-bold mt-0.5">Borcelle / CEO</div>
                      <div className="text-[12px] text-slate-600 mt-0.5 font-bold">+123-456-7890</div>
                   </div>
                </div>
             </section>
           </div>
        </main>
      </div>
    </div>
  );
}

