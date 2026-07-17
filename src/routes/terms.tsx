import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — RK Tours and Travels" },
      { name: "description", content: "Terms and conditions for booking with RK Tours and Travels." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <>
      <PageHero eyebrow="Terms" title="Terms & Conditions" subtitle="The fine print behind your smooth ride." />
      <section className="section pt-0">
        <div className="container-x max-w-3xl">
          <div className="card-float p-8 space-y-6 text-paragraph">
            <div>
              <h2 className="font-display text-xl text-heading">Booking & confirmation</h2>
              <p className="mt-2">Bookings are confirmed once we acknowledge them via WhatsApp or call. Please share accurate pickup timings and locations.</p>
            </div>
            <div>
              <h2 className="font-display text-xl text-heading">Pricing</h2>
              <p className="mt-2">Rates are on a kilometre basis. Other state permits, border taxes, toll gate charges, and parking fees are extra. Driver batta applies for outstation trips.</p>
            </div>
            <div>
              <h2 className="font-display text-xl text-heading">Cancellation</h2>
              <p className="mt-2">Cancellations should be informed at least 4 hours before pickup where possible. Repeated last-minute cancellations may attract a nominal fee.</p>
            </div>
            <div>
              <h2 className="font-display text-xl text-heading">Liability</h2>
              <p className="mt-2">RK Tours and Travels is not liable for delays caused by traffic, weather or unforeseen conditions, but we always do our best to keep you on schedule.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
