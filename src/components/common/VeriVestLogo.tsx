import React from 'react';

interface VeriVestLogoProps {
  className?: string;
  subtext?: string;
  size?: 'sm' | 'md' | 'lg';
  dark?: boolean;
}

export const VeriVestLogo: React.FC<VeriVestLogoProps> = ({
  className = '',
  subtext = 'Verify Before You Trust',
  size = 'md',
  dark = false,
}) => {
  const iconHeight = size === 'sm' ? 20 : size === 'lg' ? 32 : 24;

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Vector Emblem */}
      <svg
        height={iconHeight}
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Tilted solid quadrilateral with bevel */}
        <path
          d="M20 10 L50 10 L30 75 L5 75 Z"
          fill={dark ? '#FFFFFF' : '#111111'}
        />
        {/* Gradient accent corner */}
        <path
          d="M30 75 L45 75 L38 52 Z"
          fill="#8E8E93"
        />
        {/* Verification seal dot */}
        <circle
          cx="62"
          cy="22"
          r="12"
          fill={dark ? '#FFFFFF' : '#111111'}
        />
      </svg>

      <div className="flex flex-col justify-center leading-none">
        <span
          className={`font-serif tracking-tight font-semibold ${
            size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl'
          } ${dark ? 'text-white' : 'text-[#111111]'}`}
        >
          VeriVest
        </span>
        {subtext && (
          <span
            className={`font-sans tracking-[0.14em] uppercase text-[9px] font-semibold mt-0.5 ${
              dark ? 'text-neutral-400' : 'text-[#66645E]'
            }`}
          >
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
};
