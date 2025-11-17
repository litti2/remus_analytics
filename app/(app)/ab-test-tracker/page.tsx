'use client';
import Link from 'next/link';
import { useEmaStore } from '@/lib/store';

export default function AbTestTrackerPage() {
  const groups = useEmaStore((s) => s.abTestGroups);
  const funnels = useEmaStore((s) => s.funnels);
  const total = groups.length;
  const running = groups.filter((g) => g.status === 'running').length;
  const planned = groups.filter((g) => g.status === 'planned').length;
  const completed = groups.filter((g) => g.status === 'completed').length;

  const getFunnelName = (id: string | null) => (id ? funnels.find((f) => f.id === id)?.name ?? '—' : '—');

  const avgLift = (()=>{
    const completed = groups.filter(g=>g.status==='completed');
    if (!completed.length) return 0;
    return Math.round((completed.length*3)/completed.length); // mock
  })();
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Total Tests</p>
          <p className="text-2xl font-bold">{total}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Running</p>
          <p className="text-2xl font-bold text-teal-400">{running}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Planned</p>
          <p className="text-2xl font-bold">{planned}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold text-indigo-400">{completed}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Avg Lift (Completed)</p>
          <p className="text-2xl font-bold text-teal-400">{avgLift}%</p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-base font-semibold">A/B Test Groups</h2>
        </div>
        <div className="divide-y divide-border">
          {groups.map((g) => (
            <Link key={g.id} href={`/ab-test-tracker/${g.id}`} className="block px-4 py-3 hover:bg-secondary/40 transition">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-medium">{g.name}</p>
                    {(g.tags||[]).slice(0,2).map(t=> <span key={t} className="rounded-full bg-secondary px-2 py-0.5 text-xs">{t}</span>)}
                  </div>
                  <p className="truncate text-sm text-muted-foreground">{g.hypothesis}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full bg-secondary px-2 py-0.5">Imp {g.impressions?.toLocaleString?.()||'—'}</span>
                    <span className="rounded-full bg-secondary px-2 py-0.5">Clk {g.clicks?.toLocaleString?.()||'—'}</span>
                    {g.impressions ? <span className="rounded-full bg-secondary px-2 py-0.5">CTR {(((g.clicks||0)/g.impressions)*100).toFixed(1)}%</span> : null}
                    <span className="rounded-full bg-accent/10 px-2 py-0.5 text-accent">{getFunnelName(g.funnelId)}</span>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary capitalize">{g.status}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {groups.length === 0 && <div className="px-4 py-6 text-sm text-muted-foreground">No test groups.</div>}
        </div>
      </div>
    </div>
  );
}
