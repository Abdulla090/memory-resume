import { getTemplateDefaults } from "@/components/DesignPanel";
import type { TemplateId } from "@/lib/types";

export const DEV_SAMPLE_ID = "dev";
export const LAYOUT_STORAGE_KEY = "memorycv-editor-layout";

export const DEV_RESUME = {
  id: DEV_SAMPLE_ID,
  title: "Senior Product Designer",
  template: "minimal" as TemplateId,
  design: getTemplateDefaults("minimal"),
  createdAt: Date.now(),
  jobTarget: "Lead Product Designer at a SaaS company",
  data: {
    name: "Alex Morgan",
    title: "Senior Product Designer",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 012-3456",
    location: "San Francisco, CA",
    photoUrl: "https://picsum.photos/seed/alex/240/240",
    summary:
      "Award-winning designer with 8+ years crafting high-impact digital products. Led design systems adopted by 30+ cross-functional teams, improving delivery speed by 40%.",
    experience: [
      {
        title: "Lead Product Designer",
        company: "Acme Corp",
        duration: "2021 – Present",
        description: "Led a team of 6 designers across 3 product lines.",
        achievements: [
          "Shipped 12 major features with avg. 4.8★ user rating",
          "Grew NPS from 34 → 72 through redesigned onboarding",
          "Built a design system used by 30+ teams, cutting dev handoff by 40%",
        ],
      },
      {
        title: "UX Designer",
        company: "Startup Inc.",
        duration: "2018 – 2021",
        description: "End-to-end product design for B2B SaaS.",
        achievements: [
          "Redesigned core dashboard — reduced task completion time by 35%",
          "Cut monthly churn by 22% through targeted UX improvements",
        ],
      },
    ],
    projects: [
      {
        name: "Ocean Design System",
        description: "Built from scratch, including 120+ components.",
        impact: "Adopted by 30+ teams; reduced design–dev cycle by 40%",
        tech: ["Figma", "React", "Storybook"],
      },
    ],
    education: [
      { degree: "BFA Graphic Design", institution: "Rhode Island School of Design", year: "2018" },
    ],
    skills: ["Figma", "React", "UX Research", "Prototyping", "Design Systems", "Framer"],
    certifications: ["Google UX Certificate 2023", "Nielsen Norman UX Leadership"],
  },
};

export type Category = "All" | "Minimal" | "Professional" | "Academic" | "Creative";

export const TEMPLATES: {
  id: TemplateId;
  label: string;
  desc: string;
  category: Category;
  isNew?: boolean;
}[] = [
  { id: "minimal", label: "Minimal", desc: "Clean hierarchy", category: "Minimal" },
  { id: "slate", label: "Slate", desc: "Swiss precision", category: "Minimal" },
  { id: "avant", label: "Avant", desc: "Brutalist lines", category: "Minimal" },
  { id: "vanguard", label: "Vanguard", desc: "Massive typography", category: "Minimal" },
  {
    id: "executive",
    label: "Executive",
    desc: "Dark sidebar",
    category: "Professional",
    isNew: false,
  },
  { id: "apex", label: "Apex", desc: "Bold top bar", category: "Professional" },
  { id: "monolith", label: "Monolith", desc: "Highly structured", category: "Professional" },
  { id: "metric", label: "Metric", desc: "Data-driven", category: "Professional" },
  {
    id: "carbon",
    label: "Carbon",
    desc: "Charcoal sidebar",
    category: "Professional",
    isNew: true,
  },
  {
    id: "atlas",
    label: "Atlas",
    desc: "Corporate authority",
    category: "Professional",
    isNew: true,
  },
  {
    id: "new-sleek",
    label: "NEW Sleek A4",
    desc: "Photo-led precision",
    category: "Professional",
    isNew: true,
  },
  {
    id: "new-professional",
    label: "NEW Professional A4",
    desc: "Executive sidebar",
    category: "Professional",
    isNew: true,
  },
  {
    id: "new-academic",
    label: "NEW Academic A4",
    desc: "Research CV layout",
    category: "Academic",
    isNew: true,
  },
  {
    id: "ref-torres",
    label: "NEW Torres Exact",
    desc: "Blue photo sidebar",
    category: "Professional",
    isNew: true,
  },
  {
    id: "ref-silva",
    label: "NEW Silva Exact",
    desc: "Brown account split",
    category: "Professional",
    isNew: true,
  },
  {
    id: "ref-schumacher",
    label: "NEW Schumacher Exact",
    desc: "Orange skill bars",
    category: "Creative",
    isNew: true,
  },
  {
    id: "ref-palmerston",
    label: "NEW Palmerston Exact",
    desc: "Slate graphic designer",
    category: "Professional",
    isNew: true,
  },
  {
    id: "ref-alvarado",
    label: "NEW Alvarado Exact",
    desc: "Two-tone classic profile",
    category: "Professional",
    isNew: true,
  },
  {
    id: "new-alvarado",
    label: "NEW Lorna Pixel",
    desc: "Pixel perfect match",
    category: "Professional",
    isNew: true,
  },
  {
    id: "ref-sanchez",
    label: "NEW Sanchez Exact",
    desc: "Timeline manager",
    category: "Professional",
    isNew: true,
  },
  {
    id: "mercer",
    label: "NEW Mercer Exact",
    desc: "Navy structured dual-column",
    category: "Professional",
    isNew: true,
  },
  {
    id: "gallego",
    label: "NEW Gallego Exact",
    desc: "Teal presentation designer",
    category: "Professional",
    isNew: true,
  },
  {
    id: "leroy",
    label: "NEW Leroy Exact",
    desc: "French real estate profile",
    category: "Professional",
    isNew: true,
  },
  {
    id: "dubois",
    label: "NEW Dubois Exact",
    desc: "French project manager",
    category: "Professional",
    isNew: true,
  },
  { id: "noir", label: "Noir", desc: "All-black luxury", category: "Creative" },
  { id: "cipher", label: "Cipher", desc: "Dark tech aesthetic", category: "Creative" },
  { id: "pinnacle", label: "Pinnacle", desc: "Dark layered layout", category: "Creative" },
  { id: "nexus", label: "Nexus", desc: "Timeline SVG nodes", category: "Creative" },
  { id: "orbit", label: "Orbit", desc: "Interactive elements", category: "Creative" },
  { id: "prism", label: "Prism", desc: "Geometric shapes", category: "Creative" },
  { id: "forge", label: "Forge", desc: "Industrial brutalist", category: "Minimal", isNew: true },
  {
    id: "zenith",
    label: "Zenith",
    desc: "Gold luxury premium",
    category: "Professional",
    isNew: true,
  },
  { id: "vector", label: "Vector", desc: "Dark mode tech", category: "Creative", isNew: true },
];
