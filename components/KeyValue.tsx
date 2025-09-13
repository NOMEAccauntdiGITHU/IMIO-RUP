export default function KeyValue({ k, v }: { k: string; v: any }) {
  return (
    <div className="grid grid-cols-3 gap-2 text-sm">
      <div className="text-gray-500">{k}</div>
      <div className="col-span-2 break-words">{v ?? '—'}</div>
    </div>
  );
}
