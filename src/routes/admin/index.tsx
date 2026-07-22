import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, User, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminIndex,
});

function AdminIndex() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const getBackendUrl = (endpoint: string) => {
    // 1. Runtime override (set via browser console for local dev)
    const customUrl = localStorage.getItem("CUSTOM_BACKEND_URL");
    if (customUrl) return `${customUrl.replace(/\/$/, "")}/${endpoint}`;

    // 2. Build-time env variable (set in .env / .env.production)
    const configuredUrl = import.meta.env.VITE_BACKEND_URL;
    if (configuredUrl) return `${configuredUrl.replace(/\/$/, "")}/${endpoint}`;

    // 3. Always fall back to the production backend on the live domain
    return `https://rktoursandtravels.in/backend/${endpoint}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    const endpoint = isRegistering ? "register.php" : "login.php";
    const url = getBackendUrl(endpoint);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const text = await response.text();
      let data: { status?: string; message?: string; user?: { id: number; username: string } };
      try {
        data = JSON.parse(text);
      } catch {
        if (!text.trim()) {
          throw new Error(
            `The backend server is unavailable (HTTP ${response.status}). Start Apache/PHP or configure VITE_BACKEND_URL.`
          );
        }
        throw new Error(`Backend returned a non-JSON response: ${text.substring(0, 100)}`);
      }

      if (response.ok && data.status === "success") {
        if (isRegistering) {
          setSuccessMessage(data.message || "Registration successful! You can now log in.");
          setIsRegistering(false);
          setPassword("");
        } else {
          // Store authentication in localStorage
          localStorage.setItem("isAdminAuthenticated", "true");
          localStorage.setItem(
            "adminUser",
            JSON.stringify({ id: data.user.id, username: data.user.username, role: "admin" })
          );
          // Store password in sessionStorage so the content editor can save without re-prompting
          sessionStorage.setItem("admin_pw_session", password);
          // Redirect to admin dashboard
          router.navigate({ to: "/admin/dashboard" });
        }
      } else {
        setError(data.message || `Failed to ${isRegistering ? "register" : "login"}`);
      }
    } catch (err: any) {
      setError(
        err instanceof TypeError && err.message === "Failed to fetch"
          ? `Unable to reach the backend server at ${getBackendUrl("login.php")}. Check your internet connection or contact support.`
          : err.message || "Failed to connect to the backend server. Please verify database connection."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md">
        <div className="card-float rounded-3xl p-8">
          <div className="text-center mb-8">
            <h1 className="font-display font-bold text-3xl text-heading">
              {isRegistering ? "Admin Register" : "Admin Login"}
            </h1>
            <p className="mt-2 text-paragraph">
              {isRegistering
                ? "Create a new administrator account in the database"
                : "Enter your credentials to access the admin panel"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-heading mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-paragraph" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-heading mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-paragraph" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-paragraph hover:text-primary transition"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-600 text-sm">
                {successMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (isRegistering ? "Registering..." : "Logging in...") : (isRegistering ? "Register" : "Login")}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-paragraph space-y-3">
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError("");
                setSuccessMessage("");
              }}
              className="text-primary hover:underline font-medium"
            >
              {isRegistering
                ? "Already have an account? Login here"
                : "Don't have an admin account? Register here"}
            </button>

            {!isRegistering && (
              <p className="text-xs opacity-75">
                Default credentials (seeded automatically if database is empty): <br />
                <strong>admin</strong> / <strong>admin123</strong>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
