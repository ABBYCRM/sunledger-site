import { type LucideIcon } from 'lucide-react';

interface AnimatedSectionProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
  className?: string;
}

export function AnimatedSection({
  eyebrow,
  title,
  subtitle,
  icon: Icon,
  children,
  className = '',
}: AnimatedSectionProps) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container-content">
        {(eyebrow || Icon) && (
          <div className="mb-3 flex items-center gap-2">
            {Icon && (
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-solar-500/10 text-solar-600">
                <Icon size={18} strokeWidth={2} aria-hidden="true" />
              </span>
            )}
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-widest text-solar-700">{eyebrow}</p>
            )}
          </div>
        )}
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
        {subtitle && <p className="mb-8 max-w-2xl text-lg text-slate-600">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
