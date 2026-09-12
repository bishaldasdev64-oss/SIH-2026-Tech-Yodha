import CloudburstMarker from './CloudburstMarker';

const SIZE_BY_RISK = {
  CRITICAL: 220,
  HIGH: 150,
  MODERATE: 110,
  LOW: 70,
};

/**
 * Composite meteorological intensity field: one primary event (full detail,
 * clickable -> opens EventPanel) plus any number of secondary/lower-risk
 * events rendered smaller, matching the multi-hotspot reference design.
 */
export default function RiskHeatmap({ primaryEvent, secondaryEvents = [], onPrimaryClick }) {
  return (
    <>
      {primaryEvent && (
        <CloudburstMarker
          position={primaryEvent.center}
          risk={primaryEvent.risk}
          size={SIZE_BY_RISK[primaryEvent.risk] || 220}
          onClick={onPrimaryClick}
        />
      )}
      {secondaryEvents.map((ev) => (
        <CloudburstMarker
          key={ev.area}
          position={ev.center}
          risk={ev.risk}
          size={SIZE_BY_RISK[ev.risk] || 90}
          showCenterDot={ev.risk !== 'LOW'}
        />
      ))}
    </>
  );
}
