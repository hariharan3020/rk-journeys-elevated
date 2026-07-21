import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { BookNowButton } from "@/components/site/BookNow";
import { useSiteContent } from "@/lib/useSiteContent";
import { Check } from "lucide-react";

export const Route = createFileRoute("/tariff")({
  head: () => ({
    meta: [
      { title: "Tariff — RK Tours and Travels" },
      { name: "description", content: "Transparent outstation kilometre rates for Etios, Swift Dzire and Ciaz." },
      { property: "og:title", content: "Tariff — RK Tours and Travels" },
      { property: "og:url", content: "/tariff" },
    ],
    links: [{ rel: "canonical", href: "/tariff" }],
  }),
  component: Tariff,
});

function Tariff() {
  const { content } = useSiteContent();

  return (
    <>
      <PageHero
        eyebrow="Tariff"
        title="Simple, transparent kilometre pricing."
        subtitle="Outstation kilometre basis — no surprises, no hidden fees."
      />

      <section className="section pt-0">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-3">
            {content.fleet.map((f, i) => (
              <div key={f.name} className={`rounded-3xl p-8 ${i === 1 ? "bg-heading text-white scale-[1.02]" : "card-float"}`}>
                <p className="text-primary text-sm font-semibold">{f.tag}</p>
                <h3 className={`mt-2 font-display font-bold text-2xl ${i === 1 ? "text-white" : "text-heading"}`}>{f.name}</h3>
                <p className={`mt-6 font-display font-bold text-6xl ${i === 1 ? "text-white" : "text-heading"}`}>{f.rate}</p>
                <p className={`text-sm ${i === 1 ? "text-white/70" : "text-paragraph"}`}>Outstation • per km</p>
                <ul className={`mt-6 space-y-3 text-sm ${i === 1 ? "text-white/85" : "text-paragraph"}`}>
                  <li className="flex items-center gap-2"><Check className="size-4 text-accent" /> {f.passengers} passengers</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-accent" /> {f.luggage} bags capacity</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-accent" /> Fully air-conditioned</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-accent" /> Experienced driver</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-accent" /> 24×7 support</li>
                </ul>
                <div className="mt-8">
                  <BookNowButton className="w-full" message={`Hi, I want to book a ${f.name}`} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-surface p-6 md:p-8">
            <p className="text-sm text-paragraph">
              <strong className="text-heading font-display">Note:</strong> Other state permits, border taxes, toll gate charges, and parking fees are extra. Driver batta as applicable for outstation trips. Rates may vary based on season and route.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
