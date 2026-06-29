import Link from 'next/link';
import { site } from '@/lib/site';

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="container-content flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-solar-500 text-base font-bold text-slate-950">SL</span>
          <span className="text-lg font-semibold tracking-tight text-slate-900">{site.name}</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          <Link href="/topics/how-solar-works" className="text-sm font-medium text-slate-700 hover:text-solar-700">How it works</Link>
          <Link href="/topics/costs-and-financing" className="text-sm font-medium text-slate-700 hover:text-solar-700">Costs</Link>
          <Link href="/topics/incentives-and-tax-credits" className="text-sm font-medium text-slate-700 hover:text-solar-700">Incentives</Link>
          <Link href="/topics/panels-and-equipment" className="text-sm font-medium text-slate-700 hover:text-solar-700">Equipment</Link>
          <Link href="/topics/battery-storage" className="text-sm font-medium text-slate-700 hover:text-solar-700">Battery</Link>
          <Link href="/topics/going-solar" className="text-sm font-medium text-slate-700 hover:text-solar-700">Going solar</Link>
          <Link href="/states" className="text-sm font-medium text-slate-700 hover:text-solar-700">States</Link>
          <Link href="/guides" className="text-sm font-medium text-slate-700 hover:text-solar-700">Guides</Link>
          <Link href="/faq" className="text-sm font-medium text-slate-700 hover:text-solar-700">FAQ</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/about" className="hidden text-sm font-medium text-slate-700 hover:text-solar-700 sm:inline">About</Link>
          <Link href="/contact" className="btn-primary text-sm">Get My Free Assessment</Link>
        </div>
      </div>
    </header>
  );
}
