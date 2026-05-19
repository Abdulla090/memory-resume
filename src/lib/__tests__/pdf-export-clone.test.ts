import { describe, expect, it } from "vitest";
import { repairSvgTextForExport, normalizeTextForVectorExport } from "../pdf-export-clone";

describe("repairSvgTextForExport", () => {
  it("removes textLength and lengthAdjust from tspans", () => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    tspan.setAttribute("textLength", "400");
    tspan.setAttribute("lengthAdjust", "spacingAndGlyphs");
    tspan.setAttribute("letter-spacing", "0.5em");
    text.appendChild(tspan);
    svg.appendChild(text);

    repairSvgTextForExport(svg);

    expect(tspan.hasAttribute("textLength")).toBe(false);
    expect(tspan.hasAttribute("lengthAdjust")).toBe(false);
    expect(tspan.hasAttribute("letter-spacing")).toBe(false);
  });
});

describe("normalizeTextForVectorExport", () => {
  it("injects letter-spacing reset style", () => {
    const root = document.createElement("div");
    root.style.letterSpacing = "0.2em";
    normalizeTextForVectorExport(root);
    const style = root.querySelector("style[data-export-normalize]");
    expect(style?.textContent).toContain("letter-spacing: normal");
    expect(getComputedStyle(root).letterSpacing).toBe("normal");
  });
});
