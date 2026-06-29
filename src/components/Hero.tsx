import { Picture } from './Picture';

interface HeroProps {
  title: string;
  subtitle?: string;
  image?: string;        // baseName of /public/img/optimized/<basename>-*w.*
  alt?: string;
  cta?: { label: string; href: string };
  eyebrow?: string;
}

export function Hero({ title, subtitle, image = 'hero-home', alt = 'Solar installation scene', cta, eyebrow }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 -z-10">
        <Picture
          baseName={image}
          alt={alt}
          sizes="100vw"
          widths={[640, 1024, 1920]}
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
          priority
          fetchPriority="high"
        />
        <div
          className="absolute inset-0 bg-gradient-to-tr from-slate-950/95 via-slate-900/75 to-slate-900/40"
          aria-hidden="true"
        />
      </div>
      <div className="container-content flex min-h-[520px] flex-col justify-center py-24">
        {eyebrow && (
          <p className="mb-4 inline-flex w-fit items-center rounded-full border border-solar-500/40 bg-solar-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-solar-500">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">{title}</h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg text-slate-200 sm:text-xl">{subtitle}</p>
        )}
        {cta && (
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={cta.href} className="btn-primary text-base">{cta.label}</a>
            <a href="/states" className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/20">
              Browse state info
            </a>
          </div>
        )}
      </div>
    </section>
  );
}