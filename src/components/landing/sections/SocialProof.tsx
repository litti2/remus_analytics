export default function SocialProof() {
  return (
    <section className="border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <p className="text-center text-sm text-white/70">Remus is designed for teams who want to run real growth experiments before they have a full analytics team.</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-6 opacity-80">
          {['Acme','Nova','Orbit','Northwind','Lumos'].map((n)=> (
            <span key={n} className="text-white/60 transition hover:text-white">{n}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
