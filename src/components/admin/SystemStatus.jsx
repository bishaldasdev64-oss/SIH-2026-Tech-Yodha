export default function SystemStatus({ items = [], isLoading = false }) {
  return (
    <div className="rounded-2xl border border-line bg-gradient-to-br from-navy-850 to-navy-900 p-4">
      <div className="flex items-center justify-between mb-3.5">
        <span className="font-display font-semibold text-[13.5px]">System Health</span>
        <span className="text-[10.5px] text-ink-2 font-mono">ALL GREEN</span>
      </div>
      {isLoading && <div className="text-ink-2 text-xs font-mono py-4 text-center">Checking system status…</div>}
      <div className="flex flex-col">
        {items.map((row) => (
          <div key={row.name} className="flex items-center justify-between py-2.5 border-b border-line last:border-none text-[12.5px]">
            <span className="flex-1 text-ink-0">{row.name}</span>
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-risk-green font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-risk-green shadow-[0_0_6px_#33d17a]" />
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
