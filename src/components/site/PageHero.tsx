import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative pt-36 pb-16 md:pt-44 md:pb-24 overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, #ffe5e5 0%, transparent 60%), radial-gradient(50% 50% at 90% 10%, #e6f6ee 0%, transparent 60%), #ffffff",
        }}
        aria-hidden
      />
      <div className="container-x fade-up">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="mt-3 font-display font-bold text-4xl md:text-6xl leading-[1.05] max-w-3xl text-heading">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg text-paragraph leading-relaxed">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
