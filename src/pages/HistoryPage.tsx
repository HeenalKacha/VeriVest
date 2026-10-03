import React, { useState } from 'react';
import {
  Search,
  FileText,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Lock,
  ExternalLink,
} from 'lucide-react';
import { AnalysisResult, Language } from '../types';
import { translations } from '../i18n/translations';
import { storageService } from '../services/storageService';

interface HistoryPageProps {
  currentLanguage: Language;
  history: AnalysisResult[];
  onSelectDossier: (dossierId: string) => void;
  onNavigate: (route: string) => void;
  onRefreshHistory?: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  currentLanguage,
  history,
  onSelectDossier,
  onNavigate,
  onRefreshHistory,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'HIGH' | 'CAUTION' | 'LOW'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const t = translations[currentLanguage];

  const highCount = history.filter(
    (h) => h.assessment === 'HIGH CONCERN' || h.riskLevel === 'HIGH'
  ).length;
  const cautionCount = history.filter(
    (h) => h.assessment === 'REQUIRES CAUTION' || h.riskLevel === 'SUSPICIOUS'
  ).length;
  const lowCount = history.filter(
    (h) => h.assessment === 'LOW CONCERN' || h.riskLevel === 'LOW'
  ).length;

  const filteredHistory = history.filter((item) => {
    const isHigh = item.assessment === 'HIGH CONCERN' || item.riskLevel === 'HIGH';
    const isCaution = item.assessment === 'REQUIRES CAUTION' || item.riskLevel === 'SUSPICIOUS';
    const isLow = item.assessment === 'LOW CONCERN' || item.riskLevel === 'LOW';

    if (filter === 'HIGH' && !isHigh) return false;
    if (filter === 'CAUTION' && !isCaution) return false;
    if (filter === 'LOW' && !isLow) return false;

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchSubject = (item.sourceLabel || '').toLowerCase().includes(q);
      const matchRaw = (item.rawInput || '').toLowerCase().includes(q);
      const matchId = (item.id || '').toLowerCase().includes(q);
      const matchSummary = (item.summary || '').toLowerCase().includes(q);
      const matchEntity = (item.verificationDetails?.claimedEntity || '').toLowerCase().includes(q);
      return matchSubject || matchRaw || matchId || matchSummary || matchEntity;
    }
    return true;
  });

  const handleRowClick = (item: AnalysisResult) => {
    onSelectDossier(item.id);
    onNavigate('result');
  };

  const handleDeleteRecord = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    storageService.deleteScan(id);
    if (onRefreshHistory) {
      onRefreshHistory();
    }
  };

  return (
    <div className="bg-[#FCF9F8] min-h-screen py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5E4DE] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#66645E] uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
              LOCAL INVESTOR AUDIT LEDGER
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111111] mt-1">
              Scan & Verification History
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[#444748] mt-1">
              Your historical scam signal scans and entity verification inquiries.
            </p>
          </div>

          {/* Filter Segmented Buttons */}
          <div className="flex items-center gap-1.5 self-start md:self-auto text-xs font-mono font-semibold uppercase">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1.5 rounded-[2px] transition-colors ${
                filter === 'ALL'
                  ? 'bg-[#111111] text-white'
                  : 'bg-white border border-[#E5E4DE] text-[#444748] hover:border-[#111111]'
              }`}
            >
              All ({history.length})
            </button>
            <button
              onClick={() => setFilter('HIGH')}
              className={`px-3 py-1.5 rounded-[2px] transition-colors ${
                filter === 'HIGH'
                  ? 'bg-[#991B1B] text-white'
                  : 'bg-white border border-[#E5E4DE] text-[#991B1B] hover:border-[#991B1B]'
              }`}
            >
              High Concern ({highCount})
            </button>
            <button
              onClick={() => setFilter('CAUTION')}
              className={`px-3 py-1.5 rounded-[2px] transition-colors ${
                filter === 'CAUTION'
                  ? 'bg-[#D97706] text-white'
                  : 'bg-white border border-[#E5E4DE] text-[#D97706] hover:border-[#D97706]'
              }`}
            >
              Caution ({cautionCount})
            </button>
            <button
              onClick={() => setFilter('LOW')}
              className={`px-3 py-1.5 rounded-[2px] transition-colors ${
                filter === 'LOW'
                  ? 'bg-[#2D6A4F] text-white'
                  : 'bg-white border border-[#E5E4DE] text-[#2D6A4F] hover:border-[#2D6A4F]'
              }`}
            >
              Low Concern ({lowCount})
            </button>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#66645E]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search scans by input type, claim text, entity name, or record ID..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-[#E5E4DE] rounded-[4px] text-xs font-sans focus:outline-none focus:border-[#111111] text-[#111111]"
          />
        </div>

        {/* History Table / Records List */}
        <div className="bg-white border border-[#E5E4DE] rounded-[4px] shadow-[4px_4px_0px_rgba(17,17,17,0.04)] overflow-hidden">
          {filteredHistory.length > 0 ? (
            <div className="divide-y divide-[#E5E4DE]">
              {filteredHistory.map((item) => {
                const isHigh = item.assessment === 'HIGH CONCERN' || item.riskLevel === 'HIGH';
                const isCaution = item.assessment === 'REQUIRES CAUTION' || item.riskLevel === 'SUSPICIOUS';
                const warningCount = item.warningIndicatorsCount ?? item.signals?.length ?? 0;
                const status = item.verificationDetails?.status || 'UNAVAILABLE';

                return (
                  <div
                    key={item.id}
                    onClick={() => handleRowClick(item)}
                    className="p-5 hover:bg-[#FCF9F8] cursor-pointer transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    {/* Left: Metadata & Description */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#66645E]">
                        <span className="font-bold text-[#111111]">{item.id}</span>
                        <span>•</span>
                        <span>{item.timestamp}</span>
                        <span>•</span>
                        <span className="uppercase bg-[#E5E2E1] px-2 py-0.5 rounded-[2px] text-[#111111]">
                          {item.sourceLabel}
                        </span>
                      </div>

                      <div className="font-serif text-base font-semibold text-[#111111] truncate">
                        {item.summary || item.rawInput}
                      </div>

                      <div className="text-xs text-[#66645E] line-clamp-1 font-mono">
                        Input: "{item.rawInput.substring(0, 90)}..."
                      </div>
                    </div>

                    {/* Middle: Assessment & Warning Indicators */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right font-mono">
                        <div
                          className={`text-xs font-bold uppercase ${
                            isHigh
                              ? 'text-[#991B1B]'
                              : isCaution
                              ? 'text-[#D97706]'
                              : 'text-[#2D6A4F]'
                          }`}
                        >
                          {isHigh
                            ? 'HIGH CONCERN'
                            : isCaution
                            ? 'REQUIRES CAUTION'
                            : 'LOW CONCERN'}
                        </div>
                        <div className="text-[11px] text-[#66645E]">
                          {warningCount} warning {warningCount === 1 ? 'indicator' : 'indicators'}
                        </div>
                      </div>

                      {/* Verification Status Pill */}
                      <span className="text-[10px] font-mono px-2 py-1 rounded-[2px] bg-[#F5F4F0] border border-[#E5E4DE] text-[#444748] uppercase">
                        {status}
                      </span>

                      {/* Delete button */}
                      <button
                        onClick={(e) => handleDeleteRecord(e, item.id)}
                        className="p-1.5 rounded hover:bg-[#FEE2E2] text-[#66645E] hover:text-[#991B1B] transition-colors"
                        title="Delete local record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <ArrowRight className="w-4 h-4 text-[#66645E]" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-[#66645E] font-mono">
              No matching verification records found for your filter or query.
            </div>
          )}
        </div>

        {/* Clear Privacy Statement (Section 20 & 21) */}
        <div className="p-5 bg-white border border-[#E5E4DE] rounded-[4px] shadow-[4px_4px_0px_rgba(17,17,17,0.02)] space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#111111] uppercase">
            <Lock className="w-3.5 h-3.5 text-[#2D6A4F]" />
            <span>Privacy-by-Design Statement</span>
          </div>
          <p className="text-xs text-[#66645E] leading-relaxed">
            All records in this ledger are stored strictly on your local device (browser LocalStorage). VeriVest does
            not sell, retain, or share your submitted inquiries. You can delete any individual record at any time using
            the trash icon. We never collect or store banking passwords, OTPs, or private payment credentials.
          </p>
        </div>
      </div>
    </div>
  );
};
