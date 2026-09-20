import React, { useState } from 'react';
import { 
  Sliders, 
  Building2, 
  UserCheck, 
  AlertTriangle, 
  Check, 
  X, 
  ShieldAlert, 
  Clock, 
  Users, 
  Scale, 
  Zap, 
  ChevronRight,
  Info,
  Stethoscope
} from 'lucide-react';
import { SIMULATION_PRESETS } from '../data/inpatientScenarios';

export default function FlightConfigModal({ 
  isOpen, 
  onClose, 
  activeConfig, 
  onApplyConfig 
}) {
  const [selectedPresetId, setSelectedPresetId] = useState(activeConfig.id || 'outpatient-solo');
  const [customSetting, setCustomSetting] = useState(activeConfig.setting || 'outpatient');
  const [customVolume, setCustomVolume] = useState(activeConfig.volume || 1);
  const [customLegal, setCustomLegal] = useState(activeConfig.legalStatus || 'Voluntary');
  const [customFriction, setCustomFriction] = useState(activeConfig.friction || 'standard');
  const [activeTab, setActiveTab] = useState('presets'); // 'presets' | 'custom'

  if (!isOpen) return null;

  const handleSelectPreset = (preset) => {
    setSelectedPresetId(preset.id);
    setCustomSetting(preset.setting);
    setCustomVolume(preset.volume);
    setCustomLegal(preset.legalStatus);
    setCustomFriction(preset.setting === 'inpatient' ? 'high' : 'standard');
  };

  const handleLaunch = () => {
    const selectedPreset = SIMULATION_PRESETS.find(p => p.id === selectedPresetId);
    const finalConfig = {
      id: activeTab === 'presets' && selectedPreset ? selectedPreset.id : 'custom-flight',
      title: activeTab === 'presets' && selectedPreset ? selectedPreset.title : 'Custom Simulation Flight',
      subtitle: activeTab === 'presets' && selectedPreset ? selectedPreset.subtitle : `${customSetting.toUpperCase()} • ${customVolume} Patient(s)`,
      setting: customSetting,
      volume: customVolume,
      legalStatus: customLegal,
      friction: customFriction
    };

    onApplyConfig(finalConfig);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950/60 to-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-wide flex items-center gap-2">
                Flight Parameters Configurator
                <span className="text-[10px] uppercase font-bold tracking-widest bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
                  Simulation Cockpit
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Customize your psychiatric clinical environment, patient census, and legal acuity
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-6 pt-3 gap-3">
          <button
            onClick={() => setActiveTab('presets')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'presets'
                ? 'border-indigo-500 text-indigo-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Flight Mission Presets
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'custom'
                ? 'border-indigo-500 text-indigo-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Custom Flight Parameters
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'presets' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/50">
                <Info className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>
                  Select a standardized practice scenario. Each mission dynamically reshapes the patient roster, time pressure, and legal constraints.
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SIMULATION_PRESETS.map((preset) => {
                  const isSelected = selectedPresetId === preset.id;
                  const Icon = preset.id === 'outpatient-solo' ? UserCheck : preset.id === 'inpatient-residency-16' ? Building2 : AlertTriangle;
                  
                  return (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`cursor-pointer rounded-xl p-4 border transition-all relative flex flex-col justify-between ${
                        isSelected 
                          ? 'bg-indigo-950/50 border-indigo-500 shadow-lg shadow-indigo-950/40 ring-1 ring-indigo-500' 
                          : 'bg-slate-800/40 border-slate-700/70 hover:border-slate-600 hover:bg-slate-800/70'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-white shadow-sm">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}

                      <div className="space-y-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          preset.id === 'outpatient-solo' ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30' :
                          preset.id === 'inpatient-residency-16' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' :
                          'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>

                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                            {preset.subtitle}
                          </span>
                          <h3 className="text-sm font-bold text-white mt-0.5">
                            {preset.title}
                          </h3>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed line-clamp-4">
                          {preset.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-400">
                          {preset.badge}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Custom Parameter Tuning */
            <div className="space-y-5">
              {/* Setting Variable */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-indigo-400" />
                  1. Clinical Setting &amp; Environment
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'outpatient', label: 'Solo Outpatient', desc: 'Private practice office' },
                    { id: 'inpatient', label: 'Acute Inpatient', desc: '16-Bed locked ward' },
                    { id: 'crisis', label: 'Psych Emergency', desc: 'ED crisis triage bay' },
                    { id: 'consult', label: 'Consult-Liaison', desc: 'General Med-Surg' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setCustomSetting(s.id)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        customSetting === s.id
                          ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-sm'
                          : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      <p className="text-xs font-bold">{s.label}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{s.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Census Volume Variable */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-indigo-400" />
                  2. Patient Census &amp; Volume
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: 1, label: '1 Patient (Deep Dive)', desc: 'Focused 45-min diagnostic intake' },
                    { val: 6, label: '6 Patients (Crisis Surge)', desc: 'Fast turnaround triage load' },
                    { val: 16, label: '16 Patients (Full Unit Roster)', desc: 'High-volume inpatient rounds' },
                  ].map((v) => (
                    <button
                      key={v.val}
                      type="button"
                      onClick={() => setCustomVolume(v.val)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        customVolume === v.val
                          ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-sm'
                          : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      <p className="text-xs font-bold">{v.label}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{v.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Legal Status Variable */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-indigo-400" />
                  3. Legal &amp; Commitment Framework
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'Voluntary', label: '100% Voluntary Treatment', desc: 'Consensual alliance; negotiated medication decisions' },
                    { id: 'Involuntary Civil Hold (72-Hour)', label: 'Involuntary Commitment & Court Holds', desc: '72h emergency petitions, statutory deadlines, medication refusals' }
                  ].map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => setCustomLegal(l.id)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        customLegal === l.id
                          ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-sm'
                          : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      <p className="text-xs font-bold">{l.label}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{l.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Operational Friction */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-indigo-400" />
                  4. Operational Friction &amp; Pressure
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'standard', label: 'Standard Pacing', desc: 'Calm diagnostic interview and charting' },
                    { id: 'high', label: 'High Institutional Friction', desc: 'Overnight nursing pages, code gray alerts, legal deadlines' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setCustomFriction(f.id)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        customFriction === f.id
                          ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-sm'
                          : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      <p className="text-xs font-bold">{f.label}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{f.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Current Flight: <strong className="text-white">{customSetting === 'inpatient' ? '16-Bed Inpatient Residency' : 'Solo Outpatient'}</strong>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleLaunch}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 transition-all transform active:scale-95"
            >
              <span>Engage Simulation Flight</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
