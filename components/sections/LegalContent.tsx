import { Mail, Phone } from "lucide-react";
import type { LegalSection } from "@/lib/i18n/types";
import { COMPANY, MAILTO_URL, TEL_URL } from "@/lib/config";

/** Address, e-mail and phone, injected into any section flagged `contact`. */
function ContactBlock() {
  return (
    <div className="my-4 rounded-xl border border-line bg-surface p-5">
      <address className="text-sm not-italic leading-relaxed text-navy">
        <strong className="font-semibold">{COMPANY.name}</strong>
        <br />
        {COMPANY.owner}
        <br />
        {COMPANY.street}
        <br />
        <span className="numeric">{COMPANY.postalCode}</span> {COMPANY.city}
        <br />
        {COMPANY.country}
      </address>
      <div className="mt-4 flex flex-col gap-2 border-t border-line pt-4 text-sm">
        <a
          href={MAILTO_URL}
          className="flex items-center gap-2 break-all text-muted hover:text-amber"
        >
          <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
          {COMPANY.email}
        </a>
        <a
          href={TEL_URL}
          className="flex items-center gap-2 text-muted hover:text-amber"
        >
          <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="numeric">{COMPANY.phoneDisplay}</span>
        </a>
      </div>
    </div>
  );
}

export function LegalContent({ sections }: { sections: LegalSection[] }) {
  return (
    <div className="max-w-prose">
      {sections.map((section) => (
        <section key={section.heading} className="mb-10 last:mb-0">
          <h2 className="mb-4 text-xl font-bold text-navy sm:text-2xl">
            {section.heading}
          </h2>

          <div className="prose-legal">
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {section.contact ? <ContactBlock /> : null}

          {section.lines?.length ? (
            <address className="rounded-xl border border-line bg-surface p-5 text-sm not-italic leading-relaxed text-navy">
              {section.lines.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < section.lines!.length - 1 ? <br /> : null}
                </span>
              ))}
            </address>
          ) : null}

          {section.list?.length ? (
            <ul className="my-4 space-y-2">
              {section.list.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {section.after?.length ? (
            <div className="prose-legal mt-4">
              {section.after.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null}
        </section>
      ))}
    </div>
  );
}
