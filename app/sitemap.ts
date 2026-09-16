import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/config";
import { LANGUAGES, DEFAULT_LANG } from "@/lib/languages";
import { ROUTES, path, type RouteKey } from "@/lib/routes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const keys = Object.keys(ROUTES) as RouteKey[];
  const now = new Date();

  return LANGUAGES.flatMap((lang) =>
    keys.map((key) => ({
      url: `${COMPANY.siteUrl}${path(lang, key)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: key === "home" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries([
          ...LANGUAGES.map((code) => [code, `${COMPANY.siteUrl}${path(code, key)}`]),
          ["x-default", `${COMPANY.siteUrl}${path(DEFAULT_LANG, key)}`],
        ]),
      },
    })),
  );
}
