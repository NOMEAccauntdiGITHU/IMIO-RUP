'use client';
export default function GeneratePdfButton() {
  return <button onClick={()=>window.print()} className="inline-flex items-center justify-center rounded-2xl px-3 py-2 border">Stampa/PDF</button>;
}
