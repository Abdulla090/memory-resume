import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Eye, Sparkles } from "lucide-react";
import { ResumePreview } from "@/components/resume/templates";
import { useAppStore } from "@/lib/store";
import type { ResumeData, TemplateId } from "@/lib/types";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Templates — MemoryCV" },
      { name: "description", content: "Preview the resume templates available inside the MemoryCV editor." },
    ],
  }),
  component: TemplatesPage,
});

const SAMPLE: ResumeData = {
  name: "Maya Okafor",
  title: "Staff Software Engineer",
  email: "maya@example.com",
  phone: "+49 30 1234 5678",
  photoUrl: "https://picsum.photos/seed/maya-okafor-headshot/240/240",
  location: "Berlin, Germany",
  summary:
    "Staff engineer with 8 years scaling distributed payment systems. Brought a ledger platform to 12M tx/day and cut risk-scoring p99 from 480ms to 65ms. Mentor, speaker, and maintainer.",
  experience: [
    {
      title: "Staff Software Engineer",
      company: "Klarna",
      duration: "2022 — Present",
      description: "Owns the BNPL risk-scoring service across EU markets.",
      achievements: [
        "Rewrote risk-scoring hot path in Go, cutting p99 latency from 480ms to 65ms.",
        "Led architecture review across 4 squads, unblocking a major product launch.",
        "Founded an internal Rust guild with 30+ active contributors.",
      ],
    },
    {
      title: "Senior Engineer",
      company: "N26",
      duration: "2019 — 2022",
      description: "Migrated payment ledger from monolith to event-sourced microservices.",
      achievements: [
        "Architected and shipped an event-sourced ledger handling 12M transactions a day.",
        "Reduced settlement reconciliation errors by 94% during the first quarter after launch.",
      ],
    },
  ],
  projects: [
    {
      name: "pgPool-rs",
      description: "Open-source Postgres connection pooler written in Rust.",
      tech: ["Rust", "Postgres", "Tokio"],
      impact: "Used by multiple startup engineering teams.",
    },
  ],
  education: [{ degree: "BSc Computer Science", institution: "TU Munich", year: "2016" }],
  skills: ["TypeScript", "Go", "Rust", "Python", "PostgreSQL", "Kafka", "Kubernetes", "AWS"],
  certifications: ["AWS Solutions Architect Professional"],
};

function TemplatesPage() {
  const profile = useAppStore((state) => state.profile);
  const resumes = useAppStore((state) => state.resumes);
  const data: ResumeData = resumes[0]?.data ?? buildFromProfile(profile) ?? SAMPLE;
  const [active, setActive] = useState<TemplateId>("minimal");

  return (
    <div className="page-shell bg-background text-foreground">
      <header className="saas-nav">
        <div className="app-frame px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2 cursor-pointer" id="nav-logo">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-[1rem] font-bold tracking-tight text-slate-900">MemoryCV</span>
            </Link>

            <Link to="/dashboard" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="app-frame grid gap-6 px-4 pb-16 pt-3 sm:px-6 lg:grid-cols-[320px_1fr] lg:px-8">
        <aside className="grid gap-6 lg:sticky lg:top-6 lg:h-fit">
          <div className="surface-panel rounded-[2.25rem] p-6">
            <div className="eyebrow">Template system</div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">Preview the output language before generating.</h1>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              These previews use either your current profile or a fallback sample so you can inspect
              layout density, hierarchy, and overall document tone before editing.
            </p>
          </div>

          <div className="surface-panel rounded-[2rem] p-4">
            <div className="eyebrow px-2 pb-3">Available templates</div>
            <div className="grid gap-2">
              {(
                [
                  { id: "minimal",   label: "Minimal",   desc: "Clean hierarchy, tight editorial rhythm." },
                  { id: "executive", label: "Executive",  desc: "Dark sidebar, serif authority, leadership framing." },
                  { id: "noir",      label: "Noir",       desc: "All-black luxury. Maximum signal, zero noise." },
                  { id: "apex",      label: "Apex",       desc: "Bold top bar, dual-column, high-impact density." },
                  { id: "slate",     label: "Slate",      desc: "Swiss precision. Cold, systematic, unforgettable." },
                  { id: "cipher",    label: "Cipher",     desc: "Dark tech aesthetic with cyan accent. Built for engineers." },
                  { id: "monolith",  label: "Monolith",   desc: "Monumental structure, highly structured blocks." },
                  { id: "pinnacle",  label: "Pinnacle",   desc: "Peak performance, dark layered layout." },
                  { id: "avant",     label: "Avant",      desc: "Avant-garde spacing, brutalist lines." },
                  { id: "vanguard",  label: "Vanguard",   desc: "Leading edge minimalism, massive typography." },
                  { id: "nexus",     label: "Nexus",      desc: "Modern timeline, elegant SVG node connections." },
                  { id: "orbit",     label: "Orbit",      desc: "Sleek radar, circular icons, interactive SVG stars." },
                  { id: "metric",    label: "Metric",     desc: "Data-driven executive, strictly analytical charts." },
                  { id: "prism",     label: "Prism",      desc: "Minimalist geometric shapes and sharp accents." },
                ] as { id: TemplateId; label: string; desc: string }[]
              ).map(({ id, label, desc }) => {
                const isActive = active === id;
                return (
                  <button
                    key={id}
                    onClick={() => setActive(id)}
                    className={`rounded-[1.4rem] px-4 py-4 text-left transition-colors ${
                      isActive ? "bg-foreground text-background" : "surface-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold">{label}</div>
                        <div className={`mt-1 text-xs ${isActive ? "text-background/70" : "text-muted-foreground"}`}>{desc}</div>
                      </div>
                      <Eye className="h-4 w-4 shrink-0" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <section className="surface-panel rounded-[2.25rem] p-4 sm:p-6">
          <div className="surface-muted rounded-[1.6rem] p-4 sm:p-6">
            <div className="overflow-hidden rounded-[1rem] shadow-[0_24px_60px_-24px_rgba(15,23,42,0.2)]">
              <ResumePreview data={data} template={active} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function buildFromProfile(profile: ReturnType<typeof useAppStore.getState>["profile"]): ResumeData | null {
  if (!profile) return null;

  return {
    name: profile.name,
    title: profile.experience[0]?.title ?? "Professional",
    email: profile.email,
    phone: profile.phone,
    photoUrl: profile.photoUrl,
    location: profile.location,
    summary: profile.summary,
    experience: profile.experience,
    projects: profile.projects,
    education: profile.education,
    skills: [...profile.skills.technical, ...profile.skills.tools].slice(0, 14),
    certifications: profile.certifications,
  };
}
