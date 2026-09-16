"use client";

import { ExternalLink, MapPin } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { COMPANY, mapsEmbedUrl, MAPS_LINK_URL } from "@/lib/config";
import { useConsent } from "@/lib/consent";
import { Button } from "@/components/ui/Button";

/**
 * The Google Maps iframe is never mounted until the visitor has actively
 * consented — no request reaches Google before that. Consent can be given
 * here directly or through the cookie banner.
 */
export function ConsentedMap({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: string;
}) {
  const { allowsMaps, hydrated, save } = useConsent();

  const t = dict.cookies.mapPlaceholder;

  if (hydrated && allowsMaps) {
    return (
      <div className="overflow-hidden rounded-card border border-line shadow-card">
        <iframe
          src={mapsEmbedUrl(lang)}
          title={dict.contact.mapTitle}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="h-[380px] w-full border-0 sm:h-[440px]"
        />
      </div>
    );
  }

  return (
    <div className="flex h-[380px] flex-col items-center justify-center rounded-card border border-dashed border-navy-200 bg-surface p-6 text-center sm:h-[440px]">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-navy shadow-card">
        <MapPin className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mb-2 text-lg font-bold text-navy">{t.title}</h3>
      <p className="mb-5 max-w-sm text-sm leading-relaxed text-muted">
        {t.body}
      </p>
      <Button
        variant="accent"
        onClick={() => save({ maps: true })}
        disabled={!hydrated}
      >
        {t.btn}
      </Button>
      <a
        href={MAPS_LINK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-navy underline underline-offset-2 hover:text-amber"
      >
        {t.link}
        <ExternalLink className="h-3 w-3 rtl-flip" aria-hidden="true" />
      </a>
      <p className="mt-6 text-xs text-muted">
        {COMPANY.street}, <span className="numeric">{COMPANY.postalCode}</span>{" "}
        {COMPANY.city}
      </p>
    </div>
  );
}
