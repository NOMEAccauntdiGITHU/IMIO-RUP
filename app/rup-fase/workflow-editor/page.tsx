'use client';
import useSWR from 'swr';
import JSONEditor from '@/components/forms/JSONEditor';
import { useState } from 'react';
const fetcher=(u:string,init?:any)=>fetch(u,init).then(r=>r.json());
export default function Page(){
  const [fase,setF]=useState('P'); const [codice_gate,setG]=useState('P1'); const [descrizione,setD]=useState(''); const [requisiti,setR]=useState<any>(["CUP","DUP","QE_base"]);
  async function crea(){
    await fetcher('/api/admin/rows',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({table:'workflow_gate',record:{fase: fase, codice_gate, descrizione, requisiti}})});
    alert('Creato'); location.reload();
  }
  return <div className="space-y-4">
    <h1 className="text-2xl font-semibold">Workflow Editor</h1>
    <div className="card p-6 space-y-3">
      <div className="grid md:grid-cols-2 gap-3">
        <label className="grid gap-1 text-sm">Fase<input className="border rounded-xl p-2" value={fase} onChange={e=>setF(e.target.value)} /></label>
        <label className="grid gap-1 text-sm">Codice gate<input className="border rounded-xl p-2" value={codice_gate} onChange={e=>setG(e.target.value)} /></label>
      </div>
      <label className="grid gap-1 text-sm">Descrizione<input className="border rounded-xl p-2" value={descrizione} onChange={e=>setD(e.target.value)} /></label>
      <JSONEditor label="Requisiti" name="requisiti" value={requisiti} onChange={setR}/>
      <button onClick={crea} className="px-4 py-2 rounded-2xl bg-slate-900 text-white">Crea gate</button>
    </div>
  </div>;
}
