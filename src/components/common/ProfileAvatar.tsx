import React from 'react';
import { Gender } from '../../types';

interface ProfileAvatarProps {
  gender: Gender;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  gender,
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
  };

  const isFemale = gender === 'Female';

  return (
    <div
      className={`rounded-full bg-[#F5F4F0] border border-[#111111] overflow-hidden shrink-0 flex items-center justify-center select-none shadow-xs ${sizeMap[size]} ${className}`}
      title={isFemale ? 'Girl Character' : 'Boy Character'}
      aria-label={isFemale ? 'Girl avatar' : 'Boy avatar'}
    >
      {isFemale ? (
        // Friendly, professional Girl character
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circle wash */}
          <circle cx="50" cy="50" r="50" fill="#EAE8E2" />

          {/* Hair back */}
          <path
            d="M26 44C26 28 35 15 50 15C65 15 74 28 74 44C74 58 70 70 70 70L30 70C30 70 26 58 26 44Z"
            fill="#2B201A"
          />

          {/* Neck */}
          <rect x="44" y="56" width="12" height="12" rx="2" fill="#E6A889" />

          {/* Shoulders / Professional Blouse */}
          <path
            d="M28 85C28 69 38 65 50 65C62 65 72 69 72 85V100H28V85Z"
            fill="#2D6A4F"
          />
          {/* Collar / V-neck */}
          <path d="M44 65L50 75L56 65H44Z" fill="#E6A889" />
          <path d="M41 65L50 78L59 65L55 65L50 73L45 65H41Z" fill="#D8F3DC" />

          {/* Head & Face */}
          <ellipse cx="50" cy="45" rx="19" ry="21" fill="#F8BFA4" />

          {/* Ears */}
          <ellipse cx="31" cy="46" rx="3" ry="4.5" fill="#E6A889" />
          <ellipse cx="69" cy="46" rx="3" ry="4.5" fill="#E6A889" />

          {/* Hair front / bangs with soft waves */}
          <path
            d="M31 38C35 24 45 20 50 20C58 20 66 23 69 35C65 31 58 31 52 33C46 35 41 40 31 38Z"
            fill="#3D2E26"
          />
          <path
            d="M31 38C30 46 33 54 34 58C36 50 35 42 36 38L31 38Z"
            fill="#3D2E26"
          />
          <path
            d="M69 35C70 45 67 54 66 58C64 50 65 42 64 36L69 35Z"
            fill="#3D2E26"
          />

          {/* Friendly Eyes */}
          <ellipse cx="43" cy="44" rx="2" ry="2.5" fill="#1B1C1C" />
          <ellipse cx="57" cy="44" rx="2" ry="2.5" fill="#1B1C1C" />
          <circle cx="43.8" cy="43.2" r="0.7" fill="#FFFFFF" />
          <circle cx="57.8" cy="43.2" r="0.7" fill="#FFFFFF" />

          {/* Eyebrows */}
          <path
            d="M40 39.5C42 38.5 45 39 46 40"
            stroke="#3D2E26"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M60 39.5C58 38.5 55 39 54 40"
            stroke="#3D2E26"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Soft Smile */}
          <path
            d="M45 52C47.5 55 52.5 55 55 52"
            stroke="#B95C48"
            strokeWidth="1.7"
            strokeLinecap="round"
          />

          {/* Cheeks blush */}
          <circle cx="38" cy="48" r="2.5" fill="#FFA5A5" opacity="0.5" />
          <circle cx="62" cy="48" r="2.5" fill="#FFA5A5" opacity="0.5" />
        </svg>
      ) : (
        // Friendly, professional Boy character
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circle wash */}
          <circle cx="50" cy="50" r="50" fill="#EAE8E2" />

          {/* Neck */}
          <rect x="44" y="56" width="12" height="12" rx="2" fill="#E6A889" />

          {/* Shoulders / Professional Collared Shirt */}
          <path
            d="M26 84C26 68 37 64 50 64C63 64 74 68 74 84V100H26V84Z"
            fill="#1E3A8A"
          />
          {/* White Shirt Collar */}
          <path d="M44 64L50 74L56 64H44Z" fill="#F8FAFC" />
          {/* Tie or button placket */}
          <path d="M48 70L50 74L52 70V84H48V70Z" fill="#D97706" />

          {/* Head & Face */}
          <ellipse cx="50" cy="44" rx="19" ry="21" fill="#F8BFA4" />

          {/* Ears */}
          <ellipse cx="30" cy="45" rx="3.2" ry="4.8" fill="#E6A889" />
          <ellipse cx="70" cy="45" rx="3.2" ry="4.8" fill="#E6A889" />

          {/* Neat, professional Hair */}
          <path
            d="M31 38C30 25 41 16 50 16C60 16 70 24 69 37C66 31 59 27 50 27C42 27 35 32 31 38Z"
            fill="#1F2421"
          />
          {/* Sideburns */}
          <path d="M31 37L33 46H36L34 37H31Z" fill="#1F2421" />
          <path d="M69 37L67 46H64L66 37H69Z" fill="#1F2421" />

          {/* Friendly Eyes */}
          <ellipse cx="43" cy="43.5" rx="2" ry="2.5" fill="#1B1C1C" />
          <ellipse cx="57" cy="43.5" rx="2" ry="2.5" fill="#1B1C1C" />
          <circle cx="43.8" cy="42.8" r="0.7" fill="#FFFFFF" />
          <circle cx="57.8" cy="42.8" r="0.7" fill="#FFFFFF" />

          {/* Eyebrows */}
          <path
            d="M39 38.5C41 37.5 44 38 46 39"
            stroke="#1F2421"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M61 38.5C59 37.5 56 38 54 39"
            stroke="#1F2421"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Nose */}
          <path
            d="M50 45V48H52"
            stroke="#E6A889"
            strokeWidth="1.4"
            strokeLinecap="round"
          />

          {/* Soft Friendly Smile */}
          <path
            d="M45 52C47.5 55 52.5 55 55 52"
            stroke="#2B2D42"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
};
