import React, { useState, useEffect } from 'react';
import {
  X,
  BookOpen,
  Compass,
  Stethoscope,
  FileText,
  FastForward,
  Award,
  Building2,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Pill,
  Brain,
  Clock,
  Users,
  ArrowRight,
  Sliders,
  Sparkles,
  HelpCircle,
  Activity,
  Layers,
  Check,
  Scale
} from 'lucide-react';

export default function FlightManualModal({
  isOpen,
  onClose,
  onOpenFlightConfig,
  currentSetting = 'outpatient'
}) {
  const [activeTab, setActiveTab] = useState('overview');

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white tracking-tight">Clinical Flight Simulator Manual</h2>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-700/60">
                  Prescriber Guide
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Operator instructions, clinical testing structure, and grading rubrics for psychiatric medication prescribers.
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close Flight Manual (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-slate-800 bg-slate-900/50 flex gap-2 overflow-x-auto scrollbar-none py-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>1. Scope &amp; Philosophy</span>
          </button>

          <button
            onClick={() => setActiveTab('outpatient')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'outpatient'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>2. Outpatient Solo Flight (Marcus Vance)</span>
          </button>

          <button
            onClick={() => setActiveTab('inpatient')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'inpatient'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>3. Inpatient 16-Bed Ward Flight (Unit 4-West)</span>
          </button>

          <button
            onClick={() => setActiveTab('rubric')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'rubric'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>4. Scoring &amp; Competency Rubric</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300 leading-relaxed max-h-[calc(92vh-160px)]">
          
          {/* ── TAB 1: OVERVIEW & SCOPE ── */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-teal-950/50 to-slate-900 border border-teal-700/40 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-teal-500/10 text-teal-300 rounded-lg border border-teal-500/20 shrink-0 mt-0.5">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-black text-white">Why a "Flight Simulator" for Psychiatry?</h3>
                    <p className="text-xs text-slate-300">
                      In aviation, pilots log hundreds of simulator hours experiencing dual engine flameouts, microbursts, and crosswinds so when emergencies happen in the cockpit, their reaction is reflexive and safe.
                    </p>
                    <p className="text-xs text-slate-300">
                      The Clinical Flight Simulator brings this exact pedagogy to psychiatric prescribing. Instead of waiting years to encounter rare, catastrophic psychopharmacology dilemmas—such as an antidepressant-induced manic switch, Clozapine neutropenia, acute CIWA delirium, or involuntary medication refusal—you can test your decision-making safely in high-fidelity simulated environments.
                    </p>
                  </div>
                </div>
              </div>

              {/* Strict Scope Clarity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-950/30 border border-emerald-700/40 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Your Prescriber Scope (Evaluated)</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    The simulator strictly benchmarks your responsibilities as a <strong>Psychiatric Medication Provider (ARNP / PMHNP)</strong>:
                  </p>
                  <ul className="text-xs space-y-2 text-slate-300">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Accurate Diagnosis:</strong> Differentiating unipolar depression from bipolar spectrum, schizoaffective from substance psychosis.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Pharmacology &amp; Route Selection:</strong> Choosing oral vs. orally disintegrating (ODT) vs. IM routes based on clinical urgency and patient cooperation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Safety &amp; REMS Monitoring:</strong> Ordering baseline metabolic labs, ECGs, TSH, Absolute Neutrophil Count (ANC), and serum levels (Lithium/Valproate).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Refusal Management:</strong> Differentiating when to negotiate alternative formulations vs. when involuntary emergency protocols are legally triggered.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider">
                    <Users className="w-4 h-4 text-indigo-400" />
                    <span>Handled by Interprofessional Team</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    You do not have to perform non-psychiatric medical care or legal clerk duties:
                  </p>
                  <ul className="text-xs space-y-2 text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 font-bold">•</span>
                      <span><strong>Internal Medicine Consult:</strong> Primary care workups, acute renal failure management, severe infection, or surgical clearances.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 font-bold">•</span>
                      <span><strong>Social Work &amp; Legal:</strong> Submitting court filings, contacting family guardians, arranging housing, or navigating civil commitment paperwork.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 font-bold">•</span>
                      <span><strong>Inpatient Nursing:</strong> Administering scheduled vitals, daily meal tracking, routine hygiene, and non-emergent unit milieu security.</span>
                    </li>
                  </ul>
                  <p className="text-[11px] text-indigo-300/80 italic pt-1">
                    Your role is to place clear, safe psychiatric orders and consult appropriate services when medical or legal red flags appear.
                  </p>
                </div>
              </div>

              {/* Simulator Environments */}
              <div className="border-t border-slate-800 pt-4">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Two Available Flight Environments</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-teal-400 block">Solo Outpatient Telehealth</span>
                      <span className="text-[11px] text-slate-400">1 Client / In-depth Diagnostic &amp; Longitudinal Follow-Up</span>
                    </div>
                    <button
                      onClick={() => setActiveTab('outpatient')}
                      className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-lg font-semibold flex items-center gap-1"
                    >
                      Guide <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-indigo-400 block">Acute Inpatient Residency Ward</span>
                      <span className="text-[11px] text-slate-400">16 Involuntary Beds / Morning Triage &amp; Bedside Rounds</span>
                    </div>
                    <button
                      onClick={() => setActiveTab('inpatient')}
                      className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-lg font-semibold flex items-center gap-1"
                    >
                      Guide <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 2: OUTPATIENT FLIGHT GUIDE ── */}
          {activeTab === 'outpatient' && (
            <div className="space-y-6">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-500/10 text-teal-400 rounded-lg">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Outpatient Scenario: Marcus Vance, 34yo Software Architect</h3>
                    <p className="text-xs text-slate-400">Chief Complaint: "Depression and crushing exhaustion for 6 weeks."</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">The 4 Flight Phases: How You Are Tested</h4>

                {/* Step 1 */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-teal-400 flex items-center gap-1.5 uppercase">
                      <Stethoscope className="w-4 h-4" /> Phase 1: Virtual Exam Room &amp; Clue Hunting
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">25 Points</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Marcus presents looking like a textbook Major Depressive Episode. However, there are <strong>4 hidden clinical traps</strong> buried in his history.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                    <div className="p-2 bg-slate-950/80 rounded border border-slate-800">
                      <span className="font-bold text-amber-400 block">1. Hypomania Trap:</span>
                      Ask about energy surges, racing thoughts, or decreased sleep needs (reveals his 4-day stock-trading episode).
                    </div>
                    <div className="p-2 bg-slate-950/80 rounded border border-slate-800">
                      <span className="font-bold text-amber-400 block">2. Hidden Suicidality:</span>
                      Probe directly into passive death wishes vs. active plans (reveals stockpiled pills and lethality risk).
                    </div>
                    <div className="p-2 bg-slate-950/80 rounded border border-slate-800">
                      <span className="font-bold text-amber-400 block">3. Covert Alcohol Use:</span>
                      Ask about drinking habits (reveals a bottle of wine nightly to self-medicate insomnia).
                    </div>
                    <div className="p-2 bg-slate-950/80 rounded border border-slate-800">
                      <span className="font-bold text-amber-400 block">4. Genetic Family Clue:</span>
                      Ask about family psychiatric history (reveals his mother has Bipolar I successfully stabilized on Lithium).
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 italic">
                    How to play: Click the pre-scripted probe buttons or type custom questions in the chat box. When you uncover a clue, an illuminated badge appears.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-teal-400 flex items-center gap-1.5 uppercase">
                      <FileText className="w-4 h-4" /> Phase 2: Chart &amp; Orders (Prescribing Pad)
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">25 Points</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Once you gather enough information, click <strong>"Proceed to Chart &amp; Orders"</strong>. Here you formulate your clinical strategy:
                  </p>
                  <ul className="text-xs space-y-1.5 text-slate-300 list-disc list-inside">
                    <li><strong>Diagnostic Decision:</strong> Choose between MDD vs. Bipolar II Disorder vs. Cyclothymia.</li>
                    <li><strong>Medication Choice:</strong> Pick the psychotropic (e.g. Quetiapine, Lurasidone, Lamotrigine vs. Escitalopram, Sertraline, Bupropion).</li>
                    <li><strong>Starting Dose &amp; Titration:</strong> Specify safe initial dosing and slow upward titration.</li>
                    <li><strong>Safety Labs:</strong> Select essential baseline tests (CMP, Lipid Panel, HbA1c, TSH, ECG).</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-teal-400 flex items-center gap-1.5 uppercase">
                      <FastForward className="w-4 h-4" /> Phase 3: Time Jump Engine (Consequences)
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">Longitudinal Simulation</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    The simulator leaps 4 to 8 weeks into the future to reveal what actually happened to Marcus based on your exact prescription:
                  </p>
                  <div className="p-2.5 bg-slate-950 rounded border border-slate-800 text-xs space-y-1.5">
                    <p className="text-rose-300">
                      <strong>If you prescribed SSRI Monotherapy (e.g., Lexapro):</strong> Marcus undergoes a rapid antidepressant-induced hypomanic switch with insomnia, erratic spending, and increased irritability.
                    </p>
                    <p className="text-emerald-300">
                      <strong>If you prescribed Evidence-Based Bipolar Depression Therapy (e.g., Seroquel or Latuda):</strong> Marcus enters euthymic remission with PHQ-9 dropping to 4 and restoration of sleep architecture.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-teal-400 flex items-center gap-1.5 uppercase">
                      <Award className="w-4 h-4" /> Phase 4: Preceptor Debrief &amp; Scorecard
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">100-Point Scorecard</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    A clinical preceptor evaluates your decision-making across Diagnostic Accuracy (25%), Safety &amp; Pharmacology (30%), Interview Acuity (25%), and Monitoring Strategy (20%).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 3: INPATIENT RESIDENCY WARD GUIDE ── */}
          {activeTab === 'inpatient' && (
            <div className="space-y-6">
              <div className="bg-indigo-950/40 border border-indigo-700/50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Inpatient Setting: Unit 4-West Acute Psychiatric Ward</h3>
                    <p className="text-xs text-indigo-300">
                      16-Bed Census • Morning Rounds 08:30 AM • Involuntary Commitments &amp; Medication Refusals
                    </p>
                  </div>
                </div>
              </div>

              {/* How to Launch */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                <span className="text-xs font-black text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-4 h-4" /> How to Switch to Inpatient Mode
                </span>
                <p className="text-xs text-slate-300">
                  Click the <strong>"Flight Parameters"</strong> button in the top navigation bar. Select <strong>"Acute Inpatient Ward (16 Beds)"</strong> and click <strong>"Initialize Ward Simulation"</strong>.
                </p>
              </div>

              {/* Inpatient Rounding Workflow */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">The Inpatient Prescriber Workflow</h4>

                {/* Triage */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px] font-black">1</span>
                      Morning Census Board Triage
                    </span>
                    <span className="text-[11px] text-indigo-400 font-semibold">Triage &amp; Prioritization</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Use the 4 quick triage filters to identify which beds require your immediate attention before rounding:
                  </p>
                  <ul className="text-xs space-y-1 text-slate-400 list-disc list-inside">
                    <li><strong className="text-amber-400">Involuntary (ITA):</strong> Patients under legal holds with active countdown timers for court review.</li>
                    <li><strong className="text-rose-400">Medication Refusal:</strong> Patients who refused their morning psychiatric medications during nursing shift.</li>
                    <li><strong className="text-purple-400">Critical / High Acuity:</strong> Severe withdrawal (CIWA &gt; 18), active psychosis, or high fall/violence flags.</li>
                    <li><strong className="text-emerald-400">Ready for Discharge:</strong> Stabilized patients requiring prescription reconciliation.</li>
                  </ul>
                </div>

                {/* Bedside Rounding */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px] font-black">2</span>
                      Bedside Prescriber Encounter
                    </span>
                    <span className="text-[11px] text-teal-400 font-semibold">Interactive Dialogue</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Click <strong>"Conduct Morning Rounds"</strong> on any bed to enter the patient's bedside chart:
                  </p>
                  <ul className="text-xs space-y-1.5 text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 font-bold">•</span>
                      <span><strong>Review Overnight Nursing Note:</strong> Identifies medication compliance, sleep hours, agitation episodes, and PRN usage.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 font-bold">•</span>
                      <span><strong>Bedside Probes:</strong> Ask targeted questions to assess orientation, delusional content, side effects, and reasons for refusal (e.g. pill size, sedation, dry mouth, or paranoid conspiracy).</span>
                    </li>
                  </ul>
                </div>

                {/* Prescriber Rounding Pad */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px] font-black">3</span>
                      Executing Orders: Oral vs. ODT vs. Emergency IM
                    </span>
                    <span className="text-[11px] text-rose-400 font-semibold">Refusal Strategy</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    This is the central test of an inpatient psychiatric prescriber. How do you handle medication refusal?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                    <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                      <span className="font-bold text-teal-400 block mb-1">1. Non-Violent Refusal (First Line):</span>
                      Negotiate with alternative formulations (e.g., orally disintegrating tablets [ODT], liquid concentrates) or switch to a lower-side-effect alternative.
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                      <span className="font-bold text-rose-400 block mb-1">2. Acute Danger / Exhausted Voluntariness:</span>
                      If the patient is under civil commitment and actively aggressive, escalating, or delirious, trigger the legal Emergency Involuntary IM Protocol.
                    </div>
                  </div>
                </div>

                {/* Debrief */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px] font-black">4</span>
                      Attending Psychopharmacologist Debrief
                    </span>
                    <span className="text-[11px] text-indigo-400 font-semibold">Ward Evaluation</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Once you've rounded on patients, click <strong>"Complete Morning Rounds &amp; Debrief"</strong> to receive your attending evaluation, clinical feedback, and residency rank.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 4: SCORING & COMPETENCY RUBRIC ── */}
          {activeTab === 'rubric' && (
            <div className="space-y-6">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <h3 className="text-sm font-bold text-white mb-1">Prescriber Competency Rubric</h3>
                <p className="text-xs text-slate-400">
                  How the simulator algorithm calculates your clinical competence and safety score:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Domain 1 */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase">
                    <Pill className="w-4 h-4" />
                    <span>1. Refusal &amp; Route Optimization (30%)</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Evaluates whether you attempted voluntary route adjustments (ODT/liquid/swallowing ease) before escalating to restrictive involuntary intramuscular injections.
                  </p>
                  <p className="text-[11px] text-slate-500">
                    High Score: Patient accepts ODT after negotiation • Low Score: Jumping immediately to IM restraint in a non-violent patient.
                  </p>
                </div>

                {/* Domain 2 */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
                    <Activity className="w-4 h-4" />
                    <span>2. Acute Neuropsychiatry &amp; CIWA (25%)</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Evaluates symptom-triggered withdrawal management. Penalizes ordering antipsychotics as monotherapy for alcohol withdrawal delirium (which lowers seizure threshold).
                  </p>
                  <p className="text-[11px] text-slate-500">
                    High Score: Lorazepam/Diazepam protocol + High-dose Thiamine prior to glucose.
                  </p>
                </div>

                {/* Domain 3 */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase">
                    <ShieldCheck className="w-4 h-4" />
                    <span>3. TDM &amp; REMS Safety Protocols (25%)</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Checks safety lab adherence: Absolute Neutrophil Count (ANC) for Clozapine, serum levels for Lithium (0.8–1.2 mEq/L) and Valproate (50–125 mcg/mL), baseline ECGs.
                  </p>
                  <p className="text-[11px] text-slate-500">
                    High Score: Never dispensing Clozapine without verified ANC &ge; 1,500/uL.
                  </p>
                </div>

                {/* Domain 4 */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase">
                    <Scale className="w-4 h-4" />
                    <span>4. Scope &amp; Interprofessional Collab (20%)</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Checks that you correctly consult Internal Medicine for medical instability (AKI, severe infection) and Social Work for civil legal commitment hearings.
                  </p>
                  <p className="text-[11px] text-slate-500">
                    High Score: Clear prescriber boundary maintenance with timely team consults.
                  </p>
                </div>
              </div>

              {/* Residency Ranks Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Residency Performance Ranks Awarded
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-slate-950 rounded-lg border border-emerald-500/30">
                    <span className="font-black text-emerald-400 block mb-1">Chief Resident Prescriber (90–100%)</span>
                    <span className="text-slate-400 text-[11px]">Flawless diagnostic precision, de-escalation route selection, and zero REMS/lab omissions.</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-teal-500/30">
                    <span className="font-black text-teal-400 block mb-1">Senior Psychiatric Fellow (75–89%)</span>
                    <span className="text-slate-400 text-[11px]">Strong psychopharmacology with minor non-critical lab or titration adjustments needed.</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-amber-500/30">
                    <span className="font-black text-amber-400 block mb-1">Junior Prescriber / Clinical Review (&lt;75%)</span>
                    <span className="text-slate-400 text-[11px]">Missed safety lab, premature IM restraint escalation, or untreated withdrawal symptom.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/70 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Switch settings anytime via <strong>Flight Parameters</strong>.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                if (onOpenFlightConfig) onOpenFlightConfig();
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Configure Flight Mission</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all border border-slate-700"
            >
              Got It, Ready to Fly
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
