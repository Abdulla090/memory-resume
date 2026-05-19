import { z } from "zod";
import type { Profile, ResumeData } from "@/lib/types";

export const languageSchema = z.enum(["en", "ku"]);

export const experienceItemSchema = z.object({
  title: z.string().max(200),
  company: z.string().max(200),
  duration: z.string().max(100),
  description: z.string().max(5000),
  achievements: z.array(z.string().max(2000)).max(30),
});

export const projectItemSchema = z.object({
  name: z.string().max(200),
  description: z.string().max(5000),
  tech: z.array(z.string().max(100)).max(50),
  impact: z.string().max(2000),
});

export const educationItemSchema = z.object({
  degree: z.string().max(300),
  institution: z.string().max(300),
  year: z.string().max(50),
});

export const skillItemSchema = z.object({
  name: z.string().max(100),
  level: z.number().min(1).max(5),
});

export const profileSchema = z.object({
  name: z.string().max(200),
  location: z.string().max(300),
  email: z.string().max(320).optional(),
  phone: z.string().max(50).optional(),
  photoUrl: z.string().max(2000).optional(),
  languages: z.array(z.string().max(100)).max(30),
  summary: z.string().max(10000),
  skills: z.object({
    technical: z.array(z.string().max(100)).max(100),
    soft: z.array(z.string().max(100)).max(100),
    tools: z.array(z.string().max(100)).max(100),
    languages_spoken: z.array(z.string().max(100)).max(30),
  }),
  experience: z.array(experienceItemSchema).max(30),
  projects: z.array(projectItemSchema).max(30),
  education: z.array(educationItemSchema).max(20),
  certifications: z.array(z.string().max(300)).max(50),
  careerGoals: z.string().max(5000),
  personalityTraits: z.array(z.string().max(200)).max(50),
  industryExperience: z.array(z.string().max(200)).max(50),
  inferredStrengths: z.array(z.string().max(200)).max(50),
  skillItems: z.array(skillItemSchema).max(100).optional(),
});

export const resumeDataSchema = z.object({
  name: z.string().max(200),
  title: z.string().max(300),
  email: z.string().max(320).optional(),
  phone: z.string().max(50).optional(),
  photoUrl: z.string().max(2000).optional(),
  location: z.string().max(300).optional(),
  languages: z.array(z.string().max(100)).max(30).optional(),
  summary: z.string().max(10000),
  experience: z.array(experienceItemSchema).max(30),
  projects: z.array(projectItemSchema).max(30),
  education: z.array(educationItemSchema).max(20),
  skills: z.array(z.string().max(100)).max(100),
  skillItems: z.array(skillItemSchema).max(100).optional(),
  certifications: z.array(z.string().max(300)).max(50),
  sectionTitles: z.record(z.string(), z.string().max(200)).optional(),
});

export const apiKeyInputSchema = z.string().max(256).optional();

function payloadWithinLimit(data: unknown, maxBytes: number): boolean {
  if (data === null || typeof data !== "object") return false;
  try {
    return JSON.stringify(data).length <= maxBytes;
  } catch {
    return false;
  }
}

/** Lenient profile/resume payloads from client (size-capped). */
export const profileInputSchema = z.custom<Profile>(
  (data) => payloadWithinLimit(data, 200_000),
  { message: "Profile payload too large" },
);

export const resumeInputSchema = z.custom<ResumeData>(
  (data) => payloadWithinLimit(data, 200_000),
  { message: "Resume payload too large" },
);

export const followUpAnswerSchema = z.object({
  questionId: z.string().max(100),
  field: z.string().max(100),
  answer: z.string().max(5000),
});

export const interviewHistoryItemSchema = z.object({
  role: z.enum(["ai", "user", "system", "assistant"]),
  content: z.string().max(10000),
});
