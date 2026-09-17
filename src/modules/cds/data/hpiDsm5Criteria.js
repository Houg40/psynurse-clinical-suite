// Complete DSM-5 Diagnostic Criteria for HPI Builder Part 3
// Mapped from Monica's 26 standalone DSM-5 Diagnostic Checklists & dsm5Criteria.json

export const DSM5_DOMAINS = [
  { id: 'all', label: 'All Criteria', short: 'All' },
  { id: 'mdd', label: 'Depression (SIGECAPS)', short: 'MDD' },
  { id: 'gad', label: 'Anxiety (GAD-7)', short: 'GAD' },
  { id: 'adhd_inatt', label: 'ADHD (Inattention)', short: 'ADHD-Inatt' },
  { id: 'adhd_hyper', label: 'ADHD (Hyperactivity)', short: 'ADHD-Hyper' },
  { id: 'bipolar', label: 'Bipolar (DIGFAST)', short: 'Bipolar' },
  { id: 'panic', label: 'Panic & Agoraphobia', short: 'Panic' },
  { id: 'ptsd', label: 'PTSD & Trauma', short: 'PTSD' },
  { id: 'ocd_sleep', label: 'OCD & Sleep', short: 'OCD/Sleep' }
];

export const DSM5_CRITERIA_LIST = [
  // ==========================================
  // 1. MAJOR DEPRESSIVE DISORDER (SIGECAPS)
  // ==========================================
  {
    id: 'dep_core_mood',
    domain: 'mdd',
    code: 'Crit. 1',
    isCore: true,
    label: '[CORE] Depressed mood most of the day nearly every day (sadness, emptiness, tearfulness)',
    narrative: 'persistent depressed mood for the majority of days'
  },
  {
    id: 'dep_anhedonia',
    domain: 'mdd',
    code: 'Crit. 2',
    isCore: true,
    label: '[CORE] Pervasive anhedonia / marked loss of interest or pleasure in almost all activities',
    narrative: 'pervasive anhedonia and loss of interest in previously enjoyed activities'
  },
  {
    id: 'dep_appetite_decreased',
    domain: 'mdd',
    code: 'Crit. 3a',
    isCore: false,
    label: 'Decreased appetite / hyporexia / unintentional weight loss',
    narrative: 'hyporexia with unintentional weight loss'
  },
  {
    id: 'dep_appetite_increased',
    domain: 'mdd',
    code: 'Crit. 3b',
    isCore: false,
    label: 'Increased appetite / hyperphagia / carbohydrate cravings',
    narrative: 'hyperphagia with carbohydrate craving and weight gain'
  },
  {
    id: 'dep_initial_insomnia',
    domain: 'mdd',
    code: 'Crit. 4a',
    isCore: false,
    label: 'Initial insomnia (prolonged sleep latency >60-90 minutes)',
    narrative: 'initial insomnia with sleep onset latency exceeding 90 minutes'
  },
  {
    id: 'dep_early_morning_wake',
    domain: 'mdd',
    code: 'Crit. 4b',
    isCore: false,
    label: 'Terminal insomnia / early morning awakenings (3:00-4:30 AM unable to return to sleep)',
    narrative: 'terminal insomnia with early morning awakenings (3:00-4:00 AM) and rumination'
  },
  {
    id: 'dep_hypersomnia',
    domain: 'mdd',
    code: 'Crit. 4c',
    isCore: false,
    label: 'Hypersomnia (sleeping >10 hours, non-restorative sleep, excessive daytime somnolence)',
    narrative: 'hypersomnia with prolonged unrefreshing sleep and daytime somnolence'
  },
  {
    id: 'dep_psychomotor_slowing',
    domain: 'mdd',
    code: 'Crit. 5a',
    isCore: false,
    label: 'Observable psychomotor retardation (slowed speech, thought, or physical movement)',
    narrative: 'observable psychomotor retardation and physical heaviness'
  },
  {
    id: 'dep_psychomotor_agitation',
    domain: 'mdd',
    code: 'Crit. 5b',
    isCore: false,
    label: 'Observable psychomotor agitation (restlessness, pacing, hand-wringing)',
    narrative: 'observable psychomotor agitation and motor restlessness'
  },
  {
    id: 'dep_low_energy',
    domain: 'mdd',
    code: 'Crit. 6',
    isCore: false,
    label: 'Daily fatigue / loss of physical energy / chronic lethargy',
    narrative: 'daily fatigue and diminished physical vitality'
  },
  {
    id: 'dep_guilt_worthlessness',
    domain: 'mdd',
    code: 'Crit. 7',
    isCore: false,
    label: 'Excessive or inappropriate guilt / feelings of worthlessness / perceived burden',
    narrative: 'excessive feelings of guilt, worthlessness, and perceived inadequacy'
  },
  {
    id: 'dep_poor_concentration',
    domain: 'mdd',
    code: 'Crit. 8',
    isCore: false,
    label: 'Diminished ability to think, focus, or executive indecisiveness',
    narrative: 'concentration deficits, brain fog, and difficulty completing complex executive tasks'
  },
  {
    id: 'dep_suicidal_thoughts',
    domain: 'mdd',
    code: 'Crit. 9',
    isCore: false,
    label: 'Recurrent passive death wishes or suicidal ideation without active plan',
    narrative: 'intermittent passive death wishes without active plan or intent'
  },

  // ==========================================
  // 2. GENERALIZED ANXIETY DISORDER (GAD)
  // ==========================================
  {
    id: 'anx_generalized_worry',
    domain: 'gad',
    code: 'Crit. A',
    isCore: true,
    label: '[CORE] Excessive, uncontrollable anxiety and worry occurring >= 6 months about diverse domains',
    narrative: 'pervasive free-floating worry and difficulty controlling anxious thoughts'
  },
  {
    id: 'anx_difficulty_controlling',
    domain: 'gad',
    code: 'Crit. B',
    isCore: true,
    label: '[CORE] Marked difficulty controlling or stopping anxious cognitive worry cycles',
    narrative: 'marked difficulty controlling intrusive cognitive worry loops'
  },
  {
    id: 'anx_restlessness',
    domain: 'gad',
    code: 'Crit. C1',
    isCore: false,
    label: 'Restlessness, keyed up, or feeling constantly on edge',
    narrative: 'motor restlessness and feeling chronically on edge'
  },
  {
    id: 'anx_easy_fatigue',
    domain: 'gad',
    code: 'Crit. C2',
    isCore: false,
    label: 'Easily fatigued / mental exhaustion under minimal stress',
    narrative: 'rapid mental exhaustion and low frustration stamina under stress'
  },
  {
    id: 'anx_mind_blank',
    domain: 'gad',
    code: 'Crit. C3',
    isCore: false,
    label: 'Difficulty concentrating or mind going completely blank under anxious strain',
    narrative: 'episodes of cognitive freeze and mind going blank under stress'
  },
  {
    id: 'anx_irritability',
    domain: 'gad',
    code: 'Crit. C4',
    isCore: false,
    label: 'Heightened irritability and low frustration tolerance',
    narrative: 'diminished frustration tolerance and interpersonal irritability'
  },
  {
    id: 'anx_physical_tension',
    domain: 'gad',
    code: 'Crit. C5',
    isCore: false,
    label: 'Somatic muscle tension (cervical/trapezius tightness, jaw clenching, tension headaches)',
    narrative: 'somatic muscle tension including cervical/trapezius tightness and jaw clenching'
  },
  {
    id: 'anx_sleep_disturbance',
    domain: 'gad',
    code: 'Crit. C6',
    isCore: false,
    label: 'Sleep disturbance (difficulty falling/staying asleep, restless unsatisfying sleep)',
    narrative: 'restless, unrefreshing sleep disrupted by anxious rumination'
  },
  {
    id: 'anx_social_avoidance',
    domain: 'gad',
    code: 'Assoc.',
    isCore: false,
    label: 'Social isolation and avoidance of interpersonal or public situations',
    narrative: 'social withdrawal and avoidance of interpersonal interactions'
  },

  // ==========================================
  // 3. ADULT ADHD - INATTENTION (CRITERION A1)
  // ==========================================
  {
    id: 'adhd_careless_mistakes',
    domain: 'adhd_inatt',
    code: 'A1a',
    isCore: false,
    label: 'Careless mistakes / overlooks details in schoolwork, work, or paperwork',
    narrative: 'frequent careless errors and overlooking critical details in occupational paperwork'
  },
  {
    id: 'adhd_sustaining_attention',
    domain: 'adhd_inatt',
    code: 'A1b',
    isCore: false,
    label: 'Difficulty sustaining focus in meetings, lectures, conversations, or lengthy reading',
    narrative: 'marked difficulty sustaining attention during meetings, conversations, and lengthy reading'
  },
  {
    id: 'adhd_mind_elsewhere',
    domain: 'adhd_inatt',
    code: 'A1c',
    isCore: false,
    label: 'Mind seems elsewhere / does not seem to listen when spoken to directly',
    narrative: 'frequent internal mind-wandering and zoning out even when spoken to directly'
  },
  {
    id: 'adhd_poor_followthrough',
    domain: 'adhd_inatt',
    code: 'A1d',
    isCore: false,
    label: 'Poor follow-through on instructions / starts tasks but quickly sidetracked',
    narrative: 'poor follow-through on multi-step instructions and rapid task abandonment'
  },
  {
    id: 'adhd_disorganization',
    domain: 'adhd_inatt',
    code: 'A1e',
    isCore: false,
    label: 'Difficulty organizing tasks, poor time management, messy work, missed deadlines',
    narrative: 'chronic executive disorganization, impaired time management, and missed deadlines'
  },
  {
    id: 'adhd_avoids_mental_effort',
    domain: 'adhd_inatt',
    code: 'A1f',
    isCore: false,
    label: 'Avoidance / severe procrastination on tasks requiring sustained mental effort (forms, reports)',
    narrative: 'pronounced avoidance and executive paralysis on tasks requiring sustained cognitive effort'
  },
  {
    id: 'adhd_loses_items',
    domain: 'adhd_inatt',
    code: 'A1g',
    isCore: false,
    label: 'Frequently loses necessary items (keys, wallet, phone, eyeglasses, documents)',
    narrative: 'frequent misplacement of necessary daily items (keys, phone, paperwork)'
  },
  {
    id: 'adhd_easily_distracted',
    domain: 'adhd_inatt',
    code: 'A1h',
    isCore: false,
    label: 'Easily distracted by extraneous background stimuli or unrelated internal thoughts',
    narrative: 'high distractibility by extraneous environmental stimuli and intrusive tangent thoughts'
  },
  {
    id: 'adhd_forgetful_daily',
    domain: 'adhd_inatt',
    code: 'A1i',
    isCore: false,
    label: 'Forgetful in daily activities (returning phone calls, paying bills, appointments, errands)',
    narrative: 'chronic forgetfulness in routine daily obligations, bill paying, and scheduling'
  },

  // ==========================================
  // 4. ADULT ADHD - HYPERACTIVITY & IMPULSIVITY (CRITERION A2)
  // ==========================================
  {
    id: 'adhd_fidgets',
    domain: 'adhd_hyper',
    code: 'A2a',
    isCore: false,
    label: 'Fidgets with or taps hands/feet, or squirms in seat during sedentary tasks',
    narrative: 'motor fidgeting with hands, feet, and postural squirming'
  },
  {
    id: 'adhd_leaves_seat',
    domain: 'adhd_hyper',
    code: 'A2b',
    isCore: false,
    label: 'Leaves seat in situations when remaining seated is expected (workplace, meetings, meals)',
    narrative: 'difficulty remaining seated in meetings, work sessions, or meals'
  },
  {
    id: 'adhd_restless_inner',
    domain: 'adhd_hyper',
    code: 'A2c',
    isCore: false,
    label: 'Inner restlessness / uncomfortable being still for extended periods',
    narrative: 'subjective internal motor restlessness and discomfort with sedentary tasks'
  },
  {
    id: 'adhd_quiet_difficulty',
    domain: 'adhd_hyper',
    code: 'A2d',
    isCore: false,
    label: 'Unable to play or engage in leisure activities quietly / difficulty unwinding',
    narrative: 'inability to unwind or engage quietly in leisure activities'
  },
  {
    id: 'adhd_driven_by_motor',
    domain: 'adhd_hyper',
    code: 'A2e',
    isCore: false,
    label: 'Often "on the go", acting as if "driven by a motor" (hard for others to keep up with)',
    narrative: 'feeling constantly on the go as if driven by an internal motor'
  },
  {
    id: 'adhd_talks_excessively',
    domain: 'adhd_hyper',
    code: 'A2f',
    isCore: false,
    label: 'Talks excessively in social, workplace, or conversational contexts',
    narrative: 'hyper-verbal communication and talking excessively'
  },
  {
    id: 'adhd_blurts_answers',
    domain: 'adhd_hyper',
    code: 'A2g',
    isCore: false,
    label: 'Blurts out answers before questions finished / completes others\' sentences',
    narrative: 'impulsive blurting of responses and finishing others\' sentences'
  },
  {
    id: 'adhd_difficulty_waiting',
    domain: 'adhd_hyper',
    code: 'A2h',
    isCore: false,
    label: 'Difficulty waiting turn in queues, conversations, or traffic',
    narrative: 'marked impatience and difficulty waiting turn in queues or conversational turn-taking'
  },
  {
    id: 'adhd_interrupts',
    domain: 'adhd_hyper',
    code: 'A2i',
    isCore: false,
    label: 'Interrupts or intrudes on others (butts into conversations, games, or tasks)',
    narrative: 'impulsive interruption and intrusion into others\' conversations or tasks'
  },

  // ==========================================
  // 5. BIPOLAR SPECTRUM / MANIA (DIGFAST)
  // ==========================================
  {
    id: 'bip_elevated_mood',
    domain: 'bipolar',
    code: 'Crit. A',
    isCore: true,
    label: '[CORE] Distinct period of abnormally and persistently elevated, expansive, or irritable mood',
    narrative: 'discrete periods of abnormally elevated, expansive, or severe irritable mood'
  },
  {
    id: 'bip_grandiosity',
    domain: 'bipolar',
    code: 'DIGFAST G',
    isCore: false,
    label: 'Grandiosity / inflated self-esteem uncharacteristic of baseline',
    narrative: 'grandiosity and inflated self-esteem uncharacteristic of baseline'
  },
  {
    id: 'bip_decreased_sleep',
    domain: 'bipolar',
    code: 'DIGFAST S',
    isCore: false,
    label: 'Decreased need for sleep (feeling fully rested and energized after only 2-3 hours)',
    narrative: 'marked decreased need for sleep feeling completely energized on 2-3 hours'
  },
  {
    id: 'bip_pressured_speech',
    domain: 'bipolar',
    code: 'DIGFAST T',
    isCore: false,
    label: 'Pressured speech / unusually talkative / difficult to interrupt',
    narrative: 'rapid pressured speech with high communicative urgency'
  },
  {
    id: 'bip_racing_thoughts',
    domain: 'bipolar',
    code: 'DIGFAST F',
    isCore: false,
    label: 'Flight of ideas / subjective experience that thoughts are racing and crowded',
    narrative: 'subjective racing thoughts and rapid flight of ideas'
  },
  {
    id: 'bip_distractibility',
    domain: 'bipolar',
    code: 'DIGFAST D',
    isCore: false,
    label: 'Distractibility (attention easily drawn to unimportant or irrelevant external stimuli)',
    narrative: 'pronounced distractibility with rapid shifting between unrelated topics'
  },
  {
    id: 'bip_goal_directed',
    domain: 'bipolar',
    code: 'DIGFAST A',
    isCore: false,
    label: 'Surge in goal-directed activity (occupational, creative, social) or psychomotor agitation',
    narrative: 'surges in goal-directed nocturnal projects and psychomotor activation'
  },
  {
    id: 'bip_high_risk_activities',
    domain: 'bipolar',
    code: 'DIGFAST I',
    isCore: false,
    label: 'Excessive involvement in high-risk activities (spending sprees, reckless driving, indiscretions)',
    narrative: 'impulsive engagement in high-risk financial or behavioral ventures'
  },

  // ==========================================
  // 6. PANIC DISORDER & AGORAPHOBIA
  // ==========================================
  {
    id: 'panic_recurrent_attacks',
    domain: 'panic',
    code: 'Crit. A',
    isCore: true,
    label: '[CORE] Recurrent unexpected panic attacks with sudden surge of intense fear peaking within minutes',
    narrative: 'recurrent unexpected panic attacks peaking within 10 minutes with intense terror'
  },
  {
    id: 'panic_palpitations',
    domain: 'panic',
    code: 'Sym. 1',
    isCore: false,
    label: 'Palpitations, pounding heart, or accelerated tachycardia',
    narrative: 'severe palpitations and tachycardia'
  },
  {
    id: 'panic_sweating',
    domain: 'panic',
    code: 'Sym. 2',
    isCore: false,
    label: 'Diaphoresis / profuse sweating or cold clamminess',
    narrative: 'diaphoresis and cold clammy extremities'
  },
  {
    id: 'panic_trembling',
    domain: 'panic',
    code: 'Sym. 3',
    isCore: false,
    label: 'Gross physical trembling or uncontrollable shaking',
    narrative: 'gross tremors and physical shaking'
  },
  {
    id: 'panic_shortness_breath',
    domain: 'panic',
    code: 'Sym. 4',
    isCore: false,
    label: 'Sensations of shortness of breath, dyspnea, or smothering',
    narrative: 'dyspnea and feeling smothered'
  },
  {
    id: 'panic_choking',
    domain: 'panic',
    code: 'Sym. 5',
    isCore: false,
    label: 'Feelings of choking or throat tightness (globus hystericus)',
    narrative: 'throat constriction and choking sensation'
  },
  {
    id: 'panic_chest_pain',
    domain: 'panic',
    code: 'Sym. 6',
    isCore: false,
    label: 'Precordial chest pain, tightness, or pressure',
    narrative: 'precordial chest tightness and discomfort'
  },
  {
    id: 'panic_nausea',
    domain: 'panic',
    code: 'Sym. 7',
    isCore: false,
    label: 'Nausea or acute abdominal/gastrointestinal distress',
    narrative: 'nausea and acute gastrointestinal distress'
  },
  {
    id: 'panic_dizziness',
    domain: 'panic',
    code: 'Sym. 8',
    isCore: false,
    label: 'Feeling dizzy, unsteady, lightheaded, or faint',
    narrative: 'dizziness, unsteadiness, and near-syncope sensations'
  },
  {
    id: 'panic_chills_heat',
    domain: 'panic',
    code: 'Sym. 9',
    isCore: false,
    label: 'Chills or sudden hot flushes',
    narrative: 'chills and alternating hot flushes'
  },
  {
    id: 'panic_paresthesias',
    domain: 'panic',
    code: 'Sym. 10',
    isCore: false,
    label: 'Paresthesias (numbness or tingling sensations in fingers, face, or toes)',
    narrative: 'perioral and digital paresthesias'
  },
  {
    id: 'panic_derealization',
    domain: 'panic',
    code: 'Sym. 11',
    isCore: false,
    label: 'Derealization (feelings of unreality) or depersonalization (detached from self)',
    narrative: 'derealization and depersonalization with feelings of unreality'
  },
  {
    id: 'panic_fear_control',
    domain: 'panic',
    code: 'Sym. 12',
    isCore: false,
    label: 'Fear of losing control or "going crazy"',
    narrative: 'acute fear of losing control or cognitive stability'
  },
  {
    id: 'panic_fear_dying',
    domain: 'panic',
    code: 'Sym. 13',
    isCore: false,
    label: 'Fear of dying / impending catastrophic doom during acute attack',
    narrative: 'impending sense of catastrophic doom and fear of dying'
  },
  {
    id: 'panic_anticipatory_worry',
    domain: 'panic',
    code: 'Crit. B',
    isCore: false,
    label: 'Persistent concern or anticipatory anxiety about subsequent attacks',
    narrative: 'chronic anticipatory dread regarding the recurrence of panic attacks'
  },
  {
    id: 'agora_avoidance',
    domain: 'panic',
    code: 'Agora',
    isCore: false,
    label: 'Agoraphobic avoidance of public transit, open spaces, enclosed places, lines, or leaving home alone',
    narrative: 'marked agoraphobic avoidance of crowded settings, public transit, and enclosed spaces'
  },

  // ==========================================
  // 7. PTSD & TRAUMA INTRUSIONS
  // ==========================================
  {
    id: 'ptsd_trauma_exposure',
    domain: 'ptsd',
    code: 'Crit. A',
    isCore: true,
    label: '[CORE Criterion A] Exposure to actual or threatened death, serious injury, or sexual violence',
    narrative: 'documented history of Criterion A traumatic exposure'
  },
  {
    id: 'ptsd_intrusive_memories',
    domain: 'ptsd',
    code: 'Crit. B1',
    isCore: false,
    label: 'Recurrent, involuntary, and intrusive distressing memories of traumatic event',
    narrative: 'intrusive, involuntary waking trauma memories'
  },
  {
    id: 'ptsd_nightmares',
    domain: 'ptsd',
    code: 'Crit. B2',
    isCore: false,
    label: 'Recurrent distressing dreams / nightmares related to the traumatic event',
    narrative: 'frequent trauma-related nightmares and disrupted sleep'
  },
  {
    id: 'ptsd_flashbacks',
    domain: 'ptsd',
    code: 'Crit. B3',
    isCore: false,
    label: 'Dissociative flashback reactions (acting or feeling as if trauma is recurring in present)',
    narrative: 'dissociative flashbacks and acute reliving episodes'
  },
  {
    id: 'ptsd_cue_reactivity',
    domain: 'ptsd',
    code: 'Crit. B4/5',
    isCore: false,
    label: 'Intense psychological distress or physiologic reactivity at exposure to trauma cues/triggers',
    narrative: 'intense physiologic reactivity and affective distress upon exposure to trauma reminders'
  },
  {
    id: 'ptsd_avoidance',
    domain: 'ptsd',
    code: 'Crit. C',
    isCore: false,
    label: 'Persistent active avoidance of distressing trauma memories, thoughts, places, or reminders',
    narrative: 'pervasive active avoidance of trauma-related triggers, locations, and conversations'
  },
  {
    id: 'ptsd_negative_cognitions',
    domain: 'ptsd',
    code: 'Crit. D',
    isCore: false,
    label: 'Negative alterations in cognitions & mood (persistent guilt, detachment, emotional blunting)',
    narrative: 'negative cognitive shifts including pervasive guilt, emotional detachment, and anhedonia'
  },
  {
    id: 'ptsd_hypervigilance',
    domain: 'ptsd',
    code: 'Crit. E',
    isCore: false,
    label: 'Marked hyperarousal: hypervigilance, exaggerated startle response, irritable outbursts',
    narrative: 'hypervigilance, exaggerated startle response, and autonomic hyperarousal'
  },

  // ==========================================
  // 8. OCD & SLEEP ARCHITECTURE
  // ==========================================
  {
    id: 'ocd_obsessions',
    domain: 'ocd_sleep',
    code: 'OCD Obs.',
    isCore: false,
    label: 'Ego-dystonic intrusive, unwanted, persistent thoughts, urges, or images causing marked anxiety',
    narrative: 'ego-dystonic intrusive thoughts and obsessive mental doubts'
  },
  {
    id: 'ocd_compulsions',
    domain: 'ocd_sleep',
    code: 'OCD Comp.',
    isCore: false,
    label: 'Repetitive behaviors (washing, checking, ordering) or mental acts performed to reduce distress',
    narrative: 'repetitive ritualistic compulsive behaviors performed to neutralize anxiety'
  },
  {
    id: 'sleep_initial_insomnia',
    domain: 'ocd_sleep',
    code: 'Sleep Init.',
    isCore: false,
    label: 'Prolonged sleep onset latency exceeding 60-90 minutes with cognitive racing',
    narrative: 'sleep onset latency exceeding 60-90 minutes'
  },
  {
    id: 'sleep_middle_waking',
    domain: 'ocd_sleep',
    code: 'Sleep Mid.',
    isCore: false,
    label: 'Frequent middle-of-the-night nocturnal awakenings with difficulty returning to sleep',
    narrative: 'frequent middle-of-the-night nocturnal awakenings with difficulty returning to sleep'
  },
  {
    id: 'sleep_terminal_insomnia',
    domain: 'ocd_sleep',
    code: 'Sleep Term.',
    isCore: false,
    label: 'Terminal early morning awakenings (3:00-4:30 AM) with immediate dysphoric rumination',
    narrative: 'terminal early morning awakenings with rumination'
  },
  {
    id: 'sleep_nonrestorative',
    domain: 'ocd_sleep',
    code: 'Sleep Frag.',
    isCore: false,
    label: 'Subjective non-restorative unrefreshing sleep despite adequate nocturnal duration',
    narrative: 'subjective non-restorative and fragmented sleep architecture'
  },
  {
    id: 'sleep_hypersomnia',
    domain: 'ocd_sleep',
    code: 'Sleep Hyper.',
    isCore: false,
    label: 'Hypersomnia / prolonged sleep (>10 hrs) and severe morning grogginess / somnolence',
    narrative: 'hypersomnia and excessive daytime somnolence'
  }
];

// Calculate diagnostic endorsement counts and clinical threshold status
export function calculateDiagnosticStatus(selectedItems = {}) {
  // MDD (Requires >= 5 of 9 including Core Mood or Anhedonia)
  const mddCoreEndorsed = !!(selectedItems['dep_core_mood'] || selectedItems['dep_anhedonia']);
  const mddCriteria = [
    'dep_core_mood',
    'dep_anhedonia',
    selectedItems['dep_appetite_decreased'] || selectedItems['dep_appetite_increased'],
    selectedItems['dep_initial_insomnia'] || selectedItems['dep_early_morning_wake'] || selectedItems['dep_hypersomnia'],
    selectedItems['dep_psychomotor_slowing'] || selectedItems['dep_psychomotor_agitation'],
    'dep_low_energy',
    'dep_guilt_worthlessness',
    'dep_poor_concentration',
    'dep_suicidal_thoughts'
  ];
  const mddCount = mddCriteria.filter(k => typeof k === 'boolean' ? k : !!selectedItems[k]).length;
  const mddThresholdMet = mddCount >= 5 && mddCoreEndorsed;

  // GAD (Requires Core worry + >= 3 of 6 somatic items)
  const gadCoreEndorsed = !!(selectedItems['anx_generalized_worry'] || selectedItems['anx_difficulty_controlling']);
  const gadSomaticItems = [
    'anx_restlessness',
    'anx_easy_fatigue',
    'anx_mind_blank',
    'anx_irritability',
    'anx_physical_tension',
    'anx_sleep_disturbance'
  ];
  const gadSomaticCount = gadSomaticItems.filter(k => !!selectedItems[k]).length;
  const gadThresholdMet = gadCoreEndorsed && gadSomaticCount >= 3;

  // ADHD Inattentive (Adult threshold: >= 5 of 9)
  const adhdInattItems = [
    'adhd_careless_mistakes',
    'adhd_sustaining_attention',
    'adhd_mind_elsewhere',
    'adhd_poor_followthrough',
    'adhd_disorganization',
    'adhd_avoids_mental_effort',
    'adhd_loses_items',
    'adhd_easily_distracted',
    'adhd_forgetful_daily'
  ];
  const adhdInattCount = adhdInattItems.filter(k => !!selectedItems[k]).length;
  const adhdInattMet = adhdInattCount >= 5;

  // ADHD Hyperactive/Impulsive (Adult threshold: >= 5 of 9)
  const adhdHyperItems = [
    'adhd_fidgets',
    'adhd_leaves_seat',
    'adhd_restless_inner',
    'adhd_quiet_difficulty',
    'adhd_driven_by_motor',
    'adhd_talks_excessively',
    'adhd_blurts_answers',
    'adhd_difficulty_waiting',
    'adhd_interrupts'
  ];
  const adhdHyperCount = adhdHyperItems.filter(k => !!selectedItems[k]).length;
  const adhdHyperMet = adhdHyperCount >= 5;

  // Bipolar DIGFAST (>= 3 of 7 signs)
  const bipolarItems = [
    'bip_elevated_mood',
    'bip_grandiosity',
    'bip_decreased_sleep',
    'bip_pressured_speech',
    'bip_racing_thoughts',
    'bip_distractibility',
    'bip_goal_directed',
    'bip_high_risk_activities'
  ];
  const bipolarCount = bipolarItems.filter(k => !!selectedItems[k]).length;
  const bipolarThreshold = bipolarCount >= 3;

  // Panic Attack Symptoms (>= 4 of 13 physical symptoms)
  const panicSomaticItems = [
    'panic_palpitations',
    'panic_sweating',
    'panic_trembling',
    'panic_shortness_breath',
    'panic_choking',
    'panic_chest_pain',
    'panic_nausea',
    'panic_dizziness',
    'panic_chills_heat',
    'panic_paresthesias',
    'panic_derealization',
    'panic_fear_control',
    'panic_fear_dying'
  ];
  const panicSomaticCount = panicSomaticItems.filter(k => !!selectedItems[k]).length;
  const panicAttackMet = panicSomaticCount >= 4;

  // PTSD Symptoms
  const ptsdItems = [
    'ptsd_trauma_exposure',
    'ptsd_intrusive_memories',
    'ptsd_nightmares',
    'ptsd_flashbacks',
    'ptsd_cue_reactivity',
    'ptsd_avoidance',
    'ptsd_negative_cognitions',
    'ptsd_hypervigilance'
  ];
  const ptsdCount = ptsdItems.filter(k => !!selectedItems[k]).length;

  return {
    mdd: {
      count: mddCount,
      total: 9,
      thresholdMet: mddThresholdMet,
      coreMet: mddCoreEndorsed,
      label: mddThresholdMet ? 'MDD Threshold Met' : mddCount >= 5 ? 'Need Core Mood/Anhedonia' : `${mddCount}/9 Symptoms`
    },
    gad: {
      count: gadSomaticCount,
      total: 6,
      thresholdMet: gadThresholdMet,
      label: gadThresholdMet ? 'GAD Threshold Met' : `${gadSomaticCount}/6 Somatic`
    },
    adhdInatt: {
      count: adhdInattCount,
      total: 9,
      thresholdMet: adhdInattMet,
      label: adhdInattMet ? 'Inattentive Threshold Met' : `${adhdInattCount}/9 Inattentive`
    },
    adhdHyper: {
      count: adhdHyperCount,
      total: 9,
      thresholdMet: adhdHyperMet,
      label: adhdHyperMet ? 'Hyperactive Threshold Met' : `${adhdHyperCount}/9 Hyperactive`
    },
    bipolar: {
      count: bipolarCount,
      total: 8,
      thresholdMet: bipolarThreshold,
      label: bipolarThreshold ? 'Bipolar Warning (3+)' : `${bipolarCount}/8 DIGFAST`
    },
    panic: {
      count: panicSomaticCount,
      total: 13,
      thresholdMet: panicAttackMet,
      label: panicAttackMet ? 'Panic Attack Met (4+)' : `${panicSomaticCount}/13 Somatic`
    },
    ptsd: {
      count: ptsdCount,
      total: 8,
      thresholdMet: ptsdCount >= 4,
      label: `${ptsdCount}/8 Trauma Signs`
    }
  };
}
