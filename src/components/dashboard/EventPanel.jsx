import { RISK_COLORS } from '../../data/demoData';

function Row({ k, v, valueClass = '' }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-dashed border-line last:border-none">
      <span className="text-[11.5px] text-ink-2">{k}</span>
      <span className={`text-[12.5px] font-semibold font-mono ${valueClass}`}>{v}</span>
    </div>
  );
}

export default function EventPanel({ event, isLoading = false, onViewDetails, onViewNowcast }) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-line bg-gradient-to-br from-navy-850 to-navy-900 p-6 flex items-center justify-center text-ink-2 text-sm font-mono">
        Loading prediction data…
      </div>
    );
  }

  if (!event) {
    return (
      <div className="rounded-2xl border border-line bg-gradient-to-br from-navy-850 to-navy-900 p-6 flex items-center justify-center text-ink-2 text-sm font-mono">
        No cloudburst detected in this region.
      </div>
    );
  }

  const riskColor = RISK_COLORS[event.risk] || RISK_COLORS.CRITICAL;

  return (
    <div className="rounded-2xl border border-line bg-gradient-to-br from-navy-850 to-navy-900 flex flex-col overflow-hidden">
      <div className="px-4 pt-3.5 pb-3 border-b border-line">
        <span className={`inline-block text-[10px] font-bold tracking-wide px-2.5 py-0.5 rounded-full font-mono ${riskColor.bg} ${riskColor.text} border ${riskColor.border}`}>
          {event.status || 'EVENT DETECTED'}
        </span>
        <div className="font-display font-semibold text-[14px] mt-2">Cloudburst — {event.area}</div>
        <div className="text-[11.5px] text-ink-2 mt-0.5">Predicted · updated 40s ago</div>
      </div>
      <div className="px-4 py-3 flex-1">
        <Row k="District" v={event.district} />
        <Row k="State" v={event.state} />
        <Row k="Risk Level" v={event.risk} valueClass={riskColor.text} />
        <Row k="Predicted Rainfall" v={`${event.rainfall} mm/hr`} />
        <Row k="Expected Duration" v={event.duration} />
        <Row k="Affected Radius" v={`${event.affectedRadiusKm} km`} />
        <Row k="Prediction Confidence" v={`${event.confidence}%`} />
        <Row k="Cloud Temperature" v={`${event.cloudTemp} °C`} />
        <Row k="Humidity" v={`${event.humidity}%`} />
        <Row k="Pressure" v={`${event.pressure} hPa`} />
        <Row k="Prediction Time" v={event.predictionTime} />
      </div>
      <div className="flex gap-2 px-4 py-3 border-t border-line">
        <button onClick={onViewDetails} className="flex-1 text-center py-2 rounded-lg text-[12px] font-semibold border border-line bg-navy-800 text-ink-1">
          Full Details
        </button>
        <button onClick={onViewNowcast} className="flex-1 text-center py-2 rounded-lg text-[12px] font-semibold bg-gradient-to-br from-sky to-cyan text-navy-950">
          View Nowcast
        </button>
      </div>
    </div>
  );
}
