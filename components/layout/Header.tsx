"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import type { Lang } from "@/lib/languages";
import type { Dictionary } from "@/lib/i18n";
import { NAV_KEYS, path, type RouteKey } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { LangSwitcher } from "./LangSwitcher";

interface HeaderProps {
  lang: Lang;
  dict: Dictionary;
}

const navLabelKeys: Record<Exclude<RouteKey, "imprint" | "privacy">, keyof Dictionary["nav"]> = {
  home: "home",
  about: "about",
  industries: "industries",
  employers: "employers",
  candidates: "candidates",
  contact: "contact",
};

export function Header({ lang, dict }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll behind the mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function isActive(key: RouteKey) {
    const href = path(lang, key);
    return key === "home" ? pathname === href : pathname.startsWith(href);
  }

  return (
    <>
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md transition-shadow duration-200",
        scrolled ? "shadow-header" : "shadow-none",
      )}
      style={{ height: "var(--header-height)" }}
    >
      <div className="container-page flex h-full items-center justify-between gap-4">
        <Logo lang={lang} />

        {/* Desktop navigation */}
        <nav
          aria-label={dict.nav.home}
          className="hidden items-center gap-0.5 xl:flex"
        >
          {NAV_KEYS.map((key) => {
            const labelKey = navLabelKeys[key as keyof typeof navLabelKeys];
            return (
              <Link
                key={key}
                href={path(lang, key)}
                aria-current={isActive(key) ? "page" : undefined}
                className={cn(
                  "relative whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                  isActive(key)
                    ? "text-navy"
                    : "text-muted hover:text-navy",
                )}
              >
                {dict.nav[labelKey]}
                {isActive(key) ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full bg-amber"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href={`${path(lang, "employers")}#anfrage`}
            className="hidden whitespace-nowrap rounded-pill bg-amber px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(242,140,40,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-600 sm:inline-flex"
          >
            {dict.nav.requestStaff}
          </Link>

          <LangSwitcher lang={lang} label={dict.nav.languageLabel} />

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-navy transition-colors hover:bg-navy-50 xl:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>

      {/* Mobile menu.
          Deliberately a SIBLING of <header>, not a child: the header uses
          backdrop-blur, which makes it the containing block for any
          position:fixed descendant. Nested here, the panel would be clipped to
          the header's own 4.5rem height instead of filling the viewport. */}
      {open ? (
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-20 bg-navy/40 xl:hidden"
        />
      ) : null}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 z-30 overflow-y-auto border-t border-line bg-white xl:hidden"
        style={{ top: "var(--header-height)" }}
      >
        <nav className="container-page flex flex-col py-4">
          {NAV_KEYS.map((key) => {
            const labelKey = navLabelKeys[key as keyof typeof navLabelKeys];
            return (
              <Link
                key={key}
                href={path(lang, key)}
                aria-current={isActive(key) ? "page" : undefined}
                className={cn(
                  "border-b border-line py-4 text-base font-medium transition-colors",
                  isActive(key) ? "text-navy" : "text-muted",
                )}
              >
                {dict.nav[labelKey]}
              </Link>
            );
          })}
          <Link
            href={`${path(lang, "employers")}#anfrage`}
            className="mt-6 inline-flex items-center justify-center rounded-pill bg-amber px-6 py-3.5 text-base font-semibold text-white"
          >
            {dict.nav.requestStaff}
          </Link>
        </nav>
      </div>
    </>
  );
}
