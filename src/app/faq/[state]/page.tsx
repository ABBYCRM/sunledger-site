import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Section } from '@/components/Section';
import { CtaSection } from '@/components/CtaSection';
import { JsonLd } from '@/components/JsonLd';
import { FaqAccordion } from '@/components/FaqAccordion';
import { buildMetadata } from '@/lib/seo';
import { breadcrumb, faqPage, webpage } from '@/lib/schema';
import { faqClusters, faqClusterSlugs } from '@/content/faqs';

export function generateStaticParams() {
  return faqClusterSlugs().map((s) => ({ state: s }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const c = faqClusters[state];
  if (!c) return {};
  return buildMetadata({
    title: c.title,
    description: c.description,
    path: `/faq/${state}`,
  });
}

export default async function StateFaqPage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const c = faqClusters[state];
  if (!c) return notFound();
  const parentHref = `/states/${c.parent.replace(/^\//, '') === '' ? state : state}`;
  return (
    <>
      <JsonLd
        data={[
          webpage(c.title, c.description, `/faq/${state}`),
          faqPage(c.items),
          breadcrumb([
            { name: 'Home', url: '/' },
            { name: 'FAQ', url: '/faq' },
            { name: c.title, url: `/faq/${state}` },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ href: '/', label: 'Home' }, { href: '/faq', label: 'FAQ' }, { label: c.title }]} />

      <header className="bg-sand-100">
        <div className="container-content py-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">{c.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-700">{c.description}</p>
        </div>
      </header>

      <Section>
        <FaqAccordion items={c.items} />
      </Section>

      <CtaSection />
    </>
  );
}
