import { useCallback, useRef, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Radio } from 'lucide-react';
import RiskHeatmap from './RiskHeatmap';
import MapControls from './MapControls';
import MapLegend from './MapLegend';

// Dark "earth observation / met-ops" map theme, styled to match the
// approved navy dashboard aesthetic instead of default Google Maps colors.
const MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#0c1930' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#050912' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#7186ab' }] },
  { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#1c3050' }] },
  { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [{ color: '#233c5e' }] },
  { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#0c1930' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#111f36' }] },
  { featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#050912' }] },
];

const MAP_OPTIONS = {
  styles: MAP_STYLE,
  disableDefaultUI: true,
  zoomControl: false,
  gestureHandling: 'greedy',
  backgroundColor: '#050912',
};

/**
 * Real interactive Google Map replacing the static SVG illustration from
 * the approved HTML/CSS reference. Same header, region tag, controls,
 * legend and layer toggle placement — only the map surface itself is now
 * a live Google Maps instance with real zoom/pan and a real lat/lng
 * cloudburst hotspot overlay.
 */
export default function CloudburstMap({
  height = 560,
  center,
  zoom = 8,
  primaryEvent,
  secondaryEvents = [],
  onHotspotClick,
  regionLabel,
  compact = false,
}) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'cloudblast-google-map',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const mapRef = useRef(null);
  const [activeLayer, setActiveLayer] = useState('Rainfall');

  const onLoad = useCallback((map) => { mapRef.current = map; }, []);
  const onUnmount = useCallback(() => { mapRef.current = null; }, []);

  const zoomIn = () => mapRef.current?.setZoom((mapRef.current.getZoom() || zoom) + 1);
  const zoomOut = () => mapRef.current?.setZoom((mapRef.current.getZoom() || zoom) - 1);
  const resetView = () => {
    if (!mapRef.current) return;
    mapRef.current.panTo(center);
    mapRef.current.setZoom(zoom);
  };
  const goFullscreen = () => {
    const el = mapRef.current?.getDiv();
    if (el?.requestFullscreen) el.requestFullscreen();
  };

  return (
    <div className={`relative rounded-2xl border border-line bg-navy-900 overflow-hidden`} style={{ height }}>
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3.5 bg-gradient-to-b from-navy-950/75 to-transparent">
        <div className="flex items-center gap-2.5 font-display font-semibold text-[13.5px]">
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-risk-red bg-risk-red/10 border border-risk-red/35 px-2 py-0.5 rounded-full tracking-wide">
            <Radio size={10} className="animate-pulse" /> LIVE
          </span>
          {regionLabel || 'Northeast India — Composite'}
        </div>
        {!compact && (
          <div className="flex gap-1.5">
            {['Rainfall', 'Cloud Temp', 'Risk Zones'].map((layer) => (
              <button
                key={layer}
                onClick={() => setActiveLayer(layer)}
                className={`text-[10.5px] px-2.5 py-1 rounded-md border font-medium transition-colors
                  ${activeLayer === layer
                    ? 'text-cyan border-cyan/40 bg-cyan/10'
                    : 'text-ink-1 border-line bg-navy-900/80'}`}
              >
                {layer}
              </button>
            ))}
          </div>
        )}
      </div>

      {loadError && (
        <div className="absolute inset-0 flex items-center justify-center text-ink-2 text-sm px-6 text-center">
          Unable to load Google Maps. Check VITE_GOOGLE_MAPS_API_KEY and enabled APIs.
        </div>
      )}

      {!isLoaded && !loadError && (
        <div className="absolute inset-0 flex items-center justify-center text-ink-2 text-sm font-mono">
          Loading satellite &amp; map data…
        </div>
      )}

      {isLoaded && (
        <GoogleMap
          mapContainerClassName="gmap-container"
          center={center}
          zoom={zoom}
          options={MAP_OPTIONS}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <RiskHeatmap
            primaryEvent={primaryEvent}
            secondaryEvents={secondaryEvents}
            onPrimaryClick={onHotspotClick}
          />
        </GoogleMap>
      )}

      {!compact && (
        <>
          <MapControls onZoomIn={zoomIn} onZoomOut={zoomOut} onReset={resetView} onFullscreen={goFullscreen} />
          <MapLegend />
        </>
      )}
    </div>
  );
}
