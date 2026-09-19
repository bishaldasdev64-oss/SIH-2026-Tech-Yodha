export default function MetricCard({ icon, label, value, unit, trend, trendColor = 'text-ink-2', glow = '#4fa3f7', valueColor = 'text-ink-0' }) {
  return (
    <div className="relative overflow-hidden flex flex-col gap-2 rounded-xl border border-line bg-gradient-to-br from-navy-850 to-navy-900 p-4">
      <div
        className="absolute -top-8 -right-5 w-24 h-24 rounded-full opacity-30 blur-2xl pointer-events-none"
        style={{ background: glow }}
      />
      <div className="flex items-center justify-between">
        <span className="text-[11.5px] text-ink-2 font-medium">{label}</span>
        <div className="w-[30px] h-[30px] rounded-lg bg-navy-800 border border-line flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className={`font-display text-[26px] font-bold leading-none flex items-baseline gap-1.5 ${valueColor}`}>
        {value}
        {unit && <span className="text-[12.5px] text-ink-2 font-medium font-body">{unit}</span>}
      </div>
      {trend && <div className={`text-[11px] font-mono ${trendColor}`}>{trend}</div>}
    </div>
  );
}
