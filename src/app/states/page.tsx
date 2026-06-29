import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Section } from '@/components/Section';
import { CtaSection } from '@/components/CtaSection';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { breadcrumb, webpage } from '@/lib/schema';
import { states } from '@/content/states';

export const metadata = buildMetadata({
  title: 'Solar in your state — guidance for all 50 U.S. states',
  description:
    'State-specific residential solar guidance for every U.S. state. We link to DSIRE so you can track current programs yourself — we never invent incentive dollar amounts.',
  path: '/states',
});

export default function StatesIndex() {
  return (
    <>
      <JsonLd
        data={[
          webpage('Solar in your state', 'State-specific residential solar guidance for all 50 states.', '/states'),
          breadcrumb([{ name: 'Home', url: '/' }, { name: 'States', url: '/states' }]),
        ]}
      />
      <Breadcrumbs items={[{ href: '/', label: 'Home' }, { label: 'States' }]} />

      <header className="bg-sand-100">
        <div className="container-content py-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Solar in your state</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-700">
            Solar policy and utility tariff rules vary dramatically by state. Each state page below outlines what we&apos;ve observed about the residential solar landscape and links out to authoritative sources for current program tracking. We never invent rebate dollar amounts.
          </p>
        </div>
      </header>

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {states.map((s) => (
            <Link key={s.slug} href={`/states/${s.slug}`} className="card flex flex-col">
              <h2 className="text-base font-semibold text-slate-900">{s.name}</h2>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-solar-700">{s.region}</p>
              <p className="mt-2 text-sm text-slate-600 line-clamp-3">{s.policyPosture}</p>
              <span className="mt-4 text-sm font-medium text-solar-700">Open {s.name} →</span>
            </Link>
          ))}
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
