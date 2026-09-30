import { Img } from 'remotion';
import type { Example } from '../../../src/data/content';
import { scenes } from '../lib/assets';
import { EXPO_IN_OUT, keys, prog, rise, typeText } from '../lib/motion';
import { AnswerCard } from './AnswerCard';
import { Flag } from './Flag';
import { Icon } from './Icon';

export type Slide = { ex: Example; at: number };

/**
 * The site's hero at phone width (390 × 844 CSS px). Slides after the first wipe in at `at`;
 * the first slide's answer card rises at `firstAnswerAt`. `introAt` animates the page in.
 */
export const MobileHero: React.FC<{ frame: number; slides: Slide[]; introAt?: number; firstAnswerAt?: number }> = ({
  frame,
  slides,
  introAt,
  firstAnswerAt = 110,
}) => {
  const active = slides.filter((s) => frame >= s.at).length - 1;
  const typing = slides[Math.max(0, active)];
  const typed = typeText(`Coba ‘${typing.ex.question}’`, frame, Math.max(typing.at, (introAt ?? -40) + 40), 30);
  const r = (at: number, dist = 20) => (introAt === undefined ? undefined : rise(frame, introAt + at, { dist }));

  return (
    <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_0%,#ffffff_0%,#f4f3f0_60%)] px-4 pt-[62px]">
      <div className="flex items-center justify-between" style={r(4, 10)}>
        <span className="flex items-center gap-2">
          <Flag className="h-[13px] w-[20px]" />
          <span className="font-serif text-[20px] leading-none">Indonesia.gov</span>
        </span>
        <span className="rounded-full bg-ink px-3.5 py-1.5 text-[12px] font-semibold text-white">Menu</span>
      </div>
      <p className="mt-9 text-center font-serif text-[54px] leading-[0.95] tracking-[-0.02em]">
        {[...'Halo, Indonesia'].map((ch, i) => (
          <span key={i} className="inline-block whitespace-pre" style={introAt === undefined ? undefined : rise(frame, introAt + 8 + i * 2, { dist: 36, blur: 10 })}>
            {ch}
          </span>
        ))}
      </p>
      <p className="mx-auto mt-3 max-w-[30ch] text-center text-[14px] text-muted" style={r(30, 12)}>
        Apa pun yang kamu butuhkan dari pemerintah, mulai di sini.
      </p>
      <div className="relative z-10 mt-6 flex h-14 items-center gap-2 rounded-full border border-ink/80 bg-white pl-5 pr-1.5" style={r(38, 16)}>
        <span className="flex-1 truncate text-[14px] text-ink/55">
          {typed}
          <span className="text-merah" style={{ opacity: Math.floor(frame / 16) % 2 ? 0 : 1 }}>|</span>
        </span>
        <span className="grid size-9 place-items-center rounded-full bg-merah text-white"><Icon name="arrow" className="size-4" /></span>
      </div>
      <div className="relative -mt-7 h-[470px] overflow-hidden rounded-[26px]" style={introAt === undefined ? undefined : rise(frame, introAt + 44, { dur: 70, dist: 60, blur: 0 })}>
        {slides.map(({ ex, at }, i) => {
          if (frame < at - 1 || i < active - 1) return null;
          const wipe = i === 0 ? 1 : prog(frame, at, 60, EXPO_IN_OUT);
          return (
            <div key={ex.image} className="absolute inset-0" style={{ clipPath: `inset(0% 0% 0% ${(1 - wipe) * 100}%)`, zIndex: i }}>
              <Img src={scenes[ex.image]} className="absolute inset-0 size-full object-cover" style={{ objectPosition: '28% 50%', transform: `scale(${keys(frame, [at, at + 150], [1.2, 1.04])})` }} />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.28))]" />
              <div className="absolute inset-x-3 bottom-3 origin-bottom scale-[0.92]">
                <AnswerCard ex={ex} frame={frame} start={i === 0 ? firstAnswerAt : at + 30} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
