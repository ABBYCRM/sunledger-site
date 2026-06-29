import type { Metadata } from 'next';
import { site } from './site';

interface MetaInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

/** Build per-page Metadata aligned with prompt §3.7. */
export function buildMetadata(input: MetaInput): Metadata {
  const fullTitle = `${input.title} | ${site.name}`;
  const url = `${site.domain}${input.path.startsWith('/') ? input.path : `/${input.path}`}`;
  const image = input.image || `${site.domain}/img/og-default.jpg`;

  return {
    title: fullTitle,
    description: input.description,
    alternates: { canonical: url },
    robots: input.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
    openGraph: {
      title: fullTitle,
      description: input.description,
      url,
      siteName: site.name,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
      locale: 'en_US',
      type: input.type ?? 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: input.description,
      images: [image],
    },
  };
}
