import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { BookNowButton } from "@/components/site/BookNow";
import { useSiteContent } from "@/lib/useSiteContent";
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
  const { content } = useSiteContent();
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
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.services.map((s) => {
            const Icon = iconMap[s.icon] ?? MapPinned;
            return (
              <article key={s.title} className="card-float p-8 group flex flex-col justify-between">
                <div>
                  <div className="glow-icon grid size-14 place-items-center rounded-2xl group-hover:scale-110">
                    <Icon className="size-6 transition-transform group-hover:scale-110" />
                  </div>
                  <h3 className="mt-6 font-display font-bold text-xl text-heading group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-paragraph">{s.desc}</p>
                </div>
                <div className="mt-6 border-t border-slate-100 pt-5">
                  <BookNowButton label="Enquire Now" className="w-full justify-center !py-2.5 text-xs" message={`Hi, I want to book ${s.title}`} />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
