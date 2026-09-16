import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLang } from "@/lib/languages";
import { getDictionary } from "@/lib/i18n";
import { organizationJsonLd, pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { FounderPitch } from "@/components/sections/FounderPitch";
import { ValueGrid } from "@/components/sections/ValueGrid";
import { IndustriesPreview } from "@/components/sections/IndustriesPreview";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Timeline } from "@/components/ui/Timeline";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { path } from "@/lib/routes";
import { ArrowRight } from "lucide-react";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata(lang, "home", "home");
}

export default async function HomePage({ params }: Params) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd(lang)),
        }}
      />

      <Hero lang={lang} dict={dict} />
      <FounderPitch lang={lang} dict={dict} />
      <ValueGrid dict={dict} />
      <IndustriesPreview lang={lang} dict={dict} />

      {/* Short version of the employer process — full version lives on
          the "Für Arbeitgeber" page. */}
      <Section>
        <SectionHeader
          title={dict.home.process.title}
          sub={dict.home.process.sub}
        />
        <div className="mx-auto max-w-2xl">
          <Timeline
            steps={dict.employers.process.steps.map((step) => ({
              title: step.title,
            }))}
          />
          <Reveal className="mt-10 text-center">
            <LinkButton
              href={path(lang, "employers")}
              variant="outline"
              size="md"
            >
              {dict.home.process.cta}
              <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
            </LinkButton>
          </Reveal>
        </div>
      </Section>

      <CtaBanner lang={lang} dict={dict} />
    </>
  );
}
