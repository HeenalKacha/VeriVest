import React, { useState, useEffect } from 'react';
import { WifiOff, AlertTriangle, RefreshCw, Home, History } from 'lucide-react';
import { Language } from '../types';

interface ErrorPageProps {
  type?: '404' | 'network' | 'generic';
  errorMessage?: string;
  currentLanguage: Language;
  onNavigateHome: () => void;
  onOpenHistory?: () => void;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
  type = '404',
  errorMessage,
  currentLanguage,
  onNavigateHome,
  onOpenHistory,
}) => {
  const isHi = currentLanguage === 'hi';
  const [isRetrying, setIsRetrying] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [retryResult, setRetryResult] = useState<string | null>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetryConnection = async () => {
    setIsRetrying(true);
    setRetryResult(null);

    try {
      // Test basic connectivity to server
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'message', content: 'ping' }),
      }).catch(() => null);

      if (response && response.ok) {
        setRetryResult('success');
        setTimeout(() => {
          onNavigateHome();
        }, 800);
      } else if (navigator.onLine) {
        setRetryResult('online_restored');
      } else {
        setRetryResult('failed');
      }
    } catch {
      setRetryResult('failed');
    } finally {
      setIsRetrying(false);
    }
  };

  const isNetworkError = type === 'network' || !isOnline;

  return (
    <div className="min-h-screen bg-[#FCF9F8] text-[#111111] flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto w-full my-auto space-y-8 text-center">
        {/* Error Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-[#F5F4F0] border border-[#E5E4DE] text-xs font-mono font-bold text-[#111111]">
          {isNetworkError ? (
            <>
              <WifiOff className="w-3.5 h-3.5 text-[#991B1B]" />
              <span>NETWORK DISCONNECTED</span>
            </>
          ) : (
            <>
              <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />
              <span>HTTP 404 • RESOURCE NOT LOCATED</span>
            </>
          )}
        </div>

        {/* Large Visual Status */}
        <div className="relative mx-auto w-24 h-24 rounded-full bg-[#FAF8F5] border-2 border-dashed border-[#D8D6CE] flex items-center justify-center">
          {isNetworkError ? (
            <WifiOff className="w-10 h-10 text-[#991B1B] animate-pulse" />
          ) : (
            <span className="font-serif text-3xl font-bold text-[#66645E]">404</span>
          )}
        </div>

        {/* Main Title & Description */}
        <div className="space-y-3">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight">
            {isNetworkError
              ? isHi
                ? 'नेटवर्क कनेक्शन त्रुटि (Network Error)'
                : 'Connection Interrupted'
              : isHi
              ? 'पृष्ठ नहीं मिला (Page Not Found)'
              : 'Dossier Not Found'}
          </h1>
          <p className="text-sm font-sans text-[#444748] leading-relaxed max-w-md mx-auto">
            {isNetworkError
              ? isHi
                ? 'आपका डिवाइस ऑफ़लाइन प्रतीत होता है या सर्वर से कनेक्शन कट गया है। कृपया अपने इंटरनेट कनेक्शन की जांच करें।'
                : 'Your connection to the verification cluster was interrupted or your device is currently offline. Please check your Wi-Fi or data connection.'
              : errorMessage ||
                (isHi
                  ? 'अनुरोधित पृष्ठ या विश्लेषण रिपोर्ट मौजूद नहीं है या हटा दी गई है।'
                  : 'The requested dossier, scan report, or URL route could not be found.')}
          </p>
        </div>

        {/* Feedback message after retry */}
        {retryResult === 'success' && (
          <div className="p-3 bg-[#E8F5EE] border border-[#2D6A4F] text-[#1B4332] text-xs font-mono rounded">
            Connection restored! Returning to scan dashboard...
          </div>
        )}
        {retryResult === 'online_restored' && (
          <div className="p-3 bg-[#E8F5EE] border border-[#2D6A4F] text-[#1B4332] text-xs font-mono rounded">
            Internet connection re-established.
          </div>
        )}
        {retryResult === 'failed' && (
          <div className="p-3 bg-[#FEE2E2] border border-[#991B1B] text-[#991B1B] text-xs font-mono rounded">
            Unable to reach verification cluster. Please check your internet connection and try again.
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {isNetworkError && (
            <button
              onClick={handleRetryConnection}
              disabled={isRetrying}
              className="w-full sm:w-auto px-5 py-2.5 rounded-[4px] bg-[#111111] text-white text-xs font-mono font-bold uppercase hover:bg-[#2A2A28] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRetrying ? 'animate-spin' : ''}`} />
              <span>{isRetrying ? 'Testing Connection...' : 'Check Connection & Retry'}</span>
            </button>
          )}

          <button
            onClick={onNavigateHome}
            className="w-full sm:w-auto px-5 py-2.5 rounded-[4px] border border-[#111111] bg-white text-[#111111] text-xs font-mono font-bold uppercase hover:bg-[#F5F4F0] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Scan</span>
          </button>

          {onOpenHistory && (
            <button
              onClick={onOpenHistory}
              className="w-full sm:w-auto px-4 py-2.5 rounded-[4px] border border-[#E5E4DE] bg-white text-[#444748] text-xs font-mono hover:text-[#111111] hover:border-[#111111] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <History className="w-3.5 h-3.5" />
              <span>Saved Scans</span>
            </button>
          )}
        </div>

        {/* Reassurance box */}
        <div className="p-4 rounded-[4px] border border-[#E5E4DE] bg-[#FAF8F5] text-left text-xs font-sans text-[#66645E] space-y-1">
          <div className="font-mono text-[10px] uppercase font-bold text-[#111111]">
            OFFLINE RESILIENCE NOTICE
          </div>
          <p>
            Your previously evaluated scans and safety checklist records are preserved locally on your device. You can safely inspect your Scan History even without an active internet connection.
          </p>
        </div>
      </div>

      {/* Micro Status Bar */}
      <div className="max-w-xl mx-auto w-full pt-6 border-t border-[#E5E4DE] flex items-center justify-between text-[10px] font-mono text-[#66645E]">
        <span>DIAGNOSTIC CODE: {isNetworkError ? 'ERR_NETWORK_DISCONNECTED' : 'ERR_HTTP_404'}</span>
        <span>STATUS: {navigator.onLine ? 'BROWSER ONLINE' : 'BROWSER OFFLINE'}</span>
      </div>
    </div>
  );
};