/**
 * Screenshot-based PDF export using html-to-image + jsPDF.
 *
 * Strategy: clone the scaled previewRef element into an off-screen container
 * at 1:1 scale (no transform, no overflow clipping), capture it, then clean up.
 * This guarantees pixel-perfect output regardless of zoom level or overflow-hidden.
 *
 * Pass pixelRatio=2 for standard quality (retina), pixelRatio=3 for print quality.
 */
export async function exportPreviewAsPDF(
  previewElement: HTMLElement,
  filename: string,
  pixelRatio = 2,
): Promise<void> {
  const [{ toCanvas }, { default: jsPDF }] = await Promise.all([
    import("html-to-image"),
    import("jspdf"),
  ]);

  // ── 1. Clone into a fixed off-screen wrapper at natural 1:1 size ─────────
  const RESUME_W = 794; // A4 width in px at 96 dpi
  const naturalH = previewElement.scrollHeight;

  // Build a wrapper div that sits off-screen, no clipping, correct dimensions
  const wrapper = document.createElement("div");
  wrapper.style.cssText = `
    position: fixed;
    top: -99999px;
    left: -99999px;
    width: ${RESUME_W}px;
    height: ${naturalH}px;
    overflow: visible;
    pointer-events: none;
    z-index: -1;
  `;

  // Clone the resume node — this preserves all computed styles
  const clone = previewElement.cloneNode(true) as HTMLElement;
  clone.style.cssText = `
    position: relative !important;
    transform: none !important;
    transform-origin: top left !important;
    width: ${RESUME_W}px !important;
    height: ${naturalH}px !important;
    overflow: visible !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  `;

  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  try {
    // ── 2. Capture the clean, unclipped clone ─────────────────────────────
    const canvas = await toCanvas(clone, {
      pixelRatio,
      backgroundColor: "#ffffff",
      width: RESUME_W,
      height: naturalH,
    });

    // ── 3. Slice into A4 pages ────────────────────────────────────────────
    const A4_W_MM = 210;
    const A4_H_MM = 297;

    const canvasW = canvas.width;
    const canvasH = canvas.height;
    const mmPerPx = A4_W_MM / canvasW;
    const totalHeightMm = canvasH * mmPerPx;
    const numPages = Math.ceil(totalHeightMm / A4_H_MM);

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    for (let page = 0; page < numPages; page++) {
      if (page > 0) pdf.addPage();

      const srcYPx = (page * A4_H_MM) / mmPerPx;
      const srcHPx = Math.min(A4_H_MM / mmPerPx, canvasH - srcYPx);

      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvasW;
      pageCanvas.height = Math.ceil(srcHPx);

      const ctx = pageCanvas.getContext("2d")!;
      ctx.drawImage(canvas, 0, -srcYPx);

      const quality = pixelRatio >= 3 ? 0.99 : 0.97;
      const pageImg = pageCanvas.toDataURL("image/jpeg", quality);
      pdf.addImage(pageImg, "JPEG", 0, 0, A4_W_MM, srcHPx * mmPerPx);
    }

    pdf.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
  } finally {
    // ── 4. Always clean up the off-screen clone ────────────────────────────
    document.body.removeChild(wrapper);
  }
}
