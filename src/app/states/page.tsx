import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Section } from '@/components/Section';
import { CtaSection } from '@/components/CtaSection';
import { CardImage } from '@/components/CardImage';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { breadcrumb, webpage } from '@/lib/schema';
import { states } from '@/content/states';
import { imageForState } from '@/content/images';

export const metadata = buildMetadata({
  title: 'Solar in your state — guidance for all 50 U.S. states',
  description:
    'State-specific residential solar guidance for every U.S. state. We direct you to authoritative sources for current program tracking — we never invent incentive dollar amounts.',
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

      <header className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 -z-10">
          <picture>
            <source type="image/webp" sizes="100vw" srcSet={`/img/optimized/hero-states-midwest-640w.webp 640w, /img/optimized/hero-states-midwest-1024w.webp 1024w, /img/optimized/hero-states-midwest-1920w.webp 1920w`} />
            <source type="image/jpeg" sizes="100vw" srcSet={`/img/optimized/hero-states-midwest-640w.jpg 640w, /img/optimized/hero-states-midwest-1024w.jpg 1024w, /img/optimized/hero-states-midwest-1920w.jpg 1920w`} />
            <img src={`/img/optimized/hero-states-midwest-1920w.jpg`} alt="Solar farm across American farmland" width={1920} height={1080} loading="eager" decoding="async" fetchPriority="high" className="h-full w-full object-cover" />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/95 via-slate-900/75 to-slate-900/40" aria-hidden="true" />
        </div>
        <div className="container-content flex min-h-[420px] flex-col justify-center py-20">
          <p className="mb-3 inline-flex w-fit items-center rounded-full border border-solar-500/40 bg-solar-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-solar-500">All 50 states</p>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">Solar in your state</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-200">
            Solar policy and utility tariff rules vary dramatically by state. Each state page below outlines what we&apos;ve observed about the residential solar landscape and links out to authoritative sources for current program tracking. We never invent rebate dollar amounts.
          </p>
        </div>
      </header>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {states.map((s) => (
            <Link key={s.slug} href={`/states/${s.slug}`} className="card flex flex-col overflow-hidden p-0">
              <CardImage baseName={imageForState(s.slug, s.region)} alt={`${s.name} solar scene`} />
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-solar-700">{s.region}</p>
                <h2 className="mt-1 text-base font-semibold text-slate-900">{s.name}</h2>
                <p className="mt-2 text-sm text-slate-600 line-clamp-3">{s.policyPosture}</p>
                <span className="mt-4 text-sm font-medium text-solar-700">Open {s.name} →</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <CtaSection />
    </>
  );
}