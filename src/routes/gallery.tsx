import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { useState } from "react";
import { X } from "lucide-react";
import hero from "@/assets/hero.jpg";
import destOoty from "@/assets/dest-ooty.jpg";
import destMadurai from "@/assets/dest-madurai.jpg";
import destKodai from "@/assets/dest-kodaikanal.jpg";
import destMunnar from "@/assets/dest-munnar.jpg";
import destRam from "@/assets/dest-rameshwaram.jpg";
import destCbe from "@/assets/dest-coimbatore.jpg";
import etios from "@/assets/car-etios.jpg";
import dzire from "@/assets/car-dzire.jpg";
import ciaz from "@/assets/car-ciaz.jpg";

const IMAGES = [
  { src: hero, alt: "Family with car on scenic mountain road", span: "row-span-2 col-span-2" },
  { src: destOoty, alt: "Ooty tea plantations" },
  { src: destMunnar, alt: "Munnar tea hills", span: "row-span-2" },
  { src: destKodai, alt: "Kodaikanal misty valley" },
  { src: destMadurai, alt: "Madurai temple" },
  { src: destRam, alt: "Rameshwaram bridge", span: "col-span-2" },
  { src: destCbe, alt: "Coimbatore temple" },
  { src: etios, alt: "Toyota Etios" },
  { src: dzire, alt: "Swift Dzire" },
  { src: ciaz, alt: "Maruti Ciaz" },
];

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — RK Tours and Travels" },
      { name: "description", content: "Snapshots from our journeys across India — fleet, destinations and moments." },
      { property: "og:title", content: "Gallery — RK Tours and Travels" },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

function Gallery() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <>
      <PageHero eyebrow="Gallery" title="Moments from the road." subtitle="A visual diary of our fleet, tours and travelers." />

      <section className="section pt-0">
        <div className="container-x">
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3">
            {IMAGES.map((img, i) => (
              <button
                key={i}
                onClick={() => setOpen(img.src)}
                className={`group overflow-hidden rounded-2xl relative ${img.span ?? ""}`}
                aria-label={`Open ${img.alt}`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {open && (
        <div
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[100] bg-black/85 grid place-items-center p-4 fade-up"
        >
          <button aria-label="Close" className="absolute top-6 right-6 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <X />
          </button>
          <img src={open} alt="" className="max-h-[86vh] max-w-full rounded-2xl object-contain" />
        </div>
      )}
    </>
  );
}
