import { apiGet } from './api';
import { demoCloudburstEvent, demoSystemStatus } from '../data/demoData';

/**
 * Intended real endpoints:
 *   GET /api/alerts/active       -> current severe alert banner content
 *   GET /api/admin/system-health -> System Health panel rows
 */

export async function getActiveAlert() {
  try {
    return await apiGet('/api/alerts/active');
  } catch (err) {
    console.warn('[alertApi] active alert -> demo data:', err.message);
    return demoCloudburstEvent;
  }
}

export async function getSystemHealth() {
  try {
    return await apiGet('/api/admin/system-health');
  } catch (err) {
    console.warn('[alertApi] system health -> demo data:', err.message);
    return demoSystemStatus;
  }
}
