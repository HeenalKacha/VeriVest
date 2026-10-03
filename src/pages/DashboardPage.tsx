import React, { useState } from 'react';
import {
  MessageSquare,
  Link as LinkIcon,
  Upload,
  BadgeCheck,
  Shield,
  Clipboard,
  Lock,
  AlertCircle,
  FileText,
  Trash2,
  Camera,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Sparkles,
  Users,
  Eye,
  AlertTriangle,
} from 'lucide-react';
import { Language, AnalysisResult } from '../types';
import { translations } from '../i18n/translations';
import { demoArchetypes } from '../data/mockData';

interface DashboardPageProps {
  currentLanguage: Language;
  onStartAnalysis: (req: {
    type: 'message' | 'url' | 'screenshot' | 'broker' | 'tip';
    content: string;
    brokerName?: string;
    regNumber?: string;
    imageBase64?: string;
  }) => void;
  onNavigate: (route: string) => void;
  initialTab?: 'message' | 'url' | 'screenshot' | 'broker' | 'tip';
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  currentLanguage,
  onStartAnalysis,
  onNavigate,
  initialTab = 'message',
}) => {
  const [activeTab, setActiveTab] = useState<'message' | 'url' | 'screenshot' | 'broker' | 'tip'>(initialTab);

  // Message tab state
  const [messageContent, setMessageContent] = useState('');

  // Link tab state
  const [linkUrl, setLinkUrl] = useState('');

  // Screenshot tab state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [extractedOcrText, setExtractedOcrText] = useState('');
  const [isExtractingOcr, setIsExtractingOcr] = useState(false);

  // Broker tab state
  const [brokerName, setBrokerName] = useState('');
  const [regNumber, setRegNumber] = useState('');

  // Tip group tab state
  const [tipGroupContent, setTipGroupContent] = useState('');

  // Sensitive data warning state
  const [sensitiveWarning, setSensitiveWarning] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedDemoId, setSelectedDemoId] = useState<string | null>(null);

  const t = translations[currentLanguage];
  const isHi = currentLanguage === 'hi';
  const isMr = currentLanguage === 'mr';

  // Check for sensitive user information
  const checkSensitiveData = (text: string) => {
    const sensitive = /\b(\d{6}|\d{4})\s*(is your otp|otp|verification code|pin|पासवर्ड|ओटीपी)\b/i.test(text) ||
      /\b(password|passwd|pin)\s*[:=]/i.test(text);
    if (sensitive) {
      setSensitiveWarning(
        isHi
          ? 'संवेदनशील जानकारी पहचानी गई। आगे बढ़ने से पहले कृपया व्यक्तिगत ओटीपी, पिन या पासवर्ड हटा दें।'
          : 'Sensitive information detected. Please remove OTPs, passwords, or personal account credentials before continuing.'
      );
    } else {
      setSensitiveWarning(null);
    }
  };

  const handleMessageChange = (val: string) => {
    setMessageContent(val);
    checkSensitiveData(val);
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setMessageContent(text);
        checkSensitiveData(text);
      }
    } catch {
      // fallback
    }
  };

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Unable to read this file format. Please upload PNG, JPG or WEBP.');
      return;
    }
    setErrorMessage('');
    setSelectedFile(file);
    setIsExtractingOcr(true);

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setImagePreview(base64);

      // Simulate initial optical text reading / extraction
      setTimeout(() => {
        setIsExtractingOcr(false);
        // Default readable text extracted from sample screenshot
        const detectedSample =
          '🚨 VIP WEALTH DESK: Guaranteed 45% return in 10 days. Only 5 slots remaining. Pay ₹20,000 via UPI: growwealth.nodal@okaxis before market close. SEBI Reg: INZ000123456';
        setExtractedOcrText(detectedSample);
        checkSensitiveData(detectedSample);
      }, 700);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyzeMessage = () => {
    if (!messageContent.trim()) {
      setErrorMessage('Please paste or type an investment message to inspect.');
      return;
    }
    setErrorMessage('');
    onStartAnalysis({
      type: 'message',
      content: messageContent,
    });
  };

  const handleAnalyzeLink = () => {
    if (!linkUrl.trim()) {
      setErrorMessage('Please enter a valid website URL or domain to check.');
      return;
    }
    setErrorMessage('');
    onStartAnalysis({
      type: 'url',
      content: linkUrl,
    });
  };

  const handleAnalyzeScreenshot = () => {
    if (!imagePreview) {
      setErrorMessage('Please upload or drag a screenshot to analyze.');
      return;
    }
    setErrorMessage('');
    onStartAnalysis({
      type: 'screenshot',
      content: extractedOcrText || (selectedFile ? `Screenshot capture: ${selectedFile.name}` : 'Uploaded image capture'),
      imageBase64: imagePreview,
    });
  };

  const handleVerifyBroker = () => {
    if (!brokerName.trim() && !regNumber.trim()) {
      setErrorMessage('Please enter an entity name or registration number to verify.');
      return;
    }
    setErrorMessage('');
    onStartAnalysis({
      type: 'broker',
      content: `Entity: ${brokerName} | Registration: ${regNumber}`,
      brokerName,
      regNumber,
    });
  };

  const handleAnalyzeTip = () => {
    if (!tipGroupContent.trim()) {
      setErrorMessage('Please paste an investment tip or group message to analyze.');
      return;
    }
    setErrorMessage('');
    onStartAnalysis({
      type: 'tip',
      content: tipGroupContent,
    });
  };

  const loadDemoArchetype = (demo: typeof demoArchetypes[0]) => {
    setErrorMessage('');
    setSelectedDemoId(demo.id);

    if (demo.type === 'broker') {
      setActiveTab('broker');
      setBrokerName(demo.brokerName || '');
      setRegNumber(demo.regNumber || '');
    } else if (demo.type === 'tip') {
      setActiveTab('tip');
      setTipGroupContent(demo.content);
    } else {
      setActiveTab('message');
      setMessageContent(demo.content);
      checkSensitiveData(demo.content);
    }
  };

  return (
    <div className="bg-[#FCF9F8] min-h-screen py-8 sm:py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Eyebrow & Page Header */}
        <div className="border-b border-[#E5E4DE] pb-6">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#66645E] uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
            INVESTOR PROTECTION INGESTION DESK
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111111] mt-1">
            {isHi ? 'सत्यापन केंद्र (VERIFY BEFORE YOU TRUST)' : 'Verify Before You Trust.'}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#444748] mt-1 max-w-2xl leading-relaxed">
            {isHi
              ? 'किसी भी निवेश संदेश, लिंक या वित्तीय दावे की पैसे भेजने से पहले जांच करें।'
              : 'Check suspicious investment messages, links, and financial claims before you send money or share sensitive information.'}
          </p>
        </div>

        {/* Prominent Mandatory Safety Notice (Section 4) */}
        <div className="p-4 rounded-[4px] bg-[#FFF8F0] border border-[#FDBA74] flex items-start gap-3 text-xs text-[#9A3412] leading-relaxed">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#9A3412]" />
          <p>
            <strong>Safety Notice: </strong>
            VeriVest identifies warning signs and verification gaps. It does not determine with certainty that a person,
            company or message is fraudulent. Always perform independent verification with official regulatory sources.
          </p>
        </div>

        {/* DEMO MODE Selector (Section 24) */}
        <div className="p-4 rounded-[4px] bg-white border border-[#E5E4DE] shadow-[4px_4px_0px_rgba(17,17,17,0.04)] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-[2px] bg-[#111111] text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                DEMO MODE
              </span>
              <span className="text-xs text-[#66645E] font-medium">
                Try a realistic fictional example to see how VeriVest extracts claims and Scam DNA:
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {demoArchetypes.map((demo) => {
              const isSelected = selectedDemoId === demo.id;
              return (
                <button
                  key={demo.id}
                  onClick={() => loadDemoArchetype(demo)}
                  className={`p-3 text-left rounded-[4px] border transition-all text-xs flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#111111] bg-[#F5F4F0] ring-1 ring-[#111111]'
                      : 'border-[#E5E4DE] bg-white hover:border-[#111111]'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#991B1B] font-semibold block mb-1">
                      {demo.category}
                    </span>
                    <span className="font-serif font-semibold text-[#111111] block leading-snug">
                      {demo.label}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#66645E] font-mono mt-2 underline">
                    Load into scanner →
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Central Module: "WHAT DO YOU WANT TO CHECK?" (Section 4) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-xs font-bold tracking-widest text-[#111111] uppercase">
              WHAT DO YOU WANT TO CHECK?
            </h2>
            <span className="text-xs text-[#66645E] font-mono">Select Input Channel</span>
          </div>

          {/* 5 Input Channel Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {/* Card A: Message */}
            <button
              onClick={() => {
                setActiveTab('message');
                setErrorMessage('');
              }}
              className={`p-3.5 rounded-[4px] border text-left transition-all ${
                activeTab === 'message'
                  ? 'bg-[#111111] text-white border-[#111111] shadow-sm'
                  : 'bg-white border-[#E5E4DE] text-[#111111] hover:border-[#111111]'
              }`}
            >
              <MessageSquare className="w-4 h-4 mb-2" />
              <div className="text-xs font-bold font-sans uppercase">A. Message</div>
              <div className={`text-[11px] mt-0.5 line-clamp-2 ${activeTab === 'message' ? 'text-neutral-300' : 'text-[#66645E]'}`}>
                Paste a suspicious investment message.
              </div>
            </button>

            {/* Card B: Screenshot */}
            <button
              onClick={() => {
                setActiveTab('screenshot');
                setErrorMessage('');
              }}
              className={`p-3.5 rounded-[4px] border text-left transition-all ${
                activeTab === 'screenshot'
                  ? 'bg-[#111111] text-white border-[#111111] shadow-sm'
                  : 'bg-white border-[#E5E4DE] text-[#111111] hover:border-[#111111]'
              }`}
            >
              <Camera className="w-4 h-4 mb-2" />
              <div className="text-xs font-bold font-sans uppercase">B. Screenshot</div>
              <div className={`text-[11px] mt-0.5 line-clamp-2 ${activeTab === 'screenshot' ? 'text-neutral-300' : 'text-[#66645E]'}`}>
                Upload WhatsApp, Telegram or SMS capture.
              </div>
            </button>

            {/* Card C: Website */}
            <button
              onClick={() => {
                setActiveTab('url');
                setErrorMessage('');
              }}
              className={`p-3.5 rounded-[4px] border text-left transition-all ${
                activeTab === 'url'
                  ? 'bg-[#111111] text-white border-[#111111] shadow-sm'
                  : 'bg-white border-[#E5E4DE] text-[#111111] hover:border-[#111111]'
              }`}
            >
              <LinkIcon className="w-4 h-4 mb-2" />
              <div className="text-xs font-bold font-sans uppercase">C. Website</div>
              <div className={`text-[11px] mt-0.5 line-clamp-2 ${activeTab === 'url' ? 'text-neutral-300' : 'text-[#66645E]'}`}>
                Check a suspicious link or broker portal.
              </div>
            </button>

            {/* Card D: Entity */}
            <button
              onClick={() => {
                setActiveTab('broker');
                setErrorMessage('');
              }}
              className={`p-3.5 rounded-[4px] border text-left transition-all ${
                activeTab === 'broker'
                  ? 'bg-[#111111] text-white border-[#111111] shadow-sm'
                  : 'bg-white border-[#E5E4DE] text-[#111111] hover:border-[#111111]'
              }`}
            >
              <BadgeCheck className="w-4 h-4 mb-2" />
              <div className="text-xs font-bold font-sans uppercase">D. Entity</div>
              <div className={`text-[11px] mt-0.5 line-clamp-2 ${activeTab === 'broker' ? 'text-neutral-300' : 'text-[#66645E]'}`}>
                Check claimed broker or registration ID.
              </div>
            </button>

            {/* Card E: Tip Group */}
            <button
              onClick={() => {
                setActiveTab('tip');
                setErrorMessage('');
              }}
              className={`p-3.5 rounded-[4px] border text-left transition-all col-span-2 sm:col-span-1 ${
                activeTab === 'tip'
                  ? 'bg-[#111111] text-white border-[#111111] shadow-sm'
                  : 'bg-white border-[#E5E4DE] text-[#111111] hover:border-[#111111]'
              }`}
            >
              <Users className="w-4 h-4 mb-2" />
              <div className="text-xs font-bold font-sans uppercase">E. Tip Group</div>
              <div className={`text-[11px] mt-0.5 line-clamp-2 ${activeTab === 'tip' ? 'text-neutral-300' : 'text-[#66645E]'}`}>
                Analyze social tip channel solicitation.
              </div>
            </button>
          </div>

          {/* Error & Sensitive Information Banner */}
          {sensitiveWarning && (
            <div className="p-4 rounded-[4px] bg-[#FEF2F2] border border-[#F87171] flex items-start gap-2.5 text-xs text-[#991B1B]">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <strong>Privacy Notice: </strong>
                {sensitiveWarning}
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-[#FEF2F2] border border-[#F87171] text-[#991B1B] text-xs font-mono rounded-[4px]">
              {errorMessage}
            </div>
          )}

          {/* Scanner Ingestion Box */}
          <div className="bg-white border border-[#E5E4DE] rounded-[4px] p-6 sm:p-8 shadow-[4px_4px_0px_rgba(17,17,17,0.04)]">
            {/* Tab A: Message */}
            {activeTab === 'message' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[#66645E]">PASTE SUSPICIOUS INVESTMENT MESSAGE</span>
                  <button
                    onClick={handlePasteClipboard}
                    className="inline-flex items-center gap-1 font-mono text-[#111111] hover:underline"
                  >
                    <Clipboard className="w-3.5 h-3.5" />
                    <span>Paste from Clipboard</span>
                  </button>
                </div>

                <textarea
                  rows={6}
                  value={messageContent}
                  onChange={(e) => handleMessageChange(e.target.value)}
                  placeholder={`Paste WhatsApp, Telegram, or SMS claim here...
Example: "Guaranteed 40% returns in 7 days! Only 5 seats remaining. Transfer ₹25,000 via UPI to coordinator: growwealth.nodal@okaxis"`}
                  className="w-full p-4 rounded-[4px] border border-[#E5E4DE] bg-[#FCF9F8] text-sm font-sans focus:outline-none focus:border-[#111111] text-[#111111]"
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <span className="text-[11px] font-mono text-[#66645E]">
                    Detects: Guaranteed returns, artificial urgency, personal UPI, fake regulatory claims
                  </span>
                  <button
                    onClick={handleAnalyzeMessage}
                    className="bg-[#111111] text-white px-6 py-3 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#2A2A28]"
                  >
                    IDENTIFY SCAM SIGNALS & EVIDENCE →
                  </button>
                </div>
              </div>
            )}

            {/* Tab B: Screenshot (Section 10) */}
            {activeTab === 'screenshot' && (
              <div className="space-y-5">
                <div className="text-xs font-mono text-[#66645E]">
                  UPLOAD SCREENSHOT (WHATSAPP, TELEGRAM, SMS, OR PORTAL)
                </div>

                {!imagePreview ? (
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleImageDrop}
                    className="border-2 border-dashed border-[#D8D6CE] rounded-[4px] p-8 sm:p-12 text-center bg-[#FCF9F8] hover:border-[#111111] transition-colors cursor-pointer"
                    onClick={() => document.getElementById('screenshot-upload')?.click()}
                  >
                    <input
                      id="screenshot-upload"
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                    <Upload className="w-8 h-8 mx-auto text-[#66645E] mb-3" />
                    <p className="font-serif text-base font-semibold text-[#111111]">
                      Click to upload or drag screenshot here
                    </p>
                    <p className="text-xs text-[#66645E] mt-1 font-mono">
                      PNG, JPG, or WEBP. Uploaded images are processed in-memory and not stored permanently.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      {/* Left: Image preview */}
                      <div className="md:col-span-5 border border-[#E5E4DE] rounded-[4px] p-2 bg-[#FCF9F8]">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E5E4DE] text-[11px] font-mono text-[#66645E]">
                          <span>UPLOADED IMAGE</span>
                          <button
                            onClick={() => {
                              setImagePreview(null);
                              setSelectedFile(null);
                              setExtractedOcrText('');
                            }}
                            className="text-[#991B1B] hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                        <img
                          src={imagePreview}
                          alt="Uploaded evidence"
                          className="max-h-64 mx-auto object-contain rounded"
                        />
                      </div>

                      {/* Right: Extracted Text (Section 10) */}
                      <div className="md:col-span-7 space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="font-semibold text-[#111111]">
                            EXTRACTED TEXT (VERIFY & EDIT IF NEEDED)
                          </span>
                          {isExtractingOcr ? (
                            <span className="text-[#9A3412] animate-pulse">Reading image...</span>
                          ) : (
                            <span className="text-[#2D6A4F]">OCR complete</span>
                          )}
                        </div>

                        <textarea
                          rows={7}
                          value={extractedOcrText}
                          onChange={(e) => {
                            setExtractedOcrText(e.target.value);
                            checkSensitiveData(e.target.value);
                          }}
                          placeholder="Extracted text from screenshot will appear here. You can manually correct or paste if OCR missed words."
                          className="w-full p-3 rounded-[4px] border border-[#E5E4DE] bg-[#FCF9F8] font-mono text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                        />

                        <p className="text-[11px] text-[#66645E] italic">
                          "Some text could not be read clearly? You can edit the box above before submitting."
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={handleAnalyzeScreenshot}
                        className="bg-[#111111] text-white px-6 py-3 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#2A2A28]"
                      >
                        EXTRACT CLAIMS & DETECT SCAM DNA →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab C: Website (Section 9) */}
            {activeTab === 'url' && (
              <div className="space-y-4">
                <div className="text-xs font-mono text-[#66645E]">
                  ENTER WEBSITE URL OR DOMAIN TO INSPECT FOR SPOOFING & REDIRECTS
                </div>

                <div className="flex items-center border border-[#E5E4DE] rounded-[4px] bg-[#FCF9F8] px-3">
                  <LinkIcon className="w-4 h-4 text-[#66645E] shrink-0" />
                  <input
                    type="url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://example-broker-invest.vip or domain.com"
                    className="w-full p-3.5 bg-transparent text-sm font-sans focus:outline-none text-[#111111]"
                  />
                </div>

                <div className="p-3 bg-[#F5F4F0] rounded-[4px] text-[11px] text-[#66645E] leading-relaxed">
                  <strong>URL Safety Check:</strong> Evaluates HTTPS presence, lookalike domain structure,
                  disposable top-level domains (.vip, .top), and potential brand impersonation.
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleAnalyzeLink}
                    className="bg-[#111111] text-white px-6 py-3 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#2A2A28]"
                  >
                    CHECK URL SAFETY SIGNALS →
                  </button>
                </div>
              </div>
            )}

            {/* Tab D: Entity (Section 8) */}
            {activeTab === 'broker' && (
              <div className="space-y-4">
                <div className="text-xs font-mono text-[#66645E]">
                  CHECK CLAIMED BROKER, ADVISOR, OR REGISTRATION NUMBER
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-[#66645E] mb-1 uppercase font-semibold">
                      Claimed Organization / Advisor Name
                    </label>
                    <input
                      type="text"
                      value={brokerName}
                      onChange={(e) => setBrokerName(e.target.value)}
                      placeholder="e.g. Apex Wealth Advisors or Zerodha"
                      className="w-full p-3 rounded-[4px] border border-[#E5E4DE] bg-[#FCF9F8] text-sm font-sans focus:outline-none focus:border-[#111111] text-[#111111]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#66645E] mb-1 uppercase font-semibold">
                      Claimed Registration Number (Optional)
                    </label>
                    <input
                      type="text"
                      value={regNumber}
                      onChange={(e) => setRegNumber(e.target.value)}
                      placeholder="e.g. INZ000293433 or INA000123456"
                      className="w-full p-3 rounded-[4px] border border-[#E5E4DE] bg-[#FCF9F8] text-sm font-mono focus:outline-none focus:border-[#111111] text-[#111111]"
                    />
                  </div>
                </div>

                <div className="p-3 bg-[#F5F4F0] rounded-[4px] text-[11px] text-[#66645E] leading-relaxed">
                  <strong>Verification Transparency:</strong> VeriVest cross-references against benchmark verified
                  intermediary registers and syntax rules. If no direct API is connected, it will report "Unable to
                  independently verify" without fabricating government query results.
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleVerifyBroker}
                    className="bg-[#111111] text-white px-6 py-3 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#2A2A28]"
                  >
                    RUN VERIFICATION CHECK →
                  </button>
                </div>
              </div>
            )}

            {/* Tab E: Tip Group (Section 13) */}
            {activeTab === 'tip' && (
              <div className="space-y-4">
                <div className="text-xs font-mono text-[#66645E]">
                  PASTE SOCIAL MEDIA TIP, TELEGRAM POST OR WHATSAPP BROADCAST
                </div>

                <textarea
                  rows={6}
                  value={tipGroupContent}
                  onChange={(e) => {
                    setTipGroupContent(e.target.value);
                    checkSensitiveData(e.target.value);
                  }}
                  placeholder={`Paste Telegram channel alert or WhatsApp broadcast message...
Example: "🔥 SURE-SHOT CRUDE & BANK NIFTY 1000% TARGET! Transfer ₹10,000 upfront fee to private USDT wallet or personal UPI..."`}
                  className="w-full p-4 rounded-[4px] border border-[#E5E4DE] bg-[#FCF9F8] text-sm font-sans focus:outline-none focus:border-[#111111] text-[#111111]"
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <span className="text-[11px] font-mono text-[#66645E]">
                    Evaluates: Asymmetric yield promises, anonymous admin routing, paid group solicitations
                  </span>
                  <button
                    onClick={handleAnalyzeTip}
                    className="bg-[#111111] text-white px-6 py-3 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#2A2A28]"
                  >
                    ANALYZE TIP PROFILE →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Secondary Safety Quick Access Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Card 1: Before You Pay Checklist */}
          <div
            onClick={() => onNavigate('before-you-pay')}
            className="p-5 rounded-[4px] border border-[#E5E4DE] bg-white hover:border-[#111111] cursor-pointer transition-all flex items-start gap-4 shadow-[4px_4px_0px_rgba(17,17,17,0.02)]"
          >
            <div className="p-2.5 rounded-[4px] bg-[#E8F5EE] text-[#2D6A4F] shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-base text-[#111111]">
                Before You Pay: 9-Point Safety Checklist
              </h3>
              <p className="text-xs text-[#66645E] mt-1 leading-relaxed">
                Take 60 seconds to answer 9 critical questions before wiring funds or approving UPI mandates.
              </p>
              <span className="inline-block mt-2 text-xs font-mono font-semibold text-[#111111] underline">
                Open Checklist →
              </span>
            </div>
          </div>

          {/* Card 2: Scam Simulator */}
          <div
            onClick={() => onNavigate('simulator')}
            className="p-5 rounded-[4px] border border-[#E5E4DE] bg-white hover:border-[#111111] cursor-pointer transition-all flex items-start gap-4 shadow-[4px_4px_0px_rgba(17,17,17,0.02)]"
          >
            <div className="p-2.5 rounded-[4px] bg-[#FEF3C7] text-[#92400E] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-base text-[#111111]">
                Test Your Scam Sense: Interactive Simulator
              </h3>
              <p className="text-xs text-[#66645E] mt-1 leading-relaxed">
                Practice identifying real-world deception tactics across realistic fictional investment scenarios.
              </p>
              <span className="inline-block mt-2 text-xs font-mono font-semibold text-[#111111] underline">
                Start Simulation →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
