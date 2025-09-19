// app/programmazzione/progetti/[cup]/page.tsx
import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

type Props = { params: { cup: string } };

export default function Page({ params }: Props) {
  // Server Action: crea la procedura minima collegata al CUP
  async function createProcedura(formData: FormData) {
    "use server";

    const titolo = String(formData.get("titolo") || "").trim();
    if (!titolo) return;

    const cup_code = params.cup.toUpperCase();
    const sb = await supabaseServer();

    // 1) Trova il CUP.id
    const { data: cupRow, error: cupErr } = await sb
      .from("cup")
      .select("id")
      .eq("cup_code", cup_code)
      .single();

    if (cupErr || !cupRow?.id) {
      // CUP inesistente: torna alla pagina CUP
      redirect("/programmazzione/progetti/cup");
    }

    // 2) Inserisci la procedura minima (adatta i campi secondo il tuo schema)
    const { data: proc, error: insErr } = await sb
      .from("procedura")
      .insert({
        titolo,
        cup_id: cupRow.id,
        // Aggiungi qui eventuali campi obbligatori nel tuo schema (es. ente_id, stato, fase_id, ...).
      })
      .select("id")
      .single();

    // 3) Vai al dettaglio procedura (se inserita) oppure resta su questa pagina
    if (!insErr && proc?.id) {
      redirect(`/affidamento/procedure/${proc.id}`);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Avvia Procedura — CUP: <span className="font-mono">{params.cup.toUpperCase()}</span>
      </h1>

      <form action={createProcedura} className="rounded-xl border bg-white p-6 shadow-sm space-y-4 max-w-xl">
        <div>
          <label htmlFor="titolo" className="block text-sm font-medium text-slate-700">
            Titolo procedura
          </label>
        </div>
        <input
          id="titolo"
          name="titolo"
          type="text"
          required
          placeholder="Es.: Lavori di riqualificazione..."
          className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-slate-400"
        />

        <button
          type="submit"
          className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Crea procedura
        </button>
      </form>

      <p className="text-xs text-slate-500">
        Dopo la creazione verrai reindirizzato al dettaglio: <code>/affidamento/procedure/[id]</code>.
      </p>
    </div>
  );
}
