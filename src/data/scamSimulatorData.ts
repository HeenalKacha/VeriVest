import { Language, ScamScenario } from '../types';

export const scamScenarios: Record<Language, ScamScenario[]> = {
  en: [
    {
      id: 'scenario-1-guaranteed',
      category: 'Guaranteed Returns',
      title: 'The "Risk-Free Arbitrage Bot"',
      claimedBy: 'Telegram Group: "Global Quant Fund VIP"',
      scenarioText: `Exclusive opportunity! Our proprietary AI arbitrage bot generates guaranteed 30% monthly returns.
Only 5 memberships left for this week's cohort.
Pay ₹10,000 today via UPI to coordinator (treasury.growth@okaxis) to activate your account.
100% capital protection guaranteed!`,
      options: [
        {
          id: 'opt-1-send',
          text: 'Send the ₹10,000 immediately before the 5 seats fill up',
          isSafe: false,
          feedback:
            'Unsafe choice. You are responding to artificial urgency and an impossible guarantee. Markets cannot promise risk-free 30% returns.',
        },
        {
          id: 'opt-1-ask',
          text: 'Ask the group admin for profit screenshots and customer testimonials',
          isSafe: false,
          feedback:
            'Risky choice. Fraudsters routinely fake profit screenshots and plant confederates in chat groups to provide false social proof.',
        },
        {
          id: 'opt-1-verify',
          text: 'Verify independently: check if the entity has a valid SEBI advisory license on sebi.gov.in',
          isSafe: true,
          feedback:
            'Safe and prudent! SEBI prohibits registered advisors from offering guaranteed returns, and requires institutional bank accounts, not personal UPI.',
        },
        {
          id: 'opt-1-report',
          text: 'Ignore and report the Telegram channel to cybercrime.gov.in',
          isSafe: true,
          feedback:
            'Best response! Recognizing multiple fraud indicators immediately protects your capital and helps protect others.',
        },
      ],
      warningSignsFound: [
        'Guaranteed 30% monthly return claim (financially impossible in liquid markets)',
        'Artificial urgency ("Only 5 memberships left")',
        'Personal UPI collection handle instead of a registered corporate escrow',
        'Anonymous social media solicitation',
      ],
      explanation:
        'Guaranteed return promises are the single most common indicator of Ponzi schemes. In legitimate finance, return is inherently linked to risk.',
      educationalGuideId: 'guaranteed-return-scams',
    },
    {
      id: 'scenario-2-fake-sebi',
      category: 'Fake Regulator Identity',
      title: 'The "SEBI Certified" WhatsApp Certificate',
      claimedBy: 'WhatsApp Contact: "Senior Wealth Director"',
      scenarioText: `Hello Sir, I am sharing our SEBI Registration Certificate (Reg No: INZ-99001122).
We are allocating pre-IPO shares of a unicorn startup at 50% discount.
To confirm allotment, transfer ₹25,000 to our verification coordinator within 1 hour.`,
      options: [
        {
          id: 'opt-2-send',
          text: 'Send the ₹25,000 because they shared a certificate with the SEBI emblem',
          isSafe: false,
          feedback:
            'Unsafe choice. Anyone can download a government logo and create a photoshopped certificate. A certificate image on WhatsApp is not proof of authorization.',
        },
        {
          id: 'opt-2-verify',
          text: 'Visit sebi.gov.in independently and search the registration number in the official intermediary database',
          isSafe: true,
          feedback:
            'Excellent choice! Checking official registries directly reveals whether the registration exists and whether the corporate name matches.',
        },
        {
          id: 'opt-2-ask',
          text: 'Ask them to video call you to prove their identity',
          isSafe: false,
          feedback:
            'Risky choice. Modern fraudsters use cloned badges, fake offices, or synthetic deepfake video to simulate legitimacy.',
        },
        {
          id: 'opt-2-report',
          text: 'Decline firmly and report the impersonation attempt to SEBI SCORES portal',
          isSafe: true,
          feedback:
            'Safe and proactive! Impersonating regulators or licensed brokers is a serious criminal offense.',
        },
      ],
      warningSignsFound: [
        'Certificate shared as an image file on WhatsApp rather than verifiable registry filing',
        'Discounted pre-IPO shares offered to retail users via private chat',
        '1-hour artificial deadline',
        'Payment directed to an individual "verification coordinator"',
      ],
      explanation:
        'Regulators license entities, but never endorse or insure private share offerings. Genuine brokers never solicit unlisted share transfers through personal messaging.',
      educationalGuideId: 'identifying-fake-sebi-registrations',
    },
    {
      id: 'scenario-3-remote-access',
      category: 'Remote Access Scam',
      title: 'The "KYC Assistance" Screen Share',
      claimedBy: 'Caller: "Institutional Demat Support"',
      scenarioText: `Your trading account setup has an urgent KYC compliance error!
To prevent account freeze, please download AnyDesk from Google Play Store right now.
Our technical engineer will guide your screen to fix the PAN verification in 2 minutes.`,
      options: [
        {
          id: 'opt-3-send',
          text: 'Install AnyDesk and read out the 9-digit connection code to the caller',
          isSafe: false,
          feedback:
            'Extremely dangerous! Once you share the AnyDesk code, the caller can see your screen, observe banking passwords, and drain your funds.',
        },
        {
          id: 'opt-3-ask',
          text: 'Ask the caller for their employee ID and branch address',
          isSafe: false,
          feedback:
            'Ineffective. Scammers easily invent believable employee names, IDs, and Mumbai/Bengaluru branch addresses.',
        },
        {
          id: 'opt-3-verify',
          text: 'Hang up and open your broker app directly through the official app store to check KYC status',
          isSafe: true,
          feedback:
            'The correct action! Official brokers have fully integrated in-app KYC procedures and will never ask you to install remote-desktop software.',
        },
        {
          id: 'opt-3-report',
          text: 'Refuse, block the number, and report the caller to the 1930 Cyber Crime Helpline',
          isSafe: true,
          feedback:
            'Perfect response! You prevented a device takeover and reported a dangerous fraud technique.',
        },
      ],
      warningSignsFound: [
        'Request to install AnyDesk or screen-sharing software',
        'Threat of imminent "account freeze" to trigger panic',
        'Unsolicited incoming technical support call',
        'Pressure to complete action while remaining on the call',
      ],
      explanation:
        'Legitimate financial institutions NEVER ask customers to install AnyDesk, TeamViewer, or QuickSupport. Such requests are always an attempt to hijack banking sessions.',
      educationalGuideId: 'remote-access-scams',
    },
    {
      id: 'scenario-4-fake-portal',
      category: 'Fake Broker Portal',
      title: 'The "Unlock Fee" Withdrawal Trap',
      claimedBy: 'Website: "Groww-Institutional-Desk.vip"',
      scenarioText: `Congratulations! Your simulated account deposit of ₹50,000 has yielded ₹2,84,000 in algorithmic trades!
To withdraw your total balance of ₹3,34,000 to your bank account, please transfer 18% Advance GST Clearance Fee (₹60,120) to escrow account 918273645.`,
      options: [
        {
          id: 'opt-4-send',
          text: 'Pay the ₹60,120 clearance fee to get the ₹3,34,000 profit released',
          isSafe: false,
          feedback:
            'Classic trap! The profits are completely fabricated on a dummy dashboard. Any fee you send will be stolen, and they will demand even more fees.',
        },
        {
          id: 'opt-4-verify',
          text: 'Check the domain name against the official broker site (groww.in) and note the suspicious .vip extension',
          isSafe: true,
          feedback:
            'Sharp observation! Legitimate brokers operate on recognized domains, and capital gains taxes are never collected via advance bank transfers to release withdrawals.',
        },
        {
          id: 'opt-4-ask',
          text: 'Ask customer care on WhatsApp if they can deduct the fee directly from the profits',
          isSafe: false,
          feedback:
            'The scammer will refuse and insist on new money. The entire dashboard is a simulation with zero actual capital.',
        },
        {
          id: 'opt-4-report',
          text: 'Cease all communication, do not send money, and file a cybercrime complaint',
          isSafe: true,
          feedback:
            'The only safe path. You avoid losing additional money to an advance-fee extraction trap.',
        },
      ],
      warningSignsFound: [
        'Demanding an upfront fee or tax to "unlock" or withdraw investment funds',
        'Phishing domain with high-risk .vip extension imitating a trusted brand',
        'Absurdly high short-term profits shown on an unverified dashboard',
        'All communications routed via WhatsApp customer desk',
      ],
      explanation:
        'Legitimate brokers deduct statutory charges directly from your account balance; they NEVER require you to transfer separate money to "unlock" a withdrawal.',
      educationalGuideId: 'fake-broker-portals',
    },
    {
      id: 'scenario-5-paid-tip-group',
      category: 'Telegram Tip Groups',
      title: 'The "1000% Sure Call" VIP Channel',
      claimedBy: 'Channel: @Nifty_Sniper_God',
      scenarioText: `🚨 TOMORROW 9:15 AM EXPIRY JACKPOT 🚨
Operator confirmed 1000% gain on Bank Nifty Put Option!
Join our exclusive Platinum VIP lounge for ₹8,500.
Transfer via UPI to personal ID rahul.trading@okaxis before midnight. 100% refund if target misses!`,
      options: [
        {
          id: 'opt-5-send',
          text: 'Pay the ₹8,500 fee to get tomorrow morning jackpot strike targets',
          isSafe: false,
          feedback:
            'Unsafe! No one controls market gaps. "Sure-shot" options calls with money-back guarantees are classic fee-harvesting solicitations.',
        },
        {
          id: 'opt-5-verify',
          text: 'Check whether the channel admin is a registered SEBI Research Analyst (RA)',
          isSafe: true,
          feedback:
            'Crucial check! Legitimate research analysts never operate anonymously or promise 1000% guaranteed directional wins.',
        },
        {
          id: 'opt-5-report',
          text: 'Leave the group and report the channel for illegal unregistered advisory',
          isSafe: true,
          feedback:
            'Safe move! Protects your capital from predatory speculative bets.',
        },
      ],
      warningSignsFound: [
        'Absurd 1000% return guarantee',
        'Midnight countdown pressure',
        'Personal UPI payment request',
        'Unregistered research advisory',
      ],
      explanation:
        'Options trading carries significant risk. Legitimate analysts provide risk disclosures, never guaranteed profits.',
      educationalGuideId: 'telegram-tip-groups',
    },
    {
      id: 'scenario-6-apk-download',
      category: 'Malicious App (APK)',
      title: 'The "Institutional Direct" APK Link',
      claimedBy: 'SMS Blast: "Zerodha VIP Institutional"',
      scenarioText: `Your Zerodha VIP institutional portal is ready with 0% brokerage and dark pool access.
Download the exclusive Android installer here: https://zerodha-pro-terminal.xyz/app-v4.apk
Note: Allow "Install Unknown Apps" in phone settings.`,
      options: [
        {
          id: 'opt-6-send',
          text: 'Download the APK file and disable phone security warnings to install',
          isSafe: false,
          feedback:
            'Critical danger! Sideloaded APKs bypass Google Play Protect and often contain SMS-stealing trojans that read OTPs.',
        },
        {
          id: 'opt-6-verify',
          text: 'Check the Google Play Store or Apple App Store directly for official broker releases',
          isSafe: true,
          feedback:
            'Correct! Regulated brokers only distribute official trading apps through verified app stores, never direct APK download links via SMS.',
        },
        {
          id: 'opt-6-report',
          text: 'Forward the SMS to 1909 (Do Not Disturb/Fraud) and delete the message',
          isSafe: true,
          feedback:
            'Safe and vigilant action preventing device malware infection.',
        },
      ],
      warningSignsFound: [
        'Direct link to an external .apk file',
        'Instructions to disable OS security settings',
        'SMS impersonating a major broker',
        'Suspicious non-official domain (.xyz)',
      ],
      explanation:
        'Never install banking or investment applications from raw APK links sent via SMS, WhatsApp, or Telegram.',
      educationalGuideId: 'fake-broker-portals',
    },
    {
      id: 'scenario-7-pig-butchering',
      category: 'Relationship / Trust Fraud',
      title: 'The "Friendly Expat" Crypto Mentor',
      claimedBy: 'Contact met on Instagram / LinkedIn: "Elena S."',
      scenarioText: `After 2 weeks of friendly chatting about life and careers, Elena shares:
"My uncle is a senior partner at an institutional hedge fund. He shows me crypto arbitrage nodes that make 3-5% daily profits safely.
Here is the private node address. Start with just $200 and you can test withdrawing your profit."`,
      options: [
        {
          id: 'opt-7-send',
          text: 'Deposit $200 since it is a small amount and you can test withdrawal',
          isSafe: false,
          feedback:
            'Classic "Pig Butchering" (Sha Zhu Pan) tactic! Scammers willingly let you withdraw the first $20 profit so you trust them and deposit your life savings later.',
        },
        {
          id: 'opt-7-verify',
          text: 'Recognize the textbook romantic/friendly investment funnel and cut contact',
          isSafe: true,
          feedback:
            'Outstanding awareness! Personal acquaintances asking you to put money into obscure crypto pools or nodes is a top global fraud pattern.',
        },
        {
          id: 'opt-7-report',
          text: 'Block the profile and report the account for financial solicitation',
          isSafe: true,
          feedback:
            'Safe and conclusive. You prevent long-term emotional and financial exploitation.',
        },
      ],
      warningSignsFound: [
        'Unsolicited friendly conversation shifting toward investments',
        'Claims of inside connection ("my uncle / mentor")',
        'Unrealistic daily compounding returns (3-5% daily)',
        'Unregulated private crypto pool node',
      ],
      explanation:
        'Romance and relationship investment scams build rapport over weeks before introducing a fake platform. Never invest based on casual online friendships.',
      educationalGuideId: 'guaranteed-return-scams',
    },
    {
      id: 'scenario-8-recovery-scam',
      category: 'Recovery Fraud',
      title: 'The "Cyber Crime Recovery Lawyer"',
      claimedBy: 'Email: "advocate.sharma.cyberrecovery@gmail.com"',
      scenarioText: `We noticed you were a victim of an online trading scam.
Our cyber forensic law firm has frozen the scammer's bank accounts under court order.
Your ₹1,50,000 is ready for release. Please transfer ₹7,500 legal filing fee to our nodal officer to release the court requisition.`,
      options: [
        {
          id: 'opt-8-send',
          text: 'Pay the ₹7,500 legal fee to recover your lost ₹1,50,000',
          isSafe: false,
          feedback:
            'Dangerous trap! This is "Recovery Fraud" targeting previous victims. Fraudsters purchase victim lists to scam them a second time.',
        },
        {
          id: 'opt-8-verify',
          text: 'Contact your local police station or check cybercrime.gov.in with your existing acknowledgement number',
          isSafe: true,
          feedback:
            'Right action! Law enforcement and genuine courts never demand advance fees to Gmail addresses to return seized money.',
        },
        {
          id: 'opt-8-report',
          text: 'Report the email to the National Cyber Crime portal (1930)',
          isSafe: true,
          feedback:
            'Safe choice. Exposes secondary fraud rings.',
        },
      ],
      warningSignsFound: [
        'Advance fee demanded to recover previously stolen funds',
        'Official claims originating from free @gmail.com address',
        'Unsolicited claim of legal intervention',
      ],
      explanation:
        'Victims of scams are often targeted again by fake "recovery agents." Official recovery happens exclusively through formal legal and police channels.',
      educationalGuideId: 'identifying-fake-sebi-registrations',
    },
    {
      id: 'scenario-9-ipo-grey-market',
      category: 'Unlisted & IPO Schemes',
      title: 'The "100% Guaranteed Allotment" Scheme',
      claimedBy: 'WhatsApp: "HNI Wealth Allocation Desk"',
      scenarioText: `Tata Technologies IPO is 50x oversubscribed!
Our institutional desk has reserved 500 shares in the promoter quota for high-net-worth clients.
100% allotment guaranteed with 80% listing day gains expected.
Transfer ₹45,000 to the institutional allotment account within 30 minutes to secure your allotment.`,
      options: [
        {
          id: 'opt-9-send',
          text: 'Transfer ₹45,000 to secure guaranteed allotment before the quota closes',
          isSafe: false,
          feedback:
            'Unsafe! IPO allotment is conducted strictly via computer lottery by the designated registrar under SEBI supervision. No individual can guarantee allotment.',
        },
        {
          id: 'opt-9-verify',
          text: 'Apply only via standard ASBA (Application Supported by Blocked Amount) through your official bank or Demat app',
          isSafe: true,
          feedback:
            'Spot on! ASBA ensures your funds remain safely in your own bank account until actual allotment occurs.',
        },
        {
          id: 'opt-9-report',
          text: 'Reject the offer and report the number to SEBI and police',
          isSafe: true,
          feedback:
            'Safe response! Pre-IPO and guaranteed allotment pitches are common advance-fee fraud vehicles.',
        },
      ],
      warningSignsFound: [
        'Guaranteed allotment in an oversubscribed IPO',
        'Payment to a private account rather than ASBA lien',
        'Artificial 30-minute urgency deadline',
      ],
      explanation:
        'All legitimate Indian IPO applications use ASBA where your money stays in your bank account until shares are allotted. Never wire money to private accounts for IPO shares.',
      educationalGuideId: 'guaranteed-return-scams',
    },
    {
      id: 'scenario-10-pump-and-dump',
      category: 'Pump and Dump',
      title: 'The "Penny Stock Moonshot" SMS Blast',
      claimedBy: 'SMS: "VM-STKINFO"',
      scenarioText: `URGENT BUY CALL: Buy "Kavveri Telecom" (NSE/BSE).
Current Price: ₹12. Target Price: ₹85 in 10 days!
Big FII bulk deal leaking tomorrow morning. Buy at market open and hold for 600% returns!`,
      options: [
        {
          id: 'opt-10-send',
          text: 'Place a large market order at 9:15 AM to catch the 600% move',
          isSafe: false,
          feedback:
            'Fatal mistake! This is a classic "Pump and Dump." Operators send SMS blasts to create retail buying volume so they can sell their illiquid shares at inflated prices.',
        },
        {
          id: 'opt-10-verify',
          text: 'Check corporate filings and financial health of the company on nseindia.com or bseindia.com',
          isSafe: true,
          feedback:
            'Wise choice! You will discover the company has negligible revenue, frequent losses, and high promoter pledging.',
        },
        {
          id: 'opt-10-report',
          text: 'Do not trade on anonymous tips; forward the SMS to TRAI 1909 and SEBI',
          isSafe: true,
          feedback:
            'Safe and responsible! You avoid becoming "exit liquidity" for stock manipulators.',
        },
      ],
      warningSignsFound: [
        'Unsolicited bulk SMS stock recommendation',
        'Penny stock with sudden astronomical target',
        'Claims of "insider FII deal leaks"',
        'No research report or licensed analyst attribution',
      ],
      explanation:
        'Operators use bulk messaging to inflate stock prices before dumping their holdings on unsuspecting retail investors. Never buy stocks based on SMS or Telegram tips.',
      educationalGuideId: 'telegram-tip-groups',
    },
  ],
  hi: [
    {
      id: 'scenario-1-guaranteed',
      category: 'गारंटीड रिटर्न',
      title: 'जोखिम-मुक्त आर्बिट्रेज बॉट का झांसा',
      claimedBy: 'टेलीग्राम ग्रुप: "Global Quant Fund VIP"',
      scenarioText: `विशेष अवसर! हमारा एआई बॉट हर महीने 30% का गारंटीड रिटर्न देता है।
इस हफ्ते केवल 5 सीटें बची हैं।
खाता सक्रिय करने के लिए आज ही ₹10,000 यूपीआई (treasury.growth@okaxis) पर भेजें।
100% पूंजी सुरक्षा की गारंटी!`,
      options: [
        {
          id: 'opt-1-send',
          text: 'सीट खत्म होने से पहले तुरंत ₹10,000 भेज दें',
          isSafe: false,
          feedback: 'असुरक्षित चुनाव! शेयर बाजार में 30% गारंटीड मुनाफा वित्तीय रूप से असंभव है।',
        },
        {
          id: 'opt-1-verify',
          text: 'स्वतंत्र रूप से जांचें: क्या यह संस्था सेबी की वेबसाइट (sebi.gov.in) पर पंजीकृत है?',
          isSafe: true,
          feedback: 'बिल्कुल सही! सेबी पंजीकृत सलाहकारों को गारंटीड रिटर्न देने की सख्त मनाही है।',
        },
        {
          id: 'opt-1-report',
          text: 'टेलीग्राम चैनल की cybercrime.gov.in पर रिपोर्ट करें',
          isSafe: true,
          feedback: 'उत्कृष्ट कदम! इससे आपका पैसा सुरक्षित रहता है और दूसरों को भी मदद मिलती है।',
        },
      ],
      warningSignsFound: [
        '30% गारंटीड मुनाफे का असंभव दावा',
        'कृत्रिम जल्दबाजी ("केवल 5 सीटें")',
        'व्यक्तिगत यूपीआई पते पर पैसे मांगना',
      ],
      explanation: 'गारंटीड रिटर्न का दावा पोंजी स्कीम का सबसे बड़ा संकेत है।',
      educationalGuideId: 'guaranteed-return-scams',
    },
  ],
  mr: [
    {
      id: 'scenario-1-guaranteed',
      category: 'हमखास परतावा',
      title: 'धोकामुक्त एआई बॉटचे आमिष',
      claimedBy: 'टेलिग्राम चॅनेल: "Global Quant Fund VIP"',
      scenarioText: `खास संधी! आमचा अल्गोरिदम बॉट दरमहा ३०% हमखास परतावा देतो.
या आठवड्यात फक्त ५ जागा शिल्लक आहेत.
खाते सुरू करण्यासाठी आजच ₹१०,००० यूपीआईवर (treasury.growth@okaxis) पाठवा.
भांडवलाची १००% सुरक्षितता!`,
      options: [
        {
          id: 'opt-1-send',
          text: 'जागा संपण्यापूर्वी तातडीने ₹१०,००० पाठवा',
          isSafe: false,
          feedback: 'धोकादायक निर्णय! शेअर बाजारात ३०% हमखास नफा मिळणे अशक्य आहे.',
        },
        {
          id: 'opt-1-verify',
          text: 'स्वतंत्र पडताळणी करा: सेबीच्या अधिकृत पोर्टलवर नोंदणी तपासा',
          isSafe: true,
          feedback: 'योग्य निर्णय! सेबी नोंदणीकृत संस्था हमखास परताव्याचे आमिष दाखवू शकत नाहीत.',
        },
        {
          id: 'opt-1-report',
          text: 'दुर्लक्ष करा आणि cybercrime.gov.in वर तक्रार नोंदवा',
          isSafe: true,
          feedback: 'उत्तम प्रतिसाद! यामुळे तुमचे पैसे वाचतील आणि इतरांचेही नुकसान टळेल.',
        },
      ],
      warningSignsFound: [
        '३०% हमखास परताव्याचा खोटा दावा',
        'खोटी घाई ("फक्त ५ जागा")',
        'वैयक्तिक यूपीआईवर पैसे मागणे',
      ],
      explanation: 'हमखास परताव्याचा दावा म्हणजे पोंझी योजनेचे स्पष्ट लक्षण आहे.',
      educationalGuideId: 'guaranteed-return-scams',
    },
  ],
};
