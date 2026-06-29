import Link from 'next/link';
import { Picture } from './Picture';

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      <div className="absolute inset-0 -z-10">
        <Picture
          baseName="hero-cta"
          alt="Stylized sun rising over a solar panel field"
          sizes="100vw"
          widths={[640, 1024, 1920]}
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/85 to-slate-900/60" aria-hidden="true" />
      </div>
      <div className="container-content relative py-20 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Ready to learn whether solar makes sense for your home?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          Share a few details about your home and your electricity bill. We&apos;ll connect you with qualified installer partners in your area. No obligation, no cost, no spam.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/contact" className="btn-primary">Get My Free Assessment</Link>
          <Link href="/states" className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/20">Browse State Information</Link>
        </div>
        <p className="mt-6 text-xs text-slate-400">
          We are a lead-generation service. We do not install solar, lend money, or sell electricity. Quotes and final pricing are determined by the installer partners we connect you with.
        </p>
      </div>
    </section>
  );
}