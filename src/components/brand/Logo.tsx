import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light' | 'white';
  showTagline?: boolean;
  markOnly?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'dark',
  showTagline = false,
  markOnly = false,
  className = '',
}) => {
  // Dimensions
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const taglineSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs tracking-wider',
    xl: 'text-sm tracking-wider',
  };

  // Color schemes
  const titleColor =
    variant === 'light' || variant === 'white'
      ? 'text-white'
      : 'text-[#0C2340]';

  const subColor =
    variant === 'light' || variant === 'white'
      ? 'text-teal-300'
      : 'text-[#0D9488]';

  const tagColor =
    variant === 'light' || variant === 'white'
      ? 'text-slate-300'
      : 'text-slate-600';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official Emblem: Canopy Storefront with Analytical Rising Bars & Upward Growth Arrow */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 280 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          <defs>
            <linearGradient id="logoTealGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#14B8A6"/>
              <stop offset="60%" stopColor="#0D9488"/>
              <stop offset="100%" stopColor="#0F766E"/>
            </linearGradient>
            <linearGradient id="logoNavyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E293B"/>
              <stop offset="60%" stopColor="#0C2340"/>
              <stop offset="100%" stopColor="#08182B"/>
            </linearGradient>
            <linearGradient id="logoDoorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14B8A6"/>
              <stop offset="50%" stopColor="#0D9488"/>
              <stop offset="100%" stopColor="#047857"/>
            </linearGradient>
          </defs>

          <g transform="translate(0, 10)">
            {/* Top Roof Cap */}
            <rect x="25" y="10" width="230" height="15" rx="7.5" fill="#0C2340"/>

            {/* Awning Striped Canopy with 5 Scallops */}
            <path d="M 35 25 L 75 25 L 75 68 C 75 79 35 79 35 68 Z" fill="url(#logoTealGrad)"/>
            <path d="M 75 25 L 120 25 L 120 68 C 120 79 75 79 75 68 Z" fill="url(#logoNavyGrad)"/>
            <path d="M 120 25 L 165 25 L 165 68 C 165 79 120 79 120 68 Z" fill="url(#logoTealGrad)"/>
            <path d="M 165 25 L 205 25 L 205 68 C 205 79 165 79 165 68 Z" fill="url(#logoNavyGrad)"/>
            <path d="M 205 25 L 245 25 L 245 68 C 245 79 205 79 205 68 Z" fill="url(#logoTealGrad)"/>

            {/* Storefront Building Base Structure (Deep Navy) */}
            <path d="M 45 78 L 235 78 L 235 156 C 235 160 231 164 227 164 L 53 164 C 49 164 45 160 45 156 Z" fill="#0C2340"/>

            {/* Door Opening on Left */}
            <rect x="68" y="94" width="46" height="70" rx="8" fill="url(#logoDoorGrad)"/>
            <rect x="65" y="91" width="52" height="73" rx="10" fill="none" stroke="#FFFFFF" strokeWidth="4"/>
            <path d="M 92 94 L 114 94 L 88 164 L 68 164 Z" fill="#FFFFFF" opacity="0.18"/>

            {/* Analytics Rising Bar Chart on Right */}
            <rect x="140" y="128" width="19" height="36" rx="5" fill="#0D9488"/>
            <rect x="169" y="112" width="19" height="52" rx="5" fill="#0D9488"/>
            <rect x="198" y="96" width="19" height="68" rx="5" fill="#0D9488"/>

            {/* Upward Growth Sweep with Arrow */}
            <path d="M 116 142 C 145 140 180 120 220 80 L 210 70 L 236 68 L 234 94 L 224 84 C 182 126 145 148 116 150 Z" fill="#FFFFFF" opacity="0.95"/>
            <path d="M 120 141 C 150 138 182 118 222 82" fill="none" stroke="#10B981" strokeWidth="7" strokeLinecap="round"/>
            <polygon points="220,70 238,68 236,86" fill="#10B981"/>
          </g>
        </svg>
      </div>

      {!markOnly && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5 font-extrabold tracking-tight">
            <span className={`${textSizes[size]} ${titleColor} font-black tracking-tight`}>
              SHAFAF
            </span>
            <span className={`${textSizes[size]} ${subColor} font-black tracking-tight`}>
              HISAB
            </span>
          </div>
          {showTagline && (
            <span className={`${taglineSizes[size]} ${tagColor} font-semibold mt-0.5 tracking-wider uppercase whitespace-nowrap`}>
              Manage Better. Grow Smarter.
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export const BrandLogo = Logo;
