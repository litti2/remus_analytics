'use client';
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useEmaStore } from '@/lib/store';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis } from 'recharts';
import Sparkline from '@/components/ui/Sparkline';

export default function OverviewPage() {
  type View = 'all'|'top'|'attention';
  type Kind = 'both'|'funnels'|'tests';
  const [view,setView] = useState<View>('all');
  const [kind,setKind] = useState<Kind>('both');
  const funnels = useEmaStore((s) => s.funnels);
  const runningTests = useEmaStore((s) => s.abTestGroups.filter((g) => g.status === 'running'));
  const p0Suggestions = useEmaStore((s) => s.suggestions.filter((x) => x.priority === 'P0'));
  const series = useEmaStore((s) => s.activationTimeSeries);
  const last14 = series.slice(-14).map((d, i) => ({ x: i, y: d.conversionRate }));
  const trendUp = last14.length > 1 && last14[last14.length - 1].y >= last14[0].y;

  return (
    <div className="space-y-6">
      {/* Top KPI cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Link href="/funnel-explorer" className="rounded-lg border border-border bg-card p-4 hover:bg-secondary/40 transition">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Active Funnels</p>
            <h3 className="text-2xl font-bold">{funnels.length}</h3>
            <p className="text-xs text-muted-foreground">Click to explore funnels</p>
          </div>
        </Link>
        <Link href="/ab-test-tracker" className="rounded-lg border border-border bg-card p-4 hover:bg-secondary/40 transition">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Running Tests</p>
            <h3 className="text-2xl font-bold">{runningTests.length}</h3>
            <p className="text-xs text-muted-foreground">Click to view tracker</p>
          </div>
        </Link>
        <Link href={{ pathname: '/experiment-suggestions', query: { priority: 'P0' } }} className="rounded-lg border border-border bg-card p-4 hover:bg-secondary/40 transition">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">P0 Suggestions</p>
            <h3 className="text-2xl font-bold">{p0Suggestions.length}</h3>
            <p className="text-xs text-muted-foreground">Click to view P0s</p>
          </div>
        </Link>
      </div>

      {/* Time-series chart */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">Trial → Paid Conversion (Last 30d)</h3>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series} margin={{ left: 12, right: 12 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" hide={false} tick={{ fontSize: 12 }} />
              <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(v)=>`${Math.round(v*100)}%`} width={40} />
              <RTooltip formatter={(v: number)=>`${Math.round(v*100)}%`} />
              <Area type="monotone" dataKey="conversionRate" stroke="hsl(var(--indigo))" fill="hsl(var(--indigo))" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Funnels */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between p-4">
          <div>
            <h3 className="text-base font-semibold">Active Funnels</h3>
            <p className="text-sm text-muted-foreground">Quick access to your core funnels</p>
          </div>
          <Link href="/funnel-explorer" className="text-sm text-primary underline">View All</Link>
        </div>
        <div className="divide-y divide-border">
          {funnels.map((f) => (
            <Link key={f.id} href={`/funnel-explorer/${f.id}`} className="flex items-center justify-between px-4 py-3 hover:bg-secondary/40 transition">
              <div className="min-w-0">
                <p className="truncate font-medium">{f.name}</p>
                <p className="truncate text-sm text-muted-foreground">{f.description}</p>
              </div>
              <div className="flex items-center gap-3">
               {(f.tags||[]).slice(0,2).map(t=> <span key={t} className="hidden rounded-full bg-secondary px-2 py-0.5 text-xs sm:inline">{t}</span>)}
               <span className="hidden rounded-full bg-primary/10 px-3 py-1 text-xs text-primary sm:inline">{f.northStarMetric}</span>
               <span className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">{f.dataSource.toUpperCase()}</span>
               {f.impressions ? <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">Imp {f.impressions.toLocaleString()}</span> : null}
               {f.clicks ? <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">Clk {f.clicks.toLocaleString()}</span> : null}
               {f.impressions ? <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">CTR {(((f.clicks||0)/f.impressions)*100).toFixed(1)}%</span> : null}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Running Experiments */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between p-4">
          <div>
            <h3 className="text-base font-semibold">Running Experiments</h3>
            <p className="text-sm text-muted-foreground">Live A/B tests across funnels</p>
          </div>
          <Link href="/ab-test-tracker" className="text-sm text-primary underline">View All</Link>
        </div>
        <div className="divide-y divide-border">
          {runningTests.map((g) => (
            <Link key={g.id} href={`/ab-test-tracker/${g.id}`} className="flex items-center justify-between px-4 py-3 hover:bg-secondary/40 transition">
              <div className="min-w-0">
                <p className="truncate font-medium">{g.name}</p>
                <p className="truncate text-sm text-muted-foreground">{g.hypothesis}</p>
              </div>
              <div className="flex items-center gap-2">
               {(g.tags||[]).slice(0,2).map(t=> <span key={t} className="hidden rounded-full bg-secondary px-2 py-0.5 text-xs sm:inline">{t}</span>)}
               <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary capitalize">{g.status}</span>
               <span className="hidden rounded-full bg-accent/10 px-3 py-1 text-xs text-accent sm:inline">{g.primaryMetric}</span>
               {g.impressions ? <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">Imp {g.impressions.toLocaleString()}</span> : null}
               {g.clicks ? <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">Clk {g.clicks.toLocaleString()}</span> : null}
               {g.impressions ? <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">CTR {(((g.clicks||0)/g.impressions)*100).toFixed(1)}%</span> : null}
              </div>
            </Link>
          ))}
          {runningTests.length === 0 && (
            <div className="px-4 py-6 text-sm text-muted-foreground">No running tests right now.</div>
          )}
        </div>
      </div>

      {/* High Priority Suggestions */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between p-4">
          <div>
            <h3 className="text-base font-semibold">High Priority Suggestions</h3>
            <p className="text-sm text-muted-foreground">Top recommendations to improve conversion</p>
          </div>
          <Link href="/experiment-suggestions" className="text-sm text-primary underline">View All</Link>
        </div>
        <div className="divide-y divide-border">
          {p0Suggestions.map((s) => (
            <Link key={s.id} href={{ pathname: '/experiment-suggestions', query: { suggestionId: s.id } }} className="flex items-center justify-between px-4 py-3 hover:bg-secondary/40 transition">
              <div className="min-w-0">
                <p className="truncate font-medium">{s.title}</p>
                <p className="truncate text-sm text-muted-foreground">{s.hypothesis}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">{s.priority}</span>
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">{s.impact} impact</span>
              </div>
            </Link>
          ))}
          {p0Suggestions.length === 0 && (
            <div className="px-4 py-6 text-sm text-muted-foreground">No P0 suggestions right now.</div>
          )}
        </div>
      </div>
      {/* Top Performing & Needs Attention */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

      {/* Top Performing */}
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold">Top Performing</h3>
          </div>
          <div className="space-y-3">
            {funnels.slice(0,3).map((f) => (
              <Link key={f.id} href={`/funnel-explorer/${f.id}`} className="flex items-center justify-between rounded-md border border-border px-3 py-2 hover:bg-secondary/40">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-medium">{f.name}</p>
                    {(f.tags||[]).slice(0,2).map(t=> (
                      <span key={t} className="rounded-full bg-secondary px-2 py-0.5 text-xs">{t}</span>
                    ))}
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{f.description}</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-accent">{f.dataSource.toUpperCase()}</span>
                  <span className="rounded-full bg-secondary px-2 py-0.5">Imp {f.impressions?.toLocaleString?.()||'—'}</span>
                  <span className="rounded-full bg-secondary px-2 py-0.5">Clk {f.clicks?.toLocaleString?.()||'—'}</span>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">{f.northStarMetric}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Needs Attention */}
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold">Needs Attention</h3>
          </div>
          <div className="space-y-3">
            {runningTests.slice(0,3).map((g) => (
              <Link key={g.id} href={`/ab-test-tracker/${g.id}`} className="flex items-center justify-between rounded-md border border-border px-3 py-2 hover:bg-secondary/40">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-medium">{g.name}</p>
                    {(g.tags||[]).slice(0,2).map(t=> (
                      <span key={t} className="rounded-full bg-secondary px-2 py-0.5 text-xs">{t}</span>
                    ))}
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{g.hypothesis}</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary capitalize">{g.status}</span>
                  <span className="rounded-full bg-secondary px-2 py-0.5">Imp {g.impressions?.toLocaleString?.()||'—'}</span>
                  <span className="rounded-full bg-secondary px-2 py-0.5">Clk {g.clicks?.toLocaleString?.()||'—'}</span>
                </div>
              </Link>
            ))}
            {runningTests.length===0 && <div className="text-sm text-muted-foreground">No tests need attention.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
