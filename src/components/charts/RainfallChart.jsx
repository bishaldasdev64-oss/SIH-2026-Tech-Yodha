import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function ChartTooltip({ active, payload, label, unit }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-navy-850 border border-line rounded-md px-2.5 py-1.5 text-[11px] font-mono">
      <div className="text-ink-2">{label}</div>
      <div className="text-ink-0 font-semibold">{payload[0].value}{unit}</div>
    </div>
  );
}

/**
 * <RainfallChart data={rainfallData} /> — data-driven gradient area chart.
 * Replaces the static rainfall graph image with a real, responsive React
 * chart. Pass any [{ time, value }] series (e.g. from predictionApi).
 */
export default function RainfallChart({ data = [], color = '#4fa3f7', unit = ' mm/hr', height = 150, isLoading = false, isEmpty = false }) {
  if (isLoading) {
    return <div className="h-[150px] flex items-center justify-center text-ink-2 text-xs font-mono">Loading rainfall data…</div>;
  }
  if (isEmpty || data.length === 0) {
    return <div className="h-[150px] flex items-center justify-center text-ink-2 text-xs font-mono">No rainfall data available.</div>;
  }

  const gradientId = `rainfallGradient-${color.replace('#', '')}`;

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 6, right: 4, bottom: 0, left: -18 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#12203a" vertical={false} />
          <XAxis dataKey="time" tick={{ fill: '#7186ab', fontSize: 10 }} axisLine={{ stroke: '#1c2c47' }} tickLine={false} />
          <YAxis tick={{ fill: '#7186ab', fontSize: 10 }} axisLine={false} tickLine={false} width={28} />
          <Tooltip content={<ChartTooltip unit={unit} />} />
          <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fill={`url(#${gradientId})`} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
