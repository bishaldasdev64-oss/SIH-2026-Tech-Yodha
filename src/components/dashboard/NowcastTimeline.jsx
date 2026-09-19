const STEPS = ['NOW', '+1H', '+2H', '+3H', '+4H', '+5H', '+6H'];

export default function NowcastTimeline() {
  return (
    <div className="flex justify-between mt-2.5">
      {STEPS.map((step, i) => (
        <div key={step} className="flex flex-col items-center gap-1 text-[9.5px] text-ink-2 font-mono">
          <span
            className={`w-[7px] h-[7px] rounded-full ${i === 0 ? 'bg-cyan shadow-[0_0_6px_#3fd7e8]' : 'bg-navy-600'}`}
          />
          {step}
        </div>
      ))}
    </div>
  );
}
