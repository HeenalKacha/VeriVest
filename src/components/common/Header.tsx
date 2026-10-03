import React from 'react';
import { Menu, Globe, Check, Shield, GraduationCap, Users } from 'lucide-react';
import { Language, User as UserType } from '../../types';
import { VeriVestLogo } from './VeriVestLogo';
import { ProfileAvatar } from './ProfileAvatar';

export type MainSection = 'scan' | 'learn-simulator' | 'tip-profiler';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  activeSection: MainSection;
  onSelectSection: (section: MainSection) => void;
  onOpenSidebar: () => void;
  user: UserType | null;
  hasBadge?: boolean;
  onNavigateLogin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  activeSection,
  onSelectSection,
  onOpenSidebar,
  user,
  hasBadge = true,
  onNavigateLogin,
}) => {
  const isHi = currentLanguage === 'hi';

  const toggleLanguage = () => {
    onLanguageChange(isHi ? 'en' : 'hi');
  };

  const navItems: {
    id: MainSection;
    label: string;
    number: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      id: 'scan',
      number: '01',
      label: isHi ? 'जांचें (Scan)' : 'Scan',
      icon: Shield,
    },
    {
      id: 'learn-simulator',
      number: '02',
      label: isHi ? 'सीखें / सिमुलेटर' : 'Learn / Simulator',
      icon: GraduationCap,
    },
    {
      id: 'tip-profiler',
      number: '03',
      label: isHi ? 'टिप एवं ग्रुप विश्लेषक' : 'Tip & Group Profiler',
      icon: Users,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FCF9F8] border-b border-[#E5E4DE] shadow-xs">
      {/* 1. TOP BAR: Web Name, Menu, Language & Profile Avatar (Uncluttered) */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* LEFT: Entry of Menu (with Menu icon) + VeriVest Brand */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onOpenSidebar}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[4px] border border-[#D8D6CE] bg-white text-[#111111] hover:border-[#111111] hover:bg-[#F5F4F0] transition-colors shadow-xs group cursor-pointer"
            title="Open Menu"
            aria-label="Open menu"
          >
            <Menu className="w-4 h-4 text-[#111111]" />
            <span className="text-xs font-mono font-bold text-[#111111]">
              Menu
            </span>
          </button>

          <button
            onClick={() => onSelectSection('scan')}
            className="cursor-pointer text-left focus:outline-none"
            aria-label="VeriVest Home"
          >
            <VeriVestLogo size="sm" subtext="Verify Before You Trust" />
          </button>
        </div>

        {/* RIGHT: Language Toggle (Hindi/English) + Circle with Avatar & Verified Badge */}
        <div className="flex items-center space-x-2.5 sm:space-x-3.5">
          {/* Hindi / English Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[4px] border border-[#E5E4DE] bg-white text-xs font-mono font-medium text-[#111111] hover:border-[#111111] transition-colors cursor-pointer"
            title={isHi ? 'Switch to English' : 'हिंदी में बदलें'}
          >
            <Globe className="w-3.5 h-3.5 text-[#66645E]" />
            <span>{isHi ? 'English' : 'हिंदी'}</span>
          </button>

          {/* Circle with Avatar + Badge if verified user */}
          {user ? (
            <div
              className="relative flex items-center justify-center select-none"
              title={`${user.name || 'User'} • ${hasBadge ? 'Verified User (Investor Safety Learner)' : 'User'}`}
            >
              <div className="w-9 h-9 rounded-full border border-[#111111] overflow-hidden bg-[#F5F4F0] flex items-center justify-center shadow-xs">
                <ProfileAvatar
                  gender={user.gender || 'Male'}
                  size="sm"
                  className="w-full h-full border-none bg-transparent"
                />
              </div>

              {/* Verified badge if user has badge as a verified user */}
              {hasBadge && (
                <div
                  className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#15803D] text-white flex items-center justify-center border-2 border-white shadow-xs"
                  title="Verified User • Investor Safety Learner"
                  aria-label="Verified user badge"
                >
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onNavigateLogin}
              className="px-3.5 py-1.5 rounded-[4px] bg-[#111111] text-white text-xs font-mono font-semibold uppercase hover:bg-[#2A2A28] transition-colors cursor-pointer"
            >
              {isHi ? 'लॉग इन' : 'Login'}
            </button>
          )}
        </div>
      </div>

      {/* 2. SUB-BAR: SCAN, LEARN / SIMULATOR, TIP & GROUP PROFILER PLACED BELOW HEADER (CENTER ALIGNED & EQUIDISTANT) */}
      <div className="border-t border-[#E5E4DE] bg-[#FAF8F5]/90 backdrop-blur-xs">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8 py-2.5 overflow-x-auto scrollbar-none"
            aria-label="Primary Sections Navigation"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectSection(item.id)}
                  className={`group flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2 rounded-[4px] text-xs font-mono transition-all duration-150 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#111111] text-white font-bold shadow-xs'
                      : 'bg-white border border-[#E5E4DE] text-[#444748] hover:text-[#111111] hover:border-[#111111] hover:bg-[#F5F4F0]'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 shrink-0 transition-transform group-hover:scale-105 ${
                      isActive ? 'text-white' : 'text-[#66645E] group-hover:text-[#111111]'
                    }`}
                  />
                  <span
                    className={`text-[10px] font-mono ${
                      isActive ? 'text-white/60' : 'text-[#888680]'
                    }`}
                  >
                    {item.number}
                  </span>
                  <span className="font-sans font-medium tracking-wide uppercase">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
