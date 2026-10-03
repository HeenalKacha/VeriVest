import { GoogleGenAI, Type } from '@google/genai';
import type { Language, RiskLevel, AssessmentLevel, Severity } from '../models/analysis.js';

export interface GeminiSignal {
  id: string;
  title: string;
  severity: Severity;
  evidence: string;
  whyItMatters: string;
  recommendedAction: string;
  category: string;
}

export interface GeminiClaim {
  id: string;
  claimNumber: string;
  quote: string;
  category: string;
  verificationNote: string;
}

export interface GeminiAnalysisResult {
  available: boolean;
  extractedText?: string;
  summary: string;
  riskScore: number;
  riskLevel: RiskLevel;
  assessment: AssessmentLevel;
  forensicDirective: string;
  whyThisMatters: string;
  speechSummary: string;
  signals: GeminiSignal[];
  claims: GeminiClaim[];
  recommendedActions: string[];
  urlSafety?: {
    hasHttps: boolean;
    domain: string;
    domainStructure: string;
    brandMismatch: boolean;
    lookalikeDomain: boolean;
    suspiciousRedirect: boolean;
    verificationStatus: string;
    overallStatus: 'SAFE_BASELINE' | 'REQUIRES_CAUTION' | 'HIGH_RISK';
    notes: string[];
  };
}

export interface GeminiAnalysisInput {
  text: string;
  language: Language;
  sourceType: 'message' | 'url' | 'screenshot' | 'tip' | 'broker';
  imageBase64?: string;
  ruleSignals?: Array<{ id: string; title: string; severity: string; description: string; evidence: string }>;
  verificationSummary?: string;
}

export async function generateGeminiAnalysis(input: GeminiAnalysisInput): Promise<GeminiAnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      available: false,
      summary: 'AI contextual analysis unavailable because the backend API key is not configured.',
      riskScore: 0,
      riskLevel: 'LOW',
      assessment: 'LOW CONCERN',
      forensicDirective: 'Maintain standard financial hygiene and independent verification.',
      whyThisMatters: 'Rule-based evaluation active. Backend Gemini API key is not set.',
      speechSummary: 'Rule-based evaluation active. Please verify credentials through official channels.',
      signals: [],
      claims: [],
      recommendedActions: ['Verify entity registration on official regulator portals before transferring funds.'],
    };
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const langName = input.language === 'hi' ? 'Hindi' : input.language === 'mr' ? 'Marathi' : 'English';

  const systemInstruction = `You are VeriVest's senior financial fraud forensic analyst and regulatory compliance expert.
Your mission is to rigorously analyze potential investment scams, social media tips, fraudulent links, WhatsApp/Telegram groups, impersonations of financial institutions, fake broker portals, and unverified financial claims.
You must be factual, objective, and protective of consumer capital.
Language requirement: Write all explanations, summaries, directives, whyThisMatters, and recommendations in ${langName}.`;

  const userPrompt = input.sourceType === 'screenshot'
    ? `You are analyzing a screenshot image uploaded by a user for financial fraud, deception, or scam indicators.
Target Language: ${langName}
${input.text && !input.text.startsWith('Screenshot:') && input.text !== 'Uploaded image' ? `User notes: """${input.text.slice(0, 1000)}"""` : ''}

CRITICAL OCR & FORENSIC INSTRUCTIONS:
1. Strict OCR: Transcribe all visible text, numbers, percentages, names, Telegram/WhatsApp group details, handles, and payment requests exactly as they appear in the image into "extractedText".
2. If the image is blank, solid color, unreadable, or contains NO readable text or financial symbols, set "extractedText" to "" (empty string). Do NOT invent or hallucinate text that is not visible.
3. If fraudulent, deceptive, or high-risk claims are visible (e.g. guaranteed returns, daily fixed profits, limited slots/urgency, payment to admin or personal accounts, fake SEBI/broker certificates):
   - Set riskScore between 75 and 100.
   - Set riskLevel to "HIGH" and assessment to "HIGH CONCERN".
   - Extract the exact quotes in "claims" and specific risk indicators in "signals".
4. If legitimate financial content is visible (e.g. index fund factsheet, regulated broker statement, standard financial news):
   - Set riskScore between 0 and 30, riskLevel to "LOW", assessment to "LOW CONCERN".
5. If the image has no readable text or is inconclusive:
   - Set riskScore to 40, riskLevel to "SUSPICIOUS", assessment to "REQUIRES CAUTION".
   - State clearly in summary that no verifiable text could be extracted.
6. Provide an immediate safety directive ("forensicDirective") and speech summary in ${langName}.`
    : `Perform a forensic investment risk assessment for this ${input.sourceType} submission.
Input Type: ${input.sourceType}
Target Language: ${langName}
${input.text ? `Provided Text/URL/Entity: """${input.text.slice(0, 4000)}"""` : ''}
${input.verificationSummary ? `Official Registry Baseline: ${input.verificationSummary}` : ''}
${input.ruleSignals && input.ruleSignals.length > 0 ? `Deterministic Rule Hits: ${JSON.stringify(input.ruleSignals)}` : ''}

Evaluate:
1. Calculate an objective riskScore from 0 (completely legitimate) to 100 (critical scam).
   - 0-39: LOW risk / LOW CONCERN (standard legitimate discussion, verified platform).
   - 40-69: SUSPICIOUS / REQUIRES CAUTION (ambiguous claims, unverified entity, aggressive marketing).
   - 70-100: HIGH risk / HIGH CONCERN (guaranteed returns, personal UPI payments, advance fee unlock, fake SEBI certificate, pump-and-dump, crypto transfer).
2. Identify specific signals (Scam DNA) with clear quotes/evidence, explanation of why it matters, and recommended safety action.
3. Extract explicit claims made by the promoter.
4. Provide clear immediate directive ("forensicDirective") and speech summary for audio playback.`;

  let contents: any;
  if (input.imageBase64) {
    let mimeType = 'image/png';
    let rawBase64 = input.imageBase64.trim();

    if (rawBase64.startsWith('data:')) {
      const commaIdx = rawBase64.indexOf(',');
      if (commaIdx !== -1) {
        const header = rawBase64.slice(0, commaIdx);
        rawBase64 = rawBase64.slice(commaIdx + 1);
        const mimeMatch = header.match(/data:([^;]+)/);
        if (mimeMatch) {
          mimeType = mimeMatch[1];
        }
      }
    }
    // Strip any embedded whitespace or newlines
    const cleanData = rawBase64.replace(/\s+/g, '');

    contents = {
      parts: [
        {
          inlineData: {
            mimeType,
            data: cleanData,
          },
        },
        {
          text: userPrompt,
        },
      ],
    };
  } else {
    contents = userPrompt;
  }

  const generateConfig = {
    systemInstruction,
    temperature: 0.1,
    responseMimeType: 'application/json',
    responseSchema: {
      type: Type.OBJECT,
      properties: {
        extractedText: {
          type: Type.STRING,
          description: 'All text extracted via OCR if an image was provided, or key analyzed text',
        },
        summary: {
          type: Type.STRING,
          description: `Concise assessment summary in ${langName}`,
        },
        riskScore: {
          type: Type.INTEGER,
          description: 'Forensic risk score from 0 to 100',
        },
        riskLevel: {
          type: Type.STRING,
          description: 'LOW, SUSPICIOUS, or HIGH',
        },
        assessment: {
          type: Type.STRING,
          description: 'LOW CONCERN, REQUIRES CAUTION, or HIGH CONCERN',
        },
        forensicDirective: {
          type: Type.STRING,
          description: `Immediate safety directive in ${langName}`,
        },
        whyThisMatters: {
          type: Type.STRING,
          description: `Plain-language explanation of risks in ${langName}`,
        },
        speechSummary: {
          type: Type.STRING,
          description: `Short speech script for voice explainer in ${langName}`,
        },
        signals: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              severity: { type: Type.STRING, description: 'critical, high, warning, or info' },
              evidence: { type: Type.STRING },
              whyItMatters: { type: Type.STRING },
              recommendedAction: { type: Type.STRING },
              category: { type: Type.STRING },
            },
            required: ['id', 'title', 'severity', 'evidence', 'whyItMatters', 'recommendedAction', 'category'],
          },
        },
        claims: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              claimNumber: { type: Type.STRING },
              quote: { type: Type.STRING },
              category: { type: Type.STRING },
              verificationNote: { type: Type.STRING },
            },
            required: ['id', 'claimNumber', 'quote', 'category', 'verificationNote'],
          },
        },
        recommendedActions: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        urlSafety: {
          type: Type.OBJECT,
          properties: {
            hasHttps: { type: Type.BOOLEAN },
            domain: { type: Type.STRING },
            domainStructure: { type: Type.STRING },
            brandMismatch: { type: Type.BOOLEAN },
            lookalikeDomain: { type: Type.BOOLEAN },
            suspiciousRedirect: { type: Type.BOOLEAN },
            verificationStatus: { type: Type.STRING },
            overallStatus: { type: Type.STRING, description: 'SAFE_BASELINE, REQUIRES_CAUTION, or HIGH_RISK' },
            notes: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
        },
      },
      required: [
        'summary',
        'riskScore',
        'riskLevel',
        'assessment',
        'forensicDirective',
        'whyThisMatters',
        'speechSummary',
        'signals',
        'claims',
        'recommendedActions',
      ],
    },
  };

  // Primary model for screenshots is gemini-3.1-flash-lite (high reliability, low latency)
  // For text/url tasks, try gemini-3.8-flash first with automatic fallback to gemini-3.1-flash-lite
  const primaryModel = input.sourceType === 'screenshot' ? 'gemini-3.1-flash-lite' : 'gemini-3.8-flash';
  const fallbackModel = input.sourceType === 'screenshot' ? 'gemini-3.8-flash' : 'gemini-3.1-flash-lite';

  try {
    let response: any;
    try {
      response = await ai.models.generateContent({
        model: primaryModel,
        contents,
        config: generateConfig,
      });
    } catch (err: any) {
      console.warn(`Primary model ${primaryModel} failed (${err.message || err}), falling back to ${fallbackModel}...`);
      response = await ai.models.generateContent({
        model: fallbackModel,
        contents,
        config: generateConfig,
      });
    }

    const raw = response.text?.trim();
    if (!raw) {
      throw new Error('Gemini returned an empty response.');
    }

    const parsed = JSON.parse(raw);

    const validRiskLevel: RiskLevel =
      parsed.riskLevel === 'HIGH' || parsed.riskLevel === 'SUSPICIOUS' ? parsed.riskLevel : 'LOW';
    const validAssessment: AssessmentLevel =
      parsed.assessment === 'HIGH CONCERN' || parsed.assessment === 'REQUIRES CAUTION'
        ? parsed.assessment
        : 'LOW CONCERN';

    return {
      available: true,
      extractedText: typeof parsed.extractedText === 'string' ? parsed.extractedText : undefined,
      summary: parsed.summary || 'Analysis completed.',
      riskScore: Math.min(100, Math.max(0, Number(parsed.riskScore) || 0)),
      riskLevel: validRiskLevel,
      assessment: validAssessment,
      forensicDirective: parsed.forensicDirective || 'Verify claims before acting.',
      whyThisMatters: parsed.whyThisMatters || 'Independent verification advised.',
      speechSummary: parsed.speechSummary || parsed.summary || 'Analysis completed.',
      signals: Array.isArray(parsed.signals)
        ? parsed.signals.map((s: any, idx: number) => ({
            id: s.id || `ai-sig-${idx + 1}`,
            title: s.title || 'Risk Indicator',
            severity: (s.severity === 'critical' || s.severity === 'high' || s.severity === 'warning'
              ? s.severity
              : 'warning') as Severity,
            evidence: s.evidence || 'Observed claim',
            whyItMatters: s.whyItMatters || 'Requires verification',
            recommendedAction: s.recommendedAction || 'Do not transfer funds',
            category: s.category || 'Behavioral Signal',
          }))
        : [],
      claims: Array.isArray(parsed.claims)
        ? parsed.claims.map((c: any, idx: number) => ({
            id: c.id || `ai-claim-${idx + 1}`,
            claimNumber: c.claimNumber || `CLAIM ${String(idx + 1).padStart(2, '0')}`,
            quote: c.quote || 'Unspecified statement',
            category: c.category || 'Financial Claim',
            verificationNote: c.verificationNote || 'Unverified statement',
          }))
        : [],
      recommendedActions: Array.isArray(parsed.recommendedActions) && parsed.recommendedActions.length > 0
        ? parsed.recommendedActions
        : ['Verify credentials directly through official regulatory registries before sending capital.'],
      urlSafety: parsed.urlSafety
        ? {
            hasHttps: Boolean(parsed.urlSafety.hasHttps),
            domain: parsed.urlSafety.domain || '',
            domainStructure: parsed.urlSafety.domainStructure || '',
            brandMismatch: Boolean(parsed.urlSafety.brandMismatch),
            lookalikeDomain: Boolean(parsed.urlSafety.lookalikeDomain),
            suspiciousRedirect: Boolean(parsed.urlSafety.suspiciousRedirect),
            verificationStatus: parsed.urlSafety.verificationStatus || 'UNVERIFIED',
            overallStatus: parsed.urlSafety.overallStatus || 'REQUIRES_CAUTION',
            notes: Array.isArray(parsed.urlSafety.notes) ? parsed.urlSafety.notes : [],
          }
        : undefined,
    };
  } catch (error) {
    console.warn('Gemini analysis failed or unavailable:', error instanceof Error ? error.message : error);
    return {
      available: false,
      summary: 'AI contextual analysis unavailable; rule-based safety engine active.',
      riskScore: 0,
      riskLevel: 'LOW',
      assessment: 'LOW CONCERN',
      forensicDirective: 'Exercise caution and verify credentials.',
      whyThisMatters: 'System active in rule-based verification mode.',
      speechSummary: 'Please verify credentials through official channels before transferring funds.',
      signals: [],
      claims: [],
      recommendedActions: ['Verify entity registration on official regulator portals before transferring funds.'],
    };
  }
}

// Backwards-compatible export for existing controllers
export async function generateContextualAnalysis(input: {
  text: string;
  language: Language;
  sourceType: 'message' | 'url' | 'screenshot' | 'tip' | 'broker';
  signals?: Array<{ id: string; title: string; severity: string; description: string; evidence: string }>;
  verificationSummary?: string;
}): Promise<{ available: boolean; summary: string }> {
  const result = await generateGeminiAnalysis({
    text: input.text,
    language: input.language,
    sourceType: input.sourceType,
    ruleSignals: input.signals,
    verificationSummary: input.verificationSummary,
  });
  return { available: result.available, summary: result.summary };
}
