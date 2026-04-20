const fs = require('fs');

const htmlFiles = [
  'src/components/resume/templates.tsx',
  'src/components/resume/templates-extra.tsx'
];

htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    // Remove the added classes
    content = content.replace(/ flex flex-col justify-between/g, '');
    fs.writeFileSync(file, content);
    console.log('Fixed ' + file);
  }
});

const pdfFiles = [
  'src/components/resume/pdf-templates.tsx',
  'src/components/resume/pdf-templates-extra.tsx'
];

pdfFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    // Remove the added justifyContent property
    content = content.replace(/, justifyContent: "space-between" /g, '');
    fs.writeFileSync(file, content);
    console.log('Fixed ' + file);
  }
});
