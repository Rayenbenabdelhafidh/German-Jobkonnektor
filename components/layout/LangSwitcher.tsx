"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Check, ChevronDown, Globe } from "lucide-react";
import { LANGUAGES, LANG_META, type Lang } from "@/lib/languages";
import { swapLang } from "@/lib/routes";
import { cn } from "@/lib/utils";

interface LangSwitcherProps {
  lang: Lang;
  label: string;
  className?: string;
}

export function LangSwitcher({ lang, label, className }: LangSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent | TouchEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function choose(next: Lang) {
    setOpen(false);
    if (next === lang) return;
    // Same page, different language — the slug set is shared across languages.
    router.push(swapLang(pathname, next));
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        className="flex items-center gap-1.5 rounded-pill border border-line px-3 py-2 text-sm font-semibold text-navy transition-colors hover:border-navy-200 hover:bg-navy-50"
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        <span>{LANG_META[lang].label}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label={label}
          className="absolute end-0 top-full z-50 mt-2 min-w-[11rem] overflow-hidden rounded-xl border border-line bg-white py-1 shadow-cardHover"
        >
          {LANGUAGES.map((code) => {
            const active = code === lang;
            return (
              <li key={code} role="option" aria-selected={active}>
                <button
                  type="button"
                  lang={code}
                  dir={LANG_META[code].dir}
                  onClick={() => choose(code)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors",
                    active
                      ? "bg-navy-50 font-semibold text-navy"
                      : "text-ink hover:bg-surface",
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-6 shrink-0 text-xs font-bold tracking-wide text-muted">
                      {LANG_META[code].label}
                    </span>
                    <span>{LANG_META[code].nativeName}</span>
                  </span>
                  {active ? (
                    <Check className="h-4 w-4 shrink-0 text-amber" aria-hidden="true" />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
