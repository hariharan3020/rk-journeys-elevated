import { Link, useRouterState, useRouter } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  LayoutDashboard, Star, Settings, LogOut, Menu, X, ChevronRight, Edit3,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/admin/dashboard", label: "Dashboard",        icon: LayoutDashboard },
  { to: "/admin/reviews",   label: "Customer Reviews", icon: Star            },
  { to: "/admin/content",   label: "Content Editor",   icon: Edit3           },
  { to: "/admin/settings",  label: "Settings",         icon: Settings        },
];

function getBackendUrl(endpoint: string) {
  const custom = typeof localStorage !== "undefined" ? localStorage.getItem("CUSTOM_BACKEND_URL") : null;
  if (custom) return `${custom.replace(/\/$/, "")}/${endpoint}`;
  const configuredUrl = import.meta.env.VITE_BACKEND_URL;
  if (configuredUrl) return `${configuredUrl.replace(/\/$/, "")}/${endpoint}`;
  // Fall back to relative /backend path
  return `/backend/${endpoint}`;
}

export { getBackendUrl };

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem("isAdminAuthenticated");
    if (auth !== "true") {
      router.navigate({ to: "/admin" });
      return;
    }
    try {
      const u = localStorage.getItem("adminUser");
      if (u) setAdminUser(JSON.parse(u));
    } catch {}
  }, [router]);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    localStorage.removeItem("adminUser");
    router.navigate({ to: "/admin" });
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-5 pt-6 pb-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-xl bg-primary text-white font-display font-bold text-sm shrink-0">
            RK
          </div>
          <div>
            <p className="font-display font-bold text-heading text-sm leading-none">Admin Panel</p>
            <p className="text-xs text-paragraph mt-0.5 leading-none truncate max-w-[140px]">
              {adminUser?.username ?? "admin"}
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || (to === "/admin/dashboard" && pathname === "/admin/dashboard");
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? "bg-primary text-white shadow-sm"
                  : "text-paragraph hover:bg-surface hover:text-heading"
              }`}
            >
              <Icon className="size-4 shrink-0" />
              {label}
              {active && <ChevronRight className="size-3.5 ml-auto opacity-70" />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-5 pt-2 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut className="size-4 shrink-0" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface flex">
      {/* ── Desktop sidebar ─────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-60 bg-background border-r border-border shrink-0 sticky top-0 h-screen overflow-y-auto">
        <SidebarContent />
      </aside>

      {/* ── Mobile sidebar overlay ───────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-background border-r border-border flex flex-col lg:hidden
          transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 grid size-8 place-items-center rounded-lg bg-surface text-paragraph hover:text-heading"
          aria-label="Close menu"
        >
          <X className="size-4" />
        </button>
        <SidebarContent />
      </aside>

      {/* ── Main area ────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="lg:hidden sticky top-0 z-30 bg-background border-b border-border h-14 flex items-center px-4 gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="grid size-9 place-items-center rounded-lg bg-surface text-heading"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
          {/* Active page title */}
          <p className="font-display font-semibold text-heading text-sm">
            {NAV_ITEMS.find((n) => n.to === pathname)?.label ?? "Admin"}
          </p>
          <button
            onClick={handleLogout}
            className="ml-auto grid size-9 place-items-center rounded-lg bg-surface text-red-500 hover:bg-red-50"
            aria-label="Logout"
          >
            <LogOut className="size-4" />
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
