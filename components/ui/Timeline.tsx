import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export interface TimelineStep {
  title: string;
  body?: string;
}

interface TimelineProps {
  steps: TimelineStep[];
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Vertical timeline anchored to the inline-start edge, so it runs top-to-bottom
 * on the left in German and French and on the right in Arabic without any
 * direction-specific markup.
 */
export function Timeline({ steps, tone = "dark", className }: TimelineProps) {
  const light = tone === "light";

  return (
    <ol className={cn("relative", className)}>
      {/* Connecting rail */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-y-2 start-[19px] w-0.5 rounded-full",
          light ? "bg-white/20" : "bg-navy-100",
        )}
      />
      {steps.map((step, index) => (
        <Reveal
          as="li"
          key={step.title}
          delay={index * 80}
          className="relative flex gap-5 pb-10 last:pb-0"
        >
          <span
            className={cn(
              "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold ring-4",
              light
                ? "bg-amber text-white ring-navy"
                : "bg-navy text-white ring-white",
            )}
          >
            {index + 1}
          </span>
          <div className="pt-1.5">
            <h3
              className={cn(
                "text-base font-bold sm:text-lg",
                light && "text-white",
              )}
            >
              {step.title}
            </h3>
            {step.body ? (
              <p
                className={cn(
                  "mt-1.5 max-w-xl text-sm leading-relaxed",
                  light ? "text-navy-200" : "text-muted",
                )}
              >
                {step.body}
              </p>
            ) : null}
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
