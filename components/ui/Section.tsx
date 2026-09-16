import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "white" | "surface" | "navy";
}

const tones = {
  white: "bg-white",
  surface: "bg-surface",
  navy: "bg-navy text-white",
} as const;

export function Section({
  id,
  children,
  className,
  tone = "white",
}: SectionProps) {
  return (
    <section id={id} className={cn("section", tones[tone], className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  sub?: string;
  align?: "start" | "center";
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  sub,
  align = "center",
  tone = "dark",
  className,
}: SectionHeaderProps) {
  const light = tone === "light";

  return (
    <Reveal
      className={cn(
        "mb-12 max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-start",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow mb-3", light && "text-amber-300")}>{eyebrow}</p>
      ) : null}
      <h2
        className={cn(
          "text-3xl font-bold leading-tight sm:text-4xl",
          light && "text-white",
        )}
      >
        {title}
      </h2>
      {sub ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            light ? "text-navy-200" : "text-muted",
          )}
        >
          {sub}
        </p>
      ) : null}
    </Reveal>
  );
}
