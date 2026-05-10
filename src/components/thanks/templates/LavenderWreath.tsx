import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";
import { Bloom, Hydrangea, Leaf, Sprig } from "../botanicals";

/**
 * Template — Lavender Wreath.
 * Powder-lilac background with lush purple floral crowns on the top and
 * bottom edges. Elegant serif Thank You in the middle. Soft and romantic.
 */
export function LavenderWreath({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const messageLines = wrapByChars(data.message, 72);
  const ink = "#2e1f4a";
  const lilac = "#b297d6";
  const deepLilac = "#7a5ba8";
  const pastel = "#dccef0";
  const leaf = "#6f7c9c";
  const vein = "#2e3754";

  return (
    <CardShell ref={svgRef} background="#f2ecf9">
      {/* Side hairlines */}
      <line x1={56} y1={120} x2={56} y2={CARD_H - 120} stroke={ink} strokeOpacity={0.15} />
      <line
        x1={CARD_W - 56}
        y1={120}
        x2={CARD_W - 56}
        y2={CARD_H - 120}
        stroke={ink}
        strokeOpacity={0.15}
      />

      {/* Top floral garland — spans full width */}
      <g transform={`translate(${cx} 90)`}>
        {/* Back leaves layer */}
        {[...Array(7)].map((_, i) => {
          const x = (i - 3) * 100;
          return (
            <Sprig
              key={`bl-${i}`}
              x={x}
              y={0}
              length={110}
              rotation={20 + i * 10}
              color={leaf}
              vein={vein}
              flip={i % 2 === 0}
            />
          );
        })}
        {/* Flower cluster */}
        <Hydrangea x={-350} y={10} size={70} color={lilac} dark={deepLilac} light={pastel} />
        <Hydrangea x={-200} y={40} size={60} color={deepLilac} dark="#4c3e78" light={lilac} />
        <Hydrangea x={-80} y={20} size={54} color={lilac} dark={deepLilac} light={pastel} />
        <Bloom x={30} y={50} size={44} color={pastel} petalDark={lilac} center="#fde047" petals={5} />
        <Hydrangea x={140} y={30} size={58} color={deepLilac} dark="#4c3e78" light={lilac} />
        <Hydrangea x={260} y={40} size={54} color={lilac} dark={deepLilac} light={pastel} />
        <Bloom x={360} y={20} size={46} color={lilac} petalDark={deepLilac} center="#fde047" petals={6} />
        {/* Scattered leaves */}
        <Leaf x={-280} y={60} size={30} color={leaf} vein={vein} rotation={110} />
        <Leaf x={80} y={60} size={30} color={leaf} vein={vein} rotation={-100} />
        <Leaf x={300} y={50} size={32} color={leaf} vein={vein} rotation={120} />
      </g>

      {/* Bottom floral garland (mirror) */}
      <g transform={`translate(${cx} ${CARD_H - 90}) scale(1 -1)`}>
        <Hydrangea x={-320} y={10} size={60} color={lilac} dark={deepLilac} light={pastel} />
        <Hydrangea x={-160} y={30} size={70} color={deepLilac} dark="#4c3e78" light={lilac} />
        <Bloom x={-20} y={50} size={46} color={pastel} petalDark={lilac} center="#fde047" petals={5} />
        <Hydrangea x={120} y={30} size={60} color={lilac} dark={deepLilac} light={pastel} />
        <Hydrangea x={260} y={40} size={54} color={deepLilac} dark="#4c3e78" light={lilac} />
        <Bloom x={340} y={10} size={42} color={lilac} petalDark={deepLilac} center="#fde047" petals={6} />
        <Leaf x={-250} y={60} size={30} color={leaf} vein={vein} rotation={90} />
        <Leaf x={30} y={70} size={32} color={leaf} vein={vein} rotation={-90} />
      </g>

      {/* Headline */}
      <text
        x={cx}
        y={CARD_H / 2 + 10}
        textAnchor="middle"
        fill={ink}
        fontSize={160}
        fontStyle="italic"
        fontWeight={400}
        style={{
          fontFamily: '"Playfair Display", "Times New Roman", serif',
          letterSpacing: "-3px",
        }}
      >
        {data.headline}
      </text>

      {/* Kicker under */}
      <text
        x={cx}
        y={CARD_H / 2 + 56}
        textAnchor="middle"
        fill={deepLilac}
        fontSize={16}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.occasion}
      </text>

      {/* Recipient + message */}
      <text
        x={cx}
        y={CARD_H / 2 + 92}
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
        y={CARD_H / 2 + 122}
        lineHeight={22}
        fill="#4e4564"
        fontSize={13.5}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      />
    </CardShell>
  );
}
