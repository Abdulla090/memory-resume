const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "../src/components/resume/new-templates");
const files = fs.readdirSync(dir).filter(f => f.endsWith(".tsx"));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, "utf-8");
  
  if (content.includes("const l = labels(rtl);")) {
    content = content.replace("const l = labels(rtl);", "const l = labels(c, rtl);");
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
}
