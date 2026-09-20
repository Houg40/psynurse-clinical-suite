import React from 'react';
import { 
  Stethoscope, 
  FileText, 
  FastForward, 
  Award, 
  RotateCcw, 
  Sparkles, 
  Sliders, 
  Building2, 
  UserCheck, 
  AlertTriangle,
  BookOpen,
  Check
} from 'lucide-react';

export default function CfsSubNav({ 
  activePhase, 
  setActivePhase, 
  onResetCase, 
  revealedCluesCount, 
  totalCluesCount,
  flightConfig,
  onOpenFlightConfig,
  onOpenFlightManual
}) {
  const isInpatient = flightConfig?.setting === 'inpatient';

  const outpatientPhases = [
    { id: 'interview', label: '1. Interview', icon: Stethoscope },
    { id: 'charting', label: '2. Chart & Orders', icon: FileText },
    { id: 'timejump', label: '3. Week 4 Follow-Up', icon: FastForward },
    { id: 'debrief', label: '4. Scorecard', icon: Award },
  ];

  const inpatientPhases = [
    { id: 'interview', label: '1. Unit Census Board (16 Beds)', icon: Building2 },
    { id: 'debrief', label: '2. Attending Debrief', icon: Award },
  ];

  const phases = isInpatient ? inpatientPhases : outpatientPhases;

  return (
    <div className="bg-slate-950 border-b border-slate-800/90 sticky top-16 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 overflow-x-auto scrollbar-none gap-4">
          
          {/* Active Flight Mission Context & Config Launcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenFlightManual}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-teal-950/80 hover:bg-teal-900/80 text-teal-300 shadow-sm border border-teal-600/50 hover:border-teal-400 transition-all transform active:scale-95 whitespace-nowrap"
              title="Open Clinical Flight Manual & Prescriber Tutorial"
            >
              <BookOpen className="w-3.5 h-3.5 text-teal-400" />
              <span>Flight Manual</span>
            </button>

            <button
              onClick={onOpenFlightConfig}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 border border-indigo-400/40 transition-all transform active:scale-95 whitespace-nowrap"
              title="Change flight variables: setting, volume, legal status, acuity"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Flight Parameters</span>
            </button>

            <span className={`text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md border whitespace-nowrap flex items-center gap-1.5 ${
              isInpatient
                ? 'text-indigo-300 bg-indigo-950/80 border-indigo-700'
                : 'text-teal-300 bg-teal-950/80 border-teal-800'
            }`}>
              {isInpatient ? <Building2 className="w-3 h-3 text-indigo-400" /> : <UserCheck className="w-3 h-3 text-teal-400" />}
              {flightConfig?.title || 'Solo Outpatient Practice'}
            </span>

            {!isInpatient && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-950/50 text-amber-300 border border-amber-700/60 whitespace-nowrap">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Clues: {revealedCluesCount}/{totalCluesCount}
              </span>
            )}

            <span 
              className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold text-teal-400/90 bg-teal-950/40 border border-teal-800/40 whitespace-nowrap"
              title="Simulation progress is automatically saved locally. You can refresh or update anytime without losing your place."
            >
              <Check className="w-2.5 h-2.5 text-teal-300" />
              <span>Session Auto-Saved</span>
            </span>
          </div>

          {/* Phase Steps & Reset */}
          <div className="flex items-center gap-2">
            <nav className="flex items-center p-1 bg-slate-900 rounded-xl border border-slate-800">
              {phases.map((phase) => {
                const Icon = phase.icon;
                const isActive = activePhase === phase.id || (isInpatient && activePhase !== 'debrief' && phase.id === 'interview');
                return (
                  <button
                    key={phase.id}
                    onClick={() => setActivePhase(phase.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{phase.label}</span>
                  </button>
                );
              })}
            </nav>

            <button
              onClick={onResetCase}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold transition-all whitespace-nowrap"
              title="Reset simulation back to starting flight state"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
