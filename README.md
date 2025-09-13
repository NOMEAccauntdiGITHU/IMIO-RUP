# Suite RUP UI (Next.js + Supabase)

## Requisiti
- Imposta `.env.local` (copia da `.env.example`)
- DB con RPC disponibili:
  - `fn_home_progetti_live`
  - `fn_progetto_tree`
  - `udf_add_def`, `udf_set_value`, `udf_list_for_instance`
- RLS attiva e ACL CUP per l’utente anon

## Avvio locale
```bash
npm i
npm run dev
# http://localhost:3000
```

## Build & start (production-like)
```bash
npm run build
npm start
```

## Deploy Vercel
- Importa repo GitHub
- Imposta env `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Build standard di Next.js
