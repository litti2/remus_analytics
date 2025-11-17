import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center p-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">404 — Page not found</h1>
        <p className="text-muted-foreground">The page you’re looking for doesn’t exist.</p>
        <div className="pt-2">
          <Link href="/overview" className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
            Go to Overview
          </Link>
        </div>
      </div>
    </main>
  );
}
