'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useScrollSpy } from './useScrollSpy';

const NAV = [
  { id: 'how', label: 'How it works' },
  { id: 'tour', label: 'Product tour' },
  { id: 'usecases', label: 'Use cases' },
  { id: 'data', label: 'Data & flexibility' },
  { id: 'faq', label: 'FAQ' },
];

export default function LandingNav() {
  const active = useScrollSpy(['hero', 'how', 'tour', 'usecases', 'data', 'faq', 'final']);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className={`sticky top-0 z-40 w-full transition-all ${scrolled ? 'backdrop-blur supports-[backdrop-filter]:bg-[#0b1020]/70' : 'backdrop-blur-[2px] supports-[backdrop-filter]:bg-[#0b1020]/40'} border-b border-white/10` }>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Left: logo */}
        <Link href="#hero" className="group flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-teal-400 shadow-inner">
            <span className="text-xs font-bold text-white">R</span>
          </div>
          <span className="text-sm font-semibold text-white/90 group-hover:text-white">Remus Growth Experimentation Advisor</span>
        </Link>

        {/* Center nav (desktop) */}
        <nav className="hidden items-center gap-3 md:flex">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`px-2 py-1 text-sm transition-colors ${active === item.id ? 'text-white' : 'text-white/70 hover:text-white'}`}
            >
              <span className={`inline-block border-b ${active === item.id ? 'border-teal-400' : 'border-transparent group-hover:border-white/30'}`}>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Right CTAs */}
        <div className="hidden items-center gap-2 md:flex">
          <a href="/docs" className="text-sm text-white/75 hover:text-white">Docs</a>
          <Link href="/overview" className="rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-[#0b1020] shadow-[0_0_0_1px_rgba(255,255,255,0.15)] transition active:scale-95 hover:bg-white/95">Open Remus</Link>
          <a href="#insights" className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/90 backdrop-blur transition hover:bg-white/10 active:scale-95">See sample insights</a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen((v) => !v)} className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/90 backdrop-blur">
          <span className="sr-only">Menu</span>
          <div className="h-3 w-4">
            <div className="h-[2px] w-full bg-white/90" />
            <div className="mt-1 h-[2px] w-full bg-white/70" />
            <div className="mt-1 h-[2px] w-full bg-white/60" />
          </div>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#0b1020]/90 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <nav className="grid gap-2">
              {NAV.map((item) => (
                <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)} className="rounded-md px-2 py-2 text-white/90 hover:bg-white/5">
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 grid gap-2">
              <Link href="/overview" className="rounded-lg bg-white px-3 py-2 text-center text-sm font-medium text-[#0b1020]">Open Remus</Link>
              <a href="#insights" onClick={() => setOpen(false)} className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-center text-sm text-white/90">See sample insights</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
