// app/api/cup/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const cup_code = String(form.get("cup_code") ?? "").trim().toUpperCase();
    if (!cup_code) {
      return NextResponse.redirect(new URL("/programmazione/progetti/cup", request.url));
    }
    const sb = await supabaseServer();
    await sb.from("cup").upsert({ cup_code }, { onConflict: "cup_code" });
    return NextResponse.redirect(new URL(`/programmazione/progetti/${encodeURIComponent(cup_code)}`, request.url));
  } catch (e) {
    console.error("API /api/cup error:", e);
    return NextResponse.redirect(new URL("/programmazione/progetti/cup", request.url));
  }
}
