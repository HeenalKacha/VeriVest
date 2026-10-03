import React, { useEffect, useState } from 'react';
import { Shield, Check, Loader2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface LoadingAnalysisPageProps {
  currentLanguage: Language;
  onFinished: () => void;
}

export const LoadingAnalysisPage: React.FC<LoadingAnalysisPageProps> = ({
  currentLanguage,
  onFinished,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const t = translations[currentLanguage];

  const steps = [
    t.loading.s1,
    t.loading.s2,
    t.loading.s3,
    t.loading.s4,
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 600);
    const timer2 = setTimeout(() => setCurrentStep(2), 1300);
    const timer3 = setTimeout(() => setCurrentStep(3), 2000);
    const timer4 = setTimeout(() => onFinished(), 2700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onFinished]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4 bg-[#FCF9F8]">
      <div className="w-full max-w-lg bg-[#FFFFFF] border border-[#E5E4DE] rounded-[4px] p-8 shadow-[4px_4px_0px_rgba(17,17,17,0.06)]">
        {/* Animated Emblem */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-[#F5F4F0] border border-[#D8D6CE] flex items-center justify-center">
              <Shield className="w-8 h-8 text-[#111111] animate-pulse" />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-t-[#111111] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-2 mb-8">
          <div className="text-[10px] font-mono tracking-widest text-[#66645E] uppercase font-semibold">
            NEURAL FORENSIC ENGINE ACTIVE
          </div>
          <h2 className="font-serif text-2xl font-semibold text-[#111111]">
            {t.loading.title}
          </h2>
          <p className="font-sans text-xs text-[#66645E] max-w-md mx-auto">
            {t.loading.subtitle}
          </p>
        </div>

        {/* Forensic Execution Step list matching prompt */}
        <div className="space-y-4 max-w-md mx-auto">
          {steps.map((stepText, idx) => {
            const isCompleted = currentStep > idx;
            const isCurrent = currentStep === idx;

            return (
              <div
                key={idx}
                className={`flex items-center gap-3 p-3 rounded-[4px] border text-xs font-sans transition-all duration-300 ${
                  isCompleted
                    ? 'bg-[#E8F5EE] border-[rgba(45,106,79,0.25)] text-[#2D6A4F]'
                    : isCurrent
                    ? 'bg-[#FCF9F8] border-[#111111] text-[#111111] font-semibold'
                    : 'bg-[#FCF9F8] border-[#E5E4DE] text-[#888888] opacity-50'
                }`}
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                  {isCompleted ? (
                    <Check className="w-4 h-4 text-[#2D6A4F]" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-[#111111] animate-spin" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-[#C4C7C7]" />
                  )}
                </div>
                <span>{stepText}</span>
              </div>
            );
          })}
        </div>

        {/* Footer Guarantee */}
        <div className="mt-8 pt-4 border-t border-[#E5E4DE] text-center text-[10px] font-mono text-[#66645E] uppercase tracking-wider">
          ISOLATED RAM PIPELINE • TELEMETRY ENCRYPTED
        </div>
      </div>
    </div>
  );
};
