'use client';
import { Suspense } from 'react';
import { useMemo, useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEmaStore } from '@/lib/store';
import { Button } from '@/components/ui/button';

function ExperimentSuggestionsPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const funnels = useEmaStore((s) => s.funnels);
  const raw = useEmaStore((s) => s.suggestions);
  const addGroup = useEmaStore((s) => s.addAbTestGroup);
  const addVariant = useEmaStore((s) => s.addVariant);

  // Filters
  const [funnelId, setFunnelId] = useState<string | 'all'>('all');
  const [p0Only, setP0Only] = useState(false);
  const [highImpact, setHighImpact] = useState(false);
  const [lowEffort, setLowEffort] = useState(false);
  const [q, setQ] = useState('');

  // Deep-linking
  const suggestedPriority = searchParams.get('priority');
  const highlightId = searchParams.get('suggestionId');
  const highlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (highlightId && highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const el = highlightRef.current;
      el.classList.add('ring-2','ring-primary');
      const t = setTimeout(() => el.classList.remove('ring-2','ring-primary'), 2500);
      return () => clearTimeout(t);
    }
  }, [highlightId]);

  useEffect(() => {
    if (suggestedPriority === 'P0') setP0Only(true);
  }, [suggestedPriority]);

  const filtered = useMemo(() => {
    return raw.filter(s => {
      if (funnelId !== 'all' && s.funnelId !== funnelId) return false;
      if (p0Only && s.priority !== 'P0') return false;
      if (highImpact && s.impact !== 'High') return false;
      if (lowEffort && s.effort !== 'Low') return false;
      const hay = (s.title + ' ' + s.hypothesis + ' ' + s.rationale + ' ' + s.stepName).toLowerCase();
      if (q && !hay.includes(q.toLowerCase())) return false;
      return true;
    });
  }, [raw, funnelId, p0Only, highImpact, lowEffort, q]);

  // Create AB Test from suggestion
  const createAbFromSuggestion = (id: string) => {
    const s = raw.find(x => x.id === id);
    if (!s) return;
    const gid = `g_${Date.now().toString(36)}`;
    addGroup({ id: gid, name: s.title, hypothesis: s.hypothesis + ' ' + s.rationale, funnelId: s.funnelId, status: 'planned', primaryMetric: s.primaryMetric, guardrailMetrics: s.guardrailMetrics, owner: 'Ema Team' });
    addVariant({ id: `v_${Date.now().toString(36)}`, groupId: gid, label: 'A', name: 'Control', description: 'Default', isControl: true, trafficAllocation: 100, impressions: 0, conversions: 0, conversionRate: 0 });
    router.push(`/ab-test-tracker/${gid}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Experiment Suggestions</h1>
      </div>

      {/* Filters */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <select className="rounded-md bg-secondary px-3 py-2" value={funnelId} onChange={e=>setFunnelId(e.target.value as any)}>
            <option value="all">All Funnels</option>
            {funnels.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select>
          <button onClick={()=>setP0Only(v=>!v)} className={`rounded-full px-3 py-1 ${p0Only?'bg-primary/20 text-primary':'bg-secondary text-foreground'}`}>P0 Only</button>
          <button onClick={()=>setHighImpact(v=>!v)} className={`rounded-full px-3 py-1 ${highImpact?'bg-primary/20 text-primary':'bg-secondary text-foreground'}`}>High Impact</button>
          <button onClick={()=>setLowEffort(v=>!v)} className={`rounded-full px-3 py-1 ${lowEffort?'bg-primary/20 text-primary':'bg-secondary text-foreground'}`}>Low Effort</button>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." className="ml-auto rounded-md bg-secondary px-3 py-2 outline-none" />
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.map((s) => {
          const isTop = s.id === 'sug1' || s.id === 'sug2'; // pin 1st and 3rd suggestions
          const card = (
            <div key={s.id} ref={highlightId===s.id ? highlightRef : null} className="rounded-lg border border-border bg-card p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold">{s.title}</h3>
                <div className="flex items-center gap-2 text-xs">
                  {isTop && <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-indigo-300">Top</span>}
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">{s.priority}</span>
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-accent">{s.impact}</span>
                  <span className="rounded-full bg-secondary px-2 py-0.5">{s.effort} effort</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{s.hypothesis}</p>
              <div className="mt-3 flex items-center gap-2 text-xs">
                <span className="rounded-full bg-secondary px-2 py-0.5">Step: {s.stepName}</span>
                <span className="rounded-full bg-secondary px-2 py-0.5">Primary: {s.primaryMetric}</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Link href={{ pathname: '/experiment-suggestions', query: { suggestionId: s.id } }} className="text-sm text-primary underline">Deep-link</Link>
                <Button size="sm" onClick={()=>createAbFromSuggestion(s.id)}>Create A/B Test</Button>
              </div>
            </div>
          );
          return card;
        })}
        {filtered.length === 0 && <div className="text-sm text-muted-foreground">No suggestions match your filters.</div>}
      </div>
    </div>
  );
}

export default function ExperimentSuggestionsPage() {
  return (
    <Suspense fallback={null}>
      <ExperimentSuggestionsPageInner />
    </Suspense>
  );
}
