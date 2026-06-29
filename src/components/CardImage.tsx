import { Picture } from './Picture';

interface CardImageProps {
  baseName: string;
  alt: string;
  className?: string;
  aspect?: '16/9' | '4/3' | '3/2';
}

/** A 16:9 (default) picture for use inside cards. Always lazy. */
export function CardImage({ baseName, alt, className, aspect = '16/9' }: CardImageProps) {
  const dims = aspect === '4/3' ? { w: 1024, h: 768 } : aspect === '3/2' ? { w: 1024, h: 683 } : { w: 1024, h: 576 };
  return (
    <div className={`relative overflow-hidden ${className ?? ''}`} style={{ aspectRatio: aspect.replace('/', '/') }}>
      <Picture
        baseName={baseName}
        alt={alt}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        widths={[480, 768, 1024]}
        width={dims.w}
        height={dims.h}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}