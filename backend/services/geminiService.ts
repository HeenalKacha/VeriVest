import { GoogleGenAI } from '@google/genai';
import type { Language } from '../models/analysis.js';

export interface GeminiContextInput {
  text: string;
  language: Language;
  sourceType: 'message' | 'url' | 'screenshot' | 'tip' | 'broker';
  signals: Array<{ id: string; title: string; severity: string; description: string; evidence: string }>;
  verificationSummary?: string;
}

export async function generateContextualAnalysis(input: GeminiContextInput): Promise<{ available: boolean; summary: string }> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { available: false, summary: 'AI contextual analysis unavailable because the backend API key is not configured.' };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const languageName = input.language === 'hi' ? 'Hindi' : input.language === 'mr' ? 'Marathi' : 'English';

    const prompt = `You are VeriVest’s backend risk analyst. Assess the following investment communication without making unsupported claims. Output only valid JSON with this structure: {
  "summary": "brief explanation in ${languageName}",
  "reasoning": "plain-language explanation of why risks matter",
  "recommendations": ["action 1", "action 2"]
}

Input type: ${input.sourceType}
Language: ${languageName}
Text: "${input.text.replace(/"/g, '\\"').slice(0, 2000)}"
Detected signals: ${JSON.stringify(input.signals)}
Verification summary: ${input.verificationSummary ?? 'No independent verification available.'}
Rules: Do not invent a government verification result. Do not claim certainty of fraud without evidence. Keep the tone factual and protective.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { temperature: 0.2, responseMimeType: 'application/json' },
    });

    const raw = response.text?.trim();
    if (!raw) {
      return { available: false, summary: 'AI contextual analysis unavailable because the model returned no usable output.' };
    }

    const parsed = JSON.parse(raw) as { summary?: string; reasoning?: string; recommendations?: string[] };
    if (!parsed.summary || typeof parsed.summary !== 'string') {
      return { available: false, summary: 'AI contextual analysis unavailable because the response was malformed.' };
    }

    return {
      available: true,
      summary: parsed.summary,
    };
  } catch (error) {
    console.warn('Gemini analysis failed:', error instanceof Error ? error.message : 'unknown');
    return { available: false, summary: 'AI contextual analysis unavailable; rule-based analysis remains available.' };
  }
}
