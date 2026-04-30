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
  summary: string;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  skills: string[];
  skillItems?: SkillItem[];
  certifications: string[];
}

export type TemplateId = "minimal" | "executive" | "noir" | "apex" | "slate" | "cipher" | "monolith" | "pinnacle" | "avant" | "vanguard" | "nexus" | "orbit" | "metric" | "prism" | "carbon" | "atlas" | "forge" | "zenith" | "vector" | "new-sleek" | "new-professional" | "new-academic" | "ref-torres" | "ref-silva" | "ref-schumacher" | "ref-palmerston" | "ref-sanchez" | "mercer";

export interface SavedResume {
  id: string;
  title: string;
  jobTarget: string;
  template: TemplateId;
  data: ResumeData;
  createdAt: number;
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
  inputType: "text" | "select" | "multiselect";
  options: string[];
  placeholder?: string;
}

export interface FollowUpAnswer {
  questionId: string;
  field: string;
  answer: string;
}
