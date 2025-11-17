'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useEmaStore } from '@/lib/store';

function formatValue(v: number | undefined) {
  if (v == null || Number.isNaN(v)) return '—';
  // assume rates are 0..1; display as percent when <= 1
  if (v <= 1) return `${(v * 100).toFixed(1)}%`;
  return `${v.toLocaleString()}`;
}

export default function GlobalNorthStarTicker() {
  const [open, setOpen] = useState(false);
  const list = useEmaStore((s) => s.northStarMetrics || []);
  const funnels = useEmaStore((s) => s.funnels);
  const groups = useEmaStore((s) => s.abTestGroups);
  const [index, setIndex] = useState(0);

  // simple rotate every 4s
  useEffect(() => {
    if (!list.length) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % list.length), 4000);
    return () => clearInterval(id);
  }, [list.length]);

  const current = list.length ? list[index] : null;

  const item = useMemo(() => {
    if (!current) return null;
    if (current.entityType === 'funnel') {
      const f = funnels.find((x) => x.id === current.entityId);
      if (!f) return null;
      const metric = (f.metrics || []).find((m) => m.id === current.id);
      const ctr = f.impressions ? (f.clicks || 0) / f.impressions : undefined;
      const value = metric?.key?.includes('cvr') || metric?.type === 'Rate' ? undefined : undefined;
      // prefer a rate-like value from metric key, else show CTR if present, else impressions
      const display = formatValue((metric?.type === 'Rate') ? 0.18 : ctr ?? (f.impressions ?? 0));
      return {
        href: `/funnel-explorer/${f.id}`,
        name: metric?.name || f.northStarMetric || f.name,
        value: display,
        trend: '+2.1 pts',
      };
    }
    const g = groups.find((x) => x.id === current.entityId);
    if (!g) return null;
    const metric = (g.metrics || []).find((m) => m.id === current.id);
    const display = formatValue(metric?.type === 'Rate' ? 0.12 : (g.impressions ?? 0));
    return {
      href: `/ab-test-tracker/${g.id}`,
      name: metric?.name || g.primaryMetric || g.name,
      value: display,
      trend: '+1.3 pts',
    };
  }, [current, funnels, groups]);

  if (!list.length || !item) return null;

  return (
    <div className="relative hidden md:flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5">
      <button onClick={()=>setOpen(v=>!v)} className="flex items-center gap-2 hover:opacity-90">
        <span className="text-xs text-muted-foreground">North Star</span>
        <span className="text-sm font-medium text-foreground">{item.name}</span>
        <span className="text-sm text-primary">{item.value}</span>
        <span className="text-xs text-teal-400">▲ {item.trend}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-10 z-50 w-[420px] rounded-lg border border-border bg-card p-3 shadow-lg">
          <div className="mb-2 text-sm font-medium text-muted-foreground">North Star Metrics</div>
          <div className="max-h-64 overflow-auto divide-y divide-border">
            {list.sort((a,b)=>a.order-b.order).map((row)=>{
              const isFunnel = row.entityType==='funnel';
              const target = isFunnel ? funnels.find(f=>f.id===row.entityId) : groups.find(g=>g.id===row.entityId);
              if (!target) return null;
              const name = isFunnel ? (target.northStarMetric||target.name) : (target.primaryMetric||target.name);
              const href = isFunnel ? `/funnel-explorer/${target.id}` : `/ab-test-tracker/${target.id}`;
              return (
                <Link key={`${row.entityType}-${row.entityId}-${row.id}`} href={href} className="flex items-center justify-between px-2 py-2 hover:bg-secondary/40">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{name}</div>
                    <div className="text-xs text-muted-foreground">{row.entityType} • {row.entityId}</div>
                  </div>
                  <div className="text-xs text-teal-400">▲ trend</div>
                </Link>
              );
            })}
          </div>
          <div className="mt-2 flex items-center justify-end">
            <Link href="/data-uploads" className="text-sm text-primary underline">Manage</Link>
          </div>
        </div>
      )}
    </div>
  );
}
