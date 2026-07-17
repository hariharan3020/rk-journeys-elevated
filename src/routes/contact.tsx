import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { BookNowButton } from "@/components/site/BookNow";
import { SITE, whatsappUrl } from "@/lib/site";
import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — RK Tours and Travels" },
      { name: "description", content: "Reach RK Tours and Travels via WhatsApp, phone or email. Coimbatore, Tamil Nadu." },
      { property: "og:title", content: "Contact RK Tours and Travels" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi, I'm ${form.name || ""}. ${form.message || "I want to book"}${form.phone ? ` (${form.phone})` : ""}`;
    window.open(whatsappUrl(msg), "_blank");
  };

  return (
    <>
      <PageHero eyebrow="Contact" title="Let's plan your next ride." subtitle="Reach us on WhatsApp for the fastest response, or drop a note below." />

      <section className="section pt-0">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-4">
            <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="card-float p-6 flex items-center gap-4 group">
              <div className="grid size-12 place-items-center rounded-2xl bg-accent/10 text-accent">
                <MessageCircle className="size-5" />
              </div>
              <div>
                <p className="font-display font-semibold text-heading">WhatsApp</p>
                <p className="text-sm text-paragraph">{SITE.phone}</p>
              </div>
            </a>
            <a href={`tel:+${SITE.phoneRaw}`} className="card-float p-6 flex items-center gap-4">
              <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary"><Phone className="size-5" /></div>
              <div>
                <p className="font-display font-semibold text-heading">Phone</p>
                <p className="text-sm text-paragraph">{SITE.phone}</p>
              </div>
            </a>
            <a href={`mailto:${SITE.email}`} className="card-float p-6 flex items-center gap-4">
              <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary"><Mail className="size-5" /></div>
              <div>
                <p className="font-display font-semibold text-heading">Email</p>
                <p className="text-sm text-paragraph break-all">{SITE.email}</p>
              </div>
            </a>
            <div className="card-float p-6 flex items-center gap-4">
              <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary"><MapPin className="size-5" /></div>
              <div>
                <p className="font-display font-semibold text-heading">Location</p>
                <p className="text-sm text-paragraph">{SITE.city}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-12 place-items-center rounded-full bg-heading text-white hover:bg-primary transition">
                <Instagram className="size-4" />
              </a>
              <a href={SITE.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid size-12 place-items-center rounded-full bg-heading text-white hover:bg-primary transition">
                <Facebook className="size-4" />
              </a>
            </div>
          </div>

          <form onSubmit={onSubmit} className="card-float p-8">
            <h2 className="font-display font-bold text-2xl text-heading">Send us a message</h2>
            <p className="mt-2 text-sm text-paragraph">We reply within minutes on WhatsApp.</p>
            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-heading">Name</span>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-heading">Phone</span>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-1 w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-heading">Message</span>
                <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1 w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </label>
              <button type="submit" className="btn-primary w-full">
                <MessageCircle className="size-4" /> Send on WhatsApp
              </button>
            </div>
          </form>
        </div>

        <div className="container-x mt-12">
          <div className="overflow-hidden rounded-3xl card-float">
            <iframe
              title="Our location"
              src={SITE.mapEmbed}
              className="w-full h-[400px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="container-x mt-12 text-center">
          <BookNowButton label="Chat on WhatsApp Now" />
        </div>
      </section>
    </>
  );
}
