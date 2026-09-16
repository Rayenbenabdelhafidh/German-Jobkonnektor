import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Gauge, Lock, Sparkles } from "lucide-react";
import { isLang } from "@/lib/languages";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { IconCard } from "@/components/ui/Card";
import { SiteImage } from "@/components/ui/SiteImage";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata(lang, "about", "about");
}

const valueIcons = [Lock, Sparkles, Gauge];

export default async function AboutPage({ params }: Params) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const dict = getDictionary(lang);
  const { hero, story, mission, values } = dict.about;
  const founder = dict.home.founder;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} sub={hero.sub} />

      {/* Founder's story */}
      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-28">
            <SiteImage
              id="img-03"
              alt={story.imageAlt}
              ratio="4/5"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="shadow-cardHover"
            />
            <div className="mt-6 rounded-card border border-line bg-surface p-5">
              <p className="font-display text-base font-bold text-navy">
                {founder.name}
              </p>
              <p className="mt-0.5 text-xs text-muted">{founder.role}</p>
              <ul className="mt-4 space-y-2.5 border-t border-line pt-4">
                {founder.credentials.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber/15 text-amber">
                      <Check
                        className="h-2.5 w-2.5"
                        strokeWidth={3.5}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-xs leading-relaxed text-muted">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={100}>
            <p className="eyebrow mb-3">{story.eyebrow}</p>
            <h2 className="mb-6 text-3xl font-bold leading-tight sm:text-4xl">
              {story.title}
            </h2>
            <div className="space-y-5">
              {story.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-relaxed text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Mission */}
      <Section tone="navy">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow mb-3 text-amber-300">{mission.eyebrow}</p>
            <h2 className="text-balance text-3xl font-bold text-white sm:text-4xl">
              {mission.title}
            </h2>
            <div className="mt-7 space-y-5">
              {mission.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-relaxed text-navy-200"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section tone="surface">
        <SectionHeader title={values.title} sub={values.sub} />
        <div className="grid gap-6 md:grid-cols-3">
          {values.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 90}>
              <IconCard
                icon={valueIcons[index] ?? Lock}
                title={item.title}
                body={item.body}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBanner lang={lang} dict={dict} />
    </>
  );
}
