export interface Profile {
  name: string;
  location: string;
  email?: string;
  phone?: string;
  photoUrl?: string;
  languages: string[];
  summary: string;
  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
    languages_spoken: string[];
  };
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: string[];
  careerGoals: string;
  personalityTraits: string[];
  industryExperience: string[];
  inferredStrengths: string[];
  skillItems?: SkillItem[];
}

export interface ExperienceItem {
  title: string;
  company: string;
  duration: string;
  description: string;
  achievements: string[];
}

export interface ProjectItem {
  name: string;
  description: string;
  tech: string[];
  impact: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface ResumeData {
  name: string;
  title: string;
  email?: string;
  phone?: string;
  photoUrl?: string;
  location?: string;
  languages?: string[];
  summary: string;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  skills: string[];
  skillItems?: SkillItem[];
  certifications: string[];
  sectionTitles?: Record<string, string>;
}

// ── Design Control Panel Settings ────────────────────────────
export interface DesignSettings {
  // Typography
  fontFamily: string;
  headingFontFamily: string;
  baseFontSize: number; // px, 10-16
  headingScale: number; // multiplier, 1.0-2.0
  lineHeight: number; // 1.2-2.0
  letterSpacing: number; // em, -0.05 to 0.2

  // Colors
  accentColor: string; // hex
  textColor: string; // hex
  headingColor: string; // hex
  backgroundColor: string; // hex
  sidebarColor: string; // hex (for sidebar templates)

  // Spacing
  pagePaddingX: number; // px, 20-80
  pagePaddingY: number; // px, 20-80
  sectionGap: number; // px, 8-48
  itemGap: number; // px, 4-24

  // Decorations - vectors
  showDividers: boolean;
  dividerStyle: "solid" | "dashed" | "dotted" | "none";
  showSectionIcons: boolean;
  headerShape: "none" | "bar" | "wave" | "diagonal" | "arch";
  bulletStyle: "dot" | "dash" | "square" | "arrow" | "star" | "none";
  showCanvasDecorations: boolean;
  canvasDecorationStyle: "none" | "blobs" | "grid" | "corners";

  // Skill bars
  showSkillBars: boolean;
  skillBarStyle: "filled" | "dots" | "circles" | "lines" | "stars" | "text";
  skillsLocation?: "sidebar" | "main";
  skillsColumns?: 1 | 2;

  // Photo
  photoShape: "circle" | "rounded" | "square" | "none";
  photoSize: number; // px, 60-140

  // Layout
  columnLayout: "single" | "two-col" | "sidebar-left" | "sidebar-right";
  contentOrder: string[]; // section ordering
}

export type TemplateId =
  | "minimal"
  | "executive"
  | "noir"
  | "apex"
  | "slate"
  | "cipher"
  | "monolith"
  | "pinnacle"
  | "avant"
  | "vanguard"
  | "nexus"
  | "orbit"
  | "metric"
  | "prism"
  | "carbon"
  | "atlas"
  | "forge"
  | "zenith"
  | "vector"
  | "new-sleek"
  | "new-professional"
  | "new-academic"
  | "ref-torres"
  | "ref-silva"
  | "ref-schumacher"
  | "ref-palmerston"
  | "ref-sanchez"
  | "ref-alvarado"
  | "new-alvarado"
  | "mercer"
  | "gallego"
  | "leroy"
  | "dubois";

export interface SavedResume {
  id: string;
  title: string;
  jobTarget: string;
  template: TemplateId;
  data: ResumeData;
  createdAt: number;
  design?: DesignSettings;
}

export interface CareerPath {
  title: string;
  matchScore: number;
  whyFit: string;
  skillGaps: string[];
  salaryRange: string;
  timeToTransition: string;
}

export interface FollowUpQuestion {
  id: string;
  field: string;
  question: string;
  helperText: string;
  inputType: "text" | "select" | "multiselect" | "rating";
  options: string[];
  placeholder?: string;
}

export interface FollowUpAnswer {
  questionId: string;
  field: string;
  answer: string;
}
