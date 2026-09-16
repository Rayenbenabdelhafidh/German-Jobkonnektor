"use client";

import { useId, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, FileText, Upload, X } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import {
  ACCEPT_ATTRIBUTE,
  fileErrorMessage,
  formatBytes,
  validateFile,
} from "@/lib/upload";
import { cn } from "@/lib/utils";

interface FileFieldProps {
  label: string;
  required?: boolean;
  dict: Dictionary;
  lang: string;
  /** Raised on every change, with `null` when the file is cleared or invalid. */
  onFileChange: (file: File | null) => void;
  /** Validation message from the form (e.g. "required"), shown when present. */
  formError?: string;
}

/**
 * The native file input is visually hidden rather than styled, because its
 * built-in "Choose file / No file chosen" chrome is rendered by the browser in
 * the browser's own language and cannot be translated. The visible control is
 * ours, so it stays in the site's language; the input itself remains in the
 * DOM, labelled and keyboard-focusable.
 */
export function FileField({
  label,
  required,
  dict,
  lang,
  onFileChange,
  formError,
}: FileFieldProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] ?? null;

    if (!selected) {
      setFile(null);
      setError(null);
      onFileChange(null);
      return;
    }

    const problem = validateFile(selected);
    if (problem) {
      setFile(null);
      setError(fileErrorMessage(problem, selected, dict, lang));
      onFileChange(null);
      // Clear the input so re-picking the same bad file fires `change` again.
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setFile(selected);
    setError(null);
    onFileChange(selected);
  }

  function clear() {
    setFile(null);
    setError(null);
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = "";
    inputRef.current?.focus();
  }

  const shownError = error ?? formError ?? null;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
        {required ? (
          <span className="ms-1 text-amber" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ms-1.5 text-xs font-normal text-muted">
            ({dict.forms.optional})
          </span>
        )}
      </label>

      {/* Visually hidden, still focusable and labelled. */}
      <input
        id={id}
        ref={inputRef}
        type="file"
        accept={ACCEPT_ATTRIBUTE}
        // No `required`: the requirement is enforced in the form, which knows
        // which slots apply to the selected industry. A hidden required input
        // would also be unfocusable for native validation.
        onChange={handleChange}
        aria-invalid={shownError ? true : undefined}
        aria-describedby={shownError ? `${id}-error` : `${id}-hint`}
        className="peer sr-only"
      />

      <div
        className={cn(
          "rounded-xl border-2 border-dashed transition-colors",
          // Mirrors the input's focus ring onto the visible control.
          "peer-focus-visible:border-navy peer-focus-visible:ring-4 peer-focus-visible:ring-navy/15",
          shownError
            ? "border-red-300 bg-red-50/40"
            : file
              ? "border-green-300 bg-green-50/40"
              : "border-line bg-white hover:border-navy-200",
        )}
      >
        {file ? (
          <div className="flex items-center gap-3 p-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-navy ring-1 ring-line">
              <FileText className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink" title={file.name}>
                {file.name}
              </p>
              <p className="flex items-center gap-1.5 text-xs text-muted">
                <CheckCircle2
                  className="h-3.5 w-3.5 shrink-0 text-green-600"
                  aria-hidden="true"
                />
                <span className="numeric">{formatBytes(file.size, lang)}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="shrink-0 rounded-pill px-3 py-1.5 text-xs font-semibold text-navy transition-colors hover:bg-navy-50"
            >
              {dict.forms.upload.replace}
            </button>
            <button
              type="button"
              onClick={clear}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-navy-50 hover:text-navy"
              aria-label={`${dict.forms.upload.remove}: ${file.name}`}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex w-full items-center gap-3 p-3 text-start"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy">
              <Upload className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium text-navy">
                {dict.forms.upload.choose}
              </span>
              <span id={`${id}-hint`} className="block text-xs text-muted">
                {dict.forms.upload.dropHint}
              </span>
            </span>
          </button>
        )}
      </div>

      {shownError ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-red-600"
        >
          <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{shownError}</span>
        </p>
      ) : null}
    </div>
  );
}
