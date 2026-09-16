import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLang } from "@/lib/languages";
import { getLegal } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { LegalContent } from "@/components/sections/LegalContent";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return {
    ...pageMetadata(lang, "imprint", "imprint"),
    robots: { index: false, follow: true },
  };
}

export default async function ImprintPage({ params }: Params) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const legal = getLegal(lang);

  return (
    <>
      <PageHero title={legal.imprint.title} sub={legal.imprint.intro} />
      <Section>
        <LegalContent sections={legal.imprint.sections} />
      </Section>
    </>
  );
}
