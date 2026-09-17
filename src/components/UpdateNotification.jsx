import React from 'react';
import { Sparkles, RefreshCw, X, ArrowRight, ShieldCheck } from 'lucide-react';

export default function UpdateNotification({
  updateAvailable,
  isUpdating,
  isDismissed,
  onRestart,
  onDismiss
}) {
  if (isUpdating) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-teal-500/40 rounded-2xl p-8 max-w-md w-full shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center mx-auto text-teal-400">
            <RefreshCw className="w-8 h-8 animate-spin" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Restarting to Update...</h3>
            <p className="text-xs text-slate-300 mt-1">
              Clearing cached assets and activating the latest clinical modules and features.
            </p>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-teal-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero-PHI Client-Side Sandbox</span>
          </div>
        </div>
      </div>
    );
  }

  if (!updateAvailable || isDismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 duration-300 print:hidden">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/90 border-2 border-teal-500/60 rounded-2xl p-4 shadow-2xl shadow-teal-950/50 backdrop-blur-md">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300 flex-shrink-0">
              <Sparkles className="w-5 h-5 text-teal-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">New Update Ready</h4>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-teal-500/20 text-teal-300 border border-teal-500/40 uppercase tracking-wider">
                  Live
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                New clinical features and performance updates have been deployed.
              </p>
            </div>
          </div>
          
          <button
            onClick={onDismiss}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/80 transition-colors"
            title="Dismiss for now (you can still update via the header)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
          <button
            onClick={onDismiss}
            className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors font-medium"
          >
            Later
          </button>
          <button
            onClick={onRestart}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold text-xs shadow-lg shadow-teal-500/30 transition-all transform active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restart to Update</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
