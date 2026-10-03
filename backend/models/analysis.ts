export type Language = 'en' | 'hi' | 'mr';
export type RiskLevel = 'LOW' | 'SUSPICIOUS' | 'HIGH';
export type AssessmentLevel = 'LOW CONCERN' | 'REQUIRES CAUTION' | 'HIGH CONCERN';
export type Severity = 'critical' | 'high' | 'warning' | 'info';
export type VerificationStatus = 'VERIFIED' | 'UNABLE_TO_VERIFY' | 'UNKNOWN' | 'SUSPICIOUS' | 'UNAVAILABLE';

export interface ScamIndicator {
  id: string;
  category: string;
  pattern: string;
  description: string;
  severity: Severity;
  languages: string[];
  examples: string[];
  enabled: boolean;
  weight: number;
}

export interface ScamExample {
  id: string;
  text: string;
  label: string;
  category: string;
  language: string;
  source: string;
}

export interface FinancialEntity {
  name: string;
  registrationNumber: string;
  entityType: string;
  status: 'VERIFIED' | 'UNABLE_TO_VERIFY';
  officialSource: string;
  lastChecked: string;
}

export interface KnownDomain {
  domain: string;
  category: string;
  entity: string;
  status: 'VERIFIED' | 'SUSPICIOUS' | 'UNKNOWN' | 'UNABLE_TO_VERIFY';
  source: string;
  lastChecked: string;
}

export interface DetectionSignal {
  id: string;
  title: string;
  severity: Severity;
  description: string;
  evidence: string;
  weight: number;
  category: string;
}

export interface VerificationReport {
  status: VerificationStatus;
  source: string;
  entity?: string;
  registrationNumber?: string;
  summary: string;
  details: string[];
}

export interface AnalysisResponse {
  success: boolean;
  analysis: {
    riskScore: number;
    riskLevel: RiskLevel;
    assessment: AssessmentLevel;
    summary: string;
    signals: DetectionSignal[];
    recommendedActions: string[];
    verification: VerificationReport;
    aiAnalysis: string;
    language: Language;
    sourceType: 'message' | 'url' | 'screenshot' | 'tip' | 'broker';
    evidenceSummary?: string[];
  };
}
