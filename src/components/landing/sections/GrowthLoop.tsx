'use client';
import { useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion';
import Reveal from '../Reveal';
import { TrendingUp, Beaker, Filter, Repeat, SlidersHorizontal } from 'lucide-react';

const NODES = [
  { key: 'metrics', title: 'Pick your metrics', body: 'Select impressions, clicks, trials, activation, revenue — or any custom metric.', icon: SlidersHorizontal, angle: 0 },
  { key: 'funnels', title: 'Define funnels & tests', body: 'Group metrics into funnels and A/B test groups that mirror your journey.', icon: Filter, angle: 72 },
  { key: 'analyze', title: 'Analyze & prioritize', body: 'See biggest dropoffs, outliers, and high-leverage opportunities.', icon: TrendingUp, angle: 144 },
  { key: 'track', title: 'Track the experiments', body: 'Turn ideas into experiments, track outcomes, and capture learnings.', icon: Beaker, angle: 216 },
  { key: 'refine', title: 'Refine & repeat', body: 'Adjust which metrics matter as the loop gets smarter.', icon: Repeat, angle: 288 },
] as const;

export default function GrowthLoop() {
  const [paused, setPaused] = useState(false);
  const rotation = useMotionValue(0);

  useAnimationFrame((t, delta) => {
    if (paused) return;
    // 360 degrees per 40_000ms => delta ms step
    const step = (360 / 40000) * delta;
    rotation.set((rotation.get() + step) % 360);
  });

  return (
    <section id="journey" className="relative bg-[#0B0E17]">
      <div className="mx-auto flex max-w-6xl flex-col gap-32 px-6 py-24">
        <div className="relative isolate min-h-[800px] overflow-visible rounded-3xl border border-white/10 bg-white/[0.02] p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]">
          {/* Ambient radial gradient */}
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-[radial-gradient(60rem_30rem_at_50%_0%,rgba(99,102,241,0.16),transparent_60%),radial-gradient(40rem_24rem_at_60%_50%,rgba(20,184,166,0.12),transparent_60%)]" />

          <Reveal>
            <h2 className="mb-2 text-center text-2xl font-semibold text-white">How Remus fits into your growth loop</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mx-auto mb-8 max-w-2xl text-center text-white/70">A continuous loop that starts from your own metrics — not someone else’s dashboard.</p>
          </Reveal>

          {/* Orbit stage */}
          <div className="relative mx-auto mt-4 h-[620px] w-[620px] max-w-full md:h-[620px] md:w-[620px]">
            {/* Center hub */}
            <div className="absolute inset-0 grid place-items-center">
              <Reveal>
                <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-center shadow-inner backdrop-blur">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: [1, 1.04, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                    className="text-sm font-medium leading-snug text-white/90"
                  >
                    <div>Continuous</div>
                    <div>Growth Loop</div>
                  </motion.div>
                  <span className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-indigo-400/10 blur-2xl" />
                </div>
              </Reveal>
            </div>

            {/* Orbit ring visual */}
            <Reveal delay={120}>
              <div className="absolute inset-0 grid place-items-center">
                <div className="h-[520px] w-[520px] rounded-full border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]" />
              </div>
            </Reveal>

            {/* Connectors (rotate with ring) */}
            <motion.svg className="absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2" width={620} height={620} style={{ rotate: rotation }}>
              {NODES.map((n, i) => {
                const r = 260; // radius to node center
                const ang = (Math.PI / 180) * n.angle;
                const cx = 310 + r * Math.cos(ang);
                const cy = 310 + r * Math.sin(ang);
                return (
                  <line key={`ln-${n.key}`} x1={310} y1={310} x2={cx} y2={cy} stroke="rgba(148,163,184,0.25)" strokeWidth={1} />
                );
              })}
            </motion.svg>

            {/* Rotating ring holding nodes */}
            <motion.div className="absolute inset-0" style={{ rotate: rotation }}>
              {NODES.map((n) => {
                const Icon = n.icon;
                return (
                  <div key={n.key} className="absolute left-1/2 top-1/2" style={{ transformOrigin: '0 0', transform: `rotate(${n.angle}deg) translate(260px)` }}>
                    {/* Counter-rotate the card to keep text upright */}
                    <NodeCard
                      title={n.title}
                      body={n.body}
                      icon={<Icon className="h-4 w-4 text-teal-300" />}
                      counterRotate={useTransform(rotation, (v) => -v - n.angle)}
                      onHover={(p) => setPaused(p)}
                    />
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Separator space to avoid collision with Product Tour */}
        <div className="h-0" />
      </div>
    </section>
  );
}

function NodeCard({ title, body, icon, counterRotate, onHover }: { title: string; body: string; icon: React.ReactNode; counterRotate: any; onHover: (paused: boolean) => void }) {
  return (
    <motion.div
      onHoverStart={() => onHover(true)}
      onHoverEnd={() => onHover(false)}
      style={{ rotate: counterRotate }}
      className="group relative w-[200px] max-w-[42vw] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-white/85 shadow-md backdrop-blur-md transition md:w-[220px]"
      whileHover={{ scale: 1.07 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
    >
      <div className="mb-1 inline-flex items-center gap-2 text-[11px] text-white/80">
        {icon}
        <span className="font-medium text-white">{title}</span>
      </div>
      <div className="leading-relaxed text-white/80">{body}</div>
      <div className="pointer-events-none absolute -inset-3 -z-10 hidden rounded-3xl bg-teal-400/10 blur-md transition group-hover:block" />
    </motion.div>
  );
}
