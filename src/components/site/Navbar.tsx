import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Car } from "lucide-react";
import { NAV } from "@/lib/site";
import { BookNowButton } from "./BookNow";

export function Navbar({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        transparent
          ? scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-border py-2 shadow-md"
            : "bg-transparent border-none py-3"
          : `bg-white border-b border-border ${scrolled ? "py-2 shadow-md" : "py-3 shadow-sm"}`
      }`}
    >
      <div className="container-x">
        <nav className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/images/logo.png" alt="RK Tours Logo" className="h-16 w-auto" />
          </Link>

          <ul className="hidden lg:flex items-center gap-6 text-base font-semibold">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className="px-3 py-2 transition-colors nav-link-force-black"
                  activeProps={{
                    className: "nav-link-force-black"
                  }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <BookNowButton className="!py-2 !px-4 text-sm" />
            </div>
            <button
              aria-label="Toggle menu"
              className="grid size-10 place-items-center rounded-lg bg-surface text-secondary lg:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className={`lg:hidden fade-up ${
            transparent && !scrolled
              ? "bg-white/95 backdrop-blur-md border-t border-white/20"
              : "bg-white border-t border-border"
          }`}>
            <ul className="grid gap-1 p-4">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="block rounded-lg px-4 py-3 font-medium hover:bg-surface hover:text-primary"
                    style={{ color: '#000000' }}
                    activeProps={{ className: "text-primary bg-surface" }}
                    activeOptions={{ exact: n.to === "/" }}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <BookNowButton className="w-full" />
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
