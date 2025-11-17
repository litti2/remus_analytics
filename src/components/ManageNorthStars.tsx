'use client';

import { useState } from 'react';
import { useEmaStore } from '@/lib/store';
import { Button } from '@/components/ui/button';

export default function ManageNorthStars({ onClose }: { onClose: () => void }) {
  const list = useEmaStore(s => s.northStarMetrics || []);
  const setNorthStars = useEmaStore(s => s.setNorthStars);
  const funnels = useEmaStore(s => s.funnels);
  const groups = useEmaStore(s => s.abTestGroups);

  const [local, setLocal] = useState(list.slice().sort((a,b)=>a.order-b.order));

  const label = (row: typeof local[number]) => {
    if (row.entityType === 'funnel') {
      const f = funnels.find(x=>x.id===row.entityId);
      return f?.northStarMetric || f?.name || row.id;
    }
    const g = groups.find(x=>x.id===row.entityId);
    return g?.primaryMetric || g?.name || row.id;
  };

  const move = (idx: number, dir: -1 | 1) => {
    const next = local.slice();
    const j = idx + dir;
    if (j < 0 || j >= next.length) return;
    [next[idx], next[j]] = [next[j], next[idx]];
    setLocal(next.map((x,i)=>({ ...x, order:i })));
  };

  const remove = (idx: number) => {
    const next = local.slice();
    next.splice(idx,1);
    setLocal(next.map((x,i)=>({ ...x, order:i })));
  };

  const save = () => {
    setNorthStars(local);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="w-full max-w-xl rounded-lg border border-border bg-card p-4" onClick={(e)=>e.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Manage North Star Metrics</h3>
          <button className="text-sm text-muted-foreground" onClick={onClose}>Close</button>
        </div>
        <div className="space-y-2">
          {local.map((row, idx)=> (
            <div key={`${row.entityType}-${row.entityId}-${row.id}`} className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm">
              <div className="min-w-0">
                <div className="font-medium truncate">{label(row)}</div>
                <div className="text-xs text-muted-foreground">{row.entityType} • {row.entityId}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={()=>move(idx,-1)} disabled={idx===0}>Up</Button>
                <Button variant="secondary" size="sm" onClick={()=>move(idx,1)} disabled={idx===local.length-1}>Down</Button>
                <Button variant="destructive" size="sm" onClick={()=>remove(idx)}>Remove</Button>
              </div>
            </div>
          ))}
          {local.length===0 && <div className="text-sm text-muted-foreground">No metrics selected.</div>}
        </div>
        <div className="mt-3 flex items-center justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={save}>Save</Button>
        </div>
      </div>
    </div>
  );
}
