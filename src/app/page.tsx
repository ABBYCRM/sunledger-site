import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { CtaSection } from '@/components/CtaSection';
import { CardImage } from '@/components/CardImage';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { organization, website, breadcrumb, webpage } from '@/lib/schema';
import { pillars } from '@/content/pillars';
import { guides } from '@/content/guides';
import { states } from '@/content/states';
import { site } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Connect with vetted solar installers in your area',
  description: site.description,
  path: '/',
  image: '/img/og-default.jpg',
});

const STATE_HERO_BY_REGION: Record<string, string> = {
  Northeast: 'hero-states-northeast',
  Midwest: 'hero-states-midwest',
  South: 'hero-states-south',
  West: 'hero-states-west',
  Southwest: 'hero-states-west',
};

const PILLAR_HERO: Record<string, string> = {
  'how-solar-works': 'pillar-how-solar-works',
  'costs-and-financing': 'pillar-costs',
  'incentives-and-tax-credits': 'pillar-incentives',
  'panels-and-equipment': 'pillar-equipment',
  'battery-storage': 'pillar-battery',
  'going-solar': 'pillar-going-solar',
};

const GUIDE_IMAGE: Record<string, string> = {
  'how-net-metering-works-2026': 'guide-utility-bill',
  'how-to-read-a-solar-quote': 'guide-finance',
  'monocrystalline-vs-polycrystalline-vs-thin-film': 'pillar-equipment',
  'stc-vs-ptc-ratings': 'guide-inverter',
  'solar-and-ev-charging': 'guide-ev-charging',
  'solar-and-heat-pump': 'pillar-going-solar',
  'what-is-an-srec': 'guide-tax-credit',
  'does-solar-raise-property-taxes': 'guide-finance',
  'home-insurance-and-solar': 'guide-finance',
  'hoa-and-solar-rules-by-state': 'state-default',
  'string-vs-microinverter-vs-optimizer': 'guide-inverter',
  'microinverter-shade-and-array-design': 'guide-installation',
  'cash-loan-lease-ppa': 'guide-lease-ppa',
  'reading-your-utility-bill-to-size-a-system': 'guide-utility-bill',
  'financing-options-cash-loan-ppa-lease': 'guide-finance',
  'solar-active-vs-passive': 'pillar-equipment',
  'off-grid-vs-grid-tied': 'pillar-battery',
  'solar-panel-degradation': 'guide-installation',
  'solar-roof-age-and-reroofing': 'guide-installation',
  'how-inverter-choice-affects-output': 'guide-inverter',
  'ground-mount-vs-rooftop': 'guide-ground-mount',
};

const STATE_IMAGE: Record<string, string> = {
  'california': 'state-california',
  'texas': 'state-texas',
  'florida': 'state-florida',
  'arizona': 'state-arizona',
  'new-york': 'state-new-york',
  'massachusetts': 'state-massachusetts',
};

export default function HomePage() {
  const featuredPillars = pillars;
  const featuredGuides = guides.slice(0, 6);
  const featuredStates = states.slice(0, 12);

  return (
    <>
      <JsonLd
        data={[organization(), website(), webpage('Home', site.description, '/'), breadcrumb([{ name: 'Home', url: '/' }])]}
      />

      <Hero
        title="Solar, explained simply — then connected to a real installer."
        subtitle={`${site.tagline} Browse state guides, in-depth resources, and an assessment path built around your situation, not ours.`}
        image="hero-home"
        alt="Modern residential rooftop covered with dark solar panels at golden hour"
        eyebrow="Residential solar lead-generation"
        cta={{ label: 'Get My Free Assessment', href: '/contact' }}
      />

      <Section eyebrow="What you can do here" title="Start with education, end with a real conversation">
        <p className="max-w-3xl text-slate-700">
          Whether you&apos;re just curious or have a quote on your kitchen table, {site.name} is built to give you the context to ask better questions. We&apos;ve organized the site into six topic areas so you can dive in wherever you want to start.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPillars.map((p) => (
            <Link key={p.slug} href={`/topics/${p.slug}`} className="card flex flex-col overflow-hidden p-0">
              <CardImage
                baseName={PILLAR_HERO[p.slug] ?? 'pillar-default'}
                alt={`${p.name} illustration`}
              />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-slate-900">{p.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{p.description}</p>
                <span className="mt-4 text-sm font-medium text-solar-700">Explore {p.name.toLowerCase()} →</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="By state" title="Pick your state" className="bg-sand-50 py-16">
        <p className="max-w-3xl text-slate-700">
          Solar policies, utility tariffs, and rebate programs vary by state. Each state page provides context and directs you to the authoritative sources — your utility&apos;s tariff and your state public utilities commission.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredStates.map((s) => (
            <Link key={s.slug} href={`/states/${s.slug}`} className="card flex flex-col overflow-hidden p-0">
              <CardImage
                baseName={STATE_IMAGE[s.slug] ?? STATE_HERO_BY_REGION[s.region] ?? 'state-default'}
                alt={`${s.name} residential solar scene`}
              />
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-solar-700">{s.region}</p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">{s.name}</h3>
                <p className="mt-2 text-sm text-slate-600 line-clamp-3">{s.policyPosture}</p>
                <span className="mt-4 text-sm font-medium text-solar-700">View {s.name} page →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/states" className="btn-secondary">Browse all 50 states</Link>
        </div>
      </Section>

      <Section eyebrow="From the library" title="In-depth guides">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredGuides.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="card flex flex-col overflow-hidden p-0">
              <CardImage
                baseName={GUIDE_IMAGE[g.slug] ?? 'hero-guides'}
                alt={`${g.title} illustration`}
              />
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-solar-700">Guide</p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">{g.title}</h3>
                <p className="mt-2 text-sm text-slate-600 line-clamp-3">{g.description}</p>
                <span className="mt-4 text-sm font-medium text-solar-700">Read the guide →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/guides" className="btn-secondary">Browse the full library</Link>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}