'use client';
import { useState } from 'react';

const QA = [
  { q:'Do I need GA, Mixpanel, or Segment to use Remus?', a:'No. You can start with manual numbers, CSVs, or simple APIs. Remus is designed so early teams can learn long before they’ve instrumented everything.' },
  { q:'Can Remus launch or deploy experiments?', a:'No. Remus is a decision-support layer — it helps you decide what to run, track performance, and capture learnings.' },
  { q:'Can I use Remus if my data is messy?', a:'Yes — that’s the point. Start with a few funnels and metrics, improve definitions over time, and refine what you track.' },
  { q:'Who should own Remus in our company?', a:'Growth PMs, founders, or whoever is driving experiments — Remus is built for people connecting metrics to product decisions.' },
  { q:'Does Remus replace GA or Mixpanel?', a:'No. Remus complements analytics — it helps you decide and track experiments using whichever data you have now.' },
  { q:'How hard is setup?', a:'You can start in minutes with manual or CSV inputs. Add APIs later.' },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-6 text-center text-2xl font-semibold">FAQ</h2>
        <div className="mx-auto max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.04]">
          {QA.map((item, i) => (
            <div key={item.q}>
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between px-4 py-3 text-left">
                <span className="text-sm font-medium text-white/90">{item.q}</span>
                <span className="text-white/60">{open === i ? '−' : '+'}</span>
              </button>
              <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]' }`}>
                <div className="min-h-0 overflow-hidden px-4 pb-4 text-sm text-white/70">
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
