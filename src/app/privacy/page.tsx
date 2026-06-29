import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Section } from '@/components/Section';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { breadcrumb, webpage } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Privacy policy',
  description: 'How Sunledger collects, uses, and shares information you submit through our intake forms.',
  path: '/privacy',
});

export default function Privacy() {
  return (
    <>
      <JsonLd
        data={[
          webpage('Privacy policy', 'How Sunledger handles your information.', '/privacy'),
          breadcrumb([{ name: 'Home', url: '/' }, { name: 'Privacy', url: '/privacy' }]),
        ]}
      />
      <Breadcrumbs items={[{ href: '/', label: 'Home' }, { label: 'Privacy' }]} />

      <header className="bg-sand-100">
        <div className="container-content py-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Privacy policy</h1>
          <p className="mt-2 text-xs text-slate-500">Last updated: 2026-06-29</p>
        </div>
      </header>

      <Section>
        <div className="prose-content max-w-3xl">
          <p>This is a placeholder privacy policy written for production use as a starting document. Replace with your final, lawyer-reviewed policy before going live.</p>

          <h2>Information we collect</h2>
          <p>If you submit our intake form, we collect the information you provide: ZIP code, state, monthly electric bill range, property type, ownership status, shading description, name, email, phone number, and any free-form comments. We also collect technical information (IP address, user agent, referring page) when you interact with our site.</p>

          <h2>How we use information</h2>
          <p>We use the information you submit to connect you with installer partners that serve your area. We do not sell your information to unrelated third-party marketers. We may use aggregated, de-identified data for internal analytics.</p>

          <h2>How we share information</h2>
          <p>We share the information you submit with vetted installer partners serving your area. We share service-provider information (such as a contact-form processor) with vendors bound by appropriate confidentiality obligations. We may disclose information if required by law.</p>

          <h2>Your choices</h2>
          <p>You can revoke consent to be contacted at any time. You can request access, correction, or deletion of your information by contacting us. See our <a href="/tcpa">TCPA disclosure</a> for opt-out procedures.</p>

          <h2>Data security</h2>
          <p>We use commercially reasonable safeguards to protect the information you submit. No system is perfectly secure; we cannot guarantee absolute security.</p>

          <h2>Cookies and similar</h2>
          <p>We do not currently run third-party analytics that require cookies. If we add analytics in the future, we will update this policy and provide any necessary opt-out.</p>

          <h2>Children</h2>
          <p>Our service is not directed to children under 18. We do not knowingly collect information from children under 18.</p>

          <h2>Changes to this policy</h2>
          <p>We may update this policy periodically. The &quot;Last updated&quot; date at the top of this page will reflect the most recent change.</p>
        </div>
      </Section>
    </>
  );
}
