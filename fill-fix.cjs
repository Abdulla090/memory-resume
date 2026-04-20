const fs = require('fs');

const file = 'src/components/resume/templates-extra.tsx';
let content = fs.readFileSync(file, 'utf8');

// Fix Noir (no grid cols for the main body)
content = content.replace(
  `className="bg-[#0a0a0a] text-neutral-300 p-12 font-sans"`,
  `className="bg-[#0a0a0a] text-neutral-300 p-12 font-sans flex flex-col justify-between"`
);

// Fix Slate
content = content.replace(
  `className="bg-[#f8fafc] text-slate-800 p-12 font-sans"`,
  `className="bg-[#f8fafc] text-slate-800 p-12 font-sans flex flex-col justify-between"`
);

// Fix Avant (outer)
content = content.replace(
  `className="bg-[#fdfcfb] text-[#2c2c2c] p-12 font-sans"`,
  `className="bg-[#fdfcfb] text-[#2c2c2c] p-12 font-sans flex flex-col justify-between"`
);


// Global regex for grids: replace col-span-X space-y-Y with flex flex-col justify-between
content = content.replace(/className="(col-span-\d+)\s+space-y-(\d+)"/g, 'className="$1 space-y-$2 flex flex-col justify-between"');

// And add flex-1 to the grid elements so they stretch inside their flex-col containers if their parents are flex
// We already replaced minHeight: "1122px" globally on the outer containers.
// Wait, if the outer container is NOT a flex-col, the grid won't stretch. We should make the outer container flex flex-col.
content = content.replace(/style={{ minHeight: "1122px", width: "100%" }}/g, 'style={{ minHeight: "1122px", width: "100%", display: "flex", flexDirection: "column" }}');

// Then make sure the grids take flex-1
content = content.replace(/className="grid grid-cols-(\d+) gap-(\d+)"/g, 'className="grid grid-cols-$1 gap-$2 flex-1"');


fs.writeFileSync(file, content);
console.log('Fixed templates-extra.tsx');

// Now do the same for pdf-templates.tsx and pdf-templates-extra.tsx
const pdfFiles = ['src/components/resume/pdf-templates.tsx', 'src/components/resume/pdf-templates-extra.tsx'];

pdfFiles.forEach(pdfFile => {
  if (fs.existsSync(pdfFile)) {
    let pdfContent = fs.readFileSync(pdfFile, 'utf8');
    // For single-column PDFs, add justifyContent: "space-between" to page style
    pdfContent = pdfContent.replace(/page: \{([^}]+)\}/g, (match, inner) => {
      if (!inner.includes('justifyContent')) {
        return `page: {${inner}, justifyContent: "space-between" }`;
      }
      return match;
    });
    
    // For two-column PDFs (like Executive and Carbon), we added height: "100%". We should also add justifyContent: "space-between" to side and main
    pdfContent = pdfContent.replace(/side: \{([^}]+)\}/g, (match, inner) => {
      if (!inner.includes('justifyContent')) {
        return `side: {${inner}, justifyContent: "space-between" }`;
      }
      return match;
    });
    pdfContent = pdfContent.replace(/main: \{([^}]+)\}/g, (match, inner) => {
      if (!inner.includes('justifyContent')) {
        return `main: {${inner}, justifyContent: "space-between" }`;
      }
      return match;
    });
    
    // Also for cols in other PDFs
    pdfContent = pdfContent.replace(/cols: \{([^}]+)\}/g, (match, inner) => {
      if (!inner.includes('flex: 1')) {
         return `cols: {${inner}, flex: 1 }`;
      }
      return match;
    });

    fs.writeFileSync(pdfFile, pdfContent);
    console.log('Fixed ' + pdfFile);
  }
});
