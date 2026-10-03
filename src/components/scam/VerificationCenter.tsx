import React, { useState } from 'react';
import {
  BadgeCheck,
  AlertTriangle,
  HelpCircle,
  Copy,
  Check,
  ExternalLink,
  Shield,
  Info,
} from 'lucide-react';
import { VerificationDetail, VerificationStatus, Language } from '../../types';

interface VerificationCenterProps {
  verification?: VerificationDetail;
  currentLanguage: Language;
}

export const VerificationCenter: React.FC<VerificationCenterProps> = ({
  verification,
  currentLanguage,
}) => {
  const [copied, setCopied] = useState(false);
  const isHi = currentLanguage === 'hi';
  const isMr = currentLanguage === 'mr';

  const defaultVerification: VerificationDetail = verification || {
    claimedEntity: 'Unspecified Entity',
    claimedRegNumber: 'Not provided',
    status: 'UNAVAILABLE',
    sourceChecked: 'Standard entity extraction',
    lastChecked: 'Today',
    whatWasVerified: ['No specific registration number was parsed'],
    whatCouldNotBeVerified: ['Entity license status requires manual check on sebi.gov.in'],
  };

  const statusConfig: Record<
    VerificationStatus,
    { label: string; bg: string; text: string; border: string; icon: React.ReactNode }
  > = {
    VERIFIED: {
      label: isHi ? 'सत्यापित (VERIFIED)' : isMr ? 'पडताळणी पूर्ण (VERIFIED)' : 'VERIFIED',
      bg: 'bg-[#E8F5EE]',
      text: 'text-[#1B4332]',
      border: 'border-[#2D6A4F]',
      icon: <BadgeCheck className="w-4 h-4 text-[#2D6A4F]" />,
    },
    NOT_VERIFIED: {
      label: isHi ? 'असत्यापित (NOT VERIFIED)' : isMr ? 'पडताळणी झालेली नाही' : 'NOT VERIFIED',
      bg: 'bg-[#FEE2E2]',
      text: 'text-[#991B1B]',
      border: 'border-[#F87171]',
      icon: <AlertTriangle className="w-4 h-4 text-[#991B1B]" />,
    },
    PARTIAL_MATCH: {
      label: isHi ? 'आंशिक मिलान (PARTIAL MATCH)' : isMr ? 'अंशतः जुळणी' : 'PARTIAL MATCH',
      bg: 'bg-[#FEF3C7]',
      text: 'text-[#92400E]',
      border: 'border-[#FCD34D]',
      icon: <AlertTriangle className="w-4 h-4 text-[#92400E]" />,
    },
    CONFLICTING_INFORMATION: {
      label: isHi ? 'विरोधाभासी जानकारी' : isMr ? 'विसंगत माहिती' : 'CONFLICTING INFORMATION',
      bg: 'bg-[#FFEDD5]',
      text: 'text-[#9A3412]',
      border: 'border-[#FDBA74]',
      icon: <AlertTriangle className="w-4 h-4 text-[#9A3412]" />,
    },
    NO_MATCH_FOUND: {
      label: isHi ? 'कोई रिकॉर्ड नहीं मिला' : isMr ? 'नोंद सापडली नाही' : 'NO MATCH FOUND',
      bg: 'bg-[#FEE2E2]',
      text: 'text-[#991B1B]',
      border: 'border-[#F87171]',
      icon: <AlertTriangle className="w-4 h-4 text-[#991B1B]" />,
    },
    UNAVAILABLE: {
      label: isHi ? 'सत्यापन उपलब्ध नहीं' : isMr ? 'माहिती अनुपलब्ध' : 'UNABLE TO INDEPENDENTLY VERIFY',
      bg: 'bg-[#F5F4F0]',
      text: 'text-[#66645E]',
      border: 'border-[#D8D6CE]',
      icon: <HelpCircle className="w-4 h-4 text-[#66645E]" />,
    },
  };

  const currentStatus = statusConfig[defaultVerification.status] || statusConfig.UNAVAILABLE;

  const handleCopyReg = () => {
    if (defaultVerification.claimedRegNumber) {
      navigator.clipboard.writeText(defaultVerification.claimedRegNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white border border-[#E5E4DE] rounded-[4px] p-6 sm:p-7 shadow-[4px_4px_0px_rgba(17,17,17,0.04)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5E4DE] gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-[#111111]" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#111111] font-semibold">
              {isHi ? 'सत्यापन केंद्र' : isMr ? 'पडताळणी केंद्र' : 'VERIFICATION CENTER'}
            </h3>
          </div>
          <p className="text-xs text-[#66645E] mt-0.5">
            {isHi
              ? 'दावा की गई संस्था और पंजीकरण की स्थिति'
              : isMr
              ? 'संबंधित संस्था व परवान्याची स्थिती'
              : 'Independent verification breakdown of claimed entity and registration'}
          </p>
        </div>

        {/* Status Badge */}
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] border text-xs font-mono font-bold uppercase ${currentStatus.bg} ${currentStatus.text} ${currentStatus.border}`}
        >
          {currentStatus.icon}
          <span>{currentStatus.label}</span>
        </div>
      </div>

      {/* Main Grid: Details */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Entity & Reg Info */}
        <div className="space-y-4">
          <div className="p-4 bg-[#FCF9F8] rounded-[4px] border border-[#E5E4DE]">
            <div className="text-[10px] font-mono uppercase text-[#66645E]">
              {isHi ? 'दावा की गई संस्था' : isMr ? 'दावा केलेली संस्था' : 'CLAIMED ENTITY'}
            </div>
            <div className="font-serif text-lg font-semibold text-[#111111] mt-0.5">
              {defaultVerification.claimedEntity}
            </div>
          </div>

          <div className="p-4 bg-[#FCF9F8] rounded-[4px] border border-[#E5E4DE] flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase text-[#66645E]">
                {isHi ? 'दावा किया गया रजिस्ट्रेशन नंबर' : isMr ? 'नोंदणी क्रमांक' : 'CLAIMED REGISTRATION NUMBER'}
              </div>
              <div className="font-mono text-sm font-bold text-[#111111] mt-0.5">
                {defaultVerification.claimedRegNumber}
              </div>
            </div>

            {defaultVerification.claimedRegNumber !== 'Not provided' &&
              defaultVerification.claimedRegNumber !== 'None provided' && (
                <button
                  onClick={handleCopyReg}
                  className="flex items-center gap-1 text-[11px] font-mono border border-[#E5E4DE] px-2.5 py-1 rounded-[2px] bg-white hover:border-[#111111] text-[#111111]"
                  title="Copy number to verify on sebi.gov.in"
                >
                  {copied ? <Check className="w-3 h-3 text-[#2D6A4F]" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>
              )}
          </div>

          <div className="text-xs text-[#66645E] space-y-1 font-mono">
            <div>
              <span className="font-semibold text-[#111111]">Source Checked: </span>
              {defaultVerification.sourceChecked}
            </div>
            <div>
              <span className="font-semibold text-[#111111]">Last Checked: </span>
              {defaultVerification.lastChecked}
            </div>
          </div>
        </div>

        {/* Right Column: What was verified vs Could not be verified */}
        <div className="space-y-4">
          {/* Verified Aspects */}
          <div className="p-4 bg-[#E8F5EE] border border-[#2D6A4F]/30 rounded-[4px]">
            <div className="text-[10px] font-mono uppercase font-bold text-[#1B4332] tracking-wider mb-2">
              {isHi ? 'क्या सत्यापित हुआ:' : isMr ? 'कशाची पडताळणी झाली:' : 'WHAT WAS VERIFIED:'}
            </div>
            <ul className="text-xs text-[#1B4332] space-y-1.5 list-disc list-inside">
              {defaultVerification.whatWasVerified.map((item, idx) => (
                <li key={idx} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Unverified Aspects */}
          <div className="p-4 bg-[#FFF8F0] border border-[#FDBA74] rounded-[4px]">
            <div className="text-[10px] font-mono uppercase font-bold text-[#9A3412] tracking-wider mb-2">
              {isHi ? 'क्या सत्यापित नहीं हो सका:' : isMr ? 'कशाची पडताळणी होऊ शकली नाही:' : 'WHAT COULD NOT BE VERIFIED:'}
            </div>
            <ul className="text-xs text-[#9A3412] space-y-1.5 list-disc list-inside">
              {defaultVerification.whatCouldNotBeVerified.map((item, idx) => (
                <li key={idx} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Honest Disclosure Notice */}
      <div className="mt-6 pt-4 border-t border-[#E5E4DE] flex items-start gap-2.5 text-[11px] text-[#66645E]">
        <Info className="w-4 h-4 text-[#66645E] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Transparency Notice:</strong> VeriVest checks claims against local verified reference indexes. It does
          not claim live direct access to external government regulatory databases without an authenticated API
          gateway. To verify official status directly, visit the official regulator directory at{' '}
          <a
            href="https://www.sebi.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#111111] font-semibold underline inline-flex items-center gap-0.5"
          >
            sebi.gov.in <ExternalLink className="w-2.5 h-2.5" />
          </a>
          .
        </p>
      </div>
    </div>
  );
};
