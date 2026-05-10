import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";

/**
 * Template — Art Deco Arch.
 * 1920s Great Gatsby elegance. Golden radial rays, stepped arch frame,
 * symmetric monogram at top. Incredible for weddings and galas.
 */
export function ArtDecoArch({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const messageLines = wrapByChars(data.message, 72);
  const gold = "#c9a14b";
  const deepGold = "#8a6420";
  const ink = "#1a1a22";
  const cream = "#f7f1e3";

  return (
    <CardShell ref={svgRef} background={cream}>
      {/* Arch frame (two nested rounded-top rects) */}
      <path
        d={`M 80 ${CARD_H - 60} L 80 240 Q 80 80 ${cx} 80 Q ${CARD_W - 80} 80 ${CARD_W - 80} 240 L ${CARD_W - 80} ${CARD_H - 60} Z`}
        fill="none"
        stroke={gold}
        strokeWidth={2}
      />
      <path
        d={`M 96 ${CARD_H - 76} L 96 244 Q 96 96 ${cx} 96 Q ${CARD_W - 96} 96 ${CARD_W - 96} 244 L ${CARD_W - 96} ${CARD_H - 76} Z`}
        fill="none"
        stroke={gold}
        strokeOpacity={0.4}
        strokeWidth={1}
      />

      {/* Sunburst rays behind the monogram */}
      <g transform={`translate(${cx} 180)`}>
        {[...Array(24)].map((_, i) => {
          const angle = -90 + (i * 180) / 23;
          const len = i % 2 === 0 ? 150 : 120;
          return (
            <line
              key={i}
              x1={0}
              y1={0}
              x2={Math.cos((angle * Math.PI) / 180) * len}
              y2={Math.sin((angle * Math.PI) / 180) * len}
              stroke={gold}
              strokeWidth={i % 2 === 0 ? 1.2 : 0.6}
              opacity={0.6}
            />
          );
        })}
      </g>

      {/* Monogram diamond */}
      {data.monogram && (
        <g transform={`translate(${cx} 180)`}>
          <rect
            x={-40}
            y={-40}
            width={80}
            height={80}
            fill={cream}
            stroke={gold}
            strokeWidth={1.5}
            transform="rotate(45)"
          />
          <rect
            x={-32}
            y={-32}
            width={64}
            height={64}
            fill="none"
            stroke={gold}
            strokeOpacity={0.5}
            strokeWidth={0.8}
            transform="rotate(45)"
          />
          <text
            x={0}
            y={8}
            textAnchor="middle"
            fill={deepGold}
            fontSize={24}
            fontStyle="italic"
            fontWeight={500}
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            {data.monogram}
          </text>
        </g>
      )}

      {/* Stepped deco bar under monogram */}
      <g transform={`translate(${cx} ${data.monogram ? 280 : 200})`}>
        <rect x={-120} y={0} width={240} height={3} fill={gold} />
        <rect x={-100} y={-4} width={200} height={2} fill={gold} opacity={0.7} />
        <rect x={-70} y={-8} width={140} height={2} fill={gold} opacity={0.5} />
      </g>

      {/* Occasion */}
      <text
        x={cx}
        y={data.monogram ? 320 : 240}
        textAnchor="middle"
        fill={deepGold}
        fontSize={13}
        letterSpacing={8}
        fontWeight={700}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.occasion.toUpperCase()}
      </text>

      {/* Headline */}
      <text
        x={cx}
        y={450}
        textAnchor="middle"
        fill={ink}
        fontSize={130}
        fontStyle="italic"
        fontWeight={400}
        style={{
          fontFamily: '"Playfair Display", "Times New Roman", serif',
          letterSpacing: "-1.5px",
        }}
      >
        {data.headline}
      </text>

      {/* Recipient */}
      <text
        x={cx}
        y={510}
        textAnchor="middle"
        fill={deepGold}
        fontSize={22}
        fontStyle="italic"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        {data.recipient}
      </text>

      {/* Message */}
      <MultilineText
        lines={messageLines}
        cx={cx}
        y={550}
        lineHeight={23}
        fill="#403a2a"
        fontSize={14.5}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      />

      {/* Signature */}
      <text
        x={cx}
        y={CARD_H - 110}
        textAnchor="middle"
        fill={deepGold}
        fontSize={12}
        letterSpacing={6}
        fontWeight={700}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.sender.toUpperCase()}
      </text>
      {data.date && (
        <text
          x={cx}
          y={CARD_H - 86}
          textAnchor="middle"
          fill="#8c734b"
          fontSize={11}
          fontStyle="italic"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          {data.date}
        </text>
      )}
    </CardShell>
  );
}
