/**
 * Base API client for the existing FastAPI backend.
 *
 * This does not invent new endpoints or change any existing route names —
 * it's a thin fetch wrapper that weatherApi / predictionApi / alertApi
 * build on top of. Point VITE_API_BASE_URL at your FastAPI server in .env.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export async function apiGet(path, { signal } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, { signal });
  if (!res.ok) {
    throw new Error(`API error ${res.status} on ${path}`);
  }
  return res.json();
}

export async function apiPost(path, body, { signal } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status} on ${path}`);
  }
  return res.json();
}
