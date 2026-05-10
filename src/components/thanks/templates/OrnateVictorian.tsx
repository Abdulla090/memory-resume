import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";

/**
 * Template — Ornate Victorian.
 * Baroque filigree corners, double engraved frame, classic serif center.
 * Beautiful for weddings, anniversaries, and formal invitations.
 */
export function OrnateVictorian({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const messageLines = wrapByChars(data.message, 72);
  const ink = "#1a1a1f";
  const antiqueGold = "#b08837";
  const paper = "#f6eed9";

  return (
    <CardShell ref={svgRef} background={paper}>
      {/* Outer + inner engraved frames */}
      <rect
        x={44}
        y={44}
        width={CARD_W - 88}
        height={CARD_H - 88}
        fill="none"
        stroke={ink}
        strokeOpacity={0.75}
        strokeWidth={1.8}
      />
      <rect
        x={58}
        y={58}
        width={CARD_W - 116}
        height={CARD_H - 116}
        fill="none"
        stroke={antiqueGold}
        strokeWidth={1}
      />
      <rect
        x={68}
        y={68}
        width={CARD_W - 136}
        height={CARD_H - 136}
        fill="none"
        stroke={antiqueGold}
        strokeOpacity={0.4}
        strokeWidth={0.6}
        strokeDasharray="1 3"
      />

      {/* Corner filigree */}
      {[
        { x: 44, y: 44, rot: 0 },
        { x: CARD_W - 44, y: 44, rot: 90 },
        { x: CARD_W - 44, y: CARD_H - 44, rot: 180 },
        { x: 44, y: CARD_H - 44, rot: 270 },
      ].map((c, i) => (
        <g key={i} transform={`translate(${c.x} ${c.y}) rotate(${c.rot})`}>
          <Filigree color={antiqueGold} />
        </g>
      ))}

      {/* Top center ornament */}
      <g transform={`translate(${cx} 135)`}>
        <path
          d="M 0 0 Q -10 -14 -24 -10 Q -34 -4 -28 8 Q -22 16 -10 12 Q -4 10 0 4 Q 4 10 10 12 Q 22 16 28 8 Q 34 -4 24 -10 Q 10 -14 0 0 Z"
          fill={antiqueGold}
        />
        <circle cx={0} cy={2} r={3} fill={paper} />
        <path
          d="M -70 10 Q -35 18 0 16 Q 35 18 70 10"
          fill="none"
          stroke={antiqueGold}
          strokeWidth={1.1}
        />
        <path
          d="M -60 20 Q -30 26 0 24 Q 30 26 60 20"
          fill="none"
          stroke={antiqueGold}
          strokeOpacity={0.6}
          strokeWidth={0.8}
        />
      </g>

      {/* Occasion */}
      <text
        x={cx}
        y={210}
        textAnchor="middle"
        fill={antiqueGold}
        fontSize={12}
        letterSpacing={9}
        fontWeight={700}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.occasion.toUpperCase()}
      </text>

      {/* Headline */}
      <text
        x={cx}
        y={400}
        textAnchor="middle"
        fill={ink}
        fontSize={134}
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
        y={450}
        textAnchor="middle"
        fill={ink}
        fontSize={22}
        fontStyle="italic"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        {data.recipient}
      </text>

      {/* Divider */}
      <g transform={`translate(${cx} 482)`}>
        <line x1={-70} y1={0} x2={-14} y2={0} stroke={antiqueGold} strokeWidth={1} />
        <path
          d="M -10 0 Q -5 -6 0 0 Q 5 6 10 0"
          fill="none"
          stroke={antiqueGold}
          strokeWidth={1}
        />
        <line x1={14} y1={0} x2={70} y2={0} stroke={antiqueGold} strokeWidth={1} />
      </g>

      {/* Message */}
      <MultilineText
        lines={messageLines}
        cx={cx}
        y={518}
        lineHeight={24}
        fill="#4a3e2a"
        fontSize={14.5}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      />

      {/* Bottom mirror ornament */}
      <g transform={`translate(${cx} ${CARD_H - 150}) scale(1 -1)`}>
        <path
          d="M 0 0 Q -8 -10 -18 -8 Q -26 -2 -22 6 Q -16 12 -8 10 Q -4 8 0 4 Q 4 8 8 10 Q 16 12 22 6 Q 26 -2 18 -8 Q 8 -10 0 0 Z"
          fill={antiqueGold}
          opacity={0.9}
        />
        <path
          d="M -60 14 Q 0 22 60 14"
          fill="none"
          stroke={antiqueGold}
          strokeWidth={1}
          opacity={0.55}
        />
      </g>

      {/* Signature */}
      <text
        x={cx}
        y={CARD_H - 90}
        textAnchor="middle"
        fill={antiqueGold}
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
          y={CARD_H - 70}
          textAnchor="middle"
          fill="#7a6028"
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

function Filigree({ color }: { color: string }) {
  return (
    <g opacity={0.85}>
      {/* Main scroll */}
      <path
        d="M 20 20 C 80 20 100 40 100 80 C 100 60 80 40 40 40 Q 30 50 20 60"
        fill="none"
        stroke={color}
        strokeWidth={1.3}
      />
      <path
        d="M 20 20 C 20 80 40 100 80 100 C 60 100 40 80 40 40 Q 50 30 60 20"
        fill="none"
        stroke={color}
        strokeWidth={1.3}
      />
      {/* Inner curls */}
      <path
        d="M 40 40 Q 52 48 58 60 Q 52 58 44 52 Q 42 48 40 40 Z"
        fill={color}
        opacity={0.55}
      />
      <path
        d="M 40 40 Q 48 52 60 58 Q 58 52 52 44 Q 48 42 40 40 Z"
        fill={color}
        opacity={0.55}
      />
      {/* Accent dots */}
      <circle cx={100} cy={60} r={2.5} fill={color} />
      <circle cx={60} cy={100} r={2.5} fill={color} />
      <circle cx={100} cy={100} r={2} fill={color} opacity={0.7} />
    </g>
  );
}
