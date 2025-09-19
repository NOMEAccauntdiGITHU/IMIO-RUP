// app/programmazione/progetti/page.tsx
import Link from "next/link";

export default function Page() {
  const sample = "B12C23000010001"; // esempio

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Progetti</h1>

      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-3">
        <Link
          href={{ pathname: "/programmazione/progetti/cup" }}
          className="inline-flex items-center rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Nuova procedura (CUP)
        </Link>

        <div className="text-xs text-slate-500">Oppure apri un CUP noto (demo):</div>
        <Link
          href={{ pathname: "/programmazione/progetti/[cup]", query: { cup: sample } }}
          className="inline-flex items-center rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
        >
          Apri {sample}
        </Link>
      </div>
    </div>
  );
}
