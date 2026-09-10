import React from 'react';
import { Stethoscope, FileText, FastForward, Award, RotateCcw, Sparkles } from 'lucide-react';

export default function CfsSubNav({ 
  activePhase, 
  setActivePhase, 
  onResetCase, 
  revealedCluesCount, 
  totalCluesCount 
}) {
  const phases = [
    { id: 'interview', label: '1. Interview', icon: Stethoscope },
    { id: 'charting', label: '2. Chart & Orders', icon: FileText },
    { id: 'timejump', label: '3. Week 4 Follow-Up', icon: FastForward },
    { id: 'debrief', label: '4. Scorecard', icon: Award },
  ];

  return (
    <div className="bg-slate-950 border-b border-slate-800/90 sticky top-16 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 overflow-x-auto scrollbar-none gap-4">
          
          {/* Active Case Context Pill */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-300 bg-indigo-950/80 px-2.5 py-1 rounded-md border border-indigo-800 whitespace-nowrap">
              Active OSCE Case: Marcus Vance (31yo M)
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-950/50 text-amber-300 border border-amber-700/60 whitespace-nowrap">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Clues: {revealedCluesCount}/{totalCluesCount}
            </span>
          </div>

          {/* Phase Steps & Reset */}
          <div className="flex items-center gap-2">
            <nav className="flex items-center p-1 bg-slate-900 rounded-xl border border-slate-800">
              {phases.map((phase) => {
                const Icon = phase.icon;
                const isActive = activePhase === phase.id;
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
              title="Reset simulation back to initial interview"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restart</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
