import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Flag } from '../components/Flag';
import { Laurel } from '../components/Laurel';
import { useVertical } from '../lib/format';
import { keys, prog, rise } from '../lib/motion';

/** One line of the wordmark; letters rise out of a mask (padded so descenders aren't clipped) */
const MaskedLine: React.FC<{ text: string; frame: number; start: number }> = ({ text, frame, start }) => (
  <span className="block whitespace-nowrap">
    {[...text].map((ch, i) => (
      <span key={i} className="-mb-[0.2em] inline-block overflow-hidden pb-[0.2em] align-top">
        <span className="inline-block" style={{ transform: `translateY(${(1 - prog(frame, start + i * 3, 60)) * 110}%)` }}>
          {ch}
        </span>
      </span>
    ))}
  </span>
);

export const Outro: React.FC<{ author: string; credit: string }> = ({ author, credit }) => {
  const frame = useCurrentFrame();
  const vertical = useVertical();
  const settle = keys(frame, [0, 250], [1.04, 1]);

  return (
    <AbsoluteFill className="items-center justify-center bg-white">
      <div className="flex w-full flex-col items-center" style={{ transform: `scale(${settle})` }}>
        {vertical ? (
          <p className="text-center font-serif text-[228px] leading-[0.92] tracking-[-0.035em]">
            <MaskedLine text="Indonesia" frame={frame} start={6} />
            <MaskedLine text=".gov" frame={frame} start={33} />
          </p>
        ) : (
          <p className="font-serif text-[300px] leading-[0.95] tracking-[-0.035em]">
            <MaskedLine text="Indonesia.gov" frame={frame} start={6} />
          </p>
        )}

        <div className={`flex items-center gap-6 ${vertical ? 'mt-20' : 'mt-12'}`} style={rise(frame, 70, { dist: 20 })}>
          <Laurel grow={prog(frame, 75, 60)} />
          <span className={`${vertical ? 'max-w-[11ch] text-center text-[38px] leading-tight' : 'text-[30px]'} font-medium`}>
            Semua instansi, bekerja bersama
          </span>
          <Laurel grow={prog(frame, 75, 60)} flip />
        </div>

        <p className={`${vertical ? 'mt-20 text-[38px]' : 'mt-16 text-[30px]'} text-ink`} style={rise(frame, 115, { dist: 16 })}>
          Created by <span className={`font-serif italic ${vertical ? 'text-[52px]' : 'text-[40px]'}`}>{author}</span>
        </p>
        <p className={`mt-4 flex items-center gap-3 text-muted ${vertical ? 'text-[26px]' : 'text-[20px]'}`} style={rise(frame, 130, { dist: 12 })}>
          <Flag className="h-[13px] w-[20px]" /> {credit}
        </p>
      </div>
    </AbsoluteFill>
  );
};
