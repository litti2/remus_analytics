'use client';
import { useState } from 'react';
import { useEmaStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import ManageNorthStars from '@/components/ManageNorthStars';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function DataUploadsPage() {
  const addFunnelStep = useEmaStore(s=>s.addFunnelStep);
  const updateFunnelStep = useEmaStore(s=>s.updateFunnelStep);
  const deleteFunnelStep = useEmaStore(s=>s.deleteFunnelStep);
  const dataSources = useEmaStore(s=>s.dataSources);
  const funnels = useEmaStore(s=>s.funnels);
  const addDataSource = useEmaStore.getState; // use imperative for brevity
  const groups = useEmaStore(s=>s.abTestGroups);
  const addGroup = useEmaStore(s=>s.addAbTestGroup);
  const updateGroup = useEmaStore(s=>s.updateAbTestGroup);
  const deleteGroup = useEmaStore(s=>s.deleteAbTestGroup);
  const [groupOpen, setGroupOpen] = useState<null|string>(null);
  const [groupForm, setGroupForm] = useState({ name:'', hypothesis:'', funnelId:'', status:'planned', primaryMetric:'', guardrailMetrics:'', owner:'Owner' });
  const addFunnel = useEmaStore(s=>s.addFunnel);
  const updateFunnel = useEmaStore(s=>s.updateFunnel);
  const deleteFunnel = useEmaStore(s=>s.deleteFunnel);

  const [dsOpen, setDsOpen] = useState(false);
  const [funnelOpen, setFunnelOpen] = useState<null | string>(null);
  const [newFunnel, setNewFunnel] = useState({ name: '', description: '', northStarMetric: 'Conversion', dataSource: 'manual' as const });
  const [manageNS, setManageNS] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Data & Uploads</h1>

      {/* Data Sources */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-base font-semibold">Data Sources</h2>
          <Button size="sm" onClick={()=>setDsOpen(true)}>Add Data Source</Button>
        </div>
        <div className="divide-y divide-border text-sm">
          {dataSources.map(ds=> (
            <div key={ds.id} className="flex items-center justify-between px-4 py-3">
              <div className="min-w-0">
                <div className="font-medium">{ds.name}</div>
                <div className="text-muted-foreground">Mapped: {ds.mappedFunnels.join(', ') || '—'}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-secondary px-2 py-0.5">{ds.type.toUpperCase()}</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">{ds.status}</span>
              </div>
            </div>
          ))}
          {dataSources.length===0 && <div className="px-4 py-6 text-muted-foreground">No data sources yet.</div>}
        </div>
      </div>

      {/* Funnels */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-base font-semibold">Funnels</h2>
          <Button size="sm" onClick={()=>setFunnelOpen('new')}>Add Funnel</Button>
        </div>
        <div className="divide-y divide-border text-sm">
          {funnels.map(f=> (
            <div key={f.id} className="px-4 py-3 space-y-3">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <div className="font-medium">{f.name}</div>
                  <div className="text-muted-foreground">{f.description}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-secondary px-2 py-0.5">{f.northStarMetric}</span>
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-accent">{f.dataSource.toUpperCase()}</span>
                  <Button size="sm" variant="secondary" onClick={()=>setFunnelOpen(f.id)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={()=>{ deleteFunnel(f.id); toast.success('Funnel deleted'); }}>Delete</Button>
                </div>
              </div>
              {/* Funnel tags editor */}
              <div className="rounded-md border border-border p-3">
                <div className="mb-1 text-xs text-muted-foreground">Tags (comma-separated)</div>
                <input className="w-full rounded-md bg-secondary px-2 py-1" defaultValue={(f.tags||[]).join(', ')} onBlur={e=>{ const tags=e.target.value.split(',').map(s=>s.trim()).filter(Boolean); useEmaStore.getState().updateFunnel({ ...f, tags }); toast.success('Tags updated'); }} />
              </div>
              {/* Funnel metrics editor */}
              <div className="rounded-md border border-border p-3">
                <div className="mb-1 text-xs text-muted-foreground">Metrics</div>
                {(f.metrics||[]).map(m=> (
                  <div key={m.id} className="grid grid-cols-5 gap-2 text-sm mb-2">
                    <input className="rounded-md bg-secondary px-2 py-1" defaultValue={m.name} onBlur={e=>{ useEmaStore.getState().updateFunnelMetric(f.id, { ...m, name: e.target.value }); toast.success('Metric updated'); }} />
                    <input className="rounded-md bg-secondary px-2 py-1" defaultValue={m.key} onBlur={e=>{ useEmaStore.getState().updateFunnelMetric(f.id, { ...m, key: e.target.value }); toast.success('Metric updated'); }} />
                    <select className="rounded-md bg-secondary px-2 py-1" defaultValue={m.type} onChange={e=>{ useEmaStore.getState().updateFunnelMetric(f.id, { ...m, type: e.target.value as any }); toast.success('Metric updated'); }}>
                      <option>Rate</option><option>Count</option><option>Time</option><option>Other</option>
                    </select>
                    <label className="flex items-center gap-2 text-xs"><input type="checkbox" defaultChecked={!!m.isNorthStar} onChange={e=>{ useEmaStore.getState().updateFunnelMetric(f.id, { ...m, isNorthStar: e.target.checked }); toast.success('Metric updated'); }} /> isNorthStar</label>
                    <Button size="sm" variant="destructive" onClick={()=>{ useEmaStore.getState().deleteFunnelMetric(f.id, m.id); toast.success('Metric deleted'); }}>Delete</Button>
                  </div>
                ))}
                <div className="flex items-center justify-end">
                  <Button size="sm" onClick={()=>{ const id=`m_${Date.now().toString(36)}`; useEmaStore.getState().addMetricToFunnel(f.id, { id, name:'New Metric', key:'new_metric', type:'Rate', isNorthStar:false }); toast.success('Metric added'); }}>+ Add Metric</Button>
                </div>
              </div>
              {/* Funnel steps editor */}
              <div className="rounded-md border border-border p-3">
                <div className="mb-1 text-xs text-muted-foreground">Steps</div>
                {useEmaStore.getState().getStepsForFunnel(f.id).map(st=> (
                  <div key={st.id} className="grid grid-cols-6 gap-2 text-sm mb-2">
                    <input className="rounded-md bg-secondary px-2 py-1" defaultValue={st.name} onBlur={e=>{ updateFunnelStep({ ...st, name: e.target.value }); toast.success('Step updated'); }} />
                    <input className="rounded-md bg-secondary px-2 py-1" defaultValue={st.metricKey} onBlur={e=>{ updateFunnelStep({ ...st, metricKey: e.target.value }); toast.success('Step updated'); }} />
                    <input type="number" className="rounded-md bg-secondary px-2 py-1" defaultValue={st.users} onBlur={e=>{ updateFunnelStep({ ...st, users: Number(e.target.value) }); toast.success('Step updated'); }} />
                    <input type="number" step="0.01" className="rounded-md bg-secondary px-2 py-1" defaultValue={st.conversionRate} onBlur={e=>{ updateFunnelStep({ ...st, conversionRate: Number(e.target.value) }); toast.success('Step updated'); }} />
                    <input type="number" step="0.01" className="rounded-md bg-secondary px-2 py-1" defaultValue={st.dropoffRate} onBlur={e=>{ updateFunnelStep({ ...st, dropoffRate: Number(e.target.value) }); toast.success('Step updated'); }} />
                    <Button size="sm" variant="destructive" onClick={()=>{ deleteFunnelStep(st.id); toast.success('Step deleted'); }}>Delete</Button>
                  </div>
                ))}
                <div className="flex items-center justify-end">
                  <Button size="sm" onClick={()=>{ const id=`st_${Date.now().toString(36)}`; const order=(useEmaStore.getState().getStepsForFunnel(f.id).slice(-1)[0]?.order||0)+1; addFunnelStep({ id, funnelId:f.id, order, name:'New Step', metricKey:'metric', users:0, conversionRate:0, dropoffRate:0 }); toast.success('Step added'); }}>+ Add Step</Button>
                </div>
              </div>
            </div>
          ))}
          {funnels.length===0 && <div className="px-4 py-6 text-muted-foreground">No funnels yet.</div>}
        </div>
      </div>

      {/* A/B Test Groups */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-base font-semibold">A/B Test Groups</h2>
          <Button size="sm" onClick={()=>setGroupOpen('new')}>Add Test Group</Button>
        </div>
        <div className="divide-y divide-border text-sm">
          {groups.map(g=> (
            <div key={g.id} className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <div className="font-medium">{g.name}</div>
                  <div className="text-muted-foreground">{g.hypothesis}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-secondary px-2 py-0.5">{g.status}</span>
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-accent">{(funnels.find(f=>f.id===g.funnelId)?.name)||'—'}</span>
                  <Button size="sm" variant="secondary" onClick={()=>setGroupOpen(g.id)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={()=>{ deleteGroup(g.id); toast.success('Group deleted'); }}>Delete</Button>
                </div>
              </div>
              {/* Group metrics editor */}
              <div className="mt-2 rounded-md border border-border p-3">
                <div className="mb-1 text-xs text-muted-foreground">Metrics</div>
                {(g.metrics||[]).map(m=> (
                  <div key={m.id} className="grid grid-cols-5 gap-2 text-sm mb-2">
                    <input className="rounded-md bg-secondary px-2 py-1" defaultValue={m.name} onBlur={e=>{ useEmaStore.getState().updateGroupMetric(g.id, { ...m, name: e.target.value }); toast.success('Metric updated'); }} />
                    <input className="rounded-md bg-secondary px-2 py-1" defaultValue={m.key} onBlur={e=>{ useEmaStore.getState().updateGroupMetric(g.id, { ...m, key: e.target.value }); toast.success('Metric updated'); }} />
                    <select className="rounded-md bg-secondary px-2 py-1" defaultValue={m.type} onChange={e=>{ useEmaStore.getState().updateGroupMetric(g.id, { ...m, type: e.target.value as any }); toast.success('Metric updated'); }}>
                      <option>Rate</option><option>Count</option><option>Time</option><option>Other</option>
                    </select>
                    <label className="flex items-center gap-2 text-xs">
                      <input type="checkbox" defaultChecked={!!m.isNorthStar} onChange={e=>{ useEmaStore.getState().updateGroupMetric(g.id, { ...m, isNorthStar: e.target.checked }); toast.success('Metric updated'); }} />
                      isNorthStar
                    </label>
                    <Button size="sm" variant="destructive" onClick={()=>{ useEmaStore.getState().deleteGroupMetric(g.id, m.id); toast.success('Metric deleted'); }}>Delete</Button>
                  </div>
                ))}
                <div className="flex items-center justify-end">
                  <Button size="sm" onClick={()=>{ const id=`m_${Date.now().toString(36)}`; useEmaStore.getState().addMetricToGroup(g.id, { id, name:'New Metric', key:'new_metric', type:'Rate', isNorthStar:false }); toast.success('Metric added'); }}>+ Add Metric</Button>
                </div>
              </div>
            </div>
          ))}
          {groups.length===0 && <div className="px-4 py-6 text-muted-foreground">No A/B test groups yet.</div>}
        </div>
      </div>

      {/* Add/Edit Funnel */}
      <Dialog open={!!funnelOpen} onOpenChange={(o)=>!o && setFunnelOpen(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{funnelOpen==='new'?'Add Funnel':'Edit Funnel'}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <label className="text-muted-foreground col-span-1">Name</label>
            <input className="col-span-2 rounded-md bg-secondary px-2 py-1" value={newFunnel.name} onChange={e=>setNewFunnel(v=>({...v, name:e.target.value}))} />
            <label className="text-muted-foreground col-span-1">Description</label>
            <input className="col-span-2 rounded-md bg-secondary px-2 py-1" value={newFunnel.description} onChange={e=>setNewFunnel(v=>({...v, description:e.target.value}))} />
            <label className="text-muted-foreground col-span-1">North-star</label>
            <input className="col-span-2 rounded-md bg-secondary px-2 py-1" value={newFunnel.northStarMetric} onChange={e=>setNewFunnel(v=>({...v, northStarMetric:e.target.value}))} />
            <label className="text-muted-foreground col-span-1">Data source</label>
            <select className="col-span-2 rounded-md bg-secondary px-2 py-1" value={newFunnel.dataSource} onChange={e=>setNewFunnel(v=>({...v, dataSource: e.target.value as any}))}>
              <option value="manual">Manual</option>
              <option value="csv">CSV</option>
              <option value="api">API</option>
            </select>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={()=>setFunnelOpen(null)}>Cancel</Button>
            <Button onClick={() => {
              if (funnelOpen==='new') {
                const id = `f_${Date.now().toString(36)}`;
                addFunnel({ id, ...newFunnel });
              } else {
                const id = funnelOpen as string;
                updateFunnel({ id, ...newFunnel });
              }
              setFunnelOpen(null);
              setNewFunnel({ name:'', description:'', northStarMetric:'Conversion', dataSource:'manual' });
            }}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
