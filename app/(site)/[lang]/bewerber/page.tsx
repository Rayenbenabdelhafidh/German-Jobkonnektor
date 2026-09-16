import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeEuro,
  FileSignature,
  Home,
  Landmark,
  Users,
} from "lucide-react";
import { isLang } from "@/lib/languages";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { IconCard } from "@/components/ui/Card";
import { Timeline } from "@/components/ui/Timeline";
import { LinkButton } from "@/components/ui/Button";
import { CandidateApplicationForm } from "@/components/forms/CandidateApplicationForm";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata(lang, "candidates", "candidates");
}

const supportIcons = [FileSignature, Landmark, Home, Users];

export default async function CandidatesPage({ params }: Params) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const dict = getDictionary(lang);
  const { hero, free, support, steps, form } = dict.candidates;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} sub={hero.sub}>
        <LinkButton href="#bewerbung" variant="accent" size="lg">
          {hero.cta}
          <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
        </LinkButton>
      </PageHero>

      {/* 100% free */}
      <Section className="py-12 sm:py-14">
        <Reveal>
          <div className="rounded-card border border-green-200 bg-green-50 p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-600 text-white">
                <BadgeEuro
                  className="h-7 w-7"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </span>
              <div>
                <p className="mb-2 inline-block rounded-pill bg-green-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  {free.badge}
                </p>
                <h2 className="mb-2 text-xl font-bold sm:text-2xl">
                  {free.title}
                </h2>
                <p className="max-w-3xl text-sm leading-relaxed text-navy-600 sm:text-base">
                  {free.body}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* What we support */}
      <Section tone="surface">
        <SectionHeader title={support.title} sub={support.sub} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {support.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <IconCard
                icon={supportIcons[index] ?? FileSignature}
                title={item.title}
                body={item.body}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Four steps */}
      <Section tone="navy">
        <SectionHeader
          eyebrow={steps.eyebrow}
          title={steps.title}
          tone="light"
        />
        <div className="mx-auto max-w-3xl">
          <Timeline steps={[...steps.items]} tone="light" />
        </div>
      </Section>

      {/* Application form */}
      <Section id="bewerbung" className="scroll-mt-24">
        <SectionHeader
          eyebrow={form.eyebrow}
          title={form.title}
          sub={form.sub}
        />
        <div className="mx-auto max-w-3xl">
          <CandidateApplicationForm lang={lang} dict={dict} />
        </div>
      </Section>
    </>
  );
}
