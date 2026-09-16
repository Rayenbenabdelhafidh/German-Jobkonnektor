"use client";

import { useCallback, useEffect, useState } from "react";

export const CONSENT_STORAGE_KEY = "gjk-consent";
export const CONSENT_VERSION = 1;
export const CONSENT_CHANGED_EVENT = "gjk-consent-changed";

export interface ConsentState {
  version: number;
  /** Always true — required for the site to function at all. */
  necessary: true;
  /** Google Maps embed on the contact page. */
  maps: boolean;
  decidedAt: string;
}

export const DENY_ALL: ConsentState = {
  version: CONSENT_VERSION,
  necessary: true,
  maps: false,
  decidedAt: "",
};

function read(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    // A bumped version invalidates the old decision and re-asks.
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      version: CONSENT_VERSION,
      necessary: true,
      maps: parsed.maps === true,
      decidedAt: typeof parsed.decidedAt === "string" ? parsed.decidedAt : "",
    };
  } catch {
    // Private mode, disabled storage, corrupted value — treat as undecided.
    return null;
  }
}

function write(state: ConsentState): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Nothing we can do; the banner will simply re-appear next visit.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT));
}

export function openConsentSettings(): void {
  window.dispatchEvent(new CustomEvent("gjk-consent-open"));
}

/**
 * `decided` starts as `false` on the server and on the first client render,
 * so nothing gated ever renders before hydration reads the stored decision.
 */
export function useConsent() {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setConsent(read());
    setHydrated(true);

    const sync = () => setConsent(read());
    window.addEventListener(CONSENT_CHANGED_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CONSENT_CHANGED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const save = useCallback((next: Omit<ConsentState, "version" | "necessary" | "decidedAt">) => {
    const state: ConsentState = {
      version: CONSENT_VERSION,
      necessary: true,
      maps: next.maps,
      decidedAt: new Date().toISOString(),
    };
    setConsent(state);
    write(state);
  }, []);

  const acceptAll = useCallback(() => save({ maps: true }), [save]);
  const rejectAll = useCallback(() => save({ maps: false }), [save]);

  return {
    consent,
    hydrated,
    decided: hydrated && consent !== null,
    allowsMaps: consent?.maps === true,
    save,
    acceptAll,
    rejectAll,
  };
}
