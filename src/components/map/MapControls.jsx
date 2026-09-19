import { Plus, Minus, RotateCcw, Maximize } from 'lucide-react';

export default function MapControls({ onZoomIn, onZoomOut, onReset, onFullscreen }) {
  const btn = 'w-8 h-8 rounded-lg bg-navy-900/85 border border-line text-ink-1 flex items-center justify-center backdrop-blur-md hover:text-cyan hover:border-cyan/40 transition-colors';
  return (
    <div className="absolute right-3.5 top-16 flex flex-col gap-2 z-10">
      <button className={btn} title="Zoom in" onClick={onZoomIn}><Plus size={15} /></button>
      <button className={btn} title="Zoom out" onClick={onZoomOut}><Minus size={15} /></button>
      <button className={btn} title="Reset view" onClick={onReset}><RotateCcw size={14} /></button>
      <button className={btn} title="Fullscreen" onClick={onFullscreen}><Maximize size={14} /></button>
    </div>
  );
}
