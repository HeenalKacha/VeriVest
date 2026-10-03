import React from 'react';
import {
  ShieldCheck,
  Search,
  FileText,
  CheckCircle,
  AlertTriangle,
  Lock,
  ArrowRight,
  Shield,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface HowItWorksPageProps {
  currentLanguage: Language;
  onNavigate: (route: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
  currentLanguage,
  onNavigate,
}) => {
  const t = translations[currentLanguage];
  const isHi = currentLanguage === 'hi';
  const isMr = currentLanguage === 'mr';

  // 4 steps as required in Section 26: STEP 01 Submit, STEP 02 Detect, STEP 03 Verify, STEP 04 Protect
  const steps = [
    {
      num: 'STEP 01',
      title: isHi ? 'जमा करें (SUBMIT)' : 'Submit',
      badge: 'INPUT INGESTION',
      description: isHi
        ? 'संदिग्ध व्हाट्सएप संदेश, टेलीग्राम टिप, ब्रोकर वेबसाइट लिंक, या स्क्रीनशॉट सबमिट करें। संवेदनशील पासवर्ड या ओटीपी स्वतः पहचान कर चेतावनी दी जाती है।'
        : 'Paste an investment message, upload a screenshot, provide a website link, or input a claimed broker name/registration number. Sensitive credentials like OTPs are flagged for removal.',
    },
    {
      num: 'STEP 02',
      title: isHi ? 'संकेत पहचानें (DETECT)' : 'Detect',
      badge: 'SCAM DNA ANALYSIS',
      description: isHi
        ? 'हमारा नियम-आधारित इंजन 17 अलग-अलग स्कैम डीएनए संकेतों का विश्लेषण करता है—जैसे गारंटीड 30-50% रिटर्न, कृत्रिम जल्दबाजी, और व्यक्तिगत यूपीआई मांग।'
        : 'Our deterministic rule engine identifies behavioral signals across 17 Scam DNA vectors: guaranteed returns, FOMO scarcity, personal UPI requests, advance fee traps, and remote-access demands.',
    },
    {
      num: 'STEP 03',
      title: isHi ? 'सत्यापित करें (VERIFY)' : 'Verify',
      badge: 'TRANSPARENT CROSS-REFERENCE',
      description: isHi
        ? 'दावा की गई संस्था और रजिस्ट्रेशन नंबर की सार्वजनिक बेंचमार्क रिकॉर्ड से जांच की जाती है। यदि कोई लाइव सरकारी कनेक्शन नहीं है, तो हम ईमानदारी से "सत्यापन उपलब्ध नहीं" दिखाते हैं।'
        : 'Claimed entity names, registration tokens, and domain structures are checked against benchmark indexes and regulatory syntax rules. We never fabricate live government queries.',
    },
    {
      num: 'STEP 04',
      title: isHi ? 'सुरक्षित रहें (PROTECT)' : 'Protect',
      badge: 'ACTIONABLE DEFENSE',
      description: isHi
        ? 'आपको स्पष्ट और व्यावहारिक सुरक्षा कदम दिए जाते हैं—जैसे पैसे न भेजना, AnyDesk न लेना, और सेबी या साइबर हेल्पलाइन 1930 पर रिपोर्ट करना।'
        : 'Receive clear, actionable steps: do not transfer funds, refuse screen-sharing applications, verify independently on sebi.gov.in, or report to the National Cyber Crime Portal (1930).',
    },
  ];

  return (
    <div className="bg-[#FCF9F8] min-h-screen py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#2D6A4F] uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]" />
            FOUR-STEP RESILIENCE METHODOLOGY
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#111111]">
            How VeriVest Works
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#444748] leading-relaxed">
            A transparent 4-step pipeline designed to give ordinary investors clarity before sending money or sharing
            sensitive credentials.
          </p>
        </div>

        {/* 4 Steps Grid (Section 26) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-white border border-[#E5E4DE] rounded-[4px] p-8 shadow-[4px_4px_0px_rgba(17,17,17,0.04)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E4DE] mb-4">
                  <span className="font-mono text-sm font-bold text-[#111111]">{step.num}</span>
                  <span className="text-[10px] font-mono tracking-wider text-[#2D6A4F] bg-[#E8F5EE] px-2.5 py-0.5 rounded-[2px] font-bold uppercase">
                    {step.badge}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-[#111111] mb-2">{step.title}</h3>
                <p className="font-sans text-xs sm:text-sm text-[#66645E] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#E5E4DE] flex items-center justify-between text-[11px] font-mono text-[#66645E]">
                <span>VERIVEST INVESTOR SAFETY FRAMEWORK</span>
                <Shield className="w-4 h-4 text-[#2D6A4F]" />
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Transparency & Limitations Statement (Section 26 & 18) */}
        <div className="p-6 rounded-[4px] bg-[#FFF8F0] border border-[#FDBA74] space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#9A3412] uppercase">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Important Product Mandate & Limitations</span>
          </div>
          <p className="text-xs text-[#9A3412] leading-relaxed font-sans">
            <strong>VeriVest does not determine with certainty that a person, company or message is fraudulent.</strong>{' '}
            Automated analysis detects observable warning signs, linguistic patterns, and verification gaps. It does not
            replace official regulatory registries or legal counsel. We never fabricate live external database lookups
            or guarantee investment returns.
          </p>
        </div>

        {/* CTA Banner */}
        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="inline-flex items-center gap-2 bg-[#111111] text-white px-8 py-3.5 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#2A2A28]"
          >
            <span>TRY VERIVEST NOW</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
