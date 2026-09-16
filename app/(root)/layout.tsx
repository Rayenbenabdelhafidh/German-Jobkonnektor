import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { fontVariables } from "@/app/fonts";
import { DEFAULT_LANG } from "@/lib/languages";

export const metadata: Metadata = {
  title: "German Jobkonnektor",
  // Never indexed: this route immediately hands off to /de and carries no
  // content of its own.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0B2545",
  width: "device-width",
  initialScale: 1,
};

/**
 * Own root layout for the bare "/" route, exactly like (site) and (admin)
 * each have their own — see app/(root)/page.tsx for why this route exists.
 */
export default function RootRedirectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={DEFAULT_LANG} dir="ltr" className={fontVariables}>
      <body className="min-h-screen bg-navy">{children}</body>
    </html>
  );
}
