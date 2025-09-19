// app/progetti/page.tsx
import Link from "next/link";

export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Progetti — Nuova procedura</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold">Crea un nuovo progetto</h2>
          <p className="mb-4 text-sm text-slate-600">
            Avvia la procedura e completa i dati nelle sezioni dedicate.
          </p>
          <div className="flex gap-2">
            <Link
              href="/cup"
              className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-slate-50"
            >
              Vai a CUP
            </Link>
            <Link
              href="/affidamento/procedure"
              className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Apri elenco procedure
            </Link>
          </div>
        </div>

        <div className="card rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold">Progetti esistenti</h2>
          <p className="text-sm text-slate-600">
            Consulta e gestisci i progetti/Procedure dall’elenco.
          </p>
        </div>
      </div>
    </div>
  );
}
