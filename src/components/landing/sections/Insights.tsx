import Reveal from '../Reveal';

export default function Insights() {
  const cards = [
    { label:'Funnel insight', title:'Biggest dropoff: Payment page', body:'Users who reach the payment page drop 28% vs. the previous step. Consider reducing friction and clarifying plan benefits.', chip:'Funnel: Checkout', impact:'High' },
    { label:'A/B test insight', title:'Variant B is winning on CTR', body:'Variant B shows +18% CTR vs control (p=0.02). Continue until guardrails confirm retention.', chip:'Test: CTA copy', impact:'Medium' },
    { label:'Experiment learning', title:'Hero benefit copy beats feature list', body:'Benefit-focused hero improved CTR by +12% vs feature list. Consider testing social proof next.', chip:'Experiment: Homepage hero', impact:'High' },
  ];
  return (
    <section id="insights" className="border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-6 text-center text-2xl font-semibold">See what Remus surfaces</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {cards.map((c,i) => (
            <Reveal key={c.title} delay={i*90}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-0.5 hover:border-teal-400/40">
              <div className="mb-2 text-xs text-white/70">{c.label}</div>
              <h3 className="font-medium">{c.title}</h3>
              <p className="text-sm text-white/75">{c.body}</p>
              <div className="mt-3 flex items-center gap-2 text-xs">
                <span className="rounded-full bg-white/10 px-2 py-0.5">{c.chip}</span>
                <span className="rounded-full bg-teal-500/15 px-2 py-0.5 text-teal-300">Impact: {c.impact}</span>
              </div>
              <div className="mt-4"><span className="text-sm text-teal-300">Open context (mock)</span></div>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
