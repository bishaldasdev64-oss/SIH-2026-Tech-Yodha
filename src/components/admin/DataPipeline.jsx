import { useState } from 'react';
import {
  Satellite, Layers, BarChart3, Brain, GitMerge, Clock3, TriangleAlert, BellRing,
} from 'lucide-react';
import { dataPipelineStages } from '../../data/demoData';

const ICONS = [Satellite, Layers, BarChart3, Brain, GitMerge, Clock3, TriangleAlert, BellRing];

export default function DataPipeline({ onStageClick }) {
  const [activeStage, setActiveStage] = useState(null);

  const handleClick = (i) => {
    setActiveStage(i);
    onStageClick?.(dataPipelineStages[i]);
  };

  return (
    <div className="rounded-2xl border border-line bg-gradient-to-br from-navy-850 to-navy-900 p-4">
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-display font-semibold text-[13.5px]">Data Pipeline</span>
        <span className="text-[10.5px] text-ink-2 font-mono">OBSERVE → ANALYZE → PREDICT → WARN</span>
      </div>
      <div className="flex items-center overflow-x-auto pb-2.5 pt-1.5">
        {dataPipelineStages.map((stage, i) => {
          const Icon = ICONS[i];
          return (
            <div key={stage.label} className="flex items-center">
              <button
                onClick={() => handleClick(i)}
                className="flex flex-col items-center gap-1.5 min-w-[108px] flex-none"
              >
                <div className={`w-[52px] h-[52px] rounded-2xl border flex items-center justify-center transition-colors
                  ${activeStage === i ? 'border-cyan/50 bg-cyan/10' : 'border-line bg-navy-800'}`}>
                  <Icon size={22} className="text-cyan" />
                </div>
                <div className="text-[10.5px] text-center text-ink-1 font-medium leading-tight whitespace-pre-line">
                  {stage.label}
                </div>
              </button>
              {i < dataPipelineStages.length - 1 && (
                <div className="w-[34px] h-[2px] bg-gradient-to-r from-navy-600 to-navy-700 flex-none relative">
                  <span className="absolute -right-1.5 -top-2 text-ink-2 text-sm">›</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
