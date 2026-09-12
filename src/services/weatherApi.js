import { apiGet } from './api';
import { demoMetrics } from '../data/demoData';

/**
 * getCurrentWeather()
 *
 * Intended real endpoint: GET /api/weather/current
 * Until that endpoint is wired up (or while it's unreachable), this
 * falls back to demo data so the UI never renders blank. Once your
 * FastAPI route is ready, this function's return shape is the contract —
 * components already consume `rainfall`, `cloudTemp`, `humidity`, `risk`
 * exactly as defined in demoMetrics.
 */
export async function getCurrentWeather() {
  try {
    return await apiGet('/api/weather/current');
  } catch (err) {
    console.warn('[weatherApi] falling back to demo data:', err.message);
    return demoMetrics;
  }
}
