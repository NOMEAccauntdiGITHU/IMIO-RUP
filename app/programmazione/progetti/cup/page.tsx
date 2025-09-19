// app/programmazione/progetti/cup/page.tsx
import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import type { Route } from "next";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default function Page() {
  // Server Action: crea/associa CUP e passa allo step successivo
  async function createCup(formData: FormData) {
    "use server";

    const raw = (formData.get("cup_code") ?? "").toString();
    const cup_code = raw.trim().toUpperCase();
    if (!cup_code) return;

    const sb = await supabaseServer();

    // Se hai UNIQUE(cup_code), upsert è sicuro; altrimenti puoi usare .insert
    await sb.from("cup").upsert({ cup_code }, { onConflict: "cup_code" });

    // Typed routes: cast sicuro
    const to = `/programmazione/progetti/${encodeURIComponent(cup_code)}` as unknown as Route;
    redirect(to);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">CUP — Nuovo</h1>

      <form
        action={createCup}
        method="post"
        className="rounded-xl border bg-white p-6 shadow-sm space-y-4 max-w-xl"
      >
        <div>
          <label htmlFor="cup_code" className="block text-sm font-medium text-slate-700">
            Codice CUP
          </label>
          <input
            id="cup_code"
            name="cup_code"
            type="text"
            required
            placeholder="B12C23000010001"
            pattern="[A-Za-z0-9]{15}"
            title="Inserisci 15 caratteri alfanumerici"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-slate-400"
          />
          <p className="mt-1 text-xs text-slate-500">Formato alfanumerico, 15 caratteri.</p>
        </div>

        <button
          type="submit"
          className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Continua
        </button>
      </form>
    </div>
  );
}
