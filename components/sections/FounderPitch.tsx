import { ArrowRight, Check, Quote } from "lucide-react";
import type { Lang } from "@/lib/languages";
import type { Dictionary } from "@/lib/i18n";
import { path } from "@/lib/routes";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { SiteImage } from "@/components/ui/SiteImage";

export function FounderPitch({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const t = dict.home.founder;

  return (
    <Section tone="surface">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-5">
          <div className="relative">
            <SiteImage
              id="img-02"
              alt={t.imageAlt}
              ratio="4/5"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="shadow-cardHover"
            />
            {/* Name plate anchored to the inline-start edge. */}
            <div className="absolute -bottom-5 start-4 end-4 rounded-2xl bg-white p-4 shadow-cardHover sm:start-6 sm:end-auto sm:max-w-xs">
              <p className="font-display text-base font-bold text-navy">
                {t.name}
              </p>
              <p className="mt-0.5 text-xs text-muted">{t.role}</p>
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={100}>
          <p className="eyebrow mb-3">{t.eyebrow}</p>

          <blockquote className="relative mb-6">
            <Quote
              className="mb-3 h-7 w-7 text-amber rtl-flip"
              aria-hidden="true"
            />
            <p className="font-display text-xl font-bold leading-snug text-navy sm:text-2xl">
              {t.lead}
            </p>
          </blockquote>

          <div className="space-y-4">
            {t.body.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-7 space-y-3">
            {t.credentials.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber/15 text-amber">
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-navy">{item}</span>
              </li>
            ))}
          </ul>

          <LinkButton
            href={path(lang, "about")}
            variant="outline"
            size="md"
            className="mt-8"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
          </LinkButton>
        </Reveal>
      </div>
    </Section>
  );
}
