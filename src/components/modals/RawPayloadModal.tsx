import React, { useState } from 'react';
import { X, Check, Copy } from 'lucide-react';
import { AnalysisResult } from '../../types';

interface RawPayloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: AnalysisResult;
}

export const RawPayloadModal: React.FC<RawPayloadModalProps> = ({
  isOpen,
  onClose,
  result,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const jsonString = JSON.stringify(result, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(17,17,17,0.45)] backdrop-blur-[2px]">
      <div className="relative w-full max-w-2xl bg-[#FCF9F8] border border-[#111111] shadow-[4px_4px_0px_rgba(17,17,17,0.15)] rounded-[4px] p-6 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E4DE]">
          <div>
            <div className="text-[10px] font-mono tracking-widest text-[#66645E] uppercase">
              FORENSIC TELEMETRY STREAM
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#111111]">
              Raw Forensic Dossier Payload ({result.id})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-[4px] border border-[#E5E4DE] hover:border-[#111111] text-[#111111]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* JSON Code view */}
        <div className="flex-1 overflow-auto my-4 bg-[#111111] text-[#E8F5EE] p-4 rounded-[4px] font-mono text-xs leading-relaxed">
          <pre>{jsonString}</pre>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E5E4DE]">
          <span className="text-[11px] font-mono text-[#66645E]">
            SEAL: {result.cryptographicSeal}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#111111] text-white text-xs font-mono font-medium hover:bg-[#2A2A28]"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>COPIED TO CLIPBOARD</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>COPY JSON PAYLOAD</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
