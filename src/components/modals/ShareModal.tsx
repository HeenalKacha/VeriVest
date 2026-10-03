import React, { useState } from 'react';
import { X, Check, Copy, MessageCircle, AlertTriangle } from 'lucide-react';
import { AnalysisResult } from '../../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: AnalysisResult;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  result,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const warningSummary = `⚠️ VERIVEST FINANCIAL SAFETY ALERT:
I checked an investment claim using VeriVest Forensic Intelligence.
• Assessment: ${result.riskLevel} RISK (${result.riskScore}/100)
• Verdict: ${result.forensicDirective}
• Main Warning: ${result.signals[0]?.explanation || 'Unverified financial proposition'}
• Recommendation: Do not wire funds, share OTPs, or install remote access software!
Report ID: ${result.id} | Verify claims at: ${window.location.origin}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(warningSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(warningSummary);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(17,17,17,0.45)] backdrop-blur-[2px]">
      <div className="relative w-full max-w-lg bg-[#FCF9F8] border border-[#111111] shadow-[4px_4px_0px_rgba(17,17,17,0.15)] rounded-[4px] p-6">
        <div className="flex items-start justify-between pb-3 border-b border-[#E5E4DE]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-[4px] bg-[#FEE2E2] text-[#991B1B]">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base font-semibold text-[#111111]">
                Share Risk Warning With Family
              </h3>
              <p className="text-[11px] text-[#66645E]">
                Protect peers before capital transfers occur
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-[4px] border border-[#E5E4DE] hover:border-[#111111] text-[#111111]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message preview */}
        <div className="my-4 p-3.5 bg-white border border-[#E5E4DE] rounded-[4px] text-xs font-sans text-[#222222] whitespace-pre-wrap leading-relaxed">
          {warningSummary}
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-[4px] border border-[#111111] text-[#111111] text-xs font-sans font-semibold hover:bg-[#F5F4F0] transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Copied Alert!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Text</span>
              </>
            )}
          </button>

          <button
            onClick={handleWhatsAppShare}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-[4px] bg-[#25D366] text-white text-xs font-sans font-semibold hover:bg-[#1EBE5D] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
