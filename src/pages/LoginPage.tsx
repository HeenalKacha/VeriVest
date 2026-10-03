import React, { useState } from 'react';
import { Eye, EyeOff, Lock, ArrowRight, ShieldCheck, Check, AlertCircle } from 'lucide-react';
import { Language, User } from '../types';
import { translations } from '../i18n/translations';
import { VeriVestLogo } from '../components/common/VeriVestLogo';
import { LanguageSelector } from '../components/common/LanguageSelector';
import { ForgotPasswordModal } from '../components/modals/ForgotPasswordModal';
import { signInWithGoogle, signInWithEmail } from '../services/firebase';

interface LoginPageProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onLoginSuccess: (user: User) => void;
  onNavigate: (route: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  currentLanguage,
  onLanguageChange,
  onLoginSuccess,
  onNavigate,
}) => {
  const [identifier, setIdentifier] = useState('investor@verivest.org');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const t = translations[currentLanguage];

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsLoadingAuth(true);
    try {
      const email = identifier.includes('@') ? identifier.trim() : `${identifier.trim()}@verivest.org`;
      const { user } = await signInWithEmail(email, password);
      onLoginSuccess(user);
    } catch (err: any) {
      console.warn('Firebase sign-in error:', err);
      if (
        err?.code === 'auth/invalid-credential' ||
        err?.code === 'auth/wrong-password' ||
        err?.code === 'auth/user-not-found'
      ) {
        setAuthError('Invalid credentials. If you haven’t set a password, please use Continue with Google.');
      } else if (err?.code === 'auth/operation-not-allowed') {
        setAuthError('Email sign-in is not enabled on this Firebase instance. Please click Continue with Google.');
      } else {
        setAuthError('Unable to sign in. Please verify your credentials or use Continue with Google.');
      }
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthError(null);
    setIsLoadingGoogle(true);
    try {
      const { user } = await signInWithGoogle();
      onLoginSuccess(user);
    } catch (err: any) {
      console.warn('Google sign-in error:', err);
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
      {/* Top Bar matching Image 1 */}
      <div className="max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <div
          onClick={() => onNavigate('landing')}
          className="cursor-pointer"
        >
          <VeriVestLogo subtext={t.forensicVerification} />
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

      {/* Main Split Screen Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl bg-[#FCF9F8] border border-[#E5E4DE] rounded-[4px] shadow-[4px_4px_0px_rgba(17,17,17,0.04)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Dossier Standard Info (5 cols) */}
          <div className="lg:col-span-5 bg-[#F5F4F0] p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-[#E5E4DE] flex flex-col justify-between relative overflow-hidden">
            {/* Watermark compass lines in background */}
            <div className="absolute right-0 top-1/4 translate-x-12 -translate-y-12 opacity-15 pointer-events-none">
              <svg width="240" height="240" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="90" stroke="#111111" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="100" cy="100" r="60" stroke="#111111" strokeWidth="1" />
                <line x1="10" y1="100" x2="190" y2="100" stroke="#111111" strokeWidth="1" />
                <line x1="100" y1="10" x2="100" y2="190" stroke="#111111" strokeWidth="1" />
                <polygon points="100,20 180,180 20,180" stroke="#111111" strokeWidth="1" />
              </svg>
            </div>

            <div className="space-y-6 z-10">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[2px] bg-[#E5E2E1] text-[10px] font-mono tracking-widest text-[#111111] font-semibold uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]" />
                STANDARD #4102
              </div>

              <div>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111111] leading-tight">
                  Verify. <br />
                  <span className="italic font-normal font-serif text-[#444748]">
                    Before You Invest.
                  </span>
                </h2>
                <p className="font-sans text-xs text-[#66645E] mt-3 leading-relaxed">
                  AI-powered protection against suspicious investment messages, fake brokers, misleading claims, and financial scams.
                </p>
              </div>

              {/* Audit Ledger Stream Card */}
              <div className="bg-[#FFFFFF] border border-[#E5E4DE] rounded-[4px] p-4 space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase pb-2 border-b border-[#E5E4DE]">
                  <span className="text-[#66645E]">AUDIT LEDGER STREAM</span>
                  <span className="bg-[#AEEECB] text-[#0E5138] px-1.5 py-0.5 rounded-[2px] font-semibold">
                    ACTIVE REPOSITORIES
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[#222222]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      SEBI Regulatory Cross-Check
                    </span>
                    <span className="font-semibold text-[#111111]">99.98%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[#222222]">
                      <Check className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      Entity Incorporation File
                    </span>
                    <span className="font-semibold text-[#111111]">INDEXED</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[#222222]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      Financial Pattern Sentry
                    </span>
                    <span className="font-semibold text-[#2D6A4F]">LIVE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Quote */}
            <div className="pt-8 z-10">
              <p className="italic font-serif text-xs text-[#444748]">
                “Financial safety should be understandable to everyone.”
              </p>
              <div className="text-[10px] font-mono text-[#66645E] tracking-wider uppercase mt-1">
                VERIVEST FINANCIAL DOSSIER PROTOCOL © 2025
              </div>
            </div>
          </div>

          {/* Right Column: Sign In Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#FCF9F8] p-8 sm:p-12 flex flex-col justify-between">
            <div className="flex justify-end mb-4">
              <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageChange={onLanguageChange}
              />
            </div>

            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#66645E] uppercase mb-1 font-semibold">
                WELCOME BACK
              </div>
              <h1 className="font-serif text-3xl font-semibold text-[#111111]">
                {t.auth.signInTitle}
              </h1>
              <p className="font-sans text-xs text-[#66645E] mt-1">
                {t.auth.signInSubtitle}
              </p>

              <form onSubmit={handleSignIn} className="mt-6 space-y-4">
                {/* Email / Mobile */}
                <div>
                  <label className="block text-[11px] font-mono tracking-widest text-[#111111] uppercase font-semibold mb-1.5">
                    {t.auth.emailOrMobile}
                  </label>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={t.auth.emailPlaceholder}
                    className="w-full bg-[#FFFFFF] border border-[#E5E4DE] focus:border-[#111111] rounded-[4px] px-3.5 py-2.5 text-xs text-[#111111] outline-none font-sans transition-colors"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[11px] font-mono tracking-widest text-[#111111] uppercase font-semibold mb-1.5">
                    {t.auth.password}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t.auth.passwordPlaceholder}
                      className="w-full bg-[#FFFFFF] border border-[#E5E4DE] focus:border-[#111111] rounded-[4px] px-3.5 py-2.5 text-xs text-[#111111] outline-none font-sans pr-10 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-[#66645E] hover:text-[#111111]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="flex items-center justify-between text-xs font-sans pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded-[2px] border-[#E5E4DE] text-[#111111] focus:ring-0"
                    />
                    <span className="text-[#444748]">{t.auth.rememberMe}</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(true)}
                    className="text-[#111111] font-medium hover:underline"
                  >
                    {t.auth.forgotPassword}
                  </button>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={isLoadingAuth || isLoadingGoogle}
                  className="w-full flex items-center justify-center gap-2 bg-[#111111] text-[#FCF9F8] text-xs font-sans tracking-[0.08em] uppercase font-semibold py-3.5 rounded-[4px] hover:bg-[#2A2A28] transition-colors disabled:opacity-60 cursor-pointer"
                >
                  <span>{isLoadingAuth ? 'Signing In...' : t.auth.signInBtn}</span>
                </button>

                {/* Divider */}
                <div className="relative my-4 flex items-center justify-center">
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
                  onClick={handleGoogleSignIn}
                  disabled={isLoadingGoogle}
                  className="w-full flex items-center justify-center gap-2.5 border border-[#E5E4DE] bg-white text-[#111111] text-xs font-sans tracking-[0.06em] uppercase font-semibold py-3 rounded-[4px] hover:bg-[#F5F4F0] hover:border-[#111111] transition-colors disabled:opacity-60 cursor-pointer"
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

              {/* Sign Up Link */}
              <div className="mt-5 text-center text-xs font-sans text-[#444748]">
                <span>{t.auth.noAccount} </span>
                <button
                  onClick={() => onNavigate('signup')}
                  className="font-semibold text-[#111111] hover:underline"
                >
                  {t.auth.createAccount}
                </button>
              </div>

              {/* Privacy Badge */}
              <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-[#66645E] font-sans">
                <Lock className="w-3.5 h-3.5 text-[#2D6A4F]" />
                <span>{t.auth.privacyNotice}</span>
              </div>
            </div>

            {/* Micro Metadata Footer */}
            <div className="pt-6 mt-4 border-t border-[#E5E4DE] flex items-center justify-between text-[10px] font-mono text-[#66645E]">
              <span>AES-256 ENCRYPTED SESSION</span>
              <span>NODE: IND-WEST-01</span>
            </div>
          </div>
        </div>
      </div>

      {/* Global Footer Lockup */}
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

      <ForgotPasswordModal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};
