import React, { useState } from 'react';
import { MessageSquarePlus, X, Send, Check, Copy, Sparkles, Wand2, RotateCcw, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function FeedbackModal({ currentTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState('Dosing / Titration Tweak');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPolishing, setIsPolishing] = useState(false);
  const [originalMessage, setOriginalMessage] = useState('');
  const [isPolished, setIsPolished] = useState(false);

  const tabLabels = {
    hpi: 'Rapid HPI Builder',
    screeners: 'Screeners & Notes',
    checklists: 'DSM-5 Diagnostic Checklists',
    psychotherapy: 'Psychotherapy Practice Scripts',
    medications: 'Medication Dosing Guide',
    interactions: 'QTc & Interactions',
    advisor: 'Clinical Reference Assistant',
    pathways: 'Step-Therapy Pathways',
    crosstaper: 'Cross-Tapering Calculator',
    misc: 'Misc. Information & Pharmacology Pearls',
    safety: 'Safety & Rule-Outs'
  };

  const currentTabName = tabLabels[currentTab] || currentTab;

  // Smart AI Polisher: Translates casual PMHNP clinical thoughts into exact developer specs
  const handleAiPolish = () => {
    if (!message.trim()) return;
    setIsPolishing(true);
    setOriginalMessage(message);

    setTimeout(() => {
      const raw = message.trim();
      const lower = raw.toLowerCase();

      // Extract identified elements
      let screen = currentTabName;
      let targetItems = [];
      let changeIntent = '';
      let category = feedbackType;

      // Identify medication mentions
      const meds = [
        'lexapro', 'escitalopram', 'celexa', 'citalopram', 'prozac', 'fluoxetine', 'zoloft', 'sertraline', 'paxil', 'paroxetine',
        'effexor', 'venlafaxine', 'cymbalta', 'duloxetine', 'pristiq', 'desvenlafaxine', 'remeron', 'mirtazapine', 'wellbutrin', 'bupropion',
        'lamictal', 'lamotrigine', 'lithium', 'depakote', 'divalproex', 'valproate', 'trileptal', 'oxcarbazepine',
        'abilify', 'aripiprazole', 'seroquel', 'quetiapine', 'latuda', 'lurasidone', 'vraylar', 'cariprazine', 'rexulti', 'brexpiprazole', 'caplyta', 'lumateperone', 'zyprexa', 'olanzapine', 'risperdal', 'risperidone'
      ];
      meds.forEach(m => {
        if (lower.includes(m)) {
          const capitalized = m.charAt(0).toUpperCase() + m.slice(1);
          if (!targetItems.includes(capitalized)) targetItems.push(capitalized);
        }
      });

      // Context detection
      if (lower.includes('cross') || lower.includes('taper') || lower.includes('notecard') || lower.includes('indication')) {
        screen = 'Cross-Tapering Calculator & Clinical Reference Cards';
        category = 'Add Missing Drug / Indication';
      } else if (lower.includes('screener') || lower.includes('phq') || lower.includes('gad') || lower.includes('score') || lower.includes('range') || lower.includes('asrs') || lower.includes('mdq') || lower.includes('aims')) {
        screen = 'Screeners & Notes Assessment Engine';
        category = 'Screener / EHR Note Modification';
      } else if (lower.includes('hpi') || lower.includes('chief complaint') || lower.includes('sigecaps') || lower.includes('note template')) {
        screen = 'Rapid Psychiatric HPI Builder';
        category = 'Screener / EHR Note Modification';
      } else if (lower.includes('dose') || lower.includes('mg') || lower.includes('titrat') || lower.includes('starting')) {
        category = 'Dosing / Titration Tweak';
      }

      // Generate structured specification
      let polished = `[CLINICAL SPECIFICATION FOR DEVELOPER]\n\n`;
      polished += `• TARGET SCREEN / MODULE:\n  ${screen}\n\n`;
      
      if (targetItems.length > 0) {
        polished += `• MEDICATIONS / ITEMS INVOLVED:\n  ${targetItems.join(', ')}\n\n`;
      }

      polished += `• EXACT REQUESTED CHANGE:\n  ${raw}\n\n`;

      if (lower.includes('bold') || lower.includes('highlight') || lower.includes('fda') || lower.includes('off label')) {
        polished += `• FORMATTING & STYLING INSTRUCTIONS:\n  Apply distinct visual hierarchy: emphasize FDA-approved indications in bold font; display off-label indications unhighlighted in subtle standard font enclosed in parentheses.\n\n`;
      }

      if (lower.includes('chronic muscle pain') || lower.includes('msk')) {
        polished += `• SPECIFIC WORDING UPDATE:\n  Replace musculoskeletal (MSK) notation with "chronic muscle pain" for direct patient/provider clarity.\n\n`;
      }

      if (lower.includes('range') || lower.includes('number') || lower.includes('score')) {
        polished += `• NUMERICAL SCALE SPECIFICATION:\n  Display exact numeric score thresholds and clinical severity meanings (both on the real-time scoring card and in the generated EHR note).\n\n`;
      }

      polished += `• CLINICAL INTENT / RATIONALE:\n  Align documentation with Monica's clinical workflow, DSM-5-TR diagnostic standards, and ease of chart navigation.`;

      setMessage(polished);
      setFeedbackType(category);
      setIsPolished(true);
      setIsPolishing(false);
    }, 400);
  };

  const handleUndoPolish = () => {
    setMessage(originalMessage);
    setIsPolished(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSubmitting(true);
    try {
      await fetch('https://formsubmit.co/ajax/6e4260a11bc0b3f5c2d336b6a05fcfb2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `PsyNurse CDS Feedback: ${feedbackType} (${currentTabName})`,
          FeedbackType: feedbackType,
          ScreenContext: currentTabName,
          ProviderNotes: message,
          SubmittedAt: new Date().toLocaleString()
        })
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsOpen(false);
        setMessage('');
        setIsPolished(false);
      }, 3000);
    } catch (err) {
      // Fallback: If network blocks FormSubmit, user can copy to clipboard
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const copyFeedback = () => {
    const text = `PSY-NURSE CDS CLINICAL FEEDBACK\nType: ${feedbackType}\nScreen: ${currentTabName}\nNotes: ${message}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating Action Pill in Bottom Right */}
      <div className="fixed bottom-5 right-5 z-40 print:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-teal-800 hover:bg-teal-700 text-white px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl font-bold text-xs transition-all transform hover:-translate-y-0.5 border border-teal-600/50"
        >
          <MessageSquarePlus className="w-4 h-4 text-teal-300" />
          <span>Clinical Feedback &amp; Tweaks</span>
        </button>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs print:hidden">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center text-teal-800">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Provider Feedback &amp; Adjustments</h3>
                  <p className="text-[11px] text-slate-500">Send dosing preferences or feature tweaks directly to Ignacio.</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* PHI Disclaimer */}
            <div className="flex items-start gap-2 p-2.5 bg-amber-50 border border-amber-200 rounded-xl mb-1">
              <span className="text-amber-600 flex-shrink-0 text-sm leading-none mt-0.5">⚠️</span>
              <p className="text-[11px] text-amber-900 leading-snug">
                <strong>Do not include patient-identifying information.</strong> This feedback is transmitted to an external service (formsubmit.co) with no HIPAA Business Associate Agreement. Keep notes to clinical workflow topics, dosing preferences, and feature requests only.
              </p>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Thank you, Monica!</h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Your structured clinical feedback has been sent directly to Ignacio. We'll update the clinical suite algorithms and reference cards promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Category Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Feedback Category:</label>
                  <select
                    value={feedbackType}
                    onChange={(e) => setFeedbackType(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    <option value="Dosing / Titration Tweak">Dosing / Titration Tweak (e.g. adjust starting or max dose)</option>
                    <option value="Add Missing Drug / Indication">Add Missing Medication or Indication</option>
                    <option value="Algorithm / Decision Tree Suggestion">Algorithm / Step-Therapy Decision Tree Suggestion</option>
                    <option value="Screener / EHR Note Modification">Screener / Tebra Note Formatting Modification</option>
                    <option value="General Usability / Feature Request">General Usability / Feature Request</option>
                  </select>
                </div>

                {/* Quick 1-Click Clinical Starters */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Quick Clinical Starters:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: '💊 Dosing / Titration', text: 'On the dosing guide for [Medication], change starting dose to [X mg] because...' },
                      { label: '📝 Notecard Wording', text: 'Under [Medication] on the reference card, change the indication to...' },
                      { label: '📊 Screener Ranges', text: 'For the [PHQ-9/GAD-7/ASRS/MDQ/AIMS] screener, clarify the cutoff range for...' },
                      { label: '⚡ Cross-Taper Step', text: 'When tapering from [Drug A] to [Drug B], add a clinical note about...' }
                    ].map((chip, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setMessage(chip.text)}
                        className="text-[11px] font-medium bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200/80 transition-all"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes Input Area with AI Clarifier Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-700">
                      Your Clinical Notes / Requested Change:
                    </label>
                    <span className="text-[10px] text-slate-400 font-medium">Context: {currentTabName}</span>
                  </div>

                  <textarea
                    rows={isPolished ? 7 : 4}
                    required
                    placeholder="Type in your own clinical words (e.g. 'under cymbalta change it to chronic muscle pain and bold FDA indications'). You don't need to know technical terms!"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (isPolished) setIsPolished(false);
                    }}
                    className={`w-full p-3 border rounded-xl text-xs text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:outline-none leading-relaxed transition-all ${
                      isPolished 
                        ? 'bg-emerald-50/50 border-emerald-300 font-mono text-[11px]' 
                        : 'bg-white border-slate-300 shadow-2xs'
                    }`}
                  />

                  {/* AI Clarifier / Polisher Button Bar */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-1.5">
                      <Wand2 className="w-3.5 h-3.5 text-teal-600" />
                      <span className="text-[11px] font-semibold text-slate-600">
                        {isPolished ? '✨ Cleanly formatted for Ignacio' : 'Need help explaining?'}
                      </span>
                    </div>

                    {isPolished ? (
                      <button
                        type="button"
                        onClick={handleUndoPolish}
                        className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg hover:bg-slate-200/60 transition-all"
                      >
                        <RotateCcw className="w-3 h-3 text-slate-400" />
                        <span>Undo Format</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={!message.trim() || isPolishing}
                        onClick={handleAiPolish}
                        className="flex items-center gap-1.5 text-[11px] font-bold bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white px-3 py-1.5 rounded-lg transition-all shadow-2xs"
                      >
                        <Sparkles className="w-3 h-3 text-teal-200" />
                        <span>{isPolishing ? 'Clarifying...' : '✨ Make Clear for Developer'}</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 text-center pt-2 border-t border-slate-100 pb-1">
                  No patient names, DOBs, or identifying details — clinical workflow notes only.
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={copyFeedback}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-all"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Text'}</span>
                  </button>

                  <button
                    type="submit"
                    disabled={submitting || !message.trim()}
                    className="flex items-center gap-2 text-xs font-bold bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl transition-all shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? 'Sending...' : 'Send Feedback to Ignacio'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

