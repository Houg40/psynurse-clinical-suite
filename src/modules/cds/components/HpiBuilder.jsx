import React, { useState, useMemo } from 'react';
import { 
  FileEdit, 
  Copy, 
  Check, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle,
  ChevronRight,
  ClipboardList,
  Stethoscope,
  BookOpen
} from 'lucide-react';

export default function HpiBuilder({ setActiveTab }) {
  const [copied, setCopied] = useState(false);

  const handleAuditWithAi = () => {
    try {
      sessionStorage.setItem('psynurse_audit_draft', synthesizedHpi);
    } catch {
      // ignore
    }
    if (typeof setActiveTab === 'function') {
      setActiveTab('advisor');
    }
  };

  // Demographics / Visit Context
  const [patientAge, setPatientAge] = useState('32');
  const [patientGender, setPatientGender] = useState('female');
  const [visitType, setVisitType] = useState('initial'); // 'initial' | 'followup'

  // Selected Checklist Items (Set of strings)
  const [selectedItems, setSelectedItems] = useState({
    // Chief Complaints
    'cc_depressed_mood': true,
    'cc_anxiety_panic': true,
    'cc_insomnia': true,
    'cc_brain_fog': false,
    'cc_adhd_focus': false,
    'cc_mood_swings': false,

    // Onset & Chronicity
    'onset_recent_months': true, // 3-6 months
    'onset_gradual': true,
    'onset_work_stress': true,
    'onset_life_transition': false,
    'onset_postpartum': false,

    // Depressive SIGECAPS
    'dep_anhedonia': true,
    'dep_low_energy': true,
    'dep_poor_concentration': true,
    'dep_early_morning_wake': true,
    'dep_initial_insomnia': false,
    'dep_appetite_decreased': true,
    'dep_appetite_increased': false,
    'dep_guilt_worthlessness': false,
    'dep_psychomotor_slowing': false,

    // Anxiety & Panic Features
    'anx_generalized_worry': true,
    'anx_physical_tension': true,
    'anx_panic_attacks': false,
    'anx_social_avoidance': false,
    'anx_obsessive_thoughts': false,

    // Safety & Suicide Screening (Critical)
    'safety_denies_all_si': false,
    'safety_passive_wishes_no_plan': true,
    'safety_protective_family': true,
    'safety_lethal_means_discussed': true,
    'safety_denies_hi': true,

    // Bipolar & Psychosis Rule-Out
    'ro_denies_mania': true,
    'ro_denies_decreased_sleep_need': true,
    'ro_denies_hallucinations': true,
    'ro_denies_paranoia': true,

    // Substance & Medical Rule-Out
    'sub_social_alcohol_only': true,
    'sub_denies_illicit': true,
    'sub_excessive_caffeine': false,

    // Prior Medication History
    'med_naive': false,
    'med_tried_ssri_intolerant': true, // e.g. sertraline GI upset
    'med_tried_ssri_partial': false,
    'med_never_tried_mood_stabilizer': true
  });

  // Clinical Screener Scores & Number Ranges
  const [screenerPhq9, setScreenerPhq9] = useState('14'); // 0-27
  const [screenerGad7, setScreenerGad7] = useState('11'); // 0-21
  const [screenerAsrs, setScreenerAsrs] = useState('none'); // 'none' | 'positive' | 'negative'
  const [screenerMdq, setScreenerMdq] = useState('none'); // 'none' | 'positive' | 'negative'
  const [screenerAims, setScreenerAims] = useState('none'); // 'none' | 'negative' | 'positive'
  const [includeScreenersInNote, setIncludeScreenersInNote] = useState(true);

  // Custom Notes / Additions per Category
  const [customChiefComplaint, setCustomChiefComplaint] = useState('');
  const [customPrecipitant, setCustomPrecipitant] = useState('recent increase in workload and managerial restructuring');
  const [customSymptoms, setCustomSymptoms] = useState('');
  const [customSafety, setCustomSafety] = useState('');
  const [customPriorMeds, setCustomPriorMeds] = useState('Sertraline 50mg briefly tried 2 years ago, discontinued due to persistent GI distress');

  const toggleItem = (key) => {
    setSelectedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Quick Preset Templates
  const applyPreset = (presetName) => {
    if (presetName === 'mdd_anxiety') {
      setSelectedItems({
        'cc_depressed_mood': true,
        'cc_anxiety_panic': true,
        'cc_insomnia': true,
        'cc_brain_fog': true,
        'onset_recent_months': true,
        'onset_gradual': true,
        'onset_work_stress': true,
        'dep_anhedonia': true,
        'dep_low_energy': true,
        'dep_poor_concentration': true,
        'dep_early_morning_wake': true,
        'dep_appetite_decreased': true,
        'anx_generalized_worry': true,
        'anx_physical_tension': true,
        'safety_passive_wishes_no_plan': true,
        'safety_protective_family': true,
        'safety_lethal_means_discussed': true,
        'safety_denies_hi': true,
        'ro_denies_mania': true,
        'ro_denies_decreased_sleep_need': true,
        'ro_denies_hallucinations': true,
        'sub_social_alcohol_only': true,
        'sub_denies_illicit': true,
        'med_tried_ssri_intolerant': true
      });
      setCustomPrecipitant('occupational burnout and persistent corporate deadlines');
      setCustomPriorMeds('Sertraline 50mg tried 2 years ago, discontinued secondary to GI upset');
      setScreenerPhq9('14');
      setScreenerGad7('11');
      setScreenerAsrs('none');
      setScreenerMdq('none');
      setScreenerAims('none');
    } else if (presetName === 'panic_gad') {
      setSelectedItems({
        'cc_anxiety_panic': true,
        'cc_insomnia': true,
        'onset_gradual': true,
        'onset_life_transition': true,
        'anx_generalized_worry': true,
        'anx_physical_tension': true,
        'anx_panic_attacks': true,
        'anx_social_avoidance': true,
        'dep_initial_insomnia': true,
        'dep_low_energy': true,
        'safety_denies_all_si': true,
        'safety_denies_hi': true,
        'ro_denies_mania': true,
        'ro_denies_hallucinations': true,
        'sub_social_alcohol_only': true,
        'sub_denies_illicit': true,
        'sub_excessive_caffeine': true,
        'med_naive': true
      });
      setCustomPrecipitant('increased social demands and promotion into high-visibility client role');
      setCustomPriorMeds('Medication naive; has used occasional chamomile tea with minimal relief');
      setScreenerPhq9('6');
      setScreenerGad7('16');
      setScreenerAsrs('none');
      setScreenerMdq('none');
      setScreenerAims('none');
    } else if (presetName === 'bipolar_screen') {
      setSelectedItems({
        'cc_depressed_mood': true,
        'cc_mood_swings': true,
        'cc_insomnia': true,
        'onset_gradual': true,
        'dep_anhedonia': true,
        'dep_low_energy': true,
        'dep_psychomotor_slowing': true,
        'safety_passive_wishes_no_plan': true,
        'safety_protective_family': true,
        'safety_lethal_means_discussed': true,
        'safety_denies_hi': true,
        'sub_social_alcohol_only': true,
        'sub_denies_illicit': true,
        'med_tried_ssri_intolerant': false
      });
      setCustomPrecipitant('recurrent depressive phase following a period of high energy and reduced sleep');
      setCustomPriorMeds('Previous trial of Citalopram induced dysphoric agitation/activation');
      setScreenerPhq9('16');
      setScreenerGad7('9');
      setScreenerAsrs('none');
      setScreenerMdq('positive');
      setScreenerAims('none');
    }
  };

  const handleReset = () => {
    setSelectedItems({});
    setCustomPrecipitant('');
    setCustomPriorMeds('');
    setScreenerPhq9('');
    setScreenerGad7('');
    setScreenerAsrs('none');
    setScreenerMdq('none');
    setScreenerAims('none');
  };

  // Synthesize Narrative HPI Paragraph
  const synthesizedHpi = useMemo(() => {
    const pronounSubject = patientGender === 'female' ? 'She' : patientGender === 'male' ? 'He' : 'They';
    const pronounPossessive = patientGender === 'female' ? 'her' : patientGender === 'male' ? 'his' : 'their';
    const pronounObject = patientGender === 'female' ? 'her' : patientGender === 'male' ? 'him' : 'them';

    // 1. Opening sentence
    const chiefComplaints = [];
    if (selectedItems['cc_depressed_mood']) chiefComplaints.push('depressed mood');
    if (selectedItems['cc_anxiety_panic']) chiefComplaints.push('escalating anxiety and panic');
    if (selectedItems['cc_insomnia']) chiefComplaints.push('sleep architecture disruption');
    if (selectedItems['cc_brain_fog']) chiefComplaints.push('cognitive slowing/brain fog');
    if (selectedItems['cc_adhd_focus']) chiefComplaints.push('executive dysfunction and inattention');
    if (selectedItems['cc_mood_swings']) chiefComplaints.push('affective lability and mood variability');

    let ccText = chiefComplaints.length > 0 ? chiefComplaints.join(', ') : 'psychiatric symptom evaluation';
    if (customChiefComplaint.trim()) {
      if (chiefComplaints.length > 0) {
        ccText += `, as well as ${customChiefComplaint.trim()}`;
      } else {
        ccText = customChiefComplaint.trim();
      }
    }
    const visitText = visitType === 'initial' ? 'initial comprehensive psychiatric telehealth evaluation' : 'routine follow-up psychiatric evaluation';

    let para1 = `Patient is a ${patientAge}-year-old ${patientGender} presenting for ${visitText} with chief complaints of ${ccText}. `;

    // 2. Onset & Precipitants
    const onsetParts = [];
    if (selectedItems['onset_recent_months']) onsetParts.push('developing over the past 3 to 6 months');
    if (selectedItems['onset_gradual']) onsetParts.push('with insidious onset and gradual functional decline');
    if (selectedItems['onset_work_stress']) onsetParts.push(`precipitated in part by ${customPrecipitant || 'occupational and environmental stressors'}`);
    if (selectedItems['onset_life_transition']) onsetParts.push('coinciding with recent significant life transitions');
    if (selectedItems['onset_postpartum']) onsetParts.push('with symptoms onset in the postpartum period');

    if (onsetParts.length > 0) {
      para1 += `Symptoms are described as ${onsetParts.join(', ')}. `;
    }

    // 3. Clinical Symptom Complex (Depression & Anxiety)
    const symptoms = [];
    if (selectedItems['dep_anhedonia']) symptoms.push('pervasive anhedonia and loss of interest in previously enjoyed activities');
    if (selectedItems['dep_low_energy']) symptoms.push('daily fatigue and diminished vitality');
    if (selectedItems['dep_poor_concentration']) symptoms.push('concentration deficits and difficulty completing complex executive tasks');
    if (selectedItems['dep_early_morning_wake']) symptoms.push('terminal insomnia with early morning awakenings (3:00-4:00 AM) and rumination');
    if (selectedItems['dep_initial_insomnia']) symptoms.push('initial insomnia with sleep latency exceeding 90-120 minutes');
    if (selectedItems['dep_appetite_decreased']) symptoms.push('hyporexia with unintentional weight loss');
    if (selectedItems['dep_appetite_increased']) symptoms.push('hyperphagia with carbohydrate craving');
    if (selectedItems['dep_guilt_worthlessness']) symptoms.push('excessive feelings of guilt and perceived inadequacy');
    if (selectedItems['dep_psychomotor_slowing']) symptoms.push('subjective psychomotor retardation and heaviness');
    if (selectedItems['anx_generalized_worry']) symptoms.push('pervasive free-floating worry and difficulty controlling anxious thoughts');
    if (selectedItems['anx_physical_tension']) symptoms.push('somatic tension including muscle tightness, jaw clenching, and restlessness');
    if (selectedItems['anx_panic_attacks']) symptoms.push('episodic panic symptoms including palpitations, dyspnea, and sudden impending dread');
    if (selectedItems['anx_social_avoidance']) symptoms.push('social withdrawal and avoidance of interpersonal interactions');

    if (symptoms.length > 0) {
      para1 += `Current symptom presentation is notable for ${symptoms.join(', ')}. `;
    }
    if (customSymptoms.trim()) {
      para1 += `Additional clinical symptom details: ${customSymptoms.trim()}. `;
    }

    // 4. Safety & Suicide Risk Assessment
    let safetyPara = '';
    if (selectedItems['safety_denies_all_si']) {
      safetyPara = `${pronounSubject} unequivocally denies active or passive suicidal ideation, intent, or plan. Denies history of self-harm. `;
    } else if (selectedItems['safety_passive_wishes_no_plan']) {
      safetyPara = `${pronounSubject} endorses intermittent passive death wishes (e.g., wishing to not wake up), but firmly denies active suicidal intent, plan, preparatory behavior, or timeline. `;
      if (selectedItems['safety_protective_family']) {
        safetyPara += `Strong protective factors are intact, specifically citing commitment to family, loved ones, and personal values. `;
      }
    }

    if (selectedItems['safety_lethal_means_discussed']) {
      safetyPara += `Lethal means counseling conducted; ${pronounPossessive.toLowerCase()} home environment was screened, and patient confirms no access to unsecured firearms or lethal means. Emergency crisis numbers (988 lifeline and local crisis response) reviewed and provided. `;
    }
    if (selectedItems['safety_denies_hi']) {
      safetyPara += `Denies homicidal ideation, intent, or plan. `;
    }
    if (customSafety.trim()) {
      safetyPara += `Safety & collateral notes: ${customSafety.trim()}. `;
    }

    // 5. Differential & Rule-Outs
    const ruleOuts = [];
    if (selectedItems['ro_denies_mania']) ruleOuts.push('past manic, hypomanic, or euphoric episodes');
    if (selectedItems['ro_denies_decreased_sleep_need']) ruleOuts.push('periods of decreased need for sleep with energized daytime function');
    if (selectedItems['ro_denies_hallucinations']) ruleOuts.push('auditory or visual hallucinations');
    if (selectedItems['ro_denies_paranoia']) ruleOuts.push('paranoia or delusional thought content');

    let ruleOutText = '';
    if (ruleOuts.length > 0) {
      ruleOutText = `${pronounSubject} denies ${ruleOuts.join(', ')}. `;
    }

    // 6. Substance & Medication Trials
    let medText = '';
    if (selectedItems['sub_social_alcohol_only']) {
      medText += `Substance use history notable for occasional social alcohol consumption only; denies illicit substance use or prescription misuse. `;
    }
    if (selectedItems['sub_excessive_caffeine']) {
      medText += `Reports heavy daily caffeine intake, which was counseled as an anxiogenic contributing factor. `;
    }

    if (selectedItems['med_naive']) {
      medText += `Patient is psychotropic medication-naive with no prior formal psychiatric pharmacotherapy. `;
    } else if (selectedItems['med_tried_ssri_intolerant'] || customPriorMeds) {
      medText += `Past psychopharmacologic history: ${customPriorMeds || 'Reports previous trial of SSRI discontinued due to side effects'}. `;
    }

    // 7. Standardized Clinical Screeners & Score Interpretations
    let screenerText = '';
    if (includeScreenersInNote) {
      const screenerParts = [];

      // PHQ-9 interpretation
      if (screenerPhq9 !== '') {
        const pScore = parseInt(screenerPhq9, 10);
        let pSeverity = 'None-Minimal Depression (range: 0-4)';
        if (pScore >= 20) pSeverity = 'Severe Depression (range: 20-27; pharmacotherapy + urgent referral)';
        else if (pScore >= 15) pSeverity = 'Moderately Severe Depression (range: 15-19; pharmacotherapy + therapy)';
        else if (pScore >= 10) pSeverity = 'Moderate Depression (range: 10-14; clinically significant, first-line antidepressant)';
        else if (pScore >= 5) pSeverity = 'Mild Depression (range: 5-9; psychoeducation, watchful waiting)';
        screenerParts.push(`PHQ-9 score: ${pScore}/27 indicating ${pSeverity}`);
      }

      // GAD-7 interpretation
      if (screenerGad7 !== '') {
        const gScore = parseInt(screenerGad7, 10);
        let gSeverity = 'Minimal Anxiety (range: 0-4)';
        if (gScore >= 15) gSeverity = 'Severe Anxiety (range: 15-21; active pharmacotherapy)';
        else if (gScore >= 10) gSeverity = 'Moderate Anxiety (range: 10-14; clinically significant, first-line SSRI/SNRI/CBT)';
        else if (gScore >= 5) gSeverity = 'Mild Anxiety (range: 5-9; supportive care, sleep hygiene)';
        screenerParts.push(`GAD-7 score: ${gScore}/21 indicating ${gSeverity}`);
      }

      // ASRS Part A
      if (screenerAsrs === 'positive') {
        screenerParts.push(`ASRS-v1.1 Part A positive (>=4 threshold criteria met: high likelihood of adult ADHD)`);
      } else if (screenerAsrs === 'negative') {
        screenerParts.push(`ASRS-v1.1 Part A sub-threshold (0-3 criteria: below standard adult ADHD cutoff)`);
      }

      // MDQ
      if (screenerMdq === 'positive') {
        screenerParts.push(`MDQ positive screen (>=7 co-occurring manic symptoms with functional impairment: bipolar spectrum risk noted; antidepressant monotherapy contraindicated)`);
      } else if (screenerMdq === 'negative') {
        screenerParts.push(`MDQ negative screen (<7 symptoms: negative for bipolar spectrum)`);
      }

      // AIMS
      if (screenerAims === 'positive') {
        screenerParts.push(`AIMS exam positive (mild involuntary movements in >=2 domains or moderate in >=1 domain: presumptive Tardive Dyskinesia)`);
      } else if (screenerAims === 'negative') {
        screenerParts.push(`AIMS score 0/28 (negative for abnormal involuntary movements or tardive dyskinesia)`);
      }

      if (screenerParts.length > 0) {
        screenerText = `Standardized rating scale assessments administered at this encounter: ${screenerParts.join('; ')}. `;
      }
    }

    return `${para1}\n\n${safetyPara}${ruleOutText}\n\n${medText}${screenerText}Patient was an active participant in diagnostic formulation and verbalizes agreement with the collaborative treatment plan.`;
  }, [patientAge, patientGender, visitType, selectedItems, customPrecipitant, customPriorMeds, screenerPhq9, screenerGad7, screenerAsrs, screenerMdq, screenerAims, includeScreenersInNote]);

  const handleCopyNote = () => {
    navigator.clipboard.writeText(synthesizedHpi);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Hero Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-48 h-48 bg-teal-50 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-200">
                <FileEdit className="w-3.5 h-3.5 text-teal-600" />
                Dynamic Clinical Documentation Tool
              </span>
              <span className="text-xs text-slate-400">• Tebra &amp; Epic Ready</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Rapid Psychiatric HPI Outline Builder
            </h1>
            <p className="text-sm text-slate-600 mt-1.5 max-w-3xl leading-relaxed">
              Check observed clinical findings to instantly synthesize a polished, board-level medical narrative with audit-proof suicide and bipolar rule-out documentation.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold transition-all w-fit"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            Reset All
          </button>
        </div>

        {/* 1-Click Clinical Presets */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            1-Click Case Outlines:
          </span>
          <button
            onClick={() => applyPreset('mdd_anxiety')}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 border border-slate-200/80 transition-all"
          >
            Major Depression with Anxious Distress
          </button>
          <button
            onClick={() => applyPreset('panic_gad')}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 border border-slate-200/80 transition-all"
          >
            Generalized Anxiety &amp; Panic Attacks
          </button>
          <button
            onClick={() => applyPreset('bipolar_screen')}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 border border-slate-200/80 transition-all"
          >
            Bipolar II Rule-Out Complex
          </button>
        </div>
      </div>

      {/* Main Grid: Checklist Outline (Left 7) vs Live Synthesized HPI (Right 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Checkbox Outline */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Section 1: Demographics & Setting */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              1. Patient Demographics &amp; Encounter Type
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Age</label>
                <input
                  type="text"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  className="w-full text-xs font-bold py-2 px-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none shadow-2xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                <select
                  value={patientGender}
                  onChange={(e) => setPatientGender(e.target.value)}
                  className="w-full text-xs font-bold py-2 px-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none shadow-2xs"
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="individual">Non-binary / Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Encounter Type</label>
                <select
                  value={visitType}
                  onChange={(e) => setVisitType(e.target.value)}
                  className="w-full text-xs font-bold py-2 px-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none shadow-2xs"
                >
                  <option value="initial">Initial Evaluation</option>
                  <option value="followup">Follow-Up Visit</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Chief Complaint & Presentation */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              2. Chief Complaints Endorsed
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'cc_depressed_mood', label: 'Depressed Mood' },
                { id: 'cc_anxiety_panic', label: 'Anxiety & Panic' },
                { id: 'cc_insomnia', label: 'Sleep Disturbance' },
                { id: 'cc_brain_fog', label: 'Brain Fog / Slowing' },
                { id: 'cc_adhd_focus', label: 'ADHD / Inattention' },
                { id: 'cc_mood_swings', label: 'Affective Lability' }
              ].map((item) => (
                <label
                  key={item.id}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                    selectedItems[item.id]
                      ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-2xs font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={!!selectedItems[item.id]}
                    onChange={() => toggleItem(item.id)}
                    className="rounded text-teal-600 focus:ring-teal-500 h-3.5 w-3.5"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>

            {/* Custom Chief Complaint Input */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Custom Chief Complaint / In Patient's Own Words:
              </label>
              <input
                type="text"
                value={customChiefComplaint}
                onChange={(e) => setCustomChiefComplaint(e.target.value)}
                placeholder='e.g., "panic attacks when driving over bridges", "severe burnout and grief after loss of spouse"...'
                className="w-full text-xs font-medium py-2.5 px-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none shadow-2xs"
              />
            </div>
          </div>

          {/* Section 3: Target Symptoms (SIGECAPS & Anxiety) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              3. DSM-5 Neurovegetative &amp; Anxiety Criteria (SIGECAPS)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { id: 'dep_anhedonia', label: 'Pervasive Anhedonia / Loss of Interest' },
                { id: 'dep_low_energy', label: 'Daily Lethargy / Fatigue' },
                { id: 'dep_poor_concentration', label: 'Poor Focus / Executive Deficits' },
                { id: 'dep_early_morning_wake', label: 'Terminal Insomnia (Awake 3-4 AM)' },
                { id: 'dep_initial_insomnia', label: 'Initial Insomnia (>90 min latency)' },
                { id: 'dep_appetite_decreased', label: 'Decreased Appetite / Weight Loss' },
                { id: 'dep_guilt_worthlessness', label: 'Excessive Guilt / Worthlessness' },
                { id: 'anx_generalized_worry', label: 'Free-Floating Uncontrollable Worry' },
                { id: 'anx_physical_tension', label: 'Somatic Muscle Tension & Jitteriness' },
                { id: 'anx_panic_attacks', label: 'Spontaneous Panic Episodes' },
                { id: 'anx_social_avoidance', label: 'Social Isolation / Withdrawal' }
              ].map((item) => (
                <label
                  key={item.id}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                    selectedItems[item.id]
                      ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-2xs font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={!!selectedItems[item.id]}
                    onChange={() => toggleItem(item.id)}
                    className="rounded text-teal-600 focus:ring-teal-500 h-3.5 w-3.5"
                  />
                  <span className="truncate">{item.label}</span>
                </label>
              ))}
            </div>

            {/* Custom Precipitants input */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Identified Precipitant / Stressor:
              </label>
              <input
                type="text"
                value={customPrecipitant}
                onChange={(e) => setCustomPrecipitant(e.target.value)}
                placeholder="e.g., job restructuring, marital strain, recent loss..."
                className="w-full text-xs font-medium py-2.5 px-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none shadow-2xs"
              />
            </div>

            {/* Custom Symptom Details input */}
            <div className="pt-1">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Additional Symptom Nuances / Details:
              </label>
              <input
                type="text"
                value={customSymptoms}
                onChange={(e) => setCustomSymptoms(e.target.value)}
                placeholder="e.g., jaw clenching leading to morning tension headaches, crying spells 3x/week..."
                className="w-full text-xs font-medium py-2.5 px-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none shadow-2xs"
              />
            </div>
          </div>

          {/* Section 4: Suicide Screening & Safety (Medicolegal Protection) */}
          <div className="bg-rose-50/50 rounded-2xl p-5 border border-rose-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <h3 className="text-xs font-bold text-rose-950 uppercase tracking-wider">
                4. Suicide Risk &amp; Safety Documentation (Mandatory)
              </h3>
            </div>
            
            <div className="space-y-2">
              {[
                { id: 'safety_denies_all_si', label: 'Unequivocally denies suicidal ideation, intent, or plan' },
                { id: 'safety_passive_wishes_no_plan', label: 'Intermittent passive death wishes, but denies active intent, plan, or timeline' },
                { id: 'safety_protective_family', label: 'Strong protective factors intact (family, children, religious beliefs)' },
                { id: 'safety_lethal_means_discussed', label: 'Lethal means counseling conducted; no access to firearms; 988 lifeline reviewed' },
                { id: 'safety_denies_hi', label: 'Denies homicidal ideation, intent, or plan' }
              ].map((item) => (
                <label
                  key={item.id}
                  className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedItems[item.id]
                      ? 'bg-white border-rose-400 text-rose-950 shadow-2xs font-semibold'
                      : 'bg-rose-50/40 border-rose-200 text-rose-800 hover:bg-white'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={!!selectedItems[item.id]}
                    onChange={() => toggleItem(item.id)}
                    className="rounded text-rose-600 focus:ring-rose-500 h-3.5 w-3.5 mt-0.5"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>

            {/* Custom Safety / Protective Factors Input */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-rose-950 mb-1">
                Additional Safety / Collateral / Protective Factors:
              </label>
              <input
                type="text"
                value={customSafety}
                onChange={(e) => setCustomSafety(e.target.value)}
                placeholder="e.g., lives with supportive spouse; gun safe code held exclusively by partner..."
                className="w-full text-xs font-medium py-2.5 px-3 rounded-lg border border-rose-200 bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 focus:outline-none shadow-2xs"
              />
            </div>
          </div>

          {/* Section 5: Differential Rule-Outs & Prior Meds */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              5. Differential Rule-Outs &amp; Medication History
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { id: 'ro_denies_mania', label: 'Denies past manic/hypomanic episodes' },
                { id: 'ro_denies_decreased_sleep_need', label: 'Denies decreased sleep need with high energy' },
                { id: 'ro_denies_hallucinations', label: 'Denies auditory/visual hallucinations' },
                { id: 'sub_social_alcohol_only', label: 'Social alcohol only; denies illicit use' },
                { id: 'med_naive', label: 'Psychotropic medication-naive' },
                { id: 'med_tried_ssri_intolerant', label: 'Prior SSRI trial discontinued due to side effects' }
              ].map((item) => (
                <label
                  key={item.id}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedItems[item.id]
                      ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-2xs font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={!!selectedItems[item.id]}
                    onChange={() => toggleItem(item.id)}
                    className="rounded text-teal-600 focus:ring-teal-500 h-3.5 w-3.5"
                  />
                  <span className="truncate">{item.label}</span>
                </label>
              ))}
            </div>

            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Specific Prior Medication Details:
              </label>
              <input
                type="text"
                value={customPriorMeds}
                onChange={(e) => setCustomPriorMeds(e.target.value)}
                placeholder="e.g., Sertraline 50mg x 3 weeks stopped for nausea..."
                className="w-full text-xs font-medium py-2.5 px-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none shadow-2xs"
              />
            </div>
          </div>

          {/* Section 6: Standardized Clinical Screeners & Score Ranges */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-teal-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  6. Standardized Screeners &amp; Score Number Ranges
                </h3>
              </div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-teal-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeScreenersInNote}
                  onChange={(e) => setIncludeScreenersInNote(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500 h-3.5 w-3.5"
                />
                <span>Include in HPI Narrative</span>
              </label>
            </div>

            <p className="text-[11px] text-slate-500">
              Record validated rating scores. The clinical number ranges and diagnostic interpretations automatically update and feed into the synthesized note:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* PHQ-9 Entry */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">PHQ-9 Depression Score</label>
                  <span className="text-[10px] font-bold text-slate-400">Range: 0 – 27</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="27"
                    value={screenerPhq9}
                    onChange={(e) => setScreenerPhq9(e.target.value)}
                    placeholder="0-27"
                    className="w-20 text-xs font-bold py-1.5 px-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none"
                  />
                  <div className="text-[11px] font-medium leading-tight">
                    {screenerPhq9 === '' ? (
                      <span className="text-slate-400">Not administered</span>
                    ) : parseInt(screenerPhq9, 10) >= 20 ? (
                      <span className="text-rose-700 font-bold">Severe (20-27)</span>
                    ) : parseInt(screenerPhq9, 10) >= 15 ? (
                      <span className="text-orange-700 font-bold">Mod. Severe (15-19)</span>
                    ) : parseInt(screenerPhq9, 10) >= 10 ? (
                      <span className="text-amber-700 font-bold">Moderate (10-14)</span>
                    ) : parseInt(screenerPhq9, 10) >= 5 ? (
                      <span className="text-teal-700 font-bold">Mild (5-9)</span>
                    ) : (
                      <span className="text-emerald-700 font-bold">None-Minimal (0-4)</span>
                    )}
                  </div>
                </div>
                <p className="text-[10px] text-slate-400">
                  0-4: Minimal • 5-9: Mild • 10-14: Moderate • 15-19: Mod. Severe • 20-27: Severe
                </p>
              </div>

              {/* GAD-7 Entry */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">GAD-7 Anxiety Score</label>
                  <span className="text-[10px] font-bold text-slate-400">Range: 0 – 21</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="21"
                    value={screenerGad7}
                    onChange={(e) => setScreenerGad7(e.target.value)}
                    placeholder="0-21"
                    className="w-20 text-xs font-bold py-1.5 px-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none"
                  />
                  <div className="text-[11px] font-medium leading-tight">
                    {screenerGad7 === '' ? (
                      <span className="text-slate-400">Not administered</span>
                    ) : parseInt(screenerGad7, 10) >= 15 ? (
                      <span className="text-rose-700 font-bold">Severe (15-21)</span>
                    ) : parseInt(screenerGad7, 10) >= 10 ? (
                      <span className="text-amber-700 font-bold">Moderate (10-14)</span>
                    ) : parseInt(screenerGad7, 10) >= 5 ? (
                      <span className="text-teal-700 font-bold">Mild (5-9)</span>
                    ) : (
                      <span className="text-emerald-700 font-bold">Minimal (0-4)</span>
                    )}
                  </div>
                </div>
                <p className="text-[10px] text-slate-400">
                  0-4: Minimal • 5-9: Mild • 10-14: Moderate • 15-21: Severe
                </p>
              </div>
            </div>

            {/* Qualitative Diagnostic Screeners (ASRS, MDQ, AIMS) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {/* ASRS Part A */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">ASRS-v1.1 (ADHD)</label>
                <select
                  value={screenerAsrs}
                  onChange={(e) => setScreenerAsrs(e.target.value)}
                  className="w-full text-xs font-bold py-1.5 px-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  <option value="none">Not Assessed</option>
                  <option value="positive">Positive (≥4 threshold items)</option>
                  <option value="negative">Negative (0-3 threshold items)</option>
                </select>
                <p className="text-[10px] text-slate-400">
                  Cutoff: ≥4 positive shaded items indicates high likelihood adult ADHD
                </p>
              </div>

              {/* MDQ Bipolar */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">MDQ (Bipolar)</label>
                <select
                  value={screenerMdq}
                  onChange={(e) => setScreenerMdq(e.target.value)}
                  className="w-full text-xs font-bold py-1.5 px-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  <option value="none">Not Assessed</option>
                  <option value="positive">Positive (≥7 symptoms + co-occur)</option>
                  <option value="negative">Negative (&lt;7 symptoms)</option>
                </select>
                <p className="text-[10px] text-slate-400">
                  Cutoff: ≥7 symptoms co-occurring warns against SSRI monotherapy
                </p>
              </div>

              {/* AIMS TD */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">AIMS (Tardive Dysk.)</label>
                <select
                  value={screenerAims}
                  onChange={(e) => setScreenerAims(e.target.value)}
                  className="w-full text-xs font-bold py-1.5 px-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  <option value="none">Not Assessed</option>
                  <option value="negative">Negative (Score 0 / No TD)</option>
                  <option value="positive">Positive (TD movements detected)</option>
                </select>
                <p className="text-[10px] text-slate-400">
                  Cutoff: ≥2 in 1+ area or ≥1 in 2+ areas indicates presumptive TD
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Live Synthesized HPI Output (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl sticky top-28 border border-slate-800">
            
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">
                  Automated Clinical Synthesis
                </span>
                <h3 className="text-base font-bold text-white">
                  Synthesized Psychiatric HPI
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAuditWithAi}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black transition-all shadow-sm"
                  title="Send to AI Clinical Advisor for evaluation audit and missed criteria detection"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Audit with AI</span>
                </button>

                <button
                  onClick={handleCopyNote}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-extrabold transition-all shadow-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5 text-slate-950" />}
                  {copied ? 'Copied to EHR!' : 'Copy HPI'}
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
              Formatted as a continuous narrative ready for direct insertion into Tebra, Epic, or Kareo intake charts:
            </p>

            {/* Generated Narrative Container */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 font-sans whitespace-pre-wrap leading-relaxed max-h-[550px] overflow-y-auto selection:bg-teal-600 selection:text-white">
              {synthesizedHpi}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-teal-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> Zero-PHI (In Browser Memory)
              </span>
              <span>Word Count: ~{synthesizedHpi.split(/\s+/).filter(Boolean).length} words</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
