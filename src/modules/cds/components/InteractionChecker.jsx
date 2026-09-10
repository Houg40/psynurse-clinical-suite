import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  ShieldCheck, 
  Info, 
  Copy, 
  Check, 
  Trash2, 
  Plus, 
  HeartPulse, 
  Zap, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import drugDatabase from '../data/interactionDrugs.json';

export default function InteractionChecker() {
  const [selectedDrugIds, setSelectedDrugIds] = useState(['escitalopram', 'quetiapine']);
  const [copied, setCopied] = useState(false);

  // Quick preset clinical combinations
  const presets = [
    {
      label: 'SSRI + Antipsychotic (Common Augmentation)',
      drugs: ['escitalopram', 'quetiapine']
    },
    {
      label: 'High-Risk Triple QTc Collision',
      drugs: ['citalopram', 'ondansetron', 'quetiapine']
    },
    {
      label: '2D6 Enzyme Inhibition Collision',
      drugs: ['bupropion', 'adderall', 'fluoxetine']
    },
    {
      label: 'Cardio-Safe Cardiac Comorbidity Profile',
      drugs: ['sertraline', 'aripiprazole']
    }
  ];

  // Selected drug objects
  const selectedDrugs = useMemo(() => {
    return selectedDrugIds
      .map(id => drugDatabase.find(d => d.id === id))
      .filter(Boolean);
  }, [selectedDrugIds]);

  // Available drugs not yet selected
  const availableDrugs = useMemo(() => {
    return drugDatabase.filter(d => !selectedDrugIds.includes(d.id));
  }, [selectedDrugIds]);

  // Compute cumulative QTc Risk Score
  const qtcAnalysis = useMemo(() => {
    const totalScore = selectedDrugs.reduce((sum, d) => sum + (d.qtcScore || 0), 0);
    const highRiskDrugs = selectedDrugs.filter(d => d.qtcRisk === 'High');
    const modRiskDrugs = selectedDrugs.filter(d => d.qtcRisk === 'Moderate');

    let level = 'LOW';
    let badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-300';
    let barColor = 'bg-emerald-500';
    let warning = 'Minimal additive risk of cardiac repolarization delay or Torsades de Pointes (TdP). Routine clinical vigilance recommended.';
    let recommendation = 'Baseline EKG generally optional unless patient has personal/family history of syncope, congenital long QT, or baseline electrolyte abnormalities (hypokalemia, hypomagnesemia).';

    if (totalScore >= 5 || highRiskDrugs.length >= 2 || (highRiskDrugs.length >= 1 && modRiskDrugs.length >= 1)) {
      level = 'CRITICAL / SEVERE';
      badgeColor = 'bg-rose-100 text-rose-800 border-rose-400';
      barColor = 'bg-rose-600';
      warning = 'CRITICAL ADDITIVE QTc HAZARD: Multiple high-potency repolarization blockers combined. Extreme risk of Torsades de Pointes and malignant ventricular arrhythmias!';
      recommendation = 'Strongly consider substituting one or more agents for cardio-safer alternatives (e.g., Sertraline or Aripiprazole). If clinically necessary, MANDATORY baseline 12-lead EKG with QTc calculation, repeat EKG at steady state (1-2 weeks), and check serum potassium and magnesium.';
    } else if (totalScore >= 3 || highRiskDrugs.length === 1 || modRiskDrugs.length >= 2) {
      level = 'MODERATE TO ELEVATED';
      badgeColor = 'bg-amber-50 text-amber-800 border-amber-300';
      barColor = 'bg-amber-500';
      warning = 'MODERATE ADDITIVE RISK: Concurrent use of multiple QTc-prolonging psychotropic medications increases repolarization prolongation risk.';
      recommendation = 'Obtain baseline EKG (especially in female patients, age >60, or patients on diuretics/PPIs). Educate patient to seek emergency care for syncope, unprovoked presyncope, or rapid irregular palpitations. Avoid exceeding maximum recommended dosing ceilings.';
    }

    return {
      totalScore,
      level,
      badgeColor,
      barColor,
      warning,
      recommendation,
      highRiskDrugs,
      modRiskDrugs
    };
  }, [selectedDrugs]);

  // Compute CYP450 Enzyme collisions
  const cypCollisions = useMemo(() => {
    const collisions = [];

    // Check all pairs
    for (let i = 0; i < selectedDrugs.length; i++) {
      for (let j = 0; j < selectedDrugs.length; j++) {
        if (i === j) continue;
        const drugA = selectedDrugs[i]; // Potential inhibitor
        const drugB = selectedDrugs[j]; // Potential substrate

        // Check 2D6
        if (drugA.cypInhibitors.some(inh => inh.includes('CYP2D6')) && drugB.cypSubstrates.includes('CYP2D6')) {
          collisions.push({
            type: 'CYP2D6 Metabolic Blockade',
            severity: drugA.cypInhibitors.some(inh => inh.includes('strong')) ? 'High' : 'Moderate',
            inhibitor: drugA.name,
            substrate: drugB.name,
            explanation: `${drugA.name} inhibits CYP2D6, significantly impairing the clearance of ${drugB.name}. This can cause 2x-4x elevation in plasma concentration, amplifying side effects and toxicity.`
          });
        }

        // Check 1A2
        if (drugA.cypInhibitors.some(inh => inh.includes('CYP1A2')) && drugB.cypSubstrates.includes('CYP1A2')) {
          collisions.push({
            type: 'CYP1A2 Metabolic Blockade',
            severity: 'High',
            inhibitor: drugA.name,
            substrate: drugB.name,
            explanation: `${drugA.name} strongly blocks CYP1A2 clearance of ${drugB.name}, leading to dangerous plasma accumulation.`
          });
        }

        // Check 2C19
        if (drugA.cypInhibitors.some(inh => inh.includes('CYP2C19')) && drugB.cypSubstrates.includes('CYP2C19')) {
          collisions.push({
            type: 'CYP2C19 Clearance Inhibition',
            severity: 'Moderate',
            inhibitor: drugA.name,
            substrate: drugB.name,
            explanation: `${drugA.name} slows the metabolism of ${drugB.name}, raising circulating serum levels and compounding dose-dependent cardiac repolarization risks.`
          });
        }
      }
    }

    // Deduplicate identical collisions
    const unique = [];
    const seen = new Set();
    collisions.forEach(c => {
      const key = `${c.inhibitor}->${c.substrate}->${c.type}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(c);
      }
    });

    return unique;
  }, [selectedDrugs]);

  // Compute Serotonin Syndrome warning
  const serotonergicCount = useMemo(() => {
    return selectedDrugs.filter(d => d.serotonergic).length;
  }, [selectedDrugs]);

  // Add medication
  const handleAddDrug = (id) => {
    if (!selectedDrugIds.includes(id)) {
      setSelectedDrugIds([...selectedDrugIds, id]);
    }
  };

  // Remove medication
  const handleRemoveDrug = (id) => {
    setSelectedDrugIds(selectedDrugIds.filter(item => item !== id));
  };

  // Copy EHR Documentation Text
  const handleCopyDocumentation = () => {
    const drugList = selectedDrugs.map(d => d.name).join(' + ');
    const noteText = 
`[DRUG INTERACTION & CARDIAC QTc CLINICAL RATIONALE]
Active Regimen Screened: ${drugList}
Cumulative QTc Prolongation Risk: ${qtcAnalysis.level} (Calculated Risk Score: ${qtcAnalysis.totalScore}/10)
Clinical Safety Assessment:
- ${qtcAnalysis.warning}
- Surveillance Plan: ${qtcAnalysis.recommendation}
${cypCollisions.length > 0 ? `Pharmacokinetic Enzyme Interactions Noted:\n${cypCollisions.map(c => `  * ${c.type}: ${c.inhibitor} blocks ${c.substrate} (${c.explanation})`).join('\n')}` : 'Pharmacokinetic Enzyme Interactions: No high-risk CYP450 inhibitor/substrate conflicts detected.'}
${serotonergicCount >= 2 ? `Serotonin Toxicity Alert: Regimen includes ${serotonergicCount} serotonergic agents. Patient counseled on triad symptoms (mental status changes, autonomic hyperactivity, neuromuscular abnormalities) and instructed on emergency warning signs.` : ''}
Plan: Patient educated on signs of syncope, palpitations, and drug interactions. Medical records reflect informed discussion of risks vs. benefits.`;

    navigator.clipboard.writeText(noteText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Hero Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-48 h-48 bg-teal-50 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-200">
                <HeartPulse className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
                Cardiac &amp; Pharmacokinetic Safety Engine
              </span>
              <span className="text-xs text-slate-400">• CredibleMeds / APA Guidelines</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              QTc Prolongation &amp; Drug Interaction Matrix
            </h1>
            <p className="text-sm text-slate-600 mt-1.5 max-w-3xl leading-relaxed">
              Real-time multi-drug cardiac safety scoring, CYP450 metabolic collision analysis, and 1-click defensible EHR clinical rationale generation.
            </p>
          </div>

          {/* Quick Clear / Reset */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedDrugIds([])}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              Clear All
            </button>
          </div>
        </div>

        {/* Clinical Presets */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Quick Case Presets:
          </span>
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedDrugIds(preset.drugs)}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 border border-slate-200/80 transition-all"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Drug Selector + Real-Time Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Drug Selector (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Selected Patient Regimen ({selectedDrugs.length})</span>
              {selectedDrugs.length > 0 && (
                <span className="text-xs font-normal text-slate-500">Click &times; to remove</span>
              )}
            </h2>

            {/* Selected Pills */}
            {selectedDrugs.length === 0 ? (
              <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-xl">
                <p className="text-xs font-medium text-slate-500">No medications selected.</p>
                <p className="text-[11px] text-slate-400 mt-1">Select medications below to begin real-time cardiac &amp; interaction analysis.</p>
              </div>
            ) : (
              <div className="space-y-2 mb-4">
                {selectedDrugs.map((drug) => (
                  <div
                    key={drug.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all group"
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {drug.name}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          drug.qtcRisk === 'High' ? 'bg-rose-100 text-rose-700' :
                          drug.qtcRisk === 'Moderate' ? 'bg-amber-100 text-amber-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          QTc: {drug.qtcRisk}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{drug.class}</p>
                    </div>

                    <button
                      onClick={() => handleRemoveDrug(drug.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                      title="Remove from analysis"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Medication Picker */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Add Psychotropic or Primary Care Agent:
              </label>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleAddDrug(e.target.value);
                    e.target.value = '';
                  }
                }}
                defaultValue=""
                className="w-full text-xs font-medium py-2 px-3 rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="" disabled>+ Choose medication to add...</option>
                {availableDrugs.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.name} — ({d.class}) [QTc: {d.qtcRisk}]
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Clinical Guidance Reference Card */}
          <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-2 flex items-center gap-1.5">
              <Info className="w-4 h-4" />
              Clinical Practice Rule of Thumb
            </h3>
            <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <li>
                <strong className="text-white">Normal QTc:</strong> &lt;450 ms in males, &lt;460 ms in females.
              </li>
              <li>
                <strong className="text-white">Actionable Prolongation:</strong> QTc &gt;500 ms OR an increase of &gt;60 ms from baseline marks high risk for Torsades de Pointes.
              </li>
              <li>
                <strong className="text-white">Electrolyte Rule:</strong> Always verify Serum Potassium (&ge;4.0 mEq/L) and Magnesium (&ge;2.0 mg/dL) before starting high-potency QTc agents.
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Interaction & Risk Score Display (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Cumulative QTc Risk Meter Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Cumulative Repolarization Risk
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  Cardiac QTc Hazard Level
                </h3>
              </div>

              <div className={`px-3 py-1.5 rounded-xl border text-xs font-black tracking-wide ${qtcAnalysis.badgeColor}`}>
                {qtcAnalysis.level}
              </div>
            </div>

            {/* Visual Risk Gauge Meter */}
            <div className="space-y-1.5 mb-5">
              <div className="flex justify-between text-[11px] font-bold text-slate-500">
                <span>Calculated Risk Score: {qtcAnalysis.totalScore} / 10</span>
                <span>Threshold: &ge;5 Critical</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div
                  className={`h-full ${qtcAnalysis.barColor} transition-all duration-500 rounded-full`}
                  style={{ width: `${Math.min(100, Math.max(10, qtcAnalysis.totalScore * 12))}%` }}
                />
              </div>
            </div>

            {/* Assessment & Guidance Callout */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                  qtcAnalysis.totalScore >= 5 ? 'text-rose-600' :
                  qtcAnalysis.totalScore >= 3 ? 'text-amber-600' : 'text-emerald-600'
                }`} />
                <p className="text-xs font-bold text-slate-900 leading-snug">
                  {qtcAnalysis.warning}
                </p>
              </div>

              <div className="pl-6 text-xs text-slate-600 leading-relaxed">
                <strong>Recommended Surveillance:</strong> {qtcAnalysis.recommendation}
              </div>
            </div>

            {/* Individual Drug QTc Breakdown */}
            {selectedDrugs.length > 0 && (
              <div className="mt-5 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Specific Agent Profiles in Regimen:
                </h4>
                <div className="space-y-2">
                  {selectedDrugs.map(drug => (
                    <div key={drug.id} className="p-2.5 rounded-lg bg-slate-50 text-xs border border-slate-200/60">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900">{drug.name}</span>
                        <span className="text-[10px] font-semibold text-slate-500">Risk Factor: +{drug.qtcScore}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{drug.qtcDetails}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CYP450 Metabolic Collision Matrix */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <h3 className="text-base font-extrabold text-slate-900">
                  CYP450 Pharmacokinetic Collisions
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-500">
                {cypCollisions.length} {cypCollisions.length === 1 ? 'Collision' : 'Collisions'} Detected
              </span>
            </div>

            {cypCollisions.length === 0 ? (
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>No major CYP450 inhibitor/substrate bottlenecks detected between these agents.</span>
              </div>
            ) : (
              <div className="space-y-2.5">
                {cypCollisions.map((col, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-900">{col.type}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                        {col.severity} Severity
                      </span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      {col.explanation}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Serotonin Toxicity Alert */}
            {serotonergicCount >= 2 && (
              <div className="mt-3 p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-indigo-900 font-bold mb-0.5">
                    Additive Serotonergic Burden ({serotonergicCount} Agents)
                  </strong>
                  <p className="text-indigo-800 leading-relaxed text-[11px]">
                    Concurrent use of multiple serotonergic agents increases the risk of Serotonin Syndrome. Monitor for mental status changes, clonus, hyperreflexia, diaphoresis, and autonomic instability.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 1-Click Defensive EHR Documentation Generator */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">
                  Defensive Charting Utility
                </span>
                <h3 className="text-base font-bold text-white">
                  1-Click EHR Clinical Rationale Export
                </h3>
              </div>

              <button
                onClick={handleCopyDocumentation}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy EHR Note
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Ready-to-paste medicolegal documentation demonstrating informed consent, proactive arrhythmia risk review, and rationale for Tebra, Epic, or Kareo progress notes.
            </p>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-teal-300/90 whitespace-pre-wrap max-h-36 overflow-y-auto leading-relaxed">
{`[DRUG INTERACTION & CARDIAC QTc CLINICAL RATIONALE]
Regimen: ${selectedDrugs.map(d => d.name).join(' + ')}
Cumulative QTc Hazard: ${qtcAnalysis.level} (Score: ${qtcAnalysis.totalScore}/10)
Surveillance Plan: ${qtcAnalysis.recommendation}
${cypCollisions.length > 0 ? `Enzyme Collisions: ${cypCollisions.map(c => c.type).join(', ')}` : 'Enzyme Collisions: None noted.'}`}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

