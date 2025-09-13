'use client';
import { useState } from 'react';
import useSWR from 'swr';
import TextInput from '@/components/forms/TextInput';
const fetcher=(u:string,init?:any)=>fetch(u,init).then(r=>r.json());

export default function Page(){
  const search = typeof window!=='undefined'? new URLSearchParams(window.location.search): new URLSearchParams();
  const contratto_id = search.get('contratto_id');
  const table = 'sal';
  const { data, mutate } = useSWR(contratto_id?`/api/admin/rows?table=${table}&contratto_id=${contratto_id}`:`/api/admin/rows?table=${table}`, fetcher);
  const rows = data?.rows??[];
  const [creating,setCreating]=useState(false);
  async function create(rec:any){
    await fetcher('/api/admin/rows',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({table,record:rec})});
    setCreating(false); mutate();
  }
  return <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold">Stati di Avanzamento Lavori (SAL)</h1>
      <button className="px-4 py-2 rounded-2xl bg-slate-900 text-white" onClick={()=>setCreating(true)}>Nuovo SAL</button>
    </div>
    <div className="overflow-auto border rounded-2xl">
      <table className="w-full text-sm">
        <thead className="bg-slate-50"><tr>
          <th className="p-3">N°</th><th className="p-3">Data</th><th className="p-3">Importo lavori</th>
        </tr></thead>
        <tbody>
          {rows.map((r:any,i:number)=>(<tr key={i} className="border-t">
            <td className="p-3">{r.numero}</td>
            <td className="p-3">{new Date(r.data_sal).toLocaleDateString()}</td>
            <td className="p-3">{r.importo_lavori}</td>
          </tr>))}
        </tbody>
      </table>
    </div>
    {creating && <FormCreate onSubmit={create} contratto_id={contratto_id}/>}
  </div>;
}

function FormCreate({onSubmit, contratto_id}:{onSubmit:(rec:any)=>void; contratto_id:string|null}){
  const [numero,setNumero]=useState('');
  const [data_sal,setData]=useState('');
  const [importo_lavori,setImporto]=useState('');
  return <form onSubmit={(e)=>{e.preventDefault(); onSubmit({ contratto_id, numero: Number(numero), data_sal, importo_lavori: Number(importo_lavori) });}} className="card p-6 space-y-3">
    <TextInput label="ID Contratto" name="contratto_id" value={contratto_id??''} onChange={()=>{}}/>
    <TextInput label="Numero" name="numero" type="number" value={numero} onChange={setNumero}/>
    <TextInput label="Data SAL" name="data_sal" type="date" value={data_sal} onChange={setData}/>
    <TextInput label="Importo lavori" name="importo_lavori" type="number" value={importo_lavori} onChange={setImporto}/>
    <div className="flex gap-2"><button className="px-4 py-2 rounded-2xl bg-slate-900 text-white" type="submit">Crea</button></div>
  </form>;
}
