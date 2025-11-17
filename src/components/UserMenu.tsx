'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export type EmaUser = {
  name: string;
  org?: string;
};

const USER_KEY = 'ema_user';

export default function UserMenu() {
  const [user, setUser] = useState<EmaUser | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(USER_KEY) : null;
    setUser(raw ? JSON.parse(raw) as EmaUser : null);
    const onAuth = () => {
      const r = localStorage.getItem(USER_KEY);
      setUser(r ? JSON.parse(r) : null);
    };
    window.addEventListener('auth-changed', onAuth);
    return () => window.removeEventListener('auth-changed', onAuth);
  }, []);

  if (!user) return null;

  const label = user.org ? `${user.name} • ${user.org}` : user.name;

  const logout = () => {
    localStorage.removeItem(USER_KEY);
    window.dispatchEvent(new Event('auth-changed'));
    setOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={()=>setOpen(v=>!v)} className="rounded-md border border-border bg-card px-3 py-1.5 text-sm hover:bg-secondary/50">
        {label}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg border border-border bg-card p-2 shadow-lg">
          <div className="px-2 py-1 text-xs text-muted-foreground">Account</div>
          <Link href="/about" className="block rounded-md px-2 py-1 text-sm hover:bg-secondary/40">My account</Link>
          <Link href="/about" className="block rounded-md px-2 py-1 text-sm hover:bg-secondary/40">Settings</Link>
          <button onClick={logout} className="mt-1 w-full rounded-md bg-destructive px-2 py-1 text-left text-sm text-destructive-foreground hover:opacity-90">Log out</button>
        </div>
      )}
    </div>
  );
}
