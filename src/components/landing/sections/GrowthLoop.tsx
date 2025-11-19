'use client';
import { motion } from 'framer-motion';
import Reveal from '../Reveal';
import { SlidersHorizontal, Filter, TrendingUp, Activity, Repeat } from 'lucide-react';

const RING_SIZE = 800; // container width/height
const ORBIT_DIAMETER = 640; // visible ring diameter
const CENTER = RING_SIZE / 2; // 400
const RADIUS = ORBIT_DIAMETER / 2; // 320
const DURATION = 60; // seconds

const ITEMS = [
  { title: 'Pick your metrics', body: 'Select impressions, clicks, trials, activation, revenue — or any custom metric.', Icon: SlidersHorizontal },
  { title: 'Define funnels & tests', body: 'Group metrics into funnels and A/B test groups that mirror your journey.', Icon: Filter },
  { title: 'Analyze & prioritize', body: 'See biggest dropoffs, outliers, and high-leverage opportunities.', Icon: TrendingUp },
  { title: 'Track the experiments', body: 'Turn ideas into experiments, track outcomes, and capture learnings.', Icon: Activity },
  { title: 'Refine & repeat', body: 'Adjust which metrics matter as the loop gets smarter.', Icon: Repeat },
] as const;

export default function GrowthLoop() {
  return (
    <section className="relative w-full flex flex-col items-center overflow-hidden bg-[#0B0E17]">
      {/* Title section kept physically separate from the orbit */}
      <div className="pt-20 pb-12 px-6 text-center">
        <Reveal>
          <h2 className="text-2xl font-semibold text-white">How Remus fits into your growth loop</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-2 max-w-2xl mx-auto text-white/70">A continuous loop that starts from your own metrics — not someone else’s dashboard.</p>
        </Reveal>
      </div>

      {/* Orbit container */}
      <div className="relative w-[800px] h-[800px] max-w-[95vw] flex items-center justify-center mt-8">
        {/* Center node (independent of rotation) */}
        <div className="absolute inset-0 grid place-items-center z-10">
          <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-white/10 bg-gradient-to-b from-[#111827] to-[#0B0E17] text-center shadow-[inset_0_0_30px_rgba(99,102,241,0.15)]">
            <div className="text-sm font-medium leading-snug text-white/90">
              <div>Continuous</div>
              <div>Growth Loop</div>
            </div>
            <span className="pointer-events-none absolute -inset-8 rounded-full bg-indigo-500/10 blur-3xl" />
          </div>
        </div>

        {/* SVG connectors that rotate with the ring */}
        <motion.svg
          className="absolute inset-0"
          width={RING_SIZE}
          height={RING_SIZE}
          viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, ease: 'linear', duration: DURATION }}
        >
          {ITEMS.map((_, idx) => {
            const angle = (idx * 72 * Math.PI) / 180;
            const x2 = CENTER + RADIUS * Math.cos(angle);
            const y2 = CENTER + RADIUS * Math.sin(angle);
            return (
              <line key={`ln-${idx}`} x1={CENTER} y1={CENTER} x2={x2} y2={y2} stroke="rgba(148,163,184,0.3)" strokeWidth={1} />
            );
          })}
        </motion.svg>

        {/* Visible orbit ring (rotates) */}
        <motion.div
          className="absolute flex items-center justify-center"
          style={{ width: ORBIT_DIAMETER, height: ORBIT_DIAMETER, left: CENTER - RADIUS, top: CENTER - RADIUS }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, ease: 'linear', duration: DURATION }}
        >
          <div className="absolute inset-0 rounded-full border border-white/10" />

          {/* Satellites positioned via rotate/translateY/rotate method */}
          {ITEMS.map(({ title, body, Icon }, idx) => (
            <div key={title} className="absolute left-1/2 top-1/2">
              <motion.div
                className="w-64 max-w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-slate-900/80 p-4 text-left text-white/90 shadow-md backdrop-blur-md"
                style={{ transform: `rotate(${idx * 72}deg) translateY(-${RADIUS}px) rotate(-${idx * 72}deg)` }}
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, ease: 'linear', duration: DURATION }}
                whileHover={{ scale: 1.06 }}
              >
                <div className="mb-1 inline-flex items-center gap-2 text-sm font-medium">
                  <Icon className="h-4 w-4 text-teal-300" />
                  <span>{title}</span>
                </div>
                <p className="text-xs leading-relaxed text-white/80">{body}</p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Ensure separation from Product Tour below */}
      <div className="mb-[100px]" />
    </section>
  );
}
