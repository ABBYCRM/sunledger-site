interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, eyebrow, title, children, className = 'py-16' }: SectionProps) {
  return (
    <section id={id} className={`${className}`}>
      <div className="container-content">
        {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-solar-700">{eyebrow}</p>}
        {title && <h2 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>}
        {children}
      </div>
    </section>
  );
}
