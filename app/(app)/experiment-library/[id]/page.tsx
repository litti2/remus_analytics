'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEmaStore } from '@/lib/store';

export default function ExperimentDetailPage() {
  const [open, setOpen] = useState(false);

  const params = useParams<{ id: string }>();
  const id = params.id;
  const experiment = useEmaStore((s) => s.experiments.find((e) => e.id === id));
  const funnels = useEmaStore((s) => s.funnels);

  if (!experiment) return <div className="p-6">Experiment not found</div>;
  const funnelName = experiment.funnelId ? (funnels.find((f) => f.id === experiment.funnelId)?.name ?? '—') : '—';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{experiment.name}</h1>
          <p className="text-muted-foreground">Primary metric: {experiment.primaryMetric}</p>
        </div>
        <Link className="text-primary underline" href="/experiment-library">Back to library</Link>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 text-sm">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">{experiment.outcome}</span>
            <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">{funnelName}</span>
            {experiment.completedAt && <span className="rounded-full bg-secondary px-3 py-1">Completed: {experiment.completedAt}</span>}
            <span className="rounded-full bg-secondary px-3 py-1">Owner: {experiment.owner}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" onClick={()=>setOpen(true)}>Edit</Button>
            <Button size="sm" variant="destructive" onClick={()=>{ useEmaStore.getState().deleteExperiment(id); window.location.href='/experiment-library'; }}>Delete</Button>
          </div>
        </div>

        {/* Result Summary with numeric callout and chart placeholder */}
        <div className="mb-4 rounded-md border border-border p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Result Summary</h3>
            <div className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">+12% CTR</div>
          </div>
          <div className="mb-2 h-32 w-full rounded-md border border-border bg-background/40 text-xs text-muted-foreground flex items-center justify-center">Result chart (control vs variant / before vs after)</div>
          <p className="text-sm text-muted-foreground">{experiment.resultSummary}</p>
        </div>

        {/* Primary metrics and guardrails */}
        <div className="mb-4 rounded-md border border-border p-3">
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">Metrics</h3>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {experiment.primaryMetric && <span className="rounded-full bg-secondary px-2 py-0.5">Primary: {experiment.primaryMetric}</span>}
            {/* Guardrails could be added here if stored */}
          </div>
        </div>

        {/* Key Learnings */}
        <div className="mb-4 rounded-md border border-border p-3">
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">Key Learnings</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground">
            <li>{experiment.keyLearning}</li>
          </ul>
        </div>

        {/* Related and Dependencies */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-md border border-border p-3">
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">Related</h3>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {experiment.funnelId && <Link href={`/funnel-explorer/${experiment.funnelId}`} className="rounded-full bg-accent/10 px-2 py-0.5 text-accent">Funnel: {funnelName}</Link>}
              {/* If linked test group exists, show a chip linking to /ab-test-tracker/[groupId] */}
            </div>
          </div>
          <div className="rounded-md border border-border p-3">
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">Dependencies</h3>
            <div className="text-sm text-muted-foreground">Add notes about dependencies here (e.g., onboarding flow updates).</div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-end gap-2">
          <Link className="text-sm text-primary underline" href={{ pathname:'/copilot-workspace', query:{ experimentId: id } }}>Discuss with Copilot</Link>
          <Button size="sm" variant="secondary" onClick={()=>setOpen(true)}>Add Related</Button>
        </div>
      </div>
    </div>
  );
}
