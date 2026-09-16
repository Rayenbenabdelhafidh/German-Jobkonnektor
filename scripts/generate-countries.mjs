/**
 * Generates lib/countries.generated.ts.
 *
 * Country names come from Intl.DisplayNames, but Node's ICU data and the
 * browser's can differ, which produces a React hydration mismatch when the
 * list is built at render time. Baking the names into a source file makes the
 * server and the client render byte-identical markup.
 *
 * Re-run with:  node scripts/generate-countries.mjs
 */
import { writeFileSync } from "node:fs";

const LANGS = ["de", "en", "ar", "fr"];

const CODES = [
  "AF","AL","DZ","AD","AO","AR","AM","AU","AT","AZ",
  "BH","BD","BY","BE","BJ","BA","BR","BG","BF","BI",
  "KH","CM","CA","TD","CL","CN","CO","KM","CD","CG",
  "CR","CI","HR","CU","CY","CZ","DK","DJ","DO","EC",
  "EG","SV","ER","EE","ET","FI","FR","GA","GM","GE",
  "DE","GH","GR","GT","GN","GW","HT","HN","HU","IS",
  "IN","ID","IR","IQ","IE","IL","IT","JM","JP","JO",
  "KZ","KE","KW","KG","LA","LV","LB","LY","LT","LU",
  "MG","MW","MY","ML","MT","MR","MU","MX","MD","MN",
  "ME","MA","MZ","MM","NA","NP","NL","NZ","NI","NE",
  "NG","MK","NO","OM","PK","PS","PA","PY","PE","PH",
  "PL","PT","QA","RO","RU","RW","SA","SN","RS","SL",
  "SG","SK","SI","SO","ZA","KR","SS","ES","LK","SD",
  "SE","CH","SY","TW","TJ","TZ","TH","TG","TN","TR",
  "TM","UG","UA","AE","GB","US","UY","UZ","VE","VN",
  "YE","ZM","ZW",
];

const lines = [];
lines.push("// GENERATED FILE — do not edit by hand.");
lines.push("// Run `node scripts/generate-countries.mjs` to regenerate.");
lines.push("//");
lines.push("// Country names are baked in rather than derived from Intl at render time,");
lines.push("// because Node and browser ICU data can differ and cause a hydration mismatch.");
lines.push("");
lines.push('import type { Lang } from "./languages";');
lines.push("");
lines.push("export interface CountryOption {");
lines.push("  value: string;");
lines.push("  label: string;");
lines.push("}");
lines.push("");
lines.push("export const COUNTRIES_BY_LANG: Record<Lang, CountryOption[]> = {");

for (const lang of LANGS) {
  const display = new Intl.DisplayNames([lang], { type: "region" });
  const collator = new Intl.Collator(lang);
  const options = CODES.map((code) => ({ value: code, label: display.of(code) ?? code }))
    .sort((a, b) => collator.compare(a.label, b.label));

  lines.push(`  ${lang}: [`);
  for (const option of options) {
    lines.push(`    { value: ${JSON.stringify(option.value)}, label: ${JSON.stringify(option.label)} },`);
  }
  lines.push("  ],");
}

lines.push("};");
lines.push("");

writeFileSync("lib/countries.generated.ts", lines.join("\n"), "utf8");
console.log(`Wrote lib/countries.generated.ts (${CODES.length} countries x ${LANGS.length} languages)`);
