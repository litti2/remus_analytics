'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ExcalidrawCanvas from '@/components/ExcalidrawCanvas';

function NoteEditorInner() {
  const params = useSearchParams();
  const id = params.get('id') || `${Date.now()}`;
  return (
    <div className="fixed inset-0 z-50 bg-background">
      <ExcalidrawCanvas noteId={id} />
    </div>
  );
}

export default function NoteEditor() {
  return (
    <Suspense fallback={null}>
      <NoteEditorInner />
    </Suspense>
  );
}
