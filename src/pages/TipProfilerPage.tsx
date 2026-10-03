import React, { useState } from 'react';
import {
  RefreshCw,
  Send,
  AlertTriangle,
  CheckCircle2,
  Users,
  Shield,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface TipProfilerPageProps {
  currentLanguage: Language;
  onAnalyzeMessage: (msg: string) => void;
  onNavigateScan?: () => void;
}

export const TipProfilerPage: React.FC<TipProfilerPageProps> = ({
  currentLanguage,
  onAnalyzeMessage,
  onNavigateScan,
}) => {
  const [tipInput, setTipInput] = useState('');
  const [activeSpecimenIndex, setActiveSpecimenIndex] = useState(0);
  const t = translations[currentLanguage].tipPage;

  const specimens = [
    {
      handle: '@AlphaQuant_EliteSignals',
      timestamp: 'Today 13:41',
      source: 'Telegram Channel',
      text: '🚨 INSIDER STOCK ALERT 🚨 Guaranteed 45% return in 10 trading sessions! Breakout confirmed by institutional operators. Only 8 spots left in VIP room. DM @admin_quant now to lock entry before Monday opening bell.',
      tactics: [
        'Guaranteed return promise (45%)',
        'Artificial urgency ("Only 8 spots left")',
        'Unverified insider claims',
        'Pressure to move to private direct messaging',
      ],
      evidence: '"Guaranteed 45% return" • "Breakout confirmed by institutional operators" • "DM @admin_quant"',
      verificationGaps: [
        'No SEBI Research Analyst registration number provided',
        'Administrator identity is anonymous and untraceable',
      ],
      safeNextSteps: [
        'Do not send money or subscribe to paid tip channels.',
        'Never trade on non-public rumor claims in messaging groups.',
        'Verify advisory credentials directly on sebi.gov.in.',
      ],
    },
    {
      handle: '@CryptoWhale_VIP_Pumps',
      timestamp: 'Yesterday 21:05',
      source: 'WhatsApp Broadcast',
      text: '📈 CRUDE & BANK NIFTY 1000% SURE CALL. Buy strike 48,000 at market open. Transfer token consultation fee ₹10,000 to personal UPI growcapital@okicici before midnight to receive strike targets.',
      tactics: [
        'Asymmetric impossible leverage lure (1000%)',
        'Personal UPI routing instead of regulated escrow',
        'Midnight countdown pressure',
      ],
      evidence: '"1000% SURE CALL" • "Transfer token consultation fee ₹10,000 to personal UPI growcapital@okicici"',
      verificationGaps: [
        'Fee collection violates client fund segregation standards',
        'Unregistered derivative advisory',
      ],
      safeNextSteps: [
        'Exit and block the WhatsApp broadcast group.',
        'Never transfer funds to a personal UPI handle.',
        'Report the number to the National Cyber Crime portal (1930).',
      ],
    },
  ];

  const currentSpecimen = specimens[activeSpecimenIndex];

  const handleToggleSpecimen = () => {
    setActiveSpecimenIndex((prev) => (prev + 1) % specimens.length);
  };

  const handleAnalyzeCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (tipInput.trim()) {
      onAnalyzeMessage(tipInput.trim());
    }
  };

  return (
    <div className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111111] tracking-tight">
          {t.pageTitle}
        </h1>
        <p className="font-sans text-xs sm:text-sm text-[#444748] max-w-lg mx-auto leading-relaxed">
          {t.pageSubtitle}
        </p>
      </div>

      {/* Input Box to Profile any tip */}
      <div className="bg-white border border-[#E5E4DE] rounded-[4px] p-6 sm:p-7 shadow-[4px_4px_0px_rgba(17,17,17,0.03)] space-y-4">
        <div className="flex items-center justify-between text-xs text-[#66645E]">
          <span className="font-mono uppercase font-bold text-[#111111]">
            {t.inputLabel}
          </span>
          <span className="text-[11px]">{t.noTradingNote}</span>
        </div>

        <form onSubmit={handleAnalyzeCustom} className="space-y-4">
          <textarea
            rows={4}
            value={tipInput}
            onChange={(e) => setTipInput(e.target.value)}
            placeholder={t.inputPlaceholder}
            className="w-full p-4 rounded-[4px] border border-[#E5E4DE] bg-[#FCF9F8] text-sm font-sans focus:outline-none focus:border-[#111111] text-[#111111]"
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-[11px] font-sans text-[#66645E]">
              {t.evaluatesNote}
            </span>
            <button
              type="submit"
              disabled={!tipInput.trim()}
              className="bg-[#111111] text-white px-6 py-2.5 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#2A2A28] disabled:opacity-40"
            >
              {t.analyzeTipBtn}
            </button>
          </div>
        </form>
      </div>

      {/* Example Tip Case Study Breakdown */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#111111]" />
            <h2 className="font-serif text-lg font-bold text-[#111111]">
              {t.sampleBreakdownTitle}
            </h2>
          </div>

          <button
            onClick={handleToggleSpecimen}
            className="flex items-center gap-1.5 text-xs font-mono text-[#111111] border border-[#E5E4DE] px-3 py-1.5 rounded-[2px] bg-white hover:border-[#111111]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{t.nextSpecimen} ({activeSpecimenIndex + 1}/2)</span>
          </button>
        </div>

        <div className="bg-white border border-[#E5E4DE] rounded-[4px] p-6 sm:p-7 shadow-[4px_4px_0px_rgba(17,17,17,0.03)] space-y-5">
          {/* Channel info */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E4DE] text-xs font-mono text-[#66645E]">
            <span className="font-bold text-[#111111]">{currentSpecimen.handle}</span>
            <span>{currentSpecimen.source}</span>
          </div>

          {/* Intercepted Text */}
          <div className="p-4 rounded-[4px] bg-[#FCF9F8] border border-[#E5E4DE]">
            <div className="text-[10px] font-mono uppercase text-[#66645E] mb-1 font-semibold">
              {t.tipContent}
            </div>
            <p className="font-mono text-xs sm:text-sm text-[#111111] whitespace-pre-wrap leading-relaxed">
              {currentSpecimen.text}
            </p>
          </div>

          {/* Tactics Identified */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono uppercase font-bold text-[#66645E]">
              {t.tacticsLabel}
            </div>
            <div className="flex flex-wrap gap-2">
              {currentSpecimen.tactics.map((tactic, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-[2px] bg-[#FEF3C7] border border-[#FCD34D] text-[#92400E] text-xs font-sans font-medium"
                >
                  {tactic}
                </span>
              ))}
            </div>
          </div>

          {/* Verification Gaps */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono uppercase font-bold text-[#991B1B]">
              {t.verificationGapsLabel}
            </div>
            <ul className="text-xs text-[#333333] space-y-1 list-disc list-inside">
              {currentSpecimen.verificationGaps.map((gap, idx) => (
                <li key={idx}>{gap}</li>
              ))}
            </ul>
          </div>

          {/* Safe Next Steps */}
          <div className="space-y-1.5 pt-2 border-t border-[#E5E4DE]">
            <div className="text-[11px] font-mono uppercase font-bold text-[#2D6A4F]">
              {t.safeNextStepsLabel}
            </div>
            <div className="space-y-1">
              {currentSpecimen.safeNextSteps.map((step, idx) => (
                <div key={idx} className="text-xs text-[#1B4332] bg-[#E8F5EE] p-2 rounded-[2px] font-medium">
                  {idx + 1}. {step}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => onAnalyzeMessage(currentSpecimen.text)}
              className="bg-[#111111] text-white px-5 py-2.5 rounded-[2px] text-xs font-mono font-semibold uppercase hover:bg-[#2A2A28]"
            >
              {t.scanThisTipBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
