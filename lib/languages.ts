export const LANGUAGES = ["de", "en", "ar", "fr"] as const;

export type Lang = (typeof LANGUAGES)[number];

export const DEFAULT_LANG: Lang = "de";

export const LANG_META: Record<
  Lang,
  { label: string; nativeName: string; dir: "ltr" | "rtl"; htmlLang: string }
> = {
  de: { label: "DE", nativeName: "Deutsch", dir: "ltr", htmlLang: "de-DE" },
  en: { label: "EN", nativeName: "English", dir: "ltr", htmlLang: "en" },
  ar: { label: "AR", nativeName: "العربية", dir: "rtl", htmlLang: "ar" },
  fr: { label: "FR", nativeName: "Français", dir: "ltr", htmlLang: "fr-FR" },
};

export function isLang(value: string): value is Lang {
  return (LANGUAGES as readonly string[]).includes(value);
}

export function dirOf(lang: Lang): "ltr" | "rtl" {
  return LANG_META[lang].dir;
}
