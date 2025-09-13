'use client';
export default function ProgressBar({ value=0 }: { value?: number }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
      <div className="h-full rounded-full bg-slate-900" style={{ width: pct + '%' }} />
    </div>
  );
}
