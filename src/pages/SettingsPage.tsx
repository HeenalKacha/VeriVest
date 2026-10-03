import React, { useState } from 'react';
import { User, Lock, Globe, Shield, LogOut, Check, Save } from 'lucide-react';
import { Language, User as UserType } from '../types';
import { translations } from '../i18n/translations';

interface SettingsPageProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  user: UserType | null;
  onUpdateUser: (user: UserType) => void;
  onSignOut: () => void;
  onNavigate: (route: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  currentLanguage,
  onLanguageChange,
  user,
  onUpdateUser,
  onSignOut,
  onNavigate,
}) => {
  const [name, setName] = useState(user?.name || 'Retail Investor');
  const [email, setEmail] = useState(user?.email || 'investor@verivest.org');
  const [mobile, setMobile] = useState(user?.mobile || '+91 98765 43210');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Password state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passChanged, setPassChanged] = useState(false);

  const t = translations[currentLanguage];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const updated: UserType = {
        ...user,
        name,
        email,
        mobile,
      };
      onUpdateUser(updated);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.trim()) {
      setPassChanged(true);
      setCurrentPass('');
      setNewPass('');
      setTimeout(() => setPassChanged(false), 3000);
    }
  };

  return (
    <div className="bg-[#FCF9F8] min-h-screen py-10">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-[#66645E] uppercase font-semibold">
            SYSTEM PREFERENCES
          </div>
          <h1 className="font-serif text-3xl font-semibold text-[#111111] mt-1">
            {t.settings.title}
          </h1>
        </div>

        {/* Section 1: Account Profile */}
        <div className="bg-[#FFFFFF] border border-[#E5E4DE] rounded-[4px] p-6 sm:p-8 shadow-[4px_4px_0px_rgba(17,17,17,0.04)]">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5E4DE] mb-5">
            <User className="w-4 h-4 text-[#111111]" />
            <h2 className="font-serif text-lg font-semibold text-[#111111]">
              {t.settings.accountSection}
            </h2>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-mono tracking-widest text-[#111111] uppercase font-semibold mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FCF9F8] border border-[#E5E4DE] focus:border-[#111111] rounded-[4px] px-3 py-2 text-xs text-[#111111] outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono tracking-widest text-[#111111] uppercase font-semibold mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FCF9F8] border border-[#E5E4DE] focus:border-[#111111] rounded-[4px] px-3 py-2 text-xs text-[#111111] outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono tracking-widest text-[#111111] uppercase font-semibold mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full bg-[#FCF9F8] border border-[#E5E4DE] focus:border-[#111111] rounded-[4px] px-3 py-2 text-xs text-[#111111] outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#66645E]">
                ID: {user?.id || 'USR-LOCAL'}
              </span>
              <button
                type="submit"
                className="flex items-center gap-1.5 bg-[#111111] text-white text-xs font-mono uppercase font-semibold px-4 py-2 rounded-[4px] hover:bg-[#2A2A28]"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>SAVED</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>{t.settings.saveChanges}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Section 2: Language & Reporting Preferences */}
        <div className="bg-[#FFFFFF] border border-[#E5E4DE] rounded-[4px] p-6 sm:p-8 shadow-[4px_4px_0px_rgba(17,17,17,0.04)]">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5E4DE] mb-5">
            <Globe className="w-4 h-4 text-[#111111]" />
            <h2 className="font-serif text-lg font-semibold text-[#111111]">
              {t.settings.prefSection}
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono tracking-widest text-[#111111] uppercase font-semibold mb-2">
                {t.settings.languageLabel}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { code: 'en', label: 'English', sub: 'Official Ledger' },
                  { code: 'hi', label: 'हिंदी (Hindi)', sub: 'सत्यापन रिपोर्ट' },
                  { code: 'mr', label: 'मराठी (Marathi)', sub: 'पडताळणी अहवाल' },
                ].map((item) => {
                  const isSelected = currentLanguage === item.code;
                  return (
                    <button
                      key={item.code}
                      onClick={() => onLanguageChange(item.code as Language)}
                      className={`p-3.5 rounded-[4px] border text-left transition-colors ${
                        isSelected
                          ? 'border-[#111111] bg-[#F5F4F0] font-semibold text-[#111111]'
                          : 'border-[#E5E4DE] bg-white text-[#444748] hover:border-[#111111]'
                      }`}
                    >
                      <div className="text-xs font-sans">{item.label}</div>
                      <div className="text-[10px] font-mono text-[#66645E] mt-0.5">{item.sub}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Security & Access */}
        <div className="bg-[#FFFFFF] border border-[#E5E4DE] rounded-[4px] p-6 sm:p-8 shadow-[4px_4px_0px_rgba(17,17,17,0.04)]">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5E4DE] mb-5">
            <Lock className="w-4 h-4 text-[#111111]" />
            <h2 className="font-serif text-lg font-semibold text-[#111111]">
              {t.settings.securitySection}
            </h2>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
            <div>
              <label className="block text-[10px] font-mono tracking-widest text-[#111111] uppercase font-semibold mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#FCF9F8] border border-[#E5E4DE] focus:border-[#111111] rounded-[4px] px-3 py-2 text-xs text-[#111111] outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-widest text-[#111111] uppercase font-semibold mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#FCF9F8] border border-[#E5E4DE] focus:border-[#111111] rounded-[4px] px-3 py-2 text-xs text-[#111111] outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              {passChanged && (
                <span className="text-xs text-[#2D6A4F] font-mono flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  Password updated!
                </span>
              )}
              <button
                type="submit"
                className="ml-auto bg-[#111111] text-white text-xs font-mono uppercase font-semibold px-4 py-2 rounded-[4px] hover:bg-[#2A2A28]"
              >
                {t.settings.changePassword}
              </button>
            </div>
          </form>

          {/* Sign Out Row */}
          <div className="mt-6 pt-4 border-t border-[#E5E4DE] flex items-center justify-between">
            <span className="text-xs text-[#66645E]">End current authenticated session</span>
            <button
              onClick={onSignOut}
              className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase text-[#991B1B] hover:underline"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t.nav.signOut}</span>
            </button>
          </div>
        </div>

        {/* Section 4: Privacy & Retention Policy */}
        <div className="bg-[#FFFFFF] border border-[#E5E4DE] rounded-[4px] p-6 sm:p-8 shadow-[4px_4px_0px_rgba(17,17,17,0.04)]">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5E4DE] mb-3">
            <Shield className="w-4 h-4 text-[#2D6A4F]" />
            <h2 className="font-serif text-lg font-semibold text-[#111111]">
              {t.settings.privacySection}
            </h2>
          </div>

          <p className="font-sans text-xs text-[#444748] leading-relaxed">
            {t.settings.privacyStorageDesc}
          </p>

          <div className="mt-4 p-3 bg-[#E8F5EE] border border-[rgba(45,106,79,0.25)] rounded-[4px] text-xs text-[#2D6A4F] font-mono">
            STATUS: 256-BIT ISOLATED RAM PIPELINE ACTIVE
          </div>
        </div>
      </div>
    </div>
  );
};
