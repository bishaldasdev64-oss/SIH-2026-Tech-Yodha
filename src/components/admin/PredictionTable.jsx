import { RISK_COLORS } from '../../data/demoData';

export default function PredictionTable({ rows = [], isLoading = false }) {
  return (
    <div className="rounded-2xl border border-line bg-gradient-to-br from-navy-850 to-navy-900 p-4">
      <div className="flex items-center justify-between mb-3.5">
        <span className="font-display font-semibold text-[13.5px]">Recent Cloudburst Predictions</span>
        <span className="text-[10.5px] text-ink-2 font-mono">AUTO-REFRESH · 30S</span>
      </div>

      {isLoading && <div className="text-ink-2 text-xs font-mono py-6 text-center">Loading predictions…</div>}
      {!isLoading && rows.length === 0 && (
        <div className="text-ink-2 text-xs font-mono py-6 text-center">Prediction data unavailable.</div>
      )}

      {!isLoading && rows.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr>
                {['Area', 'Risk', 'Rainfall', 'Confidence', 'Time', 'Status'].map((h) => (
                  <th key={h} className="text-left text-[10px] text-ink-2 font-semibold tracking-wide pb-2 px-2.5 font-mono">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const c = RISK_COLORS[r.risk] || RISK_COLORS.LOW;
                return (
                  <tr key={i} className="hover:bg-cyan/[0.03]">
                    <td className="py-2.5 px-2.5 border-t border-line whitespace-nowrap">{r.area}</td>
                    <td className="py-2.5 px-2.5 border-t border-line">
                      <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full font-mono tracking-wide ${c.bg} ${c.text}`}>{r.risk}</span>
                    </td>
                    <td className="py-2.5 px-2.5 border-t border-line">{r.rainfall}</td>
                    <td className="py-2.5 px-2.5 border-t border-line">{r.confidence}</td>
                    <td className="py-2.5 px-2.5 border-t border-line font-mono">{r.time}</td>
                    <td className="py-2.5 px-2.5 border-t border-line">{r.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
