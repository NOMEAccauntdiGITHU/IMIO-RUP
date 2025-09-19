// app/programmazione/progetti/[cup]/page.tsx
import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import type { Route } from "next";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Props = { params: { cup: string } };

export default function Page({ params }: Props) {
  // Server Action: crea procedura collegata al CUP e reindirizza al dettaglio
  async function createProcedura(formData: FormData) {
    "use server";

    const titolo = (formData.get("titolo") ?? "").toString().trim();
    if (!titolo) return;

    const cup_code = params.cup.toUpperCase();
    const sb = await supabaseServer();

    // 1) Recupera l'ID del CUP
    const { data: cupRow } = await sb
      .from("cup")
      .select("id")
      .eq("cup_code", cup_code)
      .single();

    if (!cupRow?.id) {
      redirect("/programmazione/progetti/cup" as Route);
    }

    // 2) Inserisci la procedura minima (aggiungi qui altri campi NOT NULL se richiesti)
    const { data: proc, error: insErr } = await sb
      .from("procedura")
      .insert({
        titolo,
        cup_id: cupRow.id,
      })
      .select("id")
      .single();

    if (insErr || !proc?.id) {
      return; // TODO: UI errore se serve
    }

    // 3) Vai al dettaglio
    const to = `/affidamento/procedure/${proc.id}` as unknown as Route;
    redirect(to);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Avvia Procedura — CUP: <span className="font-mono">{params.cup.toUpperCase()}</span>
      </h1>

      <form
        action={createProcedura}
        method="post"
        className="rounded-xl border bg-white p-6 shadow-sm space-y-4 max-w-xl"
      >
        <div>
          <label htmlFor="titolo" className="block text-sm font-medium text-slate-700">
            Titolo procedura
          </label>
          <input
            id="titolo"
            name="titolo"
            type="text"
            required
            placeholder="Es.: Lavori di riqualificazione..."
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-slate-400"
          />
          <p className="mt-1 text-xs text-slate-500">
            Inserisci un titolo sintetico della procedura.
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Crea procedura
        </button>
      </form>
    </div>
  );
}
