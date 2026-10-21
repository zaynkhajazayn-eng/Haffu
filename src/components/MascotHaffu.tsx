import React from 'react';

interface MascotProps {
  size?: 'sm' | 'md' | 'lg';
  mood?: 'happy' | 'celebrate' | 'thinking' | 'wink';
  className?: string;
}

export const MascotHaffu: React.FC<MascotProps> = ({
  size = 'md',
  mood = 'happy',
  className = ''
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-36 h-36'
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeMap[size]} ${className}`}>
      {/* SVG Mascot Haffu the Lion Cub */}
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full drop-shadow-md select-none transition-transform duration-300 hover:scale-105"
      >
        {/* Mane / Sunburst fur */}
        <circle cx="80" cy="85" r="54" fill="#F59E0B" />
        <circle cx="80" cy="85" r="50" fill="#FBBF24" />
        {/* Mane bumps */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const cx = 80 + Math.cos(rad) * 48;
          const cy = 85 + Math.sin(rad) * 48;
          return <circle key={i} cx={cx} cy={cy} r="14" fill="#F59E0B" />;
        })}

        {/* Ears */}
        <circle cx="48" cy="46" r="16" fill="#F59E0B" />
        <circle cx="48" cy="46" r="9" fill="#F472B6" />
        <circle cx="112" cy="46" r="16" fill="#F59E0B" />
        <circle cx="112" cy="46" r="9" fill="#F472B6" />

        {/* Head */}
        <circle cx="80" cy="85" r="42" fill="#FDE047" />

        {/* Cute cheeks */}
        <ellipse cx="56" cy="94" rx="7" ry="5" fill="#FDA4AF" opacity="0.8" />
        <ellipse cx="104" cy="94" rx="7" ry="5" fill="#FDA4AF" opacity="0.8" />

        {/* Eyes */}
        {mood === 'celebrate' || mood === 'wink' ? (
          <>
            <path d="M 52 78 Q 62 70 70 78" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" fill="none" />
            <circle cx="98" cy="76" r="6" fill="#1E293B" />
            <circle cx="96" cy="74" r="2.5" fill="#FFFFFF" />
          </>
        ) : mood === 'thinking' ? (
          <>
            <circle cx="62" cy="74" r="6" fill="#1E293B" />
            <circle cx="60" cy="72" r="2.5" fill="#FFFFFF" />
            <circle cx="98" cy="74" r="6" fill="#1E293B" />
            <circle cx="96" cy="72" r="2.5" fill="#FFFFFF" />
            {/* Thinking question mark above */}
            <text x="110" y="38" fontSize="24" fill="#EC4899" fontWeight="bold">?</text>
          </>
        ) : (
          <>
            {/* Normal big sparkly eyes */}
            <circle cx="62" cy="76" r="6.5" fill="#1E293B" />
            <circle cx="60" cy="73.5" r="2.5" fill="#FFFFFF" />
            <circle cx="64" cy="78" r="1.2" fill="#FFFFFF" />

            <circle cx="98" cy="76" r="6.5" fill="#1E293B" />
            <circle cx="96" cy="73.5" r="2.5" fill="#FFFFFF" />
            <circle cx="100" cy="78" r="1.2" fill="#FFFFFF" />
          </>
        )}

        {/* Nose */}
        <path d="M 75 88 L 85 88 L 80 94 Z" fill="#991B1B" />

        {/* Smile */}
        <path
          d="M 72 98 Q 80 106 88 98"
          stroke="#78350F"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Crown on head */}
        <path
          d="M 64 42 L 70 28 L 80 36 L 90 28 L 96 42 Z"
          fill="#EC4899"
          stroke="#BE185D"
          strokeWidth="1.5"
        />
        <circle cx="70" cy="28" r="2.5" fill="#FDE047" />
        <circle cx="80" cy="36" r="2.5" fill="#60A5FA" />
        <circle cx="90" cy="28" r="2.5" fill="#FDE047" />
      </svg>
    </div>
  );
};
