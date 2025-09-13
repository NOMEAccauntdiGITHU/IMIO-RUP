'use client';
import { useState, useEffect } from 'react';
export default function JSONEditor({label,name,value,onChange}:{label:string;name:string;value?:any;onChange?:(v:any)=>void}){
  const [text,setText]=useState<string>(value?JSON.stringify(value,null,2):'{}');
  useEffect(()=>{ try{ onChange?.(JSON.parse(text)); }catch{} },[text]);
  return <div className="grid gap-1">
    <label className="text-xs text-slate-500">{label}</label>
    <textarea name={name} value={text} onChange={(e)=>setText(e.target.value)} className="border rounded-xl p-2 w-full min-h-[160px] font-mono text-xs"/>
  </div>;
}
