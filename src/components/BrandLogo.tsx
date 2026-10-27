import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const badgeSize =
    size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  const titleSize =
    size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg';

  return (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {/* Bespoke Rounded Mint Badge with Custom Coffee Bean & Steam Monogram */}
      <div
        className={`${badgeSize} rounded-2xl bg-[#8FB4AC] p-1.5 flex items-center justify-center shadow-xs border border-white/80 transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-md shrink-0`}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[#263238]"
        >
          {/* Dual upward rising fluid steam arcs */}
          <path
            d="M15 11C14.2 9.5 15.5 8 16.5 6.5C17.5 5 16.8 4 16 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />
          <path
            d="M24 11C23.2 9.5 24.5 8 25.5 6.5C26.5 5 25.8 4 25 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />

          {/* Stylized Monogram M fused with Coffee Bean contour */}
          {/* Left leg of M */}
          <path
            d="M8 34V16C8 14.5 9 13.5 10.5 13.5H12C13.5 13.5 14.5 14.5 14.5 16V27"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Right leg of M */}
          <path
            d="M32 34V16C32 14.5 31 13.5 29.5 13.5H28C26.5 13.5 25.5 14.5 25.5 16V27"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Central Coffee Bean oval belly with curved cleft slit */}
          <path
            d="M14.5 25.5C14.5 20.8 17 17 20 17C23 17 25.5 20.8 25.5 25.5C25.5 30.2 23 34 20 34C17 34 14.5 30.2 14.5 25.5Z"
            stroke="currentColor"
            strokeWidth="2.2"
            fill="rgba(255, 255, 255, 0.35)"
          />

          {/* S-curved central cleft slit of the bean */}
          <path
            d="M19.8 18C18.8 21.5 21.2 24.5 20.2 28.5C19.7 30.5 19.2 32.5 19.8 33"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typography Lockup */}
      <div className="flex flex-col text-left">
        <span
          className={`font-display font-extrabold ${titleSize} tracking-[0.14em] text-[#263238] uppercase leading-none`}
        >
          MAISON MOKA
        </span>
        {showSubtitle && (
          <span className="text-[9px] font-tech font-bold tracking-widest text-[#263238]/65 uppercase mt-1">
            Artisanal Roastery & Bakehouse
          </span>
        )}
      </div>
    </div>
  );
};
