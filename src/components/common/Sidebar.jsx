import { useState } from 'react';
import {
  Globe2, TrendingUp, Clock3, CloudRain, BellRing, History, Settings,
} from 'lucide-react';

const MONITOR_ITEMS = [
  { id: 'overview', label: 'Overview', icon: Globe2 },
  { id: 'predictions', label: 'Predictions', icon: TrendingUp },
  { id: 'nowcast', label: 'Nowcasting', icon: Clock3 },
  { id: 'weather', label: 'Weather Data', icon: CloudRain },
];

const SYSTEM_ITEMS = [
  { id: 'alerts', label: 'Alerts', icon: BellRing },
  { id: 'history', label: 'Historical', icon: History },
  { id: 'settings', label: 'Settings', icon: Settings },
];

function NavItem({ item, active, onClick }) {
  const Icon = item.icon;
  return (
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); onClick(item.id); }}
      className={`flex items-center gap-3 px-2.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors
        md:flex-row flex-col md:gap-3 gap-1
        ${active
          ? 'bg-cyan/10 text-cyan shadow-[inset_0_0_0_1px_rgba(63,215,232,0.18)]'
          : 'text-ink-1 hover:bg-navy-800 hover:text-ink-0'}`}
    >
      <Icon size={17} className={active ? 'opacity-100' : 'opacity-85'} />
      <span className="md:inline text-[13.5px] md:text-[13.5px] text-[9.5px]">{item.label}</span>
    </a>
  );
}

export default function Sidebar() {
  const [active, setActive] = useState('overview');

  return (
    <aside className="
      md:sticky md:top-0 md:h-screen md:w-[232px] md:flex-col md:border-r md:border-t-0
      fixed bottom-0 left-0 right-0 h-16 w-full border-t border-line z-50
      flex items-center md:items-stretch
      bg-gradient-to-b from-navy-900 to-navy-950 px-3.5 md:px-3.5 py-0 md:py-5 gap-3 md:gap-5.5
    ">
      <div className="hidden md:flex items-center gap-2.5 px-2">
        <div className="relative w-[34px] h-[34px] flex-none rounded-[9px]"
             style={{ background: 'conic-gradient(from 220deg, #3fd7e8, #4fa3f7 40%, #182c48 75%)',
                      boxShadow: '0 0 0 1px rgba(63,215,232,0.25), 0 0 18px rgba(63,215,232,0.25)' }}>
          <div className="absolute inset-[9px] rounded-full bg-navy-950 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
        </div>
        <div>
          <div className="font-display font-bold text-[15.5px] tracking-tight">Tech Yodha</div>
          <div className="text-[10.5px] text-ink-2 font-mono mt-0.5">EARTH INTELLIGENCE</div>
        </div>
      </div>

      <div className="hidden md:block text-[10.5px] text-ink-2 px-2.5 pt-1">MONITOR</div>
      <div className="flex md:flex-col flex-row flex-1 md:flex-none justify-around md:justify-start gap-0.5">
        {MONITOR_ITEMS.map((item) => (
          <NavItem key={item.id} item={item} active={active === item.id} onClick={setActive} />
        ))}
      </div>

      <div className="hidden md:block text-[10.5px] text-ink-2 px-2.5 pt-1">SYSTEM</div>
      <div className="hidden md:flex md:flex-col gap-0.5">
        {SYSTEM_ITEMS.map((item) => (
          <NavItem key={item.id} item={item} active={active === item.id} onClick={setActive} />
        ))}
      </div>

      <div className="hidden md:block mt-auto pt-3 border-t border-line">
        <div className="flex items-center gap-2 text-[11.5px] text-ink-1 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-risk-green shadow-[0_0_6px_#33d17a]" />
          ALL SYSTEMS OPERATIONAL
        </div>
      </div>
    </aside>
  );
}
