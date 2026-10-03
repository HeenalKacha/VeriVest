import React, { useState } from 'react';
import { User, Menu, X, ShieldAlert, LogOut, Settings as SettingsIcon, CheckSquare, Sparkles } from 'lucide-react';
import { Language, User as UserType } from '../../types';
import { translations } from '../../i18n/translations';
import { VeriVestLogo } from './VeriVestLogo';
import { LanguageSelector } from './LanguageSelector';

interface NavbarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  activeRoute: string;
  onNavigate: (route: string) => void;
  user: UserType | null;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  activeRoute,
  onNavigate,
  user,
  onSignOut,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const t = translations[currentLanguage];
  const isHi = currentLanguage === 'hi';
  const isMr = currentLanguage === 'mr';

  // Navigation Items strictly adhering to Section 29:
  // VERIFY | TIP PROFILER | BEFORE YOU PAY | LEARN | SCAN HISTORY | HOW IT WORKS
  const navItems = [
    {
      id: 'dashboard',
      label: isHi ? 'सत्यापित करें' : isMr ? 'पडताळणी करा' : 'VERIFY',
    },
    {
      id: 'tip-profiler',
      label: isHi ? 'टिप प्रोफाईलर' : isMr ? 'टिप प्रोफायलर' : 'TIP PROFILER',
    },
    {
      id: 'before-you-pay',
      label: isHi ? 'पैसे देने से पहले' : isMr ? 'पैसे देण्यापूर्वी' : 'BEFORE YOU PAY',
    },
    {
      id: 'education',
      label: isHi ? 'शिक्षा' : isMr ? 'शिका' : 'LEARN',
    },
    {
      id: 'history',
      label: isHi ? 'इतिहास' : isMr ? 'इतिहास' : 'SCAN HISTORY',
    },
    {
      id: 'how-it-works',
      label: isHi ? 'यह कैसे काम करता है' : isMr ? 'हे कसे कार्य करते' : 'HOW IT WORKS',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FCF9F8] border-b border-[#E5E4DE]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left: VeriVest Brand Lockup */}
        <div
          onClick={() => onNavigate('landing')}
          className="cursor-pointer flex items-center gap-3 py-2 shrink-0"
        >
          <VeriVestLogo subtext="Verify Before You Trust" />
        </div>

        {/* Center: Desktop Navigation items (Section 29) */}
        <nav className="hidden xl:flex items-center space-x-6">
          {navItems.map((item) => {
            const isActive = activeRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-xs font-sans tracking-[0.06em] uppercase transition-colors relative py-1 whitespace-nowrap ${
                  isActive
                    ? 'font-semibold text-[#111111] border-b-2 border-[#111111]'
                    : 'text-[#444748] hover:text-[#111111]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Cluster */}
        <div className="hidden sm:flex items-center space-x-3 shrink-0">
          {/* Simulator Quick Link */}
          <button
            onClick={() => onNavigate('simulator')}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] border text-xs font-mono font-semibold uppercase transition-colors ${
              activeRoute === 'simulator'
                ? 'bg-[#111111] text-white border-[#111111]'
                : 'border-[#E5E4DE] text-[#444748] hover:border-[#111111]'
            }`}
            title="Interactive Simulator"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Simulator</span>
          </button>

          {/* Multilingual Selector */}
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
          />

          {/* User Profile or Sign In */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center font-medium text-xs hover:bg-[#2A2A28] transition-colors"
                title={user.name || user.email}
              >
                {user.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#FCF9F8] border border-[#111111] shadow-[4px_4px_0px_rgba(17,17,17,0.08)] py-2 z-50">
                  <div className="px-4 py-2 border-b border-[#E5E4DE]">
                    <div className="text-xs font-semibold text-[#111111] truncate">{user.name}</div>
                    <div className="text-[11px] text-[#66645E] truncate">{user.email || user.mobile}</div>
                  </div>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onNavigate('settings');
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs text-[#111111] hover:bg-[#F5F4F0] text-left"
                  >
                    <SettingsIcon className="w-3.5 h-3.5 text-[#66645E]" />
                    <span>{t.nav.settings}</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onSignOut();
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs text-[#991B1B] hover:bg-[#FEE2E2] text-left"
                  >
                    <LogOut className="w-3.5 h-3.5 text-[#991B1B]" />
                    <span>{t.nav.signOut}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              className="text-xs font-sans tracking-[0.06em] uppercase font-semibold text-[#111111] hover:underline underline-offset-4 px-2 py-1"
            >
              {t.nav.signIn}
            </button>
          )}

          {/* Primary Action Button */}
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 bg-[#111111] text-[#FCF9F8] text-xs font-sans tracking-[0.06em] uppercase font-semibold px-4 py-2 rounded-[2px] hover:bg-[#2A2A28] transition-colors whitespace-nowrap"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>CHECK CLAIM</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex xl:hidden items-center gap-2">
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
            variant="compact"
          />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-[4px] border border-[#E5E4DE] text-[#111111]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#E5E4DE] bg-[#FCF9F8] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-sm font-sans tracking-wide uppercase py-2.5 px-3 rounded-[4px] ${
                  activeRoute === item.id
                    ? 'bg-[#E5E2E1] font-semibold text-[#111111]'
                    : 'text-[#444748] hover:bg-[#F5F4F0]'
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => {
                onNavigate('simulator');
                setMobileMenuOpen(false);
              }}
              className={`text-left text-sm font-sans tracking-wide uppercase py-2.5 px-3 rounded-[4px] flex items-center gap-2 ${
                activeRoute === 'simulator'
                  ? 'bg-[#E5E2E1] font-semibold text-[#111111]'
                  : 'text-[#444748] hover:bg-[#F5F4F0]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#D97706]" />
              <span>SIMULATOR</span>
            </button>
          </div>

          <div className="pt-3 border-t border-[#E5E4DE] flex flex-col gap-2">
            <button
              onClick={() => {
                onNavigate('dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#111111] text-white text-xs font-sans tracking-[0.06em] uppercase font-semibold py-3 rounded-[2px] text-center"
            >
              CHECK A CLAIM NOW
            </button>

            {user ? (
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-[#66645E] truncate">{user.name || user.email}</span>
                <button
                  onClick={() => {
                    onSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-[#991B1B] font-semibold uppercase"
                >
                  {t.nav.signOut}
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onNavigate('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full border border-[#E5E4DE] text-[#111111] text-xs font-sans tracking-[0.06em] uppercase font-semibold py-2.5 rounded-[2px] text-center hover:bg-[#F5F4F0]"
              >
                {t.nav.signIn}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
