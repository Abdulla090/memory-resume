import type { ResumeData, TemplateId } from "@/lib/types";

export function MinimalTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-12 text-[#111] font-sans" style={{ minHeight: "1100px" }}>
      <header className="border-b border-neutral-300 pb-4">
        <h1 className="text-3xl font-semibold tracking-tight">{data.name}</h1>
        <p className="mt-1 text-base text-neutral-700">{data.title}</p>
        <p className="mt-2 text-xs text-neutral-500">
          {[data.location, data.email, data.phone].filter(Boolean).join(" · ")}
        </p>
      </header>

      <Section title="Summary">
        <p className="text-sm leading-relaxed">{data.summary}</p>
      </Section>

      {data.experience.length > 0 && (
        <Section title="Experience">
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
                <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm">
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
        <Section title="Projects">
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

      {data.skills.length > 0 && (
        <Section title="Skills">
          <p className="text-sm">{data.skills.join(" · ")}</p>
        </Section>
      )}

      {data.education.length > 0 && (
        <Section title="Education">
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
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function ExecutiveTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      className="bg-white text-[#111]"
      style={{ minHeight: "1100px", fontFamily: "Georgia, serif" }}
    >
      <div className="grid grid-cols-3">
        <aside className="col-span-1 bg-neutral-900 p-8 text-neutral-100">
          <h1 className="text-2xl font-bold leading-tight">{data.name}</h1>
          <p className="mt-1 text-sm italic text-neutral-300">{data.title}</p>
          <div className="mt-6 space-y-1 text-xs text-neutral-300">
            {data.location && <div>{data.location}</div>}
            {data.email && <div>{data.email}</div>}
            {data.phone && <div>{data.phone}</div>}
          </div>

          {data.skills.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                Expertise
              </h3>
              <ul className="space-y-1 text-sm">
                {data.skills.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {data.education.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                Education
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
              <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                Certifications
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
            <h2 className="mb-2 border-b border-neutral-300 pb-1 text-xs font-bold uppercase tracking-[0.2em] text-neutral-700">
              Profile
            </h2>
            <p className="text-sm leading-relaxed">{data.summary}</p>
          </section>

          {data.experience.length > 0 && (
            <section className="mt-6">
              <h2 className="mb-3 border-b border-neutral-300 pb-1 text-xs font-bold uppercase tracking-[0.2em] text-neutral-700">
                Experience
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
                    <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm">
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
              <h2 className="mb-3 border-b border-neutral-300 pb-1 text-xs font-bold uppercase tracking-[0.2em] text-neutral-700">
                Selected Projects
              </h2>
              <div className="space-y-2.5">
                {data.projects.map((p, i) => (
                  <div key={i}>
                    <div className="font-bold">{p.name}</div>
                    <p className="text-sm">{p.description}</p>
                    {p.impact && (
                      <p className="text-xs italic text-neutral-600">Impact: {p.impact}</p>
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

export function ResumePreview({
  data,
  template,
}: {
  data: ResumeData;
  template: TemplateId;
}) {
  if (template === "executive") return <ExecutiveTemplate data={data} />;
  return <MinimalTemplate data={data} />;
}
