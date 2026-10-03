import React from 'react';
import { AlertTriangle, ShieldAlert, ArrowRight, BookOpen, CheckCircle } from 'lucide-react';
import { ScamDNASignal, Language } from '../../types';

interface ScamDNAProps {
  signals: ScamDNASignal[];
  currentLanguage: Language;
  onOpenGuide?: (guideId: string) => void;
}

export const ScamDNA: React.FC<ScamDNAProps> = ({
  signals,
  currentLanguage,
  onOpenGuide,
}) => {
  const isHi = currentLanguage === 'hi';
  const isMr = currentLanguage === 'mr';

  const titleText = isHi ? 'स्कैम डीएनए (SCAM DNA)' : isMr ? 'स्कॅम डीएनए (SCAM DNA)' : 'SCAM DNA';
  const subText = isHi
    ? 'पहचाने गए व्यक्तिगत व्यवहार और सामग्री संकेत'
    : isMr
    ? 'आढळलेले वर्तणूक आणि संदेश संकेत'
    : 'Identified behavioral and content warning signals';

  const severityLabels: Record<string, { label: string; bg: string; text: string; border: string }> = {
    critical: {
      label: isHi ? 'गंभीर (CRITICAL)' : isMr ? 'अति-धोकादायक' : 'CRITICAL',
      bg: 'bg-[#FEE2E2]',
      text: 'text-[#991B1B]',
      border: 'border-[#F87171]',
    },
    high: {
      label: isHi ? 'उच्च जोखिम (HIGH)' : isMr ? 'मोठा धोका' : 'HIGH',
      bg: 'bg-[#FFEDD5]',
      text: 'text-[#9A3412]',
      border: 'border-[#FDBA74]',
    },
    warning: {
      label: isHi ? 'सतर्कता (WARNING)' : isMr ? 'सावधान' : 'WARNING',
      bg: 'bg-[#FEF3C7]',
      text: 'text-[#92400E]',
      border: 'border-[#FCD34D]',
    },
    info: {
      label: isHi ? 'सूचना (INFO)' : isMr ? 'माहिती' : 'INFO',
      bg: 'bg-[#E0E7FF]',
      text: 'text-[#3730A3]',
      border: 'border-[#A5B4FC]',
    },
  };

  return (
    <div className="bg-white border border-[#E5E4DE] rounded-[4px] p-6 sm:p-7 shadow-[4px_4px_0px_rgba(17,17,17,0.04)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5E4DE] gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#991B1B]" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#111111] font-semibold">
              {titleText}
            </h3>
          </div>
          <p className="text-xs text-[#66645E] mt-0.5">{subText}</p>
        </div>

        <div className="text-[11px] font-mono text-[#66645E]">
          {signals.filter((s) => s.severity !== 'info').length} Warning Signals Detected
        </div>
      </div>

      {/* Signals List */}
      <div className="mt-6 space-y-5">
        {signals.map((signal) => {
          const sev = severityLabels[signal.severity] || severityLabels.warning;

          return (
            <div
              key={signal.id}
              className={`p-5 rounded-[4px] border ${sev.border} bg-[#FCF9F8] transition-all`}
            >
              {/* Signal Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5E4DE]">
                <div className="flex items-start gap-2.5">
                  <ShieldAlert
                    className={`w-4 h-4 mt-0.5 shrink-0 ${
                      signal.severity === 'critical'
                        ? 'text-[#991B1B]'
                        : signal.severity === 'high'
                        ? 'text-[#9A3412]'
                        : 'text-[#92400E]'
                    }`}
                  />
                  <div>
                    <h4 className="font-serif text-base sm:text-lg font-semibold text-[#111111]">
                      {signal.name}
                    </h4>
                    <span className="text-[11px] font-mono text-[#66645E]">
                      {signal.category}
                    </span>
                  </div>
                </div>

                <span
                  className={`self-start sm:self-auto px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider rounded-[2px] uppercase ${sev.bg} ${sev.text} border ${sev.border}`}
                >
                  {sev.label}
                </span>
              </div>

              {/* Evidence Found */}
              <div className="mt-4 space-y-3 text-xs">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#66645E] font-semibold mb-1">
                    {isHi ? 'पाया गया प्रमाण (EVIDENCE):' : isMr ? 'आढळलेला पुरावा:' : 'EVIDENCE FOUND:'}
                  </div>
                  <blockquote className="bg-white border-l-2 border-[#111111] px-3 py-2 font-mono text-xs text-[#111111] italic rounded-r-[2px]">
                    "{signal.evidence}"
                  </blockquote>
                </div>

                {/* Why It Matters */}
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#66645E] font-semibold mb-1">
                    {isHi ? 'यह क्यों महत्वपूर्ण है:' : isMr ? 'हे का महत्त्वाचे आहे:' : 'WHY IT MATTERS:'}
                  </div>
                  <p className="text-[#333333] leading-relaxed font-sans">{signal.whyItMatters}</p>
                </div>

                {/* Recommended Action */}
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#2D6A4F] font-semibold mb-1">
                    {isHi ? 'सुरक्षा कार्रवाई:' : isMr ? 'सुरक्षा कृती:' : 'RECOMMENDED ACTION:'}
                  </div>
                  <p className="text-[#1B4332] bg-[#E8F5EE] p-2.5 rounded-[2px] font-medium leading-relaxed">
                    {signal.recommendedAction}
                  </p>
                </div>

                {/* Connection to Education Guide */}
                {signal.educationalGuideId && onOpenGuide && (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => onOpenGuide(signal.educationalGuideId!)}
                      className="inline-flex items-center gap-1.5 text-xs text-[#111111] font-semibold hover:underline underline-offset-4"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#66645E]" />
                      <span>
                        {isHi
                          ? 'इस रणनीति के बारे में और जानें →'
                          : isMr
                          ? 'या रणनीतीबद्दल अधिक जाणून घ्या →'
                          : 'Learn how this tactic works →'}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
