import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";
import { Hydrangea, Leaf, Splash, Sprig } from "../botanicals";

/**
 * Template — Sky Blue Contact.
 * Powder-blue watercolor card with hydrangea corners and a contact line
 * at the bottom. Reads like a modern small-business thank-you.
 */
export function SkyBlueContact({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const messageLines = wrapByChars(data.message, 72);
  const ink = "#17284c";
  const muted = "#415574";
  const blue = "#b3cde6";
  const deepBlue = "#8aaecf";
  const leaf = "#6a8a72";
  const vein = "#2f3d2b";

  return (
    <CardShell ref={svgRef} background="#fbfdff">
      {/* Big central watercolor wash */}
      <Splash color={blue} x={cx} y={CARD_H / 2 - 10} size={380} opacity={0.32} seed={6} />
      <Splash color={deepBlue} x={cx} y={CARD_H / 2 - 20} size={220} opacity={0.25} seed={7} />

      {/* Top-left florals */}
      <g transform="translate(70 100)">
        <Sprig length={160} rotation={-25} color={leaf} vein={vein} />
        <Sprig length={120} rotation={-70} color={leaf} vein={vein} />
        <Hydrangea size={54} color={blue} dark={deepBlue} light="#cbddef" />
        <Leaf x={90} y={-10} size={34} color={leaf} vein={vein} rotation={70} />
        <Leaf x={-20} y={54} size={28} color={leaf} vein={vein} rotation={-30} />
      </g>

      {/* Bottom-right florals */}
      <g transform={`translate(${CARD_W - 70} ${CARD_H - 120}) scale(-1 -1)`}>
        <Sprig length={180} rotation={-15} color={leaf} vein={vein} />
        <Hydrangea size={58} color={deepBlue} dark="#4a6994" light={blue} />
        <Hydrangea x={50} y={50} size={44} color={blue} dark={deepBlue} light="#cbddef" />
        <Leaf x={120} y={0} size={34} color={leaf} vein={vein} rotation={80} />
      </g>

      {/* Bottom-left */}
      <g transform={`translate(120 ${CARD_H - 100}) scale(1 -1)`}>
        <Sprig length={80} rotation={-30} color={leaf} vein={vein} />
        <Hydrangea x={20} y={0} size={36} color={blue} dark={deepBlue} light="#cbddef" />
        <Leaf x={60} y={0} size={24} color={leaf} vein={vein} rotation={60} />
      </g>

      {/* Top-right small */}
      <g transform={`translate(${CARD_W - 120} 120) scale(-1 1)`}>
        <Sprig length={60} rotation={-20} color={leaf} vein={vein} />
        <Hydrangea x={10} y={0} size={32} color={blue} dark={deepBlue} light="#cbddef" />
      </g>

      {/* Headline — brush serif */}
      <text
        x={cx}
        y={CARD_H / 2 - 30}
        textAnchor="middle"
        fill="#0a0a12"
        fontSize={140}
        fontStyle="italic"
        fontWeight={500}
        style={{
          fontFamily: '"Playfair Display", "Times New Roman", serif',
          letterSpacing: "-2px",
        }}
      >
        {data.headline}
      </text>

      {/* Sub */}
      <text
        x={cx}
        y={CARD_H / 2 + 12}
        textAnchor="middle"
        fill={ink}
        fontSize={16}
        letterSpacing={10}
        fontWeight={700}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.occasion.toUpperCase()}
      </text>

      {/* Message */}
      <MultilineText
        lines={messageLines}
        cx={cx}
        y={CARD_H / 2 + 50}
        lineHeight={22}
        fill={muted}
        fontSize={14}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      />

      {/* Contact row */}
      <g transform={`translate(${cx} ${CARD_H - 90})`}>
        {/* pill */}
        <rect
          x={-16}
          y={-18}
          width={32}
          height={32}
          rx={16}
          fill={ink}
        />
        <circle cx={0} cy={-2} r={4} fill={ink} />
        <text
          x={24}
          y={0}
          fill={ink}
          fontSize={14}
          fontWeight={600}
          style={{ fontFamily: '"DM Sans", sans-serif' }}
        >
          {data.sender}
        </text>
      </g>
      {data.date && (
        <text
          x={cx}
          y={CARD_H - 58}
          textAnchor="middle"
          fill={muted}
          fontSize={12}
          fontStyle="italic"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          {data.date}
        </text>
      )}
    </CardShell>
  );
}
