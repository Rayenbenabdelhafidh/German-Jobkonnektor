"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { path } from "@/lib/routes";
import { DEFAULT_LANG } from "@/lib/languages";

/**
 * JS-driven fallback for the "/" → "/de" redirect.
 *
 * `router.replace()` is basePath-aware (Next.js prefixes it automatically),
 * so this needs no knowledge of GitHub Pages' /German-Jobkonnektor subpath.
 * It only matters if the <meta http-equiv="refresh"> tag in page.tsx is ever
 * stripped or ignored; on any browser that honours that tag, this effect
 * fires after the browser has already navigated away and does nothing.
 */
export function RedirectClient() {
  const router = useRouter();

  useEffect(() => {
    router.replace(path(DEFAULT_LANG, "home"));
  }, [router]);

  return null;
}
