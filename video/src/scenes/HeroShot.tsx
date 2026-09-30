import { AbsoluteFill, Img, useCurrentFrame } from 'remotion';
import { examples } from '../../../src/data/content';
import { AnswerCard } from '../components/AnswerCard';
import { Flag } from '../components/Flag';
import { BrowserFrame, PhoneFrame } from '../components/Frames';
import { MobileHero } from '../components/MobileHero';
import { useVertical } from '../lib/format';
import { Icon } from '../components/Icon';
import { scenes } from '../lib/assets';
import { EXPO_IN_OUT, keys, prog, rise, typeText } from '../lib/motion';

// Three slides: when each one starts wiping in (frames, local to this scene)
const SLIDES = [
  { ex: examples[0], at: 0 },
  { ex: examples[1], at: 206 }, // wipe midpoints land on half-bar beats (local 236, 312)
  { ex: examples[4], at: 282 },
];

/** 9:16 cut: the phone fills the frame, swings in, pushes toward the photo, settles */
const VerticalHero: React.FC<{ frame: number }> = ({ frame }) => {
  const rx = keys(frame, [0, 80], [24, 0]);
  const ry = keys(frame, [0, 80], [-22, 0]);
  const scale = keys(frame, [0, 80, 170, 250, 396], [1.3, 1.8, 1.98, 1.86, 1.9]);
  const ty = keys(frame, [0, 80, 170, 250], [260, 10, -40, 0]);
  return (
    <AbsoluteFill className="items-center justify-center bg-[linear-gradient(180deg,#efece7,#e4e0da)]" style={{ perspective: 2600 }}>
      <div style={{ transform: `translateY(${ty}px) scale(${scale}) rotateX(${rx}deg) rotateY(${ry}deg)` }}>
        <PhoneFrame>
          <MobileHero frame={frame} slides={SLIDES} introAt={0} firstAnswerAt={120} />
        </PhoneFrame>
      </div>
    </AbsoluteFill>
  );
};

export const HeroShot: React.FC = () => {
  const frame = useCurrentFrame();
  const vertical = useVertical();
  if (vertical) return <VerticalHero frame={frame} />;

  // camera: swing in from a 3D tilt, push toward the search bar, settle back
  const rx = keys(frame, [0, 80], [26, 0]);
  const ry = keys(frame, [0, 80], [-24, 0]);
  const scale = keys(frame, [0, 80, 150, 230, 380], [0.72, 0.9, 1.22, 0.98, 1.02]);
  const ty = keys(frame, [0, 80, 150, 230], [140, 30, 170, 0]);

  // the page scrolls up inside the window to reveal the photo stage
  const scroll = keys(frame, [140, 210], [0, 330]);

  const active = SLIDES.filter((s) => frame >= s.at).length - 1;
  const typing = SLIDES[active];
  const typed = typeText(`Coba ‘${typing.ex.question}’`, frame, Math.max(typing.at, 40), 38);

  return (
    <AbsoluteFill className="items-center justify-center bg-[linear-gradient(180deg,#efece7,#e4e0da)]" style={{ perspective: 2200 }}>
      <div style={{ transform: `translateY(${ty}px) scale(${scale}) rotateX(${rx}deg) rotateY(${ry}deg)` }}>
        <BrowserFrame width={1560} height={940}>
          <div
            className="bg-[radial-gradient(120%_80%_at_50%_0%,#ffffff_0%,#f4f3f0_55%,#eeece8_100%)]"
            style={{ transform: `translateY(${-scroll}px)`, minHeight: 940 - 52 + 330 }}
          >
            <header className="flex items-center justify-between px-12 pt-8" style={rise(frame, 20, { dist: 12 })}>
              <span className="flex items-center gap-3">
                <Flag className="h-[18px] w-[27px]" />
                <span className="font-serif text-[26px] leading-none">Indonesia.gov</span>
              </span>
              <span className="rounded-full bg-ink px-5 py-2 text-[14px] font-semibold text-white">Menu</span>
            </header>

            <div className="pt-16 text-center">
              <h1 className="font-serif text-[120px] leading-[0.95] tracking-[-0.02em]">
                {[...'Halo, Indonesia'].map((ch, i) => (
                  <span key={i} className="inline-block whitespace-pre" style={rise(frame, 14 + i * 2.2, { dist: 60, blur: 14 })}>
                    {ch}
                  </span>
                ))}
              </h1>
              <p className="mt-6 text-[22px] text-muted" style={rise(frame, 40, { dist: 16 })}>
                Apa pun yang kamu butuhkan dari pemerintah, mulai di sini.
              </p>
            </div>

            <div className="relative mx-auto mt-14 w-[860px] pb-24">
              <div
                className="relative z-20 flex h-[78px] items-center gap-2 rounded-full border border-ink/80 bg-white pl-7 pr-2 shadow-[0_18px_50px_-18px_rgba(21,23,27,0.35)]"
                style={rise(frame, 48, { dist: 24, blur: 0 })}
              >
                <span className="flex-1 truncate text-[19px] text-ink/60">
                  {typed}
                  <span className="text-merah" style={{ opacity: Math.floor(frame / 16) % 2 ? 0 : 1 }}>|</span>
                </span>
                <span className="grid size-11 place-items-center text-ink/80"><Icon name="clip" /></span>
                <span className="grid size-11 place-items-center text-ink/80"><Icon name="mic" /></span>
                <span className="grid size-11 place-items-center rounded-full bg-merah text-white"><Icon name="arrow" /></span>
              </div>

              <div
                className="relative z-10 -mt-9 h-[590px] overflow-hidden rounded-[36px] bg-white shadow-[0_40px_80px_-30px_rgba(21,23,27,0.35)]"
                style={{ ...rise(frame, 60, { dur: 70, dist: 90, blur: 0 }) }}
              >
                {SLIDES.map(({ ex, at }, i) => {
                  if (frame < at - 1 || i < active - 1) return null;
                  const wipe = i === 0 ? 1 : prog(frame, at, 60, EXPO_IN_OUT);
                  const zoom = keys(frame, [at, at + 150], [1.2, 1.04]);
                  return (
                    <div key={ex.image} className="absolute inset-0" style={{ clipPath: `inset(0% 0% 0% ${(1 - wipe) * 100}%)`, zIndex: i }}>
                      <Img src={scenes[ex.image]} className="absolute inset-0 size-full object-cover" style={{ transform: `scale(${zoom})` }} />
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_45%,rgba(0,0,0,0.18))]" />
                      <AnswerCard ex={ex} frame={frame} start={(i === 0 ? 120 : at) + 30} className="absolute bottom-[6%] right-[4.5%] w-[44%]" />
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-center gap-3" style={rise(frame, 150, { dist: 12 })}>
                {['‹', 'Ⅱ', '›'].map((c) => (
                  <span key={c} className="grid size-12 place-items-center rounded-full bg-white text-[18px] shadow-[0_10px_24px_-12px_rgba(21,23,27,0.35),0_0_0_1px_rgba(21,23,27,0.06)]">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </BrowserFrame>
      </div>
    </AbsoluteFill>
  );
};
