import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  ScrollRestoration,
} from "@tanstack/react-router";
import { useEffect } from "react";

import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

function NotFoundComponent() {
  const location = useRouterState({ select: (s) => s.location });
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPath && <Navbar />}
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
      {!isAdminPath && <Footer />}
    </>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    console.error("Root error boundary:", error);
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
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useRouterState({ select: (s) => s.location });
  const isAdminPath = location.pathname.startsWith("/admin");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <QueryClientProvider client={queryClient}>
      {!isAdminPath && <Navbar />}
      <main className="min-h-screen">
        <Outlet />
      </main>
      {!isAdminPath && <Footer />}
    </QueryClientProvider>
  );
}
