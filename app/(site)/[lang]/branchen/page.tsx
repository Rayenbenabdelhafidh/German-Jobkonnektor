import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  FileStack,
  Globe2,
  Languages,
  Search,
} from "lucide-react";
import { isLang } from "@/lib/languages";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { path } from "@/lib/routes";
import { SECTOR_ICONS, SECTOR_IMAGE_IDS, type SectorId } from "@/lib/sectors";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Card, IconCard } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { SiteImage } from "@/components/ui/SiteImage";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata(lang, "industries", "industries");
}

const serviceIcons = [Globe2, Search, FileStack, Languages];

export default async function IndustriesPage({ params }: Params) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const dict = getDictionary(lang);
  const { hero, sectorsTitle, sectors, services, cta } = dict.industries;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} sub={hero.sub} />

      {/* Six sectors */}
      <Section>
        <SectionHeader title={sectorsTitle} align="center" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, index) => {
            const id = sector.id as SectorId;
            const Icon = SECTOR_ICONS[id];
            return (
              <Reveal key={sector.id} delay={index * 70}>
                <Card
                  hover
                  className="flex h-full scroll-mt-28 flex-col p-0"
                  // Anchor target for the home-page preview cards.
                >
                  <div id={sector.id} className="scroll-mt-28" />
                  <SiteImage
                    id={SECTOR_IMAGE_IDS[id]}
                    alt={sector.imageAlt}
                    ratio="16/10"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    rounded={false}
                    className="rounded-t-card"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-navy text-white">
                      <Icon
                        className="h-5 w-5"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </span>
                    <h3 className="mb-2 text-lg font-bold">{sector.title}</h3>
                    <p className="mb-5 text-sm leading-relaxed text-muted">
                      {sector.body}
                    </p>
                    <ul className="mt-auto flex flex-wrap gap-2">
                      {sector.roles.map((role) => (
                        <li
                          key={role}
                          className="rounded-pill bg-navy-50 px-3 py-1.5 text-xs font-medium text-navy"
                        >
                          {role}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Service portfolio */}
      <Section tone="surface">
        <SectionHeader
          eyebrow={services.eyebrow}
          title={services.title}
          sub={services.sub}
        />
        <div className="grid gap-6 md:grid-cols-2">
          {services.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <IconCard
                icon={serviceIcons[index] ?? Globe2}
                title={item.title}
                body={item.body}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section tone="navy" className="py-14 sm:py-16">
        <Reveal className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-start">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              {cta.title}
            </h2>
            <p className="mt-2 text-navy-200">{cta.body}</p>
          </div>
          <LinkButton
            href={`${path(lang, "employers")}#anfrage`}
            variant="accent"
            size="lg"
            className="shrink-0"
          >
            {cta.btn}
            <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
          </LinkButton>
        </Reveal>
      </Section>
    </>
  );
}
