import Link from 'next/link';

export default function Landing() {
  return (
    <main className="min-h-screen w-full bg-canvas text-foreground">
      {/* Top nav */}
      <header className="sticky top-0 z-20 border-b border-border bg-surface/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo to-teal">
              <span className="text-sm font-bold text-white">R</span>
            </div>
            <span className="text-sm font-semibold">Remus — Growth Experimentation Advisor</span>
          </div>
          <nav className="hidden items-center gap-4 text-sm md:flex">
            <a href="#how" className="text-muted-foreground hover:text-foreground">How it works</a>
            <a href="#tour" className="text-muted-foreground hover:text-foreground">Product tour</a>
            <a href="#usecases" className="text-muted-foreground hover:text-foreground">Use cases</a>
            <a href="#data" className="text-muted-foreground hover:text-foreground">Data & flexibility</a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/overview" className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/90">Open Remus</Link>
            <a href="#tour" className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-secondary/50">Explore the product</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative border-b border-border bg-gradient-to-b from-indigo/20 to-transparent">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Analyze the metrics that matter — not someone else’s dashboard.</h1>
          <p className="mx-auto mb-6 max-w-3xl text-muted-foreground">
            Remus lets you pick the funnels, tests, and signals that matter to your business — then turns them into clear insights, experiment ideas, and A/B test tracking. No heavy analytics stack required.
          </p>
          <div className="mb-6 flex items-center justify-center gap-3">
            <Link href="/overview" className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">Open Remus</Link>
            <a href="#tour" className="rounded-md border border-border px-4 py-2 hover:bg-secondary/50">Explore the product</a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full bg-secondary px-3 py-1">Funnels without GA or Mixpanel</span>
            <span className="rounded-full bg-secondary px-3 py-1">Manual, CSV, or API</span>
            <span className="rounded-full bg-secondary px-3 py-1">Built for small teams</span>
          </div>
        </div>
      </section>

      {/* Problem / Need */}
      <section className="border-b border-border bg-surface" id="problem">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-16 md:grid-cols-2">
          <div>
            <h2 className="mb-3 text-2xl font-semibold">Small teams are drowning in analytics tools they don’t need yet.</h2>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>You have GA, maybe Mixpanel, maybe nothing — but no one trusts the definitions.</li>
              <li>Dashboards are full of metrics that don’t map to your actual funnel.</li>
              <li>You’re copying numbers into spreadsheets just to run simple experiments.</li>
              <li>Every tool wants events, schemas, and tracking plans before you’ve validated your basics.</li>
              <li>Everything feels overkill — when all you want is impressions, clicks, and conversions for a few key journeys.</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-2xl font-semibold">What you actually need.</h3>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>A simple way to define your own funnels and metrics.</li>
              <li>A way to track a few A/B tests without an entire experimentation platform.</li>
              <li>A place to capture experiment ideas and learnings, not just numbers.</li>
              <li>A Copilot that thinks through your data and suggests next experiments.</li>
              <li>A system that fits between “no analytics” and “full enterprise stack”.</li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">Just enough structure to help you learn, without getting in your way.</p>
          </div>
        </div>
      </section>

      {/* How Remus works */}
      <section className="border-b border-border bg-surface" id="how">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-8 text-center text-2xl font-semibold">How Remus works</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-1 font-medium">Step 1 — Pick your data</h3>
              <p className="text-sm text-muted-foreground">Choose the funnels, metrics, and tests you care about. Start with impressions and clicks, or hook in CSVs and APIs when you’re ready.</p>
              <div className="mt-2 text-xs text-muted-foreground">Inputs: Manual · CSV · API</div>
              <div className="mt-2 text-xs text-muted-foreground">Examples: “Trial start”, “Day 1 activation”, “Checkout completion”, “Email clicks”</div>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-1 font-medium">Step 2 — Explore and track</h3>
              <p className="text-sm text-muted-foreground">Remus organizes your data into funnel views, experiment suggestions, an A/B test tracker, and an experiment library — all using the metrics you defined.</p>
              <div className="mt-2 text-xs text-muted-foreground">Modules: Overview · Funnel Explorer · A/B Test Tracker · Suggestions · Library · Notes</div>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-1 font-medium">Step 3 — Chat through decisions</h3>
              <p className="text-sm text-muted-foreground">Use Copilot to ask questions like “Where is my biggest dropoff?” or “What should we test next?” Get structured suggestions grounded in your metrics — not generic advice.</p>
              <div className="mt-2 text-xs text-muted-foreground">Role: Decision support, not deployment</div>
              <div className="mt-2 text-xs text-muted-foreground">Output: Funnel insights · Experiment ideas · Test interpretations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Product tour */}
      <section className="border-b border-border bg-surface" id="tour">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-8 text-center text-2xl font-semibold">Product tour</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { route:'/overview', title:'Overview Dashboard', desc:'At-a-glance view of your key funnels, tests, and high-priority suggestions — with “Top performing” and “Needs attention” lanes.' },
              { route:'/funnel-explorer', title:'Funnel Explorer', desc:'Define funnels, see dropoffs step by step, and track users, impressions, and conversions — all using the metrics you chose.' },
              { route:'/ab-test-tracker', title:'A/B Test Tracker', desc:'Keep a living record of every experiment — variants, metrics, lift, and learnings — so you never lose context again.' },
              { route:'/experiment-suggestions', title:'Experiment Suggestions', desc:'Suggestion board with hypotheses, impact, confidence, effort, and direct links to A/B test setup.' },
              { route:'/experiment-library', title:'Experiment Library', desc:'Memory of what worked, what didn’t, and why — with funnels and metrics linked back to every test.' },
              { route:'/data-uploads', title:'Data & Uploads', desc:'Admin hub for funnels, test groups, metrics, and CSV/API mappings. This is where you define the metrics Remus uses everywhere.' },
              { route:'/copilot-workspace', title:'Copilot Workspace', desc:'Chat through your funnels, tests, and uploads. Pick a funnel or test and let Remus walk you through what’s happening.' },
              { route:'/notes', title:'Notes', desc:'Scratchpad for insights and decisions that span across funnels and tests — including visual canvases for whiteboarding.' },
            ].map(card=> (
              <div key={card.route} className="rounded-lg border border-border bg-card p-4">
                <div className="mb-2 text-xs text-muted-foreground">{card.route}</div>
                <h3 className="font-medium">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.desc}</p>
                <div className="mt-3"><Link href={card.route as any} className="text-sm text-primary underline">Open in app</Link></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* You decide what counts as success */}
      <section className="border-b border-border bg-surface" id="metrics">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-3 text-center text-2xl font-semibold">You decide what counts as success.</h2>
          <p className="mx-auto mb-6 max-w-3xl text-center text-muted-foreground">Remus doesn’t force a specific event schema. Track impressions, clicks, trial starts, activation, checkout, or retention. Mark some as North Star metrics and others as supporting metrics — Remus uses your definitions everywhere.</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['Impressions','Clicks','Trial → Paid CVR','Day 1 activation','Checkout completion'].map((m,i)=> (
              <span key={m} className={`rounded-full px-3 py-1 ${i%2? 'bg-accent/10 text-accent':'bg-secondary'}`}>{m}</span>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">The app’s global ticker cycles through your North Star metrics. Funnel and test views use these exact metrics — not a hidden default.</p>
        </div>
      </section>

      {/* See what Remus surfaces */}
      <section className="border-b border-border bg-surface" id="insights">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-6 text-center text-2xl font-semibold">See what Remus surfaces</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { label:'Funnel insight', title:'Biggest dropoff: Payment page', body:'Users who reach the payment page drop 28% vs. the previous step. Consider reducing friction (auto-fill, saved cards) and clarifying plan benefits.', chip:'Funnel: Checkout', impact:'High' },
              { label:'A/B test insight', title:'Variant B is winning on CTR', body:'Variant B shows +18% CTR vs control (p=0.02). Continue running until guardrails confirm healthy retention before rollout.', chip:'Test: CTA copy', impact:'Medium' },
              { label:'Experiment learning', title:'Hero benefit copy beats feature list', body:'Homepage hero with benefit-focused copy improved CTR by +12% vs feature list. Consider testing social proof next.', chip:'Experiment: Homepage hero', impact:'High' },
            ].map(card=> (
              <div key={card.title} className="rounded-lg border border-border bg-card p-4">
                <div className="mb-2 text-xs text-muted-foreground">{card.label}</div>
                <h3 className="font-medium">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.body}</p>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-secondary px-2 py-0.5">{card.chip}</span>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">Impact: {card.impact}</span>
                </div>
                <div className="mt-4"><span className="text-sm text-primary underline">Open context (requires Remus)</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-b border-border bg-surface" id="usecases">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-6 text-center text-2xl font-semibold">Who it’s for</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { title:'Early-stage startups', bullets:['Just starting to instrument signups and onboarding.','No dedicated analytics engineer.','Want funnels defined in plain language, not tracking specs.'] },
              { title:'Small growth / marketing teams', bullets:['Run experiments but results are scattered across tools.','Need a single place to track funnels, tests, and learnings.','Want light process, not a heavy experimentation platform.'] },
              { title:'Agencies / consultants', bullets:['Lightweight experimentation hub for multiple clients.','Configure funnels per client without heavy tracking plans.','Share learnings and experiment histories across projects.'] },
            ].map(card=> (
              <div key={card.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="mb-1 font-medium">{card.title}</h3>
                <ul className="list-disc pl-5 text-sm text-muted-foreground">
                  {card.bullets.map(b=> <li key={b}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Start with whatever data you have */}
      <section className="border-b border-border bg-surface" id="data">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-6 text-center text-2xl font-semibold">Start with whatever data you have</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { title:'Manual entry', body:'Perfect for first-time tracking — copy numbers from your existing tools as you go. Great for early validation and simple experiments.' },
              { title:'CSV uploads', body:'Upload step counts and metrics per funnel or test. Remus maps them to your configuration in a few clicks.' },
              { title:'API integrations (optional)', body:'When you’re ready, connect product analytics for near real-time metrics. Remus adapts to the data you have, not the stack you wish you had.' },
            ].map(card=> (
              <div key={card.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="mb-1 font-medium">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">Mix and match as needed. Remus flexes to your current reality — and grows with you.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-border bg-surface" id="faq">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-6 text-center text-2xl font-semibold">FAQ</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { q:'Do I need GA, Mixpanel, or Segment to use Remus?', a:'No. You can start with manual numbers, CSVs, or simple APIs. Remus is designed so early teams can learn long before they’ve instrumented everything.' },
              { q:'Can Remus launch or deploy experiments?', a:'No. Remus is a pure decision-support layer. It helps you decide what to run, track performance, and capture learnings. You still launch experiments in your product or existing tools.' },
              { q:'Who should own Remus in our company?', a:'Growth PMs, founders, or whoever is driving experiments — Remus is built for the person connecting metrics to product decisions.' },
              { q:'Can I use Remus if my data is messy?', a:'Yes — that’s the point. Start with a few funnels and metrics, improve definitions over time, and let Remus help you refine what you track.' },
            ].map(item=> (
              <div key={item.q} className="rounded-lg border border-border bg-card p-4">
                <h3 className="mb-1 font-medium">{item.q}</h3>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-surface">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <div className="rounded-lg border border-border bg-card p-8">
            <h2 className="mb-2 text-2xl font-semibold">Pick the metrics that matter — let Remus handle the rest.</h2>
            <p className="mb-6 text-muted-foreground">Define a couple of funnels, add a test or two, and see what you learn in your first week. You don’t need perfect data — just a starting point.</p>
            <div className="flex items-center justify-center gap-3">
              <Link href="/overview" className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">Open Remus dashboard</Link>
              <Link href="/about" className="text-sm text-primary underline">Learn more about how Remus works</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
