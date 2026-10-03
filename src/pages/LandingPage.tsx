import React from 'react';
import {
  ShieldCheck,
  ArrowRight,
  MessageSquare,
  Globe,
  BadgeCheck,
  Camera,
  AlertTriangle,
  ExternalLink,
  Lock,
  Search,
  CheckCircle2,
  Users,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { initialHistoricalDossiers, demoArchetypes } from '../data/mockData';

interface LandingPageProps {
  currentLanguage: Language;
  onNavigate: (route: string) => void;
  onSelectDossier: (dossierId: string) => void;
  onSelectTab?: (tab: 'message' | 'url' | 'screenshot' | 'broker' | 'tip') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  currentLanguage,
  onNavigate,
  onSelectDossier,
  onSelectTab,
}) => {
  const t = translations[currentLanguage];
  const specimenDossier = initialHistoricalDossiers[0];

  const handleOpenSpecimen = () => {
    onSelectDossier(specimenDossier.id);
    onNavigate('result');
  };

  const handleOpenTab = (tab: 'message' | 'url' | 'screenshot' | 'broker' | 'tip') => {
    if (onSelectTab) onSelectTab(tab);
    onNavigate('dashboard');
  };

  return (
    <div className="bg-[#FCF9F8] min-h-screen">
      {/* 1. Hero Section (Section 2 & 25) */}
      <section className="relative pt-12 pb-16 border-b border-[#E5E4DE]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#F5F4F0] border border-[#E5E4DE] text-[11px] font-mono tracking-widest text-[#111111] uppercase font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]" />
                INVESTOR FRAUD RESILIENCE PLATFORM
              </div>

              {/* Exact Hero Title from Section 25 */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#111111] leading-[1.12]">
                Before You Trust an Investment Claim,{' '}
                <span className="italic font-normal font-serif text-[#444748]">
                  Check It.
                </span>
              </h1>

              {/* Exact Subheading from Section 2 & 25 */}
              <p className="font-sans text-base sm:text-lg text-[#444748] max-w-xl leading-relaxed">
                VeriVest helps you identify scam signals, verify claims and understand what to do before you send money
                or share sensitive information.
              </p>

              {/* Dual Action CTAs from Section 25 */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handleOpenTab('message')}
                  className="flex items-center gap-2.5 bg-[#111111] text-[#FCF9F8] text-xs font-sans tracking-[0.08em] uppercase font-semibold px-6 py-3.5 rounded-[4px] hover:bg-[#2A2A28] transition-colors shadow-sm"
                >
                  <Search className="w-4 h-4" />
                  <span>CHECK A MESSAGE</span>
                </button>

                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="flex items-center gap-2 border border-[#D8D6CE] bg-transparent text-[#111111] text-xs font-sans tracking-[0.08em] uppercase font-semibold px-6 py-3.5 rounded-[4px] hover:bg-[#F5F4F0] hover:border-[#111111] transition-colors"
                >
                  <span>HOW IT WORKS</span>
                </button>
              </div>

              {/* Non-advisory safety guarantee statement */}
              <div className="pt-2 text-xs font-mono text-[#66645E]">
                Zero trading tips or broker promotions • Focused exclusively on fraud detection and investor safety
              </div>
            </div>

            {/* Right Column: Interactive Specimen Preview Card */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-[#E5E4DE] rounded-[4px] p-6 shadow-[6px_6px_0px_rgba(17,17,17,0.06)] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E4DE] text-[10px] font-mono uppercase text-[#66645E]">
                  <span className="font-bold text-[#111111]">SAMPLE ASSESSMENT CASE STUDY</span>
                  <span>RECORD #{specimenDossier.id}</span>
                </div>

                {/* Example Flow: Suspicious message -> 5 warning indicators -> Verification gaps -> Safe next steps */}
                <div className="p-3.5 rounded-[4px] bg-[#FCF9F8] border border-[#E5E4DE] text-xs font-mono text-[#111111]">
                  "🚨 Guaranteed 40% returns in 7 days! Only 10 spots left. Transfer to UPI: abcwealth@okaxis"
                </div>

                <div className="space-y-2.5 pt-1 text-xs">
                  <div className="flex items-center justify-between p-2 rounded bg-[#FEF2F2] border border-[#F87171] text-[#991B1B] font-mono">
                    <span className="font-bold">ASSESSMENT: HIGH CONCERN</span>
                    <span>4 WARNING SIGNALS</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="p-2 rounded bg-[#FCF9F8] border border-[#E5E4DE]">
                      <span className="text-[#66645E] block">SCAM DNA:</span>
                      <span className="font-bold text-[#111111]">Guaranteed Yield + Urgency</span>
                    </div>
                    <div className="p-2 rounded bg-[#FCF9F8] border border-[#E5E4DE]">
                      <span className="text-[#66645E] block">VERIFICATION:</span>
                      <span className="font-bold text-[#991B1B]">Unindexed SEBI Token</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-[#E8F5EE] border border-[#2D6A4F]/30 text-[#1B4332] text-xs">
                    <strong>Safe Action:</strong> Do not wire funds. Verify license directly on sebi.gov.in before
                    committing capital.
                  </div>
                </div>

                <button
                  onClick={handleOpenSpecimen}
                  className="w-full bg-[#111111] text-white py-2.5 rounded-[2px] text-xs font-mono font-semibold uppercase hover:bg-[#2A2A28] flex items-center justify-center gap-1.5"
                >
                  <span>View Full Explainable Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Primary 4-Stage Journey: Detect → Understand → Verify → Act Safely (Section 3 & 25) */}
      <section className="py-16 border-b border-[#E5E4DE] bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#66645E] uppercase font-semibold">
              THE VERIVEST DEFENSE CYCLE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111111]">
              Detect. Understand. Verify. Act Safely.
            </h2>
            <p className="text-xs sm:text-sm text-[#444748]">
              Empowering individual investors to pause and make informed decisions instead of falling for high-pressure
              tactics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-[4px] border border-[#E5E4DE] bg-[#FCF9F8] space-y-3">
              <span className="font-mono text-2xl font-bold text-[#111111]">01</span>
              <h3 className="font-serif text-lg font-semibold text-[#111111]">Detect Warning Signs</h3>
              <p className="text-xs text-[#66645E] leading-relaxed">
                Scan messages, links, screenshots, or tip groups to uncover 17 distinct Scam DNA signals like guaranteed
                returns and personal UPI collection.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-[4px] border border-[#E5E4DE] bg-[#FCF9F8] space-y-3">
              <span className="font-mono text-2xl font-bold text-[#111111]">02</span>
              <h3 className="font-serif text-lg font-semibold text-[#111111]">Understand Why It Matters</h3>
              <p className="text-xs text-[#66645E] leading-relaxed">
                Read clear explanations of how urgency, fake scarcity, and advance-fee schemes work to trick ordinary
                investors.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-[4px] border border-[#E5E4DE] bg-[#FCF9F8] space-y-3">
              <span className="font-mono text-2xl font-bold text-[#111111]">03</span>
              <h3 className="font-serif text-lg font-semibold text-[#111111]">Verify the Claim</h3>
              <p className="text-xs text-[#66645E] leading-relaxed">
                Check whether claimed registration numbers or entities match verified benchmark records—with zero fake
                live government lookups.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-[4px] border border-[#E5E4DE] bg-[#FCF9F8] space-y-3">
              <span className="font-mono text-2xl font-bold text-[#111111]">04</span>
              <h3 className="font-serif text-lg font-semibold text-[#111111]">Take Safer Action</h3>
              <p className="text-xs text-[#66645E] leading-relaxed">
                Follow concrete protection steps: refuse remote-access apps, verify on official portals, or file
                reports with 1930 / cybercrime.gov.in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Demo Modes Showcase Section */}
      <section className="py-16 border-b border-[#E5E4DE]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#991B1B] font-semibold">
                HANDS-ON SIMULATION
              </span>
              <h2 className="font-serif text-3xl font-semibold text-[#111111] mt-1">
                Explore Realistic Demo Scenarios
              </h2>
            </div>

            <button
              onClick={() => onNavigate('simulator')}
              className="text-xs font-mono font-semibold uppercase text-[#111111] underline hover:text-[#444748] self-start md:self-auto"
            >
              Test Your Scam Sense Simulator →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {demoArchetypes.map((demo) => (
              <div
                key={demo.id}
                className="bg-white border border-[#E5E4DE] rounded-[4px] p-6 shadow-[4px_4px_0px_rgba(17,17,17,0.04)] flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase bg-[#FEE2E2] text-[#991B1B] px-2 py-0.5 rounded-[2px] font-bold">
                    {demo.category}
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-[#111111] mt-3">{demo.label}</h3>
                  <p className="text-xs font-mono text-[#66645E] mt-2 line-clamp-3 bg-[#FCF9F8] p-3 rounded border border-[#E5E4DE]">
                    "{demo.content}"
                  </p>
                </div>

                <button
                  onClick={() => {
                    handleOpenTab(demo.type);
                  }}
                  className="mt-4 w-full bg-[#111111] text-white py-2 rounded-[2px] text-xs font-mono font-semibold uppercase hover:bg-[#2A2A28]"
                >
                  Load into Scanner
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Pre-Payment Checklist Banner */}
      <section className="py-14 bg-white border-b border-[#E5E4DE]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-[4px] bg-[#FCF9F8] border border-[#E5E4DE] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[4px_4px_0px_rgba(17,17,17,0.03)]">
            <div className="space-y-2 max-w-xl">
              <span className="text-[10px] font-mono uppercase text-[#2D6A4F] font-bold tracking-wider">
                SAFETY PROTOCOL
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#111111]">
                About to send money? Run the 9-Question Checklist first.
              </h3>
              <p className="text-xs text-[#66645E] leading-relaxed">
                60 seconds of honest reflection can protect you from advance-fee traps, personal UPI routing, and fake
                advisor impersonation.
              </p>
            </div>

            <button
              onClick={() => onNavigate('before-you-pay')}
              className="bg-[#111111] text-white px-6 py-3 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#2A2A28] shrink-0 self-start md:self-auto"
            >
              OPEN BEFORE YOU PAY CHECKLIST →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
