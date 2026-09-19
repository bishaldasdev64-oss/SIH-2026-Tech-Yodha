import { useEffect, useState } from 'react';
import { CloudRain, Thermometer, Droplets, TriangleAlert } from 'lucide-react';
import MetricCard from '../components/common/MetricCard';
import CloudburstMap from '../components/map/CloudburstMap';
import EventPanel from '../components/dashboard/EventPanel';
import AlertBanner from '../components/dashboard/AlertBanner';
import RainfallChart from '../components/charts/RainfallChart';
import PredictionChart from '../components/charts/PredictionChart';
import NowcastTimeline from '../components/dashboard/NowcastTimeline';
import RecentEvents from '../components/dashboard/RecentEvents';

import { getCurrentWeather } from '../services/weatherApi';
import {
  getPrimaryCloudburstEvent, getActiveEvents, getRainfallSeries, getNowcastSeries,
} from '../services/predictionApi';
import { demoRecentEvents } from '../data/demoData';

export default function UserDashboard() {
  const [weather, setWeather] = useState(null);
  const [primaryEvent, setPrimaryEvent] = useState(null);
  const [secondaryEvents, setSecondaryEvents] = useState([]);
  const [rainfallSeries, setRainfallSeries] = useState([]);
  const [nowcastSeries, setNowcastSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [w, primary, secondary, rain, nowcast] = await Promise.all([
        getCurrentWeather(),
        getPrimaryCloudburstEvent(),
        getActiveEvents(),
        getRainfallSeries(),
        getNowcastSeries(),
      ]);
      if (cancelled) return;
      setWeather(w);
      setPrimaryEvent(primary);
      setSecondaryEvents(secondary);
      setRainfallSeries(rain);
      setNowcastSeries(nowcast);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="flex flex-col gap-4.5">
      {/* METRIC STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard
          icon={<CloudRain size={15} className="text-sky" />}
          label="Rainfall Intensity"
          value={weather?.rainfall?.value ?? '—'}
          unit={weather?.rainfall?.unit}
          trend={`↑ ${weather?.rainfall?.label ?? ''}`}
          trendColor="text-risk-orange"
          glow="#4fa3f7"
        />
        <MetricCard
          icon={<Thermometer size={15} className="text-risk-orange" />}
          label="Cloud Temperature"
          value={weather?.cloudTemp?.value ?? '—'}
          unit={weather?.cloudTemp?.unit}
          trend={weather?.cloudTemp?.label}
          glow="#f3922f"
        />
        <MetricCard
          icon={<Droplets size={15} className="text-cyan" />}
          label="Humidity / Moisture"
          value={weather?.humidity?.value ?? '—'}
          unit={weather?.humidity?.unit}
          trend={weather?.humidity?.label}
          trendColor="text-risk-green"
          glow="#3fd7e8"
        />
        <MetricCard
          icon={<TriangleAlert size={15} className="text-risk-red" />}
          label="Cloudburst Risk"
          value={weather?.risk?.value ?? '—'}
          valueColor="text-risk-red"
          trend={weather?.risk ? `${weather.risk.confidence}% prediction confidence` : ''}
          trendColor="text-risk-red"
          glow="#f14e4e"
        />
      </div>

      {/* HERO MAP + EVENT PANEL */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-4 items-start">
        <CloudburstMap
          height={560}
          center={primaryEvent?.center || { lat: 23.936, lng: 91.851 }}
          zoom={8}
          primaryEvent={primaryEvent}
          secondaryEvents={secondaryEvents}
          onHotspotClick={() => document.getElementById('event-panel')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}
          regionLabel="Northeast India — Sentinel & Doppler Composite"
        />
        <div id="event-panel">
          <EventPanel event={primaryEvent} isLoading={loading} />
        </div>
      </div>

      {/* ALERT */}
      <AlertBanner event={primaryEvent} />

      {/* LOWER GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-line bg-gradient-to-br from-navy-850 to-navy-900 p-4 lg:col-span-1">
          <div className="flex items-center justify-between mb-3.5">
            <span className="font-display font-semibold text-[13.5px]">Rainfall Intensity</span>
            <span className="text-[10.5px] text-ink-2 font-mono">NOW → +6H</span>
          </div>
          <RainfallChart data={rainfallSeries} isLoading={loading} />
        </div>

        <div className="rounded-2xl border border-line bg-gradient-to-br from-navy-850 to-navy-900 p-4 lg:col-span-1">
          <div className="flex items-center justify-between mb-3.5">
            <span className="font-display font-semibold text-[13.5px]">Nowcast — Cloudburst Probability</span>
            <span className="text-[10.5px] text-ink-2 font-mono">0–6H</span>
          </div>
          <PredictionChart data={nowcastSeries} isLoading={loading} />
          <NowcastTimeline />
        </div>

        <RecentEvents events={demoRecentEvents} isLoading={false} />
      </div>

      <footer className="text-[10.5px] text-ink-2 text-center pt-1.5 font-mono">
        Live data via FastAPI · connect /api/weather, /api/predictions for real values
      </footer>
    </div>
  );
}
