export const Flag: React.FC<{ className?: string }> = ({ className = 'h-[16px] w-[24px]' }) => (
  <span className={`inline-flex flex-col overflow-hidden rounded-[3px] shadow-[0_0_0_0.5px_rgba(0,0,0,0.18)] ${className}`}>
    <span className="flex-1 bg-merah" />
    <span className="flex-1 bg-white" />
  </span>
);
