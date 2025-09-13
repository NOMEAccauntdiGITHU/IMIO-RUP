import ShowcaseSection from "@/components/ShowcaseSection";
import ShowcaseKPI from "@/components/ShowcaseKPI";
import ProgressBar from "@/components/ProgressBar";
import ProgressRing from "@/components/ProgressRing";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import GeneratePdfButton from "@/components/GeneratePdfButton";
import { CheckCircle2, Gauge, Layers, FileText, Shield, Zap, Search, Workflow } from "lucide-react";

export const metadata = { title: "Showcase", description: "Demo rapida delle potenzialità" };

export default function ShowcasePage() {
  return (
    <div className="space-y-6">
      {/* HERO */}
      <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-b from-white to-[#f5fff8] p-8 shadow-soft">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-semibold">La piattaforma che governa l’intero ciclo degli appalti</h2>
            <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
              Dashboard in tempo reale, automazioni e modelli intelligenti. Sicura, estendibile, pronta per crescere.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="success">Scalabile</Badge>
              <Badge variant="info">Sicura (RLS)</Badge>
              <Badge variant="neutral">No‑code fields</Badge>
              <Badge variant="warning">Automazioni</Badge>
            </div>
            <div className="mt-6 flex gap-2">
              <a href="/procedures"><Button>Inizia: crea procedura</Button></a>
              <a href="/templates"><Button variant="outline">Gestisci template</Button></a>
            </div>
          </div>
          <div className="grid w-full max-w-md grid-cols-3 gap-3">
            <ShowcaseKPI label="Procedure attive" value="42" hint="+5% nell’ultimo mese" />
            <ShowcaseKPI label="In firma" value="17" />
            <ShowcaseKPI label="Da pubblicare" value="9" />
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ShowcaseSection title="Cruscotto istantaneo" subtitle="KPI chiari, alert scadenze, trend">
          <div className="grid grid-cols-2 gap-4">
            <ProgressRing value={78} label="Completamento" />
            <div className="space-y-3">
              <ProgressBar value={64} label="Copertura documentale" />
              <ProgressBar value={32} label="Verifiche completate" />
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Ricerca & Filtri" subtitle="Trova in pochi secondi">
          <ul className="space-y-2 text-sm text-[var(--muted)]">
            <li className="flex items-center gap-2"><Search size={16}/> Testo libero (oggetto, CUP)</li>
            <li className="flex items-center gap-2"><Layers size={16}/> Tipologia e criterio</li>
            <li className="flex items-center gap-2"><Gauge size={16}/> Range date e stato</li>
          </ul>
          <a href="/procedures" className="mt-4 inline-block"><Button variant="outline">Vedi Procedure</Button></a>
        </ShowcaseSection>

        <ShowcaseSection title="Template intelligenti" subtitle="Versioni, segnaposti, PDF">
          <div className="space-y-3">
            <div className="text-sm text-[var(--muted)]">Genera un PDF di prova:</div>
            <GeneratePdfButton title="demo-template" html="<h1>Determinazione</h1><p>Oggetto: {{OGGETTO}}</p><p>Ente: {{ENTE}}</p>" segnaposti={{ OGGETTO: "Fornitura energia", ENTE: "Comune Demo" }} />
            <div className="text-xs text-[var(--muted)]">Sostituzione automatica dei {{segnaposti}}.</div>
          </div>
          <a href="/templates" className="mt-4 inline-block"><Button variant="outline">Vai ai Template</Button></a>
        </ShowcaseSection>
      </div>

      {/* Differenziali */}
      <ShowcaseSection title="Perché è diverso" subtitle="I pilastri che fanno la differenza">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border p-4">
            <Shield className="text-brand-600" size={18} />
            <div className="mt-2 font-medium">Sicurezza by design</div>
            <div className="text-sm text-[var(--muted)]">RLS, viste security invoker, audit su ogni azione.</div>
          </div>
          <div className="rounded-xl border p-4">
            <Zap className="text-brand-600" size={18} />
            <div className="mt-2 font-medium">Automazioni</div>
            <div className="text-sm text-[var(--muted)]">Promemoria scadenze, generazione documenti su evento.</div>
          </div>
          <div className="rounded-xl border p-4">
            <Workflow className="text-brand-600" size={18} />
            <div className="mt-2 font-medium">Percorsi guidati</div>
            <div className="text-sm text-[var(--muted)]">Dalla programmazione alla trasparenza, passo dopo passo.</div>
          </div>
          <div className="rounded-xl border p-4">
            <FileText className="text-brand-600" size={18} />
            <div className="mt-2 font-medium">Modelli evoluti</div>
            <div className="text-sm text-[var(--muted)]">Segnaposti, versioni, anteprime PDF in un clic.</div>
          </div>
        </div>
      </ShowcaseSection>

      {/* CTA finale */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-soft">
        <div>
          <div className="text-lg font-semibold">Pronto a vedere il valore in azione?</div>
          <div className="text-sm text-[var(--muted)]">Crea una procedura, carica un template e genera subito un PDF demo.</div>
        </div>
        <div className="flex gap-2">
          <a href="/procedures"><Button>Nuova Procedura</Button></a>
          <a href="/templates"><Button variant="outline">Crea Template</Button></a>
        </div>
      </div>
    </div>
  );
}
