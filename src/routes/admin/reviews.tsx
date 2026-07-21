import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import {
  Star, CheckCircle, XCircle, Trash2, RefreshCw,
  Clock, Edit2, Save, X, AlertTriangle,
  ThumbsUp, ThumbsDown, Inbox,
} from "lucide-react";
import { AdminLayout, getBackendUrl } from "@/components/site/AdminLayout";

export const Route = createFileRoute("/admin/reviews")({
  component: ReviewsPage,
});

interface Review {
  id: number; name: string; email: string | null; role: string | null;
  message: string; rating: number; status: "pending" | "approved" | "rejected"; created_at: string;
}
interface Counts { all: number; pending: number; approved: number; rejected: number; }
type StatusFilter = "all" | "pending" | "approved" | "rejected";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((n) => (
        <Star key={n} className={`size-3.5 ${n <= rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} />
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: Review["status"] }) {
  const styles = { pending: "bg-amber-50 text-amber-700 border-amber-200", approved: "bg-green-50 text-green-700 border-green-200", rejected: "bg-red-50 text-red-600 border-red-200" };
  const icons  = { pending: <Clock className="size-3" />, approved: <CheckCircle className="size-3" />, rejected: <XCircle className="size-3" /> };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {icons[status]} {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function ReviewRow({ review, onStatusChange, onDelete, onEdit }: {
  review: Review;
  onStatusChange: (id: number, s: Review["status"]) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, fields: Partial<Review>) => Promise<void>;
}) {
  const [editing, setEditing]         = useState(false);
  const [editName, setEditName]       = useState(review.name);
  const [editRole, setEditRole]       = useState(review.role ?? "");
  const [editMessage, setEditMessage] = useState(review.message);
  const [editRating, setEditRating]   = useState(review.rating);
  const [saving, setSaving]           = useState(false);

  const save   = async () => { setSaving(true); await onEdit(review.id, { name: editName, role: editRole, message: editMessage, rating: editRating }); setSaving(false); setEditing(false); };
  const cancel = () => { setEditName(review.name); setEditRole(review.role ?? ""); setEditMessage(review.message); setEditRating(review.rating); setEditing(false); };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-soft space-y-3">
      <div className="flex flex-wrap items-start gap-3 justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="grid size-9 place-items-center rounded-full bg-primary/10 text-primary font-display font-bold text-sm shrink-0">
            {review.name[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            {editing ? (
              <div className="flex flex-wrap gap-2">
                <input value={editName} onChange={(e) => setEditName(e.target.value)} className="px-2 py-1 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Name" />
                <input value={editRole} onChange={(e) => setEditRole(e.target.value)} className="px-2 py-1 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Trip type" />
              </div>
            ) : (
              <>
                <p className="font-display font-semibold text-heading text-sm truncate">{review.name}</p>
                {review.role && <p className="text-xs text-paragraph">{review.role}</p>}
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <StatusBadge status={review.status} />
          <span className="text-xs text-paragraph">{new Date(review.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
        </div>
      </div>

      {editing ? (
        <div className="flex items-center gap-2">
          <span className="text-xs text-paragraph">Rating:</span>
          <select value={editRating} onChange={(e) => setEditRating(Number(e.target.value))} className="px-2 py-1 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary">
            {[5,4,3,2,1].map((n) => <option key={n} value={n}>{n} star{n !== 1 ? "s" : ""}</option>)}
          </select>
        </div>
      ) : <StarRating rating={review.rating} />}

      {editing ? (
        <textarea value={editMessage} onChange={(e) => setEditMessage(e.target.value)} rows={3}
          className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
      ) : <p className="text-sm text-paragraph leading-relaxed">"{review.message}"</p>}

      {review.email && !editing && <p className="text-xs text-paragraph opacity-70">📧 {review.email}</p>}

      <div className="flex flex-wrap items-center gap-2 pt-1">
        {editing ? (
          <>
            <button onClick={save} disabled={saving} className="btn-primary !py-1.5 !px-3 !text-sm gap-1.5 disabled:opacity-60"><Save className="size-3.5" />{saving ? "Saving…" : "Save"}</button>
            <button onClick={cancel} className="btn-ghost !py-1.5 !px-3 !text-sm gap-1.5"><X className="size-3.5" />Cancel</button>
          </>
        ) : (
          <>
            {review.status !== "approved" && <button onClick={() => onStatusChange(review.id, "approved")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition"><ThumbsUp className="size-3.5" />Approve</button>}
            {review.status !== "rejected" && <button onClick={() => onStatusChange(review.id, "rejected")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-600 border border-red-200 hover:bg-red-50 transition"><ThumbsDown className="size-3.5" />Reject</button>}
            {review.status !== "pending"  && <button onClick={() => onStatusChange(review.id, "pending")}  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition"><Clock className="size-3.5" />Pending</button>}
            <button onClick={() => setEditing(true)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-surface text-paragraph border border-border hover:border-primary hover:text-primary transition"><Edit2 className="size-3.5" />Edit</button>
            <button onClick={() => onDelete(review.id)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 border border-red-100 hover:bg-red-50 hover:border-red-300 transition ml-auto"><Trash2 className="size-3.5" />Delete</button>
          </>
        )}
      </div>
    </div>
  );
}

function ReviewsPage() {
  const [reviews, setReviews]           = useState<Review[]>([]);
  const [counts, setCounts]             = useState<Counts>({ all: 0, pending: 0, approved: 0, rejected: 0 });
  const [filter, setFilter]             = useState<StatusFilter>("all");
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState("");
  const [toast, setToast]               = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const showToast = useCallback((msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 3500);
  }, []);

  const fetchReviews = useCallback(async (f: StatusFilter = filter) => {
    setLoading(true); setError("");
    try {
      const res = await fetch(`${getBackendUrl("reviews.php")}?status=${f}`);
      const data = await res.json();
      if (data.status === "success") { setReviews(data.reviews ?? []); if (data.counts) setCounts(data.counts); }
      else setError(data.message || "Failed to load reviews.");
    } catch { setError("Cannot reach the backend."); }
    finally { setLoading(false); }
  }, [filter]);

  useEffect(() => { fetchReviews(filter); }, [filter]);

  const handleStatus = async (id: number, status: Review["status"]) => {
    try {
      const res = await fetch(getBackendUrl("reviews.php"), { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
      const data = await res.json();
      if (data.status === "success") { showToast(`Marked as ${status}.`); fetchReviews(filter); }
      else showToast(data.message || "Failed.", "error");
    } catch { showToast("Connection error.", "error"); }
  };

  const handleEdit = async (id: number, fields: Partial<Review>) => {
    try {
      const res = await fetch(getBackendUrl("reviews.php"), { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, ...fields }) });
      const data = await res.json();
      if (data.status === "success") { showToast("Updated."); fetchReviews(filter); }
      else showToast(data.message || "Failed.", "error");
    } catch { showToast("Connection error.", "error"); }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(getBackendUrl("reviews.php"), { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      const data = await res.json();
      if (data.status === "success") { showToast("Deleted."); setDeleteConfirm(null); fetchReviews(filter); }
      else showToast(data.message || "Failed.", "error");
    } catch { showToast("Connection error.", "error"); }
  };

  const tabs: { key: StatusFilter; label: string; count: number }[] = [
    { key: "all",      label: "All",      count: counts.all      },
    { key: "pending",  label: "Pending",  count: counts.pending  },
    { key: "approved", label: "Approved", count: counts.approved },
    { key: "rejected", label: "Rejected", count: counts.rejected },
  ];

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-amber-100 text-amber-600">
            <Star className="size-5" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl text-heading leading-none">Customer Reviews</h1>
            <p className="text-xs text-paragraph mt-0.5">Moderate and manage submitted reviews</p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setFilter(t.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                filter === t.key ? "bg-primary text-white border-primary" : "bg-background text-paragraph border-border hover:border-primary hover:text-primary"
              }`}>
              {t.label}
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${filter === t.key ? "bg-white/20 text-white" : "bg-surface text-paragraph"}`}>
                {t.count}
              </span>
            </button>
          ))}
          <button onClick={() => fetchReviews(filter)} disabled={loading} className="ml-auto btn-ghost !py-1.5 !px-3 !text-sm gap-1.5 disabled:opacity-60">
            <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />Refresh
          </button>
        </div>

        {error && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            <AlertTriangle className="size-5 shrink-0 mt-0.5" /><p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            {[1,2,3].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-5 shadow-soft animate-pulse">
                <div className="flex gap-3"><div className="size-9 rounded-full bg-gray-200" /><div className="flex-1 space-y-2"><div className="h-3 bg-gray-200 rounded w-1/3" /><div className="h-3 bg-gray-200 rounded w-1/4" /></div></div>
                <div className="mt-3 space-y-1.5"><div className="h-3 bg-gray-200 rounded w-full" /><div className="h-3 bg-gray-200 rounded w-3/4" /></div>
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-soft">
            <Inbox className="size-12 text-paragraph/30 mx-auto mb-3" />
            <p className="font-display font-semibold text-heading">No {filter !== "all" ? filter : ""} reviews</p>
            <p className="text-sm text-paragraph mt-1">{filter === "pending" ? "All reviews have been moderated." : "Nothing to show."}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((r) => <ReviewRow key={r.id} review={r} onStatusChange={handleStatus} onDelete={setDeleteConfirm} onEdit={handleEdit} />)}
          </div>
        )}
      </div>

      {deleteConfirm !== null && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-background rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="grid size-10 place-items-center rounded-xl bg-red-100 text-red-500"><AlertTriangle className="size-5" /></div>
              <div><p className="font-display font-bold text-heading">Delete review?</p><p className="text-xs text-paragraph">This cannot be undone.</p></div>
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="btn-ghost !py-2 !px-4 !text-sm">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition"><Trash2 className="size-4" />Delete</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-premium text-sm font-medium ${toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
          {toast.type === "success" ? <CheckCircle className="size-4" /> : <AlertTriangle className="size-4" />}
          {toast.msg}
        </div>
      )}
    </AdminLayout>
  );
}
