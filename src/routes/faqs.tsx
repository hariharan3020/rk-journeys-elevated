import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { FAQS } from "@/lib/site";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — RK Tours and Travels" },
      { name: "description", content: "Frequently asked questions about booking, pricing and travel with RK Tours and Travels." },
      { property: "og:title", content: "FAQs — RK Tours and Travels" },
      { property: "og:url", content: "/faqs" },
    ],
    links: [{ rel: "canonical", href: "/faqs" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Faqs,
});

function Faqs() {
  return (
    <>
      <PageHero eyebrow="FAQs" title="Answers before you ask." subtitle="Everything you might want to know before booking your next ride." />

      <section className="section pt-0">
        <div className="container-x max-w-3xl space-y-3">
          {FAQS.map((f, i) => (
            <details key={i} className="group card-float p-6">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-display font-semibold text-heading">
                {f.q}
                <span className="text-primary text-xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-paragraph">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
