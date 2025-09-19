// app/progetti/[cup]/page.tsx
import { supabaseServer } from '@/lib/supabaseServer';
import KeyValue from '@/components/KeyValue';
import UdfPanel from '@/components/UdfPanel';

export default async function ProgettoPage({
  params,
}: {
  params: Promise<{ cup: string }>;
}) {
  const { cup } = await params;           // <-- Next 15: await
  const sb = await supabaseServer();      // <-- await il client

  // RPC (dal DB): ritorna jsonb
  const { data, error } = await sb.rpc('fn_progetto_tree', { _cup: cup });

  if (error) {
    return <pre className="text-red-600 whitespace-pre-wrap">Errore: {error.message}</pre>;
  }
  if (!data) {
    return <div className="text-sm">CUP non trovato o non autorizzato.</div>;
  }

  const t: any = data;

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold">
          {t.progetto?.titolo}{' '}
          <span className="text-sm text-gray-500">({t.cup})</span>
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <KeyValue k="Categoria" v={t.progetto?.categoria} />
          <KeyValue k="UO" v={t.progetto?.uo} />
          <KeyValue k="RUP" v={t.progetto?.rup_referente} />
          <KeyValue k="Importo QE" v={t.progetto?.importo_qe} />
          <KeyValue k="Importo contrattuale" v={t.progetto?.importo_contrattuale} />
          <KeyValue k="Fase" v={t.progetto?.fase_attuale} />
        </div>
      </header>

      {/* PROGRAMMAZIONE */}
      <section className="space-y-3">
        <h2 className="font-semibold text-lg">Programmazione</h2>

        <div className="border rounded p-3">
          <h3 className="font-medium">Quadro esigenziale</h3>
          <pre className="text-xs overflow-auto">{JSON.stringify(t.programmazione?.quadro ?? {}, null, 2)}</pre>
          <UdfPanel cup={cup} entityKind="programmazione_quadro" entityKey={{}} />
        </div>

        <div className="border rounded p-3">
          <h3 className="font-medium">CUPWeb</h3>
          <pre className="text-xs overflow-auto">{JSON.stringify(t.programmazione?.cupweb ?? {}, null, 2)}</pre>
          <UdfPanel cup={cup} entityKind="programmazione_cupweb" entityKey={{}} />
        </div>

        <div className="border rounded p-3">
          <h3 className="font-medium">Strumenti (DUP/Programmi)</h3>
          <pre className="text-xs overflow-auto">{JSON.stringify(t.programmazione?.strumenti ?? [], null, 2)}</pre>
          <UdfPanel cup={cup} entityKind="programmazione_strumenti" entityKey={{}} />
        </div>

        <div className="border rounded p-3">
          <h3 className="font-medium">Coperture</h3>
          <pre className="text-xs overflow-auto">{JSON.stringify(t.programmazione?.coperture ?? [], null, 2)}</pre>
          <UdfPanel cup={cup} entityKind="programmazione_copertura" entityKey={{}} />
        </div>
      </section>

      {/* PROGETTAZIONE LAVORI */}
      <section className="space-y-3">
        <h2 className="font-semibold text-lg">Progettazione Lavori</h2>

        <div className="border rounded p-3">
          <h3 className="font-medium">DOCFAP</h3>
          <pre className="text-xs overflow-auto">{JSON.stringify(t.progettazione?.lavori?.docfap ?? {}, null, 2)}</pre>
          <UdfPanel cup={cup} entityKind="prog_lav_docfap" entityKey={{}} />
        </div>

        <div className="border rounded p-3">
          <h3 className="font-medium">DIP</h3>
          <pre className="text-xs overflow-auto">{JSON.stringify(t.progettazione?.lavori?.dip ?? {}, null, 2)}</pre>
          <UdfPanel cup={cup} entityKind="prog_lav_dip" entityKey={{}} />
        </div>

        <div className="border rounded p-3">
          <h3 className="font-medium">PFTE (tutte le versioni)</h3>
          <ul className="space-y-2">
            {(t.progettazione?.lavori?.pfte ?? []).map((pf: any) => (
              <li key={pf.versione} className="border rounded p-2">
                <div className="text-sm">v{pf.versione} — {pf.soluzione} — Validato: {pf.is_validato ? 'Sì' : 'No'}</div>
                <UdfPanel cup={cup} entityKind="prog_lav_pfte" entityKey={{ versione: pf.versione }} />
              </li>
            ))}
          </ul>
        </div>

        <div className="border rounded p-3">
          <h3 className="font-medium">Esecutivo (tutte le versioni)</h3>
          <ul className="space-y-2">
            {(t.progettazione?.lavori?.esecutivo ?? []).map((es: any) => (
              <li key={es.versione} className="border rounded p-2">
                <div className="text-sm">v{es.versione} — Validato: {es.is_validato ? 'Sì' : 'No'}</div>
                <UdfPanel cup={cup} entityKind="prog_lav_esecutivo" entityKey={{ versione: es.versione }} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* AFFIDAMENTO */}
      <section className="space-y-3">
        <h2 className="font-semibold text-lg">Affidamento</h2>
        <ul className="space-y-3">
          {(t.affidamento?.procedure ?? []).map((pr: any) => (
            <li key={pr.n_procedura} className="border rounded p-3 space-y-2">
              <div className="font-medium">Procedura {pr.n_procedura} — {pr.oggetto}</div>
              <UdfPanel cup={cup} entityKind="procedura" entityKey={{ n_procedura: pr.n_procedura }} />
            </li>
          ))}
        </ul>
      </section>

      {/* ESECUZIONE */}
      <section className="space-y-3">
        <h2 className="font-semibold text-lg">Esecuzione</h2>
        <div className="border rounded p-3">
          <h3 className="font-medium">Lavori</h3>
          <div className="text-sm">Incarichi (DL/CSP/CSE)</div>
          <pre className="text-xs overflow-auto">{JSON.stringify(t.esecuzione?.lavori?.incarichi ?? [], null, 2)}</pre>
        </div>
      </section>
    </div>
  );
}
