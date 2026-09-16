/**
 * Country list for the candidate form.
 *
 * The names are pre-generated per language (see scripts/generate-countries.mjs)
 * rather than derived from `Intl.DisplayNames` at render time: Node's ICU data
 * and the browser's can differ, which makes the server and client markup
 * disagree and triggers a React hydration mismatch.
 *
 * The value stored in the form is always the ISO 3166-1 alpha-2 code, which is
 * what a backend should persist.
 */

import type { Lang } from "./languages";
import { COUNTRIES_BY_LANG, type CountryOption } from "./countries.generated";

export type { CountryOption };

export function getCountries(lang: Lang): CountryOption[] {
  return COUNTRIES_BY_LANG[lang];
}
