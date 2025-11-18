import Link from 'next/link';

export default function LandingFibr() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#0b1020] to-[#0b1020] text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_50%_-10%,rgba(99,102,241,0.25),transparent_60%),radial-gradient(50rem_25rem_at_10%_20%,rgba(20,184,166,0.20),transparent_60%),radial-gradient(60rem_30rem_at_90%_10%,rgba(99,102,241,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl px-6 pt-28 pb-16 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-400" />
            Built for startups that don’t need a full analytics stack — yet
          </div>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-6xl">
            Analyze the metrics that matter.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-white/70">
            Pick your funnels, tests, and signals. Remus turns them into clear insights, experiment ideas, and simple A/B tracking — no heavy setup.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/overview" className="rounded-xl bg-white text-[#0b1020] px-5 py-2.5 text-sm font-medium shadow-[0_0_0_1px_rgba(255,255,255,0.2)] hover:bg-white/95">
              Open Remus
            </Link>
            <a href="#tour" className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white/90 backdrop-blur hover:bg-white/10">
              Explore the product
            </a>
          </div>

          {/* Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-white/70">
            {['Funnels without GA/Mixpanel','Manual · CSV · API','Built for small teams'].map((pill) => (
              <span key={pill} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur">
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Product preview */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-6 pb-8">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur">
            <div className="aspect-[16/9] w-full rounded-xl bg-gradient-to-br from-indigo/20 to-teal/20" />
          </div>
        </div>
      </section>

      {/* Value grid */}
      <section className="relative" id="value">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-6 py-8 md:grid-cols-3">
          {[
            { title: 'Define just enough', body: 'Plain-language funnels and metrics. No schemas or tracking plans required to start.' },
            { title: 'Track tests simply', body: 'A/B test tracker with variants, lift, and learnings — without a heavy platform.' },
            { title: 'Decide faster', body: 'Copilot suggests experiments and explains dropoffs using your definitions.' },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
              <h3 className="text-base font-medium">{c.title}</h3>
              <p className="mt-1 text-sm text-white/70">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-center text-xl font-semibold">How Remus works</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { t: 'Pick your data', b: 'Choose funnels, metrics, and tests. Start manual; add CSVs or APIs when ready.' },
              { t: 'Explore and track', b: 'Funnel views, suggestions, A/B tracker, and library — all driven by your metrics.' },
              { t: 'Chat decisions', b: 'Ask what to test next. Get grounded insights, not generic advice.' },
            ].map((s) => (
              <div key={s.t} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
                <h3 className="text-base font-medium">{s.t}</h3>
                <p className="mt-1 text-sm text-white/70">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product tour */}
      <section id="tour">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-center text-xl font-semibold">Product tour</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            {[
              { route:'/overview', title:'Overview' },
              { route:'/funnel-explorer', title:'Funnel Explorer' },
              { route:'/ab-test-tracker', title:'A/B Test Tracker' },
              { route:'/experiment-suggestions', title:'Suggestions' },
              { route:'/experiment-library', title:'Library' },
              { route:'/data-uploads', title:'Data & Uploads' },
              { route:'/copilot-workspace', title:'Copilot' },
              { route:'/notes', title:'Notes' },
            ].map((card) => (
              <Link
                key={card.route}
                href={card.route as any}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm text-white/90 backdrop-blur hover:bg-white/[0.07]"
              >
                {card.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-10 backdrop-blur">
            <h2 className="text-2xl font-semibold">Pick the metrics that matter — let Remus handle the rest.</h2>
            <p className="mx-auto mt-2 max-w-2xl text-white/70">
              Define a couple of funnels, add a test or two, and see what you learn this week. You don’t need perfect data — just a starting point.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link href="/overview" className="rounded-xl bg-white text-[#0b1020] px-5 py-2.5 text-sm font-medium shadow-[0_0_0_1px_rgba(255,255,255,0.2)] hover:bg-white/95">
                Open Remus dashboard
              </Link>
              <Link href="/experiment-suggestions" className="text-sm text-white/90 underline">
                Learn more about how Remus works
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
