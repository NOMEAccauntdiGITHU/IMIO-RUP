import { supabaseServer } from '@/lib/supabaseServer';
import KeyValue from '@/components/KeyValue';
import UdfPanel from '@/components/UdfPanel';

export default async function ProgettoPage({ params:{ cup } }:{ params:{ cup:string } }) {
  const sb = supabaseServer();
  const { data, error } = await sb.rpc('fn_progetto_tree', { _cup: cup });

  if (error) return <pre className="text-red-600">Errore: {error.message}</pre>;
  if (!data) return <div className="text-sm">CUP non trovato o non autorizzato.</div>;

  const t:any = data;

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold">{t.progetto?.titolo} <span className="text-sm text-gray-500">({t.cup})</span></h1>
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

      {/* PROGETTAZIONE LAVORI: DOCFAP, DIP, PFTE, Esecutivo */}
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
            {(t.progettazione?.lavori?.pfte ?? []).map((pf:any) => (
              <li key={pf.versione} className="border rounded p-2">
                <div className="text-sm">v{pf.versione} — {pf.soluzione} — Validato: {pf.is_validato ? 'Sì':'No'}</div>
                <UdfPanel cup={cup} entityKind="prog_lav_pfte" entityKey={{ versione: pf.versione }} />
              </li>
            ))}
          </ul>
        </div>

        <div className="border rounded p-3">
          <h3 className="font-medium">Esecutivo (tutte le versioni)</h3>
          <ul className="space-y-2">
            {(t.progettazione?.lavori?.esecutivo ?? []).map((es:any) => (
              <li key={es.versione} className="border rounded p-2">
                <div className="text-sm">v{es.versione} — Validato: {es.is_validato ? 'Sì':'No'}</div>
                <UdfPanel cup={cup} entityKind="prog_lav_esecutivo" entityKey={{ versione: es.versione }} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PROGETTAZIONE Servizi/Forniture */}
      <section className="space-y-3">
        <h2 className="font-semibold text-lg">Progettazione Servizi & Forniture</h2>
        <div className="border rounded p-3">
          <h3 className="font-medium">Esigenza</h3>
          <pre className="text-xs overflow-auto">{JSON.stringify(t.progettazione?.servizi_forniture?.esigenza ?? {}, null, 2)}</pre>
          <UdfPanel cup={cup} entityKind="prog_sf_esigenza" entityKey={{}} />
        </div>
        <div className="border rounded p-3">
          <h3 className="font-medium">Documenti</h3>
          <pre className="text-xs overflow-auto">{JSON.stringify(t.progettazione?.servizi_forniture?.documenti ?? {}, null, 2)}</pre>
          <UdfPanel cup={cup} entityKind="prog_sf_documenti" entityKey={{}} />
        </div>
      </section>

      {/* AFFIDAMENTO */}
      <section className="space-y-3">
        <h2 className="font-semibold text-lg">Affidamento</h2>
        <ul className="space-y-3">
          {(t.affidamento?.procedure ?? []).map((pr:any) => (
            <li key={pr.n_procedura} className="border rounded p-3 space-y-2">
              <div className="font-medium">Procedura {pr.n_procedura} — {pr.oggetto}</div>
              <UdfPanel cup={cup} entityKind="procedura" entityKey={{ n_procedura: pr.n_procedura }} />

              <div className="text-sm">Lotti</div>
              <ul className="space-y-1">
                {(pr.lotti ?? []).map((l:any) => (
                  <li key={l.n_lotto} className="border rounded p-2">
                    Lotto {l.n_lotto} — {l.oggetto}
                    <UdfPanel cup={cup} entityKind="lotto" entityKey={{ n_lotto: l.n_lotto }} />
                  </li>
                ))}
              </ul>

              <div className="text-sm">CIG</div>
              <pre className="text-xs overflow-auto">{JSON.stringify(pr.cig ?? [], null, 2)}</pre>

              <div className="text-sm">Commissione</div>
              <pre className="text-xs overflow-auto">{JSON.stringify(pr.commissione ?? {}, null, 2)}</pre>

              <div className="text-sm">Verbali</div>
              <pre className="text-xs overflow-auto">{JSON.stringify(pr.verbali ?? [], null, 2)}</pre>

              <div className="text-sm">FVOE</div>
              <pre className="text-xs overflow-auto">{JSON.stringify(pr.fvoe ?? {}, null, 2)}</pre>

              <div className="text-sm">Aggiudicazioni</div>
              <ul className="space-y-1">
                {(pr.aggiudicazioni ?? []).map((a:any) => (
                  <li key={a.n_lotto} className="border rounded p-2">
                    Aggiudicazione Lotto {a.n_lotto}
                    <UdfPanel cup={cup} entityKind="aggiudicazione" entityKey={{ n_lotto: a.n_lotto, n_procedura: pr.n_procedura }} />
                  </li>
                ))}
              </ul>

              <div className="text-sm">Contratti</div>
              <ul className="space-y-1">
                {(pr.contratti ?? []).map((ct:any) => (
                  <li key={ct.n_contratto} className="border rounded p-2">
                    Contratto {ct.n_contratto}
                    <UdfPanel cup={cup} entityKind="contratto" entityKey={{ n_contratto: ct.n_contratto }} />
                  </li>
                ))}
              </ul>
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
          <div className="text-sm">Verbale consegna</div>
          <pre className="text-xs overflow-auto">{JSON.stringify(t.esecuzione?.lavori?.verbale_consegna ?? {}, null, 2)}</pre>
          <div className="text-sm">Sicurezza (eventi)</div>
          <ul className="space-y-1">
            {(t.esecuzione?.lavori?.sicurezza_eventi ?? []).map((se:any)=>(
              <li key={se.n_evento} className="border rounded p-2">
                Evento {se.n_evento}
                <UdfPanel cup={cup} entityKind="sicurezza_evento" entityKey={{ n_evento: se.n_evento }} />
              </li>
            ))}
          </ul>

          <div className="text-sm">SAL</div>
          <ul className="space-y-1">
            {(t.esecuzione?.lavori?.sal ?? []).map((s:any)=>(
              <li key={s.n_sal} className="border rounded p-2">
                SAL {s.n_sal} — Importo {s.importo}
                <UdfPanel cup={cup} entityKind="sal" entityKey={{ n_sal: s.n_sal }} />
              </li>
            ))}
          </ul>

          <div className="text-sm">Varianti</div>
          <ul className="space-y-1">
            {(t.esecuzione?.lavori?.varianti ?? []).map((v:any)=>(
              <li key={v.n_variante} className="border rounded p-2">
                Variante {v.n_variante}
                <UdfPanel cup={cup} entityKind="variante" entityKey={{ n_variante: v.n_variante }} />
              </li>
            ))}
          </ul>

          <div className="text-sm">Ordini di servizio</div>
          <ul className="space-y-1">
            {(t.esecuzione?.lavori?.ordini_servizio ?? []).map((o:any)=>(
              <li key={o.n_os} className="border rounded p-2">
                OS {o.n_os}
                <UdfPanel cup={cup} entityKind="ordine_servizio" entityKey={{ n_os: o.n_os }} />
              </li>
            ))}
          </ul>
        </div>

        <div className="border rounded p-3">
          <h3 className="font-medium">Servizi</h3>
          <div className="text-sm">DEC incarico</div>
          <pre className="text-xs overflow-auto">{JSON.stringify(t.esecuzione?.servizi?.dec_incarico ?? {}, null, 2)}</pre>
          <div className="text-sm">Pagamenti</div>
          <ul className="space-y-1">
            {(t.esecuzione?.servizi?.pagamenti ?? []).map((p:any)=>(
              <li key={p.n_cert} className="border rounded p-2">
                Cert. {p.n_cert}
                <UdfPanel cup={cup} entityKind="servizio_pagamento" entityKey={{ n_cert: p.n_cert }} />
              </li>
            ))}
          </ul>
        </div>

        <div className="border rounded p-3">
          <h3 className="font-medium">Forniture</h3>
          <ul className="space-y-1">
            {(t.esecuzione?.forniture?.consegne ?? []).map((c:any)=>(
              <li key={c.n_consegna} className="border rounded p-2">
                Consegna {c.n_consegna}
                <UdfPanel cup={cup} entityKind="fornitura_consegna" entityKey={{ n_consegna: c.n_consegna }} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* COLLAUDO & PUBBLICAZIONI */}
      <section className="space-y-3">
        <h2 className="font-semibold text-lg">Collaudo e Pubblicazioni</h2>

        <div className="border rounded p-3">
          <h3 className="font-medium">Collaudatore</h3>
          <pre className="text-xs overflow-auto">{JSON.stringify(t.collaudo?.incarico ?? {}, null, 2)}</pre>
          <UdfPanel cup={cup} entityKind="collaudatore_incarico" entityKey={{}} />
        </div>

        <div className="border rounded p-3">
          <h3 className="font-medium">Esito</h3>
          <pre className="text-xs overflow-auto">{JSON.stringify(t.collaudo?.esito ?? {}, null, 2)}</pre>
          <UdfPanel cup={cup} entityKind="collaudo_esito" entityKey={{}} />
        </div>

        <div className="border rounded p-3">
          <h3 className="font-medium">Pubblicazioni</h3>
          <pre className="text-xs overflow-auto">{JSON.stringify(t.pubblicazioni ?? [], null, 2)}</pre>
          <UdfPanel cup={cup} entityKind="pubblicazione" entityKey={{}} />
        </div>
      </section>
    </div>
  );
}
