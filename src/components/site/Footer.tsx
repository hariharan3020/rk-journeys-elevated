import { Link } from "@tanstack/react-router";
import { Car, Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";
import { SITE, NAV, whatsappUrl } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 bg-[#141414] text-white/80">
      <div className="container-x py-16 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-full bg-primary">
              <Car className="size-4 text-white" aria-hidden />
            </span>
            <span className="font-display font-bold text-white text-lg">
              RK Tours & Travels
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed">
            Premium cab & tour service based in Coimbatore. Trusted for 20 years across India.
          </p>
          <div className="mt-5 flex gap-3">
            <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-10 place-items-center rounded-full bg-white/10 hover:bg-primary transition">
              <Instagram className="size-4" />
            </a>
            <a href={SITE.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid size-10 place-items-center rounded-full bg-white/10 hover:bg-primary transition">
              <Facebook className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-white transition">{n.label}</Link>
              </li>
            ))}
            <li><Link to="/book" className="hover:text-white">Book Now</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white">Legal</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2"><Phone className="size-4 mt-0.5" /><a href={whatsappUrl()} target="_blank" rel="noreferrer">{SITE.phone}</a></li>
            <li className="flex items-start gap-2"><Mail className="size-4 mt-0.5" /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li className="flex items-start gap-2"><MapPin className="size-4 mt-0.5" />{SITE.city}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 flex flex-col md:flex-row gap-2 items-center justify-between text-xs text-white/50">
          <p>© {new Date().getFullYear()} RK Tours and Travels. All rights reserved.</p>
          <p>Crafted with care for travelers across India.</p>
        </div>
      </div>
    </footer>
  );
}
