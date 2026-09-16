import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  sub?: string;
  children?: ReactNode;
}

/** Compact navy hero used at the top of every page except the home page. */
export function PageHero({ eyebrow, title, sub, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 90% at 85% 0%, rgba(242,140,40,0.18), transparent 60%)",
        }}
      />
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="eyebrow mb-3 text-amber-300">{eyebrow}</p>
          ) : null}
          <h1 className="text-balance text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h1>
          {sub ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-navy-200 sm:text-lg">
              {sub}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
