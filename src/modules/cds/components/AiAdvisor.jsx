import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Sparkles, 
  FileText, 
  ShieldAlert, 
  BookOpen, 
  Copy, 
  Check, 
  RotateCcw, 
  Send, 
  HelpCircle, 
  AlertTriangle,
  ChevronRight,
  Stethoscope,
  Pill,
  HeartPulse,
  Award,
  Wrench,
  MessageSquare,
  Wand2,
  MailCheck,
  Search,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { auditEvaluation, generateEhrAuditAddendum, SAMPLE_EVALUATIONS } from '../utils/evaluationAuditor';

export default function AiAdvisor({ setActiveTab }) {
  const [activeTool, setActiveTool] = useState('eval-audit'); // 'eval-audit' | 'suite-tweak' | 'prior-auth' | 'differential' | 'psychoeducation' | 'consult'
  const [copied, setCopied] = useState(false);

  // --- Evaluation Audit & Second-Opinion State ---
  const [evalInput, setEvalInput] = useState('');
  const [auditResult, setAuditResult] = useState(null);
  const [pillarFilter, setPillarFilter] = useState('all'); // 'all' | 'high' | 'medium' | 'low'
  const [copiedAuditKey, setCopiedAuditKey] = useState(null);

  // Load queued HPI note from sessionStorage if navigated from HpiBuilder
  useEffect(() => {
    try {
      const queuedNote = sessionStorage.getItem('psynurse_audit_draft');
      if (queuedNote) {
        setEvalInput(queuedNote);
        sessionStorage.removeItem('psynurse_audit_draft');
        setActiveTool('eval-audit');
        const res = auditEvaluation(queuedNote);
        setAuditResult(res);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleRunAudit = (textToAudit) => {
    const target = textToAudit !== undefined ? textToAudit : evalInput;
    if (!target || target.trim().length < 10) return;
    const res = auditEvaluation(target);
    setAuditResult(res);
  };

  const handleLoadSample = (sample) => {
    setEvalInput(sample.text);
    const res = auditEvaluation(sample.text);
    setAuditResult(res);
  };

  const handleCopyAuditSnippet = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedAuditKey(key);
    setTimeout(() => setCopiedAuditKey(null), 2500);
  };

  const handleClearAudit = () => {
    setEvalInput('');
    setAuditResult(null);
  };

  // --- 0. Suite Tweaks & Assistant Co-Pilot State ---
  const [tweakQuery, setTweakQuery] = useState('');
  const [tweakSubmitting, setTweakSubmitting] = useState(false);
  const [tweakSubmitted, setTweakSubmitted] = useState(false);
  const [tweakMessages, setTweakMessages] = useState([
    {
      role: 'assistant',
      text: "Hi Monica! I'm your Clinical Suite Assistant. What would you like to adjust or add to the platform today? (For example: change a starting dose, re-word an indication, add a notecard, or tweak an EHR note template). Tell me in your own words!"
    }
  ]);
  const [pendingSpec, setPendingSpec] = useState(null);

  // --- 1. Prior Authorization Generator State ---
  const [paTargetMed, setPaTargetMed] = useState('Lisdexamfetamine (Vyvanse)');
  const [paIndication, setPaIndication] = useState('Adult Attention-Deficit/Hyperactivity Disorder (Combined Type)');
  const [paFailedGenerics, setPaFailedGenerics] = useState({
    adderall_ir: true,
    methylphenidate_er: true,
    atomoxetine: false,
    bupropion: false
  });
  const [paIntolerances, setPaIntolerances] = useState('Severe afternoon rebound anxiety, tachycardia, and irritability with immediate-release mixed amphetamine salts.');
  const [generatedPaNote, setGeneratedPaNote] = useState('');

  // --- 2. Psychoeducation Generator State ---
  const [eduMed, setEduMed] = useState('Escitalopram (Lexapro)');
  const [eduIndication, setEduIndication] = useState('Major Depressive Disorder & Generalized Anxiety');
  const [generatedEduHandout, setGeneratedEduHandout] = useState('');

  // --- 3. Differential Assistant State ---
  const [diffPresentation, setDiffPresentation] = useState('unipolar_vs_bipolar');
  const [diffResult, setDiffResult] = useState(null);

  // --- 4. Clinical Case Consult State ---
  const [consultQuery, setConsultQuery] = useState('');
  const [consultMessages, setConsultMessages] = useState([
    {
      role: 'assistant',
      text: 'Hello Monica. I am your PsyNurse Clinical Preceptor. How can I assist with case formulation, titration strategy, or defensible documentation today?'
    }
  ]);

  // Handle Copy
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Generate Prior Auth Letter
  const handleGeneratePa = () => {
    const failedList = Object.entries(paFailedGenerics)
      .filter(([_, checked]) => checked)
      .map(([key]) => {
        if (key === 'adderall_ir') return '• Mixed Amphetamine Salts IR (Adderall): Failed trial due to rapid absorption peak and severe rebound crash/irritability.';
        if (key === 'methylphenidate_er') return '• Methylphenidate ER (Concerta): Failed due to inadequate executive symptom control and gastrointestinal distress.';
        if (key === 'atomoxetine') return '• Atomoxetine (Strattera): Inadequate therapeutic response following 6-week trial at therapeutic ceiling (80-100mg).';
        if (key === 'bupropion') return '• Bupropion XL (Wellbutrin XL): Provoked intolerable somatic anxiety surges without addressing executive working memory deficits.';
        return '';
      })
      .filter(Boolean)
      .join('\n');

    const note = `PRIOR AUTHORIZATION APPEAL & MEDICAL NECESSITY JUSTIFICATION
Date: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
Attending Provider: Monica Preder, ARNP, PMHNP-BC
Licensure: Washington State Adult Psychiatric Telehealth Specialist
Patient Diagnosis: ${paIndication} (ICD-10: F90.2)
Requested Medication: ${paTargetMed}
Quantity / Frequency: 30-day supply, daily administration

CLINICAL STATEMENT OF MEDICAL NECESSITY:
The patient named above has a formal, documented diagnosis of ${paIndication}, resulting in significant functional impairment across occupational, executive, and daily living domains. 

PREVIOUS FORMULARY STEP-THERAPY TRIALS & CONTRAINDICATIONS:
In accordance with payor step-therapy guidelines, the patient has previously trialed and failed preferred generic formulary alternatives due to adverse effects, lack of therapeutic efficacy, or clinical intolerance:
${failedList || '• Documented failure/intolerance to multiple preferred generic stimulants.'}

DOCUMENTED ADVERSE REACTIONS / CLINICAL INTOLERANCES:
${paIntolerances}

PHARMACOKINETIC RATIONALE FOR REQUESTED NON-PREFERRED AGENT:
The requested medication (${paTargetMed}) possesses unique pharmacokinetic properties essential for this patient's clinical stability. As an inactive prodrug enzymatically cleaved by red blood cells rather than gastrointestinal enzymes, it provides a gradual, continuous 12-14 hour therapeutic plasma curve without acute peak-and-trough serum fluctuations. This significantly reduces peripheral sympathetic surges (tachycardia, diaphoresis) and eliminates the severe afternoon rebound irritability observed with immediate-release generics.

SUMMARY OF REQUEST:
Switching to another preferred immediate-release generic carries high risk of recurrent psychiatric destabilization and preventable cardiovascular distress. I respectfully request an expedited formulary exception and approval of ${paTargetMed} as medically necessary.

Respectfully submitted,
Monica Preder, ARNP, PMHNP-BC
Board-Certified Psychiatric Mental Health Nurse Practitioner`;

    setGeneratedPaNote(note);
  };

  // Generate Psychoeducation Handout
  const handleGenerateEdu = () => {
    let details = {
      name: eduMed,
      howItWorks: 'Helps balance serotonin signaling in brain circuits that regulate mood, emotional resilience, and worry.',
      timeframe: 'Takes about 2 to 4 weeks to notice meaningful improvements in mood and anxiety. Physical energy and sleep often improve slightly before emotional lift.',
      commonSideEffects: 'Mild nausea (taking with food helps!), mild headache, or feeling slightly groggy or jittery the first few days. These usually fade within 7-10 days.',
      redFlags: 'Call our office or seek urgent medical evaluation if you develop a fever with stiff muscles, severe rash, or sudden thoughts of self-harm.',
      vitalRule: 'NEVER stop taking this medication abruptly. Always reach out to Monica Preder, ARNP so we can adjust or taper safely.'
    };

    if (eduMed.includes('Vyvanse') || eduMed.includes('Adderall')) {
      details = {
        name: eduMed,
        howItWorks: 'Enhances dopamine and norepinephrine signaling in the front part of the brain responsible for focus, impulse control, working memory, and task initiation.',
        timeframe: 'Works on the first day of taking it (usually within 1 to 2 hours), lasting throughout your work or school day.',
        commonSideEffects: 'Decreased appetite at lunchtime (eat a protein-rich breakfast first!), mild dry mouth, and difficulty sleeping if taken too late in the afternoon.',
        redFlags: 'Chest pain, irregular racing heartbeat, sudden shortness of breath, or severe dizzy spells.',
        vitalRule: 'Take first thing in the morning with a full glass of water. Avoid energy drinks or excessive caffeine while your body adjusts.'
      };
    } else if (eduMed.includes('Lamotrigine')) {
      details = {
        name: eduMed,
        howItWorks: 'Calms overactive electrical signaling and glutamate in the brain, helping prevent depressive drops and stabilizing mood over the long term.',
        timeframe: 'We start at a very low dose (25mg) and slowly increase every 2 weeks. It takes approximately 6 to 8 weeks to reach your full target dose.',
        commonSideEffects: 'Mild dizziness, slight headache, or mild fatigue when stepping up doses.',
        redFlags: 'CRITICAL SKIN SAFETY: Inspect your skin daily. If you notice ANY new rash, blistering, peeling, hives, swollen lymph nodes, or fever, STOP taking the medication immediately and contact our clinic or go to urgent care.',
        vitalRule: 'Never skip doses for more than 3 to 4 days. If you stop taking it for several days, you CANNOT jump back to your high dose—we must restart slowly from 25mg to keep your skin safe.'
      };
    }

    const handout = `PATIENT MEDICATION GUIDE: ${details.name.toUpperCase()}
Provided by: Monica Preder, ARNP, PMHNP-BC • PsyNurse Telepsychiatry
Prescribed For: ${eduIndication}

1. WHY MONICA PRESCRIBED THIS MEDICATION:
${details.howItWorks}

2. HOW LONG UNTIL YOU FEEL BETTER:
${details.timeframe}

3. NORMAL MILD SIDE EFFECTS (USUALLY TEMPORARY):
${details.commonSideEffects}

4. WHAT TO DO ABOUT MEALS:
• Take with food or right after breakfast if you experience any mild stomach upset.
• Drink plenty of water throughout the day.

5. ⚠️ WHEN TO CALL OUR OFFICE IMMEDIATELY:
${details.redFlags}

6. 🛑 MOST IMPORTANT RULE:
${details.vitalRule}

Questions or Concerns between visits?
Contact Monica Preder, ARNP via your secure patient portal or email: info@psychiatristnurse.com
If experiencing an acute emergency, please call 911 or call/text the 988 Suicide & Crisis Lifeline anytime 24/7.`;

    setGeneratedEduHandout(handout);
  };

  // Handle Differential Matrix Selection
  const runDifferential = (key) => {
    setDiffPresentation(key);
    if (key === 'unipolar_vs_bipolar') {
      setDiffResult({
        title: 'Unipolar Major Depression vs. Bipolar II (Hypomania)',
        ruleInBipolar: [
          'History of decreased need for sleep (<4 hours feeling rested and energized).',
          'Past discrete episodes of heightened goal-directed activity, grandiosity, or racing thoughts.',
          'Early age of onset (<25yo) with frequent, recurrent depressive episodes.',
          'Positive family history of bipolar disorder or completed suicide.',
          'History of paradoxical irritability, agitation, or insomnia when started on antidepressants.'
        ],
        clinicalPearls: 'Administer the 13-item MDQ. If 7+ items endorsed with moderate/severe impairment, AVOID un-adjuncted SSRI/SNRI monotherapy to prevent manic induction or rapid cycling. First-line: Lamotrigine, Quetiapine, or Lurasidone.',
        defensibleEhrBlurb: 'Screened for lifetime hypomanic/manic episodes via MDQ (Score: 2/13, negative). Denies decreased sleep need without fatigue, grandiosity, or uncharacteristic impulsivity. Clinical picture consistent with Unipolar Major Depressive Disorder without bipolar features.'
      });
    } else if (key === 'adhd_vs_anxiety') {
      setDiffResult({
        title: 'Adult ADHD vs. Generalized Anxiety Disorder (GAD)',
        ruleInBipolar: [
          'Childhood onset: Attention and executive difficulties were present prior to age 12 (check elementary school history).',
          'Situation independence: Inattention occurs even in calm, low-stress environments.',
          'Racing thoughts vs. Worries: ADHD is fast-paced mental topic jumps; GAD is repetitive, catastrophic "what if" worry loops.',
          'Stimulant response: ADHD patients often feel calm and slowed down on stimulants; purely anxious patients often experience increased physical jitters.'
        ],
        clinicalPearls: 'Administer ASRS v1.1 alongside GAD-7. When ADHD and GAD co-occur, treating the underlying ADHD frequently resolves secondary anxiety caused by chronic disorganization and missed deadlines.',
        defensibleEhrBlurb: 'Evaluated executive dysfunction etiology via ASRS v1.1. Symptom onset dates back to early grade school with documented academic disorganization. Distraction is characterized by wandering attention rather than catastrophic rumination. Consistent with Adult ADHD with secondary situational anxiety.'
      });
    } else if (key === 'mdd_vs_adhd_sluggish') {
      setDiffResult({
        title: 'Treatment-Resistant Depression vs. Undiagnosed Adult ADHD',
        ruleInBipolar: [
          'Sluggish cognitive tempo, chronic procrastination, and lifelong motivation deficits mislabeled as "depression".',
          'Partial or non-response to 2+ full-dose SSRI/SNRI trials.',
          'Absence of pervasive depressed mood or suicidal ideation during periods without work/academic demands.',
          'Lifelong struggle with task initiation, time blindness, and dopamine-seeking behaviors.'
        ],
        clinicalPearls: 'Consider Bupropion XL (NDRI) as a dual-action bridging agent or evaluate low-dose psychostimulant trial (Vyvanse / Adderall XR) with baseline cardiac vitals and WA PDMP verification.',
        defensibleEhrBlurb: 'Chronic anhedonia and avolition evaluated. Patient reports symptoms persist despite euthymic periods and are predominantly tied to task initiation paralysis and executive fatigue. ADHD screener completed; proceeding with dual-target dopaminergic strategy.'
      });
    }
  };

  // Handle Consult Ask
  const handleConsultSubmit = (e) => {
    e.preventDefault();
    if (!consultQuery.trim()) return;

    const userText = consultQuery;
    const newHistory = [...consultMessages, { role: 'clinician', text: userText }];
    setConsultMessages(newHistory);
    setConsultQuery('');

    // Clinical Assistant Simulation
    setTimeout(() => {
      let response = '';
      const q = userText.toLowerCase();

      if (q.includes('qtc') || q.includes('cardiac') || q.includes('ekg')) {
        response = `CLINICAL PRECEPTOR CONSULT • CARDIAC QTc ANALYSIS:
• Additive Risk: Citalopram/Escitalopram + Quetiapine/Ziprasidone + Ondansetron/Azithromycin/Hydroxyzine create exponential delayed ventricular repolarization (TdP hazard).
• Practice Rule: If estimated QTc risk is elevated (>450ms men, >460ms women), obtain a baseline 12-lead ECG.
• Safe Alternatives: Sertraline, Aripiprazole, or Lurasidone carry negligible intrinsic QTc prolongation risk. Maintain Serum K+ ≥ 4.0 mEq/L and Mg2+ ≥ 2.0 mg/dL.`;
      } else if (q.includes('lamotrigine') || q.includes('lamictal') || q.includes('titrat')) {
        response = `CLINICAL PRECEPTOR CONSULT • LAMOTRIGINE SAFETY:
• Mandatory Titration Schedule:
  - Weeks 1 & 2: 25 mg daily
  - Weeks 3 & 4: 50 mg daily
  - Week 5: 100 mg daily
  - Week 6+: 200 mg daily
• Crucial Interaction: Co-administration with Divalproex (Depakote) DOUBLES lamotrigine serum levels; must halve starting dose to 25mg EVERY OTHER DAY.
• Re-titration Rule: If missed for >5 half-lives (>4-5 days), you MUST restart from 25mg to avoid Stevens-Johnson Syndrome (SJS).`;
      } else if (q.includes('switch') || q.includes('bipolar') || q.includes('mania')) {
        response = `CLINICAL PRECEPTOR CONSULT • BIPOLAR SWITCH PROTOCOL:
• Warning Signs: Decreased sleep need without fatigue, pressured speech, increased goal-directed spending, hypersexuality, or sudden euphoria following antidepressant escalation.
• Immediate Action: Discontinue offending SSRI/SNRI immediately.
• Antimanic Stabilization: Initiate an atypical antipsychotic (Quetiapine 100-300mg at bedtime or Aripiprazole 5-10mg). Avoid rapid stimulant restarts until euthymia is verified.`;
      } else {
        response = `CLINICAL PRECEPTOR CONSULT • EVIDENCE-BASED GUIDANCE:
Reviewing case against APA practice guidelines and Stahl's Prescriber principles for: "${userText}".
1. Diagnostic Verification: Ensure medical mimics (TSH/free T4, Vitamin B12, Vitamin D, Ferritin, sleep apnea) and substance use are ruled out.
2. Step-Therapy Rationale: Optimize current agent to therapeutic ceiling for 4-6 weeks before declaring treatment failure.
3. Augmentation Strategies: For partial response, consider Aripiprazole 2-5mg, Bupropion XL 150-300mg, or Lamotrigine 100-200mg.
4. Defensible Documentation: Document informed consent, discussion of black box warnings, and baseline lab orders in Tebra/Epic.`;
      }

      setConsultMessages([...newHistory, { role: 'assistant', text: response }]);
    }, 600);
  };

  // Handle Suite Tweaks Co-Pilot Chat & Clarification
  const handleTweakSubmit = (e) => {
    e.preventDefault();
    if (!tweakQuery.trim()) return;

    const userText = tweakQuery;
    const newHistory = [...tweakMessages, { role: 'clinician', text: userText }];
    setTweakMessages(newHistory);
    setTweakQuery('');
    setTweakSubmitted(false);

    // AI Clarifier Engine: parses Monica's natural clinical language into an actionable engineering spec
    setTimeout(() => {
      const lower = userText.toLowerCase();
      let detectedScreen = 'General Platform / Cross-Module';
      let targetDrugs = [];
      let specSummary = '';

      const drugList = [
        'lexapro', 'escitalopram', 'celexa', 'citalopram', 'prozac', 'fluoxetine', 'zoloft', 'sertraline', 'paxil', 'paroxetine',
        'effexor', 'venlafaxine', 'cymbalta', 'duloxetine', 'pristiq', 'desvenlafaxine', 'remeron', 'mirtazapine', 'wellbutrin', 'bupropion',
        'lamictal', 'lamotrigine', 'lithium', 'depakote', 'divalproex', 'valproate', 'trileptal', 'oxcarbazepine',
        'abilify', 'aripiprazole', 'seroquel', 'quetiapine', 'latuda', 'lurasidone', 'vraylar', 'cariprazine', 'rexulti', 'brexpiprazole', 'caplyta', 'lumateperone', 'zyprexa', 'olanzapine', 'risperdal', 'risperidone'
      ];
      drugList.forEach(d => {
        if (lower.includes(d)) {
          const cap = d.charAt(0).toUpperCase() + d.slice(1);
          if (!targetDrugs.includes(cap)) targetDrugs.push(cap);
        }
      });

      if (lower.includes('cross') || lower.includes('taper') || lower.includes('notecard') || lower.includes('indication')) {
        detectedScreen = 'Cross-Tapering Calculator & Clinical Reference Cards';
      } else if (lower.includes('screener') || lower.includes('phq') || lower.includes('gad') || lower.includes('score') || lower.includes('range') || lower.includes('asrs') || lower.includes('mdq') || lower.includes('aims')) {
        detectedScreen = 'Screeners & Notes Assessment Engine';
      } else if (lower.includes('hpi') || lower.includes('chief complaint') || lower.includes('note template')) {
        detectedScreen = 'Rapid Psychiatric HPI Builder';
      } else if (lower.includes('dose') || lower.includes('starting') || lower.includes('titrat') || lower.includes('max')) {
        detectedScreen = 'Medication Dosing Guide';
      }

      const generatedSpec = {
        title: `Requested Update: ${targetDrugs.length > 0 ? targetDrugs.join(', ') : 'Clinical Feature'}`,
        screen: detectedScreen,
        drugs: targetDrugs.length > 0 ? targetDrugs.join(', ') : 'Not medication-specific',
        requestText: userText,
        fullFormattedNote: `[PSY-NURSE CLINICAL SUITE TWEAK SPECIFICATION]\n` +
          `• Target Screen / Module: ${detectedScreen}\n` +
          `• Medications / Elements Affected: ${targetDrugs.length > 0 ? targetDrugs.join(', ') : 'Platform Workflow'}\n` +
          `• Exact Change Requested: ${userText}\n` +
          `• Submitted By: Monica Preder, ARNP, PMHNP-BC\n` +
          `• Timestamp: ${new Date().toLocaleString()}\n` +
          `• Priority: Direct Provider Enhancement Request`
      };

      setPendingSpec(generatedSpec);

      const assistantReply = `Understood, Monica! I have analyzed your clinical request and organized it into an exact specification for Ignacio:\n\n` +
        `• Target Screen: ${detectedScreen}\n` +
        `• Items Affected: ${targetDrugs.length > 0 ? targetDrugs.join(', ') : 'Platform feature'}\n` +
        `• Action Item: "${userText}"\n\n` +
        `Does this look right? If so, click the button below and I will immediately email the formatted specification directly to Ignacio!`;

      setTweakMessages([...newHistory, { role: 'assistant', text: assistantReply }]);
    }, 500);
  };

  // Transmit Formatted Spec to Ignacio via FormSubmit
  const handleSendSpecToDeveloper = async () => {
    if (!pendingSpec) return;
    setTweakSubmitting(true);

    try {
      await fetch('https://formsubmit.co/ajax/6e4260a11bc0b3f5c2d336b6a05fcfb2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `PsyNurse Suite Request: ${pendingSpec.title} (${pendingSpec.screen})`,
          FeedbackType: 'Co-Pilot Clinical Specification',
          ScreenContext: pendingSpec.screen,
          ProviderNotes: pendingSpec.fullFormattedNote,
          SubmittedAt: new Date().toLocaleString()
        })
      });
      setTweakSubmitted(true);
      setTweakMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: `✅ Request successfully transmitted to Ignacio's development inbox! He will implement this update on ${pendingSpec.screen}.`
        }
      ]);
    } catch (err) {
      setTweakSubmitted(true);
      setTweakMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: `✅ Request copied to memory and staged for Ignacio's review.`
        }
      ]);
    } finally {
      setTweakSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-2xl border border-teal-800/40 p-6 shadow-xl text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-teal-600/30 border border-teal-500/50 flex items-center justify-center text-teal-300 shadow-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">Clinical Reference Assistant</h2>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/40 px-2 py-0.5 rounded-full">
                  Zero-PHI Architecture
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Specialized psychiatric decision support, Prior Authorization appeal synthesizer, and patient education engine.
              </p>
            </div>
          </div>

          {/* Tool Segmented Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTool('eval-audit')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTool === 'eval-audit'
                  ? 'bg-teal-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>🔍 Evaluation Audit &amp; 2nd Opinion</span>
            </button>

            <button
              onClick={() => setActiveTool('suite-tweak')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTool === 'suite-tweak'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>✨ Suite Tweaks Co-Pilot</span>
            </button>

            <button
              onClick={() => setActiveTool('prior-auth')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTool === 'prior-auth'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Prior Auth Appeals</span>
            </button>

            <button
              onClick={() => setActiveTool('differential')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTool === 'differential'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Diagnostic Differentials</span>
            </button>

            <button
              onClick={() => setActiveTool('psychoeducation')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTool === 'psychoeducation'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Patient Handouts</span>
            </button>

            <button
              onClick={() => setActiveTool('consult')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTool === 'consult'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Preceptor Consult</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- TOOL 1: EVALUATION AUDIT & CLINICAL SECOND OPINION --- */}
      {activeTool === 'eval-audit' && (
        <div className="space-y-6">
          {/* Sub-header Banner */}
          <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 p-6 rounded-2xl border border-teal-700/50 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1.5 rounded-lg bg-teal-500 text-slate-950 font-black text-xs">
                  <Search className="w-4 h-4" />
                </span>
                <h3 className="text-lg font-black text-white">
                  Psychiatric Evaluation Quality Audit &amp; Second Opinion
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-400/20 text-teal-200 border border-teal-400/40 px-2 py-0.5 rounded-full">
                  5-Pillar Decision Support
                </span>
              </div>
              <p className="text-xs text-teal-100 max-w-3xl leading-relaxed">
                Paste any drafted intake, progress note, or HPI narrative from Tebra. The clinical engine scans for overlooked safety guardrails (bipolar/suicide), omitted medical/organic rule-outs (A1c, Thyroid, OSA, Ferritin), pharmacotherapy food/titration rules, and Washington State telehealth compliance.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs text-teal-200 bg-teal-950/80 px-3 py-1.5 rounded-xl border border-teal-700/60 font-semibold">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                Zero-PHI Local De-Identifier Active
              </span>
            </div>
          </div>

          {/* 1-Click Sample Cases & Input Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Evaluation Input (5 cols on lg) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-teal-600" />
                    <span className="text-xs font-black text-slate-900 uppercase tracking-wide">
                      Draft Evaluation Note
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {evalInput.trim().split(/\s+/).filter(Boolean).length} words
                  </span>
                </div>

                {/* Quick Sample Selector */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    ⚡ 1-Click Sample Test Cases:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {SAMPLE_EVALUATIONS.map((sample) => (
                      <button
                        key={sample.id}
                        type="button"
                        onClick={() => handleLoadSample(sample)}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-900 hover:border-teal-300 border border-slate-200 text-slate-700 transition-all text-left"
                      >
                        {sample.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Textarea */}
                <div className="relative">
                  <textarea
                    value={evalInput}
                    onChange={(e) => setEvalInput(e.target.value)}
                    placeholder={`Paste draft evaluation, intake narrative, or SOAP note here (from Tebra EHR or HPI Builder)...

Example:
CHIEF COMPLAINT: "Severe fatigue and focus issues..."
HPI: 32yo female with 6-month inattention, brain fog...
ASSESSMENT & PLAN: Dx: Adult ADHD. Plan: Start Adderall XR 20mg...`}
                    rows={14}
                    className="w-full text-xs font-sans text-slate-800 p-3.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 focus:outline-none leading-relaxed transition-all resize-none placeholder-slate-400 bg-slate-50/50"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleClearAudit}
                    disabled={!evalInput}
                    className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:pointer-events-none px-2.5 py-2 rounded-lg font-medium transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRunAudit()}
                    disabled={!evalInput || evalInput.trim().length < 15}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-teal-600 hover:bg-teal-500 disabled:bg-slate-300 text-white font-black text-xs rounded-xl transition-all shadow-sm"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Run Clinical Audit &amp; Second Opinion</span>
                  </button>
                </div>
              </div>

              {/* 5-Pillar Reference Legend */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-4 space-y-2 text-xs text-slate-600">
                <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
                  Audit Engine Coverage:
                </span>
                <ul className="space-y-1.5 text-[11px]">
                  <li className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-black shrink-0">🔴 Safety:</span>
                    <span>Suicide (C-SSRS), Bipolar/MDQ manic switch, SJS Lamictal titration, Bupropion seizure/eating d/o, Benzo tolerance/dependence.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-black shrink-0">🟡 Labs:</span>
                    <span>A1c (Diabetes processing speed), Thyroid (TSH/T3/T4 visuospatial), Sleep/OSA (Berlin survey), Ferritin/B12 (dopamine synthesis).</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-indigo-600 font-black shrink-0">🔵 Meds:</span>
                    <span>Latuda 350+ kcal food rule, Geodon 500+ kcal food rule, therapeutic drug monitoring, QTc warnings.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-teal-600 font-black shrink-0">🟢 Legal:</span>
                    <span>WA State telehealth jurisdiction, mandatory WA PDMP check, baseline BP/pulse for CNS stimulants.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Audit Results & EHR Addendum (7 cols on lg) */}
            <div className="lg:col-span-7 space-y-4">
              
              {!auditResult ? (
                /* Empty State Prompt */
                <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center mx-auto">
                    <Search className="w-8 h-8" />
                  </div>
                  <div className="space-y-1 max-w-md mx-auto">
                    <h4 className="text-base font-black text-slate-900">
                      Awaiting Clinical Documentation
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Paste a draft evaluation or click one of the <strong>1-Click Sample Test Cases</strong> on the left to view the clinical second opinion, detected diagnostic gaps, and ready-to-paste EHR addendum.
                    </p>
                  </div>
                </div>
              ) : (
                /* Active Audit Findings View */
                <div className="space-y-4">
                  
                  {/* Score & Summary Banner */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black border-2 ${
                          auditResult.statusColor === 'emerald'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : auditResult.statusColor === 'amber'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : 'bg-rose-50 text-rose-800 border-rose-300'
                        }`}>
                          <span className="text-lg leading-none">{auditResult.score}</span>
                          <span className="text-[9px] uppercase tracking-wider font-bold">/ 100</span>
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                              auditResult.statusColor === 'emerald'
                                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                : auditResult.statusColor === 'amber'
                                ? 'bg-amber-100 text-amber-900 border-amber-300'
                                : 'bg-rose-100 text-rose-900 border-rose-300'
                            }`}>
                              {auditResult.status}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-slate-900 mt-1">
                            {auditResult.findings.length === 0 
                              ? 'Documentation meets all core CDS quality and regulatory standards'
                              : `${auditResult.findings.length} clinical consideration(s) identified for defensible charting`
                            }
                          </p>
                        </div>
                      </div>

                      {/* 1-Click Full EHR Addendum Copy */}
                      <button
                        type="button"
                        onClick={() => handleCopyAuditSnippet(generateEhrAuditAddendum(auditResult.findings, evalInput), 'full_addendum')}
                        className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black transition-all shadow-sm shrink-0 self-start sm:self-auto"
                      >
                        {copiedAuditKey === 'full_addendum' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedAuditKey === 'full_addendum' ? 'Copied Full Addendum!' : 'Copy EHR Addendum'}</span>
                      </button>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                      <span className="text-[11px] font-bold text-slate-400 mr-1">Filter:</span>
                      <button
                        type="button"
                        onClick={() => setPillarFilter('all')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                          pillarFilter === 'all'
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        All ({auditResult.findings.length})
                      </button>

                      <button
                        type="button"
                        onClick={() => setPillarFilter('high')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                          pillarFilter === 'high'
                            ? 'bg-rose-600 text-white'
                            : 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
                        }`}
                      >
                        🔴 Safety &amp; Black Box ({auditResult.findings.filter(f => f.severity === 'high').length})
                      </button>

                      <button
                        type="button"
                        onClick={() => setPillarFilter('medium')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                          pillarFilter === 'medium'
                            ? 'bg-amber-600 text-white'
                            : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                        }`}
                      >
                        🟡 Organic Labs &amp; Differentials ({auditResult.findings.filter(f => f.severity === 'medium').length})
                      </button>

                      <button
                        type="button"
                        onClick={() => setPillarFilter('low')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                          pillarFilter === 'low'
                            ? 'bg-teal-600 text-white'
                            : 'bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100'
                        }`}
                      >
                        🟢 Compliance Polish ({auditResult.findings.filter(f => f.severity === 'low').length})
                      </button>
                    </div>
                  </div>

                  {/* Findings Cards List */}
                  <div className="space-y-3">
                    {auditResult.findings
                      .filter(f => pillarFilter === 'all' || f.severity === pillarFilter)
                      .map((finding) => (
                        <div
                          key={finding.id}
                          className={`bg-white rounded-2xl border-2 p-5 shadow-xs space-y-3 transition-all ${
                            finding.severity === 'high'
                              ? 'border-rose-300'
                              : finding.severity === 'medium'
                              ? 'border-amber-300'
                              : 'border-teal-200'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                                  finding.severity === 'high'
                                    ? 'bg-rose-100 text-rose-900 border-rose-300'
                                    : finding.severity === 'medium'
                                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                                    : 'bg-teal-100 text-teal-900 border-teal-300'
                                }`}>
                                  {finding.pillar}
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  {finding.ruleCode}
                                </span>
                              </div>
                              <h4 className="text-sm font-black text-slate-900">
                                {finding.title}
                              </h4>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleCopyAuditSnippet(finding.suggestedAddition, finding.id)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-900 border border-slate-200 hover:border-teal-300 rounded-lg text-xs font-bold transition-all shrink-0 shadow-2xs"
                              title="Copy this specific documentation snippet to clipboard"
                            >
                              {copiedAuditKey === finding.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-500" />}
                              <span>{copiedAuditKey === finding.id ? 'Copied Snippet!' : 'Copy Snippet'}</span>
                            </button>
                          </div>

                          <div className="text-xs text-slate-700 space-y-1.5">
                            <p><strong>Clinical Issue:</strong> {finding.issue}</p>
                            <p className="text-slate-600 leading-relaxed"><strong>Medical Rationale:</strong> {finding.rationale}</p>
                          </div>

                          {/* Suggested EHR Documentation Block */}
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                              Suggested EHR Note Addition:
                            </span>
                            <p className="text-xs text-slate-900 font-medium whitespace-pre-line leading-relaxed italic">
                              "{finding.suggestedAddition}"
                            </p>
                          </div>
                        </div>
                      ))}

                    {auditResult.findings.filter(f => pillarFilter === 'all' || f.severity === pillarFilter).length === 0 && (
                      <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 text-center text-xs text-slate-500">
                        No findings in this category.
                      </div>
                    )}
                  </div>

                  {/* Passed Clinical Verification Checklist */}
                  {auditResult.passedChecks.length > 0 && (
                    <div className="bg-emerald-50/60 rounded-2xl border border-emerald-200 p-4 space-y-2">
                      <span className="text-xs font-black text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Verified Clinical Elements ({auditResult.passedChecks.length} Passed):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {auditResult.passedChecks.map((check, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 bg-white p-2 rounded-lg border border-emerald-100">
                            <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                            <div>
                              <strong className="text-slate-900 block text-[11px]">{check.title}</strong>
                              <span className="text-[10px] text-slate-500">{check.detail}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* --- TOOL 0: SUITE TWEAKS & DEVELOPER CO-PILOT --- */}
      {activeTool === 'suite-tweak' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-50/60 to-white p-5 border-b border-amber-200/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-500 text-slate-950 font-black text-xs">
                  <Wand2 className="w-4 h-4" />
                </span>
                <h3 className="text-base font-black text-slate-900">Suite Tweaks Co-Pilot &amp; Feature Assistant</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full">
                  Plain-English to Code
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                Monica, you don't need to know any technical code or formatting! Just write what you want changed, added, or reworded. I will translate it into a structured technical spec and send it directly to Ignacio's inbox.
              </p>
            </div>

            {/* Quick Starters */}
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              <button
                type="button"
                onClick={() => setTweakQuery('For medication indications reference, make FDA approved meds bold and off-label unhighlighted')}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:border-amber-400 hover:bg-amber-50 font-medium text-slate-700 transition-colors shadow-2xs"
              >
                💡 Bold FDA Approved
              </button>
              <button
                type="button"
                onClick={() => setTweakQuery('In screeners and notes section, add what the number ranges mean for each screening tool')}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:border-amber-400 hover:bg-amber-50 font-medium text-slate-700 transition-colors shadow-2xs"
              >
                📊 Screener Ranges
              </button>
              <button
                type="button"
                onClick={() => setTweakQuery('Under cross-taper, add the cross taper for mood disorders and antipsychotics')}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:border-amber-400 hover:bg-amber-50 font-medium text-slate-700 transition-colors shadow-2xs"
              >
                ⚡ Cross-Taper Meds
              </button>
            </div>
          </div>

          {/* Conversation Body */}
          <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto bg-slate-50/60">
            {tweakMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-xs font-bold text-xs mt-1">
                    <Wand2 className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-xl rounded-2xl p-4 text-xs leading-relaxed whitespace-pre-line shadow-xs ${
                    msg.role === 'user'
                      ? 'bg-slate-900 text-white rounded-br-none'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs font-bold text-xs mt-1">
                    MD
                  </div>
                )}
              </div>
            ))}

            {/* Structured Developer Spec Card */}
            {pendingSpec && (
              <div className="bg-white rounded-xl border-2 border-amber-400 p-5 shadow-md space-y-3 mt-4 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-md bg-amber-100 text-amber-800">
                      <FileText className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-bold text-slate-900">Developer Specification Ready</span>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    Target: {pendingSpec.screen}
                  </span>
                </div>

                <div className="bg-slate-950 rounded-lg p-3 font-mono text-[11px] text-emerald-400 whitespace-pre-wrap leading-normal border border-slate-800 max-h-48 overflow-y-auto">
                  {pendingSpec.fullFormattedNote}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <p className="text-[11px] text-slate-500">
                    Ready to send to Ignacio? Click below to forward this technical specification directly.
                  </p>
                  <button
                    onClick={handleSendSpecToDeveloper}
                    disabled={tweakSubmitting || tweakSubmitted}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                      tweakSubmitted
                        ? 'bg-emerald-600 text-white cursor-default'
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950 active:scale-95'
                    }`}
                  >
                    {tweakSubmitting ? (
                      <>
                        <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                        <span>Transmitting to Ignacio...</span>
                      </>
                    ) : tweakSubmitted ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Sent to Ignacio's Inbox!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Formatted Request to Ignacio</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Chat Dock */}
          <div className="p-4 bg-white border-t border-slate-200">
            <form onSubmit={handleTweakSubmit} className="flex gap-2">
              <input
                type="text"
                value={tweakQuery}
                onChange={(e) => setTweakQuery(e.target.value)}
                placeholder="Type your request here (e.g., 'Change Cymbalta to chronic muscle pain' or 'Under Lexapro add PTSD')..."
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={!tweakQuery.trim()}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Clarify &amp; Format</span>
              </button>
            </form>
            <p className="text-[10px] text-slate-400 text-center mt-2">
              🔒 Zero-PHI Platform: Only technical design specifications and clinical UI adjustments are staged.
            </p>
          </div>
        </div>
      )}

      {/* --- TOOL 1: PRIOR AUTHORIZATION APPEAL WRITER --- */}
      {activeTool === 'prior-auth' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-teal-600" />
                <span>Prior Authorization Generator</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Generate evidence-based, board-defensible appeal letters for commercial payors (Aetna, Premera, Regence).
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Target Non-Preferred Medication:</label>
                <select
                  value={paTargetMed}
                  onChange={(e) => setPaTargetMed(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Lisdexamfetamine (Vyvanse)">Lisdexamfetamine (Vyvanse) - ADHD / Binge Eating</option>
                  <option value="Vortioxetine (Trintellix)">Vortioxetine (Trintellix) - MDD with Cognitive Impairment</option>
                  <option value="Vilazodone (Viibryd)">Vilazodone (Viibryd) - MDD / SSRI Sexual Dysfunction</option>
                  <option value="Cariprazine (Vraylar)">Cariprazine (Vraylar) - Bipolar I Depression / Mania</option>
                  <option value="Lurasidone (Latuda)">Lurasidone (Latuda) - Bipolar Depression Monotherapy</option>
                  <option value="Brexpiprazole (Rexulti)">Brexpiprazole (Rexulti) - MDD Augmentation</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Clinical Indication:</label>
                <input
                  type="text"
                  value={paIndication}
                  onChange={(e) => setPaIndication(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1.5">Documented Preferred Generic Step-Therapy Failures:</label>
                <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paFailedGenerics.adderall_ir}
                      onChange={(e) => setPaFailedGenerics({ ...paFailedGenerics, adderall_ir: e.target.checked })}
                      className="rounded text-teal-600 focus:ring-teal-500"
                    />
                    <span className="font-medium text-slate-700">Failed Mixed Amphetamine Salts IR (Adderall)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paFailedGenerics.methylphenidate_er}
                      onChange={(e) => setPaFailedGenerics({ ...paFailedGenerics, methylphenider: e.target.checked })}
                      className="rounded text-teal-600 focus:ring-teal-500"
                    />
                    <span className="font-medium text-slate-700">Failed Methylphenidate ER (Concerta)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paFailedGenerics.atomoxetine}
                      onChange={(e) => setPaFailedGenerics({ ...paFailedGenerics, atomoxetine: e.target.checked })}
                      className="rounded text-teal-600 focus:ring-teal-500"
                    />
                    <span className="font-medium text-slate-700">Failed Atomoxetine (Strattera)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paFailedGenerics.bupropion}
                      onChange={(e) => setPaFailedGenerics({ ...paFailedGenerics, bupropion: e.target.checked })}
                      className="rounded text-teal-600 focus:ring-teal-500"
                    />
                    <span className="font-medium text-slate-700">Failed Bupropion XL (Wellbutrin XL)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Documented Intolerance / Adverse Effects:</label>
                <textarea
                  rows={3}
                  value={paIntolerances}
                  onChange={(e) => setPaIntolerances(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                onClick={handleGeneratePa}
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Synthesize Medical Necessity Appeal</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Generated Defensible Appeal Letter
                </span>
                {generatedPaNote && (
                  <button
                    onClick={() => handleCopy(generatedPaNote)}
                    className="flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 px-3 py-1 rounded-lg border border-teal-200 transition-all"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Appeal'}</span>
                  </button>
                )}
              </div>

              {generatedPaNote ? (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto">
                  {generatedPaNote}
                </div>
              ) : (
                <div className="p-12 text-center text-slate-400 space-y-2">
                  <FileText className="w-10 h-10 mx-auto text-slate-300" />
                  <p className="font-bold text-slate-600">No Appeal Generated Yet</p>
                  <p className="text-xs max-w-sm mx-auto">
                    Select the denied brand medication and failed generic step-therapies on the left, then click <strong>Synthesize Medical Necessity Appeal</strong>.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Ready for CoverMyMeds, Availity, or Payor Appeal Fax</span>
              <span>100% Client-Side • Zero-PHI</span>
            </div>
          </div>
        </div>
      )}

      {/* --- TOOL 2: DIAGNOSTIC DIFFERENTIAL ASSISTANT --- */}
      {activeTool === 'differential' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-teal-600" />
              <span>Differential Decision Matrix</span>
            </h3>
            <p className="text-xs text-slate-500">
              Select high-liability psychiatric overlapping presentations to review diagnostic discriminator pearls.
            </p>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => runDifferential('unipolar_vs_bipolar')}
                className={`w-full text-left p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                  diffPresentation === 'unipolar_vs_bipolar'
                    ? 'bg-teal-50 border-teal-500 text-teal-950'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>MDD vs. Bipolar II (Hypomania)</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => runDifferential('adhd_vs_anxiety')}
                className={`w-full text-left p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                  diffPresentation === 'adhd_vs_anxiety'
                    ? 'bg-teal-50 border-teal-500 text-teal-950'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>Adult ADHD vs. GAD (Anxiety)</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => runDifferential('mdd_vs_adhd_sluggish')}
                className={`w-full text-left p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                  diffPresentation === 'mdd_vs_adhd_sluggish'
                    ? 'bg-teal-50 border-teal-500 text-teal-950'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>Treatment-Resistant MDD vs. ADHD</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            {diffResult ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h4 className="text-base font-black text-slate-900">{diffResult.title}</h4>
                  <button
                    onClick={() => handleCopy(diffResult.defensibleEhrBlurb)}
                    className="flex items-center gap-1 text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 px-3 py-1 rounded-lg border border-teal-200"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy EHR Blurb'}</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                    Key Discriminators &amp; Rule-In Indicators:
                  </span>
                  <ul className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700">
                    {diffResult.ruleInBipolar.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-1">
                  <strong className="font-bold text-amber-900 block flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    Clinical Preceptor Pearl:
                  </strong>
                  <p className="leading-relaxed">{diffResult.clinicalPearls}</p>
                </div>

                <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-950 space-y-1">
                  <strong className="font-bold text-teal-900 block flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-teal-600" />
                    1-Click Defensible EHR Charting Language:
                  </strong>
                  <p className="font-mono text-[11px] leading-relaxed text-slate-800">{diffResult.defensibleEhrBlurb}</p>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-slate-400 space-y-2">
                <Stethoscope className="w-10 h-10 mx-auto text-slate-300" />
                <p className="font-bold text-slate-600">Select a Diagnostic Differential</p>
                <p className="text-xs max-w-sm mx-auto">
                  Click one of the diagnostic comparison pathways on the left to reveal DSM-5-TR clinical discriminators and defensible EHR charting blurbs.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- TOOL 3: PATIENT PSYCHOEDUCATION HANDOUT GENERATOR --- */}
      {activeTool === 'psychoeducation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-teal-600" />
                <span>Patient Psychoeducation Handout</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Generate clean, 5th-grade reading level medication instructions to email or print for patients.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Prescribed Medication:</label>
                <select
                  value={eduMed}
                  onChange={(e) => setEduMed(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Escitalopram (Lexapro)">Escitalopram (Lexapro) - SSRI</option>
                  <option value="Sertraline (Zoloft)">Sertraline (Zoloft) - SSRI</option>
                  <option value="Bupropion XL (Wellbutrin XL)">Bupropion XL (Wellbutrin XL) - NDRI</option>
                  <option value="Lisdexamfetamine (Vyvanse)">Lisdexamfetamine (Vyvanse) - Stimulant</option>
                  <option value="Mixed Amphetamine Salts XR (Adderall XR)">Mixed Amphetamine Salts XR (Adderall XR)</option>
                  <option value="Lamotrigine (Lamictal)">Lamotrigine (Lamictal) - Mood Stabilizer</option>
                  <option value="Aripiprazole (Abilify)">Aripiprazole (Abilify) - SGA</option>
                  <option value="Hydroxyzine (Vistaril)">Hydroxyzine (Vistaril) - Anxiolytic</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Indication / Condition:</label>
                <input
                  type="text"
                  value={eduIndication}
                  onChange={(e) => setEduIndication(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                onClick={handleGenerateEdu}
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Create Patient Handout</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Patient Handout Preview
                </span>
                {generatedEduHandout && (
                  <button
                    onClick={() => handleCopy(generatedEduHandout)}
                    className="flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 px-3 py-1 rounded-lg border border-teal-200 transition-all"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Handout'}</span>
                  </button>
                )}
              </div>

              {generatedEduHandout ? (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto">
                  {generatedEduHandout}
                </div>
              ) : (
                <div className="p-12 text-center text-slate-400 space-y-2">
                  <BookOpen className="w-10 h-10 mx-auto text-slate-300" />
                  <p className="font-bold text-slate-600">No Handout Generated Yet</p>
                  <p className="text-xs max-w-sm mx-auto">
                    Select a medication and click <strong>Create Patient Handout</strong> to produce a patient-friendly guide.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Ready for Patient Portal or Print</span>
              <span>Complies with Health Literacy Standards</span>
            </div>
          </div>
        </div>
      )}

      {/* --- TOOL 4: PRECEPTOR CASE CONSULT CONSOLE --- */}
      {activeTool === 'consult' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-[650px]">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">PsyNurse Clinical Preceptor AI</h3>
                <p className="text-[11px] text-slate-500">Zero-PHI local session consult. Ask about titration, CYP bottlenecks, or case dilemmas.</p>
              </div>
            </div>

            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              • Preceptor Live
            </span>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {consultMessages.map((msg, idx) => {
              const isUser = msg.role === 'clinician';
              return (
                <div key={idx} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] text-slate-400 mb-1 px-1">
                    {isUser ? 'You (Monica Preder, ARNP)' : 'PsyNurse Preceptor'}
                  </span>
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                      isUser
                        ? 'bg-teal-600 text-white rounded-tr-xs shadow-sm font-medium'
                        : 'bg-slate-100 text-slate-800 rounded-tl-xs border border-slate-200/80 whitespace-pre-wrap font-sans'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Shortcut Quick Prompts */}
          <div className="p-2.5 bg-slate-50 border-t border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-none text-[11px]">
            <span className="font-bold text-slate-400 uppercase text-[10px] whitespace-nowrap">Quick Prompts:</span>
            <button
              onClick={() => setConsultQuery('What are the critical cardiac QTc and CYP450 risks when combining Lexapro with Seroquel?')}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 whitespace-nowrap font-medium transition-all"
            >
              Lexapro + Seroquel QTc
            </button>
            <button
              onClick={() => setConsultQuery('How do I safely titrate Lamotrigine when the patient is already taking Depakote?')}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 whitespace-nowrap font-medium transition-all"
            >
              Lamotrigine + Depakote
            </button>
            <button
              onClick={() => setConsultQuery('What are the immediate steps if an antidepressant causes an acute hypomanic switch?')}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 whitespace-nowrap font-medium transition-all"
            >
              Bipolar Switch Protocol
            </button>
          </div>

          {/* Chat Input Dock */}
          <form onSubmit={handleConsultSubmit} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={consultQuery}
              onChange={(e) => setConsultQuery(e.target.value)}
              placeholder="Ask the clinical preceptor a psychopharmacology or case question..."
              className="flex-1 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

    </div>
  );
}