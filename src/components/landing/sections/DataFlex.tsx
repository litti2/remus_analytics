import Reveal from '../Reveal';

export default function DataFlex() {
  const cards = [
    { t:'Manual entry', b:'Perfect for first-time tracking — copy numbers from your existing tools into Remus.' },
    { t:'CSV uploads', b:'Upload step counts and metrics per funnel or test, then map them to your configuration.' },
    { t:'API integrations (optional)', b:'When you’re ready, connect product analytics for near real-time metrics.' },
  ];
  return (
    <section id="data" className="border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-6 text-center text-2xl font-semibold">Start with whatever data you have</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {cards.map((c,i)=> (
            <Reveal key={c.t} delay={i*80}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-0.5 hover:border-teal-400/40">
              <h3 className="font-medium">{c.t}</h3>
              <p className="text-sm text-white/75">{c.b}</p>
            </div>
          </Reveal>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-white/60">Mix and match as needed. Remus adapts to the data you have today — and grows with you.</p>
      </div>
    </section>
  );
}
