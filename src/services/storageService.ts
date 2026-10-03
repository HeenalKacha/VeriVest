import { AnalysisResult, Language, User, SimulatorProgress } from '../types';

const LANG_KEY = 'verivest_language';
const USER_KEY = 'verivest_auth_user';
const HISTORY_KEY = 'verivest_scan_history';
const ACTIVE_DOSSIER_KEY = 'verivest_active_dossier';
const SIMULATOR_PROGRESS_KEY = 'verivest_simulator_progress';

export const DEFAULT_USER: User = {
  id: 'usr-8921',
  name: 'Rohan Sharma',
  mobile: '+91 98765 43210',
  email: 'rohan.sharma@investor.in',
  age: 32,
  gender: 'Male',
  language: 'en',
  createdAt: 'Oct 2026',
};

export const DEFAULT_SIMULATOR_PROGRESS: SimulatorProgress = {
  totalQuestions: 10,
  completedQuestions: 10,
  correctAnswers: 8,
  score: 80,
  isCompleted: true,
  completedAt: 'Just now',
  badgeTitle: 'Investor Safety Learner',
};

export const storageService = {
  getLanguage(): Language {
    try {
      const stored = localStorage.getItem(LANG_KEY);
      if (stored === 'hi' || stored === 'mr' || stored === 'en') {
        return stored;
      }
    } catch {
      // fallback
    }
    return 'en';
  },

  setLanguage(lang: Language): void {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      // ignore
    }
  },

  getUser(): User | null {
    try {
      const stored = localStorage.getItem(USER_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure default fields exist
        return {
          id: parsed.id || 'usr-8921',
          name: parsed.name || 'Rohan Sharma',
          mobile: parsed.mobile || '+91 98765 43210',
          email: parsed.email || 'rohan.sharma@investor.in',
          age: parsed.age || 32,
          gender: parsed.gender || 'Male',
          language: parsed.language || 'en',
          createdAt: parsed.createdAt || 'Oct 2026',
        };
      }
    } catch {
      // fallback
    }
    return DEFAULT_USER;
  },

  setUser(user: User | null): void {
    try {
      if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_KEY);
      }
    } catch {
      // ignore
    }
  },

  getSimulatorProgress(): SimulatorProgress {
    try {
      const stored = localStorage.getItem(SIMULATOR_PROGRESS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return DEFAULT_SIMULATOR_PROGRESS;
  },

  saveSimulatorProgress(progress: SimulatorProgress): void {
    try {
      localStorage.setItem(SIMULATOR_PROGRESS_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  },

  getHistory(): AnalysisResult[] {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return [];
  },

  saveScan(result: AnalysisResult): void {
    try {
      const existing = this.getHistory();
      // Prepend the new scan, avoid duplicate by id
      const filtered = existing.filter((item) => item.id !== result.id);
      const updated = [result, ...filtered];
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  },

  deleteScan(id: string): void {
    try {
      const existing = this.getHistory();
      const updated = existing.filter((item) => item.id !== id);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  },

  getActiveDossier(): AnalysisResult {
    try {
      const stored = localStorage.getItem(ACTIVE_DOSSIER_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return {
      id: 'empty',
      timestamp: new Date().toISOString(),
      sourceType: 'message',
      sourceLabel: 'No active scan',
      rawInput: '',
      riskScore: 0,
      riskLevel: 'LOW',
      assessment: 'LOW CONCERN',
      warningIndicatorsCount: 0,
      assessmentCaveat: 'No analyze result selected yet.',
      summary: 'No scan result is available yet.',
      forensicDirective: 'Run a scan to generate a real analysis result.',
      whyThisMatters: 'This is an empty placeholder until a real scan completes.',
      claims: [],
      scamDna: [],
      signals: [],
      recommendedActions: [],
      limitations: ['No scan result is available yet.'],
      speechSummary: 'No scan result is available yet.',
    };
  },

  setActiveDossier(dossier: AnalysisResult): void {
    try {
      localStorage.setItem(ACTIVE_DOSSIER_KEY, JSON.stringify(dossier));
    } catch {
      // ignore
    }
  },
};
