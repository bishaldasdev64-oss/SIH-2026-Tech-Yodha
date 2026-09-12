import RainfallChart from './RainfallChart';

/**
 * <PredictionChart data={nowcastData} /> — cloudburst probability over the
 * 0–6h nowcast window. Same gradient-area visual language as RainfallChart
 * but its own component per the requested charts/ folder structure, so
 * probability-specific formatting (e.g. % unit, distinct color) stays
 * separate from rainfall-specific formatting.
 */
export default function PredictionChart({ data = [], height = 150, isLoading = false, color = '#f3922f' }) {
  return (
    <RainfallChart
      data={data}
      color={color}
      unit="%"
      height={height}
      isLoading={isLoading}
      isEmpty={!isLoading && data.length === 0}
    />
  );
}
