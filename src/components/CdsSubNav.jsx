import React from 'react';
import { Stethoscope, Pill, GitFork, AlertTriangle, ArrowLeftRight, HeartPulse } from 'lucide-react';

export default function CdsSubNav({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'screeners', label: 'Screeners & Notes', shortLabel: 'Screeners', icon: Stethoscope },
    { id: 'medications', label: 'Dosing Guide', shortLabel: 'Dosing', icon: Pill },
    { id: 'interactions', label: 'QTc & Interactions', shortLabel: 'Interactions', icon: HeartPulse },
    { id: 'pathways', label: 'Step-Therapy', shortLabel: 'Pathways', icon: GitFork },
    { id: 'crosstaper', label: 'Cross-Taper', shortLabel: 'Cross-Taper', icon: ArrowLeftRight },
    { id: 'safety', label: 'Safety & Rules', shortLabel: 'Safety', icon: AlertTriangle },
  ];

  return (
    <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 overflow-x-auto scrollbar-none gap-4">
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/80 whitespace-nowrap">
              Clinical Decision Support (CDS)
            </span>
          </div>

          <nav className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden">{item.shortLabel}</span>
                </button>
              );
            })}
          </nav>

        </div>
      </div>
    </div>
  );
}
