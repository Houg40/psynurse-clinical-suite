import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldCheck, 
  FileCheck, 
  ArrowLeftRight, 
  HeartPulse, 
  Stethoscope, 
  AlertOctagon, 
  Flame, 
  Activity, 
  Pill, 
  CheckCircle2,
  Syringe,
  Search,
  ChevronDown,
  ChevronUp,
  Layers,
  Check,
  Zap,
  Info
} from 'lucide-react';

const ANTIPSYCHOTIC_EQUIVALENCIES = [
  {
    id: 'haloperidol',
    name: 'Haloperidol (Haldol)',
    class: 'Typical (FGA) - High Potency Butyrophenone',
    category: 'typical',
    hasAcuteIm: true,
    hasLai: true,
    oralDose: '2 – 20 mg/day (Acute psychosis target: 4 – 10 mg/day; >15 mg/day offers minimal added efficacy, high EPS)',
    acuteImDose: '2 – 5 mg IM q4-8h prn (Max 20 mg/day; severe crisis: up to 10 mg IM)',
    acuteRatio: '2:1 (Oral to Acute IM)',
    acuteKinetics: 'Onset: 20–30 min | Peak: 30–45 min | Duration: 4–8 hrs',
    laiDepotName: 'Haloperidol Decanoate (IM q4wk)',
    laiDepotDose: '10–20× daily oral dose (monthly IM q4wk). Standard target: 50–200 mg q4wk (Max 450 mg/month).',
    oralOverlap: 'Overlap oral Haldol for 2–3 months while decanoate reaches steady state; OR utilize a loading dose strategy (e.g. 20× oral dose divided into 100 mg initial injection, remainder in 3–7 days).',
    bioavailability: 'Oral ~50% (first-pass hepatic clearance). Acute IM ~100% bioavailable; hence 5 mg IM ≈ 10 mg PO.',
    blackBoxAlert: 'Elderly patients with dementia-related psychosis are at increased risk of death. High risk of Acute Dystonia (treat with Diphenhydramine 50 mg IM or Benztropine 1–2 mg IM stat) and QTc prolongation (Torsades risk especially with IV route).',
    secondOpinionPearls: [
      'Conversion Formula: For stable low-relapse outpatients, multiply oral daily dose by 10–15×. For rapid metabolizers or high-relapse patients, multiply by 20×.',
      'Split-Dose Rule: If the calculated initial monthly dose exceeds 100 mg, divide into two injections separated by 3–7 days to prevent acute peak toxicity and severe dystonic reactions.',
      'Administration Technique: Deep gluteal IM injection is required for Decanoate (Z-track method, 21G needle) to prevent oil leakage into subcutaneous adipose tissue.'
    ]
  },
  {
    id: 'olanzapine',
    name: 'Olanzapine (Zyprexa / Zydis)',
    class: 'Atypical (SGA) - Thienobenzodiazepine',
    category: 'atypical',
    hasAcuteIm: true,
    hasLai: true,
    oralDose: '5 – 20 mg/day PO (Zydis ODT bioequivalent; 1st-line for refusal before forced IM)',
    acuteImDose: '5 – 10 mg IM q2-4h prn (Max 30 mg/day; geriatric/debilitated: 2.5–5 mg IM)',
    acuteRatio: '1:1 to 1.5:1 (Oral to Acute IM)',
    acuteKinetics: 'Onset: 15–30 min | Peak: 15–45 min | Duration: 24 hrs',
    laiDepotName: 'Zyprexa Relprevv (Olanzapine Pamoate)',
    laiDepotDose: '150–300 mg q2wk or 300–405 mg q4wk depending on baseline oral dose (10–20 mg/day)',
    oralOverlap: 'No oral overlap required if switching from oral olanzapine; Relprevv releases rapidly.',
    bioavailability: 'Oral ~60–85% bioavailable. Acute IM achieves 5-fold higher peak concentrations (Cmax) than equivalent oral dose.',
    blackBoxAlert: 'LETHAL INTERACTION WARNING: Never co-administer IM Olanzapine and IM Lorazepam (Ativan) within 1 to 2 hours of each other. Severe fatal synergistic respiratory depression, profound hypotension, and bradycardia have resulted. Relprevv requires REMS 3-hour post-injection observation for Post-Injection Delirium Sedation Syndrome (PDSS).',
    secondOpinionPearls: [
      'Second Opinion Pearl: For agitated patients refusing pills, offer Zydis ODT before escalating to physical restraint and IM injection. Zydis dissolves on the tongue in <5 seconds and cannot be easily cheeked.',
      'Vital Signs Protocol: When acute IM Zyprexa is administered, monitor vitals, pulse oximetry, and airway patency q15min for the first hour.',
      'Smoking Interaction: Tobacco smoke induces CYP1A2, increasing Olanzapine clearance by up to 50%. A patient discharged to a smoke-free facility or quitting smoking will experience a ~50% jump in blood levels.'
    ]
  },
  {
    id: 'aripiprazole',
    name: 'Aripiprazole (Abilify / Maintena / Aristada)',
    class: 'Atypical (SGA) - D2 Partial Agonist',
    category: 'atypical',
    hasAcuteIm: true,
    hasLai: true,
    oralDose: '10 – 30 mg/day (Target: 10–15 mg/day in schizophrenia/bipolar mania)',
    acuteImDose: '9.75 mg IM single dose (Range: 5.25–15 mg IM; max 30 mg/day combined with oral)',
    acuteRatio: '1:1 (Oral to Acute IM equivalent)',
    acuteKinetics: 'Onset: 30–60 min | Peak: 1–3 hrs | T½: ~75 hrs',
    laiDepotName: 'Abilify Maintena (q4wk) OR Aristada (lauroxil: q4wk, q6wk, or q8wk)',
    laiDepotDose: 'Maintena: 400 mg IM monthly (reduce to 300 mg for CYP2D6/CYP3A4 poor metabolizers). Aristada: 441 mg, 662 mg, 882 mg monthly, or 1064 mg q6-8wk.',
    oralOverlap: 'Maintena: MANDATORY 14 days concurrent oral aripiprazole (10–20 mg). Aristada: MANDATORY 21 days concurrent oral aripiprazole; OR use Aristada Initio (675 mg IM) + ONE single 30 mg oral dose on Day 1 to eliminate the 21-day wait!',
    bioavailability: 'Oral ~87% bioavailable. T½ is exceptionally long (~75 hours; up to 146 hours in poor CYP2D6 metabolizers).',
    blackBoxAlert: 'Increased mortality in elderly dementia patients; Suicidality warning in children/young adults. Akathisia risk is prominent during titration—often misdiagnosed as worsening psychiatric agitation.',
    secondOpinionPearls: [
      'Second Opinion Pearl: D2 partial agonism has exceptionally high receptor binding affinity. If switching a patient from a high-dose full antagonist (Haldol, Zyprexa) to Aripiprazole, cross-titrate slowly to avoid dopamine withdrawal psychosis or acute rebound akathisia.',
      'The Aristada Initio Bridge: 1 injection of Initio (675 mg) + 1 injection of Aristada + 1 single oral 30 mg dose on Day 1 completely bypasses the standard 3-week oral bridge, guaranteeing instant adherence.',
      'Injection Site Rules: Maintena can be given in deltoid or gluteal; Aristada 882 mg and 1064 mg must be given deep gluteal.'
    ]
  },
  {
    id: 'risperidone',
    name: 'Risperidone (Risperdal / Consta / Perseris / Uzedy)',
    class: 'Atypical (SGA) - Benzisoxazole',
    category: 'atypical',
    hasAcuteIm: false,
    hasLai: true,
    oralDose: '2 – 8 mg/day (Standard target: 2–4 mg/day; >6 mg/day increases EPS and hyperprolactinemia exponentially)',
    acuteImDose: 'Not available as acute short-acting IM (use Oral M-TAB ODT for acute refusal)',
    acuteRatio: 'Oral to LAI conversion depends on specific formulation (see below)',
    acuteKinetics: 'Oral peak: 1 hr (solution/M-TAB) to 3 hrs (tablets) | Active moiety T½: ~20 hrs',
    laiDepotName: 'Risperdal Consta (IM q2wk) | Perseris (SC monthly) | Uzedy (SC monthly/bimonthly)',
    laiDepotDose: 'Consta: 25 mg, 37.5 mg, or 50 mg IM q2wk. Perseris: 90 mg or 120 mg SC q4wk. Uzedy: 50–250 mg SC monthly or bimonthly.',
    oralOverlap: 'Consta: STRICT MANDATORY 21-DAY ORAL OVERLAP! Microsphere polymers take 3 weeks to degrade and release therapeutic drug. Perseris & Uzedy: NO oral overlap required (therapeutic plasma levels reached within 24 hours of subcutaneous injection).',
    bioavailability: 'Oral ~70% bioavailable. Extensive conversion via CYP2D6 to 9-hydroxyrisperidone (paliperidone).',
    blackBoxAlert: 'Increased mortality in elderly patients with dementia. Potent hyperprolactinemia (gynecomastia, galactorrhea, amenorrhea, sexual dysfunction, bone demineralization). Dose-dependent EPS above 6 mg/day.',
    secondOpinionPearls: [
      'Second Opinion Pearl: The 21-day Consta oral lag is the #1 cause of relapse during LAI transition. If patient cannot adhere to oral pills for 3 weeks, do NOT use Consta—choose Perseris/Uzedy SC or Paliperidone (Invega Sustenna) which need zero oral overlap.',
      'Equivalence Ratios: Oral 2 mg/day ≈ Consta 25 mg q2wk ≈ Perseris 90 mg SC monthly ≈ Uzedy 75 mg SC monthly.',
      'Higher Dose Ratios: Oral 4 mg/day ≈ Consta 37.5–50 mg q2wk ≈ Perseris 120 mg SC monthly ≈ Uzedy 100–125 mg SC monthly.'
    ]
  },
  {
    id: 'paliperidone',
    name: 'Paliperidone (Invega / Sustenna / Trinza / Hafyera)',
    class: 'Atypical (SGA) - Active 9-OH Hydroxy Metabolite',
    category: 'atypical',
    hasAcuteIm: false,
    hasLai: true,
    oralDose: '3 – 12 mg/day PO (Invega ER osmotic release OROS tablet; cannot be chewed or crushed)',
    acuteImDose: 'Not available as acute short-acting IM',
    acuteRatio: 'Oral Invega 3 mg ≈ Sustenna 78 mg/mo; 6 mg ≈ Sustenna 117 mg/mo; 9 mg ≈ Sustenna 156 mg/mo; 12 mg ≈ Sustenna 234 mg/mo',
    acuteKinetics: 'Oral ER peak: 24 hrs steady state | Minimal hepatic CYP metabolism (eliminated primarily via renal excretion)',
    laiDepotName: 'Invega Sustenna (1-month IM) | Invega Trinza (3-month IM) | Invega Hafyera (6-month IM)',
    laiDepotDose: 'Sustenna Loading Protocol: Day 1 = 234 mg IM (DELTOID); Day 8 = 156 mg IM (DELTOID); then monthly maintenance = 117 mg IM (range: 39–234 mg IM deltoid or gluteal).',
    oralOverlap: 'NO ORAL OVERLAP REQUIRED! The Day 1 (234 mg) and Day 8 (156 mg) deltoid loading injections rapidly achieve and sustain therapeutic levels.',
    bioavailability: 'Oral ER ~28% bioavailable. Renal excretion ~80% unchanged; ideal for hepatic dysfunction, caution in renal impairment (CrCl <50 mL/min).',
    blackBoxAlert: 'Increased mortality in elderly dementia patients. Dose-dependent QTc prolongation, hyperprolactinemia, and extrapyramidal symptoms.',
    secondOpinionPearls: [
      'Second Opinion Pearl: Both Day 1 and Day 8 loading doses MUST be administered in the DELTOID muscle. Deltoid vascularity produces 28% higher peak concentrations than the gluteal muscle, guaranteeing rapid therapeutic coverage without pills.',
      'Conversion to Trinza: Patient must be stabilized on Invega Sustenna for at least 4 months before switching to 3-month Trinza (dose = Sustenna dose × 3.5).',
      'Conversion to Hafyera: Patient must be stabilized on Sustenna for ≥4 months or Trinza for ≥1 cycle before switching to 6-month Hafyera.'
    ]
  },
  {
    id: 'ziprasidone',
    name: 'Ziprasidone (Geodon)',
    class: 'Atypical (SGA) - Piperazinyl Heterocyclic',
    category: 'atypical',
    hasAcuteIm: true,
    hasLai: false,
    oralDose: '40 – 80 mg BID PO with food (MANDATORY ≥500 calorie meal; bioavailability drops 50% on empty stomach!)',
    acuteImDose: '10 – 20 mg IM q2-4h prn (Max 40 mg/day IM; consecutive IM dosing safety is limited to 3 consecutive days)',
    acuteRatio: '1:4 to 1:5 (Acute IM 10 mg ≈ Oral 40–50 mg; IM is 100% bioavailable without food dependency)',
    acuteKinetics: 'Onset: 15–30 min | Peak: 30–60 min | T½: 2–5 hrs (rapid clearance)',
    laiDepotName: 'No LAI Formulation Available',
    laiDepotDose: 'N/A (Oral or Acute IM only)',
    oralOverlap: 'When transitioning from acute IM to oral, administer first oral dose with next regular meal (≥500 kcal).',
    bioavailability: 'Oral ~60% with food; ~30% fasting! Acute IM is 100% bioavailable and does NOT require food.',
    blackBoxAlert: 'Dose-dependent QTc prolongation (mean increase 10–20 msec; higher than most SGAs). Contraindicated with known QTc prolongation (>450 msec in men, >470 msec in women), recent acute MI, or uncompensated heart failure.',
    secondOpinionPearls: [
      'Second Opinion Pearl: "Pseudo-treatment resistance" with Geodon is almost always caused by taking pills without a 500-calorie meal. Verify meal compliance before declaring non-response.',
      'Low Sedation/Respiratory Risk: Geodon acute IM is one of the most effective non-sedating IM options for acute agitated psychosis, with low risk of respiratory depression compared to Zyprexa/benzodiazepines.',
      'Consecutive Limit: Limit acute IM to 3 consecutive days; transition patient to oral Geodon or alternative maintenance medication.'
    ]
  },
  {
    id: 'fluphenazine',
    name: 'Fluphenazine (Prolixin)',
    class: 'Typical (FGA) - Piperazine Phenothiazine',
    category: 'typical',
    hasAcuteIm: true,
    hasLai: true,
    oralDose: '2.5 – 10 mg/day PO (Max 20 mg/day)',
    acuteImDose: '1.25 – 2.5 mg IM (as HCl) q6-8h prn (Max 10 mg/day acute IM)',
    acuteRatio: '2:1 (Oral to Acute IM HCl)',
    acuteKinetics: 'Acute HCl Onset: 15–30 min | Peak: 1–2 hrs | Duration: 6–8 hrs',
    laiDepotName: 'Fluphenazine Decanoate (IM q2-3wk)',
    laiDepotDose: '1.25× oral daily dose = Decanoate dose in mg administered IM every 2 weeks (e.g. 10 mg/day oral ≈ 12.5 mg Decanoate q2wk).',
    oralOverlap: 'Overlap oral fluphenazine for 2 to 4 weeks while decanoate depot reaches steady state.',
    bioavailability: 'Oral ~40–50% due to first-pass metabolism. Depot decanoate releases slowly over 2–3 weeks.',
    blackBoxAlert: 'Increased mortality in elderly dementia patients. Very high risk of Extrapyramidal Symptoms (EPS), Acute Dystonic reactions (up to 30% in young males), and Tardive Dyskinesia with prolonged use.',
    secondOpinionPearls: [
      'Second Opinion Pearl: Never inject Fluphenazine Decanoate into a patient without an initial oral or acute HCl tolerability challenge to rule out severe hypersensitivity or acute catastrophic dystonia.',
      'Allergy Alert: Fluphenazine decanoate is formulated in sesame oil; verify patient has no sesame seed or oil allergy before injection.',
      'Prophylactic EPS Orders: Co-prescribe or have Benztropine 1–2 mg IM available on standing orders whenever initiating Fluphenazine.'
    ]
  },
  {
    id: 'chlorpromazine',
    name: 'Chlorpromazine (Thorazine)',
    class: 'Typical (FGA) - Low Potency Phenothiazine',
    category: 'typical',
    hasAcuteIm: true,
    hasLai: false,
    oralDose: '100 – 800 mg/day PO (Historical standard: 100 mg CPZ = Clinical Equivalence Baseline)',
    acuteImDose: '25 – 50 mg IM deep gluteal (May repeat in 1 hour if needed; max 400 mg/day)',
    acuteRatio: '2:1 to 4:1 (Oral to Acute IM)',
    acuteKinetics: 'Onset: 15–30 min | Peak: 30–60 min | Duration: 4–8 hrs',
    laiDepotName: 'No LAI Formulation Available',
    laiDepotDose: 'N/A (Historical baseline for CPZ equivalencies)',
    oralOverlap: 'N/A',
    bioavailability: 'Oral ~30% (extensive first-pass hepatic metabolism and gut wall breakdown).',
    blackBoxAlert: 'Severe Orthostatic Hypotension and Syncope (potent alpha-1 adrenergic antagonism). Patient MUST remain recumbent/supine for 30–60 minutes following acute IM injection. Check BP prior to ambulation.',
    secondOpinionPearls: [
      'Second Opinion Pearl: Chlorpromazine 100 mg PO is the historical gold standard "CPZ Equivalent" benchmark against which all psychiatric dosing potency is calculated (e.g. 2 mg Haldol ≈ 100 mg CPZ; 5 mg Zyprexa ≈ 100 mg CPZ; 2 mg Risperdal ≈ 100 mg CPZ).',
      'Sedation & Seizure Warning: Chlorpromazine produces prominent anticholinergic and antihistaminic sedation, corneal/lens deposits with long-term high dose therapy, and significant seizure threshold reduction.',
      'Deep Gluteal Injection: Deep gluteal injection is mandatory to prevent sterile abscess and local skin irritation.'
    ]
  }
];

export default function SafetyGuide() {
  const [antipsychoticSearch, setAntipsychoticSearch] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('all');
  const [expandedDrugId, setExpandedDrugId] = useState(null);

  const filteredAntipsychotics = ANTIPSYCHOTIC_EQUIVALENCIES.filter(drug => {
    const matchesSearch = 
      drug.name.toLowerCase().includes(antipsychoticSearch.toLowerCase()) ||
      drug.class.toLowerCase().includes(antipsychoticSearch.toLowerCase()) ||
      drug.laiDepotName.toLowerCase().includes(antipsychoticSearch.toLowerCase());
    
    if (!matchesSearch) return false;
    if (selectedClassFilter === 'atypical') return drug.category === 'atypical';
    if (selectedClassFilter === 'typical') return drug.category === 'typical';
    if (selectedClassFilter === 'acute_im') return drug.hasAcuteIm;
    if (selectedClassFilter === 'lai') return drug.hasLai;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Disclaimer Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 shadow-sm flex items-start gap-3.5">
        <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <strong className="font-bold block text-sm mb-1 text-amber-950">
            Clinical Decision Support (CDS) & FDA Non-Device Notice
          </strong>
          This system is an evidence-based clinical reference tool designed pursuant to Section 3060(a) of the 21st Century Cures Act. It does not replace independent clinical judgment, diagnostic assessment, or individualized patient evaluation by a licensed healthcare provider (Monica Preder, ARNP).
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Bipolar Manic Switch Guardrail */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5 text-red-700 font-black text-base">
            <HeartPulse className="w-5 h-5 text-red-600" />
            <span>Bipolar Screening & Antidepressant Induced Mania</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Un-adjuncted SSRI or SNRI monotherapy in patients with unrecognized bipolar spectrum illness carries significant risk of precipitating acute hypomania, mania, or rapid cycling.
          </p>
          <div className="p-3 bg-red-50/70 border border-red-200 rounded-xl text-xs space-y-1.5 text-red-950">
            <strong className="font-bold block text-red-900">Mandatory Screening Protocol:</strong>
            <p>1. Administer the 13-item MDQ prior to initiating or escalating any antidepressant trial.</p>
            <p>2. Ask specifically: <em>"Has anyone ever commented that you were talking too fast or had abnormally high energy requiring little to no sleep?"</em></p>
            <p>3. If screen is positive: Evaluate mood stabilizers (Lamotrigine, Lithium, or atypical antipsychotic) prior to or in combination with serotonergic agents.</p>
          </div>
        </div>

        {/* Card 2: WA State & Controlled Substance Rules */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5 text-slate-900 font-black text-base">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <span>WA State Telehealth & Controlled Substances</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Prescribing Schedule II CNS stimulants (Adderall, Vyvanse, Concerta) across Washington State requires strict compliance with federal and state telehealth statutes.
          </p>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1.5 text-slate-800 font-medium">
            <p>✓ <strong>WA State PDMP Check:</strong> Verify prescription drug monitoring history prior to every initial controlled substance issue and periodic refills.</p>
            <p>✓ <strong>Patient Location Verification:</strong> Confirm and document patient is physically located within Washington State at the time of each telehealth encounter.</p>
            <p>✓ <strong>Vital Sign Tracking:</strong> Document resting blood pressure and pulse at baseline and during ongoing stimulant titration.</p>
          </div>
        </div>

        {/* Card 3: Antidepressant Cross-Tapering Guidelines */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5 text-slate-900 font-black text-base">
            <ArrowLeftRight className="w-5 h-5 text-teal-600" />
            <span>Cross-Tapering & Discontinuation Prevention</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Abrupt discontinuation of short half-life agents (Venlafaxine, Paroxetine) produces severe discontinuation syndrome (brain zaps, electric shocks, dizziness, flu-like symptoms).
          </p>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1.5 text-slate-800">
            <p>• <strong>Cross-Taper Method:</strong> Gradually reduce Drug A by 25-50% while concurrently starting Drug B at half starting dose over 1-2 weeks.</p>
            <p>• <strong>Direct Switch Exception:</strong> Fluoxetine (Prozac) has an active metabolite half-life of up to 15 days, providing an inherent "self-taper." Another SSRI can often be started the day after stopping fluoxetine.</p>
            <p>• <strong>MAOI Washout:</strong> Mandatory 14-day washout period (5 weeks for fluoxetine) before any MAO inhibitor to avoid fatal Serotonin Syndrome.</p>
          </div>
        </div>

        {/* Card 4: Black Box Warnings & Common Monitoring */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5 text-slate-900 font-black text-base">
            <FileCheck className="w-5 h-5 text-teal-600" />
            <span>Essential Psychiatric Monitoring Checklist</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Key baseline and periodic laboratory monitoring by drug class:
          </p>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg">
              <strong className="text-slate-900 block">Lamotrigine (Lamictal):</strong>
              <span className="text-slate-600">Strict patient education on SJS/TEN rash. Re-titrate from 25mg if missed for &gt;5 days.</span>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg">
              <strong className="text-slate-900 block">Bupropion (Wellbutrin):</strong>
              <span className="text-slate-600">Strict rule-out for seizure disorders, active anorexia, or active bulimia nervosa.</span>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg">
              <strong className="text-slate-900 block">Citalopram / High-dose Escitalopram:</strong>
              <span className="text-slate-600">ECG / QTc interval monitoring if age &gt;60 or on concurrent QTc prolonging agents.</span>
            </div>
            {/* ── NEW: Depakote Myoclonus Rule ── */}
            <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <strong className="text-red-950 block">Divalproex / Valproate (Depakote) — Myoclonus:</strong>
                <span className="text-[10px] font-bold bg-red-200 text-red-900 px-1.5 py-0.5 rounded ml-2 whitespace-nowrap">ACTION REQUIRED</span>
              </div>
              <span className="text-red-900 leading-relaxed">
                <strong>If a patient on Depakote reports dropping objects, clumsiness, or involuntary jerking:</strong> this is a <strong>myoclonus red flag</strong> — a known dose-related adverse effect of valproate. Obtain <strong>Valproate serum trough level</strong>, <strong>serum Ammonia</strong> (valproate-induced hyperammonemic encephalopathy can be insidious), and a <strong>CMP-14</strong> (hepatotoxicity, electrolytes). Hold or dose-reduce pending results if neurotoxicity is suspected.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width Card: Depakote Toxicity & Myoclonus Safety Alert */}
      <div className="bg-white rounded-2xl border-2 border-red-300 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-red-100 pb-4">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="text-base font-black text-red-950">Depakote (Valproate) — Myoclonus & Dropping Objects: Toxicity Rule-Out</h3>
              <p className="text-xs text-red-700 mt-0.5">Dose-related neurotoxicity sign requiring urgent labs</p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-white bg-red-600 px-3 py-1 rounded-full self-start whitespace-nowrap">
            ⚠️ Safety Rule-Out
          </span>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed">
          Valproic acid (Depakote / Depakene) can cause <strong>myoclonus</strong> — involuntary, sudden muscle jerks — as a dose-related central nervous system adverse effect. When a patient on valproate reports <strong>dropping objects, hand tremors, or uncoordinated movements</strong>, this should immediately trigger a toxicity rule-out workup rather than being dismissed as anxiety or clumsiness.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Lab 1 */}
          <div className="p-3.5 bg-red-50/60 border border-red-200 rounded-xl space-y-1.5">
            <div className="flex items-center justify-between">
              <strong className="font-extrabold text-red-950 text-xs">1. Valproate Serum Level</strong>
              <span className="text-[10px] font-mono text-red-700 bg-red-100 px-1.5 py-0.5 rounded">Trough</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed">
              Draw as a <strong>12-hour trough</strong> (just before morning dose). Therapeutic range: <strong>50–125 mcg/mL</strong>. Levels &gt;100–125 mcg/mL significantly increase neurotoxicity risk, particularly myoclonus, ataxia, and sedation.
            </p>
          </div>

          {/* Lab 2 */}
          <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-xl space-y-1.5">
            <div className="flex items-center justify-between">
              <strong className="font-extrabold text-amber-950 text-xs">2. Serum Ammonia (NH₃)</strong>
              <span className="text-[10px] font-mono text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">Urgent</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed">
              Valproate inhibits the urea cycle, causing <strong>hyperammonemic encephalopathy (VHE)</strong> — which can occur even with <em>normal</em> drug levels. Presents as confusion, asterixis, myoclonus, and reduced consciousness. Normal NH₃: <strong>&lt;35 μmol/L</strong>. Elevated = discontinue and consult.
            </p>
          </div>

          {/* Lab 3 */}
          <div className="p-3.5 bg-slate-50/80 border border-slate-200 rounded-xl space-y-1.5">
            <div className="flex items-center justify-between">
              <strong className="font-extrabold text-slate-900 text-xs">3. CMP-14</strong>
              <span className="text-[10px] font-mono text-slate-600 bg-slate-200 px-1.5 py-0.5 rounded">Hepatic / Metabolic</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed">
              Check <strong>LFTs (AST, ALT, total bilirubin)</strong> for hepatotoxicity, <strong>electrolytes</strong> (hyponatremia can potentiate CNS effects), and <strong>glucose</strong>. Valproate carries a Black Box Warning for <strong>fatal hepatic failure</strong> — especially in children under 2 on polytherapy.
            </p>
          </div>
        </div>

        <div className="p-3 bg-red-100/60 border border-red-200 rounded-xl text-xs text-red-950 space-y-1 font-medium">
          <p className="font-black">Clinical Decision Points:</p>
          <p>• <strong>Valproate level supratherapeutic (&gt;125 mcg/mL):</strong> Reduce dose by 10–20%. Re-check level in 5–7 days.</p>
          <p>• <strong>Elevated ammonia with encephalopathy signs:</strong> Discontinue valproate. Consider L-carnitine supplementation (100 mg/kg/day IV or PO, max 3g). Urgent neurology or ER referral.</p>
          <p>• <strong>Symptomatic myoclonus persisting at therapeutic levels:</strong> Consider switching to an alternative mood stabilizer. Myoclonus may not resolve with dose reduction alone.</p>
          <p>• <strong>Normal labs with persistent symptoms:</strong> Rule out other causes (essential tremor, medication interactions, B12 deficiency).</p>
        </div>
      </div>

      {/* Full-Width Card: Serotonin Syndrome */}
      <div className="bg-white rounded-2xl border-2 border-orange-300 p-6 shadow-sm space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-orange-100 pb-4">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0" />
            <div>
              <h3 className="text-base font-black text-orange-950">Serotonin Syndrome — Recognition &amp; Treatment</h3>
              <p className="text-xs text-orange-700 mt-0.5">Life-threatening excess serotonergic activity • Hunter Criteria + stepwise management</p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-white bg-orange-600 px-3 py-1 rounded-full self-start whitespace-nowrap">
            🚨 Medical Emergency
          </span>
        </div>

        {/* What is it */}
        <p className="text-xs text-slate-700 leading-relaxed">
          Serotonin syndrome (SS) is a potentially life-threatening drug reaction caused by excess serotonergic activity at central and peripheral 5-HT receptors. It is <strong>not an idiosyncratic reaction</strong> — it is <strong>dose- and combination-dependent</strong> and can occur with a single agent at high doses or, most commonly, with combinations of serotonergic medications. Onset is typically rapid — usually <strong>within 6 hours</strong> of a new agent, dose increase, or overdose.
        </p>

        {/* Hunter Criteria Triad */}
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl space-y-3">
          <p className="text-xs font-black text-orange-950 uppercase tracking-wide">Hunter Criteria — Diagnosis (Most Sensitive &amp; Specific)</p>
          <p className="text-[11px] text-orange-900">
            Serotonin syndrome is diagnosed clinically. Requires recent use of a serotonergic agent PLUS <strong>at least one</strong> of the following:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
            <div className="bg-white border border-orange-200 rounded-lg p-2.5 space-y-1">
              <p className="font-black text-orange-950">1. Spontaneous Clonus</p>
              <p className="text-slate-700">Rhythmic, involuntary muscle contractions — the most specific sign. Check ankles and eyes (ocular clonus).</p>
            </div>
            <div className="bg-white border border-orange-200 rounded-lg p-2.5 space-y-1">
              <p className="font-black text-orange-950">2. Inducible / Ocular Clonus + Agitation or Diaphoresis</p>
              <p className="text-slate-700">Clonus triggered by dorsiflexion. Combined with excess sweating or motor agitation = diagnostic.</p>
            </div>
            <div className="bg-white border border-orange-200 rounded-lg p-2.5 space-y-1">
              <p className="font-black text-orange-950">3. Tremor + Hyperreflexia OR Hypertonia + Fever + Clonus</p>
              <p className="text-slate-700">Classic triad of <strong>mental status change, autonomic instability, and neuromuscular abnormality</strong> at any severity level.</p>
            </div>
          </div>
        </div>

        {/* Severity Spectrum */}
        <div>
          <p className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">Severity Spectrum</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
              <p className="font-black text-amber-900">🟡 Mild</p>
              <p className="text-slate-700">Tachycardia, diaphoresis, shivering, mydriasis, intermittent tremor or myoclonus, normal BP &amp; temp, normal mental status.</p>
              <p className="font-semibold text-amber-800 text-[10px] mt-1">→ Discontinue offending agent. Monitor vitals.</p>
            </div>
            <div className="p-3 bg-orange-50/70 border border-orange-300 rounded-xl space-y-1">
              <p className="font-black text-orange-900">🟠 Moderate</p>
              <p className="text-slate-700">Hyperthermia (&lt;41°C), tachycardia, HTN, agitation, hyperreflexia, diaphoresis, diarrhea, horizontal ocular clonus, easily inducible clonus.</p>
              <p className="font-semibold text-orange-800 text-[10px] mt-1">→ Discontinue all serotonergic agents. Cyproheptadine. Benzos for agitation. ED evaluation.</p>
            </div>
            <div className="p-3 bg-red-50/70 border border-red-300 rounded-xl space-y-1">
              <p className="font-black text-red-900">🔴 Severe</p>
              <p className="text-slate-700">Hyperthermia (&gt;41°C), severe hypertension or hypotension, rhabdomyolysis, metabolic acidosis, renal failure, seizures, DIC, respiratory failure, death.</p>
              <p className="font-semibold text-red-800 text-[10px] mt-1">→ 911 / ER. ICU admission. Intubation may be needed.</p>
            </div>
          </div>
        </div>

        {/* High-Risk Drug Combinations */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <p className="text-xs font-black text-slate-900 uppercase tracking-wide mb-1">⚠️ High-Risk Drug Combinations — Know Before You Prescribe</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-800">
            {[
              ['SSRI / SNRI + MAOI', 'Contraindicated. Requires 14-day washout (5 weeks for fluoxetine). FATAL risk.'],
              ['SSRI / SNRI + Linezolid (Zyvox)', 'Linezolid is a weak MAOI. Avoid combination. Use only if no alternative antibiotic available.'],
              ['SSRI / SNRI + Methylene Blue', 'Methylene blue is a potent MAOI. Hold SSRIs/SNRIs if IV methylene blue required.'],
              ['SSRI / SNRI + Tramadol', 'Tramadol inhibits serotonin reuptake. Combined use significantly elevates SS risk.'],
              ['SSRI / SNRI + Triptans (sumatriptan, rizatriptan)', 'FDA warning — moderate risk. Monitor if combination required.'],
              ['SSRI / SNRI + Fentanyl or Meperidine', 'Fentanyl has weak serotonergic activity; meperidine (Demerol) inhibits 5-HT reuptake. Caution.'],
              ['SSRI / SNRI + Dextromethorphan (DXM)', 'Found in many OTC cold medicines (NyQuil, Robitussin). Inform patients to check OTC labels.'],
              ['SSRI / SNRI + St. John\'s Wort', 'OTC herbal supplement with potent 5-HT reuptake inhibition. Common patient-unreported interaction.'],
            ].map(([combo, note]) => (
              <div key={combo} className="flex gap-2 p-2 bg-white border border-slate-200 rounded-lg">
                <span className="text-orange-500 flex-shrink-0">⚡</span>
                <div>
                  <strong className="text-slate-900">{combo}:</strong>{' '}
                  <span className="text-slate-600">{note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Treatment Protocol */}
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-3">
          <p className="text-xs font-black text-red-950 uppercase tracking-wide">Treatment Protocol — Stepwise Management</p>
          <div className="space-y-2 text-[11px]">
            <div className="flex gap-2.5 items-start">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-600 text-white font-black text-[10px] flex items-center justify-center">1</span>
              <div>
                <strong className="text-red-950">Discontinue ALL serotonergic agents immediately.</strong>
                <span className="text-slate-700"> This is the single most important intervention. Identify and stop every contributing drug — including OTC supplements and cough medications.</span>
              </div>
            </div>
            <div className="flex gap-2.5 items-start">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500 text-white font-black text-[10px] flex items-center justify-center">2</span>
              <div>
                <strong className="text-orange-950">Cyproheptadine (Periactin) — Serotonin Antagonist.</strong>
                <span className="text-slate-700"> First-line antidote. <strong>Adult dose: 12 mg PO immediately, then 2 mg every 2 hours</strong> until improvement (max ~32 mg/24h). Crush tabs if patient cannot swallow. Acts at 5-HT2A/2C receptors.</span>
              </div>
            </div>
            <div className="flex gap-2.5 items-start">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500 text-white font-black text-[10px] flex items-center justify-center">3</span>
              <div>
                <strong className="text-amber-950">Benzodiazepines — Agitation &amp; Seizure Control.</strong>
                <span className="text-slate-700"> Lorazepam (Ativan) or diazepam IV for neuromuscular agitation, myoclonus, and seizure prophylaxis. Do <strong>not</strong> use physical restraints — increases lactic acidosis and hyperthermia.</span>
              </div>
            </div>
            <div className="flex gap-2.5 items-start">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 text-white font-black text-[10px] flex items-center justify-center">4</span>
              <div>
                <strong className="text-blue-950">Supportive Care — Autonomic Stabilization.</strong>
                <span className="text-slate-700"> IV fluids for hydration/rhabdomyolysis prevention. External cooling (ice packs, cooling blankets) for hyperthermia — <strong>do not use antipyretics</strong> (fever is muscle-generated, not hypothalamic). Continuous cardiac and O₂ monitoring.</span>
              </div>
            </div>
            <div className="flex gap-2.5 items-start">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-700 text-white font-black text-[10px] flex items-center justify-center">5</span>
              <div>
                <strong className="text-slate-900">Severe / Refractory — ICU Escalation.</strong>
                <span className="text-slate-700"> Endotracheal intubation + neuromuscular paralysis (vecuronium) for life-threatening hyperthermia (&gt;41°C) or refractory muscle rigidity. Avoid succinylcholine (risk of hyperkalemia from rhabdomyolysis). Monitor CK, BMP, coags for end-organ damage.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="p-3 bg-orange-100/50 border border-orange-200 rounded-xl text-[11px] text-orange-900 font-medium">
          💡 <strong>Key Teaching Point:</strong> Serotonin syndrome is often <em>underdiagnosed</em> because mild presentations are mistaken for anxiety, viral illness, or stimulant side effects. The classic triad (mental status change + autonomic instability + neuromuscular abnormality) may not all be present simultaneously — any combination in the context of a serotonergic medication should raise suspicion.
        </div>
      </div>

      {/* Full-Width Card: Neuroleptic Malignant Syndrome (NMS) */}
      <div className="bg-white rounded-2xl border-2 border-rose-300 p-6 shadow-sm space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-rose-100 pb-4">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            <div>
              <h3 className="text-base font-black text-rose-950">Neuroleptic Malignant Syndrome (NMS) — Recognition &amp; Emergency Treatment</h3>
              <p className="text-xs text-rose-700 mt-0.5">Life-threatening dopamine D2 receptor blockade • Cardinal tetrad &amp; rapid clinical protocol</p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-white bg-rose-600 px-3 py-1 rounded-full self-start whitespace-nowrap">
            🚨 Neurological Emergency
          </span>
        </div>

        {/* What is NMS */}
        <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
          <p>
            <strong>Neuroleptic Malignant Syndrome (NMS)</strong> is an idiosyncratic, life-threatening neurological emergency precipitated by <strong>dopamine receptor antagonism</strong> (most commonly first- and second-generation antipsychotics, antiemetics like metoclopramide/Reglan or prochlorperazine) or the <strong>abrupt withdrawal of dopaminergic agonists</strong> (e.g., levodopa, amantadine, pramipexole).
          </p>
          <p>
            Unlike Serotonin Syndrome (which develops explosively within hours), NMS typically evolves subacutely over <strong>24 to 72 hours</strong> (usually within 1 to 2 weeks of initiation or dose increase). Untreated mortality reaches <strong>10–20%</strong> due to rhabdomyolysis, acute renal failure, cardiovascular collapse, or respiratory failure. Early recognition and immediate drug cessation drops mortality to &lt;5%.
          </p>
        </div>

        {/* The Cardinal Tetrad (FEVER Acronym) */}
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-black text-rose-950 uppercase tracking-wide">The Cardinal Clinical Tetrad (DSM-5-TR Criteria)</p>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-200 text-rose-900">Mnemonic: F.E.V.E.R.</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-[11px]">
            <div className="bg-white border border-rose-200 rounded-lg p-3 space-y-1">
              <p className="font-black text-rose-950">1. "Lead-Pipe" Rigidity</p>
              <p className="text-slate-700 leading-relaxed">
                Generalized extreme muscle rigidity with cogwheeling. Resistance to passive movement in all directions. Differs from the hyperreflexia and clonus of Serotonin Syndrome.
              </p>
            </div>

            <div className="bg-white border border-rose-200 rounded-lg p-3 space-y-1">
              <p className="font-black text-rose-950">2. Hyperthermia</p>
              <p className="text-slate-700 leading-relaxed">
                Fever typically <strong>&gt;38°C (100.4°F)</strong> and frequently exceeding <strong>40°C (104°F)</strong>. Driven by peripheral skeletal muscle hypermetabolism plus hypothalamic dopamine blockade.
              </p>
            </div>

            <div className="bg-white border border-rose-200 rounded-lg p-3 space-y-1">
              <p className="font-black text-rose-950">3. Autonomic Instability</p>
              <p className="text-slate-700 leading-relaxed">
                Labile blood pressure (fluctuating hypertension / hypotension), tachycardia (HR &gt; 100), tachypnea, profuse diaphoresis, cardiac dysrhythmias, pallor, and urinary incontinence.
              </p>
            </div>

            <div className="bg-white border border-rose-200 rounded-lg p-3 space-y-1">
              <p className="font-black text-rose-950">4. Altered Mental Status</p>
              <p className="text-slate-700 leading-relaxed">
                Initial confusion, delirium, mutism, or catatonic stupor, rapidly progressing to encephalopathy, obtundation, or coma. Often the earliest herald symptom.
              </p>
            </div>
          </div>
        </div>

        {/* Laboratory Workup & Biomarkers */}
        <div>
          <p className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">Essential Diagnostic Laboratory Biomarkers</p>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-[11px]">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="font-black text-slate-900 block">Creatine Kinase (CK / CPK)</span>
              <p className="text-slate-600">
                Markedly elevated: typically <strong>&gt;1,000 U/L</strong>, often <strong>10,000 to 100,000+ U/L</strong> due to severe rhabdomyolysis. Correlates with disease severity and renal injury risk.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="font-black text-slate-900 block">CBC with Differential</span>
              <p className="text-slate-600">
                Marked leukocytosis: <strong>WBC 10,000–40,000/μL</strong> with left shift (stress demargination, not necessarily bacterial infection).
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="font-black text-slate-900 block">CMP-14 &amp; Renal Function</span>
              <p className="text-slate-600">
                Elevated BUN &amp; Creatinine (myoglobinuric acute tubular necrosis), hyperkalemia, metabolic acidosis with elevated lactate, elevated AST/ALT, and hypocalcemia.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="font-black text-slate-900 block">Urinalysis / Myoglobin</span>
              <p className="text-slate-600">
                Positive urine myoglobin (dark "tea-colored" or cola urine). Dipstick positive for blood without intact RBCs on microscopy confirms myoglobinuria.
              </p>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison: NMS vs. Serotonin Syndrome */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <p className="text-xs font-black text-slate-900 uppercase tracking-wide">High-Yield Clinical Differential: NMS vs. Serotonin Syndrome</p>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-300 text-slate-800">
                  <th className="py-1.5 px-2 font-black">Clinical Feature</th>
                  <th className="py-1.5 px-2 font-black text-rose-900 bg-rose-50/60">Neuroleptic Malignant Syndrome (NMS)</th>
                  <th className="py-1.5 px-2 font-black text-orange-900 bg-orange-50/60">Serotonin Syndrome (SS)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr>
                  <td className="py-1.5 px-2 font-bold text-slate-900">Primary Etiology</td>
                  <td className="py-1.5 px-2 bg-rose-50/30">Dopamine D2 receptor blockade (Antipsychotics, Reglan)</td>
                  <td className="py-1.5 px-2 bg-orange-50/30">Excess 5-HT receptor activation (SSRIs, SNRIs, MAOIs)</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 font-bold text-slate-900">Onset Speed</td>
                  <td className="py-1.5 px-2 bg-rose-50/30">Slow / Subacute (1–3 days to weeks)</td>
                  <td className="py-1.5 px-2 bg-orange-50/30">Rapid / Explosive (&lt;12–24 hours, often &lt;6 hrs)</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 font-bold text-slate-900">Neuromuscular Tone</td>
                  <td className="py-1.5 px-2 bg-rose-50/30 font-bold text-rose-950">Severe "Lead-pipe" rigidity, hyporeflexia, bradykinesia</td>
                  <td className="py-1.5 px-2 bg-orange-50/30 font-bold text-orange-950">Hyperreflexia, clonus (ocular/ankle), tremor, myoclonus</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 font-bold text-slate-900">Pupils &amp; GI</td>
                  <td className="py-1.5 px-2 bg-rose-50/30">Normal pupils, normal bowel sounds or hypomotility</td>
                  <td className="py-1.5 px-2 bg-orange-50/30">Dilated pupils (mydriasis), hyperactive bowel, diarrhea</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 font-bold text-slate-900">Creatine Kinase (CK)</td>
                  <td className="py-1.5 px-2 bg-rose-50/30 font-bold text-rose-950">Extremely high (&gt;1,000 to &gt;50,000 U/L)</td>
                  <td className="py-1.5 px-2 bg-orange-50/30">Normal to mildly elevated</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 font-bold text-slate-900">Specific Antidote</td>
                  <td className="py-1.5 px-2 bg-rose-50/30 font-bold text-rose-950">Dantrolene (muscle relaxant) + Bromocriptine (dopamine agonist)</td>
                  <td className="py-1.5 px-2 bg-orange-50/30 font-bold text-orange-950">Cyproheptadine (5-HT antagonist)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Stepwise Treatment Protocol */}
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-3">
          <p className="text-xs font-black text-rose-950 uppercase tracking-wide">Stepwise Treatment Protocol — Psychiatric Emergency Management</p>
          <div className="space-y-2 text-[11px]">
            <div className="flex gap-2.5 items-start">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-700 text-white font-black text-[10px] flex items-center justify-center">1</span>
              <div>
                <strong className="text-rose-950">IMMEDIATELY STOP THE OFFENDING NEUROLEPTIC.</strong>
                <span className="text-slate-700"> Discontinue all antipsychotics, metoclopramide, prochlorperazine, and promethazine. If NMS was triggered by the sudden withdrawal of a dopamine agonist (e.g. Parkinson's patient whose Levodopa was held), <strong>immediately restart the dopamine agonist</strong>.</span>
              </div>
            </div>

            <div className="flex gap-2.5 items-start">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-600 text-white font-black text-[10px] flex items-center justify-center">2</span>
              <div>
                <strong className="text-red-950">EMERGENCY MEDICAL TRANSPORT &amp; ICU ADMISSION (CALL 911).</strong>
                <span className="text-slate-700"> NMS cannot be managed in an outpatient or telehealth setting. Patients require immediate transfer to an Emergency Department or Intensive Care Unit with continuous cardiorespiratory monitoring.</span>
              </div>
            </div>

            <div className="flex gap-2.5 items-start">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-600 text-white font-black text-[10px] flex items-center justify-center">3</span>
              <div>
                <strong className="text-amber-950">AGGRESSIVE FLUID RESUSCITATION &amp; ACTIVE COOLING.</strong>
                <span className="text-slate-700"> Administer IV Normal Saline (2–3 L/day) targeting urine output &gt;100–200 mL/hr to flush myoglobin and prevent acute tubular necrosis / renal failure. Sodium bicarbonate IV may be added to alkalinize urine (pH &gt; 6.5) preventing intratubular myoglobin precipitation. External cooling (ice packs to axilla/groin, misting/cooling blankets); <strong>antipyretics (acetaminophen, ibuprofen) are ineffective</strong> because the fever is peripherally generated by skeletal muscle contracture.</span>
              </div>
            </div>

            <div className="flex gap-2.5 items-start">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-600 text-white font-black text-[10px] flex items-center justify-center">4</span>
              <div>
                <strong className="text-indigo-950">PHARMACOLOGICAL ANTIDOTES (ICU PROTOCOL):</strong>
                <ul className="mt-1 space-y-1 list-disc list-inside text-slate-700 pl-1">
                  <li><strong>Dantrolene (Dantrium):</strong> Direct-acting skeletal muscle relaxant (dissociates muscle excitation-contraction by blocking sarcoplasmic reticulum Ca²⁺ release). Dose: <strong>1 to 2.5 mg/kg IV push</strong>, repeat up to 10 mg/kg/day until rigidity and hyperthermia subside, then convert to oral (100–200 mg/day PO) and taper over 7 days.</li>
                  <li><strong>Bromocriptine (Parlodel):</strong> Centrally acting dopamine D2 receptor agonist to overcome neuroleptic blockade. Dose: <strong>2.5 mg PO/NG tid</strong>, titrating by 2.5 mg q24h up to 15–20 mg/day until response.</li>
                  <li><strong>Amantadine:</strong> Alternative dopamine agonist / NMDA antagonist: <strong>100 mg PO/NG bid to tid</strong>.</li>
                  <li><strong>Benzodiazepines (Lorazepam 1–2 mg IV/IM q4-6h):</strong> Relieves mild rigidity, neuromuscular agitation, and promotes muscle relaxation.</li>
                  <li><strong>Electroconvulsive Therapy (ECT):</strong> Highly effective rescue modality for refractory NMS, severe hyperthermia, or when malignant catatonia cannot be distinguished from NMS.</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-2.5 items-start">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-700 text-white font-black text-[10px] flex items-center justify-center">5</span>
              <div>
                <strong className="text-slate-900">RECHALLENGE PROTOCOL (RESTARTING ANTIPSYCHOTICS SAFELY):</strong>
                <span className="text-slate-700"> Wait a <strong>strict minimum of 14 days</strong> (preferably &gt;3 weeks) after complete resolution of fever, rigidity, mental status changes, and normalization of CK before re-initiating any antipsychotic. Select an agent from a <strong>different chemical class with low D2 receptor affinity</strong> (e.g. Quetiapine, Clozapine, Lumateperone). Start at the lowest conceivable dose and titrate ultra-slowly with frequent CK and vital sign monitoring. Ensure patient remains well hydrated and avoid concurrent lithium.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="p-3 bg-rose-100/50 border border-rose-200 rounded-xl text-[11px] text-rose-950 font-medium">
          💡 <strong>Key Clinical Pearl:</strong> Any patient taking an antipsychotic who develops an unexplained fever and stiff muscles must be treated as NMS until proven otherwise. Check stat CK, CMP, and CBC immediately. Never assume rigidity is simple extrapyramidal Parkinsonism if accompanied by diaphoresis, tachycardia, or altered cognition.
        </div>
      </div>

      {/* Card: Antipsychotic Oral-to-IM Dosing Equivalencies & Second-Opinion Matrix */}
      <div className="bg-white rounded-2xl border-2 border-indigo-400/80 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-100 pb-4">
          <div className="flex items-center gap-3 text-indigo-950 font-black text-base sm:text-lg">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center flex-shrink-0 shadow-inner">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span>Antipsychotic Oral-to-IM Dosing Equivalencies &amp; Second-Opinion Matrix</span>
              </div>
              <p className="text-xs text-slate-500 font-normal mt-0.5">
                Rapid oral-to-parenteral conversion ratios, acute crisis IM kinetics, and long-acting depot (LAI) initiation protocols.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-extrabold text-indigo-800 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full self-start sm:self-auto uppercase tracking-wide">
            Prescriber Reference &amp; Conversion Safety
          </span>
        </div>

        {/* 3-Step Visual Conversion Flow Diagram */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <ArrowLeftRight className="w-4 h-4 text-indigo-600" />
              Clinical Conversion Pathway (Oral ➔ Acute IM ➔ Long-Acting Depot)
            </h4>
            <span className="text-[10px] text-slate-500 font-medium">Step-by-step sequencing</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Step 1 */}
            <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/40 border border-blue-200 rounded-xl p-3.5 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center">1</span>
                <span className="text-[10px] font-bold text-blue-800 bg-blue-100/80 px-2 py-0.5 rounded-full">Mandatory First</span>
              </div>
              <div className="font-extrabold text-blue-950 text-xs flex items-center gap-1.5">
                <Pill className="w-4 h-4 text-blue-600" />
                Oral Tolerability Challenge
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Establish clinical tolerability and rule out acute allergic reactions, catastrophic dystonia, or severe orthostasis with an oral trial (minimum 2–3 days) <strong>prior to administering any long-acting depot (LAI)</strong>.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/40 border border-amber-200 rounded-xl p-3.5 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-black flex items-center justify-center">2</span>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full">Crisis &amp; Refusal</span>
              </div>
              <div className="font-extrabold text-amber-950 text-xs flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-600" />
                Acute Short-Acting IM Dosing
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                For rapid behavioral de-escalation in severe agitation: Haldol (2–5 mg IM), Zyprexa (5–10 mg IM), Geodon (10–20 mg IM), or Abilify (9.75 mg IM). IM potency is typically <strong>~2:1 vs oral</strong> due to complete first-pass hepatic bypass.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/40 border border-emerald-200 rounded-xl p-3.5 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center">3</span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">Maintenance Care</span>
              </div>
              <div className="font-extrabold text-emerald-950 text-xs flex items-center gap-1.5">
                <Syringe className="w-4 h-4 text-emerald-600" />
                Long-Acting Injectable (LAI) Depot
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Transition to depot for non-adherence. <strong>Observe overlap rules:</strong> Sustenna requires Day 1 &amp; Day 8 deltoid loading (0 oral overlap); Consta requires <strong>21-day oral bridge</strong>; Maintena requires 14-day bridge.
              </p>
            </div>
          </div>
        </div>

        {/* Four Golden Prescriber Second-Opinion Rules */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>4 Golden Second-Opinion Safety Rules for Prescribers</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-white border border-rose-200 rounded-lg space-y-1">
              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 inline-block">Rule 1: Lethal Synergy</span>
              <strong className="block text-rose-950 font-bold text-[11px]">Zyprexa IM + Ativan IM</strong>
              <p className="text-[11px] text-slate-600 leading-snug">
                <strong>NEVER</strong> administer IM Olanzapine and IM Lorazepam within 1–2 hours. Causes fatal synergistic respiratory collapse and profound hypotension.
              </p>
            </div>

            <div className="p-3 bg-white border border-amber-200 rounded-lg space-y-1">
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-block">Rule 2: The 21-Day Gap</span>
              <strong className="block text-amber-950 font-bold text-[11px]">Risperdal Consta Lag</strong>
              <p className="text-[11px] text-slate-600 leading-snug">
                Polymer microspheres do not release therapeutic risperidone for <strong>3 full weeks</strong>. Mandatory oral risperidone overlap is required or patient will relapse.
              </p>
            </div>

            <div className="p-3 bg-white border border-indigo-200 rounded-lg space-y-1">
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200 inline-block">Rule 3: Deltoid Loading</span>
              <strong className="block text-indigo-950 font-bold text-[11px]">Invega Sustenna Day 1 &amp; 8</strong>
              <p className="text-[11px] text-slate-600 leading-snug">
                Both Day 1 (234 mg) and Day 8 (156 mg) MUST be injected in the <strong>DELTOID</strong>. Deltoid vascularity gives 28% higher peak concentrations than gluteal.
              </p>
            </div>

            <div className="p-3 bg-white border border-emerald-200 rounded-lg space-y-1">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 inline-block">Rule 4: Food Bioavailability</span>
              <strong className="block text-emerald-950 font-bold text-[11px]">Geodon ≥500 kcal Meal</strong>
              <p className="text-[11px] text-slate-600 leading-snug">
                Oral Ziprasidone absorption drops by <strong>50%</strong> on an empty stomach. "Treatment failure" is almost always fasting dosing. Acute IM has 100% bioavailability.
              </p>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pt-1">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search agent, brand, or depot formulation..."
              value={antipsychoticSearch}
              onChange={(e) => setAntipsychoticSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 items-center">
            <button
              onClick={() => setSelectedClassFilter('all')}
              className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition ${
                selectedClassFilter === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Agents ({ANTIPSYCHOTIC_EQUIVALENCIES.length})
            </button>
            <button
              onClick={() => setSelectedClassFilter('atypical')}
              className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition ${
                selectedClassFilter === 'atypical'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Atypical SGA
            </button>
            <button
              onClick={() => setSelectedClassFilter('typical')}
              className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition ${
                selectedClassFilter === 'typical'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Typical FGA
            </button>
            <button
              onClick={() => setSelectedClassFilter('acute_im')}
              className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition ${
                selectedClassFilter === 'acute_im'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              Acute Crisis IM
            </button>
            <button
              onClick={() => setSelectedClassFilter('lai')}
              className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition ${
                selectedClassFilter === 'lai'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              LAI Formulations
            </button>
          </div>
        </div>

        {/* Equivalencies & Second-Opinion Matrix Table */}
        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/90 text-slate-700 border-b border-slate-200 text-[11px] font-black uppercase tracking-wider">
                  <th className="p-3">Agent &amp; Drug Class</th>
                  <th className="p-3">Oral Daily Range</th>
                  <th className="p-3">Acute Crisis IM Dose</th>
                  <th className="p-3">LAI Depot Formulation</th>
                  <th className="p-3">Oral Overlap Required</th>
                  <th className="p-3 text-right">Monograph &amp; Second Opinion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredAntipsychotics.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-slate-400">
                      No antipsychotics matched your search query or filter.
                    </td>
                  </tr>
                ) : (
                  filteredAntipsychotics.map((drug) => {
                    const isExpanded = expandedDrugId === drug.id;
                    return (
                      <React.Fragment key={drug.id}>
                        <tr className={`hover:bg-slate-50/80 transition-colors ${isExpanded ? 'bg-indigo-50/30' : ''}`}>
                          <td className="p-3">
                            <div className="font-extrabold text-slate-900 text-xs">{drug.name}</div>
                            <span className={`inline-block mt-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded border ${
                              drug.category === 'atypical' 
                                ? 'bg-purple-50 text-purple-700 border-purple-200' 
                                : 'bg-slate-100 text-slate-700 border-slate-300'
                            }`}>
                              {drug.class}
                            </span>
                          </td>
                          <td className="p-3 text-slate-800 font-medium">
                            {drug.oralDose}
                          </td>
                          <td className="p-3">
                            {drug.hasAcuteIm ? (
                              <div>
                                <span className="font-bold text-amber-900 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded text-[11px]">
                                  {drug.acuteImDose}
                                </span>
                                <div className="text-[10px] text-slate-500 mt-1 font-mono">{drug.acuteRatio}</div>
                              </div>
                            ) : (
                              <span className="text-[11px] text-slate-400 italic">No acute IM (ODT only)</span>
                            )}
                          </td>
                          <td className="p-3">
                            {drug.hasLai ? (
                              <div>
                                <strong className="text-teal-950 font-bold text-[11px] block">{drug.laiDepotName}</strong>
                                <span className="text-[10px] text-slate-600 block line-clamp-1">{drug.laiDepotDose}</span>
                              </div>
                            ) : (
                              <span className="text-[11px] text-slate-400 italic">No LAI available</span>
                            )}
                          </td>
                          <td className="p-3">
                            {drug.hasLai ? (
                              <div className="text-[11px] text-slate-700 leading-snug">
                                {drug.oralOverlap.includes('MANDATORY') || drug.oralOverlap.includes('STRICT') ? (
                                  <span className="text-rose-700 font-bold bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded text-[10px] block mb-0.5">
                                    MANDATORY OVERLAP
                                  </span>
                                ) : drug.oralOverlap.includes('NO') || drug.oralOverlap.includes('No oral') ? (
                                  <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded text-[10px] block mb-0.5">
                                    0 DAYS (NO OVERLAP)
                                  </span>
                                ) : null}
                                <span className="text-[10px] text-slate-600 line-clamp-2">{drug.oralOverlap}</span>
                              </div>
                            ) : (
                              <span className="text-[11px] text-slate-400 italic">N/A</span>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => setExpandedDrugId(isExpanded ? null : drug.id)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition ${
                                isExpanded
                                  ? 'bg-indigo-600 text-white'
                                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
                              }`}
                            >
                              <span>{isExpanded ? 'Hide Pearls' : 'View Pearls'}</span>
                              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>
                          </td>
                        </tr>

                        {/* Expandable Clinical Monograph & Second-Opinion Pearls */}
                        {isExpanded && (
                          <tr className="bg-indigo-50/40">
                            <td colSpan="6" className="p-4 border-t border-b border-indigo-100">
                              <div className="space-y-3.5">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                  {/* Pharmacokinetics & Bioavailability */}
                                  <div className="bg-white p-3 rounded-xl border border-indigo-200 space-y-1.5 shadow-xs">
                                    <div className="flex items-center gap-1.5 text-indigo-950 font-bold text-xs border-b border-slate-100 pb-1">
                                      <Activity className="w-3.5 h-3.5 text-indigo-600" />
                                      <span>Pharmacokinetics &amp; Bioavailability</span>
                                    </div>
                                    <p className="text-[11px] text-slate-700 leading-relaxed">
                                      {drug.bioavailability}
                                    </p>
                                    <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-100">
                                      {drug.acuteKinetics}
                                    </div>
                                  </div>

                                  {/* Black Box & Critical Toxicity Warnings */}
                                  <div className="bg-white p-3 rounded-xl border border-rose-200 space-y-1.5 shadow-xs md:col-span-2">
                                    <div className="flex items-center gap-1.5 text-rose-950 font-bold text-xs border-b border-slate-100 pb-1">
                                      <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
                                      <span>Black Box &amp; Critical Toxicity Alerts</span>
                                    </div>
                                    <p className="text-[11px] text-rose-900 leading-relaxed font-medium">
                                      {drug.blackBoxAlert}
                                    </p>
                                  </div>
                                </div>

                                {/* Second-Opinion Clinical Pearls */}
                                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2 shadow-xs">
                                  <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-xs">
                                    <Info className="w-4 h-4 text-teal-600" />
                                    <span>Second-Opinion Prescribing Pearls &amp; Conversion Math ({drug.name}):</span>
                                  </div>
                                  <ul className="space-y-1.5 text-[11px] text-slate-700 pl-4 list-disc">
                                    {drug.secondOpinionPearls.map((pearl, pIdx) => (
                                      <li key={pIdx} className="leading-relaxed">
                                        {pearl}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Reference Grounding */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 flex items-center justify-between flex-wrap gap-2">
          <div>
            📚 <strong>Evidence Base:</strong> APA Practice Guidelines for Schizophrenia (3rd Ed.), Maudsley Prescribing Guidelines in Psychiatry (14th Ed.), and FDA Prescribing Information.
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            Always verify renal (CrCl), hepatic function, and baseline ECG/QTc prior to parenteral loading.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 5: Medical & Organic Mimics of Inattention (Laboratory Rule-Outs) */}
        <div className="bg-white rounded-2xl border-2 border-amber-300/80 p-6 shadow-sm space-y-4 md:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-100 pb-3">
            <div className="flex items-center gap-2.5 text-amber-950 font-black text-base">
              <Stethoscope className="w-5 h-5 text-amber-700 flex-shrink-0" />
              <span>Medical &amp; Organic Mimics of Inattention (Laboratory Rule-Outs)</span>
            </div>
            <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
              Mandatory Diagnostic Workup Before ADHD Stimulants
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Prior to attributing chronic inattention or executive dysfunction exclusively to primary Adult ADHD or escalating CNS stimulant dosages, the following organic endocrine, metabolic, hematologic, and hypoxic drivers must be ruled out:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
            {/* A1c / DM */}
            <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-xl space-y-1.5 text-slate-800">
              <div className="flex items-center justify-between">
                <strong className="font-extrabold text-amber-950 text-xs">Hemoglobin A1c / DM</strong>
                <span className="text-[10px] font-mono text-amber-700 bg-amber-100/80 px-1.5 py-0.5 rounded">Metabolic</span>
              </div>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                Diabetes mellitus &amp; chronic hyperglycemia cause microvascular frontostriatal disruption leading to <strong>reduced sustained attention</strong>, <strong>reduced information processing speed</strong>, and <strong>impaired executive functioning</strong>.
              </p>
            </div>

            {/* Thyroid */}
            <div className="p-3.5 bg-indigo-50/60 border border-indigo-200 rounded-xl space-y-1.5 text-slate-800">
              <div className="flex items-center justify-between">
                <strong className="font-extrabold text-indigo-950 text-xs">TSH, Free T3 &amp; T4</strong>
                <span className="text-[10px] font-mono text-indigo-700 bg-indigo-100/80 px-1.5 py-0.5 rounded">Endocrine</span>
              </div>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                Thyroid hormone dysregulation impairs <strong>verbal memory</strong>, <strong>attention &amp; concentration</strong>, and <strong>visuospatial processing</strong> (<em>the ability to perceive, analyze, and manipulate visual patterns and images — e.g. using a map, walking through doors, making sense of letters and numbers</em>).
              </p>
            </div>

            {/* Sleep & OSA */}
            <div className="p-3.5 bg-cyan-50/60 border border-cyan-200 rounded-xl space-y-1.5 text-slate-800">
              <div className="flex items-center justify-between">
                <strong className="font-extrabold text-cyan-950 text-xs">Sleep Deprivation &amp; OSA</strong>
                <span className="text-[10px] font-mono text-cyan-700 bg-cyan-100/80 px-1.5 py-0.5 rounded">Hypoxic</span>
              </div>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                Produces severe <strong>impairment in attention</strong>, vigilance lapses, and daytime micro-sleeps. Screen with <strong>Berlin Questionnaire</strong> (snoring, daytime tiredness/fatigue, hypertension/BMI &gt; 30). Refer for overnight <strong>Polysomnography (Sleep Study)</strong>.
              </p>
            </div>

            {/* Anemia & Micronutrients */}
            <div className="p-3.5 bg-rose-50/60 border border-rose-200 rounded-xl space-y-1.5 text-slate-800">
              <div className="flex items-center justify-between">
                <strong className="font-extrabold text-rose-950 text-xs">Anemia &amp; Micronutrients</strong>
                <span className="text-[10px] font-mono text-rose-700 bg-rose-100/80 px-1.5 py-0.5 rounded">Hematologic</span>
              </div>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                Depleted oxygen-carrying capacity &amp; cofactor deficiency cause profound inattention. Order <strong>CBC with differential</strong>, <strong>CMP-14</strong>, <strong>Vitamin B12</strong>, and <strong>Serum Ferritin</strong> (iron stores; ferritin &lt; 30–50 ng/mL impairs dopamine synthesis).
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-100/50 border border-amber-200 rounded-xl text-xs text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-medium">
            <span>💡 Complete diagnostic panels, fasting protocols, and insurance ICD-10 pairings available in the <strong>Standard Labs</strong> tab.</span>
            <span className="text-[11px] font-bold text-amber-950 whitespace-nowrap">Zero-PHI Local CDS</span>
          </div>
        </div>
      </div>
    </div>
  );
}

