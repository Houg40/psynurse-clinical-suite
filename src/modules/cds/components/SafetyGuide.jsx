import React from 'react';
import { AlertTriangle, ShieldCheck, FileCheck, ArrowLeftRight, HeartPulse, Stethoscope } from 'lucide-react';

export default function SafetyGuide() {
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

