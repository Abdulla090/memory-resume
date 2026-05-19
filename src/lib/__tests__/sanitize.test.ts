import { describe, expect, it } from "vitest";
import { buildFieldOverrideCss, sanitizeCssColor, sanitizeResumeText } from "../sanitize";

describe("sanitizeResumeText", () => {
  it("strips script tags", () => {
    expect(sanitizeResumeText('Hello<script>alert(1)</script>')).toBe("Hello");
  });
});

describe("sanitizeCssColor", () => {
  it("allows hex colors", () => {
    expect(sanitizeCssColor("#303b4e")).toBe("#303b4e");
  });

  it("rejects invalid values", () => {
    expect(sanitizeCssColor("red; background: url(evil)")).toBeNull();
  });
});

describe("buildFieldOverrideCss", () => {
  it("escapes quotes in path selectors", () => {
    const css = buildFieldOverrideCss({
      'experience.0.title"x': { color: "#000000" },
    });
    expect(css).not.toContain('title"x');
    expect(css).toContain('title\\"x');
  });
});
