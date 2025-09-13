import './globals.css';
import Link from 'next/link';

export const metadata = {
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
              <a className="underline" href="/api/health">health</a>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
