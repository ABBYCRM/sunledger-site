import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Section } from '@/components/Section';
import { CtaSection } from '@/components/CtaSection';
import { JsonLd } from '@/components/JsonLd';
import { FaqAccordion } from '@/components/FaqAccordion';
import { buildMetadata } from '@/lib/seo';
import { breadcrumb, faqPage, webpage } from '@/lib/schema';
import { faqClusters, faqClusterSlugs } from '@/content/faqs';
import { FAQ_IMAGE, imageForState } from '@/content/images';

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
  const hero = FAQ_IMAGE[state] ?? imageForState(state, 'South');
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

      <header className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 -z-10">
          <picture>
            <source type="image/webp" sizes="100vw" srcSet={`/img/optimized/${hero}-640w.webp 640w, /img/optimized/${hero}-1024w.webp 1024w, /img/optimized/${hero}-1920w.webp 1920w`} />
            <source type="image/jpeg" sizes="100vw" srcSet={`/img/optimized/${hero}-640w.jpg 640w, /img/optimized/${hero}-1024w.jpg 1024w, /img/optimized/${hero}-1920w.jpg 1920w`} />
            <img src={`/img/optimized/${hero}-1920w.jpg`} alt={c.title} width={1920} height={1080} loading="eager" decoding="async" fetchPriority="high" className="h-full w-full object-cover" />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/95 via-slate-900/75 to-slate-900/40" aria-hidden="true" />
        </div>
        <div className="container-content flex min-h-[380px] flex-col justify-center py-20">
          <p className="mb-3 inline-flex w-fit items-center rounded-full border border-solar-500/40 bg-solar-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-solar-500">State FAQ</p>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">{c.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-200">{c.description}</p>
        </div>
      </header>

      <Section>
        <FaqAccordion items={c.items} />
      </Section>

      <CtaSection />
    </>
  );
}