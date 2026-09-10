import React, { useState } from 'react';
import guidelinesData from '../data/guidelines.json';
import { GitFork, CheckCircle2, ArrowRight, ShieldAlert, Sparkles, Filter } from 'lucide-react';

export default function DecisionTreeWizard() {
  const [selectedConditionId, setSelectedConditionId] = useState('mdd');
  const [activeModifiers, setActiveModifiers] = useState([]);

  const currentPathway = guidelinesData.pathways.find(p => p.conditionId === selectedConditionId);

  const modifiers = [
    { id: 'insomnia', label: 'Comorbid Insomnia / Poor Sleep' },
    { id: 'fatigue', label: 'Fatigue / Lethargy / Sluggishness' },
    { id: 'sexual', label: 'Sexual Side Effect Sensitivity' },
    { id: 'weight', label: 'Weight Gain Sensitivity' },
    { id: 'substance', label: 'Substance Use Disorder History' },
    { id: 'cardiac', label: 'Cardiac Sensitivity / Hypertension' },
  ];

  const toggleModifier = (id) => {
    setActiveModifiers(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  // Helper to determine if an agent is tailored based on active modifiers
  const getModifierHighlight = (agentName) => {
    const name = agentName.toLowerCase();
    const highlights = [];
    if (activeModifiers.includes('insomnia') && name.includes('mirtazapine')) {
      highlights.push('⭐ High affinity: Restores sleep architecture via 5-HT2A & H1 antagonism.');
    }
    if (activeModifiers.includes('fatigue') && (name.includes('bupropion') || name.includes('fluoxetine'))) {
      highlights.push('⭐ High affinity: Activating/energizing noradrenergic & dopaminergic tone.');
    }
    if (activeModifiers.includes('sexual') && (name.includes('bupropion') || name.includes('mirtazapine'))) {
      highlights.push('⭐ High affinity: Zero or minimal risk of serotonergic sexual dysfunction.');
    }
    if (activeModifiers.includes('weight') && name.includes('bupropion')) {
      highlights.push('⭐ High affinity: Weight-neutral or mild weight loss.');
    }
    if (activeModifiers.includes('substance') && name.includes('atomoxetine')) {
      highlights.push('⭐ Preferred: Non-controlled Schedule VI with zero abuse/diversion potential.');
    }
    if (activeModifiers.includes('cardiac') && name.includes('sertraline')) {
      highlights.push('⭐ Preferred: Documented cardiac safety profile (SADHART trial).');
    }
    return highlights;
  };

  return (
    <div className="space-y-6">
      {/* Condition Selector */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-900">Evidence-Based Step-Therapy Pathways</h2>
            <p className="text-xs text-slate-500 mt-0.5">APA, CANMAT, and Maudsley guideline-adherent prescribing algorithms.</p>
          </div>

          <div className="flex gap-2">
            {guidelinesData.pathways.map(p => (
              <button
                key={p.conditionId}
                onClick={() => setSelectedConditionId(p.conditionId)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedConditionId === p.conditionId
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {p.conditionName}
              </button>
            ))}
          </div>
        </div>

        {/* Patient Modifiers Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 mb-2.5">
            <Filter className="w-3.5 h-3.5 text-teal-600" />
            <span>Select Patient Specific Modifiers (Highlights Tailored Options):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {modifiers.map(m => (
              <button
                key={m.id}
                onClick={() => toggleModifier(m.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeModifiers.includes(m.id)
                    ? 'bg-teal-100 text-teal-800 border border-teal-300 font-bold'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pathway Overview Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        {/* Diagnostic Snapshot & Rule-outs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200/70">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">DSM-5-TR Diagnostic Core</span>
            <p className="text-xs text-slate-800 font-medium leading-relaxed">{currentPathway.diagnosticCriteriaSummary}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Essential Rule-Outs Prior to Rx</span>
            <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
              {currentPathway.ruleOuts.map((ro, i) => (
                <li key={i} className="text-slate-800 font-medium">{ro}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Step 1: First Line */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">1</div>
            <h3 className="text-base font-bold text-slate-900">First-Line Pharmacotherapy</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentPathway.firstLine.map((fl, i) => {
              const highlights = getModifierHighlight(fl.agent);
              return (
                <div key={i} className={`p-4 rounded-xl border transition-all ${highlights.length > 0 ? 'border-teal-400 bg-teal-50/40 shadow-sm ring-1 ring-teal-400/30' : 'border-slate-200 bg-white'}`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-black text-slate-900 text-sm">{fl.agent}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">1st Line</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2">{fl.rationale}</p>
                  {highlights.map((h, hi) => (
                    <p key={hi} className="text-[11px] font-bold text-teal-800 bg-white/80 p-2 rounded-lg border border-teal-200">{h}</p>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Second Line / Alternatives */}
        {(currentPathway.secondLine || currentPathway.nonStimulantAlternatives || currentPathway.adjunctiveOptions) && (
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-slate-700 text-white text-xs font-bold flex items-center justify-center">2</div>
              <h3 className="text-base font-bold text-slate-900">
                {currentPathway.conditionId === 'adhd' ? 'Non-Stimulant & Off-Label Alternatives' : currentPathway.conditionId === 'gad' ? 'Adjunctive & Second-Line Options' : 'Second-Line Class Switch'}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(currentPathway.secondLine || currentPathway.nonStimulantAlternatives || currentPathway.adjunctiveOptions).map((sl, i) => {
                const highlights = getModifierHighlight(sl.agent);
                return (
                  <div key={i} className={`p-4 rounded-xl border transition-all ${highlights.length > 0 ? 'border-teal-400 bg-teal-50/40 shadow-sm ring-1 ring-teal-400/30' : 'border-slate-200 bg-white'}`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-black text-slate-900 text-sm">{sl.agent}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">2nd Line</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-2">{sl.rationale}</p>
                    {highlights.map((h, hi) => (
                      <p key={hi} className="text-[11px] font-bold text-teal-800 bg-white/80 p-2 rounded-lg border border-teal-200">{h}</p>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Augmentation Strategies */}
        {currentPathway.augmentationStrategies && (
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-purple-700 text-white text-xs font-bold flex items-center justify-center">3</div>
              <h3 className="text-base font-bold text-slate-900">Evidence-Based Augmentation Strategies</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentPathway.augmentationStrategies.map((aug, i) => (
                <div key={i} className="p-4 rounded-xl border border-purple-100 bg-purple-50/30">
                  <span className="font-bold text-purple-950 text-xs block mb-1">{aug.strategy}</span>
                  <p className="text-xs text-purple-900/80 leading-relaxed">{aug.rationale}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

