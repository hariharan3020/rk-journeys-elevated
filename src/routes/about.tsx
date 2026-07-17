import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Target, Eye, Sparkles, Trophy } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — RK Tours and Travels" },
      { name: "description", content: "Founded 20 years ago in Coimbatore, RK Tours and Travels is a premier cab service across India." },
      { property: "og:title", content: "About RK Tours and Travels" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Twenty years of comfortable journeys across India."
        subtitle="RK Tours and Travels is a premier cab service provider in Coimbatore, offering safe, affordable, and comfortable rides for all your travel needs."
      />

      <section className="section pt-0">
        <div className="container-x grid gap-10 lg:grid-cols-2 items-start">
          <div className="card-float p-8">
            <h2 className="font-display font-bold text-3xl text-heading">The RK story</h2>
            <p className="mt-4 text-paragraph leading-relaxed">
              Founded 20 years ago by Mr. Raj Kumar with a small setup, the company has now grown into a vast network of vehicles, serving customers across India. Our service is exceptional, and we are committed to providing reliable rides at competitive and affordable rates.
            </p>
            <p className="mt-4 text-paragraph leading-relaxed">
              What began with a single vehicle and a promise of reliability has become a trusted travel companion for thousands of families, corporate clients and pilgrims — one journey at a time.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { k: "20+", v: "Years of service" },
              { k: "10K+", v: "Happy customers" },
              { k: "500+", v: "Cities covered" },
              { k: "24/7", v: "Availability" },
            ].map((s) => (
              <div key={s.v} className="card-float p-6">
                <p className="font-display font-bold text-4xl text-primary">{s.k}</p>
                <p className="mt-2 text-sm text-paragraph">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {[
            { icon: Target, t: "Our Mission", d: "Deliver safe, affordable and delightful travel to every customer, every trip." },
            { icon: Eye, t: "Our Vision", d: "Be India's most trusted premium cab & tour service, powered by warmth and reliability." },
            { icon: Sparkles, t: "Our Values", d: "Punctuality, transparency, comfort and the human touch — always." },
          ].map((v) => (
            <div key={v.t} className="card-float p-8">
              <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <v.icon className="size-6" />
              </div>
              <h3 className="mt-5 font-display font-bold text-xl text-heading">{v.t}</h3>
              <p className="mt-2 text-paragraph">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <span className="eyebrow">Timeline</span>
          <h2 className="mt-3 font-display font-bold text-4xl text-heading">Milestones on the road.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              { y: "2005", t: "Humble start", d: "Mr. Raj Kumar starts with a single car in Coimbatore." },
              { y: "2012", t: "Growing fleet", d: "Expanded across Tamil Nadu with a modern sedan fleet." },
              { y: "2018", t: "Pan-India", d: "Outstation & pilgrimage tours nationwide." },
              { y: "2025", t: "Premium era", d: "20 years strong — thousands of trusted journeys." },
            ].map((m) => (
              <div key={m.y} className="card-float p-6">
                <div className="flex items-center gap-2 text-primary">
                  <Trophy className="size-4" />
                  <span className="font-display font-bold">{m.y}</span>
                </div>
                <h3 className="mt-3 font-display font-semibold text-heading">{m.t}</h3>
                <p className="mt-2 text-sm text-paragraph">{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <div className="rounded-[28px] bg-heading text-white p-10 md:p-14 grid gap-6 md:grid-cols-[auto_1fr] items-center">
            <div className="grid size-24 place-items-center rounded-full bg-primary text-4xl font-display font-bold">
              RK
            </div>
            <div>
              <p className="text-primary text-sm font-semibold">Founder</p>
              <h3 className="mt-1 font-display font-bold text-3xl">Mr. Raj Kumar</h3>
              <p className="mt-3 text-white/80 max-w-2xl">
                "We treat every trip like it's for our own family. That's the promise I started with 20 years ago — and it still guides every ride we drive."
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
