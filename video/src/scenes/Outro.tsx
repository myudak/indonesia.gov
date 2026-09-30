import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Flag } from '../components/Flag';
import { Laurel } from '../components/Laurel';
import { keys, pop, prog, rise } from '../lib/motion';

const WORDMARK = 'Indonesia.gov';
const STACK = ['Astro', 'GSAP', 'Tailwind CSS', 'Lenis', 'Remotion'];

export const Outro: React.FC<{ author: string; credit: string }> = ({ author, credit }) => {
  const frame = useCurrentFrame();
  const settle = keys(frame, [0, 250], [1.04, 1]);

  return (
    <AbsoluteFill className="items-center justify-center bg-white">
      <div className="flex w-full flex-col items-center" style={{ transform: `scale(${settle})` }}>
        <p className="whitespace-nowrap font-serif text-[300px] leading-[0.95] tracking-[-0.035em]">
          {[...WORDMARK].map((ch, i) => (
            <span key={i} className="-mb-[0.2em] inline-block overflow-hidden pb-[0.2em] align-top">
              <span className="inline-block" style={{ transform: `translateY(${(1 - prog(frame, 6 + i * 3, 60)) * 110}%)` }}>
                {ch}
              </span>
            </span>
          ))}
        </p>

        <div className="mt-12 flex items-center gap-6" style={rise(frame, 70, { dist: 20 })}>
          <Laurel grow={prog(frame, 75, 60)} />
          <span className="text-[30px] font-medium">Semua instansi, bekerja bersama</span>
          <Laurel grow={prog(frame, 75, 60)} flip />
        </div>

        <div className="mt-12 flex gap-3">
          {STACK.map((s, i) => (
            <span
              key={s}
              className="rounded-full border border-line bg-paper px-5 py-2 text-[20px] font-semibold"
              style={{ transform: `scale(${pop(frame, 110 + i * 6)})` }}
            >
              {s}
            </span>
          ))}
        </div>

        <p className="mt-14 text-[30px] text-ink" style={rise(frame, 140, { dist: 16 })}>
          Created by <span className="font-serif text-[40px] italic">{author}</span>
        </p>
        <p className="mt-4 flex items-center gap-3 text-[20px] text-muted" style={rise(frame, 155, { dist: 12 })}>
          <Flag className="h-[13px] w-[20px]" /> {credit}
        </p>
      </div>
    </AbsoluteFill>
  );
};
