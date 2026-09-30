import type { CSSProperties, ReactNode } from 'react';
import { Icon } from './Icon';

/** Desktop browser window with a URL pill; children render at `width × (height - 52)` */
export const BrowserFrame: React.FC<{
  width: number;
  height: number;
  url?: string;
  style?: CSSProperties;
  children: ReactNode;
}> = ({ width, height, url = 'indonesia.gov', style, children }) => (
  <div
    className="overflow-hidden rounded-[22px] bg-white shadow-[0_60px_140px_-40px_rgba(21,23,27,0.45),0_0_0_1px_rgba(21,23,27,0.08)]"
    style={{ width, height, ...style }}
  >
    <div className="flex h-[52px] items-center gap-2 border-b border-line bg-[#f7f6f4] px-5">
      <span className="size-3 rounded-full bg-[#ff5f57]" />
      <span className="size-3 rounded-full bg-[#febc2e]" />
      <span className="size-3 rounded-full bg-[#28c840]" />
      <div className="mx-auto flex w-[420px] items-center justify-center gap-2 rounded-full bg-white py-1.5 text-[14px] font-medium shadow-[0_0_0_1px_rgba(21,23,27,0.06)]">
        <Icon name="lock" className="size-3.5 text-emerald-600" strokeWidth={2.2} />
        {url}
      </div>
      <span className="w-[52px]" />
    </div>
    <div className="relative overflow-hidden" style={{ height: height - 52 }}>
      {children}
    </div>
  </div>
);

/** Phone with dynamic island; children render at 390 × 844 CSS px */
export const PhoneFrame: React.FC<{ style?: CSSProperties; children: ReactNode }> = ({ style, children }) => (
  <div
    className="rounded-[62px] bg-[#101114] p-[12px] shadow-[0_60px_120px_-30px_rgba(21,23,27,0.55),inset_0_0_0_2px_#2a2c31]"
    style={{ width: 414, height: 868, ...style }}
  >
    <div className="relative size-full overflow-hidden rounded-[50px] bg-white">
      {children}
      <span className="absolute left-1/2 top-[11px] h-[34px] w-[118px] -translate-x-1/2 rounded-full bg-black" />
    </div>
  </div>
);
