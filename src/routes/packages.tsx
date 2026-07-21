import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { BookNowButton } from "@/components/site/BookNow";
import { useSiteContent } from "@/lib/useSiteContent";
import destOoty from "@/assets/dest-ooty.jpg";
import destMadurai from "@/assets/dest-madurai.jpg";
import destKodai from "@/assets/dest-kodaikanal.jpg";
import destMunnar from "@/assets/dest-munnar.jpg";
import destRam from "@/assets/dest-rameshwaram.jpg";
import destCbe from "@/assets/dest-coimbatore.jpg";

const IMG: Record<string, string> = { ooty: destOoty, madurai: destMadurai, kodaikanal: destKodai, munnar: destMunnar, rameshwaram: destRam, coimbatore: destCbe };

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Tour Packages — RK Tours and Travels" },
      { name: "description", content: "Ooty, Kodaikanal, Munnar, Madurai, Rameshwaram — handpicked tour packages across South India." },
      { property: "og:title", content: "Tour Packages — RK Tours and Travels" },
      { property: "og:url", content: "/packages" },
    ],
    links: [{ rel: "canonical", href: "/packages" }],
  }),
  component: Packages,
});

/** Resolve package image: uploaded path (starts with /) or legacy key */
function resolvePackageImage(image: string): string {
  if (image.startsWith("/") || image.startsWith("http")) return image;
  return IMG[image] ?? IMG["ooty"];
}

function Packages() {
  const { content } = useSiteContent();
  return (
    <>
      <PageHero
        eyebrow="Tour Packages"
        title="Handpicked getaways across South India."
        subtitle="Comfortable itineraries built around scenic drives, iconic destinations and calm mornings."
      />

      <section className="section pt-0">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.packages.map((p) => (
            <article key={p.name} className="card-float overflow-hidden group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={resolvePackageImage(p.image)}
                  alt={p.name}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-primary">
                  {p.days}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-xl text-heading">{p.name}</h3>
                <p className="mt-2 text-sm text-paragraph">{p.desc}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="font-display font-bold text-heading">{p.price}</span>
                  <BookNowButton label="Book" className="!py-2 !px-4 text-xs" message={`Hi, I want to book the ${p.name} package`} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
