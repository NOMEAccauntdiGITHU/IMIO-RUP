'use client';
import useSWR from 'swr';
import Link from 'next/link';
const fetcher = (u:string)=>fetch(u).then(r=>r.json());
export default function Admin(){
  const { data } = useSWR('/api/admin', fetcher);
  return <div className="space-y-4">
    <h1 className="text-2xl font-semibold">Admin</h1>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.map((t:any)=>(<Link key={t.table_name} href={`/admin/${t.table_name}`} className="card p-6">{t.table_name}</Link>))}
    </div>
  </div>;
}