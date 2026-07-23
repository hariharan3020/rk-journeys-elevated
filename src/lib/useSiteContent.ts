import { useState, useEffect } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
export interface HeroContent {
  headline: string;
  tagline: string;
  subtext: string;
}

export interface SiteInfo {
  name: string;
  tagline: string;
  phone: string;
  phoneRaw: string;
  email: string;
  city: string;
  instagram: string;
  facebook: string;
}

export interface WhyUsItem {
  icon: string;
  title: string;
  desc: string;
}

export interface ServiceItem {
  title: string;
  desc: string;
  icon: string;
}

export interface FleetItem {
  name: string;
  image: string;
  passengers: number;
  luggage: number;
  ac: boolean;
  tag: string;
  rate: string;
  rateVisible?: boolean;
  showSpecs?: boolean;
  showSeats?: boolean;
  showLuggage?: boolean;
  showAc?: boolean;
}

export interface PackageItem {
  name: string;
  days: string;
  price: string;
  image: string;
  desc: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface GalleryImage {
  src: string;
  visible: boolean;
}

export interface TariffRate {
  tripType: string;   // e.g. "Outstation", "Local (8hrs/80km)"
  rate: string;       // e.g. "₹14/km"
  category?: "outstation" | "local";
}

export interface TariffCategory {
  label: string;
  description: string;
}

export interface TariffTableRow {
  vehicle: string;
  rentPerDay?: string;
  minKm: string;
  farePerKm: string;
  driverBata: string;
  amount: string;
  actionLabel?: string;
}

export interface TariffItem {
  vehicle: string;        // e.g. "Toyota Etios"
  tag: string;            // e.g. "Comfort Sedan"
  passengers: number;
  luggage: number;
  ac: boolean;
  rates: TariffRate[];    // multiple trip types with their rates
  featured: boolean;      // highlighted card (dark background)
}

export interface SiteContent {
  hero: HeroContent;
  siteInfo: SiteInfo;
  whyUs: WhyUsItem[];
  services: ServiceItem[];
  fleet: FleetItem[];
  packages: PackageItem[];
  faqs: FaqItem[];
  gallery: { images: GalleryImage[] };
  tariff: {
    categories: {
      outstation: TariffCategory;
      local: TariffCategory;
    };
    rows: {
      outstation: TariffTableRow[];
      local: TariffTableRow[];
    };
    items: TariffItem[];
    note: string;
  };
}

// ── Default fallback content (mirrors site.ts constants) ─────────────────────
export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    headline: "R.K. TOURS & TRAVELS",
    tagline: "JOURNEY BEYOND DESTINATIONS",
    subtext: "Safe. Comfortable. Memorable.",
  },
  siteInfo: {
    name: "RK Tours and Travels",
    tagline: "Safe • Affordable • Comfortable • Trusted for 20 Years",
    phone: "+91 87542 71868",
    phoneRaw: "918754271868",
    email: "rktoursandtravels.01@gmail.com",
    city: "Coimbatore, Tamil Nadu, India",
    instagram: "https://www.instagram.com/_rk_tours_and_travels_?igsh=NzRubGxuZHpyZWIx&utm_source=qr",
    facebook: "https://www.facebook.com/share/1D2TuoEZEL/",
  },
  whyUs: [
    { icon: "ShieldCheck", title: "Safety First", desc: "GPS tracked rides and verified professional drivers." },
    { icon: "Wallet", title: "Fair Pricing", desc: "Transparent kilometre rates with no hidden fees." },
    { icon: "HeadphonesIcon", title: "24×7 Support", desc: "Reach us any time, on any day of the year." },
    { icon: "Award", title: "20 Years Trusted", desc: "A legacy built by thousands of return customers." },
  ],
  services: [
    { title: "Airport Transfer", desc: "On-time pickups & drops for every terminal.", icon: "Plane" },
    { title: "Outstation Trips", desc: "Long-distance travel with experienced drivers.", icon: "MapPinned" },
    { title: "Local Rentals", desc: "Hourly & full-day rentals across the city.", icon: "Clock" },
    { title: "Corporate Travel", desc: "Reliable executive transport for your team.", icon: "Briefcase" },
    { title: "Temple Tours", desc: "Curated spiritual journeys across South India.", icon: "Landmark" },
    { title: "Family Tours", desc: "Comfort-first travel for family getaways.", icon: "Users" },
    { title: "Holiday Packages", desc: "Handpicked itineraries at the best value.", icon: "Palmtree" },
    { title: "Wedding Transportation", desc: "Elegant fleet for every ceremony.", icon: "HeartHandshake" },
    { title: "Employee Transportation", desc: "Punctual daily commutes for staff.", icon: "BusFront" },
    { title: "24×7 Cab Service", desc: "Anytime, anywhere across India.", icon: "Timer" },
  ],
  fleet: [
    { name: "Toyota Etios", image: "etios", passengers: 4, luggage: 3, ac: true, tag: "Comfort Sedan", rate: "₹14/km", rateVisible: true },
    { name: "Swift Dzire", image: "dzire", passengers: 4, luggage: 3, ac: true, tag: "City Favorite", rate: "₹14/km", rateVisible: true },
    { name: "Maruti Ciaz", image: "ciaz", passengers: 4, luggage: 4, ac: true, tag: "Premium Sedan", rate: "₹15/km", rateVisible: true },
    { name: "Toyota Innova Crysta", image: "innovaCrysta", passengers: 7, luggage: 5, ac: true, tag: "Premium MPV", rate: "₹18/km", rateVisible: true },
    { name: "Force Traveller", image: "forceTraveller", passengers: 12, luggage: 8, ac: true, tag: "Group Travel", rate: "₹22/km", rateVisible: true },
  ],
  packages: [
    { name: "Ooty & Coonoor", days: "2N / 3D", price: "From ₹8,500", image: "ooty", desc: "Tea gardens, toy train and misty hills." },
    { name: "Kodaikanal Getaway", days: "2N / 3D", price: "From ₹9,200", image: "kodaikanal", desc: "Lakes, viewpoints and pine forests." },
    { name: "Munnar Retreat", days: "3N / 4D", price: "From ₹12,500", image: "munnar", desc: "Endless green estates and cool weather." },
    { name: "Madurai Temple Trail", days: "1N / 2D", price: "From ₹6,900", image: "madurai", desc: "Meenakshi temple and heritage walks." },
    { name: "Rameshwaram Darshan", days: "2N / 3D", price: "From ₹10,800", image: "rameshwaram", desc: "Sacred island pilgrimage tour." },
    { name: "Coimbatore City & Around", days: "1D", price: "From ₹3,500", image: "coimbatore", desc: "Marudamalai, Isha & city highlights." },
  ],
  faqs: [
    { q: "How do I book a cab?", a: "Tap any Book Now button — we'll open WhatsApp with a ready-to-send message. You can also call us directly." },
    { q: "Do you charge extra for tolls & permits?", a: "Yes. Other state permits, border taxes, toll gate charges, and parking fees are billed on actuals in addition to the kilometre rate." },
    { q: "Are your drivers experienced?", a: "All our drivers are licensed, background-verified and have years of experience on outstation routes." },
    { q: "Do you provide 24×7 service?", a: "Yes. Our fleet operates round the clock across India, including holidays." },
    { q: "Which cities do you serve?", a: "We are based in Coimbatore and operate pan-India with a strong network across South India." },
    { q: "Can I request a specific vehicle?", a: "Absolutely. Etios, Swift Dzire and Ciaz are available on request based on availability." },
  ],
  gallery: {
    images: [
      { src: "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.48.jpeg", visible: true },
      { src: "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.49_1.jpeg", visible: true },
      { src: "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.49.jpeg", visible: true },
      { src: "/gallery/galleryWhatsApp_Image_2026-07-17_at_11.10.50_1.jpeg", visible: true },
    ],
  },
  tariff: {
    categories: {
      outstation: { label: "Outstation Tariff", description: "Per kilometre journeys" },
      local: { label: "Local Tariff", description: "City & airport packages" },
    },
    rows: {
      outstation: [
        { vehicle: "Swift", rentPerDay: "—", minKm: "300", farePerKm: "₹13", driverBata: "₹400", amount: "₹4300" },
        { vehicle: "Etios", rentPerDay: "—", minKm: "300", farePerKm: "₹13", driverBata: "₹400", amount: "₹4300" },
        { vehicle: "Ciaz or Amaze", rentPerDay: "—", minKm: "300", farePerKm: "₹14", driverBata: "₹400", amount: "₹4600" },
        { vehicle: "Ertiga", rentPerDay: "—", minKm: "350", farePerKm: "₹17", driverBata: "₹400", amount: "₹5500" },
        { vehicle: "Innova", rentPerDay: "—", minKm: "350", farePerKm: "₹18", driverBata: "₹500", amount: "₹6800" },
        { vehicle: "Crysta", rentPerDay: "—", minKm: "400", farePerKm: "₹20", driverBata: "₹500", amount: "₹8500" },
        { vehicle: "Hycross", rentPerDay: "—", minKm: "400", farePerKm: "₹22", driverBata: "₹500", amount: "₹9300" },
        { vehicle: "Audi (Premium Sedan)", rentPerDay: "—", minKm: "350", farePerKm: "₹85", driverBata: "₹900", amount: "₹30650" },
        { vehicle: "Benz (Premium Sedan)", rentPerDay: "—", minKm: "350", farePerKm: "₹85", driverBata: "₹900", amount: "₹30650" },
        { vehicle: "BMW (Premium Sedan)", rentPerDay: "—", minKm: "350", farePerKm: "₹85", driverBata: "₹900", amount: "₹30650" },
        { vehicle: "Jaguar (Premium Sedan)", rentPerDay: "—", minKm: "350", farePerKm: "₹85", driverBata: "₹900", amount: "₹30650" },
        { vehicle: "Tempo Traveller", rentPerDay: "—", minKm: "400", farePerKm: "₹30", driverBata: "₹600", amount: "₹12600" },
        { vehicle: "Urbania", rentPerDay: "—", minKm: "400", farePerKm: "₹38", driverBata: "₹600", amount: "₹15800" },
        { vehicle: "Coach Van", rentPerDay: "—", minKm: "400", farePerKm: "₹45", driverBata: "₹800", amount: "₹18800" },
        { vehicle: "Bus", minKm: "400", farePerKm: "Call for details", driverBata: "Call for details", amount: "Call for details", actionLabel: "Contact Us" },
      ],
      local: [
        { vehicle: "Swift", rentPerDay: "₹1,200", minKm: "80", farePerKm: "₹14", driverBata: "Included", amount: "₹1,200" },
        { vehicle: "Etios", rentPerDay: "₹1,200", minKm: "80", farePerKm: "₹14", driverBata: "Included", amount: "₹1,200" },
        { vehicle: "Ciaz or Amaze", rentPerDay: "₹1,400", minKm: "80", farePerKm: "₹15", driverBata: "Included", amount: "₹1,400" },
        { vehicle: "Innova Crysta", rentPerDay: "₹1,800", minKm: "80", farePerKm: "₹18", driverBata: "Included", amount: "₹1,800" },
        { vehicle: "Force Traveller", rentPerDay: "₹2,500", minKm: "80", farePerKm: "₹22", driverBata: "Included", amount: "₹2,500" },
      ],
    },
    items: [
      {
        vehicle: "Toyota Etios",
        tag: "Comfort Sedan",
        passengers: 4,
        luggage: 3,
        ac: true,
        featured: false,
        rates: [
          { tripType: "Outstation", rate: "₹14/km" },
          { tripType: "Local (8hrs/80km)", rate: "₹1,200" },
          { tripType: "Airport Transfer", rate: "₹800" },
        ],
      },
      {
        vehicle: "Swift Dzire",
        tag: "City Favourite",
        passengers: 4,
        luggage: 3,
        ac: true,
        featured: true,
        rates: [
          { tripType: "Outstation", rate: "₹14/km" },
          { tripType: "Local (8hrs/80km)", rate: "₹1,200" },
          { tripType: "Airport Transfer", rate: "₹800" },
        ],
      },
      {
        vehicle: "Maruti Ciaz",
        tag: "Premium Sedan",
        passengers: 4,
        luggage: 4,
        ac: true,
        featured: false,
        rates: [
          { tripType: "Outstation", rate: "₹15/km" },
          { tripType: "Local (8hrs/80km)", rate: "₹1,400" },
          { tripType: "Airport Transfer", rate: "₹900" },
        ],
      },
      {
        vehicle: "Toyota Innova Crysta",
        tag: "Premium MPV",
        passengers: 7,
        luggage: 5,
        ac: true,
        featured: false,
        rates: [
          { tripType: "Outstation", rate: "₹18/km" },
          { tripType: "Local (8hrs/80km)", rate: "₹1,800" },
          { tripType: "Airport Transfer", rate: "₹1,200" },
        ],
      },
      {
        vehicle: "Force Traveller",
        tag: "Group Travel",
        passengers: 12,
        luggage: 8,
        ac: true,
        featured: false,
        rates: [
          { tripType: "Outstation", rate: "₹22/km" },
          { tripType: "Local (8hrs/80km)", rate: "₹2,500" },
          { tripType: "Airport Transfer", rate: "₹1,800" },
        ],
      },
    ],
    note: "Other state permits, border taxes, toll gate charges, and parking fees are extra. Driver batta as applicable for outstation trips. Rates may vary based on season and route.",
  },
};

// ── Backend URL helper (mirrors getBackendUrl in AdminLayout) ─────────────────
function getSiteContentUrl() {
  const custom = typeof localStorage !== "undefined" ? localStorage.getItem("CUSTOM_BACKEND_URL") : null;
  if (custom) return `${custom.replace(/\/$/, "")}/site-content.php`;
  const configuredUrl = import.meta.env.VITE_BACKEND_URL;
  if (configuredUrl) return `${configuredUrl.replace(/\/$/, "")}/site-content.php`;
  // Fall back to relative /backend path
  return "/backend/site-content.php";
}

// ── Module-level cache & subscriber registry ──────────────────────────────────
let cachedContent: SiteContent | null = null;
let pendingFetch: Promise<SiteContent> | null = null;
const subscribers = new Set<() => void>();

function notifySubscribers() {
  subscribers.forEach((fn) => fn());
}

async function fetchFromBackend(): Promise<SiteContent> {
  const url = `${getSiteContentUrl()}?_=${Date.now()}`;
  const res = await fetch(url, { cache: "no-store" });
  const data: SiteContent = await res.json();
  return {
    ...DEFAULT_CONTENT,
    ...data,
    tariff: {
      ...DEFAULT_CONTENT.tariff,
      ...data.tariff,
      categories: {
        ...DEFAULT_CONTENT.tariff.categories,
        ...(data.tariff?.categories ?? {}),
      },
      rows: {
        ...DEFAULT_CONTENT.tariff.rows,
        ...(data.tariff?.rows ?? {}),
      },
    },
  };
}

async function refreshCache(): Promise<void> {
  // Always start a fresh fetch on refresh (never reuse a stale pending)
  pendingFetch = fetchFromBackend().finally(() => { pendingFetch = null; });
  try {
    const data = await pendingFetch;
    cachedContent = data;
    notifySubscribers();
  } catch {
    // keep existing cache / fallback silently
  }
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(cachedContent ?? DEFAULT_CONTENT);
  const [loading, setLoading] = useState(!cachedContent);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Re-render this component whenever cache updates
    const sync = () => setContent(cachedContent ?? DEFAULT_CONTENT);
    subscribers.add(sync);

    // Initial load if nothing is cached yet
    if (!cachedContent) {
      setLoading(true);
      fetchFromBackend()
        .then((data) => {
          cachedContent = data;
          setContent(data);
          setError(null);
        })
        .catch(() => {
          setError("Could not load content.");
          setContent(DEFAULT_CONTENT);
        })
        .finally(() => setLoading(false));
    }

    const handleUpdate = () => { refreshCache(); };
    window.addEventListener("siteContentUpdated", handleUpdate);

    return () => {
      subscribers.delete(sync);
      window.removeEventListener("siteContentUpdated", handleUpdate);
    };
  }, []);

  return {
    content,
    loading,
    error,
    refresh: () => refreshCache(),
  };
}

// ── Save helper (for admin) ───────────────────────────────────────────────────
export async function saveSiteContent(
  section: keyof SiteContent,
  value: unknown,
  adminUsername: string,
  adminPassword: string
): Promise<{ ok: boolean; message: string }> {
  try {
    const url = getSiteContentUrl();
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        [section]: value,
        admin_username: adminUsername,
        admin_password: adminPassword,
      }),
    });
    const data = await res.json();
    if (data.status === "success") {
      // Clear cache, then fire event so all useSiteContent subscribers re-fetch
      cachedContent = null;
      pendingFetch = null;
      window.dispatchEvent(new CustomEvent("siteContentUpdated"));
      return { ok: true, message: data.message };
    }
    return { ok: false, message: data.message || "Save failed." };
  } catch (err: unknown) {
    return { ok: false, message: err instanceof Error ? err.message : "Network error." };
  }
}
