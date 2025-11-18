import Link from 'next/link';

export default function ProductTour() {
  const cards = [
    { route:'/overview', title:'Overview Dashboard', desc:'At-a-glance view of funnels, tests, and high-priority suggestions.' },
    { route:'/funnel-explorer', title:'Funnel Explorer', desc:'See dropoffs by step, spot largest leaks, and jot down hypotheses.' },
    { route:'/ab-test-tracker', title:'A/B Test Tracker', desc:'Keep a running record of variants, lift, and experiment outcomes.' },
    { route:'/experiment-suggestions', title:'Experiment Suggestions', desc:'Structured ideas with impact, confidence, and effort.' },
    { route:'/experiment-library', title:'Experiment Library', desc:'What worked, what didn’t, and why.' },
    { route:'/data-uploads', title:'Data & Uploads', desc:'Admin hub for funnels, groups, metrics, and CSV/API mappings.' },
    { route:'/copilot-workspace', title:'Copilot Workspace', desc:'Chat through funnels, tests, and uploads with mock data.' },
    { route:'/notes', title:'Notes', desc:'Scrapbook for visual and text notes across funnels and tests.' },
  ];
  return (
    <section id="tour" className="border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center text-2xl font-semibold">Product tour</h2>
        <p className="mt-1 text-center text-sm text-white/70">Every part of Remus supports one loop: Funnels → Insights → Experiments → Learnings.</p>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {cards.map((card) => (
            <Link key={card.route} href={card.route as any} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm text-white/90 backdrop-blur transition hover:-translate-y-0.5 hover:border-teal-400/40">
              <div className="font-medium">{card.title}</div>
              <div className="mt-1 text-white/70">{card.desc}</div>
              <div className="mt-3 text-teal-300">Open in app →</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
