'use client';
import { motion } from 'framer-motion';
import Reveal from '../Reveal';
import { SlidersHorizontal, Filter, TrendingUp, Beaker, Repeat } from 'lucide-react';

const DURATION = 50; // seconds for a full revolution
const RING_SIZE = 600; // px (diameter of rotating ring)
const RADIUS = RING_SIZE / 2; // 300px

const STEPS = [
  { angle: 0,   title: 'Pick your metrics',       body: 'Select impressions, clicks, trials, activation, revenue — or any custom metric.', icon: SlidersHorizontal },
  { angle: 72,  title: 'Define funnels & tests',  body: 'Group metrics into funnels and A/B test groups that mirror your journey.',        icon: Filter },
  { angle: 144, title: 'Analyze & prioritize',    body: 'See biggest dropoffs, outliers, and high-leverage opportunities.',                icon: TrendingUp },
  { angle: 216, title: 'Track the experiments',   body: 'Turn ideas into experiments, track outcomes, and capture learnings.',             icon: Beaker },
  { angle: 288, title: 'Refine & repeat',         body: 'Adjust which metrics matter as the loop gets smarter.',                           icon: Repeat },
] as const;

export default function GrowthLoop() {
  return (
    <section className="relative flex flex-col items-center justify-center py-24 overflow-hidden bg-[#0B0E17]">
      {/* Title lives outside the rotating mechanism to avoid overlap */}
      <div className="relative z-10 mb-10 px-6 text-center">
        <Reveal>
          <h2 className="text-2xl font-semibold text-white">How Remus fits into your growth loop</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-2 max-w-2xl text-white/70">
            A continuous loop that starts from your own metrics — not someone else’s dashboard.
          </p>
        </Reveal>
      </div>

      {/* Orbit stage container (prevents layout collision) */}
      <div className="relative w-[800px] max-w-[95vw] h-[800px] flex items-center justify-center">
        {/* Static center (independent of the rotating ring) */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="relative z-20 flex h-44 w-44 items-center justify-center rounded-full border border-white/10 bg-gradient-to-b from-[#111827] to-[#0B0E17] text-center shadow-[inset_0_0_30px_rgba(99,102,241,0.15)]">
            <div className="text-sm font-medium leading-snug text-white/90">
              <div>Continuous</div>
              <div>Growth Loop</div>
            </div>
            <span className="pointer-events-none absolute -inset-6 rounded-full bg-indigo-500/10 blur-2xl" />
          </div>
        </div>

        {/* Rotating ring (handles revolution of nodes + connectors) */}
        <motion.div
          className="relative z-0 flex items-center justify-center"
          style={{ width: RING_SIZE, height: RING_SIZE }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, ease: 'linear', duration: DURATION }}
        >
          {/* Visible orbit ring */}
          <div className="absolute inset-0 rounded-full border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]" />

          {/* Connectors (rotate with ring so no extra math) */}
          <svg className="absolute inset-0" width={RING_SIZE} height={RING_SIZE} viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}> 
            {STEPS.map((s, idx) => {
              const ang = (Math.PI / 180) * s.angle;
              const cx = RADIUS + RADIUS * Math.cos(ang);
              const cy = RADIUS + RADIUS * Math.sin(ang);
              return <line key={`ln-${idx}`} x1={RADIUS} y1={RADIUS} x2={cx} y2={cy} stroke="rgba(148,163,184,0.28)" strokeWidth={1} />;
            })}
          </svg>

          {/* Satellites on ring edge; each card counter-rotates to stay upright */}
          {STEPS.map((s, idx) => (
            <div
              key={idx}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `rotate(${s.angle}deg) translate(${RADIUS}px)`, transformOrigin: '0 0' }}
            >
              <motion.div
                className="w-64 max-w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-white/5 p-4 text-left text-white/90 shadow-md backdrop-blur-md"
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, ease: 'linear', duration: DURATION }}
                whileHover={{ scale: 1.06 }}
              >
                <div className="mb-1 inline-flex items-center gap-2 text-sm font-medium">
                  {s.icon && <s.icon className="h-4 w-4 text-teal-300" />}
                  <span>{s.title}</span>
                </div>
                <p className="text-xs leading-relaxed text-white/80">{s.body}</p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom margin to guarantee separation from Product Tour */}
      <div className="mt-[100px]" />
    </section>
  );
}
