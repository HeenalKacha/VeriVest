import React, { useState } from 'react';
import { BookOpen, ArrowRight, ShieldCheck, FileText, Download } from 'lucide-react';
import { EducationGuide, Language } from '../types';
import { translations } from '../i18n/translations';
import { educationGuides } from '../data/educationData';
import { GuideDetailModal } from '../components/modals/GuideDetailModal';

interface EducationPageProps {
  currentLanguage: Language;
  onNavigate: (route: string) => void;
}

export const EducationPage: React.FC<EducationPageProps> = ({
  currentLanguage,
  onNavigate,
}) => {
  const [selectedGuide, setSelectedGuide] = useState<EducationGuide | null>(null);
  const t = translations[currentLanguage];
  const guides = educationGuides[currentLanguage] || educationGuides.en;

  const handleOpenGuide = (guide: EducationGuide) => {
    setSelectedGuide(guide);
  };

  return (
    <div className="bg-[#FCF9F8] min-h-screen py-10">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Module Header matching Image 14 */}
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#66645E] uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
            MODULE 03 • CURATED FIELD GUIDES
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111111] mt-1">
            {t.education.title}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#444748] mt-1 max-w-2xl">
            {t.education.subtitle}
          </p>
        </div>

        {/* 6 Guide Cards Grid matching Image 14 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <div
              key={guide.id}
              onClick={() => handleOpenGuide(guide)}
              className="bg-[#FFFFFF] border border-[#E5E4DE] hover:border-[#111111] rounded-[4px] p-6 flex flex-col justify-between cursor-pointer transition-colors shadow-[4px_4px_0px_rgba(17,17,17,0.04)] group"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono uppercase mb-2">
                  <span className="text-[#66645E] font-semibold">{guide.category}</span>
                  <span className="text-[#888888]">{guide.number}</span>
                </div>

                <h3 className="font-serif text-xl font-semibold text-[#111111] group-hover:underline mb-2.5">
                  {guide.title}
                </h3>

                <p className="font-sans text-xs text-[#66645E] leading-relaxed line-clamp-3">
                  {guide.summary}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-[#E5E4DE] flex items-center justify-between text-xs font-mono">
                <span className="text-[11px] text-[#888888]">{guide.readTime}</span>
                <span className="font-semibold text-[#111111] group-hover:underline flex items-center gap-1">
                  <span>{t.education.readGuide}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Test Your Scam Sense Interactive Banner */}
        <div className="p-6 bg-white border border-[#E5E4DE] rounded-[4px] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[4px_4px_0px_rgba(17,17,17,0.02)]">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 rounded-[2px] font-bold">
              PRACTICE WHAT YOU LEARNED
            </span>
            <h3 className="font-serif text-xl font-bold text-[#111111] pt-1">
              Test Your Scam Sense: Interactive Simulator
            </h3>
            <p className="text-xs text-[#66645E]">
              Evaluate realistic fictional investment pitches, identify warning signs, and receive immediate coaching.
            </p>
          </div>

          <button
            onClick={() => onNavigate('simulator')}
            className="flex items-center gap-2 bg-[#111111] text-white text-xs font-mono font-bold uppercase px-6 py-3 rounded-[2px] hover:bg-[#2A2A28] whitespace-nowrap shrink-0 self-start sm:self-auto"
          >
            <span>START SIMULATION →</span>
          </button>
        </div>

        {/* Bottom Banner matching Image 14 */}
        <div className="p-6 sm:p-8 bg-[#E5E2E1] border border-[#D8D6CE] rounded-[4px] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-[4px] bg-[#111111] text-white flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#95D4B3]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#111111]">
                {t.education.bannerTitle}
              </h3>
              <p className="font-sans text-xs text-[#444748] mt-1 max-w-xl">
                {t.education.bannerSub}
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 bg-[#111111] text-white text-xs font-mono font-semibold uppercase px-6 py-3.5 rounded-[4px] hover:bg-[#2A2A28] whitespace-nowrap"
          >
            <span>{t.education.bannerBtn}</span>
          </button>
        </div>
      </div>

      {/* Guide Detail Modal */}
      <GuideDetailModal
        guide={selectedGuide}
        onClose={() => setSelectedGuide(null)}
        onActionClick={() => onNavigate('dashboard')}
      />
    </div>
  );
};
