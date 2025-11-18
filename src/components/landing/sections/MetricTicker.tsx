'use client';
import { useEffect, useRef, useState } from 'react';

export default function MetricTicker() {
  const metrics = ['Impressions','Clicks','Trial → Paid CVR','Day 1 activation','Checkout completion','30d retention'];
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    let raf = 0;
    let x = 0;
    const step = () => {
      if (!paused && ref.current) {
        x -= 0.3; // slow drift
        ref.current.style.transform = `translateX(${x}px)`;
        // reset to avoid huge negative values
        if (Math.abs(x) > ref.current.scrollWidth / 2) x = 0;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  return (
    <section id="metrics" className="border-b border-white/10">
      <div className="mx-auto max-w-6xl overflow-hidden px-0 py-12 md:px-6">
        <h2 className="mb-3 px-6 text-center text-2xl font-semibold">You decide what counts as success.</h2>
        <p className="mx-auto max-w-3xl px-6 text-center text-white/70">Remus doesn’t force a specific event schema. Track impressions, clicks, trial starts, activation, checkout, and retention. Mark some as North Star and others as supporting.</p>
        <div className="relative mt-6 select-none">
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0b1020] to-transparent" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0b1020] to-transparent" />
          <div className="flex whitespace-nowrap will-change-transform" ref={ref} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            {[...metrics, ...metrics].map((m, i) => (
              <span key={i} className="mx-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/90">
                {m}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-4 px-6 text-center text-xs text-white/60">Ticker, funnels, and tests all reuse your metrics — not a hidden default dashboard.</p>
      </div>
    </section>
  );
}
