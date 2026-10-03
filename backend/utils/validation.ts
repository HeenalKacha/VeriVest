import type { Language } from '../models/analysis.js';
import { EVIDENCE_SNIPPET_DEFAULT_MAX_LENGTH } from './constants.js';

export function normalizeText(input: string): string {
  return String(input ?? '').replace(/\s+/g, ' ').trim();
}

export function normalizeLanguage(language?: string): Language {
  if (language === 'hi' || language === 'mr') return language;
  return 'en';
}

export function validateText(text: string, fieldName: string): string | null {
  const normalized = normalizeText(text);
  if (!normalized) {
    return `${fieldName} is required.`;
  }
  return null;
}

export function getEvidenceSnippet(text: string, maxLength = EVIDENCE_SNIPPET_DEFAULT_MAX_LENGTH): string {
  return normalizeText(text).slice(0, maxLength) || 'No direct quote available';
}
