/**
 * True-vector landscape PDF exporter for thank-you / invitation cards.
 *
 * We draw each template as a single <svg> element and let svg2pdf.js translate
 * it directly into jsPDF vector ops — NO canvas rasterization. The result is
 * an infinitely crisp print-ready PDF with selectable text and sharp strokes.
 */

export async function exportLandscapeCardAsPDF(
  svgElement: SVGSVGElement,
  filename: string,
): Promise<void> {
  const [{ default: jsPDF }, { svg2pdf }] = await Promise.all([
    import("jspdf"),
    import("svg2pdf.js"),
  ]);

  // Landscape A4 in mm
  const A4_W_MM = 297;
  const A4_H_MM = 210;

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  // Clone so we can normalize attributes without touching the live preview.
  const clone = svgElement.cloneNode(true) as SVGSVGElement;

  // Ensure intrinsic size matches A4 landscape. svg2pdf maps the SVG
  // viewBox/size into the target width/height we pass below.
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("width", `${A4_W_MM}mm`);
  clone.setAttribute("height", `${A4_H_MM}mm`);
  if (!clone.getAttribute("viewBox")) {
    const w = svgElement.viewBox.baseVal?.width || svgElement.clientWidth || 1123;
    const h = svgElement.viewBox.baseVal?.height || svgElement.clientHeight || 794;
    clone.setAttribute("viewBox", `0 0 ${w} ${h}`);
  }

  // svg2pdf needs the node attached to the DOM to resolve computed styles
  // reliably on some browsers. Render it off-screen.
  const host = document.createElement("div");
  host.style.position = "fixed";
  host.style.left = "-10000px";
  host.style.top = "0";
  host.style.pointerEvents = "none";
  host.appendChild(clone);
  document.body.appendChild(host);

  try {
    await svg2pdf(clone, pdf, {
      x: 0,
      y: 0,
      width: A4_W_MM,
      height: A4_H_MM,
    });
  } finally {
    document.body.removeChild(host);
  }

  pdf.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
}
