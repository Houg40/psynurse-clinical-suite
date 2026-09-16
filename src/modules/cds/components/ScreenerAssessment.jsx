import React, { useState } from 'react';
import screenersData from '../data/screeners.json';
import { Clipboard, Check, AlertCircle, RotateCcw, FileText, Info, BookOpen } from 'lucide-react';

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

    // Clinical Score Interpretation & Number Ranges Reference
    note += `\n[SCORE INTERPRETATION RANGES & CLINICAL CUTOFFS]\n`;
    if (activeScreenerId === 'phq9') {
      note += `• 0-4: None-Minimal Depression (watchful waiting)\n`;
      note += `• 5-9: Mild Depression (psychoeducation, lifestyle, re-screen in 4-6 wks)\n`;
      note += `• 10-14: Moderate Depression (clinically significant; first-line SSRI/SNRI or Bupropion + CBT)\n`;
      note += `• 15-19: Moderately Severe Depression (active pharmacotherapy and/or psychotherapy)\n`;
      note += `• 20-27: Severe Depression (immediate pharmacotherapy; consider specialist/IOP)\n`;
      note += `* Note: Any score > 0 on Item 9 mandates immediate C-SSRS suicide risk protocol.\n`;
    } else if (activeScreenerId === 'gad7') {
      note += `• 0-4: Minimal Anxiety (normal range; supportive surveillance)\n`;
      note += `• 5-9: Mild Anxiety (supportive therapy, sleep hygiene, mindfulness)\n`;
      note += `• 10-14: Moderate Anxiety (clinically significant; initiate first-line SSRI/SNRI and/or CBT)\n`;
      note += `• 15-21: Severe Anxiety (active pharmacotherapy; evaluate non-controlled anxiolytic adjuncts)\n`;
    } else if (activeScreenerId === 'asrs') {
      note += `• Part A 0-3 Threshold Items: Below adult diagnostic threshold for ADHD.\n`;
      note += `• Part A 4-6 Threshold Items: High likelihood of Adult ADHD (DSM-5 criteria). Comprehensive psychiatric ADHD evaluation indicated.\n`;
      note += `* Scoring rule: Questions 1-3 positive if >=2 (Sometimes/Often/Very Often); Questions 4-6 positive if >=3 (Often/Very Often).\n`;
    } else if (activeScreenerId === 'mdq') {
      note += `• < 7 Symptoms: Negative screen for bipolar spectrum.\n`;
      note += `• >= 7 Symptoms + Co-occurrence + Mod/Severe Impairment: POSITIVE Bipolar Screen. High risk of treatment-emergent mania if given un-adjuncted SSRI/SNRI monotherapy.\n`;
    } else if (activeScreenerId === 'aims') {
      note += `• Score 0: Negative AIMS (no involuntary movements detected).\n`;
      note += `• Score 1 (Minimal) in <=1 area: Sub-threshold movement; routine quarterly surveillance.\n`;
      note += `• Score >=2 (Mild) in 1+ domain OR Score >=1 (Minimal) in 2+ domains: POSITIVE screen for Tardive Dyskinesia (TD). Review antipsychotic regimen; consider VMAT2 inhibitor therapy.\n`;
    }
    
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

          {/* Dedicated Score Interpretation & Number Ranges Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-teal-600" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Score Interpretation &amp; Number Ranges
                </h4>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-100 px-2 py-0.5 rounded">
                {activeScreener.name} Cutoffs
              </span>
            </div>

            {/* PHQ-9 Ranges */}
            {activeScreenerId === 'phq9' && (
              <div className="space-y-1.5 text-xs">
                {[
                  { range: '0 – 4', label: 'None-Minimal Depression', desc: 'Watchful waiting; supportive follow-up.', color: 'bg-emerald-50 text-emerald-900 border-emerald-200', active: totalScore >= 0 && totalScore <= 4 },
                  { range: '5 – 9', label: 'Mild Depression', desc: 'Psychoeducation, lifestyle guidance, repeat in 4-6 wks.', color: 'bg-teal-50 text-teal-900 border-teal-200', active: totalScore >= 5 && totalScore <= 9 },
                  { range: '10 – 14', label: 'Moderate Depression', desc: 'Clinically significant; first-line SSRI/SNRI/Bupropion and/or CBT.', color: 'bg-amber-50 text-amber-900 border-amber-200', active: totalScore >= 10 && totalScore <= 14 },
                  { range: '15 – 19', label: 'Moderately Severe Depression', desc: 'Active pharmacotherapy with psychotherapy indicated.', color: 'bg-orange-50 text-orange-900 border-orange-200', active: totalScore >= 15 && totalScore <= 19 },
                  { range: '20 – 27', label: 'Severe Depression', desc: 'Immediate pharmacotherapy; urgent psychiatric evaluation/IOP.', color: 'bg-rose-50 text-rose-900 border-rose-200', active: totalScore >= 20 && totalScore <= 27 }
                ].map((tier, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-xl border transition-all ${
                      tier.active
                        ? `${tier.color} ring-2 ring-teal-500 font-semibold shadow-xs`
                        : 'bg-slate-50 border-slate-100 text-slate-600 opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold px-1.5 py-0.5 rounded bg-white/80 border border-slate-200/60 text-slate-800 text-[11px]">
                          {tier.range}
                        </span>
                        <span className="font-bold text-xs">{tier.label}</span>
                      </div>
                      {tier.active && (
                        <span className="text-[10px] font-extrabold uppercase tracking-wide bg-teal-600 text-white px-2 py-0.5 rounded-full">
                          Current Score
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] mt-1 text-slate-600 pl-0.5">{tier.desc}</p>
                  </div>
                ))}
                <div className="mt-2 p-2 rounded-lg bg-red-50 border border-red-200 text-[11px] text-red-900 font-medium flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                  <span>Item 9 &gt; 0: Triggers mandatory suicide risk protocol (C-SSRS).</span>
                </div>
              </div>
            )}

            {/* GAD-7 Ranges */}
            {activeScreenerId === 'gad7' && (
              <div className="space-y-1.5 text-xs">
                {[
                  { range: '0 – 4', label: 'Minimal Anxiety', desc: 'Normal range; supportive observation.', color: 'bg-emerald-50 text-emerald-900 border-emerald-200', active: totalScore >= 0 && totalScore <= 4 },
                  { range: '5 – 9', label: 'Mild Anxiety', desc: 'Supportive therapy, sleep hygiene, mindfulness.', color: 'bg-teal-50 text-teal-900 border-teal-200', active: totalScore >= 5 && totalScore <= 9 },
                  { range: '10 – 14', label: 'Moderate Anxiety', desc: 'Clinically significant; first-line SSRI/SNRI and/or CBT indicated.', color: 'bg-amber-50 text-amber-900 border-amber-200', active: totalScore >= 10 && totalScore <= 14 },
                  { range: '15 – 21', label: 'Severe Anxiety', desc: 'Active pharmacotherapy indicated; consider non-controlled adjunct.', color: 'bg-rose-50 text-rose-900 border-rose-200', active: totalScore >= 15 && totalScore <= 21 }
                ].map((tier, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-xl border transition-all ${
                      tier.active
                        ? `${tier.color} ring-2 ring-teal-500 font-semibold shadow-xs`
                        : 'bg-slate-50 border-slate-100 text-slate-600 opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold px-1.5 py-0.5 rounded bg-white/80 border border-slate-200/60 text-slate-800 text-[11px]">
                          {tier.range}
                        </span>
                        <span className="font-bold text-xs">{tier.label}</span>
                      </div>
                      {tier.active && (
                        <span className="text-[10px] font-extrabold uppercase tracking-wide bg-teal-600 text-white px-2 py-0.5 rounded-full">
                          Current Score
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] mt-1 text-slate-600 pl-0.5">{tier.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* ASRS-v1.1 Ranges */}
            {activeScreenerId === 'asrs' && (
              <div className="space-y-2 text-xs">
                <div className={`p-2.5 rounded-xl border ${totalScore >= 4 ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-500' : 'bg-slate-50 border-slate-100'}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Part A Positive Threshold: 4 – 6 Items</span>
                    {totalScore >= 4 && <span className="text-[10px] font-bold bg-amber-600 text-white px-2 py-0.5 rounded-full">High Likelihood Adult ADHD</span>}
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Endorsement of 4 or more shaded threshold items strongly suggests adult ADHD and warrants formal diagnostic evaluation.
                  </p>
                </div>

                <div className={`p-2.5 rounded-xl border ${totalScore < 4 ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500' : 'bg-slate-50 border-slate-100'}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Sub-Threshold: 0 – 3 Items</span>
                    {totalScore < 4 && <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">Below Threshold</span>}
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Symptoms fall below the standard clinical cutoff for adult ADHD; screen for secondary causes (anxiety, depression, sleep apnea).
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-slate-100 text-[11px] text-slate-600 leading-snug">
                  <span className="font-bold">Scoring Rule:</span> Questions 1–3 meet threshold at score &ge; 2 ("Sometimes"); Questions 4–6 meet threshold at score &ge; 3 ("Often").
                </div>
              </div>
            )}

            {/* MDQ Ranges */}
            {activeScreenerId === 'mdq' && (
              <div className="space-y-2 text-xs">
                <div className={`p-2.5 rounded-xl border ${totalScore >= 7 ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-500' : 'bg-slate-50 border-slate-100'}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-950">&ge; 7 Symptoms + Co-Occurrence + Functional Impairment</span>
                    {totalScore >= 7 && <span className="text-[10px] font-bold bg-rose-600 text-white px-2 py-0.5 rounded-full">Positive Bipolar Screen</span>}
                  </div>
                  <p className="text-[11px] text-rose-900 mt-1">
                    Positive Screen for Bipolar Spectrum Disorder. <strong>SAFETY GUARDRAIL:</strong> Avoid un-adjuncted SSRI/SNRI antidepressant monotherapy to prevent inducing mania/hypomania or rapid cycling.
                  </p>
                </div>

                <div className={`p-2.5 rounded-xl border ${totalScore < 7 ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500' : 'bg-slate-50 border-slate-100'}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">&lt; 7 Symptoms (0 – 6 Endorsed)</span>
                    {totalScore < 7 && <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">Negative Bipolar Screen</span>}
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Negative screen for hypomania/mania. Standard unipolar depression treatment protocols may proceed with routine monitoring.
                  </p>
                </div>
              </div>
            )}

            {/* AIMS Ranges */}
            {activeScreenerId === 'aims' && (
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl border bg-slate-50 border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">Diagnostic TD Threshold Rule:</span>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    A score of <strong>&ge; 2 (Mild) in TWO or more areas</strong> OR <strong>&ge; 3 (Moderate) or 4 (Severe) in ONE area</strong> constitutes a positive screen for Tardive Dyskinesia.
                  </p>
                </div>

                <div className="space-y-1">
                  {[
                    { range: 'Score 0', label: 'Negative AIMS', desc: 'No involuntary movements detected; repeat every 3-6 months.' },
                    { range: 'Score 1 in <=1 area', label: 'Minimal / Sub-threshold Movement', desc: 'Close clinical surveillance; document baseline movements.' },
                    { range: 'Score >=2 in 1+ or >=1 in 2+', label: 'Presumptive Tardive Dyskinesia', desc: 'Re-evaluate antipsychotic necessity; taper/switch to quetiapine/clozapine or refer for VMAT2 inhibitor.' }
                  ].map((tier, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-700">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[11px] text-teal-800">{tier.range}</span>
                        <span className="font-semibold text-slate-800 text-[11px]">{tier.label}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">{tier.desc}</p>
                    </div>
                  ))}
                </div>
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

