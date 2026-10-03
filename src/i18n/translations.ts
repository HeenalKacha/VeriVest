import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  forensicVerification: string;
  inquiryDesk: string;
  nav: {
    verifyAScam: string;
    howItWorks: string;
    learn: string;
    scanHistory: string;
    tipProfiler: string;
    signIn: string;
    signUp: string;
    checkSomething: string;
    profile: string;
    settings: string;
    signOut: string;
  };
  auth: {
    signInTitle: string;
    signInSubtitle: string;
    signUpTitle: string;
    signUpSubtitle: string;
    emailOrMobile: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    confirmPassword: string;
    fullName: string;
    fullNamePlaceholder: string;
    mobileNumber: string;
    mobilePlaceholder: string;
    rememberMe: string;
    forgotPassword: string;
    signInBtn: string;
    signUpBtn: string;
    continueWithGoogle: string;
    noAccount: string;
    alreadyAccount: string;
    createAccount: string;
    forgotPasswordTitle: string;
    forgotPasswordSubtitle: string;
    sendResetLink: string;
    resetLinkSent: string;
    privacyNotice: string;
    preferredLanguage: string;
  };
  landing: {
    standardBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    checkCta: string;
    howItWorksCta: string;
    registryCrossCheck: string;
    ribbon: {
      analyze: string;
      understand: string;
      verify: string;
      protect: string;
    };
    scopeTitle: string;
    scopeSubtitle: string;
    modes: {
      messageTitle: string;
      messageDesc: string;
      messageAction: string;
      linkTitle: string;
      linkDesc: string;
      linkAction: string;
      brokerTitle: string;
      brokerDesc: string;
      brokerAction: string;
      screenshotTitle: string;
      screenshotDesc: string;
      screenshotAction: string;
    };
    methodologyTitle: string;
    methodologySubtitle: string;
    steps: {
      s1Title: string;
      s1Desc: string;
      s2Title: string;
      s2Desc: string;
      s3Title: string;
      s3Desc: string;
    };
    breakdownTitle: string;
    breakdownSubtitle: string;
    specimenCard: {
      tag: string;
      title: string;
      scoreLabel: string;
      fullReport: string;
    };
    encyclopediaTitle: string;
    encyclopediaSubtitle: string;
    ctaBannerTitle: string;
    ctaBannerSub: string;
    ctaBannerBtn: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    tabMessage: string;
    tabLink: string;
    tabScreenshot: string;
    tabBroker: string;
    msgScanHeader: string;
    msgScanNotice: string;
    msgPlaceholder: string;
    charCount: string;
    insertClipboard: string;
    analyzeBtn: string;
    clearBtn: string;
    orScreenshot: string;
    archetypesTitle: string;
    linkInputLabel: string;
    linkPlaceholder: string;
    checkLinkBtn: string;
    screenshotDropTitle: string;
    screenshotDropSub: string;
    browseFiles: string;
    analyzeScreenshotBtn: string;
    privacyWarning: string;
    brokerNameLabel: string;
    brokerNamePlaceholder: string;
    brokerRegLabel: string;
    brokerRegPlaceholder: string;
    verifyBrokerBtn: string;
    demoNote: string;
    whatVeriVestChecks: string;
    checks: {
      c1Title: string;
      c1Desc: string;
      c2Title: string;
      c2Desc: string;
      c3Title: string;
      c3Desc: string;
      c4Title: string;
      c4Desc: string;
    };
    confidentialityTitle: string;
    confidentialityDesc: string;
    benchmarks: {
      dailyClaims: string;
      falsePositive: string;
    };
    dossierCardTitle: string;
  };
  loading: {
    title: string;
    subtitle: string;
    s1: string;
    s2: string;
    s3: string;
    s4: string;
  };
  result: {
    title: string;
    analyzedToday: string;
    printFile: string;
    rawPayload: string;
    aggregateThreatIndex: string;
    probabilityLoss: string;
    forensicDirectiveTitle: string;
    detectedSignals: string;
    activeVectors: string;
    recommendedActions: string;
    flagWatchdog: string;
    protectCircle: string;
    protectCircleSub: string;
    downloadPdf: string;
    shareWarning: string;
    verifyAnother: string;
    verifySourceTitle: string;
    claimedEntity: string;
    claimedRegNumber: string;
    verificationStatus: string;
    checkOfficialRecords: string;
    whyThisMattersTitle: string;
    whyThisMattersText: string;
    investigativeRegistryLog: string;
    helplineText: string;
    dossierStampTitle: string;
  };
  tipProfiler: {
    title: string;
    subtitle: string;
    detectedMessage: string;
    classification: string;
    highRiskSolicitation: string;
    evidentiaryMarkers: string;
    evaluation: string;
    reScan: string;
    downloadAudit: string;
    pasteTipLabel: string;
    pasteTipPlaceholder: string;
    analyzeTipBtn: string;
  };
  history: {
    title: string;
    subtitle: string;
    allRecords: string;
    highRiskFilter: string;
    verifiedFilter: string;
    suspiciousFilter: string;
    colSubject: string;
    colStatus: string;
    colTime: string;
    colAction: string;
    viewAnalysis: string;
    searchPlaceholder: string;
    emptyText: string;
  };
  education: {
    title: string;
    subtitle: string;
    readGuide: string;
    modalRedFlags: string;
    modalWhatToDo: string;
    modalExample: string;
    close: string;
    bannerTitle: string;
    bannerSub: string;
    bannerBtn: string;
  };
  settings: {
    title: string;
    accountSection: string;
    prefSection: string;
    securitySection: string;
    privacySection: string;
    languageLabel: string;
    saveChanges: string;
    changePassword: string;
    privacyStorageDesc: string;
  };
  scan: {
    pageTitle: string;
    pageSubtitle: string;
    tabMessage: string;
    tabScreenshot: string;
    tabLink: string;
    tabEntity: string;
    msgLabel: string;
    pasteBtn: string;
    msgPlaceholder: string;
    screenshotDropTitle: string;
    screenshotDropSub: string;
    screenshotUploaded: string;
    removeImage: string;
    ocrLabel: string;
    ocrReading: string;
    ocrPlaceholder: string;
    linkLabel: string;
    entityNameLabel: string;
    entityNamePlaceholder: string;
    entityRegLabel: string;
    entityRegPlaceholder: string;
    analyzeBtn: string;
    privacyNotice: string;
    trySampleLabel: string;
    sensitiveWarning: string;
    errorMessage: string;
    errorNoMessage: string;
    errorNoScreenshot: string;
    errorNoLink: string;
    errorNoEntity: string;
  };
  learn: {
    pageTitle: string;
    pageSubtitle: string;
    tabSimulator: string;
    tabGuides: string;
    safeChoices: string;
    simulatedPitch: string;
    whatWouldYouDo: string;
    goodDecision: string;
    warningFlag: string;
    warningSigns: string;
    achievement: string;
    achievementBody: string;
    viewProfile: string;
    tryAnother: string;
    readGuide: string;
  };
  tipPage: {
    pageTitle: string;
    pageSubtitle: string;
    inputLabel: string;
    inputPlaceholder: string;
    evaluatesNote: string;
    analyzeTipBtn: string;
    sampleBreakdownTitle: string;
    nextSpecimen: string;
    tipContent: string;
    tacticsLabel: string;
    verificationGapsLabel: string;
    safeNextStepsLabel: string;
    scanThisTipBtn: string;
    noTradingNote: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'VeriVest',
    tagline: 'Verify before you invest.',
    forensicVerification: 'FORENSIC VERIFICATION',
    inquiryDesk: 'INQUIRY DESK',
    nav: {
      verifyAScam: 'VERIFY A SCAM',
      howItWorks: 'HOW IT WORKS',
      learn: 'LEARN',
      scanHistory: 'SCAN HISTORY',
      tipProfiler: 'TIP PROFILER',
      signIn: 'SIGN IN',
      signUp: 'SIGN UP',
      checkSomething: 'CHECK SOMETHING',
      profile: 'PROFILE',
      settings: 'SETTINGS',
      signOut: 'SIGN OUT',
    },
    auth: {
      signInTitle: 'Sign in to VeriVest.',
      signInSubtitle: 'Verify suspicious investment claims before you trust them.',
      signUpTitle: 'Create your VeriVest account.',
      signUpSubtitle: 'Start checking suspicious investment messages, links and financial claims.',
      emailOrMobile: 'EMAIL ADDRESS OR MOBILE NUMBER',
      emailPlaceholder: 'Enter your email or mobile number',
      password: 'PASSWORD',
      passwordPlaceholder: 'Enter your password',
      confirmPassword: 'CONFIRM PASSWORD',
      fullName: 'FULL NAME',
      fullNamePlaceholder: 'e.g. Alex Morgan',
      mobileNumber: 'MOBILE NUMBER',
      mobilePlaceholder: '+91 98765 43210',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      signInBtn: 'SIGN IN →',
      signUpBtn: 'CREATE ACCOUNT →',
      continueWithGoogle: 'CONTINUE WITH GOOGLE',
      noAccount: "Don't have an account?",
      alreadyAccount: 'Already have an account?',
      createAccount: 'Create account →',
      forgotPasswordTitle: 'Reset your password',
      forgotPasswordSubtitle: 'Enter your registered email or mobile number to receive a secure recovery link.',
      sendResetLink: 'Send reset link',
      resetLinkSent: 'Reset link has been dispatched to your email / SMS.',
      privacyNotice: 'Your financial information stays private and end-to-end sanitized.',
      preferredLanguage: 'PREFERRED REPORTING LANGUAGE',
    },
    landing: {
      standardBadge: 'EDITORIAL REGISTRY STANDARD 2025',
      heroTitle: 'Verify. Before You Invest.',
      heroSubtitle: 'AI-powered forensic protection against suspicious investment messages, fraudulent brokers, misleading yield claims, and organized financial scams.',
      checkCta: 'CHECK SOMETHING',
      howItWorksCta: 'HOW IT WORKS',
      registryCrossCheck: 'CROSS-REFERENCED WITH 28 GLOBAL REGULATORY REGISTRIES',
      ribbon: {
        analyze: 'Analyze • Linguistic vectors',
        understand: 'Understand • Pressure patterns',
        verify: 'Verify • Entity disclosures',
        protect: 'Protect • Institutional capital',
      },
      scopeTitle: 'Multi-Modal Forensic Audit',
      scopeSubtitle: 'Deploy specialized models trained on thousands of reported deception templates and regulatory enforcement actions.',
      modes: {
        messageTitle: 'Investment Messages',
        messageDesc: 'Analyze suspicious WhatsApp, Telegram or SMS solicitation transcripts for psychological coercion markers.',
        messageAction: 'INSPECT TEXT →',
        linkTitle: 'Links & Websites',
        linkDesc: 'Check suspicious broker portals, spoofed URL cloaking, newly registered domains, and phishing assets.',
        linkAction: 'AUDIT URL →',
        brokerTitle: 'Broker & Registration',
        brokerDesc: 'Cross-check firm registration credentials, licensing numbers, and disclosed disciplinary history across SEC/FCA/SEBI.',
        brokerAction: 'SEARCH REGISTRY →',
        screenshotTitle: 'Screenshots',
        screenshotDesc: 'Upload screenshots of trading yields, fake account balances, WhatsApp conversations, or certificate claims.',
        screenshotAction: 'ANALYZE CAPTURE →',
      },
      methodologyTitle: 'Calm Forensic Execution',
      methodologySubtitle: 'A deterministic verification chain that evaluates evidentiary weight before generating judicial risk breakdowns.',
      steps: {
        s1Title: 'Submit',
        s1Desc: 'Paste a message transcript, domain address, corporate assertion, or upload a direct conversation screenshot to our private scanner.',
        s2Title: 'Analyze',
        s2Desc: 'VeriVest deconstructs rhetorical pressure traps, cross-queries blacklisted payment gateways, and models fraudulent return heuristics.',
        s3Title: 'Verify',
        s3Desc: 'Receive clear evidential substantiation with exact warning indicators mapped directly to recognized regulatory enforcement records.',
      },
      breakdownTitle: "Don't just get a warning. Understand why.",
      breakdownSubtitle: 'Blackbox flags cause confusion. VeriVest dissects claims down to specific linguistic markers, synthetic registration credentials, and unbacked yield projections.',
      specimenCard: {
        tag: 'LIVE AUDIT DOSSIER #VV-9042',
        title: 'Apex Yield Global Telegram Group',
        scoreLabel: 'COMPOSITE THREAT INDEX',
        fullReport: 'FULL AUDIT REPORT ↗',
      },
      encyclopediaTitle: 'Forensic Intelligence Index',
      encyclopediaSubtitle: 'Plain-language guides to recognizing financial deception, authored by forensic analysts and securities lawyers.',
      ctaBannerTitle: "Not sure if it's real? Check it before you trust it.",
      ctaBannerSub: 'Verify claims confidentially. Our neural forensic pipeline checks against regulatory sanctions and live deceptive patterns in under 15 seconds.',
      ctaBannerBtn: 'VERIFY NOW',
    },
    dashboard: {
      title: 'Verify an Investment',
      subtitle: 'Paste, upload or enter the information you want to check against our financial crimes registry and linguistic manipulation index.',
      tabMessage: 'PASTE MESSAGE',
      tabLink: 'CHECK LINK',
      tabScreenshot: 'UPLOAD SCREENSHOT',
      tabBroker: 'VERIFY BROKER',
      msgScanHeader: 'PLAINTEXT RAW SCAN • 4,000 char threshold',
      msgScanNotice: '256-bit Ephemeral Sanitization',
      msgPlaceholder: "Paste suspicious message, investment claim or social media text... e.g., 'Guaranteed 40% returns monthly, registered with official authority, limited slots available, transfer funds directly to treasury custodian desk...'",
      charCount: 'Character count',
      insertClipboard: 'Insert Clipboard',
      analyzeBtn: 'ANALYZE CLAIM',
      clearBtn: 'CLEAR',
      orScreenshot: 'Or upload screenshot instead',
      archetypesTitle: 'TEST WITH FORENSIC ARCHETYPES (CLICK TO LOAD):',
      linkInputLabel: 'PASTE WEBSITE OR BROKER URL',
      linkPlaceholder: 'https://apex-capital-investments-portal.net',
      checkLinkBtn: 'AUDIT DOMAIN & SSL INTEGRITY',
      screenshotDropTitle: 'Drop screenshot or conversation capture here',
      screenshotDropSub: 'Supports PNG, JPG, WEBP (Max 10MB)',
      browseFiles: 'Browse local files',
      analyzeScreenshotBtn: 'ANALYZE SCREENSHOT VIA VISION OCR',
      privacyWarning: 'Your screenshot may contain sensitive personal information. We sanitize phone numbers and bank account fragments in-memory before analysis.',
      brokerNameLabel: 'BROKER / ADVISOR / ENTITY NAME',
      brokerNamePlaceholder: 'e.g. ABC Wealth Advisors, Apex Securities Ltd.',
      brokerRegLabel: 'REGISTRATION / LICENSE NUMBER',
      brokerRegPlaceholder: 'e.g. IN000123456 or CRD# 928374',
      verifyBrokerBtn: 'VERIFY REGULATORY STANDING',
      demoNote: 'Demo verification mode: Connects to mock regulatory registries (SEBI / FINRA / FCA) containing real fraud indicators.',
      whatVeriVestChecks: 'What VeriVest Checks Automatically',
      checks: {
        c1Title: 'Syntax & Urgent Patterns',
        c1Desc: 'Detects false scarcity prompts, guaranteed return heuristics, and pressure messaging used by boiler rooms.',
        c2Title: 'Regulatory Match Status',
        c2Desc: 'Cross-checks broker licenses, CRD records, and registered representative databases globally in real time.',
        c3Title: 'Pump-and-Dump Fingerprints',
        c3Desc: 'Identifies recurring copy pasted across Telegram pump syndicates and compromised WhatsApp channels.',
        c4Title: 'Personal Account Red Flags',
        c4Desc: 'Flags payment routing to individual personal bank handles instead of SEBI/SEC institutional escrow accounts.',
      },
      confidentialityTitle: 'CONFIDENTIALITY GUARANTEE',
      confidentialityDesc: 'Your queries are processed privately and never shared with third parties. Telemetry data is purged within 60 minutes after analysis completion.',
      benchmarks: {
        dailyClaims: 'Daily Claims Scanned',
        falsePositive: 'False positive margin',
      },
      dossierCardTitle: 'VERIVEST INTELLIGENCE DOSSIERS - Read the Q1 Forensic Summary on Social Media Finfluencer Schemes.',
    },
    loading: {
      title: 'Analyzing your investment claim...',
      subtitle: 'Deconstructing evidentiary vectors against regulatory registries and financial manipulation models.',
      s1: 'Extracting linguistic and entity information',
      s2: 'Identifying suspicious coercive patterns',
      s3: 'Evaluating regulatory & risk heuristics',
      s4: 'Preparing judicial explanation & next steps',
    },
    result: {
      title: 'Your Investment Check',
      analyzedToday: 'Analyzed today',
      printFile: 'PRINT FILE',
      rawPayload: 'RAW MESSAGE PAYLOAD',
      aggregateThreatIndex: 'AGGREGATE THREAT INDEX',
      probabilityLoss: 'Probability of Capital Total Loss',
      forensicDirectiveTitle: 'FORENSIC DIRECTIVE',
      detectedSignals: 'Detected Evidentiary Signals',
      activeVectors: 'ACTIVE VECTORS',
      recommendedActions: 'Recommended Course of Action',
      flagWatchdog: 'FLAG TO CONSUMER WATCHDOG',
      protectCircle: 'Protect Your Circle',
      protectCircleSub: 'Share this specific finding dossier to prevent family & peers from losing funds.',
      downloadPdf: 'DOWNLOAD VERIFICATION REPORT (PDF)',
      shareWarning: 'SHARE WARNING WITH FAMILY',
      verifyAnother: 'VERIFY ANOTHER CLAIM',
      verifySourceTitle: 'Verify the Source',
      claimedEntity: 'CLAIMED ENTITY NAME',
      claimedRegNumber: 'CLAIMED REG NUMBER',
      verificationStatus: 'VERIFICATION STATUS',
      checkOfficialRecords: 'Check Official Records',
      whyThisMattersTitle: 'Why this matters',
      whyThisMattersText: 'Scammers frequently use fabricated registration numbers or impersonate legitimate financial institutions to create false trust. Always cross-check independently through the official government registrar before executing capital wire instructions.',
      investigativeRegistryLog: 'INVESTIGATIVE REGISTRY LOG',
      helplineText: 'Suspect fraud or ongoing extortion? Contact the National Cyber Crime Reporting Portal helpline at 1930.',
      dossierStampTitle: 'DOSSIER INTEGRITY STAMP',
    },
    tipProfiler: {
      title: 'Is this investment tip safe?',
      subtitle: 'Specialized heuristic engine for chat groups, channel blasts, and direct messages.',
      detectedMessage: 'DETECTED TIP MESSAGE',
      classification: 'FORENSIC CLASSIFICATION',
      highRiskSolicitation: 'High Risk Solicitation',
      evidentiaryMarkers: 'EVIDENTIARY MARKERS DETECTED',
      evaluation: 'Prosecutorial Evaluation: The intercepted pattern exhibits hallmarks of Section 12A SEBI Act / SEC Rule 10b-5 market manipulation: non-public insider attribution paired with retail entrapment via encrypted private messaging.',
      reScan: 'RE-SCAN INTERCEPT',
      downloadAudit: 'DOWNLOAD FULL AUDIT RECORD →',
      pasteTipLabel: 'PASTE TELEGRAM OR WHATSAPP TIP FOR HEURISTIC AUDIT',
      pasteTipPlaceholder: 'Paste chat log: e.g. 🚨 INSIDER STOCK ALERT 🚨 Guaranteed 40% return. Only 10 spots left. DM admin now...',
      analyzeTipBtn: 'PROFILE TIP MESSAGE',
    },
    history: {
      title: 'Your Verification History',
      subtitle: 'Recent claims, links, and documents analyzed by VeriVest forensic pipelines.',
      allRecords: 'ALL RECORDS',
      highRiskFilter: 'HIGH RISK',
      verifiedFilter: 'VERIFIED',
      suspiciousFilter: 'SUSPICIOUS',
      colSubject: 'ANALYZED SUBJECT & FORENSIC ARTIFACT',
      colStatus: 'ASSESSED STATUS & RISK LEVEL',
      colTime: 'TIMESTAMP',
      colAction: 'DOSSIER FILE',
      viewAnalysis: 'VIEW ANALYSIS →',
      searchPlaceholder: 'Filter dossier records by keyword, entity, or vector...',
      emptyText: 'No matching audit records found.',
    },
    education: {
      title: 'Learn Before You Invest',
      subtitle: 'Plain-language guides to recognizing financial deception, authored by forensic analysts and securities lawyers.',
      readGuide: 'READ GUIDE ↓',
      modalRedFlags: 'Key Red Flags to Spot',
      modalWhatToDo: 'What You Should Do Immediately',
      modalExample: 'Forensic Specimen Transcript',
      close: 'CLOSE GUIDE',
      bannerTitle: 'Encountered an Uncataloged Scheme?',
      bannerSub: 'Submit anonymous transcripts, screenshots, or contract agreements directly to our institutional review board.',
      bannerBtn: 'SUBMIT MATERIAL FOR AUDIT',
    },
    settings: {
      title: 'Account Settings & Privacy',
      accountSection: 'Account Profile',
      prefSection: 'Language & Reporting Preferences',
      securitySection: 'Security & Access',
      privacySection: 'Data Retention & Confidentiality Policy',
      languageLabel: 'Active Interface Language',
      saveChanges: 'Save Preferences',
      changePassword: 'Change Password',
      privacyStorageDesc: 'VeriVest operates on an ephemeral analysis model. Uploaded text and imagery are sanitized in RAM and are not indexed in public machine learning sets.',
    },
    scan: {
      pageTitle: 'SCAN',
      pageSubtitle: 'Check a suspicious investment message, screenshot or link before you act.',
      tabMessage: 'Message',
      tabScreenshot: 'Screenshot',
      tabLink: 'Link',
      tabEntity: 'Entity',
      msgLabel: 'Paste WhatsApp, Telegram, SMS, or email claim:',
      pasteBtn: 'Paste',
      msgPlaceholder: 'Paste suspicious message here...\nExample: "Guaranteed 40% returns in 7 days! Only 10 spots left. Transfer to coordinator via UPI: abcwealth@okaxis"',
      screenshotDropTitle: 'Click or drag screenshot here',
      screenshotDropSub: 'PNG, JPG, or WEBP. Uploaded images are processed in-memory and not stored.',
      screenshotUploaded: 'Uploaded Screenshot:',
      removeImage: 'Remove Image',
      ocrLabel: 'Extracted Text (OCR):',
      ocrReading: 'Reading text...',
      ocrPlaceholder: 'Extracted text will appear here...',
      linkLabel: 'Enter suspicious investment website, link, or broker portal:',
      entityNameLabel: 'Claimed Organization or Advisor Name:',
      entityNamePlaceholder: 'e.g. Apex Wealth Advisors or Zerodha',
      entityRegLabel: 'Registration Number (Optional):',
      entityRegPlaceholder: 'e.g. INZ000293433 or INA000123456',
      analyzeBtn: 'Analyze Claim',
      privacyNotice: 'VeriVest identifies warning signs and verification gaps. It does not provide financial or trading advice.',
      trySampleLabel: 'Or try a realistic sample claim:',
      sensitiveWarning: 'Sensitive information detected. Please remove OTPs or private passwords before continuing.',
      errorMessage: 'Please upload a PNG, JPG or WEBP image.',
      errorNoMessage: 'Please enter an investment message to check.',
      errorNoScreenshot: 'Please upload a screenshot to inspect.',
      errorNoLink: 'Please enter a website link to check.',
      errorNoEntity: 'Please enter an entity name or registration number.',
    },
    learn: {
      pageTitle: 'Learn / Simulator',
      pageSubtitle: 'Understand common investment scams and practice identifying warning signs safely.',
      tabSimulator: 'Scam Simulator',
      tabGuides: 'Safety Guides',
      safeChoices: 'Safe Choices:',
      simulatedPitch: 'Simulated Pitch',
      whatWouldYouDo: 'What would you do?',
      goodDecision: 'Good Decision!',
      warningFlag: 'Warning Flag:',
      warningSigns: 'Warning signs in this scenario:',
      achievement: 'Achievement Unlocked: Investor Safety Learner',
      achievementBody: 'You answered all {total} questions ({score}/{total} Correct). Your official badge has been added to your Profile!',
      viewProfile: 'View in Profile & Share Achievement →',
      tryAnother: 'Try Another Scenario →',
      readGuide: 'Read Guide',
    },
    tipPage: {
      pageTitle: 'Tip & Group Profiler',
      pageSubtitle: 'Analyze suspicious investment tips, paid groups, and pressure tactics in social messaging channels.',
      inputLabel: 'Paste a Tip or Group Message to Analyze',
      inputPlaceholder: 'Paste Telegram channel alert or WhatsApp broadcast message...\nExample: "🚨 INSIDER STOCK ALERT: Guaranteed 45% return in 10 sessions! Pay ₹10,000 upfront fee to personal UPI..."',
      evaluatesNote: 'Evaluates: Urgency, insider promises, paid group funnels, and personal payment routing',
      analyzeTipBtn: 'Analyze Tip →',
      sampleBreakdownTitle: 'Sample Tip Profile Breakdown',
      nextSpecimen: 'Next Specimen',
      tipContent: 'Tip Content:',
      tacticsLabel: 'Communication Tactics Identified:',
      verificationGapsLabel: 'Verification Gaps:',
      safeNextStepsLabel: 'Safe Next Steps:',
      scanThisTipBtn: 'Scan This Tip in Main Scanner →',
      noTradingNote: 'No trading signals or stock calls',
    },
  },

  hi: {
    appName: 'VeriVest',
    tagline: 'निवेश करने से पहले सत्यापित करें।',
    forensicVerification: 'फोरेंसिक सत्यापन',
    inquiryDesk: 'जांच डेस्क',
    nav: {
      verifyAScam: 'स्कैम जांचें',
      howItWorks: 'यह कैसे काम करता है',
      learn: 'सीखें',
      scanHistory: 'स्कैन इतिहास',
      tipProfiler: 'टिप प्रोफाइलर',
      signIn: 'लॉग इन करें',
      signUp: 'खाता बनाएं',
      checkSomething: 'कुछ सत्यापित करें',
      profile: 'प्रोफ़ाइल',
      settings: 'सेटिंग्स',
      signOut: 'लॉग आउट',
    },
    auth: {
      signInTitle: 'VeriVest में साइन इन करें।',
      signInSubtitle: 'संदिग्ध निवेश दावों पर भरोसा करने से पहले उनकी जांच करें।',
      signUpTitle: 'अपना VeriVest खाता बनाएं।',
      signUpSubtitle: 'संदिग्ध निवेश संदेशों, लिंक और वित्तीय दावों की जांच शुरू करें।',
      emailOrMobile: 'ईमेल या मोबाइल नंबर',
      emailPlaceholder: 'अपना ईमेल या मोबाइल नंबर दर्ज करें',
      password: 'पासवर्ड',
      passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      fullName: 'पूरा नाम',
      fullNamePlaceholder: 'उदा. राहुल शर्मा',
      mobileNumber: 'मोबाइल नंबर',
      mobilePlaceholder: '+91 98765 43210',
      rememberMe: 'मुझे याद रखें',
      forgotPassword: 'पासवर्ड भूल गए?',
      signInBtn: 'साइन इन करें →',
      signUpBtn: 'खाता बनाएं →',
      continueWithGoogle: 'गूगल के साथ जारी रखें',
      noAccount: 'क्या आपके पास खाता नहीं है?',
      alreadyAccount: 'क्या पहले से खाता है?',
      createAccount: 'खाता बनाएं →',
      forgotPasswordTitle: 'पासवर्ड रीसेट करें',
      forgotPasswordSubtitle: 'सुरक्षित रीसेट लिंक प्राप्त करने के लिए पंजीकृत ईमेल या मोबाइल दर्ज करें।',
      sendResetLink: 'रीसेट लिंक भेजें',
      resetLinkSent: 'रीसेट लिंक आपके ईमेल/एसएमएस पर भेज दिया गया है।',
      privacyNotice: 'आपकी वित्तीय जानकारी पूरी तरह निजी और सुरक्षित रहती है।',
      preferredLanguage: 'पसंदीदा रिपोर्टिंग भाषा',
    },
    landing: {
      standardBadge: 'संपादकीय रजिस्ट्री मानक 2025',
      heroTitle: 'सत्यापित करें। निवेश से पहले।',
      heroSubtitle: 'संदिग्ध निवेश संदेशों, नकली ब्रोकर्स, भ्रामक रिटर्न दावों और संगठित वित्तीय घोटालों के खिलाफ एआई-संचालित फोरेंसिक सुरक्षा।',
      checkCta: 'कुछ जांचें',
      howItWorksCta: 'यह कैसे काम करता है',
      registryCrossCheck: '28 वैश्विक नियामक रजिस्ट्रियों के साथ क्रॉस-वेरिफाइड',
      ribbon: {
        analyze: 'विश्लेषण • भाषाई संकेत',
        understand: 'समझें • दबाव के तरीके',
        verify: 'सत्यापित करें • कानूनी खुलासे',
        protect: 'सुरक्षा • आपकी गाढ़ी कमाई',
      },
      scopeTitle: 'मल्टी-मॉडल फोरेंसिक ऑडिट',
      scopeSubtitle: 'हजारों रिपोर्ट किए गए धोखाधड़ी मामलों और सेबी/नियामक कार्यवाहियों पर प्रशिक्षित मॉडल।',
      modes: {
        messageTitle: 'निवेश संदेश',
        messageDesc: 'संदिग्ध व्हाट्सएप, टेलीग्राम या एसएमएस संदेशों में मनोवैज्ञानिक दबाव और लालच के संकेतों की जांच करें।',
        messageAction: 'टेक्स्ट जांचें →',
        linkTitle: 'वेबसाइट और लिंक',
        linkDesc: 'नकली ब्रोकर पोर्टल, क्लोन डोमेन और फ़िशिंग लिंक की सुरक्षा जांचें।',
        linkAction: 'लिंक ऑडिट करें →',
        brokerTitle: 'ब्रोकर और पंजीकरण',
        brokerDesc: 'सेबी/नियामक में फर्म लाइसेंस नंबर और पंजीकरण की सत्यता परखें।',
        brokerAction: 'रजिस्ट्री खोजें →',
        screenshotTitle: 'स्क्रीनशॉट',
        screenshotDesc: 'ट्रेडिंग प्रॉफिट स्क्रीनशॉट, फर्जी बैलेंस या चैट की तस्वीरें अपलोड करके विश्लेषण करें।',
        screenshotAction: 'छवि जांचें →',
      },
      methodologyTitle: 'शांत और सटीक फोरेंसिक प्रक्रिया',
      methodologySubtitle: 'एक वैज्ञानिक प्रक्रिया जो बिना जल्दबाजी के सबूतों का मूल्यांकन करके परिणाम देती है।',
      steps: {
        s1Title: 'जमा करें',
        s1Desc: 'संदिग्ध मैसेज, वेबसाइट लिंक या चैट स्क्रीनशॉट सुरक्षित स्कैनर में पेस्ट करें।',
        s2Title: 'विश्लेषण',
        s2Desc: 'VeriVest झूठे वादों, ब्लैकलिस्टेड यूपीआई और पोंजी स्कीम के तरीकों की पहचान करता है।',
        s3Title: 'सत्यापन',
        s3Desc: 'सरकारी नियामकों के आधार पर स्पष्ट सबूतों के साथ जोखिम रिपोर्ट प्राप्त करें।',
      },
      breakdownTitle: 'केवल चेतावनी नहीं। कारण भी समझें।',
      breakdownSubtitle: 'VeriVest सिर्फ "स्कैम" नहीं कहता, बल्कि स्पष्ट बताता है कि संदेश में कौन-से लाल झंडे और खतरे मौजूद हैं।',
      specimenCard: {
        tag: 'लाइव ऑडिट फ़ाइल #VV-9042',
        title: 'एपेक्स यील्ड ग्लोबल टेलीग्राम ग्रुप',
        scoreLabel: 'समग्र जोखिम सूचकांक',
        fullReport: 'पूरी ऑडिट रिपोर्ट ↗',
      },
      encyclopediaTitle: 'धोखाधड़ी पहचान निर्देशिका',
      encyclopediaSubtitle: 'फोरेंसिक विशेषज्ञों और वकीलों द्वारा तैयार की गई सरल भाषा में सुरक्षा गाइड।',
      ctaBannerTitle: 'क्या यह सच है या धोखा? निवेश से पहले जांच लें।',
      ctaBannerSub: 'अपनी जानकारी सुरक्षित रखें। हमारा एआई 15 सेकंड के भीतर सरकारी रिकॉर्ड और धोखाधड़ी के पैटर्न जांचता है।',
      ctaBannerBtn: 'अभी जांचें',
    },
    dashboard: {
      title: 'निवेश की जांच करें',
      subtitle: 'संदिग्ध संदेश, लिंक, स्क्रीनशॉट या ब्रोकर विवरण दर्ज करें और एआई द्वारा सत्यता परखें।',
      tabMessage: 'संदेश पेस्ट करें',
      tabLink: 'लिंक जांचें',
      tabScreenshot: 'स्क्रीनशॉट अपलोड करें',
      tabBroker: 'ब्रोकर सत्यापित करें',
      msgScanHeader: 'टेक्स्ट स्कैन • 4,000 वर्ण सीमा',
      msgScanNotice: '256-बिट सुरक्षित एन्क्रिप्शन',
      msgPlaceholder: "संदिग्ध संदेश या निवेश दावा यहाँ पेस्ट करें... उदा. 'हर महीने 40% गारंटीड रिटर्न, सीमित स्लॉट उपलब्ध हैं, सीधे दिए गए खाते में पैसे भेजें...'",
      charCount: 'वर्ण संख्या',
      insertClipboard: 'क्लिपबोर्ड से पेस्ट करें',
      analyzeBtn: 'दावा विश्लेषण करें',
      clearBtn: 'साफ़ करें',
      orScreenshot: 'या स्क्रीनशॉट अपलोड करें',
      archetypesTitle: 'उदाहरण टेस्ट लोड करें (क्लिक करें):',
      linkInputLabel: 'वेबसाइट या ब्रोकर यूआरएल पेस्ट करें',
      linkPlaceholder: 'https://apex-capital-investments-portal.net',
      checkLinkBtn: 'डोमेन और सुरक्षा जांचें',
      screenshotDropTitle: 'यहाँ स्क्रीनशॉट या चैट की फोटो ड्रैग करें',
      screenshotDropSub: 'PNG, JPG, WEBP स्वीकार्य (अधिकतम 10MB)',
      browseFiles: 'फ़ाइल चुनें',
      analyzeScreenshotBtn: 'ओसीआर द्वारा स्क्रीनशॉट जांचें',
      privacyWarning: 'स्क्रीनशॉट में आपकी व्यक्तिगत जानकारी हो सकती है। विश्लेषण से पहले हम संवेदनशील विवरण हटा देते हैं।',
      brokerNameLabel: 'ब्रोकर या सलाहकार का नाम',
      brokerNamePlaceholder: 'उदा. एबीसी वेल्थ एडवाइजर्स',
      brokerRegLabel: 'पंजीकरण या लाइसेंस नंबर',
      brokerRegPlaceholder: 'उदा. IN000123456',
      verifyBrokerBtn: 'नियामक स्थिति सत्यापित करें',
      demoNote: 'डेमो सत्यापन मोड: सेबी / नियामक डेटाबेस सिमुलेशन के साथ जुड़ा है।',
      whatVeriVestChecks: 'VeriVest क्या जांचता है',
      checks: {
        c1Title: 'दबाव और भाषा शैली',
        c1Desc: 'झूठी जल्दबाजी, गारंटीड रिटर्न और तुरंत पैसे लगाने के दबाव को पहचानता है।',
        c2Title: 'नियामक पंजीकरण',
        c2Desc: 'सेबी और सरकारी डेटाबेस में ब्रोकर का लाइसेंस नंबर मिलाता है।',
        c3Title: 'पंप-एंड-डंप के लक्षण',
        c3Desc: 'टेलीग्राम और व्हाट्सएप पर फैलाई जाने वाली फर्जी स्टॉक टिप्स को पकड़ता है।',
        c4Title: 'व्यक्तिगत खाते के खतरे',
        c4Desc: 'संस्थागत खाते की जगह व्यक्तिगत यूपीआई या बैंक खाते में पैसे मांगने की पहचान करता है।',
      },
      confidentialityTitle: 'गोपनीयता की गारंटी',
      confidentialityDesc: 'आपकी जानकारी पूरी तरह गोपनीय रहती है और किसी तीसरे पक्ष के साथ साझा नहीं की जाती।',
      benchmarks: {
        dailyClaims: 'दैनिक स्कैन किए गए दावे',
        falsePositive: 'गलती की संभावना',
      },
      dossierCardTitle: 'VeriVest इंटेलिजेंस डोजियर - सोशल मीडिया फिनफ्लुएंसर योजनाओं पर सारांश पढ़ें।',
    },
    loading: {
      title: 'आपके निवेश दावे का विश्लेषण हो रहा है...',
      subtitle: 'संदेश के सभी पहलुओं की सरकारी डेटाबेस और वित्तीय हेरफेर के मॉडलों से जांच की जा रही है।',
      s1: 'जानकारी और दावों को अलग किया जा रहा है',
      s2: 'संदिग्ध पैटर्न और दबाव की पहचान हो रही है',
      s3: 'जोखिम और नियामक नियमों का मूल्यांकन जारी है',
      s4: 'स्पष्टीकरण और सुरक्षा निर्देश तैयार किए जा रहे हैं',
    },
    result: {
      title: 'आपकी निवेश जांच रिपोर्ट',
      analyzedToday: 'आज विश्लेषित',
      printFile: 'प्रिंट फाइल',
      rawPayload: 'मूल संदेश देखें',
      aggregateThreatIndex: 'समग्र जोखिम सूचकांक',
      probabilityLoss: 'पूंजी डूबने की संभावना',
      forensicDirectiveTitle: 'सुरक्षा निर्देश',
      detectedSignals: 'पहचाने गए खतरे और संकेत',
      activeVectors: 'सक्रिय खतरे',
      recommendedActions: 'अनुशंसित अगले कदम',
      flagWatchdog: 'शिकायत दर्ज करें',
      protectCircle: 'अपनों को सुरक्षित करें',
      protectCircleSub: 'यह रिपोर्ट अपने परिवार और दोस्तों के साथ साझा करें ताकि वे नुकसान से बच सकें।',
      downloadPdf: 'सत्यापन रिपोर्ट डाउनलोड करें (PDF)',
      shareWarning: 'परिवार के साथ साझा करें',
      verifyAnother: 'एक और दावा जांचें',
      verifySourceTitle: 'स्रोत की पुष्टि',
      claimedEntity: 'दावा की गई संस्था का नाम',
      claimedRegNumber: 'दावा किया गया रजिस्ट्रेशन नंबर',
      verificationStatus: 'सत्यापन स्थिति',
      checkOfficialRecords: 'सरकारी रिकॉर्ड जांचें',
      whyThisMattersTitle: 'यह क्यों महत्वपूर्ण है',
      whyThisMattersText: 'धोखेबाज अक्सर फर्जी रजिस्ट्रेशन नंबर दिखाते हैं। किसी भी खाते में पैसे भेजने से पहले हमेशा आधिकारिक सरकारी पोर्टल पर स्वतंत्र रूप से जांच करें।',
      investigativeRegistryLog: 'नियामक मिलान रिपोर्ट',
      helplineText: 'धोखाधड़ी या साइबर अपराध की सूचना राष्ट्रीय साइबर अपराध हेल्पलाइन 1930 पर दें।',
      dossierStampTitle: 'डिजिटल सत्यापन मुहर',
    },
    tipProfiler: {
      title: 'क्या यह निवेश टिप सुरक्षित है?',
      subtitle: 'व्हाट्सएप और टेलीग्राम ग्रुप्स में आने वाले निवेश संदेशों के लिए विशेष जांच प्रणाली।',
      detectedMessage: 'पहचाना गया संदेश',
      classification: 'वर्गीकरण',
      highRiskSolicitation: 'अत्यधिक जोखिम भरी पेशकश',
      evidentiaryMarkers: 'पहचाने गए खतरे के संकेत',
      evaluation: 'कानूनी मूल्यांकन: यह संदेश सेबी नियमों के अनुसार बाजार में हेरफेर और अनधिकृत वित्तीय सलाह के संकेत दिखाता है।',
      reScan: 'पुनः स्कैन करें',
      downloadAudit: 'पूरी ऑडिट रिपोर्ट डाउनलोड करें →',
      pasteTipLabel: 'जांच के लिए टेलीग्राम या व्हाट्सएप टिप यहाँ पेस्ट करें',
      pasteTipPlaceholder: 'उदा. 🚨 इनसाइडर स्टॉक अलर्ट 🚨 40% गारंटीड रिटर्न। केवल 10 सीटें बाकी हैं। तुरंत एडमिन को मैसेज करें...',
      analyzeTipBtn: 'टिप का विश्लेषण करें',
    },
    history: {
      title: 'आपकी जांच का इतिहास',
      subtitle: 'VeriVest द्वारा पहले जांचे गए संदेश, लिंक और दस्तावेज।',
      allRecords: 'सभी रिकॉर्ड',
      highRiskFilter: 'उच्च जोखिम',
      verifiedFilter: 'सत्यापित सुरक्षित',
      suspiciousFilter: 'संदिग्ध',
      colSubject: 'जांचा गया विषय',
      colStatus: 'जोखिम स्तर',
      colTime: 'समय',
      colAction: 'रिपोर्ट',
      viewAnalysis: 'विश्लेषण देखें →',
      searchPlaceholder: 'कीवर्ड या संस्था के नाम से खोजें...',
      emptyText: 'कोई रिकॉर्ड नहीं मिला।',
    },
    education: {
      title: 'निवेश से पहले समझें',
      subtitle: 'वित्तीय धोखाधड़ी से बचने के लिए सरल भाषा में तैयार की गई मार्गदर्शिका।',
      readGuide: 'गाइड पढ़ें ↓',
      modalRedFlags: 'खतरे के मुख्य संकेत',
      modalWhatToDo: 'तुरंत क्या करें',
      modalExample: 'धोखेबाज संदेश का उदाहरण',
      close: 'बंद करें',
      bannerTitle: 'क्या आपको कोई नया स्कैम दिखा?',
      bannerSub: 'हमारी समीक्षा समिति को अज्ञात रूप से स्क्रीनशॉट या संदेश भेजें।',
      bannerBtn: 'समीक्षा के लिए भेजें',
    },
    settings: {
      title: 'खाता सेटिंग्स और गोपनीयता',
      accountSection: 'खाता प्रोफ़ाइल',
      prefSection: 'भाषा और रिपोर्टिंग प्राथमिकताएं',
      securitySection: 'सुरक्षा और पासवर्ड',
      privacySection: 'गोपनीयता नीति',
      languageLabel: 'सक्रिय भाषा',
      saveChanges: 'प्राथमिकताएं सहेजें',
      changePassword: 'पासवर्ड बदलें',
      privacyStorageDesc: 'VeriVest आपकी गोपनीयता का पूरा सम्मान करता है। विश्लेषण के बाद डेटा को सुरक्षित तरीके से हटा दिया जाता है।',
    },
    scan: {
      pageTitle: 'स्कैन करें',
      pageSubtitle: 'कार्रवाई करने या पैसे भेजने से पहले किसी भी संदिग्ध निवेश संदेश, स्क्रीनशॉट या लिंक की जांच करें।',
      tabMessage: 'संदेश (Message)',
      tabScreenshot: 'स्क्रीनशॉट',
      tabLink: 'लिंक (Link)',
      tabEntity: 'संस्था (Entity)',
      msgLabel: 'व्हाट्सएप, टेलीग्राम, SMS या ईमेल दावा यहाँ पेस्ट करें:',
      pasteBtn: 'पेस्ट करें',
      msgPlaceholder: 'संदिग्ध संदेश यहाँ पेस्ट करें...\nउदाहरण: "7 दिनों में 40% गारंटीड रिटर्न! केवल 10 स्थान शेष। UPI पर पैसे भेजें: abcwealth@okaxis"',
      screenshotDropTitle: 'यहाँ क्लिक करें या स्क्रीनशॉट खींचें',
      screenshotDropSub: 'PNG, JPG, या WEBP। अपलोड की गई छवियां मेमोरी में प्रोसेस होती हैं और संग्रहीत नहीं होती।',
      screenshotUploaded: 'अपलोड किया गया स्क्रीनशॉट:',
      removeImage: 'छवि हटाएं',
      ocrLabel: 'निकाला गया टेक्स्ट (OCR):',
      ocrReading: 'टेक्स्ट पढ़ा जा रहा है...',
      ocrPlaceholder: 'निकाला गया टेक्स्ट यहाँ दिखेगा...',
      linkLabel: 'संदिग्ध वेबसाइट लिंक या ब्रोकर पोर्टल दर्ज करें:',
      entityNameLabel: 'दावा की गई संस्था या सलाहकार का नाम:',
      entityNamePlaceholder: 'उदा. एपेक्स वेल्थ एडवाइजर्स या ज़ेरोधा',
      entityRegLabel: 'रजिस्ट्रेशन नंबर (वैकल्पिक):',
      entityRegPlaceholder: 'उदा. INZ000293433 या INA000123456',
      analyzeBtn: 'विश्लेषण करें (Analyze)',
      privacyNotice: 'VeriVest चेतावनी संकेत और सत्यापन की कमियों की पहचान करता है। यह वित्तीय या ट्रेडिंग सलाह नहीं देता।',
      trySampleLabel: 'या एक यथार्थवादी उदाहरण आजमाएं:',
      sensitiveWarning: 'संवेदनशील जानकारी पहचानी गई। कृपया पासवर्ड या ओटीपी हटा दें।',
      errorMessage: 'कृपया PNG, JPG या WEBP छवि अपलोड करें।',
      errorNoMessage: 'कृपया जांचने के लिए कोई संदेश लिखें।',
      errorNoScreenshot: 'कृपया कोई स्क्रीनशॉट अपलोड करें।',
      errorNoLink: 'कृपया वेबसाइट लिंक दर्ज करें।',
      errorNoEntity: 'कृपया संस्था या रजिस्ट्रेशन नंबर लिखें।',
    },
    learn: {
      pageTitle: 'सीखें एवं सिमुलेटर (Learn / Simulator)',
      pageSubtitle: 'धोखाधड़ी के सामान्य तरीकों को समझें और व्यावहारिक परिदृश्यों में सुरक्षित निर्णय लेने का अभ्यास करें।',
      tabSimulator: 'सिमुलेटर (Simulator)',
      tabGuides: 'मार्गदर्शिका (Guides)',
      safeChoices: 'सुरक्षित उत्तर:',
      simulatedPitch: 'अनुकरणीय प्रस्ताव',
      whatWouldYouDo: 'आप क्या करेंगे? (What would you do?)',
      goodDecision: 'अच्छा निर्णय!',
      warningFlag: 'चेतावनी संकेत:',
      warningSigns: 'इस परिदृश्य में चेतावनी के संकेत:',
      achievement: 'उपलब्धि: निवेशक सुरक्षा सीखने वाला',
      achievementBody: 'आपने सभी {total} प्रश्नों के उत्तर दिए ({score}/{total} सही)। आपका बैज प्रोफ़ाइल में जोड़ दिया गया है!',
      viewProfile: 'प्रोफ़ाइल में देखें और उपलब्धि साझा करें →',
      tryAnother: 'दूसरा परिदृश्य आज़माएं →',
      readGuide: 'गाइड पढ़ें',
    },
    tipPage: {
      pageTitle: 'टिप एवं ग्रुप विश्लेषक (Tip & Group Profiler)',
      pageSubtitle: 'टेलीग्राम, व्हाट्सएप या सोशल मीडिया पर आने वाली संदेहास्पद स्टॉक टिप्स और वीआईपी ग्रुप्स के व्यवहार का विश्लेषण करें।',
      inputLabel: 'कोई भी टिप यहां पेस्ट करें',
      inputPlaceholder: 'टेलीग्राम अलर्ट या व्हाट्सएप ब्रॉडकास्ट संदेश पेस्ट करें...\nउदाहरण: "🚨 इनसाइडर स्टॉक अलर्ट: 10 सत्रों में 45% गारंटीड रिटर्न! ₹10,000 व्यक्तिगत UPI पर भेजें..."',
      evaluatesNote: 'मूल्यांकन करता है: तात्कालिकता, इनसाइडर वादे, भुगतान रूटिंग',
      analyzeTipBtn: 'टिप का विश्लेषण करें →',
      sampleBreakdownTitle: 'नमूना टिप विश्लेषण',
      nextSpecimen: 'अगला नमूना',
      tipContent: 'टिप सामग्री:',
      tacticsLabel: 'पहचाने गए संचार तरीके:',
      verificationGapsLabel: 'सत्यापन की कमियां:',
      safeNextStepsLabel: 'सुरक्षित अगले कदम:',
      scanThisTipBtn: 'मुख्य स्कैनर में जांचें →',
      noTradingNote: 'कोई ट्रेडिंग सिग्नल या स्टॉक कॉल नहीं',
    },
  },

  mr: {
    appName: 'VeriVest',
    tagline: 'गुंतवणूक करण्यापूर्वी पडताळणी करा.',
    forensicVerification: 'फॉरेन्सिक पडताळणी',
    inquiryDesk: 'चौकशी कक्ष',
    nav: {
      verifyAScam: 'घोटाळा तपासा',
      howItWorks: 'हे कसे कार्य करते',
      learn: 'माहिती व शिक्षण',
      scanHistory: 'तपासणी इतिहास',
      tipProfiler: 'टीप प्रोफायलर',
      signIn: 'साइन इन',
      signUp: 'खाते तयार करा',
      checkSomething: 'पडताळणी करा',
      profile: 'प्रोफाइल',
      settings: 'सेटिंग्ज',
      signOut: 'साइन आउट',
    },
    auth: {
      signInTitle: 'VeriVest मध्ये साइन इन करा.',
      signInSubtitle: 'संशयास्पद गुंतवणूक दाव्यांवर विश्वास ठेवण्यापूर्वी खात्री करा.',
      signUpTitle: 'तुमचे VeriVest खाते तयार करा.',
      signUpSubtitle: 'संशयास्पद गुंतवणूक संदेश आणि लिंक्सची पडताळणी सुरू करा.',
      emailOrMobile: 'ईमेल किंवा मोबाईल नंबर',
      emailPlaceholder: 'तुमचा ईमेल किंवा मोबाईल नंबर टाका',
      password: 'पासवर्ड',
      passwordPlaceholder: 'तुमचा पासवर्ड टाका',
      confirmPassword: 'पासवर्डची पुष्टी करा',
      fullName: 'पूर्ण नाव',
      fullNamePlaceholder: 'उदा. सचिन जोशी',
      mobileNumber: 'मोबाईल नंबर',
      mobilePlaceholder: '+91 98765 43210',
      rememberMe: 'मला लक्षात ठेवा',
      forgotPassword: 'पासवर्ड विसरलात?',
      signInBtn: 'साइन इन करा →',
      signUpBtn: 'खाते तयार करा →',
      continueWithGoogle: 'गुगलद्वारे सुरू ठेवा',
      noAccount: 'खाते नाही का?',
      alreadyAccount: 'आधीच खाते आहे का?',
      createAccount: 'खाते तयार करा →',
      forgotPasswordTitle: 'पासवर्ड रीसेट करा',
      forgotPasswordSubtitle: 'सुरक्षित रीसेट लिंक मिळवण्यासाठी नोंदणीकृत ईमेल किंवा मोबाईल नंबर टाका.',
      sendResetLink: 'रीसेट लिंक पाठवा',
      resetLinkSent: 'रीसेट लिंक तुमच्या ईमेल/मोबाईलवर पाठवली गेली आहे.',
      privacyNotice: 'तुमची आर्थिक माहिती पूर्णपणे सुरक्षित व खाजगी राहते.',
      preferredLanguage: 'पसंतीची भाषा',
    },
    landing: {
      standardBadge: 'संपादकीय नोंदणी मानक २०२५',
      heroTitle: 'पडताळणी करा. गुंतवणूक करण्यापूर्वी.',
      heroSubtitle: 'संशयास्पद गुंतवणूक संदेश, खोटे ब्रोकर्स आणि दिशाभूल करणाऱ्या परताव्यांच्या विरोधात एआय-आधारित फॉरेन्सिक सुरक्षा.',
      checkCta: 'काहीतरी तपासा',
      howItWorksCta: 'हे कसे कार्य करते',
      registryCrossCheck: '२८ जागतिक नियामक नोंदणीशी पडताळलेले',
      ribbon: {
        analyze: 'विश्लेषण • भाषिक संकेत',
        understand: 'समजून घ्या • दबावाचे प्रकार',
        verify: 'पडताळणी • अधिकृत खुलासे',
        protect: 'संरक्षण • तुमची बचत',
      },
      scopeTitle: 'मल्टी-मॉडल फॉरेन्सिक तपासणी',
      scopeSubtitle: 'हजारो नोंदवलेल्या फसवणूक पद्धतींवर प्रशिक्षित प्रगत एआय प्रणाली.',
      modes: {
        messageTitle: 'गुंतवणूक संदेश',
        messageDesc: 'संशयास्पद व्हॉट्सॲप, टेलिग्राम किंवा एसएमएस संदेशांमधील दबावाचे संकेत तपासा.',
        messageAction: 'मजकूर तपासा →',
        linkTitle: 'वेबसाइट्स आणि लिंक्स',
        linkDesc: 'खोट्या ब्रोकर पोर्टल्स, बनावट डोमेन्स आणि फिशिंग लिंक्सची पडताळणी करा.',
        linkAction: 'लिंक तपासा →',
        brokerTitle: 'ब्रोकर आणि नोंदणी',
        brokerDesc: 'सेबी (SEBI) आणि इतर नियामकांकडील अधिकृत नोंदणी क्रमांक तपासा.',
        brokerAction: 'नोंदणी शोधा →',
        screenshotTitle: 'स्क्रीनशॉट',
        screenshotDesc: 'ट्रेडिंग नफ्याचे स्क्रीनशॉट, खोटे खात्याचे बॅलन्स किंवा संभाषणाचे फोटो तपासा.',
        screenshotAction: 'फोटो तपासा →',
      },
      methodologyTitle: 'शांत आणि अचूक फॉरेन्सिक प्रक्रिया',
      methodologySubtitle: 'पुराव्यांचे सखोल विश्लेषण करून धोका स्पष्ट करणारी निष्पक्ष प्रणाली.',
      steps: {
        s1Title: 'पाठवा',
        s1Desc: 'संदेश, वेबसाइट लिंक किंवा स्क्रीनशॉट आमच्या सुरक्षित प्रणालीमध्ये टाका.',
        s2Title: 'विश्लेषण',
        s2Desc: 'VeriVest खोट्या नफ्याचे आमिष आणि संशयास्पद बँक खात्यांचे विश्लेषण करते.',
        s3Title: 'पडताळणी',
        s3Desc: 'सरकारी नियमांच्या आधारे स्पष्ट पुराव्यासह धोका निर्देशांक मिळवा.',
      },
      breakdownTitle: 'फक्त इशारा नको. कारणही समजून घ्या.',
      breakdownSubtitle: 'VeriVest फक्त फसवणूक न म्हणता, त्या संदेशात नेमके कोणते धोके आणि लाल झेंडे आहेत हे स्पष्ट करते.',
      specimenCard: {
        tag: 'थेट तपासणी अहवाल #VV-9042',
        title: 'अपेक्स यील्ड ग्लोबल टेलिग्राम ग्रुप',
        scoreLabel: 'एकूण धोका निर्देशांक',
        fullReport: 'संपूर्ण अहवाल ↗',
      },
      encyclopediaTitle: 'फसवणूक ओळख निर्देशिका',
      encyclopediaSubtitle: 'आर्थिक विश्लेषक आणि वकिलांनी तयार केलेली सोप्या भाषेतील मार्गदर्शिका.',
      ctaBannerTitle: 'खरे की खोटे? गुंतवणूक करण्यापूर्वी खात्री करा.',
      ctaBannerSub: 'तुमची माहिती सुरक्षित ठेवा. आमची प्रणाली १५ सेकंदात नियामकांच्या नोंदी तपासते.',
      ctaBannerBtn: 'आता तपासा',
    },
    dashboard: {
      title: 'गुंतवणूक तपासा',
      subtitle: 'संशयास्पद संदेश, लिंक, स्क्रीनशॉट किंवा ब्रोकरची माहिती टाका आणि एआय द्वारे पडताळणी करा.',
      tabMessage: 'संदेश टाका',
      tabLink: 'लिंक तपासा',
      tabScreenshot: 'स्क्रीनशॉट जोडा',
      tabBroker: 'ब्रोकर पडताळणी',
      msgScanHeader: 'मजकूर तपासणी • ४,००० अक्षरांची मर्यादा',
      msgScanNotice: '२५६-बिट सुरक्षित एन्क्रिप्शन',
      msgPlaceholder: "संशयास्पद संदेश किंवा गुंतवणुकीचा दावा येथे टाका... उदा. 'दरमहा ४०% हमखास परतावा, मर्यादित जागा शिल्लक आहेत, ताबडतोब पैसे पाठवा...'",
      charCount: 'अक्षर संख्या',
      insertClipboard: 'क्लिपबोर्डवरून टाका',
      analyzeBtn: 'दाव्याचे विश्लेषण करा',
      clearBtn: 'साफ करा',
      orScreenshot: 'किंवा स्क्रीनशॉट जोडा',
      archetypesTitle: 'नमुने तपासून पहा (क्लिक करा):',
      linkInputLabel: 'वेबसाइट किंवा ब्रोकर लिंक टाका',
      linkPlaceholder: 'https://apex-capital-investments-portal.net',
      checkLinkBtn: 'डोमेन आणि सुरक्षा तपासा',
      screenshotDropTitle: 'स्क्रीनशॉट किंवा चॅटचा फोटो येथे ओढा',
      screenshotDropSub: 'PNG, JPG, WEBP फाईल्स (कमाल 10MB)',
      browseFiles: 'फाईल निवडा',
      analyzeScreenshotBtn: 'ओसीआर द्वारे स्क्रीनशॉट तपासा',
      privacyWarning: 'स्क्रीनशॉटमध्ये तुमची खाजगी माहिती असू शकते. विश्लेषणापूर्वी आम्ही खाजगी तपशील काढून टाकतो.',
      brokerNameLabel: 'ब्रोकर किंवा सल्लागाराचे नाव',
      brokerNamePlaceholder: 'उदा. एबीसी वेल्थ ॲडव्हायझर्स',
      brokerRegLabel: 'नोंदणी किंवा परवाना क्रमांक',
      brokerRegPlaceholder: 'उदा. IN000123456',
      verifyBrokerBtn: 'अधिकृत नोंदणी तपासा',
      demoNote: 'डेमो पडताळणी मोड: सेबी / नियामक डेटाबेस सिम्युलेशनशी जोडलेला आहे.',
      whatVeriVestChecks: 'VeriVest काय तपासते',
      checks: {
        c1Title: 'दबाव आणि भाषेची रचना',
        c1Desc: 'खोटी घाई, हमखास परतावा आणि तात्काळ पैसे गुंतवण्याचा दबाव ओळखते.',
        c2Title: 'नियामक नोंदणीची स्थिती',
        c2Desc: 'सेबी आणि सरकारी नोंदींमध्ये परवाना क्रमांक पडताळला जातो.',
        c3Title: 'पंप-अँड-डंपचे संकेत',
        c3Desc: 'टेलिग्राम आणि व्हॉट्सॲपवर पसरवल्या जाणाऱ्या खोट्या टिप्स शोधते.',
        c4Title: 'वैयक्तिक खात्याचे धोके',
        c4Desc: 'अधिकृत कंपनी खात्याऐवजी वैयक्तिक यूपीआय किंवा बँक खात्यात पैसे मागणे ओळखते.',
      },
      confidentialityTitle: 'गोपनीयतेची हमी',
      confidentialityDesc: 'तुमची माहिती पूर्णपणे खाजगी राहते आणि कोणत्याही त्रयस्थ पक्षाशी शेअर केली जात नाही.',
      benchmarks: {
        dailyClaims: 'दररोज तपासले जाणारे दावे',
        falsePositive: 'चुकीची शक्यता',
      },
      dossierCardTitle: 'VeriVest इंटेलिजन्स अहवाल - सोशल मीडियावरील खोट्या योजनांचा सारांश वाचा.',
    },
    loading: {
      title: 'तुमच्या दाव्याचे विश्लेषण चालू आहे...',
      subtitle: 'संदेशातील माहितीची सरकारी नोंदी आणि फसवणुकीच्या नमुन्यांशी तुलना केली जात आहे.',
      s1: 'माहिती आणि दावे वेगळे केले जात आहेत',
      s2: 'संशयास्पद पद्धती आणि दबाव ओळखला जात आहे',
      s3: 'धोका आणि नियमांचे मूल्यांकन चालू आहे',
      s4: 'स्पष्टीकरण आणि सुरक्षा सूचना तयार केल्या जात आहेत',
    },
    result: {
      title: 'तुमचा गुंतवणूक पडताळणी अहवाल',
      analyzedToday: 'आज विश्लेषित',
      printFile: 'प्रिंट फाईल',
      rawPayload: 'मूळ संदेश पहा',
      aggregateThreatIndex: 'एकूण धोका निर्देशांक',
      probabilityLoss: 'पैसे गमावण्याची शक्यता',
      forensicDirectiveTitle: 'सुरक्षा सूचना',
      detectedSignals: 'आढळलेले धोके आणि संकेत',
      activeVectors: 'सक्रिय धोके',
      recommendedActions: 'पुढील आवश्यक पावले',
      flagWatchdog: 'तक्रार नोंदवा',
      protectCircle: 'आपल्या लोकांना सावध करा',
      protectCircleSub: 'हा अहवाल तुमच्या कुटुंब आणि मित्रांशी शेअर करा जेणेकरून त्यांचे नुकसान होणार नाही.',
      downloadPdf: 'पडताळणी अहवाल डाउनलोड करा (PDF)',
      shareWarning: 'कुटुंबाशी शेअर करा',
      verifyAnother: 'दुसरा दावा तपासा',
      verifySourceTitle: 'स्रोताची पडताळणी',
      claimedEntity: 'दावा केलेल्या संस्थेचे नाव',
      claimedRegNumber: 'दावा केलेला नोंदणी क्रमांक',
      verificationStatus: 'पडताळणी स्थिती',
      checkOfficialRecords: 'सरकारी नोंदी तपासा',
      whyThisMattersTitle: 'हे का महत्त्वाचे आहे',
      whyThisMattersText: 'फसवणूक करणारे अनेकदा बनावट नोंदणी क्रमांक दाखवतात. पैसे ट्रान्सफर करण्यापूर्वी नेहमी अधिकृत सरकारी पोर्टलवर खात्री करा.',
      investigativeRegistryLog: 'नियामक नोंदणी लॉग',
      helplineText: 'फसवणूक किंवा सायबर गुन्ह्याची तक्रार राष्ट्रीय सायबर हेल्पलाइन १९३० वर नोंदवा.',
      dossierStampTitle: 'डिजिटल पडताळणी शिक्का',
    },
    tipProfiler: {
      title: 'ही गुंतवणूक टीप सुरक्षित आहे का?',
      subtitle: 'व्हॉट्सॲप आणि टेलिग्राम ग्रुप्समधील संदेशांसाठी विशेष तपासणी यंत्रणा.',
      detectedMessage: 'आढळलेला संदेश',
      classification: 'वर्गीकरण',
      highRiskSolicitation: 'अति-धोकादायक मागणी',
      evidentiaryMarkers: 'आढळलेले धोक्याचे संकेत',
      evaluation: 'कायदेशीर मूल्यांकन: हा संदेश सेबी कायद्यानुसार बाजारातील फेरफार आणि अनधिकृत सल्ल्याचे संकेत दर्शवितो.',
      reScan: 'पुन्हा तपासा',
      downloadAudit: 'संपूर्ण अहवाल डाउनलोड करा →',
      pasteTipLabel: 'तपासणीसाठी टेलिग्राम किंवा व्हॉट्सॲप टीप टाका',
      pasteTipPlaceholder: 'उदा. 🚨 इनसायडर स्टॉक अलर्ट 🚨 ४०% हमखास परतावा. फक्त १० जागा शिल्लक. ताबडतोब ॲडमिनला मेसेज करा...',
      analyzeTipBtn: 'टीप तपासा',
    },
    history: {
      title: 'तुमचा पडताळणी इतिहास',
      subtitle: 'VeriVest द्वारे आधी तपासलेले संदेश, लिंक्स आणि कागदपत्रे.',
      allRecords: 'सर्व नोंदी',
      highRiskFilter: 'उच्च धोका',
      verifiedFilter: 'सत्यापित सुरक्षित',
      suspiciousFilter: 'संशयास्पद',
      colSubject: 'तपासलेला विषय',
      colStatus: 'धोका पातळी',
      colTime: 'वेळ',
      colAction: 'अहवाल',
      viewAnalysis: 'विश्लेषण पहा →',
      searchPlaceholder: 'कीवर्ड किंवा संस्थेच्या नावाने शोधा...',
      emptyText: 'कोणत्याही नोंदी आढळल्या नाहीत.',
    },
    education: {
      title: 'गुंतवणुकीपूर्वी शिका',
      subtitle: 'आर्थिक फसवणूक ओळखण्यासाठी सोप्या भाषेतील मार्गदर्शक पुस्तिका.',
      readGuide: 'पुस्तिका वाचा ↓',
      modalRedFlags: 'धोक्याची प्रमुख लक्षणे',
      modalWhatToDo: 'तातडीने काय करावे',
      modalExample: 'फसव्या संदेशाचे उदाहरण',
      close: 'बंद करा',
      bannerTitle: 'काही नवीन घोटाळा आढळला का?',
      bannerSub: 'आमच्या पडताळणी मंडळाकडे अज्ञातपणे स्क्रीनशॉट किंवा संदेश पाठवा.',
      bannerBtn: 'तपासणीसाठी पाठवा',
    },
    settings: {
      title: 'खाते सेटिंग्ज आणि गोपनीयता',
      accountSection: 'खाते प्रोफाइल',
      prefSection: 'भाषा आणि अहवाल प्राधान्ये',
      securitySection: 'सुरक्षा आणि पासवर्ड',
      privacySection: 'गोपनीयता धोरण',
      languageLabel: 'वापरलेली भाषा',
      saveChanges: 'बदल जतन करा',
      changePassword: 'पासवर्ड बदला',
      privacyStorageDesc: 'VeriVest तुमच्या गोपनीयतेचा आदर करते. विश्लेषणादरम्यान डेटा तात्पुरता प्रक्रिया केला जातो आणि साठवला जात नाही.',
    },
    scan: {
      pageTitle: 'तपासणी करा',
      pageSubtitle: 'कोणतीही कारवाई किंवा पैसे पाठवण्यापूर्वी संशयास्पद गुंतवणूक संदेश, स्क्रीनशॉट किंवा लिंक तपासा.',
      tabMessage: 'संदेश',
      tabScreenshot: 'स्क्रीनशॉट',
      tabLink: 'लिंक',
      tabEntity: 'संस्था',
      msgLabel: 'व्हॉट्सॲप, टेलिग्राम, SMS किंवा ईमेल दावा येथे टाका:',
      pasteBtn: 'टाका',
      msgPlaceholder: 'संशयास्पद संदेश येथे टाका...\nउदाहरण: "७ दिवसांत ४०% हमखास परतावा! फक्त १० जागा शिल्लक. UPI वर पैसे पाठवा: abcwealth@okaxis"',
      screenshotDropTitle: 'येथे क्लिक करा किंवा स्क्रीनशॉट ओढा',
      screenshotDropSub: 'PNG, JPG, किंवा WEBP. अपलोड केलेल्या प्रतिमा मेमरीत प्रक्रिया केल्या जातात आणि साठवल्या जात नाहीत.',
      screenshotUploaded: 'अपलोड केलेला स्क्रीनशॉट:',
      removeImage: 'प्रतिमा काढा',
      ocrLabel: 'काढलेला मजकूर (OCR):',
      ocrReading: 'मजकूर वाचत आहे...',
      ocrPlaceholder: 'काढलेला मजकूर येथे दिसेल...',
      linkLabel: 'संशयास्पद वेबसाइट लिंक किंवा ब्रोकर पोर्टल टाका:',
      entityNameLabel: 'दावा केलेल्या संस्थेचे किंवा सल्लागाराचे नाव:',
      entityNamePlaceholder: 'उदा. एपेक्स वेल्थ ॲडव्हायझर्स किंवा झेरोधा',
      entityRegLabel: 'नोंदणी क्रमांक (ऐच्छिक):',
      entityRegPlaceholder: 'उदा. INZ000293433 किंवा INA000123456',
      analyzeBtn: 'विश्लेषण करा',
      privacyNotice: 'VeriVest धोक्याचे संकेत आणि पडताळणीतील उणिवा ओळखते. हे आर्थिक किंवा ट्रेडिंग सल्ला देत नाही.',
      trySampleLabel: 'किंवा एक वास्तवदर्शी नमुना वापरून पहा:',
      sensitiveWarning: 'संवेदनशील माहिती आढळली. कृपया OTP किंवा खाजगी पासवर्ड काढा.',
      errorMessage: 'कृपया PNG, JPG किंवा WEBP प्रतिमा अपलोड करा.',
      errorNoMessage: 'कृपया तपासण्यासाठी गुंतवणूक संदेश टाका.',
      errorNoScreenshot: 'कृपया स्क्रीनशॉट अपलोड करा.',
      errorNoLink: 'कृपया वेबसाइट लिंक टाका.',
      errorNoEntity: 'कृपया संस्थेचे नाव किंवा नोंदणी क्रमांक टाका.',
    },
    learn: {
      pageTitle: 'शिका / सिम्युलेटर',
      pageSubtitle: 'सामान्य गुंतवणूक घोटाळे समजून घ्या आणि धोक्याचे संकेत ओळखण्याचा सराव करा.',
      tabSimulator: 'घोटाळा सिम्युलेटर',
      tabGuides: 'सुरक्षा मार्गदर्शिका',
      safeChoices: 'सुरक्षित उत्तरे:',
      simulatedPitch: 'अनुकरणीय प्रस्ताव',
      whatWouldYouDo: 'तुम्ही काय कराल?',
      goodDecision: 'चांगला निर्णय!',
      warningFlag: 'धोक्याचा संकेत:',
      warningSigns: 'या परिस्थितीतील धोक्याचे संकेत:',
      achievement: 'यश: गुंतवणूकदार सुरक्षा शिकणारा',
      achievementBody: 'तुम्ही सर्व {total} प्रश्नांची उत्तरे दिली ({score}/{total} बरोबर). तुमचा बॅज प्रोफाइलमध्ये जोडला गेला आहे!',
      viewProfile: 'प्रोफाइल पहा आणि यश शेअर करा →',
      tryAnother: 'दुसरा प्रसंग वापरून पहा →',
      readGuide: 'पुस्तिका वाचा',
    },
    tipPage: {
      pageTitle: 'टीप आणि ग्रुप विश्लेषक',
      pageSubtitle: 'सोशल मेसेजिंग चॅनेल्समधील संशयास्पद गुंतवणूक टिप्स, सशुल्क ग्रुप्स आणि दबावाच्या युक्त्यांचे विश्लेषण करा.',
      inputLabel: 'कोणतीही टीप येथे टाका',
      inputPlaceholder: 'टेलिग्राम अलर्ट किंवा व्हॉट्सॲप ब्रॉडकास्ट टाका...\nउदाहरण: "🚨 इनसायडर स्टॉक अलर्ट: १० सत्रांत ४५% हमखास परतावा! ₹१०,००० वैयक्तिक UPI वर पाठवा..."',
      evaluatesNote: 'मूल्यांकन करते: तातडी, इनसायडर वादे, सशुल्क ग्रुप फनेल आणि वैयक्तिक पेमेंट रूटिंग',
      analyzeTipBtn: 'टीप तपासा →',
      sampleBreakdownTitle: 'नमुना टीप विश्लेषण',
      nextSpecimen: 'पुढील नमुना',
      tipContent: 'टीप सामग्री:',
      tacticsLabel: 'ओळखलेल्या संवाद युक्त्या:',
      verificationGapsLabel: 'पडताळणीतील उणिवा:',
      safeNextStepsLabel: 'सुरक्षित पुढील पावले:',
      scanThisTipBtn: 'मुख्य स्कॅनरमध्ये तपासा →',
      noTradingNote: 'कोणतेही ट्रेडिंग सिग्नल किंवा स्टॉक कॉल नाही',
    },
  },
};
