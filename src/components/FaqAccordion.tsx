export function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {items.map((item, idx) => (
        <details key={idx} className="group p-6">
          <summary className="cursor-pointer list-none flex items-center justify-between text-base font-semibold text-slate-900">
            <span>{item.question}</span>
            <span aria-hidden="true" className="ml-4 text-slate-400 transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-4 text-slate-700">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
