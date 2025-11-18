'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip as RTooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FlipFunnelCard } from '@/components/funnel/FlipFunnelCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useEmaStore } from '@/lib/store';

function StrategySummary({ funnelId }: { funnelId: string }) {
  const steps = useEmaStore((s)=> s.getStepsForFunnel(funnelId));
  if (!steps.length) return <span>No steps.</span>;
  let maxDrop = -1; let maxName = '';
  steps.forEach(s=>{ if ((s.dropoffRate||0) > maxDrop) { maxDrop = s.dropoffRate||0; maxName = s.name; } });
  return <span>Largest dropoff at <strong>{maxName}</strong> ({Math.round((maxDrop||0)*100)}%). Consider experiments to improve conversion into the next step.</span>;
}

type Step = { id: string; name: string; users: number; order: number; conversionRate?: number; dropoffRate?: number };

type FlipControls = { flipToBack: () => void; flipToFront: () => void };

type FlipFunnelCardProps = {
  steps: Step[];
  renderTable: (controls: FlipControls) => React.ReactNode;
};

function FlipFunnelCardLocal({ steps, renderTable }: FlipFunnelCardProps) {
  function RadialFunnel({ steps }: { steps: Step[] }) {
    // Responsive radial funnel using SVG concentric rings
    // Visual spec: background #0F0F12, border #1C1D22, stroke colors (Linear purple scale)
    const size = 420; // minimum viable diameter; scales via viewBox
    const ringThicknessBase = 28; // within 26–34px
    const ringGap = 10; // within 8–12px

    const maxUsers = Math.max(1, ...steps.map(s=> s.users||0));

    const palette = ['#6F6AF8', '#7D75F9', '#8E86FF', '#A8A3FF', '#B7B4FF', '#C6C4FF'];

    const rings = steps.map((s, i)=> ({
      step: s,
      idx: i,
      color: palette[i % palette.length],
    }));

    const totalThickness = rings.length * ringThicknessBase + Math.max(0, rings.length - 1) * ringGap;
    const radiusOuter = Math.max(size/2 - 12, totalThickness/2 + 24);

    return (
      <div className="w-full flex items-center justify-center">
        <svg
          role="img"
          aria-label="Radial funnel visualization"
          viewBox={`0 0 ${size} ${size}`}
          className="max-w-full"
          style={{ width: '100%', height: 'min(520px, 60vh)' }}
        >
          <defs>
            <filter id="ringGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {rings.map((r, i)=>{
            const thickness = ringThicknessBase + 0; // hover grows by +2px via CSS
            const radius = radiusOuter - i * (ringThicknessBase + ringGap) - thickness/2;

            const circumference = 2 * Math.PI * radius;
            const proportion = (r.step.users || 0) / maxUsers; // proportional to max/basis
            const dash = Math.max(0.08, proportion) * circumference;
            const gap = circumference - dash;

            return (
              <g key={r.step.id} className="group">
                {/* background full ring track */}
                <circle
                  cx={size/2}
                  cy={size/2}
                  r={radius}
                  fill="none"
                  stroke="#2A2E33"
                  strokeWidth={thickness}
                  opacity={0.8}
                />

                {/* active arc with trimming animation */}
                <circle
                  cx={size/2}
                  cy={size/2}
                  r={radius}
                  fill="none"
                  stroke={r.color}
                  strokeWidth={thickness}
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${gap}`}
                  strokeDashoffset={gap/2}
                  className="transition-[stroke-dashoffset,stroke,stroke-width] duration-200 ease-[cubic-bezier(0.2,0.8,0.4,1)] group-hover:brightness-110 group-hover:[filter:url(#ringGlow)]"
                />

                {/* leader line + callout label to the right/left alternately */}
                {(() => {
                  const angle = -90 + i * (180 / Math.max(1, rings.length - 1));
                  const rad = (angle * Math.PI) / 180;
                  const x1 = size/2 + Math.cos(rad) * (radius + thickness/2 + 6);
                  const y1 = size/2 + Math.sin(rad) * (radius + thickness/2 + 6);
                  const x2 = size/2 + Math.cos(rad) * (radius + thickness/2 + 24);
                  const y2 = size/2 + Math.sin(rad) * (radius + thickness/2 + 24);
                  const alignRight = Math.cos(rad) >= 0;
                  const labelX = x2 + (alignRight ? 12 : -12);

                  const drop = Math.round((r.step.dropoffRate || 0) * 100);

                  return (
                    <g>
                      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3E434A" strokeWidth={1} />
                      <text x={labelX} y={y2} textAnchor={alignRight ? 'start' : 'end'} dominantBaseline="middle" className="select-none">
                        <tspan x={labelX} dy="-0.6em" className="fill-white text-[14px] font-semibold">{r.step.name}</tspan>
                        <tspan x={labelX} dy="1.2em" className="fill-[#A0A4A8] text-[13px] font-medium">Users: {r.step.users?.toLocaleString?.() ?? r.step.users}</tspan>
                        <tspan x={labelX} dy="1.2em" className="fill-[#A0A4A8] text-[13px] font-medium">Dropoff: {drop}%</tspan>
                      </text>
                    </g>
                  );
                })()}

                {/* accessibility title */}
                <title>
                  {`Step: ${r.step.name} — ${r.step.users} users — ${Math.round((r.step.dropoffRate||0)*100)}% dropoff`}
                </title>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  const [flipped, setFlipped] = useState(false);

  // compute linear-style widths
  const maxUsers = Math.max(1, ...steps.map(s=> s.users || 0));
  const totalUsers = steps[0]?.users || 0;
  const conversion = totalUsers ? Math.round((steps[steps.length-1]?.users || 0) / totalUsers * 100) : 0;

  const handleFlip = () => setFlipped((f)=> !f);

  return (
    <div
      className="relative min-h-[300px] w-full"
      style={{ perspective: '0px' }}
    >
      <div
        className={cn(
          'relative',
          'transition-transform duration-[300ms] [transition-timing-function:cubic-bezier(0.22,0.61,0.36,1)]',
          '[transform-style:preserve-3d]',
          flipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]',
        )}
      >
        {/* Front Face - Visualization */}
        <div
          className={cn(
            'absolute inset-0',
            'rounded-md border',
            'bg-[#1a1d21] border-[#3E434A]',
            'p-6',
            'backface-hidden'
          )}
          onClick={handleFlip}
        >
          {/* top-right metrics */}
          <div className="absolute right-6 top-4 text-[13px] font-medium text-[#A0A4A8]">
            Conversion: {conversion}% • Total Users: {totalUsers}
          </div>

          {/* Radial Funnel (Concentric Rings) */}
          <RadialFunnel steps={steps} />
        </div>

        {/* Back Face - Table */}
        <div
          className={cn(
            'absolute inset-0',
            'rounded-md border',
            'bg-[#1a1d21] border-[#3E434A]',
            'p-6',
            'backface-hidden [transform:rotateY(180deg)]'
          )}
          onClick={(e)=> e.stopPropagation()}
        >
          {renderTable({ flipToBack: ()=> setFlipped(true), flipToFront: ()=> setFlipped(false) })}
        </div>
      </div>
    </div>
  );
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

      {/* Steps editable table replaced with Linear-style flip visualization */}
      <div className="steps-card rounded-lg border border-border bg-card p-4">
        <FlipFunnelCard
          steps={steps}
          renderTable={({ onFlipToVisual }) => (
            <>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">Steps</h3>
                <button
                  className="text-[13px] font-medium text-[#A0A4A8] hover:text-white"
                  onClick={(e)=>{ e.stopPropagation(); onFlipToVisual(); }}
                >
                  Back to Visual
                </button>
              </div>
              {/* exact table markup below */}
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
                onClick={(e) => {
                  e.stopPropagation();
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
                          const prev = steps[idx - 1];
                          if (!prev) return;
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
                          const next = steps[idx + 1];
                          if (!next) return;
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
            </>
          )}
        />
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
                Ask Remus
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
