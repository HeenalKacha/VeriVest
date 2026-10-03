import React, { useState } from 'react';
import { X, CheckCircle, Mail, ArrowRight } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
}) => {
  const [target, setTarget] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const t = translations[currentLanguage];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (target.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(17,17,17,0.45)] backdrop-blur-[2px]">
      <div className="relative w-full max-w-md bg-[#FCF9F8] border border-[#111111] shadow-[4px_4px_0px_rgba(17,17,17,0.15)] rounded-[4px] p-6">
        <div className="flex items-start justify-between pb-3 border-b border-[#E5E4DE]">
          <h3 className="font-serif text-lg font-semibold text-[#111111]">
            {t.auth.forgotPasswordTitle}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-[4px] border border-[#E5E4DE] hover:border-[#111111] text-[#111111]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#E8F5EE] text-[#2D6A4F] flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <p className="text-sm font-sans font-medium text-[#111111]">
              {t.auth.resetLinkSent}
            </p>
            <p className="text-xs text-[#66645E]">
              Dispatched to <span className="font-mono text-[#111111] font-semibold">{target}</span>
            </p>
            <button
              onClick={onClose}
              className="mt-4 w-full bg-[#111111] text-white text-xs font-mono uppercase font-semibold py-2.5 rounded-[4px]"
            >
              Return to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-4 space-y-4">
            <p className="text-xs text-[#444748] leading-relaxed">
              {t.auth.forgotPasswordSubtitle}
            </p>
            <div>
              <label className="block text-[11px] font-mono tracking-widest text-[#111111] uppercase font-semibold mb-1.5">
                {t.auth.emailOrMobile}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder={t.auth.emailPlaceholder}
                  className="w-full bg-white border border-[#E5E4DE] focus:border-[#111111] rounded-[4px] px-3 py-2.5 text-xs text-[#111111] outline-none font-sans"
                />
                <Mail className="absolute right-3 top-2.5 w-4 h-4 text-[#66645E]" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#111111] text-white text-xs font-sans tracking-wider uppercase font-semibold py-3 rounded-[4px] hover:bg-[#2A2A28]"
            >
              <span>{t.auth.sendResetLink}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
