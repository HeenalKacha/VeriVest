import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { Language } from '../../types';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  variant?: 'nav' | 'inline' | 'compact';
}

const languages: { code: Language; label: string; nativeName: string }[] = [
  { code: 'en', label: 'English', nativeName: 'English (Official Ledger)' },
  { code: 'hi', label: 'हिंदी', nativeName: 'हिंदी (Hindi)' },
  { code: 'mr', label: 'मराठी', nativeName: 'मराठी (Marathi)' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  variant = 'nav',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const current = languages.find((l) => l.code === currentLanguage) || languages[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select interface language"
        className={`flex items-center gap-1.5 font-sans font-medium text-xs tracking-wider uppercase transition-colors ${
          variant === 'nav'
            ? 'px-2.5 py-1.5 rounded-[4px] border border-[#E5E4DE] bg-[#FCF9F8] text-[#111111] hover:border-[#111111] hover:bg-[#F5F4F0]'
            : 'px-3 py-2 rounded-[4px] border border-[#E5E4DE] bg-white text-[#111111] hover:border-[#111111]'
        }`}
      >
        <Globe className="w-3.5 h-3.5 text-[#66645E]" />
        <span>{current.label}</span>
        <ChevronDown className="w-3 h-3 text-[#66645E] ml-0.5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-48 rounded-[4px] bg-[#FCF9F8] border border-[#111111] shadow-[4px_4px_0px_rgba(17,17,17,0.08)] py-1 z-50">
          <div className="px-3 py-1.5 text-[10px] font-mono tracking-widest text-[#66645E] uppercase border-b border-[#E5E4DE]">
            SELECT LANGUAGE / भाषा निवडा
          </div>
          {languages.map((lang) => {
            const isSelected = lang.code === currentLanguage;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  onLanguageChange(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs font-sans transition-colors ${
                  isSelected
                    ? 'bg-[#E5E2E1] font-semibold text-[#111111]'
                    : 'text-[#222222] hover:bg-[#F5F4F0]'
                }`}
              >
                <span>{lang.nativeName}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#111111]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
