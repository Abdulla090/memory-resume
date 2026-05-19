import { describe, expect, it, vi, afterEach } from "vitest";
import { resolveGeminiApiKey } from "../ai-security";

describe("resolveGeminiApiKey", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("prefers server key in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("GEMINI_API_KEY", "server-key");
    expect(resolveGeminiApiKey("client-key")).toBe("server-key");
  });

  it("throws when no key available", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("GEMINI_API_KEY", "");
    expect(() => resolveGeminiApiKey()).toThrow("MISSING_API_KEY");
  });
});
