import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Section } from '@/components/Section';
import { CtaSection } from '@/components/CtaSection';
import { JsonLd } from '@/components/JsonLd';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { breadcrumb, webpage } from '@/lib/schema';
import { site } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Thank you',
  description: 'Your request has been received. A qualified installer partner may contact you using the information you provided.',
  path: '/thank-you',
});

export default function ThankYou() {
  return (
    <>
      <JsonLd
        data={[
          webpage('Thank you', 'Your request has been received.', '/thank-you'),
          breadcrumb([{ name: 'Home', url: '/' }, { name: 'Thank you', url: '/thank-you' }]),
        ]}
      />
      <Breadcrumbs items={[{ href: '/', label: 'Home' }, { label: 'Thank you' }]} />

      <header className="bg-sand-100">
        <div className="container-content py-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Thanks — we&apos;ve got it</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-700">
            A qualified installer partner serving your area may contact you using the information you provided.
          </p>
        </div>
      </header>

      <Section>
        <div className="prose-content mx-auto max-w-3xl">
          <h2>What happens next</h2>
          <p>
            {site.name} has shared your information with installer partners that we believe can serve your area. They may reach out by phone, text, or email. Typical response windows range from the same day to several weeks depending on the region, weather, and current installer activity.
          </p>

          <h2>While you wait, you might find these useful</h2>
          <ul>
            <li><Link href="/topics/how-solar-works">How rooftop solar actually works</Link></li>
            <li><Link href="/topics/costs-and-financing">Cash, loan, lease, PPA — what each costs</Link></li>
            <li><Link href="/guides/how-to-read-a-solar-quote">How to read a solar quote without being misled</Link></li>
            <li><Link href="/states">Find your state page</Link></li>
          </ul>

          <h2>Your choices, in one place</h2>
          <p>
            You can revoke consent to be contacted at any time. Review our <Link href="/tcpa">TCPA disclosure</Link> for the opt-out procedures. The installer partner will also have their own procedures; those don&apos;t change your right to opt out at any time.
          </p>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
