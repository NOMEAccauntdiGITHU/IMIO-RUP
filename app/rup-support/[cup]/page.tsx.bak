'use client';
import useSWR from 'swr';
const fetcher=(u:string)=>fetch(u).then(r=>r.json());
export default function Page({params}:{params:{cup:string}}){
  // TODO: collegare a workflow_gate e stato pratica
  return <div className="space-y-4">
    <h1 className="text-2xl font-semibold">Supporto RUP – {params.cup}</h1>
    <div className="card p-6">Checklist dinamiche e bozze atti (placeholder pronto per collegamento).</div>
  </div>;
}
