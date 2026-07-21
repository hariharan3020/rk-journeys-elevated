import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect, useCallback } from "react";
import {
  Home, Info, Briefcase, Car, Package, HelpCircle, Image as ImageIcon,
  Save, Plus, Trash2, GripVertical, CheckCircle, AlertTriangle,
  ChevronDown, ChevronUp, Eye, EyeOff, Phone, Mail, Globe,
  Edit3, RefreshCw,
} from "lucide-react";
import { AdminLayout } from "@/components/site/AdminLayout";
import {
  useSiteContent, saveSiteContent,
  type SiteContent, type ServiceItem, type FleetItem,
  type PackageItem, type FaqItem, type WhyUsItem, type GalleryImage,
} from "@/lib/useSiteContent";

export const Route = createFileRoute("/admin/content")({
  component: ContentEditorPage,
});

// ── Types ─────────────────────────────────────────────────────────────────────
type Tab = "hero" | "siteInfo" | "whyUs" | "services" | "fleet" | "packages" | "faqs" | "gallery";
type SaveState = "idle" | "saving" | "saved" | "error";

// ── Shared UI helpers ─────────────────────────────────────────────────────────
function SectionHeader({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
        <Icon className="size-5" />
      </div>
      <div>
        <h2 className="font-display font-bold text-lg text-heading leading-none">{title}</h2>
        <p className="text-xs text-paragraph mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-heading mb-1.5">{label}</label>
      {hint && <p className="text-xs text-paragraph mb-2">{hint}</p>}
      {children}
    </div>
  );
}

const inputCls = "w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-heading focus:outline-none focus:ring-2 focus:ring-primary transition";
const textareaCls = `${inputCls} resize-none`;

function SaveBar({ state, onSave, hasDirty }: { state: SaveState; onSave: () => void; hasDirty: boolean }) {
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t border-border py-3 px-4 flex items-center justify-between gap-3 z-10">
      {state === "saved" && (
        <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
          <CheckCircle className="size-4" /> Changes saved!
        </span>
      )}
      {state === "error" && (
        <span className="flex items-center gap-1.5 text-red-500 text-sm font-medium">
          <AlertTriangle className="size-4" /> Save failed — check your password
        </span>
      )}
      {state === "idle" && hasDirty && (
        <span className="flex items-center gap-1.5 text-amber-600 text-sm font-medium">
          <AlertTriangle className="size-4" /> Unsaved changes — click Save
        </span>
      )}
      {state === "idle" && !hasDirty && <span className="text-xs text-paragraph">No unsaved changes</span>}
      {state === "saving" && <span className="text-xs text-paragraph animate-pulse">Saving…</span>}
      <button
        onClick={onSave}
        disabled={state === "saving"}
        className="btn-primary !py-2 !px-5 !text-sm gap-2 disabled:opacity-60"
      >
        <Save className="size-4" />
        {state === "saving" ? "Saving…" : "Save Changes"}
      </button>
    </div>
  );
}

// ── Tab definitions ───────────────────────────────────────────────────────────
const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "hero",     label: "Hero",         icon: Home },
  { id: "siteInfo", label: "Site Info",    icon: Info },
  { id: "whyUs",   label: "Why Us",       icon: CheckCircle },
  { id: "services", label: "Services",     icon: Briefcase },
  { id: "fleet",    label: "Fleet",        icon: Car },
  { id: "packages", label: "Packages",     icon: Package },
  { id: "faqs",     label: "FAQs",         icon: HelpCircle },
  { id: "gallery",  label: "Gallery",      icon: ImageIcon },
];

// ── Main page ─────────────────────────────────────────────────────────────────
function ContentEditorPage() {
  const { content, loading } = useSiteContent();
  const [activeTab, setActiveTab] = useState<Tab>("hero");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [adminPassword, setAdminPassword] = useState(() => {
    return typeof sessionStorage !== "undefined" ? sessionStorage.getItem("admin_pw_session") ?? "" : "";
  });
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [pendingSaveSection, setPendingSaveSection] = useState<{ key: keyof SiteContent; value: unknown } | null>(null);

  // Track which sections have unsaved local changes — skip backend sync for those
  const [dirty, setDirty] = useState<Set<keyof SiteContent>>(new Set());

  // Local draft states for each section
  const [hero, setHero] = useState(content.hero);
  const [siteInfo, setSiteInfo] = useState(content.siteInfo);
  const [whyUs, setWhyUs] = useState(content.whyUs);
  const [services, setServices] = useState(content.services);
  const [fleet, setFleet] = useState(content.fleet);
  const [packages, setPackages] = useState(content.packages);
  const [faqs, setFaqs] = useState(content.faqs);
  const [gallery, setGallery] = useState(content.gallery);

  // Helpers that mark a section dirty when the user edits it
  const markDirty = (key: keyof SiteContent) => setDirty((prev) => new Set(prev).add(key));

  const setHeroDirty    = (v: SiteContent["hero"])     => { setHero(v);     markDirty("hero"); };
  const setSiteInfoDirty= (v: SiteContent["siteInfo"]) => { setSiteInfo(v); markDirty("siteInfo"); };
  const setWhyUsDirty   = (v: SiteContent["whyUs"])    => { setWhyUs(v);    markDirty("whyUs"); };
  const setServicesDirty= (v: SiteContent["services"]) => { setServices(v); markDirty("services"); };
  const setFleetDirty   = (v: SiteContent["fleet"])    => { setFleet(v);    markDirty("fleet"); };
  const setPackagesDirty= (v: SiteContent["packages"]) => { setPackages(v); markDirty("packages"); };
  const setFaqsDirty    = (v: SiteContent["faqs"])     => { setFaqs(v);     markDirty("faqs"); };
  const setGalleryDirty = (v: SiteContent["gallery"])  => { setGallery(v);  markDirty("gallery"); };

  // Sync drafts from backend ONLY for sections that are not locally dirty
  useEffect(() => {
    if (!dirty.has("hero"))     setHero(content.hero);
    if (!dirty.has("siteInfo")) setSiteInfo(content.siteInfo);
    if (!dirty.has("whyUs"))    setWhyUs(content.whyUs);
    if (!dirty.has("services")) setServices(content.services);
    if (!dirty.has("fleet"))    setFleet(content.fleet);
    if (!dirty.has("packages")) setPackages(content.packages);
    if (!dirty.has("faqs"))     setFaqs(content.faqs);
    if (!dirty.has("gallery"))  setGallery(content.gallery);
  }, [content]); // eslint-disable-line react-hooks/exhaustive-deps

  const adminUser = (() => {
    try { return JSON.parse(localStorage.getItem("adminUser") ?? "{}"); } catch { return {}; }
  })();

  const doSave = useCallback(async (sectionKey: keyof SiteContent, value: unknown, password: string) => {
    setSaveState("saving");
    const result = await saveSiteContent(sectionKey, value, adminUser.username ?? "admin", password);
    if (result.ok) {
      setSaveState("saved");
      sessionStorage.setItem("admin_pw_session", password);
      setAdminPassword(password);
      // Clear dirty flag for this section — backend is now in sync
      setDirty((prev) => { const next = new Set(prev); next.delete(sectionKey); return next; });
      setTimeout(() => setSaveState("idle"), 3000);
    } else {
      setSaveState("error");
      setTimeout(() => setSaveState("idle"), 4000);
    }
  }, [adminUser.username]);

  const handleSave = useCallback((sectionKey: keyof SiteContent, value: unknown) => {
    if (adminPassword) {
      doSave(sectionKey, value, adminPassword);
    } else {
      setPendingSaveSection({ key: sectionKey, value });
      setShowPasswordPrompt(true);
    }
  }, [adminPassword, doSave]);

  const handlePasswordConfirm = (pw: string) => {
    setAdminPassword(pw);
    setShowPasswordPrompt(false);
    if (pendingSaveSection) {
      doSave(pendingSaveSection.key, pendingSaveSection.value, pw);
      setPendingSaveSection(null);
    }
  };

  const currentSectionData = (): { key: keyof SiteContent; value: unknown } => {
    switch (activeTab) {
      case "hero":     return { key: "hero",     value: hero };
      case "siteInfo": return { key: "siteInfo", value: siteInfo };
      case "whyUs":    return { key: "whyUs",    value: whyUs };
      case "services": return { key: "services", value: services };
      case "fleet":    return { key: "fleet",    value: fleet };
      case "packages": return { key: "packages", value: packages };
      case "faqs":     return { key: "faqs",     value: faqs };
      case "gallery":  return { key: "gallery",  value: gallery };
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-64 gap-3">
          <RefreshCw className="size-8 text-primary animate-spin" />
          <p className="text-paragraph text-sm">Loading content…</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Password Prompt Modal */}
      {showPasswordPrompt && (
        <PasswordPromptModal
          onConfirm={handlePasswordConfirm}
          onCancel={() => { setShowPasswordPrompt(false); setPendingSaveSection(null); }}
        />
      )}

      <div className="space-y-5">
        {/* Page heading */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <Edit3 className="size-5" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-heading leading-none">Content Editor</h1>
              <p className="text-xs text-paragraph mt-0.5">Edit every section of your website</p>
            </div>
          </div>
          {adminPassword && (
            <button onClick={() => { setAdminPassword(""); sessionStorage.removeItem("admin_pw_session"); }}
              className="text-xs text-paragraph hover:text-red-500 transition flex items-center gap-1">
              <EyeOff className="size-3" /> Clear session password
            </button>
          )}
        </div>

        {/* Main layout */}
        <div className="flex flex-col md:flex-row gap-5 relative">
          {/* Sidebar tabs — desktop only */}
          <aside className="hidden md:flex flex-col gap-1 w-44 shrink-0">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all ${
                  activeTab === id
                    ? "bg-primary text-white shadow-sm"
                    : "text-paragraph hover:bg-surface hover:text-heading"
                }`}
              >
                <Icon className="size-4 shrink-0" />
                <span className="flex-1">{label}</span>
                {dirty.has(id) && (
                  <span className={`size-2 rounded-full shrink-0 ${activeTab === id ? "bg-white/70" : "bg-amber-400"}`} />
                )}
              </button>
            ))}
          </aside>

          {/* Editor panel — full width on mobile */}
          <div className="flex-1 min-w-0 bg-white rounded-2xl shadow-soft overflow-hidden flex flex-col">

            {/* Mobile tab selector — inside the panel so it stacks above editor content */}
            <div className="md:hidden p-4 pb-0">
              <div className="relative">
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value as Tab)}
                  className={inputCls}
                >
                  {TABS.map(({ id, label }) => (
                    <option key={id} value={id}>
                      {label}{dirty.has(id) ? " •" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex-1 p-4 sm:p-5 md:p-6 space-y-5 overflow-y-auto max-h-[calc(100vh-180px)] md:max-h-[calc(100vh-220px)]">
              {activeTab === "hero" && <HeroEditor hero={hero} setHero={setHeroDirty} />}
              {activeTab === "siteInfo" && <SiteInfoEditor siteInfo={siteInfo} setSiteInfo={setSiteInfoDirty} />}
              {activeTab === "whyUs" && <WhyUsEditor items={whyUs} setItems={setWhyUsDirty} />}
              {activeTab === "services" && <ServicesEditor items={services} setItems={setServicesDirty} />}
              {activeTab === "fleet" && <FleetEditor items={fleet} setItems={setFleetDirty} />}
              {activeTab === "packages" && <PackagesEditor items={packages} setItems={setPackagesDirty} />}
              {activeTab === "faqs" && <FaqsEditor items={faqs} setItems={setFaqsDirty} />}
              {activeTab === "gallery" && <GalleryEditor gallery={gallery} setGallery={setGalleryDirty} />}
            </div>

            <SaveBar
              state={saveState}
              hasDirty={dirty.has(activeTab)}
              onSave={() => { const s = currentSectionData(); handleSave(s.key, s.value); }}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

// ── Password Prompt Modal ─────────────────────────────────────────────────────
function PasswordPromptModal({ onConfirm, onCancel }: { onConfirm: (pw: string) => void; onCancel: () => void }) {
  const [pw, setPw] = useState("");
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-background rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary"><Save className="size-5" /></div>
          <div>
            <p className="font-display font-bold text-heading">Confirm Your Password</p>
            <p className="text-xs text-paragraph">Required to save changes</p>
          </div>
        </div>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && pw && onConfirm(pw)}
          placeholder="Your admin password"
          className={inputCls}
          autoFocus
        />
        <div className="flex gap-2 justify-end">
          <button onClick={onCancel} className="btn-ghost !py-2 !px-4 !text-sm">Cancel</button>
          <button onClick={() => pw && onConfirm(pw)} disabled={!pw} className="btn-primary !py-2 !px-4 !text-sm gap-2 disabled:opacity-60">
            <Save className="size-4" /> Save
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Hero Editor ───────────────────────────────────────────────────────────────
function HeroEditor({ hero, setHero }: { hero: SiteContent["hero"]; setHero: (v: SiteContent["hero"]) => void }) {
  return (
    <div className="space-y-4">
      <SectionHeader icon={Home} title="Hero Section" subtitle="Main headline and tagline shown on the homepage" />
      <Field label="Main Headline">
        <input className={inputCls} value={hero.headline}
          onChange={(e) => setHero({ ...hero, headline: e.target.value })} />
      </Field>
      <Field label="Tagline">
        <input className={inputCls} value={hero.tagline}
          onChange={(e) => setHero({ ...hero, tagline: e.target.value })} />
      </Field>
      <Field label="Sub-text">
        <input className={inputCls} value={hero.subtext}
          onChange={(e) => setHero({ ...hero, subtext: e.target.value })} />
      </Field>
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
        <p className="text-xs font-semibold text-primary mb-2">Preview</p>
        <p className="font-display font-bold text-2xl text-heading">{hero.headline}</p>
        <p className="font-display font-semibold text-sm text-primary tracking-widest uppercase mt-1">{hero.tagline}</p>
        <p className="text-sm text-paragraph mt-1">{hero.subtext}</p>
      </div>
    </div>
  );
}

// ── Site Info Editor ──────────────────────────────────────────────────────────
function SiteInfoEditor({ siteInfo, setSiteInfo }: { siteInfo: SiteContent["siteInfo"]; setSiteInfo: (v: SiteContent["siteInfo"]) => void }) {
  const f = (field: keyof typeof siteInfo) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setSiteInfo({ ...siteInfo, [field]: e.target.value });
  return (
    <div className="space-y-4">
      <SectionHeader icon={Info} title="Site Info" subtitle="Contact details, social links and branding" />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Business Name"><input className={inputCls} value={siteInfo.name} onChange={f("name")} /></Field>
        <Field label="Tagline"><input className={inputCls} value={siteInfo.tagline} onChange={f("tagline")} /></Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Phone (display)">
          <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-paragraph" />
          <input className={`${inputCls} pl-9`} value={siteInfo.phone} onChange={f("phone")} /></div>
        </Field>
        <Field label="Phone (raw — WhatsApp)" hint="Country code + number, no spaces">
          <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-paragraph" />
          <input className={`${inputCls} pl-9`} value={siteInfo.phoneRaw} onChange={f("phoneRaw")} /></div>
        </Field>
      </div>
      <Field label="Email">
        <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-paragraph" />
        <input className={`${inputCls} pl-9`} value={siteInfo.email} onChange={f("email")} /></div>
      </Field>
      <Field label="City / Address"><input className={inputCls} value={siteInfo.city} onChange={f("city")} /></Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Instagram URL">
          <div className="relative"><Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-paragraph" />
          <input className={`${inputCls} pl-9`} value={siteInfo.instagram} onChange={f("instagram")} /></div>
        </Field>
        <Field label="Facebook URL">
          <div className="relative"><Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-paragraph" />
          <input className={`${inputCls} pl-9`} value={siteInfo.facebook} onChange={f("facebook")} /></div>
        </Field>
      </div>
    </div>
  );
}

// ── Why Us Editor ─────────────────────────────────────────────────────────────
function WhyUsEditor({ items, setItems }: { items: WhyUsItem[]; setItems: (v: WhyUsItem[]) => void }) {
  return (
    <div className="space-y-4">
      <SectionHeader icon={CheckCircle} title="Why Choose Us" subtitle="4 feature cards on the homepage" />
      {items.map((item, i) => (
        <div key={i} className="p-4 rounded-xl border border-border bg-surface space-y-3">
          <p className="text-xs font-semibold text-paragraph uppercase tracking-wider">Card {i + 1}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Title">
              <input className={inputCls} value={item.title}
                onChange={(e) => { const n = [...items]; n[i] = { ...n[i], title: e.target.value }; setItems(n); }} />
            </Field>
            <Field label="Icon Name" hint="Lucide icon (e.g. ShieldCheck, Award)">
              <input className={inputCls} value={item.icon}
                onChange={(e) => { const n = [...items]; n[i] = { ...n[i], icon: e.target.value }; setItems(n); }} />
            </Field>
          </div>
          <Field label="Description">
            <textarea className={`${textareaCls} h-16`} value={item.desc}
              onChange={(e) => { const n = [...items]; n[i] = { ...n[i], desc: e.target.value }; setItems(n); }} />
          </Field>
        </div>
      ))}
    </div>
  );
}

// ── Services Editor ───────────────────────────────────────────────────────────
function ServicesEditor({ items, setItems }: { items: ServiceItem[]; setItems: (v: ServiceItem[]) => void }) {
  const update = (i: number, field: keyof ServiceItem, val: string) => {
    const n = [...items]; n[i] = { ...n[i], [field]: val }; setItems(n);
  };
  const remove = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const add = () => setItems([...items, { title: "New Service", desc: "Description here.", icon: "MapPinned" }]);

  return (
    <div className="space-y-4">
      <SectionHeader icon={Briefcase} title="Services" subtitle="Service cards shown on the homepage" />
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="p-4 rounded-xl border border-border bg-surface">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <GripVertical className="size-4 text-paragraph/40" />
                <span className="text-xs font-semibold text-paragraph uppercase tracking-wider">Service {i + 1}</span>
              </div>
              <button onClick={() => remove(i)} className="size-7 grid place-items-center rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition">
                <Trash2 className="size-3.5" />
              </button>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <Field label="Title">
                <input className={inputCls} value={item.title} onChange={(e) => update(i, "title", e.target.value)} />
              </Field>
              <Field label="Icon (Lucide)">
                <input className={inputCls} value={item.icon} onChange={(e) => update(i, "icon", e.target.value)} />
              </Field>
              <Field label="Description">
                <input className={inputCls} value={item.desc} onChange={(e) => update(i, "desc", e.target.value)} />
              </Field>
            </div>
          </div>
        ))}
      </div>
      <button onClick={add} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-border hover:border-primary text-paragraph hover:text-primary text-sm font-medium transition w-full justify-center">
        <Plus className="size-4" /> Add Service
      </button>
    </div>
  );
}

// ── Fleet Editor ──────────────────────────────────────────────────────────────
const LEGACY_FLEET_KEYS = ["etios", "dzire", "ciaz", "innovaCrysta", "forceTraveller"];

function resolveFleetPreview(image: string): string | null {
  if (!image) return null;
  if (image.startsWith("/") || image.startsWith("http")) return image;
  return null; // legacy key — no preview URL available here
}

function FleetEditor({ items, setItems }: { items: FleetItem[]; setItems: (v: FleetItem[]) => void }) {
  const remove = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const add = () => setItems([
    ...items,
    { name: "New Vehicle", image: "etios", passengers: 4, luggage: 3, ac: true, tag: "New", rate: "₹0/km" },
  ]);

  return (
    <div className="space-y-4">
      <SectionHeader icon={Car} title="Fleet" subtitle="Vehicle cards — name, image, rates, capacity" />
      <div className="space-y-3">
        {items.map((item, i) => (
          <FleetCardEditor
            key={i}
            index={i}
            item={item}
            onUpdate={(field, val) => {
              const n = [...items]; n[i] = { ...n[i], [field]: val }; setItems(n);
            }}
            onRemove={() => remove(i)}
          />
        ))}
      </div>
      <button onClick={add} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-border hover:border-primary text-paragraph hover:text-primary text-sm font-medium transition w-full justify-center">
        <Plus className="size-4" /> Add Vehicle
      </button>
    </div>
  );
}

function FleetCardEditor({
  index, item, onUpdate, onRemove,
}: {
  index: number;
  item: FleetItem;
  onUpdate: (field: keyof FleetItem, val: string | number | boolean) => void;
  onRemove: () => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const adminUser = (() => {
    try { return JSON.parse(localStorage.getItem("adminUser") ?? "{}"); } catch { return {}; }
  })();
  const adminPw = typeof sessionStorage !== "undefined" ? sessionStorage.getItem("admin_pw_session") ?? "" : "";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!adminPw) {
      setUploadError("Do a save first to store your session password, then upload.");
      return;
    }
    setUploading(true);
    setUploadError("");
    try {
      const fd = new FormData();
      fd.append("image", file);
      fd.append("folder", "fleet");
      fd.append("admin_username", adminUser.username ?? "admin");
      fd.append("admin_password", adminPw);
      const res = await fetch(getUploadUrl(), { method: "POST", body: fd });
      const data = await res.json();
      if (data.status === "success") {
        onUpdate("image", data.path);
      } else {
        setUploadError(data.message ?? "Upload failed.");
      }
    } catch {
      setUploadError("Network error during upload.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const previewSrc = resolveFleetPreview(item.image);
  const isLegacy = LEGACY_FLEET_KEYS.includes(item.image);

  return (
    <div className="p-4 rounded-xl border border-border bg-surface space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold text-paragraph uppercase tracking-wider">{item.name || `Vehicle ${index + 1}`}</p>
        <button onClick={onRemove} className="size-8 grid place-items-center rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition">
          <Trash2 className="size-4" />
        </button>
      </div>

      {/* Image upload */}
      <Field label="Vehicle Image">
        <div className="flex gap-3 items-start">
          <div className="shrink-0 w-24 h-20 rounded-xl overflow-hidden border border-border bg-surface/60 flex items-center justify-center">
            {previewSrc ? (
              <img src={previewSrc} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-1 text-paragraph/40">
                <ImageIcon className="size-6" />
                <span className="text-[10px] uppercase tracking-wide">{isLegacy ? item.image : "No image"}</span>
              </div>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-background hover:border-primary hover:text-primary text-sm text-paragraph transition disabled:opacity-60 w-full"
            >
              <ImageIcon className="size-4 shrink-0" />
              {uploading ? "Uploading…" : previewSrc ? "Replace image" : "Upload image"}
            </button>
            <p className="text-[11px] text-paragraph/60">JPG, PNG or WebP · max 5 MB</p>
            {uploadError && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertTriangle className="size-3 shrink-0" /> {uploadError}
              </p>
            )}
            <input
              className={inputCls + " !text-xs !py-1.5"}
              value={item.image}
              onChange={(e) => onUpdate("image", e.target.value)}
              placeholder="Or type: etios / /fleet/my-car.jpg"
            />
          </div>
        </div>
      </Field>

      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Vehicle Name">
          <input className={inputCls} value={item.name} onChange={(e) => onUpdate("name", e.target.value)} />
        </Field>
        <Field label="Tag / Label">
          <input className={inputCls} value={item.tag} onChange={(e) => onUpdate("tag", e.target.value)} />
        </Field>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <Field label="Rate">
          <input className={inputCls} value={item.rate} onChange={(e) => onUpdate("rate", e.target.value)} placeholder="₹14/km" />
        </Field>
        <Field label="Passengers">
          <input className={inputCls} type="number" min={1} max={50} value={item.passengers}
            onChange={(e) => onUpdate("passengers", parseInt(e.target.value) || 1)} />
        </Field>
        <Field label="Luggage">
          <input className={inputCls} type="number" min={0} max={20} value={item.luggage}
            onChange={(e) => onUpdate("luggage", parseInt(e.target.value) || 0)} />
        </Field>
      </div>
      <Field label="Air Conditioning">
        <label className="inline-flex items-center gap-2 text-sm text-paragraph">
          <input type="checkbox" checked={item.ac} onChange={(e) => onUpdate("ac", e.target.checked)} className="form-checkbox rounded border-border text-primary" />
          <span>{item.ac ? "AC enabled" : "No AC"}</span>
        </label>
      </Field>
    </div>
  );
}

// ── Package image upload helper ───────────────────────────────────────────────
function getUploadUrl() {
  const custom = typeof localStorage !== "undefined" ? localStorage.getItem("CUSTOM_BACKEND_URL") : null;
  if (custom) return `${custom}/upload-image.php`;
  if (import.meta.env.DEV) return "http://localhost/rk-journeys-elevated/backend/upload-image.php";
  const origin = window.location.origin;
  const parts = window.location.pathname.split("/");
  const sub = parts[1] && !["admin"].includes(parts[1]) ? `/${parts[1]}` : "";
  return `${origin}${sub}/backend/upload-image.php`;
}

// ── Packages Editor ───────────────────────────────────────────────────────────
function PackagesEditor({ items, setItems }: { items: PackageItem[]; setItems: (v: PackageItem[]) => void }) {
  const update = (i: number, field: keyof PackageItem, val: string) => {
    const n = [...items]; n[i] = { ...n[i], [field]: val }; setItems(n);
  };
  const remove = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const add = () => setItems([...items, { name: "New Package", days: "1D", price: "From ₹5,000", image: "ooty", desc: "Description here." }]);

  return (
    <div className="space-y-4">
      <SectionHeader icon={Package} title="Tour Packages" subtitle="Package cards with pricing, duration and image" />
      <div className="space-y-3">
        {items.map((item, i) => (
          <PackageCard
            key={i}
            index={i}
            item={item}
            onUpdate={(field, val) => update(i, field, val)}
            onRemove={() => remove(i)}
          />
        ))}
      </div>
      <button onClick={add} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-border hover:border-primary text-paragraph hover:text-primary text-sm font-medium transition w-full justify-center">
        <Plus className="size-4" /> Add Package
      </button>
    </div>
  );
}

// ── Individual package card with image upload ─────────────────────────────────
const LEGACY_KEYS = ["ooty", "kodaikanal", "munnar", "madurai", "rameshwaram", "coimbatore"];

function resolvePreviewImage(image: string): string | null {
  if (!image) return null;
  if (image.startsWith("/") || image.startsWith("http")) return image;
  return null; // legacy key — no URL to preview
}

function PackageCard({
  index, item, onUpdate, onRemove,
}: {
  index: number;
  item: PackageItem;
  onUpdate: (field: keyof PackageItem, val: string) => void;
  onRemove: () => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const adminUser = (() => {
    try { return JSON.parse(localStorage.getItem("adminUser") ?? "{}"); } catch { return {}; }
  })();
  const adminPw = typeof sessionStorage !== "undefined" ? sessionStorage.getItem("admin_pw_session") ?? "" : "";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!adminPw) {
      setUploadError("Save your password first by doing any save operation, then try uploading.");
      return;
    }
    setUploading(true);
    setUploadError("");
    try {
      const fd = new FormData();
      fd.append("image", file);
      fd.append("folder", "packages");
      fd.append("admin_username", adminUser.username ?? "admin");
      fd.append("admin_password", adminPw);
      const res = await fetch(getUploadUrl(), { method: "POST", body: fd });
      const data = await res.json();
      if (data.status === "success") {
        onUpdate("image", data.path);
      } else {
        setUploadError(data.message ?? "Upload failed.");
      }
    } catch {
      setUploadError("Network error during upload.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const previewSrc = resolvePreviewImage(item.image);
  const isLegacy = LEGACY_KEYS.includes(item.image);

  return (
    <div className="p-4 rounded-xl border border-border bg-surface space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-paragraph uppercase tracking-wider">Package {index + 1}</p>
        <button onClick={onRemove} className="size-7 grid place-items-center rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition">
          <Trash2 className="size-3.5" />
        </button>
      </div>

      {/* Image upload area */}
      <Field label="Package Image">
        <div className="flex gap-3 items-start">
          {/* Preview */}
          <div className="shrink-0 w-24 h-20 rounded-xl overflow-hidden border border-border bg-surface/60 flex items-center justify-center">
            {previewSrc ? (
              <img src={previewSrc} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-1 text-paragraph/40">
                <ImageIcon className="size-6" />
                <span className="text-[10px] uppercase tracking-wide">{isLegacy ? item.image : "No image"}</span>
              </div>
            )}
          </div>

          {/* Upload controls */}
          <div className="flex-1 space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-background hover:border-primary hover:text-primary text-sm text-paragraph transition disabled:opacity-60 w-full"
            >
              <ImageIcon className="size-4 shrink-0" />
              {uploading ? "Uploading…" : previewSrc ? "Replace image" : "Upload image"}
            </button>
            <p className="text-[11px] text-paragraph/60">JPG, PNG or WebP · max 5 MB</p>
            {uploadError && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertTriangle className="size-3 shrink-0" /> {uploadError}
              </p>
            )}
            {/* Manual URL fallback */}
            <input
              className={inputCls + " !text-xs !py-1.5"}
              value={item.image}
              onChange={(e) => onUpdate("image", e.target.value)}
              placeholder="Or type: ooty / /packages/my-img.jpg"
            />
          </div>
        </div>
      </Field>

      <div className="grid sm:grid-cols-3 gap-3">
        <Field label="Name"><input className={inputCls} value={item.name} onChange={(e) => onUpdate("name", e.target.value)} /></Field>
        <Field label="Duration"><input className={inputCls} value={item.days} onChange={(e) => onUpdate("days", e.target.value)} placeholder="2N / 3D" /></Field>
        <Field label="Price"><input className={inputCls} value={item.price} onChange={(e) => onUpdate("price", e.target.value)} placeholder="From ₹8,500" /></Field>
      </div>
      <Field label="Description">
        <input className={inputCls} value={item.desc} onChange={(e) => onUpdate("desc", e.target.value)} />
      </Field>
    </div>
  );
}

// ── FAQs Editor ───────────────────────────────────────────────────────────────
function FaqsEditor({ items, setItems }: { items: FaqItem[]; setItems: (v: FaqItem[]) => void }) {
  const update = (i: number, field: keyof FaqItem, val: string) => {
    const n = [...items]; n[i] = { ...n[i], [field]: val }; setItems(n);
  };
  const remove = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const add = () => setItems([...items, { q: "New question?", a: "Answer here." }]);
  const move = (i: number, dir: -1 | 1) => {
    const n = [...items]; const t = n[i]; n[i] = n[i + dir]; n[i + dir] = t; setItems(n);
  };

  return (
    <div className="space-y-4">
      <SectionHeader icon={HelpCircle} title="FAQs" subtitle="Frequently asked questions — add, edit, reorder" />
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="p-4 rounded-xl border border-border bg-surface space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-paragraph">FAQ {i + 1}</span>
                <div className="flex gap-1">
                  <button onClick={() => i > 0 && move(i, -1)} disabled={i === 0}
                    className="size-5 grid place-items-center rounded text-paragraph/50 hover:text-primary disabled:opacity-20 transition">
                    <ChevronUp className="size-3.5" />
                  </button>
                  <button onClick={() => i < items.length - 1 && move(i, 1)} disabled={i === items.length - 1}
                    className="size-5 grid place-items-center rounded text-paragraph/50 hover:text-primary disabled:opacity-20 transition">
                    <ChevronDown className="size-3.5" />
                  </button>
                </div>
              </div>
              <button onClick={() => remove(i)} className="size-7 grid place-items-center rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition">
                <Trash2 className="size-3.5" />
              </button>
            </div>
            <Field label="Question">
              <input className={inputCls} value={item.q} onChange={(e) => update(i, "q", e.target.value)} />
            </Field>
            <Field label="Answer">
              <textarea className={`${textareaCls} h-20`} value={item.a} onChange={(e) => update(i, "a", e.target.value)} />
            </Field>
          </div>
        ))}
      </div>
      <button onClick={add} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-border hover:border-primary text-paragraph hover:text-primary text-sm font-medium transition w-full justify-center">
        <Plus className="size-4" /> Add FAQ
      </button>
    </div>
  );
}

// ── Gallery Editor ────────────────────────────────────────────────────────────
function GalleryEditor({ gallery, setGallery }: { gallery: SiteContent["gallery"]; setGallery: (v: SiteContent["gallery"]) => void }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const addInputRef = React.useRef<HTMLInputElement>(null);
  const replaceInputRef = React.useRef<HTMLInputElement>(null);
  const replaceTargetIdx = React.useRef<number>(-1);

  const adminUser = (() => {
    try { return JSON.parse(localStorage.getItem("adminUser") ?? "{}"); } catch { return {}; }
  })();
  const adminPw = typeof sessionStorage !== "undefined" ? sessionStorage.getItem("admin_pw_session") ?? "" : "";

  const uploadFile = async (file: File): Promise<string | null> => {
    if (!adminPw) {
      setUploadError("Do a save first to store your session password, then upload.");
      return null;
    }
    const fd = new FormData();
    fd.append("image", file);
    fd.append("folder", "gallery");
    fd.append("admin_username", adminUser.username ?? "admin");
    fd.append("admin_password", adminPw);
    const res = await fetch(getUploadUrl(), { method: "POST", body: fd });
    const data = await res.json();
    if (data.status === "success") return data.path as string;
    setUploadError(data.message ?? "Upload failed.");
    return null;
  };

  // Add new images (multi-select)
  const handleAddFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    setUploadError("");
    const newImgs: GalleryImage[] = [];
    for (const file of files) {
      const path = await uploadFile(file);
      if (path) newImgs.push({ src: path, visible: true });
    }
    if (newImgs.length) {
      setGallery({ ...gallery, images: [...gallery.images, ...newImgs] });
    }
    setUploading(false);
    if (addInputRef.current) addInputRef.current.value = "";
  };

  // Replace single image
  const handleReplaceFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const idx = replaceTargetIdx.current;
    if (!file || idx < 0) return;
    setUploadingIdx(idx);
    setUploadError("");
    const path = await uploadFile(file);
    if (path) {
      const imgs = [...gallery.images];
      imgs[idx] = { ...imgs[idx], src: path };
      setGallery({ ...gallery, images: imgs });
    }
    setUploadingIdx(null);
    if (replaceInputRef.current) replaceInputRef.current.value = "";
  };

  const toggle = (i: number) => {
    const imgs = gallery.images.map((img, idx) => idx === i ? { ...img, visible: !img.visible } : img);
    setGallery({ ...gallery, images: imgs });
  };
  const remove = (i: number) => setGallery({ ...gallery, images: gallery.images.filter((_, idx) => idx !== i) });
  const updateSrc = (i: number, val: string) => {
    const imgs = [...gallery.images]; imgs[i] = { ...imgs[i], src: val }; setGallery({ ...gallery, images: imgs });
  };
  const showAll = () => setGallery({ ...gallery, images: gallery.images.map((img) => ({ ...img, visible: true })) });
  const hideAll = () => setGallery({ ...gallery, images: gallery.images.map((img) => ({ ...img, visible: false })) });
  const visible = gallery.images.filter((i) => i.visible).length;

  return (
    <div className="space-y-4">
      <SectionHeader icon={ImageIcon} title="Gallery" subtitle="Upload, reorder and show/hide gallery images" />

      {/* Hidden file inputs */}
      <input ref={addInputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={handleAddFiles} />
      <input ref={replaceInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleReplaceFile} />

      {/* Stats + bulk controls */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-sm text-paragraph">{visible} of {gallery.images.length} images visible</p>
        <div className="flex gap-2">
          <button onClick={showAll} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition">
            <Eye className="size-3" /> Show All
          </button>
          <button onClick={hideAll} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition">
            <EyeOff className="size-3" /> Hide All
          </button>
        </div>
      </div>

      {/* Upload error */}
      {uploadError && (
        <p className="text-xs text-red-500 flex items-center gap-1 p-3 rounded-xl bg-red-50 border border-red-200">
          <AlertTriangle className="size-3.5 shrink-0" /> {uploadError}
        </p>
      )}

      {/* Image grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {gallery.images.map((img, i) => (
          <div key={i} className={`relative rounded-xl overflow-hidden border-2 transition ${img.visible ? "border-primary/40" : "border-border opacity-60"}`}>
            {/* Thumbnail */}
            <div className="aspect-[4/3] bg-surface">
              <img src={img.src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" loading="lazy"
                onError={(e) => { (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f1f5f9'/%3E%3C/svg%3E"; }} />
            </div>

            {/* Overlay controls */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors group flex flex-col justify-between p-2">
              {/* Top row: replace + delete */}
              <div className="flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  title="Replace image"
                  onClick={() => { replaceTargetIdx.current = i; replaceInputRef.current?.click(); }}
                  disabled={uploadingIdx === i}
                  className="size-7 grid place-items-center rounded-lg bg-white/90 text-heading hover:bg-white transition disabled:opacity-60"
                >
                  {uploadingIdx === i
                    ? <RefreshCw className="size-3.5 animate-spin" />
                    : <ImageIcon className="size-3.5" />}
                </button>
                <button
                  title="Remove image"
                  onClick={() => remove(i)}
                  className="size-7 grid place-items-center rounded-lg bg-white/90 text-red-500 hover:bg-red-50 transition"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>

              {/* Bottom: visibility toggle */}
              <button
                onClick={() => toggle(i)}
                className={`w-full py-1 rounded-lg text-[11px] font-semibold transition opacity-0 group-hover:opacity-100 ${img.visible ? "bg-primary text-white" : "bg-white/90 text-paragraph"}`}
              >
                {img.visible ? "Visible" : "Hidden"}
              </button>
            </div>

            {/* Visibility badge (always shown) */}
            <span className={`absolute top-1.5 left-1.5 size-2 rounded-full ${img.visible ? "bg-green-400" : "bg-gray-400"}`} />
          </div>
        ))}

        {/* Add new images tile */}
        <button
          onClick={() => addInputRef.current?.click()}
          disabled={uploading}
          className="aspect-[4/3] rounded-xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 flex flex-col items-center justify-center gap-2 text-paragraph hover:text-primary transition disabled:opacity-60"
        >
          {uploading ? (
            <RefreshCw className="size-6 animate-spin" />
          ) : (
            <>
              <Plus className="size-6" />
              <span className="text-xs font-medium">Add images</span>
            </>
          )}
        </button>
      </div>

      <p className="text-[11px] text-paragraph/60 text-center">JPG, PNG or WebP · max 5 MB · select multiple files at once</p>

      {/* Manual URL fallback — collapsed details */}
      <details className="rounded-xl border border-border overflow-hidden">
        <summary className="px-4 py-2.5 text-xs font-medium text-paragraph cursor-pointer hover:bg-surface transition">
          Manually edit image URLs
        </summary>
        <div className="p-4 space-y-2 border-t border-border">
          {gallery.images.map((img, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs text-paragraph w-6 shrink-0 text-right">{i + 1}.</span>
              <input
                className={inputCls + " !text-xs !py-1.5"}
                value={img.src}
                onChange={(e) => updateSrc(i, e.target.value)}
                placeholder="/gallery/image.jpg"
              />
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
