import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Section } from '@/components/Section';
import { CtaSection } from '@/components/CtaSection';
import { JsonLd } from '@/components/JsonLd';
import { FaqAccordion } from '@/components/FaqAccordion';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { breadcrumb, faqPage, webpage } from '@/lib/schema';
import { faqClusters } from '@/content/faqs';

export const metadata = buildMetadata({
  title: 'Frequently asked questions',
  description: faqClusters.general.description,
  path: '/faq',
});

export default function FaqIndex() {
  const cluster = faqClusters.general;
  return (
    <>
      <JsonLd
        data={[
          webpage(cluster.title, cluster.description, '/faq'),
          faqPage(cluster.items),
          breadcrumb([{ name: 'Home', url: '/' }, { name: 'FAQ', url: '/faq' }]),
        ]}
      />
      <Breadcrumbs items={[{ href: '/', label: 'Home' }, { label: 'FAQ' }]} />

      <header className="bg-sand-100">
        <div className="container-content py-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">{cluster.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-700">{cluster.description}</p>
        </div>
      </header>

      <Section>
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <FaqAccordion items={cluster.items} />
          </div>
          <aside className="space-y-4">
            <div className="card">
              <h2 className="text-base font-semibold text-slate-900">State-specific FAQ clusters</h2>
              <p className="mt-2 text-sm text-slate-600">Where state policy is detailed enough to merit a dedicated FAQ, we keep one:</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link className="text-solar-700 underline" href="/faq/california">California FAQ</Link></li>
                <li><Link className="text-solar-700 underline" href="/faq/texas">Texas FAQ</Link></li>
                <li><Link className="text-solar-700 underline" href="/faq/florida">Florida FAQ</Link></li>
                <li><Link className="text-solar-700 underline" href="/faq/arizona">Arizona FAQ</Link></li>
                <li><Link className="text-solar-700 underline" href="/faq/new-york">New York FAQ</Link></li>
                <li><Link className="text-solar-700 underline" href="/faq/massachusetts">Massachusetts FAQ</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
