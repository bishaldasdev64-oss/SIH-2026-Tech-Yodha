import { AlertTriangle } from 'lucide-react';

export default function AlertBanner({ event, onViewMap, onViewDetails }) {
  if (!event) return null;

  return (
    <div className="flex items-center gap-3.5 px-4 py-3.5 rounded-2xl border border-risk-red/35"
         style={{ background: 'linear-gradient(90deg, rgba(241,78,78,0.14), rgba(241,78,78,0.03))' }}>
      <div className="w-[38px] h-[38px] rounded-[10px] bg-risk-red/15 border border-risk-red/40 flex items-center justify-center flex-none">
        <AlertTriangle size={19} className="text-risk-red" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-display font-bold text-[13.5px]" style={{ color: '#ffdcdc' }}>
          SEVERE CLOUDBURST RISK — {event.area}, {event.district}
        </div>
        <div className="text-[11.5px] text-ink-1 mt-0.5">
          {event.rainfall} mm/hr expected by {event.predictionTime} · {event.affectedRadiusKm} km affected radius · {event.confidence}% confidence · Recommended: issue local advisory
        </div>
      </div>
      <div className="flex gap-2 flex-none">
        <button onClick={onViewMap} className="px-3.5 py-2 rounded-lg text-[12px] font-semibold border border-line bg-navy-800 text-ink-1">
          View on Map
        </button>
        <button onClick={onViewDetails} className="px-3.5 py-2 rounded-lg text-[12px] font-semibold bg-gradient-to-br from-sky to-cyan text-navy-950">
          View Details
        </button>
      </div>
    </div>
  );
}
