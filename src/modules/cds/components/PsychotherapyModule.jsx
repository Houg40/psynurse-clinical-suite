import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Wind, 
  Brain, 
  HeartHandshake, 
  Play, 
  Pause, 
  RotateCcw, 
  Copy, 
  Check, 
  Printer, 
  Quote, 
  ArrowRight, 
  ChevronRight, 
  Layers, 
  Activity, 
  CheckCircle2, 
  HelpCircle, 
  BookOpen, 
  Volume2,
  FileText,
  Sliders,
  Compass
} from 'lucide-react';
import psychotherapyData from '../data/psychotherapyData.json';

export default function PsychotherapyModule() {
  const [activeTab, setActiveTab] = useState('mi'); // 'mi' | 'mindfulness' | 'cbt' | 'billing'
  const [copiedKey, setCopiedKey] = useState(null);

  // Motivational Interviewing Readiness Ruler state
  const [readinessScore, setReadinessScore] = useState(6);
  const [targetChange, setTargetChange] = useState('taking medication consistently as prescribed');

  // Interactive Breathing Pacer state
  const [breathingPattern, setBreathingPattern] = useState('box'); // 'box' (4-4-4-4) | '478' (4-7-8)
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Inhale'); // 'Inhale' | 'Hold' | 'Exhale' | 'Rest'
  const [breathTimer, setBreathTimer] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);

  // CBT 5-Column Thought Record Builder State
  const [thoughtSituation, setThoughtSituation] = useState('Receiving an unexpected email from supervisor requesting a 9 AM meeting.');
  const [automaticThought, setAutomaticThought] = useState('I made a huge mistake and I am going to get fired.');
  const [selectedDistortions, setSelectedDistortions] = useState(['Catastrophizing', 'Fortune Telling', 'Mind Reading']);
  const [evidenceFor, setEvidenceFor] = useState('The email did not specify the agenda; supervisor seemed stressed yesterday.');
  const [evidenceAgainst, setEvidenceAgainst] = useState('My performance review last month was positive. Meetings without an agenda happen often. I have not received any formal disciplinary warnings.');
  const [balancedThought, setBalancedThought] = useState('Not knowing the agenda makes me feel anxious, but it does not mean I am in trouble. Even if there is constructive feedback, I have the capacity to handle it and learn.');

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Breathing Pacer Cycle Engine
  useEffect(() => {
    let interval = null;
    if (isBreathingActive) {
      interval = setInterval(() => {
        setBreathTimer((prev) => {
          if (prev > 1) {
            return prev - 1;
          }

          // Transition to next phase
          if (breathingPattern === 'box') {
            if (breathPhase === 'Inhale') {
              setBreathPhase('Hold');
              return 4;
            } else if (breathPhase === 'Hold') {
              setBreathPhase('Exhale');
              return 4;
            } else if (breathPhase === 'Exhale') {
              setBreathPhase('Rest');
              return 4;
            } else {
              setBreathPhase('Inhale');
              setCycleCount(c => c + 1);
              return 4;
            }
          } else {
            // 4-7-8 pattern
            if (breathPhase === 'Inhale') {
              setBreathPhase('Hold');
              return 7;
            } else if (breathPhase === 'Hold') {
              setBreathPhase('Exhale');
              return 8;
            } else {
              setBreathPhase('Inhale');
              setCycleCount(c => c + 1);
              return 4;
            }
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isBreathingActive, breathPhase, breathingPattern]);

  const handleStartStopBreathing = () => {
    if (isBreathingActive) {
      setIsBreathingActive(false);
    } else {
      setBreathPhase('Inhale');
      setBreathTimer(4);
      setIsBreathingActive(true);
    }
  };

  const handleResetBreathing = () => {
    setIsBreathingActive(false);
    setBreathPhase('Inhale');
    setBreathTimer(4);
    setCycleCount(0);
  };

  const toggleDistortion = (name) => {
    if (selectedDistortions.includes(name)) {
      setSelectedDistortions(selectedDistortions.filter(d => d !== name));
    } else {
      setSelectedDistortions([...selectedDistortions, name]);
    }
  };

  // Format full CBT Thought Record for clinical note
  const getCbtThoughtRecordNote = () => {
    return `COGNITIVE BEHAVIORAL THERAPY (CBT) - 5-COLUMN THOUGHT RECORD:
• TRIGGER / SITUATION: ${thoughtSituation}
• AUTOMATIC NEGATIVE THOUGHT (ANT): "${automaticThought}"
• IDENTIFIED COGNITIVE DISTORTIONS: ${selectedDistortions.join(', ') || 'None selected'}
• EVIDENCE SUPPORTING THOUGHT: ${evidenceFor}
• EVIDENCE CONTRADICTING THOUGHT: ${evidenceAgainst}
• BALANCED / ADAPTIVE REFRAME: "${balancedThought}"
• CLINICAL IMPRESSION: Patient demonstrated understanding of the cognitive triangle and successfully transitioned from rigid catastrophizing to an evidence-grounded adaptive appraisal.`;
  };

  const getMiReadinessNote = () => {
    const lower = Math.max(1, readinessScore - 2);
    const higher = Math.min(10, readinessScore + 2);
    return `MOTIVATIONAL INTERVIEWING (MI) - READINESS ASSESSMENT:
• TARGET CHANGE: ${targetChange}
• READINESS RULER SCORE: ${readinessScore}/10
• CLINICAL INQUIRY APPLIED: Explored why score was a ${readinessScore} rather than a ${lower} (elicited intrinsic desire, personal strengths, and values). Examined what barriers need resolution to move toward a ${higher}/10.
• CLINICAL IMPRESSION: Patient articulated preparatory change talk and identified autonomous next steps.`;
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 text-white p-6 rounded-2xl shadow-md border border-teal-700/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-teal-400/20 text-teal-200 text-xs font-black uppercase px-2.5 py-0.5 rounded-full border border-teal-400/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-300" />
                Evidence-Based Psychotherapy Suite
              </span>
              <span className="bg-slate-700/60 text-slate-300 text-xs font-semibold px-2 py-0.5 rounded-full">
                APRN / PMHNP Clinical Scripts
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Psychotherapy Practice Scripts & Interventions
            </h1>
            <p className="text-teal-100 text-sm mt-1 max-w-2xl">
              Rapid clinical scripts, interactive somatic tools, and 1-click EHR documentation for 
              <strong> Motivational Interviewing (MI)</strong>, <strong>Mindfulness & Grounding</strong>, and <strong>Cognitive Behavioral Therapy (CBT)</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-teal-700/60 hover:bg-teal-700 text-white rounded-lg text-xs font-bold border border-teal-500/40 transition-all shadow-xs"
            >
              <Printer className="w-4 h-4 text-teal-200" />
              Print Guide / Handout
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-teal-700/40">
          <button
            onClick={() => setActiveTab('mi')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'mi'
                ? 'bg-white text-teal-900 shadow-md font-extrabold'
                : 'bg-teal-800/60 text-teal-100 hover:bg-teal-700/80 hover:text-white'
            }`}
          >
            <HeartHandshake className="w-4 h-4 text-amber-500" />
            <span>Motivational Interviewing (MI)</span>
          </button>

          <button
            onClick={() => setActiveTab('mindfulness')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'mindfulness'
                ? 'bg-white text-teal-900 shadow-md font-extrabold'
                : 'bg-teal-800/60 text-teal-100 hover:bg-teal-700/80 hover:text-white'
            }`}
          >
            <Wind className="w-4 h-4 text-cyan-500" />
            <span>Mindfulness & Grounding</span>
          </button>

          <button
            onClick={() => setActiveTab('cbt')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'cbt'
                ? 'bg-white text-teal-900 shadow-md font-extrabold'
                : 'bg-teal-800/60 text-teal-100 hover:bg-teal-700/80 hover:text-white'
            }`}
          >
            <Brain className="w-4 h-4 text-indigo-400" />
            <span>Cognitive Behavioral Therapy (CBT)</span>
          </button>

          <button
            onClick={() => setActiveTab('billing')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'billing'
                ? 'bg-white text-teal-900 shadow-md font-extrabold'
                : 'bg-teal-800/60 text-teal-100 hover:bg-teal-700/80 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>EHR & CPT 90833 Blurbs</span>
          </button>
        </div>
      </div>

      {/* TAB 1: MOTIVATIONAL INTERVIEWING (MI) */}
      {activeTab === 'mi' && (
        <div className="space-y-6">
          {/* Quick Overview Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Miller & Rollnick Clinical Core
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-1">
                  Motivational Interviewing: OARS & Change Talk Scripts
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Designed to guide patients through ambivalence regarding medication adherence, substance cessation, and lifestyle modifications without provoking confrontation or resistance.
                </p>
              </div>
            </div>

            {/* OARS Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              {psychotherapyData.modalities[0].oars.map((item) => (
                <div key={item.letter} className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 hover:border-teal-300 transition-colors">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="w-8 h-8 rounded-lg bg-teal-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                      {item.letter}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{item.technique}</h3>
                      <span className="text-[11px] text-slate-500">{item.clinicalPrompt}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                    {item.purpose}
                  </p>
                  
                  <div className="bg-white rounded-lg p-3 border border-slate-200 space-y-2">
                    <span className="text-[10px] font-black uppercase text-teal-800 tracking-wider block">
                      Verbatim Scripts to Say:
                    </span>
                    {item.scripts.map((script, idx) => (
                      <div key={idx} className="flex items-start justify-between gap-2 text-xs text-slate-800 italic bg-teal-50/40 p-2 rounded border border-teal-100">
                        <span>{script}</span>
                        <button
                          onClick={() => copyToClipboard(script, `oars_${item.letter}_${idx}`)}
                          className="text-slate-400 hover:text-teal-700 shrink-0 p-1"
                          title="Copy script"
                        >
                          {copiedKey === `oars_${item.letter}_${idx}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Readiness Ruler */}
          <div className="bg-gradient-to-br from-amber-50/70 via-white to-amber-50/30 border border-amber-200 rounded-xl p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  Interactive Clinical Tool
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-600" />
                  The 1–10 Importance & Readiness Ruler
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Ask the patient to rate their readiness. Move the slider to generate the exact organic change-talk elicitation questions.
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(getMiReadinessNote(), 'mi_ruler_note')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs shrink-0"
              >
                {copiedKey === 'mi_ruler_note' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Ruler Note for EHR
              </button>
            </div>

            {/* Target change input */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Target Behavior / Goal:
              </label>
              <input
                type="text"
                value={targetChange}
                onChange={(e) => setTargetChange(e.target.value)}
                placeholder="e.g. taking Sertraline daily, cutting alcohol to 1 drink/day, attending weekly counseling"
                className="w-full text-xs sm:text-sm px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            {/* Slider Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">1: Not Ready at All</span>
                <span className="text-sm font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  Patient Selected: {readinessScore} / 10
                </span>
                <span className="text-xs font-bold text-slate-500">10: Completely Ready</span>
              </div>

              <input
                type="range"
                min="1"
                max="10"
                value={readinessScore}
                onChange={(e) => setReadinessScore(parseInt(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />

              {/* Dynamic Follow-up Prompts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="bg-amber-50/80 border border-amber-200/90 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-1">
                    <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
                    1. Downward Inquiry (Elicits Change Talk):
                  </div>
                  <p className="text-xs text-slate-800 italic">
                    "Why did you choose a <strong className="text-amber-900 font-bold">{readinessScore}</strong> and not a <strong className="text-slate-900 font-bold">{Math.max(1, readinessScore - 2)}</strong>?"
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Forces the patient to argue in favor of change, vocalizing their genuine strengths and internal motivations.
                  </p>
                </div>

                <div className="bg-teal-50/80 border border-teal-200/90 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900 mb-1">
                    <ArrowRight className="w-3.5 h-3.5 text-teal-700" />
                    2. Upward Inquiry (Identifies Concrete Barriers):
                  </div>
                  <p className="text-xs text-slate-800 italic">
                    "What would it take for you to move from a <strong className="text-teal-900 font-bold">{readinessScore}</strong> to an <strong className="text-slate-900 font-bold">{Math.min(10, readinessScore + 2)}</strong>?"
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Invites collaborative problem-solving without provider nagging or unsolicited lecturing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Rolling with Resistance & Discord */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
              <Compass className="w-4 h-4 text-teal-600" />
              Rolling with Resistance & Clinical Discord De-escalation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {psychotherapyData.modalities[0].resistanceDiscord.map((item, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <span className="text-xs font-bold text-teal-800 block mb-1">
                    {item.strategy}
                  </span>
                  <p className="text-xs text-slate-700 italic bg-white p-2 rounded border border-slate-200/70">
                    {item.script}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MINDFULNESS & SOMATIC GROUNDING */}
      {activeTab === 'mindfulness' && (
        <div className="space-y-6">
          {/* Interactive Breathing Pacer Widget */}
          <div className="bg-gradient-to-br from-cyan-900 via-teal-900 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-cyan-500/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-md">
                <span className="bg-cyan-400/20 text-cyan-200 text-xs font-black uppercase px-2.5 py-0.5 rounded-full border border-cyan-400/30 inline-flex items-center gap-1.5 mb-2">
                  <Wind className="w-3.5 h-3.5 text-cyan-300" />
                  Live In-Session Pacer
                </span>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Interactive Somatic Breathing Guide
                </h2>
                <p className="text-xs sm:text-sm text-cyan-100 mt-1">
                  Use live with the patient over telehealth or in-clinic to downregulate acute autonomic arousal, panic sensations, or racing thoughts.
                </p>

                {/* Pattern Toggle */}
                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={() => { setBreathingPattern('box'); handleResetBreathing(); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      breathingPattern === 'box'
                        ? 'bg-cyan-400 text-slate-950 font-black'
                        : 'bg-white/10 text-cyan-200 hover:bg-white/20'
                    }`}
                  >
                    Box Breathing (4-4-4-4)
                  </button>
                  <button
                    onClick={() => { setBreathingPattern('478'); handleResetBreathing(); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      breathingPattern === '478'
                        ? 'bg-cyan-400 text-slate-950 font-black'
                        : 'bg-white/10 text-cyan-200 hover:bg-white/20'
                    }`}
                  >
                    4-7-8 Vagal Reset
                  </button>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3 mt-5">
                  <button
                    onClick={handleStartStopBreathing}
                    className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md ${
                      isBreathingActive
                        ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                        : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950'
                    }`}
                  >
                    {isBreathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isBreathingActive ? 'Pause Exercise' : 'Start Breathing Guide'}
                  </button>
                  <button
                    onClick={handleResetBreathing}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-cyan-200 transition-colors"
                    title="Reset Pacer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  {cycleCount > 0 && (
                    <span className="text-xs text-cyan-300 font-semibold">
                      Completed Cycles: <strong>{cycleCount}</strong>
                    </span>
                  )}
                </div>
              </div>

              {/* Animated Pacer Visual Circle */}
              <div className="flex flex-col items-center justify-center p-6">
                <div 
                  className={`w-44 h-44 rounded-full flex flex-col items-center justify-center border-4 transition-all duration-1000 shadow-2xl relative ${
                    isBreathingActive
                      ? breathPhase === 'Inhale' 
                        ? 'scale-110 border-cyan-400 bg-cyan-500/30 ring-8 ring-cyan-400/20' 
                        : breathPhase === 'Hold'
                        ? 'scale-110 border-amber-400 bg-amber-500/30 ring-8 ring-amber-400/20'
                        : breathPhase === 'Exhale'
                        ? 'scale-90 border-teal-300 bg-teal-600/30 ring-4 ring-teal-300/10'
                        : 'scale-90 border-slate-500 bg-slate-800/40'
                      : 'scale-100 border-white/20 bg-white/5'
                  }`}
                >
                  <span className="text-xs font-black uppercase tracking-widest text-cyan-200">
                    {isBreathingActive ? breathPhase : 'READY'}
                  </span>
                  <span className="text-4xl font-black text-white my-1 font-mono">
                    {isBreathingActive ? breathTimer : '4'}
                  </span>
                  <span className="text-[10px] text-cyan-200 uppercase font-semibold">
                    {breathingPattern === 'box' ? 'Box Rhythm' : 'Vagal Brake'}
                  </span>
                </div>
                <span className="text-xs text-cyan-200/80 mt-3 text-center">
                  {breathingPattern === 'box' 
                    ? '4s Inhale • 4s Hold • 4s Exhale • 4s Rest' 
                    : '4s Inhale • 7s Hold • 8s Extended Exhale'}
                </span>
              </div>
            </div>
          </div>

          {/* 5-4-3-2-1 Sensory Grounding Script */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                  Acute Distress Tolerance
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  5-4-3-2-1 Sensory Grounding Script
                </h3>
                <p className="text-xs text-slate-600">
                  Interrupts amygdala fight-or-flight overdrive by anchoring consciousness in sensory orientation.
                </p>
              </div>

              <button
                onClick={() => {
                  const scriptText = psychotherapyData.modalities[1].interventions[0].scriptSteps
                    .map(s => `• ${s.step} ${s.sense}: ${s.script}`).join('\n');
                  copyToClipboard(scriptText, 'grounding_54321');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-all shadow-xs"
              >
                {copiedKey === 'grounding_54321' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Full Script
              </button>
            </div>

            <div className="space-y-2.5">
              {psychotherapyData.modalities[1].interventions[0].scriptSteps.map((step) => (
                <div key={step.step} className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200/70">
                  <span className="w-7 h-7 rounded-full bg-cyan-600 text-white text-xs font-black flex items-center justify-center shrink-0">
                    {step.step}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-xs font-extrabold text-cyan-900 uppercase tracking-wider">{step.sense}</strong>
                      <span className="text-xs text-slate-500">— {step.instruction}</span>
                    </div>
                    <p className="text-xs text-slate-800 italic mt-1 bg-white p-2 rounded border border-slate-200/80">
                      {step.script}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Urge Surfing & Progressive Muscle Relaxation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                Craving & Impulse Control
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-1">
                Urge Surfing (Alan Marlatt Protocol)
              </h3>
              <p className="text-xs text-slate-600 mt-1 mb-3">
                For substance cravings (alcohol, cannabis, stimulants) and behavioral urges (binge eating, self-harm, anger outbursts).
              </p>
              <div className="bg-indigo-50/40 p-3 rounded-lg border border-indigo-100 text-xs text-slate-800 italic leading-relaxed">
                {psychotherapyData.modalities[1].interventions[3].script}
              </div>
              <button
                onClick={() => copyToClipboard(psychotherapyData.modalities[1].interventions[3].script, 'urge_surf')}
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-xs font-semibold"
              >
                {copiedKey === 'urge_surf' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                Copy Urge Surfing Script
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Physical Tension & Insomnia
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-1">
                Brief Progressive Muscle Relaxation (PMR)
              </h3>
              <p className="text-xs text-slate-600 mt-1 mb-3">
                Systematic tensing and releasing to lower systemic cortisol and release somatic guarding in the shoulders, jaw, and chest.
              </p>
              <div className="bg-teal-50/40 p-3 rounded-lg border border-teal-100 text-xs text-slate-800 italic leading-relaxed">
                {psychotherapyData.modalities[1].interventions[4].script}
              </div>
              <button
                onClick={() => copyToClipboard(psychotherapyData.modalities[1].interventions[4].script, 'pmr_script')}
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-xs font-semibold"
              >
                {copiedKey === 'pmr_script' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                Copy PMR Script
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: COGNITIVE BEHAVIORAL THERAPY (CBT) */}
      {activeTab === 'cbt' && (
        <div className="space-y-6">
          {/* Interactive 5-Column Thought Record Builder */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  Interactive Clinical Tool
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-indigo-600" />
                  Interactive 5-Column CBT Thought Record
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Walk through a patient's triggering automatic negative thought (ANT) in-session to formulate an evidence-based balanced reframe.
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(getCbtThoughtRecordNote(), 'cbt_record_note')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs shrink-0"
              >
                {copiedKey === 'cbt_record_note' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Thought Record Note for EHR
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Column 1 & 2: Trigger & Automatic Thought */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    1. Trigger / Situation (Who, What, When, Where):
                  </label>
                  <textarea
                    rows={2}
                    value={thoughtSituation}
                    onChange={(e) => setThoughtSituation(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="e.g. Boss sent an email asking to talk tomorrow morning..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-rose-700 mb-1">
                    2. Automatic Negative Thought (ANT) & Core Belief:
                  </label>
                  <textarea
                    rows={2}
                    value={automaticThought}
                    onChange={(e) => setAutomaticThought(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2.5 bg-rose-50/50 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    placeholder="e.g. I am definitely getting fired and my family will be ruined..."
                  />
                </div>

                {/* Evidence For */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    4a. Factual Evidence That SUPPORTS the Thought:
                  </label>
                  <textarea
                    rows={2}
                    value={evidenceFor}
                    onChange={(e) => setEvidenceFor(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Stick strictly to verifiable facts, not feelings or assumptions..."
                  />
                </div>
              </div>

              {/* Column 3 & 4: Distortions & Evidence Against */}
              <div className="space-y-3">
                {/* Cognitive Distortions Checklist */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    3. Select Cognitive Distortions Present:
                  </label>
                  <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 bg-slate-50 border border-slate-200 rounded-lg">
                    {psychotherapyData.modalities[2].cognitiveDistortions.map((d) => {
                      const isSelected = selectedDistortions.includes(d.name);
                      return (
                        <button
                          key={d.name}
                          type="button"
                          onClick={() => toggleDistortion(d.name)}
                          className={`text-[11px] px-2 py-0.5 rounded font-semibold transition-all ${
                            isSelected
                              ? 'bg-indigo-600 text-white font-bold'
                              : 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-300'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}{d.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Evidence Against */}
                <div>
                  <label className="block text-xs font-bold text-emerald-800 mb-1">
                    4b. Objective Evidence CONTRADICTING the Thought:
                  </label>
                  <textarea
                    rows={2}
                    value={evidenceAgainst}
                    onChange={(e) => setEvidenceAgainst(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2.5 bg-emerald-50/40 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="e.g. My recent review was positive, meetings happen regularly..."
                  />
                </div>

                {/* Column 5: Balanced Adaptive Reframe */}
                <div>
                  <label className="block text-xs font-bold text-teal-800 mb-1">
                    5. Balanced / Adaptive Alternative Reframe:
                  </label>
                  <textarea
                    rows={2}
                    value={balancedThought}
                    onChange={(e) => setBalancedThought(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2.5 bg-teal-50/50 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none font-medium"
                    placeholder="Realistic, compassionate perspective accounting for all the facts..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Socratic Questioning Dialogue Scripts */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
              <Quote className="w-4 h-4 text-indigo-600" />
              Socratic Questioning Clinical Inquiry Scripts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {psychotherapyData.modalities[2].socraticQuestioning.map((sq, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <span className="text-xs font-bold text-indigo-900 block mb-1">
                    {sq.category}
                  </span>
                  <p className="text-xs text-slate-800 italic bg-white p-2 rounded border border-slate-200/80">
                    {sq.script}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 10 Common Cognitive Distortions Glossary */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-teal-600" />
              10 Common Cognitive Distortions (Patient Psychoeducation)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {psychotherapyData.modalities[2].cognitiveDistortions.map((dist) => (
                <div key={dist.name} className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <strong className="text-slate-900 font-extrabold">{dist.name}</strong>
                    <span className="text-[10px] text-slate-500 italic">{dist.aka}</span>
                  </div>
                  <p className="text-slate-600 mb-1.5">{dist.definition}</p>
                  <div className="bg-rose-50 text-rose-900 p-1.5 rounded border border-rose-100 italic mb-1">
                    Example: {dist.example}
                  </div>
                  <div className="bg-emerald-50 text-emerald-900 p-1.5 rounded border border-emerald-100 font-medium">
                    Reframe: {dist.reframe}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Behavioral Activation (BA) Protocol */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                Behavioral Activation (BA) Protocol for Depressive Inertia
              </h3>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Action Precedes Motivation
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Depression traps patients in a negative feedback loop: Low energy ➔ Withdrawal / staying in bed ➔ Lack of positive neurochemical rewards ➔ Deepening depression.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {psychotherapyData.modalities[2].behavioralActivation.steps.map((st) => (
                <div key={st.step} className="bg-emerald-50/40 border border-emerald-200 rounded-lg p-3 text-xs">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-black text-[11px] flex items-center justify-center mb-1.5">
                    {st.step}
                  </span>
                  <h4 className="font-bold text-slate-900 mb-1">{st.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{st.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: EHR & CPT 90833 DOCUMENTATION BLURBS */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Audit-Proof Medical Billing Documentation
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              CPT Psychotherapy Add-On Documentation Templates (90833 / 90836)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Copy ready-to-paste clinical psychotherapy notes into Tebra EHR. Add-on code <strong>CPT 90833</strong> requires <strong>16 to 37 minutes</strong> of face-to-face psychotherapy documented separately from Evaluation & Management (E/M).
            </p>

            <div className="grid grid-cols-1 gap-4 mt-5">
              {psychotherapyData.cptBillingBlurbs.map((item) => (
                <div key={item.code} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-black text-slate-900 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
                        {item.code}
                      </span>
                      <span className="text-xs font-semibold text-slate-600 ml-2">
                        {item.description}
                      </span>
                    </div>

                    <button
                      onClick={() => copyToClipboard(item.template, item.code)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
                    >
                      {copiedKey === item.code ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      Copy {item.code} Blurb
                    </button>
                  </div>

                  <pre className="bg-white p-3.5 rounded-lg border border-slate-200 text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                    {item.template}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
