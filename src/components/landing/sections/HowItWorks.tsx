export default function HowItWorks() {
  const cards = [
    { t: 'Pick your data', b: 'Choose funnels, metrics, and tests. Start manual; add CSVs or APIs when ready.' },
    { t: 'Explore and track', b: 'Funnel views, suggestions, A/B tracker, and library — all driven by your metrics.' },
    { t: 'Chat through decisions', b: 'Ask what to test next. Get grounded insights, not generic advice.' },
  ];
  return (
    <section id="how" className="border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center text-2xl font-semibold">How Remus works</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {cards.map((c)=> (
            <div key={c.t} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-teal-400/40">
              <h3 className="text-base font-medium">{c.t}</h3>
              <p className="mt-1 text-sm text-white/75">{c.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
