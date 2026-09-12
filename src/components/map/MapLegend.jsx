export default function MapLegend() {
  return (
    <div className="absolute left-3.5 bottom-3.5 z-10 bg-navy-900/85 border border-line rounded-[10px] px-3 py-2.5 backdrop-blur-md min-w-[150px]">
      <div className="text-[10px] text-ink-2 font-mono mb-1.5 tracking-wide">RAIN INTENSITY (mm/hr)</div>
      <div className="legend-gradient-bar mb-1.5" />
      <div className="flex justify-between text-[9px] text-ink-2 font-mono">
        <span>0</span><span>25</span><span>50</span><span>75</span><span>100+</span>
      </div>
    </div>
  );
}
