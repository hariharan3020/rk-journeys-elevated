import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import { SITE, NAV, whatsappUrl } from "@/lib/site";
import logo from "@/assets/logo.png";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C9.28 2 8.94 2.01 7.84 2.06C6.75 2.11 6 2.31 5.34 2.57C4.66 2.83 4.07 3.2 3.49 3.79C2.9 4.38 2.53 4.97 2.26 5.65C2 6.31 1.8 7.06 1.75 8.16C1.7 9.25 1.69 9.59 1.69 12.31C1.69 15.03 1.7 15.37 1.75 16.46C1.8 17.56 2 18.3 2.26 18.96C2.53 19.64 2.9 20.24 3.49 20.82C4.08 21.41 4.67 21.78 5.34 22.04C6.01 22.3 6.75 22.5 7.84 22.55C8.94 22.6 9.28 22.61 12 22.61C14.72 22.61 15.06 22.6 16.16 22.55C17.25 22.5 17.99 22.3 18.66 22.04C19.34 21.78 19.93 21.41 20.51 20.82C21.1 20.23 21.47 19.64 21.74 18.96C22 18.3 22.2 17.56 22.25 16.46C22.3 15.37 22.31 15.03 22.31 12.31C22.31 9.59 22.3 9.25 22.25 8.16C22.2 7.06 22 6.31 21.74 5.65C21.47 4.97 21.1 4.38 20.51 3.79C19.92 3.2 19.33 2.83 18.66 2.57C17.99 2.31 17.25 2.11 16.16 2.06C15.06 2.01 14.72 2 12 2ZM12 4.04C14.67 4.04 14.99 4.05 16.07 4.1C17 4.14 17.5 4.3 17.84 4.43C18.28 4.6 18.6 4.8 18.93 5.14C19.27 5.48 19.47 5.79 19.64 6.24C19.77 6.58 19.93 7.08 19.97 8.01C20.02 9.09 20.03 9.4 20.03 12.08C20.03 14.76 20.02 15.08 19.97 16.15C19.93 17.09 19.77 17.59 19.64 17.93C19.47 18.37 19.27 18.69 18.93 19.03C18.59 19.36 18.28 19.57 17.84 19.74C17.5 19.87 17 20.03 16.07 20.07C14.99 20.12 14.67 20.13 12 20.13C9.33 20.13 9.01 20.12 7.93 20.07C6.99 20.03 6.49 19.87 6.16 19.74C5.72 19.57 5.4 19.37 5.07 19.03C4.73 18.7 4.53 18.38 4.36 17.93C4.23 17.59 4.07 17.09 4.03 16.15C3.98 15.08 3.97 14.76 3.97 12.08C3.97 9.4 3.98 9.09 4.03 8.01C4.07 7.08 4.23 6.58 4.36 6.24C4.53 5.8 4.73 5.48 5.07 5.14C5.41 4.8 5.72 4.6 6.16 4.43C6.49 4.3 6.99 4.14 7.93 4.1C9.01 4.05 9.33 4.04 12 4.04ZM12 6.89C9.17 6.89 6.88 9.18 6.88 12.01C6.88 14.84 9.17 17.13 12 17.13C14.83 17.13 17.12 14.84 17.12 12.01C17.12 9.18 14.83 6.89 12 6.89ZM12 15.3C10.18 15.3 8.71 13.83 8.71 12C8.71 10.17 10.18 8.7 12 8.7C13.82 8.7 15.29 10.17 15.29 12C15.29 13.83 13.82 15.3 12 15.3ZM17.65 7.64C17.65 8.32 17.1 8.87 16.42 8.87C15.74 8.87 15.19 8.32 15.19 7.64C15.19 6.96 15.74 6.41 16.42 6.41C17.1 6.41 17.65 6.96 17.65 7.64Z" fill="url(#instagram-gradient)"/>
    <defs>
      <linearGradient id="instagram-gradient" x1="2.25" y1="22.25" x2="21.75" y2="1.75" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FEDA75"/>
        <stop offset="0.25" stopColor="#FA7E1E"/>
        <stop offset="0.5" stopColor="#D62976"/>
        <stop offset="0.75" stopColor="#962FBF"/>
        <stop offset="1" stopColor="#4F5BD5"/>
      </linearGradient>
    </defs>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M24 12.07C24 5.41 18.63 0 12 0C5.37 0 0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24V15.56H7.08V12.07H10.13V9.41C10.13 6.38 11.93 4.73 14.65 4.73C15.95 4.73 17.33 4.96 17.33 4.96V7.91H15.82C14.33 7.91 13.87 8.84 13.87 9.8V12.07H17.2L16.67 15.56H13.87V24C19.61 23.1 24 18.1 24 12.07Z" fill="#1877F2"/>
    <path d="M16.67 15.56L17.2 12.07H13.87V9.8C13.87 8.84 14.33 7.91 15.82 7.91H17.33V4.96C17.33 4.96 15.95 4.73 14.65 4.73C11.93 4.73 10.13 6.38 10.13 9.41V12.07H7.08V15.56H10.13V24C10.75 24.1 11.37 24.15 12 24.15C12.63 24.15 13.25 24.1 13.87 24V15.56H16.67Z" fill="white"/>
  </svg>
);

export function Footer() {
  return (
    <footer className="mt-24 bg-[#0A0D14] text-white/70 border-t border-white/10 relative overflow-hidden">
      {/* Subtle background glow effect */}
      <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-x py-12 relative z-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <img src={logo} alt="RK Tours Logo" className="h-20 w-auto drop-shadow-md" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-sm text-white/60">
              Elevating your travel experience. We provide premium cab and tour services across India, built on 20 years of trust, comfort, and reliability.
            </p>
            <div className="mt-6 flex gap-4">
              <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-10 place-items-center rounded-full bg-white/5 hover:bg-white/10 hover:scale-110 transition-all duration-300">
                <InstagramIcon className="size-5" />
              </a>
              <a href={SITE.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid size-10 place-items-center rounded-full bg-white/5 hover:bg-white/10 hover:scale-110 transition-all duration-300">
                <FacebookIcon className="size-5" />
              </a>
              <a href={`mailto:${SITE.email}`} aria-label="Email" className="grid size-10 place-items-center rounded-full bg-white/5 hover:bg-white/10 hover:scale-110 text-white transition-all duration-300">
                <Mail className="size-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white tracking-wide uppercase text-xs">Explore</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-white transition-colors duration-300">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white tracking-wide uppercase text-xs">Services</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/tariff" className="hover:text-white transition-colors duration-300">Outstation Cabs</Link></li>
              <li><Link to="/packages" className="hover:text-white transition-colors duration-300">Tour Packages</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors duration-300">Airport Transfers</Link></li>
              <li><Link to="/book" className="hover:text-white font-medium text-primary transition-colors duration-300">Book a Ride</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white tracking-wide uppercase text-xs">Contact Us</h4>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
                  <Phone className="size-5 text-white/50 group-hover:text-primary transition-colors duration-300" />
                  <span className="group-hover:text-white transition-colors duration-300 text-[15px]">{SITE.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 group">
                  <Mail className="size-5 text-white/50 group-hover:text-primary transition-colors duration-300" />
                  <span className="group-hover:text-white transition-colors duration-300 text-[15px]">{SITE.email}</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="size-5 text-white/50 shrink-0" />
                <span className="text-white/70 text-[15px]">{SITE.city}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 relative z-10">
        <div className="container-x py-5 flex flex-col-reverse md:flex-row gap-4 items-center justify-between text-xs text-white/40">
          <p>© {new Date().getFullYear()} RK Tours and Travels. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
