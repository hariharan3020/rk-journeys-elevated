import { Users, Luggage, Snowflake, Star } from "lucide-react";
import { BookNowButton } from "./BookNow";
import etios from "@/assets/car-etios.jpg";
import dzire from "@/assets/car-dzire.jpg";
import ciaz from "@/assets/car-ciaz.jpg";
import innovaCrysta from "@/assets/Toyota_Innova_Crysta.png";
import forceTraveller from "@/assets/Force Traveller.png";

const IMAGES: Record<string, string> = { etios, dzire, ciaz, innovaCrysta, forceTraveller };

export function FleetCard({
  name, image, passengers, luggage, ac, tag, rate,
}: {
  name: string;
  image: string;
  passengers: number;
  luggage: number;
  ac: boolean;
  tag: string;
  rate: string;
}) {
  return (
    <article className="card-float overflow-hidden group">
      <div className="relative overflow-hidden bg-surface aspect-[4/3]">
        <img
          src={IMAGES[image]}
          alt={name}
          loading="lazy"
          width={1024}
          height={720}
          className="size-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-secondary shadow-sm">
          {tag}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
          {rate}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-display font-bold text-xl text-heading">{name}</h3>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-paragraph">
          <div className="flex items-center gap-1.5"><Users className="size-4 text-primary" />{passengers} Seats</div>
          <div className="flex items-center gap-1.5"><Luggage className="size-4 text-primary" />{luggage} Bags</div>
          <div className="flex items-center gap-1.5"><Snowflake className="size-4 text-primary" />{ac ? "AC" : "Non-AC"}</div>
        </div>
        <div className="mt-4 flex items-center gap-1 text-amber-500">
          {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-current" />)}
          <span className="ml-2 text-xs text-paragraph">Comfort Rated</span>
        </div>
        <div className="mt-6">
          <BookNowButton
            className="w-full !py-2.5 text-sm"
            message={`Hi, I want to book a ${name}`}
          />
        </div>
      </div>
    </article>
  );
}
