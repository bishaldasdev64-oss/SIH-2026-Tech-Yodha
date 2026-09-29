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
        {/* Soft background aura/glow matching the weather event area */}
        <div
          className="absolute inset-0 rounded-full animate-pulse-ring pointer-events-none"
          style={{
            background: `radial-gradient(circle,
              #ef444455 0%,
              #f9731633 40%,
              #eab30811 70%,
              transparent 100%)`,
            filter: 'blur(6px)',
          }}
        />

        {/* Storm Cloud Marker with red/yellow gradient, lightning bolt, and rain (reduced size) */}
        {showCenterDot && (
          <div className="relative w-full h-full flex items-center justify-center animate-pulse">
            <svg
              viewBox="0 0 120 100"
              className="w-2/5 h-2/5 drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]"
            >
              <defs>
                {/* Fiery red-orange-yellow cloud gradient */}
                <linearGradient id="stormCloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" /> {/* Red top */}
                  <stop offset="50%" stopColor="#f97316" /> {/* Orange center */}
                  <stop offset="100%" stopColor="#eab308" /> {/* Yellow bottom */}
                </linearGradient>

                {/* Glow filter for lightning bolt */}
                <filter id="boltGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Realistic fluffy storm cloud shape */}
              <path
                d="M 92 55 
                   C 105 55, 115 45, 112 32 
                   C 109 20, 96 12, 84 16 
                   C 78 6, 62 2, 52 14 
                   C 44 6, 28 8, 22 20 
                   C 10 22, 2 34, 6 46 
                   C 2 54, 10 64, 22 64 
                   L 92 64 
                   C 102 64, 110 58, 92 55 Z"
                fill="url(#stormCloudGrad)"
                stroke="#fef08a"
                strokeWidth="1.5"
                strokeOpacity="0.8"
              />

              {/* Rain drops falling underneath */}
              <g stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" opacity="0.9">
                <line x1="35" y1="72" x2="31" y2="86" />
                <line x1="48" y1="75" x2="44" y2="89" />
                <line x1="61" y1="72" x2="57" y2="86" />
                <line x1="74" y1="75" x2="70" y2="89" />
                <line x1="87" y1="72" x2="83" y2="86" />
              </g>

              {/* Bright Yellow Lightning / Thunder Bolt */}
              <polygon
                points="62,26 40,54 55,54 46,82 80,46 62,46"
                fill="#fef08a"
                stroke="#eab308"
                strokeWidth="1.5"
                filter="url(#boltGlow)"
              />
            </svg>
          </div>
        )}
      </div>
    </OverlayView>
  );
}