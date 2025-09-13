import { supabaseServer } from '@/lib/supabaseServer';
import HomeFilters from '@/components/HomeFilters';
import ProjectCard from '@/components/ProjectCard';
import type { HomeRow } from '@/types/db';

export default async function Home({
  searchParams,
}: { searchParams: { anno?: string; categoria?: string; q?: string; page?: string } }) {
  const sb = supabaseServer();

  const _anno = searchParams.anno ? Number(searchParams.anno) : null;
  const _categoria_text = searchParams.categoria ?? null;
  const _q = searchParams.q ?? null;
  const page = Number(searchParams.page ?? '1');
  const limit = 20;
  const offset = (page - 1) * limit;

  const { data, error } = await sb.rpc('fn_home_progetti_live', {
    _anno, _categoria_text, _q, _limit: limit, _offset: offset
  });

  if (error) {
    return <pre className="text-red-600">Errore: {error.message}</pre>;
  }

  const rows = (data ?? []) as HomeRow[];

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">Progetti</h1>
      <HomeFilters />
      <ul className="grid gap-3">
        {rows.map((r) => <ProjectCard key={r.cup} r={r} />)}
      </ul>
      {rows.length === 0 && <div className="text-sm text-gray-500">Nessun progetto trovato.</div>}
      <div className="text-xs text-gray-500 mt-4">Pagina {page}</div>
    </section>
  );
}
