import type { StaticImageData } from "next/image";

import img01 from "@/public/images/img-01.jpg";
import img02 from "@/public/images/img-02.jpg";
import img03 from "@/public/images/img-03.jpg";
import img04 from "@/public/images/img-04.jpg";
import img05 from "@/public/images/img-05.jpg";
import img06 from "@/public/images/img-06.jpg";
import img07 from "@/public/images/img-07.jpg";
import img08 from "@/public/images/img-08.jpg";
import img09 from "@/public/images/img-09.jpg";

/**
 * Every photograph on the site, imported statically so Next.js knows each
 * file's intrinsic size at build time, generates a blur-up placeholder and
 * emits correctly sized srcsets.
 *
 * The IDs match the numbered prompts in IMAGE-PROMPTS.md.
 *
 * `position` is the CSS object-position used when a frame crops the source.
 * All nine source files are landscape (~1.83:1), so the two founder slots —
 * which are portrait — crop the sides hard; the values below keep the subject
 * inside the visible area rather than letting a centre crop cut across him.
 */
export interface SiteImageAsset {
  src: StaticImageData;
  /** CSS object-position for the cropped frame. */
  position?: string;
}

export const IMAGES = {
  /** Home hero — Autobahn lorry fleet at dusk. */
  "img-01": { src: img01, position: "center 55%" },
  /** Founder portrait, home page. Subject sits right of centre. */
  "img-02": { src: img02, position: "62% center" },
  /** Founder at the cab door, About page. Subject slightly right of centre. */
  "img-03": { src: img03, position: "56% center" },
  /** Transport & logistics. */
  "img-04": { src: img04 },
  /** Trade & crafts. */
  "img-05": { src: img05 },
  /** Healthcare & care. */
  "img-06": { src: img06 },
  /** Industry & tech. */
  "img-07": { src: img07 },
  /** IT & fibre optics. */
  "img-08": { src: img08 },
  /** Gastronomy. */
  "img-09": { src: img09 },
} as const satisfies Record<string, SiteImageAsset>;

export type ImageId = keyof typeof IMAGES;
