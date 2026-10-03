import React from 'react';
import { VeriVestLogo } from '../components/common/VeriVestLogo';
import { ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface PublicAchievementPageProps {
  score?: number;
  correct?: number;
  total?: number;
  onNavigateHome: () => void;
}

export const PublicAchievementPage: React.FC<PublicAchievementPageProps> = ({
  score = 80,
  correct = 8,
  total = 10,
  onNavigateHome,
}) => {
  return (
    <div className="min-h-screen bg-[#FCF9F8] text-[#1B1C1C] flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Top Header */}
      <header className="max-w-xl mx-auto w-full flex items-center justify-between pb-8 border-b border-[#E5E4DE]">
        <button
          onClick={onNavigateHome}
          className="focus:outline-none cursor-pointer text-left"
        >
          <VeriVestLogo size="sm" subtext="Verify Before You Trust" />
        </button>

        <span className="text-[10px] font-mono text-[#2D6A4F] uppercase tracking-wider bg-[#E8F5EE] border border-[#2D6A4F]/30 px-2.5 py-1 rounded font-bold flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified Accomplishment</span>
        </span>
      </header>

      {/* Main Achievement Card */}
      <main className="max-w-md mx-auto w-full my-auto py-8">
        <div className="bg-white border border-[#E5E4DE] rounded-[4px] p-8 text-center space-y-6 shadow-[4px_4px_0px_rgba(17,17,17,0.04)]">
          {/* Badge */}
          <div className="text-6xl select-none" role="img" aria-label="Medal">
            🏅
          </div>

          {/* Title & Description */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#66645E] font-bold">
              VERIVEST LEARNING ACCOMPLISHMENT
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] uppercase tracking-wide">
              INVESTOR SAFETY LEARNER
            </h1>
            <p className="text-xs text-[#66645E] max-w-sm mx-auto leading-relaxed pt-1">
              Successfully completed the VeriVest investor-safety learning experience on identifying financial deception tactics.
            </p>
          </div>

          {/* Verification Metrics (Strictly non-private) */}
          <div className="pt-3 pb-3 border-y border-[#E5E4DE] grid grid-cols-3 gap-2 text-xs font-mono">
            <div>
              <span className="text-[10px] text-[#66645E] block uppercase">Status</span>
              <strong className="text-[#2D6A4F] flex items-center justify-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Completed</span>
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-[#66645E] block uppercase">Correct</span>
              <strong className="text-[#111111] block mt-0.5">
                {correct} / {total}
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-[#66645E] block uppercase">Score</span>
              <strong className="text-[#111111] block mt-0.5">
                {score} Points
              </strong>
            </div>
          </div>

          {/* Safe Educational Context */}
          <div className="p-3 bg-[#FCF9F8] rounded border border-[#E5E4DE] text-[11px] text-[#66645E] leading-relaxed">
            This learner completed practical simulation scenarios covering guaranteed returns, cloned regulator licenses, fake broker portals, and Telegram pump solicitations.
          </div>

          {/* Public Action */}
          <div className="pt-2">
            <button
              onClick={onNavigateHome}
              className="w-full py-3.5 px-6 rounded-[2px] bg-[#111111] text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#2A2A28] transition-colors flex items-center justify-center gap-2"
            >
              <span>Test Your Scam Sense on VeriVest</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </main>

      {/* Public Footer */}
      <footer className="max-w-xl mx-auto w-full pt-8 border-t border-[#E5E4DE] text-center text-xs text-[#66645E] font-mono">
        © {new Date().getFullYear()} VeriVest • Investor Scam & Claim Verification
      </footer>
    </div>
  );
};
