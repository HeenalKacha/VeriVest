import React from 'react';
import { ArrowDown, Search, ShieldCheck, CheckCircle2, AlertTriangle, Eye } from 'lucide-react';
import { Language } from '../../types';

interface HowItWorksSimpleProps {
  currentLanguage: Language;
  onStartScan?: () => void;
}

export const HowItWorksSimple: React.FC<HowItWorksSimpleProps> = ({ currentLanguage, onStartScan }) => {
  const isHi = currentLanguage === 'hi';

  const steps = [
    {
      step: '01',
      action: isHi ? 'जांचें (Check)' : 'Check',
      description: isHi
        ? 'संदिग्ध व्हाट्सएप संदेश, टेलीग्राम टिप, स्क्रीनशॉट या वेबसाइट लिंक सबमिट करें।'
        : 'Paste or upload a suspicious investment message, screenshot, or website link you received.',
      icon: Search,
      color: 'text-[#111111]',
      bg: 'bg-[#F5F4F0]',
    },
    {
      step: '02',
      action: isHi ? 'समझें (Understand)' : 'Understand',
      description: isHi
        ? 'VeriVest छिपे हुए खतरे जैसे 50% गारंटीड मुनाफा, कृत्रिम जल्दबाजी और व्यक्तिगत यूपीआई मांग को उजागर करता है।'
        : 'VeriVest identifies warning signs like guaranteed high returns, false urgency, and personal UPI payment requests.',
      icon: Eye,
      color: 'text-[#9A3412]',
      bg: 'bg-[#FFEDD5]',
    },
    {
      step: '03',
      action: isHi ? 'सत्यापित करें (Verify)' : 'Verify',
      description: isHi
        ? 'देखें कि क्या दावा किया गया पंजीकरण नंबर आधिकारिक विनियामक मानकों से मेल खाता है।'
        : 'Check whether claimed broker names and registration numbers match verified records.',
      icon: ShieldCheck,
      color: 'text-[#2D6A4F]',
      bg: 'bg-[#E8F5EE]',
    },
    {
      step: '04',
      action: isHi ? 'सुरक्षित रहें (Stay Safe)' : 'Stay Safe',
      description: isHi
        ? 'पैसे ट्रांसफर करने से पहले स्पष्ट और व्यावहारिक सुरक्षा कदमों का पालन करें।'
        : 'Get clear, safe action steps to protect your money before making any transfer.',
      icon: CheckCircle2,
      color: 'text-[#1B4332]',
      bg: 'bg-[#DCFCE7]',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center max-w-md mx-auto space-y-1.5">
        <h3 className="font-serif text-2xl font-semibold text-[#111111]">
          {isHi ? 'VeriVest कैसे काम करता है' : 'How VeriVest Works'}
        </h3>
        <p className="text-xs text-[#66645E]">
          {isHi
            ? 'निवेश करने या पैसे भेजने से पहले 4 आसान कदम।'
            : 'Four simple steps to verify before you trust.'}
        </p>
      </div>

      {/* Simple animated vertical/horizontal flow */}
      <div className="max-w-md mx-auto space-y-3">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <React.Fragment key={item.step}>
              <div className="p-4 rounded-[4px] border border-[#E5E4DE] bg-white flex items-start gap-4 transition-all hover:border-[#111111] shadow-[2px_2px_0px_rgba(17,17,17,0.03)] group">
                <div
                  className={`w-10 h-10 rounded-[4px] ${item.bg} ${item.color} flex items-center justify-center shrink-0 font-mono font-bold text-xs`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-serif text-base font-bold text-[#111111]">
                      {item.action}
                    </span>
                    <span className="font-mono text-[10px] text-[#66645E] uppercase tracking-wider">
                      STEP {item.step}
                    </span>
                  </div>
                  <p className="text-xs text-[#444748] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Connecting animated arrow */}
              {idx < steps.length - 1 && (
                <div className="flex justify-center py-0.5">
                  <div className="w-6 h-6 rounded-full bg-[#F5F4F0] border border-[#E5E4DE] flex items-center justify-center text-[#66645E] animate-bounce">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {onStartScan && (
        <div className="pt-2 text-center">
          <button
            onClick={onStartScan}
            className="bg-[#111111] text-white px-6 py-2.5 rounded-[2px] text-xs font-mono font-semibold uppercase hover:bg-[#2A2A28] transition-colors"
          >
            {isHi ? 'अभी जांचें (Start Scan)' : 'Check a Claim Now'}
          </button>
        </div>
      )}
    </div>
  );
};
