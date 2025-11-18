import Reveal from '../Reveal';

export default function HowItWorks() {
  const cards = [
    { t: '1 — Pick your data', b: 'Choose the metrics, events, and tests you care about. Start with impressions and clicks, or hook in CSVs and APIs when you’re ready.', tag:'Inputs: Manual · CSV · API' },
    { t: '2 — Explore & track the metrics you want', b: 'Remus organizes your data into funnel views, experiment suggestions, an A/B test tracker, and an experiment library — all using the metrics you defined.', tag:'Modules: Overview · Funnel Explorer · A/B Tracker · Suggestions · Library' },
    { t: '3 — Chat through decisions', b: 'Use Copilot to ask questions like “Where is my biggest dropoff?” or “What should we test next?” and get structured suggestions grounded in your metrics.', tag:'Decision support, not deployment.' },
  ];
  return (
    <section id="how" className="border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center text-2xl font-semibold">How Remus works</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {cards.map((c,i)=> (
            <Reveal key={c.t} delay={i*80}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-0.5 hover:border-teal-400/40">
                <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs text-white/80">★</div>
                <h3 className="text-base font-medium">{c.t}</h3>
                <p className="mt-1 text-sm text-white/75">{c.b}</p>
                <div className="mt-2 text-xs text-white/60">{c.tag}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
