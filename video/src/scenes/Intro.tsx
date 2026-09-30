import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Flag } from '../components/Flag';
import { keys, prog, rise } from '../lib/motion';

const TITLE = 'Halo, Indonesia';

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const underline = prog(frame, 95, 50);
  const push = keys(frame, [0, 190], [1, 1.07]);

  return (
    <AbsoluteFill className="items-center justify-center bg-[radial-gradient(120%_90%_at_50%_0%,#ffffff_0%,#f4f3f0_60%,#ebe8e3_100%)]">
      <div className="flex flex-col items-center" style={{ transform: `scale(${push})` }}>
        <div className="flex items-center gap-3 rounded-full bg-white px-5 py-2.5 shadow-[0_12px_40px_-16px_rgba(21,23,27,0.35)]" style={rise(frame, 8, { dist: 20 })}>
          <Flag className="h-[18px] w-[27px]" />
          <span className="font-serif text-[30px] leading-none">Indonesia.gov</span>
        </div>

        <h1 className="relative mt-10 font-serif text-[230px] leading-[0.95] tracking-[-0.02em]">
          {[...TITLE].map((ch, i) => (
            <span key={i} className="inline-block whitespace-pre" style={rise(frame, 22 + i * 3, { dur: 55, dist: 110, blur: 22 })}>
              {ch}
            </span>
          ))}
          {/* hand-drawn red underline under "Indonesia" */}
          <svg className="absolute -bottom-6 right-[2%] w-[58%]" viewBox="0 0 600 40" fill="none">
            <path
              d="M6 28C120 10 260 8 380 16s160 12 212 4"
              stroke="#c8102e"
              strokeWidth="9"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - underline}
            />
          </svg>
        </h1>

        <p className="mt-14 text-[34px] text-muted" style={rise(frame, 80, { dist: 24 })}>
          Satu pintu untuk semua layanan pemerintah.
        </p>
        <p className="mt-6 text-[20px] font-semibold uppercase tracking-[0.3em] text-ink/40" style={rise(frame, 110, { dist: 16 })}>
          Design konsep
        </p>
      </div>
    </AbsoluteFill>
  );
};
