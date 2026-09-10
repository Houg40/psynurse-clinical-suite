import React, { useState, useRef, useEffect } from 'react';
import { LayoutGrid, ChevronDown, ExternalLink, Stethoscope, Award, Globe } from 'lucide-react';

export default function SuiteSwitcher({ currentApp = 'cds' }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const getTargetUrl = (app) => {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocal) {
      return app === 'cds'
        ? 'http://localhost:5173'
        : 'http://localhost:5174';
    }
    // If hosted on custom domain (e.g. psychiatristnurse.com) or as subfolder
    if (window.location.hostname.includes('psychiatristnurse.com') || window.location.pathname.startsWith('/cds') || window.location.pathname.startsWith('/cfs')) {
      return app === 'cds' ? '/cds/' : '/cfs/';
    }
    return app === 'cds'
      ? 'https://houg40.github.io/psynurse-cds-tool/'
      : 'https://houg40.github.io/psynurse-cfs-tool/';
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Switcher Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-300 text-xs font-bold transition-all shadow-2xs whitespace-nowrap"
        title="Switch between PsyNurse clinical applications"
      >
        <LayoutGrid className="w-3.5 h-3.5 text-teal-600" />
        <span className="hidden sm:inline">Suite Portal</span>
        <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Popover Card */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-slate-200 shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-100 text-left">
          <div className="border-b border-slate-100 pb-3 mb-3">
            <span className="text-[10px] uppercase font-black tracking-wider text-teal-700 block">
              PsyNurse Clinical Suite
            </span>
            <h4 className="text-sm font-black text-slate-900 leading-tight">
              Clinical Tools &amp; Training Labs
            </h4>
          </div>

          <div className="space-y-2">
            
            {/* App 1: CDS Prescribing Suite */}
            <a
              href={getTargetUrl('cds')}
              target={currentApp === 'cds' ? '_self' : '_blank'}
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className={`flex items-start gap-3 p-3 rounded-xl border transition-all block ${
                currentApp === 'cds'
                  ? 'bg-teal-50/70 border-teal-300 shadow-2xs'
                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-700 flex-shrink-0 mt-0.5">
                <Stethoscope className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="text-xs font-bold text-slate-900 truncate">PsyNurse CDS Tool</span>
                  {currentApp === 'cds' ? (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                      Active
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-teal-700 flex items-center gap-0.5">
                      Launch <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  Clinical decision support, drug dosing guide, step-therapy trees, and cross-tapering handout generator.
                </p>
              </div>
            </a>

            {/* App 2: CFS Training Simulator */}
            <a
              href={getTargetUrl('cfs')}
              target={currentApp === 'cfs' ? '_self' : '_blank'}
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className={`flex items-start gap-3 p-3 rounded-xl border transition-all block ${
                currentApp === 'cfs'
                  ? 'bg-teal-50/70 border-teal-300 shadow-2xs'
                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 flex-shrink-0 mt-0.5">
                <Award className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="text-xs font-bold text-slate-900 truncate">PsyNurse CFS Lab</span>
                  {currentApp === 'cfs' ? (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                      Active
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-teal-700 flex items-center gap-0.5">
                      Launch <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  Interactive OSCE flight simulator with spoken voice, Week 8 rescue timelines, and EHR SOAP notes.
                </p>
              </div>
            </a>

          </div>

          {/* Footer link to main clinic site */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-500">
            <a
              href="https://psychiatristnurse.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-teal-600" />
              <span>Monica Preder Practice Site</span>
            </a>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </div>
        </div>
      )}
    </div>
  );
}

