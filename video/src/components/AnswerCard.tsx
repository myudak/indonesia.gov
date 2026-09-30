import type { Example } from '../../../src/data/content';
import { rise } from '../lib/motion';
import { Icon, Spark } from './Icon';

/** The hero's "Jawaban singkat" card; each row rises in from `start` */
export const AnswerCard: React.FC<{ ex: Example; frame: number; start: number; className?: string }> = ({
  ex,
  frame,
  start,
  className = '',
}) => (
  <div className={`rounded-[22px] bg-white/95 p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)] ${className}`} style={rise(frame, start, { dist: 24 })}>
    <p className="inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-2.5 py-1 text-[11px] font-semibold text-ink/70" style={rise(frame, start + 4, { dist: 14 })}>
      <Spark className="size-3 text-merah" /> Jawaban singkat
    </p>
    <h3 className="mt-3 text-[17px] font-bold leading-snug" style={rise(frame, start + 8, { dist: 14 })}>
      {ex.title}
    </h3>
    <ol className="mt-3 space-y-2">
      {ex.steps.map((s, n) => (
        <li key={s} className="flex gap-2.5 text-[13px] leading-snug text-ink/75" style={rise(frame, start + 12 + n * 4, { dist: 14 })}>
          <span className="grid size-5 shrink-0 place-items-center rounded-full text-[10px] font-bold text-white" style={{ background: ex.accent }}>
            {n + 1}
          </span>
          {s}
        </li>
      ))}
    </ol>
    <p className="mt-4 flex items-center gap-1.5 border-t border-line pt-3 text-[11px] text-muted" style={rise(frame, start + 26, { dist: 10 })}>
      <Icon name="check" className="size-3.5 text-emerald-600" strokeWidth={2.2} /> Sumber resmi · {ex.source}
    </p>
  </div>
);
