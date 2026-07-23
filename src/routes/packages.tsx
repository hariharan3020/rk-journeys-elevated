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
            <article key={p.name} className="card-float overflow-hidden group flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                  <img src={resolvePackageImage(p.image)} alt={p.name} loading="lazy" width={1024} height={768}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-95 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />
                  <span className="absolute left-4 top-4 rounded-full bg-gradient-to-r from-red-500 to-red-700 border border-red-400/30 px-3.5 py-1 text-xs font-bold text-white shadow-sm">
                    {p.days}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-red-300 transition-colors">{p.name}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-200/90">{p.desc}</p>
                </div>
              </div>
              <div className="px-6 pb-6">
                <BookNowButton label="Enquire Now" className="w-full justify-center !py-2.5 text-xs !bg-gradient-to-r !from-red-600 !to-red-800 hover:!from-red-500 hover:!to-red-700 !text-white"
                  message={`Hi, I want to enquire about the ${p.name} package`} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
