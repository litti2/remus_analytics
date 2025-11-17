'use client';
import Link from 'next/link';
import { useEmaStore } from '@/lib/store';

export default function FunnelExplorerPage() {
  const funnels = useEmaStore((s) => s.funnels);
  const total = funnels.length;
  const totalImpressions = funnels.reduce((a,f)=>a+(f.impressions||0),0);
  const totalClicks = funnels.reduce((a,f)=>a+(f.clicks||0),0);
  const avgCtr = totalImpressions ? (totalClicks/totalImpressions) : 0;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-4"><p className="text-xs text-muted-foreground">Total Funnels</p><p className="text-2xl font-bold">{total}</p></div>
        <div className="rounded-lg border border-border bg-card p-4"><p className="text-xs text-muted-foreground">Impressions</p><p className="text-2xl font-bold">{totalImpressions.toLocaleString()}</p></div>
        <div className="rounded-lg border border-border bg-card p-4"><p className="text-xs text-muted-foreground">Clicks</p><p className="text-2xl font-bold">{totalClicks.toLocaleString()}</p></div>
        <div className="rounded-lg border border-border bg-card p-4"><p className="text-xs text-muted-foreground">Avg CTR</p><p className="text-2xl font-bold">{(avgCtr*100).toFixed(1)}%</p></div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {funnels.map((f) => (
          <Link key={f.id} href={`/funnel-explorer/${f.id}`} className="rounded-lg border border-border bg-card p-4 hover:bg-secondary/40 transition">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold truncate">{f.name}</h3>
                  {(f.tags||[]).slice(0,2).map(t=> <span key={t} className="rounded-full bg-secondary px-2 py-0.5 text-xs">{t}</span>)}
                </div>
                <p className="text-sm text-muted-foreground truncate">{f.description}</p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">{f.northStarMetric}</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-accent">{f.dataSource.toUpperCase()}</span>
              <span className="rounded-full bg-secondary px-2 py-0.5">Imp {f.impressions?.toLocaleString?.()||'—'}</span>
              <span className="rounded-full bg-secondary px-2 py-0.5">Clk {f.clicks?.toLocaleString?.()||'—'}</span>
              {f.impressions ? <span className="rounded-full bg-secondary px-2 py-0.5">CTR {(((f.clicks||0)/f.impressions)*100).toFixed(1)}%</span> : null}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
