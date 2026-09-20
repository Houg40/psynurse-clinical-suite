import React from 'react';
import { 
  Award, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  RotateCcw, 
  ArrowLeft, 
  Scale, 
  ShieldCheck, 
  Pill, 
  Users,
  Check,
  Stethoscope
} from 'lucide-react';
import { INPATIENT_UNIT_CENSUS } from '../data/inpatientScenarios';

export default function InpatientDebrief({ 
  inpatientResults, 
  onBackToBoard, 
  onRestartSimulation 
}) {
  const completedOrders = inpatientResults?.completedOrders || {};
  const roundedBedsCount = Object.keys(completedOrders).length;

  // 1. Bed 101: Medication Refusal Strategy (ODT negotiation or IM)
  const bed101Orders = completedOrders['pt-101'] || [];
  const bed101Handled = bed101Orders.includes('liquid_or_odt') || bed101Orders.includes('emergency_im');

  // 2. Bed 102: Paranoid Schizophrenia pill refusal (liquid concentrate or court psych affidavit)
  const bed102Orders = completedOrders['pt-102'] || [];
  const bed102Handled = bed102Orders.includes('liquid_concentrate_sealed') || bed102Orders.includes('court_psych_affidavit');

  // 3. Bed 103: Catatonia Lorazepam Challenge Test
  const bed103Orders = completedOrders['pt-103'] || [];
  const bed103CatatoniaRx = bed103Orders.includes('lorazepam_challenge') || bed103Orders.includes('ect_consult');

  // 4. Bed 105: Severe CIWA (DTs risk) treated with Lorazepam STAT + IV Thiamine
  const bed105Orders = completedOrders['pt-105'] || [];
  const bed105CiwaHandled = bed105Orders.includes('symptom_triggered_ativan') && bed105Orders.includes('high_dose_iv_thiamine');

  // 5. Bed 107: Lewy Body Dementia safety rule (avoiding typical antipsychotics)
  const bed107Orders = completedOrders['pt-107'] || [];
  const bed107LbdProtected = bed107Orders.includes('avoid_typical_antipsychotics');

  // 6. Bed 110: Clozapine ANC verification
  const bed110Orders = completedOrders['pt-110'] || [];
  const bed110AncVerified = bed110Orders.includes('verify_anc_before_dispense');

  // 7. Bed 111: Anorexia bradycardia (HR 42) - requested Med ICU transfer & held QTc psychotropics
  const bed111Orders = completedOrders['pt-111'] || [];
  const bed111MedTransfer = bed111Orders.includes('stat_medical_transfer') || bed111Orders.includes('hold_qtc_psychotropics');

  // Compute Inpatient Psychopharmacology Score
  let scorePoints = 0;
  if (bed101Handled) scorePoints += 15;
  if (bed102Handled) scorePoints += 15;
  if (bed103CatatoniaRx) scorePoints += 15;
  if (bed105CiwaHandled) scorePoints += 20;
  if (bed107LbdProtected) scorePoints += 15;
  if (bed110AncVerified) scorePoints += 10;
  if (bed111MedTransfer) scorePoints += 10;

  // Coverage weighting
  const coverageRatio = roundedBedsCount / 16;
  const finalScore = Math.min(100, Math.round(scorePoints * 0.7 + (coverageRatio * 100) * 0.3));

  const getRank = (s) => {
    if (s >= 90) return { title: 'Chief Psychiatric Prescriber / Attending Psychopharmacologist', color: 'text-emerald-400', bg: 'bg-emerald-950/60', border: 'border-emerald-700' };
    if (s >= 75) return { title: 'Senior Psychiatric Prescriber (High Clinical Competence)', color: 'text-indigo-400', bg: 'bg-indigo-950/60', border: 'border-indigo-700' };
    if (s >= 60) return { title: 'Junior Psychiatric Prescriber (Meets Standard Core)', color: 'text-amber-400', bg: 'bg-amber-950/60', border: 'border-amber-700' };
    return { title: 'Trainee Level (Requires Supervisory Guidance)', color: 'text-rose-400', bg: 'bg-rose-950/60', border: 'border-rose-700' };
  };

  const rank = getRank(finalScore);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-indigo-950 border border-indigo-700/80 flex items-center justify-center text-indigo-400 shadow-lg">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800">
                Psychiatric Medication Prescriber Evaluation
              </span>
              <h1 className="text-xl font-black text-white mt-1">
                Attending Psychopharmacologist Morning Debrief
              </h1>
              <p className="text-xs text-slate-400">
                Unit 4-West • Psychiatric Medication Rounds (16 Inpatient Beds)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToBoard}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Census</span>
            </button>
            <button
              onClick={onRestartSimulation}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>New Flight Mission</span>
            </button>
          </div>
        </div>

        {/* Big Score Card */}
        <div className={`mt-6 p-5 rounded-2xl border ${rank.bg} ${rank.border} flex flex-col md:flex-row items-center justify-between gap-6`}>
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Psychopharmacology Competency Rank
            </span>
            <h2 className={`text-xl sm:text-2xl font-black ${rank.color}`}>
              {rank.title}
            </h2>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Evaluated strictly on psychiatric drug selection, medication refusal strategies, therapeutic drug monitoring, and clinical safety.
            </p>
          </div>

          <div className="bg-slate-950/80 px-6 py-4 rounded-2xl border border-slate-800 text-center shrink-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Composite Score</span>
            <p className="text-4xl font-black text-white mt-0.5">
              {finalScore}<span className="text-lg text-slate-500 font-bold">/100</span>
            </p>
            <span className="text-[11px] font-bold text-indigo-400 mt-0.5 block">
              {roundedBedsCount} of 16 Beds Charted
            </span>
          </div>
        </div>
      </div>

      {/* 4 Core Psychiatric Prescriber Competencies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Competency 1: Involuntary Medication Refusal & Route Optimization */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-950 flex items-center justify-center text-indigo-400 border border-indigo-800">
              <Pill className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Medication Refusal &amp; Route Strategies</h3>
              <p className="text-[11px] text-slate-400">ODT negotiation, liquid concentrates, emergency IM protocols</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
              {bed101Handled ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-bold text-white">Bed 101: Sarah Jenkins (Manic Pill Refusal)</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  {bed101Handled 
                    ? "✓ Successfully managed refusal by offering Oral Dissolving Tablet (Olanzapine Zydis) or ordering justified emergency IM." 
                    : "⚠️ Patient remained unmanaged while refusing oral mood stabilizers in manic psychosis."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
              {bed102Handled ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-bold text-white">Bed 102: Derek Cole (Nanoparticle Delusion)</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  {bed102Handled
                    ? "✓ Creative Route Strategy: Offered liquid concentrate in sealed beverage or documented necessity for legal team."
                    : "⚠️ Paranoia unaddressed: Patient continued refusing all pills without route adaptation."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Competency 2: Acute Neuropsychiatry & Psychotropic Emergencies */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-950 flex items-center justify-center text-teal-400 border border-teal-800">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Acute Neuropsychiatry &amp; Withdrawal</h3>
              <p className="text-[11px] text-slate-400">CIWA protocols, catatonia challenges, substance inductions</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
              {bed105CiwaHandled ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-bold text-white">Bed 105: Greg Miller (Severe CIWA 21)</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  {bed105CiwaHandled
                    ? "✓ Life-saving: Prescribed STAT IV Lorazepam and confirmed high-dose IV Thiamine before glucose."
                    : "⚠️ Inadequate withdrawal control: Patient at severe risk for withdrawal seizures or Wernicke encephalopathy."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
              {bed103CatatoniaRx ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-bold text-white">Bed 103: Elena Rodriguez (Postpartum Catatonia)</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  {bed103CatatoniaRx
                    ? "✓ Gold-Standard: Ordered Lorazepam Challenge Test (2mg IV/IM) or requested urgent ECT consult."
                    : "⚠️ Untreated catatonic stupor risks malignant catatonia and severe medical complications."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Competency 3: Therapeutic Drug Monitoring & Regulatory Safety */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-950 flex items-center justify-center text-indigo-400 border border-indigo-800">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Therapeutic Drug Monitoring (TDM) &amp; REMS</h3>
              <p className="text-[11px] text-slate-400">Clozapine ANC verification, avoiding D2 blockers in Lewy Body</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
              {bed110AncVerified ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-bold text-white">Bed 110: Arthur Pendelton (Clozapine ANC)</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  {bed110AncVerified
                    ? "✓ FDA REMS Compliant: Verified Absolute Neutrophil Count ≥ 1500 before authorizing Clozapine."
                    : "⚠️ Regulatory Alert: Clozapine dispensed without documented current ANC violates FDA REMS safety rules."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
              {bed107LbdProtected ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-bold text-white">Bed 107: Raymond Park (Lewy Body Dementia)</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  {bed107LbdProtected
                    ? "✓ Prescriber Vigilance: Contra-indicated typical antipsychotics to prevent fatal neuroleptic rigidity."
                    : "⚠️ High risk: Typical D2 antagonists can trigger catastrophic neuroleptic sensitivity in Lewy Body disease."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Competency 4: Interprofessional Collaboration (Medicine & Legal Interfaces) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-950 flex items-center justify-center text-purple-400 border border-purple-800">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Interprofessional Scope Collaboration</h3>
              <p className="text-[11px] text-slate-400">Internal Medicine consults, social work &amp; court interface</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
              {bed111MedTransfer ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-bold text-white">Bed 111: Maya Lin (Anorexia HR 42, K+ 3.1)</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  {bed111MedTransfer
                    ? "✓ Appropriate Scope Boundary: Requested STAT Medical ICU transfer and held QTc-prolonging psychotropics."
                    : "⚠️ Medical Boundary Alert: Severe cardiac instability requires medical telemetry outside psych unit scope."}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Attending Closing Remarks */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Stethoscope className="w-4 h-4 text-indigo-400" />
          Attending Psychopharmacologist Debrief Summary
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed">
          As a psychiatric medication provider, your role is centered on precision psychopharmacology: overcoming medication refusal through route adaptations (ODTs, liquid concentrates, or justified emergency IM protocols); monitoring drug levels and FDA REMS requirements; preventing adverse reactions (e.g. neuroleptic sensitivity in Lewy Body Dementia); and collaborating cleanly with Internal Medicine and Hospital Legal when patients exceed psychiatric unit boundaries.
        </p>
      </div>

    </div>
  );
}
