// app/page.tsx
import { supabaseServer } from "@/lib/supabaseServer";
import HomeFilters from "@/components/HomeFilters";
import ProjectCard from "@/components/ProjectCard";
import type { HomeRow } from "@/types/db";
import React from "react";

type SP = {
  anno?: string | string[];
  categoria?: string | string[];
  q?: string | string[];
  page?: string | string[];
};

type RPCArgs = {
  _anno: number | null;
  _categoria_text: string | null;
  _q: string | null;
  _limit: number;
  _offset: number;
};

export default async function Home({ searchParams }: { searchParams?: SP }) {
  const sb = await supabaseServer();

  const first = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v);

  const annoStr = first(searchParams?.anno);
  const categoriaStr = first(searchParams?.categoria);
  const qStr = first(searchParams?.q);
  const pageStr = first(searchParams?.page) ?? "1";

  const _anno = annoStr && /^\d{4}$/.test(annoStr) ? parseInt(annoStr, 10) : null;
  const _categoria_text = categoriaStr?.trim() || null;
  const _q = qStr?.trim() || null;

  let page = parseInt(pageStr, 10);
  if (!Number.isFinite(page) || page < 1) page = 1;

  const limit = 20;
  const offset = (page - 1) * limit;

  const params: RPCArgs = { _anno, _categoria_text, _q, _limit: limit, _offset: offset };

  const { data, error } = await sb.rpc("fn_home_progetti_live", params as RPCArgs);

  if (error) {
    return <pre className="text-red-600 whitespace-pre-wrap">Errore: {error.message}</pre>;
  }

  const rows: HomeRow[] = (data ?? []) as HomeRow[];

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">Progetti</h1>
      <HomeFilters />
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {rows.map((r) => (
          <li key={r.cup}>
            <ProjectCard r={r} />
          </li>
        ))}
      </ul>
      {rows.length === 0 && <div className="text-sm text-gray-500">Nessun progetto trovato.</div>}
      <div className="text-xs text-gray-500 mt-4">Pagina {page}</div>
    </section>
  );
}
