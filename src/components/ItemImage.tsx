import React, { useState, useEffect } from 'react';
import type { QuizItem } from '../data/items.ts';

interface ItemImageProps {
  item: QuizItem;
  className?: string;
  imageClassName?: string;
  alt?: string;
  showEmojiInCorner?: boolean;
}

export const ItemImage: React.FC<ItemImageProps> = ({
  item,
  className = 'w-full h-full',
  imageClassName = 'w-full h-full object-cover',
  alt,
  showEmojiInCorner = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Dynamic keyword-based image URL as specified in prompt
  const initialUrl =
    item.image ||
    `https://loremflickr.com/400/400/${encodeURIComponent((item.keyword || item.english).toLowerCase().trim())}`;
  const [currentSrc, setCurrentSrc] = useState<string>(initialUrl);

  // Synchronize state when item changes
  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
    const nextUrl =
      item.image ||
      `https://loremflickr.com/400/400/${encodeURIComponent((item.keyword || item.english).toLowerCase().trim())}`;
    setCurrentSrc(nextUrl);
  }, [item.id, item.image, item.keyword, item.english]);

  const handleError = () => {
    setHasError(true);
  };

  const categoryThemes: Record<string, { bg: string; badge: string; ring: string }> = {
    animals: {
      bg: 'from-amber-100 via-orange-50 to-yellow-100 text-amber-900 border-amber-300',
      badge: 'bg-amber-500/20 text-amber-950 border-amber-300',
      ring: 'border-amber-400',
    },
    birds: {
      bg: 'from-sky-100 via-blue-50 to-cyan-100 text-sky-900 border-sky-300',
      badge: 'bg-sky-500/20 text-sky-950 border-sky-300',
      ring: 'border-sky-400',
    },
    fruits: {
      bg: 'from-emerald-100 via-green-50 to-teal-100 text-emerald-900 border-emerald-300',
      badge: 'bg-emerald-500/20 text-emerald-950 border-emerald-300',
      ring: 'border-emerald-400',
    },
    vehicles: {
      bg: 'from-purple-100 via-pink-50 to-fuchsia-100 text-purple-900 border-purple-300',
      badge: 'bg-purple-500/20 text-purple-950 border-purple-300',
      ring: 'border-purple-400',
    },
  };

  const theme = categoryThemes[item.category] || categoryThemes.animals;

  return (
    <div
      className={`relative ${className} bg-gradient-to-br ${theme.bg} overflow-hidden rounded-2xl flex items-center justify-center border border-white/20 select-none shadow-inner`}
    >
      {/* Underlying decorative vector & emoji - guarantees instant zero-blank offline recognition */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-2 pointer-events-none select-none">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="50" cy="50" r="24" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <span
          className="text-5xl sm:text-6xl filter drop-shadow-md select-none transform transition-transform"
          role="img"
          aria-label={item.english}
        >
          {item.emoji}
        </span>
        <span
          className={`text-[10px] font-black tracking-wide uppercase mt-1 px-2 py-0.5 rounded-full border shadow-xs ${theme.badge} select-none`}
        >
          {item.english}
        </span>
      </div>

      {/* Online/cached image overlay */}
      {!hasError && (
        <img
          src={currentSrc}
          alt={alt || item.english}
          referrerPolicy="no-referrer"
          onError={handleError}
          onLoad={() => setIsLoaded(true)}
          className={`${imageClassName} z-10 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="eager"
        />
      )}

      {showEmojiInCorner && (
        <span className="absolute bottom-1.5 left-1.5 text-xl select-none drop-shadow-md z-20">
          {item.emoji}
        </span>
      )}
    </div>
  );
};
