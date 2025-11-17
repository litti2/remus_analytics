'use client';
import Link from 'next/link';
import { getAllNotes } from '@/lib/notes-storage';
import { useEffect, useState } from 'react';

export default function NotesPage() {
  const [notes, setNotes] = useState<any[]>([]);
  useEffect(() => {
    const load = () => setNotes(getAllNotes());
    load();
    window.addEventListener('storage-sync', load);
    return () => window.removeEventListener('storage-sync', load);
  }, []);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-2xl font-semibold">Notes</h1><Link href={`/notes/editor?id=${Date.now().toString()}`} className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground">+ Add Note</Link></div>
      <div className="rounded-lg border border-border bg-card">
        <div className="divide-y divide-border">
          {notes.map((n) => (
            <Link key={n.id} href={`/notes/${n.id}`} className="block px-4 py-3 hover:bg-secondary/40 transition">
              <div className="font-medium">{n.title}</div>
              <div className="text-sm text-muted-foreground line-clamp-1">{n.body}</div>
            </Link>
          ))}
          {notes.length === 0 && <div className="px-4 py-6 text-sm text-muted-foreground">No notes yet.</div>}
        </div>
      </div>
    </div>
  );
}
