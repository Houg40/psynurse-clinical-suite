import React from 'react';
import ScreenerAssessment from './components/ScreenerAssessment';
import MedicationDirectory from './components/MedicationDirectory';
import DecisionTreeWizard from './components/DecisionTreeWizard';
import CrossTaperCalculator from './components/CrossTaperCalculator';
import SafetyGuide from './components/SafetyGuide';
import InteractionChecker from './components/InteractionChecker';
import HpiBuilder from './components/HpiBuilder';
import AiAdvisor from './components/AiAdvisor';
import Dsm5Checklists from './components/Dsm5Checklists';
import PsychotherapyModule from './components/PsychotherapyModule';
import MiscClinicalInfo from './components/MiscClinicalInfo';
import FeedbackModal from './components/FeedbackModal';

export default function CdsApp({ activeTab, setActiveTab }) {
  return (
    <div className="bg-slate-50 min-h-[calc(100vh-8rem)]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0 print:m-0 print:max-w-none">
        {activeTab === 'hpi' && <HpiBuilder />}
        {activeTab === 'screeners' && <ScreenerAssessment />}
        {activeTab === 'checklists' && <Dsm5Checklists />}
        {activeTab === 'psychotherapy' && <PsychotherapyModule />}
        {activeTab === 'medications' && <MedicationDirectory />}
        {activeTab === 'interactions' && <InteractionChecker />}
        {activeTab === 'advisor' && <AiAdvisor />}
        {activeTab === 'pathways' && <DecisionTreeWizard />}
        {activeTab === 'crosstaper' && <CrossTaperCalculator />}
        {activeTab === 'misc' && <MiscClinicalInfo />}
        {activeTab === 'safety' && <SafetyGuide />}
      </main>
      <FeedbackModal currentTab={activeTab} />
    </div>
  );
}
