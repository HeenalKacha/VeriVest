import express from 'express';

import {
  analyzeLegacyController,
  analyzeMessageController,
  analyzeScreenshotController,
  analyzeTipController,
  analyzeUrlController,
  verifyBrokerController,
} from '../controllers/analyzeController.js';

const router = express.Router();

router.get('/health', (_req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

router.post('/analyze', analyzeLegacyController);
router.post('/analyze/message', analyzeMessageController);
router.post('/analyze/url', analyzeUrlController);
router.post('/analyze/screenshot', analyzeScreenshotController);
router.post('/analyze/tip', analyzeTipController);
router.post('/verify/broker', verifyBrokerController);

export default router;
