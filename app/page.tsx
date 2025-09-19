// app/page.tsx
import { supabaseServer } from "@/lib/supabaseServer";
import HomeFilters from "@/components/HomeFilters";
import ProjectCard from "@/components/ProjectCard";
import type { HomeRow } from "@/types/db";
import Link from "next/link";
import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  FolderKanban,
  FileText,
  CalendarClock,
  Layers,
  BarChart3,
  PanelsTopLeft,
} from "lucide-react";

type SP = {
  anno?: string | string[];
  categoria?: string | string[];
  q?: string | string[];
  page?: string | string[];
};

const first = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v);

async function getCount(sb: Awaited<ReturnType<typeof supabaseServer>>, table: string) {
  // Conta record senza scaricare dati. Se la tabella non esiste -> ritorna null.
  const { count, error } = await sb.from(table).select("*", { count: "exact", head: true });
  if (error) return null;
  return count ?? null;
}

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

  // Totali per il riassunto (se alcune tabelle non esistono, il totale sarà null e verrà mostrato "—")
  const [
    totalProcedure,
    totalContratti,
    totalDocumenti,
    totalScadenze,
    totalTemplate,
  ] = await Promise.all([
    getCount(sb, "procedura"),
    getCount(sb, "contratto"),
    getCount(sb, "documento"),
    getCount(sb, "scadenza"),
    getCount(sb, "template"),
  ]);

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
    query = query.gte("created_at", `${_anno}-01-01`).lt("created_at", `${_anno + 1}-01-01`);
  }

  if (_q) {
    query = query.ilike("titolo", `%${_q}%`);
  }

  const { data, error } = await query;

  if (error) {
    return <pre className="text-red-600 whitespace-pre-wrap">Errore: {error.message}</pre>;
  }

  const rows: HomeRow[] = (data ?? []).map((r: any) => ({
    ...r,
    cup: r?.cup?.cup_code ?? null,
    ente_nome: r?.ente?.nome ?? null,
    fase_nome: r?.fase?.nome ?? null,
    fase_codice: r?.fase?.codice ?? null,
  })) as HomeRow[];

  // Voci di menu principali
  const navItems: Array<{
    href: string;
    label: string;
    icon: React.ElementType;
    total: number | null;
  }> = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard, total: null },
    { href: "/affidamento/procedure", label: "Procedure", icon: FolderKanban, total: totalProcedure },
    { href: "/contratti", label: "Contratti", icon: Layers, total: totalContratti },
    { href: "/documenti", label: "Documenti", icon: FileText, total: totalDocumenti },
    { href: "/scadenze", label: "Scadenze", icon: CalendarClock, total: totalScadenze },
    { href: "/template", label: "Template", icon: PanelsTopLeft, total: totalTemplate },
    { href: "/report", label: "Report", icon: BarChart3, total: null },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* Toggle sidebar (no-JS) */}
      <input id="nav-toggle" type="checkbox" className="peer/nav sr-only" />

      <div className="mx-auto flex max-w-[1600px] gap-0">
        {/* SIDEBAR */}
        <aside className="sticky top-0 h-screen w-72 border-r bg-white/70 backdrop-blur transition-all duration-300 peer-checked/nav:w-20">
          <div className="flex items-center justify-between px-3 py-3">
            <div className="flex items-center gap-2">
              <div className="rounded-xl border p-2">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <span className="text-sm font-semibold tracking-wide transition-opacity duration-300 peer-checked/nav:opacity-0 peer-checked/nav:invisible">
                Suite RUP
              </span>
            </div>
            <label
              htmlFor="nav-toggle"
              className="inline-flex cursor-pointer items-center rounded-xl border bg-white px-2 py-1 shadow-sm transition hover:shadow"
              aria-label="Riduci/espandi menu"
              title="Riduci/espandi menu"
            >
              <ChevronLeft className="h-4 w-4 transition peer-checked/nav:hidden" />
              <ChevronRight className="hidden h-4 w-4 transition peer-checked/nav:block" />
            </label>
          </div>

          <nav className="mt-2 space-y-1 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-3 rounded-xl border bg-white px-3 py-2.5 shadow-sm transition hover:shadow"
                >
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-50 ring-1 ring-inset ring-indigo-200">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1 transition-all duration-300 peer-checked/nav:opacity-0 peer-checked/nav:invisible">
                    <div className="flex items-center justify-between">
                      <span className="truncate text-sm font-medium">{item.label}</span>
                      <span className="text-xs text-slate-500 tabular-nums">
                        {item.total ?? "—"}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* MAIN */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Header */}
          <header className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          </header>

          {/* Filtri */}
          <div className="mb-6 rounded-2xl border bg-white p-3 shadow-sm">
            <HomeFilters />
          </div>

          {/* RIASSUNTO CARDS */}
          <section aria-label="Riassunto" className="mb-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {navItems
                .filter((n) => n.href !== "/")
                .map((n) => {
                  const Icon = n.icon;
                  return (
                    <Link
                      key={n.href}
                      href={n.href}
                      className="group block rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md"
                    >
                      <div className="flex items-start gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 ring-1 ring-inset ring-emerald-200">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center justify-between gap-3">
                            <h3 className="truncate text-sm font-semibold">{n.label}</h3>
                            <span className="text-xs text-slate-500 tabular-nums">
                              {n.total ?? "—"}
                            </span>
                          </div>
                          <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                            Vai a {n.label.toLowerCase()} ➜
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </section>

          {/* LISTA PROGETTI */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Progetti</h2>
              <Link
                href="/affidamento/procedure"
                className="text-sm font-medium text-indigo-600 underline-offset-4 hover:underline"
              >
                Vedi tutti
              </Link>
            </div>

            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {rows.map((r, i) => (
                <li key={r.id ?? r.cup ?? `${r.titolo}-${i}`}>
                  <Link href={`/affidamento/procedure/${r.id}`} className="block">
                    <ProjectCard r={r} />
                  </Link>
                </li>
              ))}
            </ul>

            {rows.length === 0 && (
              <div className="rounded-xl border bg-white p-6 text-sm text-slate-500">
                Nessun progetto trovato.
              </div>
            )}

            <div className="text-xs text-slate-500">Pagina {page}</div>
          </section>
        </main>
      </div>
    </div>
  );
}
