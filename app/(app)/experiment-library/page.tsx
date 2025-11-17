'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEmaStore } from '@/lib/store';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function ExperimentLibraryPage() {
  const experiments = useEmaStore((s) => s.experiments);
  const search = useSearchParams();
  const tab = (search.get('tab') || 'library') as 'library'|'suggestions';
  const suggestions = useEmaStore((s)=> s.suggestions);
  const [openId, setOpenId] = useState<string|null>(null);
  const funnels = useEmaStore((s) => s.funnels);
  const addExperiment = useEmaStore((s) => s.addExperiment);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    outcome: 'Planned' as 'Win' | 'Neutral' | 'Loss' | 'Running' | 'Planned' | 'Archived',
    funnelId: '' as string | null,
    primaryMetric: '',
    resultSummary: '',
    keyLearning: '',
    owner: 'Owner',
  });

  // Filters
  const [outcome, setOutcome] = useState<'All' | 'Win' | 'Neutral' | 'Loss' | 'Running' | 'Planned' | 'Archived'>('All');
  const [funnelFilter, setFunnelFilter] = useState<string | 'All'>('All');
  const [q, setQ] = useState('');

  const filtered = experiments.filter((e) => {
    if (outcome !== 'All' && e.outcome !== outcome) return false;
    if (funnelFilter !== 'All' && e.funnelId !== funnelFilter) return false;
    const hay = (e.name + ' ' + e.resultSummary + ' ' + e.keyLearning).toLowerCase();
    if (q && !hay.includes(q.toLowerCase())) return false;
    return true;
  });

  const funnelName = (id: string | null) => (id ? funnels.find((f) => f.id === id)?.name ?? '—' : '—');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Experiment Library</h1>
        <div className="flex items-center gap-2 text-sm">
          <Link href={{ pathname:'/experiment-library', query:{ tab:'library' } }} className={`rounded-full px-2 py-1 ${tab==='library'?'bg-primary text-primary-foreground':'bg-secondary'}`}>Library</Link>
          <Link href={{ pathname:'/experiment-library', query:{ tab:'suggestions' } }} className={`rounded-full px-2 py-1 ${tab==='suggestions'?'bg-primary text-primary-foreground':'bg-secondary'}`}>Suggestions</Link>
        </div>
      </div>
        <Button onClick={() => setOpen(true)}>+ Add Experiment</Button>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card p-3 text-sm">
        <div className="flex items-center gap-1">
          {(['All', 'Win', 'Neutral', 'Loss', 'Running', 'Planned', 'Archived'] as const).map((x) => (
            <button
              key={x}
              onClick={() => setOutcome(x)}
              className={`rounded-full px-3 py-1 ${outcome === x ? 'bg-primary/20 text-primary' : 'bg-secondary'}`}
            >
              {x}
            </button>
          ))}
        </div>
        <select
          className="rounded-md bg-secondary px-2 py-1"
          value={funnelFilter}
          onChange={(e) => setFunnelFilter(e.target.value as any)}
        >
          <option value="All">All Funnels</option>
          {funnels.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>
        <input
          className="ml-auto rounded-md bg-secondary px-2 py-1"
          placeholder="Search..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {tab==='library' && (
      <div className="rounded-lg border border-border bg-card">
        <div className="divide-y divide-border">
          {filtered.map((e) => (
            <Link
              key={e.id}
              href={`/experiment-library/${e.id}`}
              className="flex items-center justify-between px-4 py-3 transition hover:bg-secondary/40"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">{e.name}</p>
                <p className="truncate text-sm text-muted-foreground">{e.resultSummary}</p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">{e.outcome}</span>
                <span className="hidden rounded-full bg-accent/10 px-3 py-1 text-accent sm:inline">
                  {funnelName(e.funnelId)}
                </span>
                {e.completedAt && <span className="rounded-full bg-secondary px-3 py-1">{e.completedAt}</span>}
                <span className="rounded-full bg-secondary px-3 py-1">Owner: {e.owner}</span>
                {e.primaryMetric && <span className="rounded-full bg-secondary px-3 py-1">{e.primaryMetric}</span>}
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div className="px-4 py-6 text-sm text-muted-foreground">No experiments match your filters.</div>
          )}
        </div>
      </div>
     )}

     {tab==='suggestions' && (
       <div className="rounded-lg border border-border bg-card p-4 text-sm">
         <div className="mb-2 text-muted-foreground">Experiment Suggestions</div>
         <div className="space-y-2">
           {suggestions.map(s=> (
             <Link key={s.id} href={{ pathname:'/experiment-suggestions', query:{ suggestionId: s.id } }} className="flex items-center justify-between rounded-md border border-border px-3 py-2 hover:bg-secondary/40">
               <div className="min-w-0">
                 <div className="font-medium truncate">{s.title}</div>
                 <div className="text-xs text-muted-foreground truncate">{s.hypothesis}</div>
               </div>
               <div className="flex items-center gap-2 text-xs">
                 <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">{s.priority}</span>
                 <span className="rounded-full bg-accent/10 px-2 py-0.5 text-accent">{s.impact}</span>
                 <span className="rounded-full bg-secondary px-2 py-0.5">{s.effort} effort</span>
               </div>
             </Link>
           ))}
           {suggestions.length===0 && <div className="text-muted-foreground">No suggestions.</div>}
         </div>
       </div>
     )}

      {/* Deep-dive Suggestion modal */}
      {openId && (()=>{ const s = suggestions.find(x=>x.id===openId); if (!s) return null; return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={()=>setOpenId(null)}>
          <div className="w-full max-w-2xl rounded-lg border border-border bg-card p-4" onClick={(e)=>e.stopPropagation()}>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <button onClick={()=>setOpenId(null)} className="text-sm text-muted-foreground">Close</button>
            </div>
            <div className="text-sm text-muted-foreground mb-3">{s.hypothesis}</div>
            <div className="h-48 w-full rounded-md border border-border bg-background/40 mb-4 flex items-center justify-center text-xs text-muted-foreground">Before vs Expected After chart</div>
            <div className="flex items-center gap-2 text-xs mb-3">
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">{s.priority}</span>
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-accent">Impact {s.impact}</span>
              <span className="rounded-full bg-secondary px-2 py-0.5">Effort {s.effort}</span>
              <span className="rounded-full bg-secondary px-2 py-0.5">Primary {s.primaryMetric}</span>
            </div>
            <div className="flex items-center justify-between">
              <Link href={{ pathname:'/copilot-workspace', query:{ suggestionId: s.id } }} className="text-primary underline text-sm">Discuss with Copilot</Link>
              <Button size="sm" onClick={()=>setOpenId(null)}>Close</Button>
            </div>
          </div>
        </div>
      ); })()}

      {/* Add Experiment */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Experiment</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <label className="col-span-1 text-muted-foreground">Name</label>
            <input
              className="col-span-2 rounded-md bg-secondary px-2 py-1"
              value={form.name}
              onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))}
            />
            <label className="col-span-1 text-muted-foreground">Outcome</label>
            <select
              className="col-span-2 rounded-md bg-secondary px-2 py-1"
              value={form.outcome}
              onChange={(e) => setForm((v) => ({ ...v, outcome: e.target.value as any }))}
            >
              <option>Win</option>
              <option>Neutral</option>
              <option>Loss</option>
              <option>Running</option>
              <option>Planned</option>
              <option>Archived</option>
            </select>
            <label className="col-span-1 text-muted-foreground">Funnel</label>
            <select
              className="col-span-2 rounded-md bg-secondary px-2 py-1"
              value={form.funnelId ?? ''}
              onChange={(e) => setForm((v) => ({ ...v, funnelId: e.target.value || null }))}
            >
              <option value="">(none)</option>
              {funnels.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
            <label className="col-span-1 text-muted-foreground">Primary metric</label>
            <input
              className="col-span-2 rounded-md bg-secondary px-2 py-1"
              value={form.primaryMetric}
              onChange={(e) => setForm((v) => ({ ...v, primaryMetric: e.target.value }))}
            />
            <label className="col-span-1 text-muted-foreground">Result summary</label>
            <input
              className="col-span-2 rounded-md bg-secondary px-2 py-1"
              value={form.resultSummary}
              onChange={(e) => setForm((v) => ({ ...v, resultSummary: e.target.value }))}
            />
            <label className="col-span-1 text-muted-foreground">Key learning</label>
            <input
              className="col-span-2 rounded-md bg-secondary px-2 py-1"
              value={form.keyLearning}
              onChange={(e) => setForm((v) => ({ ...v, keyLearning: e.target.value }))}
            />
            <label className="col-span-1 text-muted-foreground">Owner</label>
            <input
              className="col-span-2 rounded-md bg-secondary px-2 py-1"
              value={form.owner}
              onChange={(e) => setForm((v) => ({ ...v, owner: e.target.value }))}
            />
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                const id = `exp_${Date.now().toString(36)}`;
                addExperiment({ id, ...form, completedAt: undefined });
                setOpen(false);
                setForm({ name: '', outcome: 'Planned', funnelId: '', primaryMetric: '', resultSummary: '', keyLearning: '', owner: 'Owner' });
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
