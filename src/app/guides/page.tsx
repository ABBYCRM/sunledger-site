import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Section } from '@/components/Section';
import { CtaSection } from '@/components/CtaSection';
import { CardImage } from '@/components/CardImage';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { breadcrumb, webpage } from '@/lib/schema';
import { guides } from '@/content/guides';
import { pillarBySlug } from '@/content/pillars';
import { imageForGuide } from '@/content/images';

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

      <header className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 -z-10">
          <picture>
            <source type="image/webp" sizes="100vw" srcSet={`/img/optimized/hero-guides-640w.webp 640w, /img/optimized/hero-guides-1024w.webp 1024w, /img/optimized/hero-guides-1920w.webp 1920w`} />
            <source type="image/jpeg" sizes="100vw" srcSet={`/img/optimized/hero-guides-640w.jpg 640w, /img/optimized/hero-guides-1024w.jpg 1024w, /img/optimized/hero-guides-1920w.jpg 1920w`} />
            <img src={`/img/optimized/hero-guides-1920w.jpg`} alt="Solar panel hardware detail" width={1920} height={1080} loading="eager" decoding="async" fetchPriority="high" className="h-full w-full object-cover" />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/95 via-slate-900/75 to-slate-900/40" aria-hidden="true" />
        </div>
        <div className="container-content flex min-h-[420px] flex-col justify-center py-20">
          <p className="mb-3 inline-flex w-fit items-center rounded-full border border-solar-500/40 bg-solar-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-solar-500">Resource library</p>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">Solar resource library</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-200">
            Twenty in-depth guides on the topics U.S. homeowners researching rooftop solar actually need to understand. Each is structured as a primer you can finish in one sitting.
          </p>
        </div>
      </header>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => {
            const pillar = pillarBySlug(g.pillar);
            return (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="card flex flex-col overflow-hidden p-0">
                <CardImage baseName={imageForGuide(g.slug)} alt={g.title} />
                <div className="flex flex-1 flex-col p-6">
                  {pillar && <p className="text-xs font-semibold uppercase tracking-wider text-solar-700">{pillar.name}</p>}
                  <h2 className="mt-1 text-lg font-semibold text-slate-900">{g.title}</h2>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-3">{g.description}</p>
                  <span className="mt-4 text-sm font-medium text-solar-700">Read the guide →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      <CtaSection />
    </>
  );
}