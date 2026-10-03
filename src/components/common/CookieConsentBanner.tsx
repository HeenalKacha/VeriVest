import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, X } from 'lucide-react';
import { Language } from '../../types';

interface CookieConsentBannerProps {
  currentLanguage: Language;
  onOpenCookiePolicy: () => void;
  onOpenPrivacyPolicy: () => void;
}

const COOKIE_STORAGE_KEY = 'verivest_cookie_consent_v1';

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  currentLanguage,
  onOpenCookiePolicy,
  onOpenPrivacyPolicy,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const isHi = currentLanguage === 'hi';

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (!stored) {
        // Show after a brief delay for smoother UX
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem(
        COOKIE_STORAGE_KEY,
        JSON.stringify({
          essential: true,
          analytics: true,
          acceptedAt: new Date().toISOString(),
          choice: 'all',
        })
      );
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem(
        COOKIE_STORAGE_KEY,
        JSON.stringify({
          essential: true,
          analytics: false,
          acceptedAt: new Date().toISOString(),
          choice: 'essential_only',
        })
      );
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie Consent Banner"
      className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-4 bg-white/95 backdrop-blur-md border-t border-[#E5E4DE] shadow-[0_-4px_16px_rgba(0,0,0,0.08)] animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Information text */}
        <div className="flex items-start gap-3 max-w-3xl">
          <div className="w-8 h-8 rounded-full bg-[#F5F4F0] border border-[#E5E4DE] flex items-center justify-center shrink-0 mt-0.5 text-[#111111]">
            <Cookie className="w-4 h-4 text-[#111111]" />
          </div>
          <div className="space-y-1 text-xs text-[#333333] leading-relaxed">
            <p className="font-semibold text-[#111111]">
              {isHi
                ? 'कुकीज़ और डेटा गोपनीयता सूचना (Cookie & Data Privacy Notice)'
                : 'Investor Privacy & Cookie Compliance'}
            </p>
            <p className="text-[#66645E]">
              {isHi
                ? 'VeriVest सुरक्षित प्रमाणीकरण (Google Sign-In), धोखाधड़ी रोकथाम, और सत्यापन सत्रों के लिए आवश्यक कुकीज़ का उपयोग करता है। हम कभी भी आपका वित्तीय डेटा तृतीय पक्षों को नहीं बेचते हैं।'
                : 'VeriVest uses strictly essential cookies for secure Firebase authentication, session security, and offline scan storage. We never sell investor data or query payloads.'}
              {' '}
              <button
                type="button"
                onClick={onOpenCookiePolicy}
                className="font-medium text-[#111111] underline hover:text-black cursor-pointer"
              >
                {isHi ? 'कुकी नीति पढ़ें' : 'Cookie Policy'}
              </button>
              {' • '}
              <button
                type="button"
                onClick={onOpenPrivacyPolicy}
                className="font-medium text-[#111111] underline hover:text-black cursor-pointer"
              >
                {isHi ? 'गोपनीयता नीति' : 'Privacy Policy'}
              </button>
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={handleEssentialOnly}
            className="px-3.5 py-2 rounded-[4px] border border-[#D8D6CE] bg-white text-xs font-mono font-medium text-[#444748] hover:border-[#111111] hover:text-[#111111] transition-colors cursor-pointer"
          >
            {isHi ? 'केवल आवश्यक' : 'Essential Only'}
          </button>

          <button
            type="button"
            onClick={handleAcceptAll}
            className="px-4 py-2 rounded-[4px] bg-[#111111] text-white text-xs font-mono font-semibold uppercase hover:bg-[#2A2A28] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isHi ? 'सभी स्वीकार करें' : 'Accept All'}</span>
          </button>

          <button
            type="button"
            onClick={handleEssentialOnly}
            className="p-2 text-[#888680] hover:text-[#111111] transition-colors cursor-pointer"
            aria-label="Dismiss cookie notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};