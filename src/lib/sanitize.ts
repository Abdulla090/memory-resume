import DOMPurify from "dompurify";

const RESUME_HTML_ALLOWED = ["b", "i", "em", "strong", "br"];

/** Strip HTML for plain-text resume fields (XSS-safe). */
export function sanitizeResumeText(value: string): string {
  if (!value) return "";
  if (typeof window === "undefined") {
    return value.replace(/<[^>]*>/g, "");
  }
  return DOMPurify.sanitize(value, { ALLOWED_TAGS: [] });
}

/** Escape a string for use inside a quoted CSS attribute selector. */
export function escapeCssAttrValue(value: string): string {
  return value.replace(/["\\]/g, "\\$&");
}

/** Allow only safe CSS color literals. */
export function sanitizeCssColor(color: string | undefined): string | null {
  if (!color) return null;
  const trimmed = color.trim();
  if (/^#[0-9A-Fa-f]{3,8}$/.test(trimmed)) return trimmed;
  if (/^rgba?\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*(,\s*[\d.]+\s*)?\)$/.test(trimmed)) {
    return trimmed;
  }
  return null;
}

const SAFE_FONT_PATTERN = /^[a-zA-Z0-9\s,'"-]+$/;

export function sanitizeCssFontFamily(font: string | undefined): string | null {
  if (!font || !SAFE_FONT_PATTERN.test(font) || font.length > 80) return null;
  return font.replace(/'/g, "\\'");
}

type FieldOverride = {
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  fontFamily?: string;
  letterSpacing?: number;
  textTransform?: string;
};

/** Build safe CSS for per-field design overrides. */
export function buildFieldOverrideCss(fieldOverrides: Record<string, FieldOverride>): string {
  return Object.entries(fieldOverrides)
    .map(([path, ov]) => {
      const rules: string[] = [];
      if (ov.fontSize && ov.fontSize >= 6 && ov.fontSize <= 96) {
        rules.push(`font-size: ${ov.fontSize}px !important`);
      }
      if (ov.fontWeight && ov.fontWeight >= 100 && ov.fontWeight <= 900) {
        rules.push(`font-weight: ${ov.fontWeight} !important`);
      }
      const color = sanitizeCssColor(ov.color);
      if (color) rules.push(`color: ${color} !important`);
      const fontFamily = sanitizeCssFontFamily(ov.fontFamily);
      if (fontFamily) rules.push(`font-family: '${fontFamily}', sans-serif !important`);
      if (ov.letterSpacing !== undefined && ov.letterSpacing >= -0.2 && ov.letterSpacing <= 0.5) {
        rules.push(`letter-spacing: ${ov.letterSpacing}em !important`);
      }
      const allowedTransform = ["none", "uppercase", "lowercase", "capitalize"];
      if (ov.textTransform && allowedTransform.includes(ov.textTransform)) {
        rules.push(`text-transform: ${ov.textTransform} !important`);
      }
      if (rules.length === 0) return "";
      const safePath = escapeCssAttrValue(path);
      return [
        `.ds-live [data-path="${safePath}"] { ${rules.join("; ")}; }`,
        `.ds-live [data-field-path="${safePath}"] { ${rules.join("; ")}; }`,
      ].join("\n");
    })
    .filter(Boolean)
    .join("\n");
}
