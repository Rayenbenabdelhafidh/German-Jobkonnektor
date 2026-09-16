import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import type { Lang } from "@/lib/languages";
import type { Dictionary } from "@/lib/i18n";
import { COMPANY, MAILTO_URL, TEL_URL } from "@/lib/config";
import { NAV_KEYS, path } from "@/lib/routes";
import { Logo } from "./Logo";
import { CookieSettingsLink } from "./CookieSettingsLink";

interface FooterProps {
  lang: Lang;
  dict: Dictionary;
}

export function Footer({ lang, dict }: FooterProps) {
  const year = new Date().getFullYear();

  const navLabels = {
    home: dict.nav.home,
    about: dict.nav.about,
    industries: dict.nav.industries,
    employers: dict.nav.employers,
    candidates: dict.nav.candidates,
    contact: dict.nav.contact,
  } as const;

  return (
    <footer className="bg-navy text-navy-200">
      <div className="container-page py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="lg:pe-6">
            <Logo lang={lang} tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-navy-200">
              {dict.footer.tagline}
            </p>
            <p className="mt-4 text-xs text-navy-300">
              {dict.footer.ownerLabel}: {COMPANY.owner}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              {dict.footer.quickLinksTitle}
            </h2>
            <ul className="space-y-2.5">
              {NAV_KEYS.map((key) => (
                <li key={key}>
                  <Link
                    href={path(lang, key)}
                    className="text-sm text-navy-200 transition-colors hover:text-amber"
                  >
                    {navLabels[key as keyof typeof navLabels]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              {dict.footer.contactTitle}
            </h2>
            <ul className="space-y-3.5 text-sm">
              <li className="flex gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-amber"
                  aria-hidden="true"
                />
                <address className="not-italic leading-relaxed text-navy-200">
                  {COMPANY.street}
                  <br />
                  <span className="numeric">{COMPANY.postalCode}</span>{" "}
                  {COMPANY.city}
                  <br />
                  {dict.countryName}
                </address>
              </li>
              <li className="flex gap-3">
                <Mail
                  className="mt-0.5 h-4 w-4 shrink-0 text-amber"
                  aria-hidden="true"
                />
                <a
                  href={MAILTO_URL}
                  className="break-all text-navy-200 transition-colors hover:text-amber"
                >
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0 text-amber"
                  aria-hidden="true"
                />
                <a
                  href={TEL_URL}
                  className="numeric text-navy-200 transition-colors hover:text-amber"
                >
                  {COMPANY.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              {dict.footer.legalTitle}
            </h2>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href={path(lang, "imprint")}
                  className="text-sm text-navy-200 transition-colors hover:text-amber"
                >
                  {dict.footer.imprint}
                </Link>
              </li>
              <li>
                <Link
                  href={path(lang, "privacy")}
                  className="text-sm text-navy-200 transition-colors hover:text-amber"
                >
                  {dict.footer.privacy}
                </Link>
              </li>
              <li>
                <CookieSettingsLink label={dict.footer.cookieSettings} />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs text-navy-300">
            © <span className="numeric">{year}</span> {COMPANY.name}.{" "}
            {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
