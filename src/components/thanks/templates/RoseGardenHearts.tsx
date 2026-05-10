import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";
import { Bloom, Butterfly, Heart, Leaf, Rose, Sprig } from "../botanicals";

/**
 * Template — Rose Garden Hearts.
 * Full floral pink rose border all around with scattered hearts and a
 * butterfly. Joyful, friendly — for birthdays & warm thank-yous.
 */
export function RoseGardenHearts({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const messageLines = wrapByChars(data.message, 70);
  const ink = "#8a1e3b";
  const rose = "#e55a85";
  const roseDark = "#b63a68";
  const roseLight = "#f6c0d4";
  const leaf = "#6a8a55";
  const vein = "#34502a";

  return (
    <CardShell ref={svgRef} background="#fffbf5">
      {/* Full floral border. Roses & blooms scattered along each edge */}
      {/* Top edge */}
      <g transform="translate(0 0)">
        {[
          { x: 60, s: 58 },
          { x: 180, s: 42 },
          { x: 320, s: 62 },
          { x: 500, s: 48 },
          { x: 720, s: 56 },
          { x: 900, s: 44 },
          { x: 1040, s: 60 },
        ].map((r, i) => (
          <g key={i} transform={`translate(${r.x} ${50 + (i % 2) * 20})`}>
            <Sprig length={70} rotation={30 + i * 20} color={leaf} vein={vein} />
            <Rose size={r.s} color={rose} dark={roseDark} light={roseLight} />
            <Leaf x={-14} y={14} size={26} color={leaf} vein={vein} rotation={-30} />
            <Leaf x={18} y={18} size={26} color={leaf} vein={vein} rotation={40} />
          </g>
        ))}
      </g>

      {/* Bottom edge */}
      <g transform={`translate(0 ${CARD_H}) scale(1 -1)`}>
        {[
          { x: 90, s: 54 },
          { x: 240, s: 60 },
          { x: 420, s: 46 },
          { x: 580, s: 58 },
          { x: 760, s: 50 },
          { x: 940, s: 56 },
        ].map((r, i) => (
          <g key={i} transform={`translate(${r.x} ${50 + (i % 2) * 20})`}>
            <Sprig length={70} rotation={30 + i * 20} color={leaf} vein={vein} />
            <Rose size={r.s} color={i % 2 === 0 ? rose : roseDark} dark={roseDark} light={roseLight} />
            <Leaf x={-14} y={14} size={26} color={leaf} vein={vein} rotation={-30} />
          </g>
        ))}
      </g>

      {/* Left edge */}
      <g transform="translate(0 0) rotate(90 60 60)">
        {/* reuse existing top style but narrow */}
      </g>
      {/* Simpler: sprigs running up the sides */}
      <g transform="translate(50 260)">
        <Sprig length={200} rotation={90} color={leaf} vein={vein} />
        <Bloom x={10} y={60} size={36} color={roseLight} petalDark={rose} center="#fde047" />
        <Bloom x={-14} y={140} size={30} color={rose} petalDark={roseDark} center="#fde047" petals={6} />
      </g>
      <g transform={`translate(${CARD_W - 50} 260) scale(-1 1)`}>
        <Sprig length={200} rotation={90} color={leaf} vein={vein} />
        <Bloom x={10} y={60} size={32} color={rose} petalDark={roseDark} center="#fde047" />
        <Bloom x={-14} y={140} size={36} color={roseLight} petalDark={rose} center="#fde047" petals={6} />
      </g>

      {/* Scattered hearts */}
      <Heart x={360} y={220} size={18} color={rose} />
      <Heart x={400} y={240} size={26} color={roseLight} />
      <Heart x={460} y={210} size={22} color={rose} />
      <Heart x={520} y={250} size={14} color={roseLight} opacity={0.85} />
      <Heart x={600} y={220} size={20} color={rose} />
      <Heart x={440} y={560} size={20} color={rose} />
      <Heart x={490} y={580} size={16} color={roseLight} />
      <Heart x={560} y={560} size={22} color={rose} />

      {/* Butterfly */}
      <Butterfly x={720} y={240} size={52} color={rose} dark={roseDark} rotation={-10} />
      <Butterfly x={380} y={590} size={42} color={roseLight} dark={rose} rotation={20} />

      {/* Headline */}
      <text
        x={cx}
        y={CARD_H / 2 + 30}
        textAnchor="middle"
        fill={ink}
        fontSize={136}
        fontStyle="italic"
        fontWeight={500}
        style={{
          fontFamily: '"Playfair Display", "Times New Roman", serif',
          letterSpacing: "-2px",
        }}
      >
        {data.headline}
      </text>

      {/* Kicker */}
      <text
        x={cx}
        y={CARD_H / 2 + 70}
        textAnchor="middle"
        fill={ink}
        fontSize={14}
        letterSpacing={10}
        fontWeight={700}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.occasion.toUpperCase()}
      </text>

      {/* Recipient + msg */}
      <text
        x={cx}
        y={CARD_H / 2 + 105}
        textAnchor="middle"
        fill={ink}
        fontSize={16}
        fontStyle="italic"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        {data.recipient}
      </text>
      <MultilineText
        lines={messageLines}
        cx={cx}
        y={CARD_H / 2 + 135}
        lineHeight={22}
        fill="#6a3b50"
        fontSize={13.5}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      />
    </CardShell>
  );
}
