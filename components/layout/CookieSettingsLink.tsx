"use client";

import { openConsentSettings } from "@/lib/consent";

export function CookieSettingsLink({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={openConsentSettings}
      className="text-start text-sm text-navy-200 transition-colors hover:text-amber"
    >
      {label}
    </button>
  );
}
