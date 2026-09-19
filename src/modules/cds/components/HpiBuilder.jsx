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
  BookOpen,
  Search,
  CheckCircle2,
  AlertOctagon,
  FileText,
  FlaskConical
} from 'lucide-react';
import { 
  DSM5_DOMAINS, 
  DSM5_CRITERIA_LIST, 
  calculateDiagnosticStatus 
} from '../data/hpiDsm5Criteria.js';


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

  // DSM-5 Section 3 Active Domain Tab & Filter
  const [activeDomainTab, setActiveDomainTab] = useState('all');
  const [dsmSearchQuery, setDsmSearchQuery] = useState('');

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

    // Depressive SIGECAPS (Mapped to DSM-5 MDD Criteria)
    'dep_core_mood': true,
    'dep_anhedonia': true,
    'dep_low_energy': true,
    'dep_poor_concentration': true,
    'dep_early_morning_wake': true,
    'dep_initial_insomnia': false,
    'dep_appetite_decreased': true,
    'dep_appetite_increased': false,
    'dep_guilt_worthlessness': false,
    'dep_psychomotor_slowing': false,
    'dep_suicidal_thoughts': false,

    // Generalized Anxiety Criteria (GAD-7)
    'anx_generalized_worry': true,
    'anx_difficulty_controlling': true,
    'anx_physical_tension': true,
    'anx_restlessness': true,
    'anx_sleep_disturbance': true,
    'anx_panic_attacks': false,
    'anx_social_avoidance': false,

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
  const [includeLabsInNote, setIncludeLabsInNote] = useState(true);
  const [selectedLabTierPreset, setSelectedLabTierPreset] = useState('tier1'); // 'tier1' | 'tier1_2' | 'all'

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

  // Diagnostic Status & Threshold calculations
  const diagnosticStatus = useMemo(() => {
    return calculateDiagnosticStatus(selectedItems);
  }, [selectedItems]);

  // Filtered DSM-5 Criteria based on active domain tab and search input
  const filteredCriteria = useMemo(() => {
    return DSM5_CRITERIA_LIST.filter(c => {
      const matchDomain = activeDomainTab === 'all' || c.domain === activeDomainTab;
      const matchQuery = !dsmSearchQuery.trim() || 
        c.label.toLowerCase().includes(dsmSearchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(dsmSearchQuery.toLowerCase());
      return matchDomain && matchQuery;
    });
  }, [activeDomainTab, dsmSearchQuery]);

  const getDomainCheckedCount = (domainId) => {
    if (domainId === 'all') {
      return DSM5_CRITERIA_LIST.filter(c => !!selectedItems[c.id]).length;
    }
    return DSM5_CRITERIA_LIST.filter(c => c.domain === domainId && !!selectedItems[c.id]).length;
  };

  // Quick Select Helpers
  const handleCheckCoreMdd = () => {
    setSelectedItems(prev => ({
      ...prev,
      dep_core_mood: true,
      dep_anhedonia: true,
      dep_low_energy: true,
      dep_poor_concentration: true,
      dep_early_morning_wake: true,
      dep_appetite_decreased: true
    }));
    setActiveDomainTab('mdd');
  };

  const handleCheckClassicGad = () => {
    setSelectedItems(prev => ({
      ...prev,
      anx_generalized_worry: true,
      anx_difficulty_controlling: true,
      anx_physical_tension: true,
      anx_restlessness: true,
      anx_sleep_disturbance: true
    }));
    setActiveDomainTab('gad');
  };

  const handleCheckInattentiveAdhd = () => {
    setSelectedItems(prev => ({
      ...prev,
      cc_adhd_focus: true,
      adhd_careless_mistakes: true,
      adhd_sustaining_attention: true,
      adhd_poor_followthrough: true,
      adhd_disorganization: true,
      adhd_avoids_mental_effort: true,
      adhd_easily_distracted: true,
      adhd_forgetful_daily: true
    }));
    setActiveDomainTab('adhd_inatt');
  };

  const handleCheckPanicAttack = () => {
    setSelectedItems(prev => ({
      ...prev,
      panic_recurrent_attacks: true,
      panic_palpitations: true,
      panic_shortness_breath: true,
      panic_chest_pain: true,
      panic_dizziness: true,
      panic_trembling: true,
      panic_fear_dying: true,
      panic_anticipatory_worry: true
    }));
    setActiveDomainTab('panic');
  };

  const handleClearCurrentDomain = () => {
    setSelectedItems(prev => {
      const next = { ...prev };
      if (activeDomainTab === 'all') {
        DSM5_CRITERIA_LIST.forEach(c => { delete next[c.id]; });
      } else {
        DSM5_CRITERIA_LIST.filter(c => c.domain === activeDomainTab).forEach(c => {
          delete next[c.id];
        });
      }
      return next;
    });
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
        'dep_core_mood': true,
        'dep_anhedonia': true,
        'dep_low_energy': true,
        'dep_poor_concentration': true,
        'dep_early_morning_wake': true,
        'dep_appetite_decreased': true,
        'dep_guilt_worthlessness': true,
        'anx_generalized_worry': true,
        'anx_difficulty_controlling': true,
        'anx_physical_tension': true,
        'anx_restlessness': true,
        'anx_sleep_disturbance': true,
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
      setActiveDomainTab('mdd');
    } else if (presetName === 'panic_gad') {
      setSelectedItems({
        'cc_anxiety_panic': true,
        'cc_insomnia': true,
        'onset_gradual': true,
        'onset_life_transition': true,
        'anx_generalized_worry': true,
        'anx_difficulty_controlling': true,
        'anx_physical_tension': true,
        'anx_restlessness': true,
        'anx_sleep_disturbance': true,
        'panic_recurrent_attacks': true,
        'panic_palpitations': true,
        'panic_shortness_breath': true,
        'panic_chest_pain': true,
        'panic_dizziness': true,
        'panic_trembling': true,
        'panic_fear_dying': true,
        'panic_anticipatory_worry': true,
        'agora_avoidance': true,
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
      setActiveDomainTab('panic');
    } else if (presetName === 'adhd_inattentive') {
      setSelectedItems({
        'cc_adhd_focus': true,
        'cc_brain_fog': true,
        'cc_insomnia': true,
        'onset_gradual': true,
        'onset_work_stress': true,
        'adhd_careless_mistakes': true,
        'adhd_sustaining_attention': true,
        'adhd_mind_elsewhere': true,
        'adhd_poor_followthrough': true,
        'adhd_disorganization': true,
        'adhd_avoids_mental_effort': true,
        'adhd_easily_distracted': true,
        'adhd_forgetful_daily': true,
        'anx_generalized_worry': true,
        'sleep_initial_insomnia': true,
        'safety_denies_all_si': true,
        'safety_denies_hi': true,
        'ro_denies_mania': true,
        'ro_denies_decreased_sleep_need': true,
        'ro_denies_hallucinations': true,
        'sub_social_alcohol_only': true,
        'sub_denies_illicit': true,
        'med_naive': true
      });
      setCustomPrecipitant('escalating managerial complexity, multiple project deadlines, and remote work disorganization');
      setCustomPriorMeds('Psychotropic naive; relies on 3-4 cups of coffee daily for task initiation');
      setScreenerPhq9('7');
      setScreenerGad7('8');
      setScreenerAsrs('positive');
      setScreenerMdq('none');
      setScreenerAims('none');
      setActiveDomainTab('adhd_inatt');
    } else if (presetName === 'bipolar_screen') {
      setSelectedItems({
        'cc_depressed_mood': true,
        'cc_mood_swings': true,
        'cc_insomnia': true,
        'onset_gradual': true,
        'dep_core_mood': true,
        'dep_anhedonia': true,
        'dep_low_energy': true,
        'dep_psychomotor_slowing': true,
        'bip_elevated_mood': true,
        'bip_decreased_sleep': true,
        'bip_racing_thoughts': true,
        'bip_pressured_speech': true,
        'bip_distractibility': true,
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
      setActiveDomainTab('bipolar');
    } else if (presetName === 'ptsd_trauma') {
      setSelectedItems({
        'cc_anxiety_panic': true,
        'cc_insomnia': true,
        'cc_mood_swings': true,
        'onset_gradual': true,
        'ptsd_trauma_exposure': true,
        'ptsd_intrusive_memories': true,
        'ptsd_nightmares': true,
        'ptsd_cue_reactivity': true,
        'ptsd_avoidance': true,
        'ptsd_negative_cognitions': true,
        'ptsd_hypervigilance': true,
        'sleep_terminal_insomnia': true,
        'anx_physical_tension': true,
        'safety_denies_all_si': true,
        'safety_denies_hi': true,
        'ro_denies_mania': true,
        'ro_denies_hallucinations': true,
        'sub_social_alcohol_only': true,
        'sub_denies_illicit': true,
        'med_naive': true
      });
      setCustomPrecipitant('anniversary of motor vehicle collision and return to driving on interstate highways');
      setCustomPriorMeds('Tried Hydroxyzine 25mg PRN with minimal effect on trauma nightmares');
      setScreenerPhq9('11');
      setScreenerGad7('14');
      setScreenerAsrs('none');
      setScreenerMdq('none');
      setScreenerAims('none');
      setActiveDomainTab('ptsd');
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

    // 3. Depressive Neurovegetative & Affective Symptoms (MDD SIGECAPS)
    const depNarratives = [];
    DSM5_CRITERIA_LIST.filter(c => c.domain === 'mdd').forEach(c => {
      if (selectedItems[c.id]) depNarratives.push(c.narrative);
    });
    // Fallback/backward compat with old keys
    if (selectedItems['dep_anhedonia'] && !depNarratives.includes('pervasive anhedonia and loss of interest in previously enjoyed activities')) {
      depNarratives.push('pervasive anhedonia and loss of interest in previously enjoyed activities');
    }
    if (selectedItems['dep_low_energy'] && !depNarratives.includes('daily fatigue and diminished physical vitality')) {
      depNarratives.push('daily fatigue and diminished physical vitality');
    }
    if (selectedItems['dep_poor_concentration'] && !depNarratives.includes('concentration deficits, brain fog, and difficulty completing complex executive tasks')) {
      depNarratives.push('concentration deficits, brain fog, and difficulty completing complex executive tasks');
    }

    let depPara = '';
    if (depNarratives.length > 0) {
      const thresholdNote = diagnosticStatus.mdd.thresholdMet
        ? `(${diagnosticStatus.mdd.count}/9 DSM-5 criteria endorsed, meeting clinical threshold for Major Depressive Episode)`
        : `(${diagnosticStatus.mdd.count}/9 depressive symptoms endorsed)`;
      depPara = `Clinical evaluation of depressive symptoms is notable for ${depNarratives.join(', ')} ${thresholdNote}. `;
    }

    // 4. Generalized Anxiety & Somatic Features (GAD)
    const gadNarratives = [];
    DSM5_CRITERIA_LIST.filter(c => c.domain === 'gad').forEach(c => {
      if (selectedItems[c.id]) gadNarratives.push(c.narrative);
    });
    let gadPara = '';
    if (gadNarratives.length > 0) {
      const gadNote = diagnosticStatus.gad.thresholdMet
        ? `(${diagnosticStatus.gad.count}/6 somatic criteria endorsed with chronic uncontrollable worry, meeting diagnostic threshold for Generalized Anxiety Disorder)`
        : `(${diagnosticStatus.gad.count}/6 somatic anxiety symptoms endorsed)`;
      gadPara = `Anxiety evaluation is notable for ${gadNarratives.join(', ')} ${gadNote}. `;
    }

    // 5. Adult ADHD & Executive Functioning
    const adhdInattNarratives = [];
    DSM5_CRITERIA_LIST.filter(c => c.domain === 'adhd_inatt').forEach(c => {
      if (selectedItems[c.id]) adhdInattNarratives.push(c.narrative);
    });
    const adhdHyperNarratives = [];
    DSM5_CRITERIA_LIST.filter(c => c.domain === 'adhd_hyper').forEach(c => {
      if (selectedItems[c.id]) adhdHyperNarratives.push(c.narrative);
    });
    let adhdPara = '';
    if (adhdInattNarratives.length > 0 || adhdHyperNarratives.length > 0) {
      const parts = [];
      if (adhdInattNarratives.length > 0) {
        const inattNote = diagnosticStatus.adhdInatt.thresholdMet
          ? `(${diagnosticStatus.adhdInatt.count}/9 inattention symptoms endorsed, meeting DSM-5 adult diagnostic threshold of >= 5)`
          : `(${diagnosticStatus.adhdInatt.count}/9 inattention symptoms endorsed)`;
        parts.push(`marked inattention characterized by ${adhdInattNarratives.join(', ')} ${inattNote}`);
      }
      if (adhdHyperNarratives.length > 0) {
        const hyperNote = diagnosticStatus.adhdHyper.thresholdMet
          ? `(${diagnosticStatus.adhdHyper.count}/9 hyperactivity/impulsivity criteria met)`
          : `(${diagnosticStatus.adhdHyper.count}/9 hyperactivity symptoms)`;
        parts.push(`hyperactivity and impulsivity features including ${adhdHyperNarratives.join(', ')} ${hyperNote}`);
      }
      adhdPara = `Executive functioning assessment demonstrates ${parts.join('. Furthermore, presentation is notable for ')}. Symptoms cause marked occupational/academic inefficiency and disorganization. `;
    }

    // 6. Bipolar Spectrum Signs (DIGFAST)
    const bipNarratives = [];
    DSM5_CRITERIA_LIST.filter(c => c.domain === 'bipolar').forEach(c => {
      if (selectedItems[c.id]) bipNarratives.push(c.narrative);
    });
    let bipPara = '';
    if (bipNarratives.length > 0) {
      bipPara = `Screening for affective elevation reveals ${bipNarratives.join(', ')} (${diagnosticStatus.bipolar.count}/8 DIGFAST criteria endorsed; bipolar spectrum rule-out warranted). `;
    }

    // 7. Panic Disorder & Agoraphobia
    const panicNarratives = [];
    DSM5_CRITERIA_LIST.filter(c => c.domain === 'panic').forEach(c => {
      if (selectedItems[c.id]) panicNarratives.push(c.narrative);
    });
    let panicPara = '';
    if (panicNarratives.length > 0) {
      const panicNote = diagnosticStatus.panic.thresholdMet
        ? `(${diagnosticStatus.panic.count}/13 physical symptoms endorsed, meeting formal panic attack threshold)`
        : `(${diagnosticStatus.panic.count} panic features endorsed)`;
      panicPara = `Episodic panic assessment confirms ${panicNarratives.join(', ')} ${panicNote}. `;
    }

    // 8. PTSD & Trauma Intrusions
    const ptsdNarratives = [];
    DSM5_CRITERIA_LIST.filter(c => c.domain === 'ptsd').forEach(c => {
      if (selectedItems[c.id]) ptsdNarratives.push(c.narrative);
    });
    let ptsdPara = '';
    if (ptsdNarratives.length > 0) {
      ptsdPara = `Trauma-related symptom screening is significant for ${ptsdNarratives.join(', ')}. `;
    }

    // 9. OCD & Sleep Architecture
    const ocdSleepNarratives = [];
    DSM5_CRITERIA_LIST.filter(c => c.domain === 'ocd_sleep').forEach(c => {
      if (selectedItems[c.id]) ocdSleepNarratives.push(c.narrative);
    });
    let ocdSleepPara = '';
    if (ocdSleepNarratives.length > 0) {
      ocdSleepPara = `Sleep architecture and intrusive thoughts evaluation: ${ocdSleepNarratives.join(', ')}. `;
    }

    let customSymptomsPara = customSymptoms.trim() ? `Additional clinical details: ${customSymptoms.trim()}. ` : '';

    // 10. Safety & Suicide Risk Assessment
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

    // 11. Differential & Rule-Outs
    const ruleOuts = [];
    if (selectedItems['ro_denies_mania']) ruleOuts.push('past manic, hypomanic, or euphoric episodes');
    if (selectedItems['ro_denies_decreased_sleep_need']) ruleOuts.push('periods of decreased need for sleep with energized daytime function');
    if (selectedItems['ro_denies_hallucinations']) ruleOuts.push('auditory or visual hallucinations');
    if (selectedItems['ro_denies_paranoia']) ruleOuts.push('paranoia or delusional thought content');

    let ruleOutText = '';
    if (ruleOuts.length > 0) {
      ruleOutText = `${pronounSubject} denies ${ruleOuts.join(', ')}. `;
    }

    // 12. Substance & Medication Trials
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

    // 13. Standardized Clinical Screeners & Score Interpretations
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

    // 14. Standard Diagnostic Laboratory Orders & Medical Rule-Outs
    let labNarrativeText = '';
    if (includeLabsInNote) {
      if (selectedLabTierPreset === 'tier1') {
        labNarrativeText = 'Diagnostic Laboratory Orders: Ordered Tier 1 Universal Psychiatric Baseline (Hemoglobin A1c, Fasting Lipid Panel, TSH with reflex Free T4, CBC with differential, CMP-14). Patient counseled on 8–12 hour morning fasting requirements. Labs ordered to rule out glycemic/thyroid/hematologic organic mimics and establish baseline organ safety. ';
      } else if (selectedLabTierPreset === 'tier1_2') {
        labNarrativeText = 'Diagnostic Laboratory Orders: Ordered Tier 1 & 2 Comprehensive Psychiatric & Neuro-Nutrient Baseline (HbA1c, Lipid Panel, TSH w/ Free T4, CBC w/ diff, CMP-14, Vitamin B12, Serum Folate, 25-OH Vitamin D, Serum Magnesium, and Serum Ferritin). Patient counseled on 8–12 hour morning fasting. Ordered to rule out endocrine/metabolic disorders and micronutrient depletion driving cognitive fatigue, inattention, and affective symptoms. ';
      } else {
        labNarrativeText = 'Diagnostic Laboratory Orders: Ordered Full Comprehensive & Hormonal Workup (HbA1c, Lipid Panel, TSH w/ Free T4, CBC w/ diff, CMP-14, B12, Folate, 25-OH Vit D, Magnesium, Ferritin, Progesterone, Estradiol, and Prolactin). Patient educated on fasting protocols and cycle-specific timing (mid-luteal day 19–22) to evaluate endocrine, reproductive, and metabolic contributors to psychiatric symptoms. ';
      }
    }

    const clinicalParas = [
      para1,
      depPara,
      gadPara,
      adhdPara,
      panicPara,
      bipPara,
      ptsdPara,
      ocdSleepPara,
      customSymptomsPara,
      `${safetyPara}${ruleOutText}`.trim(),
      `${medText}${screenerText}${labNarrativeText}Patient was an active participant in diagnostic formulation and verbalizes agreement with the collaborative treatment plan.`.trim()
    ].filter(Boolean);

    return clinicalParas.join('\n\n');
  }, [
    patientAge,
    patientGender,
    visitType,
    selectedItems,
    customChiefComplaint,
    customPrecipitant,
    customSymptoms,
    customSafety,
    customPriorMeds,
    screenerPhq9,
    screenerGad7,
    screenerAsrs,
    screenerMdq,
    screenerAims,
    includeScreenersInNote,
    includeLabsInNote,
    selectedLabTierPreset,
    diagnosticStatus
  ]);

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
            onClick={() => applyPreset('adhd_inattentive')}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-purple-50 hover:text-purple-700 text-slate-700 border border-slate-200/80 transition-all"
          >
            Adult ADHD (Inattentive)
          </button>
          <button
            onClick={() => applyPreset('bipolar_screen')}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-amber-50 hover:text-amber-800 text-slate-700 border border-slate-200/80 transition-all"
          >
            Bipolar II Rule-Out Complex
          </button>
          <button
            onClick={() => applyPreset('ptsd_trauma')}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 border border-slate-200/80 transition-all"
          >
            PTSD &amp; Trauma Intrusions
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

          {/* Section 3: DSM-5 Diagnostic Criteria (Comprehensive Evaluation from Standalone PDFs) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-teal-600" />
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    3. DSM-5 Diagnostic Criteria Checklist (From Evaluation PDFs)
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Criteria mapped directly to the 26 practice DSM-5 assessment templates with live diagnostic thresholds:
                </p>
              </div>

              {/* Live Diagnostic Threshold Pill summary */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {diagnosticStatus.mdd.thresholdMet && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    MDD Met ({diagnosticStatus.mdd.count}/9)
                  </span>
                )}
                {diagnosticStatus.gad.thresholdMet && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-teal-100 text-teal-800 border border-teal-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-teal-600" />
                    GAD Met ({diagnosticStatus.gad.count}/6)
                  </span>
                )}
                {diagnosticStatus.adhdInatt.thresholdMet && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-800 border border-purple-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-purple-600" />
                    ADHD-Inatt Met ({diagnosticStatus.adhdInatt.count}/9)
                  </span>
                )}
                {diagnosticStatus.bipolar.thresholdMet && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-amber-600" />
                    Bipolar Warning ({diagnosticStatus.bipolar.count}/8)
                  </span>
                )}
                {diagnosticStatus.panic.thresholdMet && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
                    <AlertOctagon className="w-3 h-3 text-rose-600" />
                    Panic Attack Met ({diagnosticStatus.panic.count}/13)
                  </span>
                )}
              </div>
            </div>

            {/* Category Filter Tabs & Search Controls */}
            <div className="space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                {/* Search Filter */}
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={dsmSearchQuery}
                    onChange={(e) => setDsmSearchQuery(e.target.value)}
                    placeholder="Filter symptoms (e.g., sleep, focus, panic, guilt)..."
                    className="w-full text-xs pl-8 pr-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                {/* Quick Select Buttons */}
                <div className="flex items-center gap-1 flex-wrap">
                  <button
                    type="button"
                    onClick={handleCheckCoreMdd}
                    className="px-2 py-1 rounded-lg text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    title="Check 5 core MDD criteria"
                  >
                    + Core MDD
                  </button>
                  <button
                    type="button"
                    onClick={handleCheckClassicGad}
                    className="px-2 py-1 rounded-lg text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    title="Check GAD worry and somatic tension"
                  >
                    + Classic GAD
                  </button>
                  <button
                    type="button"
                    onClick={handleCheckInattentiveAdhd}
                    className="px-2 py-1 rounded-lg text-[10px] font-bold bg-purple-50 hover:bg-purple-100 text-purple-700 transition-colors"
                    title="Check inattentive ADHD criteria"
                  >
                    + Inattentive ADHD
                  </button>
                  <button
                    type="button"
                    onClick={handleCheckPanicAttack}
                    className="px-2 py-1 rounded-lg text-[10px] font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors"
                    title="Check panic attack symptoms"
                  >
                    + Panic Attack
                  </button>
                  <button
                    type="button"
                    onClick={handleClearCurrentDomain}
                    className="px-2 py-1 rounded-lg text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-colors"
                    title="Clear criteria in this view"
                  >
                    Clear View
                  </button>
                </div>
              </div>

              {/* Category Filter Tabs Bar */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                {DSM5_DOMAINS.map((domain) => {
                  const count = getDomainCheckedCount(domain.id);
                  const isActive = activeDomainTab === domain.id;
                  return (
                    <button
                      key={domain.id}
                      type="button"
                      onClick={() => setActiveDomainTab(domain.id)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                        isActive
                          ? 'bg-teal-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span>{domain.short}</span>
                      {count > 0 && (
                        <span className={`px-1 py-0.2 rounded-full text-[9px] font-extrabold ${
                          isActive ? 'bg-white text-teal-800' : 'bg-teal-100 text-teal-800'
                        }`}>
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filtered Criteria Checklist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[460px] overflow-y-auto pr-1">
              {filteredCriteria.map((item) => {
                const isChecked = !!selectedItems[item.id];
                return (
                  <label
                    key={item.id}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-teal-50/90 border-teal-500 text-teal-950 shadow-2xs font-semibold'
                        : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100/80'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleItem(item.id)}
                      className="rounded text-teal-600 focus:ring-teal-500 h-3.5 w-3.5 mt-0.5 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-extrabold text-teal-700 uppercase tracking-wider bg-teal-100/70 px-1 py-0.2 rounded">
                          {item.code}
                        </span>
                        {item.isCore && (
                          <span className="text-[9px] font-extrabold text-amber-700 bg-amber-100 px-1 py-0.2 rounded uppercase">
                            CORE
                          </span>
                        )}
                      </div>
                      <p className="text-[11.5px] leading-snug">{item.label}</p>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Custom Precipitants input */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Identified Precipitant / Stressor:
                </label>
                <input
                  type="text"
                  value={customPrecipitant}
                  onChange={(e) => setCustomPrecipitant(e.target.value)}
                  placeholder="e.g., job restructuring, marital strain, recent bereavement, postpartum transition..."
                  className="w-full text-xs font-medium py-2 px-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none shadow-2xs"
                />
              </div>

              {/* Custom Symptom Details input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Additional Symptom Nuances / Frequency / Clinical Details:
                </label>
                <input
                  type="text"
                  value={customSymptoms}
                  onChange={(e) => setCustomSymptoms(e.target.value)}
                  placeholder="e.g., panic attacks occur 2-3x/week while driving on I-5; crying spells every morning..."
                  className="w-full text-xs font-medium py-2 px-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none shadow-2xs"
                />
              </div>
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

          {/* Section 7: Standard Laboratory Workup & Medical Rule-Outs */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-teal-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  7. Standard Psychiatric Laboratory Orders
                </h3>
              </div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-teal-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeLabsInNote}
                  onChange={(e) => setIncludeLabsInNote(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500 h-3.5 w-3.5"
                />
                <span>Include in HPI Plan</span>
              </label>
            </div>

            <p className="text-[11px] text-slate-500">
              Standardized baseline lab draw set for ruling out organic etiologies and establishing psychotropic baseline safety:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setSelectedLabTierPreset('tier1')}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedLabTierPreset === 'tier1'
                    ? 'bg-teal-50 border-teal-500 ring-1 ring-teal-500'
                    : 'bg-slate-50 border-slate-200 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-bold text-slate-900">Tier 1 Baseline</span>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">100% Pt</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  A1c, Lipids, TSH w/ FT4, CBC w/ diff, CMP-14
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSelectedLabTierPreset('tier1_2')}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedLabTierPreset === 'tier1_2'
                    ? 'bg-teal-50 border-teal-500 ring-1 ring-teal-500'
                    : 'bg-slate-50 border-slate-200 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-bold text-slate-900">Tiers 1 &amp; 2</span>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-sky-100 text-sky-800">+Nutrients</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Adds B12, Folate, Vit D-25, Magnesium, Ferritin
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSelectedLabTierPreset('all')}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedLabTierPreset === 'all'
                    ? 'bg-teal-50 border-teal-500 ring-1 ring-teal-500'
                    : 'bg-slate-50 border-slate-200 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-bold text-slate-900">All Tiers</span>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">+Hormones</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Adds Progesterone, Estradiol, Prolactin
                </p>
              </button>
            </div>

            {typeof setActiveTab === 'function' && (
              <div className="pt-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveTab('labs')}
                  className="text-[11px] font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>Open Full Lab Requisition Builder &amp; Fasting Protocols</span>
                  <span>&rarr;</span>
                </button>
              </div>
            )}
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
                  title="Send to Clinical Reference Assistant for evaluation audit and missed criteria detection"
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
