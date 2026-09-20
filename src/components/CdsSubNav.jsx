import React from 'react';
import { Stethoscope, Pill, GitFork, AlertTriangle, ArrowLeftRight, HeartPulse, FileEdit, Bot, ClipboardCheck, Sparkles, Lightbulb, FlaskConical } from 'lucide-react';

export default function CdsSubNav({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'hpi', label: 'HPI Builder', shortLabel: 'HPI', icon: FileEdit },
    { id: 'screeners', label: 'Screeners & Notes', shortLabel: 'Screeners', icon: Stethoscope },
    { id: 'checklists', label: 'DSM-5 Checklists', shortLabel: 'DSM-5', icon: ClipboardCheck },
    { id: 'psychotherapy', label: 'Psychotherapy', shortLabel: 'Therapy', icon: Sparkles },
    { id: 'medications', label: 'Dosing Guide', shortLabel: 'Dosing', icon: Pill },
    { id: 'interactions', label: 'QTc & Interactions', shortLabel: 'Interactions', icon: HeartPulse },
    { id: 'advisor', label: 'Clinical Reference Assistant', shortLabel: 'Ref. Assistant', icon: Bot },
    { id: 'pathways', label: 'Step-Therapy', shortLabel: 'Pathways', icon: GitFork },
    { id: 'crosstaper', label: 'Cross-Taper', shortLabel: 'Cross-Taper', icon: ArrowLeftRight },
    { id: 'labs', label: 'Standard Labs', shortLabel: 'Labs', icon: FlaskConical },
    { id: 'misc', label: 'Misc. Information', shortLabel: 'Misc. Info', icon: Lightbulb },
    { id: 'safety', label: 'Safety & Rules', shortLabel: 'Safety', icon: AlertTriangle },
  ];

  return (
    <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 overflow-x-auto scrollbar-none gap-4">
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/80 whitespace-nowrap">
              <span className="hidden md:inline">Clinical Decision Support (CDS)</span>
              <span className="md:hidden">CDS</span>
            </span>
          </div>

          <nav className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  title={item.label}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="hidden xl:inline">{item.label}</span>
                  <span className="xl:hidden">{item.shortLabel}</span>
                </button>
              );
            })}
          </nav>

        </div>
      </div>
    </div>
  );
}
