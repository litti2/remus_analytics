'use client';
import { Suspense } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEmaStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Message { id: string; role: 'user'|'assistant'; content: string; timestamp: string; }

function CopilotWorkspacePageInner() {
  type Mode = 'funnel'|'abtest'|'experiment'|'upload';
  const [mode, setMode] = useState<Mode>('funnel');
  const [selectedId, setSelectedId] = useState<string>('');
  const search = useSearchParams();
  const funnels = useEmaStore(s=>s.funnels);
  const runningGroups = useEmaStore(s=>s.abTestGroups.filter(g=>g.status==='running'));
  const p0 = useEmaStore(s=>s.suggestions.filter(x=>x.priority==='P0'));

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement|null>(null);

  const prefill = useMemo(()=>{
    const funnelId = search.get('funnelId');
    const insightId = search.get('insightId');
    if (funnelId && insightId) {
      const f = funnels.find(f=>f.id===funnelId)?.name ?? 'this funnel';
      return `Analyze insight ${insightId} for ${f}. What experiments should we run?`;
    }
    return '';
  }, [search, funnels]);

  useEffect(()=>{ if (prefill) setInput(prefill); }, [prefill]);
  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:'smooth'}); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const user: Message = { id: `m_${Date.now()}`, role: 'user', content: input.trim(), timestamp: new Date().toISOString() };
    setMessages(m=>[...m, user]);
    setInput('');
    setTimeout(()=>{
      const f = funnels[0];
      const s1 = p0[0];
      const s2 = p0[1];
      const reply = `Here are ideas related to ${f?.name ?? 'your funnel'}:\n- Try: ${s1?.title ?? 'Review onboarding'}.\n- Also consider: ${s2?.title ?? 'Run a pricing test'}.`;
      const bot: Message = { id: `m_${Date.now()+1}`, role: 'assistant', content: reply, timestamp: new Date().toISOString() };
      setMessages(m=>[...m, bot]);
    }, 500);
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Chat */}
      <Card className="col-span-2 p-4">
        {/* Mode selector */}
        <div className="mb-3 flex items-center gap-2">
          {(['funnel','abtest','experiment','upload'] as const).map(m=> (
            <button key={m} onClick={()=>{ setMode(m); setMessages([]); }} className={`rounded-full px-3 py-1 text-sm ${mode===m?'bg-primary text-primary-foreground':'bg-secondary text-foreground'}`}>{m==='abtest'?'A/B Test': m==='upload'?'Upload & Analyze': m.charAt(0).toUpperCase()+m.slice(1)}</button>
          ))}
          {mode!=='upload' && (
            <select className="ml-2 rounded-md bg-secondary px-2 py-1 text-sm" value={selectedId} onChange={e=>setSelectedId(e.target.value)}>
              <option value="">Select...</option>
              {mode==='funnel' && funnels.map(f=> <option key={f.id} value={f.id}>{f.name}</option>)}
              {mode==='abtest' && runningGroups.map(g=> <option key={g.id} value={g.id}>{g.name}</option>)}
              {mode==='experiment' && useEmaStore.getState().experiments.map(x=> <option key={x.id} value={x.id}>{x.name}</option>)}
            </select>
          )}
          {mode==='upload' && <span className="ml-2 text-xs text-muted-foreground">Using: Trial Funnel CSV – November cohort</span>}
          <Button className="ml-auto" size="sm" onClick={()=>{
            const now = new Date().toISOString();
            const context = mode==='funnel' ? funnels.find(f=>f.id===selectedId)?.name : mode==='abtest' ? runningGroups.find(g=>g.id===selectedId)?.name : mode==='experiment' ? useEmaStore.getState().experiments.find(e=>e.id===selectedId)?.name : 'Trial Funnel CSV – November cohort';
            const seed: Message[] = [
              { id:`m_${now}_u1`, role:'user', content:`Analyze ${context}. Where should we focus?`, timestamp: now },
              { id:`m_${now}_a1`, role:'assistant', content:`Based on recent metrics for ${context}, focus on the largest dropoff and primary metric. Consider 2–3 targeted experiments.`, timestamp: now },
              { id:`m_${now}_u2`, role:'user', content:'What experiments would you recommend?', timestamp: now },
              { id:`m_${now}_a2`, role:'assistant', content:'1) Clarify value props\n2) Add progress bar\n3) Improve onboarding tips. See Suggestions and Library for details.', timestamp: now },
            ];
            setMessages(seed);
          }}>Load Example</Button>
        </div>
        <h1 className="mb-3 text-xl font-semibold">Copilot</h1>
        <div className="h-[420px] overflow-auto rounded-md border border-border bg-background/40 p-3">
          {messages.map(m=> (
            <div key={m.id} className={`mb-3 ${m.role==='user'?'text-right':''}`}>
              <div className={`inline-block max-w-[85%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm ${m.role==='user'?'bg-primary text-primary-foreground':'bg-secondary'}`}>{m.content}</div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask Remus..." onKeyDown={e=>{ if (e.key==='Enter') send(); }} />
          <Button onClick={send}>Send</Button>
        </div>
      </Card>

      {/* Reference Zone */}
      <div className="space-y-4">
        <Card className="p-4">
          <div className="mb-2 text-sm font-medium text-muted-foreground">Active Experiments</div>
          <div className="space-y-2 text-sm">
            {runningGroups.map(g=> (
              <Link key={g.id} className="block truncate text-primary underline" href={`/ab-test-tracker/${g.id}`}>{g.name}</Link>
            ))}
            {runningGroups.length===0 && <div className="text-muted-foreground">No running tests.</div>}
          </div>
        </Card>
        <Card className="p-4">
          <div className="mb-2 text-sm font-medium text-muted-foreground">Priority Suggestions</div>
          <div className="space-y-2 text-sm">
            {p0.map(s=> (
              <Link key={s.id} className="block truncate text-primary underline" href={{ pathname:'/experiment-suggestions', query:{ suggestionId: s.id } }}>{s.title}</Link>
            ))}
            {p0.length===0 && <div className="text-muted-foreground">No P0 suggestions.</div>}
          </div>
        </Card>
        <Card className="p-4">
          <div className="mb-2 text-sm font-medium text-muted-foreground">Quick Notes</div>
          <Link href="/notes" className="text-primary underline">Open Notes</Link>
        </Card>
      </div>
    </div>
  );
}

export default function CopilotWorkspacePage() {
  return (
    <Suspense fallback={null}>
      <CopilotWorkspacePageInner />
    </Suspense>
  );
}
