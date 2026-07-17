import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { BookNowButton } from "@/components/site/BookNow";
import { SERVICES } from "@/lib/site";
import {
  Plane, MapPinned, Clock, Briefcase, Landmark, Users, Palmtree, HeartHandshake, BusFront, Timer,
} from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — RK Tours and Travels" },
      { name: "description", content: "Airport transfers, outstation trips, local rentals, corporate travel, temple tours, and 24×7 cab service." },
      { property: "og:title", content: "Services — RK Tours and Travels" },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

const iconMap: Record<string, any> = { Plane, MapPinned, Clock, Briefcase, Landmark, Users, Palmtree, HeartHandshake, BusFront, Timer };

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="A ride crafted for every occasion."
        subtitle="From airport pickups to multi-day pilgrimages — every RK service is built on the same standard of comfort and care."
      >
        <BookNowButton />
      </PageHero>

      <section className="section pt-0">
        <div className="container-x grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = iconMap[s.icon] ?? MapPinned;
            return (
              <article key={s.title} className="card-float p-7 group">
                <div className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-5 font-display font-bold text-xl text-heading">{s.title}</h3>
                <p className="mt-2 text-sm text-paragraph">{s.desc}</p>
                <div className="mt-5">
                  <BookNowButton label="Enquire" className="!py-2 !px-4 text-xs" message={`Hi, I want to book ${s.title}`} />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
