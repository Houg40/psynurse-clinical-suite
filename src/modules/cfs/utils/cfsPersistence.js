/**
 * src/modules/cfs/utils/cfsPersistence.js
 * 
 * Zero-PHI Client-Side Session Persistence for the Clinical Flight Simulator (CFS).
 * Automatically saves active simulation progress (dialogue messages, uncovered clues,
 * drafted prescriptions, inpatient bed orders, and clinical notes) to localStorage so
 * providers can pick up right where they left off after an app update, browser restart,
 * or switching between CDS and CFS.
 */

const CFS_STORAGE_KEY = 'psynurse_cfs_active_session_v1';

export function loadCfsSession() {
  try {
    const raw = localStorage.getItem(CFS_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn('[CFS Persistence] Failed to parse saved session from localStorage:', err);
    return null;
  }
}

export function saveCfsSession(sessionState) {
  try {
    if (!sessionState) return;
    const payload = {
      ...sessionState,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem(CFS_STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.warn('[CFS Persistence] Failed to save session to localStorage:', err);
  }
}

export function clearCfsSession() {
  try {
    localStorage.removeItem(CFS_STORAGE_KEY);
  } catch (err) {
    console.warn('[CFS Persistence] Failed to clear saved session:', err);
  }
}
