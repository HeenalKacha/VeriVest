export type Language = 'en' | 'hi' | 'mr';

export type RiskLevel = 'LOW' | 'SUSPICIOUS' | 'HIGH';

export type AssessmentLevel = 'LOW CONCERN' | 'REQUIRES CAUTION' | 'HIGH CONCERN';

export type Severity = 'critical' | 'high' | 'warning' | 'info';

export type VerificationStatus =
  | 'VERIFIED'
  | 'NOT_VERIFIED'
  | 'PARTIAL_MATCH'
  | 'CONFLICTING_INFORMATION'
  | 'NO_MATCH_FOUND'
  | 'UNAVAILABLE';

export interface ExtractedClaim {
  id: string;
  claimNumber: string; // e.g., "CLAIM 01"
  quote: string;
  category: string;
  signalId?: string;
  verificationNote?: string;
}

export interface ScamDNASignal {
  id: string;
  name: string;
  severity: Severity;
  evidence: string;
  whyItMatters: string;
  recommendedAction: string;
  category: string;
  educationalGuideId?: string;
}

export interface RiskSignal {
  id: string;
  title: string;
  severity: Severity;
  explanation: string;
  heuristicRule?: string;
  detectedPattern?: string;
  confidence?: number;
}

export interface VerificationDetail {
  claimedEntity: string;
  claimedRegNumber: string;
  status: VerificationStatus;
  sourceChecked: string;
  lastChecked: string;
  whatWasVerified: string[];
  whatCouldNotBeVerified: string[];
  registryMatches?: {
    sebi?: string;
    rbi?: string;
    mca?: string;
  };
}

// Backward-compatibility interface for legacy code
export interface OfficialRegistryCheck {
  entityName: string;
  claimedRegNumber: string;
  status: 'VERIFIED' | 'COULD_NOT_VERIFY' | 'FLAGGED_UNREGISTERED';
  source: string;
  lastChecked: string;
  registryMatches: {
    sebi: string;
    rbi: string;
    mca: string;
  };
}

export interface UrlSafetyCheck {
  hasHttps: boolean;
  domain: string;
  domainStructure: string;
  brandMismatch: boolean;
  lookalikeDomain: boolean;
  suspiciousRedirect: boolean;
  verificationStatus: string;
  overallStatus: 'SAFE_BASELINE' | 'REQUIRES_CAUTION' | 'HIGH_RISK';
  notes: string[];
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  sourceType: 'message' | 'url' | 'screenshot' | 'broker' | 'tip';
  sourceLabel: string;
  rawInput: string;
  extractedText?: string;
  ocrConfidence?: 'high' | 'low' | 'manual';
  sensitiveDataDetected?: boolean;
  sensitiveDataMessage?: string;
  riskScore: number; // Internal risk indicator score: 0 - 100
  riskLevel: RiskLevel; // LOW, SUSPICIOUS, HIGH
  assessment: AssessmentLevel; // LOW CONCERN, REQUIRES CAUTION, HIGH CONCERN
  warningIndicatorsCount: number;
  assessmentCaveat: string;
  summary: string;
  forensicDirective: string;
  whyThisMatters: string;
  claims: ExtractedClaim[];
  scamDna: ScamDNASignal[];
  signals: RiskSignal[]; // for backward compat
  recommendedActions: string[];
  verificationDetails?: VerificationDetail;
  urlSafety?: UrlSafetyCheck;
  limitations: string[];
  isDemo?: boolean;
  speechSummary?: string;

  // Legacy fields kept for backward compatibility with existing saved records
  probabilityOfLoss?: string;
  dossierHash?: string;
  auditEngine?: string;
  cryptographicSeal?: string;
  telemetryRef?: string;
}

export type Gender = 'Male' | 'Female';

export interface SimulatorProgress {
  totalQuestions: number;
  completedQuestions: number;
  correctAnswers: number;
  score: number;
  isCompleted: boolean;
  completedAt?: string;
  badgeTitle?: string;
}

export interface User {
  id: string;
  name: string;
  mobile: string;
  email: string;
  age: number | string;
  gender: Gender;
  language: Language;
  createdAt: string;
}

export interface EducationGuide {
  id: string;
  number: string;
  category: string;
  title: string;
  readTime: string;
  summary: string;
  explanation: string;
  exampleSnippet: string;
  redFlags: string[];
  actionSteps: string[];
  relatedActionText: string;
}

export interface ScamScenario {
  id: string;
  category: string;
  title: string;
  scenarioText: string;
  claimedBy: string;
  options: {
    id: string;
    text: string;
    isSafe: boolean;
    feedback: string;
  }[];
  warningSignsFound: string[];
  explanation: string;
  educationalGuideId: string;
}
