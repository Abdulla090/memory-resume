import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";

/**
 * Template — Pearl Emboss.
 * Creamy ivory with a subtle embossed ornamental crest (built from soft
 * tonal paths). Understated luxury — perfect for weddings and formal
 * thank-you notes.
 */
export function PearlEmboss({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const messageLines = wrapByChars(data.message, 74);
  const ink = "#2b2620";
  const soft = "#c8b89e";
  const shadow = "#a8977a";
  const paper = "#f3ecdd";

  return (
    <CardShell ref={svgRef} background={paper}>
      {/* Inner hairline */}
      <rect
        x={60}
        y={60}
        width={CARD_W - 120}
        height={CARD_H - 120}
        fill="none"
        stroke={ink}
        strokeOpacity={0.2}
        strokeWidth={1}
      />

      {/* Embossed center crest (behind headline) */}
      <g transform={`translate(${cx} ${CARD_H / 2 + 20})`} opacity={0.55}>
        <EmbossCrest soft={soft} shadow={shadow} />
      </g>

      {/* Occasion */}
      <text
        x={cx}
        y={150}
        textAnchor="middle"
        fill={ink}
        fontOpacity={0.7}
        fontSize={12}
        letterSpacing={9}
        fontWeight={700}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.occasion.toUpperCase()}
      </text>

      {/* Small tonal dot divider */}
      <g transform={`translate(${cx} 180)`}>
        <line x1={-40} y1={0} x2={-8} y2={0} stroke={shadow} strokeWidth={1} />
        <circle cx={0} cy={0} r={2.5} fill={shadow} />
        <line x1={8} y1={0} x2={40} y2={0} stroke={shadow} strokeWidth={1} />
      </g>

      {/* Headline */}
      <text
        x={cx}
        y={CARD_H / 2 + 10}
        textAnchor="middle"
        fill={ink}
        fontSize={148}
        fontStyle="italic"
        fontWeight={400}
        style={{
          fontFamily: '"Playfair Display", "Times New Roman", serif',
          letterSpacing: "-2px",
        }}
      >
        {data.headline}
      </text>

      {/* Recipient */}
      <text
        x={cx}
        y={CARD_H / 2 + 58}
        textAnchor="middle"
        fill={ink}
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
        y={CARD_H / 2 + 100}
        lineHeight={24}
        fill="#5a4f3e"
        fontSize={14.5}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      />

      {/* Signature */}
      <text
        x={cx}
        y={CARD_H - 110}
        textAnchor="middle"
        fill={ink}
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
          fill={shadow}
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

function EmbossCrest({ soft, shadow }: { soft: string; shadow: string }) {
  // A soft, tonal ornament that looks embossed. Very low contrast on purpose.
  return (
    <g>
      {/* Wreath ring (shadow) */}
      <circle cx={0} cy={0} r={220} fill="none" stroke={shadow} strokeWidth={1.2} />
      <circle cx={0} cy={0} r={200} fill="none" stroke={soft} strokeWidth={1.2} />

      {/* Vertical spine */}
      <line x1={0} y1={-220} x2={0} y2={220} stroke={soft} strokeWidth={1.2} />

      {/* Opposing leaf pairs along ring */}
      {[...Array(20)].map((_, i) => {
        const angle = (i * 360) / 20;
        return (
          <g key={i} transform={`rotate(${angle})`}>
            <ellipse cx={0} cy={-220} rx={6} ry={18} fill={soft} opacity={0.85} />
            <ellipse cx={0} cy={-220} rx={3} ry={9} fill={shadow} opacity={0.6} />
          </g>
        );
      })}

      {/* Inner curlicue */}
      <path
        d="M -30 0 Q 0 -40 30 0 Q 0 40 -30 0 Z"
        fill="none"
        stroke={shadow}
        strokeWidth={1}
      />
      <circle cx={0} cy={0} r={6} fill={soft} />
    </g>
  );
}
