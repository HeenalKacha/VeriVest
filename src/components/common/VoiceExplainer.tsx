import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, MessageCircle } from 'lucide-react';
import { Language } from '../../types';

interface VoiceExplainerProps {
  speechText: string;
  currentLanguage: Language;
}

export const VoiceExplainer: React.FC<VoiceExplainerProps> = ({ speechText, currentLanguage }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
    }
  }, []);

  const handleToggleVoice = () => {
    if (!isSupported) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'mr' ? 'mr-IN' : 'en-US';
      utterance.rate = 0.95;

      utterance.onend = () => {
        setIsPlaying(false);
      };
      utterance.onerror = () => {
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const isHi = currentLanguage === 'hi';
  const isMr = currentLanguage === 'mr';

  const buttonLabel = isPlaying
    ? isHi
      ? 'आवाज रोकें'
      : isMr
      ? 'आवाज थांबवा'
      : 'Stop Audio'
    : isHi
    ? 'मुझे बोलकर समझाएं'
    : isMr
    ? 'मला बोलून समजावून सांगा'
    : 'Explain this to me';

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleToggleVoice}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-[4px] border text-xs font-mono font-semibold uppercase transition-colors ${
          isPlaying
            ? 'bg-[#111111] text-white border-[#111111] shadow-sm'
            : 'bg-white border-[#E5E4DE] text-[#111111] hover:border-[#111111]'
        }`}
        title="Voice Explanation (Speech synthesis ready)"
      >
        {isPlaying ? (
          <VolumeX className="w-4 h-4 text-[#F87171] animate-pulse" />
        ) : (
          <Volume2 className="w-4 h-4 text-[#111111]" />
        )}
        <span>{buttonLabel}</span>
      </button>

      {isPlaying && (
        <span className="text-[11px] font-mono text-[#2D6A4F] animate-pulse hidden sm:inline">
          ● Playing audio explanation...
        </span>
      )}
    </div>
  );
};
