import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { fontVariables } from "@/app/fonts";

export const metadata: Metadata = {
  title: "Verwaltung | German Jobkonnektor",
  description: "Interner Bereich.",
  // The admin area must never be indexed.
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  themeColor: "#0B2545",
  width: "device-width",
  initialScale: 1,
};

/**
 * Separate root layout: the admin area is German-only and has no public
 * header, footer, WhatsApp button or cookie banner.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" dir="ltr" className={fontVariables}>
      <body className="min-h-screen bg-surface">{children}</body>
    </html>
  );
}
