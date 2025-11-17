'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEmaStore } from '@/lib/store';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis, LineChart, Line, Legend } from 'recharts';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';

export default function AbGroupDetailPage() {
  const [editOpen, setEditOpen] = useState(false);
  const [variantOpen, setVariantOpen] = useState<string | null>(null);

  const params = useParams<{ groupId: string }>();
  const groupId = params.groupId;
  const group = useEmaStore((s) => s.abTestGroups.find((g) => g.id === groupId));
const deleteGroup = useEmaStore(s=>s.deleteAbTestGroup);
  const variants = useEmaStore((s) => s.getVariantsForGroup(groupId));
  const funnels = useEmaStore((s) => s.funnels);

  if (!group) return <div className="p-6">Group not found</div>;
  const funnelName = group.funnelId ? (funnels.find((f) => f.id === group.funnelId)?.name ?? '—') : '—';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{group.name}</h1>
          <p className="text-muted-foreground">{group.hypothesis}</p>
        </div>
        <Link className="text-primary underline" href="/ab-test-tracker">Back to list</Link>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Button size="sm" variant="secondary" onClick={()=>setEditOpen(true)}>Edit Group</Button>

          <span className="rounded-full bg-primary/10 px-3 py-1 text-primary capitalize">{group.status}</span>
          <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">{funnelName}</span>
          <span className="rounded-full bg-secondary px-3 py-1">{group.primaryMetric}</span>
          {group.guardrailMetrics.map((m) => (
            <span key={m} className="rounded-full bg-secondary px-3 py-1">{m}</span>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">Variant Conversion Rates</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={variants.map(v => ({ label: v.label, rate: Math.round(v.conversionRate * 1000)/10 }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" />
              <YAxis unit="%" stroke="hsl(var(--muted-foreground))" />
              <RTooltip formatter={(v: number)=>`${v}%`} />
              <Bar dataKey="rate" fill="hsl(var(--teal))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Attachments */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">Attachments</h3>
        <div className="text-sm text-muted-foreground">Add links to docs or screenshots in your analysis.</div>
      </div>

      {/* Variant table */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="mb-2 text-sm font-medium text-muted-foreground">Variants</div>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr className="text-left">
                <th className="px-2 py-1">Label</th>
                <th className="px-2 py-1">Name</th>
                <th className="px-2 py-1">Description</th>
                <th className="px-2 py-1">Impr</th>
                <th className="px-2 py-1">Clicks</th>
                <th className="px-2 py-1">Conv</th>
                <th className="px-2 py-1">CVR</th>
                <th className="px-2 py-1">Lift</th>
                <th className="px-2 py-1">p-val</th>
                <th className="px-2 py-1">Links</th>
                <th className="px-2 py-1">Screenshot</th>
              </tr>
            </thead>
            <tbody>
              {variants.map(v=> (
                <tr key={v.id} className="border-t border-border">
                  <td className="px-2 py-1">{v.label}{v.isControl && ' (Control)'}</td>
                  <td className="px-2 py-1">{v.name}</td>
                  <td className="px-2 py-1">{v.description}</td>
                  <td className="px-2 py-1">{v.impressions.toLocaleString()}</td>
                  <td className="px-2 py-1">—</td>
                  <td className="px-2 py-1">{v.conversions.toLocaleString()}</td>
                  <td className="px-2 py-1">{(v.conversionRate*100).toFixed(1)}%</td>
                  <td className="px-2 py-1">{typeof v.liftVsControl==='number' ? `${(v.liftVsControl*100).toFixed(1)}%` : '—'}</td>
                  <td className="px-2 py-1">{v.pValue ?? '—'}</td>
                  <td className="px-2 py-1"><a className="text-primary underline" href="#">Add</a></td>
                  <td className="px-2 py-1"><a className="text-primary underline" href="#">Add</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {variants.map((v) => (
          <div key={v.id} className="rounded-lg border border-border bg-card p-4">
            <div className="mb-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-sm">{v.label}</span>
                <span className="font-medium">{v.name}</span>
              </div>
              {v.isControl && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">Control</span>}
            </div>
            <p className="text-sm text-muted-foreground">{v.description}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <Button size="sm" variant="secondary" onClick={()=>setVariantOpen(v.id)}>Edit</Button>
              <div><span className="text-muted-foreground">Traffic:</span> {v.trafficAllocation}%</div>
              <div><span className="text-muted-foreground">Impr:</span> {v.impressions.toLocaleString()}</div>
              <div><span className="text-muted-foreground">Conv:</span> {v.conversions.toLocaleString()}</div>
              <div><span className="text-muted-foreground">CVR:</span> {(Math.round(v.conversionRate * 1000)/10)}%</div>
              {typeof v.liftVsControl === 'number' && (
                <div className={v.liftVsControl >= 0 ? 'text-teal-400' : 'text-amber-400'}>
                  <span className="text-muted-foreground">Lift:</span> {Math.round(v.liftVsControl*1000)/10}%
                </div>
              )}
              {typeof v.pValue === 'number' && (
                <div><span className="text-muted-foreground">p-val:</span> {v.pValue}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
