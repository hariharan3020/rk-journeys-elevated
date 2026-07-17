import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { TESTIMONIALS } from "@/lib/site";
import { Quote, Star } from "lucide-react";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — RK Tours and Travels" },
      { name: "description", content: "What our customers say about their journeys with RK Tours and Travels." },
      { property: "og:title", content: "Testimonials — RK Tours and Travels" },
      { property: "og:url", content: "/testimonials" },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
  component: Testimonials,
});

function Testimonials() {
  return (
    <>
      <PageHero eyebrow="Testimonials" title="Loved by travelers across India." subtitle="Real words from customers who trusted us with their journeys." />

      <section className="section pt-0">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <article key={i} className="card-float p-8 relative">
              <Quote className="absolute right-6 top-6 size-8 text-primary/15" />
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(t.rating)].map((_, k) => <Star key={k} className="size-4 fill-current" />)}
              </div>
              <p className="mt-4 text-paragraph leading-relaxed">"{t.text}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary font-display font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-display font-semibold text-heading">{t.name}</p>
                  <p className="text-xs text-paragraph">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
