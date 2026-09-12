import { apiGet } from './api';
import {
  demoCloudburstEvent,
  demoSecondaryEvents,
  demoRainfallSeries,
  demoNowcastSeries,
  demoPredictionTable,
} from '../data/demoData';

/**
 * Intended real endpoints:
 *   GET /api/predictions/primary        -> primary/critical cloudburst event
 *   GET /api/predictions/active         -> secondary/lower-risk active events
 *   GET /api/predictions/rainfall-series
 *   GET /api/predictions/nowcast-series
 *   GET /api/admin/predictions          -> table used on Admin Dashboard
 *
 * Each function below falls back to demo data so the UI stays functional
 * while your model/backend integration is in progress. Replace the body
 * of each function with the real apiGet(...) call when the endpoint exists —
 * no component code needs to change since the return shape is preserved.
 */

export async function getPrimaryCloudburstEvent() {
  try {
    return await apiGet('/api/predictions/primary');
  } catch (err) {
    console.warn('[predictionApi] primary event -> demo data:', err.message);
    return demoCloudburstEvent;
  }
}

export async function getActiveEvents() {
  try {
    return await apiGet('/api/predictions/active');
  } catch (err) {
    console.warn('[predictionApi] active events -> demo data:', err.message);
    return demoSecondaryEvents;
  }
}

export async function getRainfallSeries() {
  try {
    return await apiGet('/api/predictions/rainfall-series');
  } catch (err) {
    console.warn('[predictionApi] rainfall series -> demo data:', err.message);
    return demoRainfallSeries;
  }
}

export async function getNowcastSeries() {
  try {
    return await apiGet('/api/predictions/nowcast-series');
  } catch (err) {
    console.warn('[predictionApi] nowcast series -> demo data:', err.message);
    return demoNowcastSeries;
  }
}

export async function getAdminPredictionTable() {
  try {
    return await apiGet('/api/admin/predictions');
  } catch (err) {
    console.warn('[predictionApi] admin table -> demo data:', err.message);
    return demoPredictionTable;
  }
}
