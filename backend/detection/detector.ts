import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { normalizeText, normalizeLanguage, getEvidenceSnippet } from '../utils/validation.js';
import type { DetectionSignal, Language, RiskLevel, AssessmentLevel } from '../models/analysis.js';
import {
  DEFAULT_INDICATOR_WEIGHT,
  EVIDENCE_SNIPPET_MAX_LENGTH,
  RISK_SCORE_BASE_BONUS,
  RISK_SCORE_HIGH_THRESHOLD,
  RISK_SCORE_MAX,
  RISK_SCORE_SUSPICIOUS_THRESHOLD,
} from '../utils/constants.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.resolve(__dirname, '../data');

function loadJson<T>(fileName: string): T {
  return JSON.parse(fs.readFileSync(path.join(dataPath, fileName), 'utf8')) as T;
}

function scoreToLevel(score: number): { riskLevel: RiskLevel; assessment: AssessmentLevel } {
  if (score >= RISK_SCORE_HIGH_THRESHOLD) {
    return { riskLevel: 'HIGH', assessment: 'HIGH CONCERN' };
  }
  if (score >= RISK_SCORE_SUSPICIOUS_THRESHOLD) {
    return { riskLevel: 'SUSPICIOUS', assessment: 'REQUIRES CAUTION' };
  }
  return { riskLevel: 'LOW', assessment: 'LOW CONCERN' };
}

export function detectInvestmentRisk({
  text,
  language,
  type,
}: {
  text: string;
  language?: Language;
  type: 'message' | 'url' | 'screenshot' | 'tip' | 'broker';
}) {
  const normalizedLanguage = normalizeLanguage(language);
  const inputText = normalizeText(text ?? '');
  const indicators = loadJson<Array<{ id: string; category: string; pattern: string; description: string; severity: string; languages: string[]; examples: string[]; enabled: boolean; weight: number }>>('scamIndicators.json');

  const matches: DetectionSignal[] = [];
  for (const indicator of indicators) {
    if (!indicator.enabled || !indicator.languages.includes(normalizedLanguage)) {
      const fallbackLanguage = indicator.languages.includes('en');
      if (!fallbackLanguage) continue;
    }
    const regex = new RegExp(indicator.pattern, 'i');
    if (!regex.test(inputText)) continue;

    const evidence = getEvidenceSnippet(inputText.match(regex)?.[0] ?? indicator.examples[0] ?? indicator.description, EVIDENCE_SNIPPET_MAX_LENGTH);
    matches.push({
      id: indicator.id,
      title: indicator.category,
      severity: indicator.severity as DetectionSignal['severity'],
      description: indicator.description,
      evidence,
      weight: indicator.weight ?? DEFAULT_INDICATOR_WEIGHT,
      category: indicator.category,
    });
  }

  const riskScore = Math.min(RISK_SCORE_MAX, matches.reduce((sum, signal) => sum + signal.weight, 0) + (matches.length > 0 ? RISK_SCORE_BASE_BONUS : 0));
  const { riskLevel, assessment } = scoreToLevel(riskScore);

  const recommendations =
    riskLevel === 'HIGH'
      ? [
          'Do not transfer money to any personal account or UPI handle.',
          'Do not share OTPs, PINs, passwords or remote access credentials.',
          'Verify the institution directly through the official regulator website before acting.',
        ]
      : riskLevel === 'SUSPICIOUS'
        ? [
            'Pause and independently verify the entity and the payment instructions.',
            'Check whether the offer is registered with an official regulator and confirm the source.',
            'Avoid moving the conversation into private channels without a traceable official process.',
          ]
        : [
            'Keep the conversation documented and verify details through official public sources.',
            'Do not share personal credentials or identity details with unknown contacts.',
          ];

  const summary =
    matches.length === 0
      ? 'No clear scam patterns were matched in the submitted content. Standard caution still applies.'
      : `Detected ${matches.length} scam signal${matches.length > 1 ? 's' : ''} using the project risk dataset.`;

  const extractedClaims = matches.map((signal, index) => ({
    id: `claim-${index + 1}`,
    claim: signal.evidence,
    type: signal.category,
    status: signal.severity === 'critical' ? 'FLAGGED' : 'OBSERVED',
    evidence: signal.description,
  }));

  const evidence = matches.map((signal) => ({
    type: signal.category,
    description: signal.description,
    source: 'VeriVest Scam Intelligence Dataset',
    strength: signal.severity,
  }));

  return {
    riskScore,
    riskLevel,
    assessment,
    summary,
    signals: matches,
    warningSignals: matches,
    extractedClaims,
    evidence,
    recommendations,
    recommendedActions: recommendations,
    sourceMetadata: ['VeriVest Scam Intelligence Dataset'],
    language: normalizedLanguage,
    sourceType: type,
    evidenceSummary: matches.map((signal) => signal.evidence),
  };
}
