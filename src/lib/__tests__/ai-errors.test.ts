import { describe, expect, it } from "vitest";
import { getAiErrorMessage } from "../ai-errors";

describe("getAiErrorMessage", () => {
  it("maps rate limit codes", () => {
    const err = new Error("AI_RATE_LIMIT");
    expect(getAiErrorMessage(err, false, "fallback")).toContain("rate limit");
  });

  it("uses fallback for empty errors", () => {
    expect(getAiErrorMessage(new Error(""), false, "Something failed")).toBe("Something failed");
  });
});
