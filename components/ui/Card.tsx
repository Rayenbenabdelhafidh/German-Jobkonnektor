import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-line bg-white p-6 shadow-card sm:p-7",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-navy-100 hover:shadow-cardHover",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface IconCardProps {
  icon: LucideIcon;
  title: string;
  body: string;
  /** Renders a large step number instead of an icon badge. */
  index?: number;
  className?: string;
  children?: ReactNode;
}

export function IconCard({
  icon: Icon,
  title,
  body,
  index,
  className,
  children,
}: IconCardProps) {
  return (
    <Card hover className={cn("flex h-full flex-col", className)}>
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy-50 text-navy">
          <Icon className="h-6 w-6" aria-hidden="true" strokeWidth={1.75} />
        </span>
        {typeof index === "number" ? (
          <span
            aria-hidden="true"
            className="font-display text-3xl font-bold text-navy-100"
          >
            {String(index).padStart(2, "0")}
          </span>
        ) : null}
      </div>
      <h3 className="mb-2 text-lg font-bold">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{body}</p>
      {children}
    </Card>
  );
}
