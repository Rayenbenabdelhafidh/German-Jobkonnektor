"use client";

import type { ComponentProps, ReactNode, Ref } from "react";
import { useId } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const controlClasses =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink placeholder:text-navy-300 " +
  "transition-colors focus:border-navy focus:outline-none focus:ring-4 focus:ring-navy/10 " +
  "disabled:cursor-not-allowed disabled:bg-surface";

interface FieldShellProps {
  id: string;
  label: string;
  required?: boolean;
  optionalLabel?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

function FieldShell({
  id,
  label,
  required,
  optionalLabel,
  hint,
  error,
  children,
  className,
}: FieldShellProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label
        htmlFor={id}
        className="mb-1.5 text-sm font-semibold text-navy"
      >
        {label}
        {required ? (
          <span className="ms-1 text-amber" aria-hidden="true">
            *
          </span>
        ) : optionalLabel ? (
          <span className="ms-1.5 text-xs font-normal text-muted">
            ({optionalLabel})
          </span>
        ) : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mb-1.5 text-xs text-muted">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-red-600"
        >
          <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}

function describedBy(id: string, hint?: string, error?: string) {
  return (
    [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
      .filter(Boolean)
      .join(" ") || undefined
  );
}

type SharedProps = {
  label: string;
  error?: string;
  hint?: string;
  optionalLabel?: string;
  wrapperClassName?: string;
};

export function TextInput({
  label,
  error,
  hint,
  optionalLabel,
  wrapperClassName,
  ref,
  ...props
}: SharedProps &
  Omit<ComponentProps<"input">, "id"> & { ref?: Ref<HTMLInputElement> }) {
  const id = useId();
  return (
    <FieldShell
      id={id}
      label={label}
      required={props.required}
      optionalLabel={optionalLabel}
      hint={hint}
      error={error}
      className={wrapperClassName}
    >
      <input
        id={id}
        ref={ref}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(
          controlClasses,
          error ? "border-red-400" : "border-line",
        )}
        {...props}
      />
    </FieldShell>
  );
}

export function TextArea({
  label,
  error,
  hint,
  optionalLabel,
  wrapperClassName,
  ref,
  ...props
}: SharedProps &
  Omit<ComponentProps<"textarea">, "id"> & {
    ref?: Ref<HTMLTextAreaElement>;
  }) {
  const id = useId();
  return (
    <FieldShell
      id={id}
      label={label}
      required={props.required}
      optionalLabel={optionalLabel}
      hint={hint}
      error={error}
      className={wrapperClassName}
    >
      <textarea
        id={id}
        ref={ref}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(
          controlClasses,
          "resize-y",
          error ? "border-red-400" : "border-line",
        )}
        {...props}
      />
    </FieldShell>
  );
}

export interface SelectOption {
  value: string;
  label: string;
}

export function SelectInput({
  label,
  error,
  hint,
  optionalLabel,
  wrapperClassName,
  options,
  placeholder,
  ref,
  ...props
}: SharedProps &
  Omit<ComponentProps<"select">, "id" | "children"> & {
    options: SelectOption[];
    placeholder?: string;
    ref?: Ref<HTMLSelectElement>;
  }) {
  const id = useId();
  return (
    <FieldShell
      id={id}
      label={label}
      required={props.required}
      optionalLabel={optionalLabel}
      hint={hint}
      error={error}
      className={wrapperClassName}
    >
      <select
        id={id}
        ref={ref}
        defaultValue=""
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(
          controlClasses,
          "appearance-none bg-[length:1.1rem] bg-no-repeat pe-10",
          error ? "border-red-400" : "border-line",
        )}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235B6B7C' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundPosition: "right 0.85rem center",
        }}
        {...props}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

export function Checkbox({
  label,
  error,
  ref,
  ...props
}: {
  label: ReactNode;
  error?: string;
  ref?: Ref<HTMLInputElement>;
} & Omit<ComponentProps<"input">, "id" | "type">) {
  const id = useId();
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          ref={ref}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-2 accent-amber",
            error ? "border-red-400" : "border-navy-200",
          )}
          {...props}
        />
        <label
          htmlFor={id}
          className="cursor-pointer text-xs leading-relaxed text-muted"
        >
          {label}
        </label>
      </div>
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-red-600"
        >
          <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}

/**
 * Honeypot: invisible to people, tempting to bots. A filled value marks the
 * submission as automated in lib/submit.ts.
 */
export function Honeypot({ ref, ...props }: ComponentProps<"input"> & { ref?: Ref<HTMLInputElement> }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
      <label>
        Website
        <input
          ref={ref}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...props}
        />
      </label>
    </div>
  );
}
