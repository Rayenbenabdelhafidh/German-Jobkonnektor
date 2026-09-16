import type { Dictionary } from "./i18n";
import { interpolate } from "./i18n";

/** 10 MB, as stated on the candidate form. */
export const MAX_FILE_BYTES = 10 * 1024 * 1024;

export const ACCEPTED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
] as const;

export const ACCEPTED_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png"] as const;

/** `accept` attribute for the file inputs. */
export const ACCEPT_ATTRIBUTE = [
  ...ACCEPTED_MIME_TYPES,
  ...ACCEPTED_EXTENSIONS,
].join(",");

export type FileValidationError = "type" | "size" | "empty";

/**
 * Client-side validation only. The same checks MUST be repeated on the server
 * once the upload backend exists — a browser check stops honest mistakes, not
 * a crafted request. See README.md, "Backend integration points".
 */
export function validateFile(file: File): FileValidationError | null {
  if (file.size === 0) return "empty";
  if (file.size > MAX_FILE_BYTES) return "size";

  const mimeOk = (ACCEPTED_MIME_TYPES as readonly string[]).includes(file.type);
  const name = file.name.toLowerCase();
  const extOk = ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext));

  // Browsers occasionally report an empty or generic MIME type, so fall back
  // to the extension rather than rejecting a legitimate file outright.
  if (!mimeOk && !extOk) return "type";

  return null;
}

export function formatBytes(bytes: number, lang: string): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  const formatted = new Intl.NumberFormat(lang, {
    maximumFractionDigits: value < 10 ? 1 : 0,
  }).format(value);
  return `${formatted} ${units[unitIndex]}`;
}

export function fileErrorMessage(
  error: FileValidationError,
  file: File,
  dict: Dictionary,
  lang: string,
): string {
  switch (error) {
    case "type":
      return dict.forms.upload.errorType;
    case "size":
      return interpolate(dict.forms.upload.errorSize, {
        size: formatBytes(file.size, lang),
      });
    case "empty":
      return dict.forms.upload.errorEmpty;
  }
}
