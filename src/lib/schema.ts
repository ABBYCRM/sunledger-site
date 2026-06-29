import { site } from './site';

interface JsonLd {
  '@context': 'https://schema.org';
  '@type': string;
  [key: string]: unknown;
}

export function website(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.domain,
    description: site.description,
    publisher: { '@type': 'Organization', name: site.name, url: site.domain },
  };
}

export function organization(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.domain,
    description: site.disclosureShort,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `${site.domain}/contact`,
    },
    // No fabricated address, phone, founding date, social profiles.
  };
}

export function webpage(name: string, description: string, path: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: `${site.domain}${path.startsWith('/') ? path : `/${path}`}`,
    isPartOf: { '@type': 'WebSite', name: site.name, url: site.domain },
    publisher: { '@type': 'Organization', name: site.name, url: site.domain },
    dateModified: site.lastUpdated,
  };
}

export function breadcrumb(items: { name: string; url: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${site.domain}${item.url}`,
    })),
  };
}

export function faqPage(questions: { question: string; answer: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  };
}

export function article(input: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${site.domain}${input.path}` },
    url: `${site.domain}${input.path}`,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: { '@type': 'Organization', name: site.name, url: site.domain },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.domain,
      // No fabricated logo URL.
    },
  };
}

export function contactPage(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${site.name}`,
    url: `${site.domain}/contact`,
    publisher: { '@type': 'Organization', name: site.name, url: site.domain },
  };
}

export function aboutPage(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${site.name}`,
    url: `${site.domain}/about`,
    publisher: { '@type': 'Organization', name: site.name, url: site.domain },
  };
}

export function placeState(name: string, abbr: string): JsonLd {
  // Truthful, factual placeholder for a US state - no fake coordinates.
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name,
    additionalType: 'https://schema.org/AdministrativeArea',
    identifier: abbr,
    containedInPlace: { '@type': 'Country', name: 'United States' },
  };
}
