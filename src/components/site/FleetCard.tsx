import { Users, Luggage, Snowflake, Star } from "lucide-react";
import { BookNowButton } from "./BookNow";
import etios from "@/assets/car-etios.jpg";
import dzire from "@/assets/car-dzire.jpg";
import ciaz from "@/assets/car-ciaz.jpg";
import innovaCrysta from "@/assets/Toyota_Innova_Crysta.png";
import forceTraveller from "@/assets/Force Traveller.png";

const IMAGES: Record<string, string> = { etios, dzire, ciaz, innovaCrysta, forceTraveller };

function resolveFleetImage(image: string): string {
  if (image.startsWith("/") || image.startsWith("http")) return image;
  return IMAGES[image] ?? etios;
}

export function FleetCard({
  name, image, passengers, luggage, ac, tag, rate, rateVisible = true,
}: {
  name: string;
  image: string;
  passengers: number;
  luggage: number;
  ac: boolean;
  tag: string;
  rate: string;
  rateVisible?: boolean;
}) {
  return (
    <article className="card-float overflow-hidden group">
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-100/90 via-slate-50 to-white aspect-[4/3] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,110,189,0.08)_0%,transparent_75%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <img
          src={resolveFleetImage(image)}
          alt={name}
          loading="lazy"
          width={1024}
          height={720}
          className="size-full object-contain p-4 drop-shadow-md transition-all duration-700 group-hover:scale-108 group-hover:-translate-y-1"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 px-3.5 py-1 text-xs font-bold text-slate-800 shadow-sm">
          {tag}
        </span>
        {rateVisible && rate.trim() && (
          <span className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-primary to-blue-700 px-3.5 py-1 text-xs font-bold text-white shadow-md shadow-blue-500/20">
            {rate}
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-display font-bold text-xl text-white group-hover:text-cyan-300 transition-colors">{name}</h3>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs font-medium text-slate-200">
          <div className="flex items-center justify-center gap-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 py-2 px-2 transition-all group-hover:bg-white/20 group-hover:border-cyan-400/40 group-hover:text-white">
            <Users className="size-3.5 text-cyan-400 shrink-0" />
            <span>{passengers} Seats</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 py-2 px-2 transition-all group-hover:bg-white/20 group-hover:border-cyan-400/40 group-hover:text-white">
            <Luggage className="size-3.5 text-cyan-400 shrink-0" />
            <span>{luggage} Bags</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 py-2 px-2 transition-all group-hover:bg-white/20 group-hover:border-cyan-400/40 group-hover:text-white">
            <Snowflake className="size-3.5 text-cyan-400 shrink-0" />
            <span>{ac ? "AC" : "Non-AC"}</span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3.5 text-xs text-slate-300">
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => <Star key={i} className="size-3.5 fill-current" />)}
            <span className="ml-1.5 font-semibold text-white">5.0</span>
          </div>
          <span className="font-medium text-slate-300">Comfort Rated</span>
        </div>
        <div className="mt-5">
          <BookNowButton
            label="Enquire Now"
            className="w-full !py-2.5 text-sm !bg-gradient-to-r !from-cyan-500 !to-blue-600 hover:!from-cyan-400 hover:!to-blue-500 !text-white !shadow-lg !shadow-blue-900/40"
            message={`Hi, I want to book a ${name}`}
          />
        </div>
      </div>
    </article>
  );
}
