import type { ReactNode } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { keys, pop, prog } from '../lib/motion';

type Piece = { text: string } | { chip: 'flag' | 'seals' | 'print' };

const PIECES: Piece[] = [
  { text: 'Indonesia.gov' },
  { chip: 'flag' },
  { text: 'pakai AI untuk memberi jawaban sederhana hanya dari' },
  { chip: 'seals' },
  { text: 'sumber resmi pemerintah. Gratis, tanpa iklan, dan selalu menjaga' },
  { chip: 'print' },
  { text: 'privasimu.' },
];

const START = 12;
const PER_WORD = 4.2;

const chipBase = 'relative mx-[0.06em] inline-grid size-[0.92em] place-items-center overflow-hidden rounded-full align-[-0.12em]';

export const Manifesto: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = keys(frame, [0, 250], [1, 1.08]);
  const driftY = keys(frame, [0, 250], [30, -20]);

  let cursor = START;
  const out: ReactNode[] = [];

  PIECES.forEach((piece, pi) => {
    if ('text' in piece) {
      piece.text.split(' ').forEach((word, wi) => {
        const t = cursor;
        cursor += PER_WORD;
        const o = interpolate(frame, [t, t + 10], [0.12, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        out.push(
          <span key={`${pi}-${wi}`} style={{ opacity: o }}>
            {word}{' '}
          </span>,
        );
      });
      return;
    }

    const t = cursor;
    cursor += 10;
    if (piece.chip === 'flag') {
      const s = pop(frame, t);
      const arrowOut = prog(frame, t + 22, 20);
      const flagIn = prog(frame, t + 28, 26);
      out.push(
        <span key={pi} className={`${chipBase} bg-ink text-white`} style={{ transform: `scale(${s}) rotate(${(1 - s) * -90}deg)` }}>
          <svg className="w-[0.42em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${arrowOut * -90}deg) scale(${1 - arrowOut * 0.6})`, opacity: 1 - arrowOut }}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
          <span className="absolute inset-0 flex flex-col" style={{ clipPath: `inset(${(1 - flagIn) * 100}% 0% 0% 0%)` }}>
            <span className="flex-1 bg-merah" />
            <span className="flex-1 bg-white" />
          </span>
        </span>,
      );
    } else if (piece.chip === 'seals') {
      const seals = [
        ['#23408e', '#e7c873', 'M3.5 9 12 4.5 20.5 9M6 10.5V17M10 10.5V17M14 10.5V17M18 10.5V17M4 19.5h16'],
        ['#0c7a4d', '#fff', 'M12 3.5 19 6.5v5c0 4.3-2.9 7.6-7 9.5-4.1-1.9-7-5.2-7-9.5v-5zM8.8 12l2.3 2.3 4.2-4.6'],
        ['#c8102e', '#fff', 'M12 4v16M7.5 20h9M5 8h14M5 8l-2.5 6h5zM19 8l-2.5 6h5z'],
      ];
      out.push(
        <span key={pi} className="mx-[0.1em] inline-flex align-[-0.12em]">
          {seals.map(([bg, fg, d], k) => {
            const s = pop(frame, t + k * 7);
            return (
              <span key={k} className={`${chipBase} mx-[-0.12em] shadow-[0_0_0_0.05em_#fff]`} style={{ background: bg, color: fg, transform: `translateX(${(1 - s) * -40 * (k + 1)}px) scale(${s})` }}>
                <svg className="w-[0.5em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={d} />
                </svg>
              </span>
            );
          })}
        </span>,
      );
      cursor += 8;
    } else {
      const s = pop(frame, t);
      const draw = prog(frame, t + 6, 40);
      const prints = [
        'M6.2 17.8A8 8 0 0 1 17.6 6.3',
        'M19.4 9.3c.4.9.6 1.8.6 2.7v1.6',
        'M9.3 20.2A10 10 0 0 1 8 15v-3a4 4 0 0 1 8 0v2.2c0 1.6.3 3.1 1 4.5',
        'M12 12v2.6c0 2.4.7 4.6 2 6.2',
        'M4.3 9.2c.4-.9.9-1.8 1.5-2.5',
      ];
      out.push(
        <span key={pi} className={`${chipBase} overflow-visible text-merah`} style={{ transform: `scale(${s})`, background: 'radial-gradient(circle, #ffe3e8 0%, #ffd0d8 45%, rgba(255,208,216,0) 72%)' }}>
          <svg className="w-[0.62em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {prints.map((d, k) => (
              <path key={k} d={d} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.min(1, Math.max(0, draw * 1.6 - k * 0.15))} />
            ))}
          </svg>
        </span>,
      );
    }
  });

  return (
    <AbsoluteFill className="items-center justify-center bg-white px-[140px]">
      <p
        className="text-center font-serif text-[104px] leading-[1.04] tracking-[-0.02em] text-ink"
        style={{ transform: `translateY(${driftY}px) scale(${drift})`, textWrap: 'balance' }}
      >
        {out}
      </p>
    </AbsoluteFill>
  );
};
