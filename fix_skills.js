const fs = require('fs');

function fixFile(file) {
  let content = fs.readFileSync(file, 'utf8');

  // Replace d.skills.join(...)
  content = content.replace(/d\.skills\.join/g, 'd.skills.map(s => typeof s === \"string\" ? s : s.name).join');

  // Replace the rendering of the name {s} to {(typeof s === "string" ? s : s.name)}
  // This is too broad to use regex. Let's write a small TS function inside the file and use it.
  
  if (!content.includes('function getSkillName')) {
    content = 'function getSkillName(s: string | import("@/lib/types").SkillItem) { return typeof s === "string" ? s : s.name; }\n' + 
              'function getSkillLevel(s: string | import("@/lib/types").SkillItem) { return typeof s === "string" ? (s.length % 3) + 3 : s.level; }\n' + 
              'function getSkillPercentage(s: string | import("@/lib/types").SkillItem) { return typeof s === "string" ? 80 + (s.length % 20) : s.level; }\n' + 
              content;
  }

  // Now replace {s} inside the skill map contexts?
  // Let's just find and replace d.skills.map((s, i) => with d.skills.map((sRaw, i) => { const s = getSkillName(sRaw); const sLevel = getSkillLevel(sRaw); const sPercent = getSkillPercentage(sRaw); return 
  
  content = content.replace(/d\.skills\.map\(\(s, i\) => \(/g, 'd.skills.map((sRaw, i) => { const s = getSkillName(sRaw); const sLevel = getSkillLevel(sRaw); const sPercent = getSkillPercentage(sRaw); return (');
  content = content.replace(/d\.skills\.map\(\(s, i\) => \{/g, 'd.skills.map((sRaw, i) => { const s = getSkillName(sRaw); const sLevel = getSkillLevel(sRaw); const sPercent = getSkillPercentage(sRaw); ');
  content = content.replace(/d\.skills\.map\(\(s, i\) => </g, 'd.skills.map((sRaw, i) => { const s = getSkillName(sRaw); return <');

  // We need to close the ones we opened.
  // Actually, wait! The regex replacement will ruin the brackets. Let me use replace instead by just doing text matching.
}

