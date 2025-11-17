'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEmaStore } from '@/lib/store';

export default function NoteDetailPage() {
  const params = useParams<{ noteId: string }>();
  const noteId = params.noteId;
  const note = useEmaStore((s) => s.notes.find((n) => n.id === noteId));

  if (!note) return <div className="p-6">Note not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{note.title}</h1>
        <Link className="text-primary underline" href="/notes">Back to notes</Link>
      </div>
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-muted-foreground whitespace-pre-wrap">{note.body}</p>
      </div>
    </div>
  );
}
