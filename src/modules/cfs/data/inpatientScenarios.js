/**
 * inpatientScenarios.js
 * Comprehensive 16-Bed Inpatient Psychiatric Unit Census Data
 * Tailored exclusively for the Psychiatric Medication Provider / Prescriber Role.
 */

export const INPATIENT_UNIT_CENSUS = [
  {
    bed: '101',
    id: 'pt-101',
    name: 'Sarah Jenkins',
    age: 28,
    gender: 'Female',
    diagnosis: 'Bipolar I Disorder, Current Episode Manic with Psychotic Features',
    legalStatus: 'Involuntary Civil Hold (72-Hour)',
    legalHoursRemaining: 42,
    legalDetails: 'Admitted on 72h emergency detention petition. Hospital legal & social work tracking court petition deadline.',
    observationLevel: '15-Minute Safety Checks',
    acuity: 'High',
    refusingMeds: true,
    medicationRefusalReason: 'States she is "anointed by celestial light" and medications are "poison sent by competitors to dim her brilliance."',
    nursingAlert: '⚠️ Refusing oral medications since 07:00. Pacing unit hallways, hyperverbal, intrusive with other patients.',
    vitals: { bp: '136/88 mmHg', hr: '98 bpm', temp: '98.8 °F', bmi: '22.4 kg/m²' },
    labs: {
      lithiumLevel: '< 0.2 mEq/L (Subtherapeutic - confirmed missed doses)',
      cmp: 'Within normal limits; mild dehydration (BUN/Cr 22/0.9)',
      toxScreen: 'Negative for stimulants/cannabinoids',
      ecg: 'Normal Sinus Rhythm, QTc 418 ms'
    },
    currentMedications: [
      { name: 'Lithium Carbonate', dose: '600 mg PO BID', status: 'Refused morning dose' },
      { name: 'Olanzapine (Zyprexa)', dose: '15 mg PO QHS', status: 'Active' },
      { name: 'Lorazepam (Ativan)', dose: '2 mg PO/IM Q4H PRN severe agitation', status: 'PRN available' }
    ],
    nursingNotes: '03:30 - Patient awake all night, rearranging dayroom furniture. Required multiple verbal de-escalations. Refused 07:00 morning medications with verbal hostility.',
    dialogue: {
      greeting: "Doctor, you're wasting your time with those clipboards. I've already drafted 40 patents in my head since 4 AM. I don't need pills; I need an investor!",
      probeMeds: "Your toxic chemicals will slow down my brain waves! You have no legal right to shove pills down my throat. I know my constitutional rights!",
      probeSafety: "I am completely safe! Running across the highway was just testing my reaction speed. The cars stopped, didn't they?",
      probeInsight: "Sick? I have never been more awake in my entire life. Everyone else is sleepwalking through reality."
    },
    actionOptions: [
      {
        id: 'liquid_or_odt',
        label: 'Switch to Oral Dissolving Tablet (Olanzapine Zydis 10mg PO/ODT) with Motivational Negotiation',
        category: 'Route Optimization',
        clinicalImpact: 'Evidence-based psychopharmacology: offers the patient agency, avoids forced injection trauma, and treats psychotic mania rapidly.',
        scoreDelta: 30
      },
      {
        id: 'emergency_im',
        label: 'Order Emergency IM Psychotropic Protocol (Haloperidol 5mg + Lorazepam 2mg + Diphenhydramine 50mg IM STAT) for Imminent Violence',
        category: 'Emergency Psychopharmacology',
        clinicalImpact: 'Appropriate emergency intervention if verbal de-escalation fails and physical danger is imminent.',
        scoreDelta: 20
      },
      {
        id: 'lithium_trough_tdm',
        label: 'Order STAT 12-Hour Trough Lithium Level and Consolidate to Single Nighttime Dosing to Reduce Daytime Refusal Friction',
        category: 'Therapeutic Drug Monitoring',
        clinicalImpact: 'Once-daily bedtime dosing reduces GI side effects, protects renal tubules, and decreases daytime refusal friction.',
        scoreDelta: 25
      },
      {
        id: 'legal_med_recommendation',
        label: 'Provide Psychiatric Medication Treatment Plan to Hospital Legal/Social Work for Involuntary Treatment Hearing',
        category: 'Psychiatric Legal Interface',
        clinicalImpact: 'Ensures the court has the exact pharmacological rationale needed to order involuntary medications if refusal continues.',
        scoreDelta: 20
      }
    ]
  },
  {
    bed: '102',
    id: 'pt-102',
    name: 'Derek Cole',
    age: 44,
    gender: 'Male',
    diagnosis: 'Schizophrenia, Paranoid Subtype (Acute Relapse)',
    legalStatus: 'Involuntary Civil Hold (72-Hour)',
    legalHoursRemaining: 18,
    legalDetails: '72h hold expires in 18 hours. Hospital social work preparing 14-day court petition.',
    observationLevel: '15-Minute Safety Checks',
    acuity: 'High',
    refusingMeds: true,
    medicationRefusalReason: 'Believes pills contain nanotracking transmitters.',
    nursingAlert: '⚠️ Severe paranoia. Has refused all oral medication cups citing nanotracking transmitters.',
    vitals: { bp: '124/80 mmHg', hr: '84 bpm', temp: '98.4 °F', bmi: '25.1 kg/m²' },
    labs: {
      cmp: 'Mildly elevated sodium (147 mEq/L) consistent with reduced fluid intake',
      cbc: 'WBC 6.4 x10³/µL, Hgb 14.8 g/dL',
      toxScreen: 'Negative',
      ecg: 'Normal Sinus Rhythm, QTc 435 ms'
    },
    currentMedications: [
      { name: 'Risperidone', dose: '3 mg PO BID', status: 'Refused' }
    ],
    nursingNotes: 'Overnight: Barricaded room door with mattress at 01:00. Continues to accuse staff of federal surveillance.',
    dialogue: {
      greeting: "Step back from that doorway. I know what frequency your badge operates on. You aren't examining me without a warrant.",
      probeMeds: "Your little red capsules have micro-conductors. I saw the reflections in the medicine cup. Give me sealed bottled water or nothing at all.",
      probeSafety: "I don't want to hurt anyone, but if agents breach my perimeter, I will defend my physical sovereignty.",
      probeInsight: "There is nothing wrong with my psychiatric functioning. The signals are documented by acoustic sensors."
    },
    actionOptions: [
      {
        id: 'liquid_concentrate_sealed',
        label: 'Offer Flavorless Oral Liquid Concentrate (Risperidone 1 mg/mL) in Unopened Commercial Beverage to Bypass Pill Transmitters',
        category: 'Route Optimization',
        clinicalImpact: 'High-yield psychopharmacology technique: respects patient persecutory focus regarding pills while achieving pharmacological blood levels.',
        scoreDelta: 30
      },
      {
        id: 'court_psych_affidavit',
        label: 'Complete Psychiatric Medical Necessity Form for Hospital Legal/Social Work for 14-Day Involuntary Commitment',
        category: 'Psychiatric Legal Interface',
        clinicalImpact: 'Critical psychiatric prescriber duty: documents persistent psychotic lack of capacity so legal team can secure court-ordered care before 18h deadline.',
        scoreDelta: 25
      },
      {
        id: 'lai_antipsychotic_plan',
        label: 'Formulate Transition to Monthly Long-Acting Injectable (Invega Sustenna / Paliperidone Palmitate) Post-Stabilization',
        category: 'Maintenance Psychopharmacology',
        clinicalImpact: 'Solves the chronic oral non-adherence cycle driving his recurrent involuntary hospitalizations.',
        scoreDelta: 25
      }
    ]
  },
  {
    bed: '103',
    id: 'pt-103',
    name: 'Elena Rodriguez',
    age: 31,
    gender: 'Female',
    diagnosis: 'Major Depressive Disorder with Postpartum Psychosis & Catatonic Features',
    legalStatus: 'Involuntary Civil Hold',
    legalHoursRemaining: 36,
    legalDetails: 'Under emergency hold; surrogate family consenting for psychiatric care.',
    observationLevel: '1:1 Continuous Line-of-Sight',
    acuity: 'Critical',
    refusingMeds: false,
    medicationRefusalReason: 'Does not refuse, but suffers from severe waxy flexibility and psychomotor arrest.',
    nursingAlert: '🚨 Bush-Francis Catatonia Score: 14. Mutism, immobility, staring, and stupor. Poor oral intake.',
    vitals: { bp: '108/68 mmHg', hr: '64 bpm', temp: '98.2 °F', bmi: '21.0 kg/m²' },
    labs: {
      ck: '280 U/L (Rule out NMS - normal range 30-200)',
      cmp: 'Electrolytes normal, mild ketonuria from poor oral intake',
      tsh: '2.1 mIU/L',
      ecg: 'Normal Sinus Rhythm, QTc 410 ms'
    },
    currentMedications: [
      { name: 'Lorazepam (Ativan)', dose: '2 mg IV Q8H', status: 'Active (Scheduled)' }
    ],
    nursingNotes: 'Patient remains mute and rigid in bed. Held arm in upright position for 20 minutes without dropping (catalepsy). Responded partially to morning Lorazepam dose with brief tears.',
    dialogue: {
      greeting: "[Patient sits with fixed downward gaze. Blinks slowly. Does not speak for 45 seconds.] ... Baby ... isn't safe with my thoughts.",
      probeMeds: "[Nods faintly, accepts pill cup slowly with trembling hands.]",
      probeSafety: "... The darkness is heavy ... like drowning in grey water ...",
      probeInsight: "[Weeps silently, touches chest] ... My baby deserves a living mother ... but I'm broken."
    },
    actionOptions: [
      {
        id: 'lorazepam_challenge',
        label: 'Administer Lorazepam Challenge Test (Lorazepam 2mg IV/IM STAT and Reassess Bush-Francis Score at 30 min)',
        category: 'Acute Neuropsychiatry',
        clinicalImpact: 'Gold-standard diagnostic & therapeutic step for catatonia: dramatic unlocking of motor rigidity confirms catatonia syndrome.',
        scoreDelta: 30
      },
      {
        id: 'ect_consult',
        label: 'Place STAT Psychiatric Consultation for Electroconvulsive Therapy (ECT)',
        category: 'Interventional Psychiatry',
        clinicalImpact: 'Definitive life-saving standard of care for severe catatonia and postpartum psychosis refractory to high-dose benzodiazepines.',
        scoreDelta: 25
      },
      {
        id: 'internal_med_consult_dvt',
        label: 'Request Internal Medicine Consult for General Medical Hydration and DVT Prophylaxis Management',
        category: 'Medical Collaboration',
        clinicalImpact: 'Appropriate prescriber collaboration: delegates medical DVT anticoagulation and IV hydration to the hospitalist while managing psychotropics.',
        scoreDelta: 25
      }
    ]
  },
  {
    bed: '104',
    id: 'pt-104',
    name: 'Jamal Washington',
    age: 39,
    gender: 'Male',
    diagnosis: 'Schizoaffective Disorder, Bipolar Type',
    legalStatus: 'Court-Ordered Involuntary Treatment (Title 36)',
    legalHoursRemaining: 2,
    legalDetails: 'Mandatory 180-day mental health court review hearing today at 11:30 AM.',
    observationLevel: '15-Minute Safety Checks',
    acuity: 'Moderate',
    refusingMeds: false,
    medicationRefusalReason: 'None currently; adherent with nursing medication pass.',
    nursingAlert: '⚖️ Legal Hearing in 2 Hours. County Public Defender and Mental Health Court Judge awaiting Physician Affidavit.',
    vitals: { bp: '122/78 mmHg', hr: '76 bpm', temp: '98.6 °F', bmi: '28.3 kg/m²' },
    labs: {
      valproicAcidLevel: '82 µg/mL (Therapeutic range 50-125 µg/mL)',
      cbc: 'WBC 7.1, Platelets 194 x10³/µL',
      liverPanel: 'AST 24, ALT 28 U/L (Normal)'
    },
    currentMedications: [
      { name: 'Divalproex (Depakote ER)', dose: '1500 mg PO QHS', status: 'Active' },
      { name: 'Aripiprazole (Abilify)', dose: '15 mg PO Daily', status: 'Active' }
    ],
    nursingNotes: 'Cooperative throughout shift. Participated in morning occupational therapy group. Thought process linear with mild residual grandiose religiosity.',
    dialogue: {
      greeting: "Good morning, doctor. I have my hearing today, right? I'm hoping the judge sees that I'm taking my medicine and doing much better.",
      probeMeds: "The Depakote and Abilify help quiet the static. My mind was like ten radios playing at full blast before. Now it's manageable.",
      probeSafety: "No thoughts of hurting myself or anyone else. I want to get back to my sister's apartment and my job at the warehouse.",
      probeInsight: "I know I have schizoaffective disorder. When I stop my pills, the voices tell me I'm the archangel Michael, and that's when things fall apart."
    },
    actionOptions: [
      {
        id: 'court_affidavit_stepdown',
        label: 'Document Psychiatric Medication Efficacy (Valproate Level 82 µg/mL, Stable Abilify) for Court Step-Down',
        category: 'Psychiatric Legal Interface',
        clinicalImpact: 'Provides the clinical evidence of pharmacological stabilization allowing the court to step down care to outpatient ACT.',
        scoreDelta: 30
      },
      {
        id: 'lai_transition_court',
        label: 'Initiate Long-Acting Injectable Antipsychotic (Abilify Maintena 400mg IM) Prior to Discharge',
        category: 'Maintenance Psychopharmacology',
        clinicalImpact: 'Guarantees therapeutic antipsychotic delivery in the community, preventing hospital readmission.',
        scoreDelta: 25
      }
    ]
  },
  {
    bed: '105',
    id: 'pt-105',
    name: 'Gregory "Greg" Miller',
    age: 52,
    gender: 'Male',
    diagnosis: 'Severe Alcohol Withdrawal Delirium (DTs Risk) & Wernicke Encephalopathy Rule-Out',
    legalStatus: 'Involuntary Civil Hold (Gravely Disabled)',
    legalHoursRemaining: 54,
    legalDetails: 'Admitted following severe public intoxication and hypothermia.',
    observationLevel: '15-Minute Safety Checks & Fall Precautions',
    acuity: 'Critical',
    refusingMeds: false,
    medicationRefusalReason: 'Severely disoriented to time and place.',
    nursingAlert: '🚨 STAT: CIWA-Ar Score 21 (Severe). Gross hand tremors, drenching diaphoresis, visual illusions of bugs on bedsheets.',
    vitals: { bp: '168/102 mmHg', hr: '122 bpm (Sinus Tachycardia)', temp: '99.4 °F', bmi: '19.8 kg/m²' },
    labs: {
      bloodAlcohol: '0.00% (Completed clearance 14 hours ago)',
      magnesium: '1.4 mg/dL (Low - Critical for arrhythmia/seizure risk)',
      potassium: '3.3 mEq/L (Low)',
      platelets: '92 x10³/µL (Thrombocytopenia from chronic alcohol suppression)'
    },
    currentMedications: [
      { name: 'Lorazepam (Ativan)', dose: '2-4 mg IV/PO per Symptom-Triggered CIWA protocol', status: 'Due now' },
      { name: 'Thiamine', dose: '500 mg IV TID', status: 'Active' },
      { name: 'Folic Acid', dose: '1 mg PO Daily', status: 'Active' }
    ],
    nursingNotes: '07:30 - Patient agitated, pulling at telemetry leads. Shouting: "Get the wiring out of my blanket!" Unsteady gait, ataxic. High fall risk.',
    dialogue: {
      greeting: "Hey! Who turned off the heater? Look at the floor—there's insects crawling under the baseboard. I need my boots!",
      probeMeds: "Give me whatever stops the shaking! My heart is pounding out of my ribs!",
      probeSafety: "I'm not trying to jump, I'm trying to get away from the swarms!",
      probeInsight: "Delirium: Disoriented to year (states it is 1998) and hospital setting (believes he is in a shipping depot)."
    },
    actionOptions: [
      {
        id: 'symptom_triggered_ativan',
        label: 'Administer Lorazepam 4mg IV STAT & Continue Symptom-Triggered CIWA Protocol (Target CIWA < 10)',
        category: 'Emergency Psychopharmacology',
        clinicalImpact: 'Life-saving: Benzodiazepines act on GABA-A receptors to halt withdrawal progression and prevent fatal seizures.',
        scoreDelta: 30
      },
      {
        id: 'high_dose_iv_thiamine',
        label: 'Verify High-Dose IV Thiamine (500mg IV TID) Is Given Prior to Any Carbohydrate/Dextrose Administration',
        category: 'Neuroprotective Safety',
        clinicalImpact: 'Absolute Prescriber Rule: Dextrose before thiamine exhausts transketolase and causes acute irreversible Wernicke encephalopathy.',
        scoreDelta: 25
      },
      {
        id: 'internal_med_consult_withdrawal',
        label: 'Request STAT Internal Medicine Consult for Severe Hypomagnesemia (1.4 mg/dL), Hypokalemia & Telemetry Monitoring',
        category: 'Medical Collaboration',
        clinicalImpact: 'Appropriate prescriber boundaries: engages hospitalist for electrolyte IV infusions while managing acute withdrawal sedation.',
        scoreDelta: 25
      }
    ]
  },
  {
    bed: '106',
    id: 'pt-106',
    name: 'Chloe Bennett',
    age: 21,
    gender: 'Female',
    diagnosis: 'Borderline Personality Disorder & Major Depressive Disorder',
    legalStatus: 'Voluntary',
    legalHoursRemaining: null,
    legalDetails: 'Admitted voluntarily following superficial forearm lacerations following relationship dissolution.',
    observationLevel: '15-Minute Safety Checks',
    acuity: 'Moderate',
    refusingMeds: false,
    medicationRefusalReason: 'Demanding additional controlled substances.',
    nursingAlert: '⚠️ Intense staff-splitting. Stated night nurse was "an angel" and day nurse is "evil and cruel." Requesting PRN Xanax.',
    vitals: { bp: '116/74 mmHg', hr: '78 bpm', temp: '98.4 °F', bmi: '22.0 kg/m²' },
    labs: {
      toxScreen: 'Positive for prescribed Sertraline; negative for illicit substances',
      cmp: 'Normal',
      cbc: 'Normal'
    },
    currentMedications: [
      { name: 'Sertraline (Zoloft)', dose: '100 mg PO Daily', status: 'Active' },
      { name: 'Hydroxyzine (Vistaril)', dose: '50 mg PO Q6H PRN anxiety', status: 'PRN' }
    ],
    nursingNotes: 'Approached nurse station 5 times demanding benzodiazepines. Threatening to sign AMA (Against Medical Advice) if demands not met.',
    dialogue: {
      greeting: "Doctor, finally someone with a soul. The morning nurse refused to give me anything for my panic. You have to order Xanax for me right now.",
      probeMeds: "Vistaril is useless baby medicine! I need real medication or I'm checking myself out and whatever happens to me is on your conscience.",
      probeSafety: "If you leave me in this agonizing emotional void, I can't promise I won't hurt myself again.",
      probeInsight: "I feel like a hollow shell. When someone leaves me, it literally feels like I'm dying inside."
    },
    actionOptions: [
      {
        id: 'firm_milieu_boundaries',
        label: 'Decline Benzodiazepine Prescription; Prescribe Non-Habituating Anxiolytic (Hydroxyzine 50mg or Gabapentin 300mg TID)',
        category: 'Controlled Substance Safety',
        clinicalImpact: 'Evidence-based psychopharmacology: Benzodiazepines cause behavioral disinhibition and increase suicide completion in BPD.',
        scoreDelta: 30
      },
      {
        id: 'second_gen_mood_adjunct',
        label: 'Consider Low-Dose Atypical Antipsychotic Augmentation (Aripiprazole 2-5mg PO Daily) for Affective Instability',
        category: 'Psychopharmacology',
        clinicalImpact: 'APA guidelines support low-dose second-generation antipsychotics for acute cognitive-perceptual symptoms and severe affective lability in BPD.',
        scoreDelta: 25
      }
    ]
  },
  {
    bed: '107',
    id: 'pt-107',
    name: 'Raymond Park',
    age: 68,
    gender: 'Male',
    diagnosis: 'Major Neurocognitive Disorder with Lewy Bodies (Dementia with Lewy Bodies)',
    legalStatus: 'Voluntary (Medical Surrogate / DPOA Consenting)',
    legalHoursRemaining: null,
    legalDetails: 'Transferred from Med-Surg after recurrent visual hallucinations of children in his closet.',
    observationLevel: 'Fall Precautions & 15-Min Checks',
    acuity: 'Moderate',
    refusingMeds: false,
    medicationRefusalReason: 'None',
    nursingAlert: '⚠️ Severe Neuroleptic Hypersensitivity Warning. Patient has severe Parkinsonian rigidity.',
    vitals: { bp: '138/82 mmHg (Supine), 110/68 mmHg (Standing - Orthostasis)', hr: '70 bpm', temp: '97.9 °F', bmi: '23.8 kg/m²' },
    labs: {
      cmp: 'Normal creatinine (0.9 mg/dL), BUN 18',
      tsh: '1.9 mIU/L',
      b12: '480 pg/mL',
      ecg: 'Normal Sinus, QTc 420 ms'
    },
    currentMedications: [
      { name: 'Donepezil (Aricept)', dose: '10 mg PO QHS', status: 'Active' },
      { name: 'Melatonin', dose: '3 mg PO QHS', status: 'Active for REM sleep behavior' }
    ],
    nursingNotes: 'Shuffle gait, masked facies, cogwheel rigidity in bilateral upper extremities. Vivid, detailed visual hallucinations of animals and children, non-distressing.',
    dialogue: {
      greeting: "Hello, doctor. Have you seen the little girl in the green coat? She was sitting by the radiator earlier, but she never makes any noise.",
      probeMeds: "I take my memory pills every night. My daughter makes sure I don't forget.",
      probeSafety: "I don't feel in danger, but my legs feel very heavy, like I'm walking through wet sand.",
      probeInsight: "I know they tell me the people aren't real, but they look as solid as you do."
    },
    actionOptions: [
      {
        id: 'avoid_typical_antipsychotics',
        label: 'Chart Warning: Absolute Contraindication to Typical Antipsychotics & Risperidone (Severe Neuroleptic Sensitivity Risk)',
        category: 'Psychiatric Safety',
        clinicalImpact: 'Life-saving safety rule: Up to 50% of DLB patients exposed to D2 blockers experience catastrophic irreversible rigidity or death.',
        scoreDelta: 30
      },
      {
        id: 'pimavanserin_or_quetiapine',
        label: 'If Psychosis Becomes Distressing: Prescribe Pimavanserin (Nuplazid 34mg Daily) or Low-Dose Quetiapine (12.5mg QHS)',
        category: 'Geriatric Psychopharmacology',
        clinicalImpact: 'Pimavanserin is a pure 5-HT2A inverse agonist without D2 antagonism, treating psychosis with zero Parkinsonian motor worsening.',
        scoreDelta: 25
      }
    ]
  },
  {
    bed: '108',
    id: 'pt-108',
    name: 'Brandon Brooks',
    age: 26,
    gender: 'Male',
    diagnosis: 'Methamphetamine-Induced Psychotic Disorder vs Primary Psychosis',
    legalStatus: 'Involuntary Civil Hold (72-Hour)',
    legalHoursRemaining: 68,
    legalDetails: 'Admitted 4 hours ago after screaming at traffic and throwing rocks at police cruisers.',
    observationLevel: '15-Minute Checks',
    acuity: 'High',
    refusingMeds: true,
    medicationRefusalReason: 'Extremely suspicious, pacing, scanning ceiling.',
    nursingAlert: '⚠️ High Agitation Risk. Security called overnight for aggressive posturing in triage.',
    vitals: { bp: '152/96 mmHg', hr: '118 bpm', temp: '99.1 °F', bmi: '21.5 kg/m²' },
    labs: {
      toxScreen: 'POSITIVE for Amphetamines / Methamphetamine; Negative for Opiates/Benzos',
      cpk: '1450 U/L (Elevated secondary to severe psychomotor agitation - monitor for rhabdomyolysis)',
      cmp: 'BUN 24, Cr 1.1'
    },
    currentMedications: [
      { name: 'IV Hydration (Normal Saline)', dose: '150 mL/hr', status: 'Running' }
    ],
    nursingNotes: 'Pacing room perimeter. Pupils dilated (6mm, reactive). Sweating profusely. Clenched fists.',
    dialogue: {
      greeting: "Don't come near me! You think I don't see the laser dots through the window? I've been awake for 6 days and I can hear your radios!",
      probeMeds: "Get that needle away from me! You touch me and I'll break that desk!",
      probeSafety: "I will fight anyone who steps into this square! Back up!",
      probeInsight: "Insight absent. Believes hospital is an interrogation black site."
    },
    actionOptions: [
      {
        id: 'oral_deescalation_ativan',
        label: 'Prescribe Lorazepam 2mg PO/IM for Sympathomimetic Overdrive; Avoid High-Potency D2 Blockers Due to CPK Elevation',
        category: 'Emergency Psychopharmacology',
        clinicalImpact: 'Benzodiazepines are primary first-line for methamphetamine agitation; typical neuroleptics worsen hyperthermia and rhabdomyolysis risk.',
        scoreDelta: 30
      },
      {
        id: 'internal_med_consult_cpk',
        label: 'Request Internal Medicine Consult for Aggressive IV Hydration & Serial CPK Monitoring (Rhabdomyolysis Prevention)',
        category: 'Medical Collaboration',
        clinicalImpact: 'Delegates internal medicine nephroprotection while managing acute central nervous system toxicity.',
        scoreDelta: 25
      }
    ]
  },
  {
    bed: '109',
    id: 'pt-109',
    name: 'Vanessa Taylor',
    age: 37,
    gender: 'Female',
    diagnosis: 'Treatment-Resistant Major Depressive Disorder with High Lethality Suicide Attempt',
    legalStatus: 'Involuntary Civil Hold (Imminent Danger to Self)',
    legalHoursRemaining: 50,
    legalDetails: 'Admitted following high-lethality suicide attempt; 1:1 suicide precautions.',
    observationLevel: '1:1 Continuous Line-of-Sight Staffing',
    acuity: 'Critical',
    refusingMeds: false,
    medicationRefusalReason: 'None',
    nursingAlert: '🚨 Continuous 1:1 Observation. Patient must remain in direct visual line-of-sight including bathroom/shower.',
    vitals: { bp: '112/70 mmHg', hr: '68 bpm', temp: '98.3 °F', bmi: '24.1 kg/m²' },
    labs: {
      cmp: 'Normal',
      cbc: 'Normal',
      thyroid: 'TSH 1.4 mIU/L'
    },
    currentMedications: [
      { name: 'Venlafaxine (Effexor XR)', dose: '225 mg PO Daily', status: 'Active' },
      { name: 'Bupropion (Wellbutrin XL)', dose: '300 mg PO Daily', status: 'Active' }
    ],
    nursingNotes: 'Quiet, cooperative, deep despair. States: "My family would have been better off if my husband had come home 10 minutes later."',
    dialogue: {
      greeting: "Why did they bring me here, doctor? I had everything arranged. The pain inside is just too exhausting to carry another day.",
      probeMeds: "I've taken Effexor and Wellbutrin for two years. They did nothing to stop this black hole.",
      probeSafety: "I know you have someone watching me every second. But you can't watch me forever. As soon as I'm released, I'm going to finish it.",
      probeInsight: "Recognizes depression, but views suicide as an inevitable, rational solution."
    },
    actionOptions: [
      {
        id: 'lithium_or_esketamine_augmentation',
        label: 'Initiate Lithium Carbonate Augmentation (300mg BID, Target Level 0.6-0.8 mEq/L) for Evidence-Based Anti-Suicidality Effect',
        category: 'Anti-Suicide Psychopharmacology',
        clinicalImpact: 'Lithium is one of only two psychotropics with FDA/evidence-based proven statistical reduction in completed suicide.',
        scoreDelta: 30
      },
      {
        id: 'atypical_antidepressant_adjunct',
        label: 'Discontinue High-Dose Bupropion (Seizure/Insomnia Risk) and Initiate Atypical Antipsychotic Augmentation (Aripiprazole 2-5mg or Brexpiprazole 1mg)',
        category: 'Depression Psychopharmacology',
        clinicalImpact: 'First-line evidence-based augmentation strategy for unipolar treatment-resistant depression.',
        scoreDelta: 25
      }
    ]
  },
  {
    bed: '110',
    id: 'pt-110',
    name: 'Arthur Pendelton',
    age: 61,
    gender: 'Male',
    diagnosis: 'Treatment-Resistant Schizophrenia on Clozapine Maintenance',
    legalStatus: 'Involuntary Civil Commitment (Gravely Disabled)',
    legalHoursRemaining: null,
    legalDetails: 'Under 180-day state conservatorship; highly functional when clozapine adherent.',
    observationLevel: '15-Minute Checks',
    acuity: 'Moderate',
    refusingMeds: false,
    medicationRefusalReason: 'None',
    nursingAlert: '📋 Mandatory REMS Alert: Weekly Absolute Neutrophil Count (ANC) Due Today Prior to Clozapine Administration.',
    vitals: { bp: '130/84 mmHg', hr: '88 bpm', temp: '98.6 °F', bmi: '31.2 kg/m²' },
    labs: {
      recentAnc: 'Pending morning lab draw',
      lastWeekAnc: '1850 /µL (Normal is ≥ 1500 /µL for general population)',
      fastingGlucose: '118 mg/dL',
      fastingLipids: 'Triglycerides 240 mg/dL'
    },
    currentMedications: [
      { name: 'Clozapine (Clozaril)', dose: '200 mg PO Morning, 250 mg PO QHS', status: 'Hold morning dose pending ANC' },
      { name: 'Docusate Sodium + Senna', dose: '1 tab PO Daily', status: 'Active for constipation prophylaxis' }
    ],
    nursingNotes: 'Arthur was pleasant at breakfast. No gastrointestinal complaints. Bowel movement logged yesterday evening (vital for clozapine hypomotility monitoring).',
    dialogue: {
      greeting: "Good morning! Did the lab tech take my blood yet? I know I can't get my evening pills until the computer gets the numbers.",
      probeMeds: "Clozapine saved my life, doctor. Before this, I spent 12 years in state hospitals. I don't mind the blood draws.",
      probeSafety: "No thoughts of self-harm. Looking forward to group recreation.",
      probeInsight: "Excellent insight into illness and pharmacological necessity."
    },
    actionOptions: [
      {
        id: 'verify_anc_before_dispense',
        label: 'Verify Morning ANC ≥ 1500 /µL in FDA REMS Portal Prior to Authorizing Clozapine Administration',
        category: 'Regulatory / REMS Safety',
        clinicalImpact: 'Absolute Legal Prescriber Mandate: Administering Clozapine without verified ANC creates severe risk of unrecognized agranulocytosis.',
        scoreDelta: 30
      },
      {
        id: 'monitor_clozapine_constipation',
        label: 'Review Daily Bowel Flowsheet & Prescribe Aggressive Laxative Prophylaxis (Polyethylene Glycol + Senna) for Gastrointestinal Hypomotility',
        category: 'Psychiatric Safety',
        clinicalImpact: 'Clozapine-induced severe constipation and bowel necrosis kill more patients than agranulocytosis; proactive bowel regimens are mandatory.',
        scoreDelta: 25
      }
    ]
  },
  {
    bed: '111',
    id: 'pt-111',
    name: 'Maya Lin',
    age: 24,
    gender: 'Female',
    diagnosis: 'Severe Anorexia Nervosa (Restricting Type) with Major Depression',
    legalStatus: 'Involuntary Civil Hold (Gravely Disabled / Medical Demise)',
    legalHoursRemaining: 30,
    legalDetails: 'Under involuntary hold for severe emaciation and refusal of nutritional rescue.',
    observationLevel: '1:1 Post-Prandial Observation for 90 Minutes',
    acuity: 'Critical',
    refusingMeds: true,
    medicationRefusalReason: 'Refuses all oral nutritional supplements and calorie-dense medications.',
    nursingAlert: '🚨 Critical Medical Risk: Potassium 3.1 mEq/L, Resting Bradycardia HR 42 bpm, Orthostatic Dizziness.',
    vitals: { bp: '88/54 mmHg', hr: '42 bpm (Sinus Bradycardia)', temp: '96.2 °F (Hypothermic)', bmi: '13.8 kg/m²' },
    labs: {
      potassium: '3.1 mEq/L (Critical Low)',
      magnesium: '1.5 mg/dL (Low)',
      phosphorus: '2.2 mg/dL (Watch for Refeeding Syndrome)',
      ecg: 'Marked Sinus Bradycardia, QTc 476 ms'
    },
    currentMedications: [
      { name: 'Potassium Chloride', dose: '40 mEq PO in divided doses', status: 'Refused morning dose' },
      { name: 'Olanzapine (Zyprexa)', dose: '2.5 mg PO QHS', status: 'Refused' }
    ],
    nursingNotes: 'Hiding water bottles in pillowcase to falsify weigh-ins. Exercising vigorously in bathroom despite dizziness. Refused 100% of breakfast tray.',
    dialogue: {
      greeting: "I am fine. My heart always beats slow because I'm an athlete. Why are you keeping me locked in here?",
      probeMeds: "Potassium pills are horse pills made of artificial fillers. I don't need them. Just let me drink water.",
      probeSafety: "I am not suicidal. I just want control over what enters my body.",
      probeInsight: "Severe body image distortion: believes her abdomen is 'bloated and obese' at 78 lbs."
    },
    actionOptions: [
      {
        id: 'stat_medical_transfer',
        label: 'Place STAT Request for Medical ICU Transfer (HR 42 bpm, QTc 476ms, K+ 3.1 mEq/L Exceed Safe Psychiatric Ward Limits)',
        category: 'Medical Collaboration',
        clinicalImpact: 'Top Psychiatric Board Rule: Severe anorexia with cardiac instability must be medically stabilized in an ICU before psychiatric treatment.',
        scoreDelta: 35
      },
      {
        id: 'hold_qtc_psychotropics',
        label: 'Hold All QTc-Prolonging Psychotropics (Geodon, Haldol, Citalopram) to Prevent Fatal Torsades de Pointes',
        category: 'Psychiatric Safety',
        clinicalImpact: 'Profound hypokalemia + prolonged QTc creates extreme vulnerability to ventricular fibrillation.',
        scoreDelta: 25
      }
    ]
  },
  {
    bed: '112',
    id: 'pt-112',
    name: 'Tyler Evans',
    age: 19,
    gender: 'Male',
    diagnosis: 'First-Episode Psychosis (FEP) - Unspecified Schizophrenia Spectrum',
    legalStatus: 'Involuntary Civil Hold (72-Hour)',
    legalHoursRemaining: 60,
    legalDetails: 'University student brought by police after dismantling dorm fire alarms.',
    observationLevel: '15-Minute Checks',
    acuity: 'High',
    refusingMeds: false,
    medicationRefusalReason: 'Perplexed, anxious, frightened.',
    nursingAlert: '👨‍👩‍👦 Family Crisis: Terrified parents in consultation room requesting conference with attending psychiatrist.',
    vitals: { bp: '120/78 mmHg', hr: '82 bpm', temp: '98.6 °F', bmi: '22.8 kg/m²' },
    labs: {
      tsh: '2.0 mIU/L',
      rapidUrineTox: 'Negative',
      ceruloplasmin: 'Normal (Wilson disease rule-out)',
      mriBrain: 'Pending'
    },
    currentMedications: [],
    nursingNotes: 'Sitting on edge of bed with blanket wrapped around shoulders. Eye contact darting to corners of ceiling. Whispering back to unheard voices.',
    dialogue: {
      greeting: "Did my roommate send you? Everyone on my floor was whispering about my search history. They created a podcast about my thoughts...",
      probeMeds: "I don't know what kind of medicine could stop people from talking through the ventilation ducts...",
      probeSafety: "I just want it to stop. I had to leave my dorm because the noise was unbearable.",
      probeInsight: "Insight poor; bewildered by new terrifying sensory perceptions."
    },
    actionOptions: [
      {
        id: 'low_dose_atypical_fep',
        label: 'Initiate Low-Dose Atypical Antipsychotic (Risperidone 1mg PO Daily or Aripiprazole 5mg PO Daily)',
        category: 'First-Episode Psychopharmacology',
        clinicalImpact: 'First-episode patients are hypersensitive to EPS and metabolic side effects; "start low and go slow" prevents treatment-induced trauma.',
        scoreDelta: 30
      },
      {
        id: 'coordinated_specialty_referral',
        label: 'Refer to Coordinated Specialty Care (CSC / First-Episode Psychosis Team) for Longitudinal Outpatient Recovery',
        category: 'Systems of Care',
        clinicalImpact: 'Early intervention programs dramatically improve longitudinal vocational, social, and symptom recovery.',
        scoreDelta: 25
      }
    ]
  },
  {
    bed: '113',
    id: 'pt-113',
    name: 'Hannah Campbell',
    age: 46,
    gender: 'Female',
    diagnosis: 'Bipolar I Disorder, Current Episode Mixed with Severe Dysphoric Agitation',
    legalStatus: 'Involuntary Civil Hold',
    legalHoursRemaining: 24,
    legalDetails: 'Under emergency hold; hospital social work preparing 14-day court extension.',
    observationLevel: '15-Minute Checks',
    acuity: 'High',
    refusingMeds: false,
    medicationRefusalReason: 'Accepts PRNs but rejects maintenance stabilizers.',
    nursingAlert: '⚠️ Mixed Episode Warning: High energy + deep despair = high suicide lethality risk.',
    vitals: { bp: '142/90 mmHg', hr: '104 bpm', temp: '98.8 °F', bmi: '26.4 kg/m²' },
    labs: {
      cmp: 'Normal',
      cbc: 'Normal',
      hcg: 'Negative'
    },
    currentMedications: [
      { name: 'Quetiapine (Seroquel)', dose: '300 mg PO QHS', status: 'Active' }
    ],
    nursingNotes: 'Pacing rapidly while crying. States she wants to jump out of her own skin. 0 hours of sleep for 4 consecutive nights.',
    dialogue: {
      greeting: "My skin is on fire, doctor! My brain is screaming at 100 miles an hour and everything hurts! Fix this right now!",
      probeMeds: "Give me something that knocks me out cold! If I don't sleep I'm going to smash my head against that wall!",
      probeSafety: "Mixed episodes have the highest suicide completion rates. Patient demonstrates explosive irritability and self-loathing.",
      probeInsight: "Insight partial: recognizes she is experiencing an acute breakdown."
    },
    actionOptions: [
      {
        id: 'rapid_divalproex_loading',
        label: 'Initiate Divalproex (Depakote) Oral Loading Protocol (20 mg/kg/day) + Increase Evening Sedating Quetiapine to 600mg',
        category: 'Acute Mood Stabilization',
        clinicalImpact: 'Valproate oral loading achieves rapid therapeutic blood levels (50-125 µg/mL) and is superior to Lithium for mixed dysphoric mania.',
        scoreDelta: 30
      },
      {
        id: 'court_extension_petition',
        label: 'Submit Psychiatric Diagnosis & Medication Treatment Plan to Social Work for 14-Day Commitment Filing',
        category: 'Psychiatric Legal Interface',
        clinicalImpact: 'Provides clinical documentation of acute suicide risk in mixed mania before the 24h deadline lapses.',
        scoreDelta: 25
      }
    ]
  },
  {
    bed: '114',
    id: 'pt-114',
    name: 'Victor Sanchez',
    age: 55,
    gender: 'Male',
    diagnosis: 'Bipolar I Disorder, Most Recent Episode Depressed, in Full Remission',
    legalStatus: 'Voluntary',
    legalHoursRemaining: null,
    legalDetails: 'Voluntary admission 12 days ago; stabilized on combination therapy.',
    observationLevel: 'Routine Unit Milieu (30-Minute Checks)',
    acuity: 'Low',
    refusingMeds: false,
    medicationRefusalReason: 'None',
    nursingAlert: '✅ Discharge Candidate: Outpatient psychiatrist appointment confirmed for Thursday 10:00 AM.',
    vitals: { bp: '122/76 mmHg', hr: '72 bpm', temp: '98.4 °F', bmi: '27.1 kg/m²' },
    labs: {
      lithiumLevel: '0.82 mEq/L (Optimal maintenance 0.6 - 1.0 mEq/L)',
      creatinine: '1.0 mg/dL',
      tsh: '2.4 mIU/L'
    },
    currentMedications: [
      { name: 'Lithium Carbonate', dose: '450 mg PO BID', status: 'Active & Tolerating' },
      { name: 'Lurasidone (Latuda)', dose: '40 mg PO QPM with 350-calorie meal', status: 'Active & Tolerating' }
    ],
    nursingNotes: 'Patient has packed personal belongings. Interacting well in unit community meetings. Mood euthymic, bright, full affect.',
    dialogue: {
      greeting: "Good morning, doctor! I'm feeling like myself again. My wife is waiting in the discharge lounge to pick me up.",
      probeMeds: "I understand I need to take the Latuda with dinner so it absorbs, and drink plenty of water for the Lithium.",
      probeSafety: "Zero thoughts of harm. Looking forward to going home to my garden.",
      probeInsight: "Complete insight into bipolar disorder and relapse triggers."
    },
    actionOptions: [
      {
        id: 'approve_discharge_orders',
        label: 'Finalize Psychiatric Discharge Summary, Order 30-Day Prescription Supply (Lithium + Latuda), and Coordinate Outpatient Transition',
        category: 'Discharge Psychopharmacology',
        clinicalImpact: 'Prevents rebound mania/depression by ensuring continuous medication supply and strict outpatient handoff.',
        scoreDelta: 30
      }
    ]
  },
  {
    bed: '115',
    id: 'pt-115',
    name: 'Denise Moore',
    age: 41,
    gender: 'Female',
    diagnosis: 'Severe Opioid Use Disorder (Fentanyl) & PTSD with Flashbacks',
    legalStatus: 'Involuntary Civil Hold (Emergency Overdose Revival)',
    legalHoursRemaining: 40,
    legalDetails: 'Admitted post-naloxone reversal. Social work coordinating child protective services and residential programs.',
    observationLevel: '15-Minute Checks',
    acuity: 'High',
    refusingMeds: false,
    medicationRefusalReason: 'Severe opioid withdrawal symptoms.',
    nursingAlert: '⚠️ COWS Score: 14 (Moderate Withdrawal). Dilated pupils, piloerection, nausea, severe bone aches.',
    vitals: { bp: '138/88 mmHg', hr: '102 bpm', temp: '98.7 °F', bmi: '23.0 kg/m²' },
    labs: {
      toxScreen: 'Positive for Fentanyl and Norfentanyl; Negative for Methadone/Buprenorphine',
      pregnancy: 'Negative',
      hepaticPanel: 'AST 38, ALT 42 U/L'
    },
    currentMedications: [
      { name: 'Clonidine', dose: '0.1 mg PO Q6H PRN withdrawal hypertension/sweating', status: 'PRN' },
      { name: 'Ondansetron (Zofran)', dose: '4 mg PO Q8H PRN nausea', status: 'PRN' }
    ],
    nursingNotes: 'Restless, curled in fetal position. Crying over CPS investigation and fear of withdrawal sickness.',
    dialogue: {
      greeting: "Doctor, I feel like my bones are breaking inside. Please help me with the withdrawal. I want to get clean for my baby.",
      probeMeds: "I want to start Suboxone, but I'm terrified of precipitated withdrawal from the street fentanyl.",
      probeSafety: "I don't want to die. The overdose scared me to death.",
      probeInsight: "Desperate for recovery; recognizes addiction has spiraled out of control."
    },
    actionOptions: [
      {
        id: 'buprenorphine_microinduction',
        label: 'Initiate Buprenorphine/Naloxone (Suboxone) Induction Protocol for COWS > 13 or Low-Dose Micro-Induction (Bernese Method)',
        category: 'Addiction Psychopharmacology',
        clinicalImpact: 'Life-saving evidence-based MOUD (Medication for Opioid Use Disorder): decreases post-discharge overdose mortality by > 50%.',
        scoreDelta: 30
      },
      {
        id: 'comfort_med_protocol',
        label: 'Prescribe Non-Opioid Withdrawal Comfort Pack (Clonidine, Ondansetron, Acetaminophen, Loperamide)',
        category: 'Supportive Psychopharmacology',
        clinicalImpact: 'Controls severe noradrenergic autonomic storm and GI distress, preventing early discharge Against Medical Advice.',
        scoreDelta: 20
      }
    ]
  },
  {
    bed: '116',
    id: 'pt-116',
    name: 'Samuel Reed',
    age: 33,
    gender: 'Male',
    diagnosis: 'Schizophrenia with Episodic Catatonic Stupor',
    legalStatus: 'Voluntary (Conservator Assenting)',
    legalHoursRemaining: null,
    legalDetails: 'Admitted in catatonic stupor; responding to Lorazepam.',
    observationLevel: '15-Minute Checks',
    acuity: 'Moderate',
    refusingMeds: false,
    medicationRefusalReason: 'None currently; responding to Lorazepam.',
    nursingAlert: '✨ Remarkable Clinical Response: Bush-Francis score dropped from 18 to 2 following scheduled Lorazepam 2mg IV TID.',
    vitals: { bp: '118/74 mmHg', hr: '76 bpm', temp: '98.2 °F', bmi: '25.0 kg/m²' },
    labs: {
      ck: '210 U/L (Down from 680 on admission)',
      cmp: 'Normal'
    },
    currentMedications: [
      { name: 'Lorazepam (Ativan)', dose: '2 mg PO TID (Transitioned from IV)', status: 'Active & Responding' }
    ],
    nursingNotes: 'Ambulated to dining hall for lunch. Speech is fluent, appropriate, answering all clinical questions. Negativism resolved.',
    dialogue: {
      greeting: "Good morning, doctor. I can actually move today. When the catatonia locks up my body, it feels like I'm trapped behind glass screaming inside.",
      probeMeds: "The Ativan melted the lock. I want to make sure I stay on whatever keeps my limbs moving.",
      probeSafety: "Safe and relieved to be functioning.",
      probeInsight: "Remarkable retrospective insight into his catatonic state."
    },
    actionOptions: [
      {
        id: 'maintain_scheduled_lorazepam',
        label: 'Maintain Scheduled Oral Lorazepam 2mg TID; Strictly Avoid Rapid Taper to Prevent Catastrophic Rebound Stupor',
        category: 'Neuropsychiatric Maintenance',
        clinicalImpact: 'Premature benzodiazepine taper in resolving catatonia leads to catastrophic rebound stupor and autonomic instability.',
        scoreDelta: 30
      },
      {
        id: 'cautious_antipsychotic_reintroduction',
        label: 'Cautiously Re-introduce Low-Potency Atypical Antipsychotic (e.g. Quetiapine or Aripiprazole); Avoid High-Potency D2 Antagonists',
        category: 'Psychopharmacology Safety',
        clinicalImpact: 'High-potency D2 blockers (Haloperidol/Fluphenazine) can precipitate malignant catatonia/NMS in recovering catatonic patients.',
        scoreDelta: 25
      }
    ]
  }
];

export const SIMULATION_PRESETS = [
  {
    id: 'outpatient-solo',
    title: 'Solo Outpatient Practice',
    subtitle: "Monica's Baseline Reality",
    icon: 'UserCheck',
    setting: 'outpatient',
    volume: 1,
    legalStatus: 'Voluntary',
    acuity: 'Moderate',
    description: 'Private 1-on-1 outpatient psychiatric medication evaluation. Paced 45-minute intake, voluntary patient alliance, diagnostic formulation, and long-term 8-week titration follow-up.',
    badge: '1 Patient • Paced Intake',
    color: 'teal'
  },
  {
    id: 'inpatient-residency-16',
    title: 'Acute Inpatient Residency Ward',
    subtitle: 'Psychiatric Prescriber Mission',
    icon: 'Building2',
    setting: 'inpatient',
    volume: 16,
    legalStatus: 'Involuntary Holds & Court Orders',
    acuity: 'Critical & High',
    description: '16-bed locked acute psychiatric unit. Involuntary medication refusals, oral dissolving tablet negotiations vs emergency IM protocols, therapeutic drug monitoring, Clozapine REMS, and attending debrief.',
    badge: '16 Involuntary Beds • Medication Focus',
    color: 'indigo'
  },
  {
    id: 'crisis-ed-triage',
    title: 'Psychiatric Emergency Pod',
    subtitle: 'Acute Crisis Psychopharmacology',
    icon: 'AlertTriangle',
    setting: 'crisis',
    volume: 6,
    legalStatus: 'Acute Civil Holds',
    acuity: 'Critical Surge',
    description: 'Fast-paced Emergency Department psych pod. Rapid agitation de-escalation psychotropics, substance withdrawal protocols, and acute medication stabilization.',
    badge: '6 Acute Bays • Rapid Triage',
    color: 'amber'
  }
];
