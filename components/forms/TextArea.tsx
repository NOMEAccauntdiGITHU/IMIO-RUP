'use client';
export default function TextArea({label,name,value,onChange}:{label:string;name:string;value?:any;onChange?:(v:any)=>void}){
  return <div className="grid gap-1">
    <label className="text-xs text-slate-500" htmlFor={name}>{label}</label>
    <textarea id={name} name={name} value={value??''} onChange={(e)=>onChange?.(e.target.value)} className="border rounded-xl p-2 w-full min-h-[120px]"/>
  </div>;
}
