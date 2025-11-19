'use client';
import { motion } from 'framer-motion';

const SIZE = 500; // container size
const CENTER = SIZE / 2; // 250
const RADIUS = 200; // orbit radius per spec
const DURATION = 50; // seconds

const ITEMS = [
  'Pick your metrics',
  'Define funnels & tests',
  'Analyze & prioritize',
  'Track the experiments',
  'Refine & repeat',
] as const;

export default function GrowthLoop() {
  return (
    <section className="relative w-full flex flex-col items-center overflow-hidden bg-[#0B0E17]">
      {/* Title section separated from orbit */}
      <div className="pt-20 pb-12 px-6 text-center">
        <h2 className="text-2xl font-semibold text-white">How Remus fits into your growth loop</h2>
        <p className="mt-2 max-w-2xl mx-auto text-white/70">A continuous loop that starts from your own metrics — not someone else’s dashboard.</p>
      </div>

      {/* Orbit container (scaled down to 500x500) */}
      <div className="relative w-[500px] h-[500px] flex items-center justify-center">
        {/* Static center node */}
        <div className="absolute inset-0 grid place-items-center z-20">
          <div className="flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-gradient-to-b from-[#111827] to-[#0B0E17] text-center shadow-[inset_0_0_20px_rgba(99,102,241,0.15)]">
            <div className="text-[11px] font-medium leading-tight text-white/90">
              <div>Continuous</div>
              <div>Growth Loop</div>
            </div>
          </div>
        </div>

        {/* Rotating wrapper for ring, lines, and satellites */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, ease: 'linear', duration: DURATION }}
        >
          {/* Visible orbit ring */}
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

          {/* Connecting lines (rotate with ring) */}
          <svg className="absolute inset-0" width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
            {ITEMS.map((_, idx) => {
              const ang = (idx * 72 * Math.PI) / 180;
              const x2 = CENTER + RADIUS * Math.cos(ang);
              const y2 = CENTER + RADIUS * Math.sin(ang);
              return <line key={idx} x1={CENTER} y1={CENTER} x2={x2} y2={y2} stroke="rgba(148,163,184,0.28)" strokeWidth={1} />;
            })}
          </svg>

          {/* Satellites positioned by rotate/translate/rotate method */}
          {ITEMS.map((label, idx) => (
            <div key={label} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${idx * 72}deg) translate(${RADIUS}px) rotate(-${idx * 72}deg)` }}>
              <motion.div
                className="w-44 max-w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-gray-900/90 p-3 text-left text-white/90 backdrop-blur"
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, ease: 'linear', duration: DURATION }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-[11px] font-medium">{label}</div>
                <p className="mt-1 text-[10px] leading-relaxed text-white/80">{getBody(label)}</p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Separation from Product Tour below */}
      <div className="mb-[100px]" />
    </section>
  );
}

function getBody(label: (typeof ITEMS)[number]) {
  switch (label) {
    case 'Pick your metrics':
      return 'Select impressions, clicks, trials, activation, revenue — or any custom metric.';
    case 'Define funnels & tests':
      return 'Group metrics into funnels and A/B test groups that mirror your journey.';
    case 'Analyze & prioritize':
      return 'See biggest dropoffs, outliers, and high-leverage opportunities.';
    case 'Track the experiments':
      return 'Turn ideas into experiments, track outcomes, and capture learnings.';
    case 'Refine & repeat':
      return 'Adjust which metrics matter as the loop gets smarter.';
  }
}
