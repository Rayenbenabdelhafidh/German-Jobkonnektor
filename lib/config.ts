/**
 * Single source of truth for company contact details.
 * Replace the two PLACEHOLDER values below and every page,
 * every language, the footer, the Impressum and the WhatsApp
 * button update at once.
 */

export const COMPANY = {
  name: "German Jobkonnektor",
  owner: "Mustapha Ben Belgacem",
  street: "Schneeheideanger 3",
  postalCode: "80937",
  city: "München",
  country: "Deutschland",

  // TODO: replace with the real address before going live
  email: "EMAIL_PLACEHOLDER@german-jobkonnektor.de",

  // TODO: replace with the real number before going live.
  // Format: international, no spaces — used for tel: and wa.me links.
  phone: "+49000000000",
  phoneDisplay: "+49 (0) 000 000 000",

  // TODO: replace with the real VAT / tax IDs before going live
  vatId: "USt-IdNr. PLATZHALTER",
  taxNumber: "Steuernummer PLATZHALTER",

  // Used for canonical URLs and hreflang tags
  siteUrl: "https://www.german-jobkonnektor.de",

  // Geo coordinates of Schneeheideanger 3, 80937 München
  geo: { lat: 48.1899, lng: 11.5423 },
} as const;

export const WHATSAPP_URL = `https://wa.me/${COMPANY.phone.replace(/[^0-9]/g, "")}`;
export const TEL_URL = `tel:${COMPANY.phone}`;
export const MAILTO_URL = `mailto:${COMPANY.email}`;

const ADDRESS_QUERY = encodeURIComponent(
  `${COMPANY.street}, ${COMPANY.postalCode} ${COMPANY.city}, ${COMPANY.country}`,
);

/**
 * `hl` makes Google render the map's own controls and labels in the visitor's
 * language, so the contact page has no English UI in the Arabic or French
 * versions.
 */
export function mapsEmbedUrl(lang: string): string {
  return `https://www.google.com/maps?q=${ADDRESS_QUERY}&hl=${lang}&output=embed`;
}

export const MAPS_LINK_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(
    `${COMPANY.street}, ${COMPANY.postalCode} ${COMPANY.city}`,
  );
