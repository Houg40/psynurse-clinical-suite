import React, { useState, useMemo } from 'react';
import { 
  ClipboardCheck, 
  Printer, 
  Download, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Sparkles, 
  RotateCcw, 
  FileText, 
  Copy, 
  Check, 
  Calendar, 
  User, 
  Tag, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import dsm5Data from '../data/dsm5Criteria.json';

export default function Dsm5Checklists() {
  const [selectedDisorderId, setSelectedDisorderId] = useState('adhd');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Patient Metadata State
  const [patientName, setPatientName] = useState('');
  const [patientDob, setPatientDob] = useState('');
  const [assessmentDate, setAssessmentDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [chartNumber, setChartNumber] = useState('');
  const [clinicalNotes, setClinicalNotes] = useState('');

  // Checklist Selection State: { [disorderId_itemId]: boolean }
  const [checkedItems, setCheckedItems] = useState({});
  // Selected Specifiers State: { [disorderId_specifierId]: string }
  const [selectedSpecifiers, setSelectedSpecifiers] = useState({});
  const [copiedBlurb, setCopiedBlurb] = useState(false);

  // Active Disorder
  const activeDisorder = useMemo(() => {
    return dsm5Data.find(d => d.id === selectedDisorderId) || dsm5Data[0];
  }, [selectedDisorderId]);

  // Categories for Filter Pills
  const categories = useMemo(() => {
    const cats = ['All'];
    dsm5Data.forEach(d => {
      if (!cats.includes(d.category)) cats.push(d.category);
    });
    return cats;
  }, []);

  // Filtered Disorder List for Selector
  const filteredDisorders = useMemo(() => {
    return dsm5Data.filter(d => {
      const matchCategory = selectedCategory === 'All' || d.category === selectedCategory;
      const matchSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.icd10.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Handle Category Selection & Auto-Select First Matching Disorder
  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    const matching = dsm5Data.filter(d => cat === 'All' || d.category === cat);
    if (matching.length > 0) {
      const alreadyInCat = matching.some(d => d.id === selectedDisorderId);
      if (!alreadyInCat) {
        setSelectedDisorderId(matching[0].id);
      }
    }
  };

  // Handle Search Input & Auto-Select First Match
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const matching = dsm5Data.filter(d => {
        const matchCategory = selectedCategory === 'All' || d.category === selectedCategory;
        const matchSearch = d.name.toLowerCase().includes(query.toLowerCase()) ||
                            d.shortName.toLowerCase().includes(query.toLowerCase()) ||
                            d.icd10.toLowerCase().includes(query.toLowerCase());
        return matchCategory && matchSearch;
      });
      if (matching.length > 0 && !matching.some(d => d.id === selectedDisorderId)) {
        setSelectedDisorderId(matching[0].id);
      }
    }
  };

  // Toggle Checklist Item
  const handleToggleItem = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [`${selectedDisorderId}_${itemId}`]: !prev[`${selectedDisorderId}_${itemId}`]
    }));
  };

  // Handle Specifier Change
  const handleSpecifierChange = (specId, value) => {
    setSelectedSpecifiers(prev => ({
      ...prev,
      [`${selectedDisorderId}_${specId}`]: value
    }));
  };

  // Reset current checklist
  const handleResetChecklist = () => {
    setCheckedItems(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(key => {
        if (key.startsWith(`${selectedDisorderId}_`)) {
          delete next[key];
        }
      });
      return next;
    });
    setClinicalNotes('');
  };

  // Section score calculation
  const getSectionScore = (section) => {
    return section.items.filter(item => checkedItems[`${selectedDisorderId}_${item.code}`]).length;
  };

  // Overall diagnostic determination calculation
  const determination = useMemo(() => {
    if (!activeDisorder) return { isMet: false, summary: '' };

    if (activeDisorder.id === 'adhd') {
      const inattScore = getSectionScore(activeDisorder.sections[0]);
      const hyperScore = getSectionScore(activeDisorder.sections[1]);
      const adultThreshold = activeDisorder.ageThresholdAdult || 5;
      const inattMet = inattScore >= adultThreshold;
      const hyperMet = hyperScore >= adultThreshold;

      if (inattMet && hyperMet) {
        return { isMet: true, summary: `Combined Presentation threshold met (Inattention: ${inattScore}/9, Hyperactivity: ${hyperScore}/9)` };
      } else if (inattMet) {
        return { isMet: true, summary: `Predominantly Inattentive Presentation met (${inattScore}/9 items endorsed)` };
      } else if (hyperMet) {
        return { isMet: true, summary: `Predominantly Hyperactive/Impulsive Presentation met (${hyperScore}/9 items endorsed)` };
      } else {
        return { isMet: false, summary: `Sub-threshold (Inattention: ${inattScore}/9, Hyperactivity: ${hyperScore}/9; requires >= ${adultThreshold} in at least 1 domain)` };
      }
    }

    if (activeDisorder.id === 'mdd') {
      const coreSection = activeDisorder.sections[0];
      const count = getSectionScore(coreSection);
      const hasDepressedMood = checkedItems[`${selectedDisorderId}_1`];
      const hasAnhedonia = checkedItems[`${selectedDisorderId}_2`];
      const hasCore = hasDepressedMood || hasAnhedonia;
      const isMet = count >= 5 && hasCore;

      if (isMet) {
        return { isMet: true, summary: `Diagnostic criteria met (${count}/9 symptoms endorsed including core mood/anhedonia)` };
      } else if (count >= 5 && !hasCore) {
        return { isMet: false, summary: `5+ symptoms checked (${count}/9), BUT core Criterion 1 (Depressed Mood) or Criterion 2 (Anhedonia) is required` };
      } else {
        return { isMet: false, summary: `Sub-threshold (${count}/9 symptoms; requires at least 5 including depressed mood or anhedonia)` };
      }
    }

    // Default calculation based on first primary section
    const primarySec = activeDisorder.sections[0];
    const count = getSectionScore(primarySec);
    const required = primarySec.requiredCount || 1;
    const isMet = count >= required;

    return {
      isMet,
      summary: isMet 
        ? `Diagnostic symptom threshold reached (${count} items endorsed; cutoff: ${required})` 
        : `Sub-threshold (${count} items endorsed; cutoff: ${required})`
    };
  }, [activeDisorder, checkedItems, selectedDisorderId]);

  // Generate EHR Blurb
  const generateEhrBlurb = () => {
    let blurb = `DSM-5 DIAGNOSTIC EVALUATION: ${activeDisorder.name} (${activeDisorder.icd10})\n`;
    if (patientName) blurb += `Patient: ${patientName} | DOB: ${patientDob || 'N/A'} | Date: ${assessmentDate}\n`;
    blurb += `Diagnostic Determination: ${determination.summary}\n\n`;
    blurb += `CRITERIA CHECKLIST:\n`;

    activeDisorder.sections.forEach(sec => {
      blurb += `• ${sec.title} (Score: ${getSectionScore(sec)}/${sec.items.length}):\n`;
      sec.items.forEach(item => {
        const isChecked = checkedItems[`${selectedDisorderId}_${item.code}`];
        blurb += `  [${isChecked ? 'X' : ' '}] ${item.code}: ${item.text}\n`;
      });
    });

    if (activeDisorder.specifiers && activeDisorder.specifiers.length > 0) {
      blurb += `\nSPECIFIERS:\n`;
      activeDisorder.specifiers.forEach(spec => {
        const val = selectedSpecifiers[`${selectedDisorderId}_${spec.id}`] || spec.options[0];
        blurb += `• ${spec.label}: ${val}\n`;
      });
    }

    if (clinicalNotes) {
      blurb += `\nCLINICIAN MDM & RATIONALE:\n${clinicalNotes}\n`;
    }

    blurb += `\nEvaluated by: Monica Preder, MSN, APRN, PMHNP-BC\nBoard Certified Psychiatric Nurse Practitioner`;
    return blurb;
  };

  const copyEhrBlurb = () => {
    navigator.clipboard.writeText(generateEhrBlurb());
    setCopiedBlurb(true);
    setTimeout(() => setCopiedBlurb(false), 2000);
  };

  // Standalone PDF Download Filename
  const getPdfFilename = (disorderId) => {
    const map = {
      adhd: 'ADHD_Diagnostic_Checklist.pdf',
      mdd: 'Major_Depressive_Disorder_Checklist.pdf',
      gad: 'Generalized_Anxiety_Disorder_Checklist.pdf',
      bipolar: 'Bipolar_I_Disorder_Checklist.pdf',
      ptsd: 'PTSD_Diagnostic_Checklist.pdf',
      panic: 'Panic_Disorder_Checklist.pdf',
      agoraphobia: 'Agoraphobia_Checklist.pdf',
      social_anxiety: 'Social_Anxiety_Disorder_Checklist.pdf',
      ocd: 'OCD_Diagnostic_Checklist.pdf',
      schizophrenia: 'Schizophrenia_Diagnostic_Checklist.pdf',
      schizoaffective: 'Schizoaffective_Disorder_Checklist.pdf',
      delusional: 'Delusional_Disorder_Checklist.pdf',
      asd: 'Autism_Spectrum_Disorder_Checklist.pdf',
      dmdd: 'Disruptive_Mood_Dysregulation_Disorder_Checklist.pdf',
      ied: 'Intermittent_Explosive_Disorder_Checklist.pdf',
      did: 'Dissociative_Identity_Disorder_Checklist.pdf',
      cluster_a: 'Cluster_A_Personality_Disorders_Checklist.pdf',
      cluster_b: 'Cluster_B_Personality_Disorders_Checklist.pdf',
      cluster_c: 'Cluster_C_Personality_Disorders_Checklist.pdf',
      adjustment: 'Adjustment_Disorder_Checklist.pdf',
      aud: 'Alcohol_Use_Disorder_Checklist.pdf',
      cud: 'Cannabis_Use_Disorder_Checklist.pdf',
      oud: 'Opioid_Use_Disorder_Checklist.pdf',
      stimulant: 'Stimulant_Use_Disorder_Checklist.pdf',
      sedative: 'Sedative_Anxiolytic_Use_Disorder_Checklist.pdf',
      tobacco: 'Tobacco_Use_Disorder_Checklist.pdf'
    };
    return map[disorderId] || `${disorderId}_Checklist.pdf`;
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner (Hidden on Print) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm print:hidden space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-800 shrink-0 shadow-xs">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900">DSM-5-TR Diagnostic Criteria Checklists</h2>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-800 border border-teal-200 px-2 py-0.5 rounded-full">
                  24 Disorders
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Official criteria checklists with real-time threshold scoring, specifier selection, EHR notes export, and clean 1-click printable PDF documentation.
              </p>
            </div>
          </div>

          {/* Quick PDF Batch Download Link */}
          <div className="flex items-center gap-2">
            <a
              href={`./dsm5-checklists/${getPdfFilename(selectedDisorderId)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl transition-all border border-slate-200 shadow-2xs"
              title="Download pre-formatted blank PDF for this disorder"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Blank PDF</span>
            </a>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleSelectCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Disorder Grid / Search & Dropdown */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by disorder name or ICD-10 code (e.g. ADHD, Depression, F31, Bipolar, Borderline)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <select
            value={selectedDisorderId}
            onChange={(e) => setSelectedDisorderId(e.target.value)}
            className="p-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none min-w-[280px]"
          >
            {filteredDisorders.map(d => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.icd10.split(' ')[0]})
              </option>
            ))}
          </select>
        </div>

        {/* Quick Disorder Selection Chips (Matches Active Category) */}
        {filteredDisorders.length > 1 && (
          <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              {selectedCategory === 'All' ? 'All Disorders' : selectedCategory}:
            </span>
            {filteredDisorders.map(d => {
              const isSelected = d.id === selectedDisorderId;
              return (
                <button
                  key={d.id}
                  onClick={() => setSelectedDisorderId(d.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-teal-600 text-white border-teal-600 font-bold shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <span>{d.shortName || d.name}</span>
                  <span className={`text-[10px] ${isSelected ? 'text-teal-200' : 'text-slate-400'}`}>
                    {d.icd10.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Checklist Card & Printable Canvas */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6 print:border-none print:shadow-none print:p-0">

        {/* Printable Practice Header (Visible ONLY on Print) */}
        <div className="hidden print:block border-b-2 border-teal-800 pb-4 mb-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <img 
                src="./icon-192.png" 
                alt="PsyNurse Clinic Logo" 
                className="w-12 h-12 object-contain" 
              />
              <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">PSYCHIATRIC NURSE PRACTITIONER SERVICES</h1>
                <p className="text-xs font-bold text-teal-800">Monica Preder, MSN, APRN, PMHNP-BC • Board Certified Psychiatric Nurse Practitioner</p>
                <p className="text-[10px] text-slate-500">Telehealth Practice: Washington State • Web: psychiatristnurse.com</p>
              </div>
            </div>
            <div className="text-right text-[11px] text-slate-600">
              <p className="font-bold text-slate-900">DSM-5-TR Clinical Evaluation Checklist</p>
              <p>Generated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>
        </div>

        {/* Patient Demographics & Assessment Info Block */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Patient Name / Initials:</label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="e.g., Jane Doe"
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500 print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Date of Birth (DOB):</label>
              <input
                type="text"
                value={patientDob}
                onChange={(e) => setPatientDob(e.target.value)}
                placeholder="MM/DD/YYYY"
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500 print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Assessment Date:</label>
              <input
                type="date"
                value={assessmentDate}
                onChange={(e) => setAssessmentDate(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500 print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Chart / MRN #:</label>
              <input
                type="text"
                value={chartNumber}
                onChange={(e) => setChartNumber(e.target.value)}
                placeholder="e.g., THS-10492"
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500 print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none"
              />
            </div>
          </div>
        </div>

        {/* Selected Disorder Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-800 px-2 py-0.5 rounded">
                {activeDisorder.category}
              </span>
              <span className="text-xs font-mono font-bold text-slate-500">
                ICD-10: {activeDisorder.icd10}
              </span>
            </div>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              {activeDisorder.name}
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              {activeDisorder.overview}
            </p>
          </div>

          {/* Live Diagnostic Determination Banner */}
          <div className={`p-3.5 rounded-xl border flex items-center gap-3 shrink-0 ${
            determination.isMet 
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
              : 'bg-amber-50 border-amber-300 text-amber-900'
          }`}>
            {determination.isMet ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            )}
            <div>
              <p className="text-[11px] font-black uppercase tracking-wider">
                {determination.isMet ? 'CRITERIA THRESHOLD MET' : 'SUB-THRESHOLD / INCOMPLETE'}
              </p>
              <p className="text-xs font-semibold mt-0.5 max-w-sm">
                {determination.summary}
              </p>
            </div>
          </div>
        </div>

        {/* Criteria Sections & Checklists */}
        <div className="space-y-6">
          {activeDisorder.sections.map((section, sIdx) => {
            const secScore = getSectionScore(section);
            const isSecMet = section.requiredCount ? secScore >= section.requiredCount : true;

            return (
              <div key={section.id || sIdx} className="space-y-3">
                <div className="flex items-center justify-between bg-slate-100/90 px-3.5 py-2 rounded-xl border border-slate-200">
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                      {section.title}
                    </h4>
                    {section.subtitle && (
                      <p className="text-[11px] text-slate-500 font-medium">
                        {section.subtitle}
                      </p>
                    )}
                  </div>
                  <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                    isSecMet 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {secScore} / {section.items.length} Met
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {section.items.map((item) => {
                    const isChecked = !!checkedItems[`${selectedDisorderId}_${item.code}`];

                    return (
                      <div
                        key={item.code}
                        onClick={() => handleToggleItem(item.code)}
                        className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all select-none ${
                          isChecked
                            ? 'bg-teal-50/60 border-teal-300 text-teal-950 font-medium shadow-2xs'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // Handled by parent div
                          className="mt-0.5 h-4 w-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300 shrink-0"
                        />
                        <div className="flex-1 text-xs leading-relaxed">
                          <span className="font-bold text-slate-900 mr-1.5">
                            {item.code}:
                          </span>
                          <span>{item.text}</span>
                          {item.isCore && (
                            <span className="ml-2 text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200 px-1.5 py-0.5 rounded">
                              Core Requirement
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Diagnostic Specifiers Block */}
        {activeDisorder.specifiers && activeDisorder.specifiers.length > 0 && (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <Tag className="w-4 h-4 text-teal-700" />
              <span>Diagnostic Specifiers &amp; Subtypes:</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeDisorder.specifiers.map(spec => (
                <div key={spec.id}>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {spec.label}:
                  </label>
                  <select
                    value={selectedSpecifiers[`${selectedDisorderId}_${spec.id}`] || spec.options[0]}
                    onChange={(e) => handleSpecifierChange(spec.id, e.target.value)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    {spec.options.map((opt, oIdx) => (
                      <option key={oIdx} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clinical Notes & Medical Decision Making (MDM) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Clinician Rationale &amp; Differential Rule-Out Notes:
            </label>
            <span className="text-[11px] text-slate-500">Documented in exported chart note &amp; PDF</span>
          </div>
          <textarea
            rows={3}
            value={clinicalNotes}
            onChange={(e) => setClinicalNotes(e.target.value)}
            placeholder="Document functional impairment in social/occupational roles, timeline, rule-outs of secondary organic etiologies, substance use screening, and treatment rationale..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed font-sans"
          />
        </div>

        {/* Printable Clinician Signature Line (Visible on Print) */}
        <div className="hidden print:block pt-6 border-t border-slate-300 mt-6 text-xs text-slate-800">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="font-bold">Clinician Signature:</p>
              <div className="border-b border-slate-400 h-10 mt-1 mb-1"></div>
              <p className="font-bold text-teal-900">Monica Preder, MSN, APRN, PMHNP-BC</p>
              <p className="text-[10px] text-slate-500">Board Certified Psychiatric Nurse Practitioner</p>
            </div>
            <div>
              <p className="font-bold">Date &amp; License:</p>
              <div className="border-b border-slate-400 h-10 mt-1 mb-1"></div>
              <p className="font-semibold text-slate-700">Washington State APRN / DEA on file</p>
              <p className="text-[10px] text-slate-500">Practice: Therapeutic Health Services (THS)</p>
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar (Hidden on Print) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 print:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetChecklist}
              className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Checklist</span>
            </button>

            <button
              onClick={copyEhrBlurb}
              className="flex items-center gap-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2 rounded-xl transition-colors border border-slate-200"
            >
              {copiedBlurb ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedBlurb ? 'Copied Chart Note!' : 'Copy EHR Assessment Note'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`./dsm5-checklists/${getPdfFilename(selectedDisorderId)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white px-3.5 py-2 rounded-xl transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Blank PDF</span>
            </a>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
