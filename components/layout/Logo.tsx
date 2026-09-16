import Link from "next/link";
import type { Lang } from "@/lib/languages";
import { path } from "@/lib/routes";
import { cn } from "@/lib/utils";

interface LogoProps {
  lang: Lang;
  tone?: "dark" | "light";
  className?: string;
}

/**
 * Wordmark + monogram. The "K" glyph sits inside an amber-cornered navy
 * square — a placeholder mark that reads as a real logo at small sizes.
 * Swap the <span> for an <Image> when a designed logo file exists.
 *
 * `shrink-0` on the root link is load-bearing, not decorative: the wordmark
 * text is `whitespace-nowrap` with no `min-width` override, so if the header's
 * flex row were ever allowed to squeeze this link below its natural size (e.g.
 * a long nav label in French leaving too little room), the text would overflow
 * past its own box and visually collide with the next nav item instead of
 * wrapping or truncating. `shrink-0` guarantees the flex layout never assigns
 * it less than its full content width, in any language.
 */
export function Logo({ lang, tone = "dark", className }: LogoProps) {
  const light = tone === "light";

  return (
    <Link
      href={path(lang, "home")}
      className={cn(
        "group flex shrink-0 items-center gap-2 rounded-lg sm:gap-2.5",
        className,
      )}
      aria-label="German Jobkonnektor"
    >
      <span
        aria-hidden="true"
        className={cn(
          "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-display text-base font-bold transition-transform duration-200 group-hover:scale-105 sm:h-10 sm:w-10 sm:text-lg",
          light ? "bg-white text-navy" : "bg-navy text-white",
        )}
      >
        GJ
        <span className="absolute -bottom-0.5 -end-0.5 h-3 w-3 rounded-[4px] bg-amber" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "whitespace-nowrap font-display text-[13px] font-bold tracking-tight sm:text-[15px] lg:text-base",
            light ? "text-white" : "text-navy",
          )}
        >
          German Jobkonnektor
        </span>
        <span
          className={cn(
            "mt-0.5 text-[9px] font-medium uppercase tracking-[0.14em] sm:mt-1 sm:text-[10px] sm:tracking-[0.16em]",
            light ? "text-white/60" : "text-muted",
          )}
        >
          München
        </span>
      </span>
    </Link>
  );
}
