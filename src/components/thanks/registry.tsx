/**
 * Thank-You template registry.
 *
 * Add a new template by:
 *  1. Create src/components/thanks/templates/YourTemplate.tsx (pure SVG).
 *  2. Extend ThanksTemplateId in ./types.ts
 *  3. Add an entry to THANKS_TEMPLATES and a case in ThanksPreview.
 */

import type { Ref } from "react";
import type { ThanksData, ThanksTemplateId } from "./types";

// ── Original set
import { AzureClassic } from "./templates/AzureClassic";
import { CloudCelebration } from "./templates/CloudCelebration";
import { GoldenIvory } from "./templates/GoldenIvory";
import { MidnightBloom } from "./templates/MidnightBloom";
import { BotanicalSky } from "./templates/BotanicalSky";
import { ArtDecoArch } from "./templates/ArtDecoArch";
import { MinimalistLine } from "./templates/MinimalistLine";
import { VelvetBordeaux } from "./templates/VelvetBordeaux";
import { PressedBotanical } from "./templates/PressedBotanical";
import { RoyalDiploma } from "./templates/RoyalDiploma";
import { OrnateVictorian } from "./templates/OrnateVictorian";
import { ArabesqueStar } from "./templates/ArabesqueStar";
import { PearlEmboss } from "./templates/PearlEmboss";

// ── Recreated from provided references
import { DustyBlueWatercolor } from "./templates/DustyBlueWatercolor";
import { PinkBlossomSplash } from "./templates/PinkBlossomSplash";
import { LavenderWreath } from "./templates/LavenderWreath";
import { RoseGardenHearts } from "./templates/RoseGardenHearts";
import { SkyBlueContact } from "./templates/SkyBlueContact";

// ── New additions
import { TerracottaBoho } from "./templates/TerracottaBoho";
import { BlackGoldModern } from "./templates/BlackGoldModern";
import { EucalyptusGreen } from "./templates/EucalyptusGreen";
import { VintagePostcard } from "./templates/VintagePostcard";
import { MoroccanTile } from "./templates/MoroccanTile";
import { JapandiZen } from "./templates/JapandiZen";
import { ChampagneFlutes } from "./templates/ChampagneFlutes";
import { IvoryRibbon } from "./templates/IvoryRibbon";
import { MidnightStars } from "./templates/MidnightStars";
import { PastelConfetti } from "./templates/PastelConfetti";

export const THANKS_TEMPLATES: {
  id: ThanksTemplateId;
  label: string;
  desc: string;
  tag: "Graduation" | "Wedding" | "Birthday" | "Certificate" | "Universal";
}[] = [
  // ── Graduation / Academic
  {
    id: "azure-classic",
    label: "Editorial Classic",
    desc: "Laurel-framed italic serif",
    tag: "Graduation",
  },
  {
    id: "cloud-celebration",
    label: "Academic Seal",
    desc: "Navy seal with cap + laurel wreath",
    tag: "Graduation",
  },
  {
    id: "royal-diploma",
    label: "Royal Diploma",
    desc: "Traditional crest + gold wax seal",
    tag: "Certificate",
  },
  {
    id: "midnight-bloom",
    label: "Certificate of Honor",
    desc: "Ribbon banner + gold star seal",
    tag: "Certificate",
  },

  // ── Watercolor florals (references)
  {
    id: "dusty-blue-watercolor",
    label: "Dusty Blue Watercolor",
    desc: "Powder-blue hydrangea corners",
    tag: "Wedding",
  },
  {
    id: "pink-blossom-splash",
    label: "Pink Blossom Splash",
    desc: "Watercolor splash with tropical blooms",
    tag: "Birthday",
  },
  {
    id: "lavender-wreath",
    label: "Lavender Wreath",
    desc: "Lush purple garland top and bottom",
    tag: "Wedding",
  },
  {
    id: "rose-garden-hearts",
    label: "Rose Garden Hearts",
    desc: "Full rose border, hearts & butterfly",
    tag: "Birthday",
  },
  {
    id: "sky-blue-contact",
    label: "Sky Blue Contact",
    desc: "Soft blue wash with contact line",
    tag: "Universal",
  },

  // ── Wedding / Invitation classics
  {
    id: "golden-ivory",
    label: "Couture Gold",
    desc: "Cream & gold monogram medallion",
    tag: "Wedding",
  },
  {
    id: "art-deco-arch",
    label: "Art Deco Arch",
    desc: "Sunburst arch with diamond monogram",
    tag: "Wedding",
  },
  {
    id: "velvet-bordeaux",
    label: "Velvet Bordeaux",
    desc: "Deep burgundy with champagne foil",
    tag: "Wedding",
  },
  {
    id: "ornate-victorian",
    label: "Ornate Victorian",
    desc: "Baroque filigree corners",
    tag: "Wedding",
  },
  {
    id: "botanical-sky",
    label: "Garden Bloom",
    desc: "Blush botanical corners",
    tag: "Wedding",
  },
  {
    id: "pressed-botanical",
    label: "Pressed Botanical",
    desc: "Sage apothecary with leaf sprigs",
    tag: "Wedding",
  },
  {
    id: "eucalyptus-green",
    label: "Eucalyptus Green",
    desc: "Airy sage branches all around",
    tag: "Wedding",
  },
  {
    id: "ivory-ribbon",
    label: "Ivory Ribbon",
    desc: "Satin ribbon + wax seal",
    tag: "Wedding",
  },
  {
    id: "champagne-flutes",
    label: "Champagne Flutes",
    desc: "Crossed flutes with confetti",
    tag: "Wedding",
  },

  // ── Cultural / Themed
  {
    id: "arabesque-star",
    label: "Arabesque Star",
    desc: "8-point geometric border",
    tag: "Universal",
  },
  {
    id: "moroccan-tile",
    label: "Moroccan Tile",
    desc: "Zellige tile bands top & bottom",
    tag: "Wedding",
  },
  {
    id: "terracotta-boho",
    label: "Terracotta Boho",
    desc: "Desert sun with pampas grass",
    tag: "Wedding",
  },
  {
    id: "midnight-stars",
    label: "Midnight Stars",
    desc: "Indigo sky with gold constellations",
    tag: "Wedding",
  },
  {
    id: "japandi-zen",
    label: "Japandi Zen",
    desc: "Brush enso circle with red chop",
    tag: "Universal",
  },
  {
    id: "vintage-postcard",
    label: "Vintage Postcard",
    desc: "Aged paper with postage stamp",
    tag: "Birthday",
  },
  {
    id: "pastel-confetti",
    label: "Pastel Confetti",
    desc: "Cheerful rainbow confetti scatter",
    tag: "Birthday",
  },

  // ── Modern & Minimal
  {
    id: "black-gold-modern",
    label: "Black & Gold Modern",
    desc: "Luxe black with gold rings",
    tag: "Universal",
  },
  {
    id: "pearl-emboss",
    label: "Pearl Emboss",
    desc: "Tonal ivory with embossed crest",
    tag: "Universal",
  },
  {
    id: "minimalist-line",
    label: "Minimalist Line",
    desc: "One hairline frame, huge serif",
    tag: "Universal",
  },
];

export function ThanksPreview({
  data,
  template,
  svgRef,
}: {
  data: ThanksData;
  template: ThanksTemplateId;
  svgRef?: Ref<SVGSVGElement>;
}) {
  switch (template) {
    case "cloud-celebration":
      return <CloudCelebration data={data} svgRef={svgRef} />;
    case "golden-ivory":
      return <GoldenIvory data={data} svgRef={svgRef} />;
    case "midnight-bloom":
      return <MidnightBloom data={data} svgRef={svgRef} />;
    case "botanical-sky":
      return <BotanicalSky data={data} svgRef={svgRef} />;
    case "art-deco-arch":
      return <ArtDecoArch data={data} svgRef={svgRef} />;
    case "minimalist-line":
      return <MinimalistLine data={data} svgRef={svgRef} />;
    case "velvet-bordeaux":
      return <VelvetBordeaux data={data} svgRef={svgRef} />;
    case "pressed-botanical":
      return <PressedBotanical data={data} svgRef={svgRef} />;
    case "royal-diploma":
      return <RoyalDiploma data={data} svgRef={svgRef} />;
    case "ornate-victorian":
      return <OrnateVictorian data={data} svgRef={svgRef} />;
    case "arabesque-star":
      return <ArabesqueStar data={data} svgRef={svgRef} />;
    case "pearl-emboss":
      return <PearlEmboss data={data} svgRef={svgRef} />;
    case "dusty-blue-watercolor":
      return <DustyBlueWatercolor data={data} svgRef={svgRef} />;
    case "pink-blossom-splash":
      return <PinkBlossomSplash data={data} svgRef={svgRef} />;
    case "lavender-wreath":
      return <LavenderWreath data={data} svgRef={svgRef} />;
    case "rose-garden-hearts":
      return <RoseGardenHearts data={data} svgRef={svgRef} />;
    case "sky-blue-contact":
      return <SkyBlueContact data={data} svgRef={svgRef} />;
    case "terracotta-boho":
      return <TerracottaBoho data={data} svgRef={svgRef} />;
    case "black-gold-modern":
      return <BlackGoldModern data={data} svgRef={svgRef} />;
    case "eucalyptus-green":
      return <EucalyptusGreen data={data} svgRef={svgRef} />;
    case "vintage-postcard":
      return <VintagePostcard data={data} svgRef={svgRef} />;
    case "moroccan-tile":
      return <MoroccanTile data={data} svgRef={svgRef} />;
    case "japandi-zen":
      return <JapandiZen data={data} svgRef={svgRef} />;
    case "champagne-flutes":
      return <ChampagneFlutes data={data} svgRef={svgRef} />;
    case "ivory-ribbon":
      return <IvoryRibbon data={data} svgRef={svgRef} />;
    case "midnight-stars":
      return <MidnightStars data={data} svgRef={svgRef} />;
    case "pastel-confetti":
      return <PastelConfetti data={data} svgRef={svgRef} />;
    case "azure-classic":
    default:
      return <AzureClassic data={data} svgRef={svgRef} />;
  }
}
