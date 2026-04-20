function clampSentenceBlock(text, maxChars) {
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
function clampInline(text, maxChars) {
  if (!text) return text;
  return text.length <= maxChars ? text : `${text.slice(0, maxChars - 1).trimEnd()}…`;
}
function dedupeStrings(values, limit) {
  return Array.from(
    new Set(
      values.map((value) => value.trim()).filter(Boolean)
    )
  ).slice(0, limit);
}
function optimizeResumeForOnePage(resume) {
  const optimizedSkills = dedupeStrings(resume.skills, 10);
  const optimizedSkillItems = resume.skillItems ? resume.skillItems.filter((item) => optimizedSkills.includes(item.name)) : optimizedSkills.map((name) => ({ name, level: name.length % 3 + 3 }));
  return {
    ...resume,
    summary: clampSentenceBlock(resume.summary, 290),
    skills: optimizedSkills,
    skillItems: optimizedSkillItems,
    certifications: dedupeStrings(resume.certifications, 3),
    education: resume.education.slice(0, 2).map((item) => ({
      ...item,
      degree: clampInline(item.degree, 50),
      institution: clampInline(item.institution, 42)
    })),
    projects: resume.projects.slice(0, 2).map((item) => ({
      ...item,
      name: clampInline(item.name, 34),
      description: clampSentenceBlock(item.description, 110),
      impact: clampInline(item.impact, 70),
      tech: dedupeStrings(item.tech, 4)
    })),
    experience: resume.experience.slice(0, 4).map((item) => ({
      ...item,
      title: clampInline(item.title, 48),
      company: clampInline(item.company, 32),
      duration: clampInline(item.duration, 26),
      description: clampSentenceBlock(item.description, 105),
      achievements: item.achievements.slice(0, 3).map((achievement) => clampInline(achievement, 118))
    }))
  };
}
export {
  optimizeResumeForOnePage as o
};
