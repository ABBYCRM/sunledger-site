import Image from 'next/image';
import { HERO_PLACEHOLDER_SVG } from '@/content/images';

interface HeroProps {
  title: string;
  subtitle?: string;
  imageId?: string;
  alt?: string;
  cta?: { label: string; href: string };
}

export function Hero({ title, subtitle, imageId = 'hero-home', alt = 'Solar installation scene', cta }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(HERO_PLACEHOLDER_SVG)}`}
          alt={alt}
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover"
          data-image-id={imageId}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/90 via-slate-900/60 to-slate-900/20" aria-hidden="true" />
      </div>
      <div className="container-content flex min-h-[480px] flex-col justify-center py-20 text-white">
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">{title}</h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-slate-200">{subtitle}</p>
        )}
        {cta && (
          <div className="mt-8">
            <a href={cta.href} className="btn-primary">{cta.label}</a>
          </div>
        )}
      </div>
    </section>
  );
}
