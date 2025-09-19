// app/api/procedure/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const cup_code = String(form.get("cup_code") ?? "").trim().toUpperCase();
    const titolo   = String(form.get("titolo") ?? "").trim();

    if (!cup_code) {
      return NextResponse.redirect(new URL("/programmazione/progetti/cup", request.url));
    }
    if (!titolo) {
      return NextResponse.redirect(new URL(`/programmazione/progetti/${encodeURIComponent(cup_code)}`, request.url));
    }

    const sb = await supabaseServer();
    const { data: cupRow, error: cupErr } = await sb.from("cup").select("id").eq("cup_code", cup_code).single();
    if (cupErr || !cupRow?.id) {
      console.error("API /api/procedure cup lookup error:", cupErr);
      return NextResponse.redirect(new URL("/programmazione/progetti/cup", request.url));
    }

    const { data: proc, error: insErr } = await sb.from("procedura").insert({ titolo, cup_id: cupRow.id }).select("id").single();
    if (insErr || !proc?.id) {
      console.error("API /api/procedure insert error:", insErr);
      return NextResponse.redirect(new URL(`/programmazione/progetti/${encodeURIComponent(cup_code)}`, request.url));
    }

    return NextResponse.redirect(new URL(`/affidamento/procedure/${proc.id}`, request.url));
  } catch (e) {
    console.error("API /api/procedure error:", e);
    return NextResponse.redirect(new URL("/programmazione/progetti/cup", request.url));
  }
}
