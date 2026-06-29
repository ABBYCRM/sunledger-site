import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Section } from '@/components/Section';
import { CtaSection } from '@/components/CtaSection';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { aboutPage, breadcrumb } from '@/lib/schema';
import { site } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'About',
  description: `What ${site.name} is, how we work with installer partners, and what we will and will not do.`,
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          aboutPage(),
          breadcrumb([{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }]),
        ]}
      />
      <Breadcrumbs items={[{ href: '/', label: 'Home' }, { label: 'About' }]} />

      <header className="bg-sand-100">
        <div className="container-content py-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">About {site.name}</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-700">
            {site.name} is a residential solar lead-generation service. We connect U.S. homeowners researching rooftop solar with vetted installer partners in their area. That&apos;s the whole business.
          </p>
        </div>
      </header>

      <Section eyebrow="What we are" title="A lead-generation service, not an installer">
        <div className="prose-content max-w-3xl">
          <p>
            We are not an installer, lender, or utility. We do not run crews, finance projects, or quote prices. We are paid by the installer partners we connect you with when a lead results in a qualified sales opportunity. This is a standard arrangement in the residential solar industry.
          </p>
          <p>
            We do not add a fee to the price you pay an installer. We do not sell your information to unrelated third-party marketers. We do not fabricate testimonials, savings percentages, or reviews. We do not invent incentive dollar amounts that we cannot point to in an authoritative public source.
          </p>
          <h2>What we do</h2>
          <ul>
            <li>Educate — through our topic pillars, resource library, and state-specific pages.</li>
            <li>Connect — through a single intake form that goes to vetted installer partners.</li>
            <li>Disclose — clearly, every time a quote or guarantee might be implied.</li>
          </ul>
          <h2>What we don&apos;t do</h2>
          <ul>
            <li>We don&apos;t promise savings, payback periods, or specific tax credit amounts.</li>
            <li>We don&apos;t make claims about installer performance we cannot verify.</li>
            <li>We don&apos;t say you qualify for anything until an installer partner says so in writing.</li>
            <li>We don&apos;t operate without a TCPA consent. Ever.</li>
          </ul>
          <h2>How we&apos;re funded</h2>
          <p>
            {site.name} is paid by installer partners on a per-lead or per-qualified-lead basis. This is industry standard and creates the right alignment: you&apos;re connected with installers who pay for the connection, and you&apos;re never charged an additional fee by {site.name} for using the service.
          </p>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
