import React, { useState } from 'react';
import {
  MessageSquare,
  Camera,
  Link as LinkIcon,
  BadgeCheck,
  Upload,
  Clipboard,
  AlertTriangle,
  ArrowRight,
  Shield,
  RotateCcw,
} from 'lucide-react';
import { Language } from '../types';
import { demoArchetypes } from '../data/mockData';
import { translations } from '../i18n/translations';

interface ScanPageProps {
  currentLanguage: Language;
  onStartAnalysis: (req: {
    type: 'message' | 'url' | 'screenshot' | 'broker' | 'tip';
    content: string;
    brokerName?: string;
    regNumber?: string;
    imageBase64?: string;
    imageBuffer?: string;
    mimeType?: string;
  }) => void;
  onNavigateHowItWorks?: () => void;
}

export const ScanPage: React.FC<ScanPageProps> = ({
  currentLanguage,
  onStartAnalysis,
  onNavigateHowItWorks,
}) => {
  const [activeTab, setActiveTab] = useState<'message' | 'screenshot' | 'url' | 'broker'>('message');

  // Input states
  const [messageText, setMessageText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [extractedOcrText, setExtractedOcrText] = useState('');
  const [isReadingOcr, setIsReadingOcr] = useState(false);

  const [brokerName, setBrokerName] = useState('');
  const [regNumber, setRegNumber] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [sensitiveWarning, setSensitiveWarning] = useState<string | null>(null);

  const t = translations[currentLanguage].scan;

  const checkSensitiveData = (text: string) => {
    const sensitive =
      /\b(\d{6}|\d{4})\s*(is your otp|otp|verification code|pin|पासवर्ड|ओटीपी)\b/i.test(text) ||
      /\b(password|passwd|pin)\s*[:=]/i.test(text);
    if (sensitive) {
      setSensitiveWarning(t.sensitiveWarning);
    } else {
      setSensitiveWarning(null);
    }
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setMessageText(text);
        checkSensitiveData(text);
      }
    } catch {
      // fallback
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const valid = ['image/png', 'image/jpeg', 'image/webp'];
    if (!valid.includes(file.type)) {
      setErrorMessage(t.errorMessage);
      return;
    }
    setErrorMessage('');
    setSelectedFile(file);
    setIsReadingOcr(true);

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setImagePreview(base64);
      setExtractedOcrText('');
      setSensitiveWarning(null);
      setIsReadingOcr(false);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = () => {
    setErrorMessage('');

    if (activeTab === 'message') {
      if (!messageText.trim()) {
        setErrorMessage(t.errorNoMessage);
        return;
      }
      onStartAnalysis({ type: 'message', content: messageText.trim() });
    } else if (activeTab === 'screenshot') {
      if (!imagePreview) {
        setErrorMessage(t.errorNoScreenshot);
        return;
      }
      onStartAnalysis({
        type: 'screenshot',
        content: extractedOcrText || (selectedFile ? `Screenshot: ${selectedFile.name}` : 'Uploaded image'),
        imageBase64: imagePreview,
        imageBuffer: imagePreview,
        mimeType: selectedFile?.type || 'image/png',
      });
    } else if (activeTab === 'url') {
      if (!linkUrl.trim()) {
        setErrorMessage(t.errorNoLink);
        return;
      }
      onStartAnalysis({ type: 'url', content: linkUrl.trim() });
    } else if (activeTab === 'broker') {
      if (!brokerName.trim() && !regNumber.trim()) {
        setErrorMessage(t.errorNoEntity);
        return;
      }
      onStartAnalysis({
        type: 'broker',
        content: `Entity: ${brokerName} | Registration: ${regNumber}`,
        brokerName: brokerName.trim(),
        regNumber: regNumber.trim(),
      });
    }
  };

  const loadDemo = (demo: {
    type: string;
    content?: string;
    brokerName?: string;
    regNumber?: string;
    url?: string;
  }) => {
    setErrorMessage('');
    if (demo.type === 'broker') {
      setActiveTab('broker');
      setBrokerName(demo.brokerName || '');
      setRegNumber(demo.regNumber || '');
    } else if (demo.type === 'url') {
      setActiveTab('url');
      setLinkUrl(demo.url || 'https://apex-capital-invest.online');
    } else {
      setActiveTab('message');
      setMessageText(demo.content || '');
      if (demo.content) checkSensitiveData(demo.content);
    }
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-8">
      {/* Central Clean Header (Section 4) */}
      <div className="text-center space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#111111] tracking-tight">
          {t.pageTitle}
        </h1>
        <p className="font-sans text-sm sm:text-base text-[#444748] max-w-lg mx-auto leading-relaxed">
          {t.pageSubtitle}
        </p>
      </div>

      {/* Main Scanner Box */}
      <div className="bg-white border border-[#E5E4DE] rounded-[4px] shadow-[4px_4px_0px_rgba(17,17,17,0.03)] p-6 sm:p-8 space-y-6">
        {/* EXACT TABS: [ Message ] [ Screenshot ] [ Link ] [ Entity ] */}
        <div className="flex items-center justify-center p-1 bg-[#F5F4F0] rounded-[4px] gap-1 max-w-md mx-auto">
          <button
            onClick={() => {
              setActiveTab('message');
              setErrorMessage('');
            }}
            className={`flex-1 py-2 text-xs font-sans font-medium uppercase rounded-[2px] transition-colors ${
              activeTab === 'message'
                ? 'bg-white text-[#111111] font-bold shadow-sm'
                : 'text-[#66645E] hover:text-[#111111]'
            }`}
          >
            {t.tabMessage}
          </button>

          <button
            onClick={() => {
              setActiveTab('screenshot');
              setErrorMessage('');
            }}
            className={`flex-1 py-2 text-xs font-sans font-medium uppercase rounded-[2px] transition-colors ${
              activeTab === 'screenshot'
                ? 'bg-white text-[#111111] font-bold shadow-sm'
                : 'text-[#66645E] hover:text-[#111111]'
            }`}
          >
            {t.tabScreenshot}
          </button>

          <button
            onClick={() => {
              setActiveTab('url');
              setErrorMessage('');
            }}
            className={`flex-1 py-2 text-xs font-sans font-medium uppercase rounded-[2px] transition-colors ${
              activeTab === 'url'
                ? 'bg-white text-[#111111] font-bold shadow-sm'
                : 'text-[#66645E] hover:text-[#111111]'
            }`}
          >
            {t.tabLink}
          </button>

          <button
            onClick={() => {
              setActiveTab('broker');
              setErrorMessage('');
            }}
            className={`flex-1 py-2 text-xs font-sans font-medium uppercase rounded-[2px] transition-colors ${
              activeTab === 'broker'
                ? 'bg-white text-[#111111] font-bold shadow-sm'
                : 'text-[#66645E] hover:text-[#111111]'
            }`}
          >
            {t.tabEntity}
          </button>
        </div>

        {/* Sensitive Information Alert */}
        {sensitiveWarning && (
          <div className="p-3 bg-[#FEF2F2] border border-[#F87171] text-[#991B1B] text-xs font-sans rounded flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>{sensitiveWarning}</div>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="p-3 bg-[#FEF2F2] border border-[#F87171] text-[#991B1B] text-xs font-mono rounded">
            {errorMessage}
          </div>
        )}

        {/* Existing Input Experiences */}

        {/* 1. Message Input */}
        {activeTab === 'message' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-[#66645E]">
              <span>{t.msgLabel}</span>
              <button
                type="button"
                onClick={handlePasteClipboard}
                className="hover:text-[#111111] flex items-center gap-1 font-mono text-[11px]"
              >
                <Clipboard className="w-3.5 h-3.5" />
                <span>{t.pasteBtn}</span>
              </button>
            </div>

            <textarea
              rows={6}
              value={messageText}
              onChange={(e) => {
                setMessageText(e.target.value);
                checkSensitiveData(e.target.value);
              }}
              placeholder={t.msgPlaceholder}
              className="w-full p-4 rounded-[4px] border border-[#E5E4DE] bg-[#FCF9F8] text-sm font-sans focus:outline-none focus:border-[#111111] text-[#111111] leading-relaxed"
            />
          </div>
        )}

        {/* 2. Screenshot Input */}
        {activeTab === 'screenshot' && (
          <div className="space-y-4">
            {!imagePreview ? (
              <div
                onClick={() => document.getElementById('screenshot-file')?.click()}
                className="border-2 border-dashed border-[#D8D6CE] hover:border-[#111111] rounded-[4px] p-8 text-center bg-[#FCF9F8] cursor-pointer transition-colors space-y-2"
              >
                <input
                  id="screenshot-file"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <Upload className="w-8 h-8 mx-auto text-[#66645E]" />
                <p className="font-serif text-base font-semibold text-[#111111]">
                  {t.screenshotDropTitle}
                </p>
                <p className="text-xs text-[#66645E] font-mono">
                  {t.screenshotDropSub}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#66645E]">
                  <span>{t.screenshotUploaded}</span>
                  <button
                    onClick={() => {
                      setImagePreview(null);
                      setSelectedFile(null);
                      setExtractedOcrText('');
                    }}
                    className="text-[#991B1B] hover:underline"
                  >
                    {t.removeImage}
                  </button>
                </div>

                <div className="p-3 border border-[#E5E4DE] rounded bg-[#FCF9F8]">
                  <img
                    src={imagePreview}
                    alt="Uploaded screenshot"
                    className="max-h-48 mx-auto object-contain rounded"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#66645E] mb-1">
                    <span>{t.ocrLabel}</span>
                    {isReadingOcr && <span className="animate-pulse">{t.ocrReading}</span>}
                  </div>
                  <textarea
                    rows={3}
                    value={extractedOcrText}
                    onChange={(e) => setExtractedOcrText(e.target.value)}
                    placeholder={t.ocrPlaceholder}
                    className="w-full p-2.5 rounded border border-[#E5E4DE] bg-[#FCF9F8] text-xs font-mono text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. Link Input */}
        {activeTab === 'url' && (
          <div className="space-y-3">
            <label className="block text-xs text-[#66645E]">
              {t.linkLabel}
            </label>
            <div className="flex items-center border border-[#E5E4DE] rounded-[4px] bg-[#FCF9F8] px-3">
              <LinkIcon className="w-4 h-4 text-[#66645E] shrink-0" />
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example-broker-invest.vip"
                className="w-full p-3.5 bg-transparent text-sm font-sans focus:outline-none text-[#111111]"
              />
            </div>
          </div>
        )}

        {/* 4. Entity Input */}
        {activeTab === 'broker' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-[#66645E] mb-1">
                {t.entityNameLabel}
              </label>
              <input
                type="text"
                value={brokerName}
                onChange={(e) => setBrokerName(e.target.value)}
                placeholder={t.entityNamePlaceholder}
                className="w-full p-3 rounded-[4px] border border-[#E5E4DE] bg-[#FCF9F8] text-sm font-sans focus:outline-none focus:border-[#111111] text-[#111111]"
              />
            </div>

            <div>
              <label className="block text-xs text-[#66645E] mb-1">
                {t.entityRegLabel}
              </label>
              <input
                type="text"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
                placeholder={t.entityRegPlaceholder}
                className="w-full p-3 rounded-[4px] border border-[#E5E4DE] bg-[#FCF9F8] text-sm font-mono focus:outline-none focus:border-[#111111] text-[#111111]"
              />
            </div>
          </div>
        )}

        {/* Central [ Analyze ] Button */}
        <div>
          <button
            onClick={handleAnalyze}
            className="w-full py-3.5 px-6 rounded-[2px] bg-[#111111] text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#2A2A28] transition-colors shadow-sm"
          >
            {t.analyzeBtn}
          </button>
        </div>

        {/* Quiet Reassuring Notice */}
        <p className="text-[11px] text-[#66645E] text-center font-sans">
          {t.privacyNotice}
        </p>
      </div>

      {/* Quiet Quick Try Examples */}
      <div className="pt-2 text-center space-y-2">
        <span className="text-xs text-[#66645E]">{t.trySampleLabel}</span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {demoArchetypes.map((demo) => (
            <button
              key={demo.id}
              onClick={() => loadDemo(demo)}
              className="text-[11px] font-mono border border-[#E5E4DE] bg-white px-2.5 py-1 rounded hover:border-[#111111] text-[#444748] transition-colors"
            >
              {demo.label.split('(')[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
