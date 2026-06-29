import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Section } from '@/components/Section';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { breadcrumb, webpage } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'TCPA disclosure & consent',
  description: 'How Sunledger obtains consent to be contacted under the Telephone Consumer Protection Act, and how to revoke consent at any time.',
  path: '/tcpa',
});

export default function Tcpa() {
  return (
    <>
      <JsonLd
        data={[
          webpage('TCPA disclosure', 'How Sunledger obtains and honors consent to be contacted.', '/tcpa'),
          breadcrumb([{ name: 'Home', url: '/' }, { name: 'TCPA disclosure', url: '/tcpa' }]),
        ]}
      />
      <Breadcrumbs items={[{ href: '/', label: 'Home' }, { label: 'TCPA disclosure' }]} />

      <header className="bg-sand-100">
        <div className="container-content py-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">TCPA disclosure &amp; consent</h1>
          <p className="mt-2 text-xs text-slate-500">Last updated: 2026-06-29</p>
        </div>
      </header>

      <Section>
        <div className="prose-content max-w-3xl">
          <p>
            This page explains how Sunledger and its installer partners obtain your consent to be contacted, and how you can revoke that consent at any time. This is a placeholder document; replace with your final, lawyer-reviewed TCPA disclosure before going live.
          </p>

          <h2>What consent you give</h2>
          <p>
            By checking the consent box on the intake form, you authorize Sunledger and its installer partners to contact you by phone, text message, or email — including by automated means (auto-dialers, prerecorded messages, SMS) — at the email address and phone number you provided.
          </p>

          <h2>What consent is not</h2>
          <p>
            Consent is not a condition of purchase. We will not refuse to provide services or information to you if you decline.
          </p>

          <h2>Revoking consent</h2>
          <p>
            You may revoke your consent at any time. To stop texts, reply &quot;STOP&quot;. To stop emails, click &quot;unsubscribe&quot; in any marketing email you receive. To stop calls, ask the caller to place you on their internal do-not-call list and notify us at the address below so we can do the same.
          </p>

          <h2>Message and data rates</h2>
          <p>
            Message and data rates may apply to SMS contact. Sunledger is not responsible for those charges; they are billed by your mobile carrier.
          </p>

          <h2>How installer partners handle consent</h2>
          <p>
            Installer partners we connect you with are required to honor your opt-out signals. If a partner fails to do so, please notify us and we will address it with them.
          </p>

          <h2>Records of consent</h2>
          <p>
            We retain records of the consent you provide (timestamp, IP address, opt-in form fields) for the period required by applicable law. You can request a copy of your records by contacting us.
          </p>
        </div>
      </Section>
    </>
  );
}
