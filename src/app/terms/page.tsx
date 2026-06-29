import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Section } from '@/components/Section';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { breadcrumb, webpage } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Terms of use',
  description: 'The terms governing your use of the Sunledger website.',
  path: '/terms',
});

export default function Terms() {
  return (
    <>
      <JsonLd
        data={[
          webpage('Terms of use', 'Terms governing your use of Sunledger.', '/terms'),
          breadcrumb([{ name: 'Home', url: '/' }, { name: 'Terms', url: '/terms' }]),
        ]}
      />
      <Breadcrumbs items={[{ href: '/', label: 'Home' }, { label: 'Terms' }]} />

      <header className="bg-sand-100">
        <div className="container-content py-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Terms of use</h1>
          <p className="mt-2 text-xs text-slate-500">Last updated: 2026-06-29</p>
        </div>
      </header>

      <Section>
        <div className="prose-content max-w-3xl">
          <p>This is a placeholder terms document written for production use as a starting point. Replace with your final, lawyer-reviewed terms before going live.</p>

          <h2>Acceptance</h2>
          <p>By using this site, you agree to these terms.</p>

          <h2>No installer relationship</h2>
          <p>Sunledger is a lead-generation service. We are not an installer, lender, or utility. We do not install solar systems, approve financing, or sell electricity.</p>

          <h2>No guarantees</h2>
          <p>We make no guarantees about the response time, contents, or pricing of any quote or installation provided by installer partners. Any figures shown on this site — savings, payback periods, production estimates — are projections, not guarantees.</p>

          <h2>Your consent</h2>
          <p>By submitting our intake form and consenting to be contacted, you authorize Sunledger and its installer partners to contact you by automated means (calls, texts, emails) at the email and phone number you provided. Consent is not a condition of purchase. You may revoke consent at any time as described in our <a href="/tcpa">TCPA disclosure</a>.</p>

          <h2>Intellectual property</h2>
          <p>Site content is owned by Sunledger or its licensors. You may not reproduce it without permission except for personal, non-commercial use.</p>

          <h2>Limitation of liability</h2>
          <p>To the maximum extent permitted by law, Sunledger is not liable for any indirect, incidental, special, consequential, or punitive damages related to your use of the site or interactions with installer partners.</p>

          <h2>Indemnification</h2>
          <p>You agree to indemnify and hold harmless Sunledger from any claims arising out of your interactions with installer partners or your use of information obtained through this site.</p>

          <h2>Governing law</h2>
          <p>These terms are governed by the laws of the state where Sunledger is incorporated, without regard to conflict-of-law principles.</p>

          <h2>Changes</h2>
          <p>We may update these terms periodically. Continued use of the site after changes constitutes acceptance of the updated terms.</p>
        </div>
      </Section>
    </>
  );
}
