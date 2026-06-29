// Responsive picture component with WebP + JPG fallback and srcset.

interface PictureProps {
  baseName: string;           // e.g. "hero-home"
  alt: string;
  sizes: string;              // e.g. "100vw" or "(min-width: 1024px) 50vw, 100vw"
  widths: number[];           // e.g. [640, 1024, 1920]
  height: number;             // intrinsic height (16:9 -> 1080)
  width: number;              // intrinsic width  (16:9 -> 1920)
  className?: string;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
}

export function Picture({
  baseName,
  alt,
  sizes,
  widths,
  height,
  width,
  className,
  priority = false,
  loading = 'lazy',
  fetchPriority,
}: PictureProps) {
  const sortedWidths = [...widths].sort((a, b) => a - b);
  const srcWebP = `/img/optimized/${baseName}-${sortedWidths[sortedWidths.length - 1]}w.webp`;
  const srcJpg = `/img/optimized/${baseName}-${sortedWidths[sortedWidths.length - 1]}w.jpg`;

  return (
    <picture>
      <source
        type="image/webp"
        sizes={sizes}
        srcSet={sortedWidths.map((w) => `/img/optimized/${baseName}-${w}w.webp ${w}w`).join(', ')}
      />
      <source
        type="image/jpeg"
        sizes={sizes}
        srcSet={sortedWidths.map((w) => `/img/optimized/${baseName}-${w}w.jpg ${w}w`).join(', ')}
      />
      <img
        src={srcJpg}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        decoding="async"
        fetchPriority={fetchPriority ?? (priority ? 'high' : 'auto')}
        className={className}
      />
    </picture>
  );
}