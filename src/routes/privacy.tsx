import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — RK Tours and Travels" },
      { name: "description", content: "How RK Tours and Travels collects, uses and protects your information." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="Privacy Policy" subtitle="Your trust matters. Here's how we handle your information." />
      <section className="section pt-0">
        <div className="container-x max-w-3xl prose prose-slate">
          <div className="card-float p-8 space-y-6 text-paragraph">
            <div>
              <h2 className="font-display text-xl text-heading">Information we collect</h2>
              <p className="mt-2">We collect only the details needed to serve your booking — your name, phone number, pickup and drop locations, and travel dates.</p>
            </div>
            <div>
              <h2 className="font-display text-xl text-heading">How we use it</h2>
              <p className="mt-2">Your information is used solely to confirm bookings, dispatch drivers, and provide customer support. We never sell your data.</p>
            </div>
            <div>
              <h2 className="font-display text-xl text-heading">Communication</h2>
              <p className="mt-2">Bookings are primarily coordinated via WhatsApp using the phone number you share with us.</p>
            </div>
            <div>
              <h2 className="font-display text-xl text-heading">Contact</h2>
              <p className="mt-2">For any privacy concern, email us at rktoursandtravels.01@gmail.com.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
