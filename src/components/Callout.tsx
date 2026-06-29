import { type LucideIcon } from 'lucide-react';

type CalloutVariant = 'tip' | 'warn' | 'fact' | 'step';

const styles: Record<CalloutVariant, { bg: string; border: string; icon: string; iconColor: string; label: string }> = {
  tip: {
    bg: 'bg-solar-50',
    border: 'border-solar-400',
    icon: '💡',
    iconColor: 'text-solar-600',
    label: 'Tip',
  },
  warn: {
    bg: 'bg-amber-50',
    border: 'border-amber-400',
    icon: '⚠️',
    iconColor: 'text-amber-600',
    label: 'Watch out',
  },
  fact: {
    bg: 'bg-slate-50',
    border: 'border-slate-300',
    icon: '📋',
    iconColor: 'text-slate-600',
    label: 'Good to know',
  },
  step: {
    bg: 'bg-blue-50',
    border: 'border-blue-300',
    icon: '🔢',
    iconColor: 'text-blue-600',
    label: 'Step',
  },
};

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Callout({ variant = 'tip', title, children, className = '' }: CalloutProps) {
  const s = styles[variant];
  return (
    <div className={`my-6 rounded-xl border-l-4 ${s.bg} ${s.border} px-5 py-4 ${className}`}>
      <div className={`mb-1 flex items-center gap-2 text-sm font-semibold ${s.iconColor}`}>
        <span aria-hidden="true">{s.icon}</span>
        {title ?? s.label}
      </div>
      <div className="text-sm leading-relaxed text-slate-700">{children}</div>
    </div>
  );
}
