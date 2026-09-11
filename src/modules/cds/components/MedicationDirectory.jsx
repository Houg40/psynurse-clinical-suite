import React, { useState } from 'react';
import medData from '../data/medications.json';
import { Search, Pill, ShieldAlert, Sparkles, AlertTriangle, ChevronDown, ChevronUp, Copy, Check, ClipboardList } from 'lucide-react';

export default function MedicationDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [expandedWarningId, setExpandedWarningId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyMonitoring = (med) => {
    const text = `CLINICAL MONITORING & ORDERS (${med.genericName} - ${med.brandNames.join(', ')}):\n` +
      `- Starting Dose: ${med.startingDose}\n` +
      `- Target Range: ${med.therapeuticRange}\n` +
      `- Required Monitoring & Lab Panels:\n  • ${med.monitoring.join('\n  • ')}\n` +
      `- Black Box Warning / Safety Note: ${med.blackBoxWarning || 'None'}`;
    navigator.clipboard.writeText(text);
    setCopiedId(med.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const classes = [
    'All',
    'SSRI',
    'SNRI',
    'NDRI',
    'CNS Stimulant',
    'Non-Stimulant',
    'Antipsychotic',
    'Mood Stabilizer',
    'Anxiolytic'
  ];

  const filteredMeds = medData.medications.filter(med => {
    const matchesSearch = 
      med.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.brandNames.some(b => b.toLowerCase().includes(searchTerm.toLowerCase())) ||
      med.indications.some(i => i.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesClass = selectedClass === 'All' || med.class.toLowerCase().includes(selectedClass.toLowerCase());
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <h2 className="text-xl font-black text-slate-900">Psychiatric Medication Dosing & Reference Guide</h2>
            <p className="text-xs text-slate-500 mt-0.5">Starting doses, titration schedules, therapeutic ranges, and CYP450 interactions.</p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search generic, brand (Lexapro, Adderall)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          {classes.map(cls => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedClass === cls
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cls}
            </button>
          ))}
        </div>
      </div>

      {/* Medication Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredMeds.map(med => (
          <div key={med.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-teal-300 transition-all flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-slate-900">{med.genericName}</h3>
                    <span className="text-xs font-bold text-slate-400">({med.brandNames.join(', ')})</span>
                  </div>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    {med.class}
                  </span>
                </div>
              </div>

              {/* Dosing Details Box */}
              <div className="grid grid-cols-2 gap-2 p-3 bg-teal-50/50 rounded-xl border border-teal-100 text-xs mb-3.5">
                <div>
                  <span className="text-[10px] font-bold text-teal-800 uppercase block">Starting Dose</span>
                  <span className="font-bold text-slate-900">{med.startingDose}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-teal-800 uppercase block">Therapeutic Range</span>
                  <span className="font-bold text-slate-900">{med.therapeuticRange}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-teal-800 uppercase block">Max Ceiling</span>
                  <span className="font-semibold text-slate-800">{med.maxCeiling}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-teal-800 uppercase block">Half-Life</span>
                  <span className="font-semibold text-slate-800">{med.halfLife}</span>
                </div>
              </div>

              {/* Titration Steps */}
              <div className="text-xs mb-3">
                <span className="font-bold text-slate-700 block mb-0.5">Titration Schedule:</span>
                <p className="text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">{med.titration}</p>
              </div>

              {/* CYP Metabolism */}
              <div className="text-xs mb-3">
                <span className="font-bold text-slate-700 block mb-0.5">Metabolism & CYP450 Profile:</span>
                <p className="text-slate-600 font-mono text-[11px] bg-slate-50 p-2 rounded-lg border border-slate-100">{med.cypMetabolism}</p>
              </div>

              {/* Baseline Labs & Required Clinical Monitoring */}
              {med.monitoring && med.monitoring.length > 0 && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1.5 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <ClipboardList className="w-3.5 h-3.5 text-teal-600" />
                      Baseline Labs &amp; Monitoring Protocol:
                    </span>
                    <button
                      onClick={() => handleCopyMonitoring(med)}
                      className="text-[10px] font-bold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 px-2 py-0.5 rounded border border-teal-200 transition-all flex items-center gap-1"
                      title="Copy monitoring protocol to clipboard for EHR orders"
                    >
                      {copiedId === med.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-teal-600" />
                          <span>Copy Orders</span>
                        </>
                      )}
                    </button>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600 text-[11px]">
                    {med.monitoring.map((m, idx) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Clinical Pearl Box */}
              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-950 flex items-start gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block text-amber-900 mb-0.5">Clinical Pearl:</strong>
                  {med.clinicalPearls}
                </div>
              </div>
            </div>

            {/* Black Box Warning Accordion */}
            {med.blackBoxWarning && med.blackBoxWarning !== "None." && (
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => setExpandedWarningId(expandedWarningId === med.id ? null : med.id)}
                  className="w-full flex items-center justify-between text-[11px] font-bold text-red-700 hover:text-red-900 py-1"
                >
                  <span className="flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                    Black Box Warning / Contraindications
                  </span>
                  {expandedWarningId === med.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {expandedWarningId === med.id && (
                  <p className="text-[11px] text-red-800 bg-red-50 p-2.5 rounded-lg border border-red-200 mt-1 leading-relaxed">
                    {med.blackBoxWarning}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

