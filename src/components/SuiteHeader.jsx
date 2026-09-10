import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, 
  Compass, 
  ShieldCheck, 
  Download, 
  Sparkles, 
  BookOpen,
  SlidersHorizontal,
  GraduationCap
} from 'lucide-react';

export default function SuiteHeader({ 
  currentModule, 
  setCurrentModule, 
  cdsActiveTab, 
  setCdsActiveTab, 
  cfsActivePhase, 
  setCfsActivePhase 
}) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("To install PsyNurse Clinical Suite on your desktop, click the Install icon (computer screen with down arrow) in your browser's address bar!");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 shadow-md print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tier: Master Brand, Mode Switcher, & Install Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between py-3 md:h-16 gap-3 border-b border-slate-800/80">
          
          {/* Brand Identity */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 p-0.5 shadow-xs flex-shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center p-1">
                <img 
                  src="./icon-192.png" 
                  alt="PsyNurse Suite Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to stethoscope icon if image fails
                    e.target.style.display = 'none';
                  }} 
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-white text-base tracking-tight">
                  PsyNurse Clinical Suite
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-950 text-teal-300 border border-teal-800">
                  <ShieldCheck className="w-3 h-3 text-teal-400" />
                  Zero-PHI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Unified Psychiatric Practice &amp; Simulation Platform • Monica Preder, ARNP
              </p>
            </div>
          </div>

          {/* Master Suite Switcher & Action Pill */}
          <div className="flex items-center gap-2.5 flex-wrap">
            
            {/* Primary Mode Toggle Segmented Control */}
            <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center shadow-inner">
              <button
                onClick={() => setCurrentModule('cds')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentModule === 'cds'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Prescribing &amp; CDS</span>
              </button>

              <button
                onClick={() => setCurrentModule('cfs')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentModule === 'cfs'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-indigo-300" />
                <span>Flight Simulator (CFS)</span>
                <span className="px-1.5 py-0.2 bg-indigo-950 text-indigo-300 text-[9px] rounded font-extrabold border border-indigo-700 uppercase">
                  OSCE
                </span>
              </button>
            </div>

            {/* Desktop Native Install App Button */}
            {!isInstalled && (
              <button
                onClick={handleInstallClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold transition-all"
                title="Install PsyNurse Clinical Suite as a standalone desktop app"
              >
                <Download className="w-3.5 h-3.5 text-teal-400" />
                <span className="hidden sm:inline">Install App</span>
              </button>
            )}

            {isInstalled && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800 text-slate-300 text-[11px] font-semibold border border-slate-700">
                ✓ Desktop App
              </span>
            )}

          </div>

        </div>

      </div>
    </header>
  );
}
