import { AbsoluteFill } from 'remotion';

/** 1200×630 social preview card (same idea as america.gov's: flag + wordmark on white) */
export const OgImage: React.FC = () => (
  <AbsoluteFill className="items-center justify-center bg-white">
    <div className="flex items-center gap-7">
      <span className="flex h-[62px] w-[93px] flex-col overflow-hidden rounded-[6px] shadow-[0_0_0_1.5px_rgba(0,0,0,0.12)]">
        <span className="flex-1 bg-merah" />
        <span className="flex-1 bg-white" />
      </span>
      <span className="font-serif text-[118px] leading-none tracking-[-0.02em] text-ink">Indonesia.gov</span>
    </div>
  </AbsoluteFill>
);
