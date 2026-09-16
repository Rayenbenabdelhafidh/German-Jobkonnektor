"use client";

import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertTriangle, Info, Send, ShieldCheck } from "lucide-react";
import type { Lang } from "@/lib/languages";
import type { Dictionary } from "@/lib/i18n";
import { getCountries } from "@/lib/countries";
import { submitForm } from "@/lib/submit";
import { Button } from "@/components/ui/Button";
import {
  Checkbox,
  Honeypot,
  SelectInput,
  TextInput,
} from "@/components/ui/Field";
import { FileField } from "@/components/ui/FileField";
import { SuccessPanel } from "./SuccessPanel";
import { ConsentLabel } from "./ConsentLabel";

/** Document slots required of every applicant, whatever the industry. */
const BASE_DOCUMENTS = [
  { id: "cv", labelKey: "cv", required: true },
  { id: "passport", labelKey: "passport", required: true },
  { id: "diplomas", labelKey: "diplomas", required: true },
] as const;

/** Extra slots shown only when Transport & Logistics is selected. */
const TRANSPORT_DOCUMENTS = [
  { id: "licenseFront", labelKey: "licenseFront", required: true },
  { id: "licenseBack", labelKey: "licenseBack", required: true },
  { id: "driverCard", labelKey: "driverCard", required: false },
  { id: "drivingExperience", labelKey: "drivingExperience", required: true },
] as const;

type DocumentId =
  | (typeof BASE_DOCUMENTS)[number]["id"]
  | (typeof TRANSPORT_DOCUMENTS)[number]["id"];

function buildSchema(dict: Dictionary) {
  const e = dict.forms.errors;
  return z.object({
    firstName: z.string().trim().min(2, e.required),
    lastName: z.string().trim().min(2, e.required),
    email: z.string().trim().min(1, e.required).email(e.email),
    phone: z
      .string()
      .trim()
      .min(6, e.phone)
      .regex(/^[+0-9()\-\s./]{6,}$/, e.phone),
    residence: z.string().min(1, e.selectOption),
    nationality: z.string().trim().min(2, e.required),
    germanLevel: z.string().min(1, e.selectOption),
    industry: z.string().min(1, e.selectOption),
    consent: z.literal(true, { errorMap: () => ({ message: e.consent }) }),
    website: z.string().optional(),
  });
}

type FormValues = z.infer<ReturnType<typeof buildSchema>>;

export function CandidateApplicationForm({
  lang,
  dict,
}: {
  lang: Lang;
  dict: Dictionary;
}) {
  const t = dict.forms.candidate;
  const renderedAt = useRef(Date.now());
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState(false);
  const [files, setFiles] = useState<Partial<Record<DocumentId, File>>>({});
  const [fileErrors, setFileErrors] = useState<Partial<Record<DocumentId, string>>>(
    {},
  );

  const countries = useMemo(() => getCountries(lang), [lang]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(buildSchema(dict)),
    mode: "onTouched",
  });

  const industry = watch("industry");
  const isTransport = industry === "transport";

  const documents = isTransport
    ? [...BASE_DOCUMENTS, ...TRANSPORT_DOCUMENTS]
    : [...BASE_DOCUMENTS];

  function setFile(id: DocumentId, file: File | null) {
    setFiles((current) => {
      const next = { ...current };
      if (file) next[id] = file;
      else delete next[id];
      return next;
    });
    setFileErrors((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }

  async function onSubmit(values: FormValues) {
    setFailed(false);

    // Required documents are validated here rather than in the zod schema:
    // which slots exist depends on the selected industry.
    const missing: Partial<Record<DocumentId, string>> = {};
    for (const doc of documents) {
      if (doc.required && !files[doc.id]) {
        missing[doc.id] = dict.forms.errors.required;
      }
    }
    if (Object.keys(missing).length > 0) {
      setFileErrors(missing);
      document
        .getElementById("dokumente")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const result = await submitForm({
      kind: "candidate",
      lang,
      fields: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        residence: values.residence,
        nationality: values.nationality,
        germanLevel: values.germanLevel,
        industry: values.industry,
        consent: true,
      },
      files,
      honeypot: values.website,
      renderedAt: renderedAt.current,
    });

    if (result.ok) setDone(true);
    else setFailed(true);
  }

  if (done) {
    return <SuccessPanel title={dict.forms.successTitle} message={t.success} />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="relative rounded-card border border-line bg-white p-6 shadow-card sm:p-8"
    >
      <Honeypot {...register("website")} />

      {/* ── Personal details ─────────────────────────────────────── */}
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput
          label={t.firstName}
          required
          autoComplete="given-name"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <TextInput
          label={t.lastName}
          required
          autoComplete="family-name"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
        <TextInput
          label={t.email}
          type="email"
          required
          autoComplete="email"
          dir="ltr"
          error={errors.email?.message}
          {...register("email")}
        />
        <TextInput
          label={t.phone}
          type="tel"
          required
          autoComplete="tel"
          dir="ltr"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <SelectInput
          label={t.residence}
          required
          placeholder={t.residencePlaceholder}
          options={countries}
          error={errors.residence?.message}
          {...register("residence")}
        />
        <TextInput
          label={t.nationality}
          required
          error={errors.nationality?.message}
          {...register("nationality")}
        />
        <SelectInput
          label={t.germanLevel}
          required
          placeholder={t.germanLevelPlaceholder}
          options={[...dict.forms.germanLevels]}
          error={errors.germanLevel?.message}
          {...register("germanLevel")}
        />
        <SelectInput
          label={t.industry}
          required
          placeholder={t.industryPlaceholder}
          options={[...dict.forms.industryOptions]}
          error={errors.industry?.message}
          {...register("industry")}
        />
      </div>

      {/* ── Documents ────────────────────────────────────────────── */}
      <div id="dokumente" className="mt-10 scroll-mt-28">
        <h3 className="text-lg font-bold text-navy">{t.documentsTitle}</h3>
        <p className="mt-1 text-sm text-muted">{t.documentsSub}</p>

        {isTransport ? (
          <p className="mt-4 flex items-start gap-2.5 rounded-xl bg-amber-50 p-4 text-sm leading-relaxed text-navy ring-1 ring-inset ring-amber-200">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber" aria-hidden="true" />
            {t.transportNote}
          </p>
        ) : null}

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {documents.map((doc) => (
            <FileField
              key={doc.id}
              label={dict.forms.documents[doc.labelKey]}
              required={doc.required}
              dict={dict}
              lang={lang}
              formError={fileErrors[doc.id]}
              onFileChange={(file) => setFile(doc.id, file)}
            />
          ))}
        </div>
      </div>

      {/* ── Consent ──────────────────────────────────────────────── */}
      <div className="mt-8 rounded-xl bg-surface p-4">
        <Checkbox
          // Unchecked by default — explicit opt-in under Art. 9(2)(a) GDPR.
          label={
            <ConsentLabel
              text={t.consent}
              linkLabel={dict.forms.privacyLink}
              lang={lang}
            />
          }
          error={errors.consent?.message}
          {...register("consent")}
        />
      </div>

      {failed ? (
        <p
          role="alert"
          className="mt-5 flex items-start gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {dict.forms.genericError}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button
          type="submit"
          variant="accent"
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            dict.forms.sending
          ) : (
            <>
              {t.submit}
              <Send className="h-4 w-4 rtl-flip" aria-hidden="true" />
            </>
          )}
        </Button>
        <p className="flex items-center gap-2 text-xs text-muted">
          <ShieldCheck className="h-4 w-4 shrink-0 text-green-600" aria-hidden="true" />
          {dict.candidates.free.badge}
        </p>
      </div>
    </form>
  );
}
