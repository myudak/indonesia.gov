import { useLayoutEffect, useMemo, useRef } from 'react';
import { AbsoluteFill, random, useCurrentFrame } from 'remotion';
import { orbitSites } from '../../../src/data/content';
import { useVertical } from '../lib/format';
import { keys, prog, rise } from '../lib/motion';

// Port of the canvas sphere in src/components/Orbit.astro, driven by frame instead of a ticker.
const ACCENTS = ['#c8102e', '#23408e', '#0c7a4d', '#8a2c6d', '#b8860b', '#0d6070', '#3d3a9e', '#15171b'];
const COUNT = 170;
const SIZE = 1000;

export const Orbit: React.FC = () => {
  const frame = useCurrentFrame();
  const vertical = useVertical();
  const canvas = useRef<HTMLCanvasElement>(null);

  const tiles = useMemo(() => {
    const golden = Math.PI * (3 - Math.sqrt(5));
    return Array.from({ length: COUNT }, (_, i) => {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      return {
        x: Math.cos(t) * r,
        y,
        z: Math.sin(t) * r,
        sx: (random(`sx${i}`) - 0.5) * 4.6,
        sy: (random(`sy${i}`) - 0.5) * 3.4,
        sz: (random(`sz${i}`) - 0.5) * 2,
        accent: ACCENTS[i % ACCENTS.length],
        site: orbitSites[i % orbitSites.length],
        variant: i % 3,
      };
    });
  }, []);

  const assemble = prog(frame, 0, 130);
  const rotY = 0.6 + frame * 0.0075;
  const rotX = keys(frame, [0, 250], [-0.5, 0.15]);

  useLayoutEffect(() => {
    const ctx = canvas.current?.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, SIZE, SIZE);
    const R = SIZE * 0.37;
    const c = SIZE / 2;
    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const pts = tiles.map((t, i) => {
      let x = t.x * cosY - t.z * sinY;
      let z = t.x * sinY + t.z * cosY;
      let y = t.y * cosX - z * sinX;
      z = t.y * sinX + z * cosX;
      const k = ease(Math.min(1, Math.max(0, assemble * 1.6 - (i / COUNT) * 0.6)));
      const fx = Math.sqrt(Math.max(0, 1 - x * x));
      const fy = Math.sqrt(Math.max(0, 1 - y * y));
      x = t.sx + (x - t.sx) * k;
      y = t.sy + (y - t.sy) * k;
      z = t.sz + (z - t.sz) * k;
      return { t, x, y, z, k, fx: 1 + (fx - 1) * k, fy: 1 + (fy - 1) * k };
    });
    pts.sort((a, b) => a.z - b.z);

    for (const p of pts) {
      const depth = (p.z + 1) / 2;
      const persp = 1 / (1 - p.z * 0.22);
      const scale = (0.55 + depth * 0.45) * persp;
      const w = Math.max(6, 68 * scale * Math.max(0.18, p.fx) * (R / 250));
      const h = 46 * scale * Math.max(0.3, p.fy) * (R / 250);
      const px = c + p.x * R * persp - w / 2;
      const py = c + p.y * R * persp - h / 2;
      const alpha = (0.08 + 0.92 * Math.pow(depth, 1.6)) * Math.min(1, p.k * 1.4);
      if (alpha < 0.02) continue;

      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.roundRect(px, py, w, h, Math.min(10, w * 0.14));
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.strokeStyle = 'rgba(21,23,27,0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.save();
      ctx.clip();
      ctx.fillStyle = p.t.accent;
      ctx.fillRect(px, py, w, h * 0.22);
      ctx.restore();

      if (w > 30) {
        const lx = px + w * 0.12;
        ctx.fillStyle = 'rgba(21,23,27,0.14)';
        if (p.t.variant === 0) {
          ctx.fillRect(lx, py + h * 0.62, w * 0.6, h * 0.08);
          ctx.fillRect(lx, py + h * 0.78, w * 0.4, h * 0.08);
        } else if (p.t.variant === 1) {
          ctx.fillRect(lx, py + h * 0.62, w * 0.32, h * 0.22);
          ctx.fillRect(lx + w * 0.4, py + h * 0.62, w * 0.36, h * 0.22);
        } else {
          ctx.beginPath();
          ctx.arc(lx + h * 0.12, py + h * 0.72, h * 0.12, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillRect(lx + h * 0.32, py + h * 0.66, w * 0.45, h * 0.1);
        }
        if (depth > 0.72 && p.fx > 0.55 && w > 48) {
          ctx.fillStyle = 'rgba(21,23,27,0.85)';
          ctx.font = `600 ${Math.max(8, h * 0.15)}px "Plus Jakarta Sans", sans-serif`;
          ctx.fillText(`${p.t.site}.go.id`, lx, py + h * 0.47, w * 0.8);
        }
      }
    }
    ctx.globalAlpha = 1;
  }, [assemble, rotX, rotY, tiles]);

  return (
    <AbsoluteFill
      className={
        vertical
          ? 'flex-col items-center justify-center bg-[radial-gradient(90%_60%_at_50%_35%,#ffffff_0%,#f4f3f0_70%)]'
          : 'flex-row items-center bg-[radial-gradient(90%_90%_at_35%_50%,#ffffff_0%,#f4f3f0_70%)] pl-[80px]'
      }
    >
      <canvas ref={canvas} width={SIZE} height={SIZE} style={{ width: 1000, height: 1000, transform: `scale(${keys(frame, [0, 250], [0.92, 1.02])})` }} />
      <div className={vertical ? '-mt-16 w-[900px] text-center' : 'ml-6 w-[640px]'}>
        <p className="text-[20px] font-semibold uppercase tracking-[0.3em] text-merah" style={rise(frame, 70, { dist: 16 })}>
          .go.id
        </p>
        <h2 className={`mt-5 font-serif leading-[0.98] tracking-[-0.02em] ${vertical ? 'text-[132px]' : 'text-[118px]'}`}>
          {['Ribuan situs,', 'jadi satu.'].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <span className="block" style={{ transform: `translateY(${(1 - prog(frame, 80 + i * 10, 60)) * 105}%)` }}>
                {line}
              </span>
            </span>
          ))}
        </h2>
        <p className={`mt-8 max-w-[34ch] leading-relaxed text-muted ${vertical ? 'mx-auto text-[34px]' : 'text-[26px]'}`} style={rise(frame, 110, { dist: 20 })}>
          Nggak perlu lagi loncat dari satu situs ke situs lain. Semua layanan pemerintah, satu tempat.
        </p>
      </div>
    </AbsoluteFill>
  );
};
