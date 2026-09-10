import React, { useState } from 'react';
import SuiteHeader from './components/SuiteHeader';
import CdsSubNav from './components/CdsSubNav';
import CfsSubNav from './components/CfsSubNav';
import CdsApp from './modules/cds/CdsApp';
import CfsApp from './modules/cfs/CfsApp';

export default function App() {
  const [currentModule, setCurrentModule] = useState('cds');
  const [cdsActiveTab, setCdsActiveTab] = useState('screeners');
  const [cfsActivePhase, setCfsActivePhase] = useState('interview');
  const [cluesCount, setCluesCount] = useState({ revealed: 0, total: 4 });

  const handleCluesUpdated = (revealed, total) => {
    setCluesCount({ revealed, total });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950">
      <div>
        {/* Master Suite Navigation Bar */}
        <SuiteHeader
          currentModule={currentModule}
          setCurrentModule={setCurrentModule}
          cdsActiveTab={cdsActiveTab}
          setCdsActiveTab={setCdsActiveTab}
          cfsActivePhase={cfsActivePhase}
          setCfsActivePhase={setCfsActivePhase}
        />

        {/* Dynamic Contextual Sub-Nav */}
        {currentModule === 'cds' ? (
          <CdsSubNav activeTab={cdsActiveTab} setActiveTab={setCdsActiveTab} />
        ) : (
          <CfsSubNav
            activePhase={cfsActivePhase}
            setActivePhase={setCfsActivePhase}
            onResetCase={() => setCfsActivePhase('interview')}
            revealedCluesCount={cluesCount.revealed}
            totalCluesCount={cluesCount.total}
          />
        )}

        {/* Active Application Canvas */}
        {currentModule === 'cds' ? (
          <CdsApp activeTab={cdsActiveTab} setActiveTab={setCdsActiveTab} />
        ) : (
          <CfsApp
            activePhase={cfsActivePhase}
            setActivePhase={setCfsActivePhase}
            onCluesUpdated={handleCluesUpdated}
          />
        )}
      </div>

      {/* Global Unified Suite Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-xs text-slate-400 print:hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-1.5">
          <p className="font-bold text-slate-300">
            PsyNurse Clinical Suite • Unified Practice Decision Support &amp; Simulation Labs
          </p>
          <p className="text-slate-500 text-[11px]">
            Zero-PHI Client-Side Architecture • Built for Monica Preder, ARNP, PMHNP-BC • Washington State Adult Psychiatric Telehealth
          </p>
        </div>
      </footer>
    </div>
  );
}
