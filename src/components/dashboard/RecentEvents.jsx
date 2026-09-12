import { RISK_COLORS } from '../../data/demoData';

export default function RecentEvents({ title = 'Recent Cloudburst Events', tag = 'LIVE FEED', events = [], onSelect, isLoading = false }) {
  return (
    <div className="rounded-2xl border border-line bg-gradient-to-br from-navy-850 to-navy-900 p-4">
      <div className="flex items-center justify-between mb-3.5">
        <span className="font-display font-semibold text-[13.5px]">{title}</span>
        <span className="text-[10.5px] text-ink-2 font-mono">{tag}</span>
      </div>

      {isLoading && <div className="text-ink-2 text-xs font-mono py-4 text-center">Loading events…</div>}
      {!isLoading && events.length === 0 && (
        <div className="text-ink-2 text-xs font-mono py-4 text-center">No cloudburst events recorded.</div>
      )}

      <div className="flex flex-col gap-2.5">
        {events.map((ev, i) => {
          const c = RISK_COLORS[ev.risk] || RISK_COLORS.LOW;
          return (
            <button
              key={`${ev.area}-${i}`}
              onClick={() => onSelect?.(ev)}
              className="flex items-center gap-2.5 px-2.5 py-2.5 rounded-[10px] bg-navy-800 border border-line hover:border-cyan/35 transition-colors text-left"
            >
              <span className="w-[9px] h-[9px] rounded-full flex-none" style={{ background: c.hex }} />
              <div className="flex-1 min-w-0">
                <div className="text-[12.5px] font-semibold truncate">{ev.area}</div>
                <div className="text-[10.5px] text-ink-2 font-mono mt-0.5">{ev.meta}</div>
              </div>
              <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full font-mono tracking-wide whitespace-nowrap ${c.bg} ${c.text}`}>
                {ev.risk}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
