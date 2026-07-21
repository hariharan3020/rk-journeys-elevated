import { useSiteContent } from "@/lib/useSiteContent";
import { MessageCircle } from "lucide-react";

export function BookNowButton({
  label = "Book Now",
  message,
  className = "",
  variant = "primary",
}: {
  label?: string;
  message?: string;
  className?: string;
  variant?: "primary" | "ghost";
}) {
  const { content } = useSiteContent();

  function buildWhatsappUrl(msg = "Hi, I want to book") {
    return `https://wa.me/${content.siteInfo.phoneRaw}?text=${encodeURIComponent(msg)}`;
  }

  return (
    <a
      href={buildWhatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${variant === "primary" ? "btn-primary" : "btn-ghost"} ${className}`}
      aria-label={`${label} on WhatsApp`}
    >
      <MessageCircle className="size-4" aria-hidden />
      <span>{label}</span>
    </a>
  );
}
