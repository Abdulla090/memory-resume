import type { ResumeData } from "@/lib/types";
import { StarRating, BarRating } from "./templates";
import { useLayoutRtl, label } from "./template-helpers";

export function NoirTemplate({ data }: { data: ResumeData }) {
  const rtl = useLayoutRtl(data);
  return (
    <div className="bg-[#0a0a0a] text-neutral-300 p-12 font-sans" style={{ minHeight: "1122px", width: "100%", display: "flex", flexDirection: "column" }}>
      <header className="border-b border-neutral-800 pb-6 text-center">
        <h1 className="text-4xl font-light tracking-[0.15em] rtl:tracking-normal text-white uppercase">{data.name}</h1>
        <p className="mt-2 text-sm tracking-[0.2em] rtl:tracking-normal text-neutral-500 uppercase">{data.title}</p>
        <p className="mt-4 text-xs text-neutral-600 tracking-widest rtl:tracking-normal uppercase">
          {[data.location, data.email, data.phone].filter(Boolean).join("  |  ")}
        </p>
      </header>

      <section className="mt-8 text-center max-w-2xl mx-auto">
        <p className="text-sm leading-relaxed text-neutral-400">{data.summary}</p>
      </section>

      <div className="mt-12 space-y-8">
        {data.experience.length > 0 && (
          <section>
            <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] rtl:tracking-normal text-neutral-600 border-b border-neutral-800 pb-2">{label(data, "experience", rtl)}</h2>
            <div className="space-y-6">
              {data.experience.map((e, i) => (
                <div key={i}>
                  <div className="flex items-baseline justify-between rtl:flex-row-reverse">
                    <div className="text-base text-white">{e.title} <span className="text-neutral-500 italic">· {e.company}</span></div>
                    <div className="text-xs text-neutral-600 tracking-wider rtl:tracking-normal">{e.duration}</div>
                  </div>
                  {e.description && <p className="mt-1.5 text-sm text-neutral-400">{e.description}</p>}
                  <ul className="mt-2 space-y-1 text-sm text-neutral-400">
                    {e.achievements.map((a, j) => (
                      <li key={j} className="flex gap-2 rtl:flex-row-reverse"><span className="text-neutral-700">›</span> {a}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid rtl:[direction:rtl] grid-cols-2 gap-8 flex-1">
          {data.projects.length > 0 && (
            <section>
              <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] rtl:tracking-normal text-neutral-600 border-b border-neutral-800 pb-2">{label(data, "projects", rtl)}</h2>
              <div className="space-y-4">
                {data.projects.map((p, i) => (
                  <div key={i}>
                    <div className="text-white text-sm">{p.name}</div>
                    <p className="text-xs text-neutral-400 mt-1">{p.description}</p>
                    {p.tech.length > 0 && <p className="mt-1 text-[10px] tracking-wider rtl:tracking-normal text-neutral-600 uppercase">{p.tech.join(" · ")}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          <div>
            {(data.skillItems?.length ? data.skillItems.length > 0 : data.skills.length > 0) && (
              <section className="mb-8">
                <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] rtl:tracking-normal text-neutral-600 border-b border-neutral-800 pb-2">{label(data, "skills", rtl)}</h2>
                {data.skillItems && data.skillItems.length > 0 ? (
                  <div className="grid grid-cols-1 gap-y-3">
                    {data.skillItems.map((s, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-xs text-neutral-400 mb-1">{s.name}</span>
                        <BarRating level={s.level} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((s, i) => (
                      <span key={i} className="px-2 py-1 border border-neutral-800 text-xs text-neutral-400 rounded-sm">{s}</span>
                    ))}
                  </div>
                )}
              </section>
            )}

            {data.education.length > 0 && (
              <section>
                <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] rtl:tracking-normal text-neutral-600 border-b border-neutral-800 pb-2">{label(data, "education", rtl)}</h2>
                <div className="space-y-3">
                  {data.education.map((e, i) => (
                    <div key={i} className="text-xs">
                      <div className="text-white">{e.degree}</div>
                      <div className="text-neutral-500 mt-0.5">{e.institution} <span className="text-neutral-700">·</span> {e.year}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ApexTemplate({ data }: { data: ResumeData }) {
  const rtl = useLayoutRtl(data);
  return (
    <div className="bg-white text-slate-800 font-sans" style={{ minHeight: "1122px", width: "100%", display: "flex", flexDirection: "column" }}>
      <header className="bg-slate-900 text-white p-12">
        <h1 className="text-4xl font-extrabold tracking-tight rtl:tracking-normal">{data.name}</h1>
        <p className="mt-2 text-xl font-medium text-blue-400">{data.title}</p>
        <p className="mt-4 text-sm text-slate-300 font-medium">
          {[data.location, data.email, data.phone].filter(Boolean).join("  •  ")}
        </p>
      </header>

      <div className="p-12">
        <section className="mb-8">
          <p className="text-sm leading-relaxed text-slate-600 font-medium">{data.summary}</p>
        </section>

        <div className="grid rtl:[direction:rtl] grid-cols-3 gap-8 flex-1">
          <div className="col-span-2 space-y-8">
            {data.experience.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-4 border-b-2 border-slate-100 pb-2">{label(data, "experience", rtl)}</h2>
                <div className="space-y-5">
                  {data.experience.map((e, i) => (
                    <div key={i}>
                      <div className="flex items-baseline justify-between rtl:flex-row-reverse">
                        <h3 className="text-base font-bold text-slate-900">{e.title}</h3>
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{e.duration}</span>
                      </div>
                      <div className="text-sm font-semibold text-slate-500 mb-2">{e.company}</div>
                      {e.description && <p className="text-sm text-slate-600 mb-2">{e.description}</p>}
                      <ul className="list-disc space-y-1 pl-4 rtl:pl-0 rtl:pr-4 text-sm text-slate-600 marker:text-slate-300">
                        {e.achievements.map((a, j) => <li key={j}>{a}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {data.projects.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-4 border-b-2 border-slate-100 pb-2">{label(data, "projects", rtl)}</h2>
                <div className="space-y-4">
                  {data.projects.map((p, i) => (
                    <div key={i}>
                      <h3 className="text-sm font-bold text-slate-900">{p.name}</h3>
                      <p className="text-sm text-slate-600 mt-1">{p.description}</p>
                      {p.tech.length > 0 && <p className="mt-1 text-xs font-semibold text-blue-600">{p.tech.join(" · ")}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="col-span-1 space-y-8">
            {(data.skillItems?.length ? data.skillItems.length > 0 : data.skills.length > 0) && (
              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-4 border-b-2 border-slate-100 pb-2">{label(data, "skills", rtl)}</h2>
                {data.skillItems && data.skillItems.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {data.skillItems.map((s, i) => (
                      <div key={i} className="flex flex-col">
                         <span className="text-sm font-medium text-slate-700">{s.name}</span>
                         <StarRating level={s.level} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {data.skills.map((s, i) => (
                      <span key={i} className="text-sm font-medium text-slate-700 bg-slate-100 px-3 py-1.5 rounded-md">{s}</span>
                    ))}
                  </div>
                )}
              </section>
            )}

            {data.education.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-4 border-b-2 border-slate-100 pb-2">{label(data, "education", rtl)}</h2>
                <div className="space-y-4">
                  {data.education.map((e, i) => (
                    <div key={i}>
                      <div className="text-sm font-bold text-slate-900">{e.degree}</div>
                      <div className="text-sm text-slate-600 mt-1">{e.institution}</div>
                      <div className="text-xs font-bold text-slate-400 mt-1">{e.year}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.certifications.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-4 border-b-2 border-slate-100 pb-2">{label(data, "certifications", rtl)}</h2>
                <ul className="space-y-2">
                  {data.certifications.map((c, i) => (
                    <li key={i} className="text-sm text-slate-600 font-medium">{c}</li>
                  ))}
                </ul>
              </section>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

export function NexusTemplate({ data }: { data: ResumeData }) {
  const rtl = useLayoutRtl(data);
  return (
    <div className="bg-white text-slate-800 p-12 font-sans" style={{ minHeight: "1122px", width: "100%", display: "flex", flexDirection: "column" }}>
      <header className="flex justify-between rtl:flex-row-reverse items-end border-b-4 border-blue-600 pb-6 mb-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900">{data.name}</h1>
          <p className="text-xl font-medium text-blue-600 mt-1">{data.title}</p>
        </div>
        <div className="text-right rtl:text-left text-sm font-medium text-slate-500 space-y-1">
          {data.location && <div>{data.location}</div>}
          {data.email && <div>{data.email}</div>}
          {data.phone && <div>{data.phone}</div>}
        </div>
      </header>

      <section className="mb-10">
        <p className="text-sm leading-relaxed text-slate-700">{data.summary}</p>
      </section>

      <div className="grid rtl:[direction:rtl] grid-cols-12 gap-8 flex-1">
        <div className="col-span-8 space-y-8">
          {data.experience.length > 0 && (
            <section>
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
                {label(data, "experience", rtl)}
              </h2>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[5px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                {data.experience.map((e, i) => (
                  <div key={i} className="relative pl-6">
                    <div className="absolute left-0 top-1.5 rtl:left-auto rtl:right-0 w-3 h-3 rounded-full bg-white border-2 border-blue-600 z-10 -ml-[5px] rtl:ml-0 rtl:-mr-[5px]"></div>
                    <div className="flex flex-wrap items-baseline justify-between rtl:flex-row-reverse mb-1">
                      <h3 className="text-base font-bold text-slate-900">{e.title}</h3>
                      <span className="text-xs font-bold text-slate-500">{e.duration}</span>
                    </div>
                    <div className="text-sm font-semibold text-blue-600 mb-2">{e.company}</div>
                    {e.description && <p className="text-sm text-slate-600 mb-2">{e.description}</p>}
                    <ul className="list-disc space-y-1 pl-4 rtl:pl-0 rtl:pr-4 text-sm text-slate-600 marker:text-slate-300">
                      {e.achievements.map((a, j) => <li key={j}>{a}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-4 space-y-8">
          {(data.skillItems?.length ? data.skillItems.length > 0 : data.skills.length > 0) && (
            <section>
              <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
                {label(data, "skills", rtl)}
              </h2>
              {data.skillItems && data.skillItems.length > 0 ? (
                 <div className="flex flex-col gap-3">
                    {data.skillItems.map((s, i) => (
                      <div key={i} className="flex flex-col">
                         <span className="text-sm font-bold text-blue-900">{s.name}</span>
                         <BarRating level={s.level} />
                      </div>
                    ))}
                 </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((s, i) => (
                    <span key={i} className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-1 rounded-md shadow-sm">{s}</span>
                  ))}
                </div>
              )}
            </section>
          )}

          {data.projects.length > 0 && (
            <section>
              <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
                {label(data, "projects", rtl)}
              </h2>
              <div className="space-y-4">
                {data.projects.map((p, i) => (
                  <div key={i} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900">{p.name}</h3>
                    <p className="text-xs text-slate-600 mt-1">{p.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
                {label(data, "education", rtl)}
              </h2>
              <div className="space-y-3">
                {data.education.map((e, i) => (
                  <div key={i}>
                    <div className="text-sm font-bold text-slate-900">{e.degree}</div>
                    <div className="text-xs text-slate-600 mt-0.5">{e.institution}</div>
                    <div className="text-xs font-bold text-blue-600 mt-0.5">{e.year}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export function OrbitTemplate({ data }: { data: ResumeData }) {
  const rtl = useLayoutRtl(data);
  return (
    <div className="bg-[#fafafa] text-neutral-800 p-12 font-sans" style={{ minHeight: "1122px", width: "100%", display: "flex", flexDirection: "column" }}>
      <header className="text-center mb-10 pb-8 border-b border-neutral-200">
        <h1 className="text-5xl font-extralight tracking-widest rtl:tracking-normal text-neutral-900 uppercase">{data.name}</h1>
        <p className="mt-3 text-sm font-bold tracking-[0.2em] rtl:tracking-normal text-neutral-500 uppercase">{data.title}</p>
        <div className="mt-6 flex justify-center gap-4 text-xs font-medium text-neutral-400 uppercase tracking-widest rtl:tracking-normal">
          {[data.location, data.email, data.phone].filter(Boolean).map((item, i) => (
            <span key={i} className="flex items-center gap-4">
              {i > 0 && <span className="w-1.5 h-1.5 rounded-full bg-neutral-300"></span>}
              {item}
            </span>
          ))}
        </div>
      </header>

      <div className="grid rtl:[direction:rtl] grid-cols-12 gap-12 flex-1">
        <div className="col-span-8 space-y-10">
          {data.experience.length > 0 && (
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] rtl:tracking-normal text-neutral-400 mb-6 border-b border-neutral-200 pb-2">{label(data, "experience", rtl)}</h2>
              <div className="space-y-8">
                {data.experience.map((e, i) => (
                  <div key={i}>
                    <div className="flex items-baseline justify-between rtl:flex-row-reverse">
                      <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wide rtl:tracking-normal">{e.title}</h3>
                      <span className="text-xs font-medium text-neutral-500">{e.duration}</span>
                    </div>
                    <div className="text-sm font-medium text-neutral-500 mb-3">{e.company}</div>
                    {e.description && <p className="text-sm text-neutral-600 mb-3 leading-relaxed">{e.description}</p>}
                    <ul className="space-y-2">
                      {e.achievements.map((a, j) => (
                        <li key={j} className="flex gap-3 text-sm text-neutral-600 leading-relaxed">
                          <span className="text-neutral-300 mt-1.5 w-1 h-1 rounded-full bg-neutral-400 shrink-0"></span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-4 space-y-10">
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] rtl:tracking-normal text-neutral-400 mb-6 border-b border-neutral-200 pb-2">{label(data, "profile", rtl)}</h2>
            <p className="text-sm leading-relaxed text-neutral-600">{data.summary}</p>
          </section>

          {(data.skillItems?.length ? data.skillItems.length > 0 : data.skills.length > 0) && (
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] rtl:tracking-normal text-neutral-400 mb-6 border-b border-neutral-200 pb-2">{label(data, "expertise", rtl)}</h2>
              <div className="space-y-3">
                {data.skillItems && data.skillItems.length > 0 ? (
                  data.skillItems.map((s, i) => (
                    <div key={i} className="flex justify-between rtl:flex-row-reverse items-center">
                      <span className="text-xs font-bold text-neutral-700">{s.name}</span>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(star => (
                           <div key={star} className={`w-1.5 h-1.5 rounded-full ${star <= s.level ? 'bg-neutral-800' : 'bg-neutral-200'}`}></div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  data.skills.map((s, i) => (
                    <div key={i} className="flex justify-between rtl:flex-row-reverse items-center">
                      <span className="text-xs font-bold text-neutral-700">{s}</span>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(star => (
                           <div key={star} className={`w-1.5 h-1.5 rounded-full ${star <= ((s.length % 3) + 3) ? 'bg-neutral-800' : 'bg-neutral-200'}`}></div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] rtl:tracking-normal text-neutral-400 mb-6 border-b border-neutral-200 pb-2">{label(data, "education", rtl)}</h2>
              <div className="space-y-4">
                {data.education.map((e, i) => (
                  <div key={i}>
                    <div className="text-xs font-bold text-neutral-900">{e.degree}</div>
                    <div className="text-xs text-neutral-500 mt-1">{e.institution}</div>
                    <div className="text-[10px] font-medium text-neutral-400 mt-1">{e.year}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export function MetricTemplate({ data }: { data: ResumeData }) {
  const rtl = useLayoutRtl(data);
  return (
    <div className="bg-white text-black p-10 font-sans" style={{ minHeight: "1122px", width: "100%", display: "flex", flexDirection: "column" }}>
      <header className="border-4 border-black p-8 mb-10">
        <h1 className="text-5xl font-black uppercase tracking-tighter rtl:tracking-normal">{data.name}</h1>
        <div className="flex justify-between rtl:flex-row-reverse items-end mt-4">
          <p className="text-lg font-bold uppercase tracking-widest rtl:tracking-normal">{data.title}</p>
          <p className="text-xs font-bold uppercase">
            {[data.location, data.email, data.phone].filter(Boolean).join(" // ")}
          </p>
        </div>
      </header>

      <div className="grid rtl:[direction:rtl] grid-cols-12 gap-10 flex-1">
        <div className="col-span-4 space-y-10">
          {(data.skillItems?.length ? data.skillItems.length > 0 : data.skills.length > 0) && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest rtl:tracking-normal border-b-4 border-black pb-2 mb-6">{label(data, "metrics", rtl)}</h2>
              <div className="space-y-4">
                {data.skillItems && data.skillItems.length > 0 ? (
                  data.skillItems.map((s, i) => {
                    const level = s.level * 20;
                    return (
                      <div key={i}>
                        <div className="flex justify-between rtl:flex-row-reverse text-[10px] font-black uppercase mb-1">
                          <span>{s.name}</span>
                          <span>{level}%</span>
                        </div>
                        <div className="h-2 w-full border-2 border-black p-[1px]">
                          <div className="h-full bg-black" style={{ width: `${level}%` }}></div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  data.skills.map((s, i) => {
                    const level = ((s.length % 3) + 3) * 20; // 60, 80, 100
                    return (
                      <div key={i}>
                        <div className="flex justify-between rtl:flex-row-reverse text-[10px] font-black uppercase mb-1">
                          <span>{s}</span>
                          <span>{level}%</span>
                        </div>
                        <div className="h-2 w-full border-2 border-black p-[1px]">
                          <div className="h-full bg-black" style={{ width: `${level}%` }}></div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest rtl:tracking-normal border-b-4 border-black pb-2 mb-6">{label(data, "education", rtl)}</h2>
              <div className="space-y-6">
                {data.education.map((e, i) => (
                  <div key={i}>
                    <div className="text-xs font-black uppercase">{e.degree}</div>
                    <div className="text-xs font-medium mt-1">{e.institution}</div>
                    <div className="text-[10px] font-bold text-gray-500 mt-1">{e.year}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-8 space-y-10">
          <section>
            <h2 className="text-xs font-black uppercase tracking-widest rtl:tracking-normal border-b-4 border-black pb-2 mb-6">{label(data, "summary", rtl)}</h2>
            <p className="text-sm font-medium leading-relaxed">{data.summary}</p>
          </section>

          {data.experience.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest rtl:tracking-normal border-b-4 border-black pb-2 mb-6">{label(data, "experience", rtl)}</h2>
              <div className="space-y-8">
                {data.experience.map((e, i) => (
                  <div key={i} className="border-l-4 border-black pl-5 rtl:border-l-0 rtl:border-r-4 rtl:pl-0 rtl:pr-5">
                    <div className="flex justify-between rtl:flex-row-reverse items-center mb-1">
                      <h3 className="text-sm font-black uppercase">{e.title}</h3>
                      <span className="bg-black text-white text-[10px] font-black uppercase px-2 py-1">{e.duration}</span>
                    </div>
                    <div className="text-xs font-bold text-gray-600 mb-3">{e.company}</div>
                    {e.description && <p className="text-sm font-medium mb-3">{e.description}</p>}
                    <ul className="space-y-1">
                      {e.achievements.map((a, j) => (
                        <li key={j} className="flex gap-2 text-sm font-medium">
                          <span className="font-black">•</span> {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export function PrismTemplate({ data }: { data: ResumeData }) {
  const rtl = useLayoutRtl(data);
  return (
    <div className="bg-[#121212] text-gray-300 p-12 font-sans" style={{ minHeight: "1122px", width: "100%", display: "flex", flexDirection: "column" }}>
      <header className="text-center mb-12">
        <div className="flex justify-center rtl:flex-row-reverse mb-4">
           <div className="w-8 h-8 border-2 border-indigo-500 rotate-45 flex items-center justify-center">
             <div className="w-2 h-2 bg-indigo-500"></div>
           </div>
        </div>
        <h1 className="text-4xl font-light tracking-widest rtl:tracking-normal text-white">{data.name}</h1>
        <p className="mt-3 text-xs font-bold tracking-[0.2em] rtl:tracking-normal text-indigo-400 uppercase">{data.title}</p>
        <div className="mt-6 flex justify-center gap-4 text-[10px] font-medium text-gray-500 uppercase tracking-widest rtl:tracking-normal">
          {[data.location, data.email, data.phone].filter(Boolean).map((item, i) => (
            <span key={i} className="flex items-center gap-4">
              {i > 0 && <span className="w-1 h-1 bg-gray-700 rotate-45"></span>}
              {item}
            </span>
          ))}
        </div>
      </header>

      <section className="mb-12 text-center px-10">
        <p className="text-sm leading-relaxed text-gray-400">{data.summary}</p>
      </section>

      <div className="grid rtl:[direction:rtl] grid-cols-12 gap-10 flex-1">
        <div className="col-span-7 space-y-10">
          {data.experience.length > 0 && (
            <section>
              <h2 className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] rtl:tracking-normal text-white mb-6">
                <div className="w-2 h-2 bg-indigo-500 rotate-45"></div>
                {label(data, "experience", rtl)}
                <div className="flex-1 h-px bg-gray-800 ml-2"></div>
              </h2>
              <div className="space-y-8">
                {data.experience.map((e, i) => (
                  <div key={i}>
                    <div className="flex justify-between rtl:flex-row-reverse items-baseline mb-1">
                      <h3 className="text-sm font-bold text-white">{e.title}</h3>
                      <span className="text-[10px] font-bold text-gray-500 tracking-wider rtl:tracking-normal">{e.duration}</span>
                    </div>
                    <div className="text-xs font-medium text-indigo-400 mb-3">{e.company}</div>
                    <ul className="space-y-2">
                      {e.achievements.map((a, j) => (
                        <li key={j} className="flex gap-3 text-sm text-gray-400 leading-relaxed">
                          <span className="w-1.5 h-1.5 bg-gray-700 mt-1.5 rotate-45 shrink-0"></span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-5 space-y-10">
          {(data.skillItems?.length ? data.skillItems.length > 0 : data.skills.length > 0) && (
            <section>
              <h2 className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] rtl:tracking-normal text-white mb-6">
                <div className="w-2 h-2 bg-indigo-500 rotate-45"></div>
                {label(data, "skills", rtl)}
                <div className="flex-1 h-px bg-gray-800 ml-2"></div>
              </h2>
              {data.skillItems && data.skillItems.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {data.skillItems.map((s, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-wider rtl:tracking-normal text-gray-300">{s.name}</span>
                      <StarRating level={s.level} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((s, i) => (
                    <span key={i} className="text-[10px] font-bold uppercase tracking-wider rtl:tracking-normal text-gray-300 border border-gray-800 px-3 py-1.5 bg-gray-900/50">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <h2 className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] rtl:tracking-normal text-white mb-6">
                <div className="w-2 h-2 bg-indigo-500 rotate-45"></div>
                {label(data, "education", rtl)}
                <div className="flex-1 h-px bg-gray-800 ml-2"></div>
              </h2>
              <div className="space-y-5">
                {data.education.map((e, i) => (
                  <div key={i}>
                    <div className="text-xs font-bold text-white">{e.degree}</div>
                    <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider rtl:tracking-normal">{e.institution}</div>
                    <div className="text-[10px] font-bold text-gray-700 mt-1">{e.year}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export function SlateTemplate({ data }: { data: ResumeData }) {
  const rtl = useLayoutRtl(data);
  return (
    <div className="bg-slate-50 text-slate-900 p-12 font-sans" style={{ minHeight: "1122px", width: "100%", display: "flex", flexDirection: "column" }}>
      <header className="border-b border-slate-300 pb-8 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight rtl:tracking-normal text-slate-900">{data.name}</h1>
          <p className="mt-2 text-lg text-slate-600">{data.title}</p>
        </div>
        <div className="text-right rtl:text-left text-sm text-slate-500 space-y-1">
          {data.location && <div>{data.location}</div>}
          {data.email && <div>{data.email}</div>}
          {data.phone && <div>{data.phone}</div>}
        </div>
      </header>

      <section className="mb-10">
        <p className="text-base leading-relaxed text-slate-700">{data.summary}</p>
      </section>

      <div className="space-y-10">
        {data.experience.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider rtl:tracking-normal text-slate-900 mb-6 border-b border-slate-200 pb-2">{label(data, "professionalExperience", rtl)}</h2>
            <div className="space-y-8">
              {data.experience.map((e, i) => (
                <div key={i}>
                  <div className="flex justify-between rtl:flex-row-reverse items-baseline mb-1">
                    <h3 className="text-lg font-medium text-slate-900">{e.title}</h3>
                    <span className="text-sm text-slate-500 font-medium">{e.duration}</span>
                  </div>
                  <div className="text-base text-slate-600 mb-3">{e.company}</div>
                  {e.description && <p className="text-sm text-slate-700 mb-3">{e.description}</p>}
                  <ul className="list-disc pl-5 rtl:pl-0 rtl:pr-5 space-y-1 text-sm text-slate-600 marker:text-slate-400">
                    {e.achievements.map((a, j) => <li key={j}>{a}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid rtl:[direction:rtl] grid-cols-2 gap-10 flex-1">
           {(data.skillItems?.length ? data.skillItems.length > 0 : data.skills.length > 0) && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider rtl:tracking-normal text-slate-900 mb-4 border-b border-slate-200 pb-2">{label(data, "skills", rtl)}</h2>
              {data.skillItems && data.skillItems.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {data.skillItems.map((s, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-sm text-slate-900 font-medium">{s.name}</span>
                      <BarRating level={s.level} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-700 leading-relaxed">{data.skills.join(" • ")}</p>
              )}
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider rtl:tracking-normal text-slate-900 mb-4 border-b border-slate-200 pb-2">{label(data, "education", rtl)}</h2>
              <div className="space-y-4">
                {data.education.map((e, i) => (
                  <div key={i}>
                    <div className="text-base font-medium text-slate-900">{e.degree}</div>
                    <div className="text-sm text-slate-600 mt-1">{e.institution}</div>
                    <div className="text-sm text-slate-500 mt-1">{e.year}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export function AvantTemplate({ data }: { data: ResumeData }) {
  const rtl = useLayoutRtl(data);
  return (
    <div className="bg-white text-black p-12 font-serif" style={{ minHeight: "1122px", width: "100%", display: "flex", flexDirection: "column" }}>
      <header className="border-b-4 border-black pb-6 mb-8 text-center">
        <h1 className="text-6xl font-black uppercase tracking-tighter rtl:tracking-normal">{data.name}</h1>
        <p className="mt-4 text-xl font-bold uppercase tracking-widest rtl:tracking-normal">{data.title}</p>
        <p className="mt-4 text-sm font-bold uppercase tracking-widest rtl:tracking-normal">
          {[data.location, data.email, data.phone].filter(Boolean).join(" | ")}
        </p>
      </header>

      <section className="mb-10 text-center px-10">
        <p className="text-base leading-relaxed font-medium">{data.summary}</p>
      </section>

      <div className="space-y-10">
        {data.experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-black uppercase tracking-tighter rtl:tracking-normal border-b-2 border-black pb-2 mb-6">{label(data, "experience", rtl)}</h2>
            <div className="space-y-8">
              {data.experience.map((e, i) => (
                <div key={i} className="grid rtl:[direction:rtl] grid-cols-12 gap-6 flex-1">
                  <div className="col-span-3 text-sm font-bold uppercase">
                    {e.duration}
                  </div>
                  <div className="col-span-9 border-l-2 border-black pl-6 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-6">
                    <h3 className="text-xl font-black uppercase">{e.title}</h3>
                    <div className="text-lg font-bold mt-1 mb-3">{e.company}</div>
                    {e.description && <p className="text-sm font-medium mb-3">{e.description}</p>}
                    <ul className="list-disc pl-5 rtl:pl-0 rtl:pr-5 space-y-1 text-sm font-medium marker:text-black">
                      {e.achievements.map((a, j) => <li key={j}>{a}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid rtl:[direction:rtl] grid-cols-2 gap-12 flex-1">
          {(data.skillItems?.length ? data.skillItems.length > 0 : data.skills.length > 0) && (
            <section>
              <h2 className="text-2xl font-black uppercase tracking-tighter rtl:tracking-normal border-b-2 border-black pb-2 mb-6">{label(data, "skills", rtl)}</h2>
              <div className="flex flex-col gap-3">
                {data.skillItems && data.skillItems.length > 0 ? (
                  data.skillItems.map((s, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-sm font-bold uppercase">{s.name}</span>
                      <BarRating level={s.level} />
                    </div>
                  ))
                ) : (
                  data.skills.map((s, i) => (
                    <span key={i} className="text-sm font-bold uppercase">{s}</span>
                  ))
                )}
              </div>
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <h2 className="text-2xl font-black uppercase tracking-tighter rtl:tracking-normal border-b-2 border-black pb-2 mb-6">{label(data, "education", rtl)}</h2>
              <div className="space-y-6">
                {data.education.map((e, i) => (
                  <div key={i}>
                    <div className="text-lg font-black uppercase">{e.degree}</div>
                    <div className="text-base font-bold mt-1">{e.institution}</div>
                    <div className="text-sm font-bold mt-1">{e.year}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export function VanguardTemplate({ data }: { data: ResumeData }) {
  const rtl = useLayoutRtl(data);
  return (
    <div className="bg-white text-neutral-900 p-12 font-sans overflow-hidden" style={{ minHeight: "1122px", width: "100%", display: "flex", flexDirection: "column" }}>
      <header className="relative mb-16 pt-8">
        <div className="absolute -top-12 -left-4 rtl:left-auto rtl:-right-4 text-[140px] font-black text-neutral-100 uppercase tracking-tighter rtl:tracking-normal opacity-50 z-0 whitespace-nowrap overflow-hidden">
          {data.name.split(' ')[0]}
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl font-black uppercase tracking-tighter rtl:tracking-normal">{data.name}</h1>
          <p className="mt-2 text-2xl font-bold text-neutral-500 uppercase tracking-tight rtl:tracking-normal">{data.title}</p>
          <div className="mt-6 flex gap-6 rtl:flex-row-reverse text-sm font-bold uppercase text-neutral-600">
            {data.location && <span>{data.location}</span>}
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>{data.phone}</span>}
          </div>
        </div>
      </header>

      <div className="grid rtl:[direction:rtl] grid-cols-12 gap-10 flex-1">
        <div className="col-span-8 space-y-12">
          <section>
            <p className="text-lg font-medium leading-relaxed">{data.summary}</p>
          </section>

          {data.experience.length > 0 && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-widest rtl:tracking-normal text-neutral-400 mb-6">{label(data, "experience", rtl)}</h2>
              <div className="space-y-10">
                {data.experience.map((e, i) => (
                  <div key={i}>
                    <div className="flex items-end justify-between mb-2">
                      <h3 className="text-2xl font-bold uppercase tracking-tight rtl:tracking-normal">{e.title}</h3>
                      <span className="text-sm font-bold text-neutral-500 bg-neutral-100 px-3 py-1">{e.duration}</span>
                    </div>
                    <div className="text-lg font-bold text-neutral-500 mb-4">{e.company}</div>
                    <ul className="space-y-2">
                      {e.achievements.map((a, j) => (
                        <li key={j} className="text-base font-medium text-neutral-700 leading-relaxed flex gap-3">
                          <span className="text-neutral-300 font-bold">—</span> {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-4 space-y-12">
           {data.skills.length > 0 && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-widest rtl:tracking-normal text-neutral-400 mb-6">{label(data, "expertise", rtl)}</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((s, i) => (
                  <span key={i} className="text-sm font-bold bg-neutral-900 text-white px-3 py-2 uppercase">{s}</span>
                ))}
              </div>
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-widest rtl:tracking-normal text-neutral-400 mb-6">{label(data, "education", rtl)}</h2>
              <div className="space-y-6">
                {data.education.map((e, i) => (
                  <div key={i}>
                    <div className="text-lg font-bold uppercase tracking-tight rtl:tracking-normal">{e.degree}</div>
                    <div className="text-base font-medium text-neutral-600 mt-1">{e.institution}</div>
                    <div className="text-sm font-bold text-neutral-400 mt-1">{e.year}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export function MonolithTemplate({ data }: { data: ResumeData }) {
  const rtl = useLayoutRtl(data);
  return (
    <div className="bg-neutral-100 p-12 font-sans" style={{ minHeight: "1122px", width: "100%", display: "flex", flexDirection: "column" }}>
      <div className="bg-white border border-neutral-300 shadow-sm p-10 h-full">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight rtl:tracking-normal text-neutral-900">{data.name}</h1>
          <p className="mt-2 text-lg font-medium text-neutral-600 uppercase tracking-widest rtl:tracking-normal">{data.title}</p>
          <div className="mt-4 flex justify-center gap-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider rtl:tracking-normal">
            {[data.location, data.email, data.phone].filter(Boolean).join(" | ")}
          </div>
        </header>

        <section className="mb-10 text-center max-w-3xl mx-auto">
          <p className="text-sm leading-relaxed text-neutral-700">{data.summary}</p>
        </section>

        <div className="grid rtl:[direction:rtl] grid-cols-12 gap-8 flex-1">
          <div className="col-span-8 space-y-8">
            {data.experience.length > 0 && (
              <section>
                <div className="bg-neutral-900 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest rtl:tracking-normal mb-6 inline-block">{label(data, "professionalExperience", rtl)}</div>
                <div className="space-y-8">
                  {data.experience.map((e, i) => (
                    <div key={i} className="border border-neutral-200 p-5 bg-neutral-50">
                      <div className="flex justify-between rtl:flex-row-reverse items-baseline mb-2">
                        <h3 className="text-base font-bold text-neutral-900">{e.title}</h3>
                        <span className="text-xs font-bold text-neutral-500">{e.duration}</span>
                      </div>
                      <div className="text-sm font-semibold text-neutral-700 mb-3">{e.company}</div>
                      <ul className="list-disc pl-5 rtl:pl-0 rtl:pr-5 space-y-1 text-sm text-neutral-600 marker:text-neutral-400">
                        {e.achievements.map((a, j) => <li key={j}>{a}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="col-span-4 space-y-8">
             {data.skills.length > 0 && (
              <section>
                <div className="bg-neutral-900 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest rtl:tracking-normal mb-6 inline-block">{label(data, "skills", rtl)}</div>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((s, i) => (
                    <span key={i} className="text-xs font-semibold text-neutral-700 bg-neutral-100 border border-neutral-200 px-2 py-1">{s}</span>
                  ))}
                </div>
              </section>
            )}

            {data.education.length > 0 && (
              <section>
                <div className="bg-neutral-900 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest rtl:tracking-normal mb-6 inline-block">{label(data, "education", rtl)}</div>
                <div className="space-y-4">
                  {data.education.map((e, i) => (
                    <div key={i} className="border border-neutral-200 p-4 bg-neutral-50">
                      <div className="text-sm font-bold text-neutral-900">{e.degree}</div>
                      <div className="text-xs font-medium text-neutral-600 mt-1">{e.institution}</div>
                      <div className="text-xs font-bold text-neutral-400 mt-1">{e.year}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CipherTemplate({ data }: { data: ResumeData }) {
  const rtl = useLayoutRtl(data);
  return (
    <div className="bg-[#050505] text-[#00ff41] p-12 font-mono selection:bg-[#00ff41] selection:text-black" style={{ minHeight: "1122px", width: "100%", display: "flex", flexDirection: "column" }}>
      <header className="mb-10 border-b border-[#00ff41]/30 pb-6">
        <h1 className="text-4xl font-bold tracking-tight rtl:tracking-normal">{">"}{data.name}_</h1>
        <p className="mt-2 text-lg text-[#008f11]">{data.title}</p>
        <div className="mt-4 flex gap-6 text-xs text-[#008f11]">
          {data.location && <span>[loc: {data.location}]</span>}
          {data.email && <span>[mail: {data.email}]</span>}
          {data.phone && <span>[tel: {data.phone}]</span>}
        </div>
      </header>

      <section className="mb-10">
        <p className="text-sm leading-relaxed text-[#00ff41]/80">{data.summary}</p>
      </section>

      <div className="grid rtl:[direction:rtl] grid-cols-12 gap-10 flex-1">
        <div className="col-span-8 space-y-10">
          {data.experience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-6 text-[#008f11]">{label(data, "terminalExperience", rtl)}</h2>
              <div className="space-y-8">
                {data.experience.map((e, i) => (
                  <div key={i}>
                    <div className="flex justify-between rtl:flex-row-reverse items-baseline mb-1">
                      <h3 className="text-base font-bold">{e.title}</h3>
                      <span className="text-xs text-[#008f11]">{e.duration}</span>
                    </div>
                    <div className="text-sm text-[#008f11] mb-3">@ {e.company}</div>
                    <ul className="space-y-1">
                      {e.achievements.map((a, j) => (
                        <li key={j} className="flex gap-2 text-sm text-[#00ff41]/80">
                          <span className="text-[#008f11]">{">"}</span> {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-4 space-y-10">
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-6 text-[#008f11]">{label(data, "terminalSkills", rtl)}</h2>
              <div className="flex flex-col gap-2">
                {data.skills.map((s, i) => (
                  <span key={i} className="text-sm">[{s}]</span>
                ))}
              </div>
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-6 text-[#008f11]">{label(data, "terminalEducation", rtl)}</h2>
              <div className="space-y-6">
                {data.education.map((e, i) => (
                  <div key={i}>
                    <div className="text-sm font-bold">{e.degree}</div>
                    <div className="text-xs text-[#008f11] mt-1">{e.institution}</div>
                    <div className="text-xs text-[#008f11]/60 mt-1">{e.year}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export function PinnacleTemplate({ data }: { data: ResumeData }) {
  const rtl = useLayoutRtl(data);
  return (
    <div className="bg-white text-slate-800 font-sans" style={{ minHeight: "1122px", width: "100%", display: "flex", flexDirection: "column" }}>
      <header className="bg-indigo-950 text-indigo-50 p-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black tracking-tight rtl:tracking-normal text-white">{data.name}</h1>
          <p className="mt-3 text-xl font-medium text-indigo-300">{data.title}</p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm font-medium text-indigo-200">
            {data.location && <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>{data.location}</div>}
            {data.email && <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>{data.email}</div>}
            {data.phone && <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>{data.phone}</div>}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-12">
        <section className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-widest rtl:tracking-normal text-indigo-900 mb-4">{label(data, "executiveProfile", rtl)}</h2>
          <p className="text-base leading-relaxed text-slate-700">{data.summary}</p>
        </section>

        <div className="grid rtl:[direction:rtl] grid-cols-12 gap-12 flex-1">
          <div className="col-span-8 space-y-12">
            {data.experience.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-widest rtl:tracking-normal text-indigo-900 mb-6">{label(data, "professionalExperience", rtl)}</h2>
                <div className="space-y-8">
                  {data.experience.map((e, i) => (
                    <div key={i} className="relative pl-6 border-l-2 border-indigo-100 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-6">
                      <div className="absolute left-[-5px] top-2 rtl:left-auto rtl:right-[-5px] w-2 h-2 rounded-full bg-indigo-600"></div>
                      <div className="flex justify-between rtl:flex-row-reverse items-baseline mb-1">
                        <h3 className="text-lg font-bold text-slate-900">{e.title}</h3>
                        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">{e.duration}</span>
                      </div>
                      <div className="text-sm font-semibold text-indigo-600 mb-3">{e.company}</div>
                      {e.description && <p className="text-sm text-slate-600 mb-3">{e.description}</p>}
                      <ul className="list-disc pl-5 rtl:pl-0 rtl:pr-5 space-y-1 text-sm text-slate-600 marker:text-indigo-400">
                        {e.achievements.map((a, j) => <li key={j}>{a}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="col-span-4 space-y-12">
            {data.skills.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-widest rtl:tracking-normal text-indigo-900 mb-6">{label(data, "keySkills", rtl)}</h2>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((s, i) => (
                    <span key={i} className="text-xs font-semibold text-slate-700 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full">{s}</span>
                  ))}
                </div>
              </section>
            )}

            {data.education.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-widest rtl:tracking-normal text-indigo-900 mb-6">{label(data, "education", rtl)}</h2>
                <div className="space-y-5">
                  {data.education.map((e, i) => (
                    <div key={i}>
                      <div className="text-sm font-bold text-slate-900">{e.degree}</div>
                      <div className="text-xs text-slate-600 mt-1">{e.institution}</div>
                      <div className="text-xs font-bold text-indigo-500 mt-1">{e.year}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
