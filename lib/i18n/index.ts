import type { Lang } from "../languages";
import { de } from "./de";
import { en } from "./en";
import { ar } from "./ar";
import { fr } from "./fr";
import { legalDe } from "./legal/de";
import { legalEn } from "./legal/en";
import { legalAr } from "./legal/ar";
import { legalFr } from "./legal/fr";
import type { Dictionary, LegalDictionary } from "./types";

const dictionaries: Record<Lang, Dictionary> = { de, en, ar, fr };
const legalDictionaries: Record<Lang, LegalDictionary> = {
  de: legalDe,
  en: legalEn,
  ar: legalAr,
  fr: legalFr,
};

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}

export function getLegal(lang: Lang): LegalDictionary {
  return legalDictionaries[lang];
}

/** Replaces {placeholders} in a translated string. */
export function interpolate(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

export type { Dictionary, LegalDictionary };
