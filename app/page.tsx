import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const h = headers();
  const proto = h.get('x-forwarded-proto') ?? 'http';
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? `localhost:${process.env.PORT ?? 3000}`;
  const base = `${proto}://${host}`;

  let health: any = null;
  try {
    const res = await fetch(new URL('/health', base), { cache: 'no-store' });
    health = await res.json();
  } catch (e:any) {
    health = { ok: false, error: String(e) };
  }

  return (
    <main style={{ padding: 20, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Suite RUP</h1>
      <p>health</p>
      <pre>{JSON.stringify(health, null, 2)}</pre>
      <p style={{opacity:.7}}>Ripristino home originale: <code>mv app/page.tsx.bak app/page.tsx</code></p>
    </main>
  );
}
