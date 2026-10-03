import React from 'react';
import { FileText, AlertCircle, Quote } from 'lucide-react';
import { ExtractedClaim, Language } from '../../types';

interface EvidenceListProps {
  claims: ExtractedClaim[];
  currentLanguage: Language;
  extractedText?: string;
  ocrConfidence?: 'high' | 'low' | 'manual';
}

export const EvidenceList: React.FC<EvidenceListProps> = ({
  claims,
  currentLanguage,
  extractedText,
  ocrConfidence,
}) => {
  const isHi = currentLanguage === 'hi';
  const isMr = currentLanguage === 'mr';

  const sectionTitle = isHi ? 'सामग्री से मिले प्रमाण' : isMr ? 'सामग्रीतून मिळालेला पुरावा' : 'EVIDENCE FOUND';
  const sectionSubtitle = isHi
    ? 'प्रस्तुत सामग्री से निकाले गए महत्वपूर्ण दावे और वित्तीय वादे'
    : isMr
    ? 'संदेशामधून काढलेले महत्त्वाचे दावे'
    : 'Key claims and promises extracted directly from submitted content';

  return (
    <div className="bg-white border border-[#E5E4DE] rounded-[4px] p-6 sm:p-7 shadow-[4px_4px_0px_rgba(17,17,17,0.04)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5E4DE] gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Quote className="w-3.5 h-3.5 text-[#111111]" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#111111] font-semibold">
              {sectionTitle}
            </h3>
          </div>
          <p className="text-xs text-[#66645E] mt-0.5">{sectionSubtitle}</p>
        </div>

        <div className="text-[11px] font-mono text-[#66645E]">
          {claims.length} Extracted {claims.length === 1 ? 'Claim' : 'Claims'}
        </div>
      </div>

      {/* If screenshot with extracted OCR text */}
      {extractedText && (
        <div className="mt-5 p-4 rounded-[4px] bg-[#F5F4F0] border border-[#E5E4DE] space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#66645E]">
            <span className="font-semibold text-[#111111] uppercase">EXTRACTED TEXT FROM IMAGE / ARTIFACT:</span>
            {ocrConfidence === 'low' ? (
              <span className="text-[#9A3412] font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Some text could not be read clearly. Verify manually.
              </span>
            ) : (
              <span className="text-[#2D6A4F] font-semibold">OCR Confidence: Normal</span>
            )}
          </div>
          <p className="font-mono text-xs text-[#222222] whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
            {extractedText}
          </p>
        </div>
      )}

      {/* Claims Grid */}
      {claims.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {claims.map((claim) => (
            <div
              key={claim.id}
              className="p-4 rounded-[4px] border border-[#E5E4DE] bg-[#FCF9F8] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono pb-2 border-b border-[#E5E4DE] text-[#66645E]">
                  <span className="font-bold text-[#111111]">{claim.claimNumber}</span>
                  <span className="uppercase bg-[#E5E2E1] px-2 py-0.5 rounded-[2px] text-[#111111]">
                    {claim.category}
                  </span>
                </div>

                <div className="mt-3">
                  <blockquote className="font-mono text-xs text-[#111111] leading-relaxed">
                    "{claim.quote}"
                  </blockquote>
                </div>
              </div>

              {claim.verificationNote && (
                <div className="mt-3 pt-2.5 border-t border-[#E5E4DE] text-[11px] text-[#66645E]">
                  <span className="font-semibold text-[#111111]">Indicator Note: </span>
                  {claim.verificationNote}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 p-6 text-center text-xs text-[#66645E] bg-[#FCF9F8] rounded-[4px]">
          No explicit high-risk claims extracted from the submitted inquiry.
        </div>
      )}
    </div>
  );
};
