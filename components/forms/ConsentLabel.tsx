import Link from "next/link";
import type { Lang } from "@/lib/languages";
import { path } from "@/lib/routes";

/**
 * Renders a consent sentence followed by a link to the privacy policy.
 * The checkbox itself is always unchecked by default — see the forms.
 */
export function ConsentLabel({
  text,
  linkLabel,
  lang,
}: {
  text: string;
  linkLabel: string;
  lang: Lang;
}) {
  return (
    <>
      {text}{" "}
      <Link
        href={path(lang, "privacy")}
        target="_blank"
        className="font-semibold text-navy underline underline-offset-2 hover:text-amber"
      >
        {linkLabel}
      </Link>
    </>
  );
}
