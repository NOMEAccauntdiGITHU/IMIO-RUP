import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim().replace(/\/+$/,'');
  const key = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();
  if (!url)  return NextResponse.json({ ok:false, error:'Missing NEXT_PUBLIC_SUPABASE_URL' }, { status: 500 });
  if (!key)  return NextResponse.json({ ok:false, error:'Missing NEXT_PUBLIC_SUPABASE_ANON_KEY' }, { status: 500 });

  const target = `${url}/auth/v1/health`;
  try {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 5000);
    const r = await fetch(target, {
      cache: 'no-store',
      signal: ctrl.signal,
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    });
    clearTimeout(timeout);

    const txt = await r.text();
    let body: any; try { body = JSON.parse(txt); } catch { body = txt; }

    return NextResponse.json({ ok: r.ok, status: r.status, body, target });
  } catch (e:any) {
    return NextResponse.json({ ok:false, error:String(e), target }, { status: 502 });
  }
}
