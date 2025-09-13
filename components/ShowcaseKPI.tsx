export default function ShowcaseKPI({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 text-center shadow-soft">
      <div className="text-3xl font-semibold">{value}</div>
      <div className="mt-1 text-sm text-[var(--muted)]">{label}</div>
      {hint && <div className="mt-1 text-xs text-[var(--muted)]">{hint}</div>}
    </div>
  );
}
