import Link from 'next/link';

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden border-b border-white/10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_50%_-10%,rgba(99,102,241,0.25),transparent_60%),radial-gradient(50rem_25rem_at_10%_20%,rgba(20,184,166,0.20),transparent_60%),radial-gradient(60rem_30rem_at_90%_10%,rgba(99,102,241,0.15),transparent_60%)] animate-[pulse_12s_ease-in-out_infinite]" />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-20 md:grid-cols-2">
        {/* Left copy */}
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
            Remus · Growth Experimentation Advisor
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Analyze the metrics you care about — not someone else’s dashboard.</h1>
          <p className="mt-3 text-white/75">Remus lets you pick the funnels, tests, and signals that matter to your business — then turns them into clear insights, experiment ideas, and A/B test tracking. No heavy analytics stack required.</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/overview" className="rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-[#0b1020] shadow-[0_0_0_1px_rgba(255,255,255,0.2)] transition-transform hover:scale-105 active:scale-95">Open Remus</Link>
            <a href="#insights" className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white/90 backdrop-blur transition-transform hover:scale-[1.02] active:scale-95">Explore sample insights</a>
          </div>
          <p className="mt-3 text-sm text-white/60">Built for early teams who track impressions, clicks, trials, and checkout — with or without GA, Mixpanel, or Segment.</p>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-white/70">
            {[
              ['+18%', 'Trial → paid conversion in a sample funnel'],
              ['3x faster', 'Experiment planning cycles'],
              ['2–3 hours', 'PM time saved per week'],
            ].map(([n, l]) => (
              <span key={l} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur"><strong className="text-white">{n}</strong> {l}</span>
            ))}
          </div>
        </div>
        {/* Right mock */}
        <div className="relative">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur transition-transform duration-500 ease-out hover:-translate-y-1 hover:rotate-[0.2deg]">
            <div className="aspect-[16/10] w-full rounded-xl bg-gradient-to-br from-indigo/20 to-teal/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
