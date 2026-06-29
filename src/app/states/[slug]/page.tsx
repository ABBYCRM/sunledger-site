import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Section } from '@/components/Section';
import { CtaSection } from '@/components/CtaSection';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { breadcrumb, placeState, webpage } from '@/lib/schema';
import { states, stateBySlug } from '@/content/states';
import { guides } from '@/content/guides';

export function generateStaticParams() {
  return states.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = stateBySlug(slug);
  if (!s) return {};
  return buildMetadata({
    title: `Residential solar in ${s.name}`,
    description: `${s.name} (${s.abbr}). ${s.policyPosture} Find local installer programs, current DSIRE-listed incentives, and state-specific guidance for ${s.name} homeowners.`,
    path: `/states/${s.slug}`,
  });
}

export default async function StatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = stateBySlug(slug);
  if (!s) return notFound();

  // Pull 3-5 relevant guides for the state. Pin a few relevant ones first.
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
        <header className="bg-sand-100">
          <div className="container-content py-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-solar-700">{s.region}</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Residential solar in {s.name}</h1>
            <p className="mt-4 max-w-3xl text-lg text-slate-700">{s.policyPosture}</p>
          </div>
        </header>

        <Section eyebrow="At a glance" title={`${s.name} at a glance`}>
          <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">DSIRE summary</dt>
              <dd className="mt-1 text-base">
                <a href={s.dsireUrl} className="text-solar-700 underline" rel="noopener noreferrer">Open DSIRE</a>
              </dd>
            </div>
          </dl>
        </Section>

        <Section eyebrow="What we&apos;ve observed" title={`The ${s.name} solar landscape`}>
          <div className="prose-content max-w-3xl">
            <h2>Climate context</h2>
            <p>{s.climate}</p>
            <h2>Electricity landscape</h2>
            <p>{s.electricityContext}</p>
            <h2>Policy posture</h2>
            <p>{s.policyPosture}</p>
            <h2>Where to verify current programs</h2>
            <p>
              The most reliable source for current solar incentives in {s.name} is the{' '}
              <a href={s.dsireUrl} rel="noopener noreferrer">DSIRE state summary</a> for {s.name}.
              For utility-specific tariffs, your utility&apos;s published tariff is the canonical document.
              Sunledger does not invent rebate dollar amounts; we link to the source.
            </p>
          </div>
        </Section>

        <Section eyebrow="Common questions" title={`${s.name} homeowners ask`}>
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {s.commonQuestions.map((q, i) => (
              <div key={i} className="p-6">
                <h3 className="text-base font-semibold text-slate-900">{q}</h3>
                <p className="mt-2 text-slate-700">
                  For the current authoritative answer, see the linked resources above (DSIRE, your utility) or
                  ask an installer you trust. The questions are real; we don&apos;t publish scripted answers because incentives change frequently.
                </p>
              </div>
            ))}
          </div>
        </Section>

        {relatedGuides.length > 0 && (
          <Section eyebrow="From the library" title={`Guides relevant to ${s.name}`}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedGuides.map((g) => (
                <Link key={g.slug} href={`/guides/${g.slug}`} className="card flex flex-col">
                  <h3 className="text-lg font-semibold text-slate-900">{g.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{g.description}</p>
                  <span className="mt-4 text-sm font-medium text-solar-700">Read the guide →</span>
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
