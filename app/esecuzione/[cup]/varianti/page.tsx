'use client';
import { useState } from 'react';
import useSWR from 'swr';
import TextInput from '@/components/forms/TextInput';
import TextArea from '@/components/forms/TextArea';
const fetcher=(u:string,init?:any)=>fetch(u,init).then(r=>r.json());

export default function Page(){
  const search = typeof window!=='undefined'? new URLSearchParams(window.location.search): new URLSearchParams();
  const contratto_id = search.get('contratto_id');
  const table = 'variante';
  const { data, mutate } = useSWR(contratto_id?`/api/admin/rows?table=${table}&contratto_id=${contratto_id}`:`/api/admin/rows?table=${table}`, fetcher);
  const rows = data?.rows??[];
  const [creating,setCreating]=useState(false);
  async function create(rec:any){
    await fetcher('/api/admin/rows',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({table,record:rec})});
    setCreating(false); mutate();
  }
  return <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold">Varianti contrattuali</h1>
      <button className="px-4 py-2 rounded-2xl bg-slate-900 text-white" onClick={()=>setCreating(true)}>Nuova Variante</button>
    </div>
    <div className="overflow-auto border rounded-2xl">
      <table className="w-full text-sm">
        <thead className="bg-slate-50"><tr>
          <th className="p-3">N°</th><th className="p-3">Importo variazione</th><th className="p-3">Data perizia</th><th className="p-3">Motivazione</th>
        </tr></thead>
        <tbody>
          {rows.map((r:any,i:number)=>(<tr key={i} className="border-t">
            <td className="p-3">{r.numero}</td>
            <td className="p-3">{r.importo_variazione}</td>
            <td className="p-3">{r.data_perizia? new Date(r.data_perizia).toLocaleDateString():''}</td>
            <td className="p-3">{r.motivazione}</td>
          </tr>))}
        </tbody>
      </table>
    </div>
    {creating && <FormCreate onSubmit={create} contratto_id={contratto_id}/>}
  </div>;
}

function FormCreate({onSubmit, contratto_id}:{onSubmit:(rec:any)=>void; contratto_id:string|null}){
  const [numero,setNumero]=useState('');
  const [importo_variazione,setImporto]=useState('');
  const [data_perizia,setData]=useState('');
  const [motivazione,setMotivazione]=useState('');
  return <form onSubmit={(e)=>{e.preventDefault(); onSubmit({ contratto_id, numero:Number(numero), importo_variazione:Number(importo_variazione), data_perizia, motivazione });}} className="card p-6 space-y-3">
    <TextInput label="ID Contratto" name="contratto_id" value={contratto_id??''} onChange={()=>{}}/>
    <TextInput label="Numero" name="numero" type="number" value={numero} onChange={setNumero}/>
    <TextInput label="Importo variazione" name="importo_variazione" type="number" value={importo_variazione} onChange={setImporto}/>
    <TextInput label="Data perizia" name="data_perizia" type="date" value={data_perizia} onChange={setData}/>
    <TextArea label="Motivazione" name="motivazione" value={motivazione} onChange={setMotivazione}/>
    <div className="flex gap-2"><button className="px-4 py-2 rounded-2xl bg-slate-900 text-white" type="submit">Crea</button></div>
  </form>;
}
