import type { Condition } from "@/types/product";

/** Durum etiketi renkleri: yeşil = sıfır/kutulu, mavi = sıfır ayarında, kehribar = ikinci el. */
export const CONDITION_BADGE: Record<Condition, string> = {
  "Sıfır / Kutulu": "bg-[#DCFCE7] text-[#166534] ring-1 ring-[#166534]/15",
  "Sıfır Ayarında": "bg-[#DBEAFE] text-[#1E40AF] ring-1 ring-[#1E40AF]/15",
  "İkinci El - Temiz": "bg-[#FEF3C7] text-[#92400E] ring-1 ring-[#92400E]/15",
};

/** Bilinmeyen (eski) bir durum değeri gelirse nötr krem etiket kullanılır. */
export function conditionBadgeClass(condition: string): string {
  return (
    CONDITION_BADGE[condition as Condition] ??
    "bg-[#F5EBE0] text-[#2C1A1D] ring-1 ring-[#2C1A1D]/10"
  );
}
