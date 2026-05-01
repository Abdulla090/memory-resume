import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useRef, useLayoutEffect } from "react";
import type { RefObject } from "react";
import { ArrowLeft, Sparkles, LayoutTemplate, CheckCircle2, Languages, X } from "lucide-react";
import { ResumePreview } from "@/components/resume/templates";
import { useAppStore } from "@/lib/store";
import type { ResumeData, TemplateId } from "@/lib/types";
import { exportPreviewAsPDF } from "@/lib/pdf-screenshot";
import { ZoomIn, ZoomOut } from "lucide-react";

const rtlTextPattern = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/;

function hasRTLText(data: ResumeData) {
  return rtlTextPattern.test(
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

export const Route = createFileRoute("/editor/")({
  head: () => ({
    meta: [
      { title: "Editor — MemoryCV" },
      { name: "description", content: "Preview the resume Templates — MemoryCV editor." },
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
      duration: "2022 ΓÇö Present",
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
      duration: "2019 ΓÇö 2022",
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

function toSoraniResume(data: ResumeData): ResumeData {
  return {
    ...data,
    name: "╪┤┘ê╪º┘å ┌⌐█ò┘à╪º┘ä",
    title: "╪ª█ò┘å╪»╪º╪▓█î╪º╪▒█î ╪│█î┘å█î█å╪▒█î ┘å█ò╪▒┘à█ò┌⌐╪º┌╡╪º",
    email: data.email ?? "shwan@example.com",
    phone: data.phone ?? "+964 750 000 0000",
    location: "┘ç█ò┘ê┘ä█Ä╪▒╪î ┌⌐┘ê╪▒╪»╪│╪¬╪º┘å",
    summary:
      "╪ª█ò┘å╪»╪º╪▓█î╪º╪▒█î ┘å█ò╪▒┘à█ò┌⌐╪º┌╡╪º ╪¿█ò ╪ª█ò╪▓┘à┘ê┘ê┘å█î ┘ü╪▒╪º┘ê╪º┘å ┘ä█ò ╪»╪▒┘ê╪│╪¬┌⌐╪▒╪»┘å█î ╪│█î╪│╪¬█ò┘à█î ┘╛█ò█î┘ê█ò┘å╪»█î╪»╪º╪▒ ┘ê ╪«╪▓┘à█ò╪¬┌»┘ê╪▓╪º╪▒█î█î█ò ╪»█î╪¼█î╪¬╪º┌╡█î█î█ò┌⌐╪º┘å. ┘╛╪│┘╛█å┌ò ┘ä█ò ╪¿╪º╪┤╪¬╪▒┌⌐╪▒╪»┘å█î ╪«█Ä╪▒╪º█î█î╪î ┌ò█Ä┌⌐╪«╪│╪¬┘å█î ╪¬█î┘à╪î ┘ê ┌»┘ê╪º╪│╪¬┘å█ò┘ê█ò█î ╪¿█î╪▒█å┌⌐█ò ╪ª╪º┌╡█å╪▓█ò┌⌐╪º┘å ╪¿█å ╪¿█ò╪▒┘ç█ò┘à█î ┌⌐╪º╪▒█î┌»█ò╪▒.",
    experience: [
      {
        title: "╪ª█ò┘å╪»╪º╪▓█î╪º╪▒█î ╪│█î┘å█î█å╪▒█î ┘å█ò╪▒┘à█ò┌⌐╪º┌╡╪º",
        company: "┌⌐█å┘à┘╛╪º┘å█î╪º█î ╪¬█ò┌⌐┘å█ò┘ä█å┌ÿ█î ┌ò┘ê┘ê┘å╪º┌⌐",
        duration: "┘ó┘á┘ó┘ó ΓÇö ╪ª█Ä╪│╪¬╪º",
        description: "╪│█ò╪▒┘╛█ò╪▒╪┤╪¬█î╪º╪▒█î ╪¿┘å█î╪º╪¬┘å╪º┘å█î ╪«╪▓┘à█ò╪¬┌»┘ê╪▓╪º╪▒█î█î█ò ╪│█ò╪▒█ò┌⌐█î█î█ò┌⌐╪º┘å ┘ê ╪¿╪º╪┤╪¬╪▒┌⌐╪▒╪»┘å█î ╪ª█ò╪»╪º█î ╪│█î╪│╪¬█ò┘à.",
        achievements: [
          "╪«█Ä╪▒╪º█î█î ┘ê█ò┌╡╪º┘à╪»╪º┘å█ò┘ê█ò█î ╪│█î╪│╪¬█ò┘à ╪¿█ò ╪┤█Ä┘ê█ò█î█ò┌⌐█î ╪¿█ò╪▒┌å╪º┘ê ╪¿╪º╪┤╪¬╪▒┌⌐╪▒╪º ┘ê ╪ª█ò╪▓┘à┘ê┘ê┘å█î ╪¿█ò┌⌐╪º╪▒┘ç█Ä┘å█ò╪▒ ┌ò┘ê┘ê┘å╪¬╪▒ ╪¿┘ê┘ê.",
          "┌ò█Ä┘å┘à╪º█î█î ┌å┘ê╪º╪▒ ╪¬█î┘à█î ╪¼█î╪º┘ê╪º╪▓ ┌⌐╪▒╪º ╪¿█å ┌ò╪º╪»█ò╪│╪¬┌⌐╪▒╪»┘å█î ╪¿█ò╪▒┘ç█ò┘à█Ä┌⌐█î ┌»╪▒┘å┌» ┘ä█ò ┌⌐╪º╪¬█î ╪»█î╪º╪▒█î┌⌐╪▒╪º┘ê.",
          "┌ò█Ä┌⌐╪«╪│╪¬┘å█î ┌ò█Ä╪¿╪º╪▓█Ä┌⌐█î ┘å┘ê█Ä ╪¿█å ┘╛╪┤┌⌐┘å█î┘å█î ┌⌐█å╪» ┘ê ┌⌐█ò┘à┌⌐╪▒╪»┘å█ò┘ê█ò█î ┘ç█ò┌╡█ò┌⌐╪º┘å█î ╪¿█ò╪▒┘ç█ò┘à.",
        ],
      },
      {
        title: "╪ª█ò┘å╪»╪º╪▓█î╪º╪▒█î ┘å█ò╪▒┘à█ò┌⌐╪º┌╡╪º",
        company: "╪│╪¬█å╪»█î█å█î ╪»█î╪¼█î╪¬╪º┌╡█î ┌⌐╪º╪▒┘ê╪º┘å",
        duration: "┘ó┘á┘í┘⌐ ΓÇö ┘ó┘á┘ó┘ó",
        description: "╪»╪▒┘ê╪│╪¬┌⌐╪▒╪»┘å█î ╪»╪º╪┤╪¿█å╪▒╪» ┘ê ╪│█î╪│╪¬█ò┘à█î ┘å╪º┘ê╪«█å█î█î ╪¿█å ╪¿█ò┌ò█Ä┘ê█ò╪¿╪▒╪»┘å█î ┌⌐╪º╪▒.",
        achievements: [
          "┘╛╪▒█å╪│█ò█î ┌ò╪º┘╛█å╪▒╪¬┌⌐╪▒╪»┘å ╪¿█ò ╪ª█å╪¬█å┘à╪º╪¬█î┌⌐█î ┌⌐╪▒╪º ┘ê ┌⌐╪º╪¬█î ┌⌐╪º╪▒█î ┘ç█ò┘ü╪¬╪º┘å█ò ┌⌐█ò┘à┌⌐╪▒╪º█î█ò┘ê█ò.",
          "┌å┘ê╪º╪▒┌å█Ä┘ê█ò█î ┘ç╪º┘ê╪¿█ò╪┤█î UI ╪»╪▒┘ê╪│╪¬┌⌐╪▒╪º ╪¿█å █î█ò┌⌐╪│╪º┘å┌⌐╪▒╪»┘å█î ╪ª█ò╪▓┘à┘ê┘ê┘å█î ╪¿█ò┌⌐╪º╪▒┘ç█Ä┘å█ò╪▒.",
        ],
      },
    ],
    projects: [
      {
        name: "╪│█î╪│╪¬█ò┘à█î ┘ç█ò┌╡╪│█ò┘å┌»╪º┘å╪»┘å█î ╪▓█î╪▒█ò┌⌐",
        description: "╪ª╪º┘à╪▒╪º╪▓█Ä┌⌐█î ┘å╪º┘ê╪«█å█î█î ╪¿█å ┌ò█Ä┌⌐╪«╪│╪¬┘å ┘ê ┘╛█Ä┘ê╪º┘å█ò┌⌐╪▒╪»┘å█î ┌⌐╪º╪▒╪º█î█î ╪¬█î┘à█ò┌⌐╪º┘å.",
        tech: ["TypeScript", "React", "PostgreSQL"],
        impact: "╪¿█ò┌⌐╪º╪▒┘ç╪º╪¬┘ê┘ê█ò ┘ä█ò┘ä╪º█î█ò┘å ┌å█ò┘å╪» ╪¬█î┘à█Ä┌⌐█î ╪¿█ò╪▒┘ç█ò┘à.",
      },
      {
        name: "╪»╪º╪┤╪¿█å╪▒╪»█î ┌ò╪º┘╛█å╪▒╪¬",
        description: "╪¿█î┘å█î┘å█î ╪«█Ä╪▒╪º█î ╪»╪º╪¬╪º█î ┌⌐╪º╪▒ ┘ê ┘╛█Ä┘ê█ò╪▒█ò ┌»╪▒┘å┌»█ò┌⌐╪º┘å ╪¿█å ╪¿█ò┌ò█Ä┘ê█ò╪¿█ò╪▒╪º┘å.",
        tech: ["Node.js", "Charts", "API"],
        impact: "┌⌐╪º╪¬█î ╪ª╪º┘à╪º╪»█ò┌⌐╪▒╪»┘å█î ┌ò╪º┘╛█å╪▒╪¬█î ┘à╪º┘å┌»╪º┘å█ò█î ┌⌐█ò┘à┌⌐╪▒╪»█ò┘ê█ò.",
      },
    ],
    education: [{ degree: "╪¿█ò┌⌐╪º┘ä█å╪▒█î█å╪│ ┘ä█ò ╪▓╪º┘å╪│╪¬█î ┌⌐█å┘à┘╛█î┘ê╪¬█ò╪▒", institution: "╪▓╪º┘å┌⌐█å█î ╪│█ò┘ä╪º╪¡█ò╪»█î┘å", year: "┘ó┘á┘í┘ª" }],
    skills: ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker", "AWS", "┌ò█Ä╪¿█ò╪▒╪º█î█ò╪¬█î ╪¬█î┘à", "┌å╪º╪▒█ò╪│█ò╪▒┌⌐╪▒╪»┘å█î ┌⌐█Ä╪┤█ò"],
    skillItems: [
      { name: "TypeScript", level: 5 },
      { name: "React", level: 5 },
      { name: "Node.js", level: 4 },
      { name: "PostgreSQL", level: 4 },
      { name: "Docker", level: 3 },
      { name: "AWS", level: 4 },
      { name: "┌ò█Ä╪¿█ò╪▒╪º█î█ò╪¬█î ╪¬█î┘à", level: 5 },
      { name: "┌å╪º╪▒█ò╪│█ò╪▒┌⌐╪▒╪»┘å█î ┌⌐█Ä╪┤█ò", level: 5 },
    ],
    certifications: ["╪¿┌ò┘ê╪º┘å╪º┘à█ò█î ┘╛█î╪┤█ò█î█î AWS", "╪¿┌ò┘ê╪º┘å╪º┘à█ò█î ╪¿█ò┌ò█Ä┘ê█ò╪¿╪▒╪»┘å█î ┘╛╪▒█å┌ÿ█ò"],
  };
}

type Category = "All" | "Minimal" | "Professional" | "Academic" | "Creative";

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
  { id: "new-sleek", label: "NEW Sleek A4", desc: "Photo-led precision", category: "Professional", isNew: true },
  { id: "new-professional", label: "NEW Professional A4", desc: "Executive sidebar", category: "Professional", isNew: true },
  { id: "new-academic", label: "NEW Academic A4", desc: "Research CV layout", category: "Academic", isNew: true },
  { id: "ref-torres", label: "NEW Torres Exact", desc: "Blue photo sidebar", category: "Professional", isNew: true },
  { id: "ref-silva", label: "NEW Silva Exact", desc: "Brown account split", category: "Professional", isNew: true },
  { id: "ref-schumacher", label: "NEW Schumacher Exact", desc: "Orange skill bars", category: "Creative", isNew: true },
  { id: "ref-palmerston", label: "NEW Palmerston Exact", desc: "Slate graphic designer", category: "Professional", isNew: true },
  { id: "ref-sanchez", label: "NEW Sanchez Exact", desc: "Timeline manager", category: "Professional", isNew: true },
  { id: "mercer", label: "NEW Mercer Exact", desc: "Navy structured dual-column", category: "Professional", isNew: true },
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

const MINI_SAMPLE: ResumeData = {
  name: "Jane Doe",
  title: "Product Designer",
  email: "jane@example.com",
  phone: "+1 234 567 890",
  photoUrl: "https://picsum.photos/seed/maya-okafor-headshot/240/240",
  location: "New York, NY",
  summary: "Creative designer focusing on UI/UX and visual storytelling.",
  experience: [
    {
      title: "Lead Designer",
      company: "Creative Studio",
      duration: "2020 ΓÇö Present",
      description: "Leading design team for major client projects.",
      achievements: [
        "Delivered award-winning campaigns.",
      ],
    },
    {
      title: "UX Designer",
      company: "Tech Startup",
      duration: "2018 ΓÇö 2020",
      description: "Designed core application interfaces.",
      achievements: [],
    }
  ],
  projects: [],
  education: [{ degree: "BFA Design", institution: "Design School", year: "2018" }],
  skills: ["Figma", "UI/UX", "Prototyping"],
  certifications: [],
};

function Thumbnail({ id }: { id: TemplateId }) {
  return (
    <div className="absolute inset-0 bg-white overflow-hidden flex items-start justify-center">
      <div 
        className="origin-top pointer-events-none mt-2"
        style={{
          width: '794px',
          height: '1123px',
          transform: 'scale(0.18)',
        }}
      >
        <ResumePreview data={MINI_SAMPLE} template={id} />
      </div>
    </div>
  );
}

function TemplatesPage() {
  const profile = useAppStore((state) => state.profile);
  const resumes = useAppStore((state) => state.resumes);
  const data: ResumeData = resumes[0]?.data ?? buildFromProfile(profile) ?? SAMPLE;
  
  const [active, setActive] = useState<TemplateId>("minimal");
  const [filter, setFilter] = useState<Category>("All");
  const [soraniMode, setSoraniMode] = useState(false);
  const previewData = useMemo(() => soraniMode ? toSoraniResume(data) : data, [data, soraniMode]);
  const [zoom, setZoom] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const filteredTemplates = useMemo(() => {
    if (filter === "All") return TEMPLATES;
    return TEMPLATES.filter(t => t.category === filter);
  }, [filter]);

  const categories: Category[] = ["All", "Minimal", "Professional", "Academic", "Creative"];

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

      <main className="flex-1 max-w-[1600px] w-full mx-auto grid gap-4 px-3 pb-20 pt-4 sm:gap-6 sm:px-6 sm:pb-24 sm:pt-6 lg:grid-cols-[400px_1fr] xl:grid-cols-[440px_1fr] relative z-10">
        
        {/* Backdrop for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[90] lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* SIDEBAR: Ultimate User Friendly Template Picker */}
        <aside className={`
          flex flex-col gap-4
          fixed inset-y-0 left-0 z-[100] w-[320px] sm:w-[380px] bg-[#f8faff] pt-4 pb-6 px-4 sm:px-5 transition-transform duration-300 overflow-y-auto
          lg:static lg:overflow-visible lg:bg-transparent lg:p-0 lg:z-auto lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]
          ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0 lg:shadow-none"}
        `}>
          
          {/* Header Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-[1.5rem] p-5 border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden shrink-0">
            {/* Mobile close button */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-3 right-3 lg:hidden p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-wide uppercase mb-3">
              <LayoutTemplate className="w-3.5 h-3.5" />
              Template Library
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Aesthetics</span>
            </h1>
            <p className="mt-1.5 text-sm text-slate-600">
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
                    onClick={() => {
                      setActive(id);
                      setIsSidebarOpen(false);
                    }}
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
                        <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center backdrop-blur-[1px] z-10">
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
        <section className="flex flex-col h-full lg:h-[calc(100vh-8rem)]">
          <div className="flex-1 bg-slate-200/50 backdrop-blur-3xl rounded-[2rem] p-2 sm:p-4 lg:p-6 border border-slate-300/60 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)] relative flex flex-col overflow-hidden h-[calc(100vh-10rem)] lg:h-auto">
            
            {/* Toolbar Area */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-2 shrink-0">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)] hover:bg-blue-700 active:scale-95 transition-all font-bold text-sm"
                >
                  <LayoutTemplate className="w-4 h-4" />
                  Select Template
                </button>
                <div className="hidden sm:flex items-center gap-3 bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Live Preview</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSoraniMode((value) => !value)}
                  className={`flex items-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-bold tracking-wide shadow-sm transition-all active:scale-[0.98] ${
                    soraniMode
                      ? "border-slate-800 bg-slate-900 text-white"
                      : "border-white bg-white/80 text-slate-700 hover:bg-white"
                  }`}
                >
                  <Languages className="h-4 w-4" />
                  <span className="hidden sm:inline">{soraniMode ? "┌⌐┘ê╪▒╪»█î" : "Kurdish RTL"}</span>
                  <span className="sm:hidden">{soraniMode ? "KU" : "EN"}</span>
                </button>
                <div className="flex items-center rounded-xl border border-slate-200 bg-white/80 shadow-sm overflow-hidden">
                  <button onClick={() => setZoom(z => Math.max(0.5, z - 0.25))} className="p-1.5 sm:p-2 hover:bg-slate-100 text-slate-600 transition-colors" title="Zoom Out">
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-700 w-8 sm:w-10 text-center">{Math.round(zoom * 100)}%</span>
                  <button onClick={() => setZoom(z => Math.min(2, z + 0.25))} className="p-1.5 sm:p-2 hover:bg-slate-100 text-slate-600 transition-colors" title="Zoom In">
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <ExportButtons data={previewData} template={active} name={previewData.name} previewRef={previewRef} />
                </div>
              </div>
            </div>

            {/* Resume Container with smooth scroll */}
            <div className="flex-1 overflow-hidden rounded-[1rem] shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_30px_60px_-20px_rgba(0,0,0,0.15)] bg-white relative @container">
              <ClientPDFPreview data={previewData} template={active} previewRef={previewRef} zoom={zoom} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

import { exportResumeDocx } from "@/components/resume/docx-templates";
import { Download, FileText } from "lucide-react";

function ExportButtons({ data, template, name, previewRef }: { data: ResumeData; template: TemplateId; name: string; previewRef: RefObject<HTMLDivElement | null> }) {
  const [pdfLoading, setPdfLoading] = useState(false);
  const [docxLoading, setDocxLoading] = useState(false);
  const filename = name.replace(/\s+/g, "_") || "resume";
  const rtlExport = hasRTLText(data);

  const handlePDF = async () => {
    setPdfLoading(true);
    try {
      if (previewRef.current) {
        await exportPreviewAsPDF(previewRef.current, filename);
      }
    } finally { setPdfLoading(false); }
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
        className="flex items-center gap-1.5 px-3 py-2.5 sm:py-1.5 rounded-xl sm:rounded-full bg-white/80 backdrop-blur-md border border-white text-xs font-bold tracking-wide text-slate-700 shadow-sm hover:bg-white hover:shadow-md transition-all disabled:opacity-50"
      >
        <FileText className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
        <span className="hidden sm:inline">{docxLoading ? "..." : "DOCX"}</span>
      </button>
      <button
        onClick={handlePDF}
        disabled={pdfLoading}
        className="flex items-center gap-1.5 px-4 py-2.5 sm:py-1.5 rounded-xl sm:rounded-full bg-blue-600 backdrop-blur-md border border-blue-500 text-xs font-bold tracking-wide text-white shadow-sm hover:bg-blue-700 hover:shadow-md transition-all disabled:opacity-50"
      >
        <Download className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
        <span className="hidden sm:inline">{pdfLoading ? "..." : rtlExport ? "Canvas PDF" : "PDF"}</span>
        <span className="sm:hidden font-bold">{pdfLoading ? "..." : "PDF"}</span>
      </button>
    </>
  );
}



function ClientPDFPreview({ data, template, previewRef, zoom = 1 }: { data: ResumeData; template: TemplateId; previewRef: RefObject<HTMLDivElement | null>; zoom?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [baseScale, setBaseScale] = useState(0.5); // Default safe scale
  const [contentHeight, setContentHeight] = useState(1122);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const preview = previewRef.current;
    if (!container || !preview) return;

    const updateScale = () => {
      // Use parentElement's dimensions if possible, or container itself
      const parent = container.parentElement;
      if (!parent) return;
      
      const availableW = parent.clientWidth - 32; // 16px padding * 2
      const availableH = parent.clientHeight - 32;
      
      const contentW = 794; // Fixed A4 width
      // Get the actual height of the content, ensuring at least A4 height
      const actualContentH = Math.max(preview.scrollHeight, 1122);
      setContentHeight(actualContentH);
      
      const scaleW = availableW / contentW;
      const scaleH = availableH / actualContentH;
      
      setBaseScale(Math.min(scaleW, scaleH));
    };

    const observer = new ResizeObserver(updateScale);
    if (container.parentElement) observer.observe(container.parentElement);
    observer.observe(preview);

    // Initial calculation
    updateScale();

    return () => observer.disconnect();
  }, [data, template, previewRef]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-auto bg-slate-100/50 p-2 sm:p-4">
      <div className="flex min-h-full min-w-full w-fit">
        <div 
          className="m-auto transition-all duration-300 ease-out shrink-0 flex justify-center" 
          style={{ width: 794 * baseScale * zoom, height: contentHeight * baseScale * zoom }}
        >
          <div
            ref={previewRef}
            className="w-[794px] origin-top transition-transform duration-300 ease-out overflow-hidden rounded-sm bg-white shadow-[0_20px_50px_-24px_rgba(15,23,42,0.45)] shrink-0"
            style={{ transform: `scale(${baseScale * zoom})`, minHeight: '1122px' }}
          >
            <ResumePreview data={data} template={template} />
          </div>
        </div>
      </div>
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

