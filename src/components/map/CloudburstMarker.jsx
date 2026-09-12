import { OverlayView } from '@react-google-maps/api';
import { RISK_COLORS } from '../../data/demoData';

/**
 * Renders the radial-gradient meteorological intensity hotspot from the
 * approved design directly on top of the real Google Map, positioned at
 * a real lat/lng via OverlayView (not a standard Maps pin/marker).
 *
 * size controls the pixel diameter of the glow at the current zoom level —
 * pass a larger size for the primary/critical event, smaller for secondary
 * lower-risk events so the map reads as a composite intensity field.
 */
export default function CloudburstMarker({ position, risk = 'CRITICAL', size = 220, onClick, showCenterDot = true }) {
  const color = RISK_COLORS[risk] || RISK_COLORS.CRITICAL;

  const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
  });

  return (
    <OverlayView position={position} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET} getPixelPositionOffset={getPixelPositionOffset}>
      <div
        className="relative flex items-center justify-center cursor-pointer"
        style={{ width: size, height: size }}
        onClick={onClick}
      >
        {/* outer radial gradient glow — blue/cyan -> yellow -> orange -> red center */}
        <div
          className="absolute inset-0 rounded-full animate-pulse-ring"
          style={{
            background: `radial-gradient(circle,
              #ffffff 0%,
              ${color.hex} 12%,
              #f3922f 34%,
              #f0c93bcc 58%,
              #3fd7e847 80%,
              #3fa3f700 100%)`,
            filter: 'blur(4px)',
          }}
        />
        {/* dashed pulse boundary ring representing affected radius */}
        <div
          className="absolute hotspot-dash-ring"
          style={{ width: size * 0.32, height: size * 0.32 }}
        />
        {showCenterDot && (
          <div className="relative w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]" />
        )}
      </div>
    </OverlayView>
  );
}
