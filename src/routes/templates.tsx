import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ArrowLeft } from "lucide-react";
import { ResumePreview } from "@/components/resume/templates";
import type { TemplateId } from "@/lib/types";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Templates — MemoryCV" },
      { name: "description", content: "Explore our collection of world-class resume templates." },
    ],
  }),
  component: TemplatesGalleryPage,
});

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
  { id: "gallego", label: "NEW Gallego Exact", desc: "Teal presentation designer", category: "Professional", isNew: true },
  { id: "leroy", label: "NEW Leroy Exact", desc: "French real estate profile", category: "Professional", isNew: true },
  { id: "dubois", label: "NEW Dubois Exact", desc: "French project manager", category: "Professional", isNew: true },
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

const MINI_SAMPLE: any = {
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
      duration: "2020 — Present",
      description: "Leading design team for major client projects.",
      achievements: [
        "Delivered award-winning campaigns.",
      ],
    },
    {
      title: "UX Designer",
      company: "Tech Startup",
      duration: "2018 — 2020",
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
    <div className="absolute inset-0 bg-slate-100 overflow-hidden pointer-events-none flex items-center justify-center">
      <svg viewBox="0 0 794 1123" className="w-full h-full">
        <foreignObject width="794" height="1123">
          <div className="w-[794px] h-[1123px] bg-white text-left">
            <ResumePreview data={MINI_SAMPLE} template={id} />
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}

function TemplatesGalleryPage() {
  return (
    <div className="min-h-screen bg-[#f8faff] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 relative overflow-hidden flex flex-col">
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-300/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-400/10 rounded-full blur-[150px] pointer-events-none mix-blend-multiply" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-blue-100/50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 cursor-pointer group">
              <img src="/logo/MemoryCV Logo Icon Only.png" alt="MemoryCV" className="w-16 h-16 rounded-xl object-contain group-hover:scale-105 transition-transform duration-300" />
              <span className="text-2xl font-bold tracking-tight text-slate-900 group-hover:text-blue-950 transition-colors">
                MemoryCV
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <Link 
                to="/" 
                className="px-4 py-2 text-sm font-medium text-blue-900/70 hover:text-blue-700 bg-white/50 hover:bg-blue-50 border border-transparent hover:border-blue-100 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
          World-class <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Templates</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 font-medium">
          Choose a premium template to instantly reformat your professional memory into a winning resume.
        </p>
      </section>

      {/* Grid */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 pb-24 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {TEMPLATES.map((t) => (
            <Link 
              key={t.id} 
              to="/onboarding"
              className="group relative flex flex-col items-center gap-3 rounded-[1.5rem] p-4 bg-white hover:bg-blue-50/30 border border-slate-200 hover:border-blue-300 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(37,99,235,0.15)]"
            >
              <div className="w-full aspect-[1/1.4] rounded-xl overflow-hidden relative shadow-[0_4px_20px_rgba(0,0,0,0.06)] bg-slate-100 border border-slate-100">
                <Thumbnail id={t.id} />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <span className="px-5 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    Use Template
                  </span>
                </div>
              </div>
              
              <div className="w-full px-2 text-left">
                <h3 className="text-lg font-bold text-slate-900 flex items-center justify-between">
                  {t.label}
                  {t.isNew && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                      New
                    </span>
                  )}
                </h3>
                <p className="text-sm font-medium text-slate-500">{t.category} • {t.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
