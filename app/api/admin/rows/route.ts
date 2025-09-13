import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabaseAdmin';

export async function GET(req: NextRequest) {
  const table = req.nextUrl.searchParams.get('table');
  const page = parseInt(req.nextUrl.searchParams.get('page') ?? '1', 10);
  const size = parseInt(req.nextUrl.searchParams.get('size') ?? '20', 10);
  if (!table) return NextResponse.json({ error: 'Missing table' }, { status: 400 });
  const from = (page-1)*size; const to = from+size-1;
// Build equality filters from query string (exclude known params)
const params = Object.fromEntries(req.nextUrl.searchParams.entries());
const exclude = new Set(['table','page','size']);
const filters = Object.fromEntries(Object.entries(params).filter(([k])=>!exclude.has(k)));

  const sb = createAdminClient();
  let query = sb.from(table).select('*', { count: 'exact' });
for (const [k,v] of Object.entries(filters)) {
  query = query.eq(k, v as string);
}
const { data, error, count } = await query.range(from, to);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ rows: data, count });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const table = body.table;
  const record = body.record;
  if (!table || !record) return NextResponse.json({ error: 'Missing table/record' }, { status: 400 });
  const sb = createAdminClient();
  const { data, error } = await sb.from(table).insert(record).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { table, keyColumn='id', keyValue, record } = body;
  if (!table || keyValue===undefined || !record) return NextResponse.json({ error: 'Missing params' }, { status: 400 });
  const sb = createAdminClient();
  const { data, error } = await sb.from(table).update(record).eq(keyColumn, keyValue).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { table, keyColumn='id', keyValue } = body;
  if (!table || keyValue===undefined) return NextResponse.json({ error: 'Missing params' }, { status: 400 });
  const sb = createAdminClient();
  const { data, error } = await sb.from(table).delete().eq(keyColumn, keyValue).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
