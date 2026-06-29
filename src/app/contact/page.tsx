import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Section } from '@/components/Section';
import { CtaSection } from '@/components/CtaSection';
import { JsonLd } from '@/components/JsonLd';
import { ContactForm } from '@/components/ContactForm';
import { Picture } from '@/components/Picture';
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

      <header className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 -z-10">
          <Picture
            baseName="pillar-costs"
            alt="Home with finished solar installation"
            sizes="100vw"
            widths={[640, 1024, 1920]}
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/95 via-slate-900/75 to-slate-900/40" aria-hidden="true" />
        </div>
        <div className="container-content flex min-h-[400px] flex-col justify-center py-20">
          <p className="mb-3 inline-flex w-fit items-center rounded-full border border-solar-500/40 bg-solar-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-solar-500">Free assessment</p>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">Get your assessment</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-200">
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