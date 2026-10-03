import React from 'react';

interface ThreatSpectrumProps {
  score: number;
}

export const ThreatSpectrum: React.FC<ThreatSpectrumProps> = ({ score }) => {
  const clampedScore = Math.min(Math.max(score, 0), 100);

  const getTierLabel = (val: number) => {
    if (val >= 80) return 'Critical Tier (80–100)';
    if (val >= 60) return 'Elevated Risk Tier (60–79)';
    if (val >= 25) return 'Guarded Watch Tier (25–59)';
    return 'Nominal Tier (00–24)';
  };

  return (
    <div className="w-full my-4">
      <div className="flex items-center justify-between text-[11px] font-mono tracking-wider uppercase mb-2">
        <span className="text-[#66645E]">THREAT DENSITY SPECTRUM</span>
        <span className="font-semibold text-[#991B1B]">{getTierLabel(clampedScore)}</span>
      </div>

      {/* Spectrum track */}
      <div className="relative h-2 w-full rounded-none bg-[#E5E4DE] overflow-visible">
        {/* Color segments */}
        <div className="absolute inset-0 flex h-full">
          <div className="w-1/4 bg-[#95D4B3]" /> {/* 0 - 25 Nominal */}
          <div className="w-[35%] bg-[#FCD34D]" /> {/* 25 - 60 Guarded/Elevated */}
          <div className="w-1/4 bg-[#FB923C]" /> {/* 60 - 85 Critical */}
          <div className="w-[15%] bg-[#EF4444]" /> {/* 85 - 100 Terminal */}
        </div>

        {/* Needle Indicator */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-700 z-10"
          style={{ left: `${clampedScore}%` }}
        >
          <div className="w-3.5 h-3.5 bg-[#111111] border-2 border-white rounded-none shadow-[0px_2px_4px_rgba(0,0,0,0.3)] transform rotate-45" />
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-[#111111] whitespace-nowrap bg-white px-1 py-0.5 border border-[#111111]">
            {clampedScore}
          </div>
        </div>
      </div>

      {/* Milestone ticks */}
      <div className="flex justify-between text-[10px] font-mono text-[#66645E] mt-4 pt-1 border-t border-[#E5E4DE]">
        <span>00 Nominal</span>
        <span>25 Guarded</span>
        <span>60 Elevated</span>
        <span>85 Critical</span>
        <span>100 Terminal</span>
      </div>
    </div>
  );
};
