import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section id="final" className="relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_20rem_at_50%_0%,rgba(99,102,241,0.25),transparent_60%),radial-gradient(40rem_20rem_at_60%_50%,rgba(20,184,166,0.20),transparent_60%)]" />
      <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-10 backdrop-blur">
          <h2 className="text-2xl font-semibold">Pick the metrics that matter — let Remus handle the rest.</h2>
          <p className="mx-auto mt-2 max-w-2xl text-white/70">Define a couple of funnels, add a test or two, and see what you learn in your first week.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href="/overview" className="rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-[#0b1020] shadow-[0_0_0_1px_rgba(255,255,255,0.2)] transition-transform hover:scale-105 active:scale-95">Open Remus dashboard</Link>
            <Link href="/experiment-suggestions" className="text-sm text-white/90 underline">Learn more about how Remus works</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
