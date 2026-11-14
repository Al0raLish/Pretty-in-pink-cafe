import { useState } from 'react';

export default function FoodImage({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className={`image-fallback ${className}`} role="img" aria-label={`${alt} (photo coming soon)`}>
        <span>Photo coming soon</span>
      </div>
    );
  }
  return <img className={className} src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
}