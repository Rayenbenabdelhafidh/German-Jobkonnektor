import { Cairo, Inter, Montserrat } from "next/font/google";

/** Body copy for German and French. */
export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-latin-body",
});

/** Headings for German and French. */
export const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["600", "700", "800"],
  variable: "--font-latin-display",
});

/** Headings and body for Arabic. */
export const cairo = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-arabic",
});

export const fontVariables = `${inter.variable} ${montserrat.variable} ${cairo.variable}`;
