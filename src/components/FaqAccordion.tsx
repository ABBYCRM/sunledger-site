'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
        >
          <button
            type="button"
            aria-expanded={open === idx}
            onClick={() => setOpen(open === idx ? null : idx)}
            className="flex w-full items-center gap-3 px-6 py-5 text-left"
          >
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${open === idx ? 'bg-solar-500 text-white' : 'bg-slate-100 text-slate-500'}`} aria-hidden="true">
              <HelpCircle size={14} />
            </span>
            <span className="flex-1 text-base font-semibold text-slate-900">{item.question}</span>
            <ChevronDown
              size={18}
              className={`ml-3 shrink-0 text-slate-400 transition-transform duration-200 ${open === idx ? 'rotate-180 text-solar-600' : ''}`}
              aria-hidden="true"
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${open === idx ? 'max-h-96' : 'max-h-0'}`}
          >
            <div className="border-t border-slate-100 px-6 py-5">
              <p className="leading-relaxed text-slate-700">{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
