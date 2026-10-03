import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { Language, EducationGuide } from '../types';
import { scamScenarios } from '../data/scamSimulatorData';
import { educationGuides } from '../data/educationData';
import { GuideDetailModal } from '../components/modals/GuideDetailModal';
import { storageService } from '../services/storageService';
import { saveSimulatorProgressToFirestore } from '../services/firebase';
import { translations } from '../i18n/translations';

interface LearnSimulatorPageProps {
  currentLanguage: Language;
  onNavigateScan: () => void;
  onOpenProfile?: () => void;
}

export const LearnSimulatorPage: React.FC<LearnSimulatorPageProps> = ({
  currentLanguage,
  onNavigateScan,
  onOpenProfile,
}) => {
  const [tab, setTab] = useState<'simulator' | 'guides'>('simulator');
  const [selectedGuide, setSelectedGuide] = useState<EducationGuide | null>(null);

  const t = translations[currentLanguage].learn;

  // Simulator state
  const scenarioList = scamScenarios[currentLanguage] || scamScenarios.en;
  const initialProg = storageService.getSimulatorProgress();
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [score, setScore] = useState(initialProg?.correctAnswers || 0);
  const [attempted, setAttempted] = useState(initialProg?.completedQuestions || 0);

  const currentScenario = scenarioList[scenarioIndex] || scenarioList[0];
  const chosenOption = currentScenario.options.find((o) => o.id === selectedOptionId);

  const handleSelectOption = (optionId: string) => {
    if (selectedOptionId) return;
    setSelectedOptionId(optionId);
    const newAttempted = Math.min(attempted + 1, scenarioList.length);
    setAttempted(newAttempted);

    const chosen = currentScenario.options.find((o) => o.id === optionId);
    const newScore = chosen?.isSafe ? score + 1 : score;
    if (chosen?.isSafe) {
      setScore(newScore);
    }

    const isDone = newAttempted >= scenarioList.length;
    const progressData = {
      totalQuestions: scenarioList.length,
      completedQuestions: newAttempted,
      correctAnswers: newScore,
      score: Math.round((newScore / scenarioList.length) * 100),
      isCompleted: isDone,
      completedAt: isDone ? new Date().toLocaleDateString() : undefined,
      badgeTitle: 'Investor Safety Learner',
    };
    storageService.saveSimulatorProgress(progressData);

    const currentUser = storageService.getUser();
    if (currentUser?.id) {
      saveSimulatorProgressToFirestore(currentUser.id, progressData).catch((err) =>
        console.warn('Background Firestore progress save failed:', err)
      );
    }
  };

  const handleNextScenario = () => {
    setSelectedOptionId(null);
    setScenarioIndex((prev) => (prev + 1) % scenarioList.length);
  };

  // Guides
  const guides = educationGuides[currentLanguage] || educationGuides.en;

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

        {/* 2-way Segmented Control */}
        <div className="pt-3 inline-flex p-1 bg-[#F5F4F0] rounded-[4px] border border-[#E5E4DE]">
          <button
            onClick={() => setTab('simulator')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-[2px] text-xs font-sans font-medium uppercase transition-colors ${
              tab === 'simulator'
                ? 'bg-white text-[#111111] font-bold shadow-sm'
                : 'text-[#66645E] hover:text-[#111111]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>{isHi ? t.tabSimulator : t.tabSimulator}</span>
          </button>

          <button
            onClick={() => setTab('guides')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-[2px] text-xs font-sans font-medium uppercase transition-colors ${
              tab === 'guides'
                ? 'bg-white text-[#111111] font-bold shadow-sm'
                : 'text-[#66645E] hover:text-[#111111]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#2D6A4F]" />
            <span>{t.tabGuides}</span>
          </button>
        </div>
      </div>

      {/* 1. SIMULATOR EXPERIENCE */}
      {tab === 'simulator' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#E5E4DE] rounded-[4px] p-6 sm:p-8 shadow-[4px_4px_0px_rgba(17,17,17,0.03)] space-y-6">
            {/* Scenario Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5E4DE] gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase bg-[#F5F4F0] px-2 py-0.5 rounded font-bold text-[#111111]">
                  {currentScenario.category}
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#111111] mt-1.5">
                  {currentScenario.title}
                </h2>
              </div>
              <div className="text-xs font-mono text-[#66645E]">
                {t.safeChoices} <strong className="text-[#2D6A4F]">{score} / {attempted}</strong>
              </div>
            </div>

            {/* Fictional Message Box */}
            <div className="p-4 sm:p-5 rounded-[4px] bg-[#FCF9F8] border border-[#E5E4DE]">
              <div className="text-[10px] font-mono uppercase text-[#66645E] mb-1 font-semibold">
                {t.simulatedPitch} ({currentScenario.claimedBy}):
              </div>
              <p className="font-mono text-xs sm:text-sm text-[#111111] whitespace-pre-wrap leading-relaxed">
                {currentScenario.scenarioText}
              </p>
            </div>

            {/* Interactive Question */}
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#111111] mb-3">
                {isHi ? t.whatWouldYouDo : t.whatWouldYouDo}
              </h3>

              <div className="space-y-2.5">
                {currentScenario.options.map((option) => {
                  const isSelected = selectedOptionId === option.id;
                  let style = 'border-[#E5E4DE] bg-white hover:border-[#111111]';

                  if (selectedOptionId) {
                    if (option.isSafe) {
                      style = 'border-[#2D6A4F] bg-[#E8F5EE] text-[#1B4332] font-medium';
                    } else if (isSelected) {
                      style = 'border-[#991B1B] bg-[#FEE2E2] text-[#991B1B] font-medium';
                    } else {
                      style = 'opacity-40 border-[#E5E4DE]';
                    }
                  }

                  return (
                    <button
                      key={option.id}
                      disabled={Boolean(selectedOptionId)}
                      onClick={() => handleSelectOption(option.id)}
                      className={`w-full p-3.5 rounded-[4px] border text-left text-xs sm:text-sm transition-all flex items-start justify-between gap-3 ${style}`}
                    >
                      <span className="font-sans">{option.text}</span>
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

            {/* Immediate Explanation & Coaching */}
            {selectedOptionId && (
              <div className="pt-4 border-t border-[#E5E4DE] space-y-4">
                <div
                  className={`p-3.5 rounded-[4px] border text-xs ${
                    chosenOption?.isSafe
                      ? 'bg-[#E8F5EE] border-[#2D6A4F] text-[#1B4332]'
                      : 'bg-[#FEE2E2] border-[#F87171] text-[#991B1B]'
                  }`}
                >
                  <div className="font-mono font-bold uppercase mb-1">
                    {chosenOption?.isSafe ? t.goodDecision : t.warningFlag}
                  </div>
                  <p className="leading-relaxed">{chosenOption?.feedback}</p>
                </div>

                <div className="space-y-1.5 text-xs text-[#444748]">
                  <strong className="text-[#111111]">{t.warningSigns}</strong>
                  <ul className="list-disc list-inside space-y-0.5">
                    {currentScenario.warningSignsFound.map((sign, idx) => (
                      <li key={idx}>{sign}</li>
                    ))}
                  </ul>
                </div>

                {attempted >= scenarioList.length && (
                  <div className="p-4 rounded-[4px] bg-[#E8F5EE] border border-[#2D6A4F] text-[#1B4332] text-xs font-mono space-y-2">
                    <div className="font-bold flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1.5">
                        <span>🏅</span>
                        <span>{t.achievement}</span>
                      </span>
                      <span className="text-xs bg-[#2D6A4F] text-white px-2 py-0.5 rounded font-bold">
                        {Math.round((score / scenarioList.length) * 100)} Points
                      </span>
                    </div>
                    <p>
                      {t.achievementBody
                        .replace('{total}', String(scenarioList.length))
                        .replace('{total}', String(scenarioList.length))
                        .replace('{score}', String(score))}
                    </p>
                    {onOpenProfile && (
                      <button
                        onClick={onOpenProfile}
                        className="text-xs font-mono font-bold underline text-[#1B4332] hover:text-[#111111] flex items-center gap-1"
                      >
                        <span>{t.viewProfile}</span>
                      </button>
                    )}
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextScenario}
                    className="bg-[#111111] text-white px-5 py-2.5 rounded-[2px] text-xs font-mono font-semibold uppercase hover:bg-[#2A2A28]"
                  >
                    {t.tryAnother}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. GUIDES EXPERIENCE */}
      {tab === 'guides' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guides.map((guide) => (
              <div
                key={guide.id}
                onClick={() => setSelectedGuide(guide)}
                className="p-5 rounded-[4px] border border-[#E5E4DE] bg-white hover:border-[#111111] cursor-pointer transition-colors shadow-[2px_2px_0px_rgba(17,17,17,0.02)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#66645E]">
                    <span className="uppercase font-bold">{guide.category}</span>
                    <span>{guide.readTime}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#111111] mt-2 mb-1.5">
                    {guide.title}
                  </h3>

                  <p className="text-xs text-[#66645E] leading-relaxed line-clamp-3">
                    {guide.summary}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-[#E5E4DE] flex items-center justify-between text-xs font-mono text-[#111111] font-semibold">
                  <span>{t.readGuide}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Guide Detail */}
      {selectedGuide && (
        <GuideDetailModal
          guide={selectedGuide}
          onClose={() => setSelectedGuide(null)}
          onActionClick={() => {
            setSelectedGuide(null);
            onNavigateScan();
          }}
        />
      )}
    </div>
  );
};
