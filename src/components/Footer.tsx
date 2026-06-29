import Link from 'next/link';
import { site } from '@/lib/site';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="container-content py-12">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-solar-500 text-base font-bold text-slate-950">SL</span>
              <span className="text-lg font-semibold text-white">{site.name}</span>
            </div>
            <p className="mt-4 text-sm text-slate-400">{site.tagline}</p>
            <p className="mt-4 text-xs text-slate-500">{site.disclosureFull}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Explore</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link className="hover:text-solar-500" href="/topics/how-solar-works">How solar works</Link></li>
              <li><Link className="hover:text-solar-500" href="/topics/costs-and-financing">Costs &amp; financing</Link></li>
              <li><Link className="hover:text-solar-500" href="/topics/incentives-and-tax-credits">Incentives</Link></li>
              <li><Link className="hover:text-solar-500" href="/topics/panels-and-equipment">Equipment</Link></li>
              <li><Link className="hover:text-solar-500" href="/topics/battery-storage">Battery storage</Link></li>
              <li><Link className="hover:text-solar-500" href="/topics/going-solar">Going solar</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Discover</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link className="hover:text-solar-500" href="/states">All 50 states</Link></li>
              <li><Link className="hover:text-solar-500" href="/guides">Resource library</Link></li>
              <li><Link className="hover:text-solar-500" href="/faq">FAQ</Link></li>
              <li><Link className="hover:text-solar-500" href="/attributions">Image attributions</Link></li>
              <li><Link className="hover:text-solar-500" href="/sitemap.xml">Sitemap</Link></li>
              <li><Link className="hover:text-solar-500" href="/llms.txt">llms.txt</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Company &amp; trust</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link className="hover:text-solar-500" href="/about">About</Link></li>
              <li><Link className="hover:text-solar-500" href="/contact">Contact</Link></li>
              <li><Link className="hover:text-solar-500" href="/privacy">Privacy</Link></li>
              <li><Link className="hover:text-solar-500" href="/terms">Terms</Link></li>
              <li><Link className="hover:text-solar-500" href="/tcpa">TCPA disclosure</Link></li>
              <li><Link className="hover:text-solar-500" href="/disclaimers">Disclaimers</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-800 pt-6 text-xs text-slate-500">
          <p>© 2026 {site.name}. All rights reserved. {site.disclosureShort}</p>
          <p className="mt-2">Last updated: {site.lastUpdated}.</p>
        </div>
      </div>
    </footer>
  );
}
