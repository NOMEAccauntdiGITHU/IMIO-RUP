// app/layout.tsx
import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Suite RUP',
  description: 'Gestione progetti CUP-centrica',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <header className="border-b">
          <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
            <Link href="/" className="font-semibold">Suite RUP</Link>
            <nav className="text-sm">
              {/* Usa questa se hai la rotta app/health/route.ts */}
              <Link className="underline" href="/health">health</Link>
              {/* In alternativa, se la rotta è app/api/health/route.ts, usa:
              <a className="underline" href="/api/health">health</a>
              */}
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
