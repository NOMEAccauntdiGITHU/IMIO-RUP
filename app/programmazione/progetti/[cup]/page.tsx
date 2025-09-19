// app/programmazione/progetti/[cup]/page.tsx
type Props = { params: { cup: string } };
export default function Page({ params }: Props) {
  const cup = params.cup.toUpperCase();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Avvia Procedura — CUP: <span className="font-mono">{cup}</span>
      </h1>
      <form action="/api/procedure" method="post"
            className="rounded-xl border bg-white p-6 shadow-sm space-y-4 max-w-xl">
        <input type="hidden" name="cup_code" value={cup}/>
        <div>
          <label htmlFor="titolo" className="block text-sm font-medium text-slate-700">Titolo procedura</label>
          <input id="titolo" name="titolo" type="text" required
                 placeholder="Es.: Lavori di riqualificazione..."
                 className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-slate-400"/>
          <p className="mt-1 text-xs text-slate-500">Inserisci un titolo sintetico della procedura.</p>
        </div>
        <button type="submit"
                className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
          Crea procedura
        </button>
      </form>
    </div>
  );
}
