import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck, Wallet, HeadphonesIcon, Award, MapPinned, Star, ChevronRight,
  Plane, Clock, Briefcase, Landmark, Users, Palmtree, HeartHandshake, BusFront, Timer, Phone,
} from "lucide-react";
import hero from "@/assets/hero.jpg";
import mobileHero from "@/assets/mobile hero.png";
import destOoty from "@/assets/dest-ooty.jpg";
import destMadurai from "@/assets/dest-madurai.jpg";
import destKodai from "@/assets/dest-kodaikanal.jpg";
import destMunnar from "@/assets/dest-munnar.jpg";
import destRam from "@/assets/dest-rameshwaram.jpg";
import destCbe from "@/assets/dest-coimbatore.jpg";
import newLaunchVideo from "@/assets/WhatsApp Video 2026-07-17 at 11.10.49.mp4";
import { BookNowButton } from "@/components/site/BookNow";
import { FleetCard } from "@/components/site/FleetCard";
import { Navbar } from "@/components/site/Navbar";
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
const galleryImages = [
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.48.jpeg",
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.49_1.jpeg",
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.49.jpeg",
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.50_1.jpeg",
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.50.jpeg",
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.51_1.jpeg",
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.51.jpeg",
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.52_1.jpeg",
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.52.jpeg",
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.53_1.jpeg",
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.53_2.jpeg",
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.53.jpeg",
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.54_1.jpeg",
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.54.jpeg",
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.55_1.jpeg",
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.55_2.jpeg",
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.55.jpeg",
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.56_1.jpeg",
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.56.jpeg",
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.57_1.jpeg",
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.57_2.jpeg",
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.57.jpeg",
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.58_1.jpeg",
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.58.jpeg",
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.59_1.jpeg",
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.59_2.jpeg",
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.59.jpeg",
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.11.00.jpeg"
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {/* Desktop hero — hidden on mobile */}
          <img
            src={hero}
            alt="Scenic mountain road with family travelers"
            width={1920}
            height={1080}
            className="hidden md:block w-full h-full object-cover"
          />
          {/* Mobile hero — visible only on mobile */}
          <img
            src={mobileHero}
            alt="RK Tours and Travels mobile hero"
            className="block md:hidden w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>
        <div className="container-x relative z-10">
          <div className="pt-24">
            <div className="max-w-4xl fade-up">
              <h1 className="font-display font-bold text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight mb-4">
              R.K. TOURS & TRAVELS
            </h1>
            <p className="font-display font-semibold text-2xl md:text-3xl text-white/90 tracking-widest uppercase mb-6">
              JOURNEY BEYOND DESTINATIONS
            </p>
            <p className="text-xl md:text-2xl text-white/80 font-medium mb-10">
              Safe. Comfortable. Memorable.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <BookNowButton />
              <Link to="/tariff" className="btn-ghost !bg-white/10 !border-white/30 !text-white hover:!bg-white/20 hover:!border-white/50">
                View Tariff <ChevronRight className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: ShieldCheck, text: "Safe & Reliable" },
                { icon: Award, text: "Comfort & Luxury" },
                { icon: HeadphonesIcon, text: "24/7 Service" },
                { icon: MapPinned, text: "Pan India Service" },
              ].map((item) => (
                <div key={item.text} className="glass rounded-2xl px-5 py-4 flex items-center gap-3">
                  <item.icon className="size-6 text-primary" />
                  <span className="font-display font-semibold text-white text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow">Why choose us</span>
            <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-heading">Rides built on trust, not shortcuts.</h2>
            <p className="mt-4 text-paragraph">Every journey with RK is measured against the same standard — the comfort of family.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, title: "Safety First", desc: "GPS tracked rides and verified professional drivers." },
              { icon: Wallet, title: "Fair Pricing", desc: "Transparent kilometre rates with no hidden fees." },
              { icon: HeadphonesIcon, title: "24×7 Support", desc: "Reach us any time, on any day of the year." },
              { icon: Award, title: "20 Years Trusted", desc: "A legacy built by thousands of return customers." },
            ].map((f) => (
              <div key={f.title} className="card-float p-6">
                <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <f.icon className="size-6" />
                </div>
                <h3 className="mt-5 font-display font-bold text-lg text-heading">{f.title}</h3>
                <p className="mt-2 text-sm text-paragraph">{f.desc}</p>
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
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FLEET.map((f) => <FleetCard key={f.name} {...f} />)}
          </div>
        </div>
      </section>

      {/* NEWLY LAUNCHED GALLERY */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow">Newly Launched</span>
            <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-heading">Experience our latest additions.</h2>
            <p className="mt-4 text-paragraph">Discover our newest vehicles and fleet updates through images and videos.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative rounded-2xl overflow-hidden shadow-premium aspect-video bg-black">
              <video
                src={newLaunchVideo}
                autoPlay
                loop
                muted
                playsInline
                controls
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-premium aspect-video bg-surface">
              <img src={galleryImages[0]} alt="Gallery" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-premium aspect-video bg-surface">
              <img src={galleryImages[1]} alt="Gallery" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow">Services</span>
            <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-heading">Every kind of trip. Handled.</h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => {
              const Icon = iconMap[s.icon] ?? MapPinned;
              return (
                <div key={s.title} className="card-float p-6 flex gap-4">
                  <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-heading">{s.title}</h3>
                    <p className="mt-1 text-sm text-paragraph">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* TARIFF HIGHLIGHTS */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow">Tariff highlights</span>
            <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-heading">Transparent kilometre pricing.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {FLEET.slice(0, 3).map((f, i) => (
              <div key={f.name} className={`rounded-3xl p-8 ${i === 1 ? "bg-heading text-white" : "card-float"}`}>
                <p className={`text-sm font-semibold ${i === 1 ? "text-primary" : "text-primary"}`}>{f.tag}</p>
                <h3 className={`mt-2 font-display font-bold text-2xl ${i === 1 ? "text-white" : "text-heading"}`}>{f.name}</h3>
                <p className={`mt-6 font-display font-bold text-5xl ${i === 1 ? "text-white" : "text-heading"}`}>{f.rate}</p>
                <p className={`text-sm ${i === 1 ? "text-white/70" : "text-paragraph"}`}>Outstation • per km</p>
                <ul className={`mt-6 space-y-2 text-sm ${i === 1 ? "text-white/85" : "text-paragraph"}`}>
                  <li>• {f.passengers} passengers · {f.luggage} bags</li>
                  <li>• Air-conditioned</li>
                  <li>• Experienced driver</li>
                </ul>
                <div className="mt-6">
                  <BookNowButton className={`w-full ${i === 1 ? "" : ""}`} message={`Hi, I want to book a ${f.name}`} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-sm text-paragraph text-center">
              Note: Other state permits, border taxes, toll gate charges, and parking fees are extra.
            </p>
            <Link to="/tariff" className="btn-primary">All Tariff</Link>
          </div>
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
        <div className="mt-12 relative">
          <div className="flex gap-6 marquee w-max px-6">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div key={i} className="w-[340px] shrink-0 card-float p-6">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.rating)].map((_, k) => <Star key={k} className="size-4 fill-current" />)}
                </div>
                <p className="mt-4 text-sm text-paragraph leading-relaxed">"{t.text}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary font-display font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-display font-semibold text-heading text-sm">{t.name}</p>
                    <p className="text-xs text-paragraph">{t.role}</p>
                  </div>
                </div>
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
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Tap Book Now", d: "We open WhatsApp with a ready-to-send message." },
              { n: "02", t: "Confirm details", d: "Share your dates, pickup and car of choice." },
              { n: "03", t: "Travel comfortably", d: "Our driver arrives on time. You enjoy the ride." },
            ].map((s) => (
              <div key={s.n} className="card-float p-8">
                <p className="font-display font-bold text-5xl text-primary/20">{s.n}</p>
                <h3 className="mt-3 font-display font-bold text-xl text-heading">{s.t}</h3>
                <p className="mt-2 text-sm text-paragraph">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="eyebrow justify-center">FAQs</span>
            <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-heading">Quick answers.</h2>
            <p className="mt-4 text-paragraph">Everything about booking, pricing and travel with us.</p>
          </div>
          <div className="space-y-3 max-w-3xl mx-auto">
            {FAQS.map((f, i) => (
              <details key={i} className="group card-float p-5 open:shadow-[var(--shadow-float)]">
                <summary className="cursor-pointer list-none flex items-center justify-between font-display font-semibold text-heading">
                  {f.q}
                  <span className="text-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-paragraph">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[28px] bg-primary text-white p-10 md:p-16">
            <div aria-hidden className="absolute -right-20 -top-20 size-80 rounded-full bg-white/20 blur-3xl" />
            <div aria-hidden className="absolute -left-16 bottom-0 size-72 rounded-full bg-white/10 blur-3xl" />
            <div className="relative max-w-2xl">
              <span className="eyebrow" style={{ color: "#ffeb3b" }}>Ready when you are</span>
              <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl">Your next journey starts with a message.</h2>
              <p className="mt-4 text-white/90">Reach us on WhatsApp for instant booking. We'll confirm within minutes.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <BookNowButton />
                <a href="tel:+918754271868" className="btn-ghost !bg-white/10 !border-white/30 !text-white hover:!bg-white/20 hover:!border-white/50">
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
