import Image from "next/image";
import { IMAGES, type ImageId, type SiteImageAsset } from "@/lib/images";
import { cn } from "@/lib/utils";

interface SiteImageProps {
  /** Matches the numbered prompts in IMAGE-PROMPTS.md, e.g. "img-04". */
  id: ImageId;
  /** Localized alt text from the dictionary — changes with the language. */
  alt: string;
  /** CSS aspect-ratio for the frame, e.g. "16/10" or "4/5". */
  ratio?: string;
  /** Responsive sizes hint; keeps the served file no larger than needed. */
  sizes?: string;
  /** Set on the LCP image only (the home hero). */
  priority?: boolean;
  className?: string;
  rounded?: boolean;
}

/**
 * A photograph in a fixed-ratio frame.
 *
 * The source files are all landscape, so any non-landscape frame crops; the
 * per-image `position` in lib/images.ts decides which part survives the crop.
 */
export function SiteImage({
  id,
  alt,
  ratio = "16/10",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  className,
  rounded = true,
}: SiteImageProps) {
  // Widened to the interface: not every entry declares a crop position.
  const asset: SiteImageAsset = IMAGES[id];

  return (
    <div
      style={{ aspectRatio: ratio }}
      className={cn(
        "relative w-full overflow-hidden bg-navy-50",
        rounded && "rounded-card",
        className,
      )}
    >
      <Image
        src={asset.src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        style={{ objectPosition: asset.position ?? "center" }}
        className="object-cover"
      />
    </div>
  );
}
