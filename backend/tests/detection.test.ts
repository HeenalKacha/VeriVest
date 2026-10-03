import test from 'node:test';
import assert from 'node:assert/strict';

import { detectInvestmentRisk } from '../detection/detector.js';

test('detects clearly suspicious investment message', () => {
  const result = detectInvestmentRisk({
    text: 'Guaranteed 40% returns in 7 days. Send ₹5000 to UPI abcwealth@okaxis right now. No risk.',
    language: 'en',
    type: 'message',
  });

  assert.ok(result.riskScore >= 70);
  assert.equal(result.riskLevel, 'HIGH');
  assert.ok(result.signals.length > 0);
});

test('treats ordinary financial discussion as low risk', () => {
  const result = detectInvestmentRisk({
    text: 'I am comparing index funds and reading annual report details before making a plan.',
    language: 'en',
    type: 'message',
  });

  assert.ok(result.riskScore < 40);
  assert.equal(result.riskLevel, 'LOW');
});

test('flags urgency and payment pressure', () => {
  const result = detectInvestmentRisk({
    text: 'Only 2 seats left today. Pay via UPI and join the private group immediately.',
    language: 'en',
    type: 'tip',
  });

  assert.ok(result.riskScore >= 50);
  assert.ok(result.signals.some((signal) => signal.category.includes('urgency') || signal.category.includes('payment')));
});
