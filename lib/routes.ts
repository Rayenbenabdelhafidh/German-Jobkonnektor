import type { Lang } from "./languages";

/**
 * One shared slug set across all three languages.
 * The Next.js App Router requires identical folder names under the
 * [lang] segment, so the slugs are German — appropriate for a Munich
 * company, and it makes the language switcher a single-segment swap
 * that preserves whichever page the visitor is on.
 */
export const ROUTES = {
  home: "",
  about: "ueber-uns",
  industries: "branchen",
  employers: "arbeitgeber",
  candidates: "bewerber",
  contact: "kontakt",
  imprint: "impressum",
  privacy: "datenschutz",
} as const;

export type RouteKey = keyof typeof ROUTES;

export function path(lang: Lang, key: RouteKey): string {
  const slug = ROUTES[key];
  return slug ? `/${lang}/${slug}` : `/${lang}`;
}

/** Swap the language segment of an arbitrary pathname, keeping the page. */
export function swapLang(pathname: string, next: Lang): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return `/${next}`;
  parts[0] = next;
  return `/${parts.join("/")}`;
}

export const NAV_KEYS: RouteKey[] = [
  "home",
  "about",
  "industries",
  "employers",
  "candidates",
  "contact",
];
