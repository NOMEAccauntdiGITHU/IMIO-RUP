// app/affidamento/procedure/[id]/page.tsx
type Props = { params: { id: string } };
export default function Page({ params }: Props) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Affidamento – Dettaglio Procedura</h1>
      <div className="card rounded-xl border bg-white p-6 shadow-sm">
        ID procedura: <code>{params.id}</code>
      </div>
    </div>
  );
}
