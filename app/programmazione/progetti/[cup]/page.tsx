import Link from "next/link";

type Props = { params: { cup: string } };

export default function Page({ params }: Props) {
  const cup = params.cup?.toUpperCase() ?? "";

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Progetti — {cup}</h1>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">Step successivo della procedura per il CUP selezionato.</p>
        <div className="mt-3">
          <Link
            href={{ pathname: "/programmazione/progetti/cup" }}
            className="inline-flex items-center rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Torna a inserimento CUP
          </Link>
        </div>
      </div>
    </div>
  );
}
