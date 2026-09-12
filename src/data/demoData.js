/**
 * DEMO / MOCK DATA ONLY.
 *
 * Everything in this file exists so the UI can render before real
 * FastAPI endpoints are connected. Nothing here should be imported
 * directly into JSX for production use — always go through
 * src/services/*.js, which currently returns this data but is built
 * to be swapped for real fetch() calls without touching any component.
 */

export const demoMetrics = {
  rainfall: { value: 62.4, unit: 'mm/hr', label: 'Ambassa, Tripura' },
  cloudTemp: { value: -48.5, unit: '°C', label: 'Deep convective cloud top' },
  humidity: { value: 92, unit: '%', label: 'Saturated atmosphere' },
  risk: { value: 'CRITICAL', confidence: 94 },
};

export const demoAdminMetrics = {
  accuracy: { value: 98.4, unit: '%', trend: '+1.2% vs last week' },
  predictions: { value: 24, critical: 3 },
  activeAlerts: { value: 3 },
  monitoredAreas: { value: 145 },
};

export const demoCloudburstEvent = {
  status: 'EVENT DETECTED',
  area: 'Agartala',
  district: 'West Tripura',
  state: 'Tripura, India',
  risk: 'CRITICAL',
  rainfall: 82,
  duration: '35 min',
  affectedRadiusKm: 2.4,
  confidence: 94,
  cloudTemp: -48.5,
  humidity: 92,
  pressure: 1006,
  predictionTime: '14:35 IST',
  center: { lat: 23.936, lng: 91.851 }, // Agartala, West Tripura
};

// Secondary weaker cell shown on the map, matching the reference design's
// multi-hotspot composite view.
export const demoSecondaryEvents = [
  {
    area: 'Pasighat',
    district: 'East Siang',
    state: 'Arunachal Pradesh',
    risk: 'HIGH',
    rainfall: 61,
    confidence: 88,
    time: '14:45',
    center: { lat: 28.066, lng: 95.326 },
  },
  {
    area: 'Mokokchung',
    district: 'Mokokchung',
    state: 'Nagaland',
    risk: 'MODERATE',
    rainfall: 42,
    confidence: 85,
    time: '15:10',
    center: { lat: 26.328, lng: 94.514 },
  },
  {
    area: 'Kailashahar',
    district: 'Unakoti',
    state: 'Tripura',
    risk: 'LOW',
    rainfall: 18,
    confidence: 79,
    time: '1 hr ago',
    center: { lat: 24.328, lng: 92.006 },
  },
];

export const demoRainfallSeries = [
  { time: '-3h', value: 12 },
  { time: '-2h', value: 18 },
  { time: '-1h', value: 34 },
  { time: 'Now', value: 62 },
  { time: '+1h', value: 78 },
  { time: '+2h', value: 55 },
  { time: '+3h', value: 38 },
  { time: '+4h', value: 24 },
  { time: '+5h', value: 15 },
  { time: '+6h', value: 9 },
];

export const demoNowcastSeries = [
  { time: 'Now', value: 88 },
  { time: '+1h', value: 94 },
  { time: '+2h', value: 81 },
  { time: '+3h', value: 62 },
  { time: '+4h', value: 41 },
  { time: '+5h', value: 27 },
  { time: '+6h', value: 16 },
];

export const demoRecentEvents = [
  { area: 'Agartala', meta: '82 mm/hr · 10 min ago', risk: 'CRITICAL' },
  { area: 'Pasighat', meta: '61 mm/hr · 2 hr ago', risk: 'HIGH' },
  { area: 'Mokokchung', meta: '42 mm/hr · 48 min ago', risk: 'MODERATE' },
  { area: 'Kailashahar', meta: '18 mm/hr · 1 hr ago', risk: 'LOW' },
];

export const demoActiveAdminEvents = [
  { area: 'Agartala, Tripura', meta: '82 mm/hr · 94% conf · 14:35', risk: 'CRITICAL' },
  { area: 'Pasighat, Arunachal', meta: '61 mm/hr · 88% conf · 14:45', risk: 'HIGH' },
  { area: 'Mokokchung, Nagaland', meta: '42 mm/hr · 85% conf · 15:10', risk: 'MODERATE' },
  { area: 'Kohima, Nagaland', meta: '14 mm/hr · 79% conf · 15:20', risk: 'LOW' },
];

export const demoPredictionTable = [
  { area: 'Agartala, Tripura', risk: 'CRITICAL', rainfall: '82 mm/hr', confidence: '94%', time: '14:35', status: 'Active' },
  { area: 'Pasighat, Arunachal', risk: 'HIGH', rainfall: '61 mm/hr', confidence: '88%', time: '14:45', status: 'Active' },
  { area: 'Mokokchung, Nagaland', risk: 'MODERATE', rainfall: '42 mm/hr', confidence: '85%', time: '15:10', status: 'Monitoring' },
  { area: 'Agartala, Tripura', risk: 'LOW', rainfall: '16 mm/hr', confidence: '77%', time: '15:22', status: 'Resolved' },
  { area: 'Kohima, Nagaland', risk: 'LOW', rainfall: '14 mm/hr', confidence: '79%', time: '15:20', status: 'Monitoring' },
];

export const demoSystemStatus = [
  { name: 'Satellite Data', status: 'ONLINE' },
  { name: 'Weather Data', status: 'ONLINE' },
  { name: 'ML Prediction Engine', status: 'ACTIVE' },
  { name: 'FastAPI Backend', status: 'ONLINE' },
  { name: 'Database', status: 'ONLINE' },
  { name: 'Alert Engine', status: 'ACTIVE' },
];

export const dataPipelineStages = [
  { label: 'Satellite /\nWeather Data' },
  { label: 'Data\nProcessing' },
  { label: 'Feature\nEngineering' },
  { label: 'ML\nModels' },
  { label: 'Model\nFusion' },
  { label: 'Nowcasting\nEngine' },
  { label: 'Risk\nPrediction' },
  { label: 'Alert /\nEarly Warning' },
];

// Risk level -> Tailwind-friendly color tokens, used across cards, chips,
// map hotspots and the legend so risk color mapping stays in one place.
export const RISK_COLORS = {
  CRITICAL: { text: 'text-risk-red', bg: 'bg-risk-red/15', border: 'border-risk-red/40', hex: '#f14e4e' },
  HIGH: { text: 'text-risk-orange', bg: 'bg-risk-orange/15', border: 'border-risk-orange/40', hex: '#f3922f' },
  MODERATE: { text: 'text-risk-yellow', bg: 'bg-risk-yellow/15', border: 'border-risk-yellow/40', hex: '#f0c93b' },
  LOW: { text: 'text-risk-green', bg: 'bg-risk-green/15', border: 'border-risk-green/40', hex: '#33d17a' },
};
