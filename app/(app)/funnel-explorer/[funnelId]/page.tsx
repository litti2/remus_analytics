'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip as RTooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useEmaStore } from '@/lib/store';

function StrategySummary({ funnelId }: { funnelId: string }) {
  const steps = useEmaStore((s)=> s.getStepsForFunnel(funnelId));
  if (!steps.length) return <span>No steps.</span>;
  let maxDrop = -1; let maxName = '';
  steps.forEach(s=>{ if ((s.dropoffRate||0) > maxDrop) { maxDrop = s.dropoffRate||0; maxName = s.name; } });
  return <span>Largest dropoff at <strong>{maxName}</strong> ({Math.round((maxDrop||0)*100)}%). Consider experiments to improve conversion into the next step.</span>;
}

export default function FunnelDetailPage() {
  const params = useParams<{ funnelId: string }>();
  const funnelId = params.funnelId;

  const funnel = useEmaStore((s) => s.funnels.find((f) => f.id === funnelId));
  const steps = useEmaStore((s) => s.getStepsForFunnel(funnelId));
  const addStep = useEmaStore((s) => s.addFunnelStep);
  const updateStep = useEmaStore((s) => s.updateFunnelStep);
  const deleteStep = useEmaStore((s) => s.deleteFunnelStep);
  const insights = useEmaStore((s) => s.getInsightsForFunnel(funnelId));
  const addInsight = useEmaStore((s) => s.addInsight);
  const addNote = useEmaStore((s) => s.addNote);

  const [insightOpen, setInsightOpen] = useState(false);
  const [insightTitle, setInsightTitle] = useState('');
  const [insightSummary, setInsightSummary] = useState('');
  const [insightSeverity, setInsightSeverity] = useState<'low' | 'medium' | 'high'>('low');

  if (!funnel) return <div className="p-6">Funnel not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{funnel.name}</h1>
          <p className="text-muted-foreground">{funnel.description}</p>
        </div>
        <Link className="text-primary underline" href="/funnel-explorer">
          Back to list
        </Link>
      </div>

      {/* Users by step chart */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h2 className="mb-2 text-sm font-medium text-muted-foreground">Users by step</h2>
        <div className="text-sm font-medium text-muted-foreground mb-1">Users by step</div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={steps}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <RTooltip />
              <Bar dataKey="users" fill="hsl(var(--indigo))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Steps editable table */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">Steps</h3>
        </div>
        {/* Table Header */}
        <div className="mt-1 grid grid-cols-12 gap-3 rounded-md bg-secondary/30 px-2 py-2 text-xs text-muted-foreground">
          <div className="col-span-1">Order</div>
          <div className="col-span-2">Step</div>
          <div className="col-span-2">Metric</div>
          <div className="col-span-2">Users</div>
          <div className="col-span-2">Conv</div>
          <div className="col-span-2">Drop</div>
        </div>
          <Button
            size="sm"
            onClick={() => {
              const newOrder = (steps[steps.length - 1]?.order ?? 0) + 1;
              addStep({
                id: `st_${Date.now().toString(36)}`,
                funnelId,
                order: newOrder,
                name: 'New Step',
                metricKey: 'metric',
                users: 0,
                conversionRate: 0,
                dropoffRate: 0,
              });
            }}
          >
            + Add Step
          </Button>
        <div className="divide-y divide-border">
          {steps.map((s, idx) => (
            <div key={s.id} className="grid grid-cols-12 items-center gap-3 py-2 text-sm">
              <div className="col-span-1 text-muted-foreground">{s.order}</div>
              <input
                className="col-span-2 rounded-md bg-secondary px-2 py-1"
                value={s.name}
                onChange={(e) => updateStep({ ...s, name: e.target.value })}
              />
              <input
                className="col-span-2 rounded-md bg-secondary px-2 py-1"
                value={s.metricKey}
                onChange={(e) => updateStep({ ...s, metricKey: e.target.value })}
              />
              <input
                type="number"
                className="col-span-2 rounded-md bg-secondary px-2 py-1"
                value={s.users}
                onChange={(e) => updateStep({ ...s, users: Number(e.target.value) })}
              />
              <input
                type="number"
                step="0.01"
                className="col-span-2 rounded-md bg-secondary px-2 py-1"
                value={s.conversionRate}
                onChange={(e) => updateStep({ ...s, conversionRate: Number(e.target.value) })}
              />
              <input
                type="number"
                step="0.01"
                className="col-span-2 rounded-md bg-secondary px-2 py-1"
                value={s.dropoffRate}
                onChange={(e) => updateStep({ ...s, dropoffRate: Number(e.target.value) })}
              />
              <div className="col-span-12 flex items-center justify-end gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={idx === 0}
                  onClick={() => {
                    if (idx === 0) return;
                    const prev = steps[idx - 1];
                    updateStep({ ...prev, order: prev.order + 1 });
                    updateStep({ ...s, order: s.order - 1 });
                  }}
                >
                  Move Up
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={idx === steps.length - 1}
                  onClick={() => {
                    if (idx === steps.length - 1) return;
                    const next = steps[idx + 1];
                    updateStep({ ...next, order: next.order - 1 });
                    updateStep({ ...s, order: s.order + 1 });
                  }}
                >
                  Move Down
                </Button>
                <Button variant="destructive" size="sm" onClick={() => deleteStep(s.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategy & Insights */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="mb-2 text-sm font-medium text-muted-foreground">Strategy & Insights</div>
        <div className="text-sm text-muted-foreground mb-3">
          <StrategySummary funnelId={funnelId} />
        </div>
        <div className="flex items-center justify-end gap-2">
          <Link className="text-sm text-primary underline" href={`/copilot-workspace?funnelId=${funnelId}`}>Discuss with Copilot</Link>
          <Link className="text-sm text-primary underline" href={{ pathname:'/experiment-suggestions', query:{ funnelId } as any }}>Create Suggestion</Link>
        </div>
      </div>

      {/* Insights section */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">Insights</h3>
          <Button size="sm" onClick={() => setInsightOpen(true)}>
            + Add Insight
          </Button>
        </div>
        <div className="divide-y divide-border">
          {insights.map((i) => (
            <div key={i.id} className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium">{i.title}</div>
                <div className="text-sm text-muted-foreground">{i.summary}</div>
              </div>
              <Link
                className="text-sm text-primary underline"
                href={`/copilot-workspace?funnelId=${funnelId}&insightId=${i.id}`}
              >
                Ask Ema
              </Link>
            </div>
          ))}
          {insights.length === 0 && (
            <div className="px-4 py-6 text-sm text-muted-foreground">No insights yet.</div>
          )}
        </div>
      </div>

      {/* Add Insight dialog */}
      <Dialog open={insightOpen} onOpenChange={setInsightOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Insight</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <input
              className="w-full rounded-md bg-secondary px-3 py-2"
              placeholder="Title"
              value={insightTitle}
              onChange={(e) => setInsightTitle(e.target.value)}
            />
            <textarea
              className="w-full rounded-md bg-secondary px-3 py-2"
              placeholder="Summary"
              value={insightSummary}
              onChange={(e) => setInsightSummary(e.target.value)}
            />
            <div className="flex items-center gap-2 text-sm">
              <span>Severity:</span>
              <select
                className="rounded-md bg-secondary px-2 py-1"
                value={insightSeverity}
                onChange={(e) => setInsightSeverity(e.target.value as 'low' | 'medium' | 'high')}
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setInsightOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                const id = `in_${Date.now().toString(36)}`;
                addInsight({
                  id,
                  funnelId,
                  title: insightTitle || 'New Insight',
                  summary: insightSummary || '',
                  severity: insightSeverity,
                  createdAt: new Date().toISOString(),
                });
                // also create linked note
                addNote({
                  id: `n_${Date.now().toString(36)}`,
                  title: `Note: ${insightTitle || 'New Insight'}`,
                  body: insightSummary || '',
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  context: { funnelId, insightId: id },
                });
                setInsightOpen(false);
                setInsightTitle('');
                setInsightSummary('');
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
