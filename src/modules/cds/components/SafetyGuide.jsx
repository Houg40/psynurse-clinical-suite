import React from 'react';
import { AlertTriangle, ShieldCheck, FileCheck, ArrowLeftRight, HeartPulse } from 'lucide-react';

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
          </div>
        </div>
      </div>
    </div>
  );
}

