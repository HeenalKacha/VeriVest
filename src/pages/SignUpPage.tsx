import React, { useState } from 'react';
import { Eye, EyeOff, Lock, ArrowRight, ShieldCheck, Check, AlertCircle } from 'lucide-react';
import { Language, User } from '../types';
import { translations } from '../i18n/translations';
import { VeriVestLogo } from '../components/common/VeriVestLogo';
import { LanguageSelector } from '../components/common/LanguageSelector';
import { signInWithGoogle } from '../services/firebase';

interface SignUpPageProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onSignUpSuccess: (user: User) => void;
  onNavigate: (route: string) => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({
  currentLanguage,
  onLanguageChange,
  onSignUpSuccess,
  onNavigate,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [preferredLang, setPreferredLang] = useState<Language>(currentLanguage);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [error, setError] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  const t = translations[currentLanguage];

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    const newUser: User = {
      id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      name: fullName || 'Retail Investor',
      email: email || 'investor@verivest.org',
      mobile: mobile || '+91 98765 43210',
      age: 32,
      gender: 'Male',
      language: preferredLang,
      createdAt: new Date().toISOString(),
    };

    if (preferredLang !== currentLanguage) {
      onLanguageChange(preferredLang);
    }
    onSignUpSuccess(newUser);
  };

  const handleGoogleSignUp = async () => {
    setAuthError(null);
    setIsLoadingGoogle(true);
    try {
      const { user } = await signInWithGoogle();
      onSignUpSuccess(user);
    } catch (err: any) {
      console.warn('Google sign-up error:', err);
      if (err?.code === 'auth/popup-closed-by-user') {
        setAuthError('Sign-in popup was closed. Please try again.');
      } else {
        setAuthError(err?.message || 'Google authentication failed. Please check network.');
      }
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF9F8] flex flex-col justify-between">
      {/* Top Header Bar matching Image 3 */}
      <div className="max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <div
          onClick={() => onNavigate('landing')}
          className="cursor-pointer"
        >
          <VeriVestLogo subtext="FORENSIC LAB" />
        </div>

        <div className="flex items-center gap-4">
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
          />
          <button
            onClick={() => onNavigate('education')}
            className="text-[11px] font-mono tracking-widest text-[#111111] hover:underline uppercase hidden sm:inline"
          >
            {t.inquiryDesk}
          </button>
        </div>
      </div>

      {/* Main Split Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl bg-[#FCF9F8] border border-[#E5E4DE] rounded-[4px] shadow-[4px_4px_0px_rgba(17,17,17,0.04)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Archive Dossier Specs (5 cols) */}
          <div className="lg:col-span-5 bg-[#F5F4F0] p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-[#E5E4DE] flex flex-col justify-between">
            <div className="space-y-6">
              <VeriVestLogo size="sm" subtext="FORENSIC LAB" />

              <div className="pt-2">
                <div className="text-[10px] font-mono tracking-widest text-[#66645E] uppercase mb-1 font-semibold">
                  SYSTEM INTEGRITY ARCHIVE
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111111] leading-tight">
                  Verify. <br />
                  <span className="italic font-normal font-serif text-[#444748]">
                    Before You Invest.
                  </span>
                </h2>
                <p className="font-sans text-xs text-[#66645E] mt-3 leading-relaxed">
                  Make informed decisions before your money changes hands.
                </p>
              </div>

              {/* Active Reputation Probe Card matching Image 3 */}
              <div className="bg-[#FFFFFF] border border-[#E5E4DE] rounded-[4px] p-4 space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase pb-2 border-b border-[#E5E4DE]">
                  <span className="flex items-center gap-1.5 text-[#111111]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]" />
                    ACTIVE REPUTATION PROBE #894-B
                  </span>
                  <span className="bg-[#AEEECB] text-[#0E5138] px-1.5 py-0.5 rounded-[2px] font-semibold">
                    SEBI CLEARED
                  </span>
                </div>

                {/* Micro Bar Chart */}
                <div className="flex items-end gap-1.5 h-10 py-1">
                  <div className="w-1/6 bg-[#E5E2E1] h-3/6 rounded-[1px]" />
                  <div className="w-1/6 bg-[#E5E2E1] h-4/6 rounded-[1px]" />
                  <div className="w-1/6 bg-[#E5E2E1] h-2/6 rounded-[1px]" />
                  <div className="w-1/6 bg-[#E5E2E1] h-5/6 rounded-[1px]" />
                  <div className="w-1/6 bg-[#E5E2E1] h-full rounded-[1px]" />
                  <div className="w-1/6 bg-[#2D6A4F] h-full rounded-[1px]" />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-[#444748] pt-1">
                  <span>Domain Age: 7.4 yrs</span>
                  <span>Registry: Confirmed Bank-Grade</span>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-[#66645E] pt-2 border-t border-[#E5E4DE]">
                  <span className="flex items-center gap-1 text-[#2D6A4F]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    SHA-256 Signature Match
                  </span>
                  <span>0x9F41...82A</span>
                </div>
              </div>
            </div>

            {/* Bottom Citation */}
            <div className="pt-8">
              <p className="italic font-serif text-xs text-[#444748]">
                “Financial safety should be understandable to everyone.”
              </p>
              <div className="text-[10px] font-mono text-[#66645E] tracking-wider uppercase mt-1 flex justify-between">
                <span>EDITORIAL VERIFICATION STANDARD #4102</span>
                <span>REV 2.8</span>
              </div>
            </div>
          </div>

          {/* Right Column: Account Creation Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#FCF9F8] p-8 sm:p-12 flex flex-col justify-between">
            <div className="flex justify-end mb-2">
              <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageChange={onLanguageChange}
              />
            </div>

            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#66645E] uppercase mb-1 font-semibold">
                GET STARTED
              </div>
              <h1 className="font-serif text-3xl font-semibold text-[#111111]">
                {t.auth.signUpTitle}
              </h1>
              <p className="font-sans text-xs text-[#66645E] mt-1">
                {t.auth.signUpSubtitle}
              </p>

              {error && (
                <div className="mt-3 p-2 bg-[#FEE2E2] border border-[#991B1B] text-[#991B1B] text-xs font-sans rounded-[4px]">
                  {error}
                </div>
              )}

              <form onSubmit={handleCreateAccount} className="mt-5 space-y-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-[#111111] uppercase font-semibold mb-1">
                    {t.auth.fullName}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.auth.fullNamePlaceholder}
                    className="w-full bg-[#FFFFFF] border border-[#E5E4DE] focus:border-[#111111] rounded-[4px] px-3 py-2 text-xs text-[#111111] outline-none font-sans"
                  />
                </div>

                {/* Email and Mobile side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-[#111111] uppercase font-semibold mb-1">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-[#FFFFFF] border border-[#E5E4DE] focus:border-[#111111] rounded-[4px] px-3 py-2 text-xs text-[#111111] outline-none font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-[#111111] uppercase font-semibold mb-1">
                      {t.auth.mobileNumber}
                    </label>
                    <input
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder={t.auth.mobilePlaceholder}
                      className="w-full bg-[#FFFFFF] border border-[#E5E4DE] focus:border-[#111111] rounded-[4px] px-3 py-2 text-xs text-[#111111] outline-none font-sans"
                    />
                  </div>
                </div>

                {/* Password and Confirm Password side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-[#111111] uppercase font-semibold mb-1">
                      {t.auth.password}
                    </label>
                    <div className="relative">
                      <input
                        type={showPass ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create password"
                        className="w-full bg-[#FFFFFF] border border-[#E5E4DE] focus:border-[#111111] rounded-[4px] px-3 py-2 text-xs text-[#111111] outline-none font-sans pr-8"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-2.5 top-2.5 text-[#66645E]"
                      >
                        {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-[#111111] uppercase font-semibold mb-1">
                      {t.auth.confirmPassword}
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPass ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                        className="w-full bg-[#FFFFFF] border border-[#E5E4DE] focus:border-[#111111] rounded-[4px] px-3 py-2 text-xs text-[#111111] outline-none font-sans pr-8"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        className="absolute right-2.5 top-2.5 text-[#66645E]"
                      >
                        {showConfirmPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Preferred Reporting Language Dropdown */}
                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-[#111111] uppercase font-semibold mb-1">
                    {t.auth.preferredLanguage}
                  </label>
                  <select
                    value={preferredLang}
                    onChange={(e) => setPreferredLang(e.target.value as Language)}
                    className="w-full bg-[#FFFFFF] border border-[#E5E4DE] focus:border-[#111111] rounded-[4px] px-3 py-2 text-xs text-[#111111] outline-none font-sans"
                  >
                    <option value="en">English (Official Ledger)</option>
                    <option value="hi">हिंदी (Hindi Verification)</option>
                    <option value="mr">मराठी (Marathi Verification)</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#111111] text-[#FCF9F8] text-xs font-sans tracking-[0.08em] uppercase font-semibold py-3.5 rounded-[4px] hover:bg-[#2A2A28] transition-colors mt-2"
                >
                  <span>{t.auth.signUpBtn}</span>
                </button>

                {/* Divider */}
                <div className="relative my-3 flex items-center justify-center">
                  <div className="w-full border-t border-[#E5E4DE]" />
                  <span className="absolute bg-[#FCF9F8] px-3 text-[10px] font-mono text-[#66645E] uppercase">
                    OR
                  </span>
                </div>

                {/* Auth Error Display */}
                {authError && (
                  <div className="p-3 bg-[#FEE2E2] border border-[#991B1B] text-[#991B1B] text-xs font-mono rounded flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                {/* Google Sign In */}
                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  disabled={isLoadingGoogle}
                  className="w-full flex items-center justify-center gap-2.5 border border-[#E5E4DE] bg-white text-[#111111] text-xs font-sans tracking-[0.06em] uppercase font-semibold py-2.5 rounded-[4px] hover:bg-[#F5F4F0] hover:border-[#111111] transition-colors disabled:opacity-60 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.31 7.31 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2.01 10.04.01 12s.45 3.8 1.26 5.42l4.01-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.69 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>{isLoadingGoogle ? 'Connecting with Google...' : t.auth.continueWithGoogle}</span>
                </button>
              </form>

              {/* Already have an account */}
              <div className="mt-4 text-center text-xs font-sans text-[#444748]">
                <span>{t.auth.alreadyAccount} </span>
                <button
                  onClick={() => onNavigate('login')}
                  className="font-semibold text-[#111111] hover:underline"
                >
                  {t.auth.signInBtn.replace('→', '').trim()} →
                </button>
              </div>

              {/* Security notice */}
              <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-[#66645E] font-sans">
                <Lock className="w-3.5 h-3.5 text-[#2D6A4F]" />
                <span>Your financial information stays private and end-to-end encrypted.</span>
              </div>
            </div>

            {/* Portal ID Footer */}
            <div className="pt-4 mt-2 border-t border-[#E5E4DE] flex items-center justify-between text-[10px] font-mono text-[#66645E]">
              <span>PORTAL ID: VV-AUTH-REGION-1</span>
              <span>ISO/IEC 27001 COMPLIANT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Global Footer */}
      <div className="max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 border-t border-[#E5E4DE] flex flex-col sm:flex-row items-center justify-between text-xs text-[#66645E] gap-2">
        <div>
          © 2025 VeriVest Intelligence Group • Forensic Financial Ledger
        </div>
        <div className="flex gap-4">
          <span className="hover:text-[#111111] cursor-pointer">Institutional Disclosure</span>
          <span className="hover:text-[#111111] cursor-pointer">Jurisdiction</span>
          <span className="hover:text-[#111111] cursor-pointer">Security Protocol</span>
        </div>
      </div>
    </div>
  );
};
