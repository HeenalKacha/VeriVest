import React, { useState } from 'react';
import {
  Printer,
  Download,
  Share2,
  ArrowLeft,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Info,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { AnalysisResult, Language } from '../types';
import { translations } from '../i18n/translations';
import { ScamDNA } from '../components/scam/ScamDNA';
import { EvidenceList } from '../components/scam/EvidenceList';
import { VerificationCenter } from '../components/scam/VerificationCenter';
import { VoiceExplainer } from '../components/common/VoiceExplainer';
import { ShareModal } from '../components/modals/ShareModal';
import { GuideDetailModal } from '../components/modals/GuideDetailModal';
import { educationGuides } from '../data/educationData';

interface RiskResultPageProps {
  currentLanguage: Language;
  result: AnalysisResult;
  onNavigate: (route: string) => void;
}

export const RiskResultPage: React.FC<RiskResultPageProps> = ({
  currentLanguage,
  result,
  onNavigate,
}) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [activeGuideId, setActiveGuideId] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const t = translations[currentLanguage];
  const isHi = currentLanguage === 'hi';
  const isMr = currentLanguage === 'mr';

  // Overall Assessment Level styling
  const assessment = result.assessment || (result.riskLevel === 'HIGH' ? 'HIGH CONCERN' : result.riskLevel === 'SUSPICIOUS' ? 'REQUIRES CAUTION' : 'LOW CONCERN');

  const assessmentStyles = {
    'HIGH CONCERN': {
      bg: 'bg-[#FEF2F2]',
      border: 'border-[#F87171]',
      text: 'text-[#991B1B]',
      badgeBg: 'bg-[#991B1B]',
      badgeText: 'text-white',
      title: isHi ? 'उच्च चिंता (HIGH CONCERN)' : isMr ? 'गंभीर चिंता (HIGH CONCERN)' : 'HIGH CONCERN',
      subtitle: isHi
        ? 'कई महत्वपूर्ण चेतावनी संकेत और सत्यापन अंतर पाए गए हैं।'
        : 'Multiple significant warning indicators and verification gaps detected.',
    },
    'REQUIRES CAUTION': {
      bg: 'bg-[#FFFBEB]',
      border: 'border-[#FCD34D]',
      text: 'text-[#92400E]',
      badgeBg: 'bg-[#D97706]',
      badgeText: 'text-white',
      title: isHi ? 'सावधानी आवश्यक (REQUIRES CAUTION)' : isMr ? 'सावधानता आवश्यक' : 'REQUIRES CAUTION',
      subtitle: isHi
        ? 'कुछ संदिग्ध पहलू मिले हैं। स्वतंत्र पुष्टि के बिना आगे न बढ़ें।'
        : 'Ambiguous or warning signals identified. Independent verification advised.',
    },
    'LOW CONCERN': {
      bg: 'bg-[#F0FDF4]',
      border: 'border-[#86EFAC]',
      text: 'text-[#166534]',
      badgeBg: 'bg-[#16A34A]',
      badgeText: 'text-white',
      title: isHi ? 'कम चिंता (LOW CONCERN)' : isMr ? 'कमी धोका (LOW CONCERN)' : 'LOW CONCERN',
      subtitle: isHi
        ? 'सीधे उच्च-जोखिम संकेत नहीं मिले, फिर भी मानक वित्तीय सावधानी बरतें।'
        : 'No critical coercion markers detected. Standard financial hygiene recommended.',
    },
  }[assessment];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadReport = () => {
    setDownloadSuccess(true);
    const reportText = `VERIVEST SAFETY REPORT
==================================================
Input Type: ${result.sourceLabel}
Date: ${result.timestamp}
Assessment: ${assessment} (${result.warningIndicatorsCount} warning indicators detected)
Internal Risk Indicator Score: ${result.riskScore} / 100

1. SUMMARY
--------------------------------------------------
${result.summary}
Directive: ${result.forensicDirective}

2. EVIDENCE FOUND
--------------------------------------------------
${(result.claims || [])
  .map((c, i) => `${c.claimNumber}: "${c.quote}" [Category: ${c.category}]`)
  .join('\n')}

3. SCAM DNA SIGNALS
--------------------------------------------------
${(result.scamDna || [])
  .map(
    (s, i) =>
      `[${s.severity.toUpperCase()}] ${s.name}
Evidence: "${s.evidence}"
Why it matters: ${s.whyItMatters}
Recommended action: ${s.recommendedAction}`
  )
  .join('\n\n')}

4. VERIFICATION RESULTS
--------------------------------------------------
Claimed Entity: ${result.verificationDetails?.claimedEntity || 'N/A'}
Claimed Reg Number: ${result.verificationDetails?.claimedRegNumber || 'N/A'}
Status: ${result.verificationDetails?.status || 'N/A'}
Source Checked: ${result.verificationDetails?.sourceChecked || 'N/A'}
What was verified: ${(result.verificationDetails?.whatWasVerified || []).join(', ')}
What could not be verified: ${(result.verificationDetails?.whatCouldNotBeVerified || []).join(', ')}

5. WHY THIS MATTERS
--------------------------------------------------
${result.whyThisMatters}

6. RECOMMENDED SAFETY ACTIONS
--------------------------------------------------
${result.recommendedActions.join('\n')}

7. LIMITATIONS & DISCLAIMER
--------------------------------------------------
${(result.limitations || []).map((l, i) => `• ${l}`).join('\n')}
"This report is an automated safety assessment and should not be treated as proof of fraud or as investment advice."
==================================================
Generated by VeriVest Investor Resilience Platform`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `VeriVest-Safety-Report-${result.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  // Find educational guide if user clicks to learn
  const guidesList = educationGuides[currentLanguage] || educationGuides.en;
  const currentOpenGuide = guidesList.find((g) => g.id === activeGuideId) || null;

  return (
    <div className="bg-[#FCF9F8] min-h-screen py-8 sm:py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5E4DE] text-xs font-mono text-[#66645E] gap-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="hover:text-[#111111] flex items-center gap-1.5 self-start"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO SCAN</span>
            <span>/</span>
            <span>RESULT #{result.id}</span>
          </button>

          <div className="flex items-center gap-2 text-[11px] uppercase">
            <span>Source: {result.sourceLabel}</span>
            <span>•</span>
            <span>{result.timestamp}</span>
          </div>
        </div>

        {/* Page Title & Action Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E4DE] pb-6 gap-4">
          <div>
            <div className="text-[10px] font-mono tracking-widest text-[#66645E] uppercase font-semibold">
              EXPLAINABLE SAFETY ASSESSMENT
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111111] mt-1">
              Verification & Risk Result
            </h1>
            <p className="font-sans text-xs text-[#66645E] mt-1">
              Automated behavioral detection, evidence extraction, and registry status.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            {/* Audio Voice Explainer */}
            <VoiceExplainer
              speechText={result.speechSummary || result.whyThisMatters}
              currentLanguage={currentLanguage}
            />

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-[4px] border border-[#E5E4DE] bg-white text-xs font-mono font-semibold uppercase text-[#111111] hover:border-[#111111]"
            >
              <Printer className="w-3.5 h-3.5 text-[#66645E]" />
              <span>Print</span>
            </button>

            <button
              onClick={handleDownloadReport}
              className="flex items-center gap-1.5 px-3 py-2 rounded-[4px] border border-[#E5E4DE] bg-white text-xs font-mono font-semibold uppercase text-[#111111] hover:border-[#111111]"
            >
              <Download className="w-3.5 h-3.5 text-[#66645E]" />
              <span>{downloadSuccess ? 'Downloaded' : 'Report'}</span>
            </button>

            <button
              onClick={() => setShareModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-[4px] bg-[#111111] text-white text-xs font-mono font-semibold uppercase hover:bg-[#2A2A28]"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Result</span>
            </button>
          </div>
        </div>

        {/* 1. OVERALL ASSESSMENT MODULE (Section 7 & 19) */}
        <div
          className={`p-6 sm:p-8 rounded-[4px] border ${assessmentStyles.border} ${assessmentStyles.bg} shadow-[4px_4px_0px_rgba(17,17,17,0.04)] space-y-4`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider ${assessmentStyles.badgeBg} ${assessmentStyles.badgeText}`}
                >
                  {assessmentStyles.title}
                </span>
                <span className="text-xs font-mono text-[#66645E] font-semibold">
                  {result.warningIndicatorsCount} WARNING INDICATORS DETECTED
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] pt-1">
                {result.forensicDirective}
              </h2>
              <p className="text-xs sm:text-sm text-[#444748] leading-relaxed">
                {assessmentStyles.subtitle}
              </p>
            </div>

            {/* Secondary Risk Indicator Score (Section 19: Clearly labeled "Internal risk indicator score") */}
            <div className="p-4 bg-white/80 rounded-[4px] border border-black/10 shrink-0 text-center min-w-[160px]">
              <div className="text-[10px] font-mono text-[#66645E] uppercase tracking-wider font-semibold">
                Internal Risk Score
              </div>
              <div className="font-serif text-3xl font-bold text-[#111111] mt-0.5">
                {result.riskScore}
                <span className="text-xs font-sans font-normal text-[#66645E]"> / 100</span>
              </div>
              <div className="text-[10px] font-mono text-[#66645E] mt-0.5">
                Based on indicator heuristics
              </div>
            </div>
          </div>

          {/* Caveat Required by Section 7 */}
          <div className="pt-3 border-t border-black/10 flex items-start gap-2 text-xs text-[#66645E] italic">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>
              {result.assessmentCaveat ||
                'This assessment is based on observable warning signs and verification gaps. It is not a guarantee that the content is fraudulent or safe.'}
            </span>
          </div>
        </div>

        {/* 2. SCAM DNA SECTION (Section 5) */}
        <ScamDNA
          signals={result.scamDna || []}
          currentLanguage={currentLanguage}
          onOpenGuide={(guideId) => setActiveGuideId(guideId)}
        />

        {/* 3. EVIDENCE FOUND SECTION (Section 6) */}
        <EvidenceList
          claims={result.claims || []}
          currentLanguage={currentLanguage}
          extractedText={result.extractedText}
          ocrConfidence={result.ocrConfidence}
        />

        {/* 4. VERIFICATION RESULTS SECTION (Section 8) */}
        <VerificationCenter
          verification={result.verificationDetails}
          currentLanguage={currentLanguage}
        />

        {/* 5. WHY THIS MATTERS (Section 7) */}
        <div className="bg-white border border-[#E5E4DE] rounded-[4px] p-6 sm:p-7 shadow-[4px_4px_0px_rgba(17,17,17,0.04)] space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E5E4DE]">
            <span className="w-2 h-2 rounded-full bg-[#111111]" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#111111] font-semibold">
              WHY THIS MATTERS
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#333333] leading-relaxed font-sans">
            {result.whyThisMatters}
          </p>
        </div>

        {/* 6. WHAT TO DO NOW (Actionable Steps, Section 7) */}
        <div className="bg-white border border-[#E5E4DE] rounded-[4px] p-6 sm:p-7 shadow-[4px_4px_0px_rgba(17,17,17,0.04)] space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E5E4DE]">
            <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#111111] font-semibold">
              WHAT TO DO NOW: RECOMMENDED SAFE ACTIONS
            </h3>
          </div>

          <div className="space-y-2.5">
            {result.recommendedActions.map((action, idx) => (
              <div
                key={idx}
                className="p-3 rounded-[4px] bg-[#FCF9F8] border border-[#E5E4DE] text-xs font-sans text-[#111111] flex items-start gap-3"
              >
                <span className="font-mono font-bold text-[#2D6A4F]">{idx + 1}.</span>
                <span className="leading-relaxed font-medium">{action.replace(/^\d+\.\s*/, '')}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-[#66645E]">
            <span>Need immediate cyber fraud support?</span>
            <div className="flex items-center gap-3">
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#111111] font-semibold underline inline-flex items-center gap-1"
              >
                cybercrime.gov.in <ExternalLink className="w-3 h-3" />
              </a>
              <span>•</span>
              <span className="font-mono font-bold text-[#991B1B]">Helpline: 1930</span>
            </div>
          </div>
        </div>

        {/* 7. LEARN FROM THIS CASE (Connected Education, Section 14) */}
        <div className="p-6 bg-[#FCF9F8] border border-[#E5E4DE] rounded-[4px] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#66645E] font-semibold">
              INVESTOR RESILIENCE EDUCATION
            </div>
            <h4 className="font-serif text-lg font-semibold text-[#111111] mt-0.5">
              Learn how to avoid similar deception tactics in the future
            </h4>
            <p className="text-xs text-[#66645E] mt-0.5">
              Explore detailed guides on guaranteed return schemes, fake SEBI certificates, and remote-access fraud.
            </p>
          </div>

          <button
            onClick={() => onNavigate('education')}
            className="flex items-center gap-2 bg-[#111111] text-white px-5 py-2.5 rounded-[2px] text-xs font-mono font-semibold uppercase hover:bg-[#2A2A28] shrink-0 self-start sm:self-auto"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Open Education Guides</span>
          </button>
        </div>

        {/* Modal: Guide Detail */}
        {currentOpenGuide && (
          <GuideDetailModal
            guide={currentOpenGuide}
            onClose={() => setActiveGuideId(null)}
            onActionClick={() => {
              setActiveGuideId(null);
              onNavigate('education');
            }}
          />
        )}

        {/* Modal: Share */}
        {shareModalOpen && (
          <ShareModal
            isOpen={shareModalOpen}
            result={result}
            onClose={() => setShareModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};
