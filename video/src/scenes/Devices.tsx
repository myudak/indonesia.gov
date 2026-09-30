import { AbsoluteFill, Img, useCurrentFrame } from 'remotion';
import { examples } from '../../../src/data/content';
import { ChatThread } from '../components/ChatThread';
import { Flag } from '../components/Flag';
import { BrowserFrame, PhoneFrame } from '../components/Frames';
import { Icon } from '../components/Icon';
import { MobileHero } from '../components/MobileHero';
import { scenes } from '../lib/assets';
import { useVertical } from '../lib/format';
import { keys, pop, prog } from '../lib/motion';

const QUESTION = 'Cara bayar pajak motor online?';
const samsat = examples.find((e) => e.image === 'samsat')!;
const usaha = examples.find((e) => e.image === 'usaha')!;

const ChatHeader: React.FC = () => (
  <div className="flex items-center justify-between border-b border-line px-6 py-4">
    <div className="flex items-center gap-2.5">
      <Flag className="h-[12px] w-[18px]" />
      <span className="font-serif text-[20px] leading-none">Indonesia.gov</span>
    </div>
    <Icon name="close" className="size-5 text-ink/60" />
  </div>
);

const AskBar: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex h-[60px] items-center gap-2 rounded-full border border-ink/80 bg-white pl-6 pr-2 shadow-[0_18px_50px_-18px_rgba(21,23,27,0.35)] ${className}`}>
    <span className="flex-1 text-[16px] text-ink/50">Tanya apa saja…</span>
    <span className="grid size-10 place-items-center rounded-full bg-merah text-white"><Icon name="arrow" /></span>
  </div>
);

export const Devices: React.FC = () => {
  const frame = useCurrentFrame();
  const vertical = useVertical();
  const panel = pop(frame, 40, { damping: 16, stiffness: 140 });

  if (vertical) {
    // one big phone: mobile hero underneath, chat sheet slides up over it
    const phoneIn = keys(frame, [0, 60], [700, 0]);
    const tilt = keys(frame, [0, 60, 244], [-10, -2, 0]);
    return (
      <AbsoluteFill className="items-center justify-center bg-[linear-gradient(160deg,#f4f3f0_0%,#e9e5de_100%)]">
        <div style={{ transform: `translateY(${phoneIn}px) rotate(${tilt}deg) scale(1.98)` }}>
          <PhoneFrame>
            <MobileHero frame={frame} slides={[{ ex: usaha, at: 0 }]} firstAnswerAt={-60} />
            <div className="absolute inset-0 z-20 bg-black/25" style={{ opacity: panel }} />
            <div
              className="absolute inset-x-0 bottom-0 top-[70px] z-30 flex flex-col overflow-hidden rounded-t-[28px] bg-white"
              style={{ transform: `translateY(${(1 - panel) * 105}%)` }}
            >
              <ChatHeader />
              <div className="flex-1 px-4 py-5">
                <ChatThread frame={frame} question={QUESTION} ex={samsat} big />
              </div>
              <AskBar className="mx-3 mb-6 h-[52px]" />
            </div>
          </PhoneFrame>
        </div>
      </AbsoluteFill>
    );
  }

  const browserIn = keys(frame, [0, 60], [-260, 0]);
  const phoneIn = keys(frame, [20, 85], [900, 0]);
  const phoneTilt = keys(frame, [20, 85, 250], [-14, -5, -3]);

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

          <div
            className="absolute inset-x-[110px] bottom-[96px] overflow-hidden rounded-[28px] bg-white shadow-[0_40px_100px_-30px_rgba(21,23,27,0.45),0_0_0_1px_rgba(21,23,27,0.06)]"
            style={{ opacity: Math.min(1, panel * 1.4), transform: `translateY(${(1 - panel) * 40}px) scale(${0.96 + panel * 0.04})`, transformOrigin: '50% 100%' }}
          >
            <ChatHeader />
            <div className="h-[380px] px-6 py-5">
              <ChatThread frame={frame} question={QUESTION} ex={samsat} />
            </div>
          </div>
          <AskBar className="absolute inset-x-[110px] bottom-6" />
        </BrowserFrame>
      </div>

      {/* phone with the mobile hero */}
      <div className="absolute right-[150px] top-[106px]" style={{ transform: `translateY(${phoneIn}px) rotate(${phoneTilt}deg)` }}>
        <PhoneFrame>
          <MobileHero frame={frame} slides={[{ ex: usaha, at: 0 }]} firstAnswerAt={110} />
        </PhoneFrame>
      </div>
    </AbsoluteFill>
  );
};
