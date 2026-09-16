import { CheckCircle2 } from "lucide-react";

export function SuccessPanel({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-card border border-green-200 bg-green-50 p-8 text-center sm:p-10"
    >
      <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white">
        <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
      </span>
      <h3 className="mb-3 text-xl font-bold text-navy">{title}</h3>
      <p className="mx-auto max-w-md text-sm leading-relaxed text-muted">
        {message}
      </p>
    </div>
  );
}
