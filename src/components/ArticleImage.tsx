import React, { useState } from 'react';
import { ChurchCrossIcon } from './EditorialIcon';

interface ArticleImageProps {
  src?: string;
  alt: string;
  category?: string;
  className?: string;
  aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1';
}

export const ArticleImage: React.FC<ArticleImageProps> = ({
  src,
  alt,
  category = 'Church News',
  className = '',
  aspectRatio = '16/9',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Elegant palette mapping for fallback containers based on category
  const getFallbackGradient = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'worship':
        return 'from-amber-900/10 via-stone-800/15 to-stone-900/20 text-amber-900';
      case 'missions':
        return 'from-emerald-900/10 via-stone-800/15 to-stone-900/20 text-emerald-900';
      case 'world church':
        return 'from-blue-900/10 via-stone-800/15 to-stone-900/20 text-blue-900';
      case 'leadership':
        return 'from-purple-900/10 via-stone-800/15 to-stone-900/20 text-purple-900';
      case 'faith & culture':
        return 'from-rose-900/10 via-stone-800/15 to-stone-900/20 text-rose-900';
      default:
        return 'from-stone-300 via-stone-200 to-stone-300 text-stone-700';
    }
  };

  const aspectClass =
    aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : aspectRatio === '4/3'
      ? 'aspect-[4/3]'
      : aspectRatio === '3/2'
      ? 'aspect-[3/2]'
      : 'aspect-square';

  // If no source or image loading failed, render high-craft architectural fallback
  if (!src || hasError) {
    return (
      <div
        className={`w-full ${aspectClass} bg-[#EFECE6] border border-stone-200 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none ${className}`}
        role="img"
        aria-label={alt || `${category} visual report`}
      >
        {/* Subtle architectural background line work */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#78716c_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 flex flex-col items-center text-center max-w-[85%]">
          <div className="w-10 h-10 rounded-full bg-stone-100/90 border border-stone-300 flex items-center justify-center text-stone-600 mb-2 shadow-xs">
            <ChurchCrossIcon className="w-5 h-5 text-stone-600" />
          </div>
          <span className="font-serif text-xs font-medium text-stone-700 uppercase tracking-widest line-clamp-1">
            {category}
          </span>
          <span className="font-serif text-stone-500 text-[11px] italic mt-0.5 line-clamp-1">
            Ecclesia Chronicle
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${aspectClass} overflow-hidden bg-stone-200 border border-stone-200 ${className}`}>
      {/* Loading placeholder skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-stone-200 animate-pulse" />
      )}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
