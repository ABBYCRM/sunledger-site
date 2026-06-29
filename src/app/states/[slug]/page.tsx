import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Section } from '@/components/Section';
import { CtaSection } from '@/components/CtaSection';
import { CardImage } from '@/components/CardImage';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { breadcrumb, placeState, webpage } from '@/lib/schema';
import { states, stateBySlug } from '@/content/states';
import { guides } from '@/content/guides';
import { imageForGuide, imageForState } from '@/content/images';

export function generateStaticParams() {
  return states.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = stateBySlug(slug);
  if (!s) return {};
  return buildMetadata({
    title: `Residential solar in ${s.name}`,
    description: `${s.name} (${s.abbr}). ${s.policyPosture} Find local installer programs and state-specific guidance for ${s.name} homeowners.`,
    path: `/states/${s.slug}`,
  });
}

export default async function StatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = stateBySlug(slug);
  if (!s) return notFound();

  const relevanceMap: Record<string, string[]> = {
    California: ['how-net-metering-works-2026', 'how-to-read-a-solar-quote', 'battery-storage'],
  };
  const pinnedSlugs = relevanceMap[s.name] || [];
  const relatedGuides = [
    ...guides.filter((g) => pinnedSlugs.includes(g.slug)),
    ...guides
      .filter((g) => !pinnedSlugs.includes(g.slug) && (g.pillar === 'incentives-and-tax-credits' || g.pillar === 'going-solar'))
      .slice(0, 5 - pinnedSlugs.length),
  ].slice(0, 5);

  const hero = imageForState(s.slug, s.region);

  return (
    <>
      <JsonLd
        data={[
          webpage(`Residential solar in ${s.name}`, s.policyPosture, `/states/${s.slug}`),
          placeState(s.name, s.abbr),
          breadcrumb([
            { name: 'Home', url: '/' },
            { name: 'States', url: '/states' },
            { name: s.name, url: `/states/${s.slug}` },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ href: '/', label: 'Home' }, { href: '/states', label: 'States' }, { label: s.name }]} />

      <article>
        <header className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 -z-10">
            <picture>
              <source type="image/webp" sizes="100vw" srcSet={`/img/optimized/${hero}-640w.webp 640w, /img/optimized/${hero}-1024w.webp 1024w, /img/optimized/${hero}-1920w.webp 1920w`} />
              <source type="image/jpeg" sizes="100vw" srcSet={`/img/optimized/${hero}-640w.jpg 640w, /img/optimized/${hero}-1024w.jpg 1024w, /img/optimized/${hero}-1920w.jpg 1920w`} />
              <img src={`/img/optimized/${hero}-1920w.jpg`} alt={`${s.name} solar scene`} width={1920} height={1080} loading="eager" decoding="async" fetchPriority="high" className="h-full w-full object-cover" />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/95 via-slate-900/70 to-slate-900/30" aria-hidden="true" />
          </div>
          <div className="container-content flex min-h-[440px] flex-col justify-center py-20">
            <p className="mb-3 inline-flex w-fit items-center rounded-full border border-solar-500/40 bg-solar-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-solar-500">{s.region}</p>
            <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">Residential solar in {s.name}</h1>
            <p className="mt-4 max-w-3xl text-lg text-slate-200">{s.policyPosture}</p>
          </div>
        </header>

        <Section eyebrow="At a glance" title={`${s.name} at a glance`}>
          <dl className="grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Capital</dt>
              <dd className="mt-1 text-base font-medium text-slate-900">{s.capital}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Region</dt>
              <dd className="mt-1 text-base font-medium text-slate-900">{s.region}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">State</dt>
              <dd className="mt-1 text-base font-medium text-slate-900">{s.abbr}</dd>
            </div>
          </dl>
        </Section>

        <Section eyebrow="What we&apos;ve observed" title={`The ${s.name} solar landscape`} className="bg-sand-50">
          <div className="prose-content max-w-3xl">
            <h2>Climate context</h2>
            <p>{s.climate}</p>
            <h2>Electricity landscape</h2>
            <p>{s.electricityContext}</p>
            <h2>Policy posture</h2>
            <p>{s.policyPosture}</p>
            <h2>Where to verify current programs</h2>
            <p>
              Your utility&apos;s published tariff on your state public utilities commission website is the canonical source for current rates, net metering rules, and export credit policies in {s.name}. Your installer should also be able to point you at the relevant documents. Sunledger does not invent rebate dollar amounts; we direct you to the authoritative source.
            </p>
          </div>
        </Section>

        <Section eyebrow="Common questions" title={`${s.name} homeowners ask`}>
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {s.commonQuestions.map((q, i) => (
              <div key={i} className="p-6">
                <h3 className="text-base font-semibold text-slate-900">{q}</h3>
                <p className="mt-2 text-slate-700">
                  For the current authoritative answer, check your utility&apos;s current published tariff or ask an installer you trust. The questions are real; we don&apos;t publish scripted answers because policies change frequently.
                </p>
              </div>
            ))}
          </div>
        </Section>

        {relatedGuides.length > 0 && (
          <Section eyebrow="From the library" title={`Guides relevant to ${s.name}`}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedGuides.map((g) => (
                <Link key={g.slug} href={`/guides/${g.slug}`} className="card flex flex-col overflow-hidden p-0">
                  <CardImage baseName={imageForGuide(g.slug)} alt={g.title} />
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold text-slate-900">{g.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-3">{g.description}</p>
                    <span className="mt-4 text-sm font-medium text-solar-700">Read the guide →</span>
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
