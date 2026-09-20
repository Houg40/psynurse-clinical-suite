import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  AlertTriangle, 
  ShieldAlert, 
  Clock, 
  FileText, 
  CheckCircle2, 
  Search, 
  Filter, 
  Scale, 
  Zap, 
  ChevronRight, 
  Award, 
  Pill, 
  Activity, 
  Eye, 
  MessageSquare, 
  Check, 
  X,
  Stethoscope
} from 'lucide-react';
import { INPATIENT_UNIT_CENSUS } from '../data/inpatientScenarios';

export default function UnitCensusBoard({ onProceedToDebrief, onRestartUnit }) {
  const [patients, setPatients] = useState(INPATIENT_UNIT_CENSUS);
  const [activeBedId, setActiveBedId] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Track actions ordered per bed
  const [completedOrders, setCompletedOrders] = useState({}); // { [bedId]: [actionId1, actionId2] }
  const [bedNotes, setBedNotes] = useState({}); // { [bedId]: customClinicianNote }
  const [activeDialogueProbe, setActiveDialogueProbe] = useState(null);

  const activePatient = patients.find(p => p.id === activeBedId);

  const filteredPatients = patients.filter(pt => {
    const matchesSearch = pt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pt.bed.includes(searchQuery) ||
                          pt.diagnosis.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (filterCategory === 'involuntary') return pt.legalStatus.includes('Involuntary') || pt.legalStatus.includes('Court');
    if (filterCategory === 'refusal') return pt.refusingMeds;
    if (filterCategory === 'critical') return pt.acuity === 'Critical' || pt.observationLevel.includes('1:1');
    if (filterCategory === 'discharge') return pt.actionOptions.some(a => a.category === 'Discharge');
    return true;
  });

  const roundedCount = Object.keys(completedOrders).length;

  const handleToggleAction = (bedId, actionId) => {
    setCompletedOrders(prev => {
      const current = prev[bedId] || [];
      if (current.includes(actionId)) {
        return { ...prev, [bedId]: current.filter(id => id !== actionId) };
      } else {
        return { ...prev, [bedId]: [...current, actionId] };
      }
    });
  };

  const calculateTotalScore = () => {
    let score = 0;
    patients.forEach(pt => {
      const orderedIds = completedOrders[pt.id] || [];
      pt.actionOptions.forEach(opt => {
        if (orderedIds.includes(opt.id)) {
          score += opt.scoreDelta;
        }
      });
    });
    return score;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Unit Command Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-indigo-950/80 border border-indigo-700/60 flex items-center justify-center text-indigo-400 shadow-md">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800">
                  Locked Acute Inpatient Unit • 4-West
                </span>
                <span className="text-[11px] font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  Morning Rounds: 08:30 AM
                </span>
              </div>
              <h1 className="text-xl font-black text-white mt-1">
                Inpatient Unit Census Board (16 Patients)
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage acute civil holds, urgent medication refusals, legal hearings, and morning interdisciplinary rounds.
              </p>
            </div>
          </div>

          {/* Unit Progress and Attending Debrief CTA */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
            <div className="bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800 text-right">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Rounds Progress</p>
              <p className="text-sm font-black text-indigo-300">
                {roundedCount} / 16 <span className="text-xs font-medium text-slate-500">Beds Charted</span>
              </p>
            </div>

            <button
              onClick={() => onProceedToDebrief({ completedOrders, score: calculateTotalScore(), totalBeds: 16 })}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all transform active:scale-95 whitespace-nowrap"
            >
              <Award className="w-4 h-4" />
              <span>Attending Morning Debrief</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter & Search Strip */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
            {[
              { id: 'all', label: 'All Beds (16)' },
              { id: 'involuntary', label: 'Involuntary Holds / Court' },
              { id: 'refusal', label: 'Medication Refusal' },
              { id: 'critical', label: 'Critical / 1:1 Safety' },
              { id: 'discharge', label: 'Discharge Ready' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterCategory(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  filterCategory === f.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search Bed, Name, Diagnosis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* 16-Bed Census Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {filteredPatients.map(pt => {
          const isSelected = activeBedId === pt.id;
          const isCompleted = (completedOrders[pt.id] || []).length > 0;
          const isCritical = pt.acuity === 'Critical';

          return (
            <div
              key={pt.id}
              onClick={() => {
                setActiveBedId(pt.id);
                setActiveDialogueProbe(null);
              }}
              className={`rounded-xl p-4 border transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-950/40 border-indigo-400 ring-2 ring-indigo-500/50 shadow-xl'
                  : isCompleted
                  ? 'bg-slate-900/90 border-teal-800/60 hover:border-teal-700'
                  : isCritical
                  ? 'bg-slate-900/90 border-rose-800/60 hover:border-rose-700 shadow-sm'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              {/* Card Top: Bed Number & Status */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${
                    isCritical ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                    pt.refusingMeds ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                    'bg-slate-800 text-slate-200 border border-slate-700'
                  }`}>
                    {pt.bed}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-tight">
                      {pt.name}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {pt.age}yo {pt.gender}
                    </p>
                  </div>
                </div>

                {isCompleted ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800">
                    <CheckCircle2 className="w-3 h-3" />
                    Rounded
                  </span>
                ) : (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    isCritical ? 'bg-rose-950/60 text-rose-300 border-rose-800' :
                    'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {pt.acuity}
                  </span>
                )}
              </div>

              {/* Diagnosis & Legal Status */}
              <div className="my-3 space-y-1.5">
                <p className="text-xs font-semibold text-slate-300 line-clamp-2">
                  {pt.diagnosis}
                </p>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    {pt.legalStatus}
                  </span>
                  {pt.legalHoursRemaining !== null && (
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800">
                      {pt.legalHoursRemaining}h left
                    </span>
                  )}
                </div>
              </div>

              {/* Urgent Nursing Alert Strip */}
              <div className="pt-2.5 border-t border-slate-800/80">
                <p className={`text-[11px] font-medium line-clamp-2 ${
                  pt.refusingMeds ? 'text-amber-300' : isCritical ? 'text-rose-300' : 'text-slate-400'
                }`}>
                  {pt.nursingAlert}
                </p>
              </div>

              {/* Click to Round Indicator */}
              <div className="mt-3 pt-2 flex items-center justify-between text-[11px] font-bold text-indigo-400">
                <span>{isSelected ? 'Currently Rounding' : 'Open Inpatient Chart'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Active Inpatient Rounding Drawer / Modal ── */}
      {activePatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Header: Bed Banner */}
            <div className="bg-gradient-to-r from-slate-950 via-indigo-950/70 to-slate-950 px-6 py-4 border-b border-slate-800 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-white font-black text-base shadow-md">
                  {activePatient.bed}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-black text-white">
                      {activePatient.name}
                    </h2>
                    <span className="text-xs text-slate-400">
                      ({activePatient.age}yo {activePatient.gender})
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-950 text-indigo-300 border border-indigo-700 px-2 py-0.5 rounded">
                      {activePatient.legalStatus}
                    </span>
                    {activePatient.refusingMeds && (
                      <span className="text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-700 px-2 py-0.5 rounded flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-400" />
                        Refusing Oral Medications
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-slate-300 mt-0.5">
                    {activePatient.diagnosis}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveBedId(null)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Split Inpatient Cockpit Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column (7 cols): Clinical Chart, Overnight Nursing, Bedside Interview */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* 1. Vitals & Critical Lab Data */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-indigo-400" />
                      Morning Vitals &amp; Critical Labs
                    </h4>
                    <span className="text-[10px] text-slate-500 font-mono">Telemetry/Lab Feed</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-500 font-medium">Blood Pressure</span>
                      <p className="font-bold text-white mt-0.5">{activePatient.vitals.bp}</p>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-500 font-medium">Heart Rate</span>
                      <p className="font-bold text-white mt-0.5">{activePatient.vitals.hr}</p>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-500 font-medium">Temperature</span>
                      <p className="font-bold text-white mt-0.5">{activePatient.vitals.temp}</p>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-500 font-medium">Observation</span>
                      <p className="font-bold text-amber-300 mt-0.5 text-[11px] truncate">{activePatient.observationLevel}</p>
                    </div>
                  </div>

                  {/* Labs List */}
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Diagnostic Chemistries &amp; Troughs</span>
                    {Object.entries(activePatient.labs).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between text-xs border-b border-slate-800/60 pb-1 last:border-none last:pb-0">
                        <span className="text-slate-400 font-mono text-[11px] capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="font-bold text-slate-200">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Overnight Nursing Handoff Note */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    Night-Shift Nursing Handoff Report
                  </h4>
                  <p className="text-xs text-slate-300 bg-slate-900/90 p-3 rounded-lg border border-slate-800 leading-relaxed font-sans">
                    {activePatient.nursingNotes}
                  </p>
                  {activePatient.refusingMeds && (
                    <div className="p-2.5 bg-amber-950/40 border border-amber-800/60 rounded-lg text-xs text-amber-300">
                      <strong>Refusal Context:</strong> {activePatient.medicationRefusalReason}
                    </div>
                  )}
                </div>

                {/* 3. Bedside Rounding Dialogue */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-indigo-400" />
                    Bedside Rounding Encounter (Direct Patient Voice)
                  </h4>

                  {/* Initial Patient State */}
                  <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 text-xs text-slate-200 italic leading-relaxed">
                    "{activePatient.dialogue.greeting}"
                  </div>

                  {/* Probes */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Probe Patient at Bedside:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setActiveDialogueProbe('meds')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          activeDialogueProbe === 'meds' 
                            ? 'bg-indigo-600 text-white border-indigo-500' 
                            : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        Ask About Medication Refusal / Agreement
                      </button>
                      <button
                        onClick={() => setActiveDialogueProbe('safety')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          activeDialogueProbe === 'safety' 
                            ? 'bg-indigo-600 text-white border-indigo-500' 
                            : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        Assess Safety &amp; Imminent Danger
                      </button>
                      <button
                        onClick={() => setActiveDialogueProbe('insight')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          activeDialogueProbe === 'insight' 
                            ? 'bg-indigo-600 text-white border-indigo-500' 
                            : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        Evaluate Insight &amp; Delusional Content
                      </button>
                    </div>

                    {activeDialogueProbe && (
                      <div className="mt-2.5 p-3 rounded-lg bg-indigo-950/40 border border-indigo-800/70 text-xs text-indigo-200 animate-fade-in">
                        <strong>Patient Response:</strong> "{activePatient.dialogue[
                          activeDialogueProbe === 'meds' ? 'probeMeds' : 
                          activeDialogueProbe === 'safety' ? 'probeSafety' : 'probeInsight'
                        ]}"
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Right Column (5 cols): Active Medication List & Rounding Orders Pad */}
              <div className="lg:col-span-5 space-y-5">
                
                {/* Active Medication Card */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Pill className="w-4 h-4 text-indigo-400" />
                    Active Inpatient Medications
                  </h4>
                  {activePatient.currentMedications.length > 0 ? (
                    <div className="space-y-2">
                      {activePatient.currentMedications.map((m, idx) => (
                        <div key={idx} className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                          <div>
                            <p className="font-bold text-white">{m.name}</p>
                            <p className="text-[11px] text-slate-400">{m.dose}</p>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            m.status.includes('Refused') ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                            'bg-slate-800 text-slate-300'
                          }`}>
                            {m.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic">No scheduled medications currently active.</p>
                  )}
                </div>

                {/* Interventions & Rounding Order Options */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Scale className="w-4 h-4 text-indigo-400" />
                      Inpatient Rounding Orders &amp; Interventions
                    </h4>
                    <span className="text-[10px] text-indigo-400 font-bold">Select All Applicable</span>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    Select the evidence-based psychiatric, legal, and safety orders for today's rounding plan:
                  </p>

                  <div className="space-y-2.5">
                    {activePatient.actionOptions.map((opt) => {
                      const isChecked = (completedOrders[activePatient.id] || []).includes(opt.id);

                      return (
                        <div
                          key={opt.id}
                          onClick={() => handleToggleAction(activePatient.id, opt.id)}
                          className={`p-3 rounded-lg border transition-all cursor-pointer ${
                            isChecked
                              ? 'bg-indigo-950/70 border-indigo-500 ring-1 ring-indigo-500'
                              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <div className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center border shrink-0 ${
                              isChecked ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-600 bg-slate-800'
                            }`}>
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black uppercase text-indigo-400 bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-800/60">
                                  {opt.category}
                                </span>
                              </div>
                              <p className="text-xs font-bold text-white leading-tight">
                                {opt.label}
                              </p>
                              {isChecked && (
                                <p className="text-[11px] text-indigo-200 mt-1.5 pt-1.5 border-t border-indigo-800/60 leading-relaxed">
                                  💡 <strong>Rationale:</strong> {opt.clinicalImpact}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Actions: Save & Advance */}
            <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {(completedOrders[activePatient.id] || []).length} Order(s) Selected for Bed {activePatient.bed}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveBedId(null)}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-colors"
                >
                  Confirm Orders &amp; Return to Census Board
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
