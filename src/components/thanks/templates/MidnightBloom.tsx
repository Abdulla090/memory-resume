import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";

/**
 * Template #4 — Certificate of Honor.
 * Formal academic / achievement certificate: deep navy ribbon banner,
 * gold laurel seal at bottom, centered classical composition.
 * Pure SVG — exports as a true vector PDF.
 */
export function MidnightBloom({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const messageLines = wrapByChars(data.message, 82);
  const navy = "#0f2a4f";
  const gold = "#c9a44c";
  const ink = "#1f2a44";

  return (
    <CardShell ref={svgRef} background="#fbfaf6">
      {/* Decorative border */}
      <rect
        x={46}
        y={46}
        width={CARD_W - 92}
        height={CARD_H - 92}
        fill="none"
        stroke={navy}
        strokeWidth={2}
      />
      <rect
        x={60}
        y={60}
        width={CARD_W - 120}
        height={CARD_H - 120}
        fill="none"
        stroke={gold}
        strokeWidth={1}
        strokeDasharray="1 3"
        opacity={0.7}
      />

      {/* Patterned corners — small crosses */}
      {[
        { x: 70, y: 70 },
        { x: CARD_W - 70, y: 70 },
        { x: CARD_W - 70, y: CARD_H - 70 },
        { x: 70, y: CARD_H - 70 },
      ].map((c, i) => (
        <g key={i} transform={`translate(${c.x} ${c.y})`}>
          <circle cx={0} cy={0} r={6} fill="none" stroke={gold} strokeWidth={1.2} />
          <line x1={-10} y1={0} x2={10} y2={0} stroke={gold} strokeWidth={1.2} />
          <line x1={0} y1={-10} x2={0} y2={10} stroke={gold} strokeWidth={1.2} />
        </g>
      ))}

      {/* Top ribbon banner */}
      <g>
        {/* Main ribbon body */}
        <path
          d={`M ${cx - 220} 120 L ${cx + 220} 120 L ${cx + 200} 160 L ${cx + 220} 200 L ${cx - 220} 200 L ${cx - 200} 160 Z`}
          fill={navy}
        />
        {/* Ribbon gold band */}
        <path
          d={`M ${cx - 220} 120 L ${cx + 220} 120 L ${cx + 220} 128 L ${cx - 220} 128 Z`}
          fill={gold}
        />
        <path
          d={`M ${cx - 220} 192 L ${cx + 220} 192 L ${cx + 220} 200 L ${cx - 220} 200 Z`}
          fill={gold}
        />
        {/* Ribbon tails */}
        <path
          d={`M ${cx - 220} 120 L ${cx - 260} 140 L ${cx - 260} 210 L ${cx - 220} 190 Z`}
          fill={navy}
          opacity={0.85}
        />
        <path
          d={`M ${cx + 220} 120 L ${cx + 260} 140 L ${cx + 260} 210 L ${cx + 220} 190 Z`}
          fill={navy}
          opacity={0.85}
        />
        {/* Occasion text on ribbon */}
        <text
          x={cx}
          y={168}
          textAnchor="middle"
          fill="#fff"
          fontSize={14}
          letterSpacing={7}
          fontWeight={700}
          style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
        >
          {data.occasion.toUpperCase()}
        </text>
      </g>

      {/* Pre-headline eyebrow */}
      <text
        x={cx}
        y={260}
        textAnchor="middle"
        fill={ink}
        fontSize={14}
        fontStyle="italic"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        — presented to —
      </text>

      {/* Recipient name, oversized */}
      <text
        x={cx}
        y={340}
        textAnchor="middle"
        fill={navy}
        fontSize={72}
        fontStyle="italic"
        fontWeight={500}
        style={{
          fontFamily: '"Playfair Display", "Times New Roman", serif',
          letterSpacing: "-1px",
        }}
      >
        {data.recipient}
      </text>

      {/* Underline flourish */}
      <line
        x1={cx - 160}
        y1={360}
        x2={cx + 160}
        y2={360}
        stroke={gold}
        strokeWidth={1.5}
      />
      <circle cx={cx} cy={360} r={3.5} fill={gold} />

      {/* Headline (Thank You / With Gratitude / You're Invited) */}
      <text
        x={cx}
        y={425}
        textAnchor="middle"
        fill={ink}
        fontSize={42}
        fontWeight={800}
        letterSpacing={10}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.headline.toUpperCase()}
      </text>

      {/* Message body */}
      <MultilineText
        lines={messageLines}
        cx={cx}
        y={475}
        lineHeight={24}
        fill="#44506b"
        fontSize={15}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      />

      {/* Bottom seal + signatures */}
      <g transform={`translate(${cx} ${CARD_H - 140})`}>
        {/* Outer seal */}
        <circle cx={0} cy={0} r={42} fill={navy} />
        <circle cx={0} cy={0} r={36} fill="none" stroke={gold} strokeWidth={1} />
        {/* Star */}
        <g transform="translate(0 2)">
          <polygon
            points="0,-18 4.5,-6 18,-6 7,2 11,16 0,8 -11,16 -7,2 -18,-6 -4.5,-6"
            fill={gold}
          />
        </g>
        {/* Ribbon tails hanging from seal */}
        <path d="M -12 36 L -20 70 L -10 64 L -6 78 L -2 62 L 0 40 Z" fill={navy} />
        <path d="M 12 36 L 20 70 L 10 64 L 6 78 L 2 62 L 0 40 Z" fill={navy} opacity={0.9} />
      </g>

      {/* Signature lines */}
      <g>
        <line
          x1={140}
          y1={CARD_H - 100}
          x2={320}
          y2={CARD_H - 100}
          stroke={ink}
          strokeOpacity={0.5}
          strokeWidth={1}
        />
        <text
          x={230}
          y={CARD_H - 80}
          textAnchor="middle"
          fill={ink}
          fontSize={11}
          fontStyle="italic"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          {data.sender}
        </text>
        <text
          x={230}
          y={CARD_H - 64}
          textAnchor="middle"
          fill={ink}
          fontOpacity={0.55}
          fontSize={9}
          letterSpacing={3}
          fontWeight={700}
          style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
        >
          Signed by
        </text>
      </g>
      <g>
        <line
          x1={CARD_W - 320}
          y1={CARD_H - 100}
          x2={CARD_W - 140}
          y2={CARD_H - 100}
          stroke={ink}
          strokeOpacity={0.5}
          strokeWidth={1}
        />
        <text
          x={CARD_W - 230}
          y={CARD_H - 80}
          textAnchor="middle"
          fill={ink}
          fontSize={11}
          fontStyle="italic"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          {data.date || "—"}
        </text>
        <text
          x={CARD_W - 230}
          y={CARD_H - 64}
          textAnchor="middle"
          fill={ink}
          fontOpacity={0.55}
          fontSize={9}
          letterSpacing={3}
          fontWeight={700}
          style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
        >
          Date
        </text>
      </g>
    </CardShell>
  );
}
