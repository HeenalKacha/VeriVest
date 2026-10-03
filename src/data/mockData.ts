import { AnalysisResult } from '../types';

export const demoArchetypes = [
  {
    id: 'demo-1',
    label: 'Fake Investment Message (Guaranteed 50% Returns)',
    category: 'DEMO • GUARANTEED RETURN & FOMO',
    type: 'message' as const,
    isDemo: true,
    content: `🚨 EXCLUSIVE VIP WEALTH DESK 🚨
Guaranteed 50% monthly returns with zero risk!
Our private algorithmic trading pool consistently beats the market.
Only 4 spots remaining for this week's cohort.
Transfer ₹25,000 to treasury coordinator via UPI: growwealth.nodal@okaxis.
Act before 3:30 PM today to lock in your guaranteed slot!`,
  },
  {
    id: 'demo-2',
    label: 'Fake Broker Registration Claim (Cloned License)',
    category: 'DEMO • UNVERIFIED REGISTRATION',
    type: 'broker' as const,
    isDemo: true,
    brokerName: 'Apex Capital Advisors Pvt Ltd',
    regNumber: 'INA000998877',
    content: `Entity: Apex Capital Advisors Pvt Ltd | Claimed Registration: INA000998877. Operating online portal www.apex-capital-invest.online. Direct transfers requested to retail beneficiary accounts.`,
  },
  {
    id: 'demo-3',
    label: 'Fake Telegram Investment Tip (Crypto Upfront Fee)',
    category: 'DEMO • TELEGRAM TIP GROUP',
    type: 'tip' as const,
    isDemo: true,
    content: `🔥 SURE-SHOT CRUDE & BANK NIFTY 1000% TARGET!
Insiders have confirmed massive breakout for tomorrow's opening bell.
Pay ₹10,000 upfront consultation fee to private USDT wallet (TRC-20) or personal UPI rahul.sharma92@icici to join VIP live execution room.
Guaranteed profit or 100% money back!`,
  },
  {
    id: 'demo-4',
    label: 'Fake Trading Portal Link (Clone Domain)',
    category: 'DEMO • SUSPICIOUS WEBSITE',
    type: 'url' as const,
    isDemo: true,
    url: 'https://apex-capital-invest.online',
    content: 'https://apex-capital-invest.online',
  },
];

// Re-export for backward compatibility
export const forensicArchetypes = demoArchetypes;

export const initialHistoricalDossiers: AnalysisResult[] = [
  {
    id: 'VV-84920',
    timestamp: 'Today, 14:32',
    sourceType: 'message',
    sourceLabel: 'WhatsApp Tip Message',
    rawInput: `🚨 EXCLUSIVE VIP WEALTH DESK 🚨
Guaranteed 40% returns in 7 days!
Join now — only 10 spots left.
Transfer funds to coordinator: abcwealth.nodal@okaxis. Registered under SEBI IN000123456.`,
    riskScore: 88,
    riskLevel: 'HIGH',
    assessment: 'HIGH CONCERN',
    warningIndicatorsCount: 4,
    assessmentCaveat:
      'This assessment is based on observable warning signs and verification gaps. It does not determine with certainty that a person, company or message is fraudulent.',
    summary: 'Guaranteed returns claim (40%) • Artificial urgency • Personal UPI address • Unindexed registration number',
    forensicDirective: 'Pause before investing. Multiple critical warning indicators were identified. Do not wire funds.',
    whyThisMatters:
      'The message combines financial promises with urgency and payment pressure. These tactics are designed to reduce the time available for independent verification.',
    claims: [
      {
        id: 'claim-1',
        claimNumber: 'CLAIM 01',
        quote: 'Guaranteed 40% returns in 7 days',
        category: 'Guaranteed Returns',
        signalId: 'sig-1',
        verificationNote: 'Liquid capital markets cannot offer risk-free 40% weekly returns.',
      },
      {
        id: 'claim-2',
        claimNumber: 'CLAIM 02',
        quote: 'Only 10 spots left',
        category: 'Artificial Urgency',
        signalId: 'sig-2',
        verificationNote: 'Scarcity pressure used to bypass consultation.',
      },
      {
        id: 'claim-3',
        claimNumber: 'CLAIM 03',
        quote: 'Transfer funds to coordinator: abcwealth.nodal@okaxis',
        category: 'Payment Routing',
        signalId: 'sig-4',
        verificationNote: 'Direct retail UPI handle rather than corporate client depository.',
      },
      {
        id: 'claim-4',
        claimNumber: 'CLAIM 04',
        quote: 'Registered under SEBI IN000123456',
        category: 'Regulatory Claim',
        signalId: 'sig-3',
        verificationNote: 'Registration format does not match recognized database record.',
      },
    ],
    scamDna: [
      {
        id: 'sig-1',
        name: 'Guaranteed Returns Claim',
        severity: 'critical',
        evidence: 'Guaranteed 40% returns in 7 days',
        whyItMatters:
          'Promises of guaranteed high returns violate basic financial mechanics. Registered intermediaries are legally forbidden from promising fixed returns on equity securities.',
        recommendedAction: 'Do not transfer money until the claim and entity are independently verified.',
        category: 'Guaranteed / unrealistic returns',
        educationalGuideId: 'guaranteed-return-scams',
      },
      {
        id: 'sig-2',
        name: 'Artificial Scarcity & Urgency',
        severity: 'high',
        evidence: 'Only 10 spots left',
        whyItMatters:
          'Creating artificial urgency is a psychological tactic to induce rapid action before you can verify credentials or consult family.',
        recommendedAction: 'Refuse to be pressured by arbitrary countdowns or seat limits.',
        category: 'Artificial urgency',
        educationalGuideId: 'pump-and-dump',
      },
      {
        id: 'sig-3',
        name: 'Unverified Regulatory Claim',
        severity: 'high',
        evidence: 'Registered under SEBI IN000123456',
        whyItMatters:
          'Citing fabricated or borrowed registration numbers is a common tactic to manufacture immediate credibility.',
        recommendedAction: 'Verify the identifier directly on the official regulator directory at sebi.gov.in.',
        category: 'Fake regulatory claims',
        educationalGuideId: 'identifying-fake-sebi-registrations',
      },
      {
        id: 'sig-4',
        name: 'Personal UPI Routing',
        severity: 'critical',
        evidence: 'abcwealth.nodal@okaxis',
        whyItMatters:
          'Regulated entities must deposit client funds into segregated corporate escrow accounts, never personal retail handles.',
        recommendedAction: 'Never send investment capital to an individual UPI address.',
        category: 'Personal UPI / unusual payment request',
        educationalGuideId: 'fake-broker-portals',
      },
    ],
    signals: [
      {
        id: 'sig-1',
        title: 'Guaranteed Returns Claim',
        severity: 'critical',
        explanation: 'Promises of unusually high returns violating baseline market principles.',
      },
      {
        id: 'sig-2',
        title: 'Artificial Scarcity & Urgency',
        severity: 'high',
        explanation: 'Fabricated deadlines and scarcity pressure.',
      },
    ],
    recommendedActions: [
      '1. Do not transfer funds or approve UPI payment mandates.',
      '2. Do not share OTPs, PINs or banking credentials.',
      '3. Independently verify the entity on the official SEBI portal (sebi.gov.in).',
      '4. Report suspicious solicitation to National Cyber Crime helpline (1930).',
    ],
    verificationDetails: {
      claimedEntity: 'ABC Wealth Advisors',
      claimedRegNumber: 'IN000123456',
      status: 'NO_MATCH_FOUND',
      sourceChecked: 'Standard Regulatory Syntax & Public Benchmark Index',
      lastChecked: 'Today, 14:32 (Local Index)',
      whatWasVerified: ['Registration format syntax checked'],
      whatCouldNotBeVerified: [
        'Registration token was not found in the local benchmark database',
        'Live external query to sebi.gov.in was not executed without direct API connection',
      ],
      registryMatches: {
        sebi: 'No match in local benchmark index — check sebi.gov.in directly',
        rbi: 'No record',
        mca: 'No corporate CIN matched',
      },
    },
    limitations: [
      'Automated analysis detects behavioral and linguistic patterns; it does not replace official judicial inquiry.',
      'Verification status reflects availability in public benchmark index. Live external registry query was not executed.',
    ],
    speechSummary:
      'Caution. VeriVest identified 4 warning signs in this message, including a 40% guaranteed return claim and personal UPI routing. Do not transfer any money.',
  },
  {
    id: 'VV-84880',
    timestamp: '4 days ago',
    sourceType: 'broker',
    sourceLabel: 'Registration Verification: INZ000293433',
    rawInput: 'Entity: Zerodha Broking Limited, Registration: INZ000293433',
    riskScore: 6,
    riskLevel: 'LOW',
    assessment: 'LOW CONCERN',
    warningIndicatorsCount: 0,
    assessmentCaveat:
      'This assessment is based on observable warning signs and verification gaps. It does not determine with certainty that a person, company or message is fraudulent or safe.',
    summary: 'Confirmed benchmark SEBI Stock Broker & Depository Participant registration record.',
    forensicDirective: 'Registration format matches benchmark record. Ensure communication originates from official verified domains.',
    whyThisMatters: 'Verified license format helps confirm corporate registration, but always guard against impersonation.',
    claims: [
      {
        id: 'claim-1',
        claimNumber: 'CLAIM 01',
        quote: 'Registration: INZ000293433',
        category: 'Broker License',
        verificationNote: 'Matches registered institutional broker in benchmark index.',
      },
    ],
    scamDna: [
      {
        id: 'sig-b1',
        name: 'Benchmark Regulatory Registration',
        severity: 'info',
        evidence: 'INZ000293433 - Zerodha Broking Limited',
        whyItMatters: 'Registration number matches active institutional stock brokerage profile in benchmark directory.',
        recommendedAction: 'Ensure funds are routed exclusively via the official Zerodha portal or verified virtual account.',
        category: 'Verified entity',
      },
    ],
    signals: [
      {
        id: 'sig-b1',
        title: 'Active Regulatory License Verified',
        severity: 'info',
        explanation: 'Registration identifier matches active institutional brokerage profile.',
      },
    ],
    recommendedActions: [
      '1. Verify that all fund deposits occur through the official portal or designated virtual accounts.',
      '2. Ensure emails or links originate strictly from @zerodha.com domains.',
    ],
    verificationDetails: {
      claimedEntity: 'Zerodha Broking Limited',
      claimedRegNumber: 'INZ000293433',
      status: 'VERIFIED',
      sourceChecked: 'SEBI Public Stock Broker Reference Index',
      lastChecked: '4 days ago (Index Record)',
      whatWasVerified: [
        'Registration number format valid: INZ000293433',
        'Entity name matches registered profile: Zerodha Broking Limited',
        'Official domain reference: zerodha.com',
      ],
      whatCouldNotBeVerified: [
        'Whether any individual contacting you via phone or chat is an authorized employee (always confirm via official channels)',
      ],
      registryMatches: {
        sebi: 'Active Stock Broker / Depository Participant',
        rbi: 'N/A (Non-lending intermediary)',
        mca: 'Corporate entity on file',
      },
    },
    limitations: [
      'Automated analysis detects behavioral and linguistic patterns; it does not replace official judicial inquiry.',
    ],
    speechSummary:
      'The registration number matches the benchmark SEBI profile for Zerodha Broking Limited. Ensure communications come strictly from official domains.',
  },
];
