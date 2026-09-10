import React, { useState } from 'react';
import { ArrowLeftRight, AlertCircle, Clipboard, Check, Sparkles, Calendar, ShieldAlert, Printer } from 'lucide-react';

const TAPER_MEDICATIONS = [
  { id: 'escitalopram', name: 'Escitalopram (Lexapro)', class: 'SSRI', doses: ['5 mg', '10 mg', '15 mg', '20 mg'], halfLife: '30h' },
  { id: 'sertraline', name: 'Sertraline (Zoloft)', class: 'SSRI', doses: ['25 mg', '50 mg', '100 mg', '150 mg', '200 mg'], halfLife: '26h' },
  { id: 'fluoxetine', name: 'Fluoxetine (Prozac)', class: 'SSRI', doses: ['10 mg', '20 mg', '40 mg', '60 mg'], halfLife: '2-4 days (Metabolite 7-15 days)' },
  { id: 'paroxetine', name: 'Paroxetine (Paxil)', class: 'SSRI', doses: ['10 mg', '20 mg', '30 mg', '40 mg'], halfLife: '21h (High withdrawal risk)' },
  { id: 'citalopram', name: 'Citalopram (Celexa)', class: 'SSRI', doses: ['10 mg', '20 mg', '40 mg'], halfLife: '35h' },
  { id: 'duloxetine', name: 'Duloxetine (Cymbalta)', class: 'SNRI', doses: ['30 mg', '60 mg', '90 mg', '120 mg'], halfLife: '12h' },
  { id: 'venlafaxine', name: 'Venlafaxine ER (Effexor XR)', class: 'SNRI', doses: ['37.5 mg', '75 mg', '150 mg', '225 mg'], halfLife: '11h (High withdrawal risk)' },
  { id: 'bupropion', name: 'Bupropion XL (Wellbutrin XL)', class: 'NDRI', doses: ['150 mg', '300 mg', '450 mg'], halfLife: '21h' },
  { id: 'mirtazapine', name: 'Mirtazapine (Remeron)', class: 'NaSSA', doses: ['7.5 mg', '15 mg', '30 mg', '45 mg'], halfLife: '20-40h' },
];

export default function CrossTaperCalculator() {
  const [currentMedId, setCurrentMedId] = useState('sertraline');
  const [currentDose, setCurrentDose] = useState('100 mg');
  const [targetMedId, setTargetMedId] = useState('duloxetine');
  const [targetDose, setTargetDose] = useState('60 mg');
  const [copied, setCopied] = useState(false);

  const currentMed = TAPER_MEDICATIONS.find(m => m.id === currentMedId);
  const targetMed = TAPER_MEDICATIONS.find(m => m.id === targetMedId);

  // Generate Schedule
  const generateSchedule = () => {
    // Special Fluoxetine handling
    if (currentMedId === 'fluoxetine') {
      return [
        {
          week: 'Week 1 (Days 1–4)',
          drugA: 'Discontinue Fluoxetine completely',
          drugB: 'Washout / Self-Taper period (active norfluoxetine remains in system)',
          notes: 'Due to long half-life (up to 15 days), no taper is required. Observe for 2-4 days.'
        },
        {
          week: 'Week 1 (Days 5–7)',
          drugA: 'None',
          drugB: `Initiate ${targetMed.name} at starting dose (${targetMed.doses[0]})`,
          notes: 'Begin target agent at lowest dose.'
        },
        {
          week: 'Week 2 (Days 8–14)',
          drugA: 'None',
          drugB: `Increase ${targetMed.name} to target dose (${targetDose})`,
          notes: 'Monitor for tolerability and GI symptoms.'
        },
        {
          week: 'Week 3 (Day 15+)',
          drugA: 'None',
          drugB: `Maintain ${targetMed.name} at ${targetDose}`,
          notes: 'Full therapeutic transition achieved.'
        }
      ];
    }

    // High withdrawal risk (Venlafaxine or Paroxetine)
    if (currentMedId === 'venlafaxine' || currentMedId === 'paroxetine') {
      return [
        {
          week: 'Week 1 (Days 1–7)',
          drugA: `Reduce ${currentMed.name} to 75% of baseline dose`,
          drugB: `Initiate ${targetMed.name} at lowest starting dose (${targetMed.doses[0]})`,
          notes: 'Advise patient on potential mild discontinuation symptoms (lightheadedness, vivid dreams).'
        },
        {
          week: 'Week 2 (Days 8–14)',
          drugA: `Reduce ${currentMed.name} to 50% of baseline dose`,
          drugB: `Titrate ${targetMed.name} to intermediate dose`,
          notes: 'Monitor blood pressure and emotional stability.'
        },
        {
          week: 'Week 3 (Days 15–21)',
          drugA: `Reduce ${currentMed.name} to 25% of baseline dose (or lowest manufactured capsule)`,
          drugB: `Increase ${targetMed.name} toward target (${targetDose})`,
          notes: 'Do not rush final step-down.'
        },
        {
          week: 'Week 4 (Day 22+)',
          drugA: `Discontinue ${currentMed.name} completely`,
          drugB: `Achieve full target dose: ${targetMed.name} ${targetDose}`,
          notes: 'Transition complete. Schedule 2-week clinical check-in.'
        }
      ];
    }

    // Standard 3-Week Cross Taper
    return [
      {
        week: 'Week 1 (Days 1–7)',
        drugA: `Reduce ${currentMed.name} to 50% dose`,
        drugB: `Start ${targetMed.name} at starting dose (${targetMed.doses[0]})`,
        notes: 'Take both doses once daily in morning (or split per individual drug profile).'
      },
      {
        week: 'Week 2 (Days 8–14)',
        drugA: `Reduce ${currentMed.name} to 25% dose (or alternate days if indivisible)`,
        drugB: `Increase ${targetMed.name} toward target (${targetDose})`,
        notes: 'Observe for serotonin load and GI tolerance.'
      },
      {
        week: 'Week 3 (Day 15+)',
        drugA: `Discontinue ${currentMed.name} completely`,
        drugB: `Continue ${targetMed.name} at full therapeutic dose (${targetDose})`,
        notes: 'Transition complete. Full therapeutic benefit evaluated at 4-6 weeks.'
      }
    ];
  };

  const schedule = generateSchedule();

  const generatePatientInstructions = () => {
    let msg = `TREATMENT TRANSITION PLAN\n`;
    msg += `Switching from: ${currentMed.name} (${currentDose})\n`;
    msg += `Switching to: ${targetMed.name} (Target: ${targetDose})\n\n`;
    msg += `Dear Patient,\nHere is your step-by-step medication transition schedule. Following these weekly steps will ensure a smooth change and minimize any temporary adjustment symptoms:\n\n`;

    schedule.forEach(s => {
      msg += `🗓️ ${s.week.toUpperCase()}:\n`;
      msg += `  • Current Med: ${s.drugA}\n`;
      msg += `  • New Med: ${s.drugB}\n`;
      msg += `  • Guidance: ${s.notes}\n\n`;
    });

    msg += `IMPORTANT SAFETY REMINDERS:\n`;
    msg += `- Take your doses consistently with a meal and a full glass of water.\n`;
    msg += `- Mild transient headaches, mild nausea, or sleep changes can occasionally occur during week 1 and typically resolve.\n`;
    msg += `- If you experience severe dizziness, fever, sudden agitation, or rash, please contact our office immediately via the portal or call our clinic.\n`;
    msg += `— Monica Preder, ARNP, PMHNP-BC`;
    return msg;
  };

  const copyInstructions = () => {
    navigator.clipboard.writeText(generatePatientInstructions());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Card (Hidden on Print) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm print:hidden">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center text-teal-800">
            <ArrowLeftRight className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Psychiatric Medication Cross-Tapering Calculator</h2>
            <p className="text-xs text-slate-500">
              Evidence-based titration and cross-switch schedules to prevent antidepressant discontinuation syndrome ("brain zaps") and avoid Serotonin Syndrome.
            </p>
          </div>
        </div>

        {/* Drug Selection Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 p-5 bg-slate-50 rounded-xl border border-slate-200">
          {/* Current Medication (Drug A) */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-red-800 uppercase tracking-wider block">
              1. Current Medication (Tapering Down)
            </span>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Select Current Drug:</label>
              <select
                value={currentMedId}
                onChange={(e) => {
                  setCurrentMedId(e.target.value);
                  const med = TAPER_MEDICATIONS.find(m => m.id === e.target.value);
                  if (med) setCurrentDose(med.doses[Math.min(1, med.doses.length - 1)]);
                }}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                {TAPER_MEDICATIONS.map(m => (
                  <option key={m.id} value={m.id}>{m.name} — ({m.class})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Current Daily Dose:</label>
              <select
                value={currentDose}
                onChange={(e) => setCurrentDose(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                {currentMed.doses.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <p className="text-[11px] text-slate-500">Half-life: <span className="font-semibold text-slate-700">{currentMed.halfLife}</span></p>
          </div>

          {/* Target Medication (Drug B) */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-teal-800 uppercase tracking-wider block">
              2. Target Medication (Titrating Up)
            </span>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Select Target Drug:</label>
              <select
                value={targetMedId}
                onChange={(e) => {
                  setTargetMedId(e.target.value);
                  const med = TAPER_MEDICATIONS.find(m => m.id === e.target.value);
                  if (med) setTargetDose(med.doses[Math.min(1, med.doses.length - 1)]);
                }}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                {TAPER_MEDICATIONS.filter(m => m.id !== currentMedId).map(m => (
                  <option key={m.id} value={m.id}>{m.name} — ({m.class})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Target Maintenance Dose:</label>
              <select
                value={targetDose}
                onChange={(e) => setTargetDose(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                {targetMed.doses.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <p className="text-[11px] text-slate-500">Half-life: <span className="font-semibold text-slate-700">{targetMed.halfLife}</span></p>
          </div>
        </div>
      </div>

      {/* Cross-Taper Schedule Table & Printable Handout */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 print:border-none print:shadow-none print:p-0">
        
        {/* Printable Header (Visible ONLY when printing) */}
        <div className="hidden print:block border-b-2 border-teal-800 pb-4 mb-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <img 
                src="./icon-192.png" 
                alt="PsyNurse Clinic Logo" 
                className="w-12 h-12 object-contain" 
              />
              <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">PSYCHIATRIC NURSE PRACTITIONER SERVICES</h1>
                <p className="text-xs font-bold text-teal-800">Monica Preder, ARNP, PMHNP-BC • Board Certified Psychiatric Nurse Practitioner</p>
                <p className="text-[10px] text-slate-500">Telehealth Practice: Washington State • Web: psychiatristnurse.com</p>
              </div>
            </div>
            <div className="text-right text-[11px] text-slate-600">
              <p className="font-bold">Patient Medication Transition Plan</p>
              <p>Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>
          <div className="mt-3 bg-slate-50 p-2.5 rounded border border-slate-200 text-xs flex justify-between">
            <div><span className="font-bold text-slate-700">Tapering Off:</span> {currentMed.name} ({currentDose})</div>
            <div><span className="font-bold text-teal-800">Transitioning To:</span> {targetMed.name} (Target: {targetDose})</div>
          </div>
        </div>

        {/* Action Header (Hidden on Print) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-600" />
            <h3 className="text-base font-black text-slate-900">
              Week-by-Week Transition Protocol
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white px-3.5 py-2 rounded-xl transition-all shadow-sm"
              title="Print or save as PDF patient handout"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF Handout</span>
            </button>
            <button
              onClick={copyInstructions}
              className="flex items-center gap-1.5 text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white px-3.5 py-2 rounded-xl transition-all shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Clipboard className="w-3.5 h-3.5" />}
              {copied ? 'Copied Patient Instructions!' : 'Copy Patient Portal Instructions'}
            </button>
          </div>
        </div>

        {/* Schedule Cards */}
        <div className="space-y-3">
          {schedule.map((step, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all print:bg-white print:border-slate-300 print:p-3 print:break-inside-avoid">
              <div className="flex items-center justify-between mb-2">
                <span className="font-black text-sm text-teal-900 bg-teal-100/70 px-2.5 py-0.5 rounded-md print:bg-teal-50 print:border print:border-teal-200">
                  {step.week}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs print:grid-cols-2">
                <div className="p-2.5 bg-red-50/50 border border-red-100 rounded-lg print:border-slate-300 print:bg-white">
                  <span className="font-bold text-red-900 block mb-0.5">Tapering Drug A ({currentMed.name}):</span>
                  <span className="text-slate-800 font-medium">{step.drugA}</span>
                </div>
                <div className="p-2.5 bg-emerald-50/50 border border-emerald-100 rounded-lg print:border-slate-300 print:bg-white">
                  <span className="font-bold text-emerald-900 block mb-0.5">Starting Drug B ({targetMed.name}):</span>
                  <span className="text-slate-800 font-medium">{step.drugB}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 italic print:text-slate-700">
                Instructions: {step.notes}
              </p>
            </div>
          ))}
        </div>

        {/* Patient Safety Guidance & Call-Outs for Handout */}
        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5 mt-4 print:bg-white print:border-slate-300 print:text-slate-800">
          <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5 print:hidden" />
          <div className="space-y-1">
            <p>
              <strong>Important Safety Reminders:</strong> Take doses consistently with food and water. Mild temporary adjustments (mild fatigue or stomach upset) can occur during the first week.
            </p>
            <p>
              If you experience sudden high fever, rapid heartbeat, shivering, severe agitation, or allergic rash, contact the clinic or emergency services immediately.
            </p>
          </div>
        </div>

        {/* Printable Sign-off / Footer (Visible ONLY when printing) */}
        <div className="hidden print:block pt-6 mt-6 border-t border-slate-300 text-xs text-slate-600">
          <div className="flex justify-between items-end">
            <div>
              <p className="font-bold text-slate-900">Monica Preder, ARNP, PMHNP-BC</p>
              <p className="text-[10px]">Licensed Psychiatric Mental Health Nurse Practitioner</p>
              <p className="text-[10px]">Questions? Contact through the patient portal or phone.</p>
            </div>
            <div className="text-right">
              <div className="border-b border-slate-400 w-48 mb-1"></div>
              <p className="text-[10px] text-slate-500">Provider Signature / Authorization</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

