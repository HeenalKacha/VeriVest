import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckSquare,
  Square,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { Language } from '../types';

interface BeforeYouPayPageProps {
  currentLanguage: Language;
  onNavigate: (route: string) => void;
}

interface ChecklistItem {
  id: string;
  question: string;
  whyItMatters: string;
  // If true, checking "YES" is a WARNING flag
  isWarningIfYes: boolean;
}

export const BeforeYouPayPage: React.FC<BeforeYouPayPageProps> = ({ currentLanguage, onNavigate }) => {
  const isHi = currentLanguage === 'hi';
  const isMr = currentLanguage === 'mr';

  // 9 canonical questions as requested in Section 11
  const checklistData: ChecklistItem[] = [
    {
      id: 'q1',
      question: isHi
        ? 'क्या आपने इस संस्था/सलाहकार को स्वयं स्वतंत्र रूप से खोजा था? (या वे खुद आपके पास आए थे?)'
        : isMr
        ? 'तुम्ही या संस्थेला स्वतः शोधले होते का? (की त्यांनी स्वतः संपर्क केला?)'
        : 'Did I independently find this organization? (Or did they contact me unsolicited?)',
      whyItMatters: isHi
        ? 'अवांछित संदेश या अज्ञात कॉल अक्सर धोखाधड़ी के पहले संपर्क बिंदु होते हैं।'
        : 'Legitimate wealth managers rarely solicit retail clients via random WhatsApp/Telegram blasts.',
      isWarningIfYes: false, // "NO" is a warning condition
    },
    {
      id: 'q2',
      question: isHi
        ? 'क्या आपने आधिकारिक वेबसाइट (sebi.gov.in) पर इसके पंजीकरण की पुष्टि की है?'
        : isMr
        ? 'तुम्ही अधिकृत वेबसाइटवर (sebi.gov.in) नोंदणीची खात्री केली आहे का?'
        : 'Did I verify its registration on the official regulator directory?',
      whyItMatters: isHi
        ? 'व्हाट्सएप पर भेजे गए सर्टिफिकेट फर्जी हो सकते हैं। आधिकारिक डेटाबेस में जांच अनिवार्य है।'
        : 'Images of certificates are easily fabricated. Verification must happen on the official registry.',
      isWarningIfYes: false, // "NO" is a warning condition
    },
    {
      id: 'q3',
      question: isHi
        ? 'क्या आपसे गारंटीड या जोखिम-मुक्त भारी रिटर्न का वादा किया जा रहा है?'
        : isMr
        ? 'तुम्हाला हमखास परताव्याचे आमिष दाखवले जात आहे का?'
        : 'Am I being promised guaranteed or risk-free returns?',
      whyItMatters: isHi
        ? 'शेयर बाजार में गारंटीड रिटर्न असंभव और कानूनन वर्जित है। यह पोंजी स्कीम का स्पष्ट संकेत है।'
        : 'Liquid capital markets cannot offer risk-free high yield. This is the top indicator of fraud.',
      isWarningIfYes: true, // "YES" is a warning condition
    },
    {
      id: 'q4',
      question: isHi
        ? 'क्या आप पर तुरंत पैसे भेजने या "सीमित सीटों" का दबाव डाला जा रहा है?'
        : isMr
        ? 'तुमच्यावर तातडीने पैसे पाठवण्यासाठी दबाव टाकला जात आहे का?'
        : 'Am I being pressured to act immediately ("only few spots left")?',
      whyItMatters: isHi
        ? 'कृत्रिम जल्दबाजी आपको सोचने और परिवार या विशेषज्ञों से सलाह लेने का समय नहीं देती।'
        : 'Psychological urgency is engineered to bypass deliberate due diligence.',
      isWarningIfYes: true, // "YES" is a warning condition
    },
    {
      id: 'q5',
      question: isHi
        ? 'क्या आपसे मुनाफा निकालने या खाता शुरू करने के लिए कोई अग्रिम शुल्क मांगा जा रहा है?'
        : isMr
        ? 'नफा काढण्यासाठी किंवा खाते सुरू करण्यासाठी आधी फी मागितली जात आहे का?'
        : 'Am I being asked to pay an upfront fee, advance tax, or unlock charge?',
      whyItMatters: isHi
        ? 'नकली मुनाफा दिखाकर उसे निकालने के लिए अतिरिक्त टैक्स मांगना अग्रिम शुल्क घोटाला है।'
        : 'Demanding upfront fees or taxes to release purported profits is an advance-fee fraud trap.',
      isWarningIfYes: true, // "YES" is a warning condition
    },
    {
      id: 'q6',
      question: isHi
        ? 'क्या आप पैसे किसी व्यक्ति के निजी बैंक खाते या व्यक्तिगत यूपीआई आईडी में भेज रहे हैं?'
        : isMr
        ? 'तुम्ही पैसे कोणाच्या वैयक्तिक बँक खात्यात किंवा यूपीआयवर पाठवत आहात का?'
        : 'Am I sending money to a personal account or individual UPI handle?',
      whyItMatters: isHi
        ? 'पंजीकृत संस्थाओं को ग्राहकों का पैसा केवल अधिकृत संस्थागत एस्क्रो खाते में ही लेना होता है।'
        : 'Regulated entities must deposit client funds into corporate accounts, never personal handles.',
      isWarningIfYes: true, // "YES" is a warning condition
    },
    {
      id: 'q7',
      question: isHi
        ? 'क्या आपसे कोई ओटीपी (OTP), पिन, या बैंकिंग पासवर्ड मांगा जा रहा है?'
        : isMr
        ? 'तुमच्याकडे ओटीपी (OTP), पिन किंवा पासवर्ड मागितला जात आहे का?'
        : 'Am I being asked for an OTP, PIN, password, or bank authentication code?',
      whyItMatters: isHi
        ? 'कोई भी वैध वित्तीय संस्था कभी भी आपका ओटीपी या पासवर्ड नहीं मांगती।'
        : 'Legitimate advisers never request authentication credentials under any circumstances.',
      isWarningIfYes: true, // "YES" is a warning condition
    },
    {
      id: 'q8',
      question: isHi
        ? 'क्या आपसे AnyDesk, TeamViewer या QuickSupport जैसा ऐप इंस्टॉल करने को कहा गया है?'
        : isMr
        ? 'तुम्हाला AnyDesk किंवा TeamViewer सारखे ॲप इन्स्टॉल करण्यास सांगितले आहे का?'
        : 'Am I being asked to install remote-access software (AnyDesk, TeamViewer)?',
      whyItMatters: isHi
        ? 'रिमोट एक्सेस ऐप्स धोखेबाजों को आपके फोन की स्क्रीन देखकर बैंक खाते खाली करने की अनुमति देते हैं।'
        : 'Remote-desktop tools allow malicious actors to monitor logins and drain bank balances.',
      isWarningIfYes: true, // "YES" is a warning condition
    },
    {
      id: 'q9',
      question: isHi
        ? 'क्या आप इस संस्था के लैंडलाइन फोन और कार्यालय के पते की स्वतंत्र पुष्टि कर सकते हैं?'
        : isMr
        ? 'तुम्ही या संस्थेचा अधिकृत फोन नंबर आणि पत्ता स्वतंत्रपणे तपासू शकता का?'
        : 'Can I independently verify the contact details and physical corporate address?',
      whyItMatters: isHi
        ? 'केवल व्हाट्सएप या टेलीग्राम पर सक्रिय संस्थाएं अक्सर पैसे लेकर गायब हो जाती हैं।'
        : 'Entities existing solely via anonymous messaging channels cannot be tracked if funds disappear.',
      isWarningIfYes: false, // "NO" is a warning condition
    },
  ];

  // User answers: key is question id, value is boolean (true = yes, false = no)
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});

  const handleSelectAnswer = (id: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => {
    setAnswers({});
  };

  // Count warning conditions
  let warningCount = 0;
  let totalAnswered = 0;

  checklistData.forEach((item) => {
    const val = answers[item.id];
    if (val !== undefined && val !== null) {
      totalAnswered++;
      if (item.isWarningIfYes && val === true) {
        warningCount++;
      } else if (!item.isWarningIfYes && val === false) {
        warningCount++;
      }
    }
  });

  return (
    <div className="bg-[#FCF9F8] min-h-screen py-10">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="border-b border-[#E5E4DE] pb-6">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#991B1B] uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#991B1B]" />
            SAFETY PROTOCOL • PRE-TRANSACTION CHECK
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111111] mt-1">
            {isHi ? 'पैसे भेजने से पहले (BEFORE YOU PAY)' : isMr ? 'पैसे पाठवण्यापूर्वी' : 'BEFORE YOU PAY'}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#444748] mt-1 max-w-2xl leading-relaxed">
            {isHi
              ? 'किसी भी निवेश योजना या अनजान व्यक्ति को पैसे ट्रांसफर करने से पहले इन 9 महत्वपूर्ण प्रश्नों का उत्तर दें।'
              : isMr
              ? 'कोणत्याही अनोळखी खात्यात पैसे पाठवण्यापूर्वी ही ९ तपासणी करा.'
              : 'Answer these 9 key safety questions before sending money or approving payment mandates.'}
          </p>
        </div>

        {/* Real-time Safety Check Scoreboard Card */}
        {totalAnswered > 0 && (
          <div
            className={`p-6 rounded-[4px] border ${
              warningCount >= 3
                ? 'bg-[#FEF2F2] border-[#F87171] text-[#991B1B]'
                : warningCount >= 1
                ? 'bg-[#FFFBEB] border-[#FCD34D] text-[#92400E]'
                : 'bg-[#F0FDF4] border-[#86EFAC] text-[#166534]'
            } shadow-[4px_4px_0px_rgba(17,17,17,0.04)]`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest font-bold">
                  {isHi ? 'आपकी सुरक्षा जांच परिणाम' : 'YOUR SAFETY CHECK'}
                </div>
                <div className="font-serif text-2xl font-bold mt-1">
                  {warningCount} / {checklistData.length} {isHi ? 'चेतावनी स्थितियां पाई गईं' : 'warning conditions identified'}
                </div>
                <p className="text-xs font-sans mt-1">
                  {warningCount >= 3
                    ? isHi
                      ? 'गंभीर चेतावनी: पैसे ट्रांसफर करने से पहले रुकें और सेबी की आधिकारिक सूची में जांच करें।'
                      : 'PAUSE AND VERIFY BEFORE TRANSFERRING MONEY. Multiple high-risk conditions detected.'
                    : warningCount >= 1
                    ? isHi
                      ? 'सतर्क रहें: कुछ चेतावनी बिंदु मिले हैं। स्वतंत्र पुष्टि करें।'
                      : 'Exercise heightened caution. Verify all details independently before sending funds.'
                    : isHi
                    ? 'सामान्य स्थिति: फिर भी हमेशा आधिकारिक संस्थागत खातों में ही लेनदेन करें।'
                    : 'Low warning count observed. Always confirm account credentials through official channels.'}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] border border-current text-xs font-mono font-semibold uppercase hover:bg-black/5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RESET</span>
                </button>

                <button
                  onClick={() => onNavigate('dashboard')}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-[2px] bg-[#111111] text-white text-xs font-mono font-semibold uppercase hover:bg-[#2A2A28]"
                >
                  <span>RUN DEEP SCAN</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 9 Checklist Items */}
        <div className="space-y-4">
          {checklistData.map((item, index) => {
            const currentAns = answers[item.id];
            const isAnswered = currentAns !== undefined && currentAns !== null;
            const isWarningCondition =
              isAnswered && ((item.isWarningIfYes && currentAns === true) || (!item.isWarningIfYes && currentAns === false));

            return (
              <div
                key={item.id}
                className={`p-5 rounded-[4px] border bg-white transition-all ${
                  isWarningCondition
                    ? 'border-[#F87171] bg-[#FFFBFB]'
                    : isAnswered
                    ? 'border-[#86EFAC] bg-[#FAFDFB]'
                    : 'border-[#E5E4DE]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#66645E]">
                        #{String(index + 1).padStart(2, '0')}
                      </span>
                      {isWarningCondition && (
                        <span className="text-[10px] font-mono font-bold uppercase bg-[#FEE2E2] text-[#991B1B] px-2 py-0.5 rounded-[2px]">
                          WARNING SIGNAL
                        </span>
                      )}
                    </div>
                    <div className="font-serif text-base sm:text-lg font-semibold text-[#111111]">
                      {item.question}
                    </div>
                    <div className="text-xs text-[#66645E] leading-relaxed">
                      <strong>Why this matters: </strong>
                      {item.whyItMatters}
                    </div>
                  </div>

                  {/* Yes / No buttons */}
                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                    <button
                      onClick={() => handleSelectAnswer(item.id, true)}
                      className={`px-4 py-2 text-xs font-mono font-bold uppercase rounded-[2px] border transition-colors ${
                        currentAns === true
                          ? item.isWarningIfYes
                            ? 'bg-[#991B1B] text-white border-[#991B1B]'
                            : 'bg-[#2D6A4F] text-white border-[#2D6A4F]'
                          : 'bg-white border-[#D8D6CE] text-[#444748] hover:border-[#111111]'
                      }`}
                    >
                      YES
                    </button>

                    <button
                      onClick={() => handleSelectAnswer(item.id, false)}
                      className={`px-4 py-2 text-xs font-mono font-bold uppercase rounded-[2px] border transition-colors ${
                        currentAns === false
                          ? !item.isWarningIfYes
                            ? 'bg-[#991B1B] text-white border-[#991B1B]'
                            : 'bg-[#2D6A4F] text-white border-[#2D6A4F]'
                          : 'bg-white border-[#D8D6CE] text-[#444748] hover:border-[#111111]'
                      }`}
                    >
                      NO
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear caveat notice required by prompt */}
        <div className="p-4 bg-[#F5F4F0] border border-[#E5E4DE] rounded-[4px] text-xs text-[#66645E] leading-relaxed">
          <strong>Important Notice:</strong> This checklist identifies common warning signs and verification gaps. It
          does not present a legal or financial guarantee that an entity is legitimate or fraudulent. Always conduct
          independent verification on official regulatory portals before transferring funds.
        </div>
      </div>
    </div>
  );
};
