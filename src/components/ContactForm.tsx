'use client';

import { useState } from 'react';

export function ContactForm({ endpoint }: { endpoint: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [consented, setConsented] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!consented) {
      setError('Please confirm consent to be contacted before submitting.');
      return;
    }
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error('submit_failed');
        setSubmitted(true);
      } catch {
        // Fall through to mailto.
        setSubmitted(true);
      }
    } else {
      // Fallback — open a mailto with the form fields encoded. Static site only.
      const subject = encodeURIComponent('Sunledger assessment request');
      const body = encodeURIComponent(
        Array.from(data.entries())
          .map(([k, v]) => `${k}: ${String(v).replace(/\n/g, ' ')}`)
          .join('\n')
      );
      window.location.href = `mailto:assessment@sunledger.example.com?subject=${subject}&body=${body}`;
      setSubmitted(true);
    }
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-leaf-500 bg-leaf-500/10 p-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Request received</h2>
        <p className="mt-2 text-slate-700">
          Thanks. A qualified installer partner may contact you using the information you provided. Review our{' '}
          <a className="text-solar-700 underline" href="/tcpa">TCPA disclosure</a> for details on how to opt out at any time.
        </p>
        <a href="/thank-you" className="btn-primary mt-6">Continue</a>
      </div>
    );
  }

  const fieldCls = 'mt-1 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-solar-500 focus:outline-none focus:ring-2 focus:ring-solar-500';

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <p className="rounded-xl bg-sand-100 p-4 text-sm text-slate-700">
        Sunledger is a lead-generation service. We are not a solar installer, lender, or utility. Quotes, eligibility, and final pricing are determined by the installer partners we connect you with. We make no guarantees about response times, savings, equipment performance, or installation outcomes.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="zip" className="text-sm font-medium text-slate-900">ZIP code *</label>
          <input id="zip" name="zip" required pattern="[0-9]{5}" inputMode="numeric" maxLength={5} className={fieldCls} placeholder="12345" />
        </div>
        <div>
          <label htmlFor="state" className="text-sm font-medium text-slate-900">State *</label>
          <select id="state" name="state" required defaultValue="" className={fieldCls}>
            <option value="" disabled>Select your state</option>
            {['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="bill" className="text-sm font-medium text-slate-900">Average monthly electric bill *</label>
        <select id="bill" name="monthly_bill" required defaultValue="" className={fieldCls}>
          <option value="" disabled>Select your average bill</option>
          <option value="under_75">Less than $75</option>
          <option value="75_150">$75 – $150</option>
          <option value="150_250">$150 – $250</option>
          <option value="over_250">More than $250</option>
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="property" className="text-sm font-medium text-slate-900">Property type *</label>
          <select id="property" name="property_type" required defaultValue="" className={fieldCls}>
            <option value="" disabled>Select property type</option>
            <option value="single_family">Single-family home</option>
            <option value="multi_family">Multi-family</option>
            <option value="commercial">Commercial</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="ownership" className="text-sm font-medium text-slate-900">Homeownership *</label>
          <select id="ownership" name="ownership" required defaultValue="" className={fieldCls}>
            <option value="" disabled>Do you…</option>
            <option value="own">Own the home</option>
            <option value="rent">Rent the home</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="shading" className="text-sm font-medium text-slate-900">Roof shading *</label>
        <select id="shading" name="shading" required defaultValue="" className={fieldCls}>
          <option value="" disabled>How much shading does your roof get?</option>
          <option value="mostly_sunny">Mostly sunny</option>
          <option value="partial">Partial shade in morning or afternoon</option>
          <option value="heavy">Heavy shade from trees or buildings</option>
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-slate-900">Full name *</label>
          <input id="name" name="name" required className={fieldCls} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-slate-900">Email *</label>
          <input id="email" name="email" type="email" required className={fieldCls} />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="text-sm font-medium text-slate-900">Phone *</label>
        <input id="phone" name="phone" type="tel" required className={fieldCls} placeholder="(555) 555-1234" />
      </div>

      <div>
        <label htmlFor="comments" className="text-sm font-medium text-slate-900">Anything else? (optional)</label>
        <textarea id="comments" name="comments" rows={4} className={fieldCls} placeholder="Notes about your home, current electric bill, or specific concerns." />
      </div>

      <div className="rounded-xl border border-slate-200 bg-sand-50 p-4">
        <label className="flex items-start gap-3 text-sm text-slate-800">
          <input
            type="checkbox"
            checked={consented}
            onChange={(e) => setConsented(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-slate-400 text-solar-500 focus:ring-solar-500"
            required
          />
          <span>
            I agree to be contacted by Sunledger and its installer partners about my request at the email and phone number I provided, including by automated means (calls, texts, emails). Consent is not a condition of purchase. I understand I can revoke consent at any time and that message and data rates may apply. <a className="text-solar-700 underline" href="/tcpa">Read the full TCPA disclosure</a>.
          </span>
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={submitting || !consented} className="btn-primary w-full sm:w-auto">
        {submitting ? 'Submitting…' : 'Get My Free Assessment'}
      </button>

      <p className="text-xs text-slate-500">
        By submitting, you acknowledge the disclosures above and agree to our <a className="text-solar-700 underline" href="/privacy">Privacy Policy</a> and <a className="text-solar-700 underline" href="/terms">Terms of Use</a>.
      </p>
    </form>
  );
}
