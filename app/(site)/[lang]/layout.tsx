import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import { fontVariables } from "@/app/fonts";
import { COMPANY } from "@/lib/config";
import { LANGUAGES, LANG_META, isLang, type Lang } from "@/lib/languages";
import { getDictionary } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CookieBanner } from "@/components/layout/CookieBanner";

export const viewport: Viewport = {
  themeColor: "#0B2545",
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return LANGUAGES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};

  const dict = getDictionary(lang);

  return {
    metadataBase: new URL(COMPANY.siteUrl),
    title: { default: dict.meta.pages.home.title, template: `%s` },
    applicationName: COMPANY.name,
    authors: [{ name: COMPANY.owner }],
    formatDetection: { telephone: true, address: true, email: true },
    robots: { index: true, follow: true },
  };
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!isLang(rawLang)) notFound();

  const lang: Lang = rawLang;
  const dict = getDictionary(lang);
  const { dir, htmlLang } = LANG_META[lang];

  return (
    <html lang={htmlLang} dir={dir} className={fontVariables}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          {dict.nav.skipToContent}
        </a>

        <Header lang={lang} dict={dict} />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer lang={lang} dict={dict} />

        <WhatsAppButton
          label={dict.whatsapp.label}
          prefill={dict.whatsapp.prefill}
        />
        <CookieBanner lang={lang} dict={dict} />
      </body>
    </html>
  );
}
