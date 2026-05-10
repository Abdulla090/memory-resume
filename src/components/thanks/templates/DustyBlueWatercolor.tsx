import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";
import {
  Hydrangea,
  Leaf,
  Splash,
  Sprig,
} from "../botanicals";

/**
 * Template — Dusty Blue Watercolor.
 * Soft powder-blue wash with hydrangea florals in all four corners and
 * an italic "Thank You" in the middle. Inspired by classic thank-you
 * card stationery.
 */
export function DustyBlueWatercolor({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const messageLines = wrapByChars(data.message, 72);
  const ink = "#1e2a4a";
  const muted = "#3d4d75";
  const blue = "#9bb5d6";
  const deepBlue = "#6b86af";
  const leaf = "#6a8a72";
  const gold = "#c9a14b";

  return (
    <CardShell ref={svgRef} background="#fbfcfe">
      {/* Watercolor splash in center */}
      <Splash color={blue} x={cx} y={CARD_H / 2 + 10} size={260} opacity={0.22} seed={1} />

      {/* Top-left hydrangea cluster */}
      <g transform="translate(80 110)">
        <Sprig length={140} rotation={-20} color={leaf} />
        <Sprig length={110} rotation={-55} color={leaf} />
        <Hydrangea size={54} color={blue} dark={deepBlue} light="#c8daec" />
        <Hydrangea x={56} y={30} size={42} color={deepBlue} dark="#4a6994" light={blue} />
        <Leaf x={96} y={-20} size={32} color={leaf} rotation={70} />
        <Leaf x={-30} y={54} size={30} color={leaf} rotation={-40} />
        {/* Gold accent leaves */}
        <Leaf x={40} y={-30} size={18} color={gold} vein="#8a6420" rotation={20} opacity={0.8} />
      </g>

      {/* Top-right hydrangea */}
      <g transform={`translate(${CARD_W - 80} 110) scale(-1 1)`}>
        <Sprig length={120} rotation={-15} color={leaf} />
        <Hydrangea size={46} color={blue} dark={deepBlue} light="#c8daec" />
        <Leaf x={60} y={-10} size={30} color={leaf} rotation={60} />
        <Leaf x={-20} y={40} size={26} color={leaf} rotation={-30} />
        <Leaf x={34} y={-26} size={16} color={gold} vein="#8a6420" rotation={30} opacity={0.8} />
      </g>

      {/* Bottom-left */}
      <g transform={`translate(80 ${CARD_H - 100}) scale(1 -1)`}>
        <Sprig length={130} rotation={-20} color={leaf} />
        <Hydrangea size={50} color={deepBlue} dark="#4a6994" light={blue} />
        <Leaf x={80} y={-12} size={30} color={leaf} rotation={60} />
        <Leaf x={-20} y={50} size={28} color={leaf} rotation={-40} />
      </g>

      {/* Bottom-right */}
      <g transform={`translate(${CARD_W - 80} ${CARD_H - 100}) scale(-1 -1)`}>
        <Sprig length={110} rotation={-10} color={leaf} />
        <Hydrangea size={44} color={blue} dark={deepBlue} light="#c8daec" />
        <Leaf x={50} y={-10} size={28} color={leaf} rotation={50} />
      </g>

      {/* Headline — italic brush-style serif */}
      <text
        x={cx}
        y={CARD_H / 2 - 10}
        textAnchor="middle"
        fill={ink}
        fontSize={130}
        fontStyle="italic"
        fontWeight={500}
        style={{
          fontFamily: '"Playfair Display", "Times New Roman", serif',
          letterSpacing: "-2px",
        }}
      >
        {data.headline}
      </text>

      {/* Sub kicker */}
      <text
        x={cx}
        y={CARD_H / 2 + 30}
        textAnchor="middle"
        fill={ink}
        fontSize={14}
        letterSpacing={8}
        fontWeight={700}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.occasion.toUpperCase()}
      </text>

      {/* Recipient */}
      <text
        x={cx}
        y={CARD_H / 2 + 68}
        textAnchor="middle"
        fill={muted}
        fontSize={17}
        fontStyle="italic"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        {data.recipient}
      </text>

      {/* Message */}
      <MultilineText
        lines={messageLines}
        cx={cx}
        y={CARD_H / 2 + 104}
        lineHeight={22}
        fill={muted}
        fontSize={14}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      />

      {/* Signature */}
      <text
        x={cx}
        y={CARD_H - 60}
        textAnchor="middle"
        fill={ink}
        fontSize={12}
        letterSpacing={6}
        fontWeight={700}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.sender.toUpperCase()}
        {data.date ? `  ·  ${data.date.toUpperCase()}` : ""}
      </text>
    </CardShell>
  );
}
