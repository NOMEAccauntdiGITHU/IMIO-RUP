'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function HomeFilters() {
  const params = useSearchParams();
  const router = useRouter();

  const [anno, setAnno] = useState<string>(params.get('anno') ?? '');
  const [categoria, setCategoria] = useState<string>(params.get('categoria') ?? '');
  const [q, setQ] = useState<string>(params.get('q') ?? '');

  useEffect(() => {
    setAnno(params.get('anno') ?? '');
    setCategoria(params.get('categoria') ?? '');
    setQ(params.get('q') ?? '');
  }, [params]);

  function apply(page = 1) {
    const sp = new URLSearchParams();
    if (anno) sp.set('anno', anno);
    if (categoria) sp.set('categoria', categoria);
    if (q) sp.set('q', q);
    sp.set('page', String(page));
    router.push(`/?${sp.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-3 items-end">
      <div className="flex flex-col">
        <label className="text-sm">Anno</label>
        <input
          className="border rounded px-2 py-1"
          placeholder="2025"
          value={anno}
          onChange={(e) => setAnno(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm">Categoria</label>
        <select
          className="border rounded px-2 py-1"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Tutte</option>
          <option value="LAVORI">LAVORI</option>
          <option value="SERVIZI">SERVIZI</option>
          <option value="FORNITURE">FORNITURE</option>
        </select>
      </div>
      <div className="flex flex-col grow min-w-[220px]">
        <label className="text-sm">Ricerca</label>
        <input
          className="border rounded px-2 py-1"
          placeholder="titolo o UO…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      <button onClick={() => apply(1)} className="px-3 py-2 rounded bg-black text-white">
        Applica
      </button>
    </div>
  );
}
