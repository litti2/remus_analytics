export default function JourneyLoop() {
  const nodes = [
    { t: 'Pick your metrics', b: 'Select impressions, clicks, trials, activation, revenue — or any custom metric.' },
    { t: 'Define funnels & tests', b: 'Group metrics into funnels and A/B test groups that mirror your journey.' },
    { t: 'Analyze & prioritize', b: 'See biggest dropoffs, outliers, and high-leverage opportunities.' },
    { t: 'Run experiments & learn', b: 'Turn ideas into experiments, track outcomes, and capture learnings.' },
    { t: 'Refine & repeat', b: 'Adjust which metrics you care about — the loop keeps getting smarter.' },
  ];
  return (
    <section id="journey" className="border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-6 text-center text-2xl font-semibold">How Remus fits into your growth loop</h2>
        <div className="relative mx-auto grid max-w-4xl place-items-center">
          {/* Center circle */}
          <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-center text-sm text-white/80">
            Continuous\n            <br/>Growth Loop
          </div>
          {/* Ring of nodes */}
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="h-80 w-80 rounded-full border border-white/10" />
          </div>
          <div className="pointer-events-none absolute inset-0">
            {/* simple connectors */}
            {/* decorative only */}
          </div>
          <div className="absolute inset-0">
            <div className="relative h-full w-full">
              {nodes.map((n, idx) => {
                const angle = (idx / nodes.length) * 2 * Math.PI - Math.PI / 2;
                const r = 170; // radius in px
                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * r;
                return (
                  <div key={n.t} className="absolute" style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` , transform: 'translate(-50%, -50%)' }}>
                    <div className="rounded-xl border border-white/10 bg-white/[0.06] p-3 text-center text-xs text-white/80 transition hover:-translate-y-0.5 hover:border-teal-400/40">
                      <div className="font-medium text-white/90">{n.t}</div>
                      <div className="mt-1 max-w-[180px] text-[11px] leading-relaxed">{n.b}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
