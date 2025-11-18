export default function Metrics() {
  const chips = ['Impressions','Clicks','Trial → paid CVR','Day 1 activation','Checkout completion','30-day retention'];
  return (
    <section id="metrics" className="border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-3 text-center text-2xl font-semibold">You decide what counts as success.</h2>
        <p className="mx-auto max-w-3xl text-center text-white/70">Remus doesn’t force a specific schema. Track the metrics that matter. Mark some as North Star and others as supporting — Remus reuses your definitions everywhere.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {chips.map((m,i)=> (
            <span key={m} className={`rounded-full px-3 py-1 ${i%2? 'bg-white/5 border border-white/10':'bg-white/10'} text-sm text-white/90 transition hover:scale-105`}>
              {m}
            </span>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-white/60">Ticker, funnels, and tests all reuse your metrics — not a hidden default dashboard.</p>
      </div>
    </section>
  );
}
