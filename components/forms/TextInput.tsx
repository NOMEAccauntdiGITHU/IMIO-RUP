'use client';
export default function TextInput({label,name,type='text',value,onChange}:{label:string;name:string;type?:string;value?:any;onChange?:(v:any)=>void}){
  return <div className="grid gap-1">
    <label className="text-xs text-slate-500" htmlFor={name}>{label}</label>
    <input id={name} name={name} type={type} value={value??''} onChange={(e)=>onChange?.(e.target.value)} className="border rounded-xl p-2 w-full"/>
  </div>;
}
