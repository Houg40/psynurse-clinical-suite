import React, { useState } from 'react';
import { ArrowLeftRight, AlertCircle, Clipboard, Check, Sparkles, Calendar, ShieldAlert, Printer, Info, Activity, BookOpen, ExternalLink, ChevronDown, ChevronUp, TrendingDown, FlaskConical } from 'lucide-react';

const TAPER_MEDICATIONS = [
  // SSRIs
  {
    id: 'escitalopram',
    name: 'Escitalopram (Lexapro)',
    class: 'SSRI',
    category: 'SSRIs (Selective Serotonin Reuptake Inhibitors)',
    doses: ['5 mg', '10 mg', '15 mg', '20 mg'],
    halfLife: '30h',
    pearl: 'Clean CYP profile; monitor QTc if combined with other QTc agents.'
  },
  {
    id: 'sertraline',
    name: 'Sertraline (Zoloft)',
    class: 'SSRI',
    category: 'SSRIs (Selective Serotonin Reuptake Inhibitors)',
    doses: ['25 mg', '50 mg', '100 mg', '150 mg', '200 mg'],
    halfLife: '26h',
    pearl: 'Preferred in cardiac risk (SADHART); take with meals to reduce GI effects.'
  },
  {
    id: 'fluoxetine',
    name: 'Fluoxetine (Prozac)',
    class: 'SSRI',
    category: 'SSRIs (Selective Serotonin Reuptake Inhibitors)',
    doses: ['10 mg', '20 mg', '40 mg', '60 mg'],
    halfLife: '2-4 days (Active metabolite 7-15 days)',
    pearl: 'Long half-life confers "self-taper"; direct stop without taper usually well-tolerated.'
  },
  {
    id: 'paroxetine',
    name: 'Paroxetine (Paxil)',
    class: 'SSRI',
    category: 'SSRIs (Selective Serotonin Reuptake Inhibitors)',
    doses: ['10 mg', '20 mg', '30 mg', '40 mg'],
    halfLife: '21h (High withdrawal risk)',
    pearl: 'High anticholinergic potency; highest risk of discontinuation syndrome; taper slowly.'
  },
  {
    id: 'citalopram',
    name: 'Citalopram (Celexa)',
    class: 'SSRI',
    category: 'SSRIs (Selective Serotonin Reuptake Inhibitors)',
    doses: ['10 mg', '20 mg', '40 mg'],
    halfLife: '35h',
    pearl: 'Dose-dependent QTc prolongation ceiling (max 20mg in elderly >60).'
  },
  {
    id: 'fluvoxamine',
    name: 'Fluvoxamine (Luvox)',
    class: 'SSRI',
    category: 'SSRIs (Selective Serotonin Reuptake Inhibitors)',
    doses: ['50 mg', '100 mg', '150 mg', '200 mg', '300 mg'],
    halfLife: '15-26h',
    pearl: 'Potent CYP1A2 and CYP2C19 inhibitor; marked interaction with clozapine/caffeine.'
  },

  // SNRIs
  {
    id: 'duloxetine',
    name: 'Duloxetine (Cymbalta)',
    class: 'SNRI',
    category: 'SNRIs (Serotonin-Norepinephrine Reuptake Inhibitors)',
    doses: ['30 mg', '60 mg', '90 mg', '120 mg'],
    halfLife: '12h',
    pearl: 'Dual serotonin/norepinephrine; excellent for neuropathic pain & fibromyalgia.'
  },
  {
    id: 'venlafaxine',
    name: 'Venlafaxine ER (Effexor XR)',
    class: 'SNRI',
    category: 'SNRIs (Serotonin-Norepinephrine Reuptake Inhibitors)',
    doses: ['37.5 mg', '75 mg', '150 mg', '225 mg'],
    halfLife: '11h (High withdrawal risk)',
    pearl: 'Short half-life; notorious for brain zaps on missed doses; reduce in small steps.'
  },
  {
    id: 'desvenlafaxine',
    name: 'Desvenlafaxine (Pristiq)',
    class: 'SNRI',
    category: 'SNRIs (Serotonin-Norepinephrine Reuptake Inhibitors)',
    doses: ['25 mg', '50 mg', '100 mg'],
    halfLife: '11h',
    pearl: 'Active metabolite of venlafaxine; does not require CYP2D6 bioactivation.'
  },

  // NDRIs & Novel / Atypical Antidepressants
  {
    id: 'bupropion',
    name: 'Bupropion XL (Wellbutrin XL)',
    class: 'NDRI',
    category: 'NDRIs & Atypical Antidepressants',
    doses: ['150 mg', '300 mg', '450 mg'],
    halfLife: '21h',
    pearl: 'Zero sexual dysfunction; activating; contraindicated with seizure or eating disorders.'
  },
  {
    id: 'mirtazapine',
    name: 'Mirtazapine (Remeron)',
    class: 'NaSSA',
    category: 'NDRIs & Atypical Antidepressants',
    doses: ['7.5 mg', '15 mg', '30 mg', '45 mg'],
    halfLife: '20-40h',
    pearl: 'Inverse sedation curve: 7.5-15mg is more sedating (H1) than 30-45mg (noradrenergic).'
  },
  {
    id: 'vortioxetine',
    name: 'Vortioxetine (Trintellix)',
    class: 'Multimodal Antidepressant',
    category: 'NDRIs & Atypical Antidepressants',
    doses: ['5 mg', '10 mg', '15 mg', '20 mg'],
    halfLife: '66h',
    pearl: 'Multimodal 5-HT receptor modulator; pro-cognitive benefits; low sexual side effects.'
  },

  // Second-Generation Antipsychotics (SGAs)
  {
    id: 'aripiprazole',
    name: 'Aripiprazole (Abilify)',
    class: 'SGA (D2 Partial Agonist)',
    category: 'Antipsychotics (SGAs)',
    subgroup: 'partial-agonist',
    doses: ['2 mg', '5 mg', '10 mg', '15 mg', '20 mg', '30 mg'],
    halfLife: '75h (Metabolite 94h)',
    pearl: 'D2 partial agonist; high affinity displaces full antagonists; watch for akathisia.'
  },
  {
    id: 'quetiapine',
    name: 'Quetiapine (Seroquel / XR)',
    class: 'SGA (SDA / Pine)',
    category: 'Antipsychotics (SGAs)',
    subgroup: 'pine',
    doses: ['25 mg', '50 mg', '100 mg', '200 mg', '300 mg', '400 mg', '600 mg'],
    halfLife: '6h (Norquetiapine 12h)',
    pearl: 'High H1/M1 antihistaminic/anticholinergic; slow taper avoids cholinergic rebound insomnia.'
  },
  {
    id: 'olanzapine',
    name: 'Olanzapine (Zyprexa)',
    class: 'SGA (SDA / Pine)',
    category: 'Antipsychotics (SGAs)',
    subgroup: 'pine',
    doses: ['2.5 mg', '5 mg', '7.5 mg', '10 mg', '15 mg', '20 mg'],
    halfLife: '30h',
    pearl: 'High metabolic liability; potent sedation and anticholinergic tone; taper gradually.'
  },
  {
    id: 'risperidone',
    name: 'Risperidone (Risperdal)',
    class: 'SGA (SDA / Done)',
    category: 'Antipsychotics (SGAs)',
    subgroup: 'done',
    doses: ['0.5 mg', '1 mg', '2 mg', '3 mg', '4 mg', '6 mg'],
    halfLife: '3h (Active 9-OH metabolite 24h)',
    pearl: 'Potent D2 blockade >2mg; highest prolactin elevation; watch for EPS/rigidity.'
  },
  {
    id: 'lurasidone',
    name: 'Lurasidone (Latuda)',
    class: 'SGA (SDA / Done)',
    category: 'Antipsychotics (SGAs)',
    subgroup: 'done',
    doses: ['20 mg', '40 mg', '60 mg', '80 mg', '120 mg'],
    halfLife: '18h',
    pearl: 'MUST take with 350+ calorie meal; weight neutral; favored in bipolar depression.'
  },
  {
    id: 'cariprazine',
    name: 'Cariprazine (Vraylar)',
    class: 'SGA (D3/D2 Partial Agonist)',
    category: 'Antipsychotics (SGAs)',
    subgroup: 'partial-agonist',
    doses: ['1.5 mg', '3 mg', '4.5 mg', '6 mg'],
    halfLife: '2-4 days (Active DDCAR 1-3 weeks)',
    pearl: 'Ultra-long metabolite half-life; potent D3 affinity improves anhedonia and negative symptoms.'
  },
  {
    id: 'brexpiprazole',
    name: 'Brexpiprazole (Rexulti)',
    class: 'SGA (D2 Partial Agonist)',
    category: 'Antipsychotics (SGAs)',
    subgroup: 'partial-agonist',
    doses: ['0.5 mg', '1 mg', '2 mg', '3 mg'],
    halfLife: '91h',
    pearl: 'Lower intrinsic D2 activation than aripiprazole; reduced risk of akathisia.'
  },
  {
    id: 'lumateperone',
    name: 'Lumateperone (Caplyta)',
    class: 'SGA (5-HT2A/D2 Modulator)',
    category: 'Antipsychotics (SGAs)',
    subgroup: 'done',
    doses: ['42 mg'],
    halfLife: '18h',
    pearl: 'Fixed 42mg dose; approved for Bipolar I & II depression; highly weight/prolactin neutral.'
  },
  {
    id: 'ziprasidone',
    name: 'Ziprasidone (Geodon)',
    class: 'SGA (SDA)',
    category: 'Antipsychotics (SGAs)',
    subgroup: 'done',
    doses: ['20 mg', '40 mg', '60 mg', '80 mg', '120 mg', '160 mg'],
    halfLife: '7h',
    pearl: 'MUST take with ≥500 calorie meal for absorption; highly weight-neutral; monitor baseline QTc.'
  },
  {
    id: 'paliperidone',
    name: 'Paliperidone (Invega)',
    class: 'SGA (SDA / Active Metabolite)',
    category: 'Antipsychotics (SGAs)',
    subgroup: 'done',
    doses: ['3 mg', '6 mg', '9 mg', '12 mg'],
    halfLife: '23h',
    pearl: 'Active 9-OH metabolite of risperidone; predominantly renal elimination; minimal hepatic CYP interactions.'
  },

  // Mood Stabilizers
  {
    id: 'lamotrigine',
    name: 'Lamotrigine (Lamictal)',
    class: 'Mood Stabilizer (Sodium Channel Blocker)',
    category: 'Mood Stabilizers',
    subgroup: 'lamotrigine',
    doses: ['25 mg', '50 mg', '100 mg', '150 mg', '200 mg', '300 mg'],
    halfLife: '25-30h',
    pearl: 'MANDATORY slow 6-week titration to prevent Stevens-Johnson Syndrome (SJS/TEN). Valproate doubles levels!'
  },
  {
    id: 'lithium',
    name: 'Lithium Carbonate (Lithobid / Eskalith)',
    class: 'Mood Stabilizer (Monovalent Cation)',
    category: 'Mood Stabilizers',
    subgroup: 'lithium',
    doses: ['150 mg', '300 mg', '450 mg', '600 mg', '900 mg', '1200 mg'],
    halfLife: '18-24h (Prolonged in elderly/renal)',
    pearl: 'Gold-standard anti-suicide agent. Narrow therapeutic index (0.6-0.8 mEq/L maintenance). TDM required.'
  },
  {
    id: 'divalproex',
    name: 'Divalproex Sodium / Valproate (Depakote)',
    class: 'Mood Stabilizer (Anticonvulsant / GABAergic)',
    category: 'Mood Stabilizers',
    subgroup: 'valproate',
    doses: ['250 mg', '500 mg', '750 mg', '1000 mg', '1250 mg', '1500 mg'],
    halfLife: '9-16h',
    pearl: 'Serum trough target 50-125 mcg/mL. Teratogen. Doubles lamotrigine serum levels via UGT inhibition.'
  },
  {
    id: 'oxcarbazepine',
    name: 'Oxcarbazepine (Trileptal)',
    class: 'Mood Stabilizer (Anticonvulsant)',
    category: 'Mood Stabilizers',
    subgroup: 'anticonvulsant',
    doses: ['150 mg', '300 mg', '600 mg', '900 mg', '1200 mg'],
    halfLife: '2h (Active MHD 9h)',
    pearl: 'Cleaner tolerability than carbamazepine; check baseline and follow-up serum sodium (hyponatremia risk).'
  },
  {
    id: 'carbamazepine',
    name: 'Carbamazepine (Tegretol / Equetro)',
    class: 'Mood Stabilizer (Anticonvulsant)',
    category: 'Mood Stabilizers',
    subgroup: 'carbamazepine',
    doses: ['100 mg', '200 mg', '400 mg', '600 mg', '800 mg', '1200 mg'],
    halfLife: '12-17h (Auto-inducer)',
    pearl: 'Potent CYP3A4 auto-inducer; HLA-B*1502 screening required in Asian ancestry; target 4-12 mcg/mL.'
  }
];

// ─────────────────────────────────────────────────────────────
// BENZODIAZEPINE TAPER PANEL
// Diazepam-equivalent conversion + Ashton-protocol taper schedule
// ─────────────────────────────────────────────────────────────

const BENZO_AGENTS = [
  {
    id: 'alprazolam',
    name: 'Alprazolam (Xanax)',
    diazepamEquiv: 0.5,     // 0.5 mg alprazolam = 10 mg diazepam
    halfLife: '6–27 h (short-intermediate)',
    availableDoses: [0.25, 0.5, 1, 2],
    pearl: 'High potency, short half-life — most severe withdrawal risk. NEVER abrupt stop.'
  },
  {
    id: 'clonazepam',
    name: 'Clonazepam (Klonopin)',
    diazepamEquiv: 0.5,     // 0.5 mg clonazepam = 10 mg diazepam
    halfLife: '18–50 h (long)',
    availableDoses: [0.5, 1, 2],
    pearl: 'Long half-life; smoother taper than alprazolam. Often used directly as the tapering agent.'
  },
  {
    id: 'lorazepam',
    name: 'Lorazepam (Ativan)',
    diazepamEquiv: 1,       // 1 mg lorazepam = 10 mg diazepam
    halfLife: '10–20 h (intermediate)',
    availableDoses: [0.5, 1, 2],
    pearl: 'No active metabolites; preferred in hepatic impairment. Intermediate withdrawal risk.'
  },
  {
    id: 'diazepam',
    name: 'Diazepam (Valium)',
    diazepamEquiv: 10,      // reference agent — 10 mg = 10 mg
    halfLife: '20–100 h + active metabolite (desmethyldiazepam 36–200 h)',
    availableDoses: [2, 5, 10],
    pearl: 'Gold-standard taper agent. Ultra-long half-life self-tapers smoothly; minimal interdose withdrawal.'
  },
  {
    id: 'temazepam',
    name: 'Temazepam (Restoril)',
    diazepamEquiv: 10,      // 10 mg temazepam = 10 mg diazepam
    halfLife: '8–20 h (intermediate)',
    availableDoses: [7.5, 15, 22.5, 30],
    pearl: 'Primarily used for sleep. Often abused; intermediate withdrawal risk.'
  },
  {
    id: 'oxazepam',
    name: 'Oxazepam (Serax)',
    diazepamEquiv: 10,      // 10 mg oxazepam = 10 mg diazepam
    halfLife: '4–15 h (short)',
    availableDoses: [10, 15, 30],
    pearl: 'Short half-life, no active metabolites. Preferred in elderly and hepatic disease alongside lorazepam.'
  },
  {
    id: 'chlordiazepoxide',
    name: 'Chlordiazepoxide (Librium)',
    diazepamEquiv: 25,      // 25 mg chlordiazepoxide = 10 mg diazepam
    halfLife: '5–30 h + active metabolites',
    availableDoses: [5, 10, 25],
    pearl: 'Oldest benzo; used in alcohol withdrawal protocols (CIWA). Multiple active metabolites.'
  },
  {
    id: 'triazolam',
    name: 'Triazolam (Halcion)',
    diazepamEquiv: 0.25,    // 0.25 mg triazolam = 10 mg diazepam
    halfLife: '1.5–5.5 h (ultra-short)',
    availableDoses: [0.125, 0.25],
    pearl: 'Ultra-short half-life; highest rebound insomnia and anterograde amnesia risk.'
  }
];

// Taper rate options
const TAPER_RATES = [
  { id: 'standard', label: 'Standard (10%/2 wks)', pct: 10, intervalWeeks: 2 },
  { id: 'moderate', label: 'Moderate (10%/1 wk)', pct: 10, intervalWeeks: 1 },
  { id: 'slow', label: 'Slow (5%/2 wks)', pct: 5, intervalWeeks: 2 },
  { id: 'very_slow', label: 'Very Slow (5%/4 wks)', pct: 5, intervalWeeks: 4 }
];

function BenzoTaperPanel() {
  const [benzId, setBenzId] = useState('alprazolam');
  const [currentDoseStr, setCurrentDoseStr] = useState('');
  const [taperRateId, setTaperRateId] = useState('standard');
  const [copied, setCopied] = useState(false);

  const benzo = BENZO_AGENTS.find(b => b.id === benzId);
  const rate = TAPER_RATES.find(r => r.id === taperRateId);

  const currentDoseMg = parseFloat(currentDoseStr) || 0;

  // Convert current dose to diazepam equivalent
  // ratio: X mg benzo = diazepamEquiv mg of diazepam equivalent per unit
  // diazepamEq = currentDose * (10 / diazepamEquiv)
  const diazepamEqDose = benzo && currentDoseMg > 0
    ? Math.round((currentDoseMg * 10 / benzo.diazepamEquiv) * 10) / 10
    : 0;

  // Generate taper schedule
  const generateTaperSchedule = () => {
    if (!benzo || currentDoseMg <= 0) return [];
    const steps = [];
    let dose = diazepamEqDose;
    const reductionPct = rate.pct / 100;
    const interval = rate.intervalWeeks;
    let weekNum = 1;
    let stepCount = 0;
    const MAX_STEPS = 30;

    // Phase 1: Switch to diazepam equivalent (if not already on diazepam)
    if (benzo.id !== 'diazepam') {
      steps.push({
        phase: 'PHASE 1 — CONVERSION',
        label: `Week 1–2`,
        dose: `${diazepamEqDose} mg diazepam`,
        action: `Convert from ${benzo.name} ${currentDoseMg} mg/day → Diazepam (Valium) ${diazepamEqDose} mg/day`,
        notes: `Switch to equivalent diazepam dose in 1–2 divided doses per day. The long half-life of diazepam provides a natural buffer between reductions. Monitor for 1–2 weeks at the equivalent dose before beginning taper.`
      });
      weekNum = 3;
    }

    // Phase 2: Gradual reduction
    while (dose > 0 && stepCount < MAX_STEPS) {
      const reduction = Math.max(Math.round(dose * reductionPct * 10) / 10, 0.5);
      const nextDose = Math.max(Math.round((dose - reduction) * 10) / 10, 0);
      const endWeek = weekNum + interval - 1;

      steps.push({
        phase: stepCount === 0 ? 'PHASE 2 — TAPER' : '',
        label: `Week ${weekNum}–${endWeek}`,
        dose: dose <= 1 ? `${dose} mg diazepam → STOP` : `${nextDose} mg diazepam`,
        action: dose <= 1
          ? `Final reduction: ${dose} mg → 0 mg. Discontinue diazepam.`
          : `Reduce diazepam from ${dose} mg → ${nextDose} mg/day (↓${reduction} mg)`,
        notes: dose > 5
          ? `Hold at ${nextDose} mg for ${interval} week${interval > 1 ? 's' : ''} before next reduction. Do NOT skip or accelerate steps.`
          : dose > 1
          ? `Near-final reduction. Expect mild resurgence of anxiety; this is normal and temporary. Reassess weekly.`
          : `Final step. Patient discontinues diazepam. Follow up within 1 week after stopping.`
      });

      if (dose <= 1) break;
      dose = nextDose;
      weekNum += interval;
      stepCount++;
    }

    return steps;
  };

  const schedule = generateTaperSchedule();
  const totalWeeks = schedule.length > 0
    ? schedule[schedule.length - 1]?.label?.match(/Week (\d+)/)?.[1]
    : '—';

  const generateEhrNote = () => {
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    let note = `BENZODIAZEPINE TAPER PLAN — Diazepam (Valium) Conversion Protocol\n`;
    note += `Date: ${today}\n`;
    note += `Current Agent: ${benzo?.name} ${currentDoseMg} mg/day\n`;
    note += `Diazepam Equivalent: ${diazepamEqDose} mg/day\n`;
    note += `Taper Rate: ${rate?.label}\n`;
    note += `Estimated Duration: ~${totalWeeks} weeks to discontinuation\n\n`;
    note += `CLINICAL RATIONALE:\n`;
    note += `Patient is being transitioned to diazepam (Valium) for a structured benzodiazepine taper using the Ashton Manual protocol. Diazepam is selected due to its ultra-long half-life (20–100h + active metabolite), which minimizes interdose withdrawal and enables smooth, predictable dose reductions. Taper rate of ${rate?.pct}% every ${rate?.intervalWeeks} week(s) minimizes risk of seizure, rebound anxiety, and autonomic withdrawal.\n\n`;
    note += `TAPER SCHEDULE:\n`;
    schedule.forEach(s => {
      note += `${s.phase ? `[${s.phase}]\n` : ''}`;
      note += `${s.label}: ${s.action}\n`;
      note += `  Notes: ${s.notes}\n\n`;
    });
    note += `SAFETY PROTOCOLS:\n`;
    note += `• DO NOT abruptly discontinue benzodiazepines — risk of withdrawal seizures, status epilepticus, and death.\n`;
    note += `• If patient reports severe withdrawal symptoms (tremors, diaphoresis, vomiting, confusion, seizures), treat as medical emergency — seek ER evaluation immediately.\n`;
    note += `• Adjunct supportive agents (propranolol for autonomic symptoms, hydroxyzine for anxiety) may be used.\n`;
    note += `• Weekly check-ins recommended during active taper.\n`;
    note += `\nProvider: Monica Preder, ARNP, PMHNP-BC`;
    return note;
  };

  const copyNote = () => {
    navigator.clipboard.writeText(generateEhrNote());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isReady = currentDoseMg > 0 && benzo;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
            <TrendingDown className="w-5 h-5 text-amber-800" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Benzodiazepine Taper Calculator</h2>
            <p className="text-xs text-slate-500">
              Diazepam (Valium) conversion + Ashton-protocol taper schedule. Supports safe, structured weaning from all common benzodiazepines.
            </p>
          </div>
        </div>

        {/* Critical Safety Banner */}
        <div className="mt-4 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-900">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-black text-red-950">⚠️ CRITICAL SAFETY: NEVER ABRUPTLY DISCONTINUE BENZODIAZEPINES</p>
            <p>Abrupt cessation after physiological dependence can cause <strong>withdrawal seizures, status epilepticus, severe autonomic instability, and death.</strong> Always taper gradually. If patient has any history of alcohol use disorder, GABA receptor sensitivity may be markedly altered — exercise additional caution.</p>
          </div>
        </div>

        {/* Diazepam Equivalency Reference */}
        <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="flex items-center gap-1.5 mb-2">
            <FlaskConical className="w-3.5 h-3.5 text-teal-700" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Diazepam Equivalency Reference (Ashton Manual)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px]">
            {BENZO_AGENTS.map(b => (
              <div key={b.id} className={`p-2 rounded-lg border text-center ${benzId === b.id ? 'bg-amber-50 border-amber-300 font-bold text-amber-900' : 'bg-white border-slate-200 text-slate-700'}`}>
                <p className="font-semibold">{b.name.split(' ')[0]}</p>
                <p className="text-teal-700 font-bold">{b.diazepamEquiv} mg = 10 mg Valium</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Input Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide">Configure Taper</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Current Benzo */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Current Benzodiazepine</label>
            <select
              value={benzId}
              onChange={e => setBenzId(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            >
              {BENZO_AGENTS.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
            {benzo && (
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] space-y-0.5">
                <p><span className="font-semibold text-slate-600">Half-life:</span> {benzo.halfLife}</p>
                <p className="text-slate-500 italic">{benzo.pearl}</p>
              </div>
            )}
          </div>

          {/* Current Daily Dose */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Current Total Daily Dose (mg)</label>
            <input
              type="number"
              min="0"
              step="0.25"
              value={currentDoseStr}
              onChange={e => setCurrentDoseStr(e.target.value)}
              placeholder={`e.g. ${benzo?.availableDoses[1] || 1}`}
              className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
            {benzo && currentDoseMg > 0 && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-1">
                <p className="text-amber-700 text-[11px] font-semibold uppercase tracking-wide">Calculated Diazepam Equivalent</p>
                <p className="text-2xl font-black text-amber-800">{diazepamEqDose} mg</p>
                <p className="text-amber-700 text-[11px]">of Diazepam (Valium) per day</p>
              </div>
            )}
          </div>

          {/* Taper Rate */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Taper Rate</label>
            <div className="space-y-1.5">
              {TAPER_RATES.map(r => (
                <label key={r.id} className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all text-xs font-semibold ${taperRateId === r.id ? 'bg-amber-50 border-amber-400 text-amber-900' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                  <input
                    type="radio"
                    name="taperRate"
                    value={r.id}
                    checked={taperRateId === r.id}
                    onChange={() => setTaperRateId(r.id)}
                    className="text-amber-500 h-3.5 w-3.5"
                  />
                  {r.label}
                </label>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 italic leading-snug">
              Ashton Manual recommends 5–10% reductions every 1–4 weeks based on patient tolerance. Always slower for high-potency or long-term users.
            </p>
          </div>
        </div>
      </div>

      {/* Taper Schedule */}
      {isReady && schedule.length > 0 && (
        <div className="space-y-3">
          {/* Schedule Header */}
          <div className="flex items-center justify-between px-1">
            <div>
              <h3 className="text-sm font-black text-slate-900">Generated Taper Schedule</h3>
              <p className="text-xs text-slate-500">
                {benzo.id !== 'diazepam'
                  ? `Phase 1: Convert → Diazepam ${diazepamEqDose} mg/day. Phase 2: Taper at ${rate.pct}% every ${rate.intervalWeeks} wk(s).`
                  : `Direct diazepam taper at ${rate.pct}% reduction every ${rate.intervalWeeks} wk(s).`}
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1.5 rounded-xl text-xs font-bold">
              <Calendar className="w-3.5 h-3.5" />
              ~{totalWeeks} weeks total
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-2">
            {schedule.map((step, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-all ${
                  step.phase?.includes('CONVERSION')
                    ? 'bg-blue-50/60 border-blue-200'
                    : idx === schedule.length - 1
                    ? 'bg-emerald-50/60 border-emerald-300'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                {step.phase && (
                  <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2 inline-block ${
                    step.phase.includes('CONVERSION') ? 'bg-blue-200 text-blue-900' : 'bg-amber-200 text-amber-900'
                  }`}>
                    {step.phase}
                  </span>
                )}
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black text-slate-900">{step.label}</span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-lg ${
                    idx === schedule.length - 1
                      ? 'bg-emerald-600 text-white'
                      : step.phase?.includes('CONVERSION')
                      ? 'bg-blue-600 text-white'
                      : 'bg-amber-100 text-amber-900'
                  }`}>
                    {step.dose}
                  </span>
                </div>
                <p className="text-xs text-slate-800 font-medium">{step.action}</p>
                <p className="text-[11px] text-slate-500 mt-1 italic">{step.notes}</p>
              </div>
            ))}
          </div>

          {/* Withdrawal Symptoms Warning Card */}
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs space-y-2">
            <p className="font-black text-rose-950 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              Monitor for Benzo Withdrawal Symptoms — Report Immediately If Severe
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
              {[
                { label: 'Mild', items: 'Insomnia, irritability, mild anxiety, muscle tension, sweating', color: 'bg-amber-50 border-amber-200 text-amber-900' },
                { label: 'Moderate', items: 'Tremors, palpitations, diaphoresis, nausea, photophobia', color: 'bg-orange-50 border-orange-200 text-orange-900' },
                { label: 'Severe — ER NOW', items: 'Seizures, confusion, hallucinations, fever, autonomic crisis', color: 'bg-red-50 border-red-300 text-red-900 font-bold ring-1 ring-red-400' }
              ].map(tier => (
                <div key={tier.label} className={`p-2.5 rounded-lg border ${tier.color}`}>
                  <p className="font-bold uppercase text-[10px] tracking-wide mb-1">{tier.label}</p>
                  <p>{tier.items}</p>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-rose-800">
              <strong>If patient reports severity escalating or plateau-ing for &gt;2 weeks:</strong> Consider slowing taper rate (5%/4 wks) or holding at current dose for 2–4 weeks before resuming.
            </p>
          </div>

          {/* EHR Note Exporter */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-bold">Tebra EHR Chart Note — Benzo Taper Plan</h4>
              </div>
              <button
                onClick={copyNote}
                className="flex items-center gap-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded-lg transition-all shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Clipboard className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Note'}
              </button>
            </div>
            <textarea
              readOnly
              value={generateEhrNote()}
              rows={12}
              className="w-full text-xs font-mono bg-slate-950/80 text-emerald-300 border border-slate-800 rounded-xl p-3 focus:outline-none resize-none leading-relaxed"
            />
          </div>
        </div>
      )}

      {!isReady && (
        <div className="p-8 bg-white rounded-2xl border border-dashed border-slate-300 text-center text-slate-400 text-sm">
          <TrendingDown className="w-8 h-8 mx-auto mb-2 opacity-30" />
          <p className="font-semibold">Select a benzodiazepine and enter the current daily dose to generate a taper schedule.</p>
        </div>
      )}
    </div>
  );
}

export default function CrossTaperCalculator() {
  const [taperMode, setTaperMode] = useState('cross'); // 'cross' | 'benzo'
  const [currentMedId, setCurrentMedId] = useState('sertraline');
  const [currentDose, setCurrentDose] = useState('100 mg');
  const [targetMedId, setTargetMedId] = useState('duloxetine');
  const [targetDose, setTargetDose] = useState('60 mg');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all'); // 'all' | 'antipsychotics' | 'mood-stabilizers' | 'antidepressants' | 'cross-class'
  const [copied, setCopied] = useState(false);

  const applyPreset = (currId, currDose, tgtId, tgtDose, filter = 'all') => {
    setCurrentMedId(currId);
    setCurrentDose(currDose);
    setTargetMedId(tgtId);
    setTargetDose(tgtDose);
    setSelectedCategoryFilter(filter);
  };

  const currentMed = TAPER_MEDICATIONS.find(m => m.id === currentMedId) || TAPER_MEDICATIONS[0];
  const targetMed = TAPER_MEDICATIONS.find(m => m.id === targetMedId) || TAPER_MEDICATIONS[1];

  // Specific clinical flags
  const isTargetLamictal = targetMed.id === 'lamotrigine';
  const isCurrentDepakote = currentMed.id === 'divalproex';
  const isCurrentCarbamazepine = currentMed.id === 'carbamazepine';
  const isCurrentFluoxetine = currentMed.id === 'fluoxetine';
  const isHighWithdrawalAntidepressant = currentMed.id === 'venlafaxine' || currentMed.id === 'paroxetine';
  const isBothAntipsychotics = currentMed.category === 'Antipsychotics (SGAs)' && targetMed.category === 'Antipsychotics (SGAs)';
  const isBothMoodStabilizers = currentMed.category === 'Mood Stabilizers' && targetMed.category === 'Mood Stabilizers';
  const isAntidepressantToMoodStabilizer = 
    (currentMed.class === 'SSRI' || currentMed.class === 'SNRI' || currentMed.class === 'NDRI' || currentMed.category.includes('Antidepressant') || currentMed.category.includes('SSRI') || currentMed.category.includes('SNRI')) && 
    targetMed.category === 'Mood Stabilizers';
  const isPineToOtherAntipsychotic = currentMed.subgroup === 'pine' && targetMed.category === 'Antipsychotics (SGAs)' && targetMed.subgroup !== 'pine';
  const isToPartialAgonist = targetMed.subgroup === 'partial-agonist' && currentMed.category === 'Antipsychotics (SGAs)';
  const isFromPartialAgonist = currentMed.subgroup === 'partial-agonist' && targetMed.category === 'Antipsychotics (SGAs)';
  const isLithiumTransition = currentMed.id === 'lithium' || targetMed.id === 'lithium';
  const isValproateTransition = currentMed.id === 'divalproex' || targetMed.id === 'divalproex';

  // Generate Evidence-Based Cross-Taper Schedule
  const generateSchedule = () => {
    // 1. RULE: Target is Lamotrigine (MANDATORY slow titration to prevent Stevens-Johnson Syndrome)
    if (isTargetLamictal) {
      if (isCurrentDepakote) {
        // Valproate co-administration doubles lamotrigine levels via UGT1A4 inhibition
        return [
          {
            week: 'Weeks 1–2 (Days 1–14)',
            drugA: `Maintain ${currentMed.name} at current dose (${currentDose})`,
            drugB: `Initiate Lamotrigine at 25 mg EVERY OTHER DAY (QOD)`,
            notes: 'VALPROATE INTERACTION: Valproate inhibits UGT1A4 glucuronidation, doubling Lamotrigine levels. Starting dose MUST be halved.'
          },
          {
            week: 'Weeks 3–4 (Days 15–28)',
            drugA: `Begin tapering ${currentMed.name} to 75% of baseline dose`,
            drugB: `Increase Lamotrigine to 25 mg ONCE DAILY`,
            notes: 'Inspect skin daily for any rash, fever, or mucosal sores. Taper Depakote slowly.'
          },
          {
            week: 'Weeks 5–6 (Days 29–42)',
            drugA: `Reduce ${currentMed.name} to 50% of baseline dose`,
            drugB: `Increase Lamotrigine to 50 mg ONCE DAILY`,
            notes: 'Monitor mood stability and valproate trough level if indicated.'
          },
          {
            week: 'Weeks 7–8 (Days 43–56)',
            drugA: `Reduce ${currentMed.name} to 25% then discontinue at end of Week 8`,
            drugB: `Increase Lamotrigine to 100 mg ONCE DAILY (Target: ${targetDose})`,
            notes: 'Transition complete. Standard monotherapy maintenance target is 100-200 mg/day.'
          }
        ];
      }

      if (isCurrentCarbamazepine) {
        // Carbamazepine potent CYP/UGT auto-inducer halves lamotrigine levels
        return [
          {
            week: 'Weeks 1–2 (Days 1–14)',
            drugA: `Maintain ${currentMed.name} at baseline (${currentDose})`,
            drugB: `Initiate Lamotrigine at 50 mg ONCE DAILY`,
            notes: 'CARBAMAZEPINE INDUCTION: Tegretol induces glucuronidation, halving Lamictal levels. Starting dose must be doubled under close surveillance.'
          },
          {
            week: 'Weeks 3–4 (Days 15–28)',
            drugA: `Reduce ${currentMed.name} to 66% of baseline`,
            drugB: `Increase Lamotrigine to 100 mg ONCE DAILY (split BID)`,
            notes: 'Skin inspection protocol: report any rash or mucosal irritation immediately.'
          },
          {
            week: 'Weeks 5–6 (Days 29–42)',
            drugA: `Reduce ${currentMed.name} to 33% of baseline`,
            drugB: `Increase Lamotrigine to 200 mg ONCE DAILY`,
            notes: 'As Tegretol tapers off, enzyme de-induction occurs over 2-3 weeks.'
          },
          {
            week: 'Week 7+ (Day 43+)',
            drugA: `Discontinue ${currentMed.name} completely`,
            drugB: `Adjust Lamotrigine to target maintenance (${targetDose})`,
            notes: 'Transition complete. Standard monotherapy maintenance target is reached.'
          }
        ];
      }

      // Standard Lamotrigine Titration (Non-Valproate / Non-Inducer)
      return [
        {
          week: 'Weeks 1–2 (Days 1–14)',
          drugA: `Maintain ${currentMed.name} at full baseline dose (${currentDose})`,
          drugB: `Initiate Lamotrigine at 25 mg ONCE DAILY`,
          notes: 'MANDATORY SJS PROTOCOL: Do not accelerate titration. Inspect skin daily for benign or blistering rash.'
        },
        {
          week: 'Weeks 3–4 (Days 15–28)',
          drugA: `Reduce ${currentMed.name} to 50% of baseline dose`,
          drugB: `Increase Lamotrigine to 50 mg ONCE DAILY`,
          notes: 'Maintain steady titration steps. Re-evaluate mood symptoms.'
        },
        {
          week: 'Week 5 (Days 29–35)',
          drugA: `Reduce ${currentMed.name} to 25% of baseline dose`,
          drugB: `Increase Lamotrigine to 100 mg ONCE DAILY`,
          notes: 'Prepare to complete taper of initial medication.'
        },
        {
          week: 'Week 6+ (Day 36+)',
          drugA: `Discontinue ${currentMed.name} completely`,
          drugB: `Advance Lamotrigine to target maintenance (${targetDose})`,
          notes: 'Full therapeutic target achieved. Remind patient: If missed for >5 consecutive days, MUST restart at 25 mg!'
        }
      ];
    }

    // 2. RULE: Discontinuing Fluoxetine (Long half-life / self-taper)
    if (isCurrentFluoxetine) {
      return [
        {
          week: 'Week 1 (Days 1–4)',
          drugA: 'Discontinue Fluoxetine completely',
          drugB: 'Washout / Self-taper period (active norfluoxetine remains in system)',
          notes: 'Due to long half-life (active metabolite up to 15 days), no gradual taper is needed. Observe 3-4 days.'
        },
        {
          week: 'Week 1 (Days 5–7)',
          drugA: 'None',
          drugB: `Initiate ${targetMed.name} at starting dose (${targetMed.doses[0]})`,
          notes: 'Begin target agent at lowest manufactured dose.'
        },
        {
          week: 'Week 2 (Days 8–14)',
          drugA: 'None',
          drugB: `Titrate ${targetMed.name} to intermediate dose`,
          notes: 'Monitor for tolerability and GI symptoms.'
        },
        {
          week: 'Week 3 (Day 15+)',
          drugA: 'None',
          drugB: `Advance ${targetMed.name} to target dose (${targetDose})`,
          notes: 'Transition complete. Norfluoxetine fully washed out.'
        }
      ];
    }

    // 3. RULE: High-Withdrawal Antidepressant (Venlafaxine or Paroxetine)
    if (isHighWithdrawalAntidepressant) {
      return [
        {
          week: 'Week 1 (Days 1–7)',
          drugA: `Reduce ${currentMed.name} to 75% of baseline dose`,
          drugB: `Initiate ${targetMed.name} at lowest starting dose (${targetMed.doses[0]})`,
          notes: 'High withdrawal risk: counsel patient on potential transient "brain zaps", dizziness, or vivid dreams.'
        },
        {
          week: 'Week 2 (Days 8–14)',
          drugA: `Reduce ${currentMed.name} to 50% of baseline dose`,
          drugB: `Titrate ${targetMed.name} to intermediate dose`,
          notes: 'Monitor blood pressure and emotional stability.'
        },
        {
          week: 'Week 3 (Days 15–21)',
          drugA: `Reduce ${currentMed.name} to 25% of baseline dose (or lowest manufactured capsule)`,
          drugB: `Increase ${targetMed.name} toward target (${targetDose})`,
          notes: 'Do not rush final step-down. Maintain hydration.'
        },
        {
          week: 'Week 4 (Day 22+)',
          drugA: `Discontinue ${currentMed.name} completely`,
          drugB: `Achieve full target dose: ${targetMed.name} ${targetDose}`,
          notes: 'Transition complete. Schedule follow-up check-in at 2 weeks.'
        }
      ];
    }

    // 4. RULE: Antipsychotic "Pine" (Quetiapine/Olanzapine) to "Done" or Partial Agonist
    if (isPineToOtherAntipsychotic) {
      return [
        {
          week: 'Week 1 (Days 1–7)',
          drugA: `Reduce ${currentMed.name} to 75% of current dose (${currentDose})`,
          drugB: `Start ${targetMed.name} at low starting dose (${targetMed.doses[0]})`,
          notes: 'CHOLINERGIC / HISTAMINE REBOUND WARNING: Slower taper prevents rebound insomnia, diaphoresis, and agitation.'
        },
        {
          week: 'Week 2 (Days 8–14)',
          drugA: `Reduce ${currentMed.name} to 50% of baseline`,
          drugB: `Titrate ${targetMed.name} to intermediate therapeutic dose`,
          notes: 'Monitor sleep patterns. May use short-term sleep hygiene or non-anticholinergic sleep aid if needed.'
        },
        {
          week: 'Week 3 (Days 15–21)',
          drugA: `Reduce ${currentMed.name} to 25% of baseline (lowest tablet)`,
          drugB: `Increase ${targetMed.name} to target dose (${targetDose})`,
          notes: 'Observe for emerging akathisia or agitation as D2 antagonist tone decreases.'
        },
        {
          week: 'Week 4 (Day 22+)',
          drugA: `Discontinue ${currentMed.name} completely`,
          drugB: `Maintain ${targetMed.name} at ${targetDose}`,
          notes: 'Transition complete. Monitor metabolic markers and therapeutic psychiatric response.'
        }
      ];
    }

    // 5. RULE: Switch to/from D2 Partial Agonist (Aripiprazole, Cariprazine, Brexpiprazole)
    if (isToPartialAgonist || isFromPartialAgonist) {
      return [
        {
          week: 'Week 1 (Days 1–7)',
          drugA: `Reduce ${currentMed.name} to 66% - 75% of current dose`,
          drugB: `Initiate ${targetMed.name} at starting dose (${targetMed.doses[0]})`,
          notes: 'PARTIAL AGONIST SWITCH: High D2 affinity can cause transient receptor competition or akathisia. Overlap is essential.'
        },
        {
          week: 'Week 2 (Days 8–14)',
          drugA: `Reduce ${currentMed.name} to 33% - 50% of baseline`,
          drugB: `Titrate ${targetMed.name} to intermediate dose`,
          notes: 'Watch for motor restlessness (akathisia); treat with low-dose propranolol if needed.'
        },
        {
          week: 'Week 3 (Days 15–21)',
          drugA: `Reduce ${currentMed.name} to lowest available dose then stop at day 21`,
          drugB: `Advance ${targetMed.name} to target dose (${targetDose})`,
          notes: 'Verify symptom control. Target agent reaches steady state.'
        },
        {
          week: 'Week 4 (Day 22+)',
          drugA: `Discontinue ${currentMed.name} completely`,
          drugB: `Maintain ${targetMed.name} at ${targetDose}`,
          notes: 'Transition complete. Assess psychiatric stability and motor tolerability.'
        }
      ];
    }

    // 6. RULE: Antipsychotic SGA-to-SGA Cross-Titration (General / Done-to-Done / Pine-to-Pine)
    if (isBothAntipsychotics) {
      return [
        {
          week: 'Week 1 (Days 1–7)',
          drugA: `Reduce ${currentMed.name} to 75% baseline dose (${currentDose})`,
          drugB: `Initiate ${targetMed.name} at starting dose (${targetMed.doses[0]})`,
          notes: 'ANTIPSYCHOTIC OVERLAP: Maintain continuous D2/5-HT2A blockade to prevent breakthrough psychosis or mood destabilization.'
        },
        {
          week: 'Week 2 (Days 8–14)',
          drugA: `Reduce ${currentMed.name} to 50% baseline dose`,
          drugB: `Titrate ${targetMed.name} to intermediate dose`,
          notes: 'EPS & AKATHISIA SURVEILLANCE: Monitor motor symptoms, sedation trajectory, and evening administration.'
        },
        {
          week: 'Week 3 (Days 15–21)',
          drugA: `Reduce ${currentMed.name} to 25% baseline (or lowest manufactured tablet)`,
          drugB: `Advance ${targetMed.name} toward target maintenance (${targetDose})`,
          notes: 'Assess clinical stability. Check baseline metabolic markers or prolactin if switching for tolerability.'
        },
        {
          week: 'Week 4 (Day 22+)',
          drugA: `Discontinue ${currentMed.name} completely`,
          drugB: `Achieve full target dose: ${targetMed.name} ${targetDose}`,
          notes: 'SGA cross-taper complete. Schedule clinic follow-up at 2–4 weeks to evaluate ongoing response.'
        }
      ];
    }

    // 7. RULE: Antidepressant to Mood Stabilizer (Bipolar Switch / Preventing Mania)
    if (isAntidepressantToMoodStabilizer) {
      return [
        {
          week: 'Week 1 (Days 1–7)',
          drugA: `Maintain ${currentMed.name} at baseline (${currentDose})`,
          drugB: `Initiate ${targetMed.name} at starting dose (${targetMed.doses[0]})`,
          notes: 'BIPOLAR STABILIZATION: Establish mood stabilizer kinetics before withdrawing antidepressant to avoid rebound depression.'
        },
        {
          week: 'Week 2 (Days 8–14)',
          drugA: `Reduce ${currentMed.name} to 50% of baseline dose`,
          drugB: `Advance ${targetMed.name} toward therapeutic dose`,
          notes: 'MANIC FLIP SAFEGUARD: Tapering antidepressant monotherapy reduces risk of rapid cycling and mixed manic states.'
        },
        {
          week: 'Week 3 (Days 15–21)',
          drugA: `Reduce ${currentMed.name} to 25% of baseline`,
          drugB: `Titrate ${targetMed.name} toward target maintenance`,
          notes: 'Monitor mood polarity daily (sleep latency, psychomotor agitation, racing thoughts).'
        },
        {
          week: 'Week 4 (Day 22+)',
          drugA: `Discontinue ${currentMed.name} completely`,
          drugB: `Maintain ${targetMed.name} at full maintenance (${targetDose})`,
          notes: 'Mood stabilizer monotherapy established. Order baseline/follow-up labs as indicated.'
        }
      ];
    }

    // 8. RULE: Mood Stabilizer to Mood Stabilizer Cross-Titration
    if (isBothMoodStabilizers) {
      return [
        {
          week: 'Week 1 (Days 1–7)',
          drugA: `Maintain ${currentMed.name} at full baseline dose (${currentDose})`,
          drugB: `Initiate ${targetMed.name} at starting dose (${targetMed.doses[0]})`,
          notes: 'DUAL MOOD COVERAGE: Maintain primary agent while building therapeutic blood levels of the incoming mood stabilizer.'
        },
        {
          week: 'Week 2 (Days 8–14)',
          drugA: `Reduce ${currentMed.name} to 50%–66% of baseline`,
          drugB: `Advance ${targetMed.name} toward therapeutic target (${targetDose})`,
          notes: 'TDM PROTOCOL: Order 12-hour trough level for Lithium (0.6–0.8 mEq/L) or Valproate (50–125 mcg/mL) if applicable.'
        },
        {
          week: 'Week 3 (Days 15–21)',
          drugA: `Reduce ${currentMed.name} to 25%–33% of baseline`,
          drugB: `Achieve full target dose: ${targetMed.name} ${targetDose}`,
          notes: 'Monitor electrolytes, renal (eGFR/Cr), and liver panel per agent requirements.'
        },
        {
          week: 'Week 4 (Day 22+)',
          drugA: `Discontinue ${currentMed.name} completely`,
          drugB: `Maintain ${targetMed.name} at ${targetDose}`,
          notes: 'Transition complete. Confirm 12-hour steady-state trough level of new agent in 1–2 weeks.'
        }
      ];
    }

    // 9. RULE: General Mood Stabilizer Cross-Titration
    if (currentMed.category === 'Mood Stabilizers' || targetMed.category === 'Mood Stabilizers') {
      return [
        {
          week: 'Week 1 (Days 1–7)',
          drugA: `Maintain ${currentMed.name} at current dose (${currentDose})`,
          drugB: `Initiate ${targetMed.name} at starting dose (${targetMed.doses[0]})`,
          notes: 'Maintain primary mood stabilizer coverage while initiating new agent to prevent affective relapse.'
        },
        {
          week: 'Week 2 (Days 8–14)',
          drugA: `Reduce ${currentMed.name} to 50% - 66% of baseline`,
          drugB: `Titrate ${targetMed.name} toward therapeutic target (${targetDose})`,
          notes: 'MONITORING: Check serum trough level for Lithium (0.6-0.8 mEq/L) or Valproate (50-125 mcg/mL) if applicable.'
        },
        {
          week: 'Week 3 (Days 15–21)',
          drugA: `Reduce ${currentMed.name} to 25% - 33% of baseline`,
          drugB: `Achieve full target dose: ${targetMed.name} ${targetDose}`,
          notes: 'Monitor renal function, electrolytes, and liver panel per drug-specific guidelines.'
        },
        {
          week: 'Week 4 (Day 22+)',
          drugA: `Discontinue ${currentMed.name} completely`,
          drugB: `Maintain ${targetMed.name} at ${targetDose}`,
          notes: 'Taper complete. Recheck 12-hour trough level in 1-2 weeks once target agent reaches steady state.'
        }
      ];
    }

    // 10. Standard 3-Week Antidepressant Cross-Taper
    return [
      {
        week: 'Week 1 (Days 1–7)',
        drugA: `Reduce ${currentMed.name} to 50% dose`,
        drugB: `Start ${targetMed.name} at starting dose (${targetMed.doses[0]})`,
        notes: 'Take both doses once daily in morning (or split per individual drug profile).'
      },
      {
        week: 'Week 2 (Days 8–14)',
        drugA: `Reduce ${currentMed.name} to 25% dose (or alternate days if indivisible)`,
        drugB: `Increase ${targetMed.name} toward target (${targetDose})`,
        notes: 'Observe for serotonin load and GI tolerance.'
      },
      {
        week: 'Week 3 (Day 15+)',
        drugA: `Discontinue ${currentMed.name} completely`,
        drugB: `Continue ${targetMed.name} at full therapeutic dose (${targetDose})`,
        notes: 'Transition complete. Full therapeutic benefit evaluated at 4-6 weeks.'
      }
    ];
  };

  const schedule = generateSchedule();

  // Generate Patient Portal / Handout Instructions
  const generatePatientInstructions = () => {
    let msg = `TREATMENT TRANSITION PLAN\n`;
    msg += `Switching from: ${currentMed.name} (${currentDose})\n`;
    msg += `Switching to: ${targetMed.name} (Target: ${targetDose})\n\n`;
    msg += `Dear Patient,\nHere is your customized step-by-step medication transition schedule. Following these instructions carefully will ensure a smooth change and minimize any temporary adjustment symptoms:\n\n`;

    schedule.forEach(s => {
      msg += `🗓️ ${s.week.toUpperCase()}:\n`;
      msg += `  • Current Med: ${s.drugA}\n`;
      msg += `  • New Med: ${s.drugB}\n`;
      msg += `  • Guidance: ${s.notes}\n\n`;
    });

    msg += `MEDICATION-SPECIFIC INSTRUCTIONS:\n`;
    if (targetMed.id === 'lurasidone') {
      msg += `- IMPORTANT FOOD RULE: Lurasidone (Latuda) MUST be taken with food or a meal containing at least 350 calories (e.g., dinner or a protein shake) for your body to absorb it properly.\n`;
    }
    if (targetMed.id === 'lamotrigine') {
      msg += `- IMPORTANT SKIN MONITORING: If you develop ANY new skin rash, hives, blistering, peeling, fever, or swollen glands, STOP taking Lamictal immediately and contact our clinic or seek medical attention right away.\n`;
      msg += `- MISSED DOSES: If you miss taking Lamictal for more than 4-5 consecutive days, DO NOT resume your regular dose. Call the office first because you may need to restart at the lowest 25mg dose.\n`;
    }
    if (targetMed.id === 'ziprasidone') {
      msg += `- IMPORTANT FOOD RULE: Ziprasidone (Geodon) MUST be taken with a substantial meal containing at least 500 calories for your body to absorb it properly.\n`;
    }
    if (targetMed.id === 'carbamazepine' || currentMed.id === 'carbamazepine') {
      msg += `- LAB MONITORING & AUTO-INDUCTION: Periodic Complete Blood Count (CBC) and Liver Function Tests (LFTs) required. Report unusual bruising, fever, or rash.\n`;
    }
    if (isBothAntipsychotics) {
      msg += `- EPS & RESTLESSNESS: If you feel an inner urge to pace or motor restlessness (akathisia) or muscle stiffness during the switch, notify our office.\n`;
    }
    if (isAntidepressantToMoodStabilizer) {
      msg += `- BIPOLAR MOOD LOG: Track your daily sleep duration and goal-directed energy to ensure mood stability during this transition.\n`;
    }
    if (isLithiumTransition) {
      msg += `- HYDRATION & NSAID WARNING: Maintain regular water intake and avoid dehydration. Avoid over-the-counter NSAIDs (ibuprofen/Advil/Motrin, naproxen/Aleve) without consulting the provider as they can cause lithium levels to rise.\n`;
    }
    if (isPineToOtherAntipsychotic) {
      msg += `- SLEEP & ADJUSTMENT: Because your previous medication had stronger sleep-promoting properties, you may experience temporary vivid dreams or lighter sleep for 1-2 weeks. Practice calming sleep hygiene.\n`;
    }

    msg += `\nGENERAL SAFETY REMINDERS:\n`;
    msg += `- Take your doses consistently every day at the same time.\n`;
    msg += `- Mild transient headaches, mild nausea, or sleep changes can occasionally occur during week 1 and typically resolve.\n`;
    msg += `- If you experience severe dizziness, fever, high pulse, sudden motor restlessness, or rash, please contact our office immediately via the portal or call our clinic.\n`;
    msg += `— Monica Preder, ARNP, PMHNP-BC`;
    return msg;
  };

  const copyInstructions = () => {
    navigator.clipboard.writeText(generatePatientInstructions());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [showReferences, setShowReferences] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  const copyClinicalCitation = () => {
    const citation = "Cross-titration protocol formulated in accordance with The Maudsley Prescribing Guidelines in Psychiatry (14th Edition) and Stahl's Essential Psychopharmacology: Prescriber's Guide (8th Edition). Adheres to FDA-mandated slow titration schedule for Lamotrigine and therapeutic drug monitoring protocols.";
    navigator.clipboard.writeText(citation);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  // Group medications by category for dropdowns
  const categories = [
    'SSRIs (Selective Serotonin Reuptake Inhibitors)',
    'SNRIs (Serotonin-Norepinephrine Reuptake Inhibitors)',
    'NDRIs & Atypical Antidepressants',
    'Antipsychotics (SGAs)',
    'Mood Stabilizers'
  ];

  const filteredCategories = (() => {
    if (selectedCategoryFilter === 'antipsychotics') {
      return ['Antipsychotics (SGAs)'];
    }
    if (selectedCategoryFilter === 'mood-stabilizers') {
      return ['Mood Stabilizers'];
    }
    if (selectedCategoryFilter === 'antidepressants') {
      return [
        'SSRIs (Selective Serotonin Reuptake Inhibitors)',
        'SNRIs (Serotonin-Norepinephrine Reuptake Inhibitors)',
        'NDRIs & Atypical Antidepressants'
      ];
    }
    return categories;
  })();

  return (
    <div className="space-y-6">
      {/* Mode Switcher Tabs */}
      <div className="flex gap-2 p-1.5 bg-slate-200/60 rounded-xl w-fit">
        <button
          onClick={() => setTaperMode('cross')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            taperMode === 'cross'
              ? 'bg-white text-teal-800 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          <ArrowLeftRight className="w-4 h-4" />
          Cross-Taper Calculator
        </button>
        <button
          onClick={() => setTaperMode('benzo')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            taperMode === 'benzo'
              ? 'bg-white text-amber-800 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          <TrendingDown className="w-4 h-4" />
          Benzo Taper (Valium)
        </button>
      </div>

      {/* Benzo Taper Mode */}
      {taperMode === 'benzo' && <BenzoTaperPanel />}

      {/* Cross-Taper Mode */}
      {taperMode === 'cross' && <>

      {/* Header Card (Hidden on Print) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm print:hidden space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center text-teal-800 flex-shrink-0">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Psychiatric Medication Cross-Tapering Calculator</h2>
              <p className="text-xs text-slate-500">
                Evidence-based cross-titration protocols for Antidepressants, Second-Generation Antipsychotics, and Mood Stabilizers. Prevents discontinuation syndrome, D2 receptor rebound, and Stevens-Johnson Syndrome.
              </p>
            </div>
          </div>

          {/* Collapsible Reference Toggle Button */}
          <button
            onClick={() => setShowReferences(!showReferences)}
            className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all flex-shrink-0 self-start sm:self-auto border border-slate-200"
          >
            <BookOpen className="w-4 h-4 text-teal-700" />
            <span>Clinical References &amp; Guidelines</span>
            {showReferences ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
          </button>
        </div>

        {/* Expandable Clinical References & Guidelines Drawer */}
        {showReferences && (
          <div className="p-5 bg-teal-50/60 border border-teal-200 rounded-2xl space-y-4 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-teal-200/80 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-700" />
                  <h4 className="text-xs font-black text-teal-950 uppercase tracking-wider">
                    Medication Indications Reference Cards (SSRI, SNRI, SNRA, NDRI, SGAs, Mood Stabilizers)
                  </h4>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-[11px] font-sans">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-950 inline-block" />
                    <strong className="font-extrabold text-slate-950">Bold: FDA-Approved Indication</strong>
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400/50 inline-block" />
                    <span>Unhighlighted in (parentheses): Off-Label Indication</span>
                  </span>
                </div>
              </div>
              <button
                onClick={copyClinicalCitation}
                className="flex items-center gap-1 text-[11px] font-bold bg-teal-700 hover:bg-teal-600 text-white px-2.5 py-1 rounded-lg transition-all shadow-2xs self-start"
              >
                {copiedRef ? <Check className="w-3 h-3" /> : <Clipboard className="w-3 h-3" />}
                <span>{copiedRef ? 'Copied Citation!' : 'Copy Chart MDM Citation'}</span>
              </button>
            </div>

            {/* Provider Notecards Grid - Exactly Written as Provider Requested */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* Notecard 1: SSRIs */}
              <div className="bg-amber-50/60 border-2 border-amber-200/80 rounded-xl p-4 shadow-sm space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-amber-200 pb-1.5 font-sans">
                  <span className="font-black text-amber-950 text-xs tracking-wider uppercase">NOTECARD 1</span>
                  <span className="text-[10px] font-bold bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded">SSRI</span>
                </div>

                <div className="space-y-3 text-slate-800 text-[11px] leading-relaxed">
                  <div>
                    <p className="font-extrabold text-slate-950">Escitalopram — Lexapro — SSRI</p>
                    <p className="font-bold text-slate-950">MDD, GAD</p>
                    <p className="text-slate-500 font-normal">(Panic disorder, OCD, PTSD, PMDD)</p>
                  </div>

                  <div className="pt-1 border-t border-amber-200/60">
                    <p className="font-extrabold text-slate-950">Citalopram — Celexa — SSRI</p>
                    <p className="font-bold text-slate-950">Depression</p>
                    <p className="text-slate-500 font-normal">(PMDD, OCD, panic d/o, GAD, PTSD, SAD)</p>
                  </div>

                  <div className="pt-1 border-t border-amber-200/60">
                    <p className="font-extrabold text-slate-950">Fluoxetine — Prozac — SSRI</p>
                    <p className="font-bold text-slate-950">MDD, OCD, PMDD, bulimia nervosa, panic d/o, bipolar depression</p>
                    <p className="mt-0.5 font-extrabold text-teal-950">In combo c̄ olanzapine (Symbyax)</p>
                    <p className="font-bold text-teal-900">Treatment-resistant depression c̄ Symbyax</p>
                    <p className="text-slate-500 font-normal">(SAD, PTSD)</p>
                  </div>

                  <div className="pt-1 border-t border-amber-200/60">
                    <p className="font-extrabold text-slate-950">Sertraline — Zoloft — SSRI</p>
                    <p className="font-bold text-slate-950">MDD, PMDD, panic d/o, PTSD, SAD, OCD</p>
                    <p className="text-slate-500 font-normal">(GAD)</p>
                  </div>

                  <div className="pt-1 border-t border-amber-200/60">
                    <p className="font-extrabold text-slate-950">Paroxetine — Paxil — SSRI</p>
                    <p className="font-bold text-slate-950">PTSD, GAD, PMDD</p>
                    <p className="font-bold text-slate-950">MDD, OCD, panic d/o, SAD</p>
                  </div>
                </div>
              </div>

              {/* Notecard 2: SNRA & NDRI */}
              <div className="bg-sky-50/60 border-2 border-sky-200/80 rounded-xl p-4 shadow-sm space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-sky-200 pb-1.5 font-sans">
                  <span className="font-black text-sky-950 text-xs tracking-wider uppercase">NOTECARD 2</span>
                  <span className="text-[10px] font-bold bg-sky-200/70 text-sky-900 px-2 py-0.5 rounded">SNRA &amp; NDRI</span>
                </div>

                <div className="space-y-4 text-slate-800 text-[11px] leading-relaxed">
                  <div>
                    <p className="font-extrabold text-slate-950">Mirtazapine — Remeron — SNRA</p>
                    <p className="font-bold text-slate-950">MDD</p>
                    <p className="text-slate-500 font-normal">(Panic d/o, GAD, PTSD)</p>
                  </div>

                  <div className="pt-2 border-t border-sky-200/60">
                    <p className="font-extrabold text-slate-950">Bupropion — Wellbutrin — NDRI</p>
                    <p className="font-bold text-slate-950">MDD (SR, XL)</p>
                    <p className="font-bold text-slate-950">SAD (XL)</p>
                    <p className="font-bold text-slate-950">Nicotine (SR)</p>
                    <p className="text-slate-500 font-normal mt-1">(Bipolar depression, ADHD, sexual dysfunction)</p>
                  </div>
                </div>
              </div>

              {/* Notecard 3: SNRIs */}
              <div className="bg-emerald-50/60 border-2 border-emerald-200/80 rounded-xl p-4 shadow-sm space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-emerald-200 pb-1.5 font-sans">
                  <span className="font-black text-emerald-950 text-xs tracking-wider uppercase">NOTECARD 3</span>
                  <span className="text-[10px] font-bold bg-emerald-200/70 text-emerald-900 px-2 py-0.5 rounded">SNRI</span>
                </div>

                <div className="space-y-3 text-slate-800 text-[11px] leading-relaxed">
                  <div>
                    <p className="font-extrabold text-slate-950">Venlafaxine — Effexor — SNRI</p>
                    <p className="font-bold text-slate-950">Depression, GAD, SAD, panic d/o</p>
                    <p className="text-slate-500 font-normal">(PTSD, PMDD)</p>
                  </div>

                  <div className="pt-1 border-t border-emerald-200/60">
                    <p className="font-extrabold text-slate-950">Duloxetine — Cymbalta — SNRI</p>
                    <p className="font-bold text-slate-950">MDD, DPNP, fibromyalgia, GAD, chronic muscle pain</p>
                    <p className="text-slate-500 font-normal">(Stress urinary incontinence, neuropathic pain/chronic)</p>
                    <p className="text-slate-500 font-normal">(Other anxiety d/o)</p>
                  </div>

                  <div className="pt-1 border-t border-emerald-200/60">
                    <p className="font-extrabold text-slate-950">Desvenlafaxine — Pristiq — SNRI</p>
                    <p className="font-bold text-slate-950">MDD</p>
                    <p className="text-slate-500 font-normal">(Vasomotor symptoms, fibromyalgia, GAD, SAD, panic d/o, PTSD, PMDD)</p>
                  </div>
                </div>
              </div>

              {/* Notecard 4: Mood Stabilizers (Bipolar & Mood Disorders) */}
              <div className="bg-purple-50/60 border-2 border-purple-200/80 rounded-xl p-4 shadow-sm space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-purple-200 pb-1.5 font-sans">
                  <span className="font-black text-purple-950 text-xs tracking-wider uppercase">NOTECARD 4</span>
                  <span className="text-[10px] font-bold bg-purple-200/70 text-purple-900 px-2 py-0.5 rounded">MOOD STABILIZERS</span>
                </div>

                <div className="space-y-3 text-slate-800 text-[11px] leading-relaxed">
                  <div>
                    <p className="font-extrabold text-slate-950">Lamotrigine — Lamictal — Mood Stabilizer</p>
                    <p className="font-bold text-slate-950">Bipolar I maintenance (depression prevention)</p>
                    <p className="text-slate-500 font-normal">(TRD augmentation, bipolar II depression)</p>
                    <p className="text-purple-950 font-bold text-[10px] mt-0.5">⚠️ Mandatory slow titration to avoid SJS/TEN</p>
                  </div>

                  <div className="pt-1 border-t border-purple-200/60">
                    <p className="font-extrabold text-slate-950">Lithium — Lithobid / Eskalith — Mood Stabilizer</p>
                    <p className="font-bold text-slate-950">Bipolar I mania &amp; maintenance, anti-suicide</p>
                    <p className="text-slate-500 font-normal">(MDD augmentation, vascular headaches)</p>
                    <p className="text-purple-950 font-semibold text-[10px] mt-0.5">Trough target: 0.6–0.8 mEq/L (maintenance)</p>
                  </div>

                  <div className="pt-1 border-t border-purple-200/60">
                    <p className="font-extrabold text-slate-950">Divalproex / Valproic Acid — Depakote — Mood Stabilizer</p>
                    <p className="font-bold text-slate-950">Bipolar I acute mania &amp; mixed episodes</p>
                    <p className="text-slate-500 font-normal">(Migraine prophylaxis, impulsivity, rapid cycling)</p>
                    <p className="text-purple-950 font-semibold text-[10px] mt-0.5">Trough target: 50–125 mcg/mL • Teratogen</p>
                  </div>

                  <div className="pt-1 border-t border-purple-200/60">
                    <p className="font-extrabold text-slate-950">Oxcarbazepine — Trileptal — Mood Stabilizer</p>
                    <p className="font-bold text-slate-950">Focal seizures</p>
                    <p className="text-slate-500 font-normal">(Bipolar mood instability / affective lability, trigeminal neuralgia)</p>
                  </div>
                </div>
              </div>

              {/* Notecard 5: Second-Generation Antipsychotics (SGAs) */}
              <div className="bg-rose-50/60 border-2 border-rose-200/80 rounded-xl p-4 shadow-sm space-y-3 font-mono text-xs md:col-span-2 lg:col-span-2">
                <div className="flex items-center justify-between border-b border-rose-200 pb-1.5 font-sans">
                  <span className="font-black text-rose-950 text-xs tracking-wider uppercase">NOTECARD 5</span>
                  <span className="text-[10px] font-bold bg-rose-200/70 text-rose-900 px-2 py-0.5 rounded">ANTIPSYCHOTICS (SGAs)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-800 text-[11px] leading-relaxed">
                  <div className="space-y-2">
                    <div>
                      <p className="font-extrabold text-slate-950">Aripiprazole — Abilify — SGA (D2 Partial Agonist)</p>
                      <p className="font-bold text-slate-950">MDD adjunct, bipolar I mania/maintenance, schizophrenia, Tourette's, autism irritability</p>
                    </div>

                    <div className="pt-1 border-t border-rose-200/60">
                      <p className="font-extrabold text-slate-950">Quetiapine — Seroquel / XR — SGA (SDA / Pine)</p>
                      <p className="font-bold text-slate-950">Bipolar depression (monotherapy), bipolar mania, MDD adjunct (XR), schizophrenia</p>
                      <p className="text-slate-500 font-normal">(Insomnia, severe GAD)</p>
                    </div>

                    <div className="pt-1 border-t border-rose-200/60">
                      <p className="font-extrabold text-slate-950">Lurasidone — Latuda — SGA (SDA / Done)</p>
                      <p className="font-bold text-slate-950">Bipolar I depression (monotherapy or c̄ Li/DVP), schizophrenia</p>
                      <p className="text-rose-900 font-semibold text-[10px]">Take c̄ ≥350 cal meal</p>
                    </div>

                    <div className="pt-1 border-t border-rose-200/60">
                      <p className="font-extrabold text-slate-950">Cariprazine — Vraylar — SGA (D3/D2 Partial Agonist)</p>
                      <p className="font-bold text-slate-950">Bipolar I depression, bipolar I mania/mixed, MDD adjunct, schizophrenia</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="font-extrabold text-slate-950">Lumateperone — Caplyta — SGA</p>
                      <p className="font-bold text-slate-950">Bipolar I &amp; Bipolar II depression (monotherapy &amp; adjunct), schizophrenia</p>
                    </div>

                    <div className="pt-1 border-t border-rose-200/60">
                      <p className="font-extrabold text-slate-950">Olanzapine — Zyprexa — SGA (SDA / Pine)</p>
                      <p className="font-bold text-slate-950">Bipolar I mania/mixed, schizophrenia, bipolar depression c̄ fluoxetine (Symbyax)</p>
                      <p className="text-slate-500 font-normal">(Treatment-resistant depression, acute agitation)</p>
                    </div>

                    <div className="pt-1 border-t border-rose-200/60">
                      <p className="font-extrabold text-slate-950">Risperidone — Risperdal — SGA (SDA / Done)</p>
                      <p className="font-bold text-slate-950">Bipolar I mania, schizophrenia, autism irritability</p>
                      <p className="text-slate-500 font-normal">(Tourette's)</p>
                    </div>

                    <div className="pt-1 border-t border-rose-200/60">
                      <p className="font-extrabold text-slate-950">Brexpiprazole — Rexulti — SGA (D2 Partial Agonist)</p>
                      <p className="font-bold text-slate-950">MDD adjunct, schizophrenia, Alzheimer's agitation</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notecard 7: Misc. Information — Neurobiology, Buspar & Benzo Safety */}
              <div className="bg-teal-50/70 border-2 border-teal-300 rounded-xl p-4 shadow-sm space-y-3 font-mono text-xs md:col-span-2 lg:col-span-3">
                <div className="flex items-center justify-between border-b border-teal-200 pb-1.5 font-sans">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-teal-950 text-xs tracking-wider uppercase">NOTECARD 7</span>
                    <span className="text-[10px] font-bold bg-teal-200 text-teal-900 px-2 py-0.5 rounded">MISC. INFORMATION</span>
                  </div>
                  <span className="text-[10px] text-teal-800 font-bold uppercase tracking-wider">Clinical Pharmacology &amp; Lab Pearls</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-800 text-[11px] leading-relaxed">
                  {/* Antidepressants & Neurotransmitters */}
                  <div className="bg-white/80 p-3 rounded-lg border border-teal-200/80 space-y-1">
                    <p className="font-black text-teal-950 text-xs uppercase tracking-wide">🧠 Antidepressant Neurobiology</p>
                    <p className="font-bold text-slate-900 mt-1">Regulating Serotonin (5-HT) &amp; Norepinephrine (NE)</p>
                    <p className="text-slate-700">
                      When imbalanced, depleted, or receptor-dysregulated, can lead to persistent <strong>mood changes</strong>, <strong>behavioral shifts</strong> (apathy, withdrawal), and <strong>increased symptoms of anxiety</strong>.
                    </p>
                  </div>

                  {/* Buspar (Buspirone) */}
                  <div className="bg-white/80 p-3 rounded-lg border border-teal-200/80 space-y-1">
                    <p className="font-black text-teal-950 text-xs uppercase tracking-wide">💊 Buspar (Buspirone)</p>
                    <p className="font-bold text-slate-900 mt-1">5-HT1A Partial Agonist &amp; Dopamine Interaction</p>
                    <p className="text-slate-700">
                      Gradually alleviates anxiety symptoms (anxiolytic). <strong>Does NOT cause drowsiness or cognitive impairment</strong>. Non-controlled, non-addictive; requires scheduled daily dosing.
                    </p>
                  </div>

                  {/* Benzodiazepines */}
                  <div className="bg-white/80 p-3 rounded-lg border border-rose-200 space-y-1">
                    <p className="font-black text-rose-950 text-xs uppercase tracking-wide">⚠️ Benzodiazepines Safety</p>
                    <p className="font-bold text-rose-900 mt-1">Short-Term Use Only (1–4 Weeks Max)</p>
                    <p className="text-slate-700">
                      <strong>Tolerance:</strong> Physiological response where continued use requires more and more drug to achieve effect.
                    </p>
                    <p className="text-slate-700">
                      <strong>Dependence:</strong> Physiological and psychological withdrawal symptoms (rebound anxiety, tremors, seizures).
                    </p>
                  </div>
                </div>

                {/* Essential Medical & Lab Rule-Out Checklist */}
                <div className="pt-2 border-t border-teal-200/80 font-sans">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <span className="text-xs font-black text-teal-950 uppercase tracking-wide flex items-center gap-1.5">
                      🔬 Essential Medical &amp; Organic Rule-Outs for Inattention (Before ADHD Stimulants):
                    </span>
                    <span className="text-[10px] text-teal-800 font-bold bg-teal-100/80 px-2 py-0.5 rounded">See "Misc. Information" Tab for 1-Click EHR MDM Note</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-[11px]">
                    <div className="bg-white/90 p-2.5 rounded-lg border border-teal-200/80">
                      <strong className="text-teal-950 block font-black">A1c / Diabetes (DM):</strong>
                      <span className="text-slate-700">Reduced sustained attention, reduced processing speed, impaired executive functioning.</span>
                    </div>
                    <div className="bg-white/90 p-2.5 rounded-lg border border-teal-200/80">
                      <strong className="text-teal-950 block font-black">TSH, Free T3 &amp; T4:</strong>
                      <span className="text-slate-700">Verbal memory, concentration, visuospatial processing (map reading, walking through doors, letters/numbers).</span>
                    </div>
                    <div className="bg-white/90 p-2.5 rounded-lg border border-teal-200/80">
                      <strong className="text-teal-950 block font-black">Sleep &amp; OSA:</strong>
                      <span className="text-slate-700">Inattention &amp; fatigue. Berlin Questionnaire screening; overnight Polysomnography (Sleep Study).</span>
                    </div>
                    <div className="bg-white/90 p-2.5 rounded-lg border border-teal-200/80">
                      <strong className="text-teal-950 block font-black">Anemia &amp; Micronutrients:</strong>
                      <span className="text-slate-700">Inattention workup: Serum Ferritin (iron stores), Vitamin B12, CBC with diff, CMP-14.</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Citations Footer */}
            <div className="pt-2 border-t border-teal-200/60 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] text-slate-500 gap-1 font-sans">
              <span>References: FDA Prescribing Information • Maudsley Prescribing Guidelines (14th Ed) • Stahl's Prescriber's Guide (8th Ed)</span>
              <span className="italic">Notation: Bold = FDA Approved • (Parentheses) = Off-label • c̄ = with • d/o = disorder • DPNP = Diabetic Peripheral Neuropathic Pain • MSK = Musculoskeletal • TRD = Treatment-Resistant Depression</span>
            </div>
          </div>
        )}

        {/* Drug Class Protocol Filter Tabs */}
        <div className="mt-6 p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-black text-white uppercase tracking-wider">
                Cross-Taper Protocol Mode:
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              Filter formulary by class or tap a 1-click evidence-based protocol
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setSelectedCategoryFilter('all')}
              className={`px-3 py-2 rounded-xl font-bold transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
                selectedCategoryFilter === 'all'
                  ? 'bg-white text-slate-950 shadow-md font-black ring-2 ring-white/50'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <span>🌐 All Classes</span>
              <span className="text-[9px] font-normal opacity-70">Complete formulary</span>
            </button>

            <button
              type="button"
              onClick={() => {
                applyPreset('quetiapine', '300 mg', 'aripiprazole', '15 mg', 'antipsychotics');
              }}
              className={`px-3 py-2 rounded-xl font-bold transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
                selectedCategoryFilter === 'antipsychotics'
                  ? 'bg-rose-500 text-white shadow-md font-black ring-2 ring-rose-400/50'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-rose-300'
              }`}
            >
              <span>⚡ Antipsychotics</span>
              <span className="text-[9px] font-normal opacity-80">SGAs (Abilify, Seroquel...)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                applyPreset('divalproex', '1000 mg', 'lamotrigine', '100 mg', 'mood-stabilizers');
              }}
              className={`px-3 py-2 rounded-xl font-bold transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
                selectedCategoryFilter === 'mood-stabilizers'
                  ? 'bg-purple-500 text-white shadow-md font-black ring-2 ring-purple-400/50'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-purple-300'
              }`}
            >
              <span>🧠 Mood Stabilizers</span>
              <span className="text-[9px] font-normal opacity-80">Lamictal, Lithium, Depakote</span>
            </button>

            <button
              type="button"
              onClick={() => {
                applyPreset('sertraline', '100 mg', 'duloxetine', '60 mg', 'antidepressants');
              }}
              className={`px-3 py-2 rounded-xl font-bold transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
                selectedCategoryFilter === 'antidepressants'
                  ? 'bg-teal-500 text-white shadow-md font-black ring-2 ring-teal-400/50'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-teal-300'
              }`}
            >
              <span>💊 Antidepressants</span>
              <span className="text-[9px] font-normal opacity-80">SSRI / SNRI / NDRI</span>
            </button>

            <button
              type="button"
              onClick={() => {
                applyPreset('escitalopram', '20 mg', 'lamotrigine', '100 mg', 'cross-class');
              }}
              className={`col-span-2 sm:col-span-1 px-3 py-2 rounded-xl font-bold transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
                selectedCategoryFilter === 'cross-class'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black ring-2 ring-amber-400/50'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-amber-300'
              }`}
            >
              <span>🔄 Cross-Class</span>
              <span className="text-[9px] font-normal opacity-80">Antidepressant ➔ Mood/SGA</span>
            </button>
          </div>

          {/* 1-Click Clinical Cross-Taper Quick Presets */}
          <div className="pt-2 border-t border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span className="font-bold text-slate-300">⚡ 1-Click Popular Clinical Protocols:</span>
              <span className="italic text-[10px]">Tap to load evidence-based schedule</span>
            </div>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {/* SGA Presets */}
              <button
                type="button"
                onClick={() => applyPreset('quetiapine', '300 mg', 'aripiprazole', '15 mg', 'antipsychotics')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-rose-900/60 border border-slate-700 hover:border-rose-400 text-rose-200 transition-colors flex items-center gap-1.5"
                title="Quetiapine to Aripiprazole: Slower taper prevents rebound cholinergic insomnia & akathisia"
              >
                <span>⚡ Seroquel ➔ Abilify</span>
                <span className="text-[9px] opacity-70 bg-rose-950 px-1 rounded">Receptor Switch</span>
              </button>
              <button
                type="button"
                onClick={() => applyPreset('olanzapine', '10 mg', 'lurasidone', '40 mg', 'antipsychotics')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-rose-900/60 border border-slate-700 hover:border-rose-400 text-rose-200 transition-colors flex items-center gap-1.5"
                title="Olanzapine to Lurasidone: Metabolic & weight improvement switch (take with 350+ cal meal)"
              >
                <span>⚡ Zyprexa ➔ Latuda</span>
                <span className="text-[9px] opacity-70 bg-rose-950 px-1 rounded">Metabolic</span>
              </button>
              <button
                type="button"
                onClick={() => applyPreset('risperidone', '2 mg', 'cariprazine', '3 mg', 'antipsychotics')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-rose-900/60 border border-slate-700 hover:border-rose-400 text-rose-200 transition-colors flex items-center gap-1.5"
                title="Risperidone to Cariprazine: Prolactin normalization and negative symptoms activation"
              >
                <span>⚡ Risperdal ➔ Vraylar</span>
                <span className="text-[9px] opacity-70 bg-rose-950 px-1 rounded">Prolactin / D3</span>
              </button>

              {/* Mood Stabilizer Presets */}
              <button
                type="button"
                onClick={() => applyPreset('divalproex', '1000 mg', 'lamotrigine', '100 mg', 'mood-stabilizers')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-purple-900/60 border border-slate-700 hover:border-purple-400 text-purple-200 transition-colors flex items-center gap-1.5"
                title="Depakote to Lamictal: Halved Lamotrigine starting dose (25mg QOD) due to UGT1A4 inhibition"
              >
                <span>🧠 Depakote ➔ Lamictal</span>
                <span className="text-[9px] font-bold text-amber-300 bg-purple-950 px-1 rounded">⚠️ Halved QOD Dose</span>
              </button>
              <button
                type="button"
                onClick={() => applyPreset('lithium', '600 mg', 'lamotrigine', '100 mg', 'mood-stabilizers')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-purple-900/60 border border-slate-700 hover:border-purple-400 text-purple-200 transition-colors flex items-center gap-1.5"
                title="Lithium to Lamictal: Overlapping cross-titration to maintain bipolar affective coverage"
              >
                <span>🧠 Lithium ➔ Lamictal</span>
                <span className="text-[9px] opacity-70 bg-purple-950 px-1 rounded">Bipolar Maint</span>
              </button>
              <button
                type="button"
                onClick={() => applyPreset('lithium', '900 mg', 'divalproex', '1000 mg', 'mood-stabilizers')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-purple-900/60 border border-slate-700 hover:border-purple-400 text-purple-200 transition-colors flex items-center gap-1.5"
                title="Lithium to Depakote: Acute mania / mixed state transition with TDM trough monitoring"
              >
                <span>🧠 Lithium ➔ Depakote</span>
                <span className="text-[9px] opacity-70 bg-purple-950 px-1 rounded">TDM Trough</span>
              </button>

              {/* Cross-Class Presets */}
              <button
                type="button"
                onClick={() => applyPreset('escitalopram', '20 mg', 'lamotrigine', '100 mg', 'cross-class')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-amber-900/60 border border-slate-700 hover:border-amber-400 text-amber-200 transition-colors flex items-center gap-1.5"
                title="Lexapro to Lamictal: Discontinuing antidepressant monotherapy to prevent manic induction in Bipolar II"
              >
                <span>🔄 Lexapro ➔ Lamictal</span>
                <span className="text-[9px] opacity-70 bg-amber-950 px-1 rounded">Bipolar Switch</span>
              </button>
              <button
                type="button"
                onClick={() => applyPreset('venlafaxine', '150 mg', 'bupropion', '300 mg', 'antidepressants')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-teal-900/60 border border-slate-700 hover:border-teal-400 text-teal-200 transition-colors flex items-center gap-1.5"
                title="Venlafaxine to Bupropion: Step-down schedule avoiding SNRI brain zaps and sexual dysfunction"
              >
                <span>💊 Effexor ➔ Wellbutrin</span>
                <span className="text-[9px] opacity-70 bg-teal-950 px-1 rounded">Low-Discontinuation</span>
              </button>
            </div>
          </div>
        </div>

        {/* Drug Selection Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 p-5 bg-slate-50 rounded-xl border border-slate-200">
          {/* Current Medication (Drug A) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-800 uppercase tracking-wider block">
                1. Current Medication (Tapering Down)
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                {currentMed.category}
              </span>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-slate-600 block">Select Current Drug:</label>
                {selectedCategoryFilter !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setSelectedCategoryFilter('all')}
                    className="text-[10px] text-teal-700 hover:underline font-bold"
                  >
                    Show all classes
                  </button>
                )}
              </div>
              <select
                value={currentMedId}
                onChange={(e) => {
                  const newId = e.target.value;
                  setCurrentMedId(newId);
                  const med = TAPER_MEDICATIONS.find(m => m.id === newId);
                  if (med) setCurrentDose(med.doses[Math.min(1, med.doses.length - 1)]);
                }}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none shadow-2xs"
              >
                {filteredCategories.map(cat => (
                  <optgroup key={cat} label={`── ${cat.toUpperCase()} ──`}>
                    {TAPER_MEDICATIONS.filter(m => m.category === cat).map(m => (
                      <option key={m.id} value={m.id}>{m.name} — ({m.class})</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Current Daily Dose:</label>
              <select
                value={currentDose}
                onChange={(e) => setCurrentDose(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                {currentMed.doses.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg space-y-1">
              <p className="text-[11px] text-slate-500">Half-life: <span className="font-semibold text-slate-700">{currentMed.halfLife}</span></p>
              <p className="text-[10px] text-slate-600 italic">Pearl: {currentMed.pearl}</p>
            </div>
          </div>

          {/* Target Medication (Drug B) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-800 uppercase tracking-wider block">
                2. Target Medication (Titrating Up)
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                {targetMed.category}
              </span>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-slate-600 block">Select Target Drug:</label>
                {selectedCategoryFilter !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setSelectedCategoryFilter('all')}
                    className="text-[10px] text-teal-700 hover:underline font-bold"
                  >
                    Show all classes
                  </button>
                )}
              </div>
              <select
                value={targetMedId}
                onChange={(e) => {
                  const newId = e.target.value;
                  setTargetMedId(newId);
                  const med = TAPER_MEDICATIONS.find(m => m.id === newId);
                  if (med) setTargetDose(med.doses[Math.min(1, med.doses.length - 1)]);
                }}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none shadow-2xs"
              >
                {filteredCategories.map(cat => (
                  <optgroup key={cat} label={`── ${cat.toUpperCase()} ──`}>
                    {TAPER_MEDICATIONS.filter(m => m.category === cat && m.id !== currentMedId).map(m => (
                      <option key={m.id} value={m.id}>{m.name} — ({m.class})</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Target Maintenance Dose:</label>
              <select
                value={targetDose}
                onChange={(e) => setTargetDose(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                {targetMed.doses.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg space-y-1">
              <p className="text-[11px] text-slate-500">Half-life: <span className="font-semibold text-slate-700">{targetMed.halfLife}</span></p>
              <p className="text-[10px] text-slate-600 italic">Pearl: {targetMed.pearl}</p>
            </div>
          </div>
        </div>

        {/* Dynamic High-Priority Clinical Interaction Alerts */}
        {isTargetLamictal && isCurrentDepakote && (
          <div className="mt-4 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-black text-red-950">CRITICAL PHARMACOKINETIC INTERACTION: Valproate + Lamotrigine</p>
              <p className="mt-0.5">
                Divalproex inhibits lamotrigine glucuronidation (UGT1A4), doubling lamotrigine serum levels and drastically elevating Stevens-Johnson Syndrome (SJS/TEN) risk. Lamotrigine starting dose MUST be reduced to <strong>25 mg every other day (QOD)</strong> for the first 2 weeks.
              </p>
            </div>
          </div>
        )}

        {isTargetLamictal && isCurrentCarbamazepine && (
          <div className="mt-4 p-3.5 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-black text-amber-950">HEPATIC ENZYME INDUCTION: Carbamazepine + Lamotrigine</p>
              <p className="mt-0.5">
                Carbamazepine (Tegretol) strongly induces UGT glucuronidation enzymes, halving Lamictal serum concentrations. The initial titration dose must be doubled (starting at <strong>50 mg daily</strong> instead of 25 mg) under close clinical supervision.
              </p>
            </div>
          </div>
        )}

        {isTargetLamictal && !isCurrentDepakote && !isCurrentCarbamazepine && (
          <div className="mt-4 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-950">BLACK BOX WARNING PROTOCOL: Mandatory Slow Lamotrigine Titration</p>
              <p className="mt-0.5">
                Regardless of which medication is being tapered off, Lamotrigine must adhere strictly to the 6-week slow titration steps (25mg x 2 wks, 50mg x 2 wks, 100mg x 1 wk) to minimize life-threatening Stevens-Johnson Syndrome (SJS/TEN).
              </p>
            </div>
          </div>
        )}

        {isBothAntipsychotics && !isPineToOtherAntipsychotic && !isToPartialAgonist && !isFromPartialAgonist && (
          <div className="mt-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-start gap-2.5">
            <Info className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-rose-950">ANTIPSYCHOTIC (SGA) CROSS-TITRATION PROTOCOL</p>
              <p className="mt-0.5">
                Overlapping cross-titration maintains continuous dopamine D2 and 5-HT2A receptor coverage to prevent symptom recurrence. Assess motor symptoms (EPS/akathisia) and metabolic profiles weekly throughout the 4-week transition.
              </p>
            </div>
          </div>
        )}

        {isAntidepressantToMoodStabilizer && (
          <div className="mt-4 p-3.5 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-900 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-purple-950">BIPOLAR MOOD STABILIZER SWITCH PROTOCOL</p>
              <p className="mt-0.5">
                Tapering off antidepressant monotherapy while initiating a mood stabilizer reduces the risk of mood destabilization, rapid cycling, or manic switch. Daily mood logs (sleep latency, energy levels) are recommended.
              </p>
            </div>
          </div>
        )}

        {isPineToOtherAntipsychotic && (
          <div className="mt-4 p-3.5 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900 flex items-start gap-2.5">
            <Info className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-indigo-950">RECEPTOR SWITCH WARNING: Anticholinergic & Histaminic Rebound</p>
              <p className="mt-0.5">
                Tapering down from high-H1/M1 "pines" (Quetiapine/Olanzapine) to "dones" or partial agonists can trigger rapid rebound insomnia, diaphoresis, nausea, and agitation. Slow 4-week step-down protocol applied.
              </p>
            </div>
          </div>
        )}

        {(isToPartialAgonist || isFromPartialAgonist) && (
          <div className="mt-4 p-3.5 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-900 flex items-start gap-2.5">
            <Info className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-purple-950">DOPAMINE D2 RECEPTOR SWITCH: Partial Agonist Kinetics</p>
              <p className="mt-0.5">
                Switching to or from high-affinity D2 partial agonists (Aripiprazole, Cariprazine, Brexpiprazole) requires overlapping cross-titration to prevent receptor displacement agitation or akathisia.
              </p>
            </div>
          </div>
        )}

        {(isLithiumTransition || isValproateTransition) && (
          <div className="mt-4 p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
            <Activity className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-blue-950">THERAPEUTIC DRUG MONITORING (TDM) REQUIRED</p>
              <p className="mt-0.5">
                Order a 12-hour post-dose serum trough level 5–7 days after dosage changes. Target Lithium trough: 0.6–0.8 mEq/L (maintenance). Target Valproate trough: 50–125 mcg/mL.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Cross-Taper Schedule Table & Printable Handout */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 print:border-none print:shadow-none print:p-0">
        
        {/* Printable Header (Visible ONLY when printing) */}
        <div className="hidden print:block border-b-2 border-teal-800 pb-4 mb-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <img 
                src="./icon-192.png" 
                alt="PsyNurse Clinic Logo" 
                className="w-12 h-12 object-contain" 
              />
              <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">PSYCHIATRIC NURSE PRACTITIONER SERVICES</h1>
                <p className="text-xs font-bold text-teal-800">Monica Preder, ARNP, PMHNP-BC • Board Certified Psychiatric Nurse Practitioner</p>
                <p className="text-[10px] text-slate-500">Telehealth Practice: Washington State • Web: psychiatristnurse.com</p>
              </div>
            </div>
            <div className="text-right text-[11px] text-slate-600">
              <p className="font-bold">Patient Medication Transition Plan</p>
              <p>Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>
          <div className="mt-3 bg-slate-50 p-2.5 rounded border border-slate-200 text-xs flex justify-between">
            <div><span className="font-bold text-slate-700">Tapering Off:</span> {currentMed.name} ({currentDose})</div>
            <div><span className="font-bold text-teal-800">Transitioning To:</span> {targetMed.name} (Target: {targetDose})</div>
          </div>
        </div>

        {/* Action Header (Hidden on Print) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-600" />
            <div>
              <h3 className="text-base font-black text-slate-900">
                Week-by-Week Transition Protocol
              </h3>
              <p className="text-xs text-slate-500">
                {schedule.length}-week evidence-based transition schedule
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white px-3.5 py-2 rounded-xl transition-all shadow-sm"
              title="Print or save as PDF patient handout"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF Handout</span>
            </button>
            <button
              onClick={copyInstructions}
              className="flex items-center gap-1.5 text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white px-3.5 py-2 rounded-xl transition-all shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Clipboard className="w-3.5 h-3.5" />}
              {copied ? 'Copied Patient Instructions!' : 'Copy Patient Portal Instructions'}
            </button>
          </div>
        </div>

        {/* Schedule Cards */}
        <div className="space-y-3">
          {schedule.map((step, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all print:bg-white print:border-slate-300 print:p-3 print:break-inside-avoid">
              <div className="flex items-center justify-between mb-2">
                <span className="font-black text-sm text-teal-900 bg-teal-100/70 px-2.5 py-0.5 rounded-md print:bg-teal-50 print:border print:border-teal-200">
                  {step.week}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs print:grid-cols-2">
                <div className="p-2.5 bg-red-50/50 border border-red-100 rounded-lg print:border-slate-300 print:bg-white">
                  <span className="font-bold text-red-900 block mb-0.5">Tapering Drug A ({currentMed.name}):</span>
                  <span className="text-slate-800 font-medium">{step.drugA}</span>
                </div>
                <div className="p-2.5 bg-emerald-50/50 border border-emerald-100 rounded-lg print:border-slate-300 print:bg-white">
                  <span className="font-bold text-emerald-900 block mb-0.5">Starting Drug B ({targetMed.name}):</span>
                  <span className="text-slate-800 font-medium">{step.drugB}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 italic print:text-slate-700">
                Instructions: {step.notes}
              </p>
            </div>
          ))}
        </div>

        {/* Patient Safety Guidance & Call-Outs for Handout */}
        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5 mt-4 print:bg-white print:border-slate-300 print:text-slate-800">
          <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5 print:hidden" />
          <div className="space-y-1">
            <p>
              <strong>Important Safety Reminders:</strong> Take doses consistently with food and water. Mild temporary adjustments (mild fatigue or stomach upset) can occur during the first week.
            </p>
            {targetMed.id === 'lurasidone' && (
              <p className="font-semibold text-amber-950">
                • Lurasidone (Latuda) MUST be taken with a meal or snack containing at least 350 calories for proper absorption.
              </p>
            )}
            {targetMed.id === 'lamotrigine' && (
              <p className="font-semibold text-amber-950">
                • Lamictal: Immediately report any new rash, fever, or blistering. If you miss doses for more than 4-5 days, do not take your regular dose—contact the clinic to restart safely.
              </p>
            )}
            {isLithiumTransition && (
              <p className="font-semibold text-blue-950">
                • Lithium: Drink plenty of water throughout the day. Avoid over-the-counter NSAIDs (ibuprofen, naproxen) without consulting the provider.
              </p>
            )}
            <p>
              If you experience sudden high fever, rapid heartbeat, shivering, severe agitation, or allergic rash, contact the clinic or emergency services immediately.
            </p>
          </div>
        </div>

        {/* Printable Sign-off / Footer (Visible ONLY when printing) */}
        <div className="hidden print:block pt-6 mt-6 border-t border-slate-300 text-xs text-slate-600">
          <div className="flex justify-between items-end">
            <div>
              <p className="font-bold text-slate-900">Monica Preder, ARNP, PMHNP-BC</p>
              <p className="text-[10px]">Licensed Psychiatric Mental Health Nurse Practitioner</p>
              <p className="text-[10px]">Questions? Contact through the patient portal or phone.</p>
            </div>
            <div className="text-right">
              <div className="border-b border-slate-400 w-48 mb-1"></div>
              <p className="text-[10px] text-slate-500">Provider Signature / Authorization</p>
            </div>
          </div>
        </div>

      </div>

      </>}
    </div>
  );
}

