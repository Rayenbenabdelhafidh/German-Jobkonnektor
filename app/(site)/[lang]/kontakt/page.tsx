import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { isLang } from "@/lib/languages";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { COMPANY, MAILTO_URL, TEL_URL, WHATSAPP_URL } from "@/lib/config";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/forms/ContactForm";
import { ConsentedMap } from "@/components/layout/ConsentedMap";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata(lang, "contact", "contact");
}

export default async function ContactPage({ params }: Params) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const dict = getDictionary(lang);
  const { hero, infoTitle, labels, hours, whatsappBtn, mapTitle, formTitle, formSub } =
    dict.contact;

  const whatsappHref = `${WHATSAPP_URL}?text=${encodeURIComponent(dict.whatsapp.prefill)}`;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} sub={hero.sub} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Contact details */}
          <Reveal className="lg:col-span-5">
            <h2 className="mb-6 text-2xl font-bold">{infoTitle}</h2>

            <Card className="space-y-6">
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="mb-1 text-sm font-semibold text-navy">
                    {labels.address}
                  </p>
                  <address className="text-sm not-italic leading-relaxed text-muted">
                    {COMPANY.name}
                    <br />
                    {COMPANY.street}
                    <br />
                    <span className="numeric">{COMPANY.postalCode}</span>{" "}
                    {COMPANY.city}
                    <br />
                    {dict.countryName}
                  </address>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="mb-1 text-sm font-semibold text-navy">
                    {labels.email}
                  </p>
                  <a
                    href={MAILTO_URL}
                    className="break-all text-sm text-muted underline-offset-2 hover:text-amber hover:underline"
                  >
                    {COMPANY.email}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="mb-1 text-sm font-semibold text-navy">
                    {labels.phone}
                  </p>
                  <a
                    href={TEL_URL}
                    className="numeric text-sm text-muted underline-offset-2 hover:text-amber hover:underline"
                  >
                    {COMPANY.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="mb-1 text-sm font-semibold text-navy">
                    {labels.hours}
                  </p>
                  <p className="text-sm text-muted">{hours}</p>
                </div>
              </div>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2.5 rounded-pill bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
              >
                <MessageCircle className="h-5 w-5 rtl-flip" aria-hidden="true" />
                {whatsappBtn}
              </a>
            </Card>
          </Reveal>

          {/* Contact form */}
          <Reveal className="lg:col-span-7" delay={100}>
            <h2 className="mb-2 text-2xl font-bold">{formTitle}</h2>
            <p className="mb-6 text-sm leading-relaxed text-muted">{formSub}</p>
            <ContactForm lang={lang} dict={dict} />
          </Reveal>
        </div>
      </Section>

      {/* Map — loads only after consent */}
      <Section tone="surface">
        <SectionHeader title={mapTitle} />
        <Reveal>
          <ConsentedMap dict={dict} lang={lang} />
        </Reveal>
      </Section>
    </>
  );
}
