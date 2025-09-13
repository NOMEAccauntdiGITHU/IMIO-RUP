import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabaseAdmin';

export async function GET(req: NextRequest) {
  const table = req.nextUrl.searchParams.get('table');
  if (!table) return NextResponse.json({ error: 'Missing table' }, { status: 400 });
  const sb = createAdminClient();
  const { data, error } = await sb.rpc('introspect_columns', { p_table: table });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
