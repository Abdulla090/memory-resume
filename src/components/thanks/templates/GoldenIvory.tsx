import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";

/**
 * Template #3 — Couture Gold.
 * Luxury wedding / engagement stationery. Centered monogram medallion,
 * hairline gold frame, italic Playfair headline, rose ornament divider.
 */
export function GoldenIvory({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const messageLines = wrapByChars(data.message, 70);
  const gold = "#b08a3a";
  const deepGold = "#8a6420";
  const ink = "#2a2012";

  return (
    <CardShell ref={svgRef} background="#f6efe2">
      {/* Hairline gold frame */}
      <rect
        x={56}
        y={56}
        width={CARD_W - 112}
        height={CARD_H - 112}
        fill="none"
        stroke={gold}
        strokeOpacity={0.45}
        strokeWidth={1}
      />
      <rect
        x={70}
        y={70}
        width={CARD_W - 140}
        height={CARD_H - 140}
        fill="none"
        stroke={gold}
        strokeOpacity={0.2}
        strokeWidth={1}
      />

      {/* Monogram medallion */}
      {data.monogram && (
        <g transform={`translate(${cx} 168)`}>
          {/* Rose wreath behind */}
          <Wreath color={gold} />

          {/* Circular border */}
          <circle cx={0} cy={0} r={58} fill="#f6efe2" stroke={gold} strokeWidth={1.5} />
          <circle
            cx={0}
            cy={0}
            r={50}
            fill="none"
            stroke={gold}
            strokeWidth={0.8}
            strokeDasharray="1.5 2"
            opacity={0.6}
          />

          {/* Monogram text */}
          <text
            x={0}
            y={12}
            textAnchor="middle"
            fill={deepGold}
            fontSize={36}
            fontStyle="italic"
            fontWeight={500}
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            {data.monogram}
          </text>
        </g>
      )}

      {/* Occasion kicker */}
      <text
        x={cx}
        y={data.monogram ? 280 : 180}
        textAnchor="middle"
        fill={deepGold}
        fontSize={12}
        letterSpacing={7}
        fontWeight={700}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.occasion.toUpperCase()}
      </text>

      {/* Headline */}
      <text
        x={cx}
        y={data.monogram ? 420 : 340}
        textAnchor="middle"
        fill={ink}
        fontSize={120}
        fontStyle="italic"
        fontWeight={400}
        style={{
          fontFamily: '"Playfair Display", "Times New Roman", serif',
          letterSpacing: "-1.5px",
        }}
      >
        {data.headline}
      </text>

      {/* Rose divider */}
      <g transform={`translate(${cx} ${data.monogram ? 460 : 380})`}>
        <line x1={-90} y1={0} x2={-16} y2={0} stroke={gold} strokeWidth={1} />
        <g transform="translate(0 0)">
          {[...Array(6)].map((_, i) => (
            <ellipse
              key={i}
              cx={0}
              cy={-4}
              rx={2.2}
              ry={5}
              fill={gold}
              transform={`rotate(${i * 60})`}
            />
          ))}
          <circle cx={0} cy={0} r={1.6} fill={deepGold} />
        </g>
        <line x1={16} y1={0} x2={90} y2={0} stroke={gold} strokeWidth={1} />
      </g>

      {/* Recipient */}
      <text
        x={cx}
        y={data.monogram ? 505 : 425}
        textAnchor="middle"
        fill="#3d2f12"
        fontSize={22}
        fontStyle="italic"
        fontWeight={500}
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        {data.recipient}
      </text>

      {/* Message */}
      <MultilineText
        lines={messageLines}
        cx={cx}
        y={data.monogram ? 545 : 465}
        lineHeight={26}
        fill="#5c4a26"
        fontSize={15}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      />

      {/* Bottom signature */}
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

/** Subtle rose wreath ring behind the monogram. */
function Wreath({ color }: { color: string }) {
  const count = 28;
  const r = 78;
  return (
    <g opacity={0.55}>
      {[...Array(count)].map((_, i) => {
        const angle = (i * 360) / count;
        return (
          <ellipse
            key={i}
            cx={0}
            cy={-r}
            rx={3.8}
            ry={11}
            fill={color}
            transform={`rotate(${angle})`}
            opacity={i % 2 === 0 ? 0.85 : 0.55}
          />
        );
      })}
    </g>
  );
}
