# Bildaufträge / Image prompts — German Jobkonnektor

The prompts used to generate every photograph on the site, and how the images
are wired in. IDs (`img-01` … `img-09`) match the filenames in
`public/images/`.

## Status: all nine images are installed

The photographs live in `public/images/img-01.jpg` … `img-09.jpg` and are wired
up through `lib/images.ts`. The prompts below are kept as a reference for
regenerating or replacing any single image.

### How the images are wired

`lib/images.ts` imports each file statically, so Next.js knows the intrinsic
size at build time, generates a blur-up placeholder and emits a responsive
srcset. It also records a per-image `position` (CSS `object-position`) used when
a frame crops the source.

To replace one image, drop a new file over the existing path and keep the name.
Nothing else needs to change. To add a new one, add the file, add an entry to
`IMAGES` in `lib/images.ts`, then use `<SiteImage id="img-10" … />`.

The alt texts live in the dictionaries (`lib/i18n/{de,ar,fr}.ts`) and change
with the active language — they are not stored next to the image.

### A note on source aspect ratio

All nine supplied files are landscape, about 1408x768 (1.83:1). The six sector
cards use a 16:10 frame, which is a near match. The two founder slots are
portrait 4:5, so they crop the sides hard; `position` in `lib/images.ts` is
tuned per image (62% for img-02, 56% for img-03) to keep the subject framed.

If you regenerate the founder images, **supply them in portrait 4:5** and reset
those `position` values to `"center"` — a native portrait will always beat a
cropped landscape.

## House style for every image

Apply this to all prompts so the set looks like one commission, not nine stock
photos:

> Photorealistic documentary photography, natural available light, muted and
> slightly cool colour grading with deep navy shadows, shallow depth of field,
> 35mm or 50mm lens look, candid and unposed, no visible logos or brand names,
> no text in the image, no watermarks, European (German/Bavarian) setting,
> people dressed in real work clothing rather than styled corporate outfits.

Avoid: glossy stock-photo smiles, handshake clichés, obvious AI artefacts on
hands and faces, American road signage, US-style trucks (use European cab-over
trucks — MAN, Scania, DAF silhouettes — not long-nose American rigs), and any
readable third-party logo on clothing, vehicles or equipment.

---

## IMG-01 — Home hero (full-bleed, landscape, ~2400×1350)

> A modern European articulated lorry fleet on a German Autobahn at dusk, shot
> from a low three-quarter angle, headlights and tail lights streaking, cool
> blue twilight sky with a faint warm horizon glow, wet asphalt reflecting the
> light, a sense of scale and movement. Cinematic, wide aspect ratio, deep navy
> tones, plenty of empty darker space on the left third of the frame for a
> headline overlay. No text, no readable company logos on the trailers.

*Note: the left third stays clear in German and French. For the Arabic version
the headline sits on the right, so pick a frame that reads well either way, or
supply a mirrored variant.*

## IMG-02 — Founder portrait, home page (portrait, 4:5, ~1200×1500)

> Environmental portrait of a man in his late forties of North African descent,
> short dark hair, trimmed beard, wearing a dark work jacket or a simple shirt,
> standing in a logistics yard in front of a parked European lorry. He looks
> directly at the camera with a calm, confident, approachable expression — not
> smiling broadly. Overcast daylight, shallow depth of field so the lorry is
> softly blurred behind him. Documentary portrait style, honest and unglamorous.

## IMG-03 — Founder with fleet, About page (portrait, 4:5, ~1200×1500)

> The same man, mid-shot, standing beside the open driver's door of a European
> lorry in a haulage yard in Bavaria, one hand resting on the door frame, head
> turned slightly towards the camera. Early morning light, a row of parked
> trailers receding behind him. Working atmosphere: hi-vis vest hanging nearby,
> wet ground, nothing staged. Documentary reportage feel.

## IMG-04 — Transport & Logistics sector card (landscape, 16:10, ~1600×1000)

> A European articulated lorry reversing precisely up to a warehouse loading
> dock, seen from a slight side angle, dock levellers and roller shutters in the
> background, a warehouse worker guiding from the side. Early morning, cool
> light, realistic industrial estate. No readable branding.

## IMG-05 — Trade & Crafts sector card (landscape, 16:10, ~1600×1000)

> A tradesman in his thirties kneeling on a construction site, laying large
> format floor tiles, spirit level and notched trowel in shot, dusty knee pads,
> concentrated expression, daylight coming through an unglazed window opening.
> Real German construction site, unfinished walls, tools laid out on the floor.

## IMG-06 — Healthcare & Care sector card (landscape, 16:10, ~1600×1000)

> A nurse in light blue scrubs sitting beside an elderly woman in a bright care
> home day room, leaning in slightly to listen, both in mid-conversation. Warm
> natural window light, plants and a cup of tea on the table. Respectful and
> dignified, not sentimental. Faces partly in profile.

> [!WARNING]
> **The delivered `img-06.jpg` carries visible NHS branding** — the logo appears
> on the nurse's tunic and on her lanyard. The NHS is the United Kingdom's
> national health service. On a German agency's website this (a) places the
> scene in the wrong country, undermining the "we place staff in Germany"
> message, and (b) reproduces a public body's trademark on a commercial page
> without permission.
>
> It is small at card size, but it is legible on a high-resolution screen and
> would be obvious if the image is ever used larger. **Recommend regenerating.**
> Suggested replacement prompt:
>
> > A care worker in a plain light-blue tunic with **no logo, no badge and no
> > lanyard**, sitting beside an elderly woman at a table in a bright German care
> > home day room, leaning in to listen, both mid-conversation. Warm natural
> > window light, pot plants, a cup of coffee and a German newspaper on the
> > table. Respectful and dignified, not sentimental, faces partly in profile.
> > Absolutely no text, logos, badges or insignia anywhere in the frame.
>
> Save the result over `public/images/img-06.jpg`; nothing in the code changes.

*Minor, and acceptable as-is: `img-05` shows Knauf plasterboard bags and
`img-07` shows Hermle / Deckel Maho machine branding. Both are German
manufacturers whose products would genuinely be on such a site, and incidental
product branding in documentary photography is normal. Replace only if you want
the set completely brand-free.*

## IMG-07 — Industry & Tech sector card (landscape, 16:10, ~1600×1000)

> A skilled worker in safety glasses and ear defenders operating a modern CNC
> machining centre in a clean German workshop, one hand on the control panel,
> the machine's coolant-wet interior visible through the open guard door. Metal
> chips and finished parts on the bench. Cool industrial lighting.

## IMG-08 — IT & Fibre Optic sector card (landscape, 16:10, ~1600×1000)

> A telecoms technician splicing fibre optic cables, close three-quarter view of
> the splicing machine and the fanned-out coloured fibre strands, the
> technician's hands steady and in focus, face softly out of focus behind. Shot
> inside a street cabinet or a technical room, cool blue equipment glow.

## IMG-09 — Gastronomy sector card (landscape, 16:10, ~1600×1000)

> A chef in a white jacket plating a dish at the pass of a busy professional
> kitchen, tweezers in hand, steam and warm service lights behind, a second cook
> working out of focus in the background. Stainless steel surfaces, real
> kitchen clutter. Energetic but controlled.

---

## Optional extras (not yet placed on a page)

Two alt texts already exist in the dictionaries for these, so if you generate
them they can be dropped into the employer and candidate page heroes
(`components/sections/PageHero.tsx` currently takes no image).

### IMG-10 — For Employers hero

> A dispatcher in a haulage office doorway talking to a lorry driver standing
> beside his cab, both mid-conversation, clipboard or tablet in hand, parked
> trucks behind them. Early morning, practical work clothing, a real depot yard.

### IMG-11 — For Candidates hero

> A skilled worker in his thirties standing outside a German company building,
> holding a folder of documents, looking ahead with quiet optimism. Soft
> daylight, modern but ordinary industrial architecture behind him, a German
> street sign softly out of focus.

---

## Logo

The current mark is a typographic placeholder in
`components/layout/Logo.tsx` — a navy rounded square reading "GJ" with an amber
corner block. If you commission a real logo, ask for:

> A minimal wordmark and monogram for an international recruitment agency called
> "German Jobkonnektor". Deep navy (#0B2545) with a single amber accent
> (#F28C28). The monogram should work as a square app icon at 32px. Suggest a
> connection or bridge motif — two forms meeting — without literal handshake or
> globe clichés. Clean geometric sans-serif, German engineering feel, flat
> vector, no gradients.

Deliver as SVG. Then replace the `<span>` monogram in `Logo.tsx` with an
`<Image>` and drop a matching favicon over `app/icon.svg`.
