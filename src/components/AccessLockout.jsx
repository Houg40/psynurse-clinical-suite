import React, { useState, useEffect } from 'react';
import { ShieldAlert, Lock, KeyRound } from 'lucide-react';

export default function AccessLockout({ onAdminUnlock }) {
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    // 1. Unregister all service workers to kill offline PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
    }

    // 2. Wipe all CacheStorage
    if ('caches' in window) {
      caches.keys().then((names) => {
        for (const name of names) {
          caches.delete(name);
        }
      });
    }

    // 3. Clear local & session storage
    try {
      localStorage.clear();
      sessionStorage.removeItem('psynurse_admin_auth');
    } catch (e) {
      // ignore
    }
  }, []);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (passcode === 'Houg40Admin' || passcode === '4040' || passcode === 'admin') {
      sessionStorage.setItem('psynurse_admin_auth', 'true');
      onAdminUnlock();
    } else {
      setError(true);
      setPasscode('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 selection:bg-rose-500 selection:text-white">
      <div className="max-w-md w-full bg-slate-900 border-2 border-rose-900/60 rounded-3xl p-8 shadow-2xl space-y-6 text-center">
        
        {/* Lockout Icon */}
        <div className="mx-auto w-20 h-20 rounded-2xl bg-rose-950/70 border-2 border-rose-600/50 flex items-center justify-center shadow-inner">
          <ShieldAlert className="w-10 h-10 text-rose-500" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="inline-block px-3 py-1 bg-rose-950/80 border border-rose-700/60 rounded-full text-[11px] font-black tracking-widest text-rose-300 uppercase">
            Status: 403 Forbidden
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Access Suspended
          </h1>
          <p className="text-xs font-semibold text-rose-400">
            PsyNurse Clinical Decision Support Suite
          </p>
        </div>

        {/* Message */}
        <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs text-slate-400 space-y-2.5 text-left leading-relaxed">
          <p className="font-semibold text-slate-200">
            Access to this clinical portal has been deactivated by the system administrator.
          </p>
          <p>
            This deployment is no longer authorized for clinical reference, screening scales, step-therapy algorithms, or medication decision support.
          </p>
          <p className="text-[11px] text-slate-500 border-t border-slate-800/80 pt-2 italic">
            All offline local caches, service workers, and active clinical sessions have been securely purged from this device.
          </p>
        </div>

        {/* Discreet Admin Unlock Link */}
        <div className="pt-2">
          {!showAdminPrompt ? (
            <button
              onClick={() => setShowAdminPrompt(true)}
              className="text-[11px] text-slate-600 hover:text-slate-400 transition-colors flex items-center justify-center gap-1 mx-auto"
            >
              <Lock className="w-3 h-3" />
              <span>Administrator Portal</span>
            </button>
          ) : (
            <form onSubmit={handleUnlock} className="space-y-3 pt-2">
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => { setPasscode(e.target.value); setError(false); }}
                  placeholder="Enter Admin Passcode"
                  autoFocus
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-all text-center tracking-widest"
                />
              </div>

              {error && (
                <p className="text-[11px] text-rose-500 font-bold">
                  Invalid passcode. Access denied.
                </p>
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setShowAdminPrompt(false); setError(false); }}
                  className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-black rounded-xl transition-all shadow-md flex items-center justify-center gap-1"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Unlock</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>

      <div className="mt-8 text-[11px] text-slate-600 font-mono">
        Instance: houg40.github.io • Session Terminated
      </div>
    </div>
  );
}
