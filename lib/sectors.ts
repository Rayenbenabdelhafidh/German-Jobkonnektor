import {
  Cable,
  Factory,
  HardHat,
  HeartPulse,
  Truck,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import type { ImageId } from "./images";

export type SectorId =
  | "transport"
  | "crafts"
  | "care"
  | "industry"
  | "it"
  | "gastro";

export const SECTOR_ICONS: Record<SectorId, LucideIcon> = {
  transport: Truck,
  crafts: HardHat,
  care: HeartPulse,
  industry: Factory,
  it: Cable,
  gastro: UtensilsCrossed,
};

/** Photograph per sector — see IMAGE-PROMPTS.md and lib/images.ts. */
export const SECTOR_IMAGE_IDS: Record<SectorId, ImageId> = {
  transport: "img-04",
  crafts: "img-05",
  care: "img-06",
  industry: "img-07",
  it: "img-08",
  gastro: "img-09",
};
