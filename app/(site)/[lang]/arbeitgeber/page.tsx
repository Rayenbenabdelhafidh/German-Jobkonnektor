import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarClock, Gauge, Languages, Truck } from "lucide-react";
import { isLang } from "@/lib/languages";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { IconCard } from "@/components/ui/Card";
import { Timeline } from "@/components/ui/Timeline";
import { LinkButton } from "@/components/ui/Button";
import { EmployerRequestForm } from "@/components/forms/EmployerRequestForm";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata(lang, "employers", "employers");
}

const pointIcons = [Gauge, Languages, CalendarClock];

export default async function EmployersPage({ params }: Params) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const dict = getDictionary(lang);
  const { hero, founderTrust, sellingPoints, process, form } = dict.employers;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} sub={hero.sub}>
        <LinkButton href="#anfrage" variant="accent" size="lg">
          {hero.cta}
          <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
        </LinkButton>
      </PageHero>

      {/* Founder trust block — the core credibility factor. */}
      <Section className="py-12 sm:py-14">
        <Reveal>
          <div className="rounded-card border border-amber-200 bg-amber-50 p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber text-white shadow-[0_6px_18px_rgba(242,140,40,0.35)]">
                <Truck className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <div>
                <h2 className="mb-2 text-xl font-bold sm:text-2xl">
                  {founderTrust.title}
                </h2>
                <p className="max-w-3xl text-sm leading-relaxed text-navy-600 sm:text-base">
                  {founderTrust.body}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Three selling points */}
      <Section tone="surface">
        <SectionHeader
          eyebrow={sellingPoints.eyebrow}
          title={sellingPoints.title}
          sub={sellingPoints.sub}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {sellingPoints.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 90}>
              <IconCard
                icon={pointIcons[index] ?? Gauge}
                title={item.title}
                body={item.body}
                index={index + 1}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Five-step process */}
      <Section tone="navy">
        <SectionHeader
          eyebrow={process.eyebrow}
          title={process.title}
          sub={process.sub}
          tone="light"
        />
        <div className="mx-auto max-w-3xl">
          <Timeline steps={[...process.steps]} tone="light" />
        </div>
      </Section>

      {/* Request form */}
      <Section id="anfrage" className="scroll-mt-24">
        <SectionHeader
          eyebrow={form.eyebrow}
          title={form.title}
          sub={form.sub}
        />
        <div className="mx-auto max-w-3xl">
          <EmployerRequestForm lang={lang} dict={dict} />
        </div>
      </Section>
    </>
  );
}
