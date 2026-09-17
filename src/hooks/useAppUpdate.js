import { useState, useEffect, useCallback, useRef } from 'react';

// Build-time constants injected via vite.config.js
const LOCAL_BUILD_TIME = typeof __APP_BUILD_TIME__ !== 'undefined' ? __APP_BUILD_TIME__ : 0;
const LOCAL_VERSION = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '1.0.0';

export function useAppUpdate() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [checkResult, setCheckResult] = useState(null); // { type: 'success' | 'info' | 'error', message: string }
  const [isDismissed, setIsDismissed] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState(null);
  const registrationRef = useRef(null);
  const refreshingRef = useRef(false);

  // 1. Service Worker Registration and Lifecycle Watchers
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    // Prevent infinite reload loops when controller changes
    const onControllerChange = () => {
      if (refreshingRef.current) return;
      refreshingRef.current = true;
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);

    // Register service worker
    navigator.serviceWorker.register('./sw.js')
      .then((registration) => {
        registrationRef.current = registration;

        // Check if there is already a worker waiting
        if (registration.waiting) {
          setWaitingWorker(registration.waiting);
          setUpdateAvailable(true);
        }

        // Listen for new updates installing
        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing;
          if (!installingWorker) return;

          installingWorker.addEventListener('statechange', () => {
            if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setWaitingWorker(installingWorker);
              setUpdateAvailable(true);
              setIsDismissed(false);
            }
          });
        });
      })
      .catch((err) => {
        console.warn('PsyNurse ServiceWorker registration skipped/failed:', err);
      });

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
    };
  }, []);

  // 2. Poll version.json to detect new builds immediately
  const checkVersionJson = useCallback(async () => {
    try {
      const response = await fetch(`./version.json?t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
      });
      if (!response.ok) return false;

      const remoteData = await response.json();
      if (remoteData && remoteData.buildTime) {
        // If remote build is newer than local build timestamp
        if (Number(remoteData.buildTime) > Number(LOCAL_BUILD_TIME)) {
          setUpdateAvailable(true);
          setIsDismissed(false);
          return true;
        }
      }
      return false;
    } catch (e) {
      console.warn('Error checking version.json:', e);
      return false;
    }
  }, []);

  // 3. Periodic Background Check (every 2 minutes and on tab visibility)
  useEffect(() => {
    // Initial version check after 3 seconds
    const initialTimer = setTimeout(() => {
      checkVersionJson();
      if (registrationRef.current) {
        registrationRef.current.update().catch(() => {});
      }
    }, 3000);

    // Periodic check every 2 minutes
    const interval = setInterval(() => {
      checkVersionJson();
      if (registrationRef.current) {
        registrationRef.current.update().catch(() => {});
      }
    }, 120000);

    // Check when user switches back to this tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkVersionJson();
        if (registrationRef.current) {
          registrationRef.current.update().catch(() => {});
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [checkVersionJson]);

  // 4. Manual Check Function
  const checkForUpdates = useCallback(async () => {
    setIsChecking(true);
    setCheckResult(null);

    try {
      let foundUpdate = false;

      // Check SW update
      if (registrationRef.current) {
        await registrationRef.current.update().catch(() => {});
        if (registrationRef.current.waiting) {
          setWaitingWorker(registrationRef.current.waiting);
          foundUpdate = true;
        }
      }

      // Check version.json
      const remoteNewer = await checkVersionJson();
      if (remoteNewer) {
        foundUpdate = true;
      }

      if (foundUpdate) {
        setUpdateAvailable(true);
        setIsDismissed(false);
        setCheckResult({
          type: 'success',
          message: 'New clinical update is ready! Click "Restart to Update" to apply.'
        });
      } else {
        setCheckResult({
          type: 'info',
          message: `Suite is up to date (v${LOCAL_VERSION}).`
        });
      }
    } catch (err) {
      setCheckResult({
        type: 'error',
        message: 'Could not check for updates. Check internet connection.'
      });
    } finally {
      setIsChecking(false);
      // Clear status message after 4.5 seconds
      setTimeout(() => setCheckResult(null), 4500);
    }
  }, [checkVersionJson]);

  // 5. Restart and Apply Update Function
  const restartToUpdate = useCallback(async () => {
    setIsUpdating(true);

    try {
      // 1. Prompt waiting service worker to activate
      if (waitingWorker) {
        waitingWorker.postMessage({ type: 'SKIP_WAITING' });
      } else if (registrationRef.current && registrationRef.current.waiting) {
        registrationRef.current.waiting.postMessage({ type: 'SKIP_WAITING' });
      }

      // 2. Clear all browser caches to ensure 100% fresh assets
      if ('caches' in window) {
        const cacheKeys = await caches.keys();
        await Promise.all(cacheKeys.map((key) => caches.delete(key)));
      }

      // 3. Hard reload with cache buster query parameter
      setTimeout(() => {
        const cleanUrl = window.location.origin + window.location.pathname + '?v=' + Date.now();
        window.location.replace(cleanUrl);
      }, 350);
    } catch (err) {
      console.error('Error restarting for update:', err);
      // Fallback reload
      window.location.reload();
    }
  }, [waitingWorker]);

  const dismissNotification = useCallback(() => {
    setIsDismissed(true);
  }, []);

  return {
    updateAvailable,
    isChecking,
    isUpdating,
    checkResult,
    isDismissed,
    checkForUpdates,
    restartToUpdate,
    dismissNotification,
    currentVersion: LOCAL_VERSION
  };
}
