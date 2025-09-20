'use client';
import { useState } from 'react';
import useSWR from 'swr';
import TextInput from '@/components/forms/TextInput';
import TextArea from '@/components/forms/TextArea';
import JSONEditor from '@/components/forms/JSONEditor';

const fetcher=(u:string,init?:any)=>fetch(u,init).then(r=>r.json());

export default function Page({ params }:{ params: { cup?: string, fase?: string, id?: string } }){
  const search = typeof window!=='undefined'? new URLSearchParams(window.location.search): new URLSearchParams();
  const procedura = search.get('procedura_id');
  const table = 'giornale_lavori';
  const [creating,setCreating]=useState(false);
  const { data, mutate } = useSWR(procedura?`/api/admin/rows?table=${table}&page=1&size=50&procedura_id=${procedura}`:`/api/admin/rows?table=${table}&page=1&size=50`, fetcher);
  const rows = data?.rows??[];

  async function create(rec:any){
    await fetcher('/api/admin/rows',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({table,record:rec})});
    setCreating(false); mutate();
  }

  return <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold">Giornale Lavori</h1>
      <button className="px-4 py-2 rounded-2xl bg-slate-900 text-white" onClick={()=>setCreating(true)}>Nuovo</button>
    </div>

    <div className="overflow-auto border rounded-2xl">
      <table className="w-full text-sm">
        <thead className="bg-slate-50">
          <tr><th className="p-3">Data</th><th className="p-3">Lavorazioni</th><th className="p-3">Note</th><th className="p-3">Azioni</th></tr>
        </thead>
        <tbody>
          {rows.map((r:any,i:number)=>(
            <tr key={i} className="border-t"><td className="p-3">{new Date(r.data_giorno).toLocaleDateString()}</td><td className="p-3">{r.lavorazioni}</td><td className="p-3">{r.note}</td>
              <td className="p-3">
                {/* per semplicità usa Admin per edit/delete oppure estendere qui */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {creating && <FormCreate onSubmit={create} procedura_id={procedura} />}
  </div>;
}

function FormCreate({onSubmit, procedura_id}:{onSubmit:(rec:any)=>void; procedura_id:string|null}){
  const [data_giorno,setData]=useState(''); const [lavorazioni,setLav]=useState(''); const [note,setNote]=useState('');
  return <form onSubmit={(e)=>{e.preventDefault(); onSubmit({ procedura_id, data_giorno, lavorazioni, note });}} className="card p-6 space-y-3">
    <TextInput label="Procedura ID" name="procedura_id" value={procedura_id??""} onChange={()=>{}} /><TextInput label="Data" name="data_giorno" type="date" value={data_giorno} onChange={setData} /><TextArea label="Lavorazioni" name="lavorazioni" value={lavorazioni} onChange={setLav} /><TextArea label="Note" name="note" value={note} onChange={setNote} />
    <div className="flex gap-2">
      <button className="px-4 py-2 rounded-2xl bg-slate-900 text-white" type="submit">Crea</button>
    </div>
  </form>;
}
