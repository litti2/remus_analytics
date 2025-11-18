'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { saveNote, loadNote, type NoteData } from '@/lib/notes-storage';

// Only Excalidraw component should use dynamic(); utility exports are imported at call time
const Excalidraw = dynamic(
  async () => (await import('@excalidraw/excalidraw')).Excalidraw,
  { ssr: false }
);

export default function ExcalidrawCanvas({ noteId }: { noteId: string }) {
  const [title, setTitle] = useState('Untitled');
  const [justCreated, setJustCreated] = useState(false);
  const [scene, setScene] = useState<NoteData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = loadNote(noteId);
    if (saved) {
      setScene(saved);
      setTitle(saved.title || 'Untitled');
    } else {
      setJustCreated(true);
    }
  }, [noteId]);

  function handleChange(elements: unknown[], appState: unknown) {
    if (justCreated) {
      saveNote({ id: noteId, title, elements: [], appState: {}, updatedAt: Date.now() });
      setJustCreated(false);
    }

    saveNote({
      id: noteId,
      title,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      elements: elements as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      appState: appState as any,
      thumbnail: scene?.thumbnail,
      updatedAt: Date.now(),
    });
  }

  async function handleExportPNG() {
    const saved = loadNote(noteId);
    if (!saved) return;

    const { exportToBlob } = await import('@excalidraw/excalidraw');

    const blob = await exportToBlob({
      elements: saved.elements as any,
      appState: saved.appState as any,
      files: new Map() as any,
      mimeType: 'image/png',
    });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${noteId}.png`;
    a.click();
  }

  async function handleExportSVG() {
    const saved = loadNote(noteId);
    if (!saved) return;

    const { exportToSvg } = await import('@excalidraw/excalidraw');

    const svg = await exportToSvg({
      elements: saved.elements as any,
      appState: saved.appState as any,
      files: new Map() as any,
    });

    const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${noteId}.svg`;
    a.click();
  }

  async function handleExportFile() {
    const saved = loadNote(noteId);
    if (!saved) return;

    const blob = new Blob([JSON.stringify(saved)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${noteId}.excalidraw`;
    a.click();
  }

  function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    file.text().then((txt) => {
      try {
        const data = JSON.parse(txt) as NoteData;
        saveNote(data);
        setScene(data);
        window.location.reload();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Invalid file');
      }
    });
  }

  return (
    <div className="relative h-full w-full">
      <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled"
          className="rounded-md bg-secondary px-3 py-1 text-xs"
        />
      </div>

      <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
        <button onClick={handleExportPNG} className="rounded-md bg-secondary px-3 py-1 text-xs">
          PNG
        </button>
        <button onClick={handleExportSVG} className="rounded-md bg-secondary px-3 py-1 text-xs">
          SVG
        </button>
        <button onClick={handleExportFile} className="rounded-md bg-secondary px-3 py-1 text-xs">
          Export .excalidraw
        </button>

        <input ref={fileInputRef} type="file" onChange={handleImportFile} className="hidden" />
        <button onClick={() => fileInputRef.current?.click()} className="rounded-md bg-secondary px-3 py-1 text-xs">
          Import
        </button>
      </div>

      <Excalidraw initialData={scene || undefined} onChange={handleChange as any} />
    </div>
  );
}
