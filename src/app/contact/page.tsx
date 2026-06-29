import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Section } from '@/components/Section';
import { CtaSection } from '@/components/CtaSection';
import { JsonLd } from '@/components/JsonLd';
import { ContactForm } from '@/components/ContactForm';
import { buildMetadata } from '@/lib/seo';
import { breadcrumb, contactPage } from '@/lib/schema';
import { site } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Contact & assessment request',
  description: `Submit a residential solar assessment request to ${site.name}. We share your information only with vetted installer partners; your consent to be contacted is required.`,
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          contactPage(),
          breadcrumb([{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }]),
        ]}
      />
      <Breadcrumbs items={[{ href: '/', label: 'Home' }, { label: 'Contact' }]} />

      <header className="bg-sand-100">
        <div className="container-content py-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Get your assessment</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-700">
            {site.name} shares your information with installer partners that serve your area. They — and we — cannot guarantee response time, the contents of any quote, or final pricing.
          </p>
        </div>
      </header>

      <Section>
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContactForm endpoint={site.contactEndpoint} />
          </div>
          <aside className="space-y-4">
            <div className="card">
              <h2 className="text-base font-semibold text-slate-900">What to expect</h2>
              <p className="mt-2 text-sm text-slate-600">
                Installer partners may contact you by phone, text, or email within hours to weeks of your submission, depending on your area and the volume of requests in your region. They will ask follow-up questions and (if appropriate) schedule an on-site assessment.
              </p>
            </div>
            <div className="card">
              <h2 className="text-base font-semibold text-slate-900">Your rights</h2>
              <p className="mt-2 text-sm text-slate-600">
                You can revoke consent to be contacted at any time. See our <a className="text-solar-700 underline" href="/tcpa">TCPA disclosure</a> for opt-out procedures and our <a className="text-solar-700 underline" href="/privacy">Privacy Policy</a> for how we handle your information.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
