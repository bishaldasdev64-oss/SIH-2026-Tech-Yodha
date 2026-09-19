import { useEffect, useState } from 'react';
import { Gauge, CloudRain, TriangleAlert, MapPinned } from 'lucide-react';
import MetricCard from '../components/common/MetricCard';
import CloudburstMap from '../components/map/CloudburstMap';
import RecentEvents from '../components/dashboard/RecentEvents';
import PredictionChart from '../components/charts/PredictionChart';
import PredictionTable from '../components/admin/PredictionTable';
import SystemStatus from '../components/admin/SystemStatus';
import DataPipeline from '../components/admin/DataPipeline';

import { getActiveEvents, getNowcastSeries, getAdminPredictionTable } from '../services/predictionApi';
import { getSystemHealth } from '../services/alertApi';
import { demoAdminMetrics, demoActiveAdminEvents } from '../data/demoData';

export default function AdminDashboard() {
  const [metrics] = useState(demoAdminMetrics); // swap for a real /api/admin/overview call when ready
  const [activeEvents, setActiveEvents] = useState([]);
  const [nowcastSeries, setNowcastSeries] = useState([]);
  const [predictionRows, setPredictionRows] = useState([]);
  const [systemStatus, setSystemStatus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [active, nowcast, table, health] = await Promise.all([
        getActiveEvents(),
        getNowcastSeries(),
        getAdminPredictionTable(),
        getSystemHealth(),
      ]);
      if (cancelled) return;
      setActiveEvents(active);
      setNowcastSeries(nowcast);
      setPredictionRows(table);
      setSystemStatus(health);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="flex flex-col gap-4.5">
      {/* METRIC STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard
          icon={<Gauge size={15} className="text-cyan" />}
          label="Prediction Accuracy"
          value={metrics.accuracy.value}
          unit={metrics.accuracy.unit}
          trend={`↑ ${metrics.accuracy.trend}`}
          trendColor="text-risk-green"
          glow="#3fd7e8"
        />
        <MetricCard
          icon={<CloudRain size={15} className="text-risk-orange" />}
          label="Cloudburst Predictions"
          value={metrics.predictions.value}
          unit="active"
          trend={`${metrics.predictions.critical} critical`}
          trendColor="text-risk-orange"
          glow="#f3922f"
        />
        <MetricCard
          icon={<TriangleAlert size={15} className="text-risk-red" />}
          label="Active Critical Alerts"
          value={metrics.activeAlerts.value}
          valueColor="text-risk-red"
          trend="Requires review"
          trendColor="text-risk-red"
          glow="#f14e4e"
        />
        <MetricCard
          icon={<MapPinned size={15} className="text-sky" />}
          label="Monitored Areas"
          value={metrics.monitoredAreas.value}
          trend="Stable coverage"
          glow="#4fa3f7"
        />
      </div>

      {/* LIVE MAP + ACTIVE EVENTS */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_1fr] gap-4 items-start">
        <CloudburstMap
          height={340}
          center={{ lat: 25.8, lng: 93.5 }}
          zoom={6}
          primaryEvent={activeEvents.find((e) => e.risk === 'CRITICAL') || null}
          secondaryEvents={activeEvents.filter((e) => e.risk !== 'CRITICAL')}
          regionLabel="Live Cloudburst Monitoring — India / NE Region"
          compact
        />
        <RecentEvents
          title="Active Cloudburst Events"
          tag="3 CRITICAL"
          events={demoActiveAdminEvents}
          isLoading={loading}
        />
      </div>

      <PredictionTable rows={predictionRows} isLoading={loading} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-line bg-gradient-to-br from-navy-850 to-navy-900 p-4">
          <div className="flex items-center justify-between mb-3.5">
            <span className="font-display font-semibold text-[13.5px]">Nowcasting — Next 0–6H</span>
            <span className="text-[10.5px] text-ink-2 font-mono">SYSTEM WIDE</span>
          </div>
          <PredictionChart data={nowcastSeries} isLoading={loading} color="#3fd7e8" />
        </div>
        <SystemStatus items={systemStatus} isLoading={loading} />
      </div>

      <DataPipeline />

      <footer className="text-[10.5px] text-ink-2 text-center pt-1.5 font-mono">
        Admin console · connect /api/admin/predictions, /api/admin/system-health, /api/admin/alerts
      </footer>
    </div>
  );
}
