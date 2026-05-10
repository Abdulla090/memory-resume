/**
 * Barrel re-export kept for backward compatibility.
 * The real code lives in ./types.ts, ./registry.tsx, ./CardShell.tsx,
 * and ./templates/<TemplateName>.tsx — one file per template.
 */

export type { ThanksData, ThanksTemplateId } from "./types";
export { CARD_W, CARD_H } from "./types";
export { THANKS_TEMPLATES, ThanksPreview } from "./registry";
