import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Crawlers see the real request path, which on GitHub Pages includes the
  // /German-Jobkonnektor base path — "/admin" alone would only ever disallow
  // a path that doesn't exist on this deployment.
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: [`${basePath}/admin/`] },
    ],
    sitemap: `${COMPANY.siteUrl}/sitemap.xml`,
  };
}
