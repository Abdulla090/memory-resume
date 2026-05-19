/** A4 width at 96dpi-style resume preview scale (matches editor preview). */
export const RESUME_PAGE_WIDTH_PX = 794;
/** A4 height at the same scale as {@link RESUME_PAGE_WIDTH_PX}. */
export const RESUME_PAGE_HEIGHT_PX = Math.round((RESUME_PAGE_WIDTH_PX * 297) / 210);

/**
 * Prepare a DOM subtree for export: disable editing chrome and wait for assets.
 */
/**
 * dom-to-svg / svg2pdf mishandle non-zero letter-spacing (spaced glyphs, wrong symbols).
 * Flatten tracking before vector capture while keeping on-screen preview unchanged.
 */
export function normalizeTextForVectorExport(root: HTMLElement): void {
  const style = document.createElement("style");
  style.setAttribute("data-export-normalize", "true");
  style.textContent = `
    *, *::before, *::after {
      letter-spacing: normal !important;
      word-spacing: normal !important;
      unicode-bidi: normal !important;
      text-align: start !important;
    }
    .resume-rtl-scope[dir="rtl"] {
      text-align: right !important;
    }
    .resume-rtl-scope[dir="ltr"] {
      text-align: left !important;
    }
  `;
  root.prepend(style);

  root.style.letterSpacing = "normal";
  root.querySelectorAll<HTMLElement>(".resume-rtl-scope").forEach((scope) => {
    scope.style.unicodeBidi = "normal";
  });
  root.querySelectorAll<HTMLElement>("*").forEach((el) => {
    el.style.setProperty("letter-spacing", "normal", "important");
    el.style.setProperty("word-spacing", "normal", "important");
    el.style.setProperty("unicode-bidi", "normal", "important");
  });
}

/**
 * dom-to-svg forces each line into the box width via textLength + spacingAndGlyphs,
 * which stretches glyphs and breaks fonts/kerning in the PDF. Remove those attrs.
 */
export function repairSvgTextForExport(svgRoot: Element): void {
  svgRoot.querySelectorAll("tspan, text").forEach((node) => {
    node.removeAttribute("textLength");
    node.removeAttribute("lengthAdjust");
    const letterSpacing = node.getAttribute("letter-spacing");
    if (letterSpacing && letterSpacing !== "normal" && parseFloat(letterSpacing) !== 0) {
      node.removeAttribute("letter-spacing");
    }
    const wordSpacing = node.getAttribute("word-spacing");
    if (wordSpacing && wordSpacing !== "normal" && parseFloat(wordSpacing) !== 0) {
      node.removeAttribute("word-spacing");
    }
  });
}

export async function sanitizeExportClone(root: HTMLElement): Promise<void> {
  root.classList.remove("design-mode");
  root.querySelectorAll("[contenteditable]").forEach((node) => {
    node.removeAttribute("contenteditable");
  });
  root.querySelectorAll("script").forEach((node) => node.remove());

  root.querySelectorAll<HTMLElement>("*").forEach((el) => {
    for (const attr of [...el.attributes]) {
      if (attr.name.startsWith("on") || attr.value.toLowerCase().includes("javascript:")) {
        el.removeAttribute(attr.name);
      }
    }
  });

  root.querySelectorAll<HTMLElement>("[data-editable]").forEach((el) => {
    el.style.outline = "none";
    el.style.boxShadow = "none";
  });

  normalizeTextForVectorExport(root);

  root.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
    if (!img.getAttribute("crossorigin")) {
      img.crossOrigin = "anonymous";
    }
  });

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  await Promise.all(
    [...root.querySelectorAll("img")].map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
            return;
          }
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        }),
    ),
  );
}

/**
 * Clone the live preview into an off-screen 1:1 container so exporters are not
 * affected by transform:scale(), overflow clipping, or parent layout.
 */
export function preparePreviewExportClone(previewElement: HTMLElement): {
  container: HTMLDivElement;
  clone: HTMLElement;
} {
  const container = document.createElement("div");
  // Invisible on-screen mount so dom-to-svg capture rects use viewport coords (0…)
  container.style.cssText =
    "position:fixed;left:0;top:0;opacity:0;pointer-events:none;z-index:-1;overflow:visible;";

  const clone = previewElement.cloneNode(true) as HTMLElement;
  clone.style.transform = "scale(1)";
  clone.style.transformOrigin = "top left";
  clone.style.width = `${RESUME_PAGE_WIDTH_PX}px`;
  clone.style.height = "auto";
  clone.style.maxHeight = "none";
  clone.style.maxWidth = "none";
  clone.style.overflow = "visible";
  clone.style.borderRadius = "0";
  clone.style.boxShadow = "none";
  clone.style.margin = "0";
  clone.style.border = "none";
  clone.classList.remove("design-mode");

  container.appendChild(clone);
  return { container, clone };
}

/**
 * Viewport slice for one A4 page — dom-to-svg uses getBoundingClientRect(), so each
 * page is a clipped window over the full-height clone.
 */
export function createResumePageSlice(
  source: HTMLElement,
  sliceTop: number,
  sliceHeight: number,
): HTMLDivElement {
  const pageHost = document.createElement("div");
  pageHost.style.width = `${RESUME_PAGE_WIDTH_PX}px`;
  pageHost.style.height = `${sliceHeight}px`;
  pageHost.style.overflow = "hidden";
  pageHost.style.position = "relative";
  pageHost.style.background = getComputedStyle(source).backgroundColor || "#ffffff";

  const inner = source.cloneNode(true) as HTMLElement;
  inner.style.position = "absolute";
  inner.style.top = `-${sliceTop}px`;
  inner.style.left = "0";
  inner.style.transform = "none";
  inner.style.margin = "0";
  inner.style.width = `${RESUME_PAGE_WIDTH_PX}px`;
  inner.style.height = "auto";
  inner.style.maxHeight = "none";
  inner.style.overflow = "visible";
  inner.style.borderRadius = "0";
  inner.style.boxShadow = "none";

  pageHost.appendChild(inner);
  return pageHost;
}
