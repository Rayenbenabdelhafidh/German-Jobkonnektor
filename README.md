# German Jobkonnektor — multilingual website

Frontend for an international recruitment and headhunting agency in Munich.
German (default), English, Arabic (RTL) and French, built with Next.js 16
(App Router), TypeScript and Tailwind CSS.

```bash
npm install
npm run dev     # http://localhost:3000  → redirects to /de
npm run build
npm start
```

---

## ⚠️ Read this before collecting real applicant data

**This is a frontend only. There is no backend.** Forms validate fully and then
resolve against a simulated submission in `lib/submit.ts`. Nothing is stored,
nothing is e-mailed, and no uploaded file leaves the browser.

That means the data-protection guarantees described in the privacy policy —
private encrypted storage, signed short-lived download URLs, authenticated
staff access — **are not yet in place**. The consent checkboxes and the privacy
text are live and correct, but the infrastructure behind them is not.

Do not publish this site to collect real CVs, passport copies or driving
licences until the backend section below is implemented. Until then, the public
site is safe to show as a presentation of the agency; the application form is
not safe to point real applicants at.

The `/admin` area is likewise a **mock**: any credentials open it, the data is
fictional, and document downloads are deliberately disabled.

---

## Before going live — checklist

- [ ] Fill in `lib/config.ts`: `email`, `phone`, `phoneDisplay`, `vatId`,
      `taxNumber`, `siteUrl`. These feed the footer, contact page, Impressum,
      WhatsApp button and structured data — one file, every language.
- [ ] Have `lib/i18n/legal/{de,ar,fr}.ts` reviewed by a lawyer and replace
      every `PLATZHALTER` / `عنصر نائب` / `À COMPLÉTER` marker (supervisory
      authority, hosting provider, data protection officer).
- [ ] Replace `public/images/img-06.jpg` — the supplied healthcare photograph
      carries visible **NHS** (UK health service) branding on the nurse's tunic
      and lanyard, which puts the scene in the wrong country and reproduces a
      public body's trademark. See [IMAGE-PROMPTS.md](./IMAGE-PROMPTS.md) for a
      corrected prompt. Drop the new file over the same path; no code changes.
- [ ] Build the backend (below) and replace `submitForm`.
- [ ] Serve over HTTPS. The HSTS header in `next.config.ts` only takes effect
      over TLS.

---

## Project structure

```
app/
  (site)/[lang]/          public site — its own root layout, sets <html lang dir>
    page.tsx              home
    ueber-uns/            about
    branchen/             industries & services
    arbeitgeber/          for employers (+ staff request form)
    bewerber/             for candidates (+ application form & uploads)
    kontakt/              contact (+ consent-gated map)
    impressum/            legal notice
    datenschutz/          privacy policy
  (admin)/admin/          mock admin area — separate root layout, German only
  sitemap.ts, robots.ts, icon.svg

components/
  layout/                 Header, Footer, LangSwitcher, CookieBanner, WhatsApp, map
  ui/                     Button, Card, Section, Field, FileField, Timeline, Reveal
  sections/               Hero, FounderPitch, ValueGrid, IndustriesPreview, …
  forms/                  EmployerRequestForm, CandidateApplicationForm, ContactForm
  admin/                  AdminApp (mock)

public/images/            img-01 … img-09 — see IMAGE-PROMPTS.md

lib/
  config.ts               ← company contact details live here, and only here
  images.ts               static image imports + per-image crop positions
  languages.ts            language codes, direction, native names
  routes.ts               slug map + language switching
  seo.ts                  per-page metadata, hreflang, JSON-LD
  submit.ts               ← the one function to replace when the backend exists
  upload.ts               file type/size validation
  consent.ts              cookie consent state + hook
  i18n/                   de.ts / ar.ts / fr.ts + legal/
  mock/                   fake admin data
```

### Routing and languages

Routes are `/de`, `/ar`, `/fr`. `/` redirects to `/de`.

All four languages share **one German slug set** (`ueber-uns`, `branchen`,
`arbeitgeber`, `bewerber`, `kontakt`, `impressum`, `datenschutz`). Next's App
Router requires identical folder names under `[lang]`, German slugs suit a
Munich company, and it makes the language switcher a single-segment swap that
keeps the visitor on the page they were reading. Slugs are not visible copy, so
the "no English on the site" rule is unaffected.

### Translations

`lib/i18n/de.ts` is the source of truth. `lib/i18n/types.ts` widens its literal
types into a `Dictionary` interface, and `ar.ts` / `fr.ts` are typed against it
— **a key missing from Arabic or French is a compile error**, so the three
versions cannot drift apart. Run `npx tsc --noEmit` after editing any of them.

Legal texts live separately in `lib/i18n/legal/` because they are long,
section-structured, and reviewed on a different cycle from marketing copy.

### RTL

Arabic sets `dir="rtl"` on `<html>` and the entire layout mirrors: the logo
moves to the right, the navigation order reverses, the language dropdown moves
to the top left, text aligns right and the process timeline runs down the right
edge.

This works because layout CSS uses **logical properties only** — `ms-*`, `me-*`,
`ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`. When adding UI, do not use
`ml-`, `mr-`, `left-`, `right-` or `text-left` for anything directional.
Directional icons (arrows, chevrons) get the `rtl-flip` class, which mirrors
them under `[dir="rtl"]` (see `app/globals.css`).

Fonts: Inter + Montserrat for German and French, Cairo for Arabic, selected by
`html[lang="ar"]` in `globals.css`. All are self-hosted by `next/font`, so no
request ever goes to Google Fonts — which also matters for GDPR.

### Cookie consent

`lib/consent.ts` stores the decision in `localStorage` and broadcasts changes.
Nothing gated renders before hydration has read that decision, so no banner
flashes for returning visitors.

The Google Maps iframe on the contact page is **not mounted at all** until the
visitor consents, verified in the browser: zero requests to any Google domain
before consent. The banner offers "Accept all", "Reject all" and "Settings",
and the footer link reopens it at any time. There is no analytics or tracking
of any kind on the site.

### Spam protection

Every form carries a honeypot field and a minimum fill time (3s) — see
`lib/submit.ts`. Both checks must be repeated server-side; a client check stops
naive bots, not a crafted request.

---

## Backend integration points

Four things need building. They are marked in the code.

### 1. Form submission — `lib/submit.ts`

Replace the body of `submitForm()` with a real request. The server must:

1. re-validate every field (never trust the client);
2. re-check file type and size — mirror `lib/upload.ts` (PDF/JPG/PNG, 10 MB);
3. store documents in a **private, encrypted bucket**, never a public folder;
4. record the consent value *and* a timestamp, per GDPR Art. 7(1);
5. e-mail the agency that a submission arrived.

### 2. Document storage

With Supabase: a private Storage bucket plus row-level security, so a row is
readable only by authenticated staff. Serve files exclusively through
**short-lived signed URLs** generated per request. Never expose a public path,
and never put the bucket behind a guessable URL.

Retention: the privacy policy promises deletion after 24 months. That needs an
actual scheduled job, not just a sentence.

### 3. Admin authentication — `components/admin/AdminApp.tsx`

Replace `LoginScreen` with real authentication and gate `/admin` in middleware,
not in the component — a client-side check is decoration, not access control.
Then wire the table to the database and enable the download buttons against
signed URLs. Delete `lib/mock/` and the demo warning banner.

### 4. E-mail notification

Triggered server-side on submission. Send the agency a notification containing
metadata and a link into the admin area — **not** the documents as attachments,
which would scatter passport copies through mailboxes.

---

## Accessibility & SEO

Verified in-browser across all 32 pages (4 languages × 8 pages):

- correct `<html lang>` and `dir`, exactly one `<h1>` per page;
- unique title and meta description per page *and* per language;
- full `hreflang` set (de/ar/fr + `x-default`) plus canonical on every page;
- `EmploymentAgency` JSON-LD on each home page;
- skip-to-content link, labelled form fields, `role="alert"` validation
  messages, visible focus rings, keyboard-operable menus and dialogs;
- no horizontal overflow at 375px;
- `prefers-reduced-motion` disables all scroll animation;
- `/admin` is `noindex` and disallowed in `robots.txt`.

Content is rendered server-side and visible without JavaScript; the scroll-in
animation only activates after mount, so nothing is hidden from crawlers or
from visitors with JS disabled.

## Known limitations

- **Native date and file inputs** follow the *browser's* locale, not the site's.
  The file input's built-in chrome is hidden and replaced with our own
  translated control; the date picker in the employer form cannot be
  re-languaged from a web page.
- **Country names** in the candidate form are pre-generated into
  `lib/countries.generated.ts` by `scripts/generate-countries.mjs`, because
  Node's and the browser's ICU data can disagree and cause a hydration
  mismatch. Re-run that script if you add a country.
- **`employers.hero.imageAlt` and `candidates.hero.imageAlt`** exist in the
  dictionaries but are not yet used; they are reserved for IMG-10 and IMG-11.
- **The founder photographs are landscape sources in portrait frames.** Both
  founder slots are 4:5 while the supplied files are ~1.83:1, so they are
  cropped; `lib/images.ts` tunes `object-position` per image to keep the subject
  framed. Native 4:5 originals would be better — see IMAGE-PROMPTS.md.
- **The hero photograph has its clear space on the left**, which suits German
  and French. In Arabic the headline sits on the right, so the scrim is mirrored
  (`.hero-scrim` in `globals.css`) and the lorries fall under the darker side.
  It reads well, but a mirrored variant of `img-01` would compose better in
  Arabic. The image cannot simply be flipped in CSS — the motorway sign in it
  would come out mirrored.
