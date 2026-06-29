import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Section } from '@/components/Section';
import { CtaSection } from '@/components/CtaSection';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { article, breadcrumb } from '@/lib/schema';
import { guideBySlug, guides } from '@/content/guides';
import { pillarBySlug } from '@/content/pillars';
import { stateBySlug } from '@/content/states';

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) return {};
  return buildMetadata({
    title: g.title,
    description: g.metaDescription,
    path: `/guides/${g.slug}`,
  });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) return notFound();
  const pillar = pillarBySlug(g.pillar);

  return (
    <>
      <JsonLd
        data={[
          article({
            headline: g.title,
            description: g.metaDescription,
            path: `/guides/${g.slug}`,
            datePublished: g.datePublished,
          }),
          breadcrumb([
            { name: 'Home', url: '/' },
            { name: 'Guides', url: '/guides' },
            { name: g.title, url: `/guides/${g.slug}` },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ href: '/', label: 'Home' }, { href: '/guides', label: 'Guides' }, { label: g.title }]} />

      <article>
        <header className="bg-sand-100">
          <div className="container-content py-12">
            {pillar && (
              <p className="text-xs font-semibold uppercase tracking-widest text-solar-700">{pillar.name}</p>
            )}
            <h1 className="mt-2 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">{g.h1}</h1>
            <p className="mt-4 max-w-3xl text-lg text-slate-700">{g.description}</p>
            <p className="mt-4 text-xs text-slate-500">Last updated: {site_lastUpdated()}</p>
          </div>
        </header>

        <Section>
          <div className="prose-content max-w-3xl">
            {g.sections.map((s, i) => (
              <div key={i}>
                <h2>{s.heading}</h2>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {g.relatedStateSlugs && g.relatedStateSlugs.length > 0 && (
          <Section eyebrow="State-specific follow-ups" title="Find this in your state">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.relatedStateSlugs
                .map((s) => stateBySlug(s))
                .filter((s): s is NonNullable<typeof s> => Boolean(s))
                .map((s) => (
                  <Link key={s.slug} href={`/states/${s.slug}`} className="card flex flex-col">
                    <h3 className="text-lg font-semibold text-slate-900">{s.name}</h3>
                    <p className="mt-2 text-sm text-slate-600">{s.policyPosture}</p>
                    <span className="mt-4 text-sm font-medium text-solar-700">Open {s.name} page →</span>
                  </Link>
                ))}
            </div>
          </Section>
        )}
      </article>

      <CtaSection />
    </>
  );
}

function site_lastUpdated(): string {
  return require('@/lib/site').site.lastUpdated;
}
