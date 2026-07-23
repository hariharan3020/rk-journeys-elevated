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

function resolvePackageImage(image: string): string {
  if (image.startsWith("/") || image.startsWith("http")) return image;
  return IMG[image] ?? IMG["ooty"];
}

function Packages() {
  const { content } = useSiteContent();
  return (
    <>
      <PageHero eyebrow="Tour Packages" title="Handpicked getaways across South India."
        subtitle="Comfortable itineraries built around scenic drives, iconic destinations and calm mornings." />
      <section className="section pt-0">
        <div className="container-x grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {content.packages.map((p) => (
            <article key={p.name} className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img src={resolvePackageImage(p.image)} alt={p.name} loading="lazy" width={1024} height={768}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 backdrop-blur-md border border-white/60 px-3.5 py-1 text-xs font-bold text-primary shadow-sm">
                    {p.days}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-xl text-slate-900 group-hover:text-primary transition-colors">{p.name}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{p.desc}</p>
                </div>
              </div>
              <div className="px-6 pb-6">
                <BookNowButton label="Enquire Now" className="w-full justify-center !py-2.5 text-xs"
                  message={`Hi, I want to enquire about the ${p.name} package`} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
