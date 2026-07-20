import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LayoutDashboard, Users, Calendar, Settings, LogOut, Car, Star, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem("isAdminAuthenticated");
    if (auth !== "true") {
      router.navigate({ to: "/admin" });
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    router.navigate({ to: "/admin" });
  };

  if (!isAuthenticated) {
    return null;
  }

  const stats = [
    { label: "Total Bookings", value: "124", icon: Calendar, color: "bg-blue-500" },
    { label: "Active Users", value: "89", icon: Users, color: "bg-green-500" },
    { label: "Fleet Vehicles", value: "5", icon: Car, color: "bg-purple-500" },
    { label: "Reviews", value: "42", icon: Star, color: "bg-amber-500" },
  ];

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="container-x py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="size-6 text-primary" />
            <h1 className="font-display font-bold text-2xl text-heading">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-surface transition"
          >
            <LogOut className="size-4" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </header>

      <div className="container-x py-8">
        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="card-float rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="size-6 text-white" />
                </div>
              </div>
              <p className="text-2xl font-display font-bold text-heading">{stat.value}</p>
              <p className="text-sm text-paragraph">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="card-float rounded-2xl p-6 mb-8">
          <h2 className="font-display font-bold text-xl text-heading mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <button className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-surface transition">
              <Calendar className="size-5 text-primary" />
              <span className="font-medium text-heading">View Bookings</span>
            </button>
            <button className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-surface transition">
              <Car className="size-5 text-primary" />
              <span className="font-medium text-heading">Manage Fleet</span>
            </button>
            <button className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-surface transition">
              <MessageSquare className="size-5 text-primary" />
              <span className="font-medium text-heading">Reviews</span>
            </button>
            <button className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-surface transition">
              <Settings className="size-5 text-primary" />
              <span className="font-medium text-heading">Settings</span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card-float rounded-2xl p-6">
          <h2 className="font-display font-bold text-xl text-heading mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: "New booking received", user: "John Doe", time: "2 minutes ago" },
              { action: "Review submitted", user: "Jane Smith", time: "15 minutes ago" },
              { action: "Fleet updated", user: "Admin", time: "1 hour ago" },
              { action: "User registered", user: "Mike Johnson", time: "3 hours ago" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-surface">
                <div>
                  <p className="font-medium text-heading">{activity.action}</p>
                  <p className="text-sm text-paragraph">{activity.user}</p>
                </div>
                <p className="text-sm text-paragraph">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
