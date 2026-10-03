import React, { useState } from 'react';
import { CheckSquare, Square, AlertCircle, RotateCcw, ShieldCheck } from 'lucide-react';
import { Language } from '../../types';

interface BeforeYouPayCompactProps {
  currentLanguage: Language;
}

export const BeforeYouPayCompact: React.FC<BeforeYouPayCompactProps> = ({ currentLanguage }) => {
  const isHi = currentLanguage === 'hi';

  const questions = [
    { id: 'q1', text: isHi ? 'क्या आपने संस्था को खुद ढूंढा? (या उन्होंने आपको अचानक संपर्क किया?)' : 'Did I independently find this entity? (Or unsolicited message?)', isWarningIfYes: false },
    { id: 'q2', text: isHi ? 'क्या आपने आधिकारिक वेबसाइट पर पंजीकरण जांचा?' : 'Did I verify registration on the official regulator website?', isWarningIfYes: false },
    { id: 'q3', text: isHi ? 'क्या गारंटीड या जोखिम-मुक्त रिटर्न का वादा है?' : 'Am I promised guaranteed or risk-free returns?', isWarningIfYes: true },
    { id: 'q4', text: isHi ? 'क्या तुरंत पैसे भेजने का दबाव डाला जा रहा है?' : 'Am I being pressured to act immediately?', isWarningIfYes: true },
    { id: 'q5', text: isHi ? 'क्या मुनाफा निकालने के लिए अग्रिम टैक्स/फीस मांगी जा रही है?' : 'Am I asked for an upfront fee or tax to unlock funds?', isWarningIfYes: true },
    { id: 'q6', text: isHi ? 'क्या पैसे किसी व्यक्तिगत खाते/यूपीआई में जा रहे हैं?' : 'Am I sending money to a personal account/UPI handle?', isWarningIfYes: true },
    { id: 'q7', text: isHi ? 'क्या ओटीपी या पासवर्ड मांगा गया?' : 'Am I asked for an OTP, PIN, or password?', isWarningIfYes: true },
    { id: 'q8', text: isHi ? 'क्या AnyDesk या TeamViewer ऐप डाउनलोड करने को कहा गया?' : 'Am I asked to install AnyDesk or screen-sharing software?', isWarningIfYes: true },
    { id: 'q9', text: isHi ? 'क्या संपर्क सूत्र व पते की स्वतंत्र पुष्टि हो सकती है?' : 'Can I independently verify the physical address/phone?', isWarningIfYes: false },
  ];

  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});

  const handleToggle = (id: string, isWarningIfYes: boolean) => {
    setAnswers((prev) => {
      const current = prev[id];
      // Toggle between true, false, and null
      if (current === true) return { ...prev, [id]: false };
      if (current === false) return { ...prev, [id]: null };
      return { ...prev, [id]: true };
    });
  };

  const handleReset = () => setAnswers({});

  let warningCount = 0;
  let totalAnswered = 0;

  questions.forEach((q) => {
    const a = answers[q.id];
    if (a !== undefined && a !== null) {
      totalAnswered++;
      if (q.isWarningIfYes && a === true) warningCount++;
      if (!q.isWarningIfYes && a === false) warningCount++;
    }
  });

  return (
    <div className="p-5 rounded-[4px] border border-[#E5E4DE] bg-[#FCF9F8] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E5E4DE]">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#991B1B] font-bold">
            PRACTICAL SAFETY CHECKLIST
          </div>
          <h4 className="font-serif text-lg font-bold text-[#111111]">
            {isHi ? 'पैसे भेजने से पहले (Before You Pay)' : 'Before You Pay'}
          </h4>
        </div>
        {totalAnswered > 0 && (
          <button
            onClick={handleReset}
            className="text-[11px] font-mono text-[#66645E] hover:text-[#111111] flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      <p className="text-xs text-[#66645E] leading-relaxed">
        {isHi
          ? 'पैसे ट्रांसफर करने से पहले इन 9 प्रश्नों पर विचार करें:'
          : 'Answer these 9 safety checks before sending money:'}
      </p>

      {/* Questions list */}
      <div className="space-y-2">
        {questions.map((q, idx) => {
          const ans = answers[q.id];
          const isWarning =
            ans !== undefined &&
            ans !== null &&
            ((q.isWarningIfYes && ans === true) || (!q.isWarningIfYes && ans === false));

          return (
            <div
              key={q.id}
              className={`p-2.5 rounded-[4px] border text-xs flex items-start justify-between gap-3 transition-colors ${
                isWarning
                  ? 'bg-[#FEF2F2] border-[#F87171] text-[#991B1B]'
                  : ans !== undefined && ans !== null
                  ? 'bg-white border-[#86EFAC] text-[#166534]'
                  : 'bg-white border-[#E5E4DE] text-[#222222]'
              }`}
            >
              <div className="flex-1 leading-snug">
                <span className="font-mono text-[10px] font-bold text-[#66645E] mr-1.5">
                  #{idx + 1}
                </span>
                {q.text}
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: true }))}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                    ans === true
                      ? q.isWarningIfYes
                        ? 'bg-[#991B1B] text-white border-[#991B1B]'
                        : 'bg-[#2D6A4F] text-white border-[#2D6A4F]'
                      : 'bg-white border-[#D8D6CE] text-[#444748]'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: false }))}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                    ans === false
                      ? !q.isWarningIfYes
                        ? 'bg-[#991B1B] text-white border-[#991B1B]'
                        : 'bg-[#2D6A4F] text-white border-[#2D6A4F]'
                      : 'bg-white border-[#D8D6CE] text-[#444748]'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety Scoreboard */}
      {totalAnswered > 0 && (
        <div
          className={`p-3 rounded-[4px] border text-xs font-sans ${
            warningCount >= 3
              ? 'bg-[#FEF2F2] border-[#F87171] text-[#991B1B]'
              : warningCount >= 1
              ? 'bg-[#FFFBEB] border-[#FCD34D] text-[#92400E]'
              : 'bg-[#F0FDF4] border-[#86EFAC] text-[#166534]'
          }`}
        >
          <strong>Your safety check: </strong>
          {warningCount} / {questions.length} warning conditions identified.
          {warningCount >= 3
            ? ' Pause and verify before transferring money!'
            : warningCount >= 1
            ? ' Exercise caution and verify independently.'
            : ' Looks baseline safe. Always confirm depository accounts.'}
        </div>
      )}
    </div>
  );
};
