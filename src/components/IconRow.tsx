import { type LucideIcon } from 'lucide-react';
import { Sun, Zap, Battery, Shield, DollarSign, Home } from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  solar: Sun,
  electric: Zap,
  battery: Battery,
  shield: Shield,
  dollar: DollarSign,
  home: Home,
};

interface IconRowProps {
  items: Array<{
    icon: string;
    heading: string;
    body: string;
  }>;
}

export function IconRow({ items }: IconRowProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => {
        const Icon = ICONS[item.icon] ?? Sun;
        return (
          <div key={i} className="group flex flex-col gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-solar-100 text-solar-600 transition-transform group-hover:scale-110 group-hover:bg-solar-500 group-hover:text-white">
              <Icon size={22} strokeWidth={2} aria-hidden="true" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">{item.heading}</h3>
            <p className="text-sm leading-relaxed text-slate-600">{item.body}</p>
          </div>
        );
      })}
    </div>
  );
}
