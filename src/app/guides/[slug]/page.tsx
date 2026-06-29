import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Section } from '@/components/Section';
import { CtaSection } from '@/components/CtaSection';
import { JsonLd } from '@/components/JsonLd';
import { CardImage } from '@/components/CardImage';
import { buildMetadata } from '@/lib/seo';
import { article, breadcrumb } from '@/lib/schema';
import { guideBySlug, guides } from '@/content/guides';
import { pillarBySlug } from '@/content/pillars';
import { stateBySlug } from '@/content/states';
import { imageForGuide, imageForState } from '@/content/images';
import { site } from '@/lib/site';

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
  const image = imageForGuide(g.slug);

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
        <header className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 -z-10">
            <picture>
              <source type="image/webp" sizes="100vw" srcSet={`/img/optimized/${image}-480w.webp 480w, /img/optimized/${image}-768w.webp 768w, /img/optimized/${image}-1200w.webp 1200w`} />
              <source type="image/jpeg" sizes="100vw" srcSet={`/img/optimized/${image}-480w.jpg 480w, /img/optimized/${image}-768w.jpg 768w, /img/optimized/${image}-1200w.jpg 1200w`} />
              <img src={`/img/optimized/${image}-1200w.jpg`} alt={g.title} width={1200} height={675} loading="eager" decoding="async" fetchPriority="high" className="h-full w-full object-cover" />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/95 via-slate-900/75 to-slate-900/40" aria-hidden="true" />
          </div>
          <div className="container-content flex min-h-[420px] flex-col justify-center py-20">
            {pillar && (
              <p className="mb-3 inline-flex w-fit items-center rounded-full border border-solar-500/40 bg-solar-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-solar-500">{pillar.name}</p>
            )}
            <h1 className="mt-1 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl">{g.h1}</h1>
            <p className="mt-4 max-w-3xl text-lg text-slate-200">{g.description}</p>
            <p className="mt-4 text-xs text-slate-400">Last updated: {site.lastUpdated}</p>
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
          <Section eyebrow="State-specific follow-ups" title="Find this in your state" className="bg-sand-50">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {g.relatedStateSlugs
                .map((s) => stateBySlug(s))
                .filter((s): s is NonNullable<typeof s> => Boolean(s))
                .map((s) => (
                  <Link key={s.slug} href={`/states/${s.slug}`} className="card flex flex-col overflow-hidden p-0">
                    <CardImage baseName={imageForState(s.slug, s.region)} alt={`${s.name} solar scene`} />
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-solar-700">{s.region}</p>
                      <h3 className="mt-1 text-lg font-semibold text-slate-900">{s.name}</h3>
                      <p className="mt-2 text-sm text-slate-600 line-clamp-3">{s.policyPosture}</p>
                      <span className="mt-4 text-sm font-medium text-solar-700">Open {s.name} page →</span>
                    </div>
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