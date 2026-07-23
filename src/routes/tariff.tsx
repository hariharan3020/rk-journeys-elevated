import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { useSiteContent } from "@/lib/useSiteContent";
import { CircleHelp } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/tariff")({
  head: () => ({
    meta: [
      { title: "Tariff — RK Tours and Travels" },
      { name: "description", content: "Transparent kilometre rates for outstation, local and airport trips across all vehicles." },
      { property: "og:title", content: "Tariff — RK Tours and Travels" },
      { property: "og:url", content: "/tariff" },
    ],
    links: [{ rel: "canonical", href: "/tariff" }],
  }),
  component: Tariff,
});

function Tariff() {
  const { content } = useSiteContent();
  const { note, categories, rows } = content.tariff;
  const [category, setCategory] = useState<"outstation" | "local">("outstation");

  useEffect(() => {
    const syncCategory = () => {
      setCategory(window.location.hash === "#local" ? "local" : "outstation");
    };
    syncCategory();
    window.addEventListener("hashchange", syncCategory);
    return () => window.removeEventListener("hashchange", syncCategory);
  }, []);

  const selectCategory = (next: "outstation" | "local") => {
    setCategory(next);
    window.history.replaceState(null, "", `/tariff#${next}`);
  };

  const activeRows = rows[category];

  return (
    <>
      <PageHero eyebrow="Tariff" title={categories[category].label} subtitle={categories[category].description} />
      <section className="section pt-0">
        <div className="container-x space-y-10">
          <div className="mx-auto grid max-w-3xl grid-cols-2 rounded-3xl border border-slate-200/80 bg-slate-100/90 p-2 shadow-inner backdrop-blur-md" role="tablist" aria-label="Tariff categories">
            {([
              { id: "outstation" as const, ...categories.outstation },
              { id: "local" as const, ...categories.local },
            ]).map((tab) => (
              <button key={tab.id} id={tab.id} role="tab" aria-selected={category === tab.id}
                onClick={() => selectCategory(tab.id)}
                className={`rounded-2xl px-5 py-3.5 text-left transition-all duration-300 ${category === tab.id ? "bg-white text-primary shadow-md shadow-slate-200/80 border border-slate-200/60" : "text-slate-600 hover:text-slate-900 hover:bg-white/50"}`}>
                <span className={`block font-display text-sm font-bold ${category === tab.id ? "text-primary" : "text-heading"}`}>{tab.label}</span>
                <span className="mt-0.5 block text-xs text-paragraph">{tab.description}</span>
              </button>
            ))}
          </div>

          <div key={category} className="tariff-table-shell overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-soft">
            <div className="hidden grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 bg-gradient-to-r from-blue-900 to-slate-900 px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider text-white md:grid">
              <span>Vehicle</span><span>Rent/Day</span><span>Free Km/Day</span><span>Fare/Km After Free</span><span>Driver Bata</span><span>Total</span><span>Action</span>
            </div>
            {activeRows.map((row, index) => (
              <div key={`${row.vehicle}-${index}`} className="grid gap-3 border-t border-slate-100 px-5 py-4 text-sm transition-all duration-200 hover:bg-blue-50/50 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr_auto] md:items-center md:gap-4 md:px-6">
                <div className="font-bold text-heading text-base"><span className="mr-2 text-[10px] text-primary md:hidden">VEHICLE</span>{row.vehicle}</div>
                <div className="text-slate-700 font-medium"><span className="mr-2 text-[10px] font-bold uppercase text-primary md:hidden">RENT/DAY</span>{row.rentPerDay ?? "—"}</div>
                <div className="text-slate-700 font-medium"><span className="mr-2 text-[10px] font-bold uppercase text-primary md:hidden">FREE KM/DAY</span>{row.minKm}</div>
                <div className="text-slate-700 font-medium"><span className="mr-2 text-[10px] font-bold uppercase text-primary md:hidden">FARE/KM AFTER FREE</span>{row.farePerKm}</div>
                <div className="text-slate-700 font-medium"><span className="mr-2 text-[10px] font-bold uppercase text-primary md:hidden">DRIVER BATA</span>{row.driverBata}</div>
                <div className="font-bold text-primary text-base"><span className="mr-2 text-[10px] font-bold uppercase text-primary md:hidden">TOTAL</span>{row.amount}</div>
                <a href={`https://wa.me/${content.siteInfo.phoneRaw}?text=${encodeURIComponent(`Hi, I want to enquire about ${row.vehicle} ${category} tariff`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex w-fit items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-blue-700 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30">
                  {row.actionLabel ?? "Book Now"}
                </a>
              </div>
            ))}
          </div>

          {note && (
            <div className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-7 md:p-9 shadow-soft">
              <h2 className="flex items-center gap-2.5 font-display text-lg font-bold text-primary"><CircleHelp className="size-5" /> Terms & Conditions</h2>
              <p className="mt-4 text-sm leading-relaxed text-paragraph"><strong className="text-heading font-display">Note: </strong>{note}</p>
              <ul className="mt-4 grid gap-2.5 text-sm text-paragraph md:grid-cols-2">
                <li className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-primary shrink-0" /> Parking and toll charges are extra.</li>
                <li className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-primary shrink-0" /> Night driving charges may apply.</li>
                <li className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-primary shrink-0" /> Kilometre calculation is based on the agreed route.</li>
                <li className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-primary shrink-0" /> Air conditioning is unavailable while parked.</li>
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
