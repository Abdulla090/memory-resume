/**
 * Reusable SVG botanical primitives — flowers, leaves, sprigs, hearts,
 * butterflies, watercolor splashes. Every element is pure vector so
 * templates that compose them export to crisp PDF.
 */

// ── Watercolor splash — organic blob rendered with a bezier path ─────────
export function Splash({
  color,
  x,
  y,
  size = 200,
  opacity = 0.35,
  seed = 0,
}: {
  color: string;
  x: number;
  y: number;
  size?: number;
  opacity?: number;
  seed?: number;
}) {
  // Seeded pseudo-random bezier blob
  const pts: [number, number][] = [];
  const n = 10;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const rnd = Math.sin(seed * 7.3 + i * 2.1) * 0.5 + 0.5;
    const r = size * (0.7 + rnd * 0.5);
    pts.push([Math.cos(a) * r, Math.sin(a) * r]);
  }
  let d = `M ${pts[0][0]} ${pts[0][1]} `;
  for (let i = 0; i < n; i++) {
    const p0 = pts[i];
    const p1 = pts[(i + 1) % n];
    const cx = (p0[0] + p1[0]) / 2 + Math.sin(seed + i) * size * 0.1;
    const cy = (p0[1] + p1[1]) / 2 + Math.cos(seed + i) * size * 0.1;
    d += `Q ${cx} ${cy} ${p1[0]} ${p1[1]} `;
  }
  d += "Z";
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={d} fill={color} opacity={opacity} />
      <path d={d} fill={color} opacity={opacity * 0.7} transform="scale(0.7)" />
      <path d={d} fill={color} opacity={opacity * 0.4} transform="scale(0.4)" />
    </g>
  );
}

// ── Leaf ─────────────────────────────────────────────────────────────────
export function Leaf({
  color,
  x = 0,
  y = 0,
  rotation = 0,
  size = 40,
  vein = "#0f3d30",
  opacity = 0.9,
}: {
  color: string;
  x?: number;
  y?: number;
  rotation?: number;
  size?: number;
  vein?: string;
  opacity?: number;
}) {
  const w = size * 0.45;
  const h = size;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation})`} opacity={opacity}>
      <path
        d={`M 0 0 Q ${w} ${-h * 0.3} 0 ${-h} Q ${-w} ${-h * 0.3} 0 0 Z`}
        fill={color}
      />
      <path
        d={`M 0 0 L 0 ${-h}`}
        stroke={vein}
        strokeWidth={0.8}
        opacity={0.55}
      />
    </g>
  );
}

// ── Berry cluster (small dots on a stem) ─────────────────────────────────
export function Berry({
  x = 0,
  y = 0,
  color = "#1e2a4a",
  rotation = 0,
}: {
  x?: number;
  y?: number;
  color?: string;
  rotation?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation})`}>
      <path d="M 0 0 L 0 -30" stroke={color} strokeWidth={0.8} opacity={0.6} />
      <circle cx={0} cy={-30} r={3} fill={color} />
      <circle cx={4} cy={-24} r={2.5} fill={color} />
      <circle cx={-3} cy={-20} r={2.5} fill={color} />
      <circle cx={2} cy={-14} r={2} fill={color} />
      <circle cx={-2} cy={-8} r={2} fill={color} />
    </g>
  );
}

// ── Rose (watercolor style, layered petals) ──────────────────────────────
export function Rose({
  x = 0,
  y = 0,
  size = 40,
  color = "#e8adc0",
  dark = "#b8637c",
  light = "#f5d0da",
  rotation = 0,
}: {
  x?: number;
  y?: number;
  size?: number;
  color?: string;
  dark?: string;
  light?: string;
  rotation?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation})`}>
      {/* Outer petals */}
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse
          key={`o-${a}`}
          cx={0}
          cy={-size * 0.6}
          rx={size * 0.55}
          ry={size * 0.75}
          fill={color}
          opacity={0.85}
          transform={`rotate(${a})`}
        />
      ))}
      {/* Mid petals */}
      {[30, 90, 150, 210, 270, 330].map((a) => (
        <ellipse
          key={`m-${a}`}
          cx={0}
          cy={-size * 0.4}
          rx={size * 0.35}
          ry={size * 0.5}
          fill={dark}
          opacity={0.75}
          transform={`rotate(${a})`}
        />
      ))}
      {/* Inner */}
      {[0, 90, 180, 270].map((a) => (
        <ellipse
          key={`i-${a}`}
          cx={0}
          cy={-size * 0.25}
          rx={size * 0.22}
          ry={size * 0.3}
          fill={light}
          opacity={0.95}
          transform={`rotate(${a})`}
        />
      ))}
      {/* Core */}
      <circle cx={0} cy={0} r={size * 0.1} fill={dark} />
    </g>
  );
}

// ── Hydrangea / pom-pom flower (cluster of small petals) ────────────────
export function Hydrangea({
  x = 0,
  y = 0,
  size = 50,
  color = "#94a8c9",
  dark = "#6b7fa3",
  light = "#c3d1e4",
}: {
  x?: number;
  y?: number;
  size?: number;
  color?: string;
  dark?: string;
  light?: string;
}) {
  // Many small 4-petal florets packed into a disc
  const florets: [number, number, number][] = []; // x, y, rot
  const layers = [
    { r: 0, count: 1 },
    { r: size * 0.28, count: 6 },
    { r: size * 0.5, count: 10 },
    { r: size * 0.72, count: 14 },
  ];
  layers.forEach((layer) => {
    for (let i = 0; i < layer.count; i++) {
      const a = (i / layer.count) * Math.PI * 2;
      florets.push([Math.cos(a) * layer.r, Math.sin(a) * layer.r, a * 60]);
    }
  });
  return (
    <g transform={`translate(${x} ${y})`}>
      {florets.map(([fx, fy, r], i) => (
        <g key={i} transform={`translate(${fx} ${fy}) rotate(${r})`}>
          {[0, 90, 180, 270].map((a) => (
            <ellipse
              key={a}
              cx={0}
              cy={-size * 0.08}
              rx={size * 0.07}
              ry={size * 0.12}
              fill={i % 3 === 0 ? light : i % 3 === 1 ? color : dark}
              transform={`rotate(${a})`}
              opacity={0.88}
            />
          ))}
          <circle cx={0} cy={0} r={size * 0.025} fill="#e8b964" />
        </g>
      ))}
    </g>
  );
}

// ── 5-petal bloom (simple, like a wild rose or anemone) ──────────────────
export function Bloom({
  x = 0,
  y = 0,
  size = 34,
  color = "#e77a99",
  petalDark = "#b84971",
  center = "#fde047",
  rotation = 0,
  petals = 5,
}: {
  x?: number;
  y?: number;
  size?: number;
  color?: string;
  petalDark?: string;
  center?: string;
  rotation?: number;
  petals?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation})`}>
      {Array.from({ length: petals }).map((_, i) => {
        const a = (i * 360) / petals;
        return (
          <g key={i} transform={`rotate(${a})`}>
            <ellipse
              cx={0}
              cy={-size * 0.5}
              rx={size * 0.35}
              ry={size * 0.6}
              fill={color}
              opacity={0.9}
            />
            <ellipse
              cx={0}
              cy={-size * 0.4}
              rx={size * 0.18}
              ry={size * 0.3}
              fill={petalDark}
              opacity={0.55}
            />
          </g>
        );
      })}
      <circle cx={0} cy={0} r={size * 0.2} fill={center} />
      <circle cx={0} cy={0} r={size * 0.08} fill={petalDark} />
    </g>
  );
}

// ── Heart ────────────────────────────────────────────────────────────────
export function Heart({
  x = 0,
  y = 0,
  size = 20,
  color = "#f472b6",
  rotation = 0,
  opacity = 1,
}: {
  x?: number;
  y?: number;
  size?: number;
  color?: string;
  rotation?: number;
  opacity?: number;
}) {
  const s = size / 20;
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rotation}) scale(${s})`}
      opacity={opacity}
    >
      <path
        d="M 0 4 C -6 -6 -16 -6 -16 4 C -16 12 -6 18 0 24 C 6 18 16 12 16 4 C 16 -6 6 -6 0 4 Z"
        fill={color}
      />
    </g>
  );
}

// ── Butterfly ────────────────────────────────────────────────────────────
export function Butterfly({
  x = 0,
  y = 0,
  size = 40,
  color = "#f4a5a5",
  dark = "#c6708a",
  rotation = 0,
}: {
  x?: number;
  y?: number;
  size?: number;
  color?: string;
  dark?: string;
  rotation?: number;
}) {
  const s = size / 40;
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rotation}) scale(${s})`}
    >
      {/* Upper wings */}
      <path
        d="M 0 0 Q -20 -20 -26 -8 Q -26 4 -12 8 Q -4 8 0 0 Z"
        fill={color}
      />
      <path
        d="M 0 0 Q 20 -20 26 -8 Q 26 4 12 8 Q 4 8 0 0 Z"
        fill={color}
      />
      {/* Lower wings */}
      <path
        d="M 0 2 Q -18 16 -22 26 Q -14 26 -4 18 Q 0 12 0 2 Z"
        fill={dark}
        opacity={0.85}
      />
      <path
        d="M 0 2 Q 18 16 22 26 Q 14 26 4 18 Q 0 12 0 2 Z"
        fill={dark}
        opacity={0.85}
      />
      {/* Wing dots */}
      <circle cx={-14} cy={-6} r={2} fill="#fff" opacity={0.85} />
      <circle cx={14} cy={-6} r={2} fill="#fff" opacity={0.85} />
      {/* Body */}
      <ellipse cx={0} cy={4} rx={1.5} ry={12} fill="#1f1f26" />
      <circle cx={0} cy={-10} r={2} fill="#1f1f26" />
      {/* Antennae */}
      <path
        d="M 0 -10 Q -4 -18 -8 -18"
        stroke="#1f1f26"
        strokeWidth={0.8}
        fill="none"
      />
      <path
        d="M 0 -10 Q 4 -18 8 -18"
        stroke="#1f1f26"
        strokeWidth={0.8}
        fill="none"
      />
    </g>
  );
}

// ── Sprig (branch of leaves with optional berries) ───────────────────────
export function Sprig({
  x = 0,
  y = 0,
  rotation = 0,
  length = 120,
  color = "#5f7a5a",
  vein = "#2f3d2b",
  flip = false,
}: {
  x?: number;
  y?: number;
  rotation?: number;
  length?: number;
  color?: string;
  vein?: string;
  flip?: boolean;
}) {
  const dir = flip ? -1 : 1;
  const leaves = 6;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation})`}>
      <path
        d={`M 0 0 Q ${length * 0.4} ${-10 * dir} ${length} 0`}
        stroke={vein}
        strokeWidth={1}
        fill="none"
        opacity={0.7}
      />
      {Array.from({ length: leaves }).map((_, i) => {
        const t = (i + 1) / (leaves + 1);
        const px = length * t;
        const py = -Math.sin(t * Math.PI) * 10 * dir;
        const rot = (i % 2 === 0 ? 30 : -30) * dir;
        return (
          <Leaf
            key={i}
            x={px}
            y={py}
            color={color}
            vein={vein}
            size={26}
            rotation={rot}
            opacity={0.88}
          />
        );
      })}
    </g>
  );
}

// ── Watercolor wash — gradient-filled splash (for backdrop behind text) ──
export function WatercolorWash({
  id,
  color,
  x,
  y,
  w,
  h,
  opacity = 0.35,
}: {
  id: string;
  color: string;
  x: number;
  y: number;
  w: number;
  h: number;
  opacity?: number;
}) {
  return (
    <g>
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor={color} stopOpacity={opacity} />
          <stop offset="60%" stopColor={color} stopOpacity={opacity * 0.6} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </radialGradient>
      </defs>
      <ellipse
        cx={x + w / 2}
        cy={y + h / 2}
        rx={w / 2}
        ry={h / 2}
        fill={`url(#${id})`}
      />
    </g>
  );
}
