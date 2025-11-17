'use client';

import { useSearchParams } from 'next/navigation';
import ExcalidrawCanvas from '@/components/ExcalidrawCanvas';

export default function NoteEditor() {
  const params = useSearchParams();
  const id = params.get('id') || `${Date.now()}`;
  return (
    <div className="fixed inset-0 z-50 bg-background">
      <ExcalidrawCanvas noteId={id} />
    </div>
  );
}
