"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertTriangle, Send } from "lucide-react";
import type { Lang } from "@/lib/languages";
import type { Dictionary } from "@/lib/i18n";
import { interpolate } from "@/lib/i18n";
import { submitForm } from "@/lib/submit";
import { Button } from "@/components/ui/Button";
import { Checkbox, Honeypot, TextArea, TextInput } from "@/components/ui/Field";
import { SuccessPanel } from "./SuccessPanel";
import { ConsentLabel } from "./ConsentLabel";

function buildSchema(dict: Dictionary) {
  const e = dict.forms.errors;
  return z.object({
    name: z.string().trim().min(2, e.required),
    email: z.string().trim().min(1, e.required).email(e.email),
    phone: z
      .string()
      .trim()
      .regex(/^[+0-9()\-\s./]{6,}$/, e.phone)
      .optional()
      .or(z.literal("")),
    subject: z.string().trim().min(2, e.required),
    message: z
      .string()
      .trim()
      .min(10, interpolate(e.minLength, { min: 10 })),
    consent: z.literal(true, { errorMap: () => ({ message: e.consent }) }),
    website: z.string().optional(),
  });
}

type FormValues = z.infer<ReturnType<typeof buildSchema>>;

export function ContactForm({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const t = dict.forms.contact;
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
      kind: "contact",
      lang,
      fields: {
        name: values.name,
        email: values.email,
        phone: values.phone,
        subject: values.subject,
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
    return <SuccessPanel title={dict.forms.successTitle} message={t.success} />;
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
          label={t.name}
          required
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
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
          autoComplete="tel"
          dir="ltr"
          optionalLabel={dict.forms.optional}
          error={errors.phone?.message}
          {...register("phone")}
        />
        <TextInput
          label={t.subject}
          required
          error={errors.subject?.message}
          {...register("subject")}
        />
        <TextArea
          label={t.message}
          placeholder={t.messagePlaceholder}
          required
          wrapperClassName="sm:col-span-2"
          error={errors.message?.message}
          {...register("message")}
        />
      </div>

      <div className="mt-6 rounded-xl bg-surface p-4">
        <Checkbox
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
