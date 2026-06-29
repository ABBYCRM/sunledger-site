import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Sun, Zap, Battery, DollarSign, Home, Info } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CtaSection } from '@/components/CtaSection';
import { CardImage } from '@/components/CardImage';
import { JsonLd } from '@/components/JsonLd';
import { Picture } from '@/components/Picture';
import { Callout } from '@/components/Callout';
import { IconRow } from '@/components/IconRow';
import { FinancingComparison } from '@/components/FinancingComparison';
import { buildMetadata } from '@/lib/seo';
import { breadcrumb, webpage } from '@/lib/schema';
import { pillarBySlug, pillars } from '@/content/pillars';
import { guides } from '@/content/guides';
import { imageForGuide, imageForPillar } from '@/content/images';

// Pillar-specific icon layouts for the overview
const PILLAR_ICON_ROWS: Record<string, Array<{ icon: string; heading: string; body: string }>> = {
  'how-solar-works': [
    { icon: 'solar', heading: 'Photovoltaic cells', body: 'Silicon cells convert sunlight into direct-current electricity via the photovoltaic effect.' },
    { icon: 'electric', heading: 'Inverter converts DC → AC', body: 'The inverter turns DC from panels into alternating current your home runs on.' },
    { icon: 'home', heading: 'Grid-tied by default', body: 'Most U.S. homes are grid-tied: you draw from the grid at night and export excess during the day.' },
    { icon: 'battery', heading: 'Batteries are optional', body: 'Adding battery storage enables backup power and time-of-use bill management.' },
  ],
  'costs-and-financing': [
    { icon: 'dollar', heading: 'System price varies widely', body: 'A typical U.S. residential system runs $15,000–$35,000 before incentives, depending on size and equipment.' },
    { icon: 'solar', heading: 'Federal tax credit helps', body: 'The Residential Clean Energy Credit covers a percentage of equipment and installation costs.' },
    { icon: 'home', heading: 'Cash, loan, lease, or PPA', body: 'Each financing method has different ownership, tax, and maintenance implications.' },
    { icon: 'electric', heading: 'kW size drives cost', body: 'Larger systems cost more upfront but may have a lower dollar-per-watt price.' },
  ],
  'incentives-and-tax-credits': [
    { icon: 'dollar', heading: 'Federal Residential Clean Energy Credit', body: 'A percentage of qualified system costs can be claimed on your federal tax return.' },
    { icon: 'solar', heading: 'State & utility programs', body: 'Rebates, SRECs, property tax exemptions, and sales tax exemptions vary by state and utility.' },
    { icon: 'home', heading: 'Utility tariff structures', body: 'Net metering, time-of-use rates, and export credit tariffs affect your long-term bill.' },
    { icon: 'info', heading: 'Verify before you rely', body: 'Check your state energy office and utility tariff for current program status.' },
  ],
  'panels-and-equipment': [
    { icon: 'solar', heading: 'Panel type matters', body: 'Monocrystalline, polycrystalline, and thin-film panels have different efficiency and cost profiles.' },
    { icon: 'electric', heading: 'Inverter topology', body: 'String inverters, microinverters, and power optimizers each have tradeoffs for shading and monitoring.' },
    { icon: 'home', heading: 'Racking & mounting', body: 'Roof-mounted, ground-mount, and pole-mount systems use different racking hardware.' },
    { icon: 'battery', heading: 'Panel efficiency ratings', body: 'STC and PTC ratings measure output under standard and real-world conditions.' },
  ],
  'battery-storage': [
    { icon: 'battery', heading: 'Backup during outages', body: 'A battery can keep essential loads running when the grid goes down.' },
    { icon: 'electric', heading: 'Time-of-use management', body: 'Store cheap solar power during the day and use it during peak-rate evening hours.' },
    { icon: 'home', heading: 'Sizing for your needs', body: 'Battery capacity (kWh) and power rating (kW) determine how much you can run and for how long.' },
    { icon: 'solar', heading: 'AC vs. DC coupled', body: 'AC-coupled batteries are easier to add to existing solar; DC-coupled are more efficient for new installs.' },
  ],
  'going-solar': [
    { icon: 'home', heading: 'Site assessment first', body: 'An installer evaluates your roof condition, orientation, shading, and electrical panel before quoting.' },
    { icon: 'solar', heading: 'Permits & interconnection', body: 'Your installer typically handles permits, utility interconnection applications, and inspection coordination.' },
    { icon: 'electric', heading: 'Choose your installer', body: 'Check licenses, certifications (NABCEP), insurance, and local references before signing.' },
    { icon: 'dollar', heading: 'Understand the contract', body: 'Read warranty terms, production guarantees, and what happens if you sell the home.' },
  ],
};

// Prose section callout mapping — which sections get a highlighted callout
const SECTION_CALLOUTS: Record<string, Record<string, string>> = {
  'costs-and-financing': {
    'what-to-compare': 'Ask each installer to use the same production estimate (e.g. PVWatts) and the same electricity rate trajectory so you are comparing equivalent scenarios.',
  },
  'how-solar-works': {
    'measuring-output': 'A typical U.S. home installs 5–10 kW and produces roughly 6,000–12,000 kWh/year depending on location and system orientation.',
  },
  'panels-and-equipment': {
    'inverter-topology': 'Microinverters or power optimizers are generally recommended for roofs with partial shade, even from chimneys or dormers.',
  },
  'battery-storage': {
    'sizing': 'A typical U.S. home uses 25–30 kWh/day. Most backup batteries are sized at 10–20 kWh — enough for lights, fridge, and outlets during an outage, not a full day of heavy use.',
  },
};

export function generateStaticParams() {
  return pillars.map((p) => ({ pillar: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ pillar: string }> }) {
  const { pillar: slug } = await params;
  const p = pillarBySlug(slug);
  if (!p) return {};
  return buildMetadata({ title: p.name, description: p.metaDescription, path: `/topics/${p.slug}` });
}

export default async function PillarPage({ params }: { params: Promise<{ pillar: string }> }) {
  const { pillar: slug } = await params;
  const p = pillarBySlug(slug);
  if (!p) return notFound();

  const related = guides.filter((g) => g.pillar === p.slug).slice(0, 4);
  const iconRow = PILLAR_ICON_ROWS[p.slug] ?? [];
  const callouts = SECTION_CALLOUTS[p.slug] ?? {};
  const heroImg = imageForPillar(p.slug);

  return (
    <>
      <JsonLd
        data={[
          webpage(p.h1, p.description, `/topics/${p.slug}`),
          breadcrumb([{ name: 'Home', url: '/' }, { name: p.name, url: `/topics/${p.slug}` }]),
        ]}
      />
      <Breadcrumbs items={[{ href: '/', label: 'Home' }, { label: p.name }]} />

      {/* Hero */}
      <header className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 -z-10">
          <Picture baseName={heroImg} alt={p.name} sizes="100vw" widths={[640, 1024, 1920]} width={1920} height={1080} className="h-full w-full object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/90 via-slate-900/70 to-slate-900/30" aria-hidden="true" />
        </div>
        <div className="container-content flex min-h-[460px] flex-col justify-center py-20">
          <p className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-solar-500/40 bg-solar-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-solar-500">
            <Sun size={12} aria-hidden="true" /> Topic hub
          </p>
          <h1 className="mt-2 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">{p.h1}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-200">{p.intro}</p>
        </div>
      </header>

      {/* Key concepts icon row */}
      {iconRow.length > 0 && (
        <section className="border-b border-slate-200 bg-white py-16">
          <div className="container-content">
            <p className="mb-8 text-xs font-semibold uppercase tracking-widest text-solar-700">Key concepts in this guide</p>
            <IconRow items={iconRow} />
          </div>
        </section>
      )}

      {/* Detailed sections */}
      <section className="bg-sand-50 py-16">
        <div className="container-content">
          <p className="mb-8 text-xs font-semibold uppercase tracking-widest text-solar-700">Full overview</p>
          <div className="space-y-12">
            {p.sections.map((s) => (
              <div key={s.id} id={s.id} className="max-w-3xl">
                <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">{s.heading}</h2>
                <p className="leading-relaxed text-slate-700">{s.body}</p>
                {callouts[s.id] && (
                  <Callout variant="tip" title="Key point" className="mt-5">
                    {callouts[s.id]}
                  </Callout>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financing comparison table — only on costs pillar */}
      {p.slug === 'costs-and-financing' && (
        <section className="border-b border-slate-200 bg-white py-16">
          <div className="container-content">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-solar-700">Financing options</p>
            <h2 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Cash, loan, lease, or PPA — how do they compare?</h2>
            <p className="mb-8 max-w-2xl text-lg text-slate-600">
              Every financing method has a different ownership, tax, and maintenance profile. This table summarizes the key differences.
            </p>
            <FinancingComparison />
            <Callout variant="warn" title="Always compare with the same assumptions" className="mt-6 max-w-3xl">
              Ask each installer to model your first-year and five-year bill using your utility&apos;s current tariff and the same production estimate. If two installers can&apos;t agree on system size or projected output, that is itself useful information.
            </Callout>
          </div>
        </section>
      )}

      {/* Related guides */}
      {related.length > 0 && (
        <section className="border-b border-slate-200 bg-sand-50 py-16">
          <div className="container-content">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-solar-700">From the library</p>
            <h2 className="mb-8 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Related guides</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {related.map((g) => (
                <Link key={g.slug} href={`/guides/${g.slug}`} className="card flex flex-col overflow-hidden p-0">
                  <CardImage baseName={imageForGuide(g.slug)} alt={g.title} />
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold text-slate-900">{g.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-3">{g.description}</p>
                    <span className="mt-4 text-sm font-medium text-solar-700">Read the guide →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection />
    </>
  );
}
