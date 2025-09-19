"use server";
import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import type { Route } from "next";
export async function createProcedura(cup_code: string, formData: FormData) {
  const titolo = (formData.get("titolo") ?? "").toString().trim();
  if (!titolo) return;
  const sb = await supabaseServer();
  const { data: cupRow } = await sb.from("cup").select("id").eq("cup_code", cup_code.toUpperCase()).single();
  if (!cupRow?.id) redirect("/programmazione/progetti/cup" as Route);
  const { data: proc, error: insErr } = await sb.from("procedura")
    .insert({ titolo, cup_id: cupRow.id })
    .select("id").single();
  if (insErr || !proc?.id) return;
  const to = `/affidamento/procedure/${proc.id}` as unknown as Route;
  redirect(to);
}
