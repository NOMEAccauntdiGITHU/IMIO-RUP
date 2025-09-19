"use server";
import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import type { Route } from "next";
export async function createCup(formData: FormData) {
  const raw = (formData.get("cup_code") ?? "").toString();
  const cup_code = raw.trim().toUpperCase();
  if (!cup_code) return;
  const sb = await supabaseServer();
  await sb.from("cup").upsert({ cup_code }, { onConflict: "cup_code" });
  const to = `/programmazione/progetti/${encodeURIComponent(cup_code)}` as unknown as Route;
  redirect(to);
}
