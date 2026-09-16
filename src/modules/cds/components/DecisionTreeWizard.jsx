import React, { useState } from 'react';
import guidelinesData from '../data/guidelines.json';
import { 
  GitFork, 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert, 
  Sparkles, 
  Filter, 
  Search, 
  Brain, 
  Layers, 
  AlertTriangle,
  HeartHandshake,
  Pill,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';

export default function DecisionTreeWizard() {
  const [selectedConditionId, setSelectedConditionId] = useState('bipolar');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModifiers, setActiveModifiers] = useState([]);
  const [copiedKey, setCopiedKey] = useState(null);

  const categories = [
    'All',
    'Mood & Psychosis',
    'Anxiety & Trauma',
    'Substance & Impulse',
    'Neuro & Personality'
  ];

  const currentPathway = guidelinesData.pathways.find(p => p.conditionId === selectedConditionId) || guidelinesData.pathways[0];

  const modifiers = [
    { id: 'insomnia', label: 'Comorbid Insomnia / Poor Sleep' },
    { id: 'fatigue', label: 'Fatigue / Lethargy / Sluggishness' },
    { id: 'sexual', label: 'Sexual Side Effect Sensitivity' },
    { id: 'weight', label: 'Weight Gain Sensitivity' },
    { id: 'substance', label: 'Substance Use Disorder History' },
    { id: 'cardiac', label: 'Cardiac Sensitivity / QTc Prolongation' },
    { id: 'hepatic', label: 'Hepatic Impairment / Cirrhosis' },
  ];

  const toggleModifier = (id) => {
    setActiveModifiers(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Filter pathways based on category and search query
  const filteredPathways = guidelinesData.pathways.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.conditionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.diagnosticCriteriaSummary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Helper to determine if an agent is tailored based on active modifiers
  const getModifierHighlight = (agentName) => {
    const name = agentName.toLowerCase();
    const highlights = [];
    if (activeModifiers.includes('insomnia') && (name.includes('mirtazapine') || name.includes('quetiapine') || name.includes('trazodone'))) {
      highlights.push('⭐ High affinity: Restores sleep architecture via 5-HT2A & H1 antagonism.');
    }
    if (activeModifiers.includes('fatigue') && (name.includes('bupropion') || name.includes('fluoxetine') || name.includes('aripiprazole'))) {
      highlights.push('⭐ High affinity: Activating noradrenergic & dopaminergic tone.');
    }
    if (activeModifiers.includes('sexual') && (name.includes('bupropion') || name.includes('mirtazapine') || name.includes('viloxazine') || name.includes('buspirone'))) {
      highlights.push('⭐ High affinity: Zero or minimal risk of serotonergic sexual dysfunction.');
    }
    if (activeModifiers.includes('weight') && (name.includes('bupropion') || name.includes('aripiprazole') || name.includes('lurasidone') || name.includes('cariprazine') || name.includes('topiramate'))) {
      highlights.push('⭐ High affinity: Weight-neutral or favorable metabolic profile.');
    }
    if (activeModifiers.includes('substance') && (name.includes('atomoxetine') || name.includes('acamprosate') || name.includes('naltrexone') || name.includes('nac') || name.includes('buspirone') || name.includes('hydroxyzine'))) {
      highlights.push('⭐ Preferred: Non-controlled Schedule VI with zero abuse/diversion potential.');
    }
    if (activeModifiers.includes('cardiac') && (name.includes('sertraline') || name.includes('aripiprazole'))) {
      highlights.push('⭐ Preferred: Documented cardiac and minimal QTc prolongation profile.');
    }
    if (activeModifiers.includes('hepatic') && (name.includes('acamprosate') || name.includes('paliperidone'))) {
      highlights.push('⭐ Preferred: Predominantly renally eliminated; avoids extensive hepatic metabolism.');
    }
    return highlights;
  };

  const getEhrPathwaySummary = () => {
    return `CLINICAL DECISION SUPPORT - STEP-THERAPY PATHWAY:
• TARGET DIAGNOSIS: ${currentPathway.conditionName}
• DIAGNOSTIC SUMMARY: ${currentPathway.diagnosticCriteriaSummary}
• EVIDENCE-BASED PSYCHOTHERAPY: ${currentPathway.psychotherapyFirstOrAdjunct || 'CBT / Supportive'}
• FIRST-LINE RECOMMENDATION: ${currentPathway.firstLine.map(f => f.agent).join(', ')}
• SECOND-LINE / ALTERNATIVE: ${(currentPathway.secondLine || currentPathway.nonStimulantAlternatives || currentPathway.adjunctiveOptions || []).map(s => s.agent).join(', ')}
• AUGMENTATION STRATEGIES: ${(currentPathway.augmentationStrategies || []).map(a => a.strategy).join('; ')}
• KEY RULE-OUTS DOCUMENTED: ${currentPathway.ruleOuts.join(', ')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header & Condition Selector */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                APA • CANMAT • Maudsley Prescribing Guidelines
              </span>
              <span className="text-xs font-bold text-slate-500">
                {guidelinesData.pathways.length} Algorithms Available
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Evidence-Based Step-Therapy Pathways
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Structured psychiatric prescribing algorithms, evidence-based psychotherapy recommendations, and clinical rule-outs.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search disorder (e.g. Bipolar, PTSD)..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Condition Buttons Bar */}
        <div className="flex flex-wrap gap-2 pt-1 max-h-48 overflow-y-auto pr-1">
          {filteredPathways.map((p) => (
            <button
              key={p.conditionId}
              onClick={() => setSelectedConditionId(p.conditionId)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedConditionId === p.conditionId
                  ? 'bg-teal-600 text-white shadow-xs ring-2 ring-teal-600/30'
                  : 'bg-slate-50 text-slate-700 border border-slate-200/90 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              {p.conditionName}
            </button>
          ))}
        </div>

        {/* Patient Modifiers Bar */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 mb-2">
            <Filter className="w-3.5 h-3.5 text-teal-600" />
            <span>Select Patient-Specific Modifiers (Highlights Tailored Agents):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {modifiers.map(m => (
              <button
                key={m.id}
                onClick={() => toggleModifier(m.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  activeModifiers.includes(m.id)
                    ? 'bg-teal-100 text-teal-900 border border-teal-300 font-bold'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pathway Detail Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        {/* Pathway Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                {currentPathway.category}
              </span>
              <span className="text-xs text-slate-500 font-semibold">Algorithm ID: {currentPathway.conditionId.toUpperCase()}</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              {currentPathway.conditionName}
            </h2>
          </div>

          <button
            onClick={() => copyToClipboard(getEhrPathwaySummary(), 'ehr_pathway_summary')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0"
          >
            {copiedKey === 'ehr_pathway_summary' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            Copy Pathway Summary for EHR
          </button>
        </div>

        {/* Diagnostic Snapshot & Rule-outs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200/80">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              DSM-5-TR Diagnostic Core
            </span>
            <p className="text-xs text-slate-800 font-medium leading-relaxed">
              {currentPathway.diagnosticCriteriaSummary}
            </p>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Essential Clinical Rule-Outs Prior to Rx
            </span>
            <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
              {currentPathway.ruleOuts.map((ro, i) => (
                <li key={i} className="text-slate-800 font-medium">{ro}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Psychotherapy First-Line or Adjunctive Guidance */}
        {currentPathway.psychotherapyFirstOrAdjunct && (
          <div className="p-4 bg-amber-50/70 border border-amber-200/90 rounded-xl">
            <div className="flex items-center gap-2 mb-1.5 text-xs font-black text-amber-900 uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4 text-amber-700" />
              <span>Evidence-Based Psychotherapy & Behavioral Protocol:</span>
            </div>
            <p className="text-xs text-slate-800 font-medium leading-relaxed">
              {currentPathway.psychotherapyFirstOrAdjunct}
            </p>
          </div>
        )}

        {/* Step 1: First Line */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-black flex items-center justify-center shadow-xs">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Step 1: First-Line Pharmacotherapy / Primary Intervention
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentPathway.firstLine.map((fl, i) => {
              const highlights = getModifierHighlight(fl.agent);
              return (
                <div 
                  key={i} 
                  className={`p-4 rounded-xl border transition-all ${
                    highlights.length > 0 
                      ? 'border-teal-400 bg-teal-50/50 shadow-xs ring-1 ring-teal-400/40' 
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-black text-slate-900 text-sm">{fl.agent}</span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded">
                      Step 1
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2">{fl.rationale}</p>
                  {highlights.map((h, hi) => (
                    <p key={hi} className="text-[11px] font-bold text-teal-900 bg-white/90 p-2 rounded-lg border border-teal-300 mt-1">
                      {h}
                    </p>
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
              <div className="w-6 h-6 rounded-full bg-slate-700 text-white text-xs font-black flex items-center justify-center shadow-xs">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Step 2: Second-Line Class Switch & Alternative Options
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(currentPathway.secondLine || currentPathway.nonStimulantAlternatives || currentPathway.adjunctiveOptions).map((sl, i) => {
                const highlights = getModifierHighlight(sl.agent);
                return (
                  <div 
                    key={i} 
                    className={`p-4 rounded-xl border transition-all ${
                      highlights.length > 0 
                        ? 'border-teal-400 bg-teal-50/50 shadow-xs ring-1 ring-teal-400/40' 
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-black text-slate-900 text-sm">{sl.agent}</span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded">
                        Step 2
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-2">{sl.rationale}</p>
                    {highlights.map((h, hi) => (
                      <p key={hi} className="text-[11px] font-bold text-teal-900 bg-white/90 p-2 rounded-lg border border-teal-300 mt-1">
                        {h}
                      </p>
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
              <div className="w-6 h-6 rounded-full bg-indigo-700 text-white text-xs font-black flex items-center justify-center shadow-xs">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Step 3: Evidence-Based Augmentation Strategies & Specialized Interventions
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentPathway.augmentationStrategies.map((aug, i) => (
                <div key={i} className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/30">
                  <span className="font-bold text-indigo-950 text-xs block mb-1">{aug.strategy}</span>
                  <p className="text-xs text-indigo-900/80 leading-relaxed">{aug.rationale}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
