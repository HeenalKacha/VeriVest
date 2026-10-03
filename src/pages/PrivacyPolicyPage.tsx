import React from 'react';
import { ArrowLeft, Shield, Lock, FileText, UserCheck, AlertCircle, Database } from 'lucide-react';
import { Language } from '../types';

interface PrivacyPolicyPageProps {
  currentLanguage: Language;
  onNavigateHome: () => void;
  onOpenCookiePolicy: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({
  currentLanguage,
  onNavigateHome,
  onOpenCookiePolicy,
}) => {
  const isHi = currentLanguage === 'hi';

  const sections = [
    {
      icon: <Database className="w-4 h-4 text-[#111111]" />,
      title: '1. Information We Collect & Process',
      content:
        'When you use VeriVest to evaluate suspicious investment pitches, we process: (a) submitted query text, URLs, and broker registration numbers; (b) uploaded screenshots processed client-side through character extraction; and (c) basic profile metadata (Full Name, Contact Number, Email, Age, Gender) used to personalize educational badges and maintain secure session access.',
    },
    {
      icon: <Lock className="w-4 h-4 text-[#111111]" />,
      title: '2. Zero Commercial Monetization Invariant',
      content:
        'VeriVest operates with a strict investor-protection charter. We never monetize, sell, lease, or syndicate user prompts, financial inquiries, contact numbers, or scanned screenshots to commercial advertising brokers, predatory lending platforms, or third-party marketing companies.',
    },
    {
      icon: <Shield className="w-4 h-4 text-[#111111]" />,
      title: '3. Cloud Storage & Firebase Security Rules',
      content:
        'Your profile and scan dossiers are persisted securely in Google Cloud Firebase Firestore databases. Attribute-Based Access Control (ABAC) security rules strictly guarantee that only your authenticated Google or email credentials can read, list, or delete your personal scan history.',
    },
    {
      icon: <UserCheck className="w-4 h-4 text-[#111111]" />,
      title: '4. Rights Under Digital Personal Data Protection Act (DPDPA)',
      content:
        'As an investor and Data Principal, you maintain unconditional rights to: (a) Access and export your full scan ledger; (b) Rectify inaccurate profile contact information; (c) Permanently delete your scan history anytime using the in-app Scan History manager; and (d) Revoke Google Sign-In authorizations immediately.',
    },
    {
      icon: <FileText className="w-4 h-4 text-[#111111]" />,
      title: '5. Regulatory Verification Lookups',
      content:
        'When you verify claimed entities (e.g. SEBI Research Analysts, Registered Investment Advisors, or Stock Broker memberships), VeriVest queries public regulatory databases solely to corroborate licensing status. Your personal identity is never shared with third-party brokers during these lookups.',
    },
    {
      icon: <AlertCircle className="w-4 h-4 text-[#111111]" />,
      title: '6. Grievance Officer & Contact',
      content:
        'If you have questions regarding personal data privacy, algorithmic fraud assessment transparency, or wish to submit a data erasure inquiry, contact our Data Protection Office at: privacy@verivest.org (Ref: Investor Protection Desk, Mumbai / New Delhi, India).',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FCF9F8] text-[#111111] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-[#E5E4DE] pb-4">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-xs font-mono font-semibold uppercase text-[#111111] hover:text-[#444748] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isHi ? 'वापस जाएं (Back to Scan)' : 'Back to Verification Dashboard'}</span>
          </button>

          <span className="text-[11px] font-mono text-[#66645E] uppercase tracking-wider">
            LEGAL STANDARD #PP-2026
          </span>
        </div>

        {/* Title Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#F5F4F0] border border-[#E5E4DE] text-xs font-mono text-[#111111] font-semibold">
            <Shield className="w-3.5 h-3.5 text-[#2D6A4F]" />
            <span>INVESTOR DATA CHARTER</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#111111]">
            {isHi ? 'गोपनीयता नीति (Privacy Policy)' : 'Investor Privacy Policy'}
          </h1>
          <p className="text-sm font-sans text-[#444748] leading-relaxed max-w-2xl">
            {isHi
              ? 'VeriVest का डेटा संरक्षण फ्रेमवर्क यह सुनिश्चित करता है कि आपके वित्तीय प्रश्न, संदेश और व्यक्तिगत संपर्क विवरण पूरी तरह से सुरक्षित और गोपनीय रहें।'
              : 'VeriVest is engineered around zero-knowledge principles for retail investors. Your submitted messages, regulatory inquiries, and personal details remain strictly protected.'}
          </p>
          <div className="text-[11px] font-mono text-[#66645E]">
            Effective Date: October 2026 • Compliant with Indian DPDPA & Global Privacy Standards
          </div>
        </div>

        {/* Sections list */}
        <div className="space-y-4">
          {sections.map((sec, idx) => (
            <div
              key={idx}
              className="p-6 rounded-[4px] border border-[#E5E4DE] bg-white space-y-2 hover:border-[#111111] transition-colors shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-[#F5F4F0] border border-[#E5E4DE] flex items-center justify-center shrink-0">
                  {sec.icon}
                </div>
                <h2 className="font-serif text-base sm:text-lg font-bold text-[#111111]">
                  {sec.title}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#444748] font-sans leading-relaxed pl-9">
                {sec.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="p-6 rounded-[4px] border border-[#E5E4DE] bg-[#FAF8F5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-sans text-[#66645E]">
            Looking for specific browser storage details? Review our{' '}
            <button
              onClick={onOpenCookiePolicy}
              className="text-[#111111] font-bold underline hover:text-black cursor-pointer"
            >
              Cookie Policy
            </button>
            .
          </div>

          <button
            onClick={onNavigateHome}
            className="px-5 py-2.5 rounded-[4px] bg-[#111111] text-white text-xs font-mono font-bold uppercase hover:bg-[#2A2A28] transition-colors cursor-pointer"
          >
            Acknowledge & Continue
          </button>
        </div>
      </div>
    </div>
  );
};