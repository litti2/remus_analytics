"use client";
import React from "react";
import { Button } from "@/components/ui/button";

type Step = { id: string; name: string; users: number; order: number; metricKey: string; conversionRate?: number; dropoffRate?: number };

type Props = {
  steps: Step[];
  funnelId: string;
  addStep: (s: Step) => void;
  updateStep: (s: Step) => void;
  deleteStep: (id: string) => void;
};

export function StepsTable({ steps, funnelId, addStep, updateStep, deleteStep }: Props) {
  return (
    <div className="table-wrapper">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">Steps</h3>
        {/* Back button handled by parent */}
      </div>
      {/* Table Header (unchanged) */}
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
            name: "New Step",
            metricKey: "metric",
            users: 0,
            conversionRate: 0,
            dropoffRate: 0,
          } as any);
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
              onChange={(e) => updateStep({ ...s, name: e.target.value } as any)}
            />
            <input
              className="col-span-2 rounded-md bg-secondary px-2 py-1"
              value={s.metricKey}
              onChange={(e) => updateStep({ ...s, metricKey: e.target.value } as any)}
            />
            <input
              type="number"
              className="col-span-2 rounded-md bg-secondary px-2 py-1"
              value={s.users}
              onChange={(e) => updateStep({ ...s, users: Number(e.target.value) } as any)}
            />
            <input
              type="number"
              step="0.01"
              className="col-span-2 rounded-md bg-secondary px-2 py-1"
              value={s.conversionRate}
              onChange={(e) => updateStep({ ...s, conversionRate: Number(e.target.value) } as any)}
            />
            <input
              type="number"
              step="0.01"
              className="col-span-2 rounded-md bg-secondary px-2 py-1"
              value={s.dropoffRate}
              onChange={(e) => updateStep({ ...s, dropoffRate: Number(e.target.value) } as any)}
            />
            <div className="col-span-12 flex items-center justify-end gap-2">
              <Button
                variant="secondary"
                size="sm"
                disabled={idx === 0}
                onClick={() => {
                  if (idx === 0) return;
                  const prev = steps[idx - 1];
                  updateStep({ ...(prev as any), order: (prev as any).order + 1 } as any);
                  updateStep({ ...(s as any), order: (s as any).order - 1 } as any);
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
                  updateStep({ ...(next as any), order: (next as any).order - 1 } as any);
                  updateStep({ ...(s as any), order: (s as any).order + 1 } as any);
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
  );
}
