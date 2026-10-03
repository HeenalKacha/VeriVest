// ─── Risk scoring thresholds ──────────────────────────────────────────────────

/** Minimum score to classify a result as HIGH risk. */
export const RISK_SCORE_HIGH_THRESHOLD = 70;

/** Minimum score to classify a result as SUSPICIOUS risk. */
export const RISK_SCORE_SUSPICIOUS_THRESHOLD = 35;

/** Maximum possible risk score. */
export const RISK_SCORE_MAX = 100;

/** Flat bonus added to the raw score when at least one signal is matched. */
export const RISK_SCORE_BASE_BONUS = 8;

/** Default weight applied to a scam indicator that has no explicit weight. */
export const DEFAULT_INDICATOR_WEIGHT = 10;

// ─── Confidence calculation ───────────────────────────────────────────────────

/** Points added to the risk score when computing the confidence value. */
export const CONFIDENCE_SCORE_OFFSET = 10;

// ─── Evidence / snippet lengths ───────────────────────────────────────────────

/** Maximum character length for an evidence snippet returned in a signal. */
export const EVIDENCE_SNIPPET_MAX_LENGTH = 200;

/** Default maximum character length used by getEvidenceSnippet(). */
export const EVIDENCE_SNIPPET_DEFAULT_MAX_LENGTH = 180;
