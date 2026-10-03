import React, { useState } from 'react';
import {
  ShieldAlert,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Award,
  AlertTriangle,
} from 'lucide-react';
import { Language } from '../types';
import { scamScenarios } from '../data/scamSimulatorData';

interface ScamSimulatorPageProps {
  currentLanguage: Language;
  onNavigate: (route: string) => void;
  onOpenGuide?: (guideId: string) => void;
}

export const ScamSimulatorPage: React.FC<ScamSimulatorPageProps> = ({
  currentLanguage,
  onNavigate,
  onOpenGuide,
}) => {
  const isHi = currentLanguage === 'hi';
  const isMr = currentLanguage === 'mr';

  const list = scamScenarios[currentLanguage] || scamScenarios.en;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [scenariosAttempted, setScenariosAttempted] = useState(0);

  const currentScenario = list[currentIndex] || list[0];

  const handleSelectOption = (optionId: string) => {
    if (selectedOptionId) return; // already answered
    setSelectedOptionId(optionId);
    setScenariosAttempted((prev) => prev + 1);

    const chosen = currentScenario.options.find((o) => o.id === optionId);
    if (chosen?.isSafe) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextScenario = () => {
    setSelectedOptionId(null);
    setCurrentIndex((prev) => (prev + 1) % list.length);
  };

  const chosenOption = currentScenario.options.find((o) => o.id === selectedOptionId);

  return (
    <div className="bg-[#FCF9F8] min-h-screen py-10">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="border-b border-[#E5E4DE] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#2D6A4F] uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]" />
              INTERACTIVE SIMULATION • TEST YOUR SCAM SENSE
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111111] mt-1">
              {isHi ? 'स्कैम सिमुलेटर (TEST YOUR SCAM SENSE)' : isMr ? 'स्कॅम सिम्युलेटर' : 'TEST YOUR SCAM SENSE'}
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[#444748] mt-1 max-w-xl">
              {isHi
                ? 'काल्पनिक निवेश घोटालों के परिदृश्यों में अपनी सुरक्षा समझ को परखें। (सभी परिदृश्य डेमो हैं)'
                : isMr
                ? 'काल्पनिक परिस्थितींमध्ये योग्य निर्णय घेण्याचा सराव करा.'
                : 'Practice evaluating realistic fictional investment propositions in a safe environment.'}
            </p>
          </div>

          {/* Score Counter */}
          <div className="p-3 bg-white border border-[#E5E4DE] rounded-[4px] flex items-center gap-4 text-xs font-mono">
            <div>
              <span className="text-[#66645E]">SAFE DECISIONS: </span>
              <span className="font-bold text-[#2D6A4F]">
                {score} / {scenariosAttempted}
              </span>
            </div>
            <div className="text-[#66645E]">
              SCENARIO {currentIndex + 1} OF {list.length}
            </div>
          </div>
        </div>

        {/* Fictional Scenario Card */}
        <div className="bg-white border border-[#E5E4DE] rounded-[4px] p-6 sm:p-8 shadow-[4px_4px_0px_rgba(17,17,17,0.04)] space-y-6">
          {/* Tag & Claimed By */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5E4DE] gap-2">
            <div>
              <span className="text-[10px] font-mono bg-[#E5E2E1] px-2 py-0.5 rounded-[2px] uppercase font-bold text-[#111111]">
                {currentScenario.category}
              </span>
              <h2 className="font-serif text-2xl font-semibold text-[#111111] mt-2">
                {currentScenario.title}
              </h2>
            </div>
            <div className="text-xs font-mono text-[#66645E]">
              Source: <span className="text-[#111111] font-semibold">{currentScenario.claimedBy}</span>
            </div>
          </div>

          {/* Fictional Message Bubble */}
          <div className="p-5 rounded-[4px] bg-[#FCF9F8] border border-[#E5E4DE]">
            <div className="text-[10px] font-mono uppercase text-[#66645E] mb-2 font-semibold">
              INCOMING MESSAGE / SOLICITATION:
            </div>
            <p className="font-mono text-xs sm:text-sm text-[#111111] whitespace-pre-wrap leading-relaxed">
              {currentScenario.scenarioText}
            </p>
          </div>

          {/* Question Prompt */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#111111] mb-3">
              {isHi ? 'आप क्या करेंगे? (What would you do?)' : 'What would you do?'}
            </h3>

            <div className="space-y-3">
              {currentScenario.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                let optStyle = 'border-[#E5E4DE] bg-white hover:border-[#111111]';

                if (selectedOptionId) {
                  if (option.isSafe) {
                    optStyle = 'border-[#2D6A4F] bg-[#E8F5EE] text-[#1B4332]';
                  } else if (isSelected) {
                    optStyle = 'border-[#991B1B] bg-[#FEE2E2] text-[#991B1B]';
                  } else {
                    optStyle = 'opacity-50 border-[#E5E4DE]';
                  }
                }

                return (
                  <button
                    key={option.id}
                    disabled={Boolean(selectedOptionId)}
                    onClick={() => handleSelectOption(option.id)}
                    className={`w-full p-4 rounded-[4px] border text-left text-xs sm:text-sm transition-all flex items-start justify-between gap-3 ${optStyle}`}
                  >
                    <span className="font-sans font-medium">{option.text}</span>
                    {selectedOptionId && (
                      <span className="shrink-0 mt-0.5">
                        {option.isSafe ? (
                          <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                        ) : isSelected ? (
                          <XCircle className="w-4 h-4 text-[#991B1B]" />
                        ) : null}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Warning Signs Breakdown (revealed after selection) */}
          {selectedOptionId && (
            <div className="pt-6 border-t border-[#E5E4DE] space-y-5 animate-in fade-in duration-300">
              {/* Feedback Alert */}
              <div
                className={`p-4 rounded-[4px] border ${
                  chosenOption?.isSafe
                    ? 'bg-[#E8F5EE] border-[#2D6A4F] text-[#1B4332]'
                    : 'bg-[#FEE2E2] border-[#F87171] text-[#991B1B]'
                }`}
              >
                <div className="font-mono text-xs font-bold uppercase mb-1">
                  {chosenOption?.isSafe ? 'EXCELLENT SAFETY CHOICE' : 'HIGH RISK DECISION'}
                </div>
                <p className="text-xs leading-relaxed font-sans">{chosenOption?.feedback}</p>
              </div>

              {/* Warning Signs Identified in this Scenario */}
              <div className="p-4 bg-[#FCF9F8] border border-[#E5E4DE] rounded-[4px] space-y-2">
                <div className="text-xs font-mono uppercase font-bold text-[#111111]">
                  You and VeriVest identified {currentScenario.warningSignsFound.length} warning signs in this scenario:
                </div>
                <ul className="text-xs text-[#444748] space-y-1 list-disc list-inside font-sans">
                  {currentScenario.warningSignsFound.map((sign, idx) => (
                    <li key={idx}>{sign}</li>
                  ))}
                </ul>
              </div>

              {/* Explanation & Learn Link */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <p className="text-xs text-[#66645E] max-w-lg leading-relaxed">{currentScenario.explanation}</p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleNextScenario}
                    className="flex items-center gap-2 bg-[#111111] text-white px-5 py-2.5 rounded-[2px] text-xs font-mono font-semibold uppercase hover:bg-[#2A2A28]"
                  >
                    <span>Try Another Scenario</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Demo Disclaimer */}
        <div className="p-4 bg-[#F5F4F0] border border-[#E5E4DE] rounded-[4px] text-xs text-[#66645E] leading-relaxed">
          <strong>Fictional Demo Content:</strong> All names, phone numbers, UPI addresses, and scenarios in Test Your
          Scam Sense are simulated fictional exercises designed to educate users on real-world deception tactics.
        </div>
      </div>
    </div>
  );
};
