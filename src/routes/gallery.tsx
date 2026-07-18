import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { useState } from "react";
import { X } from "lucide-react";

const GALLERY_IMAGES = [
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

const IMAGES = GALLERY_IMAGES.map((src, i) => ({
  src,
  alt: `Gallery image ${i + 1}`,
  span: i === 0 ? "row-span-2 col-span-2" : i === 2 ? "row-span-2" : i === 5 ? "col-span-2" : ""
}));

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
