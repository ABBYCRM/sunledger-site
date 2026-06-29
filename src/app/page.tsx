import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { CtaSection } from '@/components/CtaSection';
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
});

export default function HomePage() {
  const featuredPillars = pillars.slice(0, 6);
  const featuredGuides = guides.slice(0, 4);
  const featuredStates = states.slice(0, 6);

  return (
    <>
      <JsonLd data={[organization(), website(), webpage('Home', site.description, '/'), breadcrumb([{ name: 'Home', url: '/' }])]} />

      <Hero
        title="Solar, explained simply — then connected to a real installer."
        subtitle={`${site.tagline} Browse state guides, in-depth resources, and an assessment path built around your situation, not ours.`}
        imageId="hero-home"
        alt="A rooftop solar installation seen from the street at dusk"
        cta={{ label: 'Get My Free Assessment', href: '/contact' }}
      />

      <Section eyebrow="What you can do here" title="Start with education, end with a real conversation">
        <p className="max-w-3xl text-slate-700">
          Whether you&apos;re just curious or have a quote on your kitchen table, {site.name} is built to give you the context to ask better questions. We&apos;ve organized the site into six topic areas so you can dive in wherever you want to start.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPillars.map((p) => (
            <Link key={p.slug} href={`/topics/${p.slug}`} className="card flex flex-col">
              <h3 className="text-lg font-semibold text-slate-900">{p.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{p.description}</p>
              <span className="mt-4 text-sm font-medium text-solar-700">Explore {p.name.toLowerCase()} →</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="By state" title="Pick your state">
        <p className="max-w-3xl text-slate-700">
          Solar policies, utility tariffs, and rebate programs vary by state. Each state page links to the relevant resources and points to DSIRE for current program tracking.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredStates.map((s) => (
            <Link key={s.slug} href={`/states/${s.slug}`} className="card flex flex-col">
              <h3 className="text-lg font-semibold text-slate-900">{s.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.policyPosture}</p>
              <span className="mt-4 text-sm font-medium text-solar-700">View state page →</span>
            </Link>
          ))}
        </div>
        <div className="mt-10">
          <Link href="/states" className="btn-secondary">Browse all 50 states</Link>
        </div>
      </Section>

      <Section eyebrow="From the library" title="In-depth guides">
        <div className="grid gap-5 sm:grid-cols-2">
          {featuredGuides.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="card flex flex-col">
              <h3 className="text-lg font-semibold text-slate-900">{g.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{g.description}</p>
              <span className="mt-4 text-sm font-medium text-solar-700">Read the guide →</span>
            </Link>
          ))}
        </div>
        <div className="mt-10">
          <Link href="/guides" className="btn-secondary">Browse the full library</Link>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
