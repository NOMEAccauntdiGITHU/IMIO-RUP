// app/page.tsx
import { supabaseServer } from "@/lib/supabaseServer";
import HomeFilters from "@/components/HomeFilters";
import ProjectCard from "@/components/ProjectCard";
import type { HomeRow } from "@/types/db";
import React from "react";

type SP = {
  anno?: string | string[];
  categoria?: string | string[]; // non usata (non presente nel DB)
  q?: string | string[];
  page?: string | string[];
};

const first = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v);

export default async function Home({
  // Next 15: searchParams è Promise -> va await-ato
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;

  const annoStr = first(sp.anno);
  const qStr = first(sp.q);
  const pageStr = first(sp.page) ?? "1";

  const _anno = annoStr && /^\d{4}$/.test(annoStr) ? parseInt(annoStr, 10) : null;
  const _q = qStr?.trim() || null;

  let page = parseInt(pageStr, 10);
  if (!Number.isFinite(page) || page < 1) page = 1;

  const limit = 20;
  const offset = (page - 1) * limit;

  const sb = await supabaseServer();

  let query = sb
    .from("procedura")
    .select(
      `
      id,
      titolo,
      stato,
      fase_id,
      created_at,
      fase:fase_id ( codice, nome ),
      ente:ente_id ( nome ),
      cup:cup_id ( cup_code )
    `,
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (_anno !== null) {
    query = query
      .gte("created_at", `${_anno}-01-01`)
      .lt("created_at", `${_anno + 1}-01-01`);
  }

  if (_q) {
    query = query.ilike("titolo", `%${_q}%`);
  }

  const { data, error } = await query;

  if (error) {
    return (
      <pre className="text-red-600 whitespace-pre-wrap">
        Errore: {error.message}
      </pre>
    );
  }

  const rows: HomeRow[] = (data ?? []).map((r: any) => ({
    ...r,
    cup: r?.cup?.cup_code ?? null,
    ente_nome: r?.ente?.nome ?? null,
    fase_nome: r?.fase?.nome ?? null,
    fase_codice: r?.fase?.codice ?? null,
  })) as HomeRow[];

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">Progetti</h1>
      <HomeFilters />
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {rows.map((r, i) => (
          <li key={r.cup ?? `${r.titolo}-${i}`}>
            <ProjectCard r={r} />
          </li>
        ))}
      </ul>
      {rows.length === 0 && (
        <div className="text-sm text-gray-500">Nessun progetto trovato.</div>
      )}
      <div className="text-xs text-gray-500 mt-4">Pagina {page}</div>
    </section>
  );
}
