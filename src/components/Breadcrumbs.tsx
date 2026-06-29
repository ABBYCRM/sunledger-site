import Link from 'next/link';

interface Crumb { href?: string; label: string; }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container-content py-4">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-slate-500">
        {items.map((it, idx) => (
          <li key={`${it.label}-${idx}`} className="flex items-center gap-1">
            {idx > 0 && <span aria-hidden="true">/</span>}
            {it.href ? (
              <Link href={it.href} className="hover:text-solar-700">{it.label}</Link>
            ) : (
              <span className="text-slate-700">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
