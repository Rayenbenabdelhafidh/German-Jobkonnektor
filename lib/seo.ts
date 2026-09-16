import type { Metadata } from "next";
import { COMPANY } from "./config";
import { getDictionary } from "./i18n";
import { LANGUAGES, DEFAULT_LANG, type Lang } from "./languages";
import { path, type RouteKey } from "./routes";

type PageKey = keyof ReturnType<typeof getDictionary>["meta"]["pages"];

/**
 * Builds a page's metadata: a unique title and description in the page's own
 * language, a canonical URL, and a full set of hreflang alternates pointing at
 * the same page in the other two languages, plus x-default.
 */
export function pageMetadata(
  lang: Lang,
  page: PageKey,
  route: RouteKey,
): Metadata {
  const dict = getDictionary(lang);
  const { title, description } = dict.meta.pages[page];
  const canonical = path(lang, route);

  const languages: Record<string, string> = {};
  for (const code of LANGUAGES) {
    languages[code] = path(code, route);
  }
  languages["x-default"] = path(DEFAULT_LANG, route);

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      siteName: COMPANY.name,
      title,
      description,
      url: `${COMPANY.siteUrl}${canonical}`,
      locale: lang,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** Organization JSON-LD, injected once on the home page of each language. */
export function organizationJsonLd(lang: Lang) {
  const dict = getDictionary(lang);

  return {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    name: COMPANY.name,
    description: dict.meta.pages.home.description,
    url: `${COMPANY.siteUrl}${path(lang, "home")}`,
    email: COMPANY.email,
    telephone: COMPANY.phone,
    founder: { "@type": "Person", name: COMPANY.owner },
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.street,
      postalCode: COMPANY.postalCode,
      addressLocality: COMPANY.city,
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY.geo.lat,
      longitude: COMPANY.geo.lng,
    },
    areaServed: "DE",
    knowsLanguage: ["de", "en", "ar", "fr"],
  };
}
