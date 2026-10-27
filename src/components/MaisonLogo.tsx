import React from 'react';

interface MaisonLogoProps {
  className?: string;
  badgeSize?: number;
  showWordmark?: boolean;
  wordmarkClassName?: string;
  inverted?: boolean;
}

/**
 * Bespoke Maison Moka Monogram & Brand Lockup:
 * Custom vector monogram combining a stylized coffee bean silhouette with
 * fluid curved steam lines embedded inside a rounded soft mint badge (#8FB4AC).
 */
export const MaisonLogo: React.FC<MaisonLogoProps> = ({
  className = '',
  badgeSize = 42,
  showWordmark = true,
  wordmarkClassName = '',
  inverted = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Custom Vector Mint Badge Monogram */}
      <svg
        width={badgeSize}
        height={badgeSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-500 ease-out group-hover:scale-105"
      >
        {/* Soft Mint Badge background with organic rounded corners */}
        <rect
          width="48"
          height="48"
          rx="14"
          fill="#8FB4AC"
          className="transition-colors duration-300"
        />

        {/* Subtle inner badge bezel highlight */}
        <rect
          x="1"
          y="1"
          width="46"
          height="46"
          rx="13"
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="1.2"
        />

        {/* Stylized Coffee Bean Silhouette (Charcoal #263238) */}
        <g transform="translate(11, 14)">
          {/* Left Bean Half with curvature */}
          <path
            d="M 12 2 C 7 2 2 6 2 12 C 2 17 6 21 11.5 21 C 12 21 12 20.5 12 20 C 11.2 16.5 10.5 13 11.2 9.5 C 11.6 7.5 12 5.5 12 2 Z"
            fill="#263238"
          />
          {/* Right Bean Half with curvature */}
          <path
            d="M 14 2 C 19 2 24 6 24 12 C 24 17 20 21 14.5 21 C 14 21 14 20.5 14 20 C 14.8 16.5 15.5 13 14.8 9.5 C 14.4 7.5 14 5.5 14 2 Z"
            fill="#263238"
          />
          {/* Fluid S-Curved Cleft Line */}
          <path
            d="M 13 1.8 C 11.5 6 15 11 12.5 16.5 C 12 17.5 11.8 19 13 21"
            stroke="#8FB4AC"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </g>

        {/* Fluid Curved Steam Lines rising gracefully */}
        <path
          d="M 21 11 C 19.5 8.5 22 6.5 20.5 4"
          stroke="#263238"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M 27 12 C 28.5 9 26 7 27.5 4.5"
          stroke="#263238"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.85"
        />
      </svg>

      {/* Bespoke Editorial Typographic Lockup */}
      {showWordmark && (
        <div className={`flex flex-col text-left ${wordmarkClassName}`}>
          <span
            className={`font-headline text-lg sm:text-xl font-extrabold tracking-tight leading-none ${
              inverted ? 'text-white' : 'text-[#263238]'
            }`}
          >
            MAISON MOKA
          </span>
          <span
            className={`text-[9.5px] tracking-[0.25em] uppercase font-tech mt-1 leading-none ${
              inverted ? 'text-white/60' : 'text-[#263238]/60 font-semibold'
            }`}
          >
            Artisanal Roastery
          </span>
        </div>
      )}
    </div>
  );
};
