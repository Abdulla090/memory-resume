const fs = require("fs");
let content = fs.readFileSync("src/routes/resume.$id.tsx", "utf8");

content = content.replace(
  /const updateResume = useAppStore\(\(s\) => s\.updateResume\);/,
  `const updateResume = useAppStore((s) => s.updateResume);
  const apiKey = useAppStore((s) => s.apiKey);`
);

content = content.replace(/tailorToJobFn\(\{ resume: data, jobDescription: tailorJob \}\)/g, "tailorToJobFn({ apiKey, resume: data, jobDescription: tailorJob })");
content = content.replace(/rewriteSectionFn\(\{ section, content: sectionContent, profile \}\)/g, "rewriteSectionFn({ apiKey, section, content: sectionContent, profile })");
content = content.replace(/improveBulletFn\(\{ bullet: b, jobTitle: data\.jobTitle, mode \}\)/g, "improveBulletFn({ apiKey, bullet: b, jobTitle: data.jobTitle, mode })");

fs.writeFileSync("src/routes/resume.$id.tsx", content);

