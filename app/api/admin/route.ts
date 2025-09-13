import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabaseAdmin';

export async function GET() {
  const sb = createAdminClient();
  const { data, error } = await sb.rpc('introspect_tables').select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
