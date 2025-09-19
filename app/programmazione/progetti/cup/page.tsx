import { createCup } from "./actions";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">CUP — Nuovo</h1>
      <form action={createCup} className="rounded-xl border bg-white p-6 shadow-sm space-y-4 max-w-xl">
        <div>
          <label htmlFor="cup_code" className="block text-sm font-medium text-slate-700">Codice CUP</label>
          <input id="cup_code" name="cup_code" type="text" required placeholder="B12C23000010001"
                 pattern="[A-Za-z0-9]{15}" title="Inserisci 15 caratteri alfanumerici"
                 className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-slate-400"/>
          <p className="mt-1 text-xs text-slate-500">Formato alfanumerico, 15 caratteri.</p>
        </div>
        <button type="submit" className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
          Continua
        </button>
      </form>
    </div>
  );
}
