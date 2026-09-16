import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDictionary } from "@/lib/i18n";
import { DEFAULT_LANG } from "@/lib/languages";
import { path } from "@/lib/routes";

/**
 * Rendered for unknown paths, including an unknown language segment — so it
 * cannot assume a valid language and falls back to German, the site default.
 */
export default function NotFound() {
  const dict = getDictionary(DEFAULT_LANG);

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-7xl font-extrabold text-navy-100 sm:text-8xl">
        404
      </p>
      <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
        {dict.notFound.title}
      </h1>
      <p className="mt-3 max-w-md text-muted">{dict.notFound.body}</p>
      <Link
        href={path(DEFAULT_LANG, "home")}
        className="mt-8 inline-flex items-center gap-2 rounded-pill bg-amber px-7 py-3.5 text-base font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
      >
        {dict.notFound.cta}
        <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
      </Link>
    </div>
  );
}
