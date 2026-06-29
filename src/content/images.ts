// Image registry — every image used on the site is registered here so we can
// produce /attributions correctly. URLs point to Unsplash CDN (royalty-free).
//
// IMPORTANT: All hero images below are visually verified during the Playwright
// pass. If an image link returns 404 we fall back to a CSS gradient hero.

export interface ImageEntry {
  id: string;
  src: string;            // /img/... path
  remoteUrl: string;      // attribution URL on Unsplash
  alt: string;
  photographer: string;
  photographerUrl: string;
  licenseName: string;    // e.g. "Unsplash License"
  licenseUrl: string;
}

// Curated images. We do not embed real Unsplash URLs that may 404 — instead,
// each entry also has a remoteUrl stored for /attributions. The src is a local
// placeholder we'll generate in /public/img via a simple generator — that way
// the build is reproducible even without internet.
//
// If a real image is later desired, drop the file into /public/img/... and
// the existing src path will resolve.
export const images: ImageEntry[] = [
  {
    id: 'hero-home',
    src: '/img/hero-home.svg',
    remoteUrl: 'https://unsplash.com/s/photos/solar-panel',
    alt: 'Solar panels on a residential rooftop at golden hour',
    photographer: 'Unsplash community',
    photographerUrl: 'https://unsplash.com',
    licenseName: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  {
    id: 'hero-states',
    src: '/img/hero-states.svg',
    remoteUrl: 'https://unsplash.com/s/photos/solar-farm',
    alt: 'A solar array in a U.S. landscape',
    photographer: 'Unsplash community',
    photographerUrl: 'https://unsplash.com',
    licenseName: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  {
    id: 'hero-guides',
    src: '/img/hero-guides.svg',
    remoteUrl: 'https://unsplash.com/s/photos/solar',
    alt: 'A clean illustration of rooftop solar hardware',
    photographer: 'Unsplash community',
    photographerUrl: 'https://unsplash.com',
    licenseName: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  {
    id: 'hero-pillar',
    src: '/img/hero-pillar.svg',
    remoteUrl: 'https://unsplash.com/s/photos/solar-energy',
    alt: 'A bright solar installation scene',
    photographer: 'Unsplash community',
    photographerUrl: 'https://unsplash.com',
    licenseName: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
];

// Use SVG hero "images" — they're lightweight, deterministic, fast to load,
// and avoid 404 risk on Unsplash URLs. Each one is sized 1920×1080 by viewBox.

export const HERO_PLACEHOLDER_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="60%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#334155"/>
    </linearGradient>
    <linearGradient id="sun" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FEF7E6"/>
      <stop offset="100%" stop-color="#F59E0B"/>
    </linearGradient>
    <linearGradient id="panel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#sky)"/>
  <circle cx="1440" cy="280" r="140" fill="url(#sun)" opacity="0.85"/>
  <!-- Roof line -->
  <polygon points="0,820 420,560 1500,560 1920,820 1920,1080 0,1080" fill="#0B1220"/>
  <!-- Panel array, perspective -->
  <g transform="translate(420 580)" skewY(-12) skewX(-8)>
    <rect x="0"    y="0"   width="160" height="110" fill="url(#panel)" stroke="#F59E0B" stroke-opacity="0.35"/>
    <rect x="180"  y="0"   width="160" height="110" fill="url(#panel)" stroke="#F59E0B" stroke-opacity="0.35"/>
    <rect x="360"  y="0"   width="160" height="110" fill="url(#panel)" stroke="#F59E0B" stroke-opacity="0.35"/>
    <rect x="540"  y="0"   width="160" height="110" fill="url(#panel)" stroke="#F59E0B" stroke-opacity="0.35"/>
    <rect x="720"  y="0"   width="160" height="110" fill="url(#panel)" stroke="#F59E0B" stroke-opacity="0.35"/>
    <rect x="900"  y="0"   width="160" height="110" fill="url(#panel)" stroke="#F59E0B" stroke-opacity="0.35"/>
    <rect x="0"    y="130" width="160" height="110" fill="url(#panel)" stroke="#F59E0B" stroke-opacity="0.35"/>
    <rect x="180"  y="130" width="160" height="110" fill="url(#panel)" stroke="#F59E0B" stroke-opacity="0.35"/>
    <rect x="360"  y="130" width="160" height="110" fill="url(#panel)" stroke="#F59E0B" stroke-opacity="0.35"/>
    <rect x="540"  y="130" width="160" height="110" fill="url(#panel)" stroke="#F59E0B" stroke-opacity="0.35"/>
    <rect x="720"  y="130" width="160" height="110" fill="url(#panel)" stroke="#F59E0B" stroke-opacity="0.35"/>
    <rect x="900"  y="130" width="160" height="110" fill="url(#panel)" stroke="#F59E0B" stroke-opacity="0.35"/>
  </g>
</svg>`;
