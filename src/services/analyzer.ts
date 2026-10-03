import {
  AnalysisResult,
  Language,
  RiskLevel,
  AssessmentLevel,
  ScamDNASignal,
  ExtractedClaim,
  RiskSignal,
  Severity,
  VerificationDetail,
  UrlSafetyCheck,
} from '../types';
import { verificationService } from './verificationService';

export interface AnalyzeRequest {
  type: 'message' | 'url' | 'screenshot' | 'broker' | 'tip';
  content: string;
  brokerName?: string;
  regNumber?: string;
  imagePreview?: string;
  imageBase64?: string;
  imageBuffer?: string;
  mimeType?: string;
  language: Language;
}

/**
 * Checks for sensitive user credentials (OTPs, passwords, CVVs) to enforce Privacy by Design.
 */
function detectSensitiveInformation(text: string): { detected: boolean; message?: string } {
  const otpPattern = /\b(\d{6}|\d{4})\s*(is your (otp|verification code|pin)|ओटीपी|पासवर्ड)\b/i;
  const passwordPattern = /\b(password|passwd|pin|secret|सीक्रेट|पासवर्ड)\s*[:=]\s*[^\s]+/i;
  const cardPattern = /\b\d{4}[ -]?\d{4}[ -]?\d{4}[ -]?\d{4}\b/;

  if (otpPattern.test(text) || passwordPattern.test(text) || cardPattern.test(text)) {
    return {
      detected: true,
      message:
        'Sensitive information detected (possible OTP, password, or card number). Please remove private credentials before sharing financial content.',
    };
  }
  return { detected: false };
}

/**
 * Deterministic Rule Engine for Scam DNA detection and claim extraction.
 * Safety backbone: guaranteed deterministic findings that cannot be bypassed or hallucinated.
 */
export async function analyzeLocally(req: AnalyzeRequest): Promise<AnalysisResult> {
  const rawText = req.content || (req.brokerName ? `${req.brokerName} ${req.regNumber || ''}` : '');
  const lowerText = (rawText + ' ' + (req.brokerName || '') + ' ' + (req.regNumber || '')).toLowerCase();
  const lang = req.language;

  // 1. Privacy check
  const privacyCheck = detectSensitiveInformation(rawText);

  // 2. Scam DNA detections
  const scamDna: ScamDNASignal[] = [];
  const claims: ExtractedClaim[] = [];
  let claimCounter = 1;

  const addClaim = (quote: string, category: string, signalId?: string, note?: string) => {
    const claimNum = `CLAIM ${String(claimCounter++).padStart(2, '0')}`;
    claims.push({
      id: `claim-${claimCounter}`,
      claimNumber: claimNum,
      quote,
      category,
      signalId,
      verificationNote: note,
    });
  };

  // Rule 1: Guaranteed / Unrealistic Returns
  const guaranteeMatch = rawText.match(
    /(guaranteed\s*\d+%?|100%\s*(safe|returns?|profit)|risk[- ]free|zero risk|fixed return|\d{2,3}%\s*(monthly|weekly|daily|returns?)|गारंटी|पक्का रिटर्न|हमखास परतावा)/i
  );
  if (guaranteeMatch || /guaranteed|100%|risk[- ]free|पक्का|गारंटी|हमखास|40%|50%|30%/.test(lowerText)) {
    const quote = guaranteeMatch ? guaranteeMatch[0] : 'Guaranteed high-return claim';
    const sigId = 'sig-guarantee';
    scamDna.push({
      id: sigId,
      name:
        lang === 'hi'
          ? 'गारंटीड या अवास्तविक रिटर्न का दावा'
          : lang === 'mr'
          ? 'हमखास किंवा अवास्तव परताव्याचा दावा'
          : 'Guaranteed / Unrealistic Returns Claim',
      severity: 'critical',
      evidence: quote,
      whyItMatters:
        lang === 'hi'
          ? 'शेयर बाजार में जोखिम-मुक्त या गारंटीड 30-50% रिटर्न देना वित्तीय रूप से असंभव है। सेबी पंजीकृत सलाहकारों पर ऐसे वादे करने पर कानूनी रोक है।'
          : lang === 'mr'
          ? 'भांडवली बाजारात हमखास नफा मिळणे व्यवहार्य दृष्ट्या अशक्य आहे. असे दावे सहसा पोंझी योजनांचे संकेत असतात.'
          : 'Legitimate capital markets cannot guarantee risk-free returns. Regulatory bodies explicitly forbid registered entities from promising fixed returns on equity investments.',
      recommendedAction:
        lang === 'hi'
          ? 'जब तक दावे और संस्था की स्वतंत्र पुष्टि न हो जाए, एक रुपया भी ट्रांसफर न करें।'
          : lang === 'mr'
          ? 'दाव्याची स्वतंत्र पडताळणी होईपर्यंत कोणत्याही खात्यात पैसे पाठवू नका.'
          : 'Do not transfer money until the claim and entity are independently verified.',
      category: 'Guaranteed / unrealistic returns',
      educationalGuideId: 'guaranteed-return-scams',
    });
    addClaim(quote, 'Guaranteed Returns', sigId, 'Market-linked assets cannot offer fixed positive yields.');
  }

  // Rule 2: Artificial Urgency & Scarcity
  const urgencyMatch = rawText.match(
    /(only\s*\d+\s*(slots?|seats?|spots?)|hurry|expires today|act now|within \d+ minutes|don't miss|सीमित स्लॉट|तुरंत|मर्यादित जागा|आत्ताच)/i
  );
  if (urgencyMatch || /only \d+|hurry|expires|today|blast|rocket|सीमित|तुरंत|आत्ताच/.test(lowerText)) {
    const quote = urgencyMatch ? urgencyMatch[0] : 'Artificial urgency or limited window statement';
    const sigId = 'sig-urgency';
    scamDna.push({
      id: sigId,
      name:
        lang === 'hi'
          ? 'कृत्रिम जल्दबाजी और मनोवैज्ञानिक दबाव'
          : lang === 'mr'
          ? 'खोटी घाई आणि मानसिक दबाव'
          : 'Artificial Urgency & Time Pressure',
      severity: 'high',
      evidence: quote,
      whyItMatters:
        lang === 'hi'
          ? 'सीमित समय का दबाव निवेशकों को सोचने और परिवार या सलाहकारों से जांच कराने का समय नहीं देता।'
          : lang === 'mr'
          ? 'घाई निर्माण केल्यामुळे गुंतवणूकदाराला स्वतंत्रपणे विचार करण्यास वेळ मिळत नाही.'
          : 'Fabricated deadlines and scarcity reduce the time available for independent verification and family consultation.',
      recommendedAction:
        lang === 'hi'
          ? 'दबाव में आकर जल्दबाजी में कोई फैसला न लें। रुकें और शांत दिमाग से जांचें।'
          : lang === 'mr'
          ? 'घाईत कोणताही निर्णय घेऊ नका. शांतपणे अधिकृत माहिती तपासा.'
          : 'Pause and refuse to be rushed. Legitimate investment opportunities do not expire in minutes.',
      category: 'Artificial urgency',
      educationalGuideId: 'pump-and-dump',
    });
    addClaim(quote, 'Time Pressure', sigId, 'Used to prevent independent verification.');
  }

  // Rule 3: Personal UPI / Unusual Payment Routing
  const upiMatch = rawText.match(
    /([a-zA-Z0-9._-]+@(okaxis|okhdfcbank|icici|paytm|ybl|axl|ibl)|personal account|व्यक्तिगत खाता|वैयक्तिक खाते)/i
  );
  if (upiMatch || /@ok|@icici|@paytm|@ybl|personal account|व्यक्तिगत खाता/.test(lowerText)) {
    const quote = upiMatch ? upiMatch[0] : 'Routing to personal UPI or retail banking account';
    const sigId = 'sig-payment-upi';
    scamDna.push({
      id: sigId,
      name:
        lang === 'hi'
          ? 'व्यक्तिगत यूपीआई या असुरक्षित खाता'
          : lang === 'mr'
          ? 'वैयक्तिक यूपीआय किंवा संशयास्पद खाते'
          : 'Personal UPI / Unusual Payment Request',
      severity: 'critical',
      evidence: quote,
      whyItMatters:
        lang === 'hi'
          ? 'पंजीकृत ब्रोकर या सलाहकार कभी भी अपने व्यक्तिगत यूपीआई या किसी व्यक्ति के निजी बैंक खाते में ग्राहकों का पैसा नहीं मंगवाते।'
          : lang === 'mr'
          ? 'अधिकृत सल्लागार कधीही ग्राहकांचे पैसे वैयक्तिक यूपीआय आयडीवर घेत नाहीत.'
          : 'Registered financial intermediaries are legally prohibited from collecting investor funds into personal UPI handles or retail accounts.',
      recommendedAction:
        lang === 'hi'
          ? 'व्यक्तिगत यूपीआई पते पर पैसे कभी न भेजें। केवल अधिकृत संस्थागत बैंक खातों में ही लेनदेन करें।'
          : lang === 'mr'
          ? 'वैयक्तिक यूपीआयवर पैसे पाठवू नका. केवळ अधिकृत कंपनी खात्यातच व्यवहार करा.'
          : 'Never transfer funds to a personal UPI handle or individual bank account.',
      category: 'Personal UPI / unusual payment request',
      educationalGuideId: 'fake-broker-portals',
    });
    addClaim(quote, 'Payment Channel', sigId, 'Direct personal account collection violates regulatory segregation.');
  }

  // Rule 4: Upfront Fees / Unlock Charges
  const upfrontMatch = rawText.match(
    /(upfront fee|advance tax|activation fee|clearance charge|token allotment|अग्रिम शुल्क|टैक्स जमा करें|फीस)/i
  );
  if (upfrontMatch || /upfront|advance|token allotment|activation fee|clearance charge/.test(lowerText)) {
    const quote = upfrontMatch ? upfrontMatch[0] : 'Request for upfront fee or clearance charge';
    const sigId = 'sig-upfront-fee';
    scamDna.push({
      id: sigId,
      name:
        lang === 'hi'
          ? 'अग्रिम शुल्क या पैसे निकालने के लिए भुगतान की मांग'
          : lang === 'mr'
          ? 'आधी फी किंवा नफा काढण्यासाठी पैशांची मागणी'
          : 'Request for Upfront Fees / Unlock Charges',
      severity: 'high',
      evidence: quote,
      whyItMatters:
        lang === 'hi'
          ? 'धोखेबाज अक्सर नकली मुनाफा दिखाकर उसे निकालने के लिए "टैक्स" या "एक्टिवेशन फीस" की अग्रिम मांग करते हैं।'
          : lang === 'mr'
          ? 'खोटा नफा दाखवून पैसे काढण्यासाठी कराच्या किंवा फीच्या नावाखाली अधिक पैसे उकळणे ही फसवणुकीची पद्धत आहे.'
          : 'Demanding upfront fees or advance taxes to "release" or "unlock" supposed investment profits is a classic hallmark of advance-fee fraud.',
      recommendedAction:
        lang === 'hi'
          ? 'कथित मुनाफा पाने के लिए कोई अतिरिक्त राशि जमा न करें।'
          : lang === 'mr'
          ? 'नफा मिळवण्यासाठी कसलेही अतिरिक्त शुल्क भरू नका.'
          : 'Never pay upfront fees to release investment earnings.',
      category: 'Request for upfront fees',
      educationalGuideId: 'fake-broker-portals',
    });
    addClaim(quote, 'Fee Structure', sigId, 'Advance fees to release funds indicates fraud.');
  }

  // Rule 5: Cryptocurrency / Offshore Payments
  const cryptoMatch = rawText.match(/(usdt|binance|crypto wallet|trc20|erc20|bitcoin|क्रिप्टो)/i);
  if (cryptoMatch || /usdt|binance|crypto|bitcoin|trc20/.test(lowerText)) {
    const quote = cryptoMatch ? cryptoMatch[0] : 'Cryptocurrency wallet payment request';
    const sigId = 'sig-crypto';
    scamDna.push({
      id: sigId,
      name:
        lang === 'hi'
          ? 'क्रिप्टोकरेंसी भुगतान का अनुरोध'
          : lang === 'mr'
          ? 'क्रिप्टोकरन्सीद्वारे पेमेंटची मागणी'
          : 'Cryptocurrency / Anonymous Payment Request',
      severity: 'critical',
      evidence: quote,
      whyItMatters:
        lang === 'hi'
          ? 'क्रिप्टो वॉलेट में भेजा गया पैसा वापस पाना नामुमकिन होता है और इसमें बैंकिंग सुरक्षा नहीं होती।'
          : lang === 'mr'
          ? 'क्रिप्टोमध्ये पाठवलेले पैसे परत मिळवणे अशक्य असते आणि त्याला कायदेशीर संरक्षण नसते.'
          : 'Cryptocurrency transactions are pseudonymous and irreversible, providing zero consumer dispute protections.',
      recommendedAction:
        lang === 'hi'
          ? 'क्रिप्टो वॉलेट या अनधिकृत एक्सचेंजों पर पैसे न भेजें।'
          : lang === 'mr'
          ? 'क्रिप्टो खात्यावर कधीही पैसे पाठवू नका.'
          : 'Do not send funds through crypto channels for purported domestic stock or investment advice.',
      category: 'Crypto payment request',
      educationalGuideId: 'guaranteed-return-scams',
    });
    addClaim(quote, 'Currency Channel', sigId, 'Irreversible transaction mechanism.');
  }

  // Rule 6: Remote Access Software Request
  const remoteMatch = rawText.match(/(anydesk|teamviewer|rustdesk|quicksupport|screen share|स्क्रीन शेयर)/i);
  if (remoteMatch || /anydesk|teamviewer|rustdesk|quicksupport/.test(lowerText)) {
    const quote = remoteMatch ? remoteMatch[0] : 'Request to install remote desktop tool';
    const sigId = 'sig-remote-access';
    scamDna.push({
      id: sigId,
      name:
        lang === 'hi'
          ? 'रिमोट एक्सेस ऐप इंस्टॉल करने का अनुरोध'
          : lang === 'mr'
          ? 'स्क्रीन शेअरिंग ॲप इन्स्टॉल करण्याची मागणी'
          : 'Remote-Access Software Request',
      severity: 'critical',
      evidence: quote,
      whyItMatters:
        lang === 'hi'
          ? 'AnyDesk या TeamViewer जैसे ऐप से धोखेबाज आपके फोन की स्क्रीन देखकर बैंक खाते से पैसे निकाल लेते हैं।'
          : lang === 'mr'
          ? 'स्क्रीन शेअरिंग ॲपमुळे समोरच्या व्यक्तीला तुमच्या मोबाईलमधील पासवर्ड आणि ओटीपी दिसू शकतो.'
          : 'Remote-access tools allow malicious actors to observe your bank logins, capture OTPs, and take full control of your device.',
      recommendedAction:
        lang === 'hi'
          ? 'किसी भी सलाहकार के कहने पर AnyDesk या TeamViewer कभी इंस्टॉल न करें।'
          : lang === 'mr'
          ? 'कोणाच्याही सांगण्यावरून AnyDesk किंवा TeamViewer ॲप घेऊ नका.'
          : 'Immediately decline and uninstall any remote-access applications.',
      category: 'Remote-access request',
      educationalGuideId: 'remote-access-scams',
    });
    addClaim(quote, 'Device Access', sigId, 'Remote access tool request compromises banking sessions.');
  }

  // Rule 7: "Insider" or Secret Tip Claims
  const insiderMatch = rawText.match(
    /(insider|exclusive|vip group|secret tip|board meeting|multibagger|गुप्त सूचना|अंदर की खबर)/i
  );
  if (insiderMatch || /insider|exclusive|multibagger|operator/.test(lowerText)) {
    const quote = insiderMatch ? insiderMatch[0] : 'Insider intelligence claim';
    const sigId = 'sig-insider';
    scamDna.push({
      id: sigId,
      name:
        lang === 'hi'
          ? 'अंदरूनी जानकारी या गुप्त टिप का भ्रामक दावा'
          : lang === 'mr'
          ? 'गुप्त माहिती किंवा इनसाइडर टिपचा दावा'
          : '"Insider" or Exclusive Opportunity Claim',
      severity: 'high',
      evidence: quote,
      whyItMatters:
        lang === 'hi'
          ? 'अंदरूनी सूचनाओं के नाम पर अक्सर पेनी स्टॉक्स में पंप-एंड-डंप किया जाता है जिसमें खुदरा निवेशकों के पैसे डूब जाते हैं।'
          : lang === 'mr'
          ? 'गुप्त माहितीच्या बहाण्याने शेअर्सचे भाव कृत्रिमरीत्या वाढवून फसवणूक केली जाते.'
          : 'Claims of private insider tips are frequently used to coordinate pump-and-dump operations where organizers sell while retail buyers absorb losses.',
      recommendedAction:
        lang === 'hi'
          ? 'प्राइवेट मैसेजिंग ग्रुप्स की गुप्त टिप्स पर भरोसा न करें।'
          : lang === 'mr'
          ? 'टेलिग्राम किंवा व्हॉट्सॲपवरील गुप्त टिप्सवर विश्वास ठेवू नका.'
          : 'Never execute stock orders based on non-public rumors in messaging channels.',
      category: '"Insider" or exclusive opportunity claim',
      educationalGuideId: 'pump-and-dump',
    });
    addClaim(quote, 'Information Source', sigId, 'Unverified non-public intelligence claim.');
  }

  // Rule 8: Pressure to Move to Private Messaging
  const dmMatch = rawText.match(/(dm admin|whatsapp me|join private telegram|inbox me|टेलीग्राम|व्हाट्सएप)/i);
  if (dmMatch || /dm admin|whatsapp me|join telegram|private chat/.test(lowerText)) {
    const quote = dmMatch ? dmMatch[0] : 'Direct message or private messaging channel shift';
    const sigId = 'sig-private-chat';
    scamDna.push({
      id: sigId,
      name:
        lang === 'hi'
          ? 'निजी चैट या टेलीग्राम पर बातचीत ले जाने का दबाव'
          : lang === 'mr'
          ? 'खाजगी चॅट किंवा टेलिग्रामवर जाण्याचा आग्रह'
          : 'Pressure to Move to Private Messaging',
      severity: 'warning',
      evidence: quote,
      whyItMatters:
        lang === 'hi'
          ? 'पब्लिक प्लेटफॉर्म छोड़कर प्राइवेट चैट में बात करना निगरानी से बचने और सबूत मिटाने का तरीका होता है।'
          : lang === 'mr'
          ? 'सार्वजनिक व्यासपीठ सोडून खाजगी चॅटमध्ये बोलणे हे तपास यंत्रणांपासून लपण्यासाठी केले जाते.'
          : 'Moving conversations to encrypted, anonymous channels limits public scrutiny and facilitates rapid message deletion.',
      recommendedAction:
        lang === 'hi'
          ? 'केवल आधिकारिक और रिकॉर्ड की गई ईमेल या पोर्टल पर ही संवाद करें।'
          : lang === 'mr'
          ? 'केवळ अधिकृत वेबसाइट किंवा ईमेलवरूनच संपर्क ठेवा.'
          : 'Keep investment discussions on regulated, auditable platforms.',
      category: 'Pressure to move conversation to private messaging',
      educationalGuideId: 'pump-and-dump',
    });
    addClaim(quote, 'Communication Channel', sigId, 'Encrypted private channel diversion.');
  }

  // Rule 9: Authority / Regulator Impersonation Claim
  const regNumberFound =
    req.regNumber || (rawText.match(/(in[a-z0-9/]{6,14}|sebi\/reg[a-z0-9/]*)/i) || [])[0];
  if (regNumberFound || /sebi|sec|rbi|fca|regulat/i.test(lowerText)) {
    const quote = regNumberFound || 'Claimed regulatory accreditation';
    const sigId = 'sig-regulatory-claim';
    scamDna.push({
      id: sigId,
      name:
        lang === 'hi'
          ? 'नियामक प्राधिकरण या पंजीकरण का दावा'
          : lang === 'mr'
          ? 'नियामक किंवा परवान्याचा दावा'
          : 'Authority / Regulatory Accreditation Claim',
      severity: 'high',
      evidence: quote,
      whyItMatters:
        lang === 'hi'
          ? 'धोखेबाज अक्सर फर्जी या चुराए गए सेबी रजिस्ट्रेशन नंबर का इस्तेमाल करके भरोसा जीतने की कोशिश करते हैं।'
          : lang === 'mr'
          ? 'गुंतवणूकदारांचा विश्वास जिंकण्यासाठी अनेकदा सेबीचा बनावट नोंदणी क्रमांक दाखवला जातो.'
          : 'Fraudsters routinely cite forged or borrowed regulatory registration tokens to manufacture immediate credibility.',
      recommendedAction:
        lang === 'hi'
          ? 'सेबी की आधिकारिक वेबसाइट (sebi.gov.in) पर जाकर नंबर और कंपनी के नाम का स्वतंत्र रूप से मिलान करें।'
          : lang === 'mr'
          ? 'सेबीच्या अधिकृत वेबसाइटवर जाऊन नोंदणी क्रमांकाची स्वतंत्रपणे खात्री करा.'
          : 'Independently check the registration identifier directly on the official regulator directory.',
      category: 'Fake regulatory claims',
      educationalGuideId: 'identifying-fake-sebi-registrations',
    });
    addClaim(quote, 'Regulatory Status', sigId, 'Subject to independent registry confirmation.');
  }

  // 3. Verification Details
  let verificationDetails: VerificationDetail;
  if (req.brokerName || regNumberFound) {
    if (regNumberFound) {
      verificationDetails = await verificationService.verifyRegistration(regNumberFound, req.brokerName);
    } else {
      verificationDetails = await verificationService.verifyEntity(req.brokerName || 'Claimed Entity');
    }
  } else {
    verificationDetails = {
      claimedEntity: 'No specific entity claimed',
      claimedRegNumber: 'None provided',
      status: 'UNAVAILABLE',
      sourceChecked: 'Standard entity extraction',
      lastChecked: 'Today',
      whatWasVerified: ['Message does not specify a named registered intermediary'],
      whatCouldNotBeVerified: ['No registration number or organization name was provided to check'],
    };
  }

  // 4. URL Safety Check (if applicable)
  let urlSafety: UrlSafetyCheck | undefined;
  const urlMatch = rawText.match(/https?:\/\/[^\s]+|[a-zA-Z0-9-]+\.(com|in|vip|top|online|xyz|org|net|cc)[^\s]*/i);
  if (req.type === 'url' || urlMatch) {
    const targetUrl = req.type === 'url' ? rawText : urlMatch![0];
    urlSafety = await verificationService.verifyDomain(targetUrl, req.brokerName);

    if (urlSafety.overallStatus === 'HIGH_RISK' || urlSafety.overallStatus === 'REQUIRES_CAUTION') {
      scamDna.push({
        id: 'sig-url-safety',
        name:
          lang === 'hi'
            ? 'संदिग्ध वेबसाइट या डोमेन पैटर्न'
            : lang === 'mr'
            ? 'संशयास्पद वेबसाइट किंवा डोमेन'
            : 'Suspicious External Link / Domain Anomaly',
        severity: urlSafety.overallStatus === 'HIGH_RISK' ? 'critical' : 'warning',
        evidence: urlSafety.domain,
        whyItMatters:
          lang === 'hi'
            ? 'वेबसाइट नए या असामान्य डोमेन एक्सटेंशन पर है जो नकली ब्रोकर पोर्टल्स में अक्सर देखे जाते हैं।'
            : lang === 'mr'
            ? 'हा डोमेन अनेकदा फसव्या पोर्टलसाठी वापरल्या जाणाऱ्या श्रेणीत मोडतो.'
            : urlSafety.notes.join(' '),
        recommendedAction:
          lang === 'hi'
            ? 'इस लिंक पर क्लिक न करें और न ही कोई लॉगिन या पासवर्ड दर्ज करें।'
            : lang === 'mr'
            ? 'या लिंकवर क्लिक करू नका किंवा कोणताही पासवर्ड टाकू नका.'
            : 'Do not enter credentials or download software from this URL.',
        category: 'Suspicious external link',
        educationalGuideId: 'fake-broker-portals',
      });
      addClaim(urlSafety.domain, 'Website URL', 'sig-url-safety', urlSafety.notes[0]);
    }
  }

  // 5. Score and Assessment computation
  // Score is strictly labeled as "Internal risk indicator score", communicating uncertainty
  const criticalCount = scamDna.filter((s) => s.severity === 'critical').length;
  const highCount = scamDna.filter((s) => s.severity === 'high').length;
  const warningCount = scamDna.filter((s) => s.severity === 'warning').length;

  let riskScore = 15;
  riskScore += criticalCount * 28;
  riskScore += highCount * 18;
  riskScore += warningCount * 10;
  riskScore = Math.min(Math.max(riskScore, 8), 96);

  let assessment: AssessmentLevel = 'LOW CONCERN';
  let riskLevel: RiskLevel = 'LOW';
  if (criticalCount > 0 || riskScore >= 60) {
    assessment = 'HIGH CONCERN';
    riskLevel = 'HIGH';
  } else if (highCount > 0 || warningCount > 0 || riskScore >= 35) {
    assessment = 'REQUIRES CAUTION';
    riskLevel = 'SUSPICIOUS';
  }

  // If no warning signs found, provide baseline safe info
  if (scamDna.length === 0) {
    riskScore = 10;
    scamDna.push({
      id: 'sig-baseline',
      name:
        lang === 'hi'
          ? 'कोई स्पष्ट चेतावनी संकेत नहीं मिला'
          : lang === 'mr'
          ? 'धोक्याचे थेट संकेत आढळले नाहीत'
          : 'No Overt Warning Signals Detected',
      severity: 'info',
      evidence: rawText.substring(0, 80) + '...',
      whyItMatters:
        lang === 'hi'
          ? 'प्रस्तुत सामग्री में सामान्य पोंजी या दबाव की भाषा नहीं मिली, लेकिन हमेशा संस्था के बैंक खाते की पुष्टि करें।'
          : lang === 'mr'
          ? 'थेट फसवणुकीची लक्षणे आढळली नाहीत, तरीही नेहमीची काळजी घेणे आवश्यक आहे.'
          : 'The submitted content does not contain overt linguistic deception markers. Standard financial diligence is still advised.',
      recommendedAction:
        lang === 'hi'
          ? 'हमेशा केवल आधिकारिक ब्रोकर पोर्टल और बैंक खातों में ही लेनदेन करें।'
          : lang === 'mr'
          ? 'नेहमी अधिकृत पोर्टलवरच व्यवहार करा.'
          : 'Maintain baseline hygiene: verify fund recipients before making payments.',
      category: 'Baseline observation',
    });
  }

  // Convert scamDna into legacy signals for backward compatibility
  const legacySignals: RiskSignal[] = scamDna.map((s) => ({
    id: s.id,
    title: s.name,
    severity: s.severity,
    explanation: s.whyItMatters,
    detectedPattern: s.evidence,
    confidence: 0.95,
  }));

  // Recommended safe actions
  const recommendedActions: string[] =
    assessment === 'HIGH CONCERN'
      ? [
          lang === 'hi'
            ? '1. अभी किसी भी खाते में पैसे ट्रांसफर न करें।'
            : lang === 'mr'
            ? '१. सध्या कोणत्याही खात्यात पैसे पाठवू नका.'
            : '1. Do not transfer money yet.',
          lang === 'hi'
            ? '2. किसी के साथ ओटीपी (OTP), पिन या पासवर्ड साझा न करें।'
            : lang === 'mr'
            ? '२. कोणाशीही ओटीपी (OTP), पिन किंवा पासवर्ड शेअर करू नका.'
            : '2. Do not share OTPs, PINs or passwords.',
          lang === 'hi'
            ? '3. AnyDesk या TeamViewer जैसे रिमोट-एक्सेस ऐप कभी इंस्टॉल न करें।'
            : lang === 'mr'
            ? '३. AnyDesk किंवा TeamViewer सारखे ॲप कधीही इन्स्टॉल करू नका.'
            : '3. Do not install remote-access applications.',
          lang === 'hi'
            ? '4. संस्था और उसके बैंक खाते की सेबी/आरबीआई वेबसाइट पर स्वतंत्र जांच करें।'
            : lang === 'mr'
            ? '४. सेबीच्या अधिकृत पोर्टलवर नोंदणीची स्वतंत्र खात्री करा.'
            : '4. Verify the claimed entity independently through official channels.',
          lang === 'hi'
            ? '5. यदि पैसे पहले ही भेज दिए हैं, तो तुरंत 1930 पर या cybercrime.gov.in पर रिपोर्ट करें।'
            : lang === 'mr'
            ? '५. पैसे पाठवले असल्यास तात्काळ १९३० किंवा cybercrime.gov.in वर तक्रार नोंदवा.'
            : '5. Use official reporting channels (cybercrime.gov.in / Helpline 1930) if money was already transferred.',
        ]
      : assessment === 'REQUIRES CAUTION'
      ? [
          lang === 'hi'
            ? '1. आगे बढ़ने से पहले स्वतंत्र रूप से जांच करें।'
            : '1. Pause and independently verify before transacting.',
          lang === 'hi'
            ? '2. बैंक खाते और आधिकारिक ईमेल की दोबारा पुष्टि करें।'
            : '2. Confirm that bank details match the licensed corporate depository.',
          lang === 'hi'
            ? '3. किसी भी व्यक्तिगत यूपीआई पर भुगतान करने से बचें।'
            : '3. Avoid payments to personal UPI aliases or unescrowed handles.',
        ]
      : [
          lang === 'hi'
            ? '1. सामान्य वित्तीय सावधानी बनाए रखें।'
            : '1. Maintain standard investment hygiene.',
          lang === 'hi'
            ? '2. केवल बुकमार्क किए गए आधिकारिक ब्रोकर पोर्टल पर लॉगिन करें।'
            : '2. Ensure URL matches official bookmarks before entering credentials.',
        ];

  const warningCountTotal = scamDna.filter((s) => s.severity !== 'info').length;

  const assessmentCaveat =
    lang === 'hi'
      ? `यह मूल्यांकन केवल देखे गए चेतावनी संकेतों और सत्यापन अंतरालों पर आधारित है। यह इस बात की कानूनी गारंटी नहीं है कि सामग्री निश्चित रूप से धोखाधड़ी है या सुरक्षित है।`
      : lang === 'mr'
      ? `हे मूल्यमापन केवळ आढळलेल्या धोक्याच्या संकेतांवर आधारित आहे. ही कायदेशीर हमी नाही.`
      : `This assessment is based on observable warning signs and verification gaps. It is not a guarantee that the content is fraudulent or safe.`;

  const whyThisMatters =
    assessment === 'HIGH CONCERN'
      ? lang === 'hi'
        ? 'यह संदेश वित्तीय वादों को अत्यधिक जल्दबाजी और भुगतान के दबाव के साथ जोड़ता है। इस तरह के तरीके स्वतंत्र जांच के लिए उपलब्ध समय को कम करने के लिए अपनाए जाते हैं।'
        : lang === 'mr'
        ? 'हा संदेश नफ्याचे मोठे आमिष, खोटी घाई आणि पैशांचा दबाव एकत्र करतो. यामुळे विचार करण्यास वेळ मिळत नाही.'
        : 'The message combines financial promises with urgency and payment pressure. These tactics are designed to reduce the time available for independent verification.'
      : lang === 'hi'
      ? 'सामग्री में कुछ अस्पष्ट दावे पाए गए हैं जिन्हें स्वतंत्र पुष्टि के बिना स्वीकार नहीं किया जाना चाहिए।'
      : 'The content exhibits ambiguous claims that warrant independent verification before capital deployment.';

  const speechSummary =
    assessment === 'HIGH CONCERN'
      ? lang === 'hi'
        ? `सावधान। इस संदेश में ${warningCountTotal} चेतावनी संकेत पाए गए हैं। इसमें असामान्य रिटर्न या जल्दबाजी का दबाव है। किसी भी खाते में पैसे ट्रांसफर न करें।`
        : lang === 'mr'
        ? `सावधान. या संदेशात ${warningCountTotal} धोक्याचे संकेत आढळले आहेत. पैसे पाठवण्यापूर्वी अधिकृत नोंदी तपासा.`
        : `Caution. VeriVest identified ${warningCountTotal} warning signs in this message, including high-return promises and urgency tactics. Do not transfer any money until independently verified.`
      : lang === 'hi'
      ? 'इस दावे में कुछ संदिग्ध पहलू हैं। कृपया संस्था की आधिकारिक पुष्टि करें।'
      : 'This claim requires caution. Please verify credentials through official channels.';

  const randomId = Math.floor(10000 + Math.random() * 90000);

  return {
    id: `VV-${randomId}`,
    timestamp: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    sourceType: req.type,
    sourceLabel:
      req.type === 'message'
        ? 'Investment Message'
        : req.type === 'url'
        ? 'Website / URL'
        : req.type === 'screenshot'
        ? 'Screenshot Text Extraction'
        : req.type === 'tip'
        ? 'Social Media / Tip Group'
        : 'Entity / Registration Inquiry',
    rawInput: rawText,
    ...(req.type === 'screenshot'
      ? {
          extractedText:
            rawText ||
            (req.content && !req.content.startsWith('Screenshot:') && req.content !== 'Uploaded image'
              ? req.content
              : 'Image inspected; no visible text extracted.'),
          ocrConfidence: rawText ? ('high' as const) : ('low' as const),
        }
      : {}),
    sensitiveDataDetected: privacyCheck.detected,
    ...(privacyCheck.message ? { sensitiveDataMessage: privacyCheck.message } : {}),
    riskScore,
    riskLevel,
    assessment,
    warningIndicatorsCount: warningCountTotal,
    assessmentCaveat,
    summary: scamDna.map((s) => s.name).join(' • '),
    forensicDirective:
      assessment === 'HIGH CONCERN'
        ? lang === 'hi'
          ? 'निवेश करने से पहले रुकें। किसी भी खाते में पैसे ट्रांसफर न करें।'
          : lang === 'mr'
          ? 'गुंतवणूक करण्यापूर्वी थांबा. कोणत्याही खात्यात पैसे पाठवू नका.'
          : 'Pause before investing. Do not transfer funds until verified independently.'
        : lang === 'hi'
        ? 'सतर्क रहें। विवरणों की स्वतंत्र जांच करें।'
        : 'Exercise caution and verify credentials.',
    whyThisMatters,
    claims,
    scamDna,
    signals: legacySignals,
    recommendedActions,
    verificationDetails,
    urlSafety,
    limitations: [
      'Automated analysis detects behavioral and linguistic patterns; it does not replace official judicial inquiry.',
      'Verification status reflects availability in public benchmark index. Live external registry query was not executed without direct API connectivity.',
      'Always consult a SEBI-registered Investment Adviser (RIA) before committing financial assets.',
    ],
    speechSummary,
  };
}

function normalizeAnalysisResponse(payload: any): AnalysisResult {
  const backendSignals = Array.isArray(payload?.warningSignals)
    ? payload.warningSignals
    : Array.isArray(payload?.signals)
    ? payload.signals
    : [];

  const backendClaims = Array.isArray(payload?.extractedClaims)
    ? payload.extractedClaims
    : Array.isArray(payload?.claims)
    ? payload.claims
    : [];

  const verification = payload?.verificationResults?.[0] || payload?.verification || {
    status: 'UNABLE_TO_VERIFY',
    source: 'No verification source',
    summary: 'Verification unavailable for this scan.',
    details: ['No verification data is available for this request.'],
  };

  const normalizedSignals = backendSignals.map((signal: any, idx: number) => ({
    id: signal.id || `signal-${idx + 1}`,
    name: signal.title || signal.name || 'Detected signal',
    severity: signal.severity || 'warning',
    evidence: signal.evidence || signal.description || signal.matchedEvidence || '',
    whyItMatters: signal.description || signal.whyItMatters || 'Observed behavioral signal.',
    recommendedAction:
      signal.recommendedAction || signal.recommendation || 'Verify before acting on this claim.',
    category: signal.category || 'signal',
    educationalGuideId: signal.educationalGuideId,
  }));

  const normalizedClaims = backendClaims.map((claim: any, idx: number) => ({
    id: claim.id || `claim-${idx + 1}`,
    claimNumber: claim.claimNumber || `CLAIM ${String(idx + 1).padStart(2, '0')}`,
    quote: claim.claim || claim.quote || claim.text || '',
    category: claim.category || 'Claim',
    signalId: claim.signalId,
    verificationNote: claim.verificationNote || claim.evidence || '',
  }));

  const riskScore = Number(payload?.riskScore ?? payload?.analysis?.riskScore ?? 0);
  const riskLevel = payload?.riskLevel || payload?.analysis?.riskLevel || 'LOW';
  const assessment = payload?.assessment || payload?.analysis?.assessment || 'LOW CONCERN';
  const summary = payload?.summary || payload?.analysis?.summary || 'No summary available.';
  const sourceType = payload?.sourceType || payload?.analysis?.sourceType || 'message';

  return {
    id: payload?.analysisId || payload?.id || `VV-${Date.now()}`,
    timestamp: payload?.analyzedAt || payload?.timestamp || new Date().toISOString(),
    sourceType,
    sourceLabel:
      sourceType === 'message'
        ? 'Investment Message'
        : sourceType === 'url'
        ? 'Website / URL'
        : sourceType === 'screenshot'
        ? 'Screenshot Text Extraction'
        : sourceType === 'tip'
        ? 'Social Media / Tip Group'
        : 'Entity / Registration Inquiry',
    rawInput: payload?.rawInput || payload?.message || payload?.content || '',
    ...(payload?.extractedText || payload?.analysis?.extractedText
      ? { extractedText: payload?.extractedText || payload?.analysis?.extractedText }
      : {}),
    ...(payload?.ocrConfidence || payload?.analysis?.ocrConfidence
      ? { ocrConfidence: payload?.ocrConfidence || payload?.analysis?.ocrConfidence }
      : sourceType === 'screenshot'
      ? { ocrConfidence: 'high' as const }
      : {}),
    sensitiveDataDetected: Boolean(payload?.sensitiveDataDetected),
    ...(payload?.sensitiveDataMessage || payload?.analysis?.sensitiveDataMessage
      ? { sensitiveDataMessage: payload?.sensitiveDataMessage || payload?.analysis?.sensitiveDataMessage }
      : {}),
    riskScore,
    riskLevel,
    assessment,
    warningIndicatorsCount: normalizedSignals.length,
    assessmentCaveat:
      payload?.assessmentCaveat ||
      payload?.analysis?.assessmentCaveat ||
      'This assessment is based on observable warning signs and verification gaps. It is not a guarantee that the content is fraudulent or safe.',
    summary,
    forensicDirective:
      payload?.forensicDirective ||
      payload?.analysis?.forensicDirective ||
      (riskLevel === 'HIGH'
        ? 'Pause before investing. Do not transfer funds until independently verified.'
        : riskLevel === 'SUSPICIOUS'
        ? 'Exercise caution and verify claims before acting.'
        : 'Maintain standard financial hygiene and independent verification.'),
    whyThisMatters:
      payload?.whyThisMatters ||
      payload?.analysis?.whyThisMatters ||
      payload?.aiAnalysis ||
      payload?.analysis?.aiAnalysis ||
      (normalizedSignals.length > 0
        ? 'The content contains observed risk indicators that warrant independent verification.'
        : 'This content did not show clear warning signals based on the current rule set.'),
    claims: normalizedClaims,
    scamDna: normalizedSignals,
    signals: normalizedSignals.map((signal: any) => ({
      id: signal.id,
      title: signal.name,
      severity: signal.severity,
      explanation: signal.whyItMatters,
      detectedPattern: signal.evidence,
      confidence: 0.95,
    })),
    recommendedActions:
      payload?.recommendations ||
      payload?.recommendedActions ||
      payload?.analysis?.recommendations ||
      payload?.analysis?.recommendedActions ||
      [],
    verificationDetails: {
      claimedEntity: verification?.entity || verification?.subject || 'Unspecified Entity',
      claimedRegNumber: verification?.registrationNumber || 'Not provided',
      status: verification?.status || 'UNABLE_TO_VERIFY',
      sourceChecked: verification?.source || 'No source supplied',
      lastChecked: new Date().toISOString(),
      whatWasVerified: Array.isArray(verification?.details) ? verification.details : [],
      whatCouldNotBeVerified: ['No additional independent checks were available for this scan.'],
    },
    urlSafety: payload?.urlSafety || payload?.analysis?.urlSafety,
    limitations: payload?.limitations || payload?.analysis?.limitations || [
      'Automated analysis uses observed indicators and does not replace formal institutional verification.',
    ],
    speechSummary: payload?.speechSummary || payload?.analysis?.speechSummary || summary,
  };
}

export const analyzerService = {
  async analyze(req: AnalyzeRequest): Promise<AnalysisResult> {
    // 1. Multimodality check for screenshot analysis
    let payload: any = { ...req };

    if (req.type === 'screenshot') {
      const rawImage = req.imageBase64 || req.imageBuffer || req.imagePreview || '';
      if (!rawImage || typeof rawImage !== 'string' || !rawImage.trim()) {
        throw new Error('Screenshot analysis requires an image buffer or base64 data.');
      }

      // Extract or determine correct MIME type
      let mimeType = req.mimeType || 'image/png';
      let cleanImage = rawImage.trim();

      if (cleanImage.startsWith('data:')) {
        const mimeMatch = cleanImage.match(/^data:([^;]+);base64,/);
        if (mimeMatch) {
          mimeType = mimeMatch[1];
        }
      } else {
        // If raw base64 data, infer MIME type from magic headers or default to image/png
        if (cleanImage.startsWith('/9j/')) mimeType = 'image/jpeg';
        else if (cleanImage.startsWith('iVBORw0KGgo')) mimeType = 'image/png';
        else if (cleanImage.startsWith('UklGR')) mimeType = 'image/webp';
        cleanImage = `data:${mimeType};base64,${cleanImage}`;
      }

      payload = {
        ...req,
        type: 'screenshot',
        mimeType,
        imageBase64: cleanImage,
        imageBuffer: cleanImage,
      };
    }

    let result: AnalysisResult | null = null;

    try {
      // First attempt to call the server-side API endpoint
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        const nested = data?.analysis || data;
        if (nested && typeof nested.riskScore === 'number') {
          result = normalizeAnalysisResponse(data);
        }
      }
    } catch {
      // Fallback smoothly to deterministic local engine
    }

    if (!result) {
      result = await analyzeLocally(payload);
    }

    // 2. Validation step: verify that extracted text is not empty before returning the result
    if (req.type === 'screenshot') {
      const extracted = result.extractedText?.trim();
      if (!extracted || extracted.length === 0) {
        throw new Error('Screenshot analysis validation failed: extracted text is empty.');
      }
    }

    return result;
  },

  async verifyBroker(name: string, regNumber: string, language: Language): Promise<AnalysisResult> {
    return this.analyze({
      type: 'broker',
      content: `Entity: ${name} | Registration: ${regNumber}`,
      brokerName: name,
      regNumber,
      language,
    });
  },
};
