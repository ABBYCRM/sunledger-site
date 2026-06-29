import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Section } from '@/components/Section';
import { CtaSection } from '@/components/CtaSection';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { breadcrumb, webpage } from '@/lib/schema';
import { guides } from '@/content/guides';
import { pillarBySlug } from '@/content/pillars';

export const metadata = buildMetadata({
  title: 'Solar resource library',
  description:
    'In-depth, plain-English guides on residential solar: net metering, equipment, financing, incentives, batteries, and the solar process. No marketing spin.',
  path: '/guides',
});

export default function GuidesIndex() {
  return (
    <>
      <JsonLd
        data={[
          webpage('Solar resource library', 'In-depth guides on residential solar.', '/guides'),
          breadcrumb([{ name: 'Home', url: '/' }, { name: 'Guides', url: '/guides' }]),
        ]}
      />
      <Breadcrumbs items={[{ href: '/', label: 'Home' }, { label: 'Guides' }]} />

      <header className="bg-sand-100">
        <div className="container-content py-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Solar resource library</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-700">
            Twenty in-depth guides on the topics U.S. homeowners researching rooftop solar actually need to understand. Each is structured as a primer you can finish in one sitting.
          </p>
        </div>
      </header>

      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => {
            const pillar = pillarBySlug(g.pillar);
            return (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="card flex flex-col">
                {pillar && <p className="text-xs font-semibold uppercase tracking-wider text-solar-700">{pillar.name}</p>}
                <h2 className="mt-2 text-lg font-semibold text-slate-900">{g.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{g.description}</p>
                <span className="mt-4 text-sm font-medium text-solar-700">Read the guide →</span>
              </Link>
            );
          })}
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
