'use client';

import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabaseClient';

type UdfDef = { name:string; label:string; data_type:string; required:boolean; options?: any };
type UdfVal = { name:string; value:any };

export default function UdfPanel({
  cup,
  entityKind,
  entityKey
}:{
  cup:string;
  entityKind:string;
  entityKey: Record<string, any>;
}) {
  const [defs, setDefs] = useState<UdfDef[]>([]);
  const [vals, setVals] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const { data, error } = await supabaseBrowser.rpc('udf_list_for_instance', {
      _cup: cup, _entity_kind: entityKind, _entity_key: entityKey
    });
    if (!error && data) {
      const d = data as { defs: UdfDef[]; values: UdfVal[] };
      setDefs(d.defs ?? []);
      const map: Record<string, any> = {};
      (d.values ?? []).forEach((v) => { map[v.name] = v.value; });
      setVals(map);
    }
    setLoading(false);
  }

  useEffect(() => { load(); /* eslint-disable-next-line */}, [cup, entityKind, JSON.stringify(entityKey)]);

  async function save(name:string, value:any) {
    setSaving(true);
    await supabaseBrowser.rpc('udf_set_value', {
      _cup: cup, _entity_kind: entityKind, _entity_key: entityKey, _name: name, _value: value
    });
    setSaving(false);
  }

  if (loading) return <div className="text-sm">UDF: caricamento…</div>;
  if (!defs.length) return <div className="text-sm text-gray-500">Nessun campo personalizzato definito.</div>;

  return (
    <div className="space-y-3">
      {defs.map((d) => (
        <div key={d.name} className="grid grid-cols-3 gap-2 items-center">
          <label className="text-sm">{d.label} {d.required && <span className="text-red-500">*</span>}</label>
          <div className="col-span-2">
            {renderInput(d, vals[d.name], (nv:any)=> save(d.name, nv))}
          </div>
        </div>
      ))}
      {saving && <div className="text-xs text-gray-500">Salvataggio…</div>}
    </div>
  );
}

function renderInput(def: UdfDef, value:any, onChange:(v:any)=>void) {
  switch (def.data_type) {
    case 'number':
      return <input className="border rounded px-2 py-1 w-full" type="number" value={value ?? ''} onChange={(e)=>onChange(Number(e.target.value))} />;
    case 'date':
      return <input className="border rounded px-2 py-1 w-full" type="date" value={value ?? ''} onChange={(e)=>onChange(e.target.value)} />;
    case 'boolean':
      return (
        <select className="border rounded px-2 py-1" value={String(value ?? '')} onChange={(e)=>onChange(e.target.value === 'true')}>
          <option value="">—</option>
          <option value="true">Sì</option>
          <option value="false">No</option>
        </select>
      );
    case 'list':
      return (
        <select className="border rounded px-2 py-1 w-full" value={value ?? ''} onChange={(e)=>onChange(e.target.value)}>
          <option value="">—</option>
          {(def.options?.items ?? []).map((opt:any) => (
            <option key={String(opt.value)} value={opt.value}>{opt.label ?? opt.value}</option>
          ))}
        </select>
      );
    default:
      return <input className="border rounded px-2 py-1 w-full" value={value ?? ''} onChange={(e)=>onChange(e.target.value)} />;
  }
}
