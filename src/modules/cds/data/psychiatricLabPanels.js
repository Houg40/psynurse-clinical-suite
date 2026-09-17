/**
 * Standard Psychiatric Laboratory Panels & Order Requisition Data
 * Designed for Monica Preder, ARNP, PMHNP-BC
 * Adult Outpatient & Telehealth Psychiatric Practice (Washington State)
 * 
 * Provides clinical rationale, specimen fasting rules, action thresholds,
 * and ICD-10 medical necessity justification codes to safeguard patients
 * from unexpected insurance denials.
 */

export const LAB_TIERS = [
  {
    id: 'tier1',
    name: 'Tier 1: Universal Psychiatric & Metabolic Baseline',
    shortName: 'Universal Baseline',
    badge: '100% of Patients',
    badgeColor: 'emerald',
    description: 'Mandatory standard of care baseline for all psychiatric intakes and SGA/Lithium starts. Almost universally covered by commercial insurance, Medicare, and WA Apple Health under routine psychiatric codes.',
    insuranceRisk: 'Zero / Extremely Low'
  },
  {
    id: 'tier2',
    name: 'Tier 2: Neuro-Nutrient & Metabolic Cofactors',
    shortName: 'Neuro-Nutrients',
    badge: 'Fatigue / Inattention / Mood',
    badgeColor: 'sky',
    description: 'Micronutrient and cofactor panel ruling out reversible causes of cognitive slowing, treatment-resistant depression, and fatigue. Requires pairing with specific symptom ICD-10 codes to prevent non-coverage.',
    insuranceRisk: 'Low (when paired with symptom ICD-10 codes)'
  },
  {
    id: 'tier3',
    name: 'Tier 3: Endocrine & Reproductive Hormone Stratum',
    shortName: 'Reproductive & Hormonal',
    badge: 'Cycle / Perimenopause / SGA Safety',
    badgeColor: 'purple',
    description: 'Targeted endocrine evaluation for female patients with cycle-linked mood shifts (PMDD), perimenopausal exacerbation, or antipsychotic-induced hyperprolactinemia. High risk of insurance rejection if ordered without specific gynecological/endocrine diagnostic codes.',
    insuranceRisk: 'Moderate to High (requires specific endocrine/cycle ICD-10 codes)'
  }
];

export const PSYCHIATRIC_LAB_TESTS = [
  // ================= TIER 1: UNIVERSAL BASELINE =================
  {
    id: 'a1c',
    tierId: 'tier1',
    name: 'Hemoglobin A1c (HbA1c)',
    alternativeNames: 'Glycated Hemoglobin, Glycohemoglobin',
    cptCode: '83036',
    fastingRequired: false,
    fastingNote: 'Non-fasting acceptable (measures 3-month glycemic average).',
    specimen: 'Whole Blood (Lavender / EDTA tube)',
    psychiatricRationale: 'Evaluates chronic glycemic control. Mandatory baseline before and during treatment with second-generation antipsychotics (SGAs) associated with insulin resistance and diabetes (Olanzapine, Quetiapine, Clozapine, Risperidone). Rules out diabetic microvascular cognitive impairment causing impaired executive function, reduced sustained attention, and sluggish processing speed.',
    normalRange: '< 5.7% (Normal)',
    actionThresholds: [
      { range: '5.7% – 6.4%', interpretation: 'Pre-diabetes / Impaired Fasting Glycemia', action: 'Recommend metabolic-neutral psychotropics (Aripiprazole, Ziprasidone, Lurasidone). PCP referral for lifestyle/dietary intervention.' },
      { range: '≥ 6.5%', interpretation: 'Presumptive Diabetes Mellitus', action: 'Urgent PCP referral for glycemic management. Avoid high-metabolic-risk SGAs. Repeat every 3–6 months.' }
    ],
    icd10Justifications: [
      { code: 'F32.9', desc: 'Major depressive disorder, single episode, unspecified' },
      { code: 'F41.1', desc: 'Generalized anxiety disorder' },
      { code: 'F90.0', desc: 'ADHD, predominantly inattentive type (processing speed rule-out)' },
      { code: 'Z79.899', desc: 'Other long-term drug therapy (monitoring antipsychotic/psychotropic therapy)' },
      { code: 'R53.83', desc: 'Other fatigue (fatigue/malaise workup)' }
    ]
  },
  {
    id: 'lipid_panel',
    tierId: 'tier1',
    name: 'Lipid Panel (Cardiovascular / Metabolic Risk)',
    alternativeNames: 'Fasting Lipids: Total Cholesterol, HDL, LDL, Triglycerides, VLDL',
    cptCode: '80061',
    fastingRequired: true,
    fastingNote: 'Fasting 9–12 hours preferred for accurate triglycerides and calculated LDL.',
    specimen: 'Serum (SST Gold or Tiger Top)',
    psychiatricRationale: 'APA and ADA consensus guidelines require baseline and periodic lipid monitoring for any patient initiated on second-generation antipsychotics or mood stabilizers. Atypical antipsychotics frequently induce severe hypertriglyceridemia and dyslipidemia independent of weight gain.',
    normalRange: 'Total Chol < 200 mg/dL • LDL < 100 mg/dL • HDL > 40 (men) / > 50 (women) • Triglycerides < 150 mg/dL',
    actionThresholds: [
      { range: 'Triglycerides 150–499 mg/dL', interpretation: 'Moderate Hypertriglyceridemia', action: 'Re-evaluate psychotropic regimen for metabolic neutral alternatives. Recommend omega-3 fatty acid supplementation.' },
      { range: 'Triglycerides ≥ 500 mg/dL', interpretation: 'Severe Hypertriglyceridemia (Pancreatitis Risk)', action: 'Urgent medical management required; reconsider high-risk SGA (Olanzapine/Quetiapine).' }
    ],
    icd10Justifications: [
      { code: 'Z79.899', desc: 'Other long-term drug therapy (antipsychotic metabolic surveillance)' },
      { code: 'F31.9', desc: 'Bipolar disorder, unspecified' },
      { code: 'F32.9', desc: 'Major depressive disorder, unspecified' },
      { code: 'E78.5', desc: 'Hyperlipidemia, unspecified' }
    ]
  },
  {
    id: 'tsh_ft4',
    tierId: 'tier1',
    name: 'TSH with Reflex to Free T4 (Thyroid Cascade)',
    alternativeNames: 'Thyroid Stimulating Hormone with Free Thyroxine',
    cptCode: '84443 (TSH), 84439 (Free T4)',
    fastingRequired: false,
    fastingNote: 'Fasting not required. Morning draw preferred due to diurnal TSH variation.',
    specimen: 'Serum (SST Gold or Tiger Top)',
    psychiatricRationale: 'Primary medical rule-out in psychiatry. Hypothyroidism is the leading organic mimic of Major Depression (lethargy, anhedonia, cognitive fog, verbal memory decline, visuospatial processing deficits). Hyperthyroidism mimics panic disorder, acute anxiety, insomnia, and mania. Mandatory baseline and semi-annual surveillance before starting Lithium.',
    normalRange: 'TSH: 0.4 – 4.0 mIU/L • Free T4: 0.8 – 1.8 ng/dL',
    actionThresholds: [
      { range: 'TSH > 4.5 mIU/L with normal FT4', interpretation: 'Subclinical Hypothyroidism', action: 'Can drive refractory depression and cognitive fatigue. Consider endocrinology/PCP consult for Levothyroxine trial.' },
      { range: 'TSH > 10.0 mIU/L or low FT4', interpretation: 'Overt Hypothyroidism', action: 'Primary etiology of affective symptoms until medically corrected. Treat thyroid disorder prior to finalizing psychiatric diagnosis.' },
      { range: 'TSH < 0.3 mIU/L', interpretation: 'Hyperthyroidism / Thyrotoxicosis', action: 'Etiology of tachycardia, panic attacks, insomnia, and psychomotor agitation. Order Free T3/T4, refer to PCP.' }
    ],
    icd10Justifications: [
      { code: 'F32.9', desc: 'Major depressive disorder, unspecified' },
      { code: 'F41.1', desc: 'Generalized anxiety disorder' },
      { code: 'R53.83', desc: 'Other fatigue' },
      { code: 'E03.9', desc: 'Hypothyroidism, unspecified' },
      { code: 'Z79.899', desc: 'Long term psychotropic monitoring (Lithium baseline)' }
    ]
  },
  {
    id: 'cbc_diff',
    tierId: 'tier1',
    name: 'Complete Blood Count (CBC) with Differential',
    alternativeNames: 'Hemogram with 5-part differential, Hemoglobin & Hematocrit',
    cptCode: '85025',
    fastingRequired: false,
    fastingNote: 'Non-fasting.',
    specimen: 'Whole Blood (Lavender / EDTA tube)',
    psychiatricRationale: 'Screens for microcytic or macrocytic anemia driving profound fatigue, apathy, poor concentration, and orthostasis. Establishes baseline White Blood Count (WBC) and Absolute Neutrophil Count (ANC) prior to initiating psychotropics with known hematologic dyscrasia risks (Carbamazepine, Valproate, Clozapine, Mirtazapine). Rules out occult systemic infection causing delirium/mood changes.',
    normalRange: 'WBC: 4.5–11.0 ×10³/µL • Hgb: 12.0–15.5 g/dL (F) / 13.5–17.5 g/dL (M) • Platelets: 150–450 ×10³/µL • ANC: > 1,500 /µL',
    actionThresholds: [
      { range: 'Hemoglobin < 11.0 g/dL', interpretation: 'Anemia', action: 'Evaluate MCV; order Ferritin, Iron Saturation, B12, and Folate to differentiate microcytic vs. macrocytic anemia.' },
      { range: 'WBC < 3.5 ×10³/µL or ANC < 1,500', interpretation: 'Leukopenia / Neutropenia', action: 'Contraindicates Carbamazepine. If on Clozapine, triggers mandatory Clozapine REMS interruption protocol.' },
      { range: 'WBC > 12.0 ×10³/µL', interpretation: 'Leukocytosis', action: 'Rule out occult urinary tract infection, pneumonia, or systemic infection before diagnosing acute psychiatric decompensation.' }
    ],
    icd10Justifications: [
      { code: 'F32.9', desc: 'Major depressive disorder, unspecified' },
      { code: 'R53.83', desc: 'Other fatigue' },
      { code: 'D64.9', desc: 'Anemia, unspecified' },
      { code: 'Z79.899', desc: 'Other long-term drug therapy monitoring' }
    ]
  },
  {
    id: 'cmp_14',
    tierId: 'tier1',
    name: 'Comprehensive Metabolic Panel (CMP-14)',
    alternativeNames: 'Chemistry 14: Sodium, Potassium, Chloride, CO2, Glucose, BUN, Creatinine, Calcium, Albumin, Total Protein, ALT, AST, Alk Phos, Bilirubin',
    cptCode: '80053',
    fastingRequired: true,
    fastingNote: 'Fasting 8–12 hours preferred for fasting glucose evaluation (can be drawn non-fasting if urgent for electrolytes).',
    specimen: 'Serum (SST Gold or Tiger Top)',
    psychiatricRationale: 'Critical multi-system assessment: (1) Renal function (BUN, Creatinine, eGFR) mandatory before and during Lithium, Gabapentin, or Pregabalin therapy; (2) Hepatic enzymes (ALT, AST, Alk Phos) baseline for Valproate (hepatotoxicity black box), Duloxetine, Lamotrigine, and CYP450 clearance; (3) Electrolytes (Sodium: hyponatremia from SSRI/SNRI-induced SIADH, especially in elderly; Potassium: cardiac QTc risk; Calcium: hypercalcemia causes depression/confusion, hypocalcemia causes anxiety/tetany).',
    normalRange: 'Na: 135–145 mmol/L • K: 3.5–5.0 mmol/L • Creatinine: 0.6–1.2 mg/dL • BUN: 7–20 mg/dL • ALT: 7–56 U/L • AST: 10–40 U/L • Calcium: 8.5–10.2 mg/dL',
    actionThresholds: [
      { range: 'Sodium < 132 mmol/L', interpretation: 'Hyponatremia (SIADH Suspicion)', action: 'High alert if on SSRIs (Escitalopram, Sertraline). Evaluate volume status, urine osmolality, and discontinue offending serotonergic agent.' },
      { range: 'eGFR < 60 mL/min/1.73m²', interpretation: 'Renal Impairment (CKD Stage 3+)', action: 'Lithium is contraindicated or requires aggressive dose reductions and nephrology co-management. Reduce gabapentinoid doses.' },
      { range: 'ALT or AST > 3× Upper Limit of Normal', interpretation: 'Significant Transaminitis', action: 'Discontinue hepatotoxic psychotropics (Valproate, Duloxetine). Order hepatitis serologies and liver ultrasound.' },
      { range: 'Calcium > 10.5 mg/dL', interpretation: 'Hypercalcemia', action: 'Classic organic cause of depression, delirium, cognitive blunting ("groans and psychiatric overtones"). Check PTH.' }
    ],
    icd10Justifications: [
      { code: 'F32.9', desc: 'Major depressive disorder, unspecified' },
      { code: 'F41.1', desc: 'Generalized anxiety disorder' },
      { code: 'F31.9', desc: 'Bipolar disorder, unspecified' },
      { code: 'Z79.899', desc: 'Long-term psychotropic drug therapy (Lithium / Valproate / SSRI surveillance)' }
    ]
  },

  // ================= TIER 2: NEURO-NUTRIENTS =================
  {
    id: 'b12_folate',
    tierId: 'tier2',
    name: 'Vitamin B12 & Serum Folate',
    alternativeNames: 'Cobalamin & Folic Acid, Methylation Cofactors',
    cptCode: '82607 (B12), 82746 (Folate)',
    fastingRequired: true,
    fastingNote: 'Fasting 8 hours preferred (dietary intake acutely affects serum folate levels).',
    specimen: 'Serum (SST Gold or Tiger Top - protect from prolonged light)',
    psychiatricRationale: 'Essential neuro-metabolic cofactors for monoamine neurotransmitter synthesis (serotonin, dopamine, norepinephrine). B12 deficiency causes neuropsychiatric manifestations: insidious cognitive slowing, memory loss, apathy, depression, and severe paranoia ("megaloblastic madness"), frequently presenting BEFORE macrocytic anemia occurs. Folate deficiency causes treatment resistance to SSRIs and guides L-methylfolate (Deplin 15mg) augmentation.',
    normalRange: 'B12: 200 – 900 pg/mL (psychiatric optimal > 400 pg/mL) • Folate: > 4.0 ng/mL',
    actionThresholds: [
      { range: 'B12 < 200 pg/mL', interpretation: 'Overt B12 Deficiency', action: 'Immediate oral or IM Cyanocobalamin replacement (1,000 mcg). Screen for pernicious anemia (intrinsic factor antibodies).' },
      { range: 'B12 200 – 400 pg/mL', interpretation: 'Subclinical Neuropsychiatric Deficiency', action: 'Up to 30% of patients in this "gray zone" have tissue-level deficiency. Order Methylmalonic Acid (MMA) and Homocysteine to confirm.' },
      { range: 'Folate < 4.0 ng/mL', interpretation: 'Folate Deficiency', action: 'Initiate Folic acid 1mg daily or L-methylfolate 7.5–15mg daily as antidepressant augmentation.' }
    ],
    icd10Justifications: [
      { code: 'F32.9', desc: 'Major depressive disorder, unspecified' },
      { code: 'R53.83', desc: 'Other fatigue' },
      { code: 'R41.844', desc: 'Cognitive communication deficit (brain fog / memory slowing)' },
      { code: 'E53.8', desc: 'Deficiency of other specified B group vitamins' },
      { code: 'D51.9', desc: 'Vitamin B12 deficiency anemia, unspecified' }
    ]
  },
  {
    id: 'vit_d',
    tierId: 'tier2',
    name: '25-Hydroxy Vitamin D (Total D2 + D3)',
    alternativeNames: '25-OH Cholecalciferol, Vitamin D25-Hydroxy',
    cptCode: '82306',
    fastingRequired: false,
    fastingNote: 'Non-fasting.',
    specimen: 'Serum (SST Gold or Tiger Top)',
    psychiatricRationale: 'High-yield screen for Pacific Northwest residents (Washington State low UV index). Vitamin D functions as a neuro-steroid modulating neuroplasticity, neuro-inflammation, and serotonin synthesis. Low levels strongly correlate with Major Depression, Seasonal Affective Disorder (SAD), cognitive fatigue, and chronic pain.',
    normalRange: '30 – 100 ng/mL (Optimal: 40–70 ng/mL)',
    actionThresholds: [
      { range: '< 20 ng/mL', interpretation: 'Severe Vitamin D Deficiency', action: 'Prescribe Ergocalciferol (D2) 50,000 IU PO once weekly for 8–12 weeks, followed by Cholecalciferol (D3) 2,000–5,000 IU daily maintenance.' },
      { range: '20 – 29 ng/mL', interpretation: 'Vitamin D Insufficiency', action: 'Initiate over-the-counter Cholecalciferol (D3) 2,000–4,000 IU PO daily with a fat-containing meal. Recheck in 3 months.' }
    ],
    icd10Justifications: [
      { code: 'E55.9', desc: 'Vitamin D deficiency, unspecified (essential for lab billing coverage)' },
      { code: 'F32.9', desc: 'Major depressive disorder, unspecified' },
      { code: 'F33.9', desc: 'Major depressive disorder, recurrent, unspecified' },
      { code: 'R53.83', desc: 'Other fatigue' }
    ]
  },
  {
    id: 'magnesium',
    tierId: 'tier2',
    name: 'Magnesium (Serum)',
    alternativeNames: 'Serum Mg2+',
    cptCode: '83735',
    fastingRequired: false,
    fastingNote: 'Non-fasting.',
    specimen: 'Serum (SST Gold or Tiger Top)',
    psychiatricRationale: 'Regulates NMDA receptor excitation and GABAergic tone. Hypomagnesemia causes heightened somatic anxiety, neuromuscular tension, muscle twitching, tremors, insomnia, and refractory depression. CRITICAL SAFETY GUARDRAIL: Hypomagnesemia and hypokalemia are the leading clinical risk factors for drug-induced QTc prolongation, Torsades de Pointes, and sudden cardiac death when prescribing psychotropics (Citalopram, Escitalopram, Antipsychotics).',
    normalRange: '1.7 – 2.4 mg/dL (psychiatric optimal: 2.0–2.4 mg/dL)',
    actionThresholds: [
      { range: '< 1.7 mg/dL', interpretation: 'Hypomagnesemia (Arrhythmia & Anxiety Risk)', action: 'Correct with oral Magnesium Glycinate 200–400mg daily or Magnesium Citrate. HOLD or monitor ECG before initiating QTc-prolonging psychotropics.' },
      { range: '> 2.6 mg/dL', interpretation: 'Hypermagnesemia', action: 'Evaluate for renal insufficiency or excessive supplement intake. Can cause lethargy, hypotension, and CNS depression.' }
    ],
    icd10Justifications: [
      { code: 'E83.42', desc: 'Hypomagnesemia' },
      { code: 'F41.1', desc: 'Generalized anxiety disorder' },
      { code: 'G47.00', desc: 'Insomnia, unspecified' },
      { code: 'Z79.899', desc: 'Long-term drug monitoring (QTc safety surveillance)' }
    ]
  },
  {
    id: 'ferritin',
    tierId: 'tier2',
    name: 'Serum Ferritin (Iron Storage Reserves)',
    alternativeNames: 'Ferritin, Total Iron Stores',
    cptCode: '82728',
    fastingRequired: false,
    fastingNote: 'Non-fasting. Morning draw preferred.',
    specimen: 'Serum (SST Gold or Tiger Top)',
    psychiatricRationale: 'Recommended addition based on Monica\'s ADHD/inattention protocol. Ferritin is the gold standard measure of total body iron reserves. Iron is an obligate rate-limiting cofactor for tyrosine hydroxylase in the synthesis of dopamine. Patients frequently present with "normal" CBC/Hemoglobin but severe iron depletion (Ferritin < 30 ng/mL), causing profound inattention, executive dysfunction, brain fog, fatigue, and Restless Legs Syndrome (RLS).',
    normalRange: '15 – 150 ng/mL (F) / 30 – 400 ng/mL (M) • Psychiatric & RLS target: > 50 ng/mL',
    actionThresholds: [
      { range: '< 30 ng/mL', interpretation: 'Depleted Iron Stores (Non-anemic Iron Deficiency)', action: 'Etiology of dopamine synthesis deficiency driving inattention and RLS. Initiate oral Iron (Ferrous Sulfate 325mg or Iron Bisglycinate 65mg) with Vitamin C every other day.' },
      { range: '30 – 50 ng/mL', interpretation: 'Borderline Iron Stores for CNS Function', action: 'Trial dietary iron augmentation and follow-up in 3 months before escalating stimulant dosing.' }
    ],
    icd10Justifications: [
      { code: 'E61.1', desc: 'Iron deficiency (essential for billing coverage)' },
      { code: 'F90.0', desc: 'ADHD, predominantly inattentive type' },
      { code: 'R53.83', desc: 'Other fatigue' },
      { code: 'G25.81', desc: 'Restless legs syndrome' }
    ]
  },

  // ================= TIER 3: REPRODUCTIVE & HORMONAL =================
  {
    id: 'progesterone',
    tierId: 'tier3',
    name: 'Progesterone (Serum)',
    alternativeNames: 'Luteal Phase Progesterone, Allopregnanolone Precursor',
    cptCode: '84144',
    fastingRequired: false,
    fastingNote: 'Timing critical: For cycling females, draw in mid-luteal phase (Day 19–22 of a typical 28-day cycle, or 7 days prior to expected menses).',
    specimen: 'Serum (SST Gold or Tiger Top)',
    psychiatricRationale: 'Progesterone converts to allopregnanolone, a potent endogenous positive allosteric modulator of GABA-A receptors (natural anxiolytic). Luteal phase progesterone deficiency or sudden progesterone withdrawal precipitates severe Premenstrual Dysphoric Disorder (PMDD), late-luteal panic attacks, insomnia, and acute mood destabilization. Evaluates ovulatory adequacy and luteal phase defect.',
    normalRange: 'Follicular: < 0.89 ng/mL • Mid-Luteal: 1.8 – 24.0 ng/mL • Postmenopausal: < 0.20 ng/mL',
    actionThresholds: [
      { range: '< 5.0 ng/mL in mid-luteal phase', interpretation: 'Low Luteal Progesterone / Anovulation', action: 'Correlates with PMDD and severe premenstrual anxiety. Consider luteal-phase SSRI dosing (e.g., Fluoxetine/Sertraline 14 days before menses) or OB/GYN consult for micronized progesterone.' }
    ],
    icd10Justifications: [
      { code: 'F32.81', desc: 'Premenstrual dysphoric disorder (PMDD)' },
      { code: 'N94.3', desc: 'Premenstrual tension syndrome' },
      { code: 'N92.6', desc: 'Irregular menstruation, unspecified' },
      { code: 'N95.1', desc: 'Menopausal and perimenopausal disorders' }
    ]
  },
  {
    id: 'estrogen_estradiol',
    tierId: 'tier3',
    name: 'Estradiol (E2 - Estrogen Fraction)',
    alternativeNames: 'Serum Estradiol, Estrogen E2',
    cptCode: '82670',
    fastingRequired: false,
    fastingNote: 'For cycling females, draw on Day 2–4 (follicular baseline) or Day 21 (luteal). Document cycle day.',
    specimen: 'Serum (SST Gold or Tiger Top)',
    psychiatricRationale: 'Estradiol enhances serotonin synthesis, downregulates MAO, and increases 5-HT2A receptor density. Erratic estrogen drops during perimenopause or postpartum trigger profound depressive episodes, insomnia, hot flashes, brain fog, and severe anxiety. Also screens for functional hypothalamic amenorrhea and evaluates estrogen suppression caused by antipsychotic-induced hyperprolactinemia.',
    normalRange: 'Early Follicular: 30–100 pg/mL • Ovulatory: 100–400 pg/mL • Luteal: 60–200 pg/mL • Postmenopausal: < 20 pg/mL',
    actionThresholds: [
      { range: '< 20 pg/mL with irregular menses', interpretation: 'Perimenopausal / Postmenopausal Transition', action: 'Perimenopausal depression responds poorly to SSRIs alone. Coordinate with GYN for evaluation of Menopausal Hormone Therapy (MHT).' }
    ],
    icd10Justifications: [
      { code: 'N95.1', desc: 'Menopausal and perimenopausal disorders' },
      { code: 'F32.81', desc: 'Premenstrual dysphoric disorder' },
      { code: 'N91.2', desc: 'Amenorrhea, unspecified' },
      { code: 'N92.6', desc: 'Irregular menstruation, unspecified' }
    ]
  },
  {
    id: 'prolactin',
    tierId: 'tier3',
    name: 'Serum Prolactin (Antipsychotic / Endocrine Safety)',
    alternativeNames: 'Prolactin Level, Hyperprolactinemia Screen',
    cptCode: '84146',
    fastingRequired: true,
    fastingNote: 'Fasting preferred. Morning draw (at least 2–3 hours after waking). Avoid exercise or breast stimulation prior to draw.',
    specimen: 'Serum (SST Gold or Tiger Top)',
    psychiatricRationale: 'Recommended endocrine companion to Estrogen/Progesterone. Second-generation antipsychotics with strong D2 blockade in the tuberoinfundibular pathway (Risperidone, Paliperidone, Haloperidol) disinhibit prolactin release, causing hyperprolactinemia. High prolactin suppresses GnRH, causing hypogonadism, amenorrhea, galactorrhea, sexual dysfunction, bone density loss, and low estradiol/progesterone.',
    normalRange: 'Non-pregnant females: 4.8 – 23.3 ng/mL • Males: 4.0 – 15.2 ng/mL',
    actionThresholds: [
      { range: '25 – 100 ng/mL', interpretation: 'Medication-Induced Hyperprolactinemia', action: 'Dopamine D2 antagonist effect. Consider switching to prolactin-sparing SGA (Aripiprazole, Brexpiprazole) or low-dose Aripiprazole adjunctive add-on (2–5mg) to normalize prolactin.' },
      { range: '> 100–200 ng/mL', interpretation: 'Severe Hyperprolactinemia (Prolactinoma Suspicion)', action: 'Pituitary MRI indicated to rule out pituitary prolactinoma. Refer to Endocrinology.' }
    ],
    icd10Justifications: [
      { code: 'E22.1', desc: 'Hyperprolactinemia' },
      { code: 'N91.2', desc: 'Amenorrhea, unspecified' },
      { code: 'N64.3', desc: 'Galactorrhea' },
      { code: 'Z79.899', desc: 'Long-term psychotropic monitoring (antipsychotic endocrine surveillance)' }
    ]
  }
];

export const LAB_PRESETS = [
  {
    id: 'universal_tier1',
    name: 'Tier 1: Universal Baseline (All Patients)',
    shortDesc: 'A1c, Lipid Panel, TSH w/ FT4, CBC w/ diff, CMP-14',
    badge: '100% Intake Baseline',
    color: 'emerald',
    testIds: ['a1c', 'lipid_panel', 'tsh_ft4', 'cbc_diff', 'cmp_14']
  },
  {
    id: 'psych_nutrients_tier1_2',
    name: 'Tiers 1 + 2: Baseline + Neuro-Nutrient Panel',
    shortDesc: 'Adds B12, Folate, Vit D-25, Magnesium, and Ferritin',
    badge: 'Standard Psych & Fatigue',
    color: 'sky',
    testIds: ['a1c', 'lipid_panel', 'tsh_ft4', 'cbc_diff', 'cmp_14', 'b12_folate', 'vit_d', 'magnesium', 'ferritin']
  },
  {
    id: 'comprehensive_all',
    name: 'All Tiers: Full Comprehensive & Hormonal Workup',
    shortDesc: 'All 12 tests including Progesterone, Estrogen, and Prolactin',
    badge: 'Complete Diagnostic Workup',
    color: 'purple',
    testIds: ['a1c', 'lipid_panel', 'tsh_ft4', 'cbc_diff', 'cmp_14', 'b12_folate', 'vit_d', 'magnesium', 'ferritin', 'progesterone', 'estrogen_estradiol', 'prolactin']
  }
];
