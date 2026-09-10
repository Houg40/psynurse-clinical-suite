import React, { useState } from 'react';
import screenersData from '../data/screeners.json';
import { Clipboard, Check, AlertCircle, RotateCcw, FileText } from 'lucide-react';

export default function ScreenerAssessment() {
  const [activeScreenerId, setActiveScreenerId] = useState('phq9');
  const [answers, setAnswers] = useState({});
  const [copied, setCopied] = useState(false);

  const activeScreener = screenersData.screeners.find(s => s.id === activeScreenerId);

  const handleAnswerChange = (questionIndex, value) => {
    setAnswers(prev => ({
      ...prev,
      [`${activeScreenerId}_${questionIndex}`]: parseInt(value, 10)
    }));
  };

  const handleReset = () => {
    const updated = { ...answers };
    Object.keys(updated).forEach(k => {
      if (k.startsWith(`${activeScreenerId}_`)) delete updated[k];
    });
    setAnswers(updated);
  };

  // Calculate scores
  let totalScore = 0;
  let severityInfo = null;
  let criticalAlert = null;

  if (activeScreenerId === 'phq9' || activeScreenerId === 'gad7') {
    const qCount = activeScreener.questions.length;
    for (let i = 0; i < qCount; i++) {
      totalScore += (answers[`${activeScreenerId}_${i}`] || 0);
    }
    severityInfo = activeScreener.severityRanges.find(r => totalScore >= r.min && totalScore <= r.max);

    if (activeScreenerId === 'phq9' && (answers['phq9_8'] || 0) > 0) {
      criticalAlert = "SAFETY ALERT: Patient endorsed thoughts of self-harm or suicide (Question 9 > 0). Conduct comprehensive suicide risk assessment immediately (C-SSRS / safety plan).";
    }
  } else if (activeScreenerId === 'asrs') {
    let partAPositiveCount = 0;
    activeScreener.partAQuestions.forEach((q, idx) => {
      const val = answers[`asrs_${idx}`] || 0;
      if (val >= q.threshold) partAPositiveCount++;
    });
    totalScore = partAPositiveCount;
    severityInfo = {
      severity: partAPositiveCount >= 4 ? "Highly Consistent with Adult ADHD" : "Below Typical Diagnostic Threshold",
      treatmentRecommendation: partAPositiveCount >= 4 
        ? "Part A score >= 4 indicates strong clinical likelihood of Adult ADHD. Further diagnostic clinical evaluation recommended." 
        : "Part A score < 4 indicates ADHD symptoms may be secondary to anxiety, depression, or situational stressors."
    };
  } else if (activeScreenerId === 'mdq') {
    let yesCount = 0;
    activeScreener.questions.forEach((_, idx) => {
      if ((answers[`mdq_${idx}`] || 0) === 1) yesCount++;
    });
    totalScore = yesCount;
    severityInfo = {
      severity: yesCount >= 7 ? "Positive Screen for Bipolar Spectrum" : "Negative Screen for Bipolar Disorder",
      treatmentRecommendation: yesCount >= 7 
        ? "HIGH RISK: Endorsement of 7+ symptoms suggests bipolar vulnerability. AVOID un-adjuncted antidepressant monotherapy to prevent manic switches." 
        : "Standard unipolar treatment pathways may proceed with routine clinical monitoring."
    };
    if (yesCount >= 7) {
      criticalAlert = "BIPOLAR SAFETY GUARDRAIL: Positive MDQ screen detected. Exercise extreme caution before prescribing or increasing SSRI/SNRI monotherapy.";
    }
  } else if (activeScreenerId === 'aims') {
    let movementSum = 0;
    let maxItemScore = 0;
    activeScreener.questions.forEach((_, idx) => {
      const val = answers[`aims_${idx}`] || 0;
      movementSum += val;
      if (val > maxItemScore) maxItemScore = val;
    });
    totalScore = movementSum;
    
    // AIMS positive criteria: Score >= 2 (mild) in TWO or more areas OR Score >= 3 (moderate) or 4 (severe) in ONE area
    const mildCount = activeScreener.questions.filter((_, idx) => (answers[`aims_${idx}`] || 0) >= 2).length;
    const isTdPositive = maxItemScore >= 3 || mildCount >= 2;

    severityInfo = {
      severity: isTdPositive 
        ? "POSITIVE AIMS Screen for Tardive Dyskinesia (TD)" 
        : totalScore > 0 ? "Minimal Movement Noted (Sub-threshold for TD)" : "Negative AIMS Exam (No Involuntary Movements)",
      treatmentRecommendation: isTdPositive
        ? "ALERT: Patient meets clinical criteria for Tardive Dyskinesia. Consider tapering/discontinuing offending antipsychotic, switching to lower TD-risk agent (e.g., Quetiapine or Clozapine), or evaluating for VMAT2 inhibitor therapy (Valbenazine / Deutetrabenazine)."
        : "Re-screen every 3-6 months for patients on second-generation antipsychotics, or every 3 months for first-generation agents."
    };

    if (isTdPositive) {
      criticalAlert = "TARDIVE DYSKINESIA ALERT: Involuntary choreiform/athetoid movements detected. Document informed consent, discuss VMAT2 inhibitor referral, and re-evaluate antipsychotic necessity.";
    }
  }

  // Generate Tebra EHR Note
  const generateEhrNote = () => {
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    let note = `CLINICAL RATING ASSESSMENT: ${activeScreener.fullName} (${activeScreener.name})\nDate: ${today}\n`;
    note += `Target Condition: ${activeScreener.targetCondition}\n`;
    note += `Total Score: ${totalScore} ${activeScreenerId === 'phq9' ? '/ 27' : activeScreenerId === 'gad7' ? '/ 21' : activeScreenerId === 'aims' ? '/ 28 (Items 1-7)' : activeScreenerId === 'asrs' ? '/ 6 positive threshold items' : '/ 13 symptoms'}\n`;
    note += `Clinical Impression: ${severityInfo ? severityInfo.severity : 'Assessment in progress'}\n`;
    note += `Clinical Recommendation: ${severityInfo ? severityInfo.treatmentRecommendation : 'Complete evaluation'}\n`;
    
    if (criticalAlert) {
      note += `\n[CRITICAL SAFETY NOTATION]\n${criticalAlert}\n`;
    }
    
    note += `\nProvider Notes: Assessment administered via clinical interview. Results discussed with patient; aligned with DSM-5-TR diagnostic criteria and insurance audit standards.`;
    return note;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateEhrNote());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Screener Selector Pills */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-200/60 rounded-xl w-fit">
        {screenersData.screeners.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveScreenerId(s.id)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeScreenerId === s.id
                ? 'bg-white text-teal-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            {s.name} ({s.fullName.split(' ')[0]})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Questionnaire */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-5">
            <div>
              <h2 className="text-xl font-black text-slate-900">{activeScreener.fullName}</h2>
              <p className="text-sm text-slate-500 mt-1">{activeScreener.instructions}</p>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>

          {/* Question List */}
          <div className="space-y-4">
            {(activeScreenerId === 'asrs' ? activeScreener.partAQuestions : activeScreener.questions).map((q, idx) => {
              const qText = typeof q === 'string' ? q : q.text;
              const isQ9 = activeScreenerId === 'phq9' && idx === 8;

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all ${
                    isQ9
                      ? 'border-red-200 bg-red-50/40'
                      : 'border-slate-100 hover:border-slate-300 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="font-bold text-xs bg-slate-200 text-slate-700 rounded-md w-6 h-6 flex items-center justify-center flex-shrink-0">
                      Q{idx + 1}
                    </span>
                    <span className={`text-sm font-medium ${isQ9 ? 'text-red-950 font-bold' : 'text-slate-800'}`}>
                      {qText}
                      {isQ9 && <span className="text-xs text-red-600 block mt-0.5">⚠️ Suicide / Self-Harm Risk Trigger</span>}
                    </span>
                  </div>

                  {/* Scale Options */}
                  {activeScreenerId === 'mdq' ? (
                    <div className="flex gap-3 pl-9">
                      {[{ val: 1, label: 'Yes' }, { val: 0, label: 'No' }].map((opt) => (
                        <label key={opt.val} className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                          <input
                            type="radio"
                            name={`mdq_${idx}`}
                            checked={answers[`mdq_${idx}`] === opt.val}
                            onChange={() => handleAnswerChange(idx, opt.val)}
                            className="text-teal-600 focus:ring-teal-500 h-4 w-4"
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pl-9">
                      {(activeScreener.scale || []).map((scaleItem) => (
                        <label
                          key={scaleItem.value}
                          className={`flex items-center gap-2 p-2 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
                            answers[`${activeScreenerId}_${idx}`] === scaleItem.value
                              ? 'border-teal-500 bg-teal-50 text-teal-800'
                              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`${activeScreenerId}_${idx}`}
                            value={scaleItem.value}
                            checked={answers[`${activeScreenerId}_${idx}`] === scaleItem.value}
                            onChange={(e) => handleAnswerChange(idx, e.target.value)}
                            className="text-teal-600 focus:ring-teal-500 h-3.5 w-3.5"
                          />
                          <span>{scaleItem.label} ({scaleItem.value})</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Live Score & EHR Note Generator */}
        <div className="space-y-6">
          {/* Live Scorecard */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Live Assessment Score</h3>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-black text-teal-700">{totalScore}</span>
              <span className="text-sm font-semibold text-slate-500">
                {activeScreenerId === 'phq9' ? '/ 27 points' : activeScreenerId === 'gad7' ? '/ 21 points' : activeScreenerId === 'aims' ? '/ 28 points' : activeScreenerId === 'asrs' ? '/ 6 positive items' : '/ 13 symptoms'}
              </span>
            </div>

            {severityInfo && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase">Clinical Severity</span>
                <p className="text-lg font-bold text-slate-900 mt-0.5">{severityInfo.severity}</p>
                <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-3 rounded-lg border border-slate-200/70">
                  {severityInfo.treatmentRecommendation}
                </p>
              </div>
            )}

            {criticalAlert && (
              <div className="mt-4 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-800 font-medium">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <span>{criticalAlert}</span>
              </div>
            )}
          </div>

          {/* Tebra EHR Chart Note Exporter */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-400" />
                <h4 className="text-sm font-bold text-white">Tebra EHR Chart Note</h4>
              </div>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 px-3 py-1.5 rounded-lg transition-all shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Clipboard className="w-3.5 h-3.5" />}
                {copied ? 'Copied to EHR!' : 'Copy Note'}
              </button>
            </div>

            <textarea
              readOnly
              value={generateEhrNote()}
              rows={9}
              className="w-full text-xs font-mono bg-slate-950/80 text-emerald-300 border border-slate-800 rounded-xl p-3 focus:outline-none resize-none leading-relaxed"
            />
            <p className="text-[11px] text-slate-400 mt-2">
              Ready to paste directly into Monica's Tebra clinical encounter notes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

