import React, { useState, useMemo } from 'react';
import { 
  FlaskConical, 
  Copy, 
  Check, 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  Clock, 
  FileText, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Printer, 
  Info, 
  CheckCircle2, 
  AlertTriangle,
  HeartPulse,
  Droplets,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { 
  LAB_TIERS, 
  PSYCHIATRIC_LAB_TESTS, 
  LAB_PRESETS 
} from '../data/psychiatricLabPanels.js';

export default function StandardLabPanels() {
  // Selected Lab IDs
  const [selectedLabIds, setSelectedLabIds] = useState(
    new Set(LAB_PRESETS[0].testIds) // default to Tier 1: Universal Baseline
  );

  // Filters
  const [activeTierFilter, setActiveTierFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedLabId, setExpandedLabId] = useState(null);

  // Copy status
  const [copiedKey, setCopiedKey] = useState(null);

  const handleToggleLab = (id) => {
    setSelectedLabIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleApplyPreset = (testIds) => {
    setSelectedLabIds(new Set(testIds));
  };

  const handleSelectAll = () => {
    setSelectedLabIds(new Set(PSYCHIATRIC_LAB_TESTS.map(t => t.id)));
  };

  const handleClearAll = () => {
    setSelectedLabIds(new Set());
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Filtered labs
  const filteredLabs = useMemo(() => {
    return PSYCHIATRIC_LAB_TESTS.filter(test => {
      const matchesTier = activeTierFilter === 'all' || test.tierId === activeTierFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        test.name.toLowerCase().includes(q) ||
        test.alternativeNames.toLowerCase().includes(q) ||
        test.cptCode.toLowerCase().includes(q) ||
        test.psychiatricRationale.toLowerCase().includes(q);
      return matchesTier && matchesSearch;
    });
  }, [activeTierFilter, searchQuery]);

  // Selected tests objects
  const selectedTests = useMemo(() => {
    return PSYCHIATRIC_LAB_TESTS.filter(t => selectedLabIds.has(t.id));
  }, [selectedLabIds]);

  // Fasting count
  const fastingTestsCount = useMemo(() => {
    return selectedTests.filter(t => t.fastingRequired).length;
  }, [selectedTests]);

  // Selected tiers presence
  const hasTier2 = useMemo(() => selectedTests.some(t => t.tierId === 'tier2'), [selectedTests]);
  const hasTier3 = useMemo(() => selectedTests.some(t => t.tierId === 'tier3'), [selectedTests]);

  // Generate Tebra EHR MDM / Plan Note
  const generateEhrPlanNote = () => {
    if (selectedTests.length === 0) {
      return 'No laboratory tests currently selected.';
    }

    const testNamesList = selectedTests.map(t => t.name).join('; ');
    const cptList = selectedTests.map(t => `${t.name} (CPT ${t.cptCode})`).join(', ');

    let note = `PLAN / DIAGNOSTIC EVALUATION & LABORATORY WORKUP:
Provider: Monica Preder, ARNP, PMHNP-BC

1. LABORATORY REQUISITION ORDERED:
${selectedTests.map(t => `• ${t.name} (CPT: ${t.cptCode}) — ${t.fastingRequired ? 'FASTING REQUIRED' : 'Non-fasting'}`).join('\n')}

2. CLINICAL RATIONALE & MEDICAL NECESSITY:
Ordered standard psychiatric medical rule-out panel to evaluate organic, metabolic, and neuro-endocrine contributors to affective, anxiety, and cognitive symptoms, and to establish baseline organ safety prior to psychotropic pharmacotherapy.
`;

    if (selectedTests.some(t => t.id === 'a1c' || t.id === 'lipid_panel')) {
      note += `• Metabolic Surveillance: Fasting lipid panel and Hemoglobin A1c ordered to screen for glycemic dysregulation driving executive/attentional deficits and establish metabolic baseline for psychotropic safety.\n`;
    }
    if (selectedTests.some(t => t.id === 'tsh_ft4')) {
      note += `• Endocrine/Thyroid: TSH with reflex Free T4 ordered to rule out occult thyroid disease as primary etiology of mood/anxiety symptoms and verify baseline for pharmacotherapy.\n`;
    }
    if (selectedTests.some(t => t.id === 'cbc_diff' || t.id === 'cmp_14')) {
      note += `• Multi-System Safety: CBC with differential and CMP-14 ordered to evaluate for anemia, renal clearance (BUN/Cr/eGFR), hepatic function (ALT/AST), and electrolyte balance.\n`;
    }
    if (hasTier2) {
      note += `• Neuro-Nutrient & Dopamine Cofactors: B12, folate, 25-OH Vitamin D, magnesium, and ferritin evaluated to rule out micronutrient depletion driving cognitive fatigue, treatment-resistant depression, and inattention.\n`;
    }
    if (hasTier3) {
      note += `• Reproductive & Hormonal Stratum: Progesterone, estradiol, and/or prolactin ordered to evaluate cycle-linked affective exacerbation (PMDD), perimenopausal mood crashes, and antipsychotic-induced hyperprolactinemia.\n`;
    }

    note += `\n3. PATIENT EDUCATION & PREPARATION:
${fastingTestsCount > 0 ? '• Fasting Instructions: Patient advised that fasting (water only) for 8–12 hours prior to morning venipuncture is required for accurate lipid and metabolic parameters.\n' : '• Non-Fasting Draw: Patient advised no special fasting restrictions required.\n'}`;
    if (selectedTests.some(t => t.id === 'progesterone' || t.id === 'estrogen_estradiol')) {
      note += `• Hormonal Timing: Patient counseled on optimal menstrual cycle timing for draw (mid-luteal day 19–22 for progesterone; day 2–4 or mid-luteal for estradiol).\n`;
    }
    note += `• Follow-Up Plan: Results will be reviewed with patient via telehealth portal upon laboratory completion; treatment plan and pharmacotherapy titration will be adjusted based on objective findings.`;

    return note;
  };

  // Generate Patient Handout / Lab Prep
  const generatePatientHandout = () => {
    if (selectedTests.length === 0) {
      return 'No laboratory tests selected.';
    }

    return `PATIENT LABORATORY PREPARATION INSTRUCTIONS
Provider: Monica Preder, ARNP, PMHNP-BC • Washington Telehealth Practice

Dear Patient,
Monica Preder, ARNP has ordered a comprehensive baseline psychiatric lab panel to evaluate your physical health, rule out underlying medical causes of your symptoms (such as vitamin deficiencies or thyroid imbalances), and ensure any prescribed medications are completely safe for your body.

LABS ORDERED FOR YOU:
${selectedTests.map((t, idx) => `${idx + 1}. ${t.name} (${t.fastingRequired ? 'Fasting Required' : 'Non-Fasting'})`).join('\n')}

HOW TO PREPARE FOR YOUR BLOOD DRAW:
${fastingTestsCount > 0 ? `• FASTING REQUIRED (8 to 12 Hours):
  - Do NOT eat food or drink juice, milk, coffee, or soda for 8–12 hours before your blood draw.
  - DRINK PLENTY OF WATER! Staying well-hydrated makes finding your veins much easier and prevents dizziness.
  - Take your regular morning prescription medications with water unless specifically instructed otherwise.` : `• NO FASTING REQUIRED:
  - You may eat and drink normally before this blood draw. Staying well-hydrated with water is always recommended.`}

${selectedTests.some(t => t.id === 'progesterone' || t.id === 'estrogen_estradiol') ? `• SPECIAL MENSTRUAL CYCLE TIMING:
  - Because hormone levels change throughout the month, please schedule this blood draw during your mid-luteal phase (typically Day 19 to 22 of your cycle, counting Day 1 as the first day of your period), or on the exact days discussed during your appointment.
` : ''}
WHERE TO GO:
• You can take your requisition to any outpatient laboratory draw center (such as Labcorp or Quest Diagnostics).
• Please bring your photo ID and current medical insurance card.

AFTER YOUR DRAW:
• Routine lab results typically take 24 to 72 business hours to process.
• Monica will review your results thoroughly and discuss them with you during your next appointment or message you via your patient portal with personalized recommendations.`;
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-teal-50 border border-teal-200 rounded-xl text-teal-700">
                <FlaskConical className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                Standard Psychiatric Lab Panels &amp; Order Requisition
              </h1>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Standard of Care Diagnostic Workup, Specimen Fasting Protocols &amp; Insurance Billing Defense • Monica Preder, ARNP
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg font-bold text-slate-700">
              Selected: <span className="text-teal-700 font-extrabold">{selectedLabIds.size}</span> / {PSYCHIATRIC_LAB_TESTS.length}
            </div>
            <div className={`px-3 py-1.5 rounded-lg border font-bold ${
              fastingTestsCount > 0 
                ? 'bg-amber-50 border-amber-200 text-amber-800' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}>
              {fastingTestsCount > 0 ? `🌙 ${fastingTestsCount} Fasting Tests Required` : '☀️ 100% Non-Fasting'}
            </div>
          </div>
        </div>

        {/* 1-Click Clinical Presets */}
        <div className="mt-5 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            1-Click Clinical Presets:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {LAB_PRESETS.map((preset) => {
              const isSelected = preset.testIds.length === selectedLabIds.size && 
                preset.testIds.every(id => selectedLabIds.has(id));
              return (
                <button
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset.testIds)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-teal-50/80 border-teal-500 shadow-xs ring-1 ring-teal-500'
                      : 'bg-slate-50/70 border-slate-200/80 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-black text-xs text-slate-900">
                      {preset.name}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                      {preset.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {preset.shortDesc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid: Left = Lab Checklists & Details; Right = EHR Note & Patient Handout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Interactive Checkpoints (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Tier Tabs & Search */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                <button
                  onClick={() => setActiveTierFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    activeTierFilter === 'all'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All ({PSYCHIATRIC_LAB_TESTS.length})
                </button>
                {LAB_TIERS.map(tier => {
                  const count = PSYCHIATRIC_LAB_TESTS.filter(t => t.tierId === tier.id).length;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => setActiveTierFilter(tier.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                        activeTierFilter === tier.id
                          ? 'bg-teal-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {tier.shortName} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Bulk Actions */}
              <div className="flex items-center gap-2 self-end sm:self-auto text-[11px]">
                <button
                  onClick={handleSelectAll}
                  className="font-bold text-teal-700 hover:text-teal-900 underline"
                >
                  Select All
                </button>
                <span className="text-slate-300">|</span>
                <button
                  onClick={handleClearAll}
                  className="font-bold text-slate-500 hover:text-slate-800 underline"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search labs by name, CPT code, or clinical condition..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              />
            </div>
          </div>

          {/* Test Cards List */}
          <div className="space-y-3">
            {filteredLabs.map((lab) => {
              const isChecked = selectedLabIds.has(lab.id);
              const isExpanded = expandedLabId === lab.id;
              const tierObj = LAB_TIERS.find(t => t.id === lab.tierId);

              return (
                <div
                  key={lab.id}
                  className={`bg-white rounded-2xl border transition-all ${
                    isChecked 
                      ? 'border-teal-400 shadow-sm ring-1 ring-teal-400/30' 
                      : 'border-slate-200/80 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  {/* Top Row / Checkbox */}
                  <div className="p-4 flex items-start justify-between gap-3">
                    <label className="flex items-start gap-3.5 cursor-pointer flex-1 select-none">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleLab(lab.id)}
                        className="mt-1 w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                      />
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-sm font-black ${isChecked ? 'text-teal-950' : 'text-slate-800'}`}>
                            {lab.name}
                          </span>
                          <span className="font-mono text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            CPT: {lab.cptCode}
                          </span>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            lab.tierId === 'tier1' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : lab.tierId === 'tier2'
                              ? 'bg-sky-100 text-sky-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {tierObj?.shortName}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">
                          {lab.alternativeNames}
                        </p>
                      </div>
                    </label>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {lab.fastingRequired ? (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Fasting
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          Non-Fasting
                        </span>
                      )}

                      <button
                        onClick={() => setExpandedLabId(isExpanded ? null : lab.id)}
                        className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                        title={isExpanded ? 'Collapse Details' : 'Expand Clinical Details'}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Quick Rationale Snippet */}
                  <div className="px-4 pb-3 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5 bg-slate-50/50 rounded-b-2xl">
                    <strong className="text-slate-900 font-semibold">Psychiatric Rationale: </strong>
                    <span>{lab.psychiatricRationale}</span>
                  </div>

                  {/* Expanded In-Depth Clinical Drawer */}
                  {isExpanded && (
                    <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3.5 rounded-b-2xl text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-2.5 bg-white border border-slate-200 rounded-xl space-y-1">
                          <strong className="text-slate-900 font-bold block">Specimen &amp; Tube:</strong>
                          <span className="text-slate-600 font-medium">{lab.specimen}</span>
                          <p className="text-[11px] text-slate-500 italic mt-0.5">{lab.fastingNote}</p>
                        </div>
                        <div className="p-2.5 bg-white border border-slate-200 rounded-xl space-y-1">
                          <strong className="text-slate-900 font-bold block">Normal / Optimal Target:</strong>
                          <span className="text-teal-900 font-bold font-mono">{lab.normalRange}</span>
                        </div>
                      </div>

                      {/* Action Thresholds */}
                      <div className="space-y-1.5">
                        <strong className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
                          Clinical Action Thresholds:
                        </strong>
                        <div className="space-y-1.5">
                          {lab.actionThresholds.map((th, idx) => (
                            <div key={idx} className="p-2 bg-white border border-slate-200/80 rounded-lg space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded text-[11px]">
                                  {th.range}
                                </span>
                                <span className="font-bold text-slate-800 text-[11px]">{th.interpretation}</span>
                              </div>
                              <p className="text-slate-600 text-[11px] pl-1">
                                &rarr; <span className="font-medium">{th.action}</span>
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Insurance Medical Necessity Justifications */}
                      <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1.5">
                        <div className="flex items-center gap-1.5 text-amber-950 font-bold text-[11px]">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                          <span>Insurance Medical Necessity Justification Codes (ICD-10):</span>
                        </div>
                        <p className="text-[11px] text-amber-900 leading-normal">
                          Pair with these diagnostic codes to protect patients from out-of-pocket denials:
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {lab.icd10Justifications.map((icd, idx) => (
                            <span 
                              key={idx}
                              className="inline-flex items-center gap-1 font-mono text-[10px] font-bold bg-white border border-amber-300 text-amber-950 px-2 py-0.5 rounded shadow-2xs"
                              title={icd.desc}
                            >
                              <strong>{icd.code}</strong> ({icd.desc.slice(0, 24)}...)
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: EHR Note Exporter & Patient Handout (5 cols) */}
        <div className="lg:col-span-5 space-y-5 sticky top-28">
          
          {/* Insurance Guardrail Advisory Box */}
          {(hasTier2 || hasTier3) && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-amber-950 font-black text-xs">
                <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0" />
                <span>Insurance Medical Necessity Warning</span>
              </div>
              <p className="text-[11px] text-amber-900 leading-relaxed">
                You have selected <strong>Tier 2 (Neuro-Nutrients)</strong> or <strong>Tier 3 (Hormones)</strong>. In Washington State, commercial payers and Medicaid (Apple Health) may reject Vitamin D or Estrogen/Progesterone if billed under a generic depression code.
              </p>
              <div className="p-2.5 bg-white/90 border border-amber-200 rounded-lg text-[10px] space-y-1 text-slate-800">
                <strong className="block text-amber-950 font-bold">Recommended Billing Solution:</strong>
                <p>• For Vitamin D: Add <strong>E55.9 (Vitamin D deficiency)</strong> or <strong>R53.83 (Fatigue)</strong>.</p>
                <p>• For Ferritin / B12: Add <strong>E61.1 (Iron deficiency)</strong> or <strong>R41.844 (Brain fog)</strong>.</p>
                <p>• For Estrogen/Progesterone: Add <strong>F32.81 (PMDD)</strong> or <strong>N95.1 (Perimenopause)</strong>.</p>
              </div>
            </div>
          )}

          {/* Tebra EHR Plan / MDM Exporter */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-700" />
                <h2 className="text-sm font-black text-slate-900">
                  Tebra EHR Plan / MDM Note
                </h2>
              </div>
              <button
                onClick={() => copyToClipboard(generateEhrPlanNote(), 'ehr_note')}
                disabled={selectedTests.length === 0}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold transition-all disabled:opacity-50 shadow-xs cursor-pointer"
              >
                {copiedKey === 'ehr_note' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Note</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-slate-500 font-medium">
              Board-level clinical narrative ready to paste directly into your Tebra Assessment &amp; Plan / Medical Decision Making section.
            </p>

            <textarea
              readOnly
              value={generateEhrPlanNote()}
              rows={10}
              className="w-full font-mono text-[11px] leading-relaxed p-3.5 bg-slate-900 text-slate-100 rounded-xl border border-slate-800 select-all focus:outline-none resize-y"
            />
          </div>

          {/* Patient Preparation Handout */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <h2 className="text-sm font-black text-slate-900">
                  Patient Preparation Handout
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => window.print()}
                  className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                  title="Print Requisition / Handout"
                >
                  <Printer className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => copyToClipboard(generatePatientHandout(), 'patient_handout')}
                  disabled={selectedTests.length === 0}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
                >
                  {copiedKey === 'patient_handout' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-teal-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Handout</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-500">
              Clear, patient-friendly instructions explaining fasting requirements, cycle timing, and lab visit prep.
            </p>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl max-h-56 overflow-y-auto text-[11px] text-slate-700 whitespace-pre-line font-sans leading-relaxed">
              {generatePatientHandout()}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
