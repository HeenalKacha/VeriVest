import type { Request, Response } from 'express';

import { detectInvestmentRisk } from '../detection/detector.js';
import { generateGeminiAnalysis } from '../services/geminiService.js';
import { verifyBroker, verifyDomain, verifyEntity } from '../services/verificationService.js';
import { normalizeLanguage, normalizeText, validateText } from '../utils/validation.js';
import { CONFIDENCE_SCORE_OFFSET, RISK_SCORE_MAX } from '../utils/constants.js';
import type { DetectionSignal, RiskLevel, AssessmentLevel } from '../models/analysis.js';

function normalizeType(raw?: string): 'message' | 'url' | 'screenshot' | 'tip' | 'broker' {
  if (raw === 'url' || raw === 'screenshot' || raw === 'tip' || raw === 'broker') return raw;
  return 'message';
}

function calculateRiskLevel(score: number): { riskLevel: RiskLevel; assessment: AssessmentLevel } {
  if (score >= 70) return { riskLevel: 'HIGH', assessment: 'HIGH CONCERN' };
  if (score >= 40) return { riskLevel: 'SUSPICIOUS', assessment: 'REQUIRES CAUTION' };
  return { riskLevel: 'LOW', assessment: 'LOW CONCERN' };
}

export async function analyzeMessageController(req: Request, res: Response) {
  const message = typeof req.body?.message === 'string' ? req.body.message : req.body?.content ?? '';
  const language = normalizeLanguage(req.body?.language);
  const textError = validateText(message, 'Message');

  if (textError) {
    return res.status(400).json({ success: false, error: textError });
  }

  // 1. Run deterministic rule detector
  const ruleResult = detectInvestmentRisk({
    text: message,
    language,
    type: 'message',
  });

  const verification = await verifyEntity(req.body?.brokerName ?? '');

  // 2. Call Gemini API for deep contextual and language analysis
  const aiResult = await generateGeminiAnalysis({
    text: message,
    language,
    sourceType: 'message',
    ruleSignals: ruleResult.signals,
    verificationSummary: verification.summary,
  });

  // 3. Merge rule signals and Gemini AI signals (avoiding duplicates)
  const combinedSignals: DetectionSignal[] = [...ruleResult.signals];
  if (aiResult.available && Array.isArray(aiResult.signals)) {
    for (const aiSig of aiResult.signals) {
      const exists = combinedSignals.some(
        (s) => s.category.toLowerCase() === aiSig.category.toLowerCase() || s.id === aiSig.id
      );
      if (!exists) {
        combinedSignals.push({
          id: aiSig.id,
          title: aiSig.title,
          severity: aiSig.severity,
          description: aiSig.whyItMatters,
          evidence: aiSig.evidence,
          weight: aiSig.severity === 'critical' ? 35 : aiSig.severity === 'high' ? 25 : 15,
          category: aiSig.category,
        });
      }
    }
  }

  // 4. Calculate final unified risk score
  const finalScore = aiResult.available
    ? Math.max(ruleResult.riskScore, aiResult.riskScore)
    : ruleResult.riskScore;
  const { riskLevel, assessment } = calculateRiskLevel(finalScore);

  // 5. Merge claims
  const combinedClaims = [
    ...ruleResult.extractedClaims,
    ...(aiResult.available && Array.isArray(aiResult.claims)
      ? aiResult.claims.map((c) => ({
          id: c.id,
          claim: c.quote,
          type: c.category,
          status: 'FLAGGED' as const,
          evidence: c.verificationNote,
        }))
      : []),
  ];

  const summary = aiResult.available && aiResult.summary ? aiResult.summary : ruleResult.summary;
  const whyThisMatters = aiResult.available && aiResult.whyThisMatters
    ? aiResult.whyThisMatters
    : (combinedSignals.length > 0
        ? 'The content contains observed risk indicators that warrant independent verification.'
        : 'This content did not show clear warning signals based on current checks.');

  const forensicDirective = aiResult.available && aiResult.forensicDirective
    ? aiResult.forensicDirective
    : (riskLevel === 'HIGH'
        ? 'Pause before investing. Do not transfer funds until independently verified.'
        : riskLevel === 'SUSPICIOUS'
        ? 'Exercise caution and verify claims before acting.'
        : 'Maintain standard financial hygiene and independent verification.');

  const speechSummary = aiResult.available && aiResult.speechSummary ? aiResult.speechSummary : summary;

  const recommendations = aiResult.available && aiResult.recommendedActions.length > 0
    ? aiResult.recommendedActions
    : ruleResult.recommendations;

  const canonical = {
    analysisId: `VV-${Date.now()}`,
    inputType: 'message',
    riskScore: finalScore,
    riskLevel,
    confidence: Math.min(RISK_SCORE_MAX, finalScore + CONFIDENCE_SCORE_OFFSET),
    summary,
    forensicDirective,
    whyThisMatters,
    speechSummary,
    warningSignals: combinedSignals,
    signals: combinedSignals,
    extractedClaims: combinedClaims,
    claims: combinedClaims,
    evidence: ruleResult.evidence || [],
    entities: [],
    verificationResults: [verification],
    verification,
    recommendations,
    recommendedActions: recommendations,
    sourceMetadata: ['VeriVest Intelligence Engine', 'Gemini AI Forensic Analysis'],
    analyzedAt: new Date().toISOString(),
    assessment,
    aiAnalysis: summary,
    language,
    sourceType: 'message',
    evidenceSummary: combinedSignals.map((s) => s.evidence),
  };

  return res.json({
    success: true,
    analysis: canonical,
    riskScore: canonical.riskScore,
    riskLevel: canonical.riskLevel,
    assessment: canonical.assessment,
    summary: canonical.summary,
    forensicDirective: canonical.forensicDirective,
    whyThisMatters: canonical.whyThisMatters,
    speechSummary: canonical.speechSummary,
    warningSignals: canonical.warningSignals,
    extractedClaims: canonical.extractedClaims,
    evidence: canonical.evidence,
    signals: canonical.signals,
    recommendations: canonical.recommendations,
    recommendedActions: canonical.recommendedActions,
    verification: canonical.verification,
    verificationResults: canonical.verificationResults,
    aiAnalysis: canonical.aiAnalysis,
    language: canonical.language,
    sourceType: canonical.sourceType,
    evidenceSummary: canonical.evidenceSummary,
  });
}

export async function analyzeUrlController(req: Request, res: Response) {
  const url = normalizeText(req.body?.url ?? req.body?.content ?? '');
  if (!url) return res.status(400).json({ success: false, error: 'URL is required.' });

  const language = normalizeLanguage(req.body?.language);
  const ruleResult = detectInvestmentRisk({ text: url, language, type: 'url' });
  const verification = await verifyDomain(url);

  // If domain is officially verified as a genuine regulatory portal, dampen risk
  if (verification.status === 'VERIFIED') {
    ruleResult.signals = ruleResult.signals.filter((s) => s.id !== 'fake-regulatory-claim');
    ruleResult.warningSignals = ruleResult.signals;
    ruleResult.riskScore = Math.max(0, ruleResult.signals.reduce((sum, s) => sum + s.weight, 0));
  }

  // Call Gemini for URL forensic inspection
  const aiResult = await generateGeminiAnalysis({
    text: url,
    language,
    sourceType: 'url',
    ruleSignals: ruleResult.signals,
    verificationSummary: verification.summary,
  });

  const combinedSignals: DetectionSignal[] = [...ruleResult.signals];
  if (aiResult.available && Array.isArray(aiResult.signals)) {
    for (const aiSig of aiResult.signals) {
      if (!combinedSignals.some((s) => s.id === aiSig.id || s.category === aiSig.category)) {
        combinedSignals.push({
          id: aiSig.id,
          title: aiSig.title,
          severity: aiSig.severity,
          description: aiSig.whyItMatters,
          evidence: aiSig.evidence,
          weight: aiSig.severity === 'critical' ? 35 : aiSig.severity === 'high' ? 25 : 15,
          category: aiSig.category,
        });
      }
    }
  }

  const finalScore = verification.status === 'VERIFIED'
    ? 5
    : aiResult.available
    ? Math.max(ruleResult.riskScore, aiResult.riskScore)
    : ruleResult.riskScore;

  const { riskLevel, assessment } = calculateRiskLevel(finalScore);

  const summary = verification.status === 'VERIFIED'
    ? `${verification.summary} Verified official institutional portal.`
    : aiResult.available && aiResult.summary
    ? aiResult.summary
    : ruleResult.summary;

  const recommendations = aiResult.available && aiResult.recommendedActions.length > 0
    ? aiResult.recommendedActions
    : ruleResult.recommendations;

  const canonical = {
    analysisId: `VV-${Date.now()}`,
    inputType: 'url',
    riskScore: finalScore,
    riskLevel,
    confidence: Math.min(RISK_SCORE_MAX, finalScore + CONFIDENCE_SCORE_OFFSET),
    summary,
    forensicDirective: aiResult.available && aiResult.forensicDirective
      ? aiResult.forensicDirective
      : (riskLevel === 'HIGH' ? 'Do not enter credentials or transfer funds on this website.' : 'Verify domain authenticity.'),
    whyThisMatters: aiResult.available && aiResult.whyThisMatters
      ? aiResult.whyThisMatters
      : 'Domain safety analysis checks for phishing, brand impersonation, and fraudulent payment channels.',
    speechSummary: aiResult.available && aiResult.speechSummary ? aiResult.speechSummary : summary,
    warningSignals: combinedSignals,
    signals: combinedSignals,
    extractedClaims: ruleResult.extractedClaims || [],
    claims: ruleResult.extractedClaims || [],
    evidence: ruleResult.evidence || [],
    entities: [],
    verificationResults: [verification],
    verification,
    recommendations,
    recommendedActions: recommendations,
    urlSafety: aiResult.urlSafety || {
      hasHttps: /^https:\/\//i.test(url),
      domain: url,
      domainStructure: 'Standard',
      brandMismatch: false,
      lookalikeDomain: false,
      suspiciousRedirect: false,
      verificationStatus: verification.status,
      overallStatus: verification.status === 'VERIFIED' ? 'SAFE_BASELINE' : riskLevel === 'HIGH' ? 'HIGH_RISK' : 'REQUIRES_CAUTION',
      notes: [verification.summary],
    },
    sourceMetadata: ['VeriVest Domain Registry', 'Gemini AI URL Inspection'],
    analyzedAt: new Date().toISOString(),
    assessment,
    aiAnalysis: summary,
    language,
    sourceType: 'url',
    evidenceSummary: combinedSignals.map((s) => s.evidence),
  };

  return res.json({
    success: true,
    analysis: canonical,
    riskScore: canonical.riskScore,
    riskLevel: canonical.riskLevel,
    assessment: canonical.assessment,
    summary: canonical.summary,
    forensicDirective: canonical.forensicDirective,
    whyThisMatters: canonical.whyThisMatters,
    speechSummary: canonical.speechSummary,
    warningSignals: canonical.warningSignals,
    extractedClaims: canonical.extractedClaims,
    evidence: canonical.evidence,
    signals: canonical.signals,
    recommendations: canonical.recommendations,
    recommendedActions: canonical.recommendedActions,
    verification: canonical.verification,
    verificationResults: canonical.verificationResults,
    urlSafety: canonical.urlSafety,
    aiAnalysis: canonical.aiAnalysis,
    language: canonical.language,
    sourceType: canonical.sourceType,
    evidenceSummary: canonical.evidenceSummary,
  });
}

export async function analyzeScreenshotController(req: Request, res: Response) {
  const imageBase64 = typeof req.body?.imageBase64 === 'string'
    ? req.body.imageBase64
    : typeof req.body?.imageBuffer === 'string'
    ? req.body.imageBuffer
    : '';
  const mimeType = typeof req.body?.mimeType === 'string' ? req.body.mimeType : undefined;
  const text = typeof req.body?.message === 'string' ? req.body.message : req.body?.content ?? '';
  const language = normalizeLanguage(req.body?.language);

  if (!imageBase64 && !text) {
    return res.status(400).json({ success: false, error: 'Screenshot image or content is required.' });
  }

  // 1. Multimodal Gemini Vision & OCR Analysis
  const promptNotes = text && !text.startsWith('Screenshot:') && text !== 'Uploaded image' ? text : '';
  const aiResult = await generateGeminiAnalysis({
    text: promptNotes,
    language,
    sourceType: 'screenshot',
    imageBase64: imageBase64 || undefined,
  });

  const extractedText = (aiResult.extractedText || '').trim();
  const hasExtractedText = extractedText.length > 5;

  // 2. Also run deterministic rules on the extracted OCR text (or user notes if provided)
  const textToAnalyze = hasExtractedText ? extractedText : promptNotes;
  const ruleResult = detectInvestmentRisk({
    text: textToAnalyze,
    language,
    type: 'screenshot',
  });

  // 3. Merge signals
  const combinedSignals: DetectionSignal[] = [...ruleResult.signals];
  if (aiResult.available && Array.isArray(aiResult.signals)) {
    for (const aiSig of aiResult.signals) {
      if (!combinedSignals.some((s) => s.id === aiSig.id || s.category.toLowerCase() === aiSig.category.toLowerCase())) {
        combinedSignals.push({
          id: aiSig.id,
          title: aiSig.title,
          severity: aiSig.severity,
          description: aiSig.whyItMatters,
          evidence: aiSig.evidence,
          weight: aiSig.severity === 'critical' ? 35 : aiSig.severity === 'high' ? 25 : 15,
          category: aiSig.category,
        });
      }
    }
  }

  // 4. Handle OCR failure or empty/unreadable screenshot
  const isUnreadable = !hasExtractedText && !promptNotes;
  let ocrConfidence: 'high' | 'low' = isUnreadable ? 'low' : 'high';
  let finalScore: number;
  let riskLevel: RiskLevel;
  let assessment: AssessmentLevel;

  if (isUnreadable) {
    // If OCR fails or returns empty text, do NOT automatically classify the screenshot as safe
    finalScore = 45;
    riskLevel = 'SUSPICIOUS';
    assessment = 'REQUIRES CAUTION';
    combinedSignals.push({
      id: 'unreadable-screenshot',
      title: 'Inconclusive Image Content',
      severity: 'warning',
      description: 'The uploaded image did not contain clear, readable text or verifiable financial credentials.',
      evidence: 'No legible text detected in image',
      weight: 20,
      category: 'Inconclusive Verification',
    });
  } else {
    finalScore = aiResult.available
      ? Math.max(ruleResult.riskScore, aiResult.riskScore)
      : ruleResult.riskScore;
    const levelInfo = calculateRiskLevel(finalScore);
    riskLevel = levelInfo.riskLevel;
    assessment = levelInfo.assessment;
  }

  const combinedClaims = [
    ...ruleResult.extractedClaims,
    ...(aiResult.available && Array.isArray(aiResult.claims)
      ? aiResult.claims.map((c) => ({
          id: c.id,
          claim: c.quote,
          type: c.category,
          status: 'FLAGGED' as const,
          evidence: c.verificationNote,
        }))
      : []),
  ];

  const summary = isUnreadable
    ? (language === 'hi'
        ? 'इस छवि से कोई स्पष्ट या सत्यापन योग्य पाठ नहीं निकाला जा सका। कृपया किसी भी अनसत्यापित दावे पर भरोसा न करें।'
        : language === 'mr'
        ? 'या प्रतिमेतून कोणताही स्पष्ट किंवा पडताळणीयोग्य मजकूर काढता आला नाही. कृपया असत्यापित दाव्यांवर विश्वास ठेवू नका.'
        : 'No readable text or verifiable credentials could be extracted from this image. Do not rely on unverified claims.')
    : aiResult.available && aiResult.summary
    ? aiResult.summary
    : ruleResult.summary;

  const forensicDirective = isUnreadable
    ? (language === 'hi'
        ? 'छवि की सामग्री सत्यापित नहीं हो सकी। सतर्क रहें और आधिकारिक स्रोतों से सीधे पुष्टि करें।'
        : language === 'mr'
        ? 'प्रतिमेतील मजकूर पडताळता आला नाही. काळजी घ्या आणि अधिकृत पोर्टलवरून खात्री करा.'
        : 'Image content could not be verified automatically. Exercise caution and verify credentials directly.')
    : aiResult.available && aiResult.forensicDirective
    ? aiResult.forensicDirective
    : (riskLevel === 'HIGH' ? 'Pause before investing. Do not send money to accounts shown.' : 'Exercise caution.');

  const recommendations = isUnreadable
    ? [
        'Request clear, written documentation from the promoter.',
        'Verify the financial entity name and registration number directly on official regulator websites.',
        'Never transfer funds based on unverified screenshots or private chat messages.',
      ]
    : aiResult.available && aiResult.recommendedActions.length > 0
    ? aiResult.recommendedActions
    : ruleResult.recommendations;

  const verification = {
    status: isUnreadable ? ('UNABLE_TO_VERIFY' as const) : ('UNABLE_TO_VERIFY' as const),
    source: 'Visual Screenshot Inspection',
    summary: isUnreadable
      ? 'Inconclusive image scan; text could not be verified.'
      : 'Visual elements checked against known deceptive patterns.',
    details: isUnreadable
      ? ['Image contained no legible text or was degraded.', 'System does not assume unreadable images are safe.']
      : ['Screenshot OCR executed and examined for regulatory claims and doctored balances.'],
  };

  const displayText = hasExtractedText ? extractedText : isUnreadable ? 'No readable text detected in uploaded image.' : promptNotes;

  const canonical = {
    analysisId: `VV-${Date.now()}`,
    inputType: 'screenshot',
    extractedText: displayText,
    ocrConfidence,
    riskScore: finalScore,
    riskLevel,
    confidence: Math.min(RISK_SCORE_MAX, finalScore + CONFIDENCE_SCORE_OFFSET),
    summary,
    forensicDirective,
    whyThisMatters: aiResult.available && aiResult.whyThisMatters
      ? aiResult.whyThisMatters
      : (isUnreadable
          ? 'Fraudulent promoters sometimes use low-resolution, blurred, or distorted images to evade automated safety filters.'
          : 'Screenshots can show manipulated profit dashboards, counterfeit certificates, or fake group conversations.'),
    speechSummary: aiResult.available && aiResult.speechSummary ? aiResult.speechSummary : summary,
    warningSignals: combinedSignals,
    signals: combinedSignals,
    extractedClaims: combinedClaims,
    claims: combinedClaims,
    evidence: ruleResult.evidence || [],
    entities: [],
    verificationResults: [verification],
    verification,
    recommendations,
    recommendedActions: recommendations,
    sourceMetadata: ['Gemini Multimodal Vision OCR', 'VeriVest Scam Intelligence Dataset'],
    analyzedAt: new Date().toISOString(),
    assessment,
    aiAnalysis: summary,
    language,
    sourceType: 'screenshot',
    evidenceSummary: combinedSignals.map((s) => s.evidence),
  };

  return res.json({
    success: true,
    analysis: canonical,
    riskScore: canonical.riskScore,
    riskLevel: canonical.riskLevel,
    assessment: canonical.assessment,
    summary: canonical.summary,
    forensicDirective: canonical.forensicDirective,
    whyThisMatters: canonical.whyThisMatters,
    speechSummary: canonical.speechSummary,
    extractedText: canonical.extractedText,
    ocrConfidence: canonical.ocrConfidence,
    warningSignals: canonical.warningSignals,
    extractedClaims: canonical.extractedClaims,
    evidence: canonical.evidence,
    signals: canonical.signals,
    recommendations: canonical.recommendations,
    recommendedActions: canonical.recommendedActions,
    verification: canonical.verification,
    verificationResults: canonical.verificationResults,
    aiAnalysis: canonical.aiAnalysis,
    language: canonical.language,
    sourceType: canonical.sourceType,
    evidenceSummary: canonical.evidenceSummary,
  });
}

export async function analyzeTipController(req: Request, res: Response) {
  const message = req.body?.message ?? req.body?.content ?? '';
  const validationError = validateText(message, 'Tip content');
  if (validationError) return res.status(400).json({ success: false, error: validationError });

  const language = normalizeLanguage(req.body?.language);
  const ruleResult = detectInvestmentRisk({ text: message, language, type: 'tip' });
  const verification = await verifyEntity(req.body?.brokerName ?? '');

  const aiResult = await generateGeminiAnalysis({
    text: message,
    language,
    sourceType: 'tip',
    ruleSignals: ruleResult.signals,
    verificationSummary: verification.summary,
  });

  const combinedSignals: DetectionSignal[] = [...ruleResult.signals];
  if (aiResult.available && Array.isArray(aiResult.signals)) {
    for (const aiSig of aiResult.signals) {
      if (!combinedSignals.some((s) => s.id === aiSig.id || s.category === aiSig.category)) {
        combinedSignals.push({
          id: aiSig.id,
          title: aiSig.title,
          severity: aiSig.severity,
          description: aiSig.whyItMatters,
          evidence: aiSig.evidence,
          weight: aiSig.severity === 'critical' ? 35 : aiSig.severity === 'high' ? 25 : 15,
          category: aiSig.category,
        });
      }
    }
  }

  const finalScore = aiResult.available
    ? Math.max(ruleResult.riskScore, aiResult.riskScore)
    : ruleResult.riskScore;
  const { riskLevel, assessment } = calculateRiskLevel(finalScore);

  const summary = aiResult.available && aiResult.summary ? aiResult.summary : ruleResult.summary;
  const recommendations = aiResult.available && aiResult.recommendedActions.length > 0
    ? aiResult.recommendedActions
    : ruleResult.recommendations;

  const canonical = {
    analysisId: `VV-${Date.now()}`,
    inputType: 'tip',
    riskScore: finalScore,
    riskLevel,
    confidence: Math.min(RISK_SCORE_MAX, finalScore + CONFIDENCE_SCORE_OFFSET),
    summary,
    forensicDirective: aiResult.available && aiResult.forensicDirective
      ? aiResult.forensicDirective
      : (riskLevel === 'HIGH' ? 'Avoid trading on private channel tips.' : 'Verify claims before acting.'),
    whyThisMatters: aiResult.available && aiResult.whyThisMatters
      ? aiResult.whyThisMatters
      : 'Unregulated tip channels frequently orchestrate pump-and-dump schemes or charge unauthorized subscription fees.',
    speechSummary: aiResult.available && aiResult.speechSummary ? aiResult.speechSummary : summary,
    warningSignals: combinedSignals,
    signals: combinedSignals,
    extractedClaims: ruleResult.extractedClaims || [],
    claims: ruleResult.extractedClaims || [],
    evidence: ruleResult.evidence || [],
    entities: [],
    verificationResults: [verification],
    verification,
    recommendations,
    recommendedActions: recommendations,
    sourceMetadata: ['VeriVest Tip Profiler', 'Gemini AI Social Forensic Engine'],
    analyzedAt: new Date().toISOString(),
    assessment,
    aiAnalysis: summary,
    language,
    sourceType: 'tip',
    evidenceSummary: combinedSignals.map((s) => s.evidence),
  };

  return res.json({
    success: true,
    analysis: canonical,
    riskScore: canonical.riskScore,
    riskLevel: canonical.riskLevel,
    assessment: canonical.assessment,
    summary: canonical.summary,
    forensicDirective: canonical.forensicDirective,
    whyThisMatters: canonical.whyThisMatters,
    speechSummary: canonical.speechSummary,
    warningSignals: canonical.warningSignals,
    extractedClaims: canonical.extractedClaims,
    evidence: canonical.evidence,
    signals: canonical.signals,
    recommendations: canonical.recommendations,
    recommendedActions: canonical.recommendedActions,
    verification: canonical.verification,
    verificationResults: canonical.verificationResults,
    aiAnalysis: canonical.aiAnalysis,
    language: canonical.language,
    sourceType: canonical.sourceType,
    evidenceSummary: canonical.evidenceSummary,
  });
}

export async function verifyBrokerController(req: Request, res: Response) {
  const name =
    typeof req.body?.name === 'string'
      ? req.body.name
      : typeof req.body?.brokerName === 'string'
      ? req.body.brokerName
      : '';
  const registrationNumber =
    typeof req.body?.registrationNumber === 'string'
      ? req.body.registrationNumber
      : typeof req.body?.regNumber === 'string'
      ? req.body.regNumber
      : '';

  const verification = await verifyBroker({ name, registrationNumber });
  const isVerified = verification.status === 'VERIFIED';
  const riskScore = isVerified ? 10 : 45;
  const riskLevel: RiskLevel = isVerified ? 'LOW' : 'SUSPICIOUS';
  const assessment: AssessmentLevel = isVerified ? 'LOW CONCERN' : 'REQUIRES CAUTION';
  const lang = normalizeLanguage(req.body?.language);

  const signals: DetectionSignal[] = isVerified
    ? []
    : [
        {
          id: 'unregistered-entity',
          title: 'Registration Unconfirmed',
          severity: 'warning' as const,
          description: 'Entity registration could not be confirmed in official registry records.',
          evidence: name || registrationNumber,
          category: 'entity registration',
          weight: 25,
        },
      ];

  const canonical = {
    analysisId: `VV-${Date.now()}`,
    inputType: 'broker',
    riskScore,
    riskLevel,
    confidence: isVerified ? 90 : 60,
    summary: verification.summary,
    forensicDirective: isVerified
      ? 'Entity record confirmed. Verify bank account before transferring funds.'
      : 'Entity unconfirmed in public registry. Do not deposit funds until verified.',
    whyThisMatters: isVerified
      ? 'Official registration provides legal recourse and investor protection mechanisms.'
      : 'Operating without documented regulatory registration poses high capital risk.',
    speechSummary: verification.summary,
    warningSignals: signals,
    signals,
    extractedClaims: [
      {
        id: 'claim-1',
        claim: name || 'Claimed Broker',
        type: 'entity name',
        status: isVerified ? 'VERIFIED' : 'UNCONFIRMED',
        evidence: `Registration: ${registrationNumber || 'Not provided'}`,
      },
    ],
    evidence: [],
    entities: name ? [name] : [],
    verificationResults: [verification],
    verification,
    recommendations: isVerified
      ? ['Entity record verified. Always confirm exact payment details before transferring funds.']
      : ['Confirm registration directly with the official regulator portal before sending capital.'],
    recommendedActions: isVerified
      ? ['Entity record verified. Always confirm exact payment details before transferring funds.']
      : ['Confirm registration directly with the official regulator portal before sending capital.'],
    sourceMetadata: [verification.source || 'Official Registry Database'],
    analyzedAt: new Date().toISOString(),
    assessment,
    aiAnalysis: verification.summary,
    language: lang,
    sourceType: 'broker',
    evidenceSummary: [name, registrationNumber].filter(Boolean),
  };

  return res.json({
    success: true,
    verification,
    status: verification.status,
    summary: verification.summary,
    analysis: canonical,
    riskScore: canonical.riskScore,
    riskLevel: canonical.riskLevel,
    assessment: canonical.assessment,
    signals: canonical.signals,
    recommendations: canonical.recommendations,
    recommendedActions: canonical.recommendedActions,
    sourceType: 'broker',
    language: lang,
  });
}

export async function analyzeLegacyController(req: Request, res: Response) {
  const type = normalizeType(req.body?.type ?? 'message');

  if (type === 'url') {
    return analyzeUrlController(req, res);
  }

  if (type === 'broker') {
    return verifyBrokerController(req, res);
  }

  if (type === 'tip') {
    return analyzeTipController(req, res);
  }

  if (type === 'screenshot') {
    return analyzeScreenshotController(req, res);
  }

  return analyzeMessageController(req, res);
}
