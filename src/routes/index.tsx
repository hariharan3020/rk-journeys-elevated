import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ShieldCheck, Wallet, HeadphonesIcon, Award, MapPinned, Star, ChevronRight,
  Plane, Clock, Briefcase, Landmark, Users, Palmtree, HeartHandshake, BusFront, Timer, Phone,
  CheckCircle2, AlertCircle,
} from "lucide-react";
import hero from "@/assets/hero.jpg";
import mobileHero from "@/assets/mobile hero.png";
import newLaunchVideo from "@/assets/WhatsApp Video 2026-07-17 at 11.10.49.mp4";
import { BookNowButton } from "@/components/site/BookNow";
import { FleetCard } from "@/components/site/FleetCard";
import { useSiteContent } from "@/lib/useSiteContent";
import { TESTIMONIALS } from "@/lib/site";
import { PremiumReveal } from "@/components/site/PremiumReveal";

interface ReviewItem { name: string; role: string; text: string; rating: number; }

function getBackendUrl(endpoint: string) {
  const custom = typeof localStorage !== "undefined" ? localStorage.getItem("CUSTOM_BACKEND_URL") : null;
  if (custom) return `${custom}/${endpoint}`;
  if (import.meta.env.DEV) return `http://localhost/rk-journeys-elevated/backend/${endpoint}`;
  const origin = window.location.origin;
  const parts = window.location.pathname.split("/");
  const sub = parts[1] && parts[1] !== "" ? `/${parts[1]}` : "";
  return `${origin}${sub}/backend/${endpoint}`;
}

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

const iconMap = { Plane, Clock, Briefcase, Landmark, Users, Palmtree, HeartHandshake, BusFront, Timer, MapPinned, ShieldCheck, Wallet, HeadphonesIcon, Award } as Record<string, any>;

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
  "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.53.jpeg",
];

function Home() {
  const { content } = useSiteContent();
  const [reviews, setReviews] = useState<ReviewItem[]>(TESTIMONIALS);
  const [formName, setFormName] = useState("");
  const [formRole, setFormRole] = useState("");
  const [formRating, setFormRating] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${getBackendUrl("reviews.php")}?public=1`);
      const data = await res.json();
      if (data.status === "success" && Array.isArray(data.reviews) && data.reviews.length > 0) {
        setReviews(data.reviews.map((r: any) => ({ name: r.name, role: r.role ?? "", text: r.message, rating: r.rating })));
      }
    } catch {}
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(""); setFormSuccess(false); setFormLoading(true);
    try {
      const res = await fetch(getBackendUrl("submit-review.php"), {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName, role: formRole, rating: Number(formRating), message: formMessage }),
      });
      const data = await res.json();
      if (data.status === "success") {
        setFormSuccess(true); setFormName(""); setFormRole(""); setFormRating(""); setFormMessage("");
        await fetchReviews();
        setTimeout(() => setFormSuccess(false), 6000);
      } else { setFormError(data.message || "Failed to submit. Please try again."); }
    } catch { setFormError("Could not connect to the server. Please check your connection."); }
    finally { setFormLoading(false); }
  };

  const marqueeItems = reviews.length > 0 ? [...reviews, ...reviews] : [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden hero-stage">
        <div className="absolute inset-0 -z-10" data-hero-parallax>
          <img src={hero} alt="Scenic mountain road with family travelers" width={1920} height={1080} className="hidden md:block w-full h-full object-cover" />
          <img src={mobileHero} alt="RK Tours and Travels mobile hero" className="block md:hidden w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>
        <div className="container-x relative z-10">
          <div className="pt-24" data-reveal>
            <div className="max-w-4xl fade-up">
              <h1 className="font-display font-bold text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight mb-4">
                {content.hero.headline}
              </h1>
              <p className="font-display font-semibold text-2xl md:text-3xl text-white/90 tracking-widest uppercase mb-6">
                {content.hero.tagline}
              </p>
              <p className="text-xl md:text-2xl text-white/80 font-medium mb-10">
                {content.hero.subtext}
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
      <section className="section premium-section">
        <div className="container-x">
          <PremiumReveal className="max-w-2xl">
            <span className="eyebrow">Why choose us</span>
            <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-heading">Rides built on trust, not shortcuts.</h2>
            <p className="mt-4 text-paragraph">Every journey with RK is measured against the same standard — the comfort of family.</p>
          </PremiumReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4" data-reveal-group>
            {content.whyUs.map((f) => {
              const Icon = iconMap[f.icon] ?? ShieldCheck;
              return (
                <div key={f.title} data-reveal-item className="card-float p-7 group">
                  <div className="glow-icon grid size-13 place-items-center rounded-2xl group-hover:scale-110">
                    <Icon className="size-6 transition-transform group-hover:scale-110" />
                  </div>
                  <h3 className="mt-6 font-display font-bold text-lg text-heading group-hover:text-primary transition-colors">{f.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-paragraph">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FLEET */}
      <section className="section bg-slate-100/60 premium-section">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4" data-reveal>
            <div className="max-w-xl">
              <span className="eyebrow">Our fleet</span>
              <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-heading">A car for every journey.</h2>
            </div>
            <Link to="/tariff" className="btn-ghost">See tariff <ChevronRight className="size-4" /></Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {content.fleet.map((f) => <div key={f.name} data-reveal-item><FleetCard {...f} /></div>)}
          </div>
        </div>
      </section>

      {/* NEWLY LAUNCHED */}
      <section className="section premium-section">
        <div className="container-x">
          <div className="max-w-2xl" data-reveal>
            <span className="eyebrow">Newly Launched</span>
            <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-heading">Experience our latest additions.</h2>
            <p className="mt-4 text-paragraph">Discover our newest vehicles and fleet updates through images and videos.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-reveal-group>
            <div data-reveal-item className="relative rounded-3xl overflow-hidden shadow-premium aspect-video bg-black ring-1 ring-white/10 group">
              <video src={newLaunchVideo} autoPlay loop muted playsInline controls className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div data-reveal-item className="relative rounded-3xl overflow-hidden shadow-premium aspect-video bg-surface ring-1 ring-slate-200 group">
              <img src={content.gallery.images[0]?.src ?? galleryImages[0]} alt="Gallery" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div data-reveal-item data-depth className="relative rounded-3xl overflow-hidden shadow-premium aspect-video bg-surface ring-1 ring-slate-200 group">
              <img src={content.gallery.images[1]?.src ?? galleryImages[1]} alt="Gallery" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section premium-section">
        <div className="container-x">
          <div className="max-w-2xl" data-reveal>
            <span className="eyebrow">Services</span>
            <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-heading">Every kind of trip. Handled.</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {content.services.map((s) => {
              const Icon = iconMap[s.icon] ?? MapPinned;
              return (
                <div key={s.title} data-reveal-item className="card-float p-6 flex gap-4 items-start group">
                  <div className="glow-icon grid size-12 shrink-0 place-items-center rounded-2xl group-hover:scale-110"><Icon className="size-5" /></div>
                  <div>
                    <h3 className="font-display font-bold text-heading text-lg group-hover:text-primary transition-colors">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-paragraph">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TARIFF HIGHLIGHTS */}
      <section className="section premium-section">
        <div className="container-x">
          <div className="max-w-2xl" data-reveal>
            <span className="eyebrow">Tariff highlights</span>
            <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-heading">Transparent kilometre pricing.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3" data-reveal-group>
            {content.fleet.slice(0, 3).map((f, i) => (
              <div key={f.name} data-reveal-item className={`rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 ${i === 1 ? "bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white shadow-2xl shadow-slate-900/30 border border-slate-800" : "card-float"}`}>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${i === 1 ? "bg-blue-500/20 text-blue-300 border border-blue-400/30" : "bg-primary/10 text-primary border border-primary/20"}`}>{f.tag}</span>
                <h3 className={`mt-3 font-display font-bold text-2xl ${i === 1 ? "text-white" : "text-heading"}`}>{f.name}</h3>
                <p className={`mt-6 font-display font-bold text-5xl ${i === 1 ? "text-blue-400" : "text-primary"}`}>{f.rate}</p>
                <p className={`mt-1 text-xs font-semibold uppercase tracking-wider ${i === 1 ? "text-slate-400" : "text-slate-500"}`}>Outstation • per km</p>
                <ul className={`mt-6 space-y-2.5 text-sm font-medium ${i === 1 ? "text-slate-300" : "text-paragraph"}`}>
                  <li className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-primary" /> {f.passengers} passengers · {f.luggage} bags</li>
                  <li className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-primary" /> Air-conditioned</li>
                  <li className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-primary" /> Experienced driver</li>
                </ul>
                <div className="mt-7">
                  <BookNowButton className="w-full justify-center !py-3" message={`Hi, I want to book a ${f.name}`} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center gap-4">
            <p className="text-sm text-paragraph text-center max-w-xl">Note: Other state permits, border taxes, toll gate charges, and parking fees are extra.</p>
            <Link to="/tariff" className="btn-primary">All Tariff</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-slate-100/60 overflow-hidden">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow">Customer reviews</span>
            <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-heading">Words from the road.</h2>
          </div>
        </div>
        <div className="mt-12 relative">
          <div className="flex gap-6 marquee w-max px-6">
            {marqueeItems.map((t, i) => (
              <div key={i} className="w-[350px] shrink-0 card-float p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, k) => <Star key={k} className="size-4 fill-current" />)}
                  </div>
                  <p className="mt-4 text-sm text-paragraph leading-relaxed italic">"{t.text}"</p>
                </div>
                <div className="mt-6 border-t border-slate-100 pt-4 flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-full bg-gradient-to-tr from-primary to-blue-700 text-white font-display font-bold shadow-md shadow-blue-500/20">{t.name[0]}</div>
                  <div>
                    <p className="font-display font-bold text-heading text-sm">{t.name}</p>
                    <p className="text-xs font-medium text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 container-x">
          <div className="max-w-2xl mx-auto card-float p-8 md:p-10 rounded-3xl">
            <h3 className="font-display font-bold text-2xl text-heading mb-6">Share your experience</h3>
            {formSuccess && (
              <div className="mb-5 flex items-start gap-3 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm">
                <CheckCircle2 className="size-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Thank you for your review!</p>
                  <p className="mt-0.5 opacity-80">Your experience has been submitted and will appear here once approved.</p>
                </div>
              </div>
            )}
            {formError && (
              <div className="mb-5 flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                <AlertCircle className="size-5 shrink-0 mt-0.5" /><p>{formError}</p>
              </div>
            )}
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-heading mb-2">Your Name <span className="text-red-500">*</span></label>
                  <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="e.g. Arjun Ramesh"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-heading mb-2">Trip Type <span className="text-paragraph text-xs font-normal">(optional)</span></label>
                  <input type="text" value={formRole} onChange={(e) => setFormRole(e.target.value)} placeholder="e.g. Family Trip, Airport Run"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-heading mb-2">Rating <span className="text-red-500">*</span></label>
                <select value={formRating} onChange={(e) => setFormRating(e.target.value)} required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">Select rating</option>
                  <option value="5">⭐⭐⭐⭐⭐ (5 stars)</option>
                  <option value="4">⭐⭐⭐⭐ (4 stars)</option>
                  <option value="3">⭐⭐⭐ (3 stars)</option>
                  <option value="2">⭐⭐ (2 stars)</option>
                  <option value="1">⭐ (1 star)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-heading mb-2">Your Review <span className="text-red-500">*</span></label>
                <textarea value={formMessage} onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Share your experience with RK Tours..." rows={4} required minLength={10}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
              </div>
              <button type="submit" disabled={formLoading} className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed">
                {formLoading ? "Submitting…" : "Submit Review"}
              </button>
            </form>
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
              { n: "01", t: "Tap Book Now",       d: "We open WhatsApp with a ready-to-send message." },
              { n: "02", t: "Confirm details",    d: "Share your dates, pickup and car of choice." },
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
            {content.faqs.map((f, i) => (
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
