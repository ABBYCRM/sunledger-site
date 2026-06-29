import { notFound } from 'next/navigation';
import Link from 'next/link';
import { AlertTriangle, Lightbulb, Info } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Section } from '@/components/Section';
import { CtaSection } from '@/components/CtaSection';
import { JsonLd } from '@/components/JsonLd';
import { CardImage } from '@/components/CardImage';
import { Picture } from '@/components/Picture';
import { Callout } from '@/components/Callout';
import { buildMetadata } from '@/lib/seo';
import { article, breadcrumb } from '@/lib/schema';
import { guideBySlug, guides } from '@/content/guides';
import { pillarBySlug } from '@/content/pillars';
import { stateBySlug } from '@/content/states';
import { imageForGuide, imageForState } from '@/content/images';

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) return {};
  return buildMetadata({ title: g.title, description: g.metaDescription, path: `/guides/${g.slug}` });
}

// Which section headings get a callout, and what type
const SECTION_CALLOUTS: Record<string, { heading: string; variant: 'tip' | 'warn' | 'fact'; text: string }[]> = {
  'how-net-metering-works-2026': [
    { heading: 'What to ask your installer', variant: 'tip', text: 'Ask them to model your first-year and five-year bill using your utility\'s current tariff. Ask whether a battery makes sense for your situation and whether the system is sized for current or projected usage.' },
    { heading: 'Where to look up your state-specific tariff', variant: 'fact', text: 'Your utility\'s filed tariff on your state public utilities commission website is the canonical source. Your installer should be able to point you at the relevant document.' },
  ],
  'how-to-read-a-solar-quote': [
    { heading: 'Inflation assumptions on bill savings', variant: 'warn', text: 'Solar proposals usually assume 3%–5% utility rate inflation. If rates rise less, savings will be lower. Ask for the sensitivity at 0%, 3%, and 5%.' },
    { heading: 'Red flags in quotes', variant: 'warn', text: 'High-pressure tactics, "act today" pricing, vague equipment descriptions, or refusal to show itemized costs are all reasons to slow down and walk away.' },
    { heading: 'Production guarantees', variant: 'tip', text: 'A production guarantee commits the installer to a minimum output. Read the trigger carefully — many only apply to equipment failures, not actual production shortfall.' },
  ],
  'monocrystalline-vs-polycrystalline-vs-thin-film': [
    { heading: 'Temperature coefficient', variant: 'tip', text: 'Monocrystalline panels lose roughly 0.30%–0.40% efficiency per °C above 25°C. In very hot climates, thin-film (CdTe) can hold up better.' },
  ],
  'cash-loan-lease-ppa': [
    { heading: 'Watch out for escalator clauses', variant: 'warn', text: 'Many leases and some PPAs include annual payment escalators. A 2%–3% escalator compounded over 20 years meaningfully changes the total cost. Ask for the flat rate option.' },
    { heading: 'Resale complexity', variant: 'warn', text: 'A lease or PPA must usually be assumed by the buyer or bought out by you at settlement. This can complicate or delay a home sale. Factor this in before signing.' },
  ],
  'does-solar-raise-property-taxes': [
    { heading: 'State property tax exemptions for solar', variant: 'fact', text: 'Most states exempt solar from property tax. Confirm yours with your county assessor before you sign a solar contract.' },
  ],
  'what-is-an-srec': [
    { heading: 'SREC contract pitfalls', variant: 'warn', text: 'Some installers offer a low upfront price in exchange for keeping your SRECs for many years. Read the contract carefully: assignment duration, price, what happens if the market collapses.' },
  ],
};

// Extra sections to show as callouts before the main prose
const GUIDE_LEAD_CALLOUTS: Record<string, { variant: 'tip' | 'warn' | 'fact'; text: string }> = {
  'how-to-read-a-solar-quote': { variant: 'tip', text: 'The most important skill in evaluating a solar quote is asking the right questions, not understanding every technical detail. This guide walks through each section so you know what to look for.' },
  'cash-loan-lease-ppa': { variant: 'tip', text: 'The right financing method depends on your tax situation, available capital, whether you plan to stay in the home long-term, and how much you want to manage the system yourself.' },
};

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) return notFound();
  const pillar = pillarBySlug(g.pillar);
  const image = imageForGuide(g.slug);
  const leadCallout = GUIDE_LEAD_CALLOUTS[g.slug];
  const calloutMap = SECTION_CALLOUTS[g.slug] ?? [];

  return (
    <>
      <JsonLd
        data={[
          article({ headline: g.title, description: g.metaDescription, path: `/guides/${g.slug}`, datePublished: g.datePublished }),
          breadcrumb([{ name: 'Home', url: '/' }, { name: 'Guides', url: '/guides' }, { name: g.title, url: `/guides/${g.slug}` }]),
        ]}
      />
      <Breadcrumbs items={[{ href: '/', label: 'Home' }, { href: '/guides', label: 'Guides' }, { label: g.title }]} />

      <article>
        {/* Hero */}
        <header className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 -z-10">
            <Picture baseName={image} alt={g.title} sizes="100vw" widths={[480, 768, 1200]} width={1200} height={675} className="h-full w-full object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/92 via-slate-900/72 to-slate-900/35" aria-hidden="true" />
          </div>
          <div className="container-content flex min-h-[420px] flex-col justify-center py-20">
            {pillar && (
              <p className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-solar-500/40 bg-solar-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-solar-500">
                <Lightbulb size={12} aria-hidden="true" /> {pillar.name}
              </p>
            )}
            <h1 className="mt-2 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl">{g.h1}</h1>
            <p className="mt-4 max-w-3xl text-lg text-slate-200">{g.description}</p>
          </div>
        </header>

        {/* Lead callout */}
        {leadCallout && (
          <div className="bg-sand-50 py-10">
            <div className="container-content max-w-3xl">
              <Callout variant={leadCallout.variant}>{leadCallout.text}</Callout>
            </div>
          </div>
        )}

        {/* Main content */}
        <Section>
          <div className="max-w-3xl space-y-10">
            {g.sections.map((s, i) => {
              const callout = calloutMap.find((c) => c.heading === s.heading);
              return (
                <div key={i}>
                  <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">{s.heading}</h2>
                  <p className="leading-relaxed text-slate-700">{s.body}</p>
                  {callout && (
                    <Callout variant={callout.variant} title={callout.variant === 'warn' ? 'Watch out' : 'Key point'} className="mt-4">
                      {callout.text}
                    </Callout>
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        {/* State-specific related guides */}
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
