import type { ResumeData } from "./types";

function clampSentenceBlock(text: string, maxChars: number) {
  if (!text) return text;
  if (text.length <= maxChars) return text;

  const sentences = text.match(/[^.!?]+[.!?]*/g)?.map((part) => part.trim()).filter(Boolean) ?? [];
  let result = "";

  for (const sentence of sentences) {
    const next = result ? `${result} ${sentence}` : sentence;
    if (next.length > maxChars) break;
    result = next;
    if (result.length > maxChars * 0.7 && /[.!?]$/.test(result)) break;
  }

  if (result) return result;
  return `${text.slice(0, maxChars - 1).trimEnd()}.`;
}

function clampInline(text: string, maxChars: number) {
  if (!text) return text;
  return text.length <= maxChars ? text : `${text.slice(0, maxChars - 1).trimEnd()}…`;
}

function dedupeStrings(values: string[], limit: number) {
  return Array.from(
    new Set(
      values
        .map((value) => value.trim())
        .filter(Boolean),
    ),
  ).slice(0, limit);
}

export function optimizeResumeForOnePage(resume: ResumeData): ResumeData {
  const optimizedSkills = dedupeStrings(resume.skills, 8);
  const optimizedSkillItems = resume.skillItems 
    ? resume.skillItems.filter(item => optimizedSkills.includes(item.name))
    : optimizedSkills.map(name => ({ name, level: (name.length % 3) + 3 }));

  return {
    ...resume,
    summary: clampSentenceBlock(resume.summary, 240),
    skills: optimizedSkills,
    skillItems: optimizedSkillItems,
    certifications: dedupeStrings(resume.certifications, 2),
    languages: dedupeStrings(resume.languages ?? [], 3),
    education: resume.education.slice(0, 2).map((item) => ({
      ...item,
      degree: clampInline(item.degree, 50),
      institution: clampInline(item.institution, 42),
    })),
    projects: resume.projects.slice(0, 1).map((item) => ({
      ...item,
       name: clampInline(item.name, 30),
       description: clampSentenceBlock(item.description, 95),
       impact: clampInline(item.impact, 58),
      tech: dedupeStrings(item.tech, 4),
    })),
    experience: resume.experience.slice(0, 3).map((item) => ({
      ...item,
      title: clampInline(item.title, 42),
      company: clampInline(item.company, 28),
      duration: clampInline(item.duration, 22),
      description: clampSentenceBlock(item.description, 88),
      achievements: item.achievements
        .slice(0, 2)
        .map((achievement) => clampInline(achievement, 104)),
    })),
  };
}
