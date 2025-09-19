import Link from "next/link";

export default function Page() {
  // Esempio: sostituisci con valore reale dopo submit form CUP
  const sample = "B12C23000010001";

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Progetti</h1>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">Apri uno specifico CUP (demo):</p>
        <div className="mt-3">
          <Link
            href={{ pathname: "/programmazione/progetti/[cup]", query: { cup: sample } }}
            className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Apri {sample}
          </Link>
        </div>
      </div>
    </div>
  );
}
