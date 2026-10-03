import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  Linkedin,
  Award,
  BookOpen,
} from 'lucide-react';
import { SimulatorProgress, Language } from '../../types';

interface AchievementCardProps {
  progress: SimulatorProgress;
  currentLanguage: Language;
  onNavigateSimulator?: () => void;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  progress,
  currentLanguage,
  onNavigateSimulator,
}) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const isHi = currentLanguage === 'hi';

  const shareUrl = `${window.location.origin}/?achievement=true&badge=investor-safety-learner&score=${progress.score}&correct=${progress.correctAnswers}&total=${progress.totalQuestions}`;

  const whatsappText = `I completed the VeriVest Investor Safety learning experience and earned the Investor Safety Learner badge! 🏅

Score: ${progress.score} points

Learn to recognize investment scams and stay safer with VeriVest:
${shareUrl}`;

  const linkedinText = `I’m happy to share that I completed the VeriVest Investor Safety learning experience and earned the Investor Safety Learner badge.

Score: ${progress.score} points.

The experience helped me understand common investment-scam warning signs and safer verification practices.

${shareUrl}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappText)}`;
    window.open(url, '_blank');
  };

  const handleLinkedInShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  // If user has not completed the Q&A yet, show current learning progress
  if (!progress.isCompleted) {
    return (
      <div className="p-5 rounded-[4px] border border-[#E5E4DE] bg-white space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-[#66645E]">
          <span className="uppercase font-bold tracking-wider text-[#111111]">
            {isHi ? 'शिक्षा प्रगति' : 'Learning Progress'}
          </span>
          <span>
            {progress.completedQuestions} / {progress.totalQuestions} Questions
          </span>
        </div>

        <div className="w-full h-2 bg-[#F5F4F0] rounded-full overflow-hidden border border-[#E5E4DE]">
          <div
            className="h-full bg-[#111111] transition-all duration-300"
            style={{
              width: `${Math.round((progress.completedQuestions / progress.totalQuestions) * 100)}%`,
            }}
          />
        </div>

        <p className="text-xs text-[#66645E] leading-relaxed">
          {isHi
            ? 'निवेशक सुरक्षा लर्नर बैज अर्जित करने के लिए सिमुलेटर में सभी प्रश्नों को पूरा करें।'
            : 'Complete the questions in Learn / Simulator to earn your official Investor Safety Learner badge.'}
        </p>

        {onNavigateSimulator && (
          <button
            onClick={onNavigateSimulator}
            className="mt-2 text-xs font-mono font-semibold text-[#111111] hover:underline flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Continue Simulator Q&A →</span>
          </button>
        )}
      </div>
    );
  }

  // Earned Achievement Card (Exact Structure from Specification)
  return (
    <div className="space-y-3">
      <div className="text-[10px] font-mono uppercase tracking-wider text-[#66645E] font-bold">
        {isHi ? 'उपलब्धियां (Achievements)' : 'Achievements'}
      </div>

      <div className="p-6 rounded-[4px] border border-[#E5E4DE] bg-white text-center space-y-4 shadow-[2px_2px_0px_rgba(17,17,17,0.02)]">
        {/* Badge Icon */}
        <div className="text-4xl select-none" role="img" aria-label="Medal">
          🏅
        </div>

        {/* Title */}
        <div>
          <h4 className="font-serif text-lg font-bold text-[#111111] uppercase tracking-wide">
            INVESTOR SAFETY LEARNER
          </h4>
          <p className="text-xs text-[#66645E] mt-1 max-w-sm mx-auto leading-relaxed">
            Completed the VeriVest investor-safety learning experience.
          </p>
        </div>

        {/* Status & Scores */}
        <div className="pt-2 pb-2 border-y border-[#E5E4DE] flex items-center justify-around text-xs font-mono">
          <div>
            <span className="text-[10px] text-[#66645E] block uppercase">Status</span>
            <strong className="text-[#2D6A4F]">Completed</strong>
          </div>
          <div className="h-6 w-px bg-[#E5E4DE]" />
          <div>
            <span className="text-[10px] text-[#66645E] block uppercase">Correct</span>
            <strong className="text-[#111111]">
              {progress.correctAnswers} / {progress.totalQuestions}
            </strong>
          </div>
          <div className="h-6 w-px bg-[#E5E4DE]" />
          <div>
            <span className="text-[10px] text-[#66645E] block uppercase">Score</span>
            <strong className="text-[#111111]">{progress.score} Points</strong>
          </div>
        </div>

        {/* Share Achievement Action */}
        <div>
          <button
            onClick={() => setShowShareModal(true)}
            className="w-full py-2.5 px-4 rounded-[2px] bg-[#111111] text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#2A2A28] transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Achievement</span>
          </button>
        </div>
      </div>

      {/* Share Achievement Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-[#E5E4DE] rounded-[4px] p-6 max-w-md w-full space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E4DE]">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏅</span>
                <h5 className="font-serif text-base font-bold text-[#111111]">
                  Share your achievement
                </h5>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-xs font-mono text-[#66645E] hover:text-[#111111]"
              >
                ✕ Close
              </button>
            </div>

            <p className="text-xs text-[#66645E] leading-relaxed">
              Share your verified Investor Safety Learner accomplishment. Private profile details (phone, email, age, gender) are strictly omitted.
            </p>

            <div className="space-y-2.5">
              {/* WhatsApp */}
              <button
                onClick={handleWhatsAppShare}
                className="w-full p-3 rounded-[3px] border border-[#25D366]/40 bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#166534] text-xs font-mono font-semibold flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Share on WhatsApp</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              {/* LinkedIn */}
              <button
                onClick={handleLinkedInShare}
                className="w-full p-3 rounded-[3px] border border-[#0A66C2]/40 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1E40AF] text-xs font-mono font-semibold flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                  <span>Share on LinkedIn</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="w-full p-3 rounded-[3px] border border-[#E5E4DE] bg-[#FCF9F8] hover:border-[#111111] text-[#111111] text-xs font-mono font-semibold flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  {copied ? (
                    <Check className="w-4 h-4 text-[#2D6A4F]" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#66645E]" />
                  )}
                  <span>{copied ? 'Link Copied to Clipboard!' : 'Copy Shareable Link'}</span>
                </div>
                <span className="text-[10px] text-[#66645E]">Public Verification URL</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
