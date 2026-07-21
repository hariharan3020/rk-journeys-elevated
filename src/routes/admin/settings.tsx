import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Settings, User, Lock, Eye, EyeOff, CheckCircle, AlertTriangle, Save } from "lucide-react";
import { AdminLayout, getBackendUrl } from "@/components/site/AdminLayout";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

interface StoredUser {
  id?: number;
  username?: string;
  role?: string;
}

function SettingsPage() {
  // Lazy useState so it always reads fresh from localStorage on mount
  const [storedUser, setStoredUser] = useState<StoredUser>(() => {
    try {
      return JSON.parse(localStorage.getItem("adminUser") ?? "{}") as StoredUser;
    } catch {
      return {};
    }
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername]           = useState("");
  const [newPassword, setNewPassword]           = useState("");
  const [confirmPassword, setConfirmPassword]   = useState("");
  const [showCurrent, setShowCurrent]           = useState(false);
  const [showNew, setShowNew]                   = useState(false);
  const [showConfirm, setShowConfirm]           = useState(false);
  const [loading, setLoading]                   = useState(false);
  const [success, setSuccess]                   = useState("");
  const [error, setError]                       = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess("");

    // Client-side validation
    if (!currentPassword) { setError("Current password is required."); return; }
    if (!newUsername && !newPassword) { setError("Enter a new username or a new password."); return; }
    if (newPassword && newPassword !== confirmPassword) { setError("New passwords do not match."); return; }
    if (newPassword && newPassword.length < 6) { setError("New password must be at least 6 characters."); return; }

    const currentUsername = storedUser.username ?? "";
    if (!currentUsername) { setError("Session error: username not found. Please log out and log in again."); return; }

    setLoading(true);
    try {
      const body: Record<string, string> = {
        username: currentUsername,
        current_password: currentPassword,
      };
      if (newUsername.trim()) body.new_username = newUsername.trim();
      if (newPassword.trim()) body.new_password = newPassword.trim();

      const res  = await fetch(getBackendUrl("update-credentials.php"), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      // Read raw text first so parse errors are visible
      const text = await res.text();
      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        setError(`Server returned invalid response: ${text.substring(0, 200)}`);
        setLoading(false);
        return;
      }

      if (data.status === "success") {
        // Update localStorage with the new username so sidebar refreshes
        const updatedUser: StoredUser = { ...storedUser, username: data.username };
        localStorage.setItem("adminUser", JSON.stringify(updatedUser));
        setStoredUser(updatedUser);

        setSuccess(`Credentials updated successfully. New username: "${data.username}"`);
        setCurrentPassword("");
        setNewUsername("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(data.message || "Failed to update credentials.");
      }
    } catch (err: any) {
      setError(err.message || "Could not connect to the backend. Make sure XAMPP is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-xl">

        {/* Heading */}
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
            <Settings className="size-5" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl text-heading leading-none">Settings</h1>
            <p className="text-xs text-paragraph mt-0.5">Update your login credentials</p>
          </div>
        </div>

        {/* Current account card */}
        <div className="bg-white rounded-2xl p-5 shadow-soft flex items-center gap-4">
          <div className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary font-display font-bold text-lg shrink-0">
            {(storedUser.username ?? "A")[0].toUpperCase()}
          </div>
          <div>
            <p className="font-display font-semibold text-heading">{storedUser.username ?? "admin"}</p>
            <p className="text-xs text-paragraph mt-0.5">Administrator account</p>
          </div>
        </div>

        {/* Change credentials form */}
        <div className="bg-white rounded-2xl p-6 shadow-soft">
          <h2 className="font-display font-semibold text-heading mb-5">Change Credentials</h2>

          {success && (
            <div className="mb-5 flex items-start gap-3 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm">
              <CheckCircle className="size-5 shrink-0 mt-0.5" />
              <p>{success}</p>
            </div>
          )}
          {error && (
            <div className="mb-5 flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              <AlertTriangle className="size-5 shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Current password — always required */}
            <div>
              <label className="block text-sm font-medium text-heading mb-2">
                Current Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-paragraph" />
                <input
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Your current password"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-paragraph hover:text-primary transition">
                  {showCurrent ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div className="border-t border-border pt-5 space-y-4">
              <p className="text-xs font-semibold text-paragraph uppercase tracking-wider">What would you like to change?</p>

              {/* New username */}
              <div>
                <label className="block text-sm font-medium text-heading mb-2">
                  New Username
                  <span className="ml-1.5 text-xs text-paragraph font-normal">(leave blank to keep current)</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-paragraph" />
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder={storedUser.username ?? "admin"}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    minLength={3}
                    maxLength={50}
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* New password */}
              <div>
                <label className="block text-sm font-medium text-heading mb-2">
                  New Password
                  <span className="ml-1.5 text-xs text-paragraph font-normal">(leave blank to keep current)</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-paragraph" />
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    minLength={6}
                    autoComplete="new-password"
                  />
                  <button type="button" onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-paragraph hover:text-primary transition">
                    {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm new password — only shown when typing a new password */}
              {newPassword && (
                <div>
                  <label className="block text-sm font-medium text-heading mb-2">
                    Confirm New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-paragraph" />
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background ${
                        confirmPassword && confirmPassword !== newPassword ? "border-red-300" : "border-border"
                      }`}
                      autoComplete="new-password"
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-paragraph hover:text-primary transition">
                      {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                  {confirmPassword && confirmPassword !== newPassword && (
                    <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Save className="size-4" />
              {loading ? "Saving…" : "Save Changes"}
            </button>
          </form>
        </div>

        <p className="text-xs text-paragraph text-center">
          After saving, your next login will require the new credentials.
        </p>
      </div>
    </AdminLayout>
  );
}
