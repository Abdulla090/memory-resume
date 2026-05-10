import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";

/**
 * Template — Vintage Postcard.
 * Aged-paper cream with a postage stamp block, a crossing divider line,
 * and a circular cancellation mark. Whimsical nostalgic feel.
 */
export function VintagePostcard({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const messageLines = wrapByChars(data.message, 60);
  const ink = "#2d1e13";
  const stamp = "#8c3a1f";
  const deepStamp = "#5e2211";
  const gold = "#c49a44";
  const paper = "#f3e7cf";

  return (
    <CardShell ref={svgRef} background={paper}>
      {/* Outer postcard border */}
      <rect
        x={40}
        y={40}
        width={CARD_W - 80}
        height={CARD_H - 80}
        fill="none"
        stroke={ink}
        strokeWidth={1}
      />
      {/* Dashed inner line */}
      <rect
        x={54}
        y={54}
        width={CARD_W - 108}
        height={CARD_H - 108}
        fill="none"
        stroke={ink}
        strokeWidth={0.6}
        strokeDasharray="2 3"
        opacity={0.5}
      />

      {/* Center vertical divider (postcard style) */}
      <line
        x1={cx}
        y1={80}
        x2={cx}
        y2={CARD_H - 80}
        stroke={ink}
        strokeWidth={0.8}
        opacity={0.35}
      />

      {/* Stamp block top-right */}
      <g transform={`translate(${CARD_W - 190} 90)`}>
        <rect
          x={0}
          y={0}
          width={130}
          height={150}
          fill="#f8efd6"
          stroke={ink}
          strokeWidth={1}
          strokeDasharray="3 2"
        />
        <rect x={8} y={8} width={114} height={134} fill="none" stroke={ink} strokeWidth={0.6} />
        <text
          x={65}
          y={30}
          textAnchor="middle"
          fill={stamp}
          fontSize={10}
          letterSpacing={3}
          fontWeight={700}
          style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
        >
          Gratitude
        </text>
        <g transform="translate(65 78)">
          <circle cx={0} cy={0} r={28} fill={stamp} />
          <circle cx={0} cy={0} r={22} fill="none" stroke="#f8efd6" strokeWidth={1.2} />
          <text
            x={0}
            y={4}
            textAnchor="middle"
            fill="#f8efd6"
            fontSize={20}
            fontWeight={800}
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            ♥
          </text>
        </g>
        <text
          x={65}
          y={130}
          textAnchor="middle"
          fill={deepStamp}
          fontSize={10}
          letterSpacing={2}
          fontWeight={700}
          style={{ fontFamily: '"DM Sans", sans-serif' }}
        >
          1st CLASS
        </text>
      </g>

      {/* Cancellation mark — concentric half-circles */}
      <g transform={`translate(${CARD_W - 230} 200)`} opacity={0.6}>
        {[28, 36, 44].map((r) => (
          <circle key={r} cx={0} cy={0} r={r} fill="none" stroke={ink} strokeWidth={1} />
        ))}
        <text
          x={0}
          y={4}
          textAnchor="middle"
          fill={ink}
          fontSize={9}
          letterSpacing={2}
          fontWeight={700}
          style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
        >
          POST · ♡ · POST
        </text>
      </g>

      {/* Left side: headline + recipient */}
      <text
        x={80}
        y={180}
        fill={stamp}
        fontSize={13}
        letterSpacing={8}
        fontWeight={700}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.occasion.toUpperCase()}
      </text>
      <text
        x={80}
        y={330}
        fill={ink}
        fontSize={92}
        fontStyle="italic"
        fontWeight={500}
        style={{
          fontFamily: '"Playfair Display", "Times New Roman", serif',
          letterSpacing: "-1.5px",
        }}
      >
        {data.headline}
      </text>
      {/* Gold underline */}
      <line x1={80} y1={348} x2={280} y2={348} stroke={gold} strokeWidth={2} />

      {/* "Dear …" recipient */}
      <text
        x={80}
        y={400}
        fill={ink}
        fontSize={18}
        fontStyle="italic"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        Dear {data.recipient},
      </text>

      {/* Right side: message */}
      <MultilineText
        lines={messageLines}
        cx={cx + 260}
        y={280}
        lineHeight={24}
        fill={ink}
        fontSize={14.5}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      />

      {/* Bottom left signature */}
      <text
        x={80}
        y={CARD_H - 100}
        fill={stamp}
        fontSize={12}
        letterSpacing={6}
        fontWeight={700}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.sender.toUpperCase()}
      </text>
      {data.date && (
        <text
          x={80}
          y={CARD_H - 78}
          fill={ink}
          fontOpacity={0.7}
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
