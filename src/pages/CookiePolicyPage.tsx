import React, { useState } from 'react';
import { ArrowLeft, Cookie, ShieldCheck, Check, Lock, Info } from 'lucide-react';
import { Language } from '../types';

interface CookiePolicyPageProps {
  currentLanguage: Language;
  onNavigateHome: () => void;
  onOpenPrivacyPolicy: () => void;
}

const COOKIE_STORAGE_KEY = 'verivest_cookie_consent_v1';

export const CookiePolicyPage: React.FC<CookiePolicyPageProps> = ({
  currentLanguage,
  onNavigateHome,
  onOpenPrivacyPolicy,
}) => {
  const isHi = currentLanguage === 'hi';

  const [analyticsEnabled, setAnalyticsEnabled] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.analytics !== false;
      }
    } catch {
      // fallback
    }
    return true;
  });

  const [savedNotice, setSavedNotice] = useState(false);

  const handleSavePreferences = () => {
    try {
      localStorage.setItem(
        COOKIE_STORAGE_KEY,
        JSON.stringify({
          essential: true,
          analytics: analyticsEnabled,
          acceptedAt: new Date().toISOString(),
          choice: analyticsEnabled ? 'all' : 'essential_only',
        })
      );
    } catch {
      // ignore
    }
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const cookieList = [
    {
      name: 'firebase:authUser',
      provider: 'Firebase Authentication (Google)',
      purpose: 'Authenticates and preserves your secure login session across pages.',
      duration: 'Session / 30 Days',
      type: 'Strictly Essential',
    },
    {
      name: 'verivest_auth_user',
      provider: 'VeriVest Local State',
      purpose: 'Stores your active user profile, name, contact details, and gender avatar.',
      duration: 'Persistent Local Storage',
      type: 'Strictly Essential',
    },
    {
      name: 'verivest_scan_history',
      provider: 'VeriVest Offline Cache',
      purpose: 'Stores your investment scan reports on-device for offline reference.',
      duration: 'Persistent Local Storage',
      type: 'Strictly Essential',
    },
    {
      name: 'verivest_language',
      provider: 'VeriVest UI',
      purpose: 'Remembers your preferred language selection (English / Hindi / Marathi).',
      duration: '1 Year',
      type: 'Functional',
    },
    {
      name: 'verivest_simulator_progress',
      provider: 'VeriVest Educational Simulator',
      purpose: 'Records your completed question score and earned Investor Safety Learner badge.',
      duration: 'Persistent Local Storage',
      type: 'Functional',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FCF9F8] text-[#111111] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-[#E5E4DE] pb-4">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-xs font-mono font-semibold uppercase text-[#111111] hover:text-[#444748] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isHi ? 'वापस जाएं (Back to Scan)' : 'Back to Verification Dashboard'}</span>
          </button>

          <span className="text-[11px] font-mono text-[#66645E] uppercase tracking-wider">
            POLICY DOC #CK-2026
          </span>
        </div>

        {/* Title Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#F5F4F0] border border-[#E5E4DE] text-xs font-mono text-[#111111] font-semibold">
            <Cookie className="w-3.5 h-3.5 text-[#111111]" />
            <span>COOKIE & STORAGE POLICY</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#111111]">
            {isHi ? 'कुकी और डेटा संग्रहण नीति' : 'Cookie & Local Storage Policy'}
          </h1>
          <p className="text-sm font-sans text-[#444748] leading-relaxed max-w-2xl">
            {isHi
              ? 'VeriVest आपके डेटा की सुरक्षा और निष्पक्ष वित्तीय सत्यापन को प्राथमिकता देता है। यह पृष्ठ बताता है कि हम कुकीज़ और स्थानीय संग्रहण का उपयोग कैसे करते हैं।'
              : 'VeriVest uses minimal cookies and local browser storage to guarantee session security, preserve investor scan reports, and deliver seamless scam detection.'}
          </p>
        </div>

        {/* Saved confirmation toast */}
        {savedNotice && (
          <div className="p-3.5 rounded-[4px] bg-[#E8F5EE] border border-[#2D6A4F] text-[#1B4332] text-xs font-mono flex items-center gap-2 animate-in fade-in duration-200">
            <Check className="w-4 h-4 text-[#2D6A4F]" />
            <span>Preferences saved successfully! Your settings are now active.</span>
          </div>
        )}

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-[4px] border border-[#E5E4DE] bg-white space-y-2">
            <div className="w-7 h-7 rounded bg-[#F5F4F0] flex items-center justify-center text-[#111111]">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-serif font-bold text-sm text-[#111111]">Zero Advertising Trackers</h3>
            <p className="text-xs text-[#66645E] leading-relaxed">
              We never run commercial ad pixels, behavioral tracking networks, or third-party marketing cookies.
            </p>
          </div>

          <div className="p-5 rounded-[4px] border border-[#E5E4DE] bg-white space-y-2">
            <div className="w-7 h-7 rounded bg-[#F5F4F0] flex items-center justify-center text-[#111111]">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-serif font-bold text-sm text-[#111111]">Encrypted Sessions</h3>
            <p className="text-xs text-[#66645E] leading-relaxed">
              Firebase Auth tokens are cryptographically secured to prevent credential hijacking and session tampering.
            </p>
          </div>

          <div className="p-5 rounded-[4px] border border-[#E5E4DE] bg-white space-y-2">
            <div className="w-7 h-7 rounded bg-[#F5F4F0] flex items-center justify-center text-[#111111]">
              <Info className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-serif font-bold text-sm text-[#111111]">On-Device Scan Isolation</h3>
            <p className="text-xs text-[#66645E] leading-relaxed">
              Your sensitive message drafts and scanned screenshots stay stored in your browser storage.
            </p>
          </div>
        </div>

        {/* Cookie Table */}
        <div className="bg-white border border-[#E5E4DE] rounded-[4px] overflow-hidden shadow-xs">
          <div className="p-4 sm:p-5 border-b border-[#E5E4DE] bg-[#FAF8F5]">
            <h3 className="font-serif text-lg font-bold text-[#111111]">
              Active Storage Tokens & Cookies
            </h3>
            <p className="text-xs text-[#66645E] mt-0.5">
              Complete inventory of storage objects utilized across the VeriVest verification portal.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="border-b border-[#E5E4DE] bg-[#F5F4F0] text-[10px] font-mono uppercase tracking-wider text-[#66645E]">
                <tr>
                  <th className="py-3 px-4">Cookie / Key Name</th>
                  <th className="py-3 px-4">Provider</th>
                  <th className="py-3 px-4">Purpose</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Classification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E4DE]">
                {cookieList.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#FCF9F8] transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#111111] whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="py-3 px-4 text-[#444748] whitespace-nowrap">{item.provider}</td>
                    <td className="py-3 px-4 text-[#333333] min-w-[220px]">{item.purpose}</td>
                    <td className="py-3 px-4 font-mono text-[#66645E] whitespace-nowrap">{item.duration}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="inline-block px-2 py-0.5 rounded-[2px] bg-[#E5E2E1] text-[10px] font-mono font-semibold uppercase text-[#111111]">
                        {item.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Preference Management Section */}
        <div className="p-6 rounded-[4px] border border-[#111111] bg-white space-y-6">
          <div className="border-b border-[#E5E4DE] pb-4">
            <h3 className="font-serif text-xl font-bold text-[#111111]">
              Manage Your Cookie Preferences
            </h3>
            <p className="text-xs text-[#66645E] mt-1">
              Select which categories of storage you wish to authorize during your sessions.
            </p>
          </div>

          <div className="space-y-4">
            {/* Strictly Essential */}
            <div className="flex items-center justify-between p-4 rounded border border-[#E5E4DE] bg-[#FAF8F5]">
              <div className="space-y-1 pr-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#111111] uppercase">
                    1. Strictly Essential (Always Active)
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-[#15803D] text-white px-1.5 py-0.2 rounded font-bold">
                    Required
                  </span>
                </div>
                <p className="text-xs text-[#66645E]">
                  Required for user authentication (Firebase Auth), fraud verification logic, and session security. Cannot be disabled.
                </p>
              </div>
              <input
                type="checkbox"
                checked={true}
                disabled
                className="w-4 h-4 rounded text-[#111111] cursor-not-allowed opacity-70"
              />
            </div>

            {/* Performance & Quality Telemetry */}
            <div className="flex items-center justify-between p-4 rounded border border-[#E5E4DE] bg-white">
              <div className="space-y-1 pr-4">
                <span className="font-mono text-xs font-bold text-[#111111] uppercase">
                  2. Operational Telemetry & Error Diagnostic Cache
                </span>
                <p className="text-xs text-[#66645E]">
                  Helps identify scam database sync latency and diagnostic connectivity errors to maintain 99.9% uptime.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#E5E4DE] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#D8D6CE] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#111111]"></div>
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#E5E4DE]">
            <button
              onClick={onOpenPrivacyPolicy}
              className="text-xs font-mono text-[#66645E] hover:text-[#111111] underline cursor-pointer"
            >
              Read Full Privacy Policy →
            </button>

            <button
              onClick={handleSavePreferences}
              className="w-full sm:w-auto px-6 py-2.5 rounded-[4px] bg-[#111111] text-white text-xs font-mono font-bold uppercase hover:bg-[#2A2A28] transition-colors cursor-pointer shadow-xs"
            >
              Accept & Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};