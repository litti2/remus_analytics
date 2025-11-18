export default function Personas() {
  const cols = [
    { title:'Early-stage startups', bullets:['Just starting to instrument signups and onboarding.','No dedicated analytics engineer.','Want funnels explained in plain language.'] },
    { title:'Small growth/marketing teams', bullets:['Run experiments but results are scattered.','Single place to track funnels, tests, and learnings.','Simple way to prioritize what to work on next.'] },
    { title:'Agencies & consultants', bullets:['Lightweight experimentation hub for multiple clients.','Capture learnings per client without heavy tracking plans.','Share histories across projects.'] },
  ];
  return (
    <section id="usecases" className="border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-6 text-center text-2xl font-semibold">Who Remus is for</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {cols.map((c) => (
            <div key={c.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="mb-2 font-medium">{c.title}</h3>
              <ul className="list-disc pl-5 text-sm text-white/75">
                {c.bullets.map(b => <li key={b}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
