import React, { useState } from 'react';
import { 
  Lightbulb, 
  Brain, 
  AlertTriangle, 
  ShieldCheck, 
  Pill, 
  Clock, 
  Copy, 
  Check, 
  Sparkles, 
  Activity, 
  Zap, 
  FileText, 
  ArrowRight, 
  BookOpen,
  HelpCircle,
  TrendingUp,
  AlertCircle,
  Moon,
  Droplets,
  Eye,
  Stethoscope,
  Compass,
  CheckCircle2
} from 'lucide-react';

export default function MiscClinicalInfo() {
  const [copiedKey, setCopiedKey] = useState(null);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const getPatientHandout = () => {
    return `PATIENT EDUCATION HANDOUT: UNDERSTANDING YOUR ANXIETY & DEPRESSION MEDICATIONS
Provider: Monica Preder, MSN, APRN, PMHNP-BC

1. HOW ANTIDEPRESSANTS WORK (SEROTONIN & NOREPINEPHRINE):
Your brain uses natural chemical messengers called neurotransmitters to regulate emotions, stress responses, energy, and sleep. Two of the most important are Serotonin and Norepinephrine.
• When Serotonin and Norepinephrine become depleted or out of balance, it can lead to persistent low mood, behavioral withdrawal, loss of interest in activities, and heightened physical anxiety symptoms (like racing heart, restlessness, or constant worry).
• Antidepressants (SSRIs and SNRIs) work by slowing down the re-absorption of these messengers, giving your brain cells more time to communicate smoothly. Because your brain has to build new receptors and pathways, it takes 2 to 4 weeks of daily use to feel the full therapeutic benefits.

2. BUSPAR (BUSPIRONE) - A DIFFERENT APPROACH TO ANXIETY:
• Buspar works by gently interacting with serotonin and dopamine receptors in your brain to gradually lower baseline anxiety.
• Unlike older sedatives, Buspar DOES NOT cause drowsiness, sluggishness, or cognitive impairment. You can think clearly, work, and drive safely.
• It is completely non-addictive and does not cause physical dependence.
• Important: Buspar must be taken consistently every day (usually 2 to 3 times daily) to build up in your system. It is not an "instant calm down" pill.

3. BENZODIAZEPINES (XANAX, ATIVAN, KLONOPIN, VALIUM) - WHY THEY ARE ONLY FOR SHORT-TERM USE:
Benzodiazepines act on GABA receptors to produce immediate, temporary sedation and relaxation. However, they carry significant long-term risks:
• TOLERANCE: With continued daily use, your brain's receptors adapt. Over time, your body requires higher and higher doses to get the exact same calming effect.
• DEPENDENCE: Your brain becomes reliant on the drug to function.
  - Physical Dependence: If stopped abruptly, you can experience severe rebound anxiety, tremors, sweating, heart racing, insomnia, and in severe cases, dangerous seizures.
  - Psychological Dependence: Feeling intense fear or panic at the mere thought of not having the medication in your pocket.
• CLINICAL RULE: For your safety, benzodiazepines are reserved only for short-term crisis situations (typically 1 to 4 weeks) while safe, long-term medications (like SSRIs or Buspar) have time to take effect.`;
  };

  const getEhrInformedConsent = () => {
    return `CLINICAL PHARMACOLOGY MDM & INFORMED CONSENT NOTE:
• NEUROBIOLOGY DISCUSSED: Reviewed monoaminergic dysregulation (serotonin & norepinephrine imbalance) underlying patient's mood instability, behavioral withdrawal, and anxiety symptoms.
• BUSPAR (BUSPIRONE) EDUCATION: Educated on 5-HT1A partial agonism and presynaptic dopamine modulation. Emphasized lack of sedation, absence of cognitive impairment, and lack of dependence liability. Reinforced that therapeutic benefits accrue gradually with scheduled BID/TID dosing.
• BENZODIAZEPINE RISK PROTOCOL: Thoroughly reviewed risks of physiological tolerance (requiring dose escalation) and physiological/psychological dependence. Documented that benzodiazepine therapy is strictly time-limited to prevent withdrawal syndrome and cognitive blunting. Patient voiced understanding and agreed to conservative tapering schedule.`;
  };

  const getEhrLabRuleOutNote = () => {
    return `ORGANIC & MEDICAL RULE-OUT ASSESSMENT FOR INATTENTION / COGNITIVE DYSFUNCTION:
• CLINICAL INDICATION: Evaluation of complaints of chronic inattention, mental sluggishness, concentration deficits, and impaired executive functioning prior to initiating or escalating psychiatric stimulant therapy.
• COMPREHENSIVE LABORATORY WORKUP ORDERED:
  1. HEMOGLOBIN A1c: Evaluating glycemic control and diabetic microvascular cognitive impairment (reduced sustained attention and processing speed).
  2. THYROID CASCADE (TSH, FREE T3, FREE T4): Ruling out thyroid-induced deficits in verbal memory, concentration, and visuospatial processing (visual patterns, letter/number deciphering, spatial navigation).
  3. HEMATOLOGIC & ANEMIA PANEL (CBC WITH DIFF, CMP-14, SERUM FERRITIN, VITAMIN B12): Ruling out microcytic/macrocytic anemia, iron store depletion, electrolyte disturbances, and B12 deficiency driving prefrontal inattention.
• SLEEP & SLEEP APNEA (OSA) SCREENING:
  - Administered Berlin Questionnaire for Obstructive Sleep Apnea risk stratification (snoring intensity, morning tiredness, hypertension/BMI).
  - Patient advised regarding sleep deprivation's catastrophic impact on vigilance and working memory. Referral for formal overnight polysomnography (Sleep Study) indicated if high risk on Berlin screen.
• CLINICAL IMPRESSION: Rule-out of reversible organic, endocrine, metabolic, and hypoxic causes of executive dysfunction in progress.`;
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-6 rounded-2xl shadow-md border border-teal-800/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-teal-400/20 text-teal-200 text-xs font-black uppercase px-2.5 py-0.5 rounded-full border border-teal-400/30 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
                Clinical Reference &amp; Pharmacology Pearls
              </span>
              <span className="bg-slate-700/60 text-slate-300 text-xs font-semibold px-2 py-0.5 rounded-full">
                Monica Preder, ARNP Reference
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Misc. Clinical Information &amp; Patient Education
            </h1>
            <p className="text-teal-100 text-xs sm:text-sm mt-1 max-w-3xl">
              High-yield neurobiology frameworks, Buspar mechanism of action, and benzodiazepine tolerance/dependence guidelines formatted for immediate provider reference and patient psychoeducation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => copyToClipboard(getPatientHandout(), 'patient_handout')}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-teal-700 hover:bg-teal-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs border border-teal-500/30"
            >
              {copiedKey === 'patient_handout' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4 text-teal-200" />}
              Copy Patient Handout
            </button>

            <button
              onClick={() => copyToClipboard(getEhrInformedConsent(), 'ehr_consent')}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs border border-slate-600"
            >
              {copiedKey === 'ehr_consent' ? <Check className="w-4 h-4 text-emerald-300" /> : <FileText className="w-4 h-4 text-slate-300" />}
              Copy EHR MDM Note
            </button>
          </div>
        </div>
      </div>

      {/* 3 Core Clinical Cards Requested by Provider */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card 1: Antidepressants, Serotonin & Norepinephrine */}
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-teal-100 pb-2.5 mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 flex items-center gap-1">
                <Brain className="w-3.5 h-3.5 text-teal-700" />
                Neurotransmitter Balance
              </span>
              <span className="text-[10px] font-bold text-slate-400">SSRIs &amp; SNRIs</span>
            </div>

            <h3 className="text-base font-black text-slate-900 leading-snug">
              Antidepressants: Serotonin &amp; Norepinephrine
            </h3>
            
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Antidepressants function by restoring and stabilizing optimal synaptic levels of <strong>Serotonin (5-HT)</strong> and <strong>Norepinephrine (NE)</strong>.
            </p>

            <div className="mt-3 p-3 bg-teal-50/60 border border-teal-200/80 rounded-xl space-y-2 text-xs text-slate-800">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                <div>
                  <strong className="text-teal-950 font-bold">When Imbalanced:</strong>
                  <p className="text-[11px] text-slate-700 leading-normal">
                    Depletion or receptor dysregulation leads to depressed mood, apathy, behavioral shifts, cognitive fatigue, and heightened physical/autonomic anxiety symptoms.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                <div>
                  <strong className="text-teal-950 font-bold">Clinical Role:</strong>
                  <p className="text-[11px] text-slate-700 leading-normal">
                    <strong>Serotonin</strong> regulates mood, obsessionality, impulse, and anxiety. <strong>Norepinephrine</strong> drives alertness, executive focus, energy, and physical vitality.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 italic">
            "Explaining neurochemical balance normalizes mental health for patients and destigmatizes medication."
          </div>
        </div>

        {/* Card 2: Buspar (Buspirone) */}
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-sky-100 pb-2.5 mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 flex items-center gap-1">
                <Pill className="w-3.5 h-3.5 text-sky-700" />
                Non-Sedating Anxiolytic
              </span>
              <span className="text-[10px] font-bold text-slate-400">5-HT1A / D2</span>
            </div>

            <h3 className="text-base font-black text-slate-900 leading-snug">
              Buspar (Buspirone): Gradual Anxiolysis
            </h3>
            
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Interacts with <strong>Serotonin (5-HT1A partial agonist)</strong> and <strong>Dopamine (D2 autoreceptor)</strong> to gradually alleviate chronic anxiety symptoms.
            </p>

            <div className="mt-3 p-3 bg-sky-50/60 border border-sky-200/80 rounded-xl space-y-2 text-xs text-slate-800">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sky-950 font-bold">Zero Cognitive Impairment:</strong>
                  <p className="text-[11px] text-slate-700 leading-normal">
                    Does <strong>NOT cause drowsiness</strong>, sedation, psychomotor slowing, or cognitive blunting. Safe for daytime functioning and work.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sky-950 font-bold">Zero Dependence Liability:</strong>
                  <p className="text-[11px] text-slate-700 leading-normal">
                    Non-controlled (Schedule VI); zero addiction, abuse, tolerance, or physiological withdrawal risk.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-950 font-bold">Important Patient Expectation:</strong>
                  <p className="text-[11px] text-slate-700 leading-normal">
                    Requires scheduled BID or TID dosing for 2–4 weeks; not effective as an immediate PRN tranquilizer.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 italic">
            "Ideal for generalized anxiety in patients with recovery history, elderly, or safety-critical jobs."
          </div>
        </div>

        {/* Card 3: Benzodiazepines (Tolerance & Dependence) */}
        <div className="bg-white border-2 border-rose-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-rose-100 pb-2.5 mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                Short-Term Use Only
              </span>
              <span className="text-[10px] font-bold text-rose-600">High-Risk Schedule IV</span>
            </div>

            <h3 className="text-base font-black text-slate-900 leading-snug">
              Benzodiazepines: Tolerance &amp; Dependence
            </h3>
            
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Benzodiazepines (Xanax, Ativan, Klonopin, Valium) should <strong>ONLY be used short-term (1–4 weeks max)</strong> due to rapid physiological adaptation.
            </p>

            <div className="mt-3 p-3 bg-rose-50/70 border border-rose-200/90 rounded-xl space-y-2.5 text-xs text-slate-900">
              <div>
                <strong className="text-rose-950 font-extrabold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-rose-600" />
                  1. Tolerance (Dose Escalation):
                </strong>
                <p className="text-[11px] text-slate-700 mt-0.5 leading-normal">
                  Continued use causes GABA-A receptor downregulation. The brain adapts, meaning <em>you need more and more medication to achieve the exact same effect</em>.
                </p>
              </div>

              <div className="pt-1.5 border-t border-rose-200/60">
                <strong className="text-rose-950 font-extrabold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                  2. Dependence &amp; Withdrawal:
                </strong>
                <p className="text-[11px] text-slate-700 mt-0.5 leading-normal">
                  <strong>Physiological:</strong> Abrupt cessation triggers severe rebound panic, tachycardia, diaphoresis, tremors, delirium, and life-threatening seizures.
                </p>
                <p className="text-[11px] text-slate-700 mt-0.5 leading-normal">
                  <strong>Psychological:</strong> Emotional inability to cope with daily stressors without pill reliance.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-rose-700 font-semibold italic">
            "Always taper slowly; never stop abruptly after more than 2-3 weeks of continuous daily use."
          </div>
        </div>

      </div>

      {/* Side-by-Side Clinical Comparison Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-teal-600" />
              Anxiolytic Class Comparison: Buspar vs. Benzodiazepines vs. SSRIs/SNRIs
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Rapid clinical differentiation for treatment selection and patient expectation management.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/80 text-slate-800 font-extrabold border-b border-slate-200">
                <th className="p-3">Clinical Parameter</th>
                <th className="p-3 text-sky-900 bg-sky-50/70 border-l border-sky-200">Buspar (Buspirone)</th>
                <th className="p-3 text-rose-900 bg-rose-50/70 border-l border-rose-200">Benzodiazepines</th>
                <th className="p-3 text-teal-900 bg-teal-50/70 border-l border-teal-200">SSRIs / SNRIs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-700">
              <tr>
                <td className="p-3 font-bold text-slate-900">Onset of Anxiolysis</td>
                <td className="p-3 bg-sky-50/30 border-l border-sky-100">Gradual (2–4 weeks)</td>
                <td className="p-3 bg-rose-50/30 border-l border-rose-100 text-rose-950 font-bold">Immediate (15–45 min)</td>
                <td className="p-3 bg-teal-50/30 border-l border-teal-100">Gradual (4–8 weeks)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Drowsiness / Sedation</td>
                <td className="p-3 bg-sky-50/30 border-l border-sky-100 text-emerald-700 font-bold">NO (Minimal/None)</td>
                <td className="p-3 bg-rose-50/30 border-l border-rose-100 text-rose-700 font-bold">YES (Significant sedation)</td>
                <td className="p-3 bg-teal-50/30 border-l border-teal-100">Variable / Transient</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Cognitive Impairment</td>
                <td className="p-3 bg-sky-50/30 border-l border-sky-100 text-emerald-700 font-bold">NO (Clear-headed)</td>
                <td className="p-3 bg-rose-50/30 border-l border-rose-100 text-rose-700 font-bold">YES (Amnesia, blunting, fall risk)</td>
                <td className="p-3 bg-teal-50/30 border-l border-teal-100">NO</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Tolerance Risk</td>
                <td className="p-3 bg-sky-50/30 border-l border-sky-100 text-emerald-700 font-bold">ZERO tolerance risk</td>
                <td className="p-3 bg-rose-50/30 border-l border-rose-100 text-rose-800 font-extrabold">HIGH (Needs dose escalation)</td>
                <td className="p-3 bg-teal-50/30 border-l border-teal-100 text-emerald-700">ZERO tolerance risk</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Dependence / Withdrawal</td>
                <td className="p-3 bg-sky-50/30 border-l border-sky-100 text-emerald-700 font-bold">ZERO dependence</td>
                <td className="p-3 bg-rose-50/30 border-l border-rose-100 text-rose-900 font-extrabold">SEVERE (Life-threatening risk)</td>
                <td className="p-3 bg-teal-50/30 border-l border-teal-100">Discontinuation (no addiction)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">DEA Controlled Status</td>
                <td className="p-3 bg-sky-50/30 border-l border-sky-100 font-bold text-slate-900">Non-controlled (Sched VI)</td>
                <td className="p-3 bg-rose-50/30 border-l border-rose-100 font-bold text-rose-950">Schedule IV (Controlled)</td>
                <td className="p-3 bg-teal-50/30 border-l border-teal-100 font-bold text-slate-900">Non-controlled (Sched VI)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Clinical Indication</td>
                <td className="p-3 bg-sky-50/30 border-l border-sky-100">Long-term GAD &amp; SSRI adjunct</td>
                <td className="p-3 bg-rose-50/30 border-l border-rose-100 text-rose-950 font-bold">Short-term crisis bridge only (1–4 wks)</td>
                <td className="p-3 bg-teal-50/30 border-l border-teal-100">First-line gold standard for all anxiety</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Verbatim Provider Scripts to Say in Session */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-teal-600" />
          Verbatim Clinical Scripts: Explaining to Patients in 60 Seconds
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
            <span className="font-extrabold text-teal-900 uppercase tracking-wider block text-[11px]">
              Script A: Explaining Antidepressant Neurobiology
            </span>
            <p className="text-slate-800 italic leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
              "Think of serotonin and norepinephrine like the chemical shock absorbers and fuel in your brain's engine. When prolonged stress drains them, every bump in life feels jarring, and your nervous system sends out false alarms of anxiety. This medication doesn't add foreign chemicals to change your personality; it simply blocks your brain from disposing of your own natural messengers too quickly, giving your nerves time to stabilize."
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
            <span className="font-extrabold text-rose-900 uppercase tracking-wider block text-[11px]">
              Script B: Explaining Benzo Risks &amp; Introducing Buspar
            </span>
            <p className="text-slate-800 italic leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
              "Benzodiazepines like Xanax or Ativan are like putting a cast on a broken arm—they can help in an emergency for a week or two, but if you keep a cast on for months, the muscle underneath withers away. Your brain develops tolerance, requiring higher doses to feel normal, and quitting abruptly is dangerous. That's why we're starting Buspar: it takes a couple of weeks to work, but it strengthens your natural anxiety defenses without fogging your brain, making you sleepy, or causing dependence."
            </p>
          </div>
        </div>
      </div>

      {/* NEW SECTION: Medical & Organic Rule-Outs for Inattention, Brain Fog & Executive Dysfunction */}
      <div className="bg-gradient-to-br from-amber-50/80 via-white to-teal-50/50 border-2 border-amber-300/80 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-amber-100 text-amber-950 text-xs font-black uppercase px-2.5 py-0.5 rounded-full border border-amber-300 flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5 text-amber-700" />
                Differential Diagnosis &amp; Lab Workup
              </span>
              <span className="bg-teal-100 text-teal-900 text-xs font-bold px-2 py-0.5 rounded-full border border-teal-300">
                Rule-Outs Prior to ADHD Rx
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Medical &amp; Organic Rule-Outs for Inattention &amp; Executive Dysfunction
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
              Before concluding a patient has primary Adult ADHD or escalating stimulants, rule out these organic metabolic, endocrine, hematologic, and hypoxic drivers of attention failure and cognitive impairment.
            </p>
          </div>

          <button
            onClick={() => copyToClipboard(getEhrLabRuleOutNote(), 'ehr_lab_note')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 self-start sm:self-auto"
          >
            {copiedKey === 'ehr_lab_note' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4 text-amber-200" />}
            Copy Lab Workup Note for EHR
          </button>
        </div>

        {/* 4 Organic Drivers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Driver 1: Hemoglobin A1c & Diabetes Mellitus */}
          <div className="bg-white border-2 border-amber-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-amber-600" />
                Metabolic &amp; Glycemic Control
              </span>
              <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">Hemoglobin A1c</span>
            </div>

            <h3 className="text-sm font-black text-slate-900">
              Diabetes Mellitus (DM) &amp; Chronic Hyperglycemia
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              Glucose dysregulation and microvascular cerebral capillary damage impair frontostriatal brain networks:
            </p>

            <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-100 space-y-1.5 text-xs text-slate-800">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                <span><strong className="text-amber-950 font-bold">Reduced Sustained Attention:</strong> Inability to hold focus during lengthy or complex tasks.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                <span><strong className="text-amber-950 font-bold">Reduced Processing Speed:</strong> Sluggish cognitive reaction time and delayed mental retrieval.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                <span><strong className="text-amber-950 font-bold">Impaired Executive Functioning:</strong> Disorganization, working memory lapses, and poor impulse control mimicking ADHD.</span>
              </div>
            </div>

            <div className="text-[11px] font-semibold text-slate-500 pt-1 border-t border-slate-100 flex items-center justify-between">
              <span>Target: A1c &lt; 5.7% (Normal) • 5.7–6.4% (Pre-DM)</span>
              <span className="text-amber-700 font-bold">&gt; 6.5% Diagnostic for DM</span>
            </div>
          </div>

          {/* Driver 2: Thyroid Axis (TSH, Free T3, Free T4) */}
          <div className="bg-white border-2 border-indigo-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-indigo-600" />
                Endocrine Cascade
              </span>
              <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">TSH • Free T3 • Free T4</span>
            </div>

            <h3 className="text-sm font-black text-slate-900">
              Thyroid Dysfunction: Cognitive &amp; Visuospatial Deficits
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              Thyroid hormone is essential for cerebral perfusion, synaptic plasticity, and hippocampal memory encoding:
            </p>

            <div className="p-3 bg-indigo-50/50 rounded-lg border border-indigo-100 space-y-1.5 text-xs text-slate-800">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                <span><strong className="text-indigo-950 font-bold">Verbal Memory &amp; Concentration:</strong> Difficulty recalling words, short-term forgetting, and attention drifting.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                <div>
                  <strong className="text-indigo-950 font-bold">Impaired Visuospatial Processing:</strong>
                  <p className="text-[11px] text-slate-700 mt-0.5 italic">
                    The ability to perceive, analyze, and manipulate visual patterns and images — e.g. using a map, navigating familiar environments, walking through doorways without bumping, making sense of numbers, symbols, and letter layouts.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-[11px] font-semibold text-slate-500 pt-1 border-t border-slate-100 flex items-center justify-between">
              <span>TSH Normal: 0.4–4.0 mIU/L</span>
              <span className="text-indigo-700 font-bold">Always check Free T3/T4 if TSH borderline</span>
            </div>
          </div>

          {/* Driver 3: Sleep Deprivation & Obstructive Sleep Apnea (OSA) */}
          <div className="bg-white border-2 border-cyan-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-black uppercase tracking-wider text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200 flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5 text-cyan-600" />
                Sleep Architecture &amp; Hypoxia
              </span>
              <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">Sleep Study • Berlin Survey</span>
            </div>

            <h3 className="text-sm font-black text-slate-900">
              Sleep Deprivation &amp; Obstructive Sleep Apnea (OSA)
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              Chronic nocturnal micro-arousals and intermittent hypoxemia destroy prefrontal cortex restorative sleep:
            </p>

            <div className="p-3 bg-cyan-50/50 rounded-lg border border-cyan-100 space-y-1.5 text-xs text-slate-800">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 mt-1.5 shrink-0" />
                <span><strong className="text-cyan-950 font-bold">Severe Inattention &amp; Vigilance Lapses:</strong> Daytime micro-sleeps, spacing out during conversations, and extreme midday drowsiness.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 mt-1.5 shrink-0" />
                <span><strong className="text-cyan-950 font-bold">Nocturnal Polysomnography (Sleep Study):</strong> Gold-standard diagnostic evaluation when loud snoring, gasping, or morning dry mouth are endorsed.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 mt-1.5 shrink-0" />
                <span><strong className="text-cyan-950 font-bold">The Berlin Questionnaire:</strong> Validated clinical screening tool assessing 3 categories (snoring, daytime tiredness/fatigue, and hypertension/BMI &gt; 30).</span>
              </div>
            </div>

            <div className="text-[11px] font-semibold text-slate-500 pt-1 border-t border-slate-100 flex items-center justify-between">
              <span>Stimulants are contraindicated without CPAP</span>
              <span className="text-cyan-700 font-bold">Rule out OSA prior to Adderall/Vyvanse</span>
            </div>
          </div>

          {/* Driver 4: Anemia, B12, Ferritin, CBC & CMP-14 */}
          <div className="bg-white border-2 border-rose-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-black uppercase tracking-wider text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-rose-600" />
                Hematologic &amp; Micronutrient
              </span>
              <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">CBC • CMP-14 • Ferritin • B12</span>
            </div>

            <h3 className="text-sm font-black text-slate-900">
              Anemia &amp; Nutrient Deficiencies: Cognitive Fatigue
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              Inadequate oxygen-carrying capacity and neurochemical co-factor depletion mimic severe inattentive ADHD:
            </p>

            <div className="p-3 bg-rose-50/50 rounded-lg border border-rose-100 space-y-1.5 text-xs text-slate-800">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                <span><strong className="text-rose-950 font-bold">Serum Ferritin &amp; Iron Stores:</strong> Iron is an obligatory cofactor for tyrosine hydroxylase (dopamine synthesis). Ferritin &lt; 30–50 ng/mL causes marked brain fog and motor restlessness (RLS).</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                <span><strong className="text-rose-950 font-bold">Vitamin B12 &amp; Folate:</strong> Required for neuronal myelin maintenance and monoamine synthesis; deficiency causes apathy, memory loss, and inattention.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                <span><strong className="text-rose-950 font-bold">CBC with Diff &amp; CMP-14:</strong> Evaluates microcytic/macrocytic anemia, renal function, liver enzymes, calcium, and electrolyte homeostasis.</span>
              </div>
            </div>

            <div className="text-[11px] font-semibold text-slate-500 pt-1 border-t border-slate-100 flex items-center justify-between">
              <span>CBC: Check Hgb / Hct / MCV</span>
              <span className="text-rose-700 font-bold">Check Ferritin even if Hgb normal</span>
            </div>
          </div>

        </div>

        {/* Quick Screening Protocol: The Berlin Questionnaire for Sleep Apnea */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <h4 className="text-sm font-black text-slate-900">
                The Berlin Questionnaire: Quick 3-Category Screening Protocol for OSA
              </h4>
            </div>
            <span className="text-[11px] font-bold bg-teal-50 text-teal-800 px-2 py-0.5 rounded border border-teal-200">
              High Risk = Positive in 2 or more Categories
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <strong className="text-slate-900 block font-bold mb-1">Category 1: Snoring &amp; Breathing</strong>
              <p className="text-slate-600 leading-normal">
                Do you snore louder than talking? Does your snoring bother others? Has anyone noticed you stop breathing or gasp in your sleep?
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <strong className="text-slate-900 block font-bold mb-1">Category 2: Daytime Sleepiness</strong>
              <p className="text-slate-600 leading-normal">
                How often do you feel tired, fatigued, or not rested upon awakening? How often do you feel tired during waking hours or nod off driving?
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <strong className="text-slate-900 block font-bold mb-1">Category 3: Blood Pressure &amp; BMI</strong>
              <p className="text-slate-600 leading-normal">
                Do you have high blood pressure (hypertension)? Is your Body Mass Index (BMI) greater than 30 kg/m²?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
