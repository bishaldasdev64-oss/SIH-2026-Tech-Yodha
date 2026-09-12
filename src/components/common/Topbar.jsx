import { useEffect, useState } from 'react';
import { Search, BellRing } from 'lucide-react';

export default function Topbar({ view, onViewChange }) {
  const [secs, setSecs] = useState(4);

  useEffect(() => {
    const t = setInterval(() => {
      setSecs((s) => (s > 30 ? 0 : s + 1));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const syncLabel = secs === 0 ? 'just now' : `${secs}s ago`;
  const title = view === 'user' ? 'Live Weather Intelligence' : 'Cloudblast Admin Control Center';

  return (
    <div className="h-[60px] border-b border-line flex items-center justify-between px-5.5 sticky top-0 z-30 bg-navy-900/85 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div>
          <div className="font-display font-semibold text-[15.5px]">{title}</div>
          <div className="text-[11px] text-ink-2 font-mono">Last sync <span>{syncLabel}</span></div>
        </div>
        <div className="flex bg-navy-850 border border-line rounded-[9px] p-[3px] gap-0.5">
          {['user', 'admin'].map((v) => (
            <button
              key={v}
              onClick={() => onViewChange(v)}
              className={`text-[12.5px] font-semibold px-3.5 py-1.5 rounded-[7px] capitalize transition-colors
                ${view === v ? 'bg-navy-700 text-ink-0' : 'text-ink-2'}`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3.5">
        <div className="hidden md:flex items-center gap-2 bg-navy-850 border border-line rounded-lg px-3 py-1.5 w-[220px] text-ink-2">
          <Search size={14} />
          <input
            type="text"
            placeholder="Search location, district, state…"
            className="bg-transparent border-none outline-none text-[12.5px] text-ink-0 w-full placeholder:text-ink-2"
          />
        </div>
        <button className="relative w-[34px] h-[34px] rounded-lg border border-line bg-navy-850 flex items-center justify-center text-ink-1">
          <BellRing size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-risk-red shadow-[0_0_6px_#f14e4e]" />
        </button>
        <div className="w-[34px] h-[34px] rounded-lg bg-gradient-to-br from-sky to-cyan flex items-center justify-center font-display font-bold text-[13px] text-navy-950">
          TY
        </div>
      </div>
    </div>
  );
}
