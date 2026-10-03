import test from 'node:test';
import assert from 'node:assert/strict';

import { detectInvestmentRisk } from '../detection/detector.js';
import { verifyBroker, verifyDomain } from '../services/verificationService.js';

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

test('detects Hindi scam indicators with proper weighting', () => {
  const result = detectInvestmentRisk({
    text: 'गारंटी 50% रिटर्न केवल आज। पैसे भेजें और तुरंत ग्रुप जॉइन करें।',
    language: 'hi',
    type: 'message',
  });

  assert.ok(result.riskScore >= 50);
  assert.ok(result.signals.length >= 2);
});

test('verifies genuine registered broker correctly', async () => {
  const result = await verifyBroker({
    name: 'Zerodha Broking Limited',
    registrationNumber: 'INZ000293433',
  });

  assert.equal(result.status, 'VERIFIED');
  assert.ok(result.summary.includes('Zerodha'));
});

test('flags unverified or unregistered entity honestly without crashing', async () => {
  const result = await verifyBroker({
    name: 'FakeCryptoWealthLTD',
    registrationNumber: 'FAKE999999',
  });

  assert.equal(result.status, 'UNABLE_TO_VERIFY');
});

test('verifies official domain with or without protocol', async () => {
  const res1 = await verifyDomain('https://sebi.gov.in');
  const res2 = await verifyDomain('sebi.gov.in');

  assert.equal(res1.status, 'VERIFIED');
  assert.equal(res2.status, 'VERIFIED');
});
