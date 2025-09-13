export default function ShowcaseSection({ title, subtitle, children }: { title: string; subtitle?: string; children?: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-soft">
      <h3 className="text-lg font-semibold">{title}</h3>
      {subtitle && <p className="mt-1 text-sm text-[var(--muted)]">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}
