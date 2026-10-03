import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { VeriVestLogo } from './VeriVestLogo';

interface FooterProps {
  onOpenHowItWorks?: () => void;
  onOpenHistory?: () => void;
  onOpenSafetyChecklist?: () => void;
  onOpenCookiePolicy?: () => void;
  onOpenPrivacyPolicy?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenHowItWorks,
  onOpenHistory,
  onOpenSafetyChecklist,
  onOpenCookiePolicy,
  onOpenPrivacyPolicy,
}) => {
  return (
    <footer className="border-t border-[#E5E4DE] bg-[#FCF9F8] text-[#111111] py-8 mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
        {/* Logo & Core Mandate */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#E5E4DE]">
          <VeriVestLogo size="sm" subtext="Verify Before You Trust" />

          <div className="text-xs text-[#66645E] flex flex-wrap items-center justify-center gap-4">
            {onOpenHowItWorks && (
              <button
                onClick={onOpenHowItWorks}
                className="hover:text-[#111111] underline underline-offset-2 cursor-pointer"
              >
                How It Works
              </button>
            )}
            {onOpenHistory && (
              <button
                onClick={onOpenHistory}
                className="hover:text-[#111111] underline underline-offset-2 cursor-pointer"
              >
                Scan History
              </button>
            )}
            {onOpenSafetyChecklist && (
              <button
                onClick={onOpenSafetyChecklist}
                className="hover:text-[#111111] underline underline-offset-2 cursor-pointer"
              >
                Safety Checklist
              </button>
            )}
            {onOpenCookiePolicy && (
              <button
                onClick={onOpenCookiePolicy}
                className="hover:text-[#111111] underline underline-offset-2 cursor-pointer"
              >
                Cookie Policy
              </button>
            )}
            {onOpenPrivacyPolicy && (
              <button
                onClick={onOpenPrivacyPolicy}
                className="hover:text-[#111111] underline underline-offset-2 cursor-pointer"
              >
                Privacy Policy
              </button>
            )}
            <span>•</span>
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#111111] flex items-center gap-1 underline underline-offset-2"
            >
              <span>Cyber Crime Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <span className="font-mono text-[#991B1B] font-bold">Helpline: 1930</span>
          </div>
        </div>

        {/* Minimal Safe Notice */}
        <p className="text-xs text-[#66645E] max-w-xl mx-auto leading-relaxed">
          VeriVest is an investor awareness and scam verification tool. We identify observable warning signs and
          verification gaps. VeriVest does not provide buy/sell signals, price predictions, or trading advice.
        </p>

        {/* Quiet Copyright */}
        <div className="text-[11px] font-mono text-[#888888] pt-1">
          © {new Date().getFullYear()} VeriVest • Investor Scam & Claim Verification
        </div>
      </div>
    </footer>
  );
};
