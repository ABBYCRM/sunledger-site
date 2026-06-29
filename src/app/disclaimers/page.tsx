import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Section } from '@/components/Section';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { breadcrumb, webpage } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Disclaimers',
  description: 'The disclaimers that apply throughout Sunledger and the limitations on the figures, opinions, and recommendations you may find here.',
  path: '/disclaimers',
});

export default function Disclaimers() {
  return (
    <>
      <JsonLd
        data={[
          webpage('Disclaimers', 'Limitations on figures, opinions, and recommendations on Sunledger.', '/disclaimers'),
          breadcrumb([{ name: 'Home', url: '/' }, { name: 'Disclaimers', url: '/disclaimers' }]),
        ]}
      />
      <Breadcrumbs items={[{ href: '/', label: 'Home' }, { label: 'Disclaimers' }]} />

      <header className="bg-sand-100">
        <div className="container-content py-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Disclaimers</h1>
          <p className="mt-2 text-xs text-slate-500">Last updated: 2026-06-29</p>
        </div>
      </header>

      <Section>
        <div className="prose-content max-w-3xl">
          <p>This page collects the general disclaimers that apply throughout Sunledger. State-specific disclosures and additional terms appear on individual pages.</p>

          <h2>No professional advice</h2>
          <p>Content on this site is for informational purposes only. It is not engineering, financial, legal, tax, or medical advice. Consult a licensed professional in your jurisdiction for advice specific to your situation.</p>

          <h2>No guarantees of outcomes</h2>
          <p>Any figures shown on this site or in materials from our installer partners — including system output, savings, payback periods, incentive amounts, or installation timelines — are projections. Actual results depend on factors outside our control, including your specific installation, equipment performance, electricity rates, weather, and policy changes.</p>

          <h2>Incentive figures</h2>
          <p>We do not publish incentive dollar amounts unless we can point to the authoritative public source (a state energy office, a public utilities commission order, or a published utility tariff). For the current status of any specific incentive, check your state&apos;s energy office and your utility&apos;s published tariff.</p>

          <h2>Reviews and ratings</h2>
          <p>We do not publish ratings of installers on this site. Any third-party reviews you see are those of the third party. We do not warrant the accuracy of third-party reviews.</p>

          <h2>Forward-looking statements</h2>
          <p>Statements about future policy, rate, or product changes are forward-looking. We do not undertake to update them.</p>

          <h2>Limitation of liability</h2>
          <p>To the maximum extent permitted by law, Sunledger is not liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of this site.</p>
        </div>
      </Section>
    </>
  );
}
