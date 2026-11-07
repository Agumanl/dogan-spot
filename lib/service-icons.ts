import {
  Banknote,
  BadgeCheck,
  ClipboardCheck,
  Handshake,
  House,
  Truck,
  type LucideIcon,
} from "lucide-react";

const FALLBACK_ICONS: LucideIcon[] = [BadgeCheck, Handshake, ClipboardCheck];

/**
 * Hizmet adresine (slug) göre ikon seçer. Anahtar kelime bulunamazsa
 * slug'a bağlı sabit bir yedek ikon döner (aynı hizmet her yerde aynı ikonu alır).
 */
export function getServiceIcon(slug: string): LucideIcon {
  if (slug.includes("nakit") || slug.includes("alim")) return Banknote;
  if (slug.includes("ekspertiz")) return ClipboardCheck;
  if (slug.includes("nakliye")) return Truck;
  if (slug.includes("komple") || slug.includes("ev-")) return House;

  const hash = Array.from(slug).reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return FALLBACK_ICONS[hash % FALLBACK_ICONS.length];
}
