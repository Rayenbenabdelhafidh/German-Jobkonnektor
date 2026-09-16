import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "accent" | "navy" | "outline" | "ghost" | "white";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-semibold " +
  "transition-all duration-200 focus-visible:outline-none disabled:cursor-not-allowed " +
  "disabled:opacity-60 text-center";

const variants: Record<Variant, string> = {
  // Amber is reserved for calls to action only.
  accent:
    "bg-amber text-white shadow-[0_6px_18px_rgba(242,140,40,0.35)] hover:bg-amber-600 hover:shadow-[0_10px_26px_rgba(242,140,40,0.45)] hover:-translate-y-0.5 active:translate-y-0",
  navy: "bg-navy text-white hover:bg-navy-600 hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "border-2 border-navy/20 bg-white text-navy hover:border-navy/40 hover:bg-navy-50",
  ghost: "text-navy hover:bg-navy-50",
  white:
    "border-2 border-white/70 bg-transparent text-white hover:bg-white hover:text-navy",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children">;

export function Button({
  variant = "accent",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

type LinkButtonProps = CommonProps &
  Omit<ComponentProps<typeof Link>, "className" | "children">;

export function LinkButton({
  variant = "accent",
  size = "md",
  className,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
