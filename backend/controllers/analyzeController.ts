import type { Request, Response } from 'express';

import { detectInvestmentRisk } from '../detection/detector.js';
import { generateContextualAnalysis } from '../services/geminiService.js';
import { verifyBroker, verifyDomain, verifyEntity } from '../services/verificationService.js';
import { normalizeLanguage, normalizeText, validateText } from '../utils/validation.js';
import { CONFIDENCE_SCORE_OFFSET, RISK_SCORE_MAX } from '../utils/constants.js';

function normalizeType(raw?: string) {
  if (raw === 'url' || raw === 'screenshot' || raw === 'tip' || raw === 'broker') return raw;
  return 'message';
}

export async function analyzeMessageController(req: Request, res: Response) {
  const message = typeof req.body?.message === 'string' ? req.body.message : req.body?.content ?? '';
  const language = normalizeLanguage(req.body?.language);
  const textError = validateText(message, 'Message');

  if (textError) {
    return res.status(400).json({ success: false, error: textError });
  }

  const result = detectInvestmentRisk({
    text: message,
    language,
    type: normalizeType(req.body?.type),
  });

  const verification = await verifyEntity(req.body?.brokerName ?? '');
  const aiAnalysis = await generateContextualAnalysis({
    text: message,
    language,
    sourceType: result.sourceType,
    signals: result.signals,
    verificationSummary: verification.summary,
  });

  const canonical = {
    analysisId: `VV-${Date.now()}`,
    inputType: result.sourceType,
    riskScore: result.riskScore,
    riskLevel: result.riskLevel,
    confidence: Math.min(RISK_SCORE_MAX, result.riskScore + CONFIDENCE_SCORE_OFFSET),
    summary: result.summary,
    warningSignals: result.warningSignals || result.signals || [],
    extractedClaims: result.extractedClaims || [],
    evidence: result.evidence || [],
    entities: [],
    verificationResults: [verification],
    recommendations: result.recommendedActions || result.recommendations || [],
    sourceMetadata: result.sourceMetadata || ['VeriVest Scam Intelligence Dataset'],
    analyzedAt: new Date().toISOString(),
    assessment: result.assessment,
    signals: result.signals,
    recommendedActions: result.recommendedActions,
    verification,
    aiAnalysis: aiAnalysis.summary,
    language,
    sourceType: result.sourceType,
    evidenceSummary: result.evidenceSummary,
  };

  return res.json({
    success: true,
    analysis: canonical,
    riskScore: canonical.riskScore,
    riskLevel: canonical.riskLevel,
    assessment: canonical.assessment,
    summary: canonical.summary,
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

  const result = detectInvestmentRisk({ text: url, language: normalizeLanguage(req.body?.language), type: 'url' });
  const verification = await verifyDomain(url);
  const aiAnalysis = await generateContextualAnalysis({
    text: url,
    language: normalizeLanguage(req.body?.language),
    sourceType: 'url',
    signals: result.signals,
    verificationSummary: verification.summary,
  });

  const canonical = {
    analysisId: `VV-${Date.now()}`,
    inputType: 'url',
    riskScore: result.riskScore,
    riskLevel: result.riskLevel,
    confidence: Math.min(RISK_SCORE_MAX, result.riskScore + CONFIDENCE_SCORE_OFFSET),
    summary: result.summary,
    warningSignals: result.warningSignals || result.signals || [],
    extractedClaims: result.extractedClaims || [],
    evidence: result.evidence || [],
    entities: [],
    verificationResults: [verification],
    recommendations: result.recommendedActions || result.recommendations || [],
    sourceMetadata: result.sourceMetadata || ['VeriVest URL Intelligence'],
    analyzedAt: new Date().toISOString(),
    assessment: result.assessment,
    signals: result.signals,
    recommendedActions: result.recommendedActions,
    verification,
    aiAnalysis: aiAnalysis.summary,
    language: normalizeLanguage(req.body?.language),
    sourceType: 'url',
    evidenceSummary: result.evidenceSummary,
  };

  return res.json({
    success: true,
    analysis: canonical,
    riskScore: canonical.riskScore,
    riskLevel: canonical.riskLevel,
    assessment: canonical.assessment,
    summary: canonical.summary,
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

export async function analyzeScreenshotController(req: Request, res: Response) {
  const imageBase64 = typeof req.body?.imageBase64 === 'string' ? req.body.imageBase64 : '';
  const text = typeof req.body?.message === 'string' ? req.body.message : req.body?.content ?? '';
  const sourceText = text || imageBase64;
  const validationError = validateText(sourceText, 'Screenshot content');
  if (validationError) return res.status(400).json({ success: false, error: validationError });

  const lang = normalizeLanguage(req.body?.language);
  const result = detectInvestmentRisk({ text: sourceText, language: lang, type: 'screenshot' });
  const verification = await verifyEntity(req.body?.brokerName ?? '');
  const aiAnalysis = await generateContextualAnalysis({
    text: sourceText,
    language: lang,
    sourceType: 'screenshot',
    signals: result.signals,
    verificationSummary: verification.summary,
  });

  const canonical = {
    analysisId: `VV-${Date.now()}`,
    inputType: 'screenshot',
    riskScore: result.riskScore,
    riskLevel: result.riskLevel,
    confidence: Math.min(100, result.riskScore + 10),
    summary: result.summary,
    warningSignals: result.warningSignals || result.signals || [],
    extractedClaims: result.extractedClaims || [],
    evidence: result.evidence || [],
    entities: [],
    verificationResults: [verification],
    recommendations: result.recommendedActions || result.recommendations || [],
    sourceMetadata: result.sourceMetadata || ['OCR extraction', 'VeriVest Scam Intelligence Dataset'],
    analyzedAt: new Date().toISOString(),
    assessment: result.assessment,
    signals: result.signals,
    recommendedActions: result.recommendedActions,
    verification,
    aiAnalysis: aiAnalysis.summary,
    language: lang,
    sourceType: 'screenshot',
    evidenceSummary: result.evidenceSummary,
  };

  return res.json({
    success: true,
    analysis: canonical,
    riskScore: canonical.riskScore,
    riskLevel: canonical.riskLevel,
    assessment: canonical.assessment,
    summary: canonical.summary,
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

  const lang = normalizeLanguage(req.body?.language);
  const result = detectInvestmentRisk({ text: message, language: lang, type: 'tip' });
  const verification = await verifyEntity(req.body?.brokerName ?? '');
  const aiAnalysis = await generateContextualAnalysis({
    text: message,
    language: lang,
    sourceType: 'tip',
    signals: result.signals,
    verificationSummary: verification.summary,
  });

  const canonical = {
    analysisId: `VV-${Date.now()}`,
    inputType: 'tip',
    riskScore: result.riskScore,
    riskLevel: result.riskLevel,
    confidence: Math.min(100, result.riskScore + 10),
    summary: result.summary,
    warningSignals: result.warningSignals || result.signals || [],
    extractedClaims: result.extractedClaims || [],
    evidence: result.evidence || [],
    entities: [],
    verificationResults: [verification],
    recommendations: result.recommendedActions || result.recommendations || [],
    sourceMetadata: result.sourceMetadata || ['VeriVest Scam Intelligence Dataset'],
    analyzedAt: new Date().toISOString(),
    assessment: result.assessment,
    signals: result.signals,
    recommendedActions: result.recommendedActions,
    verification,
    aiAnalysis: aiAnalysis.summary,
    language: lang,
    sourceType: 'tip',
    evidenceSummary: result.evidenceSummary,
  };

  return res.json({
    success: true,
    analysis: canonical,
    riskScore: canonical.riskScore,
    riskLevel: canonical.riskLevel,
    assessment: canonical.assessment,
    summary: canonical.summary,
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
  const name = typeof req.body?.name === 'string' ? req.body.name : '';
  const registrationNumber = typeof req.body?.registrationNumber === 'string' ? req.body.registrationNumber : '';

  const verification = await verifyBroker({ name, registrationNumber });

  return res.json({
    success: true,
    verification,
    status: verification.status,
    summary: verification.summary,
  });
}

export async function analyzeLegacyController(req: Request, res: Response) {
  const type = normalizeType(req.body?.type ?? 'message');
  const payload = req.body ?? {};

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
