import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Lang } from "@/lib/languages";
import type { Dictionary } from "@/lib/i18n";
import { path } from "@/lib/routes";
import { SECTOR_ICONS, type SectorId } from "@/lib/sectors";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";

export function IndustriesPreview({
  lang,
  dict,
}: {
  lang: Lang;
  dict: Dictionary;
}) {
  const t = dict.home.industries;

  return (
    <Section tone="surface">
      <SectionHeader title={t.title} sub={t.sub} />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {dict.industries.sectors.map((sector, index) => {
          const Icon = SECTOR_ICONS[sector.id as SectorId];
          return (
            <Reveal key={sector.id} delay={index * 70}>
              <Link
                href={`${path(lang, "industries")}#${sector.id}`}
                className="group flex h-full flex-col rounded-card border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-navy-100 hover:shadow-cardHover"
              >
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white transition-colors duration-300 group-hover:bg-amber">
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mb-2 text-lg font-bold">{sector.title}</h3>
                <ul className="mb-5 space-y-1">
                  {sector.roles.map((role) => (
                    <li key={role} className="text-sm text-muted">
                      {role}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors group-hover:text-amber">
                  <ArrowRight
                    className="h-4 w-4 rtl-flip transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-12 text-center">
        <LinkButton href={path(lang, "industries")} variant="navy" size="lg">
          {t.cta}
          <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
        </LinkButton>
      </Reveal>
    </Section>
  );
}
