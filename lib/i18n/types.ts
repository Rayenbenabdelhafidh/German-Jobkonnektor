import type { de } from "./de";

/**
 * Widens the literal types produced by `as const` into plain string/number
 * types while keeping the exact key structure. The German dictionary is the
 * source of truth: any key missing from the Arabic or French dictionary is a
 * compile error, but the translated values themselves are free-form.
 */
export type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Widen<U>[]
        : { -readonly [K in keyof T]: Widen<T[K]> };

export type Dictionary = Widen<typeof de>;

/**
 * Legal pages use a looser, section-based shape: the number and kind of
 * blocks differ between the Impressum and the privacy policy, and a
 * translation may legitimately need a list where the German has prose.
 */
export interface LegalSection {
  heading: string;
  /** Rendered as paragraphs. */
  paragraphs?: string[];
  /** Rendered as an address block, one line per entry. */
  lines?: string[];
  /** Rendered as a bulleted list. */
  list?: string[];
  /** Paragraphs rendered after the list. */
  after?: string[];
  /** Injects the shared contact block (address, e-mail, phone). */
  contact?: boolean;
}

export interface LegalDictionary {
  imprint: {
    title: string;
    intro: string;
    sections: LegalSection[];
  };
  privacy: {
    title: string;
    updatedLabel: string;
    updated: string;
    intro: string;
    disclaimer: string;
    sections: LegalSection[];
  };
}
