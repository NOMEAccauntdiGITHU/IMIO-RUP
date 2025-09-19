// app/progetti/[cup]/page.tsx
import Link from "next/link";
import type { Route } from "next";

type Props = { params: { cup: string } };

export default function Page({ params }: Props) {
  const CUP_ROUTE = "/cup" as Route; // <- fix typed routes

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Progetti — {params.cup}</h1>

      <div className="card rounded-xl border bg-white p-6 shadow-sm">
        <p className="mb-3 text-sm text-slate-600">
          Procedi con la configurazione del CUP o torna all’elenco CUP.
        </p>
        <Link
          href={CUP_ROUTE}
          className="inline-flex items-center rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Vai a CUP
        </Link>
      </div>
    </div>
  );
}
