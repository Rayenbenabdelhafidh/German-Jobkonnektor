"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertTriangle, Send } from "lucide-react";
import type { Lang } from "@/lib/languages";
import type { Dictionary } from "@/lib/i18n";
import { submitForm } from "@/lib/submit";
import { Button } from "@/components/ui/Button";
import {
  Checkbox,
  Honeypot,
  SelectInput,
  TextArea,
  TextInput,
} from "@/components/ui/Field";
import { SuccessPanel } from "./SuccessPanel";
import { ConsentLabel } from "./ConsentLabel";

function buildSchema(dict: Dictionary) {
  const e = dict.forms.errors;
  return z.object({
    company: z.string().trim().min(2, e.required),
    contactPerson: z.string().trim().min(2, e.required),
    email: z.string().trim().min(1, e.required).email(e.email),
    phone: z
      .string()
      .trim()
      .min(6, e.phone)
      .regex(/^[+0-9()\-\s./]{6,}$/, e.phone),
    industry: z.string().min(1, e.selectOption),
    headcount: z
      .string()
      .trim()
      .min(1, e.required)
      .regex(/^\d{1,4}$/, e.number),
    startDate: z.string().trim().min(1, e.required),
    message: z.string().trim().max(4000).optional().or(z.literal("")),
    consent: z.literal(true, { errorMap: () => ({ message: e.consent }) }),
    website: z.string().optional(),
  });
}

type FormValues = z.infer<ReturnType<typeof buildSchema>>;

export function EmployerRequestForm({
  lang,
  dict,
}: {
  lang: Lang;
  dict: Dictionary;
}) {
  const t = dict.forms.employer;
  const renderedAt = useRef(Date.now());
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(buildSchema(dict)),
    mode: "onTouched",
  });

  async function onSubmit(values: FormValues) {
    setFailed(false);
    const result = await submitForm({
      kind: "employer",
      lang,
      fields: {
        company: values.company,
        contactPerson: values.contactPerson,
        email: values.email,
        phone: values.phone,
        industry: values.industry,
        headcount: Number(values.headcount),
        startDate: values.startDate,
        message: values.message,
        consent: true,
      },
      honeypot: values.website,
      renderedAt: renderedAt.current,
    });

    if (result.ok) setDone(true);
    else setFailed(true);
  }

  if (done) {
    return (
      <SuccessPanel title={dict.forms.successTitle} message={t.success} />
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="relative rounded-card border border-line bg-white p-6 shadow-card sm:p-8"
    >
      <Honeypot {...register("website")} />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput
          label={t.company}
          required
          autoComplete="organization"
          error={errors.company?.message}
          {...register("company")}
        />
        <TextInput
          label={t.contactPerson}
          required
          autoComplete="name"
          error={errors.contactPerson?.message}
          {...register("contactPerson")}
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
          label={t.industry}
          required
          placeholder={t.industryPlaceholder}
          options={[...dict.forms.industryOptions]}
          error={errors.industry?.message}
          {...register("industry")}
        />
        <TextInput
          label={t.headcount}
          type="number"
          min={1}
          max={9999}
          inputMode="numeric"
          required
          error={errors.headcount?.message}
          {...register("headcount")}
        />
        <TextInput
          label={t.startDate}
          type="date"
          required
          dir="ltr"
          wrapperClassName="sm:col-span-2"
          error={errors.startDate?.message}
          {...register("startDate")}
        />
        <TextArea
          label={t.message}
          placeholder={t.messagePlaceholder}
          optionalLabel={dict.forms.optional}
          wrapperClassName="sm:col-span-2"
          error={errors.message?.message}
          {...register("message")}
        />
      </div>

      <div className="mt-6 rounded-xl bg-surface p-4">
        <Checkbox
          // Unchecked by default — an opt-in, never a pre-ticked box.
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

      <Button
        type="submit"
        variant="accent"
        size="lg"
        disabled={isSubmitting}
        className="mt-6 w-full sm:w-auto"
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
    </form>
  );
}
