import { ArrowRight } from "lucide-react";
import type { Lang } from "@/lib/languages";
import type { Dictionary } from "@/lib/i18n";
import { path } from "@/lib/routes";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBanner({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const t = dict.home.finalCta;

  return (
    <section className="relative isolate overflow-hidden bg-navy">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(242,140,40,0.2), transparent 65%)",
        }}
      />
      <div className="container-page py-16 sm:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold text-white sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-navy-200 sm:text-lg">
            {t.body}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <LinkButton
              href={`${path(lang, "employers")}#anfrage`}
              variant="accent"
              size="lg"
            >
              {t.employerBtn}
              <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
            </LinkButton>
            <LinkButton
              href={`${path(lang, "candidates")}#bewerbung`}
              variant="white"
              size="lg"
            >
              {t.candidateBtn}
            </LinkButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
