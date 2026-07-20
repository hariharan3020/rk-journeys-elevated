export const SITE = {
  name: "RK Tours and Travels",
  tagline: "Safe • Affordable • Comfortable • Trusted for 20 Years",
  phone: "+91 87542 71868",
  phoneRaw: "918754271868",
  email: "rktoursandtravels.01@gmail.com",
  city: "Coimbatore, Tamil Nadu, India",
  instagram:
    "https://www.instagram.com/_rk_tours_and_travels_?igsh=NzRubGxuZHpyZWIx&utm_source=qr",
  facebook: "https://www.facebook.com/share/1D2TuoEZEL/",
  mapEmbed:
    "https://www.google.com/maps?q=Coimbatore,Tamil+Nadu&output=embed",
};

export function whatsappUrl(message = "Hi, I want to book") {
  return `https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(message)}`;
}

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/tariff", label: "Tariff" },
  { to: "/packages", label: "Packages" },
  { to: "/gallery", label: "Gallery" },
  { to: "/testimonials", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

export const SERVICES = [
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
];

export const FLEET = [
  { name: "Toyota Etios", image: "etios", passengers: 4, luggage: 3, ac: true, tag: "Comfort Sedan", rate: "₹14/km" },
  { name: "Swift Dzire", image: "dzire", passengers: 4, luggage: 3, ac: true, tag: "City Favorite", rate: "₹14/km" },
  { name: "Maruti Ciaz", image: "ciaz", passengers: 4, luggage: 4, ac: true, tag: "Premium Sedan", rate: "₹15/km" },
  { name: "Toyota Innova Crysta", image: "innovaCrysta", passengers: 7, luggage: 5, ac: true, tag: "Premium MPV", rate: "₹18/km" },
  { name: "Force Traveller", image: "forceTraveller", passengers: 12, luggage: 8, ac: true, tag: "Group Travel", rate: "₹22/km" },
];

export const PACKAGES = [
  { name: "Ooty & Coonoor", days: "2N / 3D", price: "From ₹8,500", image: "ooty", desc: "Tea gardens, toy train and misty hills." },
  { name: "Kodaikanal Getaway", days: "2N / 3D", price: "From ₹9,200", image: "kodaikanal", desc: "Lakes, viewpoints and pine forests." },
  { name: "Munnar Retreat", days: "3N / 4D", price: "From ₹12,500", image: "munnar", desc: "Endless green estates and cool weather." },
  { name: "Madurai Temple Trail", days: "1N / 2D", price: "From ₹6,900", image: "madurai", desc: "Meenakshi temple and heritage walks." },
  { name: "Rameshwaram Darshan", days: "2N / 3D", price: "From ₹10,800", image: "rameshwaram", desc: "Sacred island pilgrimage tour." },
  { name: "Coimbatore City & Around", days: "1D", price: "From ₹3,500", image: "coimbatore", desc: "Marudamalai, Isha & city highlights." },
];

export const TESTIMONIALS = [
  { name: "Arjun Ramesh", role: "Business Traveler", text: "Punctual, clean cars and courteous drivers. RK is my go-to for airport runs.", rating: 5 },
  { name: "Priya Sundaram", role: "Family Trip", text: "Our Ooty trip was stress-free. The driver was patient and knew every scenic stop.", rating: 5 },
  { name: "Vikram N.", role: "Corporate Client", text: "We use RK for all executive travel. Reliability and pricing are unmatched.", rating: 5 },
  { name: "Meera Krishnan", role: "Temple Tour", text: "Rameshwaram darshan was seamless. Comfortable ride and thoughtful planning.", rating: 5 },
  { name: "Rahul Iyer", role: "Wedding", text: "Fleet arrived on time, immaculately maintained. Guests were impressed.", rating: 5 },
];

export const FAQS = [
  { q: "How do I book a cab?", a: "Tap any Book Now button — we'll open WhatsApp with a ready-to-send message. You can also call us directly." },
  { q: "Do you charge extra for tolls & permits?", a: "Yes. Other state permits, border taxes, toll gate charges, and parking fees are billed on actuals in addition to the kilometre rate." },
  { q: "Are your drivers experienced?", a: "All our drivers are licensed, background-verified and have years of experience on outstation routes." },
  { q: "Do you provide 24×7 service?", a: "Yes. Our fleet operates round the clock across India, including holidays." },
  { q: "Which cities do you serve?", a: "We are based in Coimbatore and operate pan-India with a strong network across South India." },
  { q: "Can I request a specific vehicle?", a: "Absolutely. Etios, Swift Dzire and Ciaz are available on request based on availability." },
];
