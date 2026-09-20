import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Stethoscope, 
  BookOpen, 
  Pill, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Layers, 
  Zap, 
  HeartPulse, 
  FileText,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

export default function CdsQuickConsultDrawer({ 
  isOpen, 
  onClose, 
  initialTab = 'dsm5',
  onSwitchToFullCds
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState('');

  // Update tab if initialTab changes on open
  React.useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden print:hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Slide-over Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-3xl bg-slate-900 border-l border-slate-700 shadow-2xl flex flex-col animate-in slide-in-from-right duration-250">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center flex-shrink-0 text-teal-400">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-white">
                    Clinical Decision Support (CDS) Co-Pilot
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">
                    In-Flight Reference
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Instant evidence-based guidance, DSM-5 criteria, drug dosing, and safety rules without leaving simulation.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {onSwitchToFullCds && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSwitchToFullCds();
                  }}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                  title="Switch main screen to full CDS platform"
                >
                  <span>Open Full CDS</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close Drawer (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tab Navigation & Search */}
          <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveTab('dsm5')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'dsm5'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>DSM-5 Criteria</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('medications')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'medications'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Pill className="w-3.5 h-3.5" />
                <span>Drug Dosing &amp; Pearls</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('interactions')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'interactions'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Interactions</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('safety')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'safety'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Safety &amp; Rules</span>
              </button>
            </div>

            {/* Quick Filter Search */}
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter criteria, drug, rule..."
                className="w-full pl-8 pr-3 py-1 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {/* Drawer Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs text-slate-200">
            
            {/* TAB 1: DSM-5 Criteria Quick-Cards */}
            {activeTab === 'dsm5' && (
              <div className="space-y-4">
                {/* Bipolar II Disorder vs MDD Alert */}
                <div className="bg-amber-950/30 border border-amber-500/50 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-extrabold text-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>The Unipolar Diagnostic Trap: Bipolar II vs. MDD</span>
                  </div>
                  <p className="text-amber-200/90 leading-relaxed text-xs">
                    Up to <strong>40% of patients diagnosed with Unipolar Major Depression actually have an unrecognized Bipolar Spectrum Illness</strong> (most frequently Bipolar II). Patients almost never present during hypomania because they feel productive, confident, and energetic; they present during the crushing depressive pole.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2 text-[11px]">
                    <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-teal-400 block font-bold">Bipolar II Hypomania (DSM-5):</strong>
                      <ul className="list-disc pl-3.5 space-y-0.5 text-slate-300">
                        <li>Distinct period of persistently elevated, expansive, or irritable mood &amp; energy for <strong>≥4 consecutive days</strong>.</li>
                        <li>≥3 symptoms (≥4 if irritable): Decreased need for sleep, grandiosity, pressured speech, racing thoughts, distractibility, psychomotor agitation, excessive goal-directed or risky behavior.</li>
                        <li><strong>No psychosis</strong> and <strong>no hospitalization required</strong> (psychosis automatically equals Bipolar I).</li>
                      </ul>
                    </div>
                    <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-red-400 block font-bold">The Lethal Clinical Trap:</strong>
                      <ul className="list-disc pl-3.5 space-y-0.5 text-slate-300">
                        <li>Prescribing <strong>SSRI or SNRI monotherapy</strong> (e.g. Escitalopram, Sertraline, Venlafaxine) causes <strong>acute manic switch, rapid cycling, mixed states, and elevated suicide risk</strong>.</li>
                        <li>First-line treatment: <strong>Quetiapine (Seroquel)</strong>, <strong>Lurasidone (Latuda)</strong>, or <strong>Lamotrigine (Lamictal)</strong>.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* DSM-5 Criteria Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <strong className="text-sm font-bold text-white block">Major Depressive Disorder (MDD)</strong>
                    <span className="text-[10px] text-teal-400 font-mono block">DSM-5 296.xx / F32.x - F33.x</span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      ≥5 of 9 SIGECAPS symptoms present for ≥2 weeks, representing a change from previous functioning, with at least one symptom being <strong>depressed mood</strong> or <strong>anhedonia</strong>.
                    </p>
                    <div className="text-[11px] text-slate-300 bg-slate-900 p-2 rounded border border-slate-800 font-mono">
                      S-I-G-E-C-A-P-S: Sleep, Interest, Guilt, Energy, Concentration, Appetite, Psychomotor, Suicidality.
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <strong className="text-sm font-bold text-white block">Generalized Anxiety Disorder (GAD)</strong>
                    <span className="text-[10px] text-teal-400 font-mono block">DSM-5 300.02 / F41.1</span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Excessive anxiety and worry occurring more days than not for <strong>≥6 months</strong> about a number of events/activities, difficult to control, with ≥3 of: restlessness, fatigue, impaired concentration, irritability, muscle tension, sleep disturbance.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Drug Dosing & Clinical Pearls */}
            {activeTab === 'medications' && (
              <div className="space-y-4">
                <div className="text-[11px] text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  💡 <strong>First-Line Prescribing Guidance for Bipolar Depression:</strong> SSRI monotherapy is contraindicated. FDA-approved atypical antipsychotics and mood stabilizers are first-line.
                </div>

                <div className="space-y-3">
                  {/* Quetiapine */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-teal-500/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <strong className="text-sm font-extrabold text-teal-300">Quetiapine (Seroquel / Seroquel XR)</strong>
                        <span className="text-[10px] text-teal-400 ml-2 font-mono">FDA Approved: Bipolar Depression</span>
                      </div>
                      <span className="text-[10px] bg-teal-950 border border-teal-800 text-teal-300 px-2 py-0.5 rounded font-bold">First-Line Choice</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1">
                      <div className="bg-slate-900 p-2 rounded">
                        <span className="text-slate-500 block text-[10px]">Starting Dose:</span>
                        <strong className="text-white">50 mg at bedtime</strong>
                      </div>
                      <div className="bg-slate-900 p-2 rounded">
                        <span className="text-slate-500 block text-[10px]">Titration Target:</span>
                        <strong className="text-white">Titrate to 300 mg qhs</strong> (by Day 4–7)
                      </div>
                      <div className="bg-slate-900 p-2 rounded">
                        <span className="text-slate-500 block text-[10px]">Clinical Pearls:</span>
                        <span className="text-slate-300">Potent H1 sedation treats severe insomnia on Day 1; 300mg needed for 5-HT2A/NET antidepressant action.</span>
                      </div>
                    </div>
                  </div>

                  {/* Lurasidone */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-teal-500/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <strong className="text-sm font-extrabold text-teal-300">Lurasidone (Latuda)</strong>
                        <span className="text-[10px] text-teal-400 ml-2 font-mono">FDA Approved: Bipolar Depression</span>
                      </div>
                      <span className="text-[10px] bg-teal-950 border border-teal-800 text-teal-300 px-2 py-0.5 rounded font-bold">Weight Neutral</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1">
                      <div className="bg-slate-900 p-2 rounded">
                        <span className="text-slate-500 block text-[10px]">Starting Dose:</span>
                        <strong className="text-white">20 mg daily with evening meal</strong>
                      </div>
                      <div className="bg-slate-900 p-2 rounded">
                        <span className="text-slate-500 block text-[10px]">Titration Target:</span>
                        <strong className="text-white">20 to 60 mg/day</strong> (max 120 mg/day)
                      </div>
                      <div className="bg-slate-900 p-2 rounded">
                        <span className="text-slate-500 block text-[10px]">Mandatory Rule:</span>
                        <span className="text-amber-300 font-medium">Must be taken with ≥350 calorie meal</span> (bioavailability drops 50% fasting).
                      </div>
                    </div>
                  </div>

                  {/* Lamotrigine */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <strong className="text-sm font-extrabold text-white">Lamotrigine (Lamictal)</strong>
                        <span className="text-[10px] text-slate-400 ml-2 font-mono">Mood Stabilizer (Maintenance)</span>
                      </div>
                      <span className="text-[10px] bg-rose-950 border border-rose-800 text-rose-300 px-2 py-0.5 rounded font-bold">Black Box: SJS / TEN</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      <strong>Mandatory Slow Titration:</strong> 25 mg/day × 2 weeks ➔ 50 mg/day × 2 weeks ➔ 100 mg/day × 1 week ➔ 200 mg/day target. 
                      <span className="text-rose-400 block mt-1 font-semibold">⚠️ NEVER start at 50mg or 100mg! Rapid titration causes life-threatening Stevens-Johnson Syndrome. Cannot treat acute depression rapidly due to 6-week titration delay.</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Drug Interactions & Synergies */}
            {activeTab === 'interactions' && (
              <div className="space-y-4">
                <div className="p-3 bg-red-950/40 border border-red-500/50 rounded-xl space-y-1 text-red-200 text-xs">
                  <div className="flex items-center gap-2 font-bold text-red-300">
                    <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span>Lethal &amp; High-Risk Psychiatric Interactions</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Always review active substances (alcohol, cannabis) and concurrent medications before signing orders.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                    <strong className="text-amber-400 text-xs block">Alcohol (Heavy Nightly) + SSRI / Antidepressants</strong>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Alcohol disrupts sleep architecture, causes 3:00 AM terminal awakenings from sympathetic rebound, exacerbates morning cognitive fog, and reduces the efficacy of serotonergic agents while increasing sedation and hepatic burden.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                    <strong className="text-rose-400 text-xs block">Zyprexa (Olanzapine) IM + Ativan (Lorazepam) IM</strong>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      <strong>Fatal interaction warning:</strong> Never co-administer IM Olanzapine and IM Lorazepam within 1–2 hours. Fatal synergistic respiratory arrest and profound hypotension have resulted.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                    <strong className="text-indigo-400 text-xs block">Lamotrigine + Valproate (Depakote) Interaction</strong>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Valproate inhibits hepatic UGT1A4 glucuronidation, <strong>more than doubling lamotrigine serum levels</strong>. Lamotrigine starting dose MUST be cut by ≥50% (start 25 mg every other day) to prevent toxic epidermal necrolysis.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Safety & Prescriber Rules */}
            {activeTab === 'safety' && (
              <div className="space-y-4">
                {/* 4 Golden Prescriber Rules */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block">
                    4 Golden Prescriber Second-Opinion Rules
                  </span>
                  
                  <div className="space-y-2 text-[11px]">
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <strong className="text-rose-400 block">1. Bipolar Manic Switch Rule:</strong>
                      <span className="text-slate-300">Screen with MDQ prior to any antidepressant trial. Un-adjuncted SSRI monotherapy causes severe manic switch and rapid cycling.</span>
                    </div>

                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <strong className="text-amber-400 block">2. Risperdal Consta 21-Day Oral Overlap:</strong>
                      <span className="text-slate-300">Polymer microspheres require 3 full weeks to degrade. Daily oral risperidone must continue for 21 days or patient will relapse.</span>
                    </div>

                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <strong className="text-indigo-400 block">3. Invega Sustenna Deltoid Loading:</strong>
                      <span className="text-slate-300">Day 1 (234 mg) &amp; Day 8 (156 mg) MUST be given in the DELTOID (28% higher vascular peak than gluteal). 0 oral overlap needed.</span>
                    </div>

                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <strong className="text-emerald-400 block">4. Neuroleptic Malignant Syndrome (NMS):</strong>
                      <span className="text-slate-300">FEVER tetrad (Fever, Encephalopathy, Vitals labile, Enzyme CK &gt;1,000, Rigidity lead-pipe). Stop antipsychotic, transfer to ED/ICU, give Dantrolene or Bromocriptine.</span>
                    </div>
                  </div>
                </div>

                {/* Oral-to-IM Conversion Ratios */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
                    Acute IM Crisis Conversion Ratios (~2:1 vs Oral)
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                    <div className="bg-slate-900 p-2 rounded">
                      <span className="text-slate-500 block text-[10px]">Haldol:</span>
                      <strong className="text-white">Oral 10mg ≈ Acute 5mg IM</strong>
                    </div>
                    <div className="bg-slate-900 p-2 rounded">
                      <span className="text-slate-500 block text-[10px]">Zyprexa:</span>
                      <strong className="text-white">Oral 10mg ≈ Acute 5-10mg IM</strong>
                    </div>
                    <div className="bg-slate-900 p-2 rounded">
                      <span className="text-slate-500 block text-[10px]">Geodon:</span>
                      <strong className="text-white">Oral 40mg ≈ Acute 10mg IM</strong>
                    </div>
                    <div className="bg-slate-900 p-2 rounded">
                      <span className="text-slate-500 block text-[10px]">Abilify:</span>
                      <strong className="text-white">Oral 10mg ≈ Acute 9.75mg IM</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Drawer Footer */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-teal-400" />
              <span>Evidence base: APA Guidelines, DSM-5-TR &amp; Maudsley Prescribing Guidelines</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold text-xs transition"
            >
              Resume Simulation
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
