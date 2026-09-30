// Same leaf math as src/components/Footer.astro; `grow` (0→1) reveals leaves bottom to top.
const P0 = [30, 98], P1 = [2, 52], P2 = [26, 4];
const leaves = Array.from({ length: 9 }, (_, i) => {
  const t = 0.08 + (i / 8) * 0.88;
  const x = (1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * P1[0] + t ** 2 * P2[0];
  const y = (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * P1[1] + t ** 2 * P2[1];
  const dx = 2 * (1 - t) * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0]);
  const dy = 2 * (1 - t) * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1]);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  return [-1, 1].map((side) => ({ x, y, angle: angle + side * 42, i }));
}).flat();

export const Laurel: React.FC<{ grow: number; flip?: boolean; className?: string }> = ({ grow, flip, className = 'h-24 w-14' }) => (
  <svg className={className} viewBox="-6 -6 52 110" style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
    <path d="M30 98 Q2 52 26 4" fill="none" stroke="#15171b" strokeWidth="1.1" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.min(1, grow * 1.2)} />
    {leaves.map((l, k) => {
      const s = Math.max(0, Math.min(1, grow * 10 - l.i));
      return (
        <g key={k} transform={`rotate(${l.angle} ${l.x} ${l.y}) translate(6.5 0)`}>
          <ellipse cx={l.x} cy={l.y} rx={7 * s} ry={2.1 * s} fill="#15171b" />
        </g>
      );
    })}
  </svg>
);
