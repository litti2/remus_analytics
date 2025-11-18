export default function Problem() {
  return (
    <section id="problem" className="border-b border-white/10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-16 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
          <h3 className="mb-2 text-2xl font-semibold">Small teams are drowning in analytics tools they don’t need yet.</h3>
          <ul className="list-disc space-y-2 pl-5 text-white/70">
            <li>You have GA, maybe Mixpanel, maybe nothing — but no one trusts the numbers.</li>
            <li>Dashboards are full of metrics that don’t map to your actual funnel.</li>
            <li>Experiment ideas live in Notion docs, Slack threads, and people’s heads.</li>
            <li>Everyone is guessing: “Should we fix onboarding, pricing, or emails?”</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
          <h3 className="mb-2 text-2xl font-semibold">What you actually need</h3>
          <ul className="list-disc space-y-2 pl-5 text-white/70">
            <li>A simple way to define your own funnels and metrics.</li>
            <li>A way to track a few A/B tests without an entire experimentation platform.</li>
            <li>A place to capture experiment ideas, outcomes, and learnings.</li>
            <li>An assistant that turns your metrics into “what to do next,” not more charts.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
