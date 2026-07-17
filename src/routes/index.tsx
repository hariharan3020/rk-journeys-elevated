import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck, Wallet, HeadphonesIcon, Award, MapPinned, Star, ChevronRight,
  Plane, Clock, Briefcase, Landmark, Users, Palmtree, HeartHandshake, BusFront, Timer, Phone,
} from "lucide-react";
import hero from "@/assets/hero.jpg";
import destOoty from "@/assets/dest-ooty.jpg";
import destMadurai from "@/assets/dest-madurai.jpg";
import destKodai from "@/assets/dest-kodaikanal.jpg";
import destMunnar from "@/assets/dest-munnar.jpg";
import destRam from "@/assets/dest-rameshwaram.jpg";
import destCbe from "@/assets/dest-coimbatore.jpg";
import { BookNowButton } from "@/components/site/BookNow";
import { FleetCard } from "@/components/site/FleetCard";
import { FLEET, SERVICES, TESTIMONIALS, FAQS, PACKAGES } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RK Tours and Travels — Premium Cab Service in Coimbatore" },
      { name: "description", content: "Explore India comfortably with RK Tours and Travels. Safe, affordable and trusted cab & tour service for 20 years." },
      { property: "og:title", content: "Explore India Comfortably — RK Tours and Travels" },
      { property: "og:description", content: "Airport transfers, outstation trips, tour packages and 24×7 cab service across India." },
      { property: "og:url", content: "/" },
    ],
  }),
  component: Home,
});

const iconMap = { Plane, Clock, Briefcase, Landmark, Users, Palmtree, HeartHandshake, BusFront, Timer, MapPinned } as Record<string, any>;
const destImg: Record<string, string> = { ooty: destOoty, madurai: destMadurai, kodaikanal: destKodai, munnar: destMunnar, rameshwaram: destRam, coimbatore: destCbe };

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-gradient-to-br from-surface via-white to-surface">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>
        <div className="container-x relative">
          <div className="relative grid gap-12 lg:grid-cols-[1fr_1fr] items-center">
            <div className="relative z-10 fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-semibold text-primary">Trusted for 20 Years</span>
              </div>
              <h1 className="mt-8 font-display font-bold text-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight">
                Explore India <span className="text-primary relative">
                  Comfortably
                  <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                    <path d="M2 6C50 2 150 2 198 6" stroke="#D62828" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span> with RK Tours
              </h1>
              <p className="mt-6 text-xl text-paragraph max-w-2xl leading-relaxed font-medium">
                Safe • Affordable • Comfortable — a premium cab & tour experience crafted in Coimbatore, delivered across India.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <BookNowButton />
                <Link to="/tariff" className="btn-ghost">
                  View Tariff <ChevronRight className="size-4" />
                </Link>
              </div>
              <dl className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
                {[
                  { k: "20+", v: "Years of trust" },
                  { k: "10K+", v: "Happy travelers" },
                  { k: "Pan", v: "India service" },
                ].map((s) => (
                  <div key={s.v} className="rounded-2xl bg-white p-5 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.08)] border border-border">
                    <dt className="font-display font-bold text-3xl text-primary">{s.k}</dt>
                    <dd className="text-sm text-paragraph mt-1 font-medium">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative">
              <div className="relative rounded-[32px] overflow-hidden shadow-[0_50px_120px_-50px_rgba(0,0,0,0.4)] border-4 border-white/50">
                <img
                  src={hero}
                  alt="Family travelers with a premium cab overlooking misty mountains at sunrise"
                  width={1920}
                  height={1200}
                  className="w-full h-[500px] md:h-[650px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute left-6 bottom-6 right-6 flex items-center justify-between">
                  <div className="glass-dark rounded-2xl px-5 py-4 text-sm">
                    <p className="font-display font-semibold text-white">Coimbatore → Ooty</p>
                    <p className="text-xs text-white/70">Sunrise departure • Comfort sedan</p>
                  </div>
                  <div className="glass-dark rounded-full px-5 py-3 flex items-center gap-2">
                    <Star className="size-5 text-amber-500 fill-current" />
                    <span className="font-display font-semibold text-white">4.9</span>
                  </div>
                </div>
              </div>
              <div className="absolute -left-8 top-12 glass-dark rounded-2xl px-5 py-4 hidden md:flex items-center gap-3 float-anim shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)]">
                <div className="grid size-10 place-items-center rounded-full bg-accent/20">
                  <ShieldCheck className="size-5 text-accent" />
                </div>
                <span className="text-sm font-semibold text-white">Verified Drivers</span>
              </div>
              <div className="absolute -right-6 bottom-32 glass-dark rounded-2xl px-5 py-4 hidden md:flex items-center gap-3 float-anim shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)]" style={{ animationDelay: "1.5s" }}>
                <div className="grid size-10 place-items-center rounded-full bg-primary/20">
                  <Award className="size-5 text-primary" />
                </div>
                <span className="text-sm font-semibold text-white">20 Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section bg-white">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow">Why choose us</span>
            <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-heading">Rides built on trust, not shortcuts.</h2>
            <p className="mt-4 text-lg text-paragraph">Every journey with RK is measured against the same standard — the comfort of family.</p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, title: "Safety First", desc: "GPS tracked rides and verified professional drivers." },
              { icon: Wallet, title: "Fair Pricing", desc: "Transparent kilometre rates with no hidden fees." },
              { icon: HeadphonesIcon, title: "24×7 Support", desc: "Reach us any time, on any day of the year." },
              { icon: Award, title: "20 Years Trusted", desc: "A legacy built by thousands of return customers." },
            ].map((f) => (
              <div key={f.title} className="card-float p-8 group hover:shadow-[var(--shadow-float)]">
                <div className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <f.icon className="size-7" />
                </div>
                <h3 className="mt-6 font-display font-bold text-xl text-heading">{f.title}</h3>
                <p className="mt-3 text-sm text-paragraph leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLEET */}
      <section className="section bg-surface">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <span className="eyebrow">Our fleet</span>
              <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-heading">A car for every journey.</h2>
            </div>
            <Link to="/tariff" className="btn-ghost">See tariff <ChevronRight className="size-4" /></Link>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {FLEET.map((f) => <FleetCard key={f.name} {...f} />)}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section bg-white">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow">Services</span>
            <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-heading">Every kind of trip. Handled.</h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => {
              const Icon = iconMap[s.icon] ?? MapPinned;
              return (
                <div key={s.title} className="card-float p-8 flex gap-5 group hover:shadow-[var(--shadow-float)]">
                  <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-heading">{s.title}</h3>
                    <p className="mt-2 text-sm text-paragraph leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="section bg-surface">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <span className="eyebrow">Tour packages</span>
              <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-heading">Popular getaways.</h2>
            </div>
            <Link to="/packages" className="btn-ghost">All packages <ChevronRight className="size-4" /></Link>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PACKAGES.slice(0, 6).map((p) => (
              <article key={p.name} className="card-float overflow-hidden group hover:shadow-[var(--shadow-float)]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={destImg[p.image]} alt={p.name} loading="lazy" width={1024} height={768}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-xl text-heading">{p.name}</h3>
                    <span className="text-sm font-semibold text-primary">{p.days}</span>
                  </div>
                  <p className="mt-3 text-sm text-paragraph leading-relaxed">{p.desc}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="font-display font-bold text-2xl text-heading">{p.price}</span>
                    <BookNowButton label="Book" className="!py-2.5 !px-5 text-sm" message={`Hi, I want to book the ${p.name} package`} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TARIFF HIGHLIGHTS */}
      <section className="section bg-white">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow">Tariff highlights</span>
            <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-heading">Transparent kilometre pricing.</h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {FLEET.map((f, i) => (
              <div key={f.name} className={`rounded-3xl p-10 ${i === 1 ? "bg-heading text-white shadow-[0_30px_80px_-30px_rgba(214,40,40,0.4)]" : "card-float hover:shadow-[var(--shadow-float)]"}`}>
                <p className={`text-sm font-semibold ${i === 1 ? "text-primary" : "text-primary"}`}>{f.tag}</p>
                <h3 className={`mt-3 font-display font-bold text-2xl ${i === 1 ? "text-white" : "text-heading"}`}>{f.name}</h3>
                <p className={`mt-8 font-display font-bold text-6xl ${i === 1 ? "text-white" : "text-heading"}`}>{f.rate}</p>
                <p className={`text-sm mt-2 ${i === 1 ? "text-white/70" : "text-paragraph"}`}>Outstation • per km</p>
                <ul className={`mt-8 space-y-3 text-sm ${i === 1 ? "text-white/85" : "text-paragraph"}`}>
                  <li>• {f.passengers} passengers · {f.luggage} bags</li>
                  <li>• Air-conditioned</li>
                  <li>• Experienced driver</li>
                </ul>
                <div className="mt-8">
                  <BookNowButton className={`w-full ${i === 1 ? "" : ""}`} message={`Hi, I want to book a ${f.name}`} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm text-paragraph text-center">
            Note: Other state permits, border taxes, toll gate charges, and parking fees are extra.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-surface overflow-hidden">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow">Customer reviews</span>
            <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-heading">Words from the road.</h2>
          </div>
        </div>
        <div className="mt-16 relative">
          <div className="flex gap-8 marquee w-max px-8">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div key={i} className="w-[380px] shrink-0 card-float p-8 hover:shadow-[var(--shadow-float)]">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.rating)].map((_, k) => <Star key={k} className="size-5 fill-current" />)}
                </div>
                <p className="mt-6 text-sm text-paragraph leading-relaxed">"{t.text}"</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary font-display font-bold text-lg">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-display font-semibold text-heading">{t.name}</p>
                    <p className="text-sm text-paragraph">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY teaser */}
      <section className="section bg-white">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <span className="eyebrow">Gallery</span>
              <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-heading">Snapshots from our journeys.</h2>
            </div>
            <Link to="/gallery" className="btn-ghost">View gallery <ChevronRight className="size-4" /></Link>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[destOoty, destMunnar, destKodai, destMadurai, destRam, destCbe, hero, destOoty].slice(0,8).map((src, i) => (
              <div key={i} className={`overflow-hidden rounded-2xl ${i % 3 === 0 ? "row-span-2" : ""} group`}>
                <img src={src} alt="" loading="lazy" className="size-full object-cover aspect-square hover:scale-110 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING PROCESS */}
      <section className="section bg-surface">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow">Booking process</span>
            <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-heading">Three steps to the road.</h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              { n: "01", t: "Tap Book Now", d: "We open WhatsApp with a ready-to-send message." },
              { n: "02", t: "Confirm details", d: "Share your dates, pickup and car of choice." },
              { n: "03", t: "Travel comfortably", d: "Our driver arrives on time. You enjoy the ride." },
            ].map((s) => (
              <div key={s.n} className="card-float p-10 hover:shadow-[var(--shadow-float)]">
                <p className="font-display font-bold text-6xl text-primary/20">{s.n}</p>
                <h3 className="mt-4 font-display font-bold text-2xl text-heading">{s.t}</h3>
                <p className="mt-3 text-sm text-paragraph leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-white">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <span className="eyebrow">FAQs</span>
            <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-heading">Quick answers.</h2>
            <p className="mt-4 text-lg text-paragraph">Everything about booking, pricing and travel with us.</p>
            <Link to="/faqs" className="btn-ghost mt-8">All FAQs <ChevronRight className="size-4" /></Link>
          </div>
          <div className="space-y-4">
            {FAQS.slice(0, 4).map((f, i) => (
              <details key={i} className="group card-float p-6 open:shadow-[var(--shadow-float)]">
                <summary className="cursor-pointer list-none flex items-center justify-between font-display font-semibold text-heading">
                  {f.q}
                  <span className="text-primary transition-transform group-open:rotate-45 text-2xl">+</span>
                </summary>
                <p className="mt-4 text-sm text-paragraph leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[32px] bg-heading text-white p-12 md:p-20">
            <div aria-hidden className="absolute -right-24 -top-24 size-96 rounded-full bg-primary/40 blur-3xl" />
            <div aria-hidden className="absolute -left-20 bottom-0 size-80 rounded-full bg-accent/30 blur-3xl" />
            <div className="relative max-w-2xl">
              <span className="eyebrow" style={{ color: "#ff8b8b" }}>Ready when you are</span>
              <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl lg:text-6xl">Your next journey starts with a message.</h2>
              <p className="mt-6 text-lg text-white/80 leading-relaxed">Reach us on WhatsApp for instant booking. We'll confirm within minutes.</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <BookNowButton />
                <a href="tel:+918754271868" className="btn-ghost">
                  <Phone className="size-4" /> Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
