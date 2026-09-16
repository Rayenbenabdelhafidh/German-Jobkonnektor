/**
 * ────────────────────────────────────────────────────────────────────────
 *  THE ONE FUNCTION TO REPLACE WHEN THE BACKEND EXISTS
 * ────────────────────────────────────────────────────────────────────────
 *
 * Every form on the site — employer request, candidate application, contact —
 * submits through `submitForm`. Right now it validates the spam guard and
 * resolves successfully after a short delay so the UI can be exercised end to
 * end without a server.
 *
 * To go live, replace the body of `submitForm` with a real request, e.g.
 *
 *   const response = await fetch(`/api/${kind}`, { method: "POST", body: formData });
 *   if (!response.ok) return { ok: false, reason: "server" };
 *   return { ok: true };
 *
 * The server MUST, at minimum:
 *   1. re-validate every field (never trust the client),
 *   2. re-check file type and size (see lib/upload.ts),
 *   3. store candidate documents in a PRIVATE, encrypted bucket — never a
 *      public folder — and serve them only via short-lived signed URLs,
 *   4. record the consent checkbox value and timestamp,
 *   5. e-mail the agency that a new submission arrived.
 *
 * See README.md, "Backend integration points".
 */

export type SubmissionKind = "employer" | "candidate" | "contact";

export type SubmitResult =
  | { ok: true }
  | { ok: false; reason: "spam" | "server" };

export interface SubmitPayload {
  kind: SubmissionKind;
  lang: string;
  /** Plain field values. */
  fields: Record<string, string | number | boolean | undefined>;
  /** Candidate documents, keyed by document slot id. */
  files?: Record<string, File | undefined>;
  /** Honeypot input — must be empty for a human. */
  honeypot?: string;
  /** Epoch ms when the form was first rendered. */
  renderedAt?: number;
}

/**
 * A real person needs at least a few seconds to fill in a form. Anything
 * faster is almost certainly an automated submission.
 */
export const MIN_FILL_MS = 3000;

function looksAutomated(payload: SubmitPayload): boolean {
  if (payload.honeypot && payload.honeypot.trim() !== "") return true;
  if (
    typeof payload.renderedAt === "number" &&
    Date.now() - payload.renderedAt < MIN_FILL_MS
  ) {
    return true;
  }
  return false;
}

export async function submitForm(
  payload: SubmitPayload,
): Promise<SubmitResult> {
  // Spam guard runs first, before anything would reach a server.
  if (looksAutomated(payload)) {
    return { ok: false, reason: "spam" };
  }

  // ── SIMULATED SUBMISSION — replace with a real request ──────────────
  await new Promise((resolve) => setTimeout(resolve, 900));

  if (process.env.NODE_ENV === "development") {
    const { files, ...rest } = payload;
    // eslint-disable-next-line no-console
    console.info("[submitForm] simulated submission", {
      ...rest,
      files: files
        ? Object.fromEntries(
            Object.entries(files)
              .filter(([, file]) => Boolean(file))
              .map(([key, file]) => [
                key,
                { name: file!.name, size: file!.size, type: file!.type },
              ]),
          )
        : undefined,
    });
  }

  return { ok: true };
  // ────────────────────────────────────────────────────────────────────
}
