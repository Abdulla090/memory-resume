import { describe, expect, it } from "vitest";
import { detectRtlFromContent } from "@/components/resume/template-helpers";
import type { ResumeData } from "@/lib/types";

const base: ResumeData = {
  name: "Alex",
  title: "Designer",
  summary: "Summary",
  experience: [],
  projects: [],
  education: [],
  skills: [],
  certifications: [],
};

describe("detectRtlFromContent", () => {
  it("detects Arabic script", () => {
    expect(detectRtlFromContent({ ...base, name: "شوان" })).toBe(true);
  });

  it("defaults to LTR for Latin", () => {
    expect(detectRtlFromContent(base)).toBe(false);
  });
});
