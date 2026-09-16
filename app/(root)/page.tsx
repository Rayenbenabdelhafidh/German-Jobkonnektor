import Link from "next/link";
import { path } from "@/lib/routes";
import { DEFAULT_LANG } from "@/lib/languages";
import { RedirectClient } from "./RedirectClient";

/**
 * Replaces the previous `redirects()` entry in next.config.ts
 * (`{ source: "/", destination: "/de", permanent: false }`).
 *
 * GitHub Pages is a static file host with no server or edge runtime, so a
 * config-level redirect can never run there — Next.js only ever applies
 * `redirects()` through a Node/Edge server, which doesn't exist for a
 * static export. This route makes "/" a real pre-rendered HTML page
 * (`/German-Jobkonnektor/index.html`) that sends visitors on to "/de"
 * itself, the moment it loads, through three independent, layered
 * mechanisms so the redirect still fires even with JavaScript disabled:
 *
 *   1. <meta http-equiv="refresh"> — works with JavaScript off; this is
 *      the primary mechanism and fires instantly (content="0").
 *   2. RedirectClient's router.replace() — a same-behaviour fallback for
 *      the rare case a browser or crawler ignores the meta tag.
 *   3. The visible link below — for the vanishingly rare case neither of
 *      the above runs (e.g. a text-only browser).
 *
 * The destination is unchanged: /de, exactly as the old config redirected.
 */
export default function RootRedirectPage() {
  const destination = path(DEFAULT_LANG, "home");
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  // next.config.ts sets trailingSlash: true, so the real exported file is
  // de/index.html — <Link>/router.replace() append the slash automatically,
  // but this raw string is built by hand and needs it spelled out.
  const metaRefreshUrl = `${basePath}${destination}/`;

  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${metaRefreshUrl}`} />
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center text-white">
        <p className="text-sm text-white/70">Weiterleitung …</p>
        <Link
          href={destination}
          className="text-sm font-semibold text-amber underline underline-offset-4"
        >
          Falls Sie nicht automatisch weitergeleitet werden, klicken Sie hier.
        </Link>
      </main>
      <RedirectClient />
    </>
  );
}
