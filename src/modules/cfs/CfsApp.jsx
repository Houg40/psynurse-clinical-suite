import React, { useState } from 'react';
import VirtualExamRoom from './components/VirtualExamRoom';
import ClinicalChartPad from './components/ClinicalChartPad';
import TimeJumpEngine from './components/TimeJumpEngine';
import PreceptorDebrief from './components/PreceptorDebrief';
import UnitCensusBoard from './components/UnitCensusBoard';
import InpatientDebrief from './components/InpatientDebrief';
import FlightConfigModal from './components/FlightConfigModal';
import FlightManualModal from './components/FlightManualModal';
import CdsQuickConsultDrawer from './components/CdsQuickConsultDrawer';
import casesData from './data/cases.json';
import { loadCfsSession, saveCfsSession, clearCfsSession } from './utils/cfsPersistence';

export default function CfsApp({ 
  activePhase, 
  setActivePhase, 
  onCluesUpdated,
  flightConfig,
  setFlightConfig,
  isFlightConfigOpen,
  setIsFlightConfigOpen,
  isFlightManualOpen: externalIsFlightManualOpen,
  setIsFlightManualOpen: externalSetIsFlightManualOpen,
  isCdsConsultOpen: externalIsCdsConsultOpen,
  setIsCdsConsultOpen: externalSetIsCdsConsultOpen,
  cdsConsultTab: externalCdsConsultTab,
  setCdsConsultTab: externalSetCdsConsultTab,
  onSwitchToFullCds
}) {
  const [internalIsFlightManualOpen, setInternalIsFlightManualOpen] = useState(false);
  const isFlightManualOpen = externalIsFlightManualOpen !== undefined ? externalIsFlightManualOpen : internalIsFlightManualOpen;
  const setIsFlightManualOpen = externalSetIsFlightManualOpen || setInternalIsFlightManualOpen;

  const [internalIsCdsConsultOpen, setInternalIsCdsConsultOpen] = useState(false);
  const [internalCdsConsultTab, setInternalCdsConsultTab] = useState('dsm5');
  const isCdsConsultOpen = externalIsCdsConsultOpen !== undefined ? externalIsCdsConsultOpen : internalIsCdsConsultOpen;
  const setIsCdsConsultOpen = externalSetIsCdsConsultOpen || setInternalIsCdsConsultOpen;
  const cdsConsultTab = externalCdsConsultTab !== undefined ? externalCdsConsultTab : internalCdsConsultTab;
  const setCdsConsultTab = externalSetCdsConsultTab || setInternalCdsConsultTab;

  const handleOpenCdsConsult = (tab = 'dsm5') => {
    setCdsConsultTab(tab);
    setIsCdsConsultOpen(true);
  };

  const currentCase = casesData[0]; // Case 1: Marcus Vance (Solo Outpatient)

  // Outpatient Simulation Defaults
  const initialMessages = [
    {
      sender: 'patient',
      text: currentCase.dialogueLibrary.greeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ];

  const initialOrder = {
    diagnosisId: '',
    rationale: '',
    medicationId: '',
    startingDose: '',
    titrationSchedule: '',
    labsOrdered: ['Comprehensive Metabolic Panel (CMP)']
  };

  const initialClues = {
    clue_hypomania: false,
    clue_suicide: false,
    clue_alcohol: false,
    clue_family: false
  };

  // Load saved session on init
  const savedSession = loadCfsSession();

  const [messages, setMessages] = useState(() => savedSession?.messages || initialMessages);
  const [revealedClues, setRevealedClues] = useState(() => savedSession?.revealedClues || initialClues);
  const [orderData, setOrderData] = useState(() => savedSession?.orderData || initialOrder);
  const [week8Action, setWeek8Action] = useState(() => savedSession?.week8Action || '');

  // Inpatient Simulation State (Persisted)
  const [inpatientOrders, setInpatientOrders] = useState(() => savedSession?.inpatientOrders || {});
  const [inpatientNotes, setInpatientNotes] = useState(() => savedSession?.inpatientNotes || {});
  const [inpatientResults, setInpatientResults] = useState(() => savedSession?.inpatientResults || null);

  // Restore saved active phase, flight config, and clues on mount
  React.useEffect(() => {
    if (savedSession?.activePhase && setActivePhase) {
      setActivePhase(savedSession.activePhase);
    }
    if (savedSession?.flightConfig && setFlightConfig) {
      setFlightConfig(savedSession.flightConfig);
    }
    if (savedSession?.revealedClues && onCluesUpdated) {
      const count = Object.values(savedSession.revealedClues).filter(Boolean).length;
      onCluesUpdated(count, Object.keys(savedSession.revealedClues).length);
    }
  }, []);

  // Auto-save session whenever any state changes
  React.useEffect(() => {
    saveCfsSession({
      activePhase,
      flightConfig,
      messages,
      revealedClues,
      orderData,
      week8Action,
      inpatientOrders,
      inpatientNotes,
      inpatientResults
    });
  }, [
    activePhase,
    flightConfig,
    messages,
    revealedClues,
    orderData,
    week8Action,
    inpatientOrders,
    inpatientNotes,
    inpatientResults
  ]);

  // Notify parent on clues update
  const updateClues = (newClues) => {
    setRevealedClues(newClues);
    if (onCluesUpdated) {
      const count = Object.values(newClues).filter(Boolean).length;
      onCluesUpdated(count, Object.keys(newClues).length);
    }
  };

  // Handle probe button click (Outpatient)
  const handleAskProbe = (probe) => {
    const clinicianMsg = {
      sender: 'clinician',
      text: probe.question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    let badge = null;
    if (probe.revealsClue) {
      const nextClues = { ...revealedClues, [probe.revealsClue]: true };
      updateClues(nextClues);
      badge = currentCase.hiddenClinicalProfile[probe.revealsClue]?.title;
    }

    setTimeout(() => {
      const patientMsg = {
        sender: 'patient',
        text: probe.patientAnswer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        clueBadge: badge
      };
      setMessages(prev => [...prev, patientMsg]);
    }, 400);

    setMessages(prev => [...prev, clinicianMsg]);
  };

  // Handle custom typed questions (Outpatient)
  const handleSendCustomMessage = (text) => {
    if (!text.trim()) return;

    const clinicianMsg = {
      sender: 'clinician',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, clinicianMsg]);

    const lower = text.toLowerCase();
    let reply = "I... I guess so. Everything just feels kind of distant and grey right now.";
    let badge = null;

    if (lower.includes('sleep') || lower.includes('insomnia') || lower.includes('wake')) {
      reply = currentCase.dialogueLibrary.sleep;
    } else if (lower.includes('energy') || lower.includes('hyper') || lower.includes('fast') || lower.includes('racing') || lower.includes('creative') || lower.includes('day trade') || lower.includes('stocks') || lower.includes('up')) {
      reply = currentCase.dialogueLibrary.energy;
      const nextClues = { ...revealedClues, clue_hypomania: true };
      updateClues(nextClues);
      badge = currentCase.hiddenClinicalProfile.clue_hypomania.title;
    } else if (lower.includes('suicid') || lower.includes('die') || lower.includes('hurt') || lower.includes('kill') || lower.includes('better off')) {
      reply = currentCase.dialogueLibrary.suicide;
      const nextClues = { ...revealedClues, clue_suicide: true };
      updateClues(nextClues);
      badge = currentCase.hiddenClinicalProfile.clue_suicide.title;
    } else if (lower.includes('alcohol') || lower.includes('drink') || lower.includes('wine') || lower.includes('beer') || lower.includes('substance')) {
      reply = currentCase.dialogueLibrary.substances;
      const nextClues = { ...revealedClues, clue_alcohol: true };
      updateClues(nextClues);
      badge = currentCase.hiddenClinicalProfile.clue_alcohol.title;
    } else if (lower.includes('family') || lower.includes('mother') || lower.includes('father') || lower.includes('parent') || lower.includes('history')) {
      reply = currentCase.dialogueLibrary.family;
      const nextClues = { ...revealedClues, clue_family: true };
      updateClues(nextClues);
      badge = currentCase.hiddenClinicalProfile.clue_family.title;
    }

    setTimeout(() => {
      const patientMsg = {
        sender: 'patient',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        clueBadge: badge
      };
      setMessages(prev => [...prev, patientMsg]);
    }, 600);
  };

  const handleResetCase = () => {
    clearCfsSession();
    setMessages(initialMessages);
    updateClues(initialClues);
    setOrderData(initialOrder);
    setWeek8Action('');
    setInpatientOrders({});
    setInpatientNotes({});
    setInpatientResults(null);
    setActivePhase('interview');
  };

  const handleApplyConfig = (newConfig) => {
    setFlightConfig(newConfig);
    handleResetCase();
  };

  const isInpatient = flightConfig?.setting === 'inpatient';

  return (
    <div className="bg-slate-950 text-slate-100 min-h-[calc(100vh-8rem)]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Flight Parameters Modal */}
        <FlightConfigModal
          isOpen={isFlightConfigOpen}
          onClose={() => setIsFlightConfigOpen(false)}
          activeConfig={flightConfig || { setting: 'outpatient', volume: 1 }}
          onApplyConfig={handleApplyConfig}
        />

        {/* Flight Manual & Tutorial Modal */}
        <FlightManualModal
          isOpen={isFlightManualOpen}
          onClose={() => setIsFlightManualOpen(false)}
          onOpenFlightConfig={() => setIsFlightConfigOpen(true)}
          currentSetting={flightConfig?.setting}
        />

        {/* In-Flight CDS Quick-Consult Co-Pilot Drawer */}
        <CdsQuickConsultDrawer
          isOpen={isCdsConsultOpen}
          onClose={() => setIsCdsConsultOpen(false)}
          initialTab={cdsConsultTab}
          onSwitchToFullCds={onSwitchToFullCds}
        />

        {/* ── INPATIENT 16-BED RESIDENCY WARD SIMULATION ── */}
        {isInpatient ? (
          <>
            {activePhase !== 'debrief' && (
              <UnitCensusBoard
                completedOrders={inpatientOrders}
                setCompletedOrders={setInpatientOrders}
                bedNotes={inpatientNotes}
                setBedNotes={setInpatientNotes}
                onProceedToDebrief={(results) => {
                  setInpatientResults(results);
                  setActivePhase('debrief');
                }}
                onRestartUnit={handleResetCase}
                onOpenCdsConsult={handleOpenCdsConsult}
              />
            )}

            {activePhase === 'debrief' && (
              <InpatientDebrief
                inpatientResults={inpatientResults}
                onBackToBoard={() => setActivePhase('interview')}
                onRestartSimulation={() => {
                  setIsFlightConfigOpen(true);
                  handleResetCase();
                }}
              />
            )}
          </>
        ) : (
          /* ── SOLO OUTPATIENT TELEHEALTH SIMULATION (MARCUS VANCE) ── */
          <>
            {activePhase === 'interview' && (
              <VirtualExamRoom
                caseData={currentCase}
                messages={messages}
                onSendMessage={handleSendCustomMessage}
                onAskProbe={handleAskProbe}
                revealedClues={revealedClues}
                onAdvanceToCharting={() => setActivePhase('charting')}
                onOpenCdsConsult={handleOpenCdsConsult}
              />
            )}

            {activePhase === 'charting' && (
              <ClinicalChartPad
                caseData={currentCase}
                orderData={orderData}
                setOrderData={setOrderData}
                onBackToInterview={() => setActivePhase('interview')}
                onCommitOrderAndJump={() => setActivePhase('timejump')}
                onOpenCdsConsult={handleOpenCdsConsult}
              />
            )}

            {activePhase === 'timejump' && (
              <TimeJumpEngine
                caseData={currentCase}
                orderData={orderData}
                week8Action={week8Action}
                setWeek8Action={setWeek8Action}
                onBackToChart={() => setActivePhase('charting')}
                onProceedToDebrief={() => setActivePhase('debrief')}
              />
            )}

            {activePhase === 'debrief' && (
              <PreceptorDebrief
                caseData={currentCase}
                orderData={orderData}
                revealedClues={revealedClues}
                week8Action={week8Action}
                onRestartCase={handleResetCase}
                onBackToTimeJump={() => setActivePhase('timejump')}
                onOpenCdsConsult={handleOpenCdsConsult}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
