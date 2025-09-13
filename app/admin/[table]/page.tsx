'use client';
import { useState } from 'react';
import useSWR from 'swr';
import { useParams } from 'next/navigation';
const fetcher=(u:string,init?:any)=>fetch(u,init).then(r=>r.json());
export default function Page(){
  const { table } = useParams<{table:string}>();
  const [page,setPage]=useState(1); const size=20;
  const { data: cols } = useSWR(`/api/admin/columns?table=${table}`, fetcher);
  const { data: rows, mutate } = useSWR(`/api/admin/rows?table=${table}&page=${page}&size=${size}`, fetcher);
  const C = cols??[]; const R = rows?.rows??[]; const count = rows?.count??0;
  const [creating,setCreating]=useState(false);
  const [edit,setEdit]=useState<any|null>(null);
  return <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold">{table}</h1>
      <button className="px-4 py-2 rounded-2xl bg-slate-900 text-white" onClick={()=>setCreating(true)}>Nuovo</button>
    </div>
    <div className="overflow-auto border rounded-2xl">
      <table className="w-full text-sm">
        <thead className="bg-slate-50"><tr>{C.map((c:any)=><th key={c.column_name} className="text-left p-3">{c.column_name}</th>)}<th className="p-3">Azioni</th></tr></thead>
        <tbody>
          {R.map((r:any,i:number)=>(<tr key={i} className="border-t">
            {C.map((c:any)=><td key={c.column_name} className="p-3">{edit?.__i===i?
              <input className="border rounded-xl p-2" value={edit[c.column_name]??''} onChange={e=>setEdit((o:any)=>({...o,[c.column_name]:e.target.value}))}/>
              : String(r[c.column_name]??'')}</td>)}
            <td className="p-3 space-x-2">
              {edit?.__i===i? <>
                <button className="px-3 py-1 rounded-xl border" onClick={async()=>{const key=C.find((c:any)=>c.column_name==='id')?.column_name||C[0]?.column_name; await fetcher('/api/admin/rows',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({table,keyColumn:key,keyValue:edit[key],record:edit})}); setEdit(null); mutate();}}>Salva</button>
                <button className="px-3 py-1 rounded-xl border" onClick={()=>setEdit(null)}>Annulla</button>
              </> : <>
                <button className="px-3 py-1 rounded-xl border" onClick={()=>setEdit({...r,__i:i})}>Modifica</button>
                <button className="px-3 py-1 rounded-xl border" onClick={async()=>{const key=C.find((c:any)=>c.column_name==='id')?.column_name||C[0]?.column_name; await fetcher('/api/admin/rows',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({table,keyColumn:key,keyValue:r[key]})}); mutate();}}>Elimina</button>
              </>}
            </td>
          </tr>))}
        </tbody>
      </table>
    </div>
    <div className="flex items-center justify-between">
      <div>Totale: {count}</div>
      <div className="space-x-2">
        <button disabled={page<=1} onClick={()=>setPage(p=>p-1)} className="px-3 py-1 rounded-xl border disabled:opacity-50">Prev</button>
        <button disabled={R.length<size} onClick={()=>setPage(p=>p+1)} className="px-3 py-1 rounded-xl border disabled:opacity-50">Next</button>
      </div>
    </div>
    {creating && <form onSubmit={async(e)=>{e.preventDefault(); const f=new FormData(e.currentTarget as HTMLFormElement); const rec:any={}; C.forEach((c:any)=>{const v=f.get(c.column_name); if(v) rec[c.column_name]=v;}); await fetcher('/api/admin/rows',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({table,record:rec})}); setCreating(false); mutate();}} className="card p-6 space-y-3">
      <h2 className="text-lg font-semibold">Nuovo record</h2>
      {C.map((c:any)=>(<div key={c.column_name} className="grid gap-1"><label className="text-xs text-slate-500">{c.column_name}</label><input name={c.column_name} className="border rounded-xl p-2"/></div>))}
      <div className="flex gap-2">
        <button className="px-4 py-2 rounded-2xl bg-slate-900 text-white" type="submit">Crea</button>
        <button className="px-4 py-2 rounded-2xl border" type="button" onClick={()=>setCreating(false)}>Annulla</button>
      </div>
    </form>}
  </div>;
}