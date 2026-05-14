import { useCallback, useState } from 'react';

type SafeImageProps = {
  src: string;
  alt: string;
  /** Applied to the `<img>` when the image loads. */
  className?: string;
  /** Applied to the fallback block when the image fails (defaults to `className`). */
  fallbackClassName?: string;
  loading?: 'lazy' | 'eager';
};

function buildFallbackClass(
  fallbackClassName: string | undefined,
  className: string | undefined,
): string {
  return `${fallbackClassName ?? className ?? ''} image-fallback`.trim();
}

/**
 * Renders a product image, or a compact “unavailable” placeholder if the URL fails.
 */
export default function SafeImage({
  src,
  alt,
  className,
  fallbackClassName,
  loading = 'lazy',
}: SafeImageProps) {
  const trimmed = src?.trim() ?? '';
  const [failed, setFailed] = useState(() => trimmed.length === 0);
  const onError = useCallback(() => {
    setFailed(true);
  }, []);

  const fallbackClass = buildFallbackClass(fallbackClassName, className);

  if (failed || !trimmed) {
    return (
      <div
        className={fallbackClass}
        role='img'
        aria-label={alt ? `${alt} — image unavailable` : 'Image unavailable'}
      >
        <span className='image-fallback__text'>No preview</span>
      </div>
    );
  }

  return (
    <img
      src={trimmed}
      alt={alt}
      className={className}
      loading={loading}
      onError={onError}
    />
  );
}
