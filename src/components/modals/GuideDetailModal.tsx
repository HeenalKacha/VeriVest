import React from 'react';
import { X, AlertOctagon, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { EducationGuide } from '../../types';

interface GuideDetailModalProps {
  guide: EducationGuide | null;
  onClose: () => void;
  onActionClick: () => void;
}

export const GuideDetailModal: React.FC<GuideDetailModalProps> = ({
  guide,
  onClose,
  onActionClick,
}) => {
  if (!guide) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(17,17,17,0.5)] backdrop-blur-[2px]">
      <div className="relative w-full max-w-3xl bg-[#FCF9F8] border border-[#111111] shadow-[4px_4px_0px_rgba(17,17,17,0.15)] rounded-[4px] p-6 sm:p-8 max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#E5E4DE]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono tracking-widest text-[#B45309] bg-[#FEF3C7] px-2 py-0.5 rounded-[2px] font-semibold uppercase">
                {guide.category}
              </span>
              <span className="text-[11px] font-mono text-[#66645E]">
                {guide.number} • {guide.readTime}
              </span>
            </div>
            <h2 className="font-serif text-2xl font-semibold text-[#111111]">
              {guide.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-[4px] border border-[#E5E4DE] hover:border-[#111111] text-[#111111]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pr-2 py-5 space-y-6 text-[#222222]">
          {/* Executive Explanation */}
          <div>
            <h3 className="text-xs font-mono font-semibold tracking-wider uppercase text-[#66645E] mb-2">
              FORENSIC MECHANISM
            </h3>
            <p className="text-sm font-sans leading-relaxed text-[#222222]">
              {guide.explanation}
            </p>
          </div>

          {/* Forensic Specimen Example */}
          <div className="p-4 bg-white border border-[#E5E4DE] rounded-[4px]">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#991B1B] uppercase mb-2">
              <FileText className="w-4 h-4" />
              <span>FORENSIC SPECIMEN TRANSCRIPT</span>
            </div>
            <blockquote className="italic text-xs font-serif text-[#111111] bg-[#FCF9F8] p-3 border-l-2 border-[#991B1B]">
              "{guide.exampleSnippet}"
            </blockquote>
          </div>

          {/* Key Red Flags */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#111111] uppercase mb-3">
              <AlertOctagon className="w-4 h-4 text-[#991B1B]" />
              <span>KEY RED FLAGS TO SPOT</span>
            </div>
            <ul className="space-y-2">
              {guide.redFlags.map((flag, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs font-sans text-[#333333]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#991B1B] mt-1.5 flex-shrink-0" />
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Immediate Action Steps */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#111111] uppercase mb-3">
              <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
              <span>WHAT YOU SHOULD DO IMMEDIATELY</span>
            </div>
            <ul className="space-y-2">
              {guide.actionSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs font-sans text-[#333333]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] mt-1.5 flex-shrink-0" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#E5E4DE] flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-sans font-semibold uppercase text-[#66645E] hover:text-[#111111]"
          >
            Close Guide
          </button>
          <button
            onClick={() => {
              onClose();
              onActionClick();
            }}
            className="flex items-center gap-2 bg-[#111111] text-white text-xs font-sans font-semibold uppercase px-4 py-2.5 rounded-[4px] hover:bg-[#2A2A28]"
          >
            <span>{guide.relatedActionText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
