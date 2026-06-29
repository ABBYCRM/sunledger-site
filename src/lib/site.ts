// Central site config. Brand and domain overridable via env at deploy time.

export const site = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME || 'Sunledger',
  domain: process.env.NEXT_PUBLIC_SITE_URL || 'https://sunledger-site.onrender.com',
  tagline: 'A solar lead-generation service connecting U.S. homeowners with vetted local installers.',
  description:
    'Sunledger connects U.S. homeowners researching rooftop solar with vetted, qualified local installer partners. Educational resources, state-specific guidance, and a free assessment — no fabricated promises, no spam.',
  // Honest disclosures that must appear across the site footer + form context.
  disclosureShort:
    'Sunledger is a lead-generation service. We are not a solar installer, lender, or utility.',
  disclosureFull:
    'Sunledger is a lead-generation service. We are not a solar installer, lender, or utility. Quotes, program eligibility, equipment availability, and final pricing are determined by the installer partners we connect you with. We make no guarantees about the number, timing, or contents of any responses, savings, system performance, rebates, tax credits, or installation outcomes. Submitting a request does not guarantee contact, a quote, financing approval, or installation. Always verify the licensing, certifications, insurance, and references of any installer before signing a contract.',
  tcpaConsent:
    'I agree to be contacted by Sunledger and its installer partners about my request at the email and phone number I provided, including by automated means (calls, texts, emails). Consent is not a condition of purchase. I understand I can revoke consent at any time and that message and data rates may apply.',
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || '',
  twitterHandle: '@sunledger',
  lastUpdated: '2026-06-29',
};

export function absoluteUrl(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${site.domain}${clean}`;
}
