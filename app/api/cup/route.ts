import {NextResponse as R} from "next/server";export const runtime="nodejs";
export async function POST(req:Request){const f=await req.formData();const c=String(f.get("cup_code")||"").trim().toUpperCase();const u=new URL(c?`/programmazione/progetti/${encodeURIComponent(c)}`:"/programmazione/progetti/cup",req.url);return R.redirect(u,303);}
