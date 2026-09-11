import React, { useState } from 'react';
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
  Award
} from 'lucide-react';

export default function AiAdvisor() {
  const [activeTool, setActiveTool] = useState('prior-auth'); // 'prior-auth' | 'differential' | 'psychoeducation' | 'consult'
  const [copied, setCopied] = useState(false);

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
                <h2 className="text-xl font-black text-white">AI Clinical Advisor &amp; Assistant</h2>
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