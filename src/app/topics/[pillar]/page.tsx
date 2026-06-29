import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CtaSection } from '@/components/CtaSection';
import { CardImage } from '@/components/CardImage';
import { JsonLd } from '@/components/JsonLd';
import { Section } from '@/components/Section';
import { buildMetadata } from '@/lib/seo';
import { breadcrumb, webpage } from '@/lib/schema';
import { pillarBySlug, pillars } from '@/content/pillars';
import { guides } from '@/content/guides';
import { imageForGuide, imageForPillar } from '@/content/images';

export function generateStaticParams() {
  return pillars.map((p) => ({ pillar: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ pillar: string }> }) {
  const { pillar: slug } = await params;
  const p = pillarBySlug(slug);
  if (!p) return {};
  return buildMetadata({
    title: p.name,
    description: p.metaDescription,
    path: `/topics/${p.slug}`,
  });
}

export default async function PillarPage({ params }: { params: Promise<{ pillar: string }> }) {
  const { pillar: slug } = await params;
  const p = pillarBySlug(slug);
  if (!p) return notFound();

  const related = guides.filter((g) => g.pillar === p.slug).slice(0, 4);

  return (
    <>
      <JsonLd
        data={[
          webpage(p.h1, p.description, `/topics/${p.slug}`),
          breadcrumb([
            { name: 'Home', url: '/' },
            { name: p.name, url: `/topics/${p.slug}` },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ href: '/', label: 'Home' }, { label: p.name }]} />

      <header className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 -z-10">
          <picture>
            <source type="image/webp" sizes="100vw" srcSet={`/img/optimized/${imageForPillar(p.slug)}-640w.webp 640w, /img/optimized/${imageForPillar(p.slug)}-1024w.webp 1024w, /img/optimized/${imageForPillar(p.slug)}-1920w.webp 1920w`} />
            <source type="image/jpeg" sizes="100vw" srcSet={`/img/optimized/${imageForPillar(p.slug)}-640w.jpg 640w, /img/optimized/${imageForPillar(p.slug)}-1024w.jpg 1024w, /img/optimized/${imageForPillar(p.slug)}-1920w.jpg 1920w`} />
            <img src={`/img/optimized/${imageForPillar(p.slug)}-1920w.jpg`} alt={p.name} width={1920} height={1080} loading="eager" decoding="async" fetchPriority="high" className="h-full w-full object-cover" />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/95 via-slate-900/75 to-slate-900/40" aria-hidden="true" />
        </div>
        <div className="container-content flex min-h-[420px] flex-col justify-center py-20">
          <p className="mb-3 inline-flex w-fit items-center rounded-full border border-solar-500/40 bg-solar-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-solar-500">Topic hub</p>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">{p.h1}</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-200">{p.intro}</p>
        </div>
      </header>

      <Section eyebrow="What you&apos;ll learn" title="Pillar overview">
        <div className="prose-content max-w-3xl">
          {p.sections.map((s) => (
            <div key={s.id} id={s.id}>
              <h2>{s.heading}</h2>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {related.length > 0 && (
        <Section eyebrow="From the library" title="Related guides" className="bg-sand-50">
          <div className="grid gap-6 sm:grid-cols-2">
            {related.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="card flex flex-col overflow-hidden p-0">
                <CardImage baseName={imageForGuide(g.slug)} alt={g.title} />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{g.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{g.description}</p>
                  <span className="mt-4 text-sm font-medium text-solar-700">Read the guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CtaSection />
    </>
  );
}