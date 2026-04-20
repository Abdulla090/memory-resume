import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ArrowLeft, Sparkles, LayoutTemplate, CheckCircle2 } from "lucide-react";
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

type Category = "All" | "Minimal" | "Professional" | "Creative";

const TEMPLATES: { id: TemplateId; label: string; desc: string; category: Category; isNew?: boolean }[] = [
  { id: "minimal",   label: "Minimal",   desc: "Clean hierarchy", category: "Minimal" },
  { id: "slate",     label: "Slate",      desc: "Swiss precision", category: "Minimal" },
  { id: "avant",     label: "Avant",      desc: "Brutalist lines", category: "Minimal" },
  { id: "vanguard",  label: "Vanguard",   desc: "Massive typography", category: "Minimal" },
  { id: "executive", label: "Executive",  desc: "Dark sidebar", category: "Professional", isNew: false },
  { id: "apex",      label: "Apex",       desc: "Bold top bar", category: "Professional" },
  { id: "monolith",  label: "Monolith",   desc: "Highly structured", category: "Professional" },
  { id: "metric",    label: "Metric",     desc: "Data-driven", category: "Professional" },
  { id: "carbon",    label: "Carbon",     desc: "Charcoal sidebar", category: "Professional", isNew: true },
  { id: "atlas",     label: "Atlas",      desc: "Corporate authority", category: "Professional", isNew: true },
  { id: "noir",      label: "Noir",       desc: "All-black luxury", category: "Creative" },
  { id: "cipher",    label: "Cipher",     desc: "Dark tech aesthetic", category: "Creative" },
  { id: "pinnacle",  label: "Pinnacle",   desc: "Dark layered layout", category: "Creative" },
  { id: "nexus",     label: "Nexus",      desc: "Timeline SVG nodes", category: "Creative" },
  { id: "orbit",     label: "Orbit",      desc: "Interactive elements", category: "Creative" },
  { id: "prism",     label: "Prism",      desc: "Geometric shapes", category: "Creative" },
  { id: "forge",     label: "Forge",      desc: "Industrial brutalist", category: "Minimal", isNew: true },
  { id: "zenith",    label: "Zenith",     desc: "Gold luxury premium", category: "Professional", isNew: true },
  { id: "vector",    label: "Vector",     desc: "Dark mode tech", category: "Creative", isNew: true },
];

function Thumbnail({ id }: { id: TemplateId }) {
  // Generate a mini CSS abstract representation of the template
  switch (id) {
    case "executive":
      return (
        <div className="w-full h-full bg-white rounded-md flex overflow-hidden border border-slate-200">
          <div className="w-1/3 h-full bg-slate-800 p-1 flex flex-col gap-0.5">
            <div className="w-full h-1 bg-slate-600 rounded-sm" />
            <div className="w-2/3 h-0.5 bg-slate-700 rounded-sm" />
          </div>
          <div className="w-2/3 h-full p-1.5 flex flex-col gap-1">
            <div className="w-full h-1 bg-slate-200 rounded-sm" />
            <div className="w-full h-1 bg-slate-200 rounded-sm" />
            <div className="w-3/4 h-1 bg-slate-200 rounded-sm" />
          </div>
        </div>
      );
    case "noir":
    case "cipher":
    case "pinnacle":
      return (
        <div className="w-full h-full bg-slate-900 rounded-md p-1.5 flex flex-col gap-1 border border-slate-700">
          <div className="w-1/2 h-1.5 bg-slate-500 rounded-sm mx-auto mb-1" />
          <div className="w-full h-1 bg-slate-700 rounded-sm" />
          <div className="w-full h-1 bg-slate-700 rounded-sm" />
          <div className="w-4/5 h-1 bg-slate-700 rounded-sm" />
        </div>
      );
    case "apex":
      return (
        <div className="w-full h-full bg-white rounded-md flex flex-col overflow-hidden border border-slate-200">
          <div className="w-full h-4 bg-slate-800 p-1 flex flex-col justify-center items-center">
            <div className="w-1/2 h-1 bg-slate-500 rounded-sm" />
          </div>
          <div className="p-1 flex flex-col gap-1 flex-1">
            <div className="w-full h-1 bg-slate-200 rounded-sm" />
            <div className="w-3/4 h-1 bg-slate-200 rounded-sm" />
          </div>
        </div>
      );
    case "nexus":
    case "orbit":
    case "prism":
      return (
        <div className="w-full h-full bg-slate-50 rounded-md p-1.5 flex flex-col gap-1 border border-slate-200 relative overflow-hidden">
          <div className="absolute top-1 right-1 w-3 h-3 rounded-full border border-blue-400 opacity-50" />
          <div className="w-1/2 h-1.5 bg-blue-500 rounded-sm mb-1" />
          <div className="w-full h-1 bg-slate-200 rounded-sm" />
          <div className="w-4/5 h-1 bg-slate-200 rounded-sm" />
        </div>
      );
    case "carbon":
      return (
        <div className="w-full h-full bg-white rounded-md flex overflow-hidden border border-slate-200">
          <div className="w-1 h-full bg-slate-900" />
          <div className="w-1/3 h-full bg-slate-100 p-1 flex flex-col gap-0.5">
            <div className="w-3 h-3 rounded-sm bg-slate-300 mb-1" />
            <div className="w-full h-0.5 bg-slate-400 rounded-sm" />
          </div>
          <div className="flex-1 h-full p-1 flex flex-col gap-0.5">
            <div className="w-full h-0.5 bg-slate-200 rounded-sm" />
            <div className="w-full h-0.5 bg-slate-200 rounded-sm" />
          </div>
        </div>
      );
    case "atlas":
      return (
        <div className="w-full h-full bg-white rounded-md flex flex-col overflow-hidden border border-slate-200">
          <div className="w-full h-5 bg-slate-900 p-1 flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-slate-600" />
            <div className="w-1/2 h-1 bg-slate-600 rounded-sm" />
          </div>
          <div className="flex flex-1 p-1 gap-1">
            <div className="flex-1 flex flex-col gap-0.5">
              <div className="w-full h-0.5 bg-slate-200 rounded-sm" />
              <div className="w-full h-0.5 bg-slate-200 rounded-sm" />
            </div>
            <div className="w-1/3 flex flex-col gap-0.5">
              <div className="w-full h-0.5 bg-slate-300 rounded-sm" />
              <div className="w-full h-0.5 bg-slate-300 rounded-sm" />
            </div>
          </div>
        </div>
      );
    case "forge":
      return (
        <div className="w-full h-full bg-white rounded-md p-1.5 flex flex-col gap-1 border border-slate-200">
          <div className="w-full border-b-2 border-slate-900 pb-1 mb-0.5 flex justify-between">
            <div className="w-1/3 h-1.5 bg-slate-900 rounded-sm" />
            <div className="w-1/4 h-1 bg-slate-400 rounded-sm" />
          </div>
          <div className="flex gap-0.5">
            <div className="w-0.5 h-6 bg-slate-900 shrink-0" />
            <div className="flex flex-col gap-0.5 flex-1">
              <div className="w-full h-0.5 bg-slate-200 rounded-sm" />
              <div className="w-3/4 h-0.5 bg-slate-200 rounded-sm" />
            </div>
          </div>
        </div>
      );
    case "zenith":
      return (
        <div className="w-full h-full bg-white rounded-md p-1 flex flex-col items-center gap-1 border border-slate-200">
          <div className="w-4 h-4 rounded-full bg-slate-200 mt-0.5" />
          <div className="w-1/2 h-1 bg-slate-900 rounded-sm" />
          <div className="w-1/3 h-0.5 bg-yellow-600 rounded-sm" />
          <div className="w-full h-0.5 bg-slate-100 rounded-sm" />
          <div className="w-full h-0.5 bg-slate-100 rounded-sm" />
        </div>
      );
    case "vector":
      return (
        <div className="w-full h-full bg-slate-950 rounded-md flex flex-col overflow-hidden border border-slate-700">
          <div className="w-full bg-slate-900 p-1 border-b border-slate-700">
            <div className="w-1/2 h-1 bg-blue-400 rounded-sm" />
          </div>
          <div className="flex flex-1 p-1 gap-1">
            <div className="flex-1 flex flex-col gap-0.5">
              <div className="w-full h-0.5 bg-slate-700 rounded-sm" />
              <div className="w-3/4 h-0.5 bg-slate-700 rounded-sm" />
            </div>
            <div className="w-1/3 flex flex-col gap-0.5">
              <div className="w-full h-0.5 bg-blue-900 rounded-sm" />
              <div className="w-full h-0.5 bg-blue-900 rounded-sm" />
            </div>
          </div>
        </div>
      );
    default:
      // Minimal and others
      return (
        <div className="w-full h-full bg-white rounded-md p-1.5 flex flex-col gap-1 border border-slate-200">
          <div className="w-1/2 h-1.5 bg-slate-300 rounded-sm mb-1" />
          <div className="w-full h-1 bg-slate-100 rounded-sm" />
          <div className="w-full h-1 bg-slate-100 rounded-sm" />
          <div className="w-3/4 h-1 bg-slate-100 rounded-sm" />
        </div>
      );
  }
}

function TemplatesPage() {
  const profile = useAppStore((state) => state.profile);
  const resumes = useAppStore((state) => state.resumes);
  const data: ResumeData = resumes[0]?.data ?? buildFromProfile(profile) ?? SAMPLE;
  
  const [active, setActive] = useState<TemplateId>("minimal");
  const [filter, setFilter] = useState<Category>("All");

  const filteredTemplates = useMemo(() => {
    if (filter === "All") return TEMPLATES;
    return TEMPLATES.filter(t => t.category === filter);
  }, [filter]);

  const categories: Category[] = ["All", "Minimal", "Professional", "Creative"];

  return (
    <div className="min-h-screen bg-[#f8faff] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 relative overflow-hidden flex flex-col">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-300/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-400/10 rounded-full blur-[150px] pointer-events-none mix-blend-multiply" />

      {/* Glass Navigation */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-blue-100/50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 cursor-pointer group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-[0_4px_12px_rgba(37,99,235,0.3)] group-hover:shadow-[0_4px_16px_rgba(37,99,235,0.4)] transition-all duration-300 group-hover:scale-105">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-[1.05rem] font-bold tracking-tight text-slate-900 group-hover:text-blue-950 transition-colors">
                MemoryCV
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <Link 
                to="/onboarding" 
                className="px-4 py-2 text-sm font-medium text-blue-900/70 hover:text-blue-700 bg-white/50 hover:bg-blue-50 border border-transparent hover:border-blue-100 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1600px] w-full mx-auto grid gap-6 px-4 pb-24 pt-6 sm:px-6 lg:grid-cols-[400px_1fr] xl:grid-cols-[440px_1fr] relative z-10">
        
        {/* SIDEBAR: Ultimate User Friendly Template Picker */}
        <aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
          
          {/* Header Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-[1.5rem] p-6 border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden shrink-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-wide uppercase mb-3">
              <LayoutTemplate className="w-3.5 h-3.5" />
              Template Library
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Aesthetics</span>
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Select a template to instantly reformat your content.
            </p>
          </div>

          {/* Interactive Picker Area */}
          <div className="bg-white/60 backdrop-blur-md rounded-[1.5rem] p-4 border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col flex-1 min-h-0">
            
            {/* Pill Filters */}
            <div className="flex items-center gap-1.5 mb-4 pb-1 overflow-x-auto scrollbar-hide shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                    filter === cat
                      ? "bg-slate-800 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-1 pb-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              {filteredTemplates.map(({ id, label, isNew }) => {
                const isActive = active === id;
                return (
                  <button
                    key={id}
                    onClick={() => setActive(id)}
                    className={`group relative flex flex-col items-center gap-2 rounded-[1rem] p-2 transition-all duration-300 text-center ${
                      isActive 
                        ? "bg-blue-600 shadow-[0_8px_20px_rgba(37,99,235,0.2)] border-transparent scale-[1.02]" 
                        : "bg-white hover:bg-blue-50/50 border border-slate-200 hover:border-blue-200 hover:shadow-sm"
                    }`}
                  >
                    {/* Visual Thumbnail */}
                    <div className="w-full aspect-[1/1.2] rounded-lg overflow-hidden relative shadow-[0_2px_10px_rgba(0,0,0,0.05)] bg-slate-100">
                      <Thumbnail id={id} />
                      {isActive && (
                        <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center backdrop-blur-[1px]">
                          <CheckCircle2 className="w-8 h-8 text-blue-600 drop-shadow-md bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                    
                    {/* Label */}
                    <div className="w-full px-1 flex flex-col items-center mt-1 mb-1">
                      <span className={`text-sm font-bold truncate w-full ${isActive ? "text-white" : "text-slate-900"}`}>
                        {label}
                      </span>
                    </div>

                    {isNew && !isActive && (
                      <span className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 px-2 py-0.5 rounded-full bg-blue-500 text-white text-[9px] font-bold uppercase tracking-wider shadow-sm z-10 border border-white">
                        New
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Preview Area */}
        <section className="flex flex-col h-full min-h-[800px] lg:h-[calc(100vh-8rem)]">
          <div className="flex-1 bg-slate-200/50 backdrop-blur-3xl rounded-[2rem] p-4 sm:p-6 border border-slate-300/60 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)] relative flex flex-col overflow-hidden">
            
            {/* Toolbar Area */}
            <div className="flex items-center justify-between mb-4 px-2 shrink-0">
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white shadow-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Live Preview</span>
              </div>
              <div className="flex items-center gap-2">
                <ExportButtons data={data} template={active} name={data.name} />
              </div>
            </div>

            {/* Resume Container with smooth scroll */}
            <div className="flex-1 overflow-hidden rounded-[1rem] shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_30px_60px_-20px_rgba(0,0,0,0.15)] bg-white relative">
              <ClientPDFPreview data={data} template={active} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Client-only wrapper for the PDF Viewer to avoid SSR hydration issues
import { usePDF } from "@react-pdf/renderer";
import { GetPDFDocument, exportResumePDF } from "@/components/resume/pdf-templates";
import { exportResumeDocx } from "@/components/resume/docx-templates";
import { useEffect } from "react";
import { Download, FileText } from "lucide-react";

function ExportButtons({ data, template, name }: { data: ResumeData; template: TemplateId; name: string }) {
  const [pdfLoading, setPdfLoading] = useState(false);
  const [docxLoading, setDocxLoading] = useState(false);
  const filename = name.replace(/\s+/g, "_") || "resume";

  const handlePDF = async () => {
    setPdfLoading(true);
    try { await exportResumePDF(data, template, filename); } finally { setPdfLoading(false); }
  };
  const handleDocx = async () => {
    setDocxLoading(true);
    try { await exportResumeDocx(data, template, filename); } finally { setDocxLoading(false); }
  };

  return (
    <>
      <button
        onClick={handleDocx}
        disabled={docxLoading}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white text-xs font-bold tracking-wide text-slate-700 shadow-sm hover:bg-white hover:shadow-md transition-all disabled:opacity-50"
      >
        <FileText className="w-3.5 h-3.5" />
        {docxLoading ? "..." : "DOCX"}
      </button>
      <button
        onClick={handlePDF}
        disabled={pdfLoading}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 backdrop-blur-md border border-blue-500 text-xs font-bold tracking-wide text-white shadow-sm hover:bg-blue-700 hover:shadow-md transition-all disabled:opacity-50"
      >
        <Download className="w-3.5 h-3.5" />
        {pdfLoading ? "..." : "PDF"}
      </button>
    </>
  );
}



function ClientPDFPreview({ data, template }: { data: ResumeData; template: TemplateId }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-400">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-sm font-medium">Loading preview engine...</span>
      </div>
    );
  }

  return <PDFLivePreview data={data} template={template} />;
}

function PDFLivePreview({ data, template }: { data: ResumeData; template: TemplateId }) {
  const [instance, updateInstance] = usePDF({ document: <GetPDFDocument data={data} template={template} /> });

  useEffect(() => {
    updateInstance(<GetPDFDocument data={data} template={template} />);
  }, [data, template, updateInstance]);

  if (instance.loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-400">
         <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
         <span className="text-sm font-medium">Rendering vector preview...</span>
      </div>
    );
  }

  if (instance.error) {
    return <div className="p-4 text-red-500 flex h-full items-center justify-center text-center font-medium">Error rendering PDF: {String(instance.error)}</div>;
  }

  return (
    <iframe 
      src={`${instance.url}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`} 
      className="w-full h-full border-0 bg-white"
      title="Resume PDF Preview"
    />
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
