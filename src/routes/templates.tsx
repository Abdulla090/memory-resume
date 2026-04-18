import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, ArrowLeft } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { ResumePreview } from "@/components/resume/templates";
import type { ResumeData, TemplateId } from "@/lib/types";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Templates — MemoryCV" },
      { name: "description", content: "Two premium resume templates: Minimal & Executive." },
    ],
  }),
  component: TemplatesPage,
});

const SAMPLE: ResumeData = {
  name: "Maya Okafor",
  title: "Staff Software Engineer",
  email: "maya@example.com",
  phone: "+49 30 1234 5678",
  location: "Berlin, Germany",
  summary:
    "Staff engineer with 8 years scaling distributed payment systems. Brought N26's ledger to 12M tx/day and cut Klarna's risk-scoring p99 from 480ms to 65ms. Mentor, conference speaker, OSS maintainer.",
  experience: [
    {
      title: "Staff Software Engineer",
      company: "Klarna",
      duration: "2022 — Present",
      description: "Owns the BNPL risk-scoring service across EU markets.",
      achievements: [
        "Rewrote risk-scoring hot path in Go, cutting p99 latency from 480ms to 65ms.",
        "Led architecture review across 4 squads, unblocking a €40M product launch.",
        "Founded internal Rust guild; 32 engineers actively contributing.",
      ],
    },
    {
      title: "Senior Engineer",
      company: "N26",
      duration: "2019 — 2022",
      description: "Migrated payment ledger from monolith to event-sourced microservices.",
      achievements: [
        "Architected and shipped event-sourced ledger handling 12M transactions/day.",
        "Reduced settlement reconciliation errors by 94% in first quarter post-launch.",
      ],
    },
  ],
  projects: [
    {
      name: "pgPool-rs",
      description: "Open-source Postgres connection pooler written in Rust.",
      tech: ["Rust", "Postgres", "Tokio"],
      impact: "1.2k GitHub stars, used by 3 YC companies.",
    },
  ],
  education: [
    { degree: "BSc Computer Science", institution: "TU Munich", year: "2016" },
  ],
  skills: [
    "TypeScript",
    "Go",
    "Rust",
    "Python",
    "PostgreSQL",
    "Kafka",
    "Kubernetes",
    "AWS",
    "Terraform",
    "Distributed systems",
  ],
  certifications: ["AWS Solutions Architect Pro"],
};

function TemplatesPage() {
  const profile = useAppStore((s) => s.profile);
  const resumes = useAppStore((s) => s.resumes);
  const data: ResumeData = resumes[0]?.data ?? buildFromProfile(profile) ?? SAMPLE;

  const [active, setActive] = useState<TemplateId>("minimal");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-bg">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-semibold">MemoryCV</span>
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back to dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">Templates</h1>
        <p className="mt-2 text-muted-foreground">
          Two premium resume templates — designed for recruiters, parsed cleanly by ATS.
        </p>

        <div className="mt-8 flex gap-2">
          {(["minimal", "executive"] as TemplateId[]).map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`rounded-full border px-5 py-2 text-sm capitalize transition-colors ${
                active === t
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-neutral-200 p-6 shadow-2xl">
          <div className="overflow-hidden rounded-md shadow-xl">
            <ResumePreview data={data} template={active} />
          </div>
        </div>
      </main>
    </div>
  );
}

function buildFromProfile(p: ReturnType<typeof useAppStore.getState>["profile"]): ResumeData | null {
  if (!p) return null;
  return {
    name: p.name,
    title: p.experience[0]?.title ?? "Professional",
    email: p.email,
    phone: p.phone,
    location: p.location,
    summary: p.summary,
    experience: p.experience,
    projects: p.projects,
    education: p.education,
    skills: [...p.skills.technical, ...p.skills.tools].slice(0, 14),
    certifications: p.certifications,
  };
}
