import Link from 'next/link';
import GateBadges from './GateBadges';
import type { HomeRow } from '@/types/db';

export default function ProjectCard({ r }: { r: HomeRow }) {
  return (
    <li key={r.cup} className="rounded-xl p-4 border">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold">{r.titolo}</h3>
        <span className="text-xs rounded px-2 py-1 border">{r.categoria}</span>
      </div>
      <div className="text-sm mt-1">CUP: {r.cup}</div>
      <div className="text-sm">UO: {r.uo} — RUP: {r.rup_referente}</div>
      <div className="text-sm">Fase: {r.fase_attuale} — SAL %: {r.sal_percent ?? 0}</div>
      <GateBadges pfte={r.gate_pfte} esec={r.gate_esecutivo} cig={r.cig_stato} fvoe={r.fvoe_stato} />
      <div className="mt-2">
        <Link className="text-blue-600 underline" href={`/progetti/${r.cup}`}>Apri progetto</Link>
      </div>
    </li>
  );
}
