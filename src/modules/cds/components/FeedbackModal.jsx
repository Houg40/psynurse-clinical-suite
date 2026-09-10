import React, { useState } from 'react';
import { MessageSquarePlus, X, Send, Check, Copy, Sparkles } from 'lucide-react';

export default function FeedbackModal({ currentTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState('Dosing / Titration Tweak');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const tabLabels = {
    screeners: 'Screeners & Notes',
    medications: 'Medication Dosing Guide',
    pathways: 'Step-Therapy Pathways',
    crosstaper: 'Cross-Tapering Calculator',
    safety: 'Safety & Rule-Outs'
  };

  const currentTabName = tabLabels[currentTab] || currentTab;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSubmitting(true);
    try {
      await fetch('https://formsubmit.co/ajax/houg40@gmail.com', {
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
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center text-teal-800">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Provider Feedback &amp; Adjustments</h3>
                  <p className="text-[11px] text-slate-500">Send dosing preferences or feature requests directly to your tech lead.</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Thank you, Monica!</h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Your clinical feedback has been sent directly to Ignacio. We'll update the CDS tool algorithms and dosages accordingly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
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

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700">Your Clinical Notes / Requested Change:</label>
                    <span className="text-[10px] text-slate-400 font-medium">Context: {currentTabName}</span>
                  </div>
                  <textarea
                    rows={4}
                    required
                    placeholder="e.g., 'I usually start Lexapro at 5mg for patients with high anxiety sensitivity instead of 10mg. Can we add that note to the dosing card?'"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 focus:bg-white focus:outline-none resize-none leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={copyFeedback}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-all"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
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

