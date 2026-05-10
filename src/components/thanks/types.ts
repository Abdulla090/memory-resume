/**
 * Shared types & constants for Thank-You / Invitation cards.
 */

import type { Ref } from "react";

export type ThanksTemplateId =
  | "azure-classic"
  | "cloud-celebration"
  | "golden-ivory"
  | "midnight-bloom"
  | "botanical-sky"
  | "art-deco-arch"
  | "minimalist-line"
  | "velvet-bordeaux"
  | "pressed-botanical"
  | "royal-diploma"
  | "ornate-victorian"
  | "arabesque-star"
  | "pearl-emboss"
  // Recreated from references
  | "dusty-blue-watercolor"
  | "pink-blossom-splash"
  | "lavender-wreath"
  | "rose-garden-hearts"
  | "sky-blue-contact"
  // New additions
  | "terracotta-boho"
  | "black-gold-modern"
  | "eucalyptus-green"
  | "vintage-postcard"
  | "moroccan-tile"
  | "japandi-zen"
  | "champagne-flutes"
  | "ivory-ribbon"
  | "midnight-stars"
  | "pastel-confetti";

export interface ThanksData {
  /** Headline word, e.g. "Thank You", "You're Invited", "With Gratitude" */
  headline: string;
  /** Who the card is for */
  recipient: string;
  /** Main body message */
  message: string;
  /** Who it's from (e.g., "— The Hassan Family") */
  sender: string;
  /** Occasion or sub-title, e.g. "Graduation Ceremony · 2026" */
  occasion: string;
  /** Optional date line */
  date?: string;
  /** Optional monogram / initials, e.g. "S & A" */
  monogram?: string;
}

/** Shared prop shape for every card template component. */
export interface TemplateProps {
  data: ThanksData;
  svgRef?: Ref<SVGSVGElement>;
}

// Landscape A4 at ~96dpi — these units are purely the SVG viewBox space.
export const CARD_W = 1123;
export const CARD_H = 794;
