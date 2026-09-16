import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Info } from "lucide-react";
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
    ...pageMetadata(lang, "privacy", "privacy"),
    robots: { index: false, follow: true },
  };
}

export default async function PrivacyPage({ params }: Params) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const legal = getLegal(lang);
  const { privacy } = legal;

  return (
    <>
      <PageHero title={privacy.title} sub={privacy.intro} />
      <Section>
        <div className="max-w-prose">
          <p className="mb-6 text-xs font-medium uppercase tracking-wider text-muted">
            {privacy.updatedLabel}: {privacy.updated}
          </p>

          {/* Operator note — remove once the texts have been reviewed. */}
          <p className="mb-10 flex items-start gap-2.5 rounded-xl bg-amber-50 p-4 text-sm leading-relaxed text-navy ring-1 ring-inset ring-amber-200">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber" aria-hidden="true" />
            {privacy.disclaimer}
          </p>
        </div>

        <LegalContent sections={privacy.sections} />
      </Section>
    </>
  );
}
