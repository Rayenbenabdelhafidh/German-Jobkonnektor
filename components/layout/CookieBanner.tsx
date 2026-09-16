"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, Lock, Map as MapIcon, X } from "lucide-react";
import type { Lang } from "@/lib/languages";
import type { Dictionary } from "@/lib/i18n";
import { path } from "@/lib/routes";
import { useConsent } from "@/lib/consent";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface CookieBannerProps {
  lang: Lang;
  dict: Dictionary;
}

export function CookieBanner({ lang, dict }: CookieBannerProps) {
  const { consent, decided, hydrated, save, acceptAll, rejectAll } = useConsent();
  const [showSettings, setShowSettings] = useState(false);
  const [forced, setForced] = useState(false);
  const [maps, setMaps] = useState(false);

  // Re-opened from the footer link.
  useEffect(() => {
    function onOpen() {
      setMaps(consent?.maps === true);
      setShowSettings(true);
      setForced(true);
    }
    window.addEventListener("gjk-consent-open", onOpen);
    return () => window.removeEventListener("gjk-consent-open", onOpen);
  }, [consent]);

  // Nothing renders until the stored decision has been read, so no banner
  // flashes for visitors who already decided.
  if (!hydrated) return null;
  if (decided && !forced) return null;

  const t = dict.cookies;

  function closeSettings() {
    setShowSettings(false);
    setForced(false);
  }

  if (showSettings) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-settings-title"
        className="fixed inset-0 z-[60] flex items-end justify-center bg-navy/60 p-4 backdrop-blur-sm sm:items-center"
      >
        <div className="max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-card bg-white p-6 shadow-cardHover sm:p-8">
          <div className="mb-5 flex items-start justify-between gap-4">
            <h2
              id="cookie-settings-title"
              className="text-xl font-bold text-navy"
            >
              {t.settingsTitle}
            </h2>
            {decided ? (
              <button
                type="button"
                onClick={closeSettings}
                aria-label={dict.nav.closeMenu}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-navy"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            ) : null}
          </div>

          <p className="mb-6 text-sm leading-relaxed text-muted">
            {t.settingsBody}
          </p>

          <div className="space-y-4">
            {/* Necessary — always on, cannot be switched off. */}
            <div className="rounded-xl border border-line bg-surface p-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="flex items-center gap-2.5 font-semibold text-navy">
                  <Lock className="h-4 w-4 text-navy-400" aria-hidden="true" />
                  {t.categories.necessary.title}
                </span>
                <span className="shrink-0 rounded-pill bg-navy-100 px-3 py-1 text-xs font-semibold text-navy">
                  {t.categories.necessary.always}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-muted">
                {t.categories.necessary.body}
              </p>
            </div>

            {/* Maps */}
            <div className="rounded-xl border border-line p-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="flex items-center gap-2.5 font-semibold text-navy">
                  <MapIcon className="h-4 w-4 text-navy-400" aria-hidden="true" />
                  {t.categories.maps.title}
                </span>
                <label className="relative inline-flex shrink-0 cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={maps}
                    onChange={(event) => setMaps(event.target.checked)}
                    className="peer sr-only"
                  />
                  <span className="sr-only">{t.categories.maps.title}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-6 w-11 rounded-full bg-navy-200 transition-colors",
                      "after:absolute after:top-0.5 after:start-0.5 after:h-5 after:w-5",
                      "after:rounded-full after:bg-white after:transition-transform",
                      "peer-checked:bg-amber peer-checked:after:translate-x-5",
                      "rtl:peer-checked:after:-translate-x-5",
                      "peer-focus-visible:ring-4 peer-focus-visible:ring-amber/30",
                    )}
                  />
                </label>
              </div>
              <p className="text-xs leading-relaxed text-muted">
                {t.categories.maps.body}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <Button
              variant="accent"
              size="md"
              className="flex-1"
              onClick={() => {
                save({ maps });
                closeSettings();
              }}
            >
              {t.save}
            </Button>
            <Button
              variant="outline"
              size="md"
              className="flex-1"
              onClick={() => {
                rejectAll();
                closeSettings();
              }}
            >
              {t.rejectAll}
            </Button>
          </div>

          <Link
            href={path(lang, "privacy")}
            className="mt-4 inline-block text-xs font-medium text-navy underline underline-offset-2 hover:text-amber"
          >
            {dict.footer.privacy}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-white p-4 shadow-[0_-8px_32px_rgba(11,37,69,0.12)] sm:p-6"
    >
      <div className="container-page flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
        <div className="flex flex-1 gap-4">
          <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy sm:flex">
            <Cookie className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2
              id="cookie-banner-title"
              className="mb-1.5 text-base font-bold text-navy"
            >
              {t.title}
            </h2>
            <p className="text-xs leading-relaxed text-muted sm:text-sm">
              {t.body}{" "}
              <Link
                href={path(lang, "privacy")}
                className="font-medium text-navy underline underline-offset-2 hover:text-amber"
              >
                {dict.footer.privacy}
              </Link>
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row lg:w-auto">
          <Button variant="accent" onClick={acceptAll}>
            {t.acceptAll}
          </Button>
          <Button variant="outline" onClick={rejectAll}>
            {t.rejectAll}
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setMaps(false);
              setShowSettings(true);
            }}
          >
            {t.settings}
          </Button>
        </div>
      </div>
    </div>
  );
}
