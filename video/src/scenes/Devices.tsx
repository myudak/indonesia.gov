import { AbsoluteFill, Img, useCurrentFrame } from 'remotion';
import { examples } from '../../../src/data/content';
import { AnswerCard } from '../components/AnswerCard';
import { Flag } from '../components/Flag';
import { BrowserFrame, PhoneFrame } from '../components/Frames';
import { Icon } from '../components/Icon';
import { scenes } from '../lib/assets';
import { keys, pop, prog, rise } from '../lib/motion';

const QUESTION = 'Cara bayar pajak motor online?';
const samsat = examples.find((e) => e.image === 'samsat')!;
const usaha = examples.find((e) => e.image === 'usaha')!;

export const Devices: React.FC = () => {
  const frame = useCurrentFrame();

  const browserIn = keys(frame, [0, 60], [-260, 0]);
  const phoneIn = keys(frame, [20, 85], [900, 0]);
  const phoneTilt = keys(frame, [20, 85, 250], [-14, -5, -3]);
  const panel = pop(frame, 40, { damping: 16, stiffness: 140 });

  const answerWords = `Oke, ini ringkasan untuk “${samsat.title}”:`.split(' ');
  const streamStart = 118;

  return (
    <AbsoluteFill className="bg-[linear-gradient(135deg,#f4f3f0_0%,#ece8e2_100%)]">
      {/* desktop with the chat panel open */}
      <div className="absolute left-[90px] top-[130px]" style={{ transform: `translateX(${browserIn}px)`, opacity: prog(frame, 0, 30) }}>
        <BrowserFrame width={1180} height={800}>
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,#ffffff_0%,#f4f3f0_60%)] px-10 pt-7">
            <div className="flex items-center gap-2.5">
              <Flag className="h-[14px] w-[21px]" />
              <span className="font-serif text-[22px] leading-none">Indonesia.gov</span>
            </div>
            <p className="mt-14 text-center font-serif text-[96px] leading-none tracking-[-0.02em] text-ink/90">Halo, Indonesia</p>
            <div className="mx-auto mt-10 h-[420px] w-[640px] overflow-hidden rounded-[30px] opacity-60">
              <Img src={scenes.samsat} className="size-full object-cover" />
            </div>
          </div>
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[3px]" style={{ opacity: panel }} />

          {/* chat panel */}
          <div
            className="absolute inset-x-[110px] bottom-[96px] overflow-hidden rounded-[28px] bg-white shadow-[0_40px_100px_-30px_rgba(21,23,27,0.45),0_0_0_1px_rgba(21,23,27,0.06)]"
            style={{ opacity: Math.min(1, panel * 1.4), transform: `translateY(${(1 - panel) * 40}px) scale(${0.96 + panel * 0.04})`, transformOrigin: '50% 100%' }}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <div className="flex items-center gap-2.5">
                <Flag className="h-[12px] w-[18px]" />
                <span className="font-serif text-[20px] leading-none">Indonesia.gov</span>
                <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">Demo UI · jawaban contoh</span>
              </div>
              <Icon name="close" className="size-5 text-ink/60" />
            </div>
            <div className="h-[380px] space-y-4 px-6 py-5">
              <div className="flex justify-end" style={rise(frame, 60, { dist: 14 })}>
                <p className="rounded-[20px] rounded-br-md bg-ink px-4 py-2.5 text-[16px] text-white">{QUESTION}</p>
              </div>
              {frame >= 80 && frame < streamStart && (
                <div className="flex gap-1.5 px-1 py-2">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="size-2.5 rounded-full bg-ink/60" style={{ opacity: 0.3 + 0.7 * Math.abs(Math.sin((frame - d * 6) / 9)) }} />
                  ))}
                </div>
              )}
              {frame >= streamStart && (
                <div className="max-w-[92%]">
                  <p className="text-[17px] leading-relaxed">
                    {answerWords.map((w, i) => (
                      <span key={i} style={{ opacity: prog(frame, streamStart + i * 2, 10) }}>{w} </span>
                    ))}
                  </p>
                  <ol className="mt-3 space-y-2">
                    {samsat.steps.map((s, n) => {
                      const at = streamStart + answerWords.length * 2 + n * 12;
                      return (
                        <li key={s} className="flex gap-2.5 text-[15px] leading-snug" style={rise(frame, at, { dist: 12, dur: 30 })}>
                          <span className="grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white" style={{ background: samsat.accent, transform: `scale(${pop(frame, at)})` }}>
                            {n + 1}
                          </span>
                          {s}
                        </li>
                      );
                    })}
                  </ol>
                  <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[13px] font-medium text-emerald-700" style={{ transform: `scale(${pop(frame, streamStart + 60)})` }}>
                    ✓ Sumber resmi · {samsat.source}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ask bar */}
          <div className="absolute inset-x-[110px] bottom-6 flex h-[60px] items-center gap-2 rounded-full border border-ink/80 bg-white pl-6 pr-2 shadow-[0_18px_50px_-18px_rgba(21,23,27,0.35)]">
            <span className="flex-1 text-[16px] text-ink/50">Tanya apa saja…</span>
            <span className="grid size-10 place-items-center rounded-full bg-merah text-white"><Icon name="arrow" /></span>
          </div>
        </BrowserFrame>
      </div>

      {/* phone with the mobile hero */}
      <div className="absolute right-[150px] top-[106px]" style={{ transform: `translateY(${phoneIn}px) rotate(${phoneTilt}deg)` }}>
        <PhoneFrame>
          <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_0%,#ffffff_0%,#f4f3f0_60%)] px-4 pt-[62px]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Flag className="h-[13px] w-[20px]" />
                <span className="font-serif text-[20px] leading-none">Indonesia.gov</span>
              </span>
              <span className="rounded-full bg-ink px-3.5 py-1.5 text-[12px] font-semibold text-white">Menu</span>
            </div>
            <p className="mt-9 text-center font-serif text-[54px] leading-[0.95] tracking-[-0.02em]">Halo, Indonesia</p>
            <p className="mx-auto mt-3 max-w-[30ch] text-center text-[14px] text-muted">Apa pun yang kamu butuhkan dari pemerintah, mulai di sini.</p>
            <div className="relative z-10 mt-6 flex h-14 items-center gap-2 rounded-full border border-ink/80 bg-white pl-5 pr-1.5">
              <span className="flex-1 truncate text-[14px] text-ink/55">Coba ‘{usaha.question}’</span>
              <span className="grid size-9 place-items-center rounded-full bg-merah text-white"><Icon name="arrow" className="size-4" /></span>
            </div>
            <div className="relative -mt-7 h-[470px] overflow-hidden rounded-[26px]">
              <Img src={scenes.usaha} className="absolute inset-0 size-full object-cover" style={{ objectPosition: '28% 50%', transform: `scale(${keys(frame, [40, 250], [1.2, 1.04])})` }} />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.28))]" />
              <div className="absolute inset-x-3 bottom-3 origin-bottom scale-[0.92]">
                <AnswerCard ex={usaha} frame={frame} start={110} />
              </div>
            </div>
          </div>
        </PhoneFrame>
      </div>
    </AbsoluteFill>
  );
};
