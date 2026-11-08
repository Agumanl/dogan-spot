import {
  BadgeCheck,
  Banknote,
  Briefcase,
  House,
  Layers,
  Package,
  Sofa,
  Truck,
  Tv,
  WashingMachine,
  type LucideIcon,
} from "lucide-react";
import type { CategoryType } from "@/types/product";

// Bilinen kategori adresleri için ikonlar. Tanınmayan adresler genel ikon kullanır.
const ICONS: Record<string, LucideIcon> = {
  "beyaz-esya": WashingMachine,
  mobilya: Sofa,
  tv: Tv,
  "hali-kilim": Layers,
  "buro-esyasi": Briefcase,
  "komple-ev-esyasi-alanlar": House,
  "adresten-nakit-esya-alimi": Banknote,
  "ucretsiz-ekspertiz-nakliye": Truck,
};

export function getCategoryIcon(
  slug: string,
  categoryType: CategoryType,
): LucideIcon {
  return ICONS[slug] ?? (categoryType === "service" ? BadgeCheck : Package);
}
