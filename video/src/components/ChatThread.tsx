import type { Example } from '../../../src/data/content';
import { pop, prog, rise } from '../lib/motion';

/**
 * Question bubble → typing dots → answer streaming in word by word → numbered steps → source chip.
 * `big` switches to the larger type used on the phone in the vertical cut.
 */
export const ChatThread: React.FC<{ frame: number; question: string; ex: Example; askAt?: number; big?: boolean }> = ({
  frame,
  question,
  ex,
  askAt = 60,
  big,
}) => {
  const typingAt = askAt + 20;
  const streamAt = askAt + 58;
  const words = `Oke, ini ringkasan untuk “${ex.title}”:`.split(' ');

  return (
    <div className="space-y-4">
      <div className="flex justify-end" style={rise(frame, askAt, { dist: 14 })}>
        <p className={`rounded-[20px] rounded-br-md bg-ink px-4 py-2.5 text-white ${big ? 'max-w-[85%] text-[15px]' : 'text-[16px]'}`}>{question}</p>
      </div>
      {frame >= typingAt && frame < streamAt && (
        <div className="flex gap-1.5 px-1 py-2">
          {[0, 1, 2].map((d) => (
            <span key={d} className="size-2.5 rounded-full bg-ink/60" style={{ opacity: 0.3 + 0.7 * Math.abs(Math.sin((frame - d * 6) / 9)) }} />
          ))}
        </div>
      )}
      {frame >= streamAt && (
        <div className="max-w-[94%]">
          <p className={`${big ? 'text-[15px]' : 'text-[17px]'} leading-relaxed`}>
            {words.map((w, i) => (
              <span key={i} style={{ opacity: prog(frame, streamAt + i * 2, 10) }}>{w} </span>
            ))}
          </p>
          <ol className="mt-3 space-y-2">
            {ex.steps.map((s, n) => {
              const at = streamAt + words.length * 2 + n * 12;
              return (
                <li key={s} className={`flex gap-2.5 leading-snug ${big ? 'text-[14px]' : 'text-[15px]'}`} style={rise(frame, at, { dist: 12, dur: 30 })}>
                  <span className="grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white" style={{ background: ex.accent, transform: `scale(${pop(frame, at)})` }}>
                    {n + 1}
                  </span>
                  {s}
                </li>
              );
            })}
          </ol>
          <p className={`mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700 ${big ? 'text-[12px]' : 'text-[13px]'}`} style={{ transform: `scale(${pop(frame, streamAt + 60)})` }}>
            ✓ Sumber resmi · {ex.source}
          </p>
        </div>
      )}
    </div>
  );
};
