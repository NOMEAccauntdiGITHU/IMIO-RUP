'use client';
export default async function Page({params}:{params: Promise<{ fase: string }>}){
  return <div className="space-y-4">
    <h1 className="text-2xl font-semibold">RUP di fase – {(await params).fase.toUpperCase()}</h1>
    <div className="card p-6">Coda approvazioni e semafori gate (placeholder, collegare a workflow_log).</div>
  </div>;
}
