// Same icon paths as src/components/Icon.astro and the roadmap icons on the site
const paths = {
  clip: 'M16.5 6.5 8.6 14.4a2 2 0 0 0 2.8 2.8l7.4-7.4a4 4 0 0 0-5.6-5.6L5.7 11.7a6 6 0 0 0 8.5 8.5l6.3-6.3',
  mic: 'M9 6a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0zM5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  lock: 'M7.5 10.5h9a2.5 2.5 0 0 1 2.5 2.5v5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 18v-5a2.5 2.5 0 0 1 2.5-2.5M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5',
  pin: 'M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11ZM12 7.7a2.3 2.3 0 1 0 0 4.6 2.3 2.3 0 0 0 0-4.6',
  money: 'M5 6.5h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2M12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5',
  home: 'M4 11 12 4.5 20 11v8.5H4ZM10 19.5v-5h4v5',
  chev: 'm7 14 5-5 5 5',
  down: 'm7 10 5 5 5-5',
  search: 'M11 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12M20 20l-4.5-4.5',
  expand: 'M14 4h6v6M10 20H4v-6M20 4l-6.5 6.5M4 20l6.5-6.5',
  shield: 'M12 3.5 19 6.5v5c0 4.3-2.9 7.6-7 9.5-4.1-1.9-7-5.2-7-9.5v-5z',
  close: 'M6 6l12 12M18 6 6 18',
};

export type IconName = keyof typeof paths;

export const Icon: React.FC<{ name: IconName; className?: string; strokeWidth?: number }> = ({
  name,
  className = 'size-[18px]',
  strokeWidth = 1.9,
}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d={paths[name]} />
  </svg>
);

export const Spark: React.FC<{ className?: string }> = ({ className = 'size-3' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3.5c.6 4.6 3.9 7.9 8.5 8.5-4.6.6-7.9 3.9-8.5 8.5-.6-4.6-3.9-7.9-8.5-8.5 4.6-.6 7.9-3.9 8.5-8.5Z" />
  </svg>
);
