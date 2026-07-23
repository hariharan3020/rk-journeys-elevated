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
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-22 overflow-hidden bg-gradient-to-b from-slate-100/90 via-slate-50/60 to-slate-50">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(10,110,189,0.12),rgba(255,255,255,0))]" aria-hidden />
      <div className="container-x fade-up">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="mt-4 font-display font-bold text-4xl md:text-6xl leading-[1.08] max-w-3xl text-heading tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg text-paragraph leading-relaxed font-normal">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
