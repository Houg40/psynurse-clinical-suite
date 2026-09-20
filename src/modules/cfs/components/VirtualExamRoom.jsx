import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, AlertCircle, HeartPulse, User, HelpCircle, CheckCircle2, ChevronRight, Activity, Volume2, VolumeX, Mic, Play, Eye, List, LayoutGrid, Info } from 'lucide-react';

export default function VirtualExamRoom({ caseData, messages, onSendMessage, onAskProbe, revealedClues, onAdvanceToCharting }) {
  const [customInput, setCustomInput] = useState('');
  const [isAudioEnabled, setIsAudioEnabled] = useState(false); // Default OFF - requires manual clinician selection
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hoveredProbe, setHoveredProbe] = useState(null);
  const [probeViewMode, setProbeViewMode] = useState('full'); // 'full' (complete questions) | 'compact'
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Text to Speech playback function
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // Stop any active speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95; // Slightly slower, authentic fatigued cadence
    utterance.pitch = 0.92; // Slightly deeper male tone

    // Attempt to pick male English voice if available
    const voices = window.speechSynthesis.getVoices();
    const maleVoice = voices.find(v => 
      v.lang.startsWith('en') && 
      (v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('guy') || v.name.toLowerCase().includes('george'))
    );
    if (maleVoice) {
      utterance.voice = maleVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Speak latest patient response ONLY if audio is explicitly enabled by clinician
  useEffect(() => {
    if (!isAudioEnabled || messages.length === 0) return;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.sender === 'patient') {
      speakText(lastMsg.text);
    }
  }, [messages, isAudioEnabled]);

  const toggleAudio = () => {
    if (isAudioEnabled) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setIsAudioEnabled(prev => !prev);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    onSendMessage(customInput);
    setCustomInput('');
  };

  const patient = caseData.patient;
  const cluesList = Object.values(caseData.hiddenClinicalProfile);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Left Column: Patient Telehealth Video Feed & Non-Verbal Observations (4 cols) */}
      <div className="lg:col-span-4 space-y-4">
        
        {/* Telehealth Video Card */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="relative aspect-video bg-slate-950 flex items-center justify-center">
            <img
              src={patient.avatar}
              alt={patient.name}
              className="w-full h-full object-cover opacity-85"
            />
            {/* Live Indicator Overlay */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs border border-slate-700/60 text-[11px] font-bold text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Telehealth Room • Live</span>
            </div>

            {/* Audio Toggle & Speaking Status Overlay */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              {isSpeaking && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-950/90 border border-teal-500 text-[10px] font-bold text-teal-300 shadow-md animate-pulse">
                  <span className="flex gap-0.5 items-end h-2.5">
                    <span className="w-0.5 h-full bg-teal-400 animate-bounce"></span>
                    <span className="w-0.5 h-2 bg-teal-400 animate-bounce [animation-delay:0.1s]"></span>
                    <span className="w-0.5 h-3 bg-teal-400 animate-bounce [animation-delay:0.2s]"></span>
                  </span>
                  <span>Speaking...</span>
                </div>
              )}
              <button
                onClick={toggleAudio}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full border backdrop-blur-xs transition-all shadow-md text-[11px] font-bold ${
                  isAudioEnabled
                    ? 'bg-teal-600/95 border-teal-400 text-white hover:bg-teal-500 shadow-teal-900/30'
                    : 'bg-slate-900/85 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                title={isAudioEnabled ? "Voice Enabled (Click to Mute)" : "Voice Muted (Click to Turn Voice On)"}
              >
                {isAudioEnabled ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-teal-200" />
                    <span>Voice ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                    <span>Voice OFF</span>
                  </>
                )}
              </button>
            </div>
            {/* Patient Name Overlay */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-900/85 backdrop-blur-xs border border-slate-700/60">
              <div>
                <p className="text-xs font-bold text-white leading-tight">{patient.name}</p>
                <p className="text-[10px] text-slate-400">{patient.age}yo • {patient.occupation}</p>
              </div>
              <span className="text-[10px] font-semibold text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800/60">
                Patient Intake
              </span>
            </div>
          </div>

          {/* Non-Verbal & Mental Status Observations */}
          <div className="p-4 space-y-3 bg-slate-900/90 text-xs">
            <div className="flex items-center gap-2 text-teal-400 font-bold border-b border-slate-800 pb-2">
              <Activity className="w-4 h-4" />
              <span>Real-Time Clinical Observations (MSE)</span>
            </div>
            
            <div className="space-y-1.5 text-slate-300">
              <p><strong className="text-slate-400">Affect:</strong> Constricted, blunted; minimal spontaneous smile.</p>
              <p><strong className="text-slate-400">Eye Contact:</strong> Intermittent, tends to look down at hands.</p>
              <p><strong className="text-slate-400">Latency:</strong> Noticeable 2-3 second pause before answering.</p>
              <p><strong className="text-slate-400">Speech:</strong> Soft volume, monotonous tone.</p>
            </div>

            {/* Vital Signs Glance */}
            <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 block">Blood Pressure</span>
                <span className="font-bold text-white">{patient.vitals.bp}</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 block">Heart Rate</span>
                <span className="font-bold text-white">{patient.vitals.hr}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden Clues Discovery Panel */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Diagnostic Objectives
            </h4>
            <span className="text-[10px] text-teal-400 font-bold">
              {Object.values(revealedClues).filter(Boolean).length} / {cluesList.length} Uncovered
            </span>
          </div>

          <div className="space-y-2">
            {cluesList.map((clue) => {
              const isFound = revealedClues[clue.id];
              return (
                <div
                  key={clue.id}
                  className={`p-2.5 rounded-xl border text-xs transition-all ${
                    isFound
                      ? 'bg-emerald-950/30 border-emerald-800/70 text-emerald-200'
                      : 'bg-slate-950/40 border-slate-800/70 text-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isFound ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <HelpCircle className="w-4 h-4 text-slate-600 flex-shrink-0" />
                    )}
                    <span className="font-semibold">{clue.title}</span>
                  </div>
                  {isFound && (
                    <p className="text-[11px] text-slate-300 mt-1 pl-6 leading-relaxed">
                      {clue.detail}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Right Column: Interactive Chat & Clinical Probing Suite (8 cols) */}
      <div className="lg:col-span-8 flex flex-col h-[700px] bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-300">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Clinical Diagnostic Interview</h3>
              <p className="text-[11px] text-slate-400">Ask clinical questions to explore symptoms, rule out mania, and assess safety.</p>
            </div>
          </div>

          <button
            onClick={onAdvanceToCharting}
            className="flex items-center gap-1.5 text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-xl transition-all shadow-sm"
          >
            <span>Proceed to Chart &amp; Orders</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Message Transcript Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => {
            const isClinician = msg.sender === 'clinician';
            return (
              <div
                key={idx}
                className={`flex flex-col ${isClinician ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[10px] text-slate-500 mb-1 px-1">
                  {isClinician ? 'You (Clinician)' : `${patient.name} (Patient)`}
                </span>
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-sm ${
                    isClinician
                      ? 'bg-teal-600 text-white rounded-tr-xs'
                      : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="flex-1">{msg.text}</p>
                    {!isClinician && (
                      <button
                        onClick={() => speakText(msg.text)}
                        className="text-slate-400 hover:text-teal-300 hover:bg-slate-700/60 p-1.5 rounded-md transition-all flex-shrink-0 flex items-center gap-1 text-[11px]"
                        title="Click to play spoken voice"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span className="text-[10px] hidden sm:inline text-slate-400">Play Voice</span>
                      </button>
                    )}
                  </div>
                  {msg.revealedBadge && (
                    <div className="mt-2.5 pt-2 border-t border-emerald-500/30 flex items-center gap-1.5 text-[11px] font-bold text-emerald-300">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Diagnostic Insight Unlocked: {msg.revealedBadge}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Clinical Probes Action Dock */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 space-y-2 relative">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Quick-Action Clinical Probes (Click to Ask)</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 hidden sm:inline">
                Hover to preview • Click to ask
              </span>
              <button
                type="button"
                onClick={() => setProbeViewMode(prev => prev === 'full' ? 'compact' : 'full')}
                className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-900 hover:bg-slate-800 text-teal-300 border border-slate-700 hover:border-teal-500 transition-all flex items-center gap-1 shadow-xs cursor-pointer"
                title="Toggle between full multiline questions and compact pills"
              >
                {probeViewMode === 'full' ? (
                  <>
                    <LayoutGrid className="w-2.5 h-2.5" />
                    <span>Compact View</span>
                  </>
                ) : (
                  <>
                    <List className="w-2.5 h-2.5" />
                    <span>Full Questions</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Dedicated Hover Preview Popover */}
          {hoveredProbe && (
            <div className="p-3 bg-slate-900/95 border-2 border-teal-400 rounded-xl shadow-2xl space-y-1 animate-in fade-in zoom-in-95 duration-100 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                  <span>Clinical Probe Preview: [{hoveredProbe.category}]</span>
                </span>
                <span className="text-[10px] font-bold text-teal-200 bg-teal-950/90 px-2 py-0.5 rounded border border-teal-800 shadow-xs">
                  Click to Ask {patient.name}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                "{hoveredProbe.question}"
              </p>
              {hoveredProbe.revealsClue && (
                <div className="text-[10px] text-amber-300 flex items-center gap-1 pt-0.5 font-medium">
                  <Sparkles className="w-3 h-3 text-amber-400 flex-shrink-0" />
                  <span>
                    {revealedClues[hoveredProbe.revealsClue]
                      ? '✓ Diagnostic clue already uncovered on chart'
                      : '🎯 Key Diagnostic Probe: Uncovers crucial psychiatric history'}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Probes List (Full View or Compact View) */}
          {probeViewMode === 'full' ? (
            <div className="space-y-1.5 max-h-40 sm:max-h-48 overflow-y-auto pr-1">
              {caseData.dialogueLibrary.probes.map((probe) => {
                const clueRevealed = probe.revealsClue && revealedClues[probe.revealsClue];
                const isHovered = hoveredProbe?.id === probe.id;
                return (
                  <button
                    key={probe.id}
                    type="button"
                    onClick={() => onAskProbe(probe)}
                    onMouseEnter={() => setHoveredProbe(probe)}
                    onMouseLeave={() => setHoveredProbe(null)}
                    onFocus={() => setHoveredProbe(probe)}
                    onBlur={() => setHoveredProbe(null)}
                    title={`[${probe.category}]: "${probe.question}"`}
                    className={`w-full text-xs p-2.5 rounded-xl border transition-all text-left flex items-start gap-2.5 group cursor-pointer ${
                      isHovered
                        ? 'border-teal-400 ring-2 ring-teal-500/40 bg-slate-800 text-white shadow-lg'
                        : clueRevealed
                          ? 'bg-emerald-950/40 border-emerald-800 hover:border-emerald-500 text-emerald-100'
                          : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-700/80 hover:border-teal-500'
                    }`}
                  >
                    <span className="font-extrabold text-[11px] text-teal-400 bg-teal-950/80 border border-teal-800/80 px-2 py-0.5 rounded flex-shrink-0 mt-0.5">
                      {probe.category}
                    </span>
                    <span className="flex-1 text-slate-200 text-xs leading-relaxed group-hover:text-white font-medium">
                      {probe.question}
                    </span>
                    {probe.revealsClue && (
                      <span className="text-[10px] font-bold text-amber-300/90 bg-amber-950/60 border border-amber-800/60 px-1.5 py-0.5 rounded flex-shrink-0 flex items-center gap-1 self-center">
                        <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                        {clueRevealed ? 'Clue Unlocked' : 'Key Clue'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
              {caseData.dialogueLibrary.probes.map((probe) => {
                const clueRevealed = probe.revealsClue && revealedClues[probe.revealsClue];
                const isHovered = hoveredProbe?.id === probe.id;
                return (
                  <button
                    key={probe.id}
                    type="button"
                    onClick={() => onAskProbe(probe)}
                    onMouseEnter={() => setHoveredProbe(probe)}
                    onMouseLeave={() => setHoveredProbe(null)}
                    onFocus={() => setHoveredProbe(probe)}
                    onBlur={() => setHoveredProbe(null)}
                    title={`[${probe.category}]: "${probe.question}"`}
                    className={`text-[11px] font-medium px-3 py-1.5 rounded-lg border transition-all text-left flex items-center gap-1.5 group cursor-pointer ${
                      isHovered
                        ? 'border-teal-400 ring-2 ring-teal-500/40 bg-slate-800 text-white shadow-md'
                        : clueRevealed
                          ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700 hover:border-teal-500'
                    }`}
                  >
                    <span className="font-bold text-teal-400">[{probe.category}]</span>
                    <span className="text-slate-300 group-hover:text-white leading-snug">{probe.question}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Free-form Text Entry Form */}
          <form onSubmit={handleSend} className="flex gap-2 pt-1">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Or type your own clinical question to Marcus..."
              className="flex-1 bg-slate-900 border border-slate-600 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 font-medium"
            />
            <button
              type="submit"
              disabled={!customInput.trim()}
              className="bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
