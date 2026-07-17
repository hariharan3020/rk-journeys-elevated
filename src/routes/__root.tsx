import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

function NotFoundComponent() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen grid place-items-center px-6 pt-32">
        <div className="max-w-lg text-center">
          <p className="eyebrow justify-center">404 — Lost on the road</p>
          <h1 className="mt-4 font-display font-bold text-6xl md:text-7xl text-heading">
            Wrong turn.
          </h1>
          <p className="mt-4 text-paragraph">
            The page you're looking for has taken a detour. Let's get you back to smoother roads.
          </p>
          <div className="mt-8 flex justify-center gap-3 flex-wrap">
            <Link to="/" className="btn-primary">Back to Home</Link>
            <Link to="/contact" className="btn-ghost">Contact Us</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl font-bold text-heading">Something went wrong</h1>
        <p className="mt-2 text-paragraph">Try refreshing, or return home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-primary">Try again</button>
          <a href="/" className="btn-ghost">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "RK Tours and Travels — Premium Cab & Tour Service in Coimbatore" },
      {
        name: "description",
        content:
          "Safe, affordable and comfortable cab service across India. Airport transfers, outstation trips, tour packages and 24×7 rides — trusted for 20 years.",
      },
      { name: "author", content: "RK Tours and Travels" },
      { name: "theme-color", content: "#D62828" },
      { property: "og:title", content: "RK Tours and Travels — Premium Cab & Tour Service" },
      { property: "og:description", content: "Explore India comfortably. Trusted premium cab & tour service based in Coimbatore." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "RK Tours and Travels" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "RK Tours and Travels",
          image: "",
          telephone: "+91-87542-71868",
          email: "rktoursandtravels.01@gmail.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Coimbatore",
            addressRegion: "Tamil Nadu",
            addressCountry: "IN",
          },
          areaServed: "IN",
          priceRange: "₹₹",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
