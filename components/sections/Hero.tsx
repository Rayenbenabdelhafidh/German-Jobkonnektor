import Image from "next/image";
import { ArrowRight, BadgeCheck } from "lucide-react";
import type { Lang } from "@/lib/languages";
import type { Dictionary } from "@/lib/i18n";
import { path } from "@/lib/routes";
import { LinkButton } from "@/components/ui/Button";
import { IMAGES } from "@/lib/images";

export function Hero({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const t = dict.home.hero;

  return (
    <section className="relative isolate overflow-hidden bg-navy">
      {/* Hero photograph (IMG-01). `priority` because this is the LCP element;
          the gradient overlay above it keeps the white headline readable. */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={IMAGES["img-01"].src}
          alt={t.imageAlt}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          style={{ objectPosition: IMAGES["img-01"].position }}
          className="object-cover"
        />
        <div aria-hidden="true" className="hero-scrim absolute inset-0" />
      </div>

      <div className="container-page py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-pill bg-white/10 px-4 py-2 text-xs font-semibold text-white ring-1 ring-inset ring-white/20 sm:text-sm">
            <BadgeCheck className="h-4 w-4 shrink-0 text-amber" aria-hidden="true" />
            {t.badge}
          </p>

          <h1 className="text-balance text-3xl font-extrabold leading-[1.15] text-white sm:text-4xl lg:text-5xl">
            {t.h1}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-navy-200 sm:text-lg">
            {t.sub}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <LinkButton
              href={`${path(lang, "employers")}#anfrage`}
              variant="accent"
              size="lg"
            >
              {t.ctaEmployers}
              <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
            </LinkButton>
            <LinkButton
              href={`${path(lang, "candidates")}#bewerbung`}
              variant="white"
              size="lg"
            >
              {t.ctaCandidates}
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
