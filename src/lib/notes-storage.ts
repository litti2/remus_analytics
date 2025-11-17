export type NoteData = {
  id: string;
  title: string;
  elements: any[];
  appState: any;
  thumbnail?: string;
  updatedAt: number;
};

const KEY = (id: string) => `note-${id}`;

export function saveNote(note: NoteData) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY(note.id), JSON.stringify(note));
  window.dispatchEvent(new Event('storage-sync'));
}

export function loadNote(id: string): NoteData | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(KEY(id));
  return raw ? JSON.parse(raw) : null;
}

export function getAllNotes(): NoteData[] {
  if (typeof window === 'undefined') return [];
  return Object.keys(localStorage)
    .filter((k) => k.startsWith('note-'))
    .map((k) => {
      const v = localStorage.getItem(k);
      return v ? JSON.parse(v) : null;
    })
    .filter(Boolean)
    .sort((a: NoteData, b: NoteData) => b.updatedAt - a.updatedAt);
}

export function deleteNote(id: string) {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEY(id));
  window.dispatchEvent(new Event('storage-sync'));
}

export function renameNote(id: string, title: string) {
  const n = loadNote(id);
  if (!n) return;
  saveNote({ ...n, title, updatedAt: Date.now() });
}

export function createNote(id: string, title: string) {
  const now = Date.now();
  saveNote({ id, title, elements: [], appState: {}, updatedAt: now });
}
