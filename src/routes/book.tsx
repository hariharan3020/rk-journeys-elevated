import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { BookNowButton } from "@/components/site/BookNow";
import { FLEET, whatsappUrl } from "@/lib/site";
import { useState } from "react";
import { MessageCircle } from "lucide-react";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book Now — RK Tours and Travels" },
      { name: "description", content: "Book your ride in seconds via WhatsApp. Choose your car, pickup and dates." },
      { property: "og:title", content: "Book Now — RK Tours and Travels" },
      { property: "og:url", content: "/book" },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
  component: Book,
});

function Book() {
  const [form, setForm] = useState({
    name: "", phone: "", car: "Toyota Etios", pickup: "", drop: "", date: "", trip: "Outstation",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi, I want to book:
• Name: ${form.name}
• Phone: ${form.phone}
• Trip: ${form.trip}
• Car: ${form.car}
• Pickup: ${form.pickup}
• Drop: ${form.drop}
• Date: ${form.date}`;
    window.open(whatsappUrl(msg), "_blank");
  };

  const input = "mt-1 w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <>
      <PageHero eyebrow="Book Now" title="Book your ride in seconds." subtitle="Fill in your trip details — we'll open WhatsApp with a ready message." />

      <section className="section pt-0">
        <div className="container-x max-w-3xl">
          <form onSubmit={submit} className="card-float p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-heading">Name</span>
                <input required className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-heading">Phone</span>
                <input required className={input} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-heading">Trip Type</span>
                <select className={input} value={form.trip} onChange={(e) => setForm({ ...form, trip: e.target.value })}>
                  <option>Outstation</option>
                  <option>Airport Transfer</option>
                  <option>Local Rental</option>
                  <option>Tour Package</option>
                  <option>Corporate</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium text-heading">Car</span>
                <select className={input} value={form.car} onChange={(e) => setForm({ ...form, car: e.target.value })}>
                  {FLEET.map((f) => <option key={f.name}>{f.name}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium text-heading">Pickup</span>
                <input required className={input} value={form.pickup} onChange={(e) => setForm({ ...form, pickup: e.target.value })} />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-heading">Drop</span>
                <input className={input} value={form.drop} onChange={(e) => setForm({ ...form, drop: e.target.value })} />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-heading">Date</span>
                <input type="date" required className={input} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </label>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="submit" className="btn-primary">
                <MessageCircle className="size-4" /> Send Booking on WhatsApp
              </button>
              <BookNowButton label="Quick Book" variant="ghost" />
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
